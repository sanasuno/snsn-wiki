/**
 * @i18n/ja.ts
 * 日本語翻訳ファイル
 */

import { jaCustom } from "./ja.custom";
import type { TranslationKey } from "./keys";

export const ja = {
    'lang.name': '日本語',
    'lang.locale': 'ja-JP',
    'og.locale': 'ja_JP',
    'og.font': 'Noto Sans JP',

    'header.sidebar.toggle': 'サイドバー切り替え',
    'header.theme.toggle': 'テーマ切り替え',
    'header.language.select': '言語選択',
    'header.nav.title': 'ナビゲーション',
    'header.nav.home': 'ホーム',
    'header.nav.category': 'カテゴリ',
    'header.nav.tags': 'タグ',
    'header.nav.graph': 'グラフ',

    'sidebar.nav.title': 'サイドバー',

    '404.title': '404',
    '404.description': 'ページが見つかりません',
    
    'footer.privacy': 'プライバシーポリシー',
    'footer.terms': '利用規約',
    
    'toc.title': '目次',
    'toc.open': '目次を開く',

    'homepage.title': 'ホーム',
    'homepage.description': 'ホームページの説明',

    'graph.title': 'グラフ',
    'graph.description': 'グラフの説明',
    
    ...jaCustom
} satisfies Record<TranslationKey, string>;