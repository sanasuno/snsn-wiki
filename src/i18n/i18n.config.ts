/**
 * @i18n/i18n.config.ts
 * i18n設定ファイル
 */

// 翻訳キーの型をインポート・エクスポートする
import type { TranslationKey } from "./keys";
export type { TranslationKey };

// 各言語の翻訳ファイルをインポートしてまとめる
// ロケール追加時はここに追記する
import { en } from "./en";
import { eo } from "./eo";
import { ja } from "./ja";
export const translations = {
    en,
    eo,
    ja
} as const;

// ロケール型を定義
export type Locale = keyof typeof translations;

// デフォルトロケールを決定
export const defaultLocale = 'ja' satisfies Locale;

// 利用可能なロケール一覧
export const locales = Object.keys(translations) as Locale[];

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