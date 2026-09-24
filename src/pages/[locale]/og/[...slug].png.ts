/**
 * ./src/pages/[locale]/og/[...slug].png.ts
 * OGP 画像配信エンドポイント
 */
import type { APIRoute, GetStaticPaths } from 'astro';
import { resolveWikiPages } from '@lib/pages';
import { getTranslatedCategory } from '@lib/category';
import { renderOgImage } from '@lib/og-image';
import { t, locales } from '@i18n/i18n.config';

export const prerender = true;

export const getStaticPaths = (async () => {
    const resolvedPages = await resolveWikiPages();
    const wikiPaths = resolvedPages.map(({ locale, normalizedSlug, page }) => {
        const category = getTranslatedCategory(page.id, locale, page.data.isSubPage);
        return {
            params: {
                locale,
                slug: normalizedSlug === '' ? 'wiki' : `wiki/${normalizedSlug}`,
            },
            props: {
                title: page.data.title,
                description: page.data.description,
                category,
                siteName: t('site.title', locale),
                font: t('og.font', locale),
            },
        };
    });

    const fallbackPaths = locales.map((locale) => ({
        params: {
            locale,
            slug: 'index'
        },
        props: {
            title: t('site.title', locale),
            description: t('site.description', locale),
            category: undefined,
            siteName: t('site.title', locale),
            font: t('og.font', locale),
        },
    }));
    return [...wikiPaths, ...fallbackPaths];
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
    const { title, description, category, siteName, font } = props as { title: string; description?: string; category?: string; siteName: string; font: string };
    const png = await renderOgImage({ title, description, category, siteName, font });
    return new Response(new Uint8Array(png), {
        headers: {
            'Content-Type': 'image/png',
            'Cache-Control': 'public, max-age=31536000, immutable',
        },
    });
};