# AI Compass Journal

AIノートを学ぶ、使う、作る、売るための本店・導線ハブです。  
note、Zenn、Medium、BOOTH、GitHub、X、YouTube、メルマガ、コミュニティ、相談導線を1つのNext.jsサイトに束ねます。

現在の中心テーマは「やりたいことから探す、AI活用の実践辞典。」です。noteは日々の調査・実験ログ、ホームページは再現できる完成版の手順・プロンプト・テンプレートとして育てます。

## 追加したページ

- `/` - AI Compass Journalの本店トップ
- `/start` - はじめての方向け導入ページ
- `/free` - 無料スターターキットLP
- `/ai-use-cases` - やりたいこと別にAI活用を探す実践辞典
- `/ai-use-cases/[slug]` - 公開中ユースケースの詳細手順
- `/guides` - AIノート完全ガイド
- `/prompts` - 用途別AIノート用プロンプト集
- `/workflows` - AIノート活用ワークフロー
- `/products` - 商品一覧
- `/library` - note / Zenn / Medium / 自サイト記事の横断ライブラリ
- `/updates` - 公開状態と更新情報
- `/media` - 各プラットフォームの役割説明
- `/newsletter` - メルマガ登録導線
- `/community` - noteメンバーシップ / Discord / LINE公式の将来導線
- `/consulting` - 個別相談・法人導入支援
- `/en` - 英語圏向け入口
- `/legal` - 特商法、利用規約、プライバシーポリシー、ライセンス方針の入口

## データの更新方法

静的データは `src/data` に分離しています。

- `src/data/platforms.ts` - note / Zenn / Medium / BOOTH / GitHub / X / YouTube / Newsletter / Community
- `src/data/products.ts` - 無料キット、テンプレート、有料記事、Zenn本、メンバーシップ、相談
- `src/data/articles.ts` - 横断ライブラリの記事データ
- `src/data/notePosts.ts` - 別プロジェクトの公開済みnote実験ログ受け口
- `src/data/funnels.ts` - 発見から相談までの導線
- `src/data/aiUseCases.ts` - やりたいこと別AI活用ユースケース
- `src/data/articleBacklog.ts` - noteからHPへ育てる記事候補
- `src/data/guides.ts` - AIノート完全ガイドの章立て
- `src/data/prompts.ts` - 用途別プロンプト例
- `src/data/workflows.ts` - メモから成果物へ変えるワークフロー
- `src/data/navigation.ts` - ヘッダーとフッターのナビゲーション
- `src/types/content.ts` - Platform / Product / Article / FunnelStep などの型

商品や記事を追加するときは、対象のdataファイルへ1件追加します。ページ側は配列を読み込んで表示します。

## 外部URLの差し替え方法

外部URLは `src/config/site.ts` と環境変数から差し替えられます。

`.env.example` にある以下をVercelのEnvironment Variablesへ設定してください。

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_NOTE_URL`
- `NEXT_PUBLIC_CONTACT_EMAIL`
- `NEXT_PUBLIC_ZENN_URL`
- `NEXT_PUBLIC_MEDIUM_URL`
- `NEXT_PUBLIC_BOOTH_URL`
- `NEXT_PUBLIC_GITHUB_URL`
- `NEXT_PUBLIC_X_URL`
- `NEXT_PUBLIC_YOUTUBE_URL`
- `NEXT_PUBLIC_NEWSLETTER_URL`
- `NEXT_PUBLIC_COMMUNITY_URL`

未設定のURLはplaceholderとして扱い、後から安全に差し替えられるようにしています。APIキーや秘密情報はこのリポジトリに追加しないでください。

## 公開準備ドキュメント

- `docs/launch-checklist.md` - Vercel Import、環境変数、Deployment Protection、公開後確認URL
- `docs/platform-operations.md` - 各プラットフォームの役割、投稿頻度、UTM、商品・メルマガ・相談導線
- `docs/content-workflow.md` - note、Zenn、Medium、BOOTH、メルマガ、KPI確認の運用サイクル
- `docs/homepage-live-operations.md` - 外部サービス接続前でも生きているサイトとして運用する手順
- `docs/note-cta-templates.md` - 毎日のnote末尾に貼るCTAテンプレート
- `docs/note-homepage-integration.md` - note自動投稿プロジェクトとホームページの安全な連携方針
- `docs/content-growth-strategy.md` - 毎日noteからホームページの体系コンテンツへ育てる運用方針
- `docs/ai-use-case-editorial-strategy.md` - note自動調査からAI活用辞典へ昇格する編集方針
- `docs/hp-update-frequency.md` - HPの毎日、週3、週1、月1、四半期の更新頻度
- `docs/content-quality-checklist.md` - HP記事に必ず入れる項目と公開前チェック
- `docs/auto-improvement-workflow.md` - Codexによる日次、週次、月次の改善PR運用
- `docs/codex-prompts.md` - Codexへそのまま貼れる運用プロンプト
- `docs/editorial-agent-system.md` - Topic ResearchからPublisherまでの編集エージェント運用
- `docs/publishing-cadence.md` - 下書き、公開、既存強化、月次改善の頻度ルール
- `docs/article-quality-score.md` - 100点満点の記事品質スコアと80点未満は公開しない基準
- `docs/mcp-and-automation-plan.md` - Skills、MCP、Automations、GitHub PRの役割分担
- `AGENTS.md` - 今後のCodex作業方針とレビュー基準

公開前は `docs/launch-checklist.md` のplaceholder差し替えチェックを必ず確認してください。

## HPの更新頻度

HPはnoteと同じ頻度で薄い記事を増やすのではなく、完成版のAI活用辞典として育てます。

- 毎日: note調査テーマからHP候補を1件 `src/data/articleBacklog.ts` に追加
- 週3回: 短いAIユースケースページを1本追加、または準備中カードを詳細化
- 週1回: 保存版記事を1本追加または既存ページを強化
- 月1回: 人気ページ、無料キット、プロンプト、ワークフローを改善
- 3ヶ月ごと: カテゴリ、重複記事、古い候補、外部サービス表現を棚卸し

詳細は `docs/hp-update-frequency.md` を参照してください。

公開頻度の運用ルールは `docs/publishing-cadence.md` にまとめています。下書きは毎日1本まで、公開は最大1日1本、通常は週3本までのユースケース詳細公開に抑えます。週1本は既存ページ強化に使い、月1回は無料キット、プロンプト、ワークフロー、articleBacklogを棚卸しします。

## 記事品質ルール

HP記事は `docs/article-quality-score.md` の100点満点スコアで確認します。80点未満の記事は公開しません。

重点項目:

- 読者のやりたいことが明確
- 手順が具体的
- コピペ用プロンプトが使える
- 入力例・出力例がある
- よくある失敗と改善策がある
- 内部リンクがある
- noteとの住み分けがある
- 未確認情報を断定していない
- title / description が自然

## noteとの住み分け

- note: 日々の調査、実験、失敗、反応を見るログ
- HP: 手順、プロンプト、テンプレート、確認ポイントまで整理した完成版
- `/updates`: HPに昇格した内容と改善履歴
- `articleBacklog`: noteからHPへ育てる候補の管理場所
- `notePosts`: 別プロジェクトで公開済みになったnote URL、タイトル、要約、タグ、HP化候補情報だけを受け取る場所

note記事はHPへ丸ごと転載しません。HPでは「やりたいことをAIでどう実現するか」に再編集します。

## note自動投稿プロジェクトとの連携

ホームページ側はnoteを投稿、編集、公開しません。受け取るのは公開済みnoteのURL、タイトル、要約、タグ、HP化候補情報だけです。

- 公開済みnoteは `src/data/notePosts.ts` に追加する
- `/library` の「note実験ログ」セクションで表示する
- `notePosts` が空の場合は連携待ちメッセージを表示する
- `editor.note.com` の下書きURL、未公開本文、APIキー、Cookie、queue payloadは受け取らない
- HP化する場合は、note本文を丸ごと転載せず、`/ai-use-cases`、`/guides`、`/workflows` 用の再現できる手順に編集する

連携方式は3つに分けます。

- RSS連携: 最新noteの表示と更新検知に使う
- JSON export連携: HP化候補、関連ページ、優先度の受け渡しに使う
- PR連携: `notePosts` / `articleBacklog` / `updates` の変更提案に使う

いずれの方式でも、ホームページ側ではnote投稿、note公開、note下書き編集を実行しません。

詳細は `docs/note-homepage-integration.md` を参照してください。

## 自動改善ワークフロー

Codexで作るPRは次の種類に分けます。

- `daily-backlog PR` - HP候補を1件から3件追加
- `use-case-page PR` - 準備中ユースケースを1本詳細化
- `weekly-guide-improvement PR` - 保存版記事または既存詳細を強化
- `monthly-free-kit-improvement PR` - 無料キットと導線を改善
- `seo-title-improvement PR` - Search Console結果をもとにtitle / descriptionを改善

Codexへ貼る運用プロンプトは次の名前で整理しています。

- `daily-topic-research` - noteテーマからHP候補を追加
- `publish-use-case-page` - ユースケース詳細を公開
- `weekly-page-improvement` - 既存ページを週次で強化
- `monthly-content-maintenance` - 月次で無料キット、プロンプト、ワークフロー、候補を棚卸し
- `article-quality-review` - 100点満点の記事品質レビュー
- `prompt-tester-review` - プロンプトの実用性レビュー
- `fact-safety-review` - 未確認情報、placeholder、秘密情報、legal表現のレビュー
- `seo-ux-review` - SEO、metadata、内部リンク、スマホ表示のレビュー

各PRの依頼文は `docs/codex-prompts.md`、判断基準は `docs/auto-improvement-workflow.md` と `docs/content-quality-checklist.md` を参照してください。

## Codexエージェント運用

HP記事を継続して出すため、`docs/editorial-agent-system.md` で次の7エージェントの役割を定義しています。

- Topic Research Agent
- Editorial Planner Agent
- Article Draft Agent
- Prompt Tester Agent
- SEO & UX Agent
- Fact & Safety Agent
- Publisher Agent

repo-scoped skillsは `.agents/skills` に置いています。

- `ai-use-case-writer` - ユースケース詳細を書く
- `article-quality-reviewer` - 100点満点で品質レビューする
- `note-to-hp-planner` - noteテーマをHP候補へ変換する
- `seo-ux-reviewer` - SEO、metadata、内部リンク、スマホ表示を見る
- `fact-safety-reviewer` - 未確認情報、placeholder、秘密情報、legal表現を見る

Skillsは繰り返し手順、MCPは外部データやツール接続、Automationsは定期実行のきっかけ、GitHub PRは人間確認前提の変更提案として扱います。mainへの直接反映はせず、人間がPRを確認してからマージします。

## 無料スターターキット

サイト内配布版のMarkdownファイルは `public/free-starter-kit` に置いています。

- `ai-note-basic-template.md` - AIノート基本テンプレート
- `prompt-10-pack.md` - コピペ用プロンプト10個
- `seven-day-guide.md` - 1週間導入ガイド
- `read-next.md` - note、記事、商品、相談への戻り導線
- `license.md` - 利用条件の暫定文書

BOOTH無料配布やメルマガ登録特典に切り替える場合は、`src/app/free/page.tsx` と `src/data/products.ts` のCTAを外部URLへ差し替えてください。

## 開発コマンド

```bash
npm run dev
npm run lint
npm run typecheck
npm run build
```

VercelではNext.jsとして自動検出されます。Build Commandは `npm run build` のままで問題ありません。
