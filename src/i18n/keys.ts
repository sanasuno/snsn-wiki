/**
 * @i18n/keys.ts
 * 翻訳キースキーマ定義ファイル
 */
import type { CustomKey } from "./keys.custom";

export type TranslationKey =
    | CustomKey
    | 'lang.name'
    | 'lang.locale'
    | 'lang.locale.ogp'

    | 'header.sidebar.toggle'
    | 'header.theme.toggle'
    | 'header.language.select'
    | 'header.nav.title'
    | 'header.nav.home'
    | 'header.nav.category'
    | 'header.nav.tags'
    | 'header.nav.graph'

    | 'sidebar.nav.title'
    
