import type { Article } from "@/types/content";

export const articles: Article[] = [
  {
    id: "ai-note-order",
    title: "AIノートを情報整理から商品導線まで使う順番",
    source: "note",
    sourceUrl: "https://note.com/life_to_ai",
    description:
      "読む、試す、記録する、商品化するまでの基本ルートをnote読者向けに整理します。",
    tags: ["AIノート", "導入", "note"],
    funnelStage: "learn",
    relatedProductIds: ["free-starter-kit", "booth-template-pack"],
    publishedAt: "2026-04-12",
  },
  {
    id: "prompt-first-ten",
    title: "最初に使うべきAIノート用プロンプト10個",
    source: "note",
    sourceUrl: "https://note.com/life_to_ai",
    description:
      "調査、要約、比較、記事化に使えるプロンプトを無料キットと連動して紹介します。",
    tags: ["ChatGPT", "プロンプト", "無料キット"],
    funnelStage: "download",
    relatedProductIds: ["free-starter-kit", "prompt-card-pack"],
    publishedAt: "2026-04-05",
  },
  {
    id: "zenn-knowledge-base",
    title: "MarkdownとGitHubでAIナレッジベースを育てる",
    source: "zenn",
    sourceUrl: "#",
    description:
      "技術者向けに、AIメモをGitHub管理し、記事とテンプレートへ展開する方法をまとめます。",
    tags: ["GitHub", "Zenn", "Markdown"],
    funnelStage: "buy",
    relatedProductIds: ["zenn-builder-kit"],
    publishedAt: "2026-03-22",
  },
  {
    id: "medium-workflows",
    title: "AI note-taking workflows for independent creators",
    source: "medium",
    sourceUrl: "#",
    description:
      "English readers向けに、AI note workflows and product funnelsの全体像を紹介します。",
    tags: ["English", "Medium", "Workflow"],
    funnelStage: "discover",
    relatedProductIds: ["free-starter-kit"],
    publishedAt: "2026-03-10",
  },
  {
    id: "workflow-library",
    title: "AI発信をライブラリ化して迷わず再利用する方法",
    source: "site",
    sourceUrl: "/library",
    description:
      "note、Zenn、Medium、自サイトの記事を横断して、読者の段階別に案内する考え方です。",
    tags: ["ライブラリ", "導線設計", "コンテンツ設計"],
    funnelStage: "nurture",
    relatedProductIds: ["booth-template-pack", "membership-lab"],
    publishedAt: "2026-02-26",
  },
  {
    id: "meeting-workflow",
    title: "議事録作成をAIノートで15分短縮するワークフロー",
    source: "note",
    sourceUrl: "https://note.com/life_to_ai",
    description:
      "録音、要約、アクション整理を、チームで使えるAIノートに落とし込みます。",
    tags: ["仕事効率化", "議事録", "ChatGPT"],
    funnelStage: "learn",
    relatedProductIds: ["prompt-card-pack"],
    publishedAt: "2026-02-14",
  },
  {
    id: "funnel-map-overview",
    title: "noteから相談までをつなぐAI発信導線の設計",
    source: "site",
    sourceUrl: "/consulting",
    description:
      "無料DL、メルマガ、商品、コミュニティ、相談をどの順番で置くかを解説します。",
    tags: ["導線設計", "相談", "商品設計"],
    funnelStage: "consult",
    relatedProductIds: ["consulting-session"],
    publishedAt: "2026-01-30",
  },
  {
    id: "community-roadmap",
    title: "AI Compass Labで作りたい継続実践コミュニティ",
    source: "note",
    sourceUrl: "https://note.com/life_to_ai",
    description:
      "メンバーシップ、Discord、LINE公式をどう使い分けるかの構想メモです。",
    tags: ["コミュニティ", "メンバーシップ", "Discord"],
    funnelStage: "join",
    relatedProductIds: ["membership-lab"],
    publishedAt: "2026-01-12",
  },
];

export const latestArticles = articles.slice(0, 5);

export const featuredArticles = articles.filter((article) =>
  ["ai-note-order", "prompt-first-ten", "zenn-knowledge-base", "workflow-library"].includes(
    article.id,
  ),
);
