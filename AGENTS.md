# AGENTS.md

このリポジトリは、AI Compass Journalの本店・導線ハブです。

## サイトの役割

- note / Zenn / Medium / BOOTH / GitHub / X / YouTube / Newsletter / Community / Consulting を束ねる
- 読者を `/start` `/free` `/products` `/newsletter` `/consulting` に迷わず案内する
- 外部媒体を単に並べるのではなく、無料DL、商品、メルマガ、コミュニティ、相談へつなぐ

## 実装方針

- Next.js App Router / TypeScript / Tailwind CSSの既存構成を尊重する
- URL、商品、媒体、記事、導線はできるだけ `src/data/*` と `src/config/site.ts` で管理する
- コンポーネントへ大量の媒体情報や商品情報を直書きしない
- placeholderは後で差し替えやすい形にする
- APIキー、トークン、個人情報、秘密情報を追加しない
- TypeScriptエラーを残さない
- `npm run lint`、`npm run typecheck`、`npm run build` を通す

## CTA方針

主要CTAは次のページに集約する。

- `/start`
- `/free`
- `/products`
- `/newsletter`
- `/consulting`

外部URLが未設定のときは、本物の販売ページや登録ページのように見せない。

## legal方針

- `/legal` は正式文書ではなく準備中の入口であることを明確にする
- 商品販売、メルマガ、問い合わせフォーム、Analytics導入前に正式版へ差し替える
- 正式な法務助言のような断定表現を追加しない

## レビュー基準

- TypeScriptエラーはP1
- ルーティング欠落はP1
- CTAリンク切れはP1
- APIキーや個人情報の混入はP1
- dataに置くべき情報をコンポーネントへ直書きしていたら指摘する
- placeholderが本番向けに危険な表現なら指摘する
- スマホ表示で読みにくいUIは指摘する

## UI方針

- スマホ表示を優先する
- ヘッダー、CTA、カードは小さい画面でも折り返しや横スクロールで破綻しないようにする
- ボタン風リンクは、行き先が分かる具体的な文言にする
- アクセシビリティを重視し、リンクテキストだけで意味が分かるようにする
