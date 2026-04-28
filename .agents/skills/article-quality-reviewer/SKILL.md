---
name: article-quality-reviewer
description: Use when scoring or reviewing AI Compass Journal articles, use-case pages, and content PRs against the 100-point quality rubric.
---

# Article Quality Reviewer

## いつ使うか

- 新規HP記事を公開前に採点する
- 既存ページ強化PRをレビューする
- 80点未満の記事を公開しない判断をする

## 入力

- PR差分
- 対象ページ本文
- `docs/article-quality-score.md`
- `docs/content-quality-checklist.md`

## 出力

- 100点満点の暫定スコア
- 修正必須、改善推奨、後回しでよい項目
- 80点未満なら公開不可の理由

## 手順

1. 読者のやりたいことが明確か確認する
2. 手順、プロンプト、入力例、出力例を確認する
3. よくある失敗と改善策を見る
4. 内部リンクと/free CTAを見る
5. noteとの住み分けを見る
6. 未確認情報や準備中サービスの誤認を確認する
7. title/descriptionを確認する
8. 点数と公開可否を出す

## 品質基準

- 80点以上で公開可能
- 90点以上なら強い公開候補
- 79点以下は公開しない

## 禁止事項

- 点数だけ出して理由を書かない
- UI崩れやリンク切れを見逃す
- 「たぶん大丈夫」で未確認情報を通す

## PR作成時のチェック

- P1は必ず修正
- P2は今回直すか理由を残す
- P3は後回しでよい
- lint / typecheck / buildの結果を確認する
