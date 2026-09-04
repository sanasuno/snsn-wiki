/**
 * @i18n/ja.ts
 * 日本語翻訳ファイル
 */

import { jaCustom } from "./ja.custom";

export const ja = {
    'lang.name': '日本語',
    'lang.locale': 'ja-JP',
    'lang.locale.ogp': 'ja_JP',

    'header.sidebar.toggle': 'サイドバー切り替え',
    'header.theme.toggle': 'テーマ切り替え',
    ...jaCustom
} as const;