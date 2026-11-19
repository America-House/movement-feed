# Movement feed

Public aggregate view-count feed for America.co. It holds only approved, public, aggregate view counts per channel and date: no private dashboard data, credentials, user records or analytics identifiers.

## What is here

- `feed.json`: the feed. Fields: `schemaVersion` (1), `updatedAt`, `sources` (`id`, `platform`, `label`, public `url`) and `observations` (one count per source, metric and date, with how and when it was collected).
- Public URL: https://raw.githubusercontent.com/America-House/movement-feed/main/feed.json. The live America.co site reads this exact path. Do not rename, move or reformat `feed.json`.
- `test/feed.test.mjs`: checks the feed's shape and that it holds no emails or secret-looking strings.

## How the feed is updated

`feed.json` is generated. An owner-operated publisher in the America.co website repository commits the refreshed file to `main` about once a day ("Refresh approved aggregate movement views"). Do not edit it by hand. To change channels or fields, change and test the publisher first.

## Stack and setup

Static JSON, no dependencies. Node 24 (or any current Node with `node --test`).

- Environment variables: none.
- Scripts: `npm test` validates `feed.json`. There is no dev server or build.
- Release: there is nothing to deploy. A commit on `main` is live immediately (raw GitHub URL), so use pull requests and never edit `main` by hand. The only direct commits are the automated feed refreshes.
- CI: `.github/workflows/ci.yml` runs `npm test` on pull requests and on pushes to `main`. To make a failing CI block merges, an org owner must add a branch protection rule or ruleset (this repo is public, so rulesets are available on the Free plan).
- End-to-end tests: not applicable (no frontend).
- Owner/contact: America House (Clayton Cuteri, `@claytoncuteri`).
