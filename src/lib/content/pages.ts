/**
 * @lib/content/pages.ts
 * ページ関連のユーティリティ関数
 */

import type { Locale } from "@i18n/i18n.config";
import type { CollectionEntry } from "astro:content";

/**
 * ロケールごとにページを一意にフィルタリングする関数
 * @param pages ページリスト
 * @param locale ロケール
 * @returns 一意にフィルタリングされたページリスト
 */
export function getUniquePagesByLocale( pages: CollectionEntry<'wiki'>[], locale: Locale ): CollectionEntry<'wiki'>[] {
    const uniquePages: Record<string, CollectionEntry<'wiki'>> = {};

    for (const page of pages) {
        const parts = page.id.split('/');
        const pLocale = parts[0];
        const baseSlug = parts.slice(1).join('/');

        if (!uniquePages[baseSlug]) {
            uniquePages[baseSlug] = page;
        } else if (pLocale === locale) {
            uniquePages[baseSlug] = page;
        }
    }
    return Object.values(uniquePages);
}