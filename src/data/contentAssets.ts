import type { ContentAsset } from "@/types/content";

// テーマ(topicSlug)単位で複数コンテンツを束ねる ContentAsset の最小データ。
// 既存 NotePost と並存し、将来 unifyContentEntries() 等の表示層関数で統合する想定。
// このリポジトリからは外部サービスへの投稿・公開を行いません。
// `editor.note.com` URL や下書き URL、認証情報は扱いません。
export const contentAssets: ContentAsset[] = [
  {
    id: "note-2026-05-02-build-ai-agent-skill-file",
    topicSlug: "build-ai-agent-skill-file",
    type: "note",
    title:
      "【実践版】AIエージェントに「スキル」を渡す設計 — Markdownファイルで知識を蓄積する実装パターン",
    description:
      "AIエージェントに繰り返し使うタスクの目的・前提・手順・確認項目をMarkdownスキルファイルにまとめ、文脈なしでも同じ品質で動かす設計を扱う実験ログ。",
    url: "https://note.com/life_to_ai/n/n3ae303996178",
    status: "published",
    source: "note",
    publishedAt: "2026-05-02",
    tags: ["AIエージェント", "スキル設計", "Markdown"],
    relatedUseCaseSlug: "build-ai-agent-skill-file",
    priority: "high",
  },
  {
    id: "workflow-build-ai-agent-skill-file-procedure",
    topicSlug: "build-ai-agent-skill-file",
    type: "workflow",
    title: "AIエージェントにスキルファイルを渡す再現手順",
    description:
      "繰り返し作業の目的・前提・手順・禁止事項・出力形式・確認項目を1つのMarkdownにまとめる完成版手順。",
    url: "/ai-use-cases/build-ai-agent-skill-file",
    status: "published",
    source: "site",
    publishedAt: "2026-05-03",
    tags: ["AIエージェント", "スキル設計", "ワークフロー"],
    relatedUseCaseSlug: "build-ai-agent-skill-file",
    priority: "high",
  },
  {
    id: "manga-build-ai-agent-skill-file-intro-planned",
    topicSlug: "build-ai-agent-skill-file",
    type: "manga",
    title: "1ページ漫画: スキルファイルってなに?",
    description:
      "スキルファイルの意義を、AIに指示を出す人と受け取るエージェントの会話で示す入口漫画(準備中)。",
    status: "planned",
    source: "site",
    tags: ["AIエージェント", "スキル設計", "漫画"],
    relatedUseCaseSlug: "build-ai-agent-skill-file",
    priority: "medium",
  },
];

export function getContentAssetsByTopicSlug(
  topicSlug: string,
): ContentAsset[] {
  return contentAssets.filter((asset) => asset.topicSlug === topicSlug);
}
