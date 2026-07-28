import type { NavItem } from "@/types/content";

export const primaryNavigation: NavItem[] = [
  { label: "AIでできること", href: "/ai-use-cases", showInHeader: true },
  { label: "ワークフロー", href: "/workflows", showInHeader: true },
  { label: "独自実験", href: "/experiments" },
  { label: "無料キット", href: "/free", showInHeader: true },
  { label: "はじめて", href: "/start" },
  { label: "ガイド", href: "/guides" },
  { label: "プロンプト", href: "/prompts" },
  { label: "商品", href: "/products" },
  { label: "記事", href: "/library" },
  { label: "更新情報", href: "/updates" },
  { label: "メディア", href: "/media" },
  { label: "メルマガ", href: "/newsletter" },
  { label: "運営者", href: "/about" },
];

export const headerNavigation = primaryNavigation.filter(
  (item) => item.showInHeader,
);

export const footerNavigation: NavItem[] = [
  ...primaryNavigation.filter(
    (item) => !["/media", "/newsletter", "/experiments"].includes(item.href),
  ),
  { label: "法務・ポリシー", href: "/legal" },
];

export const aboutPageHref = "/about";
