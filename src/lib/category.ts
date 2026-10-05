/**
 * @lib/category.ts
 * カテゴリ関連のユーティリティ関数
 */
import { t, type Locale, type TranslationKey } from '@i18n/i18n.config';
import { isTranslationKey } from '@lib/locale';

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
 * ページIDからカテゴリ文字列を取得する関数
 * @param pageId ページID
 * @param isSubpage サブページかどうか
 * @returns カテゴリ文字列
 */
export function getCategoryString(pageId: string, isSubpage: boolean = false): string {
    const category = getCategory(pageId, isSubpage);
    return category.join('/');
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
    
    const key = `category.${category.join('.')}` as TranslationKey;
    if (!isTranslationKey(key)) return '';
    
    return t(key, locale);
}