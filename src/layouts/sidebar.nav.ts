/**
 * @layouts/sidebar.nav.ts
 * サイドバーナビゲーションの設定ファイル
 */
import type { TranslationKey } from "@i18n/i18n.config";

export type SidebarNavItem = {
    path: string;
    external?: boolean;
    i18nKey?: TranslationKey;
    icon?: string;
}

export type SortMode = 'title' | 'order' | 'date' | 'updated';

export type SidebarNavSection = {
    titleKey: TranslationKey;
    category?: string;
    items?: SidebarNavItem[];
    sort?: SortMode;
    icon?: string;
    collapsed?: boolean;
}

export const autoAddUnknownCategories = true;

export const autoGroupByLeafCategory = true;

export const sidebarNavItems: SidebarNavSection[] = [
    {
        titleKey: 'sidebar.quickLinks',
        items: [
            { path: '/', i18nKey: 'sidebar.home', icon: 'fas fa-house' },
            { path: '/category', i18nKey: 'sidebar.category', icon: 'fas fa-folder' },
            { path: '/tags', i18nKey: 'sidebar.tags', icon: 'fas fa-tags' },
            { path: '/graph', i18nKey: 'sidebar.graph', icon: 'fas fa-diagram-project' }
        ]
    },
    {
        titleKey: 'sidebar.development',
        category: 'development',
        sort: 'title',
        icon: 'fas fa-code',
        collapsed: false
    }
];