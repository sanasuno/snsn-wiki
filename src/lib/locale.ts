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
 * IDをロケールとベーススラッグに分割する関数
 * @param id ID (例: "en/example-page")
 * @returns ロケールとベーススラッグのオブジェクト
 * @throws Invalid id formatエラー
 */
export function divideId(id: string): {locale: Locale, baseSlug: string} {
    const parts = id.split('/');
    if (isLocale(parts[0])) {
        return {
            locale: parts[0],
            baseSlug: parts.slice(1).join('/')
        };
    }
    throw new Error(`[Invalid id format] ${id}`);
}