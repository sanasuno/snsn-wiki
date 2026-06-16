/**
 * @scripts/theme.ts
 * テーマ切替スクリプト
 */

import { savePreference } from "@scripts/storage";

/**
 * テーマトグル設定関数
 * @description テーマトグルボタンのクリックイベントを設定する
 */
export function setupThemeToggle() {
    document.getElementById('theme-toggle')?.addEventListener('click', () => {
        // テーマトグルボタンがクリックされたとき
        // HTMLのdata-theme属性とユーザーのテーマ設定を取得
        const html = document.documentElement;
        const currentTheme = html.getAttribute('data-theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        // currentThemeが'dark'、またはcurrentThemeが未設定かつユーザーがダークテーマを好む場合、現在ダークテーマと判定
        const isDark = currentTheme === 'dark' || (!currentTheme && prefersDark);
        // 現在のテーマに応じて次のテーマを決定
        const nextTheme = isDark 
            ? 'light' // 現在ダークテーマの場合はライトテーマに切り替え
            : 'dark'; // 現在ライトテーマの場合はダークテーマに切り替え
        
        html.setAttribute('data-theme', nextTheme); // data-theme属性に切り替え先のテーマを設定
        savePreference('theme', nextTheme); // ローカルストレージに切り替え先のテーマを保存
    });
}
