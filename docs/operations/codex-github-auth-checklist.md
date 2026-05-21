# Codex GitHub Auth Checklist

## 目的

Codex 実行後に `git push` や PR 作成が止まったとき、確認すべき項目を固定化するためのチェックリストです。

## GitHub push が失敗したときの確認項目

まず、次の順で切り分けます。

1. branch が目的の branch か
2. local commit が存在するか
3. remote URL が想定どおりか
4. `git status` が clean か
5. 認証 helper が動く環境か
6. GitHub 側に write 権限があるか

確認コマンド例:

```powershell
git branch --show-current
git log -1 --oneline
git remote -v
git status --short --branch
git config --show-origin --get credential.helper
```

失敗ログとしては、次の文字列を特に記録します。

- `cannot spawn sh`
- `could not read Username for 'https://github.com'`
- `403 Resource not accessible by integration`

## gh CLI を導入する場合の検討項目

`gh` CLI を導入すると、push 後の PR 作成を PowerShell からまとめやすくなります。ただし、導入前に次を確認します。

- Windows 環境に `gh` を安定導入できるか
- `gh auth login` を人間が一度完了できるか
- 対象 repository に対する write / PR 権限があるか
- Codex 実行環境から `gh` を呼べるか
- PR 本文テンプレートを CLI で渡す運用にするか

`gh` を使う場合でも、初回認証は人間が行う前提で考える方が安全です。

## GitHub Desktop を使う場合の代替手順

CLI 認証が不安定な場合、GitHub Desktop を代替経路として使えます。

1. Codex が fresh clone で commit まで作成する
2. 人間が同じ作業フォルダを GitHub Desktop で開く
3. 差分と commit を確認する
4. `Publish branch` または `Push origin` を実行する
5. GitHub Desktop から PR 作成画面へ進む

この方法は、credential helper の不調や `cannot spawn sh` を回避しやすいのが利点です。

## PowerShell から push する標準手順

人間が PowerShell で push する場合の標準手順は次の通りです。

```powershell
cd D:\Cursor\ai-note-homepage-automation-bottleneck-work
git status --short --branch
git branch --show-current
git log -1 --oneline
git push -u origin codex/document-automation-bottlenecks
```

push 後は GitHub 上で branch が作成されたことを確認し、その後 PR を作成します。

## safe.directory の扱い

Git が ownership を警戒して止まる場合は、`safe.directory` 設定が必要になることがあります。ただし、広すぎる設定は避け、対象 clone だけを登録します。

例:

```powershell
git config --global --add safe.directory D:/Cursor/ai-note-homepage-automation-bottleneck-work
```

`.codex` 配下の一時 worktree を広く safe.directory に追加する運用は推奨しません。

## PR 作成後の確認項目

PR 作成後は次を確認します。

- base branch が `main` か
- title がタスク目的と一致しているか
- PR 本文に検証結果が載っているか
- note 投稿系や data ファイルに触れていないことが明記されているか
- CI が開始されているか

## CI が赤い場合の止め方

CI が赤い場合は、そのまま merge せず次の順で止めます。

1. 失敗ジョブ名を確認する
2. ローカルで再現するか確認する
3. 今回差分起因か既存エラーかを切り分ける
4. PR 本文またはコメントに切り分け結果を残す
5. 差分起因なら修正する
6. 環境起因や既存 main 起因なら merge 判断を人間に戻す

CI を無視して merge するかどうかは、Codex ではなく Human owner が判断します。
