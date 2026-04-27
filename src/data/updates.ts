import type { UpdateItem } from "@/types/content";

export const updates: UpdateItem[] = [
  {
    id: "production-launch",
    date: "2026-04-27",
    title: "AI Compass Journalを本番公開しました",
    description:
      "Vercel本番URLでトップ、各ページ、sitemap.xml、robots.txtを確認できる状態になりました。",
    href: "/",
    category: "公開",
  },
  {
    id: "free-starter-kit-live",
    date: "2026-04-27",
    title: "無料スターターキットをサイト内で公開しました",
    description:
      "基本テンプレート、プロンプト10個、7日間導入ガイド、次に読む導線、暫定ライセンスをMarkdownで読めます。",
    href: "/free",
    category: "無料キット",
  },
  {
    id: "product-status-organized",
    date: "2026-04-27",
    title: "商品一覧とメルマガ導線をステータス整理しました",
    description:
      "無料キットは公開中、BOOTH配布・メルマガ・有料商品は準備中または未接続として表示しています。",
    href: "/products",
    category: "導線",
  },
  {
    id: "sitemap-robots-live",
    date: "2026-04-27",
    title: "sitemap.xmlとrobots.txtを公開しました",
    description:
      "検索エンジン向けの基本ファイルを本番URLで確認できる状態にしています。",
    href: "/updates",
    category: "SEO",
  },
];

export const latestUpdates = updates.slice(0, 3);
