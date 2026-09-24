/**
 * @lib/pages.ts
 * ページ関連のユーティリティ関数
 */

import { getCollection, type CollectionEntry } from 'astro:content';
import { locales, defaultLocale, type Locale } from '@i18n/i18n.config';
import { getLocale, getRawSlug, getNormalizedSlug, normalizeSlugLike } from '@lib/path';

/**
 * リゾルブされたウィキページ情報
 * - locale: ページのロケール
 * - normalizedSlug: 正規化されたスラッグ
 * - page: ページデータ
 * - isFallback: フォールバックページかどうか
 */
export interface ResolvedWikiPage {
    locale: Locale;
    normalizedSlug: string;
    page: CollectionEntry<'wiki'>;
    isFallback: boolean;
}

/**
 * ウィキページをリゾルブする関数
 * @returns リゾルブされたウィキページ情報の配列
 */
export async function resolveWikiPages(): Promise<ResolvedWikiPage[]> {
    const wikiPages = await getCollection('wiki', (page) => !page.data.draft);

    const pagesBySlugLocale: Record<string, Partial<Record<Locale, CollectionEntry<'wiki'>>>> = {};
    const normalizedIdOwners: Record<string, Set<string>> = {};

    for (const page of wikiPages) {
        const locale = getLocale(page.id);
        const normalizedSlug = getNormalizedSlug(page.id);
        if (!pagesBySlugLocale[normalizedSlug]) {
            pagesBySlugLocale[normalizedSlug] = {};
        }
        pagesBySlugLocale[normalizedSlug][locale] = page;

        const normalizedId = normalizeSlugLike(page.id);
        if (!normalizedIdOwners[normalizedId]) {
            normalizedIdOwners[normalizedId] = new Set();
        }
        normalizedIdOwners[normalizedId].add(page.id);
    }

    for (const [normalizedId, owners] of Object.entries(normalizedIdOwners)) {
        if (owners.size > 1) {
            throw new Error(`[wiki routing] Multiple owners for normalized ID "${normalizedId}": ${Array.from(owners).join(', ')}`);
        }
    }

    const resolved: ResolvedWikiPage[] = [];
    for (const normalizedSlug of Object.keys(pagesBySlugLocale)) {
        const availablePages = pagesBySlugLocale[normalizedSlug];
        for (const locale of locales) {
            const isFallback = !availablePages[locale];
            const page = availablePages[locale]
                ?? availablePages[defaultLocale]
                ?? locales.map((loc) => availablePages[loc]).find(
                    (p): p is CollectionEntry<'wiki'> => p !== undefined
                );
            if (!page) {
                throw new Error(`[wiki routing] No page found for slug "${normalizedSlug}"`);
            }
            resolved.push({ locale, normalizedSlug, page, isFallback});
        }
    }
    return resolved;
}

/**
 * ロケールごとにページを一意にフィルタリングする関数
 * @param pages ページリスト
 * @param locale ロケール
 * @returns 一意にフィルタリングされたページリスト
 */
export function getUniquePagesByLocale( pages: CollectionEntry<'wiki'>[], locale: Locale ): CollectionEntry<'wiki'>[] {
    const uniquePages: Record<string, CollectionEntry<'wiki'>> = {};

    for (const page of pages) {
        const pLocale = getLocale(page.id);
        const baseSlug = getRawSlug(page.id);

        if (!uniquePages[baseSlug]) {
            uniquePages[baseSlug] = page;
        } else if (pLocale === locale) {
            uniquePages[baseSlug] = page;
        }
    }
    return Object.values(uniquePages);
}