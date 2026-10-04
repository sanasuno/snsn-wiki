/**
 * @scripts/main.ts
 * メインスクリプト
 */
import { themeToggle } from "@scripts/theme";
import { sidebarToggle, sidebarSections } from "@scripts/sidebar";
import { languageSwitch } from "@scripts/i18n";
import { setUpToc, setupTocDrawer } from "@scripts/toc";

themeToggle();
sidebarToggle();
sidebarSections();
languageSwitch();
setUpToc();
setupTocDrawer();
