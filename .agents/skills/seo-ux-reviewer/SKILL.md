---
name: seo-ux-reviewer
description: Use when reviewing AI Compass Journal pages for search intent, metadata, internal links, CTA clarity, and mobile readability.
---

# SEO UX Reviewer

## いつ使うか

- 新規ページ公開前
- Search Console結果をもとに改善する時
- CTA、metadata、内部リンクを見直す時

## 入力

- 対象ページ
- metadata
- 内部リンク
- Search Console導入後のクエリ

## 出力

- title / description改善案
- 冒頭コピー改善案
- 内部リンク改善案
- スマホ表示の懸念

## 手順

1. 検索意図とタイトルが一致しているか見る
2. descriptionが自然で誇張していないか見る
3. 冒頭で読者のやりたいことが分かるか見る
4. `/free` `/prompts` `/workflows` `/guides` への導線を見る
5. ボタン文言だけで行き先が分かるか見る
6. スマホで長い見出し、カード、CTAが崩れないか見る

## 品質基準

- 日本語として自然
- キーワードを詰め込みすぎない
- CTAが具体的
- 外部未接続サービスを稼働中に見せない

## 禁止事項

- 釣りタイトル
- 検索ボリュームだけを理由にしたテーマ変更
- AIニュースやツール比較サイトへの寄せすぎ

## PR作成時のチェック

- metadata変更をPR本文に書く
- 内部リンク追加をPR本文に書く
- lint / typecheck / buildを確認する
