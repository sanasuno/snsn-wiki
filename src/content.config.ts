/**
 * ./src/content.config.ts
 * コレクションローダー
 */

import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const tag = z.string()
    .transform((s) => s.normalize('NFKC').toLowerCase().trim())
    .refine(
        (s) => s.length > 0 && s !== '.' && s !== '..' && !/[\/\\?#%:*"<>|\u0000-\u001f]/.test(s),
        'Tag must be non-empty and must not contain / \\ ? # % : * " < > | control chars, or be "." / ".."'
    );

const wiki = defineCollection({
    loader: glob({
        base: './src/content/wiki',
        pattern: '**/*.{md,mdx}',
        generateId: ({ entry }) => entry.replace(/\.(md|mdx)$/, '')
    }),
    schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        order: z.number().default(99999999),
        aliases: z.array(z.string()).default([]),
        tags: z.array(tag).default([]).transform((tags) => [...new Set(tags)]),
        date: z.coerce.date().optional(),
        updated: z.coerce.date().optional(),
        draft: z.boolean().default(false),
        showSubpanel: z.boolean().default(true),
        isSubpage: z.boolean().default(false),
    }),
});

export const collections = { wiki };