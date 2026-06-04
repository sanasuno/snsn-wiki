/**
 * @scripts/utils
 * 共通のユーティリティ関数
 */
// URL末尾のスラッシュを削除する関数
export function normalize(path: string): string {
    return path.replace(/\/+$/, '');
}