/**
 * @i18n/en.ts
 * English translation file
 */
import { enCustom } from "./en.custom";
import type { TranslationKey } from "./keys";

export const en = {
    'lang.name': 'English',
    'lang.locale': 'en-US',
    'og.locale': 'en_US',
    'og.font': 'Noto Sans',
    
    'header.skip': 'Skip to main content',
    'header.sidebar.toggle': 'Toggle sidebar',
    'header.theme.toggle': 'Toggle theme',
    'header.language.select': 'Select language',
    'header.nav.title': 'Navigation',
    'header.nav.home': 'Home',
    'header.nav.category': 'Category',
    'header.nav.tags': 'Tags',
    'header.nav.graph': 'Graph',
    
    'sidebar.nav.title': 'Sidebar',
    'sidebar.quickLinks': 'Quick Links',
    'sidebar.home': 'Home',
    'sidebar.category': 'Category',
    'sidebar.tags': 'Tags',
    'sidebar.graph': 'Graph',
    
    'fallback.notice': 'This page does not have an English translation yet.',
    
    'meta.nocategory': 'No category',
    
    'meta.created': 'Created',
    'meta.updated': 'Updated',
    
    'subpanel.open': 'Open table of contents',
    'subpanel.close': 'Close table of contents',

    'toc.title': 'Table of Contents',
    
    'homepage.title': 'Home',
    'homepage.description': 'Home page description',
    
    'categorypage.title': 'Category',
    'categorypage.description': 'Category page description',
    
    'graph.title': 'Graph',
    'graph.description': 'Graph page description',

    '404.title': '404',
    '404.description': 'Page not found',
    
    ...enCustom
} satisfies Record<TranslationKey, string>;