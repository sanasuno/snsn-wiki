/**
 * @lib/og-image.ts
 * OGP画像生成用スクリプト
 */
import { readFileSync } from "node:fs";
import path from "node:path";
import satori, { type FontWeight } from "satori";
import { Resvg } from "@resvg/resvg-js";

// フォントを配置するディレクトリの設定
const FONT_DIR = path.resolve(process.cwd(), 'src/assets/fonts');

let fontsCache: { name: string; data: Buffer; weight: FontWeight; style: 'normal' }[] | null = null;

/**
 * フォントを読み込む
 * @returns フォントの配列
 */
function loadFonts() {
    if (fontsCache) return fontsCache;
    fontsCache = [
        { name: 'Noto Sans', data: readFileSync(path.join(FONT_DIR, 'NotoSans-Regular.ttf')), weight: 400, style: 'normal' },
        { name: 'Noto Sans', data: readFileSync(path.join(FONT_DIR, 'NotoSans-Bold.ttf')), weight: 700, style: 'normal' },
        { name: 'Noto Sans JP', data: readFileSync(path.join(FONT_DIR, 'NotoSansJP-Regular.ttf')), weight: 400, style: 'normal' },
        { name: 'Noto Sans JP', data: readFileSync(path.join(FONT_DIR, 'NotoSansJP-Bold.ttf')), weight: 700, style: 'normal' },
    ];
    return fontsCache;
}

/**
 * OGP画像生成用のパラメータ
 * @param title タイトル
 * @param description 説明文
 * @param category カテゴリ
 * @param siteName サイト名
 */
interface OgImageParams {
    title: string;
    description?: string;
    category?: string;
    siteName?: string;
}

/**
 * OGP画像をレンダリングする関数
 * @param param0 OGP画像生成用のパラメータ
 * @returns OGP画像のバッファ
 */
export async function renderOgImage({ title, description, category, siteName }: OgImageParams): Promise<Buffer> {
    const width = 1200;
    const height = 630;

    const vnode = {
        type: 'div',
        props: {
            style: {
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '64px',
                background: '#0f1115',
                color: '#f5f5f5',
                fontFamily: 'Noto Sans, Noto Sans JP',
            },
            children: [
                {
                    type: 'div',
                    props: {
                        style: {
                            fontSize: 28,
                            opacity: 0.7
                        },
                        children: siteName
                    }
                },
                {
                    type: 'div',
                    props: {
                        style: {
                            display: 'flex',
                            flexDirection: 'column',
                        },
                        children: [
                            {
                                type: 'div',
                                props: {
                                    style: {
                                        fontSize: 56,
                                        fontWeight: 700,
                                        lineHeight: 1.3
                                    },
                                    children: title,
                                },
                            },
                            description
                                ? {
                                    type: 'div',
                                    props: {
                                        style: {
                                            fontSize: 30,
                                            opacity: 0.8,
                                            marginTop: 16
                                        },
                                        children: description
                                    }
                                }
                                : null,
                        ].filter(Boolean)
                    }
                },
                category
                    ? {
                        type: 'div',
                        props: {
                            style: {
                                display: 'flex',
                                flexWrap: 'wrap',
                            },
                            children: {
                                type: 'div',
                                props: {
                                    style: {
                                        fontSize: 24,
                                        padding: '6px 16px',
                                        borderRadius: 999,
                                        border: '1px solid rgba(245,245,245,0.4)',
                                    },
                                    children: category,
                                },
                            },
                        },
                    }
                    : null,
            ].filter(Boolean),
        },
    };

    const svg = await satori(vnode as any, { width, height, fonts: loadFonts() });
    const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: width} });
    return resvg.render().asPng();
}