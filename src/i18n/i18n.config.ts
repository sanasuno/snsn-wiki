/**
 * @i18n/config.ts
 * i18n設定ファイル
 */

import { ja } from "./ja";
import { en } from "./en";
import { eo } from "./eo";

export const translations = {
    ja,
    en,
    eo
} as const;

export type Locale = keyof typeof translations;

export const defaultLocale: Locale = 'ja';

export const locales = Object.keys(translations) as Locale[];
export type TranslationKey = keyof typeof translations[typeof defaultLocale];

/**
 * 翻訳キーから翻訳された文字列を取得する関数
 * @param key 翻訳キー
 * @param locale ロケール
 * @returns 翻訳された文字列
 */
export function t(key: TranslationKey, locale: Locale = defaultLocale): string {
    return (translations[locale] as Record<string, string>)?.[key]
        ?? (translations[defaultLocale] as Record<string, string>)?.[key];
};