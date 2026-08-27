// @ts-check
import { readFileSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// ---------------------------------------------------------------------------
// Real `lastmod` dates for the sitemap.
//
// We previously stamped every URL with `new Date()` at build time, so all 148
// entries claimed the same timestamp and it moved on every deploy — including
// for pages whose content had not changed in months. Google's guidance is that
// an inaccurate lastmod gets the signal ignored site-wide, so a uniform build
// stamp is worse than no date at all.
//
// Now: suburb pages use their own `contentUpdated`, blog posts use their
// updated/published date, and anything without a real date omits lastmod
// rather than inventing one.
//
// Parsed with a regex rather than imported because this config is .mjs and the
// data files are TypeScript.
// ---------------------------------------------------------------------------
function dateMap() {
  const map = new Map();
  try {
    const suburbs = readFileSync('./src/data/suburbs.ts', 'utf8');
    const entryRe = /slug:\s*'([^']+)'[\s\S]*?(?=\n    slug:\s*'|$)/g;
    let m;
    while ((m = entryRe.exec(suburbs))) {
      const updated = /contentUpdated:\s*'(\d{4}-\d{2}-\d{2})'/.exec(m[0]);
      if (updated) map.set('/' + m[1] + '/', updated[1]);
    }
  } catch {
    /* data file unreadable — fall through to no dates */
  }
  try {
    const posts = readFileSync('./src/data/posts.ts', 'utf8');
    const entryRe = /slug:\s*'([^']+)'[\s\S]*?(?=\n    slug:\s*'|$)/g;
    let m;
    while ((m = entryRe.exec(posts))) {
      const upd = /updatedDate:\s*'(\d{4}-\d{2}-\d{2})'/.exec(m[0]);
      const pub = /publishedDate:\s*'(\d{4}-\d{2}-\d{2})'/.exec(m[0]);
      const d = (upd && upd[1]) || (pub && pub[1]);
      if (d) map.set('/resource/' + m[1] + '/', d);
    }
  } catch {
    /* ditto */
  }
  try {
    // Top-level service pages. Only entries that declare contentUpdated get a
    // lastmod, so a service page that has not changed stays undated rather
    // than claiming a freshness it does not have.
    const details = readFileSync('./src/data/serviceDetail.ts', 'utf8');
    const entryRe = /^  '([\w-]+)':\s*\{[\s\S]*?(?=^  '[\w-]+':\s*\{|^\};)/gm;
    let m;
    while ((m = entryRe.exec(details))) {
      const upd = /contentUpdated:\s*'(\d{4}-\d{2}-\d{2})'/.exec(m[0]);
      if (upd) map.set('/services/' + m[1] + '/', upd[1]);
    }
  } catch {
    /* ditto */
  }
  return map;
}

const LASTMOD = dateMap();

export default defineConfig({
  site: 'https://naturogroup.com.au',
  integrations: [
    sitemap({
      filter: (page) => {
        // Always exclude utility / noindex pages.
        if (page.includes('/thank-you') || page.includes('/404')) return false;

        // Exclude the auto-generated service×suburb matrix pages
        // (/services/house-cleaning/<suburb>, /services/end-of-lease/<suburb>,
        // /services/deep-clean/<suburb>).  These 237 template-driven pages
        // are crawled but not indexed by Google — they signal thin content and
        // consume crawl budget that should go to our richer suburb and
        // dedicated-service pages.  We keep the top-level service pages
        // (/services/house-cleaning, /services/end-of-lease, etc.) in the
        // sitemap; only the sub-suburb variants are excluded.
        const serviceSuburbPattern = /\/services\/(house-cleaning|end-of-lease|deep-clean)\/.+/;
        if (serviceSuburbPattern.test(page)) return false;

        return true;
      },
      // changefreq and priority are deliberately omitted: Google has stated it
      // ignores both, and every URL previously carried an identical
      // 'weekly' / 0.7 pair, which conveyed nothing anyway.
      serialize(item) {
        const path = new URL(item.url).pathname;
        const d = LASTMOD.get(path);
        if (d) item.lastmod = d + 'T00:00:00.000Z';
        else delete item.lastmod;
        delete item.changefreq;
        delete item.priority;
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    inlineStylesheets: 'auto',
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
});
