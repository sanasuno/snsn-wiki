/**
 * @scripts/language.ts
 * 言語切替スクリプト
 */
import { savePreference } from '@scripts/storage';
import { defaultLocale } from '@i18n/i18n.config';

/**
 * 言語スイッチャーをセットアップする関数
 * @description 言語選択ドロップダウンの変更イベントを設定する
 */
export function setupLanguageSwitcher() {
    const langSelect = document.getElementById('lang-list'); // lang-list要素を取得
    if (!(langSelect instanceof HTMLSelectElement)) {
        // lang-list要素が存在しない場合は終了
        return;
    }
    langSelect.addEventListener('change', () => {
        // 選択された言語を取得し、ローカルストレージに保存
        const nextLang = langSelect.value;
        savePreference('lang', nextLang);

        // Link要素から対応する言語のURLを取得し、ページが存在すれば遷移する
        const altLink = document.querySelector<HTMLLinkElement>(`link[rel="alternate"][hreflang="${nextLang}"]`);
        if (altLink?.href) {
            window.location.assign(altLink.href);
            return;
        }

        // Link要素からデフォルト言語のURLを取得し、ページが存在すれば遷移する
        const rootLink = document.querySelector<HTMLLinkElement>(`link[rel="alternate"][hreflang="${defaultLocale}"]`);
        if (rootLink?.href) {
            window.location.assign(rootLink.href);
            return;
        }

        // どちらも存在しない場合はリロードしてUI言語設定だけ適用
        window.location.reload();
    });
}