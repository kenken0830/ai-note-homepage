# 自動改善ワークフロー

このドキュメントは、Codexに日次、週次、月次で依頼する作業と、人間が確認するポイントを整理します。

## Codexに毎日頼むこと

- noteテーマからHP候補を1件 `src/data/articleBacklog.ts` に追加する
- 候補の `searchIntent` と `homepageAngle` を明確にする
- 既存の `/ai-use-cases` と重複しないか確認する
- 外部サービス未接続の導線を稼働中に見せていないか確認する

PR種別: `daily-backlog PR`

## Codexに週3回頼むこと

- `articleBacklog` から優先度の高い候補を1件選ぶ
- `/ai-use-cases/[slug]` の詳細ページとして公開できる品質にする
- `src/data/aiUseCases.ts` の準備中カードを公開中へ昇格する
- `/updates` に記録する

PR種別: `use-case-page PR`

## Codexに週1回頼むこと

- 保存版記事を1本追加、または既存の詳細ページを強化する
- 入力例、出力例、改善プロンプト、内部リンクを追加する
- noteの実験ログを丸ごと転載していないか確認する

PR種別: `weekly-guide-improvement PR`

## Codexに月1回頼むこと

- 無料スターターキット、プロンプト、ワークフローを見直す
- `public/free-starter-kit` のMarkdownとサイト内導線のズレを直す
- Search Console導入後は、表示回数、クリック数、CTR、平均掲載順位から改善候補を作る

PR種別: `monthly-free-kit-improvement PR`

## Search Console導入後に見る指標

- 表示回数: 検索に出ているがクリックされていないページを見つける
- クリック数: 実際に読まれているテーマを強化する
- CTR: タイトル、description、冒頭の改善候補を見つける
- 平均掲載順位: 10位から30位のページを優先して改善する

## 指標別の改善ルール

- 表示回数が多くCTRが低い: title、description、冒頭の「何ができるか」を改善する
- 表示回数が少ない: 検索意図が広すぎないか、タイトルを見直す
- 平均掲載順位が10から30位: 入力例、出力例、確認ポイント、内部リンクを追加する
- クリック数が多い: `/free` と関連ページへの導線を強化する
- 直帰が多いと推測される: 冒頭に対象読者、使う場面、読む順番を追加する

## Codexが作るべきPRの種類

- `daily-backlog PR`: HP候補を1件から3件追加する
- `use-case-page PR`: 準備中ユースケースを1本詳細化する
- `weekly-guide-improvement PR`: 保存版記事または既存詳細を強化する
- `monthly-free-kit-improvement PR`: 無料キットと導線を改善する
- `seo-title-improvement PR`: Search Console結果をもとにタイトルとdescriptionを改善する

## 人間がマージ前に見るポイント

- noteの丸ごと転載になっていないか
- 未確認情報を断定していないか
- AIニュースやツール比較に寄っていないか
- 準備中サービスを稼働中に見せていないか
- `/free` `/prompts` `/workflows` `/guides` への内部リンクがあるか
- `npm run lint` `npm run typecheck` `npm run build` が通っているか
