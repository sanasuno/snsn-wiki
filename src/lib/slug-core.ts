/**
 * @lib/slug-core.ts
 * スラッグコア関数
 */

/**
 * テキストをスラッグに変換する関数
 * @param text テキスト
 * @returns スラッグ
 */
export function slugify(text: string): string {
    return text
        .normalize('NFKC')
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '-');
}

/**
 * スラッグを正規化する関数
 * NFKC 正規化、小文字化、空白のハイフン化を行う。
 * 末尾の "/index" を削除する。
 * @param rawSlug 正規化するスラッグ
 * @returns 正規化されたスラッグ
 */
export function normalizeSlugLike(rawSlug: string): string {
    const normalized = slugify(rawSlug);
    return normalized === 'index'
        ? ''
        : normalized.replace(/\/index$/, '');
}