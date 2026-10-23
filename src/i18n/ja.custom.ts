/**
 * @i18n/ja.custom.ts
 * 日本語カスタム翻訳ファイル
 */
import type { CustomKey } from "./keys.custom";
export const jaCustom = {
    // サイト設定
    'site.title': 'snsn-wiki',
    'site.description': 'Astro製個人用ナレッジベースサイト',

    'category.development': '開発記録',
    'category.development.i18n': '国際化',
    'category.development.layouts': 'レイアウト',
    'category.development.lib': 'ライブラリ',
    'category.development.pages': 'ページ',
    // ここに日本語のカスタム翻訳を追加
} satisfies Record<CustomKey, string>;