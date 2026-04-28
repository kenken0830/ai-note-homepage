---
name: ai-use-case-writer
description: Use when writing or publishing an AI Compass Journal /ai-use-cases detail page from articleBacklog or a planned use case.
---

# AI Use Case Writer

## いつ使うか

- `src/data/articleBacklog.ts` から候補を選び、`/ai-use-cases/[slug]` として公開する
- 準備中ユースケースをpublishedに昇格する
- noteテーマをHP向けの完成版手順に変える

## 入力

- 候補テーマ
- `src/data/articleBacklog.ts`
- `src/data/aiUseCases.ts`
- `docs/article-quality-score.md`
- 関連ページ: `/free` `/prompts` `/workflows` `/guides`

## 出力

- publishedユースケース
- 手順、プロンプト、入力例、出力例、確認ポイント、失敗例、改善プロンプト
- `/updates` への記録
- PR本文

## 手順

1. 既存ユースケースと重複しないか確認する
2. 読者のやりたいことを1つに絞る
3. AIに渡す前に準備するものを書く
4. 手順を3から6ステップにする
5. コピペ用プロンプト、入力例、出力例を入れる
6. 確認ポイントとよくある失敗を入れる
7. noteAngleで「noteは実験ログ、HPは完成版」と分ける
8. `/free` `/prompts` `/workflows` `/guides` へリンクする
9. `/updates` に公開記録を追加する
10. lint / typecheck / buildを実行する

## 品質基準

- `docs/article-quality-score.md` で80点以上
- 読者が今日試せる
- AIの推測をそのまま正解にしない
- titleとdescriptionが自然

## 禁止事項

- note記事の丸ごと転載
- AIニュースやツール比較への寄せすぎ
- 未確認の効果、数字、実績の断定
- 外部サービス未接続なのに登録・購入できるように見せる
- 秘密情報、APIキー、個人情報の追加

## PR作成時のチェック

- mainに直接pushしていない
- `next-env.d.ts` の生成差分がない
- `/updates` に記録した
- `articleBacklog` の該当候補を更新した
- lint / typecheck / buildが通った
