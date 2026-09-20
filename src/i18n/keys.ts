/**
 * @i18n/keys.ts
 * 翻訳キースキーマ定義ファイル
 */
import { customKeys } from "./keys.custom";

export const structuralKeys = [
    'lang.name',
    'lang.locale',
    'lang.locale.ogp',

    'header.sidebar.toggle',
    'header.theme.toggle',
    'header.language.select',
    'header.nav.title',
    'header.nav.home',
    'header.nav.category',
    'header.nav.tags',
    'header.nav.graph',

    'sidebar.nav.title'
] as const;

export const translationKeys = [...structuralKeys, ...customKeys] as const;
export type TranslationKey = typeof translationKeys[number];