# NAP & citations — master record and clean-up plan

Audited 2026-09-02. Companion to `GEELONG-BACKLINK-KIT.md` (which covers *link
value*); this file covers *identity consistency* — the 7% "citations" slice of
the local-pack weighting, plus the entity-consolidation effect that makes every
other signal attach to one business rather than three half-businesses.

---

## 1. The canonical record — use verbatim, never a variant

Any field below that differs on a live listing is a defect, not a style choice.

```
Name              Naturo Group
Legal name        NATURO GROUP PTY LTD ATF Hanelg Trust
ABN               59 132 954 348
Phone             1300 876 472            (international: +61 1300 876 472)
Email             admin@naturogroup.com.au
Website           https://naturogroup.com.au
Hours             Monday–Friday 8:30am–5:00pm
Primary category  House Cleaning Service
Secondary         Commercial Cleaning Service · Cleaners
```

### Address — the rule that overrides everything else

| Hub | Address on public listings |
|---|---|
| **Geelong / Bellarine / Surf Coast** | **NO STREET ADDRESS. EVER.** Suburb-level "Geelong VIC 3220" or a service-area radius only. |
| **Port Macquarie** | `206 Oxley Highway, Port Macquarie NSW 2444` — commercial, already public, safe to publish. |

39 Gwyther Rd, Highton is Hubert's home. It is not a business address for
publication purposes, on any directory, in any schema, on the GBP, or on the
website — see the `naturo-home-address-private` note. This is a standing
constraint, not a to-do. Where a directory *requires* a street address to
create a listing, the correct answer is **don't create the listing**, not
"use the house".

Consequence, accepted deliberately: Geelong stays `Service` + `provider` →
Organization in schema and carries no `LocalBusiness`. Port Macquarie is the
only hub that can carry `LocalBusiness`.

### Name — one form only

Canonical is **Naturo Group**. Not "NATURO GROUP Geelong", not "Naturo Group
Highton", not "NATURO GROUP PTY LTD" (that is the legal name, for ASIC/ABR and
invoices only). Google's own naming guideline forbids the city suffix; every
directory that carries a location suffix splits the entity.

---

## 2. What is live right now — 5 defects found

> Status 2026-09-02: defect 1 escalated to Localsearch by email, defect 3 submitted
> to the chamber's contact form, both from admin@naturogroup.com.au. Defects 2
> and 4 need an account login and are Hubert's to do. See §6.

| # | Where | Defect | Severity |
|---|---|---|---|
| 1 | **Localsearch** — `localsearch.com.au/profile/naturo-group/cm214ir7y000j08l27p5c6qea` | **Publishes "39 Gwyther Rd, Highton VIC 3216"** in the page title and body. Listing is marked *Verified*. Name is "Naturo Group Highton". | 🔴 Privacy |
| 2 | **Yellow Pages** — `yellowpages.com.au/vic/highton/naturo-group-pty-ltd-1000002941388-listing.html` | **Not a privacy leak** — verified in a real browser: Business Location shows "Highton, VIC 3216", suburb only, no street line. Defects are the name "NATURO GROUP PTY LTD", the website link to **naturoclean.com.au** (404), hours shown as **Mon–Sat 8:00am–5:00pm** (wrong on both count and start time, and Saturday is not a working day), and the suburb being Highton rather than Geelong. | 🟠 Dead link + wrong hours |
| 3 | **Business Port Macquarie** — `businesspmq.com.au/member-directory/naturo-group` | Phone `0422 259 585` (personal mobile, not the 1300), website `http://naturoclean.com.au` (dead, and http not https). Address itself is correct. | 🟠 NAP split |
| 4 | **Google Business Profile (Geelong)** | Name is **"NATURO GROUP Geelong"** — city suffix. Address correctly hidden, phone and URL correct, 1 review, claimed. | 🟠 NAP split |
| 5 | **Legacy domain** | `naturoclean.com.au` resolves but 404s at root. Every citation still pointing there passes no authority and loses the click. | 🟠 |

**Clean:** the website itself. One name (`site.name`), one phone (60
occurrences, all `1300 876 472`), zero street addresses anywhere in `src/`, no
`naturoclean` references. Nothing to fix in the codebase.

---

## 3. Fix order

Do these in sequence. 1 and 2 before any new listing is created, so that new
listings are not built on top of a name/address that is about to change.

### Step 1 — Localsearch: remove the home address 🔴

Log in to the claimed listing (it is Verified, so the account exists) and edit:

- Business name → `Naturo Group`
- Address → remove the street line. Localsearch supports a **"mobile service /
  service area"** listing type — the profile already says *"operates as a mobile
  service"*, so the display mode exists; switch the address to suburb-only
  (Geelong VIC 3220) or hide it entirely.
- Website → `https://naturogroup.com.au`
- Phone → `1300 876 472`

If the edit UI will not drop the street address, send this:

> **To:** Localsearch support (support@localsearch.com.au / 1300 360 867)
> **Subject:** Urgent — remove residential address from listing cm214ir7y000j08l27p5c6qea
>
> Hi,
>
> Listing `https://www.localsearch.com.au/profile/naturo-group/cm214ir7y000j08l27p5c6qea`
> publishes 39 Gwyther Rd, Highton VIC 3216. That is my private residence, not a
> customer-facing premises, and it is currently indexed in Google search results
> against my business name.
>
> Please remove the street address entirely and convert the listing to a
> service-area / mobile-service listing showing "Geelong VIC" only. Please also
> update:
>
> - Business name: Naturo Group
> - Website: https://naturogroup.com.au
> - Phone: 1300 876 472
>
> I am the owner and the listing is already verified under this account.
>
> Hubert Biram — NATURO GROUP PTY LTD, ABN 59 132 954 348

After it changes, request removal of the cached/indexed version at
`https://search.google.com/search-console/remove-outdated-content` for the
profile URL, otherwise the address stays in the SERP snippet for weeks.

### Step 2 — Yellow Pages: same treatment 🔴

Claim/edit at `yellow.com.au` → Manage my listing. Same four edits as above.
Yellow Pages supports defining a service area by postcode, which is the mode
you want. If the free tier will not let you suppress the street address, the
listing should be **deleted**, not kept.

### Step 3 — Business Port Macquarie 🟠

Email the chamber to correct phone → `1300 876 472` and website →
`https://naturogroup.com.au`. Address stays as is (correct and safe).

### Step 4 — GBP rename 🟠

`NATURO GROUP Geelong` → `Naturo Group`. Note the ASIC follow-up rule: leave
14–21 days between edits that can trigger re-verification, and do not do this
in the same week as a category or address change.

---

## 4. Free directories worth listing on

Sorted by whether they can take a service-area business without a street
address, because that is the deciding constraint here — not domain authority.

### Safe: service-area listings supported

| Directory | URL | Notes |
|---|---|---|
| Bing Places | bingplaces.com | Imports straight from GBP; explicit "service area business" mode. Do this one first — it is 10 minutes and feeds Bing + Copilot. |
| Apple Business Connect | businessconnect.apple.com | Service-area supported. Feeds Apple Maps + Siri. Free, underused by competitors. |
| Facebook Page | facebook.com/naturogroup | Page exists — audit its About block against §1 and switch it to "service area" if it carries an address. |
| Instagram bio | instagram.com/naturogroup | Location keyword in bio, no address field. |
| Localsearch | localsearch.com.au | Already exists — fix, don't recreate (Step 1). |
| Yellow Pages | yellowpages.com.au | Already exists — fix, don't recreate (Step 2). |
| True Local | truelocal.com.au | Still operating. Free listing, suburb-level accepted. |
| Hotfrog AU | hotfrog.com.au | Free, service area supported. |
| StartLocal | startlocal.com.au | Free, suburb-level. |
| Word of Mouth | wordofmouth.com.au | Free, review-led — pairs with the review push. |
| My Community Directory | mycommunitydirectory.com.au | Free. Greater Geelong section. Genuinely relevant given NDIS/aged-care/DVA work. |
| Auslistings | auslistings.org | Free. Victoria → Geelong. |
| Business Listings AU | businesslistings.net.au | Free. |
| Cylex AU | cylex.com.au | Free. |
| dLook | dlook.com.au | Free. |
| PureLocal | purelocal.com.au | Free. |
| AussieWeb | aussieweb.com.au | Free. |
| ProductReview.com.au | productreview.com.au | Free brand page. High trust in AU, and Jim's uses it as a badge. |
| Oneflare / Airtasker | oneflare.com.au | Lead marketplace, free to list. Only if you want the lead flow — it is not primarily a link. |

### Requires a verifiable street address — skip for Geelong

Yelp AU, Trustpilot's address-verified tiers, and most "citation blast"
packages fall here. **Do not** satisfy their requirement with the Highton
address. Port Macquarie can use them with 206 Oxley Highway if you want them.

### Paid, decide separately

Geelong Chamber of Commerce (ask first whether the directory links out — email
6.1 in `GEELONG-BACKLINK-KIT.md`), Geelong Business Directory ($500+GST/yr).
Both are covered in that kit; neither is a NAP issue.

### What to paste into each

Everything in §1, plus the descriptions and service-area suburb list already
written in `GEELONG-BACKLINK-KIT.md` → "Copy-paste business details". Use the
description length that fits the field; do not re-write per directory —
duplicate descriptions are fine here, invented variants are not.

---

## 5. After the listings exist

Add the confirmed profile URLs to the `Organization` schema's `sameAs` array in
`src/pages/index.astro`. Right now `sameAs` carries only the three social
profiles. Listing the directory profiles there is what tells Google the
listings and the site are the same entity — it is the step that converts a pile
of citations into one consolidated knowledge-graph entry, and it is skipped
more often than any other part of this work.

Re-audit quarterly: search `"Naturo Group" -site:naturogroup.com.au` and check
every result against §1.

---

## 6. Action log

**2026-09-02**

- ✅✅ **Localsearch record `cm214ir7y000j08l27p5c6qea` — FIXED IN THE DASHBOARD.**
  Signed in and edited directly. "Hide Address" toggled on (the setting exists
  under Primary Location and is the right mechanism — it suppresses the street
  line and displays the suburb only), phone reformatted `1300 87 6472` →
  `1300 876 472`, website `https://www.naturogroup.com.au/` →
  `https://naturogroup.com.au/house-cleaning-geelong/` (deep-linked to the
  Geelong page rather than the homepage), hours close time 4:30pm → 5:00pm,
  About typo "Sged care" → "aged care", empty Description filled.
  **Verified on the live public profile:** shows "Naturo Group / Highton VIC",
  no street address, title no longer carries "39 Gwyther Rd".
- ⚠️ **The duplicate is NOT fixed.** The dashboard shows only ONE profile linked
  to this login. `NATURO GROUP Geelong` — same 39 Gwyther Rd — sits under a
  different account and still publishes the address. A claim request is lodged;
  it has to be claimed before it can be edited. **This is the outstanding
  privacy item.**
- ✅ **Localsearch** — privacy request also emailed to `support@localsearch.com.au`
  (cc `enquiries@localsearch.com.au`) from admin@naturogroup.com.au, subject
  "Urgent privacy request — remove residential address from listing
  cm214ir7y000j08l27p5c6qea (Naturo Group)". Asks for the street address to be
  removed, the listing converted to service-area "Geelong VIC", "Highton"
  dropped from the name and title, and name/phone/website/hours/category set to
  the §1 record. Watch for a reply; chase by phone on 1300 360 867 if nothing
  in 3 business days.
- ✅ **Business Port Macquarie** — correction submitted through the contact form
  at businesspmq.com.au/contact (phone → 1300 876 472, website →
  https://naturogroup.com.au). Confirmed: "Thank you! We'll be in touch soon."
- ⏸ **Yellow Pages** — blocked. Claiming the listing requires Yellow Pages to
  ring 1300 876 472 with a verification code. Hubert has to do that himself.
  Once claimed, fix name, website, and hours per §1.
- ⏸ **GBP rename** — blocked, needs the Google account.
- ⏸ **New directory listings** — every one needs an account created and
  verified by the owner. The details to paste are in §1; the order to work
  through them is in §4.
- ✅ Cached-address removal after Localsearch updates:
  `https://search.google.com/search-console/remove-outdated-content` — do this
  the day the profile changes, not before.
