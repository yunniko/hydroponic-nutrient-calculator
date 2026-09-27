# Goals — hydroponic-nutrient-calculator

Owner writes goals here; The Company plans, executes, and logs against them.
Statuses: `DRAFT` · `ACTIVE` · `BLOCKED` · `DONE`.
Parent initiative: `E:\CLAUDE\projects\svc-lab\` (same milestone-gate waiver
and standing deploy pre-approval apply here). Template/numbering
conventions in `E:\CLAUDE\COMPANY\GOALS.md`.

## Active goals

### G-001 · Hydroponic EC/PPM, nutrient dosing, and crop reference calculators — ACTIVE
- **What:** Three tools: an EC/PPM meter-scale converter
  (`/ec-ppm-converter` — converts between EC in mS/cm and PPM under the
  500/640/700 meter scales), a nutrient dosing & dilution calculator
  (`/nutrient-dosing-calculator` — a source-water-baseline-corrected target
  meter reading, and a conservation-of-mass dilution calculation for an
  over-strength reservoir), and a sourced crop EC/pH reference chart
  (`/hydroponic-ec-reference`). No database, no accounts.
- **Why:** svc-lab backlog idea #19. A research pass this run (2026-09-11)
  found the "simple free web tool" niche has become considerably more
  crowded than it was in early September — nearly every craft/hobby/
  developer-tool idea checked (compost C:N, bath bombs, lotion
  formulation, leathercraft, macrame, natural dyeing, cron generators,
  file renamers, even client-side ML tools like audio transcription and
  noise removal) already has 5-10+ existing free competitors, several
  appearing to be programmatic calculator-farm sites pursuing the same
  strategy. This idea was chosen because it has a real, documented,
  specific pain point rather than just "another entrant in a crowded
  field": EC-to-PPM meter-scale confusion is independently documented
  (HydroBuilder, growwithhydroponics.com, a Rollitup forum thread) as
  causing 15-40% dosing errors, existing simple converters largely handle
  scale selection fine but the wider "correct for your own tap water"
  baseline-subtraction technique (also independently documented across
  Botanicare, Dosatron, and AGEYE) is not something the market's simple
  calculators combine with EC/PPM conversion and crop-specific targets in
  one free, ad-supported tool. See svc-lab/GOALS.md's progress log for the
  full research trail, including why backlog idea #15 (Amazon FBA
  calculator) was checked and rejected this run for lack of a reliable
  primary source (WebFetch to Amazon's own fee schedule pages is denied
  this session, and secondary sources disagreed on the 2026 fee changes).
- **Acceptance criteria:** EC/PPM conversion math unit-tested (all three
  scales, round-trip), dosing/dilution math unit-tested (baseline
  addition, mass-balance dilution equation, edge cases), crop reference
  data sourced and cross-corroborated across independent university
  extension references, domain-expert-reviewed before shipping, a real
  browser flow verified (e2e-tested), live and reachable over HTTPS,
  sitemap present, honest caveats that this doesn't replace a nutrient
  brand's own feeding chart or a real meter reading.
- **Constraints:** No database, no accounts, no paid dependencies.

**Milestones:**
- [x] M1 — Build: EC/PPM converter (500/640/700 scales), nutrient dosing
      calculator (baseline-corrected target reading + dilution formula),
      sourced 7-crop EC/pH reference chart, 3 tool pages, unit tests, e2e
      tests. ✔ 2026-09-11.
- [x] M1b — Domain-expert review (hydroponic nutrient/water chemistry).
      Found and fixed 2 critical + 5 high-severity issues — see
      `HANDOVER.md` D4 and `docs/domain-reference.md`. ✔ 2026-09-11.
- [ ] M2 — Ship: git init, security review, push via `init-repo.ps1`,
      deploy via `deploy-service.ps1`, verify live, update hub page and
      sitemap index. **Partially done 2026-09-11**: git init/commit/push
      and the container build/start succeeded; blocked on a host-level
      nginx config limit (PENDING APPROVAL, see progress log and
      `HANDOVER.md` D5) before the vhost/TLS/live-verify/hub-page steps
      can complete.
- [ ] M3 — Monetization once an ad account exists for this domain (already
      wired via the shared `ADSENSE_PUBLISHER_ID` env var, awaiting
      AdSense's own per-domain approval, same as every other svc-lab
      service).

**Progress log** (newest first):
- 2026-09-11 — Resumed from the prior run's session-budget stop. Full
  suite independently re-verified fresh (ESLint, build, 22 unit tests, 9
  e2e tests, all passing), manual-equivalent security review clean, git
  init + commit + push via `init-repo.ps1` all succeeded
  (https://github.com/yunniko/hydroponic-nutrient-calculator). Deploy via
  `deploy-service.ps1` got as far as building and starting the container
  (port 30190, locally verified responding) but failed at the nginx vhost
  step: `nginx -t` fails host-wide with "could not build server_names_hash,
  you should increase server_names_hash_bucket_size: 64" — a root-owned
  host config limit the growing portfolio has outgrown, not a bug in this
  project. No other site was disrupted (nginx never reloaded with the
  broken config; independently confirmed via curl). **PENDING APPROVAL:
  logged in svc-lab/GOALS.md** with the exact fix — this service stays
  unshipped (not live) until the Owner applies it. See `HANDOVER.md` D5.
- 2026-09-11 — M1 and M1b complete this run (svc-lab daily automation).
  Domain-expert review found real, serious issues (2 critical, 5 high) —
  not a rubber stamp: a baseline-correction dosing tool that could
  over-fertilize if applied to the wrong chart convention, factually
  wrong meter-brand-to-scale claims, a lettuce pH figure matching neither
  cited source, a too-narrow tomato EC range, and an unsourced
  self-contradicting "feeder type" column. All fixed and the full suite
  re-verified fresh (ESLint, production build, 22 Vitest tests, 9
  Playwright e2e tests, all passing). **BLOCKED: session budget ran out
  immediately after this** — M2 (security review, push, deploy, hub page
  update) has not started; nothing has left the workspace. See
  `HANDOVER.md`'s "Next steps" for the exact resume steps (port 30190
  reserved).
- 2026-09-11 — Goal created, M1 build in progress (svc-lab daily
  automation). See svc-lab/GOALS.md's own progress log for the extensive
  research trail behind this pick.
