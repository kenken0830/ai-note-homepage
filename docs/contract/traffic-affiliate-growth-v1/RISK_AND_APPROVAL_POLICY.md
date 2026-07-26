# Traffic and Affiliate Growth V1 — Risk and Approval Policy

Status: `ACTIVE`

## Fail-closed rules

- Unknown Search Console or Analytics numbers are never estimated
- Notta approval is not inferred from application submission
- Tool use is not claimed before the frozen fixture is actually tested
- Screenshots, conclusions, disclosure, privacy language, and destination require human approval
- Non-live or placeholder destinations never render as affiliate links
- Tracking URLs, account identifiers, credentials, customer data, and private dashboard URLs never enter Git
- `affiliate_click` is not a conversion

## Human or external gates

- Google login, property verification, sitemap submission, Search Console export
- Notta/A8.net approval or rejection
- Notta plan/cost and tool test
- Screenshot and evidence quality approval
- Advertising and privacy wording
- Issued destination and advertising URL submission
- Merge, production deployment, note/X publication

## Allowed autonomous work

- Public/local read-only audit
- Contract and evidence preparation
- Non-affiliate SEO, homepage, internal-link, accessibility, and analytics-event implementation
- Local tests, independent review, bounded fixes
- Branch push and PR creation after all pre-release checks pass

## Bounded repair

Acceptance failures may be fixed and re-reviewed at most twice. A third unresolved failure becomes `CHANGE_REQUEST_NEEDED` or `BLOCKED`; scope is not silently expanded.

## Rollback

All implementation remains one topic branch. Rollback is the non-merge or closure of the PR. No approved baseline or production state is modified in place.
