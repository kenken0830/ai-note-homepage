# プラットフォーム運用メモ

AI Compass Journalは、各媒体を別々に伸ばしながら、最終的にホームページへ戻す本店型の導線で運用します。

## 媒体ごとの役割

| 媒体 | 役割 | 投稿頻度 | ホームページへの戻し方 |
| --- | --- | --- | --- |
| note | 日本語の実践マガジン | 週2-4本 | 記事末尾に `/free` `/newsletter` `/products` を置く |
| Zenn | 技術者向けの実装知 | 月2本 | サンプルコードや技術キットから `/products` へ戻す |
| Medium | 英語圏への入口 | 月1-2本 | `/en` と英語ニュースレター導線へ戻す |
| BOOTH | テンプレート販売所 | 商品追加ごと | 商品説明に `/start` `/library` `/consulting` を置く |
| GitHub | 公開キットと実装サンプル | 更新時 | READMEから `/products` と `/consulting` へ戻す |
| X | 発見と速報 | 随時 | 固定ポストと投稿末尾から `/free` へ戻す |
| YouTube | 画面で学ぶ導入ガイド | 準備中 | 概要欄から `/start` `/free` へ戻す |
| Newsletter | 無料DL後の学習導線 | ステップ配信 | Day 7以降で `/products` `/community` `/consulting` へ戻す |
| Community | 継続実践の場所 | 準備中 | 月次テーマから商品改善と相談導線へ戻す |

## UTMの付け方

外部リンクは `src/lib/utm.ts` の `withUtm` を通せます。

推奨ルール:

- `utm_source`: `note`、`zenn`、`medium`、`booth`、`github`、`x`、`youtube` など
- `utm_medium`: `article_card`、`platform_card`、`product_card`、`profile_link` など
- `utm_campaign`: `ai_compass_journal`

未設定URL、`#`、placeholder URLはUTM付与せず安全に扱います。

## 商品導線

基本ルート:

1. 無料スターターキット
2. BOOTHテンプレート
3. note有料記事
4. Zenn本・技術キット
5. メンバーシップ
6. 個別相談

商品情報は `src/data/products.ts` で管理します。価格、販売場所、CTA、販売URLを変更するときはこのファイルを更新します。

## メルマガ導線

ステップ配信の基本:

- Day 0 無料キット
- Day 1 AIノートの基本思想
- Day 3 活用例
- Day 5 プロンプトカード紹介
- Day 7 有料テンプレ案内
- Day 14 メンバーシップ・相談案内

メルマガツール接続後は `NEXT_PUBLIC_NEWSLETTER_URL` を設定し、必要なら `NewsletterCta` をフォーム埋め込みへ差し替えます。

## 相談導線

相談導線は `/consulting` に集約します。

主な相談テーマ:

- 個人向けAIノート設計
- 事業者向けナレッジ管理
- AI発信フロー構築
- note / Zenn / Medium / BOOTH導線設計
- ホームページ改善

メールを使う場合は `NEXT_PUBLIC_CONTACT_EMAIL` を設定します。フォームサービスを使う場合は、秘密情報をクライアントに置かず、公開可能なURLだけを環境変数で扱います。
