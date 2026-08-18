/**
 * ./src/content.config.ts
 * コレクションローダー
 */

import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const wiki = defineCollection({
    loader: glob({ base: './src/content/wiki', pattern: '**/*.{md,mdx}'}),
    schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        order: z.number().default(0),
        aliases: z.array(z.string()).default([]),
        tags: z.array(z.string()).default([]),
        date: z.coerce.date().optional(),
        updated: z.coerce.date().optional(),
        draft: z.boolean().default(false),
        subpage: z.boolean().default(false),
    }),
});

export const collections = { wiki };
