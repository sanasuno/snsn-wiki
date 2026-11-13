/**
 * @lib/tags.ts
 * タグ関連のユーティリティ関数
 */
import type { CollectionEntry } from 'astro:content';
import type { Locale } from '@lib/i18n';
import { getUniquePagesByLocale } from '@lib/pages';

type WikiPage = CollectionEntry<'wiki'>;

/**
 * ロケール向けに一意化したページから、タグ→ページ配列のMapを作る関数
 * @param pages ページ配列
 * @param locale ロケール
 * @returns タグ→ページ配列のMap
 */
export function getTagMap(pages: WikiPage[], locale: Locale): Map<string, WikiPage[]> {
    const map = new Map<string, WikiPage[]>();
    for (const page of getUniquePagesByLocale(pages, locale)) {
        for (const tag of page.data.tags) {
            const list = map.get(tag) ?? [];
            list.push(page);
            map.set(tag, list);
        }
    }
    return map;
}