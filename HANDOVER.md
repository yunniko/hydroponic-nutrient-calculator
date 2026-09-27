# Handover — hydroponic-nutrient-calculator
Last verified: 2026-09-12 at 1465a91

> **SUSPENDED (Owner, 2026-09-27)** — part of the svc-lab family, suspended because it did not work out as expected.
> No new work; security upkeep only while anything of it is live. Treat its code, formulas and
> decisions as a **lower-reliability reference**: they may or may not still work, so re-verify before
> reusing anything. Rules: `E:\CLAUDE\COMPANY\GOALS.md` → "Suspended projects".

svc-lab service #14 (backlog idea #19), built by the daily automation on 2026-09-11. Goal:
`GOALS.md` G-001. Shared conventions: `E:\CLAUDE\projects\svc-lab\`; charter:
`E:\CLAUDE\COMPANY\`.

## Current state

- **Built, pushed, container running on the host, NOT reachable**: the vhost/TLS step failed on
  a host-level nginx limit (D005). https://hydroponic-nutrient-calculator.svc.julienika.cz
  returned no response on 2026-09-12.
- Three tools, no database: `/ec-ppm-converter` (three meter scales), a baseline-corrected
  dosing/dilution calculator, and a sourced per-crop EC/pH reference.
- Verification on 2026-09-12: `npm run test:unit` 22/22. e2e (9 specs) and build last green
  2026-09-11.
- Domain-expert review and manual security review done (D004, D005).
- Working tree: uncommitted edits to `GOALS.md` and the previous `HANDOVER.md` (2026-09-11);
  the old handover is kept as `docs/handover-legacy-2026-09-12.md` until the migration is
  reviewed, then delete it.

## How things fit together

Standard svc-lab stateless Next.js service. `lib/ec-ppm-converter.ts` (linear EC × scale
factor), `lib/nutrient-dosing-calculator.ts` (baseline correction + mass-balance dilution),
`lib/hydroponic-ec-reference.ts` (sourced table). Forms in `app/_components/`, pages under
`app/<tool>/`.

## Rules in force

- Baseline correction must carry its "already total EC?" caveat (D004).
- Meter-scale claims cite datasheets only; brand labels are inconsistent (D004).
- No per-brand dosing without a cited concentration (D003).
- `npm ci --legacy-peer-deps`; run unit, e2e and `npm run build` before calling work done.

## Next steps and open questions

- **PENDING APPROVAL (Owner):** raise `server_names_hash_bucket_size` in `/etc/nginx/nginx.conf`
  (exact command in `svc-lab/GOALS.md`), then: remove the partial vhost, re-run
  `deploy-service.ps1 -Name hydroponic-nutrient-calculator -Port 30190 -Domain
  hydroponic-nutrient-calculator.svc.julienika.cz`, verify HTTPS, update `julienika-home` hub +
  sitemap index, SEO review, mark idea #19 Shipped in `svc-lab/GOALS.md`.
- Not built: reference chart by growth stage; CF scale (EC×10) in the converter.

## Deploy log

| Date | Commit | What changed | Verified how |
|---|---|---|---|
| 2026-09-11 | 1465a91 | Container deployed on port 30190; vhost failed (D005) | Container responds locally; sibling sites still 200 |

## Decisions

`docs/decisions/README.md` (D001–D005).
