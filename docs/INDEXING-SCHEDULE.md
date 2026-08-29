# Indexing submission schedule — naturogroup.com.au

Created 2026-08-19, after the location-page SEO rebuild (commits `efdbc6d`, `e09ed83`, `8de1945`).

---

## Read this before you start

You asked for one page submitted per hour until complete. Two things make that
not quite workable as stated, and one of them will actively waste your time.

**1. Google Search Console caps manual indexing requests per day, per
property.** MEASURED on this property 2026-08-20: the 14th request of the day
returned "Quota Exceeded — you've exceeded your daily quota. Please try
submitting this again tomorrow." So the working number here is **13 per day**.
The limit is undocumented and varies with site history. One per hour is 24 per
day, so you would burn the quota by mid-afternoon and spend the rest of the
day hitting the error. The cap is tied to the verified property, not to your
login, so a second account does not help.

**2. The Indexing API is not an option here.** Google only supports it for
pages with `JobPosting` or `BroadcastEvent` markup. Cleaning service pages
qualify for neither, and using it anyway is against Google's stated policy.

**What actually does the work is the sitemap.** All 148 URLs are already
listed in `sitemap-index.xml`, referenced from `robots.txt`, and every page is
now internally linked from the site-wide footer. That combination is what gets
pages crawled. Manual requests are a nudge for priority pages, not a delivery
mechanism for a whole site.

**So the plan below is ~8 URLs per day**, which leaves headroom under the 13 ceiling, ordered by commercial value, which
stays comfortably under the cap and finishes the priority set in about two and a half weeks. If
you would rather stick to one per hour, cap it at 8 per day and spread them
across the working day — same result, same order.

---

## Before day 1

- [ ] Confirm the deploy is live and serving the new pages
- [ ] Fetch `https://naturogroup.com.au/robots.txt` and confirm it shows
      `Google-Extended` / `Allow: /` — the old file blocked it
- [ ] In Search Console → Sitemaps, resubmit `sitemap-index.xml` so Google
      picks up the new `lastmod` dates
- [ ] Note current Search Console → Pages counts (indexed vs not indexed) so
      you have a baseline to compare against

---

## Submission order

Use Search Console → URL Inspection → paste URL → Request Indexing.
Tick each off as you go.

### Day 1 — Geelong money pages
- [x] `/house-cleaning-geelong/`
- [x] `/end-of-lease-cleaning-geelong/`
- [x] `/ndis-cleaning-geelong/`
- [x] `/house-cleaning-newtown-geelong/`
- [x] `/house-cleaning-highton/`
- [x] `/house-cleaning-belmont-geelong/`
- [x] `/house-cleaning-geelong-west/`
- [x] `/house-cleaning-torquay/`

### Day 2 — Geelong tier 2 + Bellarine
- [x] `/house-cleaning-ocean-grove/`
- [x] `/house-cleaning-barwon-heads/`
- [x] `/house-cleaning-east-geelong/`
- [x] `/house-cleaning-south-geelong/`
- [x] `/house-cleaning-grovedale/`
- [x] `/house-cleaning-waurn-ponds/`
- [x] `/house-cleaning-armstrong-creek/` — verified already indexed 2026-08-27, no request needed
- [x] `/house-cleaning-jan-juc/` — verified already indexed 2026-08-27, no request needed

### Day 3 — northern + western Geelong
- [x] `/house-cleaning-corio/` — verified already indexed 2026-08-27, no request needed
- [x] `/house-cleaning-lara/` — verified already indexed 2026-08-27, no request needed
- [x] `/house-cleaning-norlane/` — verified already indexed 2026-08-27, no request needed
- [x] `/house-cleaning-bell-park/` — verified already indexed 2026-08-27, no request needed
- [x] `/house-cleaning-bell-post-hill/` — verified already indexed 2026-08-27, no request needed
- [x] `/house-cleaning-hamlyn-heights/` — verified already indexed 2026-08-27, no request needed
- [x] `/house-cleaning-herne-hill/` — verified already indexed 2026-08-27, no request needed
- [x] `/house-cleaning-manifold-heights/` — verified already indexed 2026-08-27, no request needed

### Day 4 — remaining Geelong + Bellarine
- [ ] `/house-cleaning-wandana-heights/`
- [ ] `/house-cleaning-north-shore-geelong/`
- [ ] `/house-cleaning-mount-duneed/`
- [ ] `/house-cleaning-curlewis/`
- [ ] `/house-cleaning-drysdale/`
- [ ] `/house-cleaning-leopold/`
- [ ] `/services/end-of-lease/`
- [ ] `/services/ndis-cleaning/`

### Days 5–7 — the 23 brand-new pages (highest priority)

Google has never seen these URLs. They have no history, so they need the nudge
more than any established page does. Submit before the older non-Geelong pages.

Day 5 — eastern and inner Geelong
- [ ] `/house-cleaning-newcomb/`
- [ ] `/house-cleaning-whittington/`
- [ ] `/house-cleaning-st-albans-park/`
- [ ] `/house-cleaning-thomson/`
- [ ] `/house-cleaning-moolap/`
- [ ] `/house-cleaning-breakwater/`
- [ ] `/house-cleaning-north-geelong/`
- [ ] `/house-cleaning-rippleside/`

Day 6 — western, northern and southern Geelong
- [ ] `/house-cleaning-fyansford/`
- [ ] `/house-cleaning-ceres/`
- [ ] `/house-cleaning-batesford/`
- [ ] `/house-cleaning-lovely-banks/`
- [ ] `/house-cleaning-marshall/`
- [ ] `/house-cleaning-charlemont/`
- [ ] `/house-cleaning-wallington/`
- [ ] `/house-cleaning-connewarre/`

Day 7 — Bellarine coastal
- [ ] `/house-cleaning-clifton-springs/`
- [ ] `/house-cleaning-portarlington/`
- [ ] `/house-cleaning-st-leonards/`
- [ ] `/house-cleaning-indented-head/`
- [ ] `/house-cleaning-point-lonsdale/`
- [ ] `/house-cleaning-queenscliff/`
- [ ] `/house-cleaning-marcus-hill/`

### Day 8 — service hub + Port Macquarie core
- [ ] `/services/`
- [ ] `/services/house-cleaning/`
- [ ] `/services/deep-clean/`
- [ ] `/services/aged-care-cleaning/`
- [ ] `/services/veterans-cleaning/`
- [ ] `/cleaners-port-macquarie/`
- [ ] `/end-of-lease-cleaning-port-macquarie/`
- [ ] `/ndis-cleaning-port-macquarie/`

### Days 9–11 — Port Macquarie region (21 pages, 8/7/6)
Work down the Port Macquarie & Mid North Coast footer group in order.

### Days 12–14 — metro (Sydney 10, Melbourne 6, Queensland 7)
Sydney first, then Melbourne, then Queensland.

### Days 15–17 — regional NSW, Surf Coast, blog
Then `/resource/` posts, most commercially relevant first.

---

## What to watch, and when

**Week 1.** Nothing much. Recrawl usually takes days, sometimes weeks. Do not
resubmit a URL you have already submitted — it does not speed anything up and
it spends quota you need for pages you have not done yet.

**Week 2–3.** Search Console → Pages. Indexed count should be climbing. If a
page sits in "Crawled — currently not indexed", that is Google saying the page
is not worth indexing yet, not that it missed it. Resubmitting will not fix
it; more unique content and more links pointing at it might.

**Week 4.** Check the AI surfaces, which the robots.txt fix reopened. Ask
Perplexity and ChatGPT something like "eco friendly house cleaner in Geelong"
and see whether naturogroup.com.au is cited. Google AI Overviews take longer.

---

## Still outstanding after this round

- **Testimonials are still generic.** All 101 pages show the same quotes. They
  are real reviews of the business, and no Review schema is emitted without
  genuine local ones, so nothing on the page is misattributed. But real
  suburb-attributed reviews would be a genuine differentiator and would let
  `aggregateRating` schema return honestly. These have to be actual customer
  reviews — they cannot be written.
- **No Geelong-local phone number.** Still the single biggest local ranking
  lever, and the one thing Maid2Match has that we do not. Blocked until a 03
  number exists.
- **No named local contact.** Jim's puts a real franchisee on each suburb
  page. Blocked until there is a real person to name.
- **Boilerplate share.** Body text is now 52-54% unique between adjoining
  suburb pages, up from 42.6%. The remaining shared half is pricing cards,
  features, the inclusions checklist, testimonials and the app promo. Cutting
  any of it would lift the ratio further but is a conversion decision, not
  purely an SEO one.

## What changed on 2026-08-19

Three commits, in order:

1. `efdbc6d` — robots.txt stopped blocking AI search crawlers; all location
   pages surfaced in the footer; every over-length title fixed, including
   seven pages that rendered "Naturo Group | Naturo Group".
2. `e09ed83` — 395 suburb-specific FAQs replacing the name-swap fallback on 68
   pages; visible breadcrumbs and a three-tier BreadcrumbList; an honest
   "Last updated" signal that only appears where copy actually changed.
3. `8de1945` — 23 new Geelong and Bellarine pages, taking the region from 26
   to 49 and the site from 78 to 101 locations; footer regrouped by region.

Every location page now has a canonical, a meta description, exactly one H1,
at least four FAQs with FAQPage schema, LocalBusiness schema, a breadcrumb, a
map embed, and a title under 60 characters.

---

## STATUS 2026-08-29 — the manual schedule is finished, and was largely unnecessary

Spot-checked across the remaining queue (Days 4-17). Everything sampled came
back "URL is on Google / Page is indexed", including pages that were NEVER
manually submitted:

- Day 4:    /services/ndis-cleaning/            indexed
- Days 5-7: /house-cleaning-queenscliff/        indexed  (one of the 23 "new" pages)
            /house-cleaning-lovely-banks/       indexed
            /house-cleaning-charlemont/         indexed
- Services: /services/insurance-cleaning/       indexed
            /services/veterans-cleaning/        indexed
            /services/aged-care-cleaning/       indexed

The sitemap did the work, exactly as the preamble to this document predicted.
The 23 "Google has never seen these URLs" pages were indexed without a single
manual request. Do not spend quota working down the remaining days.

**The one exception:** /services/deep-clean/ is still "Crawled - currently not
indexed". Indexing was requested for it on 2026-08-27 and it sits in the
priority crawl queue. Do NOT resubmit — Google's own response says
"Submitting a page multiple times will not change its queue position or
priority." That page needs genuinely distinct content, not another request:
it shares 98% of its text with /services/house-cleaning/ (~300 unique words
in a ~6,800-word page). See the boilerplate note above.
