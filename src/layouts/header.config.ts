/**
 * @layouts/header.config.ts
 * ヘッダーのナビゲーション設定
 * このファイルを編集してヘッダーの構成を変更できます。
 */
import type { TranslationKey } from "@i18n/i18n.config";

/**
 * ナビゲーション項目の型定義
 * 
 * 各項目は以下のプロパティを持ちます：
 * - path: リンク先のパス
 * - icon: アイコンクラス名 (Font Awesome)
 * - i18nKey: 国際化キー
 */
export type NavItem = {
    path: string;
    icon: string;
    i18nKey: TranslationKey;
}

/**
 * ヘッダーのナビゲーション項目
 * 
 * 各項目は以下のプロパティを持ちます：
 * - path: リンク先のパス
 * - icon: アイコンクラス名 (Font Awesome)
 * - i18nKey: 国際化キー
 */
export const headerNavigation: NavItem[] = [
    { path: '/', icon: 'fa-solid fa-house', i18nKey: 'nav.home' },
    { path: '/category', icon: 'fa-solid fa-folder', i18nKey: 'nav.category' },
    { path: '/tag', icon: 'fa-solid fa-tags', i18nKey: 'nav.tags' },
    { path: '/graph', icon: 'fa-solid fa-diagram-project', i18nKey: 'nav.graph' }
];