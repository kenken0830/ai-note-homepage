# Traffic and Affiliate Growth V1 — Business Requirements

Status: `FROZEN_FOR_EXECUTION`

## Purpose

AI Compass Journalへ継続的な訪問を獲得し、Nottaの証拠付きレビューから最初のアフィリエイト成約を確認する。

## Target users

Primary:

- 日本語の会議を文字起こししたい人
- 議事録作成時間を減らしたい会社員
- 決定事項、担当者、期限を整理したい人
- AIを実務へ導入したい初心者

Secondary:

- AIでメール返信、週報、情報整理を行いたい人
- AIツールを実測結果で選びたい人

## Problems

- Search Consoleの実データが未取得で、検索流入不足の原因をURL単位で確定できない
- 本番canonicalがリダイレクト元を指し、最終ホストと不一致
- 記事は手順として有用だが、著者・検証日・実使用証拠が弱い
- トップページに運営者向けの媒体・ファネル説明が残り、読者の入口が散っている
- Vercel Web Analyticsは有効だが、実数baselineと目的別eventが不足
- Nottaは申請中で、実使用、証拠、レビュー、リンク、成約の縦切りが未完了

## Outcomes

- 公開17ユースケースとsitemap掲載数を一致させ続ける
- Search Consoleでindexed/excluded、impressions、clicks、CTR、average positionを取得できる
- インデックスされない理由をURLごとに記録できる
- 重大なtechnical SEO不具合、主要内部リンク切れ、公開状態漏出を0件にする
- トップページで対象者、得られる成果、次の行動が分かる
- 優先記事を最大3件に限定し、実データ取得後に再選定できる
- Notta承認後、合成fixtureによる実使用と証拠レビューへ進める
- 承認済みNottaリンクを最大1件だけ掲載できる
- click、広告主報告成約、承認済み成約、報酬を別々に記録する

## Non-goals

- Notta以外の案件公開
- 汎用Affiliate Foundation
- 比較ランキング、100ページ量産、全17記事全面改稿
- 英語版、別ドメイン、広告運用、自動投稿
- Factory OS追加開発

## Source-of-truth priority

1. この契約と `state/traffic-affiliate-growth-v1/`
2. 実際のGit tree、build成果物、本番レスポンス
3. Notta Pilot worktreeのcommit `0442f2a6952ed5f897c12d3d25f818dfde17837d`
4. 公式一次情報

会話履歴、推測値、非公開管理画面のURLは正本にしない。
