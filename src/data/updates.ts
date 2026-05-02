import type { UpdateItem } from "@/types/content";

export const updates: UpdateItem[] = [
  {
    id: "build-ai-agent-skill-file-use-case-live",
    date: "2026-05-03",
    title:
      "AIエージェントにスキルファイルを渡す詳細ページを公開しました",
    description:
      "繰り返し作業の目的、前提、手順、禁止事項、出力形式、確認項目を1つのMarkdownスキルファイルとして設計するAI活用手順を追加しました。/library のnote実験ログから関連AIユースケースとして参照できるようになります。",
    href: "/ai-use-cases/build-ai-agent-skill-file",
    category: "辞典",
  },
  {
    id: "note-handoff-skill-file-design",
    date: "2026-05-02",
    title:
      "公開済みnote実験ログを /library に取り込み、スキルファイル設計をHP化候補に追加しました",
    description:
      "note自動投稿プロジェクトから受け取ったhomepage_handoff JSONをもとに、AIエージェントへMarkdownスキルファイルを渡す実験ログを /library に表示し、articleBacklog にHP化候補を追加しました。未公開slugへの404を避けるためrelatedUseCaseSlugは未設定にしています。",
    href: "/library",
    category: "連携",
  },
  {
    id: "note-homepage-safe-integration",
    date: "2026-05-02",
    title: "note自動投稿プロジェクトとの安全な連携設計を追加しました",
    description:
      "ホームページ側では公開済みnoteのURL、タイトル、要約、タグ、HP化候補情報だけを受け取り、note投稿や編集は行わない方針を整理しました。",
    href: "/library",
    category: "連携",
  },
  {
    id: "friendly-rewrite-use-case-live",
    date: "2026-04-29",
    title: "文章をやさしく言い換える詳細ページを公開しました",
    description:
      "硬い説明文を、想定読者、文章の目的、残したい重要語句を指定して読みやすく整えるAI活用手順を追加しました。",
    href: "/ai-use-cases/ai-beginner-friendly-explanation",
    category: "辞典",
  },
  {
    id: "learning-plan-use-case-live",
    date: "2026-04-29",
    title: "1週間の勉強計画を作る詳細ページを公開しました",
    description:
      "学びたいテーマを、目的、前提知識、1日ごとの小さなタスク、復習、確認テストに分けるAI活用手順を追加しました。",
    href: "/ai-use-cases/make-learning-plan",
    category: "辞典",
  },
  {
    id: "comparison-table-use-case-live",
    date: "2026-04-29",
    title: "比較表を作り選択肢を整理する詳細ページを公開しました",
    description:
      "複数の候補を、比較軸、メリット、注意点、未確認事項、次に確認することへ分けるAI活用手順を追加しました。",
    href: "/ai-use-cases/make-comparison-table",
    category: "辞典",
  },
  {
    id: "weekly-review-use-case-live",
    date: "2026-04-29",
    title: "週次レビューを改善計画に変える詳細ページを公開しました",
    description:
      "1週間のメモを、成果、詰まり、続けること、やめること、次の実験に分けるAI活用手順を追加しました。",
    href: "/ai-use-cases/make-weekly-review",
    category: "辞典",
  },
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
