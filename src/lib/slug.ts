/**
 * @lib/slug.ts
 * スラッグ関連のユーティリティ関数
 */

import * as fs from 'fs';
import * as path from 'path';
import { parseFrontmatter } from 'astro/markdown';
import { normalizeSlugLike } from './slug-core';

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

const CACHE_VERSION = 2;
const cachePath = path.resolve(process.cwd(), 'node_modules/.cache/snsn-wiki-slugmap.json');

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
        .normalize('NFKC')
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '-');
}

const depth = (s:string) => s.split('/').length;

function register(map: SlugMap, key: string, slug: string): void {
    if (!key) return;
    if (Object.hasOwn(map, key) && map[key] !== slug) {
        console.warn(`[slugmap] ambiguous key "${key}": "${map[key]}" / "${slug}"`);
        if (depth(slug) < depth(map[key])) map[key] = slug;
        return;
    }
    map[key] =slug;
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

/**
 * ウィキファイルをスキャンする関数
 * @param dir ディレクトリ
 * @param slugs スラッグ
 * @param prefix プレフィックス
 * @param publishOnly 
 * @returns 
 */
export function scanWikiFiles(dir: string, slugs: Set<string>, prefix: string, map: SlugMap): void {
    const entries = fs.readdirSync(dir, { withFileTypes: true})
        .sort((a, b) => (a.name < b.name ? -1 : 1));
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            scanWikiFiles(fullPath, slugs, `${prefix}/${entry.name}`, map);
            continue;
        }
        if (!/\.(md|mdx)$/.test(entry.name)) continue;
        
        const [locale, ...dirs] = prefix.split('/');
        const baseName = entry.name.replace(/\.(md|mdx)$/, '');
        const baseSlug = normalizeSlugLike([...dirs, baseName].join('/'));

        if (baseName !== 'index') register(map, slugify(baseName), baseSlug);
        try {
            const { meta } = parseNormalizedFrontmatter(fs.readFileSync(fullPath, 'utf-8'));
            if (typeof meta.title === 'string') register(map, slugify(meta.title), baseSlug);
            if (Array.isArray(meta.aliases)) {
                for (const a of meta.aliases) {
                    if (typeof a === 'string') register(map, slugify(a), baseSlug);
                }
            }
            if (meta.draft !== true) slugs.add(`${locale}/${baseSlug}`);
        } catch (error) {
            console.error(`Error reading file ${fullPath}:`, error);
        }
    }
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

let _lastCheck = 0;

export function buildCache(): SlugMapCache {
    if (_cache && Date.now() - _lastCheck < 1000) return _cache;
    _lastCheck = Date.now();

    const wikiMtime = getDirLatestMtime(wikiDir);
    const fileListKey = listWikiFiles(wikiDir).join('|');
    if (_cache && _cache.mtime === wikiMtime && _cache.fileListKey === fileListKey) return _cache;

    if (getCacheMtime() > wikiMtime && fs.existsSync(cachePath)) {
        try {
            const c = JSON.parse(fs.readFileSync(cachePath, 'utf-8'));
            if (c.version === CACHE_VERSION && c.fileListKey === fileListKey) {
                _cache = { map: c.map, slugs: new Set<string>(c.slugs), mtime: wikiMtime, fileListKey };
                return _cache;
            }
        } catch (error) {
            console.error('Error reading cache file:', error);
        }
    }

    const map: SlugMap = {};
    const slugs = new Set<string>();
    if (fs.existsSync(wikiDir)) {
        for (const d of fs.readdirSync(wikiDir, { withFileTypes: true })) {
            if (d.isDirectory()) scanWikiFiles(path.join(wikiDir, d.name), slugs, d.name, map);
        }
    }
    try {
        fs.mkdirSync(path.dirname(cachePath), { recursive: true });
        fs.writeFileSync(cachePath, JSON.stringify({ version: CACHE_VERSION, map, slugs: [...slugs], fileListKey }));
    } catch (error) {
        console.error('[slugmap] Failed to write cache file:', error);
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
    return Object.hasOwn(map, key) ? map[key] : normalizeSlugLike(text);
}