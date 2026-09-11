// EC (electrical conductivity) and PPM (parts per million / "TDS") are two
// ways meters report the same dissolved-ion concentration in a nutrient
// solution. EC in mS/cm (millisiemens per centimeter) is what the sensor
// actually measures; PPM is a derived number obtained by multiplying EC by
// a fixed conversion factor. Three factors are in common commercial use —
// 500, 640, and 700 — but the trade names attached to them are used
// inconsistently across manufacturers, so this tool identifies them only
// by their number, not by a "chemical standard" name:
//   - 500 scale (~0.5 factor): the NaCl-standard-derived value; used by
//     HM Digital meters and Hanna Instruments' DiST pocket TDS testers
//     (both datasheet-confirmed at factor 0.5).
//   - 700 scale (~0.7 factor): derived from the "442"/Myron L "Natural
//     Water" standard; some Bluelab meters display a ppm700 reading
//     alongside ppm500 and EC.
//   - 640 scale (~0.64 factor): a generic default factor used by some
//     meters/references when the specific calibration standard isn't
//     stated — not reliably tied to one well-known brand.
// Do not trust a "KCl" or "NaCl" label on a meter or chart to tell you
// which number scale it uses: even manufacturers' own documentation
// disagrees on this (e.g. Bluelab's support site calls its 700 scale
// "KCl-based", which conflicts with the 640-scale KCl-derived factor used
// elsewhere) — always check the numeric conversion factor in your meter's
// own manual, not just a brand/chemistry name.
// Mixing up which scale your meter uses is a well-documented, real source
// of over/under-fertilization: the same 1.4 mS/cm reading is 700 ppm on
// the 500 scale but 980 ppm on the 700 scale — a 40% difference — so a
// feeding chart written for one scale gives a badly wrong dose read
// against a meter using another. Sources: Eutech Instruments "Conductivity
// to TDS Conversion Factors" (eutechinst.com/tips/contds/07.pdf), Hanna
// Instruments HI98301/HI98302 datasheets (factor 0.5), Bluelab "What are
// the different conductivity scales?" (support.bluelab.com).
export type PpmScale = 500 | 640 | 700;

export const PPM_SCALES: PpmScale[] = [500, 640, 700];

export class EcPpmConverterError extends Error {}

function assertNonNegativeFinite(value: number, label: string): void {
  if (!Number.isFinite(value) || value < 0) {
    throw new EcPpmConverterError(`${label} must be a non-negative number.`);
  }
}

/** Converts an EC reading in mS/cm to PPM under the given meter scale. */
export function ecToPpm(ecMScm: number, scale: PpmScale): number {
  assertNonNegativeFinite(ecMScm, "EC");
  return ecMScm * scale;
}

/** Converts a PPM/TDS reading to EC in mS/cm under the given meter scale. */
export function ppmToEc(ppm: number, scale: PpmScale): number {
  assertNonNegativeFinite(ppm, "PPM");
  return ppm / scale;
}
