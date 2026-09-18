/**
 * @lib/path.ts
 * パス関連のユーティリティ関数
 */
import { locales, type Locale } from '@i18n/i18n.config';

/**
 * 末尾のスラッシュを削除する関数
 * @param path 削除するパス
 * @returns 末尾のスラッシュを削除したパス
 */
export function removeTrailingSlash(path: string): string {
    return path.replace(/\/$/, '');
}

/**
 * パスが現在のパスと一致するか判定する関数
 * @param targetPath 対象のパス
 * @param localeBaseUrl ロケールベースURL
 * @param currentPath 現在のパス
 * @returns パスが一致する場合はtrue、そうでない場合はfalse
 */
export function isActive(targetPath: string, localeBaseUrl: string, currentPath: string): boolean {
    const localeTargetUrl = removeTrailingSlash(`${localeBaseUrl}${targetPath}`);
    if (targetPath === '/') {
        return currentPath === localeTargetUrl;
    }
    return currentPath === localeTargetUrl || currentPath.startsWith(`${localeTargetUrl}/`);
}

/**
 * ページIDからベーススラッグを取得する関数
 * @param pageId ページID
 * @returns ベーススラッグ
 */
export function getBaseSlug(pageId: string): string {
    const parts = pageId.split('/');
    if (parts.length > 1 && locales.includes(parts[0] as Locale)) {
        return parts.slice(1).join('/');
    }
    return pageId;
}