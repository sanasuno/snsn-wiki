/**
 * @scripts/main.ts
 * メインスクリプト
 */
import { themeToggle } from "@scripts/theme";
import { sidebarToggle, sidebarSections } from "@scripts/sidebar";
import { languageSwitch } from "@scripts/i18n";
import { setUpToc } from "@scripts/toc";
import { setupSubpanelDrawer } from "@scripts/subpanel";

themeToggle();
sidebarToggle();
sidebarSections();
languageSwitch();
setUpToc();
setupSubpanelDrawer();
