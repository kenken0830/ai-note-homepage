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

  // make-prompt-template
  {
    id: "workflow-make-prompt-template-procedure",
    topicSlug: "make-prompt-template",
    type: "workflow",
    title: "AIで繰り返し使うプロンプトをテンプレ化する再現手順",
    description:
      "毎回書いている依頼文を、目的・素材・条件・出力形式を差し替えられる再利用テンプレートにする完成版手順。",
    url: "/ai-use-cases/make-prompt-template",
    status: "published",
    source: "site",
    publishedAt: "2026-04-28",
    tags: ["プロンプト", "テンプレート", "再利用"],
    relatedUseCaseSlug: "make-prompt-template",
    priority: "high",
  },
  {
    id: "manga-make-prompt-template-intro-planned",
    topicSlug: "make-prompt-template",
    type: "manga",
    title: "1ページ漫画: 毎回プロンプトを書き直していませんか?",
    description:
      "繰り返し使う依頼文を「使い回せる型」にする発想を、AIへ依頼するときの困りごとから示す入口漫画(準備中)。",
    status: "planned",
    source: "site",
    tags: ["プロンプト", "テンプレート", "漫画"],
    relatedUseCaseSlug: "make-prompt-template",
    priority: "medium",
  },

  // write-email-reply
  {
    id: "workflow-write-email-reply-procedure",
    topicSlug: "write-email-reply",
    type: "workflow",
    title: "AIでメール返信を短く安全に書く再現手順",
    description:
      "受信メールの要件、こちらが回答すべきこと、未確認事項、返信文を分けて作るAI活用手順。",
    url: "/ai-use-cases/write-email-reply",
    status: "published",
    source: "site",
    publishedAt: "2026-04-29",
    tags: ["メール", "文章作成", "ワークフロー"],
    relatedUseCaseSlug: "write-email-reply",
    priority: "high",
  },
  {
    id: "video-write-email-reply-demo-planned",
    topicSlug: "write-email-reply",
    type: "video",
    title: "5分でわかる: AIでメール返信を整える",
    description:
      "受信メールから返信下書きまでのプロセスを実画面で示す動画デモ(準備中)。",
    status: "planned",
    source: "youtube",
    tags: ["メール", "動画", "デモ"],
    relatedUseCaseSlug: "write-email-reply",
    priority: "medium",
  },

  // make-todo-list
  {
    id: "workflow-make-todo-list-procedure",
    topicSlug: "make-todo-list",
    type: "workflow",
    title: "AIで散らかったメモをTODOリストにする再現手順",
    description:
      "思いつき・会話メモ・作業メモを今日やること・確認・保留・削除に分ける手順。",
    url: "/ai-use-cases/make-todo-list",
    status: "published",
    source: "site",
    publishedAt: "2026-04-28",
    tags: ["TODO", "整理", "ワークフロー"],
    relatedUseCaseSlug: "make-todo-list",
    priority: "high",
  },
  {
    id: "template-make-todo-list-prompt-planned",
    topicSlug: "make-todo-list",
    type: "template",
    title: "TODO化プロンプト テンプレート",
    description:
      "散らかったメモを「今日やる/今週やる/確認/保留/削除候補」に分けるためのコピペ可能テンプレート(準備中)。",
    status: "planned",
    source: "site",
    tags: ["TODO", "テンプレート"],
    relatedUseCaseSlug: "make-todo-list",
    priority: "medium",
  },

  // summarize-research-notes
  {
    id: "workflow-summarize-research-notes-procedure",
    topicSlug: "summarize-research-notes",
    type: "workflow",
    title: "AIで調査メモを判断材料に要約する再現手順",
    description:
      "集めた情報を、要点・根拠・不明点・追加確認・判断可否に分けて使えるメモにする手順。",
    url: "/ai-use-cases/summarize-research-notes",
    status: "published",
    source: "site",
    publishedAt: "2026-04-29",
    tags: ["調査", "要約", "ワークフロー"],
    relatedUseCaseSlug: "summarize-research-notes",
    priority: "high",
  },
  {
    id: "manga-summarize-research-notes-intro-planned",
    topicSlug: "summarize-research-notes",
    type: "manga",
    title: "1ページ漫画: 調べたのに判断できない問題",
    description:
      "情報を集めても判断軸が無くて動けない場面を、AIで整理する入口として示す漫画(準備中)。",
    status: "planned",
    source: "site",
    tags: ["調査", "判断", "漫画"],
    relatedUseCaseSlug: "summarize-research-notes",
    priority: "low",
  },
];

export function getContentAssetsByTopicSlug(
  topicSlug: string,
): ContentAsset[] {
  return contentAssets.filter((asset) => asset.topicSlug === topicSlug);
}
