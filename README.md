# Movement feed

Public aggregate view-count feed for America.co. It contains only approved, public, aggregate view counts per channel and date. It has no private dashboard data, credentials, user records or analytics identifiers.

## What is here

- `feed.json`: the feed. Fields: `schemaVersion` (currently 1), `updatedAt`, `sources` (each channel's `id`, `platform`, `label` and public `url`) and `observations` (one view count per source, metric and date, with when and how it was collected).
- Public URL: https://raw.githubusercontent.com/America-House/movement-feed/main/feed.json. The live America.co site reads this exact path, so **do not rename, move or reformat `feed.json`**.

## How the feed is updated

`feed.json` is generated. An owner-operated publisher in the America.co website repository validates the approved counts and commits the refreshed file to `main` about once a day, with the message "Refresh approved aggregate movement views". Do not edit `feed.json` by hand. To change which channels or fields appear, change and test the publisher and its validator in the website repository first.

## How we work

Many people work in America House repositories, and many are new to software. These habits keep the public feed accurate and safe:

1. **Make changes on a branch and open a pull request (PR).** Never push to `main` yourself. The only direct commits to `main` are the owner's automated feed refreshes.
2. **One change per PR,** with a description: what, why, how tested, risk and how to roll it back. The PR template asks for each.
3. **Test before review.** This repository has no code of its own. Changes to the feed's format are made and tested in the website repository; here, at least confirm `feed.json` is valid JSON (see [CONTRIBUTING.md](CONTRIBUTING.md)).
4. **Someone other than the author reviews** before anything merges.
5. **This repository is public.** Never commit secrets, private data, personal information or anything not approved for publication.
6. **Ask before anything irreversible,** and never change repository settings without an org owner's OK.

Step-by-step instructions: [CONTRIBUTING.md](CONTRIBUTING.md). Rules for contributors and AI agents: [AGENTS.md](AGENTS.md).
