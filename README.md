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
- `src/data/funnels.ts` - 発見から相談までの導線
- `src/data/aiUseCases.ts` - やりたいこと別AI活用ユースケース
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
- `docs/content-growth-strategy.md` - 毎日noteからホームページの体系コンテンツへ育てる運用方針
- `docs/ai-use-case-editorial-strategy.md` - note自動調査からAI活用辞典へ昇格する編集方針
- `AGENTS.md` - 今後のCodex作業方針とレビュー基準

公開前は `docs/launch-checklist.md` のplaceholder差し替えチェックを必ず確認してください。

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
