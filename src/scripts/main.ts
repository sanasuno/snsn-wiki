/**
 * @scripts/main.ts
 * メインスクリプト
 */
import { themeToggle } from "@scripts/theme";
import { sidebarToggle, sidebarSections } from "@scripts/sidebar";
import { languageSwitch } from "@scripts/i18n";

themeToggle();
sidebarToggle();
sidebarSections();
languageSwitch();
