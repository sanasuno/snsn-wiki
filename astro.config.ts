/**
 * astro.config.ts
 * Astroの設定ファイル
 */
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import { t, locales, defaultLocale } from './src/i18n/i18n.config';

const devSiteUrl = 'http://localhost:4321';

/**
 * サイトのorigin URLを取得する関数
 * @returns SITE_URL
 */
function getSiteUrl(): string {
    const value = process.env.SITE_URL ?? devSiteUrl;
    try {
        return new URL(value).toString().replace(/\/+$/, '');
    } catch (error) {
        throw new Error(
            '[astro.config] SITE_URL is an invalid URL',
            { cause: error }
        );
    }
}

/**
 * 配信パスを取得する関数
 * @returns BASE_PATH
 */
function getBasePath(): string {
    const value = process.env.BASE_PATH ?? '/';
    // 先頭がスラッシュでない場合はエラーを投げる
    if (!value.startsWith('/')) {
        throw new Error('[astro.config] BASE_PATH must start with "/"');
    }
    // 末尾のスラッシュを削除し、空文字になった場合は'/'を返す
    return value.replace(/\/+$/, '') || '/';
}

const site = getSiteUrl();
const base = getBasePath();

// 本番ビルド時に開発用URLが使用されていないか検証
const isBuildCommand = process.argv.includes('build');
if (isBuildCommand && site === devSiteUrl) {
    throw new Error('[astro.config] SITE_URL must be configured in production');
}

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