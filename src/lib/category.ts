/**
 * @lib/category.ts
 * カテゴリ関連のユーティリティ関数
 */
import { t } from '@lib/i18n';
import { isTranslationKey, type Locale } from '@lib/i18n';

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
 * ページIDからカテゴリ文字列を取得する関数
 * @param pageId ページID
 * @param isSubpage サブページかどうか
 * @returns カテゴリ文字列
 */
export function getCategory(pageId: string, isSubpage: boolean = false): string {
    return getCategoryArray(pageId, isSubpage).at(-1) ?? '';
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
    return isTranslationKey(key) ? t(key, locale) : parts[parts.length - 1];
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

/**
 * カテゴリパスを翻訳する関数
 * @param category カテゴリパス
 * @param locale ロケール
 * @returns 翻訳されたカテゴリパス
 */
export function translateCategoryPath(category: string, locale: Locale): string {
    return category.split('/').map((_, i, arr) => translateCategory(arr.slice(0, i + 1).join('/'), locale)).join('/');
}

/**
 * カテゴリ配列がフィルタカテゴリ配列自身もしくはその配下にあるかを判定する関数
 * @param categoryArray カテゴリ配列
 * @param filterCategoryArray フィルタカテゴリ配列
 * @returns カテゴリ配列がフィルタカテゴリ配列自身もしくはその配下にある場合はtrue、そうでなければfalse
 */
export function matchCategory(pageCategory: string, filterCategory: string): boolean {
    return filterCategory === ''
        || pageCategory === filterCategory
        || pageCategory.startsWith(`${filterCategory}/`);
}

/**
 * 子カテゴリを取得する関数
 * @param pageCategory ページカテゴリ
 * @param parentCategory 親カテゴリ
 * @returns 子カテゴリ
 */
export function getChildCategory(pageCategory: string, parentCategory: string): string | null {
    if (pageCategory === parentCategory) {
        return null;
    }
    if (!matchCategory(pageCategory, parentCategory)) {
        return null;
    }
    const rest = parentCategory === '' ? pageCategory : pageCategory.slice(parentCategory.length + 1);
    const head = rest.split('/')[0];
    return parentCategory === '' ? head : `${parentCategory}/${head}`;
}