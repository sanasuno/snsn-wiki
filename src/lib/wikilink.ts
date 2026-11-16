/**
 * @lib/wikilink.ts
 * ウィキリンク処理用 remark プラグイン
 */
import type { Root } from 'mdast';
import type { VFile } from 'vfile';
import { visit, SKIP } from 'unist-util-visit';
import { defaultLocale } from '../i18n/i18n.config';
import { isLocale, type Locale } from './i18n';
import { buildCache, resolveSlug, slugify } from './slug';

const wikilinkPattern = '\\[\\[([^\\]|#]+)(?:#([^\\]|]*))?(?:\\|([^\\]]*))?\\]\\]';

/**
 * コードブロック・インラインコードの中身を除去する関数
 * @param code コードテキスト
 * @returns 除去済みテキスト
 */
function stripCodeSpans(code: string): string {
    return code
        .replace(/```[\s\S]*?```/g, '')
        .replace(/`[^`\n]+`/g, '');
}

/**
 * ウィキリンクの参照先スラッグを抽出する関数
 * @param body マークダウン本文
 * @param locale ロケール
 * @param slugSet スラッグセット
 * @param slugMap スラッグマップ
 * @returns スラッグ配列
 */
export function extractWikiLinks(body: string, locale: Locale, slugSet?: Set<string>, slugMap?: Record<string, string>): string[] {
    const map = slugMap || buildCache().map;
    const slugs = slugSet || buildCache().slugs;
    const links: string[] = [];
    const cleanBody = stripCodeSpans(body);

    let match: RegExpExecArray | null;
    const pattern = new RegExp(wikilinkPattern, 'g');
    while ((match = pattern.exec(cleanBody)) !== null) {
        const pageName = match[1].trim();
        const rawSlug = resolveSlug(pageName, map);
        const baseSlug = slugs.has(`${locale}/${rawSlug}`) || slugs.has(`${defaultLocale}/${rawSlug}`) ? rawSlug : slugify(pageName);
        let targetFullSlug = `${locale}/${baseSlug}`;
        if (!slugs.has(targetFullSlug)) {
            if (slugs.has(`${defaultLocale}/${baseSlug}`)) {
                targetFullSlug = `${defaultLocale}/${baseSlug}`;
            }
        }
        links.push(targetFullSlug);
    }
    return [...new Set(links)] as string[];
}

/**
 * ウィキリンクを HTML リンクに変換する remark プラグイン
 * @param options オプション
 * @param options.base ベースパス
 * @returns 
 */
export function remarkWikiLinks(options: { base?: string } = {}) {
    const base = options.base?.replace(/\/$/, '') ?? '';
    return (tree: Root, file: VFile) => {
        const slugMap = buildCache().map
        const existingSlugs = buildCache().slugs;
        const filePath = file?.path || file?.history?.[0] || '';
        const match = filePath.match(/src[\\\/]content[\\\/]iki[\\\/]([^\\\/]+)/);
        const rawLocale = match?.[1];
        const currentLocale = (rawLocale && isLocale(rawLocale)) ? rawLocale : defaultLocale;

        visit(tree, 'text', (node: any, index: number | undefined, parent: any) => {
            if (!parent || index === undefined) return;
            const pattern = new RegExp(wikilinkPattern, 'g');
            const text: string = node.value;
            if (!pattern.test(text)) return;
            pattern.lastIndex = 0;

            const newNodes: any[] = [];
            let lastIndex = 0;
            let m: RegExpExecArray | null;

            while((m = pattern.exec(text)) !== null) {
                if (m.index > lastIndex) {
                    newNodes.push({
                        type: 'text',
                        value: text.slice(lastIndex, m.index)
                    });
                }
                const pageName = m[1].trim();
                const anchor = m[2].trim() || '';
                const displayText = m[3]?.trim() || pageName;
                const baseSlug = resolveSlug(pageName, slugMap);

                let targetLocale = defaultLocale;
                let exists = false;
                if (existingSlugs.has(`${currentLocale}/${baseSlug}`)) {
                    targetLocale = currentLocale;
                    exists = true;
                } else if (existingSlugs.has(`${defaultLocale}/${baseSlug}`)) {
                    targetLocale = defaultLocale;
                    exists = true;
                }

                const hash = anchor ? `#${slugify(anchor)}` : '';
                const href = `${base}/${targetLocale}/wiki/${baseSlug}${hash}`;

                newNodes.push({
                    type: 'link',
                    url: href,
                    data: {
                        hProperties: {
                            class: exists ? 'wikilink' : 'wikilink wikilink-missing',
                            'data-page': baseSlug,
                        },
                    },
                    children: [{
                        type: 'text',
                        value: displayText,
                    }],
                });
                lastIndex = m.index + m[0].length;
            }
            if (lastIndex < text.length) {
                newNodes.push({
                    type: 'text',
                    value: text.slice(lastIndex)
                });
            }
            if (newNodes.length > 0) {
                parent.children.splice(index, 1, ...newNodes);
                return [SKIP, index + newNodes.length];
            }
        });
    };
}