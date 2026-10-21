/**
 * @srcipts/subpanel.ts
 * サブパネル操作スクリプト
 */

/**
 * サブパネルのドロワーを設定する関数
 */
export function setupSubpanelDrawer() {
    const subpanel = document.getElementById('subpanel');
    const button = document.getElementById('subpanel-drawer-button');
    if (!subpanel || !button) return;

    const setOpen = (open: boolean) => {
        subpanel.classList.toggle('open', open);
        button.setAttribute('aria-expanded', String(open));
        if (open) document.dispatchEvent(new CustomEvent('drawer:open', { detail: 'subpanel' }));
    };

    button.addEventListener('click', (e) => {
        e.stopPropagation();
        setOpen(!subpanel.classList.contains('open'));
    });

    document.addEventListener('drawer:open', (e) => {
        if ((e as CustomEvent<string>).detail !== 'subpanel') {
            subpanel.classList.remove('open');
            button.setAttribute('aria-expanded', 'false');
        }
    });

    document.addEventListener('click', (e) => {
        if (!(e.target instanceof Element) || !subpanel.classList.contains('open')) return;
        const outside = !subpanel.contains(e.target) && !button.contains(e.target);
        if (outside || e.target.closest('.subpanel a')) setOpen(false);
    });
}