---
name: fact-safety-reviewer
description: Use when reviewing AI Compass Journal changes for factual safety, placeholder safety, secrets, legal wording, and unconnected service claims.
---

# Fact Safety Reviewer

## いつ使うか

- 公開前PRレビュー
- legal、商品、メルマガ、相談導線を変更する時
- 外部URLやplaceholderを追加する時

## 入力

- PR差分
- `src/config/site.ts`
- `src/data/*`
- `/legal`、商品、メルマガ、相談ページ

## 出力

- P1/P2/P3の指摘
- 修正必須の表現
- 人間確認が必要な項目

## 手順

1. APIキー、トークン、個人情報がないか確認する
2. 未確認情報を断定していないか見る
3. BOOTH、メルマガ、コミュニティなど未接続サービスを稼働中に見せていないか見る
4. placeholder URLが本物リンクに見えないか見る
5. legalが正式文書と誤認されないか見る
6. 高リスク領域の助言を断定していないか見る

## 品質基準

- 秘密情報ゼロ
- 未接続は未接続と明示
- 準備中リンクは安全
- 法務文書は正式版ではないと分かる

## 禁止事項

- 外部サービス操作
- 秘密情報の追加
- 正式な法務・医療・金融助言の断定
- 架空の実績や数字の追加

## PR作成時のチェック

- P1はマージ不可
- P2は原則修正
- `next-env.d.ts` の生成差分を除外
- lint / typecheck / buildを確認する
