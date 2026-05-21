# Local Environment Troubleshooting

## 目的

AI Compass Journal の半自動更新で、ローカル環境や実行権限が原因で止まるケースを減らすためのトラブルシューティング集です。

## `.codex/worktrees` を直接使わない理由

`.codex/worktrees` は Codex 実行基盤側の都合と衝突しやすく、通常の更新作業には不向きです。特に次の問題が起きやすくなります。

- `.git/index.lock` 作成失敗
- `FETCH_HEAD` 書き込み失敗
- branch / ref 更新失敗
- Node 実行時の権限衝突

そのため、日常運用では `.codex/worktrees` を主作業場所にせず、`D:\Cursor\...` の fresh clone を使う方針にします。

## fresh clone を使う理由

fresh clone は、次の観点で安定しています。

- working tree を clean に保ちやすい
- 別タスクの差分混入を防ぎやすい
- `main` との差分を明確にしやすい
- 権限が `.codex` より単純になりやすい
- push 前に人間が確認しやすい

Codex を使う作業は、原則として fresh clone から開始します。

## index.lock 権限問題の回避

`index.lock` 問題を避けるには、次を徹底します。

1. 作業前に clone が clean か確認する
2. 他プロセスが同じ clone を触っていない状態で作業する
3. `.codex` worktree を避ける
4. `git status` と `git branch --show-current` を先に確認する

lock file が残っているからといって、原因未確認のまま削除する運用は避けます。別プロセスが本当に動いていないことを確認してから、人間が対処する前提にします。

## next-swc 権限問題の扱い

Next.js の build は、SWC バイナリをローカルキャッシュへ配置する過程で権限エラーになることがあります。特に、次のパスで止まるケースがありました。

- `C:\Users\bonny\AppData\Local\next-swc`

この失敗は、今回差分が悪いとは限らず、ローカル環境の書き込み権限が原因のことがあります。`lint` と `typecheck` が通っているか、CI 上の build が通るかを合わせて見て切り分けます。

## typecheck / build が環境起因で失敗したときの切り分け

`typecheck` や `build` が落ちたら、次の順で切り分けます。

1. エラー箇所が今回触ったファイルか
2. 同じエラーが `main` でも再現するか
3. Node / Next.js / TypeScript の依存関係が欠けていないか
4. 権限エラーか、型エラーか、依存解決エラーか
5. CI でも同じ失敗が出るか

例:

- `Could not find declaration file for module 'next'`
  - 依存関係や環境差分の可能性が高い
- `EPERM: operation not permitted, mkdir ... next-swc`
  - 権限起因の可能性が高い

今回差分起因でないと判断した場合でも、失敗を PASS 扱いせず、PR 本文に明記します。

## `npm run lint` / `validate-content-assets` を最低限の確認として扱う場合の注意

環境依存で `typecheck` や `build` が不安定なときでも、`lint` と `validate-content-assets` は比較的通しやすい確認として使えます。ただし、これだけで完全検証と見なしてはいけません。

注意点は次の通りです。

- `lint` が通っても型エラーは残り得る
- content asset 検証が通っても画面表示や build 成功は保証されない
- docs 中心の PR と UI / 実装変更 PR では重みが違う

そのため、最低限確認として扱う場合も、`typecheck` / `build` を試した結果と失敗理由は必ず残します。

## GitHub Actions / Vercel CI を最終判定にする方針

ローカルが不安定な場合でも、最終的な公開可否は GitHub Actions と Vercel の結果で判断できます。

推奨方針は次の通りです。

1. Codex は fresh clone で差分と commit を作る
2. ローカルでは通る範囲まで検証する
3. push 後は GitHub Actions の結果を見る
4. `main` merge 前に Vercel / CI の状態を確認する
5. merge 判断は Human owner が行う

ローカル失敗と本番失敗を混同せず、どこが環境問題でどこが差分問題かを切り分けることを優先します。
