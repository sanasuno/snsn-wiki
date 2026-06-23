/**
 * @scripts/codeblock.ts
 * 
 * コードブロックのコピー機能を設定するスクリプト
 */

/**
 * コードブロックのコピー機能を設定する関数
 */
export function codeblock() {
    document.querySelectorAll('pre[data-language]').forEach(function (pre) {
        if (pre.getAttribute('data-language') === 'mermaid') return;

        const btn = document.createElement('button');
        btn.className = 'code-copy-button';
        btn.setAttribute('aria-label', 'Copy code');
        btn.innerHTML = '<i class="fa-regular fa-copy" />';

        btn.addEventListener('click', function() {
            const lines = pre.querySelectorAll('.line');
            const text = lines.length > 0
                ? Array.from(lines).map(function (l) {
                    return l.textContent;
                }).join('\n')
                : (pre.querySelector('code')?.textContent ?? pre.textContent ?? '');
            
            navigator.clipboard.writeText(text).then(function () {
                btn.innerHTML = '<i class="fa-solid fa-check" />';
                btn.classList.add('copied');

                setTimeout(function () {
                    btn.innerHTML = '<i class="fa-regular fa-copy" />';
                    btn.classList.remove('copied');
                }, 2000);
            }).catch(function () {
                btn.innerHTML = '<i class="fa-solid fa-xmark" />';
                setTimeout(function () {
                    btn.innerHTML = '<i class="fa-regular fa-copy" />';
                }, 2000);
            });
        });
        (pre as HTMLElement).style.position = 'relative';
        pre.appendChild(btn);
    });
}
