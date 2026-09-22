/**
 * @lib/path.ts
 * パス関連のユーティリティ関数
 */
import { t, type Locale, type TranslationKey } from '@i18n/i18n.config';
import { isLocale } from '@lib/locale';
/**
 * 末尾のスラッシュを削除する関数
 * @param path 削除するパス
 * @returns 末尾のスラッシュを削除したパス
 */
export function removeTrailingSlash(path: string): string {
    return path.replace(/\/$/, '');
}

/**
 * ページIDからロケールを取得する関数
 * @param pageId ページID
 * @returns ロケール
 * @throws Invalid id formatエラー
 */
export function getLocale(pageId: string): Locale {
    const parts = pageId.split('/');
    if (isLocale(parts[0])) {
        return parts[0] as Locale;
    }
    throw new Error(`[Invalid id format] ${pageId}`);
}

/**
 * ページIDから生のスラッグを取得する関数
 * @param pageId ページID
 * @returns 生のスラッグ
 */
export function getRawSlug(pageId: string): string {
    const parts = pageId.split('/');
    return parts.slice(1).join('/');
}

/**
 * ページIDをロケールと生のベーススラッグに分割する関数
 * @param pageId ページID (例: "en/example-page")
 * @returns ロケールと生のスラッグのオブジェクト
 */
export function dividePageId(pageId: string): {locale: Locale, rawSlug: string} {
    const locale = getLocale(pageId);
    const rawSlug = getRawSlug(pageId);
    return {locale, rawSlug};
}

/**
 * パスを正規化する関数
 * @param rawPath 正規化するパス
 * @returns 正規化されたパス
 */
export function normalizePath(rawPath: string): string {
    const normalized = rawPath.normalize('NFKC').toLowerCase().trim();
    return normalized === 'index'
        ? ''
        : normalized.replace(/\/index$/, '');
}

/**
 * ページIDから正規化されたスラッグを取得する関数
 * @param pageId ページID
 * @returns 正規化されたスラッグ
 */
export function getNormalizedSlug(pageId: string): string {
    const rawSlug = dividePageId(pageId).rawSlug;
    return normalizePath(rawSlug);
}

/**
 * ページIDからルートを取得する関数
 * @param pageId ページID
 * @returns ルート
 */
export function getRoute(pageId: string): string {
    const baseUrl = removeTrailingSlash(import.meta.env.BASE_URL);
    const locale = getLocale(pageId);
    const slug = getNormalizedSlug(pageId);
    return removeTrailingSlash(`${baseUrl}/${locale}/wiki/${slug}`);
}

/**
 * 現在のパスが指定されたパスと一致するか判定する関数
 * @param targetPath - 比較するパス
 * @param currentPath - 現在のパス
 * @param localeBaseUrl - ロケールベースURL
 * @returns パスが一致する場合はtrue、そうでない場合はfalse
 */
export function isActive(targetPath: string, currentPath: string, localeBaseUrl: string): boolean {
    // 対象のURLを生成
    const targetUrl = `${localeBaseUrl}${targetPath}`;
    if (targetPath === '/') {
        // ルートパスの場合は完全一致で判定
        return currentPath === localeBaseUrl;
    } else {
        // ルートパス以外の場合、完全一致またはサブパスで判定
        return currentPath === targetUrl || currentPath.startsWith(`${targetUrl}/`);
    }
}