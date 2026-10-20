# Autostrada frontend ownership and disposition audit

Audit date: 2026-09-07

Default branch and audited commit: `main` at
`8f88f8b07c34a5ea5b4b88a96f720a03f48191eb`

## Decision

**Disposition: retained maintenance surface.**

This repository owns a live, externally routed frontend even though it does not
currently expose a working dashboard. `autostrada.gaulatti.com` resolves to the
CloudFront distribution whose S3 origin contains the frontend build, and other
portfolio repositories still link to that hostname. A clean private-browser
session renders the application-owned 403 feature gate. Archival or a
superseded/read-only designation would therefore be misleading.

The retained contract is deliberately narrow: preserve and safely operate the
maintenance surface until a separately reviewed ticket either restores the
dashboard or explicitly retires its DNS, identity, application, and recovery
dependencies.

## Ownership and delivery contract

| Responsibility | Contract |
| --- | --- |
| Product and repository owner | GitHub repository owner `gaulatti` |
| Canonical source checkout | `/Users/gaulatti/source/gaulatti/autostrada-frontend`, origin `git@github.com:gaulatti/autostrada-frontend.git` |
| Production hostname | `https://autostrada.gaulatti.com` |
| Delivery target | AWS account-owned S3 bucket `autostrada-frontend`, served by CloudFront distribution `E3BHYW21X1M4WI` |
| Infrastructure owner | [`gaulatti/autostrada`](https://github.com/gaulatti/autostrada), CloudFormation stack `Autostrada` |
| Backend integration | `https://api.autostrada.gaulatti.com`, source owned by [`gaulatti/autostrada-service`](https://github.com/gaulatti/autostrada-service) |
| Identity integration | Cognito configuration supplied through repository Actions variables; the shared identity infrastructure still names the frontend callback and logout URLs |
| Secrets owner | The `gaulatti` repository owner through GitHub Actions repository secrets. Secret values are never part of this document or source control. |
| Local verification | `npm ci --legacy-peer-deps` followed by `npm run build`; these are the locked local checks, not the deployment install command. |
| Release build command | The existing workflow uses `npm install --legacy-peer-deps` followed by `npm run build`; dependency resolution and output must be recorded for the controlled release. |
| Release path | A push to `main` invokes `.github/workflows/deploy.yml`, which builds the client, replaces the S3 contents, and invalidates CloudFront. This path is configured but not yet proven by a recorded Actions run. |
| Health proof | DNS/TLS/HTTP and a clean private-browser render. The expected current result is the application-owned 403 gate, not authenticated dashboard health. |
| Rollback | Revert the release commit through review and let the same `main` workflow rebuild and publish the prior tree. This reviewed source-rebuild procedure remains unverified until the blocked release-proof ticket is completed; it does not promise restoration of the exact previously deployed asset bytes. |

## Evidence

| Surface | Method | Result |
| --- | --- | --- |
| Git source | Local Git plus GitHub repository and commit APIs | Public, unarchived repository with unprotected default branch `main`; audited SHA `8f88f8b07c34a5ea5b4b88a96f720a03f48191eb`; no tags. Last source commit was 2025-05-25 UTC. |
| Public browser behavior | Safari Private Browsing at `https://autostrada.gaulatti.com` | TLS loads and the hydrated application renders `403 Forbidden`. The gate comes from `PublicLayout` and the repository's feature-flag path. No authenticated dashboard behavior was claimed. |
| DNS and HTTP | Route 53, `dig`, and `curl` | `autostrada.gaulatti.com` is a Route 53 CNAME to `d3svxvq8zyziln.cloudfront.net`; the document request returns HTTP 200 from CloudFront/S3. |
| Cloud delivery | Read-only CloudFormation, CloudFront, and S3 APIs | Stack `Autostrada` is `UPDATE_COMPLETE`; distribution `E3BHYW21X1M4WI` is enabled and deployed with S3 origin `autostrada-frontend.s3.us-east-1.amazonaws.com`. The current `index.html` was last modified at `2025-05-25T00:45:17Z`, immediately after the audited commit, and contains its maintenance-route assets. |
| Actions and schedules | Workflow, permissions, and run APIs | Actions are enabled. One active push-to-`main` deploy workflow exists; it has no schedule or manual trigger and GitHub reports zero workflow runs. |
| Deployment configuration | Actions variable and secret-name APIs plus workflow inspection | All eight named deployment variables exist. Three required repository secret names exist. No secret value was requested or recorded. |
| Releases, packages, deployments, and environments | GitHub REST APIs | No release, tag, GitHub deployment record, or GitHub environment exists. The package is private and is not a distribution artifact. |
| Pages, webhooks, and branch rules | GitHub REST APIs | No Pages site, webhook, branch protection, or branch ruleset was found. |
| Wiki | Git remote inspection | The public repository wiki exists at its separate Git remote. No wiki content was changed by this audit. |
| Portfolio consumers | Exact `rg` searches under `/Users/gaulatti/source/gaulatti` and `/Users/gaulatti/source/fifthbell` | Ariston and Alcantara frontend navigation link to the hostname; Macondo identity infrastructure lists its sign-in and logout URLs; Milano probes the public URL. |
| Backend endpoint | DNS and unauthenticated HTTPS probe | `api.autostrada.gaulatti.com` resolves to a host that redirects the root request away from the product. No authenticated API health contract was proven. |
| Local source health | Clean install, build, and typecheck | `npm ci --legacy-peer-deps` and `npm run build` pass. Typecheck fails on pre-existing implicit-`any`, component prop, JSX namespace, and Tailwind configuration errors. The install audit reports 58 known dependency vulnerabilities. |

## Before and after

Before this audit, the README described a working dashboard and a production
build without distinguishing the deployed 403 gate from functional product
health. The deploy workflow named a live target but had no ownership, recovery,
or verification contract.

After this audit:

- the README identifies the repository as the retained owner of a maintenance
  surface;
- the live hostname, infrastructure, backend, identity, secrets owner, release
  command, health expectation, and rollback path are explicit;
- the deploy workflow remains unchanged because the surface is retained and no
  deployment was authorized;
- the unverified release/rollback boundary is isolated in one blocked follow-up.

No deployment, DNS change, credential read or rotation, infrastructure apply,
archive action, or source-history rewrite occurred.

## Residual risks and unknowns

- The current GitHub Actions deployment path has no recorded run and therefore
  has not proven artifact upload, cache invalidation, or rollback.
- Merging any change to `main` is intended to trigger production deployment;
  reviewers must treat even documentation-only merges as release-bound until
  that workflow is redesigned.
- The unauthenticated backend root does not provide a product health response,
  and no authenticated dashboard/API path was exercised.
- Dependency audit and typecheck failures predate this audit and remain open
  engineering debt.
- Repository Actions use long-lived AWS credential secret names. Rotation,
  least-privilege review, and migration to GitHub OIDC are not proven here.
- The configured AWS account was inspected read-only; no cross-account inventory
  was attempted.

## Recovery and rollback guardrails

Do not deploy merely to test the ownership conclusion. The first controlled
release must use an approved maintenance artifact, record the pre-release S3 and
CloudFront state, validate the private-browser 403 expectation after cache
invalidation, and exercise a reviewed revert. If the dashboard is restored,
replace the 403 expectation with authenticated browser and API acceptance tests
in a dedicated implementation ticket.

If later evidence supports retirement, create a separate decommission plan that
accounts for Route 53, CloudFront, S3, Macondo callbacks, navigation links,
Milano monitoring, the backend hostname, credentials, and recovery artifacts.
Do not archive this repository while any of those dependencies remains live.
