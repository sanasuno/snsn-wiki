/**
 * @layouts/sidebar.config.ts
 * サイドバーのナビゲーション設定
 * このファイルを編集してサイドバーの構成を変更できます。
 * 
 * セクションの設定:
 * - titleKey: 翻訳キー（必須）
 * - icon: Font Awesomeのアイコンクラス（省略可）
 * - collapsed: 初期状態で折りたたまれているかどうか（省略可、デフォルトfalse）
 * - items: 手動リンク一覧
 * - category: 指定カテゴリのWikiページを自動収集、itemsが指定されていない場合にのみ有効
 * - autoSort: 'title' | 'order' | 'date' | 'updated' 自動収集時の並び順（省略可、デフォルト'title'）
 * 
 * items 各エントリの設定:
 * - slug: src/content/wiki/ 以下のスラッグ
 * - href: 任意URL（slug がない場合に使用）
 * - i18nKey: 表示名（slug 指定時はページタイトルを直接取得）
 * - icon: Font Awesomeのアイコンクラス（省略可）
 * - external: 外部リンクの場合にtrue（省略可、デフォルトfalse）
 */

/**
 * サイドバーのナビゲーションアイテム
 * 
 * @property slug - Wikiページのスラッグ（src/content/wiki/以下のファイル名）
 * @property href - 外部リンクのURL（slugがない場合に使用）
 * @property i18nKey - 表示名（slug指定時はページタイトルを直接取得）
 * @property icon - Font Awesomeのアイコンクラス
 * @property external - 外部リンクの場合にtrue
 */
export type NavigationItem = {
    slug?: string;
    href?: string;
    i18nKey?: string;
    icon?: string;
    external?: boolean;
};

/**
 * ソートモード、Sidebar.astroでデフォルトをtitleに設定
 * - title: タイトル順
 * - order: order.frontmatterの数値順（数値が小さい方が上）
 * - date: 発行日順（古いものが上）
 * - updated: 更新日順（新しいものが上）
 */
export type SortMode = 'title' | 'order' | 'date' | 'updated';

/**
 * サイドバーのナビゲーションセクション
 * 
 * @property titleKey - 翻訳キー（必須）
 * @property icon - Font Awesomeのアイコンクラス（省略可）
 * @property collapsed - 初期状態で折りたたまれているかどうか（省略可、デフォルトfalse）
 * @property items - 手動リンク一覧
 * @property category - 指定カテゴリのWikiページを自動収集、itemsが指定されていない場合にのみ有効
 * @property autoSort - 自動収集時の並び順（省略可、デフォルト'title'）
 */
export type NavigationSection = {
    titleKey: string;
    icon?: string;
    collapsed?: boolean;
    items?: NavigationItem[];
    category?: string;
    autoSort?: SortMode;
};

/**
 * サイドバーに表示しきれていない未定義カテゴリの自動処理設定
 * true に設定すると、以下の `sidebarNavigation` 配列で明示的に定義されていない
 * すべてのカテゴリを、自動でサイドバーの末尾にセクションとして追加します。
 */
export const autoAddUnknownCategories = true;

/**
 * 自動追加されるカテゴリの階層表現設定
 * true に設定すると、深い階層（例: "parent/child/leaf"）を持つカテゴリについて、
 * 末尾の葉カテゴリ（"leaf"）単位でグループ化した形でサイドバーに出力します。
 */
export const autoGroupByLeafCategory = true;

/**
 * サイドバーナビゲーション全体の構成定義
 * 各セクションはオブジェクト形式で定義され、手動リンク (`items`) または
 * 指定カテゴリの自動収集 (`category` と `autoSort`) のいずれか一方を設定します。
 * 
 * 設定例 (新しいカテゴリセクションを手動で追加したい場合):
 * ```ts
 * {
 *   titleKey: 'sidebar.mySection', // i18n 設定にある翻訳キー
 *   icon: 'fa-solid fa-gear',      // 表示したい Font Awesome アイコンクラス
 *   collapsed: false,              // 初期ロード時に展開しておく場合は false
 *   category: 'my-category',       // 記事の frontmatter 等で設定したカテゴリフォルダ名
 *   autoSort: 'order',             // order メタデータ値順で並べ替え
 * }
 * ```
 */
export const sidebarNavigation: NavigationSection[] = [
    // -------- クイックリンク（手動による固定ナビゲーション一覧） --------
    {
        titleKey: 'sidebar.quickLinks',
        icon: 'fa-solid fa-bolt',
        collapsed: false,
        items: [
            { i18nKey: 'sidebar.home', href: '/', icon: 'fa-solid fa-house' },
            { i18nKey: 'sidebar.graph', href: '/graph', icon: 'fa-solid fa-diagram-project' },
            { i18nKey: 'sidebar.search', href: '/search', icon: 'fa-solid fa-magnifying-glass' },
            { i18nKey: 'sidebar.category', href: '/category', icon: 'fa-solid fa-folder' },
            { i18nKey: 'sidebar.tags', href: '/tag', icon: 'fa-solid fa-tags' },
            { i18nKey: 'sidebar.recent', href: '/recent', icon: 'fa-solid fa-clock-rotate-left' },
            { i18nKey: 'sidebar.pages', href: '/pages', icon: 'fa-solid fa-list' }
        ],
    },

    // -------- サンプルセクション（自動収集リンク一覧） --------
    {
        titleKey: 'sidebar.sampleAuto',
        icon: 'fa-solid fa-book',
        collapsed: true,
        category: 'sample', // src/content/wiki/sample/ 配下にあるドキュメントファイルを自動スキャンして表示
        autoSort: 'title', // ソート基準。'title' | 'order' | 'date' | 'updated' から選べます。デフォルトは 'title'
    },

    // -------- ここにセクションを追加可能 --------
] satisfies NavigationSection[];