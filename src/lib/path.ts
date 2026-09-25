/**
 * @lib/path.ts
 * パス関連のユーティリティ関数
 */
import type { Locale } from '@i18n/i18n.config';
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
 * ページIDをロケールと生のスラッグに分割する関数
 * @param pageId ページID (例: "en/example-page")
 * @returns ロケールと生のスラッグのオブジェクト
 */
export function dividePageId(pageId: string): {locale: Locale, rawSlug: string} {
    const locale = getLocale(pageId);
    const rawSlug = getRawSlug(pageId);
    return {locale, rawSlug};
}

/**
 * スラッグを正規化する関数
 * @param rawSlug 正規化するスラッグ
 * @returns 正規化されたスラッグ
 */
export function normalizeSlugLike(rawSlug: string): string {
    const normalized = rawSlug.normalize('NFKC').toLowerCase().trim();
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
    const rawSlug = getRawSlug(pageId);
    return normalizeSlugLike(rawSlug);
}

/**
 * ベースURLを取得する関数
 * @returns ベースURL
 */
export function getBaseUrl(): string {
    return removeTrailingSlash(import.meta.env.BASE_URL);
}

/**
 * ロケールベースURLを取得する関数
 * @param locale ロケール
 * @returns ロケールベースURL
 */
export function getLocaleBaseUrl(locale: Locale): string {
    return `${getBaseUrl()}/${locale}`;
}

/**
 * WikiベースURLを取得する関数
 * @param locale ロケール
 * @returns WikiベースURL
 */
export function getWikiBaseUrl(locale: Locale): string {
    return `${getLocaleBaseUrl(locale)}/wiki`;
}

/**
 * ページIDからWikiページのURLを取得する関数
 * @param pageId ページID
 * @returns WikiページのURL
 */
export function getWikiUrl(pageId: string): string {
    const locale = getLocale(pageId);
    const slug = getNormalizedSlug(pageId);
    return removeTrailingSlash(`${getWikiBaseUrl(locale)}/${slug}`);
}

/**
 * Astro.urlから現在のパスを取得する関数
 * @param url Astro.url
 * @returns 現在のパス
 */
export function getCurrentPath(url: URL): string {
    return removeTrailingSlash(url.pathname) || '/';
}

/**
 * 現在のパスが指定されたパスと一致するか判定する関数
 * @param targetSlug - 比較するスラッグ
 * @param currentPath - 現在のパス
 * @returns パスが一致する場合はtrue、そうでない場合はfalse
 */
export function isActive(targetSlug: string, currentPath: string): boolean {
    const base = getBaseUrl();
    const relativePath = currentPath.startsWith(base) ? currentPath.slice(base.length).slice(1) : currentPath;
    const currentSlug = getLocale(relativePath) ? `/${getNormalizedSlug(relativePath)}` : relativePath;
    if (targetSlug === '/') {
        // ルートパスの場合は完全一致で判定
        return currentSlug === '/';
    } else {
        // ルートパス以外の場合、完全一致またはサブパスで判定
        return currentSlug === targetSlug || currentSlug.startsWith(`${targetSlug}/`);
    }
}