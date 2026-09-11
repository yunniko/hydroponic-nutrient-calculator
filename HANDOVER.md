# Handover — hydroponic-nutrient-calculator

Read this before touching the project. Goal in `GOALS.md` (G-001).
Company-wide standards in `E:\CLAUDE\COMPANY\`.

## Current state

Being built 2026-09-11 by the svc-lab daily automation. See GOALS.md's
progress log for the latest status.

## How things fit together

Three independent tools sharing one Next.js app, no database:
`lib/ec-ppm-converter.ts` (linear EC↔PPM conversion across three meter
scales), `lib/nutrient-dosing-calculator.ts` (baseline-water-corrected
target reading + a mass-balance dilution calculation), and
`lib/hydroponic-ec-reference.ts` (sourced per-crop EC/pH target table).
Each has a matching `app/<tool>/page.tsx` + `app/_components/<tool>-form.tsx`
(the reference chart page renders its table directly, no form needed).

## Decision record

**D1 — Chose this idea after an extensive research pass found the
"simple free web tool" niche much more crowded than earlier in
September.** See svc-lab/GOALS.md's 2026-09-11 progress log entry for the
full trail: 10+ craft/hobby/developer-tool ideas were checked and all
already had multiple free competitors, several looking like
AI-generated calculator-farm sites. This idea was picked specifically
because it has documented, real pain-point signal (EC/PPM scale
confusion causing real dosing errors) rather than a false "no
competition" claim — existing simple EC/PPM converters mostly handle
scale selection correctly already; the differentiation here is combining
scale conversion, source-water-baseline correction, and crop-specific
targets in one free tool, not claiming to be the only EC/PPM converter
that exists.

**D2 — Rejected backlog idea #15 (Amazon FBA calculator) this run for
lack of a reliable primary source.** WebFetch to Amazon's own fee
schedule pages was denied (consistent with this session's known
limitation), and secondary sources (ShipBob, AMZPrep, SentryKit,
RocketSource) gave inconsistent signals about whether the referral fee
schedule changed for 2026 vs. only fulfillment fees, with no way to
verify exact per-tier dollar figures against a primary source. Given the
Owner's original flag on this idea (stale fee numbers risk real financial
harm to sellers) and the playbook's explicit "if you can't find a
reliable source for a number the tool depends on, don't ship it this
run" rule, building this idea's exact fee tables wasn't defensible this
run.

**D3 — No per-brand nutrient dosing (ml per liter) calculator.** Real
per-brand dosing (General Hydroponics, Masterblend, etc.) requires each
brand's own concentration data, which changes by product line and isn't
something this run could source and verify reliably for multiple brands.
The dosing calculator instead covers brand-agnostic real chemistry
(baseline correction, dilution) that doesn't depend on any brand's
proprietary formulation data — see `lib/nutrient-dosing-calculator.ts`'s
header comment.

**D4 — Domain-expert review (2026-09-11) found and this run fixed two
critical and five high-severity issues, not a rubber stamp.** Critical:
(1) the baseline-correction tool could push a user well above their
target if applied to a chart that's already a total-EC figure — fixed
with explicit caveats rather than an unconditional formula; (2) the
meter-brand-to-scale claims (Hanna=640, Bluelab/European=700) were
factually wrong per Hanna's own datasheets and conflicted with Bluelab's
own documentation — rewritten to cite only datasheet-confirmed facts and
warn that brand/chemistry-name labels for these scales are inconsistent
industry-wide. High: lettuce pH (5.5-6.5 matched neither cited source —
fixed to 5.6-6.5 with a disclosed source disagreement), tomato EC
(2.0-2.4 was Ohio State's early-stage figure only, too narrow for
fruiting — widened to 2.0-3.5), the "feeder type" column contradicted the
table's own EC data and was unsourced — removed and replaced with a
per-crop sourced/labeled note, and a public FAQ pointed at a
docs/domain-reference.md that didn't exist yet and leaked internal
build-process phrasing — both fixed. Full detail and remaining lower-
severity items in `docs/domain-reference.md`. Full suite re-verified
fresh after every fix: ESLint clean, production build clean, 22 Vitest
unit tests, 9 Playwright e2e tests, all passing.

## Next steps and open questions

- **BLOCKED: session budget ran out immediately after M1b's fixes were
  verified (2026-09-11).** M2 (security review, push, deploy, hub page
  update) has not started — nothing has left the workspace, no git repo
  exists yet. Next session: `git init` (repo-local `git config user.email
  12hv89@gmail.com`), commit, `/security-review`, push via
  `init-repo.ps1`, deploy via `deploy-service.ps1` (port 30190 chosen,
  playwright dev port 30191 — re-verify 30190 free on the live host per
  usual policy, `COMPANY\INFRASTRUCTURE_DEPLOY.md`'s table may be stale by
  a day), then update `julienika-home`'s hub page and sitemap index and
  redeploy it, then run an SEO review and close out `svc-lab/GOALS.md` per
  the usual resume pattern (see aquarium-stocking-calculator's and
  soap-lye-calculator's own resume entries for the exact shape).
- Not fixed this run (logged, not blocking): the reference chart isn't
  broken out by growth stage, and there's no CF-scale (EC×10) option in
  the converter — both real, larger-scope improvements for a future pass.
