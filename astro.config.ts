/**
 * astro.config.ts
 * Astroの設定ファイル
 */
import { defineConfig } from 'astro/config';

// siteの設定
const devSiteUrl = 'http://localhost:4321';
let site: string;
try {
    site = new URL(process.env.SITE_URL ?? devSiteUrl).toString().replace(/\/+$/, '');
} catch {
    throw new Error('[astro.config] SITE_URL is a invalid URL');
}
if (process.env.PROD === 'true' && site === devSiteUrl) {
    throw new Error('[astro.config] SITE_URL must be configured in production');
}

// baseの設定
const basePath = process.env.BASE_PATH ?? '/';
if (!basePath.startsWith('/')) {
    throw new Error('[astro.config] BASE_PATH must start with "/"');
}
const base = basePath.replace(/\/+$/, '') ?? '/';

// https://astro.build/config
export default defineConfig({
    site,
    base
});
