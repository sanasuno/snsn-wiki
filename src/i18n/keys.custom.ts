/**
 * @i18n/keys.custom.ts
 * カスタム翻訳キースキーマ定義ファイル
 */

export const customKeys = [
    'site.title',
    'site.description',
    'sidebar.quickLinks',
    'sidebar.home',
    'sidebar.category',
    'sidebar.tags',
    'sidebar.graph',
    'sidebar.development',

    'category.development',
    // ここにカスタムキーを追加
] as const;

export type CustomKey = typeof customKeys[number];
