/**
 * @i18n/en.ts
 * English translation file
 */

import { enCustom } from "./en.custom";

export const en = {
    'lang.name': 'English',
    'lang.locale': 'en-US',
    'lang.locale.ogp': 'en_US',
    
    'header.sidebar.toggle': 'Toggle sidebar',
    'header.theme.toggle': 'Toggle theme',
    'header.language.select': 'Select language',
    'header.nav.title': 'Navigation',
    'header.nav.home': 'Home',
    'header.nav.category': 'Category',
    'header.nav.tags': 'Tags',
    'header.nav.graph': 'Graph',
    
    'sidebar.nav.title': 'Sidebar',
    ...enCustom
} as const;