# コンテンツ制作ワークフロー

AI Compass Journalの媒体運用を、毎日・毎週・毎月のサイクルに分けて整理します。

## 毎日note

- AIニュース、ChatGPT活用、AIノートの小さな改善を1本のメモにする
- 記事末尾に `/free` または `/newsletter` への導線を置く
- 商品に近い記事は `src/data/articles.ts` の `relatedProductIds` を更新する

## 週1まとめ

- その週のnote記事をテーマ別に整理する
- `/library` に載せる候補を選ぶ
- XやYouTube概要欄から戻すURLを決める

## Zenn技術記事

- GitHub、Markdown、Next.js、AIワークフローなど再現性があるテーマに絞る
- 記事内で技術者向けキットやGitHubサンプルへ誘導する
- 公開後に `src/data/articles.ts` の `sourceUrl` を本物のZenn URLへ差し替える

## Medium英語記事

- 日本語記事の翻訳ではなく、英語圏読者向けに文脈を補って書く
- `/en` と英語ニュースレター導線へ戻す
- 公開後に `NEXT_PUBLIC_MEDIUM_URL` と記事URLを更新する

## BOOTH商品化

- noteやメルマガで反応があったテンプレートを商品化する
- 商品説明に対象読者、使い方、関連無料記事を明記する
- 公開後に `src/data/products.ts` の `purchaseUrl` と `status` を更新する

## メルマガ配信

- Day 0からDay 14までのステップ配信を維持する
- 無料キットの更新時はDay 0とDay 1を見直す
- 商品導線が増えたらDay 7以降の案内を更新する

## 月1商品改善

- 商品ページ、BOOTH説明、note有料記事、Zenn本の導線を点検する
- よくある質問を商品説明か `/consulting` に反映する
- 価格、販売場所、CTA文言を `src/data/products.ts` で更新する

## KPI確認

毎月確認する指標:

- トップページから `/free` へのクリック
- `/free` からメルマガ登録へのクリック
- `/library` から外部記事へのクリック
- `/products` から販売ページへのクリック
- `/consulting` への到達数
- note、Zenn、Medium、X、YouTubeからの流入

Analytics導入後はUTMを使って媒体別の流入とCVを確認します。
