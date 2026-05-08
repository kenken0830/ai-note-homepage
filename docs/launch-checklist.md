# 公開前チェックリスト

AI Compass JournalをVercelで公開する前後に確認する項目です。

## GitHub push後にやること

- GitHubの `main` に最新コミットが反映されていることを確認する
- GitHub Actionsを使う場合は失敗していないことを確認する
- `README.md`、`docs/*`、`AGENTS.md` がリポジトリに含まれていることを確認する
- `package-lock.json` があるため、VercelのInstall Commandは既定の `npm install` でよい

## Vercel Import手順

1. Vercelで `Add New` から `Project` を選ぶ
2. GitHubリポジトリ `kenken0830/ai-note-homepage` をImportする
3. Framework Presetは `Next.js` の自動検出を使う
4. Build Commandは `npm run build`
5. Output Directoryは未設定のままにする
6. 必要なEnvironment Variablesを入力する
7. 初回Deploy後、Deployment Protectionが有効なら公開URLで401にならない設定にする

## カスタムドメイン

`ai-compass-journal.com` を Cloudflare Registrar で取得済み(2026-05-08)。Vercel に接続済みで、本番 URL として運用されています。

- 本番 URL: `https://ai-compass-journal.com`(www への 307 リダイレクトあり)
- DNS: Cloudflare 管理(A レコード `@ → 76.76.21.21`、CNAME `www → cname.vercel-dns.com`、いずれも DNS only)
- SSL: Vercel が自動発行
- Vercel デフォルト URL `https://ai-note-homepage.vercel.app` も引き続き有効

## 必要な環境変数

最低限:

- `NEXT_PUBLIC_SITE_URL`: 公開URL。本番値は `https://ai-compass-journal.com`
- `NEXT_PUBLIC_NOTE_URL`: noteのURL。例 `https://note.com/life_to_ai`

`NEXT_PUBLIC_SITE_URL` はsitemap、robots、OGPの基準URLになるため、Productionの本番URLに必ず設定してください。未設定時は一時的なfallback URLでビルドできますが、公開前に差し替える前提です。

任意:

- `NEXT_PUBLIC_CONTACT_EMAIL`
- `NEXT_PUBLIC_ZENN_URL`
- `NEXT_PUBLIC_MEDIUM_URL`
- `NEXT_PUBLIC_BOOTH_URL`
- `NEXT_PUBLIC_GITHUB_URL`
- `NEXT_PUBLIC_X_URL`
- `NEXT_PUBLIC_YOUTUBE_URL`
- `NEXT_PUBLIC_NEWSLETTER_URL`
- `NEXT_PUBLIC_COMMUNITY_URL`

未設定の外部URLは画面上で「外部URLは公開前に設定」扱いになります。APIキー、トークン、秘密情報は設定しないでください。

## Deployment Protection / 401確認

- VercelのProject SettingsでDeployment Protectionの状態を確認する
- 本番URLをシークレットウィンドウで開き、401やログイン要求が出ないことを確認する
- Preview URLは保護されていてもよいが、Production URLは公開目的に合わせて確認する

## 公開後に確認するURL一覧

すべて `https://ai-compass-journal.com` 配下で確認します。

- `/`
- `/start`
- `/free`
- `/ai-use-cases`
- `/products`
- `/library`
- `/media`
- `/newsletter`
- `/community`
- `/consulting`
- `/en`
- `/legal`
- `/sitemap.xml`
- `/robots.txt`

各ページで確認すること:

- ヘッダーの横スクロールがスマホで使える
- CTAが `/start` `/free` `/products` `/newsletter` `/consulting` に自然につながる
- 外部URL未設定のカードが誤って本物の販売ページのように見えない
- `/legal` が正式文書ではなく準備中であると明確に読める

## Search Console / Analytics導入メモ

- Search ConsoleにProduction URLを登録する
- `sitemap.xml` を送信する
- Analyticsを入れる場合は、計測IDを公開可能な環境変数で管理する
- Cookie同意やプライバシーポリシーが必要な計測を入れる場合は、`/legal` を正式版へ差し替える

## placeholder差し替えチェック

公開前に以下を本物のURLへ差し替えます。

- Zenn
- Medium
- BOOTH
- X
- YouTube
- Newsletter
- Community
- Contact email

差し替え場所:

- Vercel Environment Variables
- `src/config/site.ts`
- 必要に応じて `src/data/articles.ts` と `src/data/products.ts`
