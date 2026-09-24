/**
 * astro.config.ts
 * Astroの設定ファイル
 */
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import { siteConfig } from './src/site.config';
import { t, locales, defaultLocale } from './src/i18n/i18n.config';

// siteConfig.url の検証と正規化
let site: string;
try {
    site = new URL(siteConfig.url).toString().replace(/\/+$/, '');
} catch (error) {
    throw new Error(
        '[site.config] url is invalid',
        { cause: error }
    );
}

// siteConfig.basePath の検証と正規化
if (!siteConfig.basePath.startsWith('/')) {
    throw new Error(
        '[site.config] basePath must start with "/"'
    );
}
const base = siteConfig.basePath.replace(/\/+$/, '') || '/';

// https://astro.build/config
export default defineConfig({
    site,
    base,
    i18n: {
        locales,
        defaultLocale,
        routing: {
            prefixDefaultLocale: true
        }
    },

    integrations: [
        mdx(),
        sitemap({
            i18n: {
                defaultLocale,
                locales: Object.fromEntries(locales.map(locale => [locale, t('lang.locale', locale)]))
            }
        })
    ]
});