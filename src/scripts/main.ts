/**
 * @scripts/main.ts
 * メインスクリプト
 */
import { themeToggle } from '@scripts/theme';
import { sidebarToggle, sidebarSections, revealCurrentLink } from '@scripts/sidebar';
import { languageSwitch } from '@scripts/languageSwitch';
import { setUpToc } from '@scripts/toc';
import { setupSubpanelDrawer } from '@scripts/subpanel';

themeToggle();
sidebarToggle();
sidebarSections();
revealCurrentLink();
languageSwitch();
setUpToc();
setupSubpanelDrawer();
