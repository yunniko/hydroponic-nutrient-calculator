# hydroponic-nutrient-calculator — project conventions

Read `HANDOVER.md` first: current state, decision record (especially the
crop-EC sourcing caveat and the domain-expert review outcome), next steps.
Goal in `GOALS.md` (G-001). Parent initiative in `E:\CLAUDE\projects\svc-lab\`;
company-wide standards in `E:\CLAUDE\COMPANY\`.

- Stack: Next.js App Router, TypeScript, Tailwind. No database, no auth,
  no accounts.
- `lib/ec-ppm-converter.ts` is a pure linear conversion (EC × scale factor)
  — the only judgment call is which of the three common scales (500/640/700)
  a user's meter uses, which this tool asks rather than assumes.
- `lib/nutrient-dosing-calculator.ts` holds two real chemistry calculations:
  a baseline-water-corrected target reading (addition) and a
  conservation-of-mass dilution formula (not brand-specific dosing data) —
  don't add per-brand ml/L dosing tables here without a real, cited source
  per brand.
- `lib/hydroponic-ec-reference.ts` holds the sourced per-crop EC/pH target
  table — sourced and cited in the file's own header comment (see
  HANDOVER.md's decision record). Don't change a figure without re-checking
  it against a real source.
- `npm install`/`npm ci` need `--legacy-peer-deps` (a live npm/arborist bug,
  not specific to this project — see `svc-lab/HANDOVER.md`).
- Two test layers: `npx vitest run` (unit) and `npx playwright test` (e2e —
  real browser flows for all three tools). Both must pass before calling a
  change done; also run `npm run build` — it catches server/client boundary
  bugs the others don't.
- See `E:\CLAUDE\COMPANY\INFRASTRUCTURE_DEPLOY.md` for the redeploy command
  once live.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
