# 独自実験の自動化(ChatGPT Automations + Codex Desktop App)

「世界最高候補」を目指す独自実験基盤の運用ドキュメント。
**ChatGPT Pro の Automations** と **Codex Desktop App** を組み合わせて、API キー無しで完全自動化します。

## 設計思想

- **API キー不要**: ChatGPT Pro の既存サブスクで完結
- **ChatGPT Automations が司令塔**: 時間トリガーは ChatGPT 側
- **Codex Desktop App が実装者**: PC 上で UI 操作・ファイル編集・git push を実行
- **GitHub は受け口**: 立った PR を CI で検証してマージするだけ
- **マルチエージェント合意**: Codex に複数視点で書かせる(プロンプト内で指定)
- **検証可能性**: 全実験設定・データ・各エージェントの考察を公開

## 全体フロー

```
[ChatGPT Automations] ── スケジュール起動(毎週月曜 9:00 JST など)
        │
        ▼
[Codex Desktop App] ── UI 操作含めて全部実行
   ├ リポジトリを fetch
   ├ scripts/experiments/[id].yml の設定で各 LLM を実行
   ├ データ収集(成功率・所要時間・失敗例)
   ├ 各 agent_perspectives で独立に考察
   ├ src/data/experiments.ts に Experiment エントリを append
   ├ src/data/updates.ts に公開記録追加
   ├ npm run lint / typecheck / build
   └ ブランチ作成 + commit + push + PR 作成
        │
        ▼
[GitHub: ai-note-homepage repo に PR が立つ]
        │
        ▼
[CI: validate-content-assets / lint / typecheck / build]
        │
        ▼
[人間レビュー] - 数値の整合性 / 断定表現 / 未確認情報
        │
        ▼
[マージ → Vercel 自動デプロイ → /experiments/[slug] 公開]
```

## 1 度だけの設定タスク

### 1. ChatGPT Pro と Codex Desktop App を準備

- ChatGPT Pro 契約済み(必須)
- ChatGPT Desktop App をインストール(Mac / Windows)
- Codex Desktop App でリポジトリ `kenken0830/ai-note-homepage` への
  GitHub 連携(書き込み権限)を有効化

### 2. ChatGPT Automations を設定

ChatGPT(Web or Desktop)→ **Settings → Automations**(または Tasks) →
**Create new automation**

#### Automation A: 詳細ページ自動公開(週 1、推奨)

- **スケジュール**: 毎週月曜 9:00 JST
- **タイトル**: `HP 詳細ページ自動公開`
- **プロンプト**:

```
github.com/kenken0830/ai-note-homepage の planned 状態のユースケースを 1 つ選んで、80 点品質の詳細ページに昇格させる PR を作ってください。

手順:
1. リポジトリを fetch
2. src/data/aiUseCases.ts から status: "planned" のエントリを 1 つ選定
   優先順: src/data/articleBacklog.ts で priority: "high" のものから。
   既に published のものは選ばない。
3. docs/article-quality-score.md と docs/content-quality-checklist.md を読む
4. 既存の published エントリ(make-prompt-template など)を品質基準として参照
5. 選んだエントリを status: "published" に書き換え、以下を埋める:
   - target / scene / preparation(3 項目) / prompt / inputExample / outputExample / improvementPrompt
   - steps(5〜7 個) / checkPoints(4〜5 個) / commonMistakes(4〜5 個)
   - noteAngle(noteは実験ログ、HPは完成版手順 という住み分け表現)
   - relatedPages(/free /prompts /workflows /guides /ai-use-cases を含む)
6. src/data/articleBacklog.ts の対応エントリ status を "published" に
7. src/data/updates.ts の先頭に公開記録を追加
8. npm run lint / typecheck / build を実行(全 PASS が条件)
9. 新ブランチ feat/auto-publish-{slug}-{date} を作成、コミット
10. PR を作成(本文に「自動生成」+ 100 点満点の自己採点)

厳守:
- editor.note.com URL を扱わない
- 認証情報を含めない
- 未確認の数値・統計を断定しない
- note 本文を丸ごと転載しない
- src/data/{aiUseCases,articleBacklog,updates}.ts 以外は変更しない
- next-env.d.ts は除外
- main に直接 push しない、必ず PR 経由

完了したら PR URL を返してください。
```

#### Automation B: 独自実験データ収集(月 1、任意)

`scripts/experiments/*.yml` の planned 設定を実行する内容。
詳細プロンプトは [`scripts/experiments/_schema.md`](../scripts/experiments/_schema.md) を参照して
ChatGPT Automation に貼り付けてください。

#### Automation C: note 取り込み(毎日、任意)

既存の `homepage_handoff` スキーマで PR を作る内容。
詳細は [`docs/homepage-handoff-automation.md`](homepage-handoff-automation.md) 参照。

### 3. 動作確認

ChatGPT Automations の管理画面から **「Run now」** で 1 回手動実行。
GitHub の Pull requests タブに PR が立てば成功。

## 新しい実験を作る手順

### 1. 設定ファイルを作る

`scripts/experiments/[your-id].yml` を作成。スキーマは
[`_schema.md`](../scripts/experiments/_schema.md) 参照。
[`sample-llm-comparison.yml`](../scripts/experiments/sample-llm-comparison.yml) をコピーすると早い。

### 2. main にマージ

設定ファイルだけの PR を作ってマージ。

### 3. ChatGPT Automation を待つ

次回スケジュール時刻に Codex Desktop App が自動で実験を実行 + PR を作成。

## 一時停止 / 無効化

ChatGPT Automations 管理画面で:
- 個別 Automation を **Pause**
- または **Delete**

## トラブルシューティング

### Codex が反応しない

- ChatGPT Pro のクォータ内か(画面で確認)
- Codex Desktop App の GitHub 連携権限を再確認
- Automation のプロンプトに無理な指示が含まれていないか

### PR が立つが内容がメチャクチャ

- プロンプトの指示を厳密化(参照すべき docs / 厳守ルール / 例)
- 既存の published エントリを「これと同じ品質で」と参照させる

### CI が失敗する

- 自動 CI(Validate ContentAssets / lint / typecheck / build)で何が落ちたか確認
- プロンプトに「npm run lint / typecheck / build を全 PASS させること」を明示

### 「想定外パス変更」検出

- Codex が `src/data/{aiUseCases,articleBacklog,updates}.ts` 以外を編集
- プロンプトの「厳守:〜以外は変更しない」を強化

## 旧 GitHub Actions オーケストレーターについて

`.github/workflows/run-experiment.yml` は当初 `@codex` / `@claude` メンションで自律起動する想定だったが、Issue 本文のメンションだけでは AI Agent は反応しないことが判明した。

→ ChatGPT Automations の方が現実的。当該 workflow は `workflow_dispatch` のみ残し、
cron は無効化済み。手動デバッグ用に残しているが、運用では使用しない。

## 安全境界

このワークフロー・スクリプトは以下に**絶対に**触れません:

- `note_monetization_*.py` / `note_create_paid_*.py` / `note_publish_paid_*.py` / `note_create_free_manga_link_*.py`
- `reports/publish_runs/`
- `ui-automation-hub/`
- `note_links.json`
- `editor.note.com` URL の取り扱い
- API キー / Cookie / token / session / authorization / password / secret

設定ファイルでもこれらは禁止。`validate-experiment-config.mjs` が検出して FAIL します。
ChatGPT Automations のプロンプト内でも厳守を明記してください。

## 関連ドキュメント

- [`docs/note-hp-content-strategy.md`](note-hp-content-strategy.md) — note と HP の住み分け
- [`docs/article-quality-score.md`](article-quality-score.md) — 80 点品質基準
- [`docs/auto-publish-setup.md`](auto-publish-setup.md) — 過去の API ベース自動化(参考)
- [`docs/homepage-handoff-automation.md`](homepage-handoff-automation.md) — note 連携 handoff 自動化
- [`scripts/experiments/_schema.md`](../scripts/experiments/_schema.md) — 設定ファイル仕様

## 改訂履歴

- 2026-05-09 (v1): 初版(`@codex` / `@claude` メンション前提の GitHub Actions orchestrator)
- 2026-05-09 (v2): **ChatGPT Automations + Codex Desktop App ベースに全面書き換え**(現運用)
