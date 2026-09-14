/**
 * @scripts/i18n.ts
 * i18n関連スクリプト
 */

import { t, defaultLocale, type Locale } from "@i18n/i18n.config";
import { isLocale, isTranslationKey } from "@lib/locale";
import { getLocalStorage, setLocalStorage } from "@scripts/localStorage";

/**
 * ロケールを解決する関数
 * @param htmlLang HTMLのlang属性
 * @returns ロケール
 */
function resolveLocale(htmlLang: string): Locale {
    if (isLocale(htmlLang)) {
        return htmlLang;
    }
    const storedLocale = getLocalStorage("locale");
    if (storedLocale && isLocale(storedLocale)) {
        return storedLocale;
    }
    return defaultLocale;
}

/**
 * 言語スイッチャーを更新する関数
 */
function updateLanguageSwitcher(): void {
    const selected = document.getElementById("language-list") as HTMLSelectElement | null;
    if (!selected) return;

    const locale = document.documentElement.lang || getLocalStorage("locale");
    if (locale) {
        selected.value = locale;
    }
}

/**
 * 翻訳ハンドラ
 */
const handlers: Record<string, (el: Element, text: string) => void> = {
    'data-i18n': (el, text) => {
        el.textContent = text;
    }
};

/**
 * すべての翻訳を適用する関数
 */
function applyTranslations(): void {
    const locale = getLocalStorage("locale");
    if (!locale || !isLocale(locale)) return;

    Object.entries(handlers).forEach(([attr, handler]) => {
        const elements = document.querySelectorAll(`[${attr}]`);
        elements.forEach((el) => {
            const key = el.getAttribute(attr);
            if (key && isTranslationKey(key)) {
                handler(el, t(key, locale));
            }
        });
    });
}

/**
 * i18n UIを更新する関数
 */
function refreshI18nUI(): void {
    updateLanguageSwitcher();
    applyTranslations();
}

let i18nInitialized = false;

/**
 * i18nを初期化する関数
 */
export function initI18n(): void {
    if (i18nInitialized) return;
    i18nInitialized = true;

    const htmlLang = document.documentElement.dataset.lang ?? '';
    const resolvedLocale = resolveLocale(htmlLang);

    // HTML lang 属性と LocalStorage を同期
    document.documentElement.lang = resolvedLocale;
    setLocalStorage("locale", resolvedLocale);

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', refreshI18nUI, { once: true });
    } else {
        refreshI18nUI();
    }
}

/**
 * 言語スイッチャーのイベントを設定する関数
 */
export function languageSwitch(): void {
    const languageList = document.getElementById("language-list") as HTMLSelectElement | null;
    if (!languageList) return;

    // 二重登録防止
    if (languageList.dataset.languageSwitchInitialized === 'true') return;
    languageList.dataset.languageSwitchInitialized = 'true';

    languageList.addEventListener("change", () => {
        const selectedLocale = languageList.value;

        // ロケール検証
        if (!isLocale(selectedLocale)) {
            console.warn(`Invalid locale: ${selectedLocale}`);
            return;
        }

        // LocalStorage に保存
        setLocalStorage("locale", selectedLocale);

        // hreflang リンクで言語ページへナビゲート
        const altLink = document.querySelector<HTMLLinkElement>(
            `link[rel="alternate"][hreflang="${selectedLocale}"]`
        );
        if (altLink?.href) {
            window.location.href = altLink.href;
            return;
        }

        // x-default へのフォールバック
        const defaultLocaleLink = document.querySelector<HTMLLinkElement>(
            'link[rel="alternate"][hreflang="x-default"]'
        );
        if (defaultLocaleLink?.href) {
            window.location.href = defaultLocaleLink.href;
            return;
        }

        // 最終手段：ページリロード
        window.location.reload();
    });
}