/**
 * @lib/category.ts
 * カテゴリ関連のユーティリティ関数
 */
import { t } from '@lib/i18n';
import { isTranslationKey, type Locale } from '@lib/i18n';

/**
 * ページIDからカテゴリ文字列を取得する関数
 * @param pageId ページID
 * @param isSubpage サブページかどうか
 * @returns カテゴリ文字列
 */
export function getCategory(pageId: string, isSubpage: boolean = false): string {
    const parts = pageId.split('/');
    if (isSubpage) {
        return parts.slice(1, -2).join('/');
    } else {
        return parts.slice(1, -1).join('/');
    }
}

/**
 * ページIDからカテゴリ配列を取得する関数
 * @param pageID ページID
 * @param isSubpage サブページかどうか
 * @returns カテゴリ配列
 */
export function getCategoryArray(pageId: string, isSubpage: boolean = false): string[] {
    const parts = pageId.split('/').slice(1, isSubpage ? -2 : -1);
    return parts.map((_, i) => parts.slice(0, i + 1).join('/'));
}

/**
 * カテゴリの翻訳を取得する関数
 * @param category カテゴリ
 * @param locale ロケール
 * @returns 翻訳
 */
export function translateCategory(category: string, locale: Locale): string {
    const parts = category.split('/');
    const key = `category.${parts.join('.')}`;
    return isTranslationKey(key) ? t(key, locale) : parts.join(' / ');
}

/**
 * ページIDから翻訳されたカテゴリ名を取得する関数
 * @param pageId ページID
 * @param locale ロケール
 * @param isSubPage サブページかどうか
 * @returns 翻訳されたカテゴリ名
 */
export function getTranslatedCategory(pageId: string, locale: Locale, isSubpage: boolean = false ): string {
    const category = getCategory(pageId, isSubpage);
    return translateCategory(category, locale);
}