/**
 * @lib/locale.ts
 * ロケール関連のユーティリティ関数
 */

import { locales, type Locale } from "@i18n/i18n.config";

/**
 * 文字列が有効なロケールかどうかを判定する関数
 * @param value 判定する文字列
 * @returns 有効なロケールであればtrue、そうでなければfalse
 */
export function isLocale(value: string): value is Locale {
    return locales.includes(value as Locale);
}

/**
 * IDをロケールと生のベーススラッグに分割する関数
 * @param id ID (例: "en/example-page")
 * @returns ロケールと生のベーススラッグのオブジェクト
 * @throws Invalid id formatエラー
 */
export function divideId(id: string): {locale: Locale, rawBaseSlug: string} {
    const parts = id.split('/');
    if (isLocale(parts[0])) {
        return {
            locale: parts[0],
            rawBaseSlug: parts.slice(1).join('/')
        };
    }
    throw new Error(`[Invalid id format] ${id}`);
}

/**
 * スラッグを正規化する関数
 * @param slug 正規化するスラッグ
 * @returns 正規化されたスラッグ
 */
export function normalizeSlug(slug: string): string {
    return slug === 'index'
        ? ''
        : slug.replace(/\/index$/, '');
}