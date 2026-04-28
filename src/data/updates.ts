import type { UpdateItem } from "@/types/content";

export const updates: UpdateItem[] = [
  {
    id: "email-reply-use-case-live",
    date: "2026-04-29",
    title: "メール返信を短く安全に整える詳細ページを公開しました",
    description:
      "受信メールの要件、回答すべきこと、未確認事項、返信文を分けて作るAI活用手順を追加しました。",
    href: "/ai-use-cases/write-email-reply",
    category: "辞典",
  },
  {
    id: "research-summary-use-case-live",
    date: "2026-04-29",
    title: "調査メモを判断材料に要約する詳細ページを公開しました",
    description:
      "集めた情報を、要点、根拠、不明点、追加確認、判断可否に分けるAI活用手順を追加しました。",
    href: "/ai-use-cases/summarize-research-notes",
    category: "辞典",
  },
  {
    id: "editorial-agent-system",
    date: "2026-04-28",
    title: "編集エージェント運用と品質スコア基盤を追加しました",
    description:
      "HP記事を毎日候補化し、週3程度で公開し、週1で改善するためのCodexエージェント、Skills、80点品質スコアを整理しました。",
    href: "/updates",
    category: "運用",
  },
  {
    id: "todo-list-use-case-live",
    date: "2026-04-28",
    title: "散らかったメモをTODOリストにする詳細ページを公開しました",
    description:
      "思いつきや作業メモを、今日やること、今週やること、確認、保留、削除候補に分ける手順を追加しました。",
    href: "/ai-use-cases/make-todo-list",
    category: "辞典",
  },
  {
    id: "prompt-template-use-case-live",
    date: "2026-04-28",
    title: "プロンプトをテンプレ化する詳細ページを公開しました",
    description:
      "繰り返し使う依頼文を、目的、素材、条件、出力形式を差し替えられるテンプレートにする手順を追加しました。",
    href: "/ai-use-cases/make-prompt-template",
    category: "辞典",
  },
  {
    id: "hp-growth-operations",
    date: "2026-04-28",
    title: "HP成長運用ルールを追加しました",
    description:
      "更新頻度、記事品質チェック、Codexによる自動改善PR、HP向け記事候補バックログを整理しました。",
    href: "/updates",
    category: "運用",
  },
  {
    id: "ai-use-cases-dictionary",
    date: "2026-04-28",
    title: "「AIでできること」ページを追加しました",
    description:
      "やりたいこと別に、AIで進める手順、プロンプト、確認ポイントを探せる実践辞典の入口を追加しました。",
    href: "/ai-use-cases",
    category: "辞典",
  },
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
