/**
 * @i18n/config.ts
 * i18n設定ファイル
 */

// 各言語の翻訳ファイルをインポートしてまとめる
// ロケール追加時はここに追記する
import { ja } from "./ja";
import { en } from "./en";
import { eo } from "./eo";
export const translations = {
    ja,
    en,
    eo
} as const;

// ロケール型を定義
export type Locale = keyof typeof translations;

// デフォルトロケールを決定
export const defaultLocale: Locale = 'ja';

// 利用可能なロケールと翻訳キーを定義
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