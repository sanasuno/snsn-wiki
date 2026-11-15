/**
 * @scripts/subpanel.ts
 * サブパネル操作スクリプト
 */

/**
 * サブパネルのドロワーを設定する関数
 */
export function setupSubpanelDrawer() {
    const subpanel = document.getElementById('subpanel');
    const button = document.getElementById('subpanel-drawer-button');
    if (!subpanel || !button) return;

    const syncState = (open: boolean) => {
        button.setAttribute('aria-expanded', String(open));
        const label = open ? button.dataset.labelClose : button.dataset.labelOpen;
        if (label) button.setAttribute('aria-label', label);
    };

    const setOpen = (open: boolean) => {
        subpanel.classList.toggle('open', open);
        syncState(open);
        if (open) document.dispatchEvent(new CustomEvent('drawer:open', { detail: 'subpanel' }));
    };

    button.addEventListener('click', (e) => {
        e.stopPropagation();
        setOpen(!subpanel.classList.contains('open'));
    });

    document.addEventListener('drawer:open', (e) => {
        if ((e as CustomEvent<string>).detail !== 'subpanel') {
            subpanel.classList.remove('open');
            syncState(false);
        }
    });

    document.addEventListener('click', (e) => {
        if (!(e.target instanceof Element) || !subpanel.classList.contains('open')) return;
        const outside = !subpanel.contains(e.target) && !button.contains(e.target);
        if (outside || e.target.closest('.subpanel a')) setOpen(false);
    });

    const bp = getComputedStyle(document.documentElement).getPropertyValue('--subpanel-breakpoint').trim() || '768px';
    matchMedia(`(width >= ${bp})`).addEventListener('change', (e) => {
        if (e.matches) setOpen(false);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && subpanel.classList.contains('open')) {
            setOpen(false);
            button.focus();
        }
    });
}