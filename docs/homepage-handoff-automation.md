# homepage_handoff 自動取り込み

note自動投稿プロジェクトが公開済みnoteを生成したあと、AI Compass Journalホームページ側で自動的に取り込みPRを作る仕組みです。

## 目的

- noteは別プロジェクトの実験ログ、HPは再現できる手順・プロンプト・テンプレートとして住み分ける
- 公開済みnoteのURL・タイトル・要約・タグ・HP化候補情報だけを受け取り、ホームページ側ではnote投稿・公開・下書き編集・収益化操作を一切行わない
- 取り込み作業の手作業を減らし、PR作成までを自動化する

## 構成

| ファイル | 役割 |
| --- | --- |
| `scripts/validate-homepage-handoff.mjs` | handoff JSONの形式・安全チェック(`note_url`正規表現、`editor.note.com`拒否、本文混入検出、認証情報キー検出、404確認) |
| `scripts/apply-homepage-handoff.mjs` | 検証済みJSONから `src/data/{notePosts,articleBacklog,updates}.ts` を更新(冪等、重複id検出、未公開slugの場合 `relatedUseCaseSlug` を未設定に) |
| `.github/workflows/intake-homepage-handoff.yml` | `repository_dispatch[homepage_handoff]` または `workflow_dispatch` をトリガに、validate→apply→lint/typecheck/build→ブランチ作成→PR作成までを実行 |

## トリガ

### note自動投稿プロジェクト側から

```bash
curl -sS -X POST \
  -H "Authorization: Bearer $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github+json" \
  https://api.github.com/repos/kenken0830/ai-note-homepage/dispatches \
  -d @- <<'JSON'
{
  "event_type": "homepage_handoff",
  "client_payload": {
    "title": "...",
    "note_url": "https://note.com/<user>/n/<id>",
    "published_at": "2026-05-02T15:23:04+09:00",
    "summary": "...",
    "tags": ["..."],
    "research_theme": "...",
    "note_angle": "...",
    "homepage_angle": "...",
    "homepage_candidate": true,
    "priority": "high",
    "suggested_use_case_slug": "build-ai-agent-skill-file",
    "suggested_category": "作る",
    "related_homepage_paths": ["/ai-use-cases/make-prompt-template", "/prompts", "/workflows", "/free"]
  }
}
JSON
```

`client_payload` は `homepage_handoff` schema に従う必要があります。違反すると validate ステップで FAIL し、PR は作られません。

### 手動テスト

GitHub Actions UI から `Intake homepage_handoff` を選び、`handoff_json` 入力にペイロードを貼り付けて Run。

## ワークフローの流れ

1. main を checkout
2. `npm ci`(必要なら native binding は GitHub-hosted Linux ランナーが自動解決)
3. ペイロードを `artifacts/homepage_handoff/handoff.json` に保存
4. `validate-homepage-handoff.mjs --check-url` で JSON とURL生存確認
5. `apply-homepage-handoff.mjs` で 3 ファイル更新(冪等)
6. 変更されたファイルが `src/data/{notePosts,articleBacklog,updates}.ts` のみであることを検証
7. `next-env.d.ts` の生成差分を除外
8. 差分があれば `npm run lint` / `npm run typecheck` / `npm run build`
9. ブランチ `automation/homepage-handoff-<YYYY-MM-DD>-<slug>` を作成
10. コミット + push
11. `gh pr create` でPRを開く

差分が出ない場合(冪等スキップ)はコミットもPR作成も行いません。

## 一時ファイルの保存先

workflow 内部で扱う handoff payload と apply サマリは、リポジトリ作業ツリーには一切作らず、GitHub Actions の一時ディレクトリ `$RUNNER_TEMP/homepage_handoff/` 配下に保存します。

- `$RUNNER_TEMP/homepage_handoff/handoff.json`: 受け取った payload
- `$RUNNER_TEMP/homepage_handoff/apply-summary.json`: apply スクリプトの JSON 結果

これにより `Restrict touched files` ステップが想定外パス変更として誤検知することを防ぎます。リポジトリ直下の `artifacts/` や `apply-summary.json` には書き込みません。

## 自動化される範囲(Phase 1)

- handoff JSON の検証
- `notePosts.ts` への新規追加(重複idは自動スキップ)
- `articleBacklog.ts` への新規追加(重複id/suggestedSlugは自動スキップ)
- `updates.ts` への取り込み記録の先頭追加
- ブランチ作成 + PR作成

## 自動化しない範囲(別Phase)

- **PRの自動マージ**: 必ず人間がレビューしてからマージします
- **詳細ページ `/ai-use-cases/[slug]` の自動公開**: 80点品質スコア基準を満たすため、別 PR で人間が編集します
- **未公開slugへのリンク自動修正**: `apply-homepage-handoff.mjs` は未公開slug の場合 `relatedUseCaseSlug` を設定せず、`relatedPages` への誘導のみ行います
- **note 投稿・公開・下書き編集**: ホームページ側からは絶対に行いません

## 必要な GitHub 設定

### Secrets

- `GITHUB_TOKEN`(自動付与): PR作成・push・gh CLI 用。追加設定不要
- 別リポジトリ(note自動投稿側)から `repository_dispatch` を叩く場合は、note側に **personal access token (PAT)** を設定してください
  - スコープ: `repo`(プライベート)または `public_repo`(パブリック)
  - 推奨: fine-grained PAT を `kenken0830/ai-note-homepage` に限定
  - note側の Secrets 名は任意(例: `HP_DISPATCH_TOKEN`)

### Branch protection

- `main` ブランチに「PR必須 + マージ前にレビュー必須」を設定すると、自動PRが直接マージされず、必ず人間チェックが入ります
- `automation/*` ブランチには制約なし(自動化用なので任意に作成・削除可)

### Workflow permissions

`.github/workflows/intake-homepage-handoff.yml` 自体に以下を宣言済み:

```yaml
permissions:
  contents: write
  pull-requests: write
```

リポジトリ Settings → Actions → General → Workflow permissions が "Read and write permissions" になっていることも確認してください。

## 運用手順

### 平常時

1. note 自動投稿プロジェクトが公開済みnoteを生成
2. note 側スクリプトが `homepage_handoff` JSON を作り、`repository_dispatch` で送信
3. このワークフローが起動し、自動PRが作られる
4. 人間が PR をレビュー
5. P1がなければマージ

### 失敗時

- validate FAIL: handoff JSON の形式を見直す。`editor.note.com` URL や本文丸ごと、認証情報を入れていないか確認
- apply FAIL: anchor not found エラーが出た場合、`src/data/notePosts.ts` などの形式が崩れていないか確認
- 「unexpected path changed」: 想定外のファイル変更を検知。スクリプトが意図しない箇所を編集していないか調査
- lint/typecheck/build FAIL: 自動生成された TypeScript の構文が合っていない可能性。エラー内容を読み、scripts/apply-homepage-handoff.mjs の出力を修正

### 手動取り込みへのフォールバック

ワークフローが失敗した場合は、`scripts/validate-homepage-handoff.mjs` と `scripts/apply-homepage-handoff.mjs` をローカルで実行して PR を作っても構いません。

```bash
node scripts/validate-homepage-handoff.mjs path/to/handoff.json --check-url
node scripts/apply-homepage-handoff.mjs path/to/handoff.json --dry-run
node scripts/apply-homepage-handoff.mjs path/to/handoff.json
git checkout -b automation/homepage-handoff-$(date -u +%Y-%m-%d)-<slug>
git add src/data/notePosts.ts src/data/articleBacklog.ts src/data/updates.ts
git commit -m "chore(library): intake homepage_handoff <slug>"
git push -u origin HEAD
gh pr create
```

## 拡張案: 共通 content_handoff(Phase 2)

note 以外のコンテンツ(漫画・動画・テンプレ・無料キット・商品・ワークフロー・プロンプト)にも自動取り込みを広げる拡張案です。詳細な仕様は [`docs/features/homepage-content-ecosystem.md`](features/homepage-content-ecosystem.md) を参照してください。

### Phase 2 採用方針

- 個別の `manga_handoff` / `video_handoff` / `template_handoff` を作らず、**共通の `content_handoff` JSON** に統合する
- 既存の `homepage_handoff`(note 専用)は **note サブセットの互換モード** として残し、後方互換を破らない
- 取り込み対象は `src/data/notePosts.ts` から `src/data/contentAssets.ts`(将来追加)へ拡張する

### content_handoff JSON スキーマ案

```json
{
  "type": "note | manga | video | template | kit | product | workflow | prompt",
  "topic_slug": "build-ai-agent-skill-file",
  "title": "...",
  "description": "短い要約。本文全文は不可。",
  "url": "https://...",
  "status": "published | planned | draft",
  "source": "note | youtube | booth | site | ...",
  "published_at": "2026-05-XXTHH:MM:SS+09:00",
  "tags": ["..."],
  "related_use_case_slug": "build-ai-agent-skill-file",
  "priority": "high | medium | low"
}
```

追加バリデーション(`type` ごと):

| `type` | 追加チェック |
| --- | --- |
| `note` | `note_url` 形式、`editor.note.com` 拒否(既存 homepage_handoff のルールを継承) |
| `manga` / `video` | `status: "published"` のときだけ外部 URL 必須、`status: "planned"` は URL なしを許可 |
| `template` / `kit` | URL は `/free/...` などの内部パス、または公開済み外部配布 URL のみ |
| `product` / `prompt` / `workflow` | `status: "planned"` は非リンク表示前提、URL 形式は緩め |

### 移行ロードマップ

1. **Phase 2.A(静的データ運用)**: `contentAssets.ts` に手動で 3〜5 テーマ分を追加し、`/library` と `/ai-use-cases/[slug]` の表示拡張を運用する
2. **Phase 2.B(自動化)**: 5 テーマ運用 or 30 日経過(早い方)で `content_handoff` workflow を追加。`scripts/validate-content-handoff.mjs` / `scripts/apply-content-handoff.mjs` を新設
3. **既存 homepage_handoff**: 互換維持のため当面残す。将来 `content_handoff` に内部移譲する形でフェードアウト判断

### 受け取らないデータ(Phase 2 でも継続)

- `editor.note.com` URL や下書き URL
- note 本文全文(`description` は短い要約のみ)
- API キー / Cookie / token / session / authorization / password / secret
- 漫画原稿・動画ファイル・画像ファイルそのもの(URL 参照のみ)

### 自動マージ(Phase 3)の検討範囲

Phase 3 で**条件付き自動マージ**を検討する際の境界:

| 条件 | 自動マージ可否 |
| --- | --- |
| `status: "planned"` で URL 無し | ✅ 候補(変更が小さい) |
| 既存 ContentAsset の `description` 200字以内変更 | ✅ 候補 |
| 初回 `published`(外部 URL 含む) | ❌ 人間レビュー必須 |
| `type: "product"` のエントリ追加・更新 | ❌ 人間レビュー必須 |
| `editor.note.com` を含む変更 | ❌ そもそも validate で reject |

## 安全境界

このワークフロー・スクリプトは以下に**絶対に**触れません:

- `note_monetization_*.py` / `note_create_paid_*.py` / `note_publish_paid_*.py` / `note_create_free_manga_link_*.py`
- `reports/publish_runs/`
- `ui-automation-hub/`
- `note_links.json`
- note の投稿・公開・下書き編集・収益化操作
- `editor.note.com` URL の取り扱い
- API キー / Cookie / token / session / authorization / password / secret

`apply` ステップ後の「Restrict touched files」ステップで、想定外パスの変更が検出されると自動的に FAIL します。
