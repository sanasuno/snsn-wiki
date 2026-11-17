/**
 * @i18n/i18n.config.ts
 * i18n ユーザー設定ファイル
 * 対応ロケールの登録とデフォルトロケールの指定を行います。
 * ※ astro.config.ts から読み込まれるため、エイリアスは使えません。
 */

// ロケール追加時は import と translations の両方に追記する
import { ja } from './ja';
import { en } from './en';
import { eo } from './eo';

export const translations = {
    ja,
    en,
    eo,
} as const;

// デフォルトロケール（translations のキーのいずれかであること）
export const defaultLocale = 'ja' satisfies keyof typeof translations;