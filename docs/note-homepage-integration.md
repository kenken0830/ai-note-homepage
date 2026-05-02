# note自動投稿プロジェクトとホームページの連携方針

AI Compass Journalホームページは、別プロジェクトで動いているnote自動投稿を操作しません。

## 目的

- note側: 毎日の調査、実験ログ、公開済みnoteの生成
- ホームページ側: 公開済みnoteを整理し、AI活用辞典、無料キット、相談導線へつなぐ

ホームページはnoteの投稿、編集、公開、下書き作成、収益化処理、UI Automation Hub queue実行を行いません。

## 受け取るデータ

`src/data/notePosts.ts` に、公開済みnoteだけを静的データとして追加します。

受け取ってよい項目:

- 公開済みnote URL
- タイトル
- 要約
- タグ
- 公開日
- HP化候補かどうか
- HP化候補にする理由
- 関連するホームページ内ページ

受け取らない項目:

- noteログイン情報
- editor.note.comの下書きURL
- 未公開下書き本文
- APIキー、Cookie、トークン
- 有料noteの内部ペイロード
- UI Automation Hub queue payload

## 表示ルール

- `notePosts` が空の場合は、連携待ちメッセージを表示する
- `url` は `https://note.com/.../n/...` 形式の公開済みURLだけを入れる
- `editor.note.com` URLは入れない
- URL未設定やplaceholderは通常リンクに見せない
- HP化候補は、本文を転載せず、後から `/ai-use-cases`、`/guides`、`/workflows` へ再編集する

## 更新手順

1. note自動投稿プロジェクトで公開済みURLを確認する
2. タイトル、要約、タグ、公開日、HP化候補理由を整理する
3. `src/data/notePosts.ts` に1件追加する
4. `/library` で表示を確認する
5. HP化する場合は、本文転載ではなく再現できる手順に編集して別PRで追加する

## 連携方式

### RSS連携

目的:

- 公開済みnoteの更新検知や最新記事表示に使う

受け取ってよいデータ:

- `title`
- `url`
- `publishedAt`
- `excerpt` / `summary` 相当
- thumbnailがある場合のURL

受け取らないデータ:

- `editor.note.com` URL
- 下書きURL
- Cookie / token / session
- note本文全文
- 有料noteの内部情報

注意:

- RSSは存在確認と最新記事表示向きに使う
- HP化候補の判断には、要約や候補理由を持てるJSON export連携を使う

### JSON export連携

目的:

- note自動投稿プロジェクトからHP化候補を渡す

受け取ってよいデータ:

- `id`
- `title`
- `url`
- `publishedAt`
- `summary`
- `tags`
- `relatedUseCaseSlug`
- `relatedPages`
- `homepageCandidate`
- `priority`
- `noteAngle`
- `homepageAngle`

受け取らないデータ:

- note本文全文
- `editor.note.com` URL
- 下書きURL
- noteの認証情報
- note公開操作に必要な情報

注意:

- noteは実験ログ、HPは再現できる手順として住み分ける
- `homepageCandidate: true` のものだけ `articleBacklog` 昇格候補にする

### PR連携

目的:

- note自動投稿プロジェクトの成果を、ホームページrepoへ安全に反映する

方針:

- noteプロジェクトはホームページrepoの `main` を直接更新しない
- PRで `notePosts` / `articleBacklog` / `updates` の変更を提案する
- 人間が確認してからマージする

禁止:

- note投稿やnote公開をホームページ側で実行しない
- note下書き編集をホームページ側で実行しない
- note収益化パイプラインをホームページ側で触らない

## 禁止事項

- ホームページ側からnote投稿を実行しない
- ホームページ側からnote下書きを作らない
- ホームページ側からnote公開をしない
- `free_manga_link_draft` や収益化queueを実行しない
- `editor.note.com` URLを公開リンクとして扱わない
- note記事をホームページへ丸ごと転載しない
