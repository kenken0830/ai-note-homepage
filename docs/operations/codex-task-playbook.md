# Codex Task Playbook

## 目的

Codex に投げるタスクの形式を揃え、fresh clone を前提に安全に実装・検証・commit まで進めるための運用ルールです。

## Codex へ投げる標準タスク形式

Codex には、最低限次の情報を含めて投げます。

1. 目的
   - 今回何をやるか
   - 今回何をやらないか

2. 対象リポジトリ
   - リポジトリ名
   - 作業用 fresh clone パス
   - ブランチ名

3. 最初に必ず行うこと
   - clone 確認
   - main 切り替え
   - fetch
   - fast-forward pull
   - clean 確認
   - 作業ブランチ作成

4. 触ってよいファイル

5. 触ってはいけないファイル

6. 実装方針

7. 検証コマンド

8. commit message

9. PR title / PR body 要件

10. push / PR 失敗時の報告形式

## fresh clone を使う理由

fresh clone を使う理由は次の通りです。

- 既存の汚れた working tree と混ざらない
- 別PJの差分を誤って含めない
- main との差分を明確にできる
- 検証結果を今回作業だけに寄せやすい
- commit 範囲を小さく保ちやすい

Codex には既存 worktree の再利用ではなく、原則として fresh clone を使わせます。

## main 最新化の必須手順

Codex は作業前に必ず以下を行います。

1. clone が無ければ fresh clone する
2. `main` に切り替える
3. `origin/main` を取得する
4. `main` を fast-forward で最新化する
5. working tree が clean であることを確認する
6. 最新の `main` から作業ブランチを切る

この手順を省略すると、古い main や混入差分に依存した PR になりやすいため、必須です。

## push / PR が失敗した場合の報告形式

GitHub への push / PR 作成が失敗した場合でも、ローカル commit までは必ず作成し、以下を報告します。

- 作業フォルダ
- branch 名
- commit hash
- 変更ファイル
- 検証結果
- push / PR 作成の失敗理由
- PR 本文

## 禁止事項

- note 投稿系ファイルを勝手に触らない
- note 投稿 workflow を変更しない
- `.env`、secret、API key に触らない
- 指定されていない data ファイルを広く触らない
- 既存記事本文を別目的で書き換えない
- 「ついで修正」で範囲を広げない
- main に直接 push しない
- 失敗した検証を黙って PASS 扱いしない

## PR本文テンプレート

```md
## Summary

- 目的:
- 変更ファイル:
- 今回やっていないこと:

## Verification

- `npm run lint`
- `npm run typecheck`
- `npm run build`
- `npm run validate-content-assets`

## Safety checks

- note 投稿系に触れていないこと
- 触ってはいけない領域に触れていないこと
- 未確認情報の断定がないこと

## Human checks

- 人間が確認すべき点
```

## 運用原則

- Codex は実装と検証を担当する
- PR の merge 可否は人間が判断する
- 検証失敗時は隠さず切り分けを残す
- 差分を小さく、意図を明確に保つ
