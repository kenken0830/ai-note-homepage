# Codex依頼プロンプト集

AI Compass Journalを継続改善するため、Codexにそのまま貼れる依頼文です。必要に応じて対象日付やnoteテーマだけ差し替えてください。

## 毎日: noteテーマからHP候補を追加

```text
@codex

対象リポジトリ: https://github.com/kenken0830/ai-note-homepage

今日のnoteテーマをもとに、HP向け記事候補を src/data/articleBacklog.ts に1件追加してください。

条件:
- mainに直接pushしない
- 作業ブランチを切ってPRを出す
- note本文を転載しない
- 「やりたいことをAIでどう実現するか」に寄せる
- category, target, noteAngle, homepageAngle, searchIntent, priority, status, relatedPages, suggestedSlug を埋める
- 既存候補と重複しないか確認する
- lint / typecheck / build を実行する
```

## 週3: AIユースケースページを1本追加

```text
@codex

src/data/articleBacklog.ts から priority が high または medium の候補を1件選び、/ai-use-cases の詳細ページとして公開できるようにしてください。

条件:
- src/data/aiUseCases.ts の該当カードを published にする
- 手順、コピペ用プロンプト、確認ポイント、よくある失敗、noteAngle、関連ページを必ず入れる
- 準備中サービスを稼働中に見せない
- /updates に記録する
- lint / typecheck / build を実行する
```

## 週1: 保存版記事を1本追加または強化

```text
@codex

AI Compass Journalの既存ページから、保存版として強化すべきページを1つ選び、入力例、出力例、改善プロンプト、内部リンクを追加してください。

条件:
- note記事を丸ごと転載しない
- AIニュースやツール比較にしない
- 読者が再現できる手順にする
- /free /prompts /workflows /guides への導線を確認する
- /updates に記録する
- lint / typecheck / build を実行する
```

## 月1: Search Console結果をもとに改善

```text
@codex

Search Consoleの結果をもとに、AI Compass JournalのSEO改善PRを作ってください。

入力:
- 表示回数が多いがCTRが低いページ:
- 10位から30位のページ:
- クリック数が多いページ:

条件:
- title / description / 冒頭コピー / 内部リンクを中心に改善する
- 未確認情報を断定しない
- 外部サービス未接続の導線を稼働中に見せない
- lint / typecheck / build を実行する
```

## 月1: 無料スターターキットを改善

```text
@codex

public/free-starter-kit のMarkdownと /free /prompts /workflows /guides の導線を見直し、無料スターターキットを改善してください。

条件:
- 基本テンプレート、プロンプト10個、7日間導入ガイドの矛盾をなくす
- BOOTHやメルマガが未接続なら稼働中に見せない
- READMEまたはdocsに必要な説明を追記する
- lint / typecheck / build を実行する
```

## PRレビュー用プロンプト

```text
@codex review

このPRはAI Compass JournalのHP改善PRです。

重点確認:
- 「やりたいことをAIでどう実現するか」に寄っているか
- noteの丸ごと転載になっていないか
- 未確認情報を断定していないか
- 準備中サービスを稼働中に見せていないか
- /free /prompts /workflows /guides への内部リンクがあるか
- /updates に記録されているか
- next-env.d.ts など生成差分が入っていないか
- lint / typecheck / build が通っているか

レビュー結果は、修正必須、改善推奨、後回しでよい、に分けてください。P1がなければマージ可能と明記してください。
```

## PR修正用プロンプト

```text
@codex

このPRのレビュー指摘に対応してください。

対応方針:
- P1は必ず修正する
- P2は今回直すか、直さない理由をPR本文またはコメントに残す
- P3は後回しでよいが、残タスクとして明記する
- mainに直接pushしない
- 既存PRブランチに追加コミットする
- note記事を丸ごと転載しない
- 未確認情報を断定しない
- 準備中サービスを稼働中に見せない
- APIキー、トークン、個人情報、秘密情報を追加しない
- next-env.d.ts など生成差分を含めない

修正後に npm run lint / npm run typecheck / npm run build を実行し、
修正したファイル、対応内容、検証結果、残タスクをPRコメントで報告してください。
```

## daily-topic-research

```text
@codex

対象リポジトリ: https://github.com/kenken0830/ai-note-homepage

今日のnote調査テーマから、HP向け候補を1件だけ src/data/articleBacklog.ts に追加してください。

条件:
- mainに直接pushしない
- note本文を転載しない
- AIニュースやツール比較に寄せない
- 「やりたいことをAIでどう実現するか」に変換する
- target / noteAngle / homepageAngle / searchIntent / priority / status / relatedPages / suggestedSlug を埋める
- 既存候補と重複しないか確認する
- まだ公開せず、候補追加PRとして出す
- npm run lint / npm run typecheck / npm run build を実行する
```

## publish-use-case-page

```text
@codex

articleBacklogまたは準備中のaiUseCasesから1件選び、/ai-use-cases/[slug] の詳細ページとして公開してください。

条件:
- mainに直接pushしない
- 80点未満なら公開しない
- 手順、コピペ用プロンプト、入力例、出力例、確認ポイント、よくある失敗、改善プロンプトを入れる
- noteは実験ログ、HPは完成版手順として住み分ける
- /free /prompts /workflows /guides /ai-use-cases へ内部リンクする
- /updates に記録する
- articleBacklogの該当候補があれば status を published にする
- npm run lint / npm run typecheck / npm run build を実行する
```

## weekly-page-improvement

```text
@codex

既存の /ai-use-cases 詳細ページから1本選び、保存版として強化してください。

改善観点:
- 入力例と出力例を具体化する
- 改善プロンプトを追加または強化する
- よくある失敗を具体化する
- /free /prompts /workflows /guides への内部リンクを確認する
- title / description が自然か確認する
- /updates に改善記録を追加する
- 80点未満の弱点を解消する

npm run lint / npm run typecheck / npm run build を実行してください。
```

## monthly-content-maintenance

```text
@codex

AI Compass Journalの月次コンテンツ棚卸しPRを作ってください。

対象:
- public/free-starter-kit
- /free
- /prompts
- /workflows
- /guides
- src/data/articleBacklog.ts
- src/data/aiUseCases.ts

確認:
- 無料キットと各ページに矛盾がないか
- 準備中サービスを稼働中に見せていないか
- 古い候補や重複候補がないか
- 内部リンクが切れていないか
- README/docsに更新が必要か

npm run lint / npm run typecheck / npm run build を実行してください。
```

## article-quality-review

```text
@codex review

このPRの記事品質を docs/article-quality-score.md に沿って100点満点で採点してください。

重点確認:
- 読者のやりたいことが明確か
- 手順が具体的か
- コピペ用プロンプトが使えるか
- 入力例・出力例があるか
- よくある失敗と改善策があるか
- 内部リンクがあるか
- noteとの住み分けがあるか
- 未確認情報を断定していないか
- title/descriptionが自然か

80点未満なら公開不可として、足りない項目を修正必須にしてください。
```

## prompt-tester-review

```text
@codex review

このPRのコピペ用プロンプトを、読者が実際に使えるかという観点で確認してください。

重点確認:
- 何を入力すればよいか分かるか
- 出力形式が明確か
- AIに推測させてはいけない情報が明記されているか
- 入力例と出力例が対応しているか
- 改善プロンプトで次回の入力が良くなるか
- 個人情報や秘密情報の入力を促していないか

修正必須、改善推奨、後回しでよい、に分けてください。
```

## fact-safety-review

```text
@codex review

このPRをFact & Safety観点で確認してください。

重点確認:
- APIキー、トークン、個人情報、秘密情報がないか
- 未確認情報や架空の統計を断定していないか
- BOOTH、メルマガ、コミュニティなど未接続サービスを稼働中に見せていないか
- placeholder URLが本物リンクのように見えないか
- legalや販売前表現が正式文書・正式販売のように見えないか
- 高リスク領域の助言を断定していないか

P1があればマージ不可として指摘してください。
```

## seo-ux-review

```text
@codex review

このPRをSEO & UX観点で確認してください。

重点確認:
- title / description が自然な日本語か
- 検索意図と本文が一致しているか
- 冒頭で読者のやりたいことが分かるか
- /free /prompts /workflows /guides /ai-use-cases への内部リンクが自然か
- CTA文言だけで行き先が分かるか
- スマホで見出し、カード、CTAが読みづらくないか
- キーワード詰め込みや釣りタイトルになっていないか

修正必須、改善推奨、後回しでよい、に分けてください。
```
