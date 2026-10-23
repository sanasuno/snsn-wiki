/**
 * @i18n/keys.custom.ts
 * カスタム翻訳キー定義ファイル
 */

export const customKeys = [
    'site.title',
    'site.description',

    'category.development',
    'category.development.i18n',
    'category.development.layouts',
    'category.development.lib',
    'category.development.pages'
    // ここにカスタムキーを追加
] as const;

export type CustomKey = typeof customKeys[number];