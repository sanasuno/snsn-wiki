/**
 * @scripts/toc.ts
 * TOC操作スクリプト
 */

/**
 * TOCのアクティブ状態を更新する関数
 */
export function setupToc() {
    // TOCのリンクを取得
    const tocLinks = document.querySelectorAll('.toc-nav a');
    if (tocLinks.length > 0) {
        // tocLinksが存在する場合、見出しの可視性を監視するオブザーバーを作成する
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    // 見出しのIDと対応するTOCリンクを取得
                    const id = entry.target.id;
                    const link = document.querySelector(`.toc-nav a[href="#${id}"]`);
                    if (entry.isIntersecting) {
                        // 見出しが可視になった場合、対応するTOCリンクをアクティブにする
                        tocLinks.forEach(l => l.classList.remove('active'));
                        link?.classList.add('active');
                    }
                });
            },
            { rootMargin: '-20% 0% -70% 0%' } // 見出しの可視性を監視するためのマージン
        );
        // h2, h3, h4の見出しを監視対象に追加
        document.querySelectorAll('.main-content h2, .main-content h3, .main-content h4').forEach(
            heading => {
                observer.observe(heading);
            }
        );
    }
}

/**
 * TOCパネルの開閉を制御する関数
 */
export function setupTocDrawer() {
    // TOCパネルとドロワーのボタンを取得
    const tocPanel = document.getElementById('toc-panel');
    const tocDrawerButton = document.getElementById('toc-drawer-button');
    tocDrawerButton?.addEventListener('click', (e) => {
        // TOCドロワーのクリックを検出したら、クリックイベントを停止してTOCパネルの開閉を切り替える
        e.stopPropagation();
        tocPanel?.classList.toggle('open');
    });
    
    // ドキュメント全体のクリックを監視し、TOCパネルが開いている状態でクリックされた要素がTOCパネルやTOCドロワーでない場合、TOCパネルを閉じる
    document.addEventListener('click', (e) => {
        if (
            tocPanel?.classList.contains('open') && // TOCパネルが開いている場合
            !tocPanel.contains(e.target as Node) && // クリックされた要素がTOCパネル内ではない場合
            !tocDrawerButton?.contains(e.target as Node) && // クリックされた要素がTOCドロワーのボタン内ではない場合
            e.target !== tocDrawerButton // クリックされた要素がTOCドロワーのボタンではない場合
        ) {
            tocPanel.classList.remove('open'); // TOCパネルを閉じる
        }
    });
}