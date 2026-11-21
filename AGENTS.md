# Agent instructions

## Engineering standards

These apply to every change, human or AI.

- Every change is a pull request from a branch. Never push to `main` or production, and never merge your own PR without the owner's OK.
- CI must pass before review: `npm run test:coverage`. Check with `gh pr checks`.
- The coverage floor may never go down. New or changed code needs tests: add tests under `test/`; run `npm test`.
- Update the README when setup or behaviour changes.
- Fill in the PR template (`.github/pull_request_template.md`) honestly: what changed, how it was tested.
- Never commit secrets (keys, tokens, `.env`, signing files). If one leaks, revoke it; deleting the commit is not enough.
