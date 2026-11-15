/**
 * @scripts/languageSwitch.ts
 * 言語切り替え関連スクリプト
 */
import { setLocalStorage } from '@scripts/localStorage';

/**
 * 現在のページのロケールを返す関数
 */
function currentLocale(): string {
    return document.documentElement.dataset.lang ?? document.documentElement.lang;
}


let i18nInitialized = false;

/**
 * 現在のロケールを LocalStorage に保存する関数
 */
export function initI18n(): void {
    if (i18nInitialized) return;
    i18nInitialized = true;
    setLocalStorage('locale', currentLocale());
}

/**
 * 言語スイッチャーのイベントを設定する関数
 */
export function languageSwitch(): void {
    const menu = document.querySelector<HTMLDetailsElement>('.language-switcher');
    if (!menu || menu.dataset.initialized === 'true') return;
    menu.dataset.initialized = 'true';

    menu.querySelectorAll<HTMLAnchorElement>('a[hreflang]').forEach((a) => {
        a.addEventListener('click', () => setLocalStorage('locale', a.hreflang));
    });
    document.addEventListener('click', (e) => {
        if (menu.open && e.target instanceof Node && !menu.contains(e.target)) menu.open = false;
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menu.open) {
            menu.open = false;
            menu.querySelector('summary')?.focus();
        }
    });
}