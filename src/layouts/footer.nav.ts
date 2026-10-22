/**
 * @layouts/footer.nav.ts
 * フッターナビゲーションのアイテム設定ファイル
 */
import type { TranslationKey } from '@i18n/keys';

/**
 * ナビゲーションアイテムの型定義
 * @param path ナビゲーション先のパス
 * @param i18nKey ナビゲーションの表示名の翻訳キー
 * @param icon ナビゲーションアイテムのアイコン（Font Awesomeクラス）
 */
export type FooterNavItem = {
    path: string;
    i18nKey: TranslationKey;
    icon: string;
};

export const footerNavItems: FooterNavItem[] = [
    /*
    {
        path: '/privacy',
        i18nKey: 'privacy.title',
        icon: 'fas fa-shield-alt'
    },
    {
        path: '/terms',
        i18nKey: 'terms.title',
        icon: 'fas fa-file-contract'
    }
    */
];