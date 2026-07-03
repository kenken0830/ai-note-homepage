# Automation Bottlenecks

## 目的

AI Compass Journal の半自動運用で実際に詰まりやすい箇所を整理し、Codex を使った更新作業を安定化させるための運用ドキュメントです。

## 現在の自動化状態

現時点では、Codex は次の工程までは比較的安定して担当できます。

- 記事生成や docs 作成
- ローカルでのファイル編集
- 変更差分の整理
- branch 上での commit 作成

一方で、次の工程は止まりやすい状態です。

- GitHub への push
- GitHub 上での PR 作成
- 一部環境での Node / Next.js 実行

また、`main` にマージされた後の Vercel 公開自体は自動で流れるため、現在のボトルネックは「編集後の GitHub 連携」と「ローカル実行環境」に集中しています。

## 実際に発生した失敗

これまでの運用で確認できた失敗は次の通りです。

### GitHub 認証まわり

- `git push` 実行時に GitHub HTTPS 認証へ進めず失敗する
- `could not read Username for 'https://github.com'` が出る
- `cannot spawn sh` により認証プロンプト起動に失敗する
- GitHub connector 側で `403 Resource not accessible by integration` が出る

### worktree / Git 権限まわり

- `.codex` 配下の worktree で書き込み権限エラーが出る
- `FETCH_HEAD` や `.git/index.lock` の作成で失敗する
- branch 作成や `refs` 更新で拒否されることがある

### Node / Next.js 実行まわり

- Node 実行時に `EPERM` が出る
- Next.js が `C:\Users\bonny\AppData\Local\next-swc` に SWC を配置しようとして権限エラーになる
- `npm run build` が SWC 初期化で止まる
- `Could not find declaration file for module 'next'` など、環境依存の型解決エラーで `npm run typecheck` が止まる

## 原因の整理

失敗は大きく 3 系統に分けられます。

### 1. GitHub 書き込み認証

ローカルで clone や fetch ができても、push と PR 作成には別の認証経路が必要です。Codex 実行環境では、HTTPS のユーザー名入力や credential helper 起動が失敗するケースがあり、ここで止まりやすくなります。

### 2. `.codex` worktree 固有の権限問題

`.codex` 配下の worktree は、自動化基盤側の管理対象と衝突しやすく、`.git` 周辺のロックファイルや ref 更新で不安定になりやすい傾向があります。記事作成や docs 追記のような通常更新には、直接使わない方が安全です。

### 3. ローカル Node / Next.js 実行権限

`lint` は通っても、`typecheck` や `build` は TypeScript 型解決や SWC 配置で OS 権限の影響を受けやすく、差分が正しくても環境側で失敗することがあります。

## 現時点の推奨運用

現時点では、次の半自動フローを標準とします。

1. Codex は fresh clone で作業する
2. Codex が編集とローカル検証を進める
3. Codex が commit まで作成する
4. 人間が PowerShell から `git push` を実行する
5. 人間が GitHub 上で PR を作成する
6. CI が緑であることを確認する
7. 人間が merge を判断する
8. Vercel が `main` マージ後に自動公開する

この運用にすることで、Codex が得意な「差分作成と構造化」は活かしつつ、権限依存の箇所だけ人間側で吸収できます。

## 完全自動化に向けた課題

完全自動化へ進むには、次の課題を順に解消する必要があります。

### GitHub 書き込み認証

- Codex 実行環境から push できる認証経路を用意する
- PR 作成まで扱える CLI または connector 権限を整理する

### Codex connector 権限

- GitHub connector が repository write / PR create に必要な権限を持つか確認する
- `403 Resource not accessible by integration` の解消条件を整理する

### ローカル権限

- `.codex` worktree ではなく、通常 clone を使う前提を明文化する
- lock file や ref 書き込みの失敗条件を減らす

### Node / Next.js 実行環境

- `next-swc` の配置先権限を安定化する
- TypeScript / Next.js 依存関係の再現手順を固定化する

### merge 判断の責任境界

技術的に自動化できても、最終 merge 判断を人間に残すかは別問題です。未確認情報、note 本文転載、秘密情報混入の確認は責任境界の問題でもあるため、当面は人間判断を残す方針が安全です。

## 運用原則

- Codex には fresh clone を使わせる
- `.codex` worktree は通常運用の作業場所にしない
- push / PR 失敗時でも commit までは残す
- `lint` と `validate-content-assets` は最低限の早い検査として使う
- `typecheck` / `build` 失敗時は、差分起因か環境起因かを必ず切り分ける
- merge と公開責任は人間が持つ
