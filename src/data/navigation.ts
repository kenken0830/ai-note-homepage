import type { NavItem } from "@/types/content";

export const primaryNavigation: NavItem[] = [
  { label: "はじめての方へ", href: "/start" },
  { label: "無料キット", href: "/free" },
  { label: "AIでできること", href: "/ai-use-cases" },
  { label: "ガイド", href: "/guides" },
  { label: "プロンプト", href: "/prompts" },
  { label: "ワークフロー", href: "/workflows" },
  { label: "商品", href: "/products" },
  { label: "記事", href: "/library" },
  { label: "更新情報", href: "/updates" },
  { label: "メディア", href: "/media" },
  { label: "メルマガ", href: "/newsletter" },
  { label: "相談", href: "/consulting" },
];

export const footerNavigation: NavItem[] = [
  ...primaryNavigation,
  { label: "コミュニティ", href: "/community" },
  { label: "English", href: "/en" },
  { label: "法務・ポリシー", href: "/legal" },
];
