/**
 * @i18n/eo.ts
 * Esperanta traduka dosiero
 */

import { eoCustom } from "./eo.custom";

export const eo = {
    'lang.name': 'Esperanto',
    'lang.locale': 'eo',
    'lang.locale.ogp': 'eo',

    'header.sidebar.toggle': 'baskuligi flankan strion',
    'header.theme.toggle': 'baskuligi temon',
    'header.language.select': 'Elekti lingvon',
    'header.nav.title': 'Navigado',
    'header.nav.home': 'Hejmo',
    'header.nav.category': 'Kategorio',
    'header.nav.tags': 'Etikedoj',
    'header.nav.graph': 'Grafiko',

    'sidebar.nav.title': 'Flanka Strio',
    ...eoCustom
} as const;