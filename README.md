# AI Compass Journal

AIノートを学ぶ、使う、作る、売るための本店・導線ハブです。  
note、Zenn、Medium、BOOTH、GitHub、X、YouTube、メルマガ、コミュニティ、相談導線を1つのNext.jsサイトに束ねます。

## 追加したページ

- `/` - AI Compass Journalの本店トップ
- `/start` - はじめての方向け導入ページ
- `/free` - 無料スターターキットLP
- `/products` - 商品一覧
- `/library` - note / Zenn / Medium / 自サイト記事の横断ライブラリ
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

## 開発コマンド

```bash
npm run dev
npm run lint
npm run typecheck
npm run build
```

VercelではNext.jsとして自動検出されます。Build Commandは `npm run build` のままで問題ありません。
