/**
 * @i18n/i18n.config.ts
 * i18n 設定ファイル
 */
// i18nフォルダ内の翻訳ファイルをインポート
import { ja } from './ja';
import { en } from './en';

// ロケール定義
export const translations = {
  ja,
  en
};
export type Locale = keyof typeof translations;
export const locales = Object.keys(translations) as Locale[];

// デフォルトロケール指定
export const defaultLocale: Locale = 'ja';

// 言語切替ボタンを表示するか
// true: 表示する, false: 表示しない
export const showLanguageSwitcher = true;

// 与えられた言語とキーから翻訳を返す関数
export function t(key: string, locale: Locale = defaultLocale): string {
    return (translations[locale] as Record<string, string>)?.[key] 
      ?? (translations[defaultLocale] as Record<string, string>)?.[key] 
      ?? key;
}

// ロケールに適した日付形式で日付をフォーマットする関数
export function formatDate(date: Date, locale: Locale = defaultLocale): string {
    return date.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
}