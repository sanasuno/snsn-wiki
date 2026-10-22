/**
 * @i18n/i18n.config.ts
 * i18n ユーザー設定ファイル
 * 対応ロケールの登録とデフォルトロケールの指定だけを行う。
 * 翻訳ロジックは @lib/i18n.ts にあるので、そちらは編集しない。
 * ※ astro.config.ts から読み込まれるため、エイリアスは使えない。
 */

// ロケール追加時は import と translations の両方に追記する
import { en } from './en';
import { eo } from './eo';
import { ja } from './ja';

export const translations = {
    en,
    eo,
    ja
} as const;

// デフォルトロケール（translations のキーのいずれかであること）
export const defaultLocale = 'ja' satisfies keyof typeof translations;

// ---- 以下は translations から導出される値（編集不要） ----