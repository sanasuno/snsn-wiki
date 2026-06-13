/**
 * @srcipts/pages.ts
 */

/**
 * ロケールに基づいたベーススラッグごとのユニークページを取得する
 * @param pages - 全ページ
 * @param locale - 現在のロケール
 * @returns ベーススラッグごとのユニークページ
 */
import type { Locale } from "@i18n/i18n.config";
export function getUniquePagesByLocale(pages: any[], locale: Locale) {
    const uniquePagesByBaseSlug: Record<string, (typeof pages)[0]> = {};
    for (const page of pages) {
        const parts = page.id.split('/');
        const pLocale = parts[0];
        const baseSlug = parts.slice(1).join('/');
        if (!uniquePagesByBaseSlug[baseSlug]) {
            uniquePagesByBaseSlug[baseSlug] = page;
        } else if (pLocale === locale) {
            uniquePagesByBaseSlug[baseSlug] = page;
        }
    }
    return Object.values(uniquePagesByBaseSlug);
}