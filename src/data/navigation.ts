import type { NavItem } from "@/types/content";

export const primaryNavigation: NavItem[] = [
  { label: "はじめて", href: "/start", showInHeader: true },
  { label: "AIでできること", href: "/ai-use-cases", showInHeader: true },
  { label: "無料キット", href: "/free", showInHeader: true },
  { label: "ガイド", href: "/guides", showInHeader: true },
  { label: "プロンプト", href: "/prompts" },
  { label: "ワークフロー", href: "/workflows" },
  { label: "商品", href: "/products" },
  { label: "記事", href: "/library" },
  { label: "更新情報", href: "/updates", showInHeader: true },
  { label: "メディア", href: "/media" },
  { label: "メルマガ", href: "/newsletter" },
  { label: "相談", href: "/consulting", showInHeader: true },
];

export const headerNavigation = primaryNavigation.filter(
  (item) => item.showInHeader,
);

export const footerNavigation: NavItem[] = [
  ...primaryNavigation,
  { label: "コミュニティ", href: "/community" },
  { label: "English", href: "/en" },
  { label: "法務・ポリシー", href: "/legal" },
];
