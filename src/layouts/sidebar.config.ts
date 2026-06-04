/**
 * sidebar.config.ts
 * サイドバーのナビゲーション設定
 * このファイルを編集してサイドバーの構成を変更できます。
 * 
 * セクションの設定:
 * - title: 見出しテキスト（必須）
 * - icon: Font Awesomeのアイコンクラス（省略可）
 * - collapsed: 初期状態で折りたたまれているかどうか（省略可、デフォルトfalse）
 * - items: 手動リンク一覧（指定すると category は無視）
 * - category: 指定カテゴリのWikiページを自動収集（items が空の場合）
 * - autoSort: 'title' | 'order' | 'date' | 'updated' 自動収集時の並び順（省略可、デフォルト'title'）
 * 
 * items 各エントリの設定:
 * - label: 表示名（slug 指定時はページタイトルを直接取得）
 * - slug: src/content/wiki/ 以下のスラッグ
 * - href: 任意URL（slug がない場合に使用）
 * - icon: Font Awesomeのアイコンクラス（省略可）
 * - external: 外部リンクの場合にtrue（省略可、デフォルトfalse）
 */

export interface NavigationItem {
  label?: string;
  slug?: string;
  href?: string;
  icon?: string;
  external?: boolean;
}

export interface NavigationSection {
  title: string;
  icon?: string;
  collapsed?: boolean;
  items?: NavigationItem[];
  category?: string;
  autoSort?: 'title' | 'order' | 'date' | 'updated'; // デフォルト: 'title'
}

/**
 * true にすると、明示されていない全カテゴリをサイドバー末尾に自動追加する
 */
export const autoAddUnknownCategories = true;

export const sidebarNavigation: NavigationSection[] = [
    // -------- クイックリンク（手動） --------
    {
        title: 'sidebar.quickLinks',
        icon: 'fa-solid fa-bolt',
        collapsed: false,
        items: [
            { label: 'sidebar.home', href: '/', icon: 'fa-solid fa-house' },
            { label: 'sidebar.graph', href: '/graph', icon: 'fa-solid fa-diagram-project' },
            { label: 'sidebar.search', href: '/search', icon: 'fa-solid fa-magnifying-glass' },
            { label: 'sidebar.category', href: '/category', icon: 'fa-solid fa-folder' },
            { label: 'sidebar.tags', href: '/tags', icon: 'fa-solid fa-tags' },
            { label: 'sidebar.recent', href: '/recent', icon: 'fa-solid fa-clock-rotate-left' }
        ],
    },

    // -------- サンプル（自動収集） --------
    {
        title: 'sidebar.sampleAuto',
        icon: 'fa-solid fa-book',
        collapsed: true,
        category: 'category.sample', 
        // src/content/wiki/ 以下の category="category.sample" のページを収集、翻訳キーで表示名を自動取得
        // フロントマターには翻訳結果を直接記述する
        autoSort: 'title', // 'title' | 'order' | 'date' | 'updated' デフォルト: 'title'
    },

    // -------- ここにセクションを追加 --------
];