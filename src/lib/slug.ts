/**
 * @lib/slug.ts
 * スラッグ関連のユーティリティ関数
 */

import * as fs from 'fs';
import * as path from 'path';
import { parseFrontmatter } from 'astro/markdown';

type SlugMap = Record<string, string>;

interface SlugMapCache {
    map: SlugMap;
    slugs: Set<string>;
    mtime: number;
    fileListKey: string;
}

interface ParsedFrontmatter {
    meta: Record<string, unknown>;
    body: string;
}

let _cache: SlugMapCache | null = null;

const cachePath = path.resolve(process.cwd(), '.node_modules/.cache/snsn-wiki-slugmap.json');

const wikiDir = path.resolve(process.cwd(), 'src/content/wiki');

/**
 * ディレクトリの最終更新時刻を取得する関数
 * @param dir ディレクトリパス
 * @returns 最終更新時刻
 */
function getDirLatestMtime(dir: string): number {
    let latest = 0;
    if (!fs.existsSync(dir)) return latest;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true})) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            latest = Math.max(latest, getDirLatestMtime(fullPath));
        } else {
            try {
                latest = Math.max(latest, fs.statSync(fullPath).mtimeMs);
            } catch (error) {
                console.error(
                    `Error getting mtime for file ${fullPath}:`,
                    error
                );
            }
        }
    }
    return latest;
}

/**
 * キャッシュファイルの最終更新時刻を取得する関数
 * @returns 最終更新時刻
 */
function getCacheMtime(): number {
    try {
        return fs.statSync(cachePath).mtimeMs;
    } catch (error) {
        return 0;
    }
}

/**
 * テキストをスラッグに変換する関数
 * @param text テキスト
 * @returns スラッグ
 */
export function slugify(text: string): string {
    return text
        .trim()
        .toLowerCase()
        .replace(/[^\p{L}\p{N}\s-]/gu, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

/**
 * フロントマターをパースする関数
 * @param raw 生のテキスト
 * @returns パース結果
 */
function parseNormalizedFrontmatter(raw: string): ParsedFrontmatter {
    const normalized = raw.replace(/\r\n/g, '\n');
    const parsed = parseFrontmatter(normalized);
    return {
        meta: (parsed?.frontmatter as Record<string, unknown>) ?? {},
        body: parsed?.content ?? normalized,
    };
}

export function scanWikiFiles(dir: string, slugs: Set<string>, prefix: string = '', publishOnly: boolean = false): SlugMap {
    const map: SlugMap = {};
    const entries = fs.readdirSync(dir, { withFileTypes: true});
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            Object.assign(map, scanWikiFiles(fullPath, slugs, prefix ? `${prefix}/${entry.name}` : entry.name, publishOnly));
        } else if (entry.name.match(/\.(md|mdx)$/)) {
            const baseName = entry.name.replace(/\.(md|mdx)$/, '');
            const parts = prefix ? prefix.split('/').map(slugify): [];
            const baseSlugParts = parts.slice(1);
            baseSlugParts.push(slugify(baseName));
            const baseSlug = baseSlugParts.join('/');
            map[slugify(baseName)] = baseSlug;

            try {
                const raw = fs.readFileSync(fullPath, 'utf-8');
                const { meta } = parseNormalizedFrontmatter(raw);
                let isDraft = false;
                const titleMatch = meta.title as string | undefined;
                if (titleMatch) {
                    map[slugify(titleMatch.trim())] = baseSlug;
                }
                const aliasLines = meta.aliases as string[] | undefined;
                if (aliasLines) {
                    for (const line of aliasLines) {
                        const a = line.replace(/["']/g, '').trim();
                        if (a) {
                            map[slugify(a)] = baseSlug;
                        }
                    }
                }
                isDraft = meta.draft === true;
                if (!publishOnly || (!isDraft)) {
                    slugs.add(baseSlug);
                }
            } catch (error) {
                console.error(`Error reading gile ${fullPath}:`, error);
            }
        }
    }
    return map;
}

/**
 * ディレクトリ内の MD / MDX ファイルパスを再帰的に取得する関数
 * @param dir ディレクトリパス
 * @param prefix プレフィックス
 * @returns パス配列
 */
function listWikiFiles(dir: string, prefix=''): string[] {
    if (!fs.existsSync(dir)) return [];
    const out: string[] = [];
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            out.push(...listWikiFiles(fullPath, rel));
        } else if (/\.(md|mdx)$/.test(entry.name)) {
            out.push(rel);
        }
    }
    return out.sort();
}

export function buildCache(): SlugMapCache {
    const wikiMtime = getDirLatestMtime(wikiDir);
    const fileList = listWikiFiles(wikiDir);
    const fileListKey = fileList.join('|');

    if (_cache && _cache.mtime == wikiMtime && _cache.fileListKey === fileListKey) {
        return _cache;
    }

    const cacheMtime = getCacheMtime();

    if (cacheMtime > wikiMtime && fs.existsSync(cachePath)) {
        try {
            const raw = fs.readFileSync(cachePath, 'utf-8');
            const { map, slugs: slugArr, fileListKey: cachedKey } = JSON.parse(raw) as { map: SlugMap; slugs: string[]; fileListKey: string};
            if (cachedKey === fileListKey) {
                _cache = { map, slugs: new Set(slugArr), mtime: wikiMtime, fileListKey};
                return _cache;
            }
            console.log('[slugmap] File count has changed, rebuilding cache');
        } catch (error) {
            console.error('Error reading cache file:', error);
        }
    }

    const map: SlugMap = {};
    const slugs = new Set<string>();

    if (fs.existsSync(wikiDir)) {
        const localeDirs = fs.readdirSync(wikiDir, { withFileTypes: true}).filter(dir => dir.isDirectory()).map(dir => dir.name);
        for (const localeDir of localeDirs) {
            const fullLocaleDir = path.join(wikiDir, localeDir);
            const allLocaleSlugs = new Set<string>();
            const localeMap = scanWikiFiles(fullLocaleDir, allLocaleSlugs, localeDir, false);
            Object.assign(map, localeMap);

            const publishedLocaleSlugs = new Set<string>();
            scanWikiFiles(fullLocaleDir, publishedLocaleSlugs, localeDir, true);
            for (const slug of publishedLocaleSlugs) {
                slugs.add(`${localeDir}/${slug}`);
            }
        }
    }
    try {
            fs.mkdirSync(path.dirname(cachePath), { recursive: true});
            fs.writeFileSync(cachePath, JSON.stringify({ map, slugs: [...slugs], fileListKey }, null, 2));
    } catch (error) {
        console.error('[slugmp] Failed to write cache file:', error);
    }
    _cache = { map, slugs, mtime: wikiMtime, fileListKey };
    return _cache;
}

/**
 * スラッグを解決する関数
 * @param text テキスト
 * @param map スラッグマップ
 * @returns スラッグ
 */
export function resolveSlug(text: string, map: SlugMap): string {
    const key = slugify(text);
    return map[key] || key;
}