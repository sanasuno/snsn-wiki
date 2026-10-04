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

    'fallback.notice': 'このページには現在日本語訳がありません。',

    'meta.created': '作成日',
    'meta.updated': '更新日',

    '404.title': '404',
    '404.description': 'ページが見つかりません',
    
    'privacy.title': 'プライバシーポリシー',
    'privacy.description': 'プライバシーポリシーの説明',
    'terms.title': '利用規約',
    'terms.description': '利用規約の説明',
    
    'subpanel.open': '目次を開く',
    'subpanel.close': '目次を閉じる',

    'toc.title': '目次',
    
    'homepage.title': 'ホーム',
    'homepage.description': 'ホームページの説明',

    'graph.title': 'グラフ',
    'graph.description': 'グラフの説明',
    
    ...jaCustom
} satisfies Record<TranslationKey, string>;