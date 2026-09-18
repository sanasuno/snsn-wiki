/**
 * @lib/content/category.ts
 * カテゴリ関連のユーティリティ関数
 */

export function getCategory(pageId: string): string[] {
    const parts = pageId.split('/');
    if (parts.length > 2) {
        return parts.slice(1, -1);
    }
    return [];
}