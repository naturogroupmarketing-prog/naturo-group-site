# Naturo Group — Full Rebuild Blueprint

Document version: 2026-04-23. Authored as senior design + Astro engineering brief. **Not yet executed** — awaiting approval before any file changes.

---

## 1. Executive Summary

Naturo Group has a working Astro site that mirrors the live WordPress/Elementor design. The bones are good: Poppins type, navy/cyan/yellow brand palette, real copy already extracted into `site.ts`, JSON-LD shipping, sitemap configured, prefetching on. The execution is not yet at the level of a premium 2026 service brand — typography has weak rhythm, sections drift in padding, the hero is generic stock photography, trust components are thin, the booking flow is a dead `/book` link, and there are zero real service pages, location pages, or quote/contact routes. SEO has 31 footer location links pointing to non-existent URLs.

This rebuild keeps the brand DNA (navy `#1C244B`, cyan `#24D2F2`, accent yellow `#FEB91C`, Poppins, calm light surfaces, rounded pill CTAs) and elevates execution: a disciplined design-token system, a small set of reusable section primitives, real service + location + contact templates, schema on every template, a sticky mobile CTA, and a single-source content layer that scales to ~40+ local SEO pages without duplication.

Approach: token layer first → layout primitives → home rebuild → templates (service / location / contact / about) → migration of legacy URLs with redirects → schema + sitemap polish → perf pass.

---

## 2. Current Site Audit

**What works**
- Astro 6 + Tailwind v4 (`@theme`) is the right stack.
- `site.ts` already centralises copy, nav, FAQs, testimonials, footer links — strong foundation.
- `Layout.astro` ships canonical, OG, Twitter, en-AU lang, schema slot.
- Sitemap integration installed.
- `prefetch.defaultStrategy: 'viewport'` — good perceived perf.
- Real founder copy, real testimonials, partner logos, FAQ content all present.

**What's weak**
- **Type system**: H1 28–44px clamp is too small for a hero; H2 28–36px clamp lacks display weight. Body 300 weight at 16/1.5 is grey/low-contrast against light surfaces. No defined fluid scale beyond H1–H4.
- **Spacing**: every section sets its own `padding: 80px 0` or similar — no shared rhythm. `.container-site` is 1100px, fine, but no narrow/wide variants.
- **Buttons**: three button utilities (`.btn-primary`/`.btn-secondary`/`.btn-yellow`) hardcoded everywhere; many components also reimplement `#3a5dff` inline (Hero, FounderBlock, PricingCards). Inconsistent.
- **Hero**: tries a 3-slide bg crossfade with stock images. No real local photography. Mobile hero text wraps awkwardly (3 hard line breaks).
- **Trust signals**: `TrustBadges`, `Providers`, `TrustedAcrossAU` exist but compete — no clear hierarchy. Partner logos repeat. Reviews show 4.9/5 but no aggregate schema on home.
- **CTA strategy**: every CTA points to `/book` which is a 404. No sticky mobile CTA, no enquiry form, no fallback "Call now" priority on mobile.
- **Routing gap**: 31 footer location links, 6 service nav links, plus `/about`, `/contact-us`, `/career`, `/resource`, `/how-it-works`, `/team`, `/reviews`, `/faqs` — almost all 404. The only real routes are `/`, `/about`, `/services`, `/services/[slug]`.
- **Service pages**: live as a dynamic route but content is thin (just from `serviceDetail.ts`).
- **SEO**: `LocalBusiness` schema is generic (`areaServed: 'Australia'`), not branched by location. No `Service` schema. No `BreadcrumbList`. FAQ schema only on home.
- **Mobile**: header collapses to hamburger but mobile menu is plain — no phone CTA priority. Hero h1 (clamp 2–2.75rem) is too small. Pricing cards stack but bullets are dense.
- **Accessibility**: Good — `aria-label`, `aria-hidden`, focus states present in places. Gaps: dropdown menus not keyboard-operable on focus, mobile menu toggle works but no focus trap, low contrast on `--color-slate` (`#324A6D`) over `--color-bg-pale`.
- **Performance**: Google Fonts loaded synchronously with 5 weights — ~80KB blocking. `og-default.jpg` referenced but not in `/public`. `hero-bathroom.png` is a PNG (likely large; should be AVIF/WebP).
- **Tech debt**: `extracted/`, `extracted-backup/`, `1776911593-qw8baqr8.tar.gz` (3.1 GB) and `elementor-exports/` are sitting in repo. Disk pressure.

---

## 3. What Must Be Preserved

- **Brand**: navy `#1C244B`, cyan `#24D2F2`, accent yellow `#FEB91C`, light surface `#F3F5F8`/`#F8F8F3`.
- **Logo**: `/images/logo.avif`, sized ~140–170px wide.
- **Typeface**: Poppins for sans body and display.
- **Voice**: warm, professional, "trusted, trained, thorough", eco-conscious, family-aware, NDIS/Aged Care/DVA literacy.
- **Tagline & founder story**: Anna Biram, nursing background, NDIS/DVA/Insurance/Aged Care positioning.
- **Pricing structure**: three-tier (Deep / Regular / End of Lease) with "Starting from" framing.
- **Key trust items**: Police checked, Fully insured, Satisfaction guaranteed.
- **Provider/partner logos**: Allianz, NRMA, QBE, IPAR, Prudence, PHSA, CCI.
- **All current URLs that exist** must still resolve (preserve `/`, `/about`, `/services`, `/services/[slug]`).

---

## 4. What Must Be Improved

| Area | Current | Target |
|---|---|---|
| Hero | Stock crossfade, weak h1 | Single high-quality image OR muted gradient + bold display h1, single primary CTA + phone, micro trust strip |
| Type rhythm | 4 fluid steps, no body scale | 8-step fluid scale, consistent line-height, navy on white, slate on cream, accessible contrast |
| Spacing | Per-component padding | Token scale, `.section` primitive with `--section-y` variants (sm/md/lg) |
| Buttons | 3 utility classes, hardcoded copies | Single `.btn` + variants (`primary`/`secondary`/`ghost`/`outline-light`) cascading via CSS vars; sizes `sm/md/lg` |
| Cards | Bespoke per component | `<Card>` + `<PricingCard>` + `<TrustCard>` primitives |
| CTA strategy | All point to dead `/book` | Quote form on `/quote`, `/contact-us`, mobile sticky bar, `tel:` priority on mobile |
| Service routes | Dynamic stub | Full template: hero, what's included, pricing, trust, FAQ, related services, schema |
| Location routes | 0 of 31 exist | Generated from `locations.ts`, unique copy snippets, local schema, neighborhood links, internal cross-links to services |
| Trust placement | Repeated logos, 3 separate sections | One trust strip (logos), one social proof (reviews + rating), one credentials block (badges + insurance) |
| Mobile UX | Hero shrinks, dense cards | Larger tap targets (≥48px), sticky bottom CTA bar, simplified hero, native `<details>` FAQ |
| Performance | Google Fonts blocking, PNG hero | Self-host Poppins subset (latin), AVIF hero, `loading="eager"` only on LCP image |
| SEO schema | LocalBusiness + FAQ home only | Per-template: LocalBusiness/Service/BreadcrumbList/Review/AggregateRating |
| Maintainability | Hardcoded values in components | All design via tokens; all copy via `site.ts` + content collections for blog/locations |

---

## 5. Competitor Benchmark Findings

ASSUMPTION: I have not crawled competitors live in this turn. Pattern observations from category leaders (Whizz, Two Maids, Maid Brigade, Australia-specific: Whitelyfe, Maid2Match, Spotless, Jim's Cleaning):

| Dimension | Sector leaders typically do | Naturo gap | Win we'll target |
|---|---|---|---|
| Hero | One photo of real cleaner, single bold value-prop, instant-quote inline | Stock photo crossfade | Real founder/team photo, single h1, instant-quote CTA above the fold |
| Quote flow | Multi-step inline ("bedrooms → bathrooms → suburb → email") | None — link to dead `/book` | Single-page `/quote` with progressive form, then handoff to phone/email |
| Reviews | Aggregate badge + carousel + Google review link | Marquee only | Header rating chip ("4.9★ Google" link) + carousel + structured `AggregateRating` |
| Local | Per-suburb pages with locally-written intros | All location URLs are 404 | 31 location pages, each with 150–250 unique words + suburb-specific FAQ |
| Mobile | Sticky "Book / Call" bar | None | Sticky bottom bar with `tel:` priority |
| Trust | Insurance/Police/Guarantee in hero margin | Buried mid-page | Hero sub-strip + dedicated credentials block |
| Loading | <2.5s LCP, AVIF hero | PNG hero, blocking fonts | <2s LCP target via AVIF + self-hosted font |

**Win line**: "The only Australian cleaner whose founder is a registered nurse, with eco-friendly products, NDIS/DVA approval, and a 60-second instant quote." — leverages real differentiators (Anna's nursing background, eco focus, NDIS/DVA scope).

---

## 6. Redesign Vision

**Tone**: calm, premium, human. Restraint over flash.

**Visual moves**
- Reduce decoration; let typography and whitespace lead.
- Promote display weight (h1 ~clamp 2.75–4rem) but keep weight light (300/400) — avoids shouty corporate feel.
- Cream/white as primary surface; navy as accent ink for headings; cyan reserved for CTAs and active states; yellow used sparingly (one per page max — e.g. rating badge).
- One photo style: warm daylight, real-life domestic spaces, no people-stock; if no real photography exists yet, use solid muted backgrounds + brand illustrations as fallback.
- One geometry: 12px small radius, 16px card radius, 9999px pill CTAs (preserve existing pill brand).
- Subtle motion only: 200ms ease-out for hover, 300ms reveal for in-viewport sections, respect `prefers-reduced-motion`.

**What we explicitly avoid**
- SaaS gradients, neon glows, glassmorphism, oversized blob shapes.
- Animated counters, parallax, scroll-jacking.
- Three-column dense pricing comparison tables.
- Stock smiling cleaners with mops.

---

## 7. Visual System

```
TOKENS  (src/styles/tokens.css — imported by global.css)

COLOR
  --c-navy        #1C244B   (ink)
  --c-navy-700    #2A3461   (hover ink)
  --c-slate       #324A6D   (body — review for AA)
  --c-slate-soft  #5C6F8A   (meta/secondary)
  --c-cyan        #24D2F2   (CTA)
  --c-cyan-700    #0FB8DA   (CTA hover)
  --c-yellow      #FEB91C   (rating chip only)
  --c-bg          #FFFFFF
  --c-surface     #F3F5F8
  --c-cream       #F8F8F3
  --c-border      #E2E8EE
  --c-border-soft #EEF2F6

TYPE  (Poppins, weights 300/400/500/600 only; self-hosted subset)
  --fs-display    clamp(2.5rem, 4.2vw + 1rem, 4rem)     /* 40-64 */
  --fs-h1         clamp(2rem, 3vw + 1rem, 3rem)         /* 32-48 */
  --fs-h2         clamp(1.625rem, 2vw + 1rem, 2.25rem)  /* 26-36 */
  --fs-h3         clamp(1.25rem, 1vw + 1rem, 1.5rem)    /* 20-24 */
  --fs-body-lg    1.0625rem (17px)
  --fs-body       1rem      (16px, line-height 1.65)
  --fs-body-sm    0.875rem  (14px)
  --fs-eyebrow    0.8125rem (13px, tracked +0.08em, uppercase)

SPACE  (4px base)
  --s-1  4px    --s-2  8px    --s-3  12px   --s-4  16px
  --s-5  20px   --s-6  24px   --s-8  32px   --s-10 40px
  --s-12 48px   --s-16 64px   --s-20 80px   --s-24 96px

RADIUS
  --r-xs 4px  --r-sm 8px  --r-md 12px  --r-lg 16px  --r-xl 24px  --r-pill 9999px

ELEVATION
  --shadow-xs  0 1px 2px rgba(28,36,75,.04)
  --shadow-sm  0 4px 12px rgba(28,36,75,.06)
  --shadow-md  0 12px 28px rgba(28,36,75,.08)

MOTION
  --dur-fast 150ms   --dur-base 220ms   --dur-slow 320ms
  --ease-out cubic-bezier(.2,.8,.2,1)

SECTION
  --section-y-sm  clamp(48px, 6vw, 64px)
  --section-y-md  clamp(64px, 9vw, 96px)
  --section-y-lg  clamp(80px, 12vw, 128px)

CONTAINER
  --container-narrow  720px
  --container         1100px
  --container-wide    1280px
```

**Components**

- **Button** (`<Button variant="primary|secondary|ghost|outline-light" size="sm|md|lg" href|as>`) — single class with CSS-var cascade; preserves pill geometry (`--r-pill`); 48px min height at `md`.
- **Card** — `--c-bg` surface, `--r-lg`, `--shadow-xs` rest, `--shadow-md` hover, 1px `--c-border` for non-elevated variants.
- **Section** — `<Section padding="sm|md|lg" surface="white|cream|surface|navy">` with `<Container width="narrow|default|wide">`.
- **Eyebrow** — `<Eyebrow>` small label above h2.
- **Badge** — capsule for "5★ Google", "NDIS approved", "Police checked".
- **Form controls** — 48px height, `--r-md`, 1.5px border, focus ring `0 0 0 3px rgba(36,210,242,.25)`.
- **Icons** — single Phosphor "Regular" weight (1.5px stroke) at 20/24/32px; no fill icons.
- **Hover** — translate-y -2px on cards/buttons; opacity 0.85 on links; never scale text.
- **Reduced motion** — disable translate, keep color/opacity transitions only.

---

## 8. Site Architecture

```
/                           Home
/about                      About + founder story
/services                   Services index
/services/house-cleaning    Service detail
/services/deep-cleaning
/services/end-of-lease
/services/ndis-cleaning
/services/aged-care
/services/dva
/services/insurance
/services/commercial         (NEW)
/services/office             (NEW)

/locations                  Locations index (state grouping)
/locations/[slug]           Location detail (31 generated)

/quote                      Instant quote (single page form)
/contact                    Contact + map + phone-priority
/about/team                 Team
/about/eco                  Eco-friendly methodology
/reviews                    Reviews aggregate page
/faqs                       FAQ index (full)
/resources                  Blog/resource collection (Astro content collection)
/resources/[slug]           Blog post (MDX)
/career                     Become a cleaner

/legal/privacy
/legal/terms
/legal/cookies
/legal/collection-notice
```

**Internal-link rules**
- Every service page links to: 3 most relevant locations, 2 sibling services, /quote, /reviews.
- Every location page links to: all services, 3 nearest locations (computed by region), /quote, /reviews.
- Footer keeps full location list (already in `site.ts`) — these stay as the SEO discovery layer.

---

## 9. Homepage Rebuild Blueprint

| # | Section | Purpose | Layout (desktop / mobile) | Notes |
|---|---|---|---|---|
| 1 | Hero | Communicate offer in 1 second, drive primary action | Two-column on ≥1024px (copy left, hero image right with rounded mask), single column stacked on mobile with image below copy | h1: "Eco-friendly house cleaning, trusted across Australia." Sub: "Police-checked cleaners. NDIS, Aged Care & DVA approved." Primary CTA: "Get an instant quote". Secondary: phone link. Trust strip: "4.9★ Google · Insured · Police-checked" |
| 2 | Service tiles | Funnel into the 3 core services | 3-up grid → 1 column on <768px | Use `<PricingCard>`; each tile = name + "from $X" + 3 bullets + CTA → `/services/[slug]` |
| 3 | Why Naturo | Differentiation | 4-up icon grid (Eco / Nurse-led / NDIS approved / Local team) | Icons in cyan, navy headings, 1-line body |
| 4 | Founder | Trust + story | 50/50 image + copy | Re-use existing Anna copy; CTA: "Read our story" → /about |
| 5 | Reviews | Social proof | Aggregate badge + 3 cards visible (no marquee on mobile to save bandwidth) | Header chip "4.9 ★ from 500+ reviews"; pause on hover; respect reduced-motion |
| 6 | Locations preview | Local SEO + reassurance | Grid of state column links → /locations | "Now serving 31 areas across Australia" |
| 7 | How it works | Reduce friction | 3-step horizontal | "Tell us about your home → Pick a date → We arrive & clean" |
| 8 | FAQ | Objection handling | Accordion (`<details>`) | 6 most common Qs; CTA "See all FAQs" → /faqs |
| 9 | Final CTA | Conversion close | Full-bleed navy bg with quote CTA + phone | "Ready for a sparkling home? Get an instant quote in 60 seconds." |
| 10 | Footer | Discovery + trust | Existing 4-col | Keep current layout |

Sections to remove from current home: `IntroCopy` (redundant with hero sub), `IncludesChecklist` (move into service detail page), `BookCTA` (consolidates with section 9), `SixtySecondsAway` (consolidates with hero copy + section 9), `AppPromo` (kill — app store links are placeholders, drop until real).

---

## 10. Reusable Page Templates

### A. Service detail (`/services/[slug]`)
1. `<ServiceHero>` — eyebrow ("Service"), h1, sub, primary + phone CTA, hero image right.
2. `<TrustStrip>` — Insured · Police-checked · Satisfaction guaranteed (icons + 1-liners).
3. `<WhatsIncluded>` — 12-item checklist (from `site.ts.includesChecklist` or service-specific).
4. `<PricingPanel>` — single panel with "Starting from $X", what's not included, who it's for.
5. `<HowItWorks>` — 3-step shared component.
6. `<RelatedServices>` — 2 sibling cards.
7. `<LocationsServed>` — chip list of suburbs.
8. `<FAQ>` — 5 service-specific Qs.
9. `<FinalCTA>` — quote + phone.
- **Schema**: `Service` + `BreadcrumbList` + per-FAQ `FAQPage`.

### B. Location detail (`/locations/[slug]`)
1. `<LocationHero>` — h1 "Cleaners in {Suburb}", sub, primary CTA.
2. `<TrustStrip>`.
3. `<LocalIntro>` — 150–250 word unique paragraph (from `locations.ts` per-suburb `intro`).
4. `<ServicesAvailable>` — 6 service chips → `/services/*`.
5. `<NeighborhoodLinks>` — 3 nearest suburbs.
6. `<Reviews>` — filtered to that area if data exists; otherwise default 3.
7. `<FinalCTA>`.
- **Schema**: `LocalBusiness` with `areaServed: { @type: 'City', name: '{Suburb}' }` + `BreadcrumbList`.

### C. About / trust (`/about`, `/about/team`, `/about/eco`)
1. Hero (statement-style).
2. Founder story (existing Anna copy).
3. Values (3-up).
4. Photo grid (real team).
5. Approvals/credentials.
6. CTA.
- **Schema**: `AboutPage` + `Organization`.

### D. Quote / contact (`/quote`, `/contact`)
1. Compact hero — h1 + 1-line sub + phone CTA at right.
2. Inline form (3 steps minimum: address → bedrooms/bathrooms/frequency → email/phone).
3. Reassurance ("60 seconds, no card needed").
4. Map + opening hours sidebar (contact only).
- ASSUMPTION: form will POST to a TODO endpoint (Formspree / Netlify Forms / Astro endpoint) — confirm before build.
- **Schema**: `ContactPage`.

### E. Resource / blog (`/resources`, `/resources/[slug]`)
- Astro **content collection** (`src/content/resources/*.mdx`).
- Index: filterable by tag.
- Detail: prose layout with author byline, related posts, CTA strip.
- **Schema**: `BlogPosting`.

---

## 11. Conversion Optimisation Plan

1. **Primary CTA**: "Get an instant quote" → `/quote`. Cyan pill, present in header (desktop), sticky bar (mobile), every section close.
2. **Secondary CTA**: phone `1300 876 472` — `tel:` link, prefixed with phone icon, present in header, hero, every final-CTA block, sticky bar.
3. **Sticky mobile bar**: bottom-fixed, two buttons split 50/50: cyan "Quote" + outline "Call". Hides on scroll-up only after 600px scroll. ARIA label "Booking actions".
4. **Trust signals**: rating chip in header on ≥1024px ("4.9★ Google"); credentials chip strip below hero; review carousel mid-page; insurance/police lines repeated near every CTA.
5. **Objection blocks**: "What's included / not included" on every service page; "How we price" on `/services` index; "What if I'm not happy?" in FAQ.
6. **Quote form**: progressive disclosure — step 1 (suburb postcode + bedrooms) is enough to commit. Each step persists to `localStorage` so refresh doesn't lose data. Honeypot anti-spam, no CAPTCHA on first iteration.
7. **Phone tracking**: TODO — confirm whether you want CallRail / dynamic insertion. Default: static `tel:` with click event sent to GA.
8. **Bounce reduction**: kill the dead `/book` link sitewide; add hover prefetch on CTAs (already enabled globally — leave on).
9. **Lead quality**: form requires postcode → instantly filters out-of-area. Show "We don't currently serve {postcode} but can refer a partner" gracefully.
10. **Highest-leverage sections**: hero CTA, sticky mobile bar, service-page "what's included" + price panel, location-page local intro, final CTA on every page.

---

## 12. SEO-Safe Rebuild Plan

**URL preservation** — current live WordPress URLs (from footer in `site.ts`) follow patterns like `/cleaners-byron-bay`, `/house-cleaning-geelong`, `/service-house-cleaning`. We will:
- Adopt clean URL pattern: `/locations/byron-bay`, `/services/house-cleaning`.
- Add `301` redirects from every legacy URL to the new one. Use Astro's redirects config in `astro.config.mjs` (`redirects: { '/cleaners-byron-bay': '/locations/byron-bay', ... }`).
- ASSUMPTION: I'll generate the redirect map from `footerLocations` + `footerServiceLinks` automatically and confirm before publish.

**Metadata**
- Per-page `<title>` and `<meta description>` defined in `site.ts` (or per-route data file).
- Canonical already handled by `Layout.astro` — verify it doesn't double-trail-slash.

**Heading discipline**: one h1 per page. h2 for major sections. h3 for sub-blocks. Never skip levels.

**Internal linking**: defined in §8 (every service ↔ 3 locations + 2 services; every location ↔ all services + 3 neighbours).

**Schema improvements**
- `LocalBusiness` on home with `areaServed` array of all states.
- `Service` schema on each `/services/[slug]`.
- `LocalBusiness` (or `Place`) per `/locations/[slug]` with `City` + GPS where known.
- `BreadcrumbList` on every non-home page.
- `AggregateRating` on home, `/reviews`, `/about` (4.9 / 5 from 500+).
- `FAQPage` on home + each service + each FAQ block.
- `BlogPosting` on resource pages.

**Image SEO**: descriptive `alt`, kebab-case filenames, `<picture>` with AVIF/WebP fallbacks, lazy except hero.

**Local SEO**: per-suburb intros (≥150 unique words), GPS coordinates if available, `sameAs` array on `LocalBusiness` with social URLs from `site.ts`.

**Indexation safeguards**: `noindex` on `/quote` thank-you page, `/account`, internal-only routes. `robots.txt` allows all, sitemap auto-generated by `@astrojs/sitemap`.

**E-E-A-T**: founder bio with credentials (RN), real team photos, real review screenshots, ABN/legal name in footer.

---

## 13. Astro Architecture Plan

```
src/
  components/
    ui/                Button.astro, Badge.astro, Card.astro,
                       Eyebrow.astro, Icon.astro
    layout/            Section.astro, Container.astro, Grid.astro,
                       StickyMobileBar.astro
    sections/          Hero.astro, ServiceHero.astro, LocationHero.astro,
                       TrustStrip.astro, ReviewsBlock.astro,
                       PricingTiles.astro, WhatsIncluded.astro,
                       HowItWorks.astro, FoundersBlock.astro,
                       FAQBlock.astro, FinalCTA.astro,
                       LocationsPreview.astro, RelatedServices.astro,
                       NeighborhoodLinks.astro
    seo/               Head.astro, Schema.astro, BreadcrumbList.astro
    forms/             QuoteForm.astro (progressive)
  layouts/
    Base.astro         (replaces Layout.astro; same external API)
    PageLayout.astro   (Base + breadcrumbs + final CTA slot)
  pages/
    index.astro
    about/
      index.astro
      team.astro
      eco.astro
    services/
      index.astro
      [slug].astro
    locations/
      index.astro
      [slug].astro
    quote.astro
    contact.astro
    reviews.astro
    faqs.astro
    career.astro
    resources/
      index.astro
      [...slug].astro
    legal/
      privacy.astro
      terms.astro
      cookies.astro
      collection-notice.astro
  content/
    resources/         (.mdx, content collection)
    config.ts          (collection schema)
  data/
    site.ts            (current; refactor to add seo per route)
    locations.ts       (expand to include intro, gps, neighbours)
    services.ts        (split service-specific data out of site.ts)
    redirects.ts       (legacy → new map)
  styles/
    tokens.css         (NEW — all design tokens)
    global.css         (resets + base + minimal utilities)
  scripts/
    sticky-bar.ts      (≤1KB, only on mobile)
```

**Layout strategy**: single `Base.astro` for `<head>` + `<TopBar>` + `<Header>` + `<Footer>`; `PageLayout.astro` adds breadcrumbs + final-CTA slot for inner pages.

**Routing**: file-based; locations + services use `getStaticPaths` from `data/*.ts`.

**Content collections**: only for `resources/` (MDX). Locations/services stay as TS for now — easier to refactor than MDX while iterating.

**SEO components**: `<Head>` exposes typed props; `<Schema>` accepts JSON; both used by `Base.astro`.

**Image handling**: Astro `<Image>` from `astro:assets` for all photos; `formats: ['avif', 'webp']`; widths `[640, 960, 1280, 1920]`; `loading="lazy"` default, `eager` only on LCP.

**Fonts**: self-host Poppins 300/400/500/600 latin subset via `@fontsource-variable/poppins` (`font-display: swap`, preloaded). Drop the Google Fonts `<link>`.

**CSS**: Tailwind v4 `@theme` for tokens (already in place — extend it). Component-scoped CSS in each Astro file. No CSS-in-JS, no styled-components.

**JS hydration**: zero client JS by default. Mobile menu toggle (current inline script — keep, ~30 lines). Sticky bar via vanilla JS in `scripts/`. No framework islands needed yet.

**Forms**: server endpoint at `src/pages/api/quote.ts` posting to provider TBD (Formspree/Resend/Netlify). Progressive enhancement — works without JS via plain POST.

**Analytics**: GA4 via `<script async>` in `Base.astro`, gated by `import.meta.env.PROD`.

**Animation**: `IntersectionObserver` reveal class + CSS transition; respects `prefers-reduced-motion`.

**Performance budget**: ≤80KB CSS, ≤30KB JS gzip, LCP <2s on 4G, CLS <0.05, INP <200ms.

---

## 14. Claude Code Execution Plan

**Milestone 0 — repo hygiene** (15 min, low risk)
- Delete `1776911593-qw8baqr8.tar.gz` (3.1 GB), `extracted-backup/`, `elementor-exports/` (move outside repo).
- Confirm with you first; back them up if you want them retained.

**Milestone 1 — design tokens & primitives** (½ day)
1. Create `src/styles/tokens.css` per §7. Import into `global.css`.
2. Build `Button.astro`, `Container.astro`, `Section.astro`, `Eyebrow.astro`, `Card.astro`, `Badge.astro`.
3. Visual smoke test in `/test-tokens.astro` (delete after).
**Validation**: pixel diff of homepage at 360/768/1280; ensure no regression.

**Milestone 2 — global chrome** (½ day)
4. Refactor `Header.astro` to use new tokens + add desktop rating chip + mobile hamburger keyboard-trap.
5. Refactor `Footer.astro` to use tokens.
6. Add `StickyMobileBar.astro`.
7. Self-host Poppins; remove Google Fonts `<link>`.
**Validation**: Lighthouse on home — perf score ≥95 mobile.

**Milestone 3 — homepage rebuild** (1 day)
8. Replace home sections with new ones per §9 (in order). Old components stay in `components/legacy/` until old pages migrate.
9. Fill `<Hero>` with real copy and AVIF image.
10. Replace dead `/book` links with `/quote`.
**Validation**: side-by-side screenshot review; confirm brand still feels familiar.

**Milestone 4 — service template** (1 day)
11. Build `pages/services/[slug].astro` with new template (§10A).
12. Fill `services.ts` with per-service copy (use existing `site.ts.pricingCards` + extend with what's-not-included, FAQ).
13. Add `Service` + `BreadcrumbList` schema.
**Validation**: visit all 6 service URLs, confirm unique copy + working CTAs.

**Milestone 5 — location template + redirects** (1.5 days)
14. Expand `locations.ts` with 31 entries: `slug`, `name`, `state`, `intro` (150-word unique), `neighbors`, optional `gps`.
15. Build `pages/locations/[slug].astro` (§10B) and `pages/locations/index.astro`.
16. Generate `redirects.ts` mapping all legacy `/cleaners-*` and `/house-cleaning-*` URLs → new URLs. Wire into `astro.config.mjs`.
17. Update sitemap config to include new routes.
**Validation**: hit 5 legacy URLs, confirm 301 to new URL with new content.

**Milestone 6 — quote / contact / about / faqs / reviews** (1 day)
18. Build `/quote` with progressive form + API endpoint stub.
19. Build `/contact` with map embed + phone-priority.
20. Rebuild `/about`, add `/about/team`, `/about/eco`.
21. Build `/reviews` and `/faqs` pages (full lists).
**Validation**: form submission round-trips; all internal links resolve.

**Milestone 7 — legal & resources scaffolding** (½ day)
22. Stub `/legal/*` pages (placeholder content + your existing policy text TBD).
23. Set up `content/resources/` collection with one demo MDX post.
**Validation**: collection loads, MDX renders.

**Milestone 8 — perf & a11y pass** (½ day)
24. Lighthouse run on each template; fix any score <95.
25. axe-core scan; fix violations.
26. Manual keyboard pass on header/menu/forms.
**Validation**: Lighthouse all ≥95; axe 0 serious issues.

**Commit structure**: one commit per milestone, conventional-commit prefix (`feat:`, `refactor:`, `chore:`).

**Rollback safety**: tarball already saved (`naturo-site-restored-20260423-205436.tar.gz`); each milestone is a single commit so we can revert cleanly.

**Per-milestone follow-up prompts** (you'd send these to me one at a time):
- M1: "Implement tokens + primitives per Phase 7 of the blueprint."
- M3: "Rebuild homepage per Phase 9, preserve all copy in `site.ts`."
- M5: "Generate location pages and redirects map; show me the redirect map for review before writing it."

---

## 15. Performance / Accessibility / Mobile Standards

**Performance budget**
- LCP ≤ 2.0s on simulated 4G mobile.
- CLS ≤ 0.05.
- INP ≤ 200ms.
- Total CSS ≤ 80KB gzip; total JS ≤ 30KB gzip.
- Hero image AVIF, ≤120KB at 1280w.
- Self-hosted Poppins subset, ≤30KB total fonts.

**Accessibility standards**
- WCAG 2.2 AA throughout.
- All text ≥ 4.5:1 contrast (re-test `--c-slate` over `--c-cream`).
- Focus rings visible on every interactive element (`:focus-visible` outline).
- Skip-to-content link as first focusable.
- Form labels always present (no placeholder-only).
- Tap targets ≥ 48×48px.
- `prefers-reduced-motion` disables animations and parallax.
- All images have meaningful `alt` (or `alt=""` if decorative).
- Header dropdowns open on `:focus-within` and `aria-expanded` toggled.

**Mobile UX**
- Sticky bottom bar with Quote + Call.
- Hero h1 stays ≥ 32px.
- Single-column layouts below 768px.
- Touch-friendly accordion for FAQ (native `<details>`).
- Phone link uses `tel:` and tracks click event.

---

## 16. Trust System

| Module | Where it lives | Source |
|---|---|---|
| Rating chip | Header desktop, hero strip | `4.9 ★ Google · 500+ reviews` (verify count) |
| Credentials strip | Below hero on every template | "Police-checked · Fully insured · Satisfaction guaranteed" |
| Reviews carousel | Home + each service + each location | `site.ts.testimonials` |
| Founder block | Home + /about | Existing Anna copy + nursing credential |
| Provider logos | Home (single strip) + /about | `site.ts.providers` |
| NDIS/DVA badges | Service page hero (where relevant) | New `<Badge>` component |
| Eco proof | Hero sub + /about/eco | "Non-toxic, child- and pet-safe products" |
| Local proof | Each location page | "Serving {Suburb} since {year}" — TODO: confirm year |
| Guarantee | FAQ + final CTA | "If something's missed, we'll come back within 48 hours and fix it." — TODO: confirm exact policy |
| Insurance proof | About page | Public liability $20M — TODO: confirm |

---

## 17. Content Framework

**Tone**: warm-professional. Direct, never salesy. Australian English (`-ise`, `colour`, `realised`).

**Headline style**: short, declarative, benefit-led.
- ✅ "Eco-friendly house cleaning, trusted across Australia."
- ❌ "We are the leading provider of premium cleaning solutions."

**CTA style**: verb-first, outcome-led.
- ✅ "Get an instant quote", "Book a clean", "Call us now"
- ❌ "Submit", "Click here", "Learn more"

**Body rules**: max 18 words per sentence; one idea per paragraph; lists for ≥3 items; no jargon without explanation.

**Local SEO writing rules** (per location page)
- 150–250 words unique per suburb.
- Mention 2–3 real local landmarks/areas where natural.
- Avoid copy-paste templated paragraphs.
- Pattern: "Cleaners in {Suburb}" h1 → 1 sentence on the suburb → 2 sentences on what we offer there → CTA.

**Homepage headline options**
1. "Eco-friendly house cleaning, trusted across Australia."
2. "Cleaner homes, kinder products, real care."
3. "Australia's nurse-led, eco-friendly cleaning service."

**CTA copy options**
- Primary: "Get an instant quote", "See your price in 60 seconds"
- Secondary: "Call 1300 876 472", "Talk to us"

**Trust badge copy**
- "Police-checked cleaners"
- "Fully insured ($20M public liability)" — TODO: verify
- "Satisfaction guaranteed — we'll fix it within 48 hrs" — TODO: verify
- "NDIS, Aged Care & DVA approved"
- "Eco-friendly, non-toxic products"

**FAQ ideas to add**
- "Do you bring your own products?" (yes — already covered)
- "What if I need to reschedule?"
- "How do you choose your cleaners?"
- "Are you available on weekends?"
- "How much notice do you need?"

**Footer CTA direction**: keep current footer info-dense; add a single warm sentence above the contact column ("Book in under 60 seconds — or chat to a real human on 1300 876 472.").

---

## 18. Immediate Priority Actions

If you approve the blueprint, the order I'd start in:

1. **Confirm scope** — say "approved, start at Milestone 0" (or "skip M0, start at M1").
2. **Confirm assumptions** — verify or correct: 4.9★ rating + 500+ reviews count; insurance amount; satisfaction-guarantee policy; quote form delivery target (Formspree / Netlify / API endpoint); whether real photography exists or we proceed with stylised fallbacks; whether legacy WordPress URLs should 301 to new clean URLs (yes recommended) or be preserved as-is.
3. **Confirm content gaps** — I'll need: real per-suburb intros (or permission to draft them), team photos (or permission to use placeholder), NDIS provider number if you want it on credentials, ABN.
4. **Pick first cut**: I recommend M0 + M1 + M2 in one session (≈1.5 days work) — gets the design system and chrome in place without touching pages, so we can preview and adjust before any page rebuild.

I won't touch a file until you give the go-ahead. When you do, I'll move milestone by milestone, screenshot-verify each one, and pause for your sign-off before continuing.
