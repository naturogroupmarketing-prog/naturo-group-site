// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

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
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
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
