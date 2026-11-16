/**
 * @lib/slug-core.ts
 * スラッグコア関数
 */

/**
 * スラッグを正規化する関数
 * NFKC 正規化、小文字化、空白のハイフン化を行う。
 * 末尾の "/index" を削除する。
 * @param rawSlug 正規化するスラッグ
 * @returns 正規化されたスラッグ
 */
export function normalizeSlugLike(rawSlug: string): string {
    const normalized = rawSlug.normalize('NFKC').toLowerCase().trim().replace(/\s+/g, '-');
    return normalized === 'index'
        ? ''
        : normalized.replace(/\/index$/, '');
}