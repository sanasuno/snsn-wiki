/**
 * @scripts/i18n.ts
 * i18n関連スクリプト
 */

import { defaultLocale, type Locale } from "@i18n/i18n.config";
import { isLocale } from "@lib/locale";
import { getLocalStorage, setLocalStorage } from "@scripts/localStorage";

/**
 * ロケールを解決する関数
 * @param htmlLang HTMLのlang属性
 * @returns ロケール
 */
export function resolveLocale(htmlLang: string): Locale {
    if (isLocale(htmlLang)) {
        return htmlLang;
    }
    const storedLocale = getLocalStorage("locale");
    if (storedLocale && isLocale(storedLocale)) {
        return storedLocale;
    }
    return defaultLocale;
}

export function initI18n() {
    const htmlLang = document.documentElement.dataset.lang ?? '';
    const resolvedLocale = resolveLocale(htmlLang);
    setLocalStorage("locale", resolvedLocale);
}