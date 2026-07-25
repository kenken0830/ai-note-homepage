# Production update flow

The canonical publication path is:

1. Change site data or code on a review branch.
2. Open a pull request against `main`.
3. `Production readiness` runs content validation, revenue-route validation, lint, typecheck, and a production build.
4. A human reviews and merges the pull request.
5. The existing Vercel GitHub integration deploys `main` to `ai-compass-journal.com`.
6. The push workflow polls `/deployment-status` until the production commit SHA equals the merged GitHub SHA, then verifies the homepage, products, a revenue-routed article, and sitemap.

Direct local pushes to `main` and direct local Vercel deployments are not part of this flow.

## Content intake

- Use-case candidate generation has no schedule trigger. `.github/workflows/auto-publish-use-case.yml` can only be started manually and creates a review branch and pull request for human review.
- Published note intake: `.github/workflows/intake-homepage-handoff.yml` creates a pull request.
- Manga, video, template, kit, and product intake: `.github/workflows/intake-content-handoff.yml` creates a pull request.
- Zenn and Medium do not have feed polling. Their published result must arrive through a validated handoff before it is shown as published.

Scheduled publication stays disabled until the canonical guardrail is implemented and reviewed. No intake workflow publishes directly to `main`.

## Fail-closed rules

- Every published use case must have one explicit revenue route.
- Every route must reference an existing product and an allowed funnel.
- Production verification fails when Vercel serves a different commit SHA or a required URL/content check fails.
- A failed check does not merge or deploy a pull request.
