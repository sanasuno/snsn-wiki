/**
 * @scripts/theme.ts
 * テーマ切り替えスクリプト
 */

import { setLocalStorage } from "@scripts/localStorage";

/**
 * テーマ切り替え関数
 */
export function themeToggle() {
    // テーマ切り替えボタンを取得
    const btn = document.getElementById('theme-toggle')
    if (!btn) return;

    // ボタンの押下状態を同期する関数
    const syncPressedState = () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const isDark = currentTheme === 'dark';
        btn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
    }
    syncPressedState();

    // ボタンのクリックイベントを設定
    btn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const isDark = currentTheme === 'dark' || (!currentTheme && prefersDark);
        const nextTheme = isDark ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', nextTheme);
        setLocalStorage('theme', nextTheme);
        syncPressedState();
    })
}