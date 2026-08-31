/**
 * @scripts/localStorage.ts
 * ローカルストレージ操作用のユーティリティ
 */

/**
 * ローカルストレージに値を設定する関数
 * @param key - キー
 * @param value - 値
 * @returns 成功した場合はtrue、失敗した場合はfalse
 */
export function setLocalStorage(key: string, value: string): boolean {
    try {
        localStorage.setItem(key, value);
        return true;
    } catch (error) {
        console.error(`Failed to set localStorage key: ${key}`, error);
        return false;
    }
}

/**
 * ローカルストレージから値を取得する関数
 * @param key - キー
 * @returns 値、存在しない場合はnull
 */
export function getLocalStorage(key: string): string | null {
    try {
        return localStorage.getItem(key);
    } catch (error) {
        console.error(`Failed to get localStorage key: ${key}`, error);
        return null;
    }
}
