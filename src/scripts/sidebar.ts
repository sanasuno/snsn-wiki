/**
 * @scripts/sidebar.ts
 * サイドバー操作スクリプト
 */
import { getPreference, savePreference } from "@scripts/storage";

/**
 * モバイルサイドバーボタンのクリックイベントを設定する関数
 */
export function setupSidebar() {
    // sidebar、sidebar-toggle要素を取得
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');

    sidebarToggle?.addEventListener('click', (e) => {
        // sidebar-toggle要素がクリックされると、イベントの伝播を停止してsidebar要素のopenクラスを切り替える
        e.stopPropagation();
        sidebar?.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
        // ドキュメント全体のクリックを監視し、sidebarが開いている状態でクリックされた要素がsidebarやsidebar-toggleでない場合、sidebarを閉じる
        if (
            sidebar?.classList.contains('open') && // sidebar要素がopenクラスを持っている場合
            !sidebar.contains(e.target as Node) && // sidebar要素がクリックされた要素を含んでいない場合
            !sidebarToggle?.contains(e.target as Node) && // sidebar-toggle要素がクリックされた要素を含んでいない場合
            e.target !== sidebarToggle // クリックされた要素がsidebar-toggle要素ではない場合
        ) {
            sidebar.classList.remove('open'); // sidebar要素のopenクラスを削除
        }
    });
}

/**
 * サイドバーの折りたたみ/展開ボタンのクリックイベントを設定する関数
 */
export function setupSidebarToggle() {
    // data-storage-key 属性を持つボタンを取得し、それぞれに対して処理を実行
    document.querySelectorAll<HTMLButtonElement>('[data-storage-key]').forEach(button => {
        // ボタンのdata-storage-key属性からローカルストレージのキーを取得、キーがなければ処理を終了
        const key = button.dataset.storageKey;
        if (!key) return;

        // ボタンの次の兄弟要素を取得、要素がなければ処理を終了
        const nav = button.nextElementSibling as HTMLElement | null;
        if (!nav) return;

        // ローカルストレージからキーで保存された状態を読み込む
        // ローカルストレージに存在すれば、その状態に応じてaria-expanded属性とcollapsedクラスを設定
        const saved  = getPreference(key);
        if (saved !== null) {
            const isCollapsed = saved === 'true';
            button.setAttribute('aria-expanded', isCollapsed ? 'false' : 'true');
            nav.classList.toggle('collapsed', isCollapsed);
        }

        // クリック時に状態を切り替えてローカルストレージに保存
        button.addEventListener('click', () => {
            // ボタンのaria-expanded属性の値を取得し、expanded状態かどうかを判定
            const isExpanded = button.getAttribute('aria-expanded') === 'true';
            // aria-expanded属性とnav要素のcollapsedクラスを切り替え
            button.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');
            nav.classList.toggle('collapsed', isExpanded);
            // ローカルストレージに保存
            savePreference(key, isExpanded ? 'true' : 'false');
        });
    });
}