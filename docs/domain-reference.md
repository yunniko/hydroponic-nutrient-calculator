# Domain reference — hydroponic nutrient/water chemistry

Domain-expert review of `hydroponic-nutrient-calculator`'s EC/PPM
conversion, baseline-corrected dosing, dilution, and crop EC/pH reference
chart, run before shipping (2026-09-11). WebFetch was denied to both the
building session and the reviewing agent, so all figures are WebSearch
synthesis, not a direct read of primary PDFs — flagged per-finding below.

## Critical findings — fixed

1. **Baseline-correction direction risked over-fertilization without a
   caveat.** `targetMeterReading` (nutrient EC + baseline) is only correct
   when a chart's target assumes near-zero source water; applied blindly
   to this project's own total-EC reference chart, it could push a user
   ~30-50% above the cited target. **Fix:** added explicit caveats in the
   lib header comment, the form's result text, and the page FAQ telling
   users to check which convention their own chart uses before adding
   baseline on top.
2. **Meter-brand-to-scale claims were wrong.** The original text said the
   640 scale was "Hanna/KCl" and that Bluelab/"European" brands use 700 as
   a "European" convention. Per Hanna's own DiST datasheets (factor 0.5)
   and Eutech's conductivity-to-TDS reference, Hanna's pocket testers are
   on the 500 scale, not 640; "640" is a generic unknown-standard default,
   not tied to a specific brand; Bluelab is New Zealand-made, and its own
   support documentation calls 700 "KCl-based" — directly conflicting with
   the chemistry reference's "640 = KCl" framing, a genuine industry
   naming inconsistency. **Fix:** rewrote `lib/ec-ppm-converter.ts`'s
   header and the page FAQ to cite only datasheet-confirmed facts (Hanna
   DiST = 500, factor 0.5), state the 640 scale as a generic default
   rather than a brand claim, and explicitly warn that "KCl"/"NaCl"/"442"
   labels are used inconsistently across manufacturers — check your
   meter's numeric factor, not a chemistry-standard name.

## High findings — fixed

3. **Lettuce pH (5.5-6.5) matched neither cited source.** OK State and UF
   IFAS both reportedly cite 6.0-7.0 for home systems; Cornell's CEA
   commercial handbook cites 5.6-6.0. **Fix:** changed to 5.6-6.5 (spanning
   both) with an explicit per-row note disclosing the disagreement and
   recommending the lower half for long-running systems, rather than
   presenting one silently-chosen number as settled.
4. **Tomato EC (2.0-2.4) was Ohio State's early-to-established range
   misattributed as if representative of the whole crop cycle, and too
   narrow for fruiting.** **Fix:** widened to 2.0-3.5 with a note that EC
   should rise from seedling to fruiting rather than holding one number;
   corrected the header comment's attribution.
5. **The "feeder type" (light/moderate/heavy) column was an unsourced
   editorial classification that contradicted the table's own EC data**
   (e.g. cucumber "heavy" had a lower EC ceiling than spinach "moderate").
   **Fix:** removed the column entirely; replaced with a per-crop `note`
   field carrying only claims traceable to a real source or explicitly
   labeled as general growing practice (e.g. pepper/cucumber's
   fruiting-stage EC increase).
6. **The page FAQ pointed to a `docs/domain-reference.md` that didn't
   exist yet** (this file) and exposed internal build-process detail
   ("WebFetch was unavailable when this was built") to public visitors.
   **Fix:** this file now exists; FAQ wording rewritten to describe the
   sourcing method in reader-facing terms rather than session-internal
   detail.

## Medium findings — fixed

7. **"Overshooting" was backwards.** Ignoring baseline and mixing only to
   a chart's total target *undershoots* true nutrient concentration (some
   of the reading is baseline, not nutrient) — the original comment and
   UI text said the opposite, and the page FAQ then contradicted itself
   mid-sentence trying to correct for it. Fixed consistently in the lib
   header, form result text, and FAQ.
8. **No temperature/ATC caveat** in an EC-based tool, despite ~2%/°C
   sensitivity potentially rivaling the baseline correction itself. Added
   to the lib header and FAQ.
9. **EC additivity asserted without caveat.** Simple addition is a
   reasonable approximation at hydroponic strengths but not exact —
   concentrated nutrient into hard water can precipitate some calcium/
   magnesium out of solution. Added a caveat to the lib header noting this
   and recommending re-measuring the actual mixed solution.
10. **Dilution tool framing was incomplete** — didn't mention that an
    already-full reservoir needs volume removed before adding more, or
    that dilution doesn't fix pH/nutrient ratios. Added both to the FAQ.

## Low findings — addressed where in scope

- Fixed the RO-water overstatement ("Tap and RO water aren't EC-zero" →
  RO is described as usually near-zero, check rather than assume).
- Added an over-fertilization-risk FAQ entry (osmotic stress, wilting in
  wet media, leaf-margin necrosis, "EC creep" over time between refills).
- Dropped the uncorroborated "650" hedge from the scale description.
- Not addressed this run (logged for a future pass, not blocking): adding
  a CF-scale (EC×10) option, and breaking the reference table out by
  growth stage rather than one range per crop — a real but larger scope
  change than a single-day fix.

## What's already well-grounded

- The core EC↔PPM conversion arithmetic (ppm = EC × scale) and the ~40%
  spread between the 500 and 700 scales for the same reading.
- The dilution formula's derivation (verified algebraically: C₁V₁ +
  C_water·V_added = C₂(V₁+V_added)) and both its error guards.
- Asking for the dilution water's own EC instead of assuming it's zero.
- The "just track EC instead of PPM" advice.
- The baseline-measurement practice itself (measure per fresh fill,
  account for seasonal variation).
- Five of seven crops' EC ranges (lettuce, spinach, basil, cucumber,
  pepper) matched the cited OK State source without correction needed.

## Confidence and remaining gaps

WebFetch was unavailable to both the building session and the reviewing
agent — no primary PDF (OK State HLA-6722, UF IFAS HS1422, Ohio State
HYG-1437, the Cornell CEA handbook) was read directly by either. All
figures here are WebSearch-result synthesis, cross-checked across
multiple independent passes and sources per figure, which is a real but
imperfect substitute for reading the source documents. The OK State
tomato figure specifically returned inconsistent numbers (2.0-4.0 in one
search pass, 2.0-5.0 in another) across the reviewing agent's own
searches — treat that specific upper bound as the least certain figure in
the table. A future session with WebFetch access should verify the full
table against the primary documents directly.
