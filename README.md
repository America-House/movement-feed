# Movement feed

Public aggregate view-count feed for America.co. It holds only approved, public, aggregate view counts per channel and date: no private dashboard data, credentials, user records or analytics identifiers.

## What is here

- `feed.json`: the feed. Fields: `schemaVersion` (1), `updatedAt`, `sources` (`id`, `platform`, `label`, public `url`) and `observations` (one count per source, metric and date, with how and when it was collected).
- Public URL: https://raw.githubusercontent.com/America-House/movement-feed/main/feed.json. The live America.co site reads this exact path. Do not rename, move or reformat `feed.json`.
- `test/feed.test.mjs`: checks the feed's shape and that it holds no emails or secret-looking strings.

## How the feed is updated

`feed.json` is generated. An owner-operated publisher in the America.co website repository commits the refreshed file to `main` about once a day ("Refresh approved aggregate movement views"). Do not edit it by hand. To change channels or fields, change and test the publisher first.

## Testing

**Coverage (2026-11-19, `npm run test:coverage`, Node's built-in runner): 100% lines, functions and branches of the test file, which is the only JavaScript in the repo.** That number is not meaningful: the product is `feed.json`, data that no code in this repo reads, so a percentage cannot show how well it is checked. What matters is which rules the test enforces (fields the America.co site reads, unique source ids, public https URLs, and the observation checks in `test/feed.test.mjs`). CI fails if coverage drops below 100% and prints the report in the job summary.

**Critical paths with no coverage:** auth, payments and data access do not exist here (public read-only JSON, no accounts, no secrets). The untested risks are in the consumers and the refresh job: the America.co site code that reads `feed.json` (see the america-co repo) and the automated refresh that commits to `main`, which this repo cannot test because its code lives elsewhere.

**Plan to full coverage:**
1. Unit: keep adding a check to `test/feed.test.mjs` for every rule the site relies on (value ranges, date order, no duplicate observations), so a bad refresh fails CI before it goes live.
2. Functional: add a contract test in america-co that loads a sample of this feed through the same parser the site uses.
3. End-to-end: a scheduled check that fetches the live raw URL and validates it with the same test, so a bad direct commit on `main` is noticed.

## Stack and setup

Static JSON, no dependencies. Node 24 (or any current Node with `node --test`).

- Environment variables: none.
- Scripts: `npm test` validates `feed.json`. There is no dev server or build.
- Release: there is nothing to deploy. A commit on `main` is live immediately (raw GitHub URL), so use pull requests and never edit `main` by hand. The only direct commits are the automated feed refreshes.
- CI: `.github/workflows/ci.yml` runs `npm test` on pull requests and on pushes to `main`. To make a failing CI block merges, an org owner must add a branch protection rule or ruleset (this repo is public, so rulesets are available on the Free plan).
- End-to-end tests: not applicable (no frontend).
- Owner/contact: America House (Clayton Cuteri, `@claytoncuteri`).
