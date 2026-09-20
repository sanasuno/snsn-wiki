/**
 * @lib/locale.ts
 * ロケール関連のユーティリティ関数
 */

import { locales, type Locale } from '@i18n/i18n.config';
import { translationKeys, type TranslationKey } from '@i18n/keys';

/**
 * 文字列が有効なロケールかどうかを判定する関数
 * @param value 判定する文字列
 * @returns 有効なロケールであればtrue、そうでなければfalse
 */
export function isLocale(value: string): value is Locale {
    return locales.includes(value as Locale);
}

/**
 * 文字列が有効な翻訳キーかどうかを判定する関数
 * @param value 判定する文字列
 * @returns 有効な翻訳キーであればtrue、そうでなければfalse
 */
export function isTranslationKey(value: string): value is TranslationKey {
    return translationKeys.includes(value as TranslationKey);
}