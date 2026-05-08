# Auto-publish セットアップ手順

`.github/workflows/auto-publish-use-case.yml` を稼働させるための **人間が一度だけ行う設定**です。これを終えれば、月・水・金 9:00 JST に自動で `/ai-use-cases/[slug]` の公開 PR が立ち上がります。

## 前提

- Cloudflare Registrar でドメイン取得済み(`ai-compass-journal.com`)
- Vercel に接続済み、SSL 発行済み
- GitHub リポジトリの管理者権限を持っていること

## ステップ 1: Anthropic API キーの取得

1. https://console.anthropic.com/ にアクセスしてアカウント作成 / ログイン
2. 左メニュー → **API Keys** → **Create Key**
3. 名前を `ai-note-homepage-auto-publish` 等にして発行
4. 表示されたキー(`sk-ant-...`)をコピー(画面を閉じると二度と見えない)
5. **Settings → Billing で月 $5 程度のクレジットを購入**(自動公開だけなら月 $1〜4 で十分)

### コスト目安

- 1 PR あたりの API 呼び出し: 約 $0.10〜0.30(Claude Sonnet 4.5、入力 6000 トークン + 出力 2000 トークン)
- 週 3 回稼働 = 月 12 PR = **月 $1.2〜3.6**
- 上限に達してもサイトの既存ページは影響なし(自動公開だけ止まる)

## ステップ 2: GitHub Secrets に登録

1. https://github.com/kenken0830/ai-note-homepage/settings/secrets/actions にアクセス
2. **New repository secret** をクリック
3. Name: `ANTHROPIC_API_KEY`
4. Secret: ステップ 1 で取得したキー(`sk-ant-...`)
5. **Add secret**

これで workflow が API キーを読めるようになります。

## ステップ 3: ラベルを作成(任意、PR 自動振り分け用)

1. https://github.com/kenken0830/ai-note-homepage/labels にアクセス
2. 以下 2 つを **New label** で追加:

| Label | Color | 用途 |
| --- | --- | --- |
| `auto-publish` | `#16a34a`(緑) | スコア 80+ で自動マージ候補 |
| `needs-review` | `#f59e0b`(黄) | スコア 80 未満、人間レビュー必須 |

ラベル無しでも workflow は動きますが、PR 一覧で識別しやすくなります。

## ステップ 4: Branch protection rule の設定(自動マージしたい場合)

⚠️ **これは慎重に**。「コードを書かずに main に変更が反映される」境界を作る設定です。

### 方針 A: 自動マージしない(推奨、初期)

- 何も設定しない
- すべての PR をあなたが目視確認してマージ
- 自動公開で「PR が立つ」までは自動、マージは人間判断

### 方針 B: 80 点超えのみ auto-merge(慣れてきてから)

1. https://github.com/kenken0830/ai-note-homepage/settings/branches にアクセス
2. **Add branch protection rule**
3. Branch name pattern: `main`
4. 以下を有効化:
   - ✅ Require a pull request before merging
   - ✅ Require approvals: **0**(自動マージのため)
   - ✅ Require status checks to pass before merging
     - 必須チェック: `Validate ContentAssets`(既存)
   - ✅ Allow auto-merge
   - ❌ Restrict pushes that create files larger than 100 MB
5. **Create**

その後、**workflow に `gh pr merge --auto` を追記**すれば auto-publish ラベル付き PR が CI 通過後に自動マージされます。これは別 PR で対応する方針(本 docs 整備の段階では設定しない)。

## ステップ 5: 動作確認(手動トリガー)

cron 待たずにすぐ試したい場合:

1. https://github.com/kenken0830/ai-note-homepage/actions/workflows/auto-publish-use-case.yml にアクセス
2. **Run workflow** ボタン
3. 入力欄(任意):
   - **slug**: 特定の planned スラッグを指定したい場合(例: `find-routine-automation`)
   - **threshold**: 通過点数(デフォルト 80)
   - **model**: Anthropic モデル ID(デフォルト `claude-sonnet-4-5`)
4. **Run workflow**

数分後に Pull requests タブに自動 PR が現れます。

## 運用フロー(設定完了後)

```
[月・水・金 9:00 JST]
  ↓ 自動起動
[articleBacklog から最高優先度の planned slug を選ぶ]
  ↓
[Anthropic Claude API で payload JSON を生成]
  ↓
[score-use-case-payload.mjs で品質スコア採点]
  ↓
[publish-use-case-detail.mjs で aiUseCases.ts / articleBacklog.ts / updates.ts を編集]
  ↓
[lint / typecheck / build で検証]
  ↓
[ブランチ作成 + コミット + push]
  ↓
[PR 自動作成(スコア・採点詳細を本文に埋め込み)]
  ↓ ⏸ ここで人間判断
[80+ なら auto-publish ラベル、80 未満なら needs-review ラベル]
  ↓ ⏸
[Squash and merge をクリック]
  ↓
[Vercel 再デプロイで公開]
```

## 一時停止 / 無効化

### 月単位で止めたい場合(API 費を抑える等)

ワークフロー画面で:
1. https://github.com/kenken0830/ai-note-homepage/actions/workflows/auto-publish-use-case.yml
2. 右上 **「⋯」** → **Disable workflow**
3. 必要なときに同じ場所で **Enable workflow**

### 完全に削除したい場合

`.github/workflows/auto-publish-use-case.yml` を削除する PR を作成。

## トラブルシューティング

### workflow が `ANTHROPIC_API_KEY is not set` で失敗

- ステップ 2 を完了していない
- リポジトリレベルではなくユーザーレベルの Secret になっている → Repository secrets に登録し直す

### API 呼び出しは成功するが payload validation で fail

- Claude が JSON を出力する前に解説文を付けたか、コードフェンスで囲った
- スクリプト内の `extractJsonFromText` がほとんどのケースを処理するが、想定外のレスポンスは fail
- 手動 trigger で別の slug / モデルで再試行

### スコアが常に 80 未満になる

- プロンプトの不足。`scripts/auto-publish-use-case.mjs` の `buildPrompt` に追加コンテキストを足す
- 既存の高品質ページ(make-prompt-template 等)を exemplar として埋め込む拡張を検討

### planned slug が無くなった

- `src/data/aiUseCases.ts` の status: planned エントリがゼロ
- 運用上、新しいテーマを articleBacklog に追加 → aiUseCases.ts に planned エントリを追加(別 PR / 別 workflow で対応可能)

## 安全境界(変更しない)

このワークフローは以下を**絶対に**変更しません:

- `note_monetization_*.py` / `note_create_paid_*.py` / `note_publish_paid_*.py` / `note_create_free_manga_link_*.py`
- `reports/publish_runs/`
- `ui-automation-hub/`
- `note_links.json`
- `editor.note.com` URL の取り扱い
- 認証情報(Cookie / token / session / api_key 等)

`Restrict touched files` ステップで、`src/data/{aiUseCases,articleBacklog,updates}.ts` 以外の変更が検出されると workflow が FAIL します。

## 関連ドキュメント

- `docs/article-quality-score.md` — 100 点満点ルーブリック
- `docs/content-quality-checklist.md` — 公開前チェック
- `docs/features/homepage-content-ecosystem.md` — エコシステム全体仕様
- `docs/homepage-handoff-automation.md` — note 連携 handoff 自動化
