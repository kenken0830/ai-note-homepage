# Feature Spec: Homepage Content Ecosystem

ステータス: Draft / 実装前
作成日: 2026-05-05
このドキュメントは仕様書のみで、実装は別タスクで行います。

## 1. 背景

### 1-1. AI Compass Journal の現在の役割

AI Compass Journal は「やりたいことから探す、AI活用の実践辞典」を中心テーマとする本店・導線ハブです。Next.js App Router + TypeScript + Tailwind の静的サイトとして運用しており、以下を束ねる役割を持ちます。

- `/ai-use-cases`: やりたいこと別の AI 活用ユースケース(完成版手順)
- `/library`: note / Zenn / Medium / 自サイト記事の横断ライブラリ
- `/free` / `/prompts` / `/workflows` / `/guides`: 入口・道具・実践導線・完全ガイド
- `/products` / `/newsletter` / `/community` / `/consulting`: 商品とリレーションシップ導線

note は別プロジェクトの「毎日の調査・実験ログ」、ホームページは「再現できる完成版の手順・プロンプト・テンプレート」として住み分けています。

### 1-2. note自動投稿プロジェクトとの連携状況

PR #21〜#25 を通じて、以下のフローが既に通っています。

1. note自動投稿プロジェクトが公開済みnoteを生成
2. `homepage_handoff` JSON(公開済み URL・タイトル・要約・タグ・HP化候補情報のみ)を出力
3. `repository_dispatch` でホームページリポジトリへ送信
4. `.github/workflows/intake-homepage-handoff.yml` が validate → apply → lint/typecheck/build → 自動 PR 作成
5. 人間がレビューしてマージ
6. 詳細ページ化(`/ai-use-cases/[slug]`)は別 PR で 80 点品質を満たしてから公開

ホームページ側は note を投稿・公開・下書き編集しません。`editor.note.com` URL や本文全文、認証情報は受け取らず、validate スクリプトで弾きます。

### 1-3. noteだけではなく、漫画・動画・テンプレ・商品が増えてきた背景

実運用で次の課題が見えています。

- 同じテーマ(例: 「AIエージェントにスキルファイルを渡す」)に、note 実験ログ・HP 詳細手順・漫画版・動画デモ・テンプレート・有料商品候補が並列に存在しはじめている
- 現状の `notePosts` は note 専用、`articles` は外部記事専用、`products` は商品専用、と型ごとに別ファイルで持っており、テーマ横断の体験を作れていない
- `/library` は記事のみ、`/ai-use-cases/[slug]` は手順のみで、関連する漫画・動画・テンプレへの導線が弱い

### 1-4. 今の /library と /ai-use-cases の位置づけ

- `/library`: 媒体ではなく目的から記事を探すハブ。`articles` と `notePosts` を表示。`notePosts` は HP化候補バッジ + 関連ページ導線を持つ
- `/ai-use-cases`: やりたいこと別カテゴリの一覧と、`/ai-use-cases/[slug]` 詳細(完成版手順)。詳細ページは `description / target / scene / preparation / prompt / inputExample / outputExample / improvementPrompt / steps / checkPoints / commonMistakes / noteAngle / relatedPages` を持つ

両ページとも note/記事と詳細手順は載せられても、漫画・動画・テンプレ・商品をテーマ横断で並べる仕組みは持っていません。

---

## 2. 最終ゴール

> **AI Compass Journal は、noteの保管庫ではなく、AIでやりたいことから、最適な手順・プロンプト・note・漫画・動画・テンプレ・商品に辿り着けるホームベースである。**

ユーザーが「AIで何をしたいか」から入り、関連するすべてのコンテンツ(手順・プロンプト・note 実験ログ・漫画・動画・テンプレート・無料キット・商品・ワークフロー)に迷わず辿り着ける状態を最終ゴールとします。

「note を集める」ことは手段であって目的ではありません。テーマを起点に、ユーザーの理解段階(感情で掴む → 実演で理解する → 手順で再現する → 道具で繰り返す → 商品で深掘る)を最短距離で進められる導線を作ります。

---

## 3. コンテンツ別の役割

| 種別 | 役割 | 特徴 |
| --- | --- | --- |
| **note** | 実験ログ・調査ログ・気づき・失敗・反応を見る場所 | 鮮度重視、毎日更新、一次情報、未確定でもよい |
| **漫画** | 初心者向けの入口、感情で掴む導入 | 1ページで読み切れる、専門用語を最小化、テーマへの関心を起こす |
| **動画** | 実演、手順確認、使い方デモ | 実画面で操作を確認できる、文章では伝わらない動きを補う |
| **テンプレート** | すぐ使える道具 | コピー & 差し替えで即活用、Markdown / Notion / Excel など |
| **無料キット** | 初回導入と回遊の入口 | `/free` 配下で配布、メルマガ/コミュニティへの導線兼用 |
| **商品** | 深掘り、有料テンプレ、販売導線 | BOOTH / Zenn 本 / メンバーシップ、正式販売前は準備中表示 |
| **ワークフロー** | 複数ステップの実践導線 | 「メモ → AI → 確認 → 公開」のような連鎖を表現 |
| **プロンプト** | コピペ可能な実行単位 | 1プロンプト = 1ジョブ、`/prompts` 集約 |
| **/ai-use-cases** | 完成版の再現手順 | 80点品質基準を満たした保存版、テーマの中心 |
| **/library** | 目的別に外部・内部コンテンツを横断する場所 | 媒体に縛られず「やりたいこと」から探す導線 |

各種別は **テーマ(`topicSlug`)** で結びつきます(後述)。

---

## 4. 非ゴール

このフィーチャーで**やらないこと**を明文化します。

- ホームページ側からnote投稿しない
- ホームページ側からnote公開しない
- ホームページ側からnote下書き編集しない
- ホームページ側から漫画生成・動画投稿・外部サービスへの公開を実行しない
- note本文を丸ごと転載しない(handoff JSON の summary 600字制約を踏襲)
- 未公開・準備中コンテンツを本物リンクのように見せない
- 自動マージを最初から行わない(Phase 1 は人間レビュー必須)
- 動画ファイル・画像ファイル・漫画原稿そのものをホームページリポジトリに保管しない(URL 参照のみ)
- 認証情報(Cookie / token / session / api_key / authorization / password / secret)を扱わない

note 投稿系の禁止対象(`note_monetization_*` / `note_create_paid_*` / `note_publish_paid_*` / `note_create_free_manga_link_*` / `reports/publish_runs/` / `ui-automation-hub/` / `note_links.json`)は引き続きホームページ側からは触りません。

---

## 5. ContentAsset 構想

将来追加する **`ContentAsset` 型**の案です。実装は別タスク。

### 5-1. 想定フィールド

```ts
export type ContentAssetType =
  | "note"
  | "manga"
  | "video"
  | "template"
  | "kit"
  | "product"
  | "workflow"
  | "prompt";

export type ContentAssetStatus = "published" | "planned" | "draft";

export type ContentAsset = {
  id: string;                       // 一意ID。例: "manga_2026-05-10_skill-file-intro"
  topicSlug: string;                // テーマslug。例: "build-ai-agent-skill-file"
  type: ContentAssetType;
  title: string;
  description: string;              // 短い説明(HP掲載用、note本文の転載ではない)
  url?: string;                     // published のときだけ必須。それ以外は省略
  status: ContentAssetStatus;
  source: string;                   // "note" | "youtube" | "booth" | "site" 等の出処
  publishedAt?: string;             // ISO date。planned/draft では省略可
  tags: string[];
  relatedUseCaseSlug?: string;      // /ai-use-cases/[slug] と紐づくとき
  priority: "high" | "medium" | "low";
};
```

### 5-2. ルール

- `status: "published"` のときだけ `url` を**必須**にする
- `status: "planned"` / `"draft"` の場合は **リンク化しない**(カードに「準備中」バッジを出して非リンク表示)
- `editor.note.com` URL や下書き URL を扱わない(validate で拒否)
- ホームページ側から外部サービスへの投稿・公開はしない(URL は外部成果物への一方向参照のみ)
- あくまで「公開済み情報」または「予定情報」をホームページ側で**整理**する役割

### 5-3. 既存型との関係

- 既存 `NotePost` は **特化サブセット**として残す(現運用と互換維持)。新型 `ContentAsset` を新設し、徐々に移行する案
- もしくは `ContentAsset` を最初から `NotePost` を内包する形で設計し、`/library` 表示時にどちらでも扱えるようにする
- どちらを採用するかは Open Questions に記載

---

## 6. topicSlug の考え方

**1つのテーマに複数のコンテンツを紐づける**ためのキーが `topicSlug` です。`topicSlug` は `/ai-use-cases/[slug]` の slug と原則一致させます。

### 6-1. 例

```
topicSlug = build-ai-agent-skill-file

紐づく ContentAsset:
- type=note     : note実験ログ(公開済み URL)
- type=note     : 続編・反応まとめ(planned)
- type=workflow : /workflows 内の関連ワークフロー(/ への内部リンク)
- type=prompt   : /prompts 内の関連プロンプト
- type=manga    : 漫画版(planned、まだ url なし)
- type=video    : 動画デモ(published、YouTube URL)
- type=template : テンプレート Markdown(/free 配下に配布、url=/free/...)
- type=kit      : 無料スターターキット(/free)
- type=product  : 有料 Zenn 本(planned、外部 URL 未確定)
```

### 6-2. ルール

- `topicSlug` は kebab-case
- 1つの `topicSlug` に複数の `type` が紐づいてよい
- 同じ `type` でも複数件あってよい(続編 note、複数の動画など)
- `relatedUseCaseSlug` は通常 `topicSlug` と一致するが、別 use case と関連させたい場合のみ別値を入れる
- `topicSlug` が `/ai-use-cases/[slug]` 詳細ページの slug と一致しない場合、詳細ページからは「関連コンテンツ」として参照されない(整合性は実装時に検証スクリプトで担保)

---

## 7. ページ別の変更方針

実装は別タスク。本仕様書では方針のみ整理します。

### 7-1. /library

- noteだけでなく、漫画・動画・テンプレ・キット・商品・ワークフロー・プロンプトも扱えるようにする
- `type` バッジを表示(note / 漫画 / 動画 / テンプレ / キット / 商品 / ワークフロー / プロンプト)
- `status: "planned" | "draft"` は**非リンク表示**(カードは出すがクリックできない)
- 公開済み外部 URL だけ `ExternalLink`(UTM 付き)で外部リンク化
- 公開済み内部パス(`/free/...` など)は `Link` で内部リンク
- 既存 `notePosts` 表示は壊さず、`ContentAsset` 用セクションを追加するか、両者を統合表示するかは Open Questions

### 7-2. /ai-use-cases/[slug]

- そのテーマに紐づく `ContentAsset[]`(`topicSlug === slug` でフィルタ)を表示する
- 関連 note・漫画・動画・テンプレ・ワークフロー・プロンプトを type ごとにグループ化して表示
- `status: "planned"` のものは「準備中」バッジで非リンク表示し、ユーザーに今後の展開を伝える
- 既存セクション(How to Use / Prompt / 入力例・出力例 / 確認ポイント・よくある失敗 / noteで書くなら / 関連ページ)は維持
- 関連コンテンツ欄は最後の関連ページ欄の前に追加することを想定

### 7-3. /updates

- 追加・公開・連携の記録を残す(現運用と同様)
- `ContentAsset` を追加・公開した際にも `updates.ts` にエントリを足す
- カテゴリは「連携」「辞典」だけでなく「漫画」「動画」「テンプレ」などのトピック別を許可

---

## 8. 自動化方針

### Phase 1(完了)

- note自動投稿 → `homepage_handoff` JSON → ホームページ側自動 PR 作成
- 該当ファイル: `.github/workflows/intake-homepage-handoff.yml` / `scripts/validate-homepage-handoff.mjs` / `scripts/apply-homepage-handoff.mjs`
- 自動マージは行わない、人間レビュー必須

### Phase 2(本仕様後の実装候補)

- note 以外の `content_handoff` を検討
- `manga_handoff` / `video_handoff` / `template_handoff` のように type ごとに分けるのではなく、**共通の `content_handoff` JSON** へ拡張する案
  - `type` フィールドを必須化し、type ごとの追加検証を validate で行う
  - 既存 `homepage_handoff` は note 専用の互換モードとして残す or 新スキーマに吸収する
- 受け側は `notePosts` だけでなく `contentAssets` にも書き込めるよう apply スクリプトを拡張

### Phase 3

- 安全な取り込み PR だけ条件付き自動マージを検討
- 条件案: `status: "planned"` で `url` なし、外部リンクなし、テキスト変更が `summary` 200字以内 等の極小変更
- 条件は branch protection の auto-merge ルールと組み合わせる
- 高リスク(初回 published、外部 URL 含む、商品関連)は引き続き人間レビュー

### Phase 4

- `articleBacklog` から `/ai-use-cases/[slug]` 詳細ページ化 PR を自動作成
- 80 点品質スコアの自動判定は人間レビューに残し、PR 作成までを自動化
- 詳細ページの自動マージは最初は行わない

各 Phase は独立して進められ、Phase N の完了を Phase N+1 の前提にしません。

---

## 9. 受け入れ条件

このフィーチャー(全タスク完了)の合格基準。

- `ContentAsset` 型が `src/types/content.ts` に定義されている
- `src/data/contentAssets.ts` が存在し、最低 1 件の `ContentAsset` を持つ
- `/library` が `note` 以外の `type` も扱える
- `/ai-use-cases/[slug]` に「関連コンテンツ」欄がある
- `build-ai-agent-skill-file` テーマに、現存の note 実験ログが `ContentAsset` として表示される
- `status: "planned"` の漫画・動画は非リンクで表示される
- note投稿・公開・下書き編集に触っていない
- `editor.note.com` URL を含むエントリが `contentAssets` に存在しない
- `npm run lint` / `npm run typecheck` / `npm run build` が通る
- 既存 `notePosts` / `/library` 表示が壊れていない
- sitemap に副作用がない(`publishedAiUseCases` 経由の URL リストは変更されない)

---

## 10. テスト方針

実装時に最低限満たすべきテスト・検証項目。

### 自動

- `npm run typecheck`: 全ファイルが型エラーゼロ
- `npm run lint`: ESLint エラーゼロ
- `npm run build`: 静的生成成功、新規追加 slug 以外の SSG リストが変わらない
- 既存 `validate-homepage-handoff.mjs` は変更しない(または互換維持)

### 専用バリデーション(新規スクリプト)

- `contentAssets.ts` 全件に対し:
  - `editor.note.com` URL を含むエントリは存在しない
  - `status: "published"` で `url` が空のエントリは検出して fail
  - `status: "planned" | "draft"` で `url` を持つ場合は警告(非リンク表示前提だが事故防止)
  - `topicSlug` が kebab-case 正規表現に従う
  - 認証情報を匂わせるキー名(`cookie` / `token` / `session` / `api_key` 等)が混入していない

### スナップショット / UI

- `/ai-use-cases/[slug]` で `topicSlug === slug` の `ContentAsset` が描画される
- `status: "planned"` のカードがクリックできず、「準備中」バッジを持つ
- 既存 `/library` の note 実験ログ section が描画され続ける
- sitemap.xml に新規 URL が増えていない(URL を持つのは外部リンク前提のため)

---

## 11. 実装タスク分割案

実装は本仕様書とは別タスクで行います。各タスクは独立した PR を想定。

### Task 1: ContentAsset 型と contentAssets.ts を追加

- 目的: 型を入れて、最低 1 件のサンプル(`build-ai-agent-skill-file` 関連の note を ContentAsset として登録)を追加
- 変更予定ファイル: `src/types/content.ts`(`ContentAsset` 型追加)/ `src/data/contentAssets.ts`(新規)
- テスト方針: typecheck / lint / build / 既存 `notePosts` 表示が壊れない
- リスク: 既存 `NotePost` との重複・整合性
- 完了条件: typecheck パス、`/library` 既存表示が変わらない、`contentAssets` 1 件で配列がエクスポートされる

### Task 2: /library を ContentAsset 対応に拡張

- 目的: `ContentAsset` を `type` バッジ付きで描画し、`status: "planned"` を非リンク表示
- 変更予定ファイル: `src/app/library/page.tsx`(セクション追加 or 既存統合)
- テスト方針: typecheck / build / `notePosts` の既存カードが壊れていない / planned カードがクリック不可
- リスク: 既存 `articles` / `notePosts` カードのレイアウト破壊、スマホ表示崩れ
- 完了条件: ContentAsset の note + planned 漫画 + planned 動画が描画される、既存 note カードの導線維持

### Task 3: /ai-use-cases/[slug] に関連コンテンツ欄を追加

- 目的: テーマ詳細ページから関連 ContentAsset を発見できるようにする
- 変更予定ファイル: `src/app/ai-use-cases/[slug]/page.tsx`(関連コンテンツセクション追加)
- テスト方針: build で SSG リスト変わらず / `topicSlug === slug` でフィルタした件数だけ表示 / planned は非リンク
- リスク: 既存セクションのレイアウト変化、関連件数 0 件のときの空表示
- 完了条件: `build-ai-agent-skill-file` で既存 note が関連コンテンツとして表示される

### Task 4: バリデーションスクリプトを追加

- 目的: `contentAssets.ts` を CI で検証し、`editor.note.com` 混入や `published` で url 欠落を検出
- 変更予定ファイル: `scripts/validate-content-assets.mjs`(新規)/ オプションで CI ステップに追加
- テスト方針: 違反データを与えて exit !=0、正常データで exit 0 になる
- リスク: false positive で正当な追加をブロックする
- 完了条件: 全ルールが回帰テストで動く、CI に組み込む or `npm run` スクリプトとして登録

### Task 5: handoff 拡張方針を docs に追記

- 目的: Phase 2 の `content_handoff` 拡張方針を `docs/homepage-handoff-automation.md` に追記
- 変更予定ファイル: `docs/homepage-handoff-automation.md`(章追加)
- テスト方針: docs only、git diff 確認のみ
- リスク: 既存 Phase 1 の運用記述と矛盾する記載になる
- 完了条件: `homepage_handoff` の note 専用互換と `content_handoff` の共通スキーマ案が両方記載される

### Task 6: README / updates を更新

- 目的: 新章 ContentAsset の存在を README とサイト `/updates` に反映
- 変更予定ファイル: `README.md` / `src/data/updates.ts`
- テスト方針: lint / typecheck / build / git diff で他に副作用なし、CRLF を保持
- リスク: README で全行差分(autocrlf)を出してしまう
- 完了条件: CRLF を保持して該当章だけ追記、`/updates` に新エントリが先頭追加

---

## 12. リスクと注意点

| リスク | 影響 | 対策 |
| --- | --- | --- |
| 外部 URL の安全性(404 / 認証要 / NSFW) | ユーザー体験悪化、信頼低下 | validate スクリプトで HTTP HEAD と URL 形式チェック、`editor.note.com` は明示拒否 |
| `planned` を本物リンクに見せるリスク | 誤認・404 ユーザー流入 | `status` に応じて UI 側で `<Link>` を出さず非リンク表示、`url` 欠落でも例外を出さない設計 |
| note と HP の粒度が混ざるリスク | テーマ整理が崩れる | note は `noteAngle`(実験ログ視点)、HP は手順視点で住み分けを継続。`description` には note 本文を入れない |
| 既存 `/library` が複雑になるリスク | レイアウト破綻、スマホ表示が読みにくい | `type` バッジでの最低限のグループ化、タブ分けは Open Questions で人間判断を待つ |
| note 本文転載リスク | 著作権・運用方針違反 | `description` を 600 字以内、validate で本文末尾固有句(`続きをみる`等)を検出 |
| 自動化しすぎて誤公開するリスク | 未確認情報の本番反映 | Phase 3 の自動マージ条件は極小変更に限定、初回 published・外部 URL 含む・商品関連は人間レビュー必須 |
| 商品・有料コンテンツの誤認 | 法務・販売前表現の事故 | `status: "planned"` を厳守、未接続販売ページは外部リンク化しない、`/legal` は引き続き準備中表示 |
| `topicSlug` 不整合 | 関連コンテンツが詳細ページから参照されない | 検証スクリプトで `topicSlug` が `aiUseCases` の slug と整合するかをチェック(警告レベル) |

---

## 13. Open Questions

実装前に**人間が判断すべき**論点。次に ChatGPT Pro 等で詰める前提。

1. **/library の表示形式**: note と漫画と動画を**同列に出す**か、**type タブで分ける**か?
   - 同列: 視覚的にテーマ単位でまとまる / type が混在して読みにくい可能性
   - タブ分け: 探しやすいが、テーマ起点の体験が分断される
2. **ContentAsset の type 名**: 日本語(`動画` / `漫画`)にするか英語(`video` / `manga`)にするか?
   - 型は英語リテラル(本仕様書はこれで提案)、UI 表示は日本語、で分離する案が強い
3. **商品・相談導線の表示タイミング**: `/ai-use-cases/[slug]` の関連コンテンツ欄に商品(`type: product`)を最初から出すか、初回は隠すか?
   - 過早に商品を出すと辞典の信頼が下がる懸念
   - 出すなら「準備中」表現や `/products` に誘導する形が必要
4. **planned の漫画・動画の可視性**: 公開予定として表示するか、planned は非表示にするか?
   - 表示すれば期待感が上がるが、過剰約束のリスク
   - 表示する場合の上限件数(例: テーマあたり 2 件まで)を決めるか
5. **content_handoff のタイミング**: 共通 `content_handoff` をすぐ作るか、まず**静的データで始めて**運用に慣れてから自動化するか?
   - 推奨は後者(まず手動で `contentAssets.ts` を育て、Phase 2 で自動化)
6. **既存 NotePost の扱い**: `ContentAsset` に統合するか、`NotePost` をそのまま残し `ContentAsset` から参照するか?
   - 統合: シンプル / 移行コスト
   - 並存: 互換性が高い / 二重管理
7. **`topicSlug` と `/ai-use-cases/[slug]` slug の一致強制**: 検証で fail にするか、警告に留めるか?
8. **関連コンテンツの並び順**: type 順、`priority` 順、`publishedAt` 降順 のどれを既定にするか?
9. **テーマ名そのもののモデリング**: `topicSlug` だけで十分か、`Topic` 型(タイトル・description・サムネ等)を別途持つか?
10. **`/library` と `/ai-use-cases/[slug]` の責務再定義**: テーマ起点の体験を `/ai-use-cases` に集約するなら `/library` は媒体横断の検索面に特化させる、という分け方を採用するか?
