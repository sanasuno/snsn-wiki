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
function updateLanguageSwitcher() {
    const selected = document.getElementById("language-list") as HTMLSelectElement;
    if (!selected) return;
    const locale = getLocalStorage("locale");
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
}

/**
 * すべての翻訳を適用する関数
 */
function applyTranslations() {
    Object.entries(handlers).forEach(([attr, handler]) => {
        const elements = document.querySelectorAll(`[${attr}]`);
        const locale = getLocalStorage("locale");
        if (locale && isLocale(locale)) {
            elements.forEach((el) => {
                const key = el.getAttribute(attr);
                if (key && isTranslationKey(key)) {
                    handler(el, t(key, locale));
                }
            });
        }
    });
}

/**
 * i18n UIを更新する関数
 */
function refreshI18nUI() {
    updateLanguageSwitcher();
    applyTranslations();
}

/**
 * i18nを初期化する関数
 */
export function initI18n() {
    const htmlLang = document.documentElement.dataset.lang ?? '';
    const resolvedLocale = resolveLocale(htmlLang);
    setLocalStorage("locale", resolvedLocale);
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', refreshI18nUI);
    } else {
        refreshI18nUI();
    }
}

/**
 * 言語スイッチャーのイベントを設定する関数
 */
export function languageSwitch() {
    const languageList = document.getElementById("language-list") as HTMLSelectElement;
    if (!languageList) return;

    languageList.addEventListener("change", () => {
        const selectedLocale = languageList.value;
        if (isLocale(selectedLocale)) {
            setLocalStorage("locale", selectedLocale);
        }
        const altLink = document.querySelector<HTMLLinkElement>(`link[rel="alternate"][hreflang="${selectedLocale}"]`);
        if (altLink && altLink.href) {
            window.location.href = altLink.href;
            return;
        }
        const defaultLocaleLink = document.querySelector<HTMLLinkElement>('link[rel="alternate"][hreflang="x-default"]');
        if (defaultLocaleLink && defaultLocaleLink.href) {
            window.location.href = defaultLocaleLink.href;
            return;
        }
        window.location.reload();
    })
}
