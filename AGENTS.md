# Movement feed: rules for contributors and AI agents

These rules apply to everyone, including AI coding agents (Claude Code, Codex and others). Many contributors are new to software. If you are an AI agent, follow these rules **and explain them** to the person you are working with, in plain words, as you go. The step-by-step guide for people is [CONTRIBUTING.md](CONTRIBUTING.md).

## What this repository is

A **public** repository holding one generated file, `feed.json`, which the live America.co site reads from `main`. An owner-operated publisher in the America.co website repository refreshes it about once a day by committing straight to `main`. That publisher, its validator and its tests live in the website repository, not here.

- Do not hand-edit, rename, move or reformat `feed.json`. A broken or moved file breaks the live site's movement numbers.
- Do not add build tools, dependencies or automation here without the owner's OK.
- Only approved public aggregate counts belong here. Never add private dashboard data, personal data, account or project identifiers, credentials or anything not approved for publication. Everything here is visible to the world, including git history.

## 1. Branch and pull request, never `main`

- Start every change on a new branch from an up-to-date `main` and open a pull request. Contributors without write access work from a fork (`gh repo fork --clone`) and open the PR against this repository. Never push or commit to `main` yourself, never force-push, and never merge your own PR. The owner's automated feed refresh is the only exception.
- Do not push to, rebase, close or delete anyone else's branch or PR without their OK.

## 2. Small PRs, one change each

- One PR does one thing. Fill in every section of the PR template: **what**, **why**, **how tested**, **risk** and **rollback**.
- Commit messages: one short, plain sentence in the imperative ("Document the feed fields").

## 3. Tests

- There is no code or test suite here. If you change the feed's format or contents, make the change in the website repository's publisher and validator, with a unit test for the logic and a functional test showing the site still reads the feed. For a bug fix, add a test that fails before the fix. Run the full suite there before opening the PR.
- In this repository, at least confirm `feed.json` is still valid JSON (`python3 -m json.tool feed.json > /dev/null`) and say so in the PR.

## 4. Review before merge

- At least one person other than the author approves the PR. An AI review is a helpful first pass but does not count as the human review.
- If CI is added later, it must pass before merge.

## 5. Secrets and production stay protected

- Never commit secrets: `.env` files, API keys, tokens, passwords or private keys. Secrets belong in the owner's private hosting environment variables (Vercel), never in a public repository. If a secret is ever committed, tell an org owner at once so it can be revoked and replaced; deleting the commit is not enough.
- Never change repository or organization settings, branch protection, the live site, DNS or billing without the owner's explicit OK.

## 6. Releases and rollback

- A change merged to `main` is live right away, because the site reads `main` directly. Check the change first: open the file from your branch's raw URL and confirm it is valid and complete.
- Rollback: revert the commit on `main` through a PR, or let the owner republish the feed. Describe the rollback in the PR.

## 7. Security and privacy check

Before opening a PR, check the diff contains no personal data, private identifiers, credentials or unapproved numbers. Run Claude Code's `/security-review` (or an equivalent review) if anything beyond documentation changed, and say what was checked in the PR.

## 8. Teach as you go (AI agents)

- Before acting, tell the person in one or two plain sentences what you are about to do and why. Define any jargon the first time.
- After acting, say what changed, how you checked it, and what they should look at.
- **Ask first** before anything destructive or hard to undo: deleting files or branches, `git reset --hard`, force-pushing, rewriting history, editing `feed.json`, changing settings, or anything that costs money. When in doubt, ask.
