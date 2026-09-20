/**
 * @lib/slug.ts
 * スラッグ関連のユーティリティ関数
 */
import type { Locale } from '@i18n/i18n.config';
import { isLocale } from "@lib/locale";
/**
 * ページIDをロケールと生のベーススラッグに分割する関数
 * @param pageId ページID (例: "en/example-page")
 * @returns ロケールと生のベーススラッグのオブジェクト
 * @throws Invalid id formatエラー
 */
export function dividePageId(pageId: string): {locale: Locale, rawBaseSlug: string} {
    const parts = pageId.split('/');
    if (isLocale(parts[0])) {
        return {
            locale: parts[0],
            rawBaseSlug: parts.slice(1).join('/')
        };
    }
    throw new Error(`[Invalid id format] ${pageId}`);
}

/**
 * スラッグを正規化する関数
 * @param rawSlug 正規化するスラッグ
 * @returns 正規化されたスラッグ
 */
export function normalizeSlug(rawSlug: string): string {
    const normalized = rawSlug.normalize('NFKC').toLowerCase().trim();
    return normalized === 'index'
        ? ''
        : normalized.replace(/\/index$/, '');
}