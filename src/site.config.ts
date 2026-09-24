/**
 * ./src/site.config.ts
 * サイト全体の配信設定ファイル
 * デプロイ先のオリジンやパスを設定する
 */
export const siteConfig = {
    url: 'https://example.com', // 本番サイトのオリジン
    basePath: '/snsn-wiki' // 配信パス（サブディレクトリ配信する場合記述、不要なら'/'）
} as const;