# MCPとAutomationsの運用設計

AI Compass Journalでは、Skills、MCP、Automations、GitHub PRの役割を分けます。

## 役割

- Skills: 繰り返し使う手順、品質基準、レビュー観点
- MCP: 外部データや外部ツールへの接続
- Automations: 定期的なリマインド、監視、起票
- GitHub PR: 人間確認前提の変更提案

## Skills

SkillsはCodexが毎回同じ観点で作業するための手順書です。

使う場面:
- 新しいAIユースケースを書く
- 記事品質を採点する
- noteテーマをHP候補に変える
- SEO/UXを確認する
- Fact/Safetyを確認する

Skillsには秘密情報や本番認証情報を書きません。

## MCP

MCPは外部データやツールへの接続に使います。現時点では外部サービス操作を前提にしません。

将来使う可能性:
- GitHub: PR、Issue、レビュー、CI状態確認
- Google Search Console: 表示回数、クリック、CTR、平均掲載順位
- Google Drive: 無料キットの原稿管理
- Slack/Notion: 運用メモや編集会議の記録

使わないこと:
- APIキーをリポジトリに保存する
- BOOTH、メルマガ、Vercel本番設定を自動で変更する
- 人間確認なしにmainへ反映する

## Automations

Automationsは定期実行のきっかけ作りに使います。実際の変更はPRで提案し、人間が確認してマージします。

毎日:
- noteテーマをHP候補へ変換するリマインド
- articleBacklog候補の追加PRを作る

週3回:
- 公開候補を1件選び、ユースケース詳細化PRを作る

週1回:
- 既存ページを1本選び、品質スコアに沿って改善PRを作る

月1回:
- 無料キット、プロンプト、ワークフロー、articleBacklogを棚卸しする

## Search Console接続後に見る指標

- 表示回数: 検索需要がある候補を見つける
- クリック数: すでに読まれているページを強化する
- CTR: タイトルとdescriptionの改善対象を見つける
- 平均掲載順位: 10位から30位のページを優先的に改善する

改善ルール:
- 表示回数が多くCTRが低い: title / description / 冒頭を改善
- 10位から30位: 手順、例、内部リンクを増やす
- クリックが多い: 関連ページと無料キット導線を強化
- 検索意図と本文がずれている: ページを分割またはタイトルを直す

## note自動調査からHPバックログへの流れ

1. note自動調査でテーマを集める
2. Topic Research AgentがHP候補に変換する
3. `src/data/articleBacklog.ts` に1件追加する
4. Editorial Planner Agentが週次で公開候補を選ぶ
5. Article Draft Agentが詳細ページ化する
6. Fact & Safety AgentとSEO & UX Agentがレビューする
7. Publisher AgentがPRを整える

## 人間確認

人間が見ること:
- テーマがサイト方針に合っているか
- 実例が不自然ではないか
- 未接続サービスを稼働中に見せていないか
- 80点以上の品質があるか
- PR Previewで表示が崩れていないか
