/**
 * @layouts/header.nav.ts
 * ヘッダーナビゲーションのアイテム設定ファイル
 */
import type { TranslationKey } from "@i18n/i18n.config";

/**
 * ナビゲーションアイテムの型定義
 * @param path ナビゲーション先のパス
 * @param i18nKey ナビゲーションの表示名の翻訳キー
 * @param icon ナビゲーションアイテムのアイコン（Font Awesomeクラス）
 * @param exact パスの完全一致（true）または前方一致（false）
 */
export type HeaderNavItem = {
    path: string;
    i18nKey: TranslationKey;
    icon?: string;
    exact?: boolean;
}

/**
 * ヘッダーナビゲーションのアイテム
 */
export const headerNavItems: HeaderNavItem[] = [
    { path: '/wiki', i18nKey: 'header.nav.home', icon: 'fas fa-house', exact: true },
    { path: '/category', i18nKey: 'header.nav.category', icon: 'fas fa-folder' },
    // { path: '/tags', i18nKey: 'header.nav.tags', icon: 'fas fa-tags' },
    // { path: '/special/graph', i18nKey: 'header.nav.graph', icon: 'fas fa-diagram-project' }
]