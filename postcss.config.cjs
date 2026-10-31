const tokens = require('./src/layout.tokens.json');

const px = (n) => `${n}px`;

// 3カラム（sidebar + 本文 + subpanel）が収まる最小幅
const subpanelAt =
    tokens.sidebarWidth +
    tokens.subpanelWidth +
    tokens.contentMinWidth +
    tokens.contentPadding.wide * 2;

// サブパネルなしのページで wide padding が収まる最小幅
const noSubpanelAt =
    tokens.sidebarWidth +
    tokens.contentMinWidth +
    tokens.contentPadding.wide * 2;

const layoutTokens = () => ({
    postcssPlugin: 'layout-tokens',
    Once(root, { AtRule, Rule, Declaration }) {
        // 全CSSファイルに @custom-media を注入
        // postcss-custom-media より前に実行する
        root.prepend(
            new AtRule({ name: 'custom-media', params: `--subpanel-collapsed (width < ${px(subpanelAt)})` }),
            new AtRule({ name: 'custom-media', params: `--no-subpanel-collapsed (width < ${px(noSubpanelAt)})`}),
            new AtRule({ name: 'custom-media', params: `--sidebar-collapsed (width <= ${px(tokens.mobileBreakpoint)})` }),
            new AtRule({ name: 'custom-media', params: `--header-compact (width <= ${px(tokens.headerLabelBreakpoint)})` })
        );

        // :root の寸法変数は theme.css にだけ注入
        if (/theme\.css$/.test(root.source?.input.file ?? '')) {
            const decls = {
                '--content-max-width': px(tokens.contentMaxWidth),
                '--sidebar-width': px(tokens.sidebarWidth),
                '--subpanel-width': px(tokens.subpanelWidth),
                '--subpanel-breakpoint': px(subpanelAt),
                '--mobile-breakpoint': px(tokens.mobileBreakpoint),
                '--content-padding-wide': px(tokens.contentPadding.wide),
                '--content-padding-medium': px(tokens.contentPadding.medium),
                '--content-padding-narrow': px(tokens.contentPadding.narrow),
            };
            const rule = new Rule({ selector: ':root', source: root.source });
            for (const [prop, value] of Object.entries(decls)) {
                rule.append(new Declaration({ prop, value, source: root.source }));
            }
            root.prepend(rule);
        }
    },
});
layoutTokens.postcss = true;

module.exports = {
    plugins: [
        layoutTokens(),
        require('postcss-custom-media'),
        require('postcss-preset-env'),
    ],
};