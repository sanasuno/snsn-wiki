/**
 * ./src/pages/og/[locale]/[...slug].png.ts
 * OGP 画像配信エンドポイント
 */
import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { dividePageId, getNormalizedSlug } from '@lib/path';
import { getTranslatedCategory } from '@lib/category';
import { renderOgImage } from '@lib/og-image';
import { t } from '@i18n/i18n.config';

export const prerender = true;

export const getStaticPaths = (async () => {
    const wikiPages = await getCollection('wiki');
    return wikiPages.map((page) => {
        const locale = dividePageId(page.id).locale;
        const normalizedSlug = getNormalizedSlug(page.id);
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