/**
 * @lib/path.ts
 * パス関連のユーティリティ関数
 */

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