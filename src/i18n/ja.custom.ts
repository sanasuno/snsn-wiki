/**
 * @i18n/ja.custom.ts
 * 日本語カスタム翻訳ファイル
 */
import type { CustomKey } from "./keys.custom";
export const jaCustom = {
    // サイト設定
    'site.title': 'snsn-wiki',
    'site.description': 'Astro製個人用ナレッジベースサイト',

    'sidebar.quickLinks': 'クイックリンク',
    'sidebar.home': 'ホーム',
    'sidebar.category': 'カテゴリ',
    'sidebar.tags': 'タグ',
    'sidebar.graph': 'グラフ',
    'sidebar.development': '開発',

    'category.development': '開発記録',
    // ここに日本語のカスタム翻訳を追加
} satisfies Record<CustomKey, string>;