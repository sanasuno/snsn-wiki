/**
 * @scripts/toc.ts
 * 目次操作スクリプト
 */

/**
 * 目次のハイライトを設定する関数
 */
export function setUpToc() {
    const tocLinks = document.querySelectorAll('.toc-nav a');
    if (tocLinks.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const id = entry.target.id;
                const link = document.querySelector(`.toc-nav a[href="#${id}"]`);
                if (entry.isIntersecting) {
                    tocLinks.forEach(l => l.classList.remove('active'));
                    link?. classList.add('active');
                }
            });
        },
        { rootMargin: '-20% 0% -70% 0%' }
    );
    document.querySelectorAll('.main-content h2, .main-content h3, .main-content h4' ).forEach((heading) => {
        observer.observe(heading);
    });
    }
}