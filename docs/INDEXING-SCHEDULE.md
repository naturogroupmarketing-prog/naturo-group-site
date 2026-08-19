# Indexing submission schedule — naturogroup.com.au

Created 2026-08-19, after the location-page SEO rebuild (commits `efdbc6d`, `e09ed83`).

---

## Read this before you start

You asked for one page submitted per hour until complete. Two things make that
not quite workable as stated, and one of them will actively waste your time.

**1. Google Search Console caps manual indexing requests at roughly 10–12 URLs
per day, per property.** The limit is undocumented and varies with site
history, but once you hit it the "Request Indexing" button greys out for 24
hours. One per hour is 24 per day, so you would burn the quota by mid-morning
and spend the rest of the day clicking a dead button. The cap is tied to the
verified property, not to your login, so a second account does not help.

**2. The Indexing API is not an option here.** Google only supports it for
pages with `JobPosting` or `BroadcastEvent` markup. Cleaning service pages
qualify for neither, and using it anyway is against Google's stated policy.

**What actually does the work is the sitemap.** All 125 URLs are already
listed in `sitemap-index.xml`, referenced from `robots.txt`, and every page is
now internally linked from the site-wide footer. That combination is what gets
pages crawled. Manual requests are a nudge for priority pages, not a delivery
mechanism for a whole site.

**So the plan below is ~8 URLs per day**, ordered by commercial value, which
stays comfortably under the cap and finishes the priority set in two weeks. If
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
- [ ] `/house-cleaning-geelong/`
- [ ] `/end-of-lease-cleaning-geelong/`
- [ ] `/ndis-cleaning-geelong/`
- [ ] `/house-cleaning-newtown-geelong/`
- [ ] `/house-cleaning-highton/`
- [ ] `/house-cleaning-belmont-geelong/`
- [ ] `/house-cleaning-geelong-west/`
- [ ] `/house-cleaning-torquay/`

### Day 2 — Geelong tier 2 + Bellarine
- [ ] `/house-cleaning-ocean-grove/`
- [ ] `/house-cleaning-barwon-heads/`
- [ ] `/house-cleaning-east-geelong/`
- [ ] `/house-cleaning-south-geelong/`
- [ ] `/house-cleaning-grovedale/`
- [ ] `/house-cleaning-waurn-ponds/`
- [ ] `/house-cleaning-armstrong-creek/`
- [ ] `/house-cleaning-jan-juc/`

### Day 3 — northern + western Geelong
- [ ] `/house-cleaning-corio/`
- [ ] `/house-cleaning-lara/`
- [ ] `/house-cleaning-norlane/`
- [ ] `/house-cleaning-bell-park/`
- [ ] `/house-cleaning-bell-post-hill/`
- [ ] `/house-cleaning-hamlyn-heights/`
- [ ] `/house-cleaning-herne-hill/`
- [ ] `/house-cleaning-manifold-heights/`

### Day 4 — remaining Geelong + Bellarine
- [ ] `/house-cleaning-wandana-heights/`
- [ ] `/house-cleaning-north-shore-geelong/`
- [ ] `/house-cleaning-mount-duneed/`
- [ ] `/house-cleaning-curlewis/`
- [ ] `/house-cleaning-drysdale/`
- [ ] `/house-cleaning-leopold/`
- [ ] `/services/end-of-lease/`
- [ ] `/services/ndis-cleaning/`

### Day 5 — service hub + Port Macquarie core
- [ ] `/services/`
- [ ] `/services/house-cleaning/`
- [ ] `/services/deep-clean/`
- [ ] `/services/aged-care-cleaning/`
- [ ] `/services/veterans-cleaning/`
- [ ] `/cleaners-port-macquarie/`
- [ ] `/end-of-lease-cleaning-port-macquarie/`
- [ ] `/ndis-cleaning-port-macquarie/`

### Days 6–8 — Port Macquarie region (21 pages, 8/7/6)
Work down the Port Macquarie & Mid North Coast footer group in order.

### Days 9–11 — metro (Sydney 10, Melbourne 6, Queensland 7)
Sydney first, then Melbourne, then Queensland.

### Days 12–14 — regional NSW, Surf Coast, blog
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

- **Content uniqueness is 15.9%, up from 10.9%.** Better, not finished. The
  remaining bulk is shared boilerplate (pricing cards, features, checklist,
  app promo, testimonials). Trimming it would lift the ratio further but is a
  design and conversion decision, not purely an SEO one.
- **Testimonials are still generic.** All 78 pages show the same quotes. Real
  suburb-attributed reviews would be a genuine differentiator and would also
  let `aggregateRating` schema return honestly. These have to be actual
  customer reviews — they cannot be written.
- **No Geelong-local phone number.** Still the single biggest local ranking
  lever, and the one thing Maid2Match has that we do not.
- **Coverage gap.** Jim's lists 60+ Greater Geelong suburbs; we have 26.
- **No named local contact.** Jim's puts a real franchisee on each suburb
  page. Naming the Geelong coordinator would match that.
