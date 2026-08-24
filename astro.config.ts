/**
 * astro.config.ts
 * Astroの設定ファイル
 */
import { defineConfig } from 'astro/config';
import { t, locales, defaultLocale } from './src/i18n/i18n.config';

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';


// siteの設定
const devSiteUrl = 'http://localhost:4321';
let site: string;
try {
    // 環境変数またはデフォルト値からURLオブジェクトを生成し、文字列化して末尾のスラッシュを削除
    site = new URL(process.env.SITE_URL ?? devSiteUrl).toString().replace(/\/+$/, '');
} catch {
    throw new Error('[astro.config] SITE_URL is a invalid URL');
}
// 本番環境で開発用URLが使用されていないか検証
if (process.env.PROD === 'true' && site === devSiteUrl) {
    throw new Error('[astro.config] SITE_URL must be configured in production');
}

// baseの設定
// 環境変数またはデフォルト値からパスを取得
const basePath = process.env.BASE_PATH ?? '/';
// 先頭がスラッシュでない場合はエラーを投げる
if (!basePath.startsWith('/')) {
    throw new Error('[astro.config] BASE_PATH must start with "/"');
}
// 末尾のスラッシュを削除して代入（結果がnullならデフォルト値を使用）
const base = basePath.replace(/\/+$/, '') ?? '/';

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