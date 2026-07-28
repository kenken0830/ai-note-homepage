# Search Console Baseline Action Packet

Status: `HUMAN_ACTION_REQUIRED`

## Recommended property

Use a Domain property for:

`ai-compass-journal.com`

A public DNS `google-site-verification` TXT record exists, but property ownership, account access, sitemap submission, and report data are not proven by that fact.

## Sitemap

After the canonical-host fix is published:

`https://www.ai-compass-journal.com/sitemap.xml`

## Human actions

1. Sign in to Google Search Console.
2. Confirm or add the Domain property `ai-compass-journal.com`.
3. Complete DNS verification if the existing record is not recognized.
4. Submit the final-host sitemap URL.
5. Export the last 28 days and preceding 28 days from Performance:
   - Queries
   - Pages
   - Countries
   - Devices
6. Export Page Indexing totals and reasons.
7. Run URL Inspection for the homepage, `/ai-use-cases`, and all 17 published detail URLs.
8. Save exports outside Git until personal/account fields are removed.

## Evidence to retain

- Property type and verified status
- Sitemap submitted URL and status
- Performance CSV files
- Page Indexing CSV or sanitized export
- URL Inspection result table with URL, indexed status, Google-selected canonical, crawl date, and reason

Do not retain Google account email, verification token, cookies, dashboard URLs containing identifiers, or screenshots with account details.

## Vercel Analytics baseline in the same session

1. Confirm the current Vercel plan and whether Custom Events are available.
2. Record Visitors and Page Views for the last 28 days and preceding 28 days.
3. Export or transcribe the top landing pages and referrers.
4. After a preview is available, click one free-kit CTA and one article CTA and confirm that `free_kit_click` and `article_cta_click` arrive without personal data.
5. Keep team/account identifiers and private dashboard URLs out of Git.

## Minimal report back

```text
Search Console確認完了
Property: Domain / URL-prefix
Verified: true / false
Sitemap: success / error
Indexed: <count>
Not indexed: <count>
Performance period: <dates>
Export files attached: <filenames>
Vercel plan: <plan>
Custom Events available: true / false
Visitors and Page Views period: <dates>
```
