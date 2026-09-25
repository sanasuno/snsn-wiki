/**
 * @lib/og-image.ts
 * OGP画像生成用スクリプト
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import satori, { type FontWeight } from "satori";
import { Resvg } from "@resvg/resvg-js";

const FONT_DIR = fileURLToPath(new URL('../assets/fonts/', import.meta.url));

let fontsCache: { name: string; data: Buffer; weight: FontWeight; style: 'normal' }[] | null = null;

function loadFonts() {
    if (fontsCache) return fontsCache;
    fontsCache = [
        { name: 'Noto Sans', data: readFileSync(`${FONT_DIR}NotoSans-Regular.ttf`), weight: 400, style: 'normal' },
        { name: 'Noto Sans', data: readFileSync(`${FONT_DIR}NotoSans-Bold.ttf`), weight: 700, style: 'normal' },
        { name: 'Noto Sans JP', data: readFileSync(`${FONT_DIR}NotoSansJP-Regular.ttf`), weight: 400, style: 'normal' },
        { name: 'Noto Sans JP', data: readFileSync(`${FONT_DIR}NotoSansJP-Bold.ttf`), weight: 700, style: 'normal' },
    ];
    return fontsCache;
}

interface OgImageParams {
    title: string;
    description?: string;
    category?: string;
    siteName?: string;
    font: string;
}

export async function renderOgImage({ title, description, category, siteName, font }: OgImageParams): Promise<Buffer> {
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
                fontFamily: font,
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