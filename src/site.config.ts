/**
 * ./src/site.config.ts
 * サイト全体の配信設定ファイル
 * デプロイ先のオリジンやパスを設定する
 */
export const siteConfig = {
    url: 'https://example.com', // 本番サイトのオリジンに変更してください。
    basePath: '/', // 配信パス（サブディレクトリ配信する場合に記述します。不要なら '/' のままです）
    startYear: 2026 // サイト開始年、フッターの表示に利用します。
} as const;