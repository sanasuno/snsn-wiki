/**
 * @lib/wikilink.ts
 * ウィキリンク処理用プラグイン
 * ※ astro.config.ts から読み込まれるため、エイリアスおよびエイリアスを使う './i18n' は import 禁止
 */
import type { PhrasingContent } from 'mdast';
import type { MdastPluginDefinition } from 'satteri';
import { fileURLToPath } from 'node:url';
import { slug as githubSlug } from 'github-slugger';
import { translations, defaultLocale } from '../i18n/i18n.config';
import { buildCache, resolveSlug } from './slug';

const locales = Object.keys(translations);
const isLocale = (v: string | undefined): v is string => !!v && locales.includes(v);

const wikilinkPattern = '\\[\\[([^\\]|#]+)(?:#([^\\]|]*))?(?:\\|([^\\]]*))?\\]\\]';

/** コードブロック・インラインコードの中身を除去する */
function stripCodeSpans(code: string): string {
    return code
        .replace(/(```|~~~)[\s\S]*?\1/g, '')
        .replace(/`[^`\n]+`/g, '');
}

/** リンク先を解決する。存在判定は全ロケール（fallback ページが生成されるため） */
function resolveTarget(pageName: string, slugMap: Record<string, string>, slugs: Set<string>) {
    const slug = resolveSlug(pageName, slugMap);
    const exists = locales.some((l) => slugs.has(`${l}/${slug}`));
    return { slug, exists };
}

/**
 * 本文中のウィキリンクが指す、存在するページのスラッグ（ロケール無し）を返す（MiniGraph 用）
 */
export function extractWikiLinks(body: string, slugSet?: Set<string>, slugMap?: Record<string, string>): string[] {
    const cache = buildCache();
    const map = slugMap ?? cache.map;
    const slugs = slugSet ?? cache.slugs;
    const found = new Set<string>();
    const pattern = new RegExp(wikilinkPattern, 'g');
    let m: RegExpExecArray | null;
    while ((m = pattern.exec(stripCodeSpans(body))) !== null) {
        const { slug, exists } = resolveTarget(m[1].trim(), map, slugs);
        if (exists) found.add(slug);
    }
    return [...found];
}

/**
 * ウィキリンクを HTML リンクに変換する Sätteri mdast プラグイン
 */
export function remarkWikiLinks(options: { base?: string } = {}): MdastPluginDefinition {
    const base = options.base?.replace(/\/$/, '') ?? '';
    return {
        name: 'remark-wiki-links',
        text(node, ctx) {
            const parent = ctx.parent(node);
            if (parent && (parent.type === 'link' || parent.type === 'linkReference')) return; // ネスト防止

            const filePath = ctx.fileURL?.protocol === 'file:' ? fileURLToPath(ctx.fileURL) : '';
            const rawLocale = filePath.match(/src[\\/]content[\\/]wiki[\\/]([^\\/]+)/)?.[1];
            const currentLocale = isLocale(rawLocale) ? rawLocale : defaultLocale;

            const { map: slugMap, slugs } = buildCache();
            const text = node.value;

            const pattern = new RegExp(wikilinkPattern, 'g');
            const newNodes: PhrasingContent[] = [];
            let last = 0;
            let m: RegExpExecArray | null;

            while ((m = pattern.exec(text)) !== null) {
                if (m.index > last) newNodes.push({ type: 'text', value: text.slice(last, m.index) });

                const pageName = m[1].trim();
                const anchor = m[2]?.trim() ?? '';
                const displayText = m[3]?.trim() || pageName;
                const { slug, exists } = resolveTarget(pageName, slugMap, slugs);

                // ロケールは現在のまま（無ければ fallback ページが表示される）
                const href = `${base}/${currentLocale}/wiki/${slug ? `${slug}/` : ''}${anchor ? `#${githubSlug(anchor)}` : ''}`;

                newNodes.push({
                    type: 'link',
                    url: href,
                    data: {
                        hProperties: {
                            class: exists ? 'wikilink' : 'wikilink wikilink-missing',
                            'data-page': slug,
                        },
                    },
                    children: [{ type: 'text', value: displayText }],
                });
                last = m.index + m[0].length;
            }

            if (newNodes.length === 0) return;
            if (last < text.length) newNodes.push({ type: 'text', value: text.slice(last) });
            ctx.replaceNode(node, newNodes);
        },
    };
}