# 編集エージェント運用

AI Compass Journalを「やりたいことから探す、AI活用の実践辞典」として育てるためのCodex運用です。noteは日々の調査・実験ログ、HPは再現できる手順・プロンプト・テンプレートとして扱います。

## 全体フロー

1. Topic Research Agentが候補を集める
2. Editorial Planner AgentがHP向けテーマへ絞る
3. Article Draft Agentが手順化する
4. Prompt Tester Agentがプロンプトの使いやすさを見る
5. SEO & UX Agentが読みやすさと導線を整える
6. Fact & Safety Agentが断定、未接続サービス、危険表現を確認する
7. Publisher AgentがPR、検証、更新記録を整える

## Topic Research Agent

目的: noteの調査テーマ、読者の困りごと、既存バックログからHP候補を見つける。

入力:
- 今日のnoteテーマ
- `src/data/articleBacklog.ts`
- `/ai-use-cases` の準備中カード
- Search Console導入後の表示回数、CTR、平均掲載順位

出力:
- HP候補1から3件
- `target`、`searchIntent`、`noteAngle`、`homepageAngle`
- 既存ページとの重複確認

判断基準:
- 「AIで何ができるか」ではなく「やりたいことをAIでどう実現するか」になっている
- `/free` `/prompts` `/workflows` `/guides` に接続しやすい
- 1ページで再現できる具体度がある

禁止事項:
- note本文の丸ごと転載
- AIニュース、ツール比較、未確認ランキングへの寄せすぎ
- 外部サービス未接続なのに稼働中に見せる表現

Codexプロンプト例:

```text
@codex

今日のnoteテーマと src/data/articleBacklog.ts を確認し、HP向け候補を1件追加してください。
候補は「やりたいことをAIでどう実現するか」に寄せ、noteAngleとhomepageAngleを分けてください。
既存候補と重複しないか確認し、PRで提案してください。
```

## Editorial Planner Agent

目的: 候補を公開順に並べ、薄い記事を増やさないように編集判断する。

入力:
- articleBacklog
- 既存のpublishedユースケース
- `docs/article-quality-score.md`
- `/updates`

出力:
- 今週公開する候補
- 公開しない候補と理由
- 強化すべき既存ページ

判断基準:
- 80点以上にできる見込みがある
- 読者の作業が1つに絞れている
- 内部リンクでサイト内回遊が作れる

禁止事項:
- 優先度だけで公開する
- 準備不足の候補を詳細ページにする
- 同じテーマを名前だけ変えて増やす

Codexプロンプト例:

```text
@codex

articleBacklogと公開済みユースケースを確認し、今週公開すべき候補を3件まで選んでください。
80点未満になりそうな候補は公開対象から外し、理由をPR本文に書いてください。
```

## Article Draft Agent

目的: 選んだ候補をHP向けの完成版手順にする。

入力:
- 選定済みテーマ
- `src/data/aiUseCases.ts`
- `docs/content-quality-checklist.md`
- `docs/article-quality-score.md`

出力:
- publishedユースケース
- 手順、プロンプト、入力例、出力例、確認ポイント、失敗例、改善プロンプト
- `/updates` への記録

判断基準:
- 読者がそのまま試せる
- AIへの入力前に準備するものが分かる
- 出力後に人間が確認する点が明確

禁止事項:
- 抽象論だけで終える
- AI出力を正解として扱う
- 架空の統計、効果、実績を断定する

Codexプロンプト例:

```text
@codex

articleBacklogから1件選び、/ai-use-cases/[slug] の詳細として公開してください。
必ず手順、コピペ用プロンプト、入力例、出力例、確認ポイント、よくある失敗、改善プロンプト、/freeへのCTAを入れてください。
```

## Prompt Tester Agent

目的: コピペ用プロンプトが実際に使える粒度か確認する。

入力:
- 新規または既存ユースケース
- prompt、inputExample、outputExample、improvementPrompt

出力:
- プロンプトの修正案
- 入力例と出力例の改善案
- 変数、条件、確認ポイントの不足指摘

判断基準:
- 何を貼ればよいか分かる
- AIに推測させてはいけない情報が明記されている
- 出力形式が具体的

禁止事項:
- 万能プロンプトのように見せる
- 機密情報や個人情報の入力を促す
- 確認すべき事実をAIに埋めさせる

Codexプロンプト例:

```text
@codex review

このユースケースのprompt、inputExample、outputExample、improvementPromptを確認してください。
読者がそのまま使えるか、AIに推測させすぎていないか、出力形式が明確かを指摘してください。
```

## SEO & UX Agent

目的: 検索意図、見出し、metadata、内部リンク、スマホ表示を整える。

入力:
- 対象ページ
- metadata
- 内部リンク
- Search Console導入後のクエリ

出力:
- title / description改善案
- 冒頭コピー改善案
- 内部リンク追加案
- スマホで読みにくいUI指摘

判断基準:
- タイトルが自然な日本語
- 検索意図と本文が一致する
- `/free` `/prompts` `/workflows` `/guides` へ迷わず進める

禁止事項:
- 釣りタイトル
- キーワード詰め込み
- 未接続サービスへの過度な誘導

Codexプロンプト例:

```text
@codex review

対象ページのtitle、description、冒頭、CTA、内部リンクをSEO/UX観点で確認してください。
スマホ表示で読みにくい可能性がある箇所も指摘してください。
```

## Fact & Safety Agent

目的: 未確認情報、危険な断定、秘密情報、法務・販売前表現を確認する。

入力:
- PR差分
- 外部URLやplaceholder
- `/legal`、商品、メルマガ、相談導線

出力:
- P1/P2/P3の指摘
- 修正必須の表現
- 後で人間確認すべき事項

判断基準:
- 未確認情報を断定していない
- 準備中サービスを稼働中に見せていない
- APIキー、トークン、個人情報がない
- legalを正式文書と誤認させない

禁止事項:
- 医療、法律、金融などの高リスク助言を断定する
- 外部サービス接続済みのように書く
- 本物URLが不明なものを本物リンクに見せる

Codexプロンプト例:

```text
@codex review

このPRをFact & Safety観点で確認してください。
未確認情報の断定、秘密情報、準備中サービスの誤認、legal表現、placeholderリンクを重点的に見てください。
```

## Publisher Agent

目的: 公開前の差分、検証、PR本文、更新記録を整える。

入力:
- 実装済み差分
- `docs/article-quality-score.md`
- `docs/publishing-cadence.md`
- `src/data/updates.ts`

出力:
- 作業ブランチ
- PR本文
- lint / typecheck / build結果
- 人間が確認すること

判断基準:
- mainに直接pushしていない
- `next-env.d.ts` の生成差分が入っていない
- `/updates` に記録されている
- 80点以上の品質になっている

禁止事項:
- 検証なしのPR作成
- 外部サービス操作
- 失敗した検証を成功と書く

Codexプロンプト例:

```text
@codex

この変更を公開前PRとして整えてください。
lint / typecheck / buildを実行し、next-env.d.tsの生成差分を除外し、PR本文に変更概要、品質スコア、人間が確認することを書いてください。
```
