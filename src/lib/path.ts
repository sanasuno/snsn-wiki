/**
 * @lib/path.ts
 * パス関連のユーティリティ関数
 */
import type { Locale } from '@i18n/i18n.config';
import { isLocale } from '@lib/i18n';
/**
 * 末尾のスラッシュを削除する関数
 * @param path 削除するパス
 * @returns 末尾のスラッシュを削除したパス
 */
export function removeTrailingSlash(path: string): string {
    return path.replace(/\/$/, '');
}

/**
 * 末尾にスラッシュを付与する関数
 * @param path 付与するパス
 * @returns 末尾にスラッシュを付与したパス
 */
export function ensureTrailingSlash(path: string): string {
    return path.endsWith('/') ? path : `${path}/`;
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
 * スラッグを正規化する関数
 * NFKC 正規化、小文字化、空白除去を行う。
 * 末尾の "/index" を削除する。
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
    return ensureTrailingSlash(import.meta.env.BASE_URL);
}

/**
 * ロケールベースURLを取得する関数
 * @param locale ロケール
 * @returns ロケールベースURL
 */
export function getLocaleBaseUrl(locale: Locale): string {
    return ensureTrailingSlash(`${getBaseUrl()}${locale}`);
}

/**
 * WikiベースURLを取得する関数
 * @param locale ロケール
 * @returns WikiベースURL
 */
export function getWikiBaseUrl(locale: Locale): string {
    return ensureTrailingSlash(`${getLocaleBaseUrl(locale)}wiki`);
}

/**
 * ページIDからWikiページのURLを取得する関数
 * @param pageId ページID
 * @returns WikiページのURL
 */
export function getWikiUrl(pageId: string, locale: Locale = getLocale(pageId)): string {
    const slug = getNormalizedSlug(pageId);
    return ensureTrailingSlash(`${getWikiBaseUrl(locale)}${slug}`);
}

/**
 * Astro.url から現在のパスを取得する関数
 * @param url Astro.url
 * @returns 現在のパス
 */
export function getCurrentPath(url: URL): string {
    return ensureTrailingSlash(url.pathname);
}

/**
 * URLのパスをデコードする関数
 * @param url URL
 * @returns デコードされたパス
 */
export function getDecodedCurrentPath(url: URL): string {
    try {
        return ensureTrailingSlash(decodeURIComponent(url.pathname));
    } catch {
        return ensureTrailingSlash(url.pathname);
    }
}

/**
 * ロケールとパスからURLを取得する関数
 * @param locale ロケール
 * @param path パス
 * @returns URL
 */
export function getLocalePathUrl(locale: Locale, path: string): string {
    return ensureTrailingSlash(`${getLocaleBaseUrl(locale)}${path.replace(/^\/+/, '')}`);
}

/**
 * 対象のスラッグが現在のパスでアクティブかどうかを判定する関数
 * @param targetSlug - 比較するスラッグ
 * @param currentPath - 現在のパス
 * @param exact - 絶対一致かどうか
 * @returns パスが一致する場合はtrue、そうでない場合はfalse
 */
export function isPathActive(targetSlug: string, currentPath: string, exact = false): boolean {
    const base = getBaseUrl();
    const relativePath = currentPath.startsWith(base) ? currentPath.slice(base.length) : currentPath;
    const [maybeLocale, ...rest] = relativePath.split('/');
    const currentSlug = isLocale(maybeLocale)
        ? `/${normalizeSlugLike(removeTrailingSlash(rest.join('/')))}`
        : normalizeSlugLike(removeTrailingSlash(relativePath));
    if (exact || targetSlug === '/') {
        return currentSlug === targetSlug;
    }
    return currentSlug === targetSlug || currentSlug.startsWith(`${targetSlug}/`);
}