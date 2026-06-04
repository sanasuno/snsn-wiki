/**
 * @scripts/i18n.ts
 * i18n 関連のユーティリティ関数
 */

import { translations, type Locale } from '@i18n/i18n.config';
import { savePreference, getPreference } from '@scripts/storage';

interface SnsnWindow {
    lang: Locale;
    i18n: Record<string, string>;
}
declare global {
    interface Window {
        snsn?: SnsnWindow;
    }
}
export function getText(key: string | null): string | undefined {
    if (!key) return undefined;
    return window.snsn?.i18n[key];
}

export function updateLanguageSelector() {
    const selectLang = document.getElementById('lang-list');
    if (selectLang instanceof HTMLSelectElement) {
        selectLang.value = window.snsn?.lang ?? '';
    }
}

export function applyTranslations() {
    // data-i18n: textContent 差し替え
    document.querySelectorAll('[data-i18n]').forEach(function(el) {
        const key: string | null = el.getAttribute('data-i18n');
        if (!key) return;
        const text = getText(key);
        if (text !== undefined) {
            el.textContent = text;
        }
    });
    // data-i18n-placeholder: placeholder 差し替え
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function(el) {
        const key: string | null = el.getAttribute('data-i18n-placeholder');
        if (!key) return;
        const text = getText(key);
        if (text !== undefined && el instanceof HTMLInputElement) {
            el.placeholder = text;
        }
    });
}

export function refreshI18nUI() {
    updateLanguageSelector();
    applyTranslations();
}

export function initI18n() {
    const i18nData: Record<string, Record<string, string>> = translations;
    const htmlLang = document.documentElement.dataset.lang || '';
    const defaultLocale = document.documentElement.dataset.defaultLocale || '';
    window.snsn ??= {lang: htmlLang as Locale, i18n: {}};
    // サーバーサイドで決定された lang を localStorage と window.snsn.lang に設定
    // これによりWiki以外のページでも、最後に見たドキュメントの言語がUI言語として保持される
    if (htmlLang && htmlLang in translations) {
        savePreference('lang', htmlLang);
        window.snsn.lang = htmlLang as Locale;
    } else {
        // localStorage から言語を取得
        const savedLang = getPreference('lang');
        if (savedLang && savedLang in translations) {
            window.snsn.lang = savedLang as Locale;
        } else {
            window.snsn.lang = defaultLocale as Locale;
        }
    }
    
    if (!(window.snsn.lang in i18nData)) {
        window.snsn.lang = defaultLocale as Locale;
    }
    window.snsn.i18n = i18nData[window.snsn.lang] ?? i18nData[defaultLocale as Locale] ?? {};
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', refreshI18nUI);
    } else {
        // 既にDOMが読み込まれている場合
        refreshI18nUI();
    }
}