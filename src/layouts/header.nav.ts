/**
 * @layouts/header.nav.ts
 * ヘッダーナビゲーションのアイテム設定ファイル
 */
import type { TranslationKey } from "@i18n/i18n.config";

/**
 * ナビゲーションアイテムの型定義
 */
export type HeaderNavItem = {
    path: string;
    i18nKey: TranslationKey;
    icon?: string;
}

/**
 * ヘッダーナビゲーションのアイテム
 */
export const headerNavItems: HeaderNavItem[] = [
    { path: '/', i18nKey: 'header.nav.home', icon: 'fas fa-house' },
    { path: '/category', i18nKey: 'header.nav.category', icon: 'fas fa-folder' },
    { path: '/tags', i18nKey: 'header.nav.tags', icon: 'fas fa-tags' },
    { path: '/graph', i18nKey: 'header.nav.graph', icon: 'fas fa-diagram-project' }
]