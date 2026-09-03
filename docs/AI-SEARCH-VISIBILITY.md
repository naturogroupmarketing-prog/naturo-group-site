# AI search visibility — measured, 2026-09-03

Companion to `NAP-CITATIONS.md` (identity consistency) and `GEELONG-BACKLINK-KIT.md`
(link value). This file covers a third thing those two do not: **whether an AI assistant
names Naturo Group at all, and whether what it says is worth reading.**

Everything in §1 was measured by running the real query in a real browser on 2026-09-03,
not inferred.

---

## 1. What the engines actually said

| Engine | Query | Outcome |
|---|---|---|
| **Perplexity** | best NDIS and aged care house cleaning service in Geelong | Named Absolute Domestics, Maid2Match, Vacmate, Amani Services. **Naturo absent.** |
| **Google AI Mode** | best NDIS house cleaning Geelong | **Naturo listed first** in the comparison table. Nursing founder, NDIS/aged care/DVA, eco products, police checks and $20m all correct. |
| **ChatGPT** | best NDIS and aged care cleaning, Geelong + Port Macquarie, with prices | **Port Macquarie only** (with a 4.7 Google card). Geelong missing. |
| **Perplexity** | Who is Naturo Group cleaning and what do they charge? | "Eco-friendly house cleaning across Australia… regular, deep, end-of-lease… police-checked, insured, plant-based products… quote via their site." **The nursing-led angle and the NDIS/aged-care/DVA specialisms did not survive.** Price: "contact them." |

### The two failures are different problems

**Failure A — not appearing (Geelong).** AI answers to "best X in Y" are assembled from
third-party *comparison* pages, not from a vendor's own website. No amount of on-site work
changes this. The recurring sources are `carevo.com.au`, `mdhomecare.com.au`,
`maid2match.com.au`, `ndis-cleaningcorp.com.au` and `threebestrated.com.au`.

**Failure B — appearing weakly.** Where Naturo *is* retrieved, two specific gaps degrade
the answer:

1. **No quotable price.** Google AI Mode opened with "costs generally range between $33
   and $74 per hour" — sourced from **Absolute Domestics**, on a query where Naturo ranked
   first. A business with no extractable number gets a competitor's rate attached to it.
2. **No rating or review count.** Google AI Mode's Trust Markers column gave Vacmate
   "4.5/5 from 73 local reviews" and Naturo only "police-checked, $20m insurance". Review
   count is the trust marker buyers scan for, and Geelong has one review.

**Why Port Macquarie works and Geelong does not:** PMQ is ranked **#1 of 3 on
ThreeBestRated** and has 48 Google reviews. Geelong has neither. That one listing plus the
review base is doing more AI-visibility work than the entire suburb-page build.

---

## 2. Fixed on 2026-09-03

- **Carpet contradiction resolved** (Hubert confirmed: Naturo does **not** do carpet
  cleaning; vacuuming carpets **is** included). The site had been asserting both at once —
  the end-of-lease pages correctly disclaimed carpet steam cleaning while
  `serviceDetail.ts` advertised "Carpet, hard floor and surface restoration" under
  insurance work and the Melbourne/Geelong suburb FAQs listed carpets as covered. An
  engine reading both either hedges or picks the wrong one. Removed from `site.ts`,
  `serviceDetail.ts` and `suburbs.ts`. Blog posts were already correct.
- **End-of-lease confirmed as a real service** and left in place. A previous note claiming
  the site advertised a service Naturo does not do was wrong.
- **`llms.txt`: seven broken links fixed.** Every one of the seven `/services/*` URLs was
  a 301 — the exact pages an assistant follows to learn what Naturo sells. All 114 links
  now return 200. Also added the verified 4.7/48 rating, the nursing-led differentiator as
  an explicit fact, and a **"Not offered"** section (carpet steam cleaning, pest control,
  gardening) so engines state the limits instead of guessing.
- **Prices published.** `pricingCards` already held real figures — Regular **$153**, Deep
  **$371**, End of Lease **$560** — that `PricingCards.astro` was discarding in favour of
  "Fast, free & no obligation". They now render on 129 pages.
- **`/pricing` created.** `posts.ts` had publicly said "see our pricing page for current
  rates" while `/pricing` returned **404**. The page also carries the only visible instance
  of the $560 end-of-lease figure, which the schema asserts.
- **Offer schema added** to `Layout.astro`: `priceRange` `$153-$560`, `currenciesAccepted`
  AUD, and an `OfferCatalog` of three `Offer`s with `minPrice`. Derived from `pricingCards`
  so the marked-up number and the rendered number cannot drift.

---

## 3. The aggregator problem — what I found, and why it is not a submission task

**Carevo and mdhomecare are the same company** (`mdhomecare.com.au` 301s to
`carevo.com.au`), and **their listings are generated from the NDIS Commission's registered
provider register** — every provider entry links out to
`ndiscommission.gov.au/provider-registration/<slug>`. There is no "list your business"
path. Inclusion appears to be a consequence of being an NDIS **registered** provider.

> **Open question for Hubert — this is the highest-value unknown in this document.**
> Is NATURO GROUP an NDIS *registered* provider, or does it serve plan-managed and
> self-managed participants only? `llms.txt` and the service pages say "plan-managed and
> self-managed", which is what an unregistered provider says. I attempted to confirm
> against the Commission register and **could not get a reliable answer** — the register's
> search does not run from URL parameters, and a control query for a known-registered
> provider returned nothing either, so the empty result proves nothing. Do not treat this
> as confirmed in either direction.
>
> If Naturo is **not** registered, that single fact gates this entire class of AI citation,
> and it also gates NDIA-managed participants as customers. Registration is a real cost and
> a real compliance burden — it is a business decision, not an SEO tactic — but it should be
> made knowingly rather than by default.

### ThreeBestRated Geelong — blocked, deliberately not worked around

Free listing path exists: `threebestrated.com.au/submit-business?reason=new`. Naturo is
already #1 on their Port Macquarie page, so the brand is known to them. Geelong currently
lists House Cleaning Geelong, Clean Nest Co. and **Vacmate** — the same competitor Google
AI Mode ranked above Naturo on trust markers.

Two blockers, neither of which should be bypassed:

1. **`bus_addr1` (street address) is a required field.** Geelong has no publishable street
   address. Per `NAP-CITATIONS.md` §1, where a directory requires a street address the
   correct answer is *don't create the listing* — not use 39 Gwyther Rd. **Do not submit
   this form with the home address.**
2. **A reCAPTCHA is required**, plus three mandatory image uploads.

Viable routes, in order of preference:
- Email `support@threebestrated.com.au` and ask whether they accept a service-area business
  with a suburb-level address (they already carry Naturo for PMQ, which helps the ask).
- Secure a genuine commercial Geelong address. Note this does **not** solve the Google
  Business Profile, which requires staffed premises — do not use a virtual office there.
- Otherwise Geelong stays off ThreeBestRated, and the review push below carries the load.

---

## 4. What actually moves Geelong, in order

1. **Geelong Google reviews.** One review is the binding constraint. It is why the Maps
   module omits Naturo, why Google AI Mode showed no rating, and why `verifiedRatings.geelong`
   is correctly `null` in `site.ts`. Nothing else in this document outranks it. The
   `googleReviewUrl` in `site.ts` is the link to send.
2. **Resolve the NDIS registration question** (§3). It gates the aggregator class outright.
3. **ThreeBestRated Geelong**, by whichever route in §3 is acceptable.
4. **Publish the Port Macquarie rating.** `verifiedRatings.portMacquarie` holds a verified
   4.7/48 that is never emitted as `aggregateRating`. PMQ is the one hub that can carry
   `LocalBusiness` (it has a safe commercial address), and the rating is real and shown on
   the GBP. This is the missing trust marker, and it is already verified — it only needs
   to be rendered on the PMQ pages alongside the markup.
5. **Finish the NAP defects** in `NAP-CITATIONS.md` §6 — particularly the duplicate
   Localsearch listing still publishing 39 Gwyther Rd under a second account.

---

## 5. Re-measure

Re-run the four queries in §1 verbatim about six weeks after the review push starts. The
metric is not rank; it is (a) whether Naturo is named at all in Perplexity/ChatGPT for
Geelong, and (b) whether a price and a review count appear next to the name.
