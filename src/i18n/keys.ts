/**
 * @i18n/keys.ts
 * 翻訳キー定義ファイル
 */
export const structuralKeys = [
    'lang.name',
    'lang.locale',

    'og.locale',
    'og.font',

    'header.skip',
    'header.sidebar.toggle',
    'header.theme.toggle',
    'header.language.select',
    'header.nav.title',
    'header.nav.home',
    'header.nav.category',
    'header.nav.tags',
    'header.nav.graph',

    'sidebar.nav.title',

    'fallback.notice',

    'meta.nocategory',

    'meta.created',
    'meta.updated',
    
    'subpanel.open',
    'subpanel.close',

    'toc.title',
    
    'homepage.title',
    'homepage.description',

    'categorypage.title',
    'categorypage.description',

    'graph.title',
    'graph.description',

    '404.title',
    '404.description',
] as const;

import { customKeys } from './keys.custom';
export const translationKeys = [...structuralKeys, ...customKeys] as const;
export type TranslationKey = typeof translationKeys[number];