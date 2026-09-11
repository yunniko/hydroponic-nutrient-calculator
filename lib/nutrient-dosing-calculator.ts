// Two calculations around real hydroponic water-chemistry practice.
//
// targetMeterReading: your tap/well source water already has its own
// baseline EC (dissolved minerals, mainly calcium/magnesium/bicarbonates)
// before any nutrient is added. Many published feeding-chart and extension
// EC targets are measured/formulated using near-zero-EC water (RO or
// treated), so if your own source water has real baseline EC and you mix
// only up to the chart's total number, you actually *undershoot* the
// intended nutrient strength by however much of that number your baseline
// water already accounts for. This function adds your measured baseline
// onto the chart's target so the reading you mix toward reflects the
// intended nutrient dose. Important caveat this tool cannot check for
// you: this only applies if your chart's number assumes near-zero source
// water — if your specific chart or nutrient brand already tells you to
// mix to a fixed *total* reading regardless of source water, don't add
// baseline on top of that number too. When in doubt, check your nutrient
// brand's own documentation for which convention it uses. Sources:
// Botanicare "Mixing Nutrients - A Beginner's Guide" (botanicare.com/
// hydro-101), Dosatron "How to Control EC in Hydroponics" (dosatron.com),
// AGEYE "Nutrient Management 101" (ageyetech.com).
//
// Both calculations treat EC as simply additive (baseline + nutrient, or
// linear in concentration for dilution). That's a reasonable approximation
// at typical hydroponic strengths, but real solution conductivity isn't
// perfectly linear at higher concentrations, and mixing concentrated
// nutrient into hard (high-baseline) water can precipitate some calcium/
// magnesium salts out of solution — which changes the true nutrient
// content without necessarily showing up as an EC discrepancy. Always
// re-measure your actual mixed solution rather than trusting the
// calculated number alone, and take EC readings at a similar temperature
// (or with a meter that has automatic temperature compensation) — EC
// varies roughly 2% per °C, which can rival the baseline correction
// itself if readings are taken at very different temperatures.
//
// dilutionVolume: a standard conservation-of-mass dilution calculation
// (C1*V1 + Cwater*Vadd = C2*(V1+Vadd), solved for Vadd) for lowering an
// over-strength reservoir back to a target EC by adding more source water
// — ordinary solution chemistry, not brand-specific. If your reservoir is
// already at capacity, you'll need to remove some volume before adding
// more water rather than overflowing it. Dilution corrects EC but not
// nutrient ratios or pH — diluting with alkaline tap water can shift pH
// upward, so re-check pH after diluting.
export class NutrientDosingError extends Error {}

function assertNonNegativeFinite(value: number, label: string): void {
  if (!Number.isFinite(value) || value < 0) {
    throw new NutrientDosingError(`${label} must be a non-negative number.`);
  }
}

function assertPositiveFinite(value: number, label: string): void {
  if (!Number.isFinite(value) || value <= 0) {
    throw new NutrientDosingError(`${label} must be a positive number.`);
  }
}

/**
 * Returns the total EC reading to aim for (nutrient target + source water
 * baseline), in the same units as the inputs (mS/cm or ppm, consistently).
 */
export function targetMeterReading(
  desiredNutrientEc: number,
  sourceBaselineEc: number,
): number {
  assertNonNegativeFinite(desiredNutrientEc, "Desired nutrient EC");
  assertNonNegativeFinite(sourceBaselineEc, "Source water baseline EC");
  return desiredNutrientEc + sourceBaselineEc;
}

export interface DilutionResult {
  /** Volume of source water to add, in the same units as currentVolume. */
  addedVolume: number;
  /** Total reservoir volume after dilution. */
  finalVolume: number;
}

/**
 * Computes how much additional source water to add to an over-strength
 * reservoir to bring it down to a target EC, accounting for the source
 * water's own baseline EC (not assumed to be zero).
 */
export function dilutionVolume(
  currentVolume: number,
  currentEc: number,
  targetEc: number,
  sourceWaterEc: number,
): DilutionResult {
  assertPositiveFinite(currentVolume, "Current reservoir volume");
  assertNonNegativeFinite(currentEc, "Current EC");
  assertNonNegativeFinite(targetEc, "Target EC");
  assertNonNegativeFinite(sourceWaterEc, "Source water EC");

  if (targetEc >= currentEc) {
    throw new NutrientDosingError(
      "Target EC must be lower than the current EC — dilution only reduces concentration.",
    );
  }
  if (targetEc <= sourceWaterEc) {
    throw new NutrientDosingError(
      "Target EC must be higher than your source water's own baseline EC — diluting with this water can't reach a lower reading than the water itself.",
    );
  }

  const addedVolume =
    (currentVolume * (currentEc - targetEc)) / (targetEc - sourceWaterEc);
  return {
    addedVolume,
    finalVolume: currentVolume + addedVolume,
  };
}
