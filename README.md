# Hydroponic Nutrient Calculator

> **SUSPENDED (Owner, 2026-09-27)** — part of the svc-lab family, suspended because it did not work out as expected.
> No new work; security upkeep only while anything of it is live. Treat its code, formulas and
> decisions as a **lower-reliability reference**: they may or may not still work, so re-verify before
> reusing anything. Rules: `E:\CLAUDE\COMPANY\GOALS.md` → "Suspended projects".

Free tools for hydroponic growers: an EC/PPM meter-scale converter, a
baseline-water-corrected nutrient dosing and dilution calculator, and a
sourced target EC/pH reference chart by crop.

## Running it

```
npm install --legacy-peer-deps
npm run dev
```

Production build: `npm run build && npm start`.

## Tests

- `npx vitest run` — unit tests for the pure calculator/reference logic.
- `npx playwright test` — end-to-end browser tests for all three tools.

## Current state

See `HANDOVER.md` for the full decision record and `GOALS.md` for the
goal/milestone tracking. Part of the `svc-lab` micro-service portfolio —
see `E:\CLAUDE\projects\svc-lab\`.
