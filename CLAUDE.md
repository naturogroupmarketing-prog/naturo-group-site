# naturo-group-site

Public marketing site for NATURO GROUP (eco-friendly cleaning, Australia).
Astro static site. **Pushing to `main` auto-deploys to Netlify — production.**

## Read this first

**`docs/SEO-STATUS.md`** is the SEO handover: current diagnosis, completed work
with commit refs, what is outstanding, and a list of claims that were made in
earlier sessions and later disproved. Read it before proposing SEO changes.

That file is deliberately **untracked and gitignored** — this repo is public and
the doc contains competitive analysis and business weak points. It lives on disk
at `docs/SEO-STATUS.md`. If it is missing, ask; do not recreate it from guesses.

The same applies to `docs/BACKLINK-ACTION-KIT.md` and
`docs/GEELONG-BACKLINK-KIT.md` — local only, never commit them.

## Working rules

- **Ask before pushing.** `main` deploys straight to production. A broad
  "sort it out" is not standing approval.
- **Stage files by name.** Never `git add -A` — concurrent sessions have had
  unrelated work swept into commits.
- **HTTPS push is currently broken** (stale osxkeychain credential:
  *"Password authentication is not supported"*). SSH works:
  `git push git@github.com:naturogroupmarketing-prog/naturo-group-site.git main`
- **Verify against the built output**, not the source. Run `npm run build` and
  check `dist/`, then confirm on the live URL after deploying.

## Where content lives

| Path | What |
|---|---|
| `src/data/suburbs.ts` | All location pages — single source of truth |
| `src/data/serviceDetail.ts` | Per-service copy, `relatedPosts`, `contentUpdated` |
| `src/data/geelongEolSuburbs.ts` | Consolidated Geelong end-of-lease content |
| `src/data/posts.ts` | Authored guides rendered at `/resource/<slug>` |
| `src/data/site.ts` | Nav, footer, global FAQs, lead-capture destinations |
| `src/lib/seo.ts` | `fitTitle` — keeps the richest qualifier inside 60 chars |
| `src/layouts/Layout.astro` | Organization schema, title-suffix guard |
| `astro.config.mjs` | Sitemap `lastmod` via `dateMap()` |

## Content conventions

- **Location H1s:** `Eco-Friendly House Cleaners in {Suburb}`. Both halves are
  load-bearing — "Eco-Friendly" is core positioning *and* a term these pages
  rank for; "Cleaners" is a query pattern distinct from "House Cleaning".
  Dropping either has been tried and reverted (`7409cf6`, `a751e42`).
- **Titles:** `House Cleaning {Suburb} {State} | Eco-Friendly`. Lead with the
  searched term, not the preferred one. Keep under 60 chars via `fitTitle`.
- **Meta descriptions:** under 160 chars.
- **Internal links must carry the trailing slash** — without it every link
  costs a 301.
- **Similarity benchmarks, measured on this site:** `/house-cleaning-<suburb>`
  42–43%, `/cleaners-<city>` 46%, guides 21%. **79% is doorway-shaped** and has
  already triggered one consolidation (`3150cfc`). Measure any new page cluster
  before shipping it.
- **Never invent operational claims** — guarantees, timeframes, staff names,
  prices, service coverage. If a page needs a business fact, ask for it.
- **No `aggregateRating` / `Review` markup** unless genuine reviews exist.
- Only the Geelong and Port Macquarie hubs could legitimately carry
  `LocalBusiness`, and only with verified street addresses. Everywhere else is
  a service area, not a premises — those are `Service` nodes (`fa53bde`).
