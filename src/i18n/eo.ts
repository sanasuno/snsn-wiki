/**
 * @i18n/eo.ts
 * Esperanta traduka dosiero
 */

import { eoCustom } from "./eo.custom";
import type { TranslationKey } from "./keys";

export const eo = {
    'lang.name': 'Esperanto',
    'lang.locale': 'eo',
    'og.locale': 'eo',
    'og.font': 'Noto Sans',

    'header.sidebar.toggle': 'baskuligi flankan strion',
    'header.theme.toggle': 'baskuligi temon',
    'header.language.select': 'Elekti lingvon',
    'header.nav.title': 'Navigado',
    'header.nav.home': 'Hejmo',
    'header.nav.category': 'Kategorio',
    'header.nav.tags': 'Etikedoj',
    'header.nav.graph': 'Grafiko',

    'sidebar.nav.title': 'Flanka Strio',
    
    'footer.privacy': 'Privateca politiko',
    'footer.terms': 'Uzantkondiĉoj',
    
    'toc.title': 'Enhavtabelo',
    'toc.open': 'Malfermi enhavtabelon',

    'homepage.title': 'Hejmo',
    'homepage.description': 'Hejma paĝa priskribo',
    
    'graph.title': 'Grafiko',
    'graph.description': 'Grafika paĝa priskribo',

    '404.title': '404',
    '404.description': 'Paĝo ne trovita',
    
    ...eoCustom
} satisfies Record<TranslationKey, string>;