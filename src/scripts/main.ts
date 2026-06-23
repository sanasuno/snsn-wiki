/**
 * main.ts
 * メインスクリプト
 */
import { setupThemeToggle } from "@scripts/theme";
import { setupLanguageSwitcher } from "@scripts/language";
import { setupSidebar, setupSidebarToggle } from "@scripts/sidebar";
import { setupToc, setupTocDrawer } from "@scripts/toc";
import { codeblock } from "@scripts/codeblock";
import { lightbox } from "@scripts/lightbox";

// テーマトグルのセットアップ
setupThemeToggle();

// 言語のセットアップ
setupLanguageSwitcher();

// サイドバー関連のセットアップ
setupSidebar();
setupSidebarToggle();

// TOC関連のセットアップ
setupToc();
setupTocDrawer();

// コードブロックのセットアップ
codeblock();

// ライトボックスのセットアップ
lightbox();
