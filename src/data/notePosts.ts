import type { NotePost } from "@/types/content";

// note自動投稿プロジェクトから「公開済みnote」だけを受け取るための静的データ。
// このホームページ側からnote投稿、下書き編集、公開、queue実行は行いません。
export const notePosts: NotePost[] = [];
