# 実験設定ファイル(YAML)スキーマ

`scripts/experiments/[id].yml` に各実験の設定を書きます。
GitHub Actions の `run-experiment.yml` がこのファイルを読んで、Codex CLI / Claude Code Action を順に呼び、結果を `src/data/experiments.ts` に append する PR を自動作成します。

## 必須フィールド

```yaml
id: llm-summarization-comparison-2026-05
slug: llm-summarization-comparison
title: "Claude / GPT / Gemini の議事録要約品質比較(N=30)"
description: "同じ会議メモを 3 LLM に 30 回ずつ要約させ、決定事項抽出の正確性と文体一貫性を測定した実験。"
hypothesis: "同じ要約タスクでも、決定事項の抽出精度は LLM ごとに 10% 以上の差が出る"
method: "5 種類の会議メモを各 LLM に同じプロンプトで 30 回要約させ、決定事項の抽出 F1 / 推定文字数のばらつき / 出力時間を測定"
subjects:
  - claude-sonnet-4-5
  - gpt-5
  - gemini-2-0-pro
trial_count: 30
tags:
  - 議事録
  - LLM比較
  - 要約
related_use_case_slug: meeting-notes-to-minutes  # /ai-use-cases/[slug] と紐づけ(任意)

# マルチエージェント考察を依頼する視点(各エージェントに 1 視点ずつ)
agent_perspectives:
  - agent: claude-sonnet
    perspective: 仮説検証視点
    instruction: "実測データを踏まえて、仮説が支持されたかを 2 段落で評価してください。数値はデータ表から引用し、断定は避けてください"
  - agent: codex
    perspective: 批判視点
    instruction: "この実験設計の弱点・反証可能性・他の解釈を 2 段落で書いてください"
  - agent: claude-opus
    perspective: 統合視点
    instruction: "上記 2 つの考察を読み、両者が合意した点だけを 3 段落でまとめてください"

# 再現手順(自動生成されない、設定者が書く)
reproduction_steps:
  - "scripts/experiments/llm-summarization-comparison-2026-05.yml をコピー"
  - "ANTHROPIC API / OpenAI API / Google AI API のキーを GitHub Secrets に登録"
  - "GitHub Actions で run-experiment.yml を slug 指定で workflow_dispatch"
  - "PR が立ったらレビューしてマージ"

# 次に試したいこと(初稿は設定者が書く、Phase 2 で自動生成も可能)
next_steps:
  - "プロンプトを統一せず、各 LLM 推奨形式に変えた場合の差を測定"
  - "30 回 → 100 回に増やして分散の収束を観察"

# 安全境界(全実験共通、変更不可)
safety:
  - editor.note.com URL を扱わない
  - 認証情報を payload に含めない
  - 数値は実測値のみ、推測値は使わない
  - 出典がない主張は「要確認」と明記
```

## 任意フィールド

- `published_at`: ISO 8601。省略時は workflow 実行日
- `manual_data_points`: 手動測定するデータ(workflow が自動測定できないもの)

## バリデーション

`scripts/validate-experiment-config.mjs` が以下をチェックします。

- 必須フィールドの存在
- `id` / `slug` の kebab-case 正規表現
- `subjects` が 2 件以上(比較実験の前提)
- `trial_count` が 5 以上
- `agent_perspectives` が 2 件以上
- editor.note.com / 認証情報の混入チェック

## 安全境界

このスキーマで定義された設定からは:

- ❌ 外部 API への書き込み(投稿・公開操作)はしない
- ❌ note 自動投稿側のスクリプトを呼ばない
- ❌ 認証情報を payload にエンコードしない
- ✅ 読み取り専用 API 呼び出しのみ(LLM 推論)
- ✅ 結果の保存先は `src/data/experiments.ts` の append のみ
