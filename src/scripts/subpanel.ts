/**
 * @srcipts/subpanel.ts
 * サブパネル操作スクリプト
 */

/**
 * サブパネルのドロワーを設定する関数
 */
export function setupSubpanelDrawer() {
    const subpanel = document.getElementById('subpanel');
    const subpanelDrawerButton = document.getElementById('subpanel-drawer-button');
    if (subpanel && subpanelDrawerButton) {
        subpanelDrawerButton.addEventListener('click', (e) => {
            e.stopPropagation();
            subpanel.classList.toggle('open');
        });
        document.addEventListener('click', (e) => {
            if (
                subpanel.classList.contains('open') &&
                !subpanel.contains(e.target as Node) &&
                !subpanelDrawerButton.contains(e.target as Node) &&
                e.target !== subpanelDrawerButton
            ) {
                subpanel.classList.remove('open');
            }
            if (e.target instanceof Element && e.target.closest('.subpanel')) {
                subpanel.classList.remove('open');
            }
        });
    }
}