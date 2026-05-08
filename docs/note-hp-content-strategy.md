# note と HP のコンテンツ戦略(住み分けと連携)

AI Compass Journal は note の保管庫ではなく、AI でやりたいことから**最適な手順・プロンプト・note・漫画・動画・テンプレ・商品に辿り着けるホームベース**です。
note と HP は競合させず、それぞれの強みで読者を支える 4 層構造で運用します。

このドキュメントは:
- 何を note に書くか / 何を HP に書くか
- 連携で済む部分 / 別運用が必要な部分
- 知見の蓄積から HP の保存版へ昇格させる「5 回ルール」

を定義します。新しいコンテンツを作る前に必ず参照してください。

## 4 層構造

```
[層 1] note ── 発信源(毎日 3 種類)
  ├ 有料 note: 深い体験、独自データ、判断基準(課金価値)
  ├ 無料 note: 入口、関心喚起、試した最新ログ
  └ 漫画:      入口、感情で掴む、初心者向け

         ↓ homepage_handoff(自動)

[層 2] HP /library ── 横断ハブ
  └ note 全種類 + ContentAsset(漫画/動画/テンプレ)を
    トピック単位で発見できる

         ↓ 5 回ルールで昇格

[層 3] HP /ai-use-cases ── 完成版手順(保存版)
  └ 80 点品質基準を満たす、再現できる教科書

         ↓ 蓄積でパッケージ化

[層 4] HP /products ── 有料商品の販売面
  └ 有料 note のまとめ売り、Zenn 本、メンバーシップ
```

## それぞれの役割と書き方

### note(有料)

- **読者**: 深い体験 / 判断基準を知りたくて課金する人
- **鮮度**: 高い、毎日更新
- **内容**:
  - 「今日 N 件試した結果、〇〇が判断軸として効いた」
  - 「△△を 2 週間続けたデータ(成功率 / 失敗パターン)」
  - 「□□を選ぶときに私が見ている 5 つの観点」
- **書いてはいけない**: 一般論、ツール紹介、ニュース要約(無料 note や HP で扱う)

### note(無料)

- **読者**: 興味を持ち始めた人、有料に進む前の橋渡し
- **鮮度**: 高い、毎日更新
- **内容**:
  - 今日試したこと、観察、失敗ログ
  - 有料 note への導線(冒頭または末尾)
  - 「続きと判断基準は有料で」
- **書いてはいけない**: 有料 note の核心(価値が下がる)

### note(漫画)

- **読者**: 文字を読まない層、初心者、関心の入口
- **鮮度**: 低くてよい(漫画は再利用される資産)
- **内容**:
  - 1 ページで掴む導入
  - 「〇〇って何?」に対する感情的な共感 + 簡単な答え
  - HP の `/ai-use-cases/[slug]` への導線
- **書いてはいけない**: 詳細手順(漫画の長所が消える)

### HP /library

- **読者**: 「やりたいこと」から探す人
- **鮮度**: 中(note 公開のたびに自動更新)
- **内容**:
  - 媒体に関係なく、テーマ単位で note・漫画・動画・テンプレ・商品をカード表示
  - `homepage_handoff` で自動取り込み(層 1 → 層 2)
  - 準備中の planned アセットも非リンクで表示
- **書いてはいけない**: note 本文の丸ごと転載(600 字 summary のみ)

### HP /ai-use-cases(個別ユースケース詳細)

- **読者**: 「やりたいこと」が決まっていて、再現できる手順を求める人
- **鮮度**: 低い(保存版、滅多に更新しない)
- **内容**:
  - 80 点品質基準(`docs/article-quality-score.md`)を満たす完成版手順
  - target / scene / preparation / prompt / inputExample / outputExample / improvementPrompt / steps / checkPoints / commonMistakes / noteAngle / relatedPages
  - 関連コンテンツ欄(層 2 と相互リンク)
- **書いてはいけない**:
  - note 本文の丸ごと転載
  - 未確認の数値・統計・実績
  - 1 度しか試していないテーマ(まず note で 5 回試す)

### HP /products(将来運用)

- **読者**: 有料コンテンツに価値を感じて課金する人
- **鮮度**: 中(月単位で追加)
- **内容**:
  - 有料 note のカテゴリ別パッケージ(BOOTH / Zenn 本)
  - メンバーシップ・有料コミュニティ
  - 個別相談(`/consulting`)
- **書いてはいけない**: 単発購入で十分なものをパッケージ化(価値水増し)

## 連携で済む部分 / HP 側で別運用が必要な部分

| HP の機能 | note 自動連携で十分か |
| --- | --- |
| /library のカード自動追加 | ✅ 十分(`homepage_handoff` 既に実装済み) |
| 関連 note の `/ai-use-cases/[slug]` 紐付け | ✅ 十分(ContentAsset で実装済み) |
| 漫画・動画の取り込み | ✅ 十分(`content_handoff` で実装済み) |
| **`/ai-use-cases` の完成版手順公開** | ❌ **5 回ルール + 80 点品質編集が必要** |
| **`/products` の有料商品** | ❌ **手動で運用、別ページ作成** |
| **About / 運営者プロフィール** | ❌ **連携と無関係、手書き** |
| **独自実験データ集約** | ❌ **note 本文外で蓄積する仕組みが必要** |
| **英語版** | ❌ **連携と無関係、翻訳工程が必要** |

## 5 回ルール(知見蓄積 → 保存版昇格)

同じテーマで note を **5 本以上**書いて初めて、HP の `/ai-use-cases/[slug]` に完成版として昇格を検討します。

理由:
- 1 〜 2 回ではテーマが狭く、再現性が確認できていない
- 5 回試すと「効いた書き方 / 効かなかった書き方」が見える
- 80 点品質を安定して書けるのは、**実体験が複数回ある**ときだけ

運用:

1. 各テーマには `topicSlug`(例: `make-prompt-template`)を割り当てる
2. 関連 note は ContentAsset として `topicSlug` 紐付けで追加(`homepage_handoff` 自動)
3. ContentAsset の `type=note, status=published` の同 `topicSlug` 数が 5 件に達したら、`articleBacklog` の該当エントリに人間判断で「knowledge-rich」フラグを付ける(将来 ContentAsset から自動カウント可能)
4. 自動公開ワークフロー(`auto-publish-use-case.yml`)は knowledge-rich を優先選定
5. Claude が 5 本の note の知見を統合して 80 点品質の payload を生成
6. PR 自動作成 → 人間がマージ

これにより、note の継続発信が **HP の保存版**へ自然に変換される循環ができます。

## 安全境界(変えてはいけないルール)

- **HP 側から note 投稿・公開・下書き編集をしない**(`docs/note-homepage-integration.md` 参照)
- **有料 note の本文を HP に転載しない**(課金価値を守る)
- **note summary は 600 字以内**(`homepage_handoff` schema で機構的に強制)
- **`editor.note.com` URL を含むコンテンツは reject**(validate スクリプトで自動検出)
- **未確認情報を断定しない**(品質スコア 8 番目のチェック項目)
- **`note_monetization_*` / `reports/publish_runs/` / `ui-automation-hub/` / `note_links.json` には触れない**

## 関連ドキュメント

- [`docs/note-homepage-integration.md`](note-homepage-integration.md) — 連携の安全方針
- [`docs/homepage-handoff-automation.md`](homepage-handoff-automation.md) — 自動取り込みの仕組み
- [`docs/auto-publish-setup.md`](auto-publish-setup.md) — 完全自動公開の運用
- [`docs/article-quality-score.md`](article-quality-score.md) — 80 点品質基準
- [`docs/content-quality-checklist.md`](content-quality-checklist.md) — 公開前チェック
- [`docs/features/homepage-content-ecosystem.md`](features/homepage-content-ecosystem.md) — エコシステム全体仕様

## 改訂履歴

- 2026-05-09: 初版(note 3 種 + HP 4 層 + 5 回ルール + 連携 / 別運用の仕分け)
