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
