/**
 * @lib/category.ts
 * カテゴリ関連のユーティリティ関数
 */
import { t, type Locale, type TranslationKey } from '@i18n/i18n.config';

/**
 * ページIDからカテゴリを取得する関数
 * @param pageID ページID
 * @param isSubpage サブページかどうか
 * @returns カテゴリ配列
 */
export function getCategory(pageId: string, isSubpage: boolean = false): string[] {
    const parts = pageId.split('/');
    if (isSubpage) {
        return parts.slice(1, -2);
    } else {
        return parts.slice(1, -1);
    }
}

/**
 * ページIDからリーフカテゴリを取得する関数
 * @param pageId ページID
 * @param isSubPage サブページかどうか
 * @returns リーフカテゴリ
 */
export function getLeafCategory(pageId: string, isSubPage: boolean = false ): string {
    const category = getCategory(pageId, isSubPage);
    return category[category.length - 1];
}

/**
 * ページIDから翻訳されたカテゴリ名を取得する関数
 * @param pageId ページID
 * @param locale ロケール
 * @param isSubPage サブページかどうか
 * @returns 翻訳されたカテゴリ名
 */
export function getTranslatedCategory(pageId: string, locale: Locale, isSubPage: boolean = false ): string {
    const category = getCategory(pageId, isSubPage);
    if (category.length === 0 || (category.length === 1 && category[0] === '')) return '';
    return t(`category.${category.join('.')}` as TranslationKey, locale);
}