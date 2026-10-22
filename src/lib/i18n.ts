/**
 * @lib/i18n.ts
 * i18n ロジック（翻訳関数・型ガード）
 */

import { translations, defaultLocale } from '@i18n/i18n.config';
import { translationKeys, type TranslationKey } from '@i18n/keys';

export type Locale = keyof typeof translations;
export const locales = Object.keys(translations) as Locale[];

/**
 * 文字列が有効なロケールかどうかを判定する関数
 * @param value 判定する文字列
 * @returns 有効なロケールであればtrue、そうでなければfalse
 */
export function isLocale(value: string): value is Locale {
    return (locales as readonly string[]).includes(value);
}

/**
 * 文字列が有効な翻訳キーかどうかを判定する関数
 * @param value 判定する文字列
 * @returns 有効な翻訳キーであればtrue、そうでなければfalse
 */
export function isTranslationKey(value: string): value is TranslationKey {
    return (translationKeys as readonly string[]).includes(value);
}

/**
 * 翻訳キーから翻訳された文字列を取得する関数
 * 指定ロケールに翻訳がない場合はデフォルトロケールの翻訳を返す
 * デフォルトロケールにも存在しない場合はキーの値をそのまま返す
 * @param key 翻訳キー
 * @param locale ロケール
 * @returns 翻訳された文字列
 */
export function t(key: TranslationKey, locale: Locale = defaultLocale): string {
    const current = translations[locale] as Partial<Record<TranslationKey, string>>;
    if (current[key] !== undefined) {
        return current[key]!;
    }
    const fallback = translations[defaultLocale] as Partial<Record<TranslationKey, string>>;
    return fallback[key] ?? key;
}