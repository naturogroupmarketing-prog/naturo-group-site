# Naturo Group — Measurement Plan

How marketing measurement works on naturogroup.com.au, what it can answer today,
and what still needs configuring outside the codebase.

Last updated: 2026-08-12

---

## 1. Architecture

| Layer | What it is |
|---|---|
| GA4 property | **Naturo Group**, property `451557724`, stream `naturogroup.com.au`, measurement id `G-XHSW654XGS` |
| GA4 (legacy) | `G-G8R9DWS9CV` — still firing during changeover. Remove once the new property is trusted. |
| Google Ads | `AW-17734678183`, conversion label `kZ58CPzQ9cYcEKftxohC` |
| GTM | `GTM-MKXP59G9` |
| Measurement core | `src/components/Analytics.astro` |
| Config | `src/data/site.ts` → `leadCapture` |
| CRM | Sophiie — `POST /api/widget/lead` |

**One property, not one per location.** Regions are reported through the
`service_location` / `region` / `state` dimensions, so adding Newcastle or Cairns
needs no analytics rebuild — the suburb simply has to exist in `src/data/suburbs.ts`.

### Tag loading

All tags are injected at runtime by `QuoteLeadGate.astro` → `installAdvertisingStack()`,
and only **after cookie consent**. Nothing loads for a visitor who declines.

`installGtag()` loads `gtag.js` once and then issues a separate `config` call per
destination. This matters: the previous implementation returned early once
`window.gtag` existed, so only the first id was ever configured and the Google Ads
conversion id was silently never set up.

---

## 2. Page context (build time)

`Analytics.astro` derives a machine-readable context for every page **at build
time** from the route and `src/data/suburbs.ts`, and emits it as
`<script type="application/json" id="naturo-page-context">`. No suburb table is
shipped to the browser and the values cannot drift from the routes.

| Field | Example |
|---|---|
| `page_type` | `home`, `service`, `service_location`, `location`, `quote`, `thank_you` |
| `service` | `ndis_cleaning` |
| `service_location` | `geelong` |
| `region` | `geelong_bellarine` |
| `state` | `VIC` |

### Service taxonomy

Route slug → stable analytics key, so an SEO slug rename never breaks history.

| Slug | Key |
|---|---|
| `house-cleaning` | `residential_cleaning` |
| `deep-clean` | `deep_cleaning` |
| `end-of-lease` | `end_of_lease_cleaning` |
| `ndis-cleaning` | `ndis_cleaning` |
| `aged-care-cleaning` | `aged_care_cleaning` |
| `insurance-cleaning` | `insurance_cleaning` |
| `veterans-cleaning` | `veterans_cleaning` |

### Location taxonomy

Derived from the suburb's **name**, not its slug — slugs are inconsistent
(`cleaners-port-macquarie` vs `house-cleaning-geelong`) but names are stable.
`Port Macquarie` → `port_macquarie`.

---

## 3. Attribution

Stored in `localStorage` under `naturo:attribution`, 365-day window.

- **First touch is written once and never overwritten.** Someone who arrives from
  an Ads campaign in March and converts in May is still credited to that campaign.
- **Last touch** updates only on a genuine new campaign entry, so internal
  navigation never rewrites attribution.
- When no UTMs are present, the referrer is classified (`google/organic`,
  `facebook/social`, `<host>/referral`) so organic traffic isn't lost to "direct".

Captured: `utm_source/medium/campaign/term/content`, `gclid`, `gbraid`, `wbraid`,
`fbclid`, `msclkid`, landing page (path only — never the query string), referrer host.

`window.naturoAnalytics.attributionFields()` returns the flat, CRM-ready block.

---

## 4. Event taxonomy

Every event goes through `window.naturoAnalytics.track()`, which merges page
context and **scrubs PII** before anything reaches the dataLayer.

| Event | Trigger | Key parameters | GA4 key event | Google Ads |
|---|---|---|---|---|
| `generate_lead` | Any successful lead submission | `lead_id`, `service`, `service_location`, `lead_type`, `form_location`, `value`, `currency` | **Yes** | **Primary** |
| `phone_click` | `tel:` link clicked | `cta_text`, `page_path`, page context | Yes | Secondary |
| `email_click` | `mailto:` link clicked | `cta_text`, `page_path` | Yes | Secondary |
| `quote_submitted` | `/thank-you` reached | page context | Yes | Secondary |
| `quote_abandoned` | `/quote` exited part-way | `steps_touched` | No | No |
| `exit_intent_shown` | Exit-intent modal shown | page context | No | No |
| `lead_magnet_download` | Gated asset downloaded | `asset` | No | No |
| `booking_slot_selected` | Calendar slot chosen | `slot_date`, `slot_window` | No | No |
| `page_context_ready` | Every page load | page context | No | No |

`form_location` distinguishes which surface produced the lead:
`quote_lead_gate`, `exit_intent`, `lead_magnet`, `quote_page`.

### Conversion hierarchy

- **Primary** — `generate_lead`. This is what Google Ads should optimise toward
  today. It is a *website* lead, not yet a qualified one.
- **Secondary** — `phone_click`, `email_click`, `quote_submitted`.
- **Not conversions** — `quote_abandoned`, `exit_intent_shown`, `page_context_ready`.

Once the CRM marks leads qualified, Ads should move to an offline-imported
`qualified_lead` conversion. See §8.

---

## 5. Privacy

**No personal information is ever sent to GA4, Google Ads, Meta or the dataLayer.**

`Analytics.astro` holds a `PII_KEYS` deny-list (`name`, `full_name`, `email`,
`phone`, `mobile`, `address`, `notes`, `message`, …) and `scrub()` walks the
payload recursively — nested objects included — removing any matching key before
the push.

This closed two real leaks:

1. `QuoteLeadGate` pushed `name`, `phone` and `email` into `window.dataLayer` in
   plaintext under `lead_captured`. Any GTM tag reads the dataLayer, so that put
   raw personal data one misconfigured tag away from Google and Meta.
2. `ExitIntent` spread its whole payload — including the same three fields —
   into the dataLayer.

Also fixed: the phone-click tracker claimed in its comment to be consent-gated
but never actually checked consent. It now does. The phone number itself is no
longer sent as an event parameter.

Contact details still flow to Formspree and the Sophiie CRM in the POST body —
that's the intended lead-delivery path, not an analytics surface.

Landing-page URLs are recorded **without query strings**, so a stray `?email=`
can never enter attribution.

---

## 6. CRM integration

`POST /api/widget/lead` now accepts and persists attribution.

Sent with every lead: `lead_id`, `service`, `service_location`, `lead_type`,
`form_location`, and the flat `attribution` block.

In the CRM:

- `Customer.source` becomes `"google / cpc / gbp_geelong"` instead of the fixed
  literal `"Web form"`.
- The Inbox message gains a **Marketing attribution** block (lead id, first
  touch, first landing page, latest touch, keyword, referrer, Google click id).

`lead_id` is the join key across GA4, Google Ads and the CRM — it carries no
personal information, so the same enquiry can be followed end to end without
sending a name or email to Google.

### Structured columns

`Customer` carries queryable attribution columns, so campaign performance is a
database query rather than text-scraping:

`leadId`, `firstSource`, `firstMedium`, `firstCampaign`, `firstLandingPage`,
`firstTouchAt`, `latestSource`, `latestMedium`, `latestCampaign`, `latestTerm`,
`latestLandingPage`, `referrerHost`, `gclid`, `serviceRequested`,
`serviceLocation`, `formLocation`.

All nullable and written once at lead creation. `gclid` is the key that will
later carry won/lost revenue back to Google Ads as an offline conversion.

Logic lives in `src/lib/lead-attribution.ts` (Sophiie), covered by
`tests/lead-attribution.test.mts` — 12 tests, including one asserting no PII
field can reach the CRM columns.

---

## 7. UTM standard

Lowercase, underscore-separated. Never add UTMs to internal links — it restarts
attribution.

| Channel | source | medium | campaign |
|---|---|---|---|
| Google Business Profile | `google` | `organic` | `gbp_<location>` e.g. `gbp_geelong` |
| Google Ads | *(auto-tagged via gclid — do not hand-tag)* | | |
| Paid social | `facebook` / `instagram` | `paid_social` | `<location>_<service>` |
| Email | `email` | `email` | `<campaign_name>` |
| Print / QR | `print` | `offline` | `<campaign_name>` |

**Google Business Profile** is the highest-value use: give each location's GBP
website link its own `utm_campaign=gbp_<location>` so GBP-driven leads are
separable per location. This must be set in each GBP listing (§8).

---

## 8. Manual configuration required

Cannot be done from the codebase.

### P0

1. **Mark key events in GA4.** GA4 can't pre-create them; the event must arrive
   first. Once `generate_lead`, `phone_click` and `email_click` appear under
   Admin → Data display → Events, star them.
2. **Remove the stale key events** `ads_conversion_Shopping_Cart_1` and
   `purchase` — e-commerce leftovers that don't apply to this business.
3. **Verify the Google Ads conversion action** now records. The tag was never
   configured before, so historical conversions were lost.

### P1

4. **Link Search Console** — Admin → Product links → Search Console links.
   Nothing is linked today, so no query-level SEO data reaches GA4.
5. **Enable Personalized Advertising** on the Google Ads link if remarketing is
   wanted — currently Disabled, which blocks GA4 audiences reaching Ads.
6. **Add `utm_campaign=gbp_<location>`** to each Google Business Profile website
   link.
7. **Internal traffic filter** — Admin → Data collection → Data filters, using
   the office IP.
8. **Check the GTM container** for a duplicate GA4 or Ads tag. Tags are already
   configured in code; a second copy in GTM would double-count.

### P2

9. Consent Mode v2 signals (see §9).
10. Offline conversion import for qualified leads.

---

## 9. Roadmap

**Phase 1 — Foundation (done)**
GA4 live, Ads tag fixed, event taxonomy, service + location dimensions,
first/last-touch attribution, PII protection, CRM attribution pass-through.

**Phase 2 — Lead intelligence (mostly done)**
- ✅ Structured attribution columns on `Customer`.
- ✅ All four JS lead paths wired to the measurement core: quote gate,
  `/quote` page, exit intent, lead magnet.
- ✅ Duplicate `quote_submitted` on `/thank-you` refresh fixed.
- ⬜ The `contact-us` and `career` forms are plain `mailto:` and remain
  invisible to analytics; converting them to the standard lead pipeline is a
  functional change to working forms, so it's deliberately left for a
  dedicated task.
- ⬜ Distinguish website lead → qualified lead using `Opportunity.stage`.
- ⬜ Call tracking: today only the *click* is measurable, not the call.
  Dynamic number insertion would be required to close the loop.

**Phase 3 — Revenue intelligence**
- `Customer.lifetimeValue` exists in the schema but is never computed. Roll it
  up from `Invoice.total` / `amountPaid`.
- Xero is push-only (Sophiie → Xero draft invoices). Inbound payment sync is
  needed before revenue can be attributed.
- Import won/lost + revenue back into Google Ads as offline conversions keyed on
  `gclid`.

**Phase 4 — Marketing intelligence**
CAC, ROAS and LTV by channel / campaign / service / location; executive dashboard.

---

## 10. Testing

Verified in-browser on 2026-08-12:

- Page context resolves correctly for `home`, `service`, `service_location`
  (matrix + standalone), `location` and `quote` routes, including `region` and
  `state`.
- Attribution captured from `?utm_source=google&utm_medium=cpc&utm_campaign=gbp_geelong&gclid=…`;
  first-touch correctly **not** overwritten by a later campaign visit.
- PII scrub: `name`, `email`, `phone`, `notes`, `address` all blocked, including
  nested objects; non-PII dimensions preserved.
- Full lead submission through the quote gate: both destinations received
  `lead_id`, `service=ndis_cleaning`, `service_location=geelong` and the full
  attribution block; dataLayer contained **no** PII; thank-you screen shown.
- `npm run build` — 362 pages, clean.
- Sophiie `npx tsc --noEmit` — exit 0.

### How to re-test

```js
// In the browser console on any page:
window.naturoAnalytics.pageContext()
window.naturoAnalytics.attributionFields()
```

Then submit a test lead and confirm `window.dataLayer` contains no personal data.
Use GA4 **DebugView** for live event inspection.
