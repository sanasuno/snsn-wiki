/**
 * main.ts
 * メインスクリプト
 */
import { setupThemeToggle } from "@scripts/theme";
import { setupLanguageSwitcher } from "@scripts/language";
import { setupSidebar, setupSidebarToggle } from "@scripts/sidebar";
import { setupToc, setupTocDrawer } from "@scripts/toc";

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
