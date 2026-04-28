---
name: note-to-hp-planner
description: Use when turning daily note research or experiment logs into AI Compass Journal homepage backlog items and evergreen article plans.
---

# Note To HP Planner

## いつ使うか

- 毎日のnoteテーマからHP候補を作る
- noteで反応がよかったテーマを保存版に昇格する
- `articleBacklog` を整理する

## 入力

- noteテーマまたは実験ログの要約
- `src/data/articleBacklog.ts`
- 既存の `/ai-use-cases`
- `docs/ai-use-case-editorial-strategy.md`

## 出力

- articleBacklog候補
- noteAngle
- homepageAngle
- searchIntent
- suggestedSlug

## 手順

1. note内容をそのまま転載せず、読者のやりたいことへ変換する
2. 既存バックログと重複しないか確認する
3. `target` を具体化する
4. noteAngleは実験ログ、homepageAngleは再現手順に分ける
5. `/free` `/prompts` `/workflows` `/guides` の関連を付ける
6. priorityとstatusを控えめに設定する

## 品質基準

- 「やりたいことをAIでどう実現するか」になっている
- 1ページで完結できる
- 検索意図が自然
- 既存ページと内部リンクできる

## 禁止事項

- note記事の本文コピー
- ニュース解説だけの候補
- ツール名だけの候補
- 外部サービス稼働前提の候補

## PR作成時のチェック

- 候補追加だけなら公開状態にしない
- 既存候補と重複していない
- lint / typecheck / buildを実行する
