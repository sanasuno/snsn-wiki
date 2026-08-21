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