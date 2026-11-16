/**
 * astro.config.ts
 * Astroの設定ファイル
 */
import { defineConfig } from 'astro/config';

import { siteConfig } from './src/site.config';
import { translations, defaultLocale } from './src/i18n/i18n.config';

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import { remarkWikiLinks } from './src/lib/wikilink';

// siteConfig.url の検証と正規化
const rawUrl = process.env.SITE_URL ?? siteConfig.url;
let site: string;
try {
    site = new URL(rawUrl).toString().replace(/\/+$/, '');
} catch (error) {
    throw new Error(
        '[site.config] url is invalid',
        { cause: error }
    );
}

if (new URL(site).hostname === 'example.com' && process.argv.includes('build')) {
    console.warn('[site.config] url is still "example.com". canonical / OGP / sitemap will be wrong.');
}

// siteConfig.basePath の検証と正規化
if (!siteConfig.basePath.startsWith('/')) {
    throw new Error(
        '[site.config] basePath must start with "/"'
    );
}
const base = siteConfig.basePath.replace(/\/+$/, '') || '/';

const locales = Object.keys(translations);

const relativePath = (page: string) =>
    new URL(page).pathname.slice(base === '/' ? 1 : base.length + 1).replace(/^\/|\/$/g, '');

// https://astro.build/config
export default defineConfig({
    site,
    base,
    trailingSlash: 'always',
    markdown: {
        remarkPlugins: [
            [remarkWikiLinks, { base: base === '/' ? '' : base}],
        ],
        shikiConfig: {
            themes: { light: 'github-light', dark: 'github-dark' },
        },
    },
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
            filter: (page) => {
                const path = relativePath(page);
                return !/(^|\/)404$/.test(path) && path !== '' && !locales.includes(path);
            },
            i18n: {
                defaultLocale,
                locales: Object.fromEntries(locales.map(locale => [locale, locale]))
            }
        })
    ]
});