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

/**
 * 言語スイッチャーの選択状態を現在のロケールに合わせる関数
 */
function updateLanguageSwitcher(): void {
    const select = document.getElementById('language-list') as HTMLSelectElement | null;
    if (select) select.value = currentLocale();
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
    const languageList = document.getElementById('language-list') as HTMLSelectElement | null;
    if (!languageList) return;

    // 二重登録防止
    if (languageList.dataset.languageSwitchInitialized === 'true') return;
    languageList.dataset.languageSwitchInitialized = 'true';

    updateLanguageSwitcher();
    // bfcache 復帰時に選択状態を現在のロケールへ戻す
    window.addEventListener('pageshow', updateLanguageSwitcher);

    languageList.addEventListener('change', () => {
        const option = languageList.selectedOptions[0];
        const href = option?.dataset.href;
        if (!option || !href) {
            // 遷移先がない場合は選択を戻して終了
            updateLanguageSwitcher();
            return;
        }
        setLocalStorage('locale', option.value);
        window.location.href = href;
    });
}