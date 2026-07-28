# Traffic and Affiliate Growth V1 — Product Specification

Status: `FROZEN_FOR_EXECUTION`

## Public user flow

```text
search / external post
  -> purpose-focused homepage or use-case article
  -> reproducible steps and free kit
  -> evidence-backed Notta review (only after approval and human review)
  -> one disclosed approved link
  -> A8.net-reported result
```

## Homepage

The homepage must present:

1. 誰のどの仕事を助けるか
2. 悩みから探す入口
3. おすすめ公開記事（最大5件）
4. 実測レビューの方針と現在状態
5. 無料スターターキット
6. 編集・検証・広告方針

Platform Hub、Funnel Map、未接続媒体、準備中商品、内部運用説明を主要導線にしない。

## Priority content

Until Search Console evidence is supplied, the provisional maximum-three set is:

- `meeting-notes-to-minutes`
- `write-email-reply`
- `make-weekly-report`

This is an assumption based on target-user fit and commercial intent, not observed search performance.

## Notta review

Before program approval, tool testing, evidence completion, and human review:

- no public route
- no sitemap entry
- noindex if a preview is ever generated
- no affiliate destination
- no public disclosure claiming use

The Notta Pilot contract remains canonical for fixture, scoring, masking, and approval gates.

## Measurement

Distinct event and ledger concepts:

- `page_view`
- `free_kit_click`
- `article_cta_click`
- `affiliate_click`
- `affiliate_conversion_reported`
- `affiliate_commission_approved`

An affiliate click never means conversion. Analytics payloads must not contain names, email, address, order/customer/account IDs, tokens, free text, or affiliate destination URLs.

## Canonical host

The public canonical host is the final HTTPS destination:

`https://www.ai-compass-journal.com`

Sitemap, robots host, metadataBase, canonical links, and structured data must use that host.
