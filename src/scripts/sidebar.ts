/**
 * @scripts/sidebar.ts
 * サイドバー操作スクリプト
 */

/**
 * サイドバー切り替えボタンの状態を設定する関数
 * @param btn ボタン要素
 * @param isOpen 開いているかどうか
 */
function setSidebarToggleBtnState(btn: HTMLButtonElement, isOpen: boolean) {
    btn.setAttribute('aria-pressed', isOpen.toString());
    btn.setAttribute('aria-expanded', isOpen.toString());
    const icon = btn.querySelector('i');
    if (icon) {
        icon.classList.toggle('fa-bars', !isOpen);
        icon.classList.toggle('fa-times', isOpen);
    }
}

/**
 * サイドバー切り替えを初期化する関数
 */
export function sidebarToggle() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;
    const sidebarToggleBtn = document.getElementById('sidebar-toggle');
    if (!(sidebarToggleBtn instanceof HTMLButtonElement)) return;

    if (sidebarToggleBtn.dataset.initialized === 'true') return;
    sidebarToggleBtn.dataset.initialized = 'true';

    const initialOpen = sidebar.classList.contains('open');
    setSidebarToggleBtnState(sidebarToggleBtn, initialOpen);

    sidebarToggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        sidebar.classList.toggle('open');
        const isOpen = sidebar.classList.contains('open');
        setSidebarToggleBtnState(sidebarToggleBtn, isOpen);
    });

    document.addEventListener('click', (e) => {
        if (
            e.target instanceof Element &&
            sidebar.classList.contains('open') &&
            !sidebar.contains(e.target) &&
            !sidebarToggleBtn.contains(e.target)
        ) {
            sidebar.classList.remove('open');
            setSidebarToggleBtnState(sidebarToggleBtn, false);
        }
    });
}

