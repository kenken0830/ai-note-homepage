import type { NotePost } from "@/types/content";

// note自動投稿プロジェクトから「公開済みnote」だけを受け取るための静的データ。
// このホームページ側からnote投稿、下書き編集、公開、queue実行は行いません。
export const notePosts: NotePost[] = [
  {
    id: "2026-05-02_build-ai-agent-skill-file",
    title:
      "【実践版】AIエージェントに「スキル」を渡す設計 — Markdownファイルで知識を蓄積する実装パターン",
    url: "https://note.com/life_to_ai/n/n3ae303996178",
    publishedAt: "2026-05-02",
    summary:
      "AIエージェントに繰り返し使う知識を渡すための「スキル」設計を、Markdownファイルでナレッジを蓄積する実装パターンとして整理した実験ログです。タスクごとに目的、前提、手順、確認項目を1ファイルにまとめ、エージェントが文脈なしでも同じ品質で動けるようにする狙いを扱います。本文では、効いた書き方と効かなかった書き方の違い、ファイルを増やしすぎたときの管理コストなど試行錯誤を記録しています。",
    tags: [
      "AIエージェント",
      "スキル設計",
      "Markdown",
      "ナレッジ管理",
      "実装パターン",
    ],
    homepageCandidate: true,
    priority: "high",
    noteAngle: "AIエージェントにスキル設計を渡す実験ログ",
    homepageAngle:
      "AIエージェントに判断基準・手順・禁止事項をMarkdownで渡す再現手順",
    relatedPages: [
      {
        label: "プロンプトテンプレート化",
        href: "/ai-use-cases/make-prompt-template",
      },
      { label: "プロンプト集", href: "/prompts" },
      { label: "ワークフロー", href: "/workflows" },
      { label: "無料キット", href: "/free" },
    ],
  },
];
