/**
 * @i18n/i18n.config.ts
 * i18n 設定ファイル
 */
// i18nフォルダ内の翻訳ファイルをインポート
import { ja } from './ja';
import { en } from './en';

// ロケール定義
export const locales = {
  ja,
  en
};
export type Locale = keyof typeof locales;

// デフォルトロケール
export const defaultLocale: Locale = 'ja';

// 与えられた言語とキーから翻訳を返す関数
export const translations: Record<Locale, Record<string, string>> = { ...locales };
export function t(key: string, locale: Locale = defaultLocale): string {
    return translations[locale]?.[key] ?? translations[defaultLocale]?.[key] ?? key;
}
