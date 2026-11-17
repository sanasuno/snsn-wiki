/**
 * astro.config.ts
 * Astroの設定ファイル
 */
import { defineConfig } from 'astro/config';

import { siteConfig } from './src/site.config';
import { translations, defaultLocale } from './src/i18n/i18n.config';

import { remarkWikiLinks } from './src/lib/wikilink';
import { buildCache } from './src/lib/slug';

import mdx from '@astrojs/mdx';
import { satteri } from '@astrojs/markdown-satteri';
import sitemap from '@astrojs/sitemap';

// ---- siteConfig.url の検証と正規化 ----
// 環境変数または設定ファイルから生のURLを取得
const rawUrl = process.env.SITE_URL ?? siteConfig.url;
let site: string;
try {
    // URLとして検証し、末尾のスラッシュを除去して正規化
    site = new URL(rawUrl).toString().replace(/\/+$/, '');
} catch (error) {
    throw new Error(
        '[site.config] url is invalid',
        { cause: error }
    );
}
// ビルド時にホスト名が 'example.com' の場合に警告を表示
if (new URL(site).hostname === 'example.com' && process.argv.includes('build')) {
    console.warn('[site.config] url is still "example.com". canonical / OGP / sitemap will be wrong.');
}

// ---- siteConfig.basePath の検証と正規化 ----
const rawBase = process.env.BASE_PATH ?? siteConfig.basePath
if (!rawBase.startsWith('/')) {
    throw new Error(
        '[site.config] basePath must start with "/"'
    );
}
const base = rawBase.replace(/\/+$/, '') || '/';

// ---- ロケール一覧の取得 ----
const locales = Object.keys(translations);

// ---- 相対パスの取得 ----
// ベースパスを基準にした相対パスとしてのページのパス
const relativePath = (page: string) => {
    const pathname = new URL(page).pathname;
    const prefix = base === '/' ? '/' : `${base}/`;
    if (!pathname.startsWith(prefix) && pathname !== base) {
        throw new Error(`Page is outside base path: ${page}`);
    }
    return pathname
        .slice(base === '/' ? 1 : base.length + 1)
        .replace(/^\/|\/$/g, '');
};

// https://astro.build/config
export default defineConfig({
    site,
    base,
    trailingSlash: 'always',
    markdown: {
        processor: satteri({
            mdastPlugins: [
                remarkWikiLinks({ base }),
            ],
        }),
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
                if (/(^|\/)404$/.test(path) || path === '' || locales.includes(path)) return false;
                const m = path.match(/^([^/]+)\/wiki(?:\/(.*))?$/);
                if (m) {
                    return buildCache().slugs.has(`${m[1]}/${decodeURIComponent(m[2] ?? '')}`);
                }
                return true;
            },
            i18n: {
                defaultLocale,
                locales: Object.fromEntries(locales.map(locale => [locale, locale]))
            }
        })
    ]
});