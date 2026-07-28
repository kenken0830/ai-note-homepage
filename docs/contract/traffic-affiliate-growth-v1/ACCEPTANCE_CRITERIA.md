# Traffic and Affiliate Growth V1 — Acceptance Criteria

Status: `FROZEN_BEFORE_IMPLEMENTATION`

## Contract and baseline

- Required contract, state, evidence, and change-request files exist
- Production SHA, canonical host, route inventory, Search Console state, Analytics state, and Notta state are evidence-backed
- Unknown metrics remain `null`, `UNVERIFIED`, or `HUMAN_ACTION_REQUIRED`

## Public safety and technical SEO

- Published use-case count: 17
- Sitemap use-case count: 17
- Planned/draft use-case exposure: 0
- Live affiliate links before approval: 0
- Public Notta review before approval: 0
- Primary internal broken links: 0
- Sitemap mismatches: 0
- Duplicate page titles: 0
- Canonical links use the final `www` host
- Robots and sitemap use the final `www` host
- Internal local paths and secrets exposed: 0
- JSON-LD time values are valid ISO 8601 durations

## Homepage and content

- Homepage states target reader, problem, and next action above the fold
- Recommended public articles are five or fewer
- Platform Hub and Funnel Map are absent from the homepage
- Review section does not imply Notta testing or approval
- Free kit remains directly usable
- Priority content list contains no more than three articles

## Analytics

- Vercel Analytics remains enabled
- Free-kit CTAs emit `free_kit_click`
- Article CTAs emit `article_cta_click`
- Event properties are controlled IDs/placements only
- Affiliate measurement remains design-only until an approved destination exists

## Validation

- existing content and revenue validators pass
- lint, typecheck, and build pass
- generated sitemap/robots/canonical checks pass
- internal-link and orphan checks pass
- metadata uniqueness and structured-data checks pass
- production and local HTML safety scans pass
- accessibility and Lighthouse evidence are recorded when runnable
- independent reviewer reports `PASS` with zero blocking findings

## Release

- Branch is not `main`
- No force push, merge, production deployment, external post, or paid action occurs
- A PR may be created only after tests and independent review pass
- Human merge/publication approval remains open
