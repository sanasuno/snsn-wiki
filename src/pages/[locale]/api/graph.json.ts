/**
 * src/pages/[locale]/api/graph.json.ts
 * グラフAPI
 */

import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { locales, defaultLocale, type Locale} from '@i18n/i18n.config';
import { extractWikiLinks } from "@lib/wikilinks";
import { toRealSlug, buildSlugMapSync, buildPublishedSlugs } from "@lib/slug/slugmap";
import { isLocale } from "@lib/locale";
import type { GraphNode, GraphLink, GraphData } from "@typeDefs/graph";


/**
 * タグからグループ識別子を返す関数
 * @param tags タグ
 * @returns グループ識別子
 */
/**
 * 記事に付与されたタグの配列から、D3グラフ色分け用のグループ識別文字列を決定する
 * （最初のタグを使用し、タグが無い場合は 'untagged' とする）
 * @param tags タグの配列
 * @returns グループ識別子
 */
function tagToGroup(tags: string[]): string {
    return tags[0] || 'untagged';
}

/**
 * 特定の表示優先ロケールに基づき、Wiki内の全公開ページとそれらの接続関係からグラフ表示用データを構築する
 * @param locale 表示の優先・基準とするロケール（'ja', 'en' など）
 */
export async function buildGraphData(locale: Locale = defaultLocale): Promise<GraphData> {
    // 下書き（draft）および非公開（hidden）になっていないすべてのWiki記事をコレクションから取得
    const pages = await getCollection('wiki', (p) => !p.data.draft && !p.data.hidden);
    const slugs = buildPublishedSlugs(); // 公開済みページの物理スラッグ一覧を取得
    const map = buildSlugMapSync(); // スラッグ解決用マップを取得

    const nodeMap = new Map<string, GraphNode>();

    // ----------------------------------------
    // Step 1: ノード（記事単位の点）の骨格を構築
    // ----------------------------------------
    for (const page of pages) {
        // ファイルID（例: "ja/sample/test"）からロケール名（"ja"）を分離抽出
        const pLocale = page.id.split('/')[0] || defaultLocale;
        // ロケールを除外した実質的なスラッグ名（例: "sample/test"）を取得
        const baseSlug = toRealSlug(page.id);

        // ロケール一致判定
        const isMatch = pLocale === locale;
        // 基準ロケールにはページが存在せず、デフォルトロケール（フォールバック用）に存在するか判定
        const isFallback = pLocale === defaultLocale && !slugs.has(`${locale}/${baseSlug}`);
        
        // 優先ロケールのページか、フォールバック対象 of ページである場合のみノード対象とする
        if (isMatch || isFallback) {
            if (!nodeMap.has(baseSlug)) {
                // まだマップに登録されていない場合は、新規ノードを作成して登録
                nodeMap.set(baseSlug, {
                    id: baseSlug,
                    label: page.data.title,
                    tags: page.data.tags ?? [],
                    group: tagToGroup(page.data.tags ?? []),
                    linkCount: 0,
                    exists: true, // 実在するページノードであることを示すフラグ
                });
            } else if (isMatch) {
                // 既にデフォルト言語版（フォールバック）で登録されているが、
                // 後から優先ロケール版が見つかった場合は優先言語版のデータで上書きする
                const node = nodeMap.get(baseSlug)!;
                node.label = page.data.title;
                node.tags = page.data.tags ?? [];
                node.group = tagToGroup(page.data.tags ?? []);
            }
        }
    }

    // ----------------------------------------
    // Step 2: リンク（ページ同士を繋ぐ辺）の構築
    // ----------------------------------------
    const links: GraphLink[] = [];
    const linkSet = new Set<string>();
    for (const page of pages) {
        const sourceFullSlug = page.id;
        const sourceBody = page.body ?? '';
        const rawLocale = sourceFullSlug.split('/')[0];
        const sourceLocale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
        const sourceBaseSlug = toRealSlug(sourceFullSlug);

        // 基準ロケール以外のページであり、かつ基準ロケール版の同じページがすでにノードに存在する場合は、
        // 基準ロケール版で処理するため、余分なリンク構築を防ぐためにスキップ
        if (sourceLocale !== locale && slugs.has(`${locale}/${sourceBaseSlug}`)) continue;
        // ノードマップに登録されていないソースページはリンク構築対象外
        if (!nodeMap.has(sourceBaseSlug)) continue;

        // 本文内の [[WikiLink]] を走査してリンク先を抽出
        const outboundLinks = extractWikiLinks(sourceBody, sourceLocale, slugs, map);
        for (const targetFullSlug of outboundLinks) {
            // リンク先のスラッグを抽出
            const targetBaseSlug = toRealSlug(targetFullSlug) || targetFullSlug;
            // 自己紹介・自己参照リンク（自身のページへのリンク）はグラフの視認性のためにスキップ
            if (sourceBaseSlug === targetBaseSlug) continue;
            
            // 重複リンク（双方向または同一方向の重複）を避けるために一意のキーで判定
            const linkKey = `${sourceBaseSlug}→${targetBaseSlug}`;
            if (linkSet.has(linkKey)) continue;

            // リンク接続を登録
            linkSet.add(linkKey);
            links.push({ source: sourceBaseSlug, target: targetBaseSlug });

            // ソース側ノードの接続数カウントを増加
            const sourceNode = nodeMap.get(sourceBaseSlug);
            if (sourceNode) sourceNode.linkCount++;

            // もしリンク先ターゲットのノードがStep 1で登録されていなかった場合（例: リンク先ページが未作成）
            if (!nodeMap.has(targetBaseSlug)) {
                // リンク切れノード（プレースホルダー）として新規作成
                nodeMap.set(targetBaseSlug, {
                    id: targetBaseSlug,
                    label: targetBaseSlug,
                    tags: [],
                    group: 'untagged',
                    linkCount: 0,
                    exists: false, // 未作成（実在しない）ページであることを示すフラグ
                });
            }
            // ターゲット側ノードの接続数カウントを増加
            const targetNode = nodeMap.get(targetBaseSlug);
            if (targetNode) targetNode.linkCount++;
        }
    }

    return {
        nodes: Array.from(nodeMap.values()),
        links,
    };
}

/**
 * Astroビルド時にロケールごとのエンドポイントを静的ファイルとして生成するためのパス情報を返す
 */
export async function getStaticPaths() {
    return locales.map(locale => ({ params: { locale } }));
}

/**
 * グラフデータをロケール別 JSON ファイルとして配信する GET ハンドラー
 */
export const GET: APIRoute = async({ params }) => {
    const rawLocale = params.locale;
    // リクエストのロケールパラメータが無効な場合は 404 エラーとする
    if (!rawLocale || !isLocale(rawLocale)) {
        return new Response('Not Found', { status: 404 });
    }
    
    // 対象ロケールに応じたグラフデータを構築
    const data = await buildGraphData(rawLocale);
    return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
    }); 
};