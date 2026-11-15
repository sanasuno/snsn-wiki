import type { APIRoute } from 'astro';
import { getBaseUrl } from '@lib/path';

export const GET: APIRoute = ({ site }) =>
    new Response(
        `User-agent: *\nAllow: /\n\nSitemap: ${new URL(`${getBaseUrl()}sitemap-index.xml`, site)}\n`,
        { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
    );