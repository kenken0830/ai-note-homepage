# 独自実験の自動化(マルチエージェント運用)

「世界最高候補」を目指す独自実験基盤の運用ドキュメント。
Codex App / Claude Code を **API 課金なし**で連携させ、再現可能なデータと
マルチエージェント合意の考察を `/experiments/[slug]` として自動公開します。

## 設計思想

- **API キー不要**: ChatGPT Pro / Claude Pro/Max の既存サブスクで完結
- **マルチエージェント合意**: 単一 LLM の癖を複数エージェントで打ち消す
- **検証可能性**: 全実験設定・データ・各エージェントの考察を公開
- **司令塔は GitHub Actions**: Issue を立てて Codex App / Claude Code に委譲

## 全体フロー

```
[GitHub Actions: run-experiment.yml]
  cron 月曜 9:00 JST または workflow_dispatch
  ↓
[validate-experiment-config.mjs] 設定ファイルを検証
  ↓
[Issue を自動で立てる]
  「@codex 実験 [id] のデータ収集と考察生成を依頼」
  ↓
[Codex App が Issue に反応]
  ChatGPT Pro サブスク内で動く
  → データ収集 + 第一考察 + PR 作成
  ↓
[同じ PR に @claude メンション]
  ↓
[Claude Code Action 起動]
  Claude Pro/Max サブスク内で動く
  → 批判 + 統合考察 + コミット追加
  ↓
[CI: lint / typecheck / build / Validate ContentAssets]
  ↓
[人間レビュー]
  - 数値の整合性
  - 断定表現の有無
  - 未確認情報の検出
  ↓
[マージ → Vercel デプロイ]
  ↓
[/experiments/[slug] 公開]
```

## 1 度だけの設定タスク

### A. Codex App のリポジトリ連携を確認

ChatGPT の設定画面で:
1. Settings → Connectors → GitHub
2. `kenken0830/ai-note-homepage` への書き込み権限を有効化
3. Codex App が Issue / PR にアクセスできることを確認

詳細: https://platform.openai.com/docs/guides/codex

### B. Claude Code OAuth トークンを GitHub Secrets に登録

ローカル PC で:

```bash
# Claude Code をインストール
npm install -g @anthropic-ai/claude-code

# Claude Pro/Max にログイン
claude /login
# ブラウザでログインフロー完了

# トークンを取得
claude /status
# ここで oauth トークンが表示される(あるいは設定ファイル ~/.claude/auth に保存)
```

GitHub に登録:
1. https://github.com/kenken0830/ai-note-homepage/settings/secrets/actions
2. **New repository secret**
3. Name: `CLAUDE_CODE_OAUTH_TOKEN`
4. Secret: 取得したトークン
5. **Add secret**

### C. Claude Code GitHub App をインストール

1. https://github.com/apps/claude
2. リポジトリ `kenken0830/ai-note-homepage` を選んで Install
3. これで PR / Issue で `@claude` メンションが反応する

### D. ラベルを作成(任意)

https://github.com/kenken0830/ai-note-homepage/labels で:
- `experiment`(色: 紫 `#7c3aed`)
- `automation`(色: 緑 `#16a34a`)

## 新しい実験を作る手順

### 1. 設定ファイルを作る

`scripts/experiments/[your-id].yml` を作成。スキーマは
[`_schema.md`](../scripts/experiments/_schema.md) 参照。
[`sample-llm-comparison.yml`](../scripts/experiments/sample-llm-comparison.yml) をコピーすると早い。

例:

```yaml
id: claude-vs-gpt-summary-2026-05
slug: claude-vs-gpt-summary
title: "Claude 4.5 vs GPT-5: 要約品質 30 トライアル"
...(スキーマに従う)
```

### 2. 検証してコミット + push

```bash
# ローカル検証
node scripts/validate-experiment-config.mjs scripts/experiments/claude-vs-gpt-summary-2026-05.yml

# 設定ファイルだけ commit + PR
git checkout -b experiment/claude-vs-gpt-summary
git add scripts/experiments/claude-vs-gpt-summary-2026-05.yml
git commit -m "config(experiment): add claude-vs-gpt-summary"
git push -u origin experiment/claude-vs-gpt-summary
```

### 3. workflow を起動

GitHub Actions の **Run experiment (orchestrator)** で:
1. **Run workflow**
2. config 入力欄に `claude-vs-gpt-summary-2026-05` を入れる
3. **Run workflow**

### 4. Issue が立つのを待つ

数分後、`[experiment] Claude 4.5 vs GPT-5: 要約品質 30 トライアル` という Issue が自動で立ちます。

Issue 本文に `@codex` メンションがあるので、Codex App が自動で反応してデータ収集 + PR 作成を始めます。

### 5. PR が立ったら `@claude` メンション

Codex App が PR を立てたら、PR 本文か新規コメントで:

```
@claude このPRをレビューして、批判視点で改善提案をコメントしてください。
特に「断定表現」「未確認情報」「考察の重複」をチェックしてください。
```

Claude Code Action が反応してレビューします。

### 6. 人間レビュー → マージ

- 数値の整合性チェック
- 各エージェントの考察が独立した視点で書けているか
- 統合考察が個別の合意点だけで構成されているか
- マージ

### 7. 自動デプロイ → 公開

Vercel が自動再デプロイし、`/experiments/[slug]` で公開されます。

## 実験頻度の目安

- **週 1 回**(推奨): 月曜 9:00 JST 自動 + 必要時に手動 trigger
- **月 4〜5 件**: 半年で 24〜30 件、1 年で 50〜60 件の独自データ集に
- **API コストはゼロ**: サブスク内で完結

## トラブルシューティング

### Codex App が反応しない

- ChatGPT 側で Codex の GitHub 連携が有効か確認
- Issue にラベル `automation` がついているか
- ChatGPT Pro のクォータ内か(ChatGPT 設定画面で確認)

### Claude Code が反応しない

- GitHub Apps → Claude が installed か
- `CLAUDE_CODE_OAUTH_TOKEN` が GitHub Secrets に登録されているか
- Claude Pro/Max のクォータ内か

### CI が失敗する

- `Validate ContentAssets` workflow が実行される(本 PR の対象は contentAssets ではないが、 lint/build を必ず通す)
- `next-env.d.ts` が含まれていないか確認
- 数値の型エラー(value が string なのに number が想定されている等)

### 数値が断定的すぎる

`@claude` で:
```
@claude 統合考察に数値の断定表現が残っています。
「N% の差がある」のような表現を「N% の差が見られた(N=30)」に修正してください。
```

## 安全境界

このワークフロー・スクリプトは以下に**絶対に**触れません:

- `note_monetization_*.py` / `note_create_paid_*.py` / `note_publish_paid_*.py` / `note_create_free_manga_link_*.py`
- `reports/publish_runs/`
- `ui-automation-hub/`
- `note_links.json`
- `editor.note.com` URL の取り扱い
- API キー / Cookie / token / session / authorization / password / secret

設定ファイルでもこれらは禁止。`validate-experiment-config.mjs` が検出して FAIL します。

## 関連ドキュメント

- [`docs/note-hp-content-strategy.md`](note-hp-content-strategy.md) — note と HP の住み分け
- [`docs/article-quality-score.md`](article-quality-score.md) — 80 点品質基準(参考)
- [`docs/auto-publish-setup.md`](auto-publish-setup.md) — 完全自動公開 (Phase 5)
- [`scripts/experiments/_schema.md`](../scripts/experiments/_schema.md) — 設定ファイル仕様

## 改訂履歴

- 2026-05-09: 初版(マルチエージェント運用 + Codex App / Claude Code 連携 + サブスクベース)
