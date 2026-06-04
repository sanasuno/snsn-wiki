/**
 * main.ts
 * メインスクリプト
 */
import { defaultLocale } from "@i18n/i18n.config";
import { savePreference } from "@scripts/storage";

// テーマ切替
document.getElementById('theme-toggle')?.addEventListener('click', () => {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = 
        currentTheme === 'dark' || 
        (!currentTheme && prefersDark);
    const nextTheme = 
        isDark 
            ? 'light' 
            : 'dark';
    
    html.setAttribute('data-theme', nextTheme);
    savePreference('theme', nextTheme);
});

// 言語切替
const langSelect = document.getElementById('lang-list') as HTMLSelectElement | null;
if (langSelect){
    langSelect.addEventListener('change', () => {
        const nextLang = langSelect.value;
        savePreference('lang', nextLang);

        // Link要素から対応する言語のURLを取得
        const altLink = document.querySelector<HTMLLinkElement>(`link[rel="alternate"][hreflang="${nextLang}"]`);
        if (altLink?.href) {
            // 次の言語のページが存在すれば遷移する
            window.location.assign(altLink.href);
            return;
        }
        const rootLink = document.querySelector<HTMLLinkElement>(`link[rel="alternate"][hreflang="${defaultLocale}"]`);
        if (rootLink?.href) {
            // デフォルト言語のページが存在すれば遷移する
            window.location.assign(rootLink.href);
            return;
        }
        // どちらも存在しない場合はリロードしてUI言語設定だけ適用
        window.location.reload();
    });
}

// モバイルサイドバーボタン
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebar-toggle');
sidebarToggle?.addEventListener('click', (e) => {
    e.stopPropagation();
    sidebar?.classList.toggle('open');
});
document.addEventListener('click', (e) => {
    if (sidebar?.classList.contains('open') && 
    !sidebar.contains(e.target as Node) &&
    e.target !== sidebarToggle) {
        sidebar.classList.remove('open');
    }
});
