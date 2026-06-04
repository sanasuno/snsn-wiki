
import { defineConfig } from 'astro/config';
import { locales, defaultLocale } from './src/i18n/i18n.config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

const DEFAULT_SITE_URL = 'http://localhost:4321';
const SITE_URL = process.env.SITE_URL || DEFAULT_SITE_URL;
if (process.env.NODE_ENV !== 'development' && SITE_URL === DEFAULT_SITE_URL) {
  throw new Error('[astro.config] SITE_URL must be configured in production');
}
const BASE_PATH = process.env.BASE_PATH || '/';
if (!BASE_PATH.startsWith('/')) {
  throw new Error('[astro.config] BASE_PATH must start with /');
}

// https://astro.build/config
export default defineConfig({
  integrations: [
    mdx(),
    sitemap({
      i18n: {
        defaultLocale: defaultLocale,
        locales: Object.fromEntries(locales.map((loc) => [loc, loc]))
      }
    })
  ],
  site: SITE_URL,
  base: BASE_PATH,
  i18n: {
    locales: locales,
    defaultLocale: defaultLocale,
    routing: {
      prefixDefaultLocale: true
    }
  }
});