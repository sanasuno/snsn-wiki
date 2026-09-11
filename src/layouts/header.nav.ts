/**
 * @layouts/header.nav.ts
 * ヘッダーナビゲーションのアイテム定義
 */
import type { TranslationKey } from "@i18n/i18n.config";

/**
 * ナビゲーションアイテムの型定義
 */
export type HeaderNavItem = {
    path: string;
    icon: string;
    i18nKey: TranslationKey;
}

/**
 * ヘッダーナビゲーションのアイテム
 */
export const headerNavItems: HeaderNavItem[] = [
    { path: '/', icon: 'fas fa-house', i18nKey: 'header.nav.home' },
    { path: '/category', icon: 'fas fa-folder', i18nKey: 'header.nav.category' },
    { path: '/tags', icon: 'fas fa-tags', i18nKey: 'header.nav.tags' },
    { path: '/graph', icon: 'fas fa-diagram-project', i18nKey: 'header.nav.graph' }
]