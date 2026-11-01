# Handoff: fin-on-tap (STOCK-DEPLOY-REPAIR-002)

## Last Updated
- 2026-11-02 00:45 KST (Deployment & CI Config Update)

## Current Status
- **Active Project**: `fin-on-tap`
- **Deployment Target**: `fin.on-tap.xyz`
- **State**: Configuration updated; awaiting verification/deployment results.

## Recent Context & Decisions
- [x] Updated `wrangler.toml` to use the correct custom domain routing: `routes = [{ pattern = "fin.on-tap.xyz", custom_domain = true }]`.
- [x] Updated `.github/workflows/deploy.yml` to ensure `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` are available at the job level for conditional evaluation.
- [x] Verified Node 22 and Wrangler v4 compliance.

## In-Progress / Next Action
- [ ] Run `npm run build` and `npx wrangler deploy --dry-run` to verify local configuration.
- [ ] Execute `npx wrangler deploy` (local auth fallback).
- [ ] Verify endpoint via `curl fin.on-tap.xyz`.
- [ ] Commit and push task-owned files (`wrangler.toml`, `.github/workflows/deploy.yml`, `.agents/HANDOFF.md`, `CHANGELOG.md`).
