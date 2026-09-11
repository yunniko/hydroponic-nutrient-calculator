# Hydroponic Nutrient Calculator

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
