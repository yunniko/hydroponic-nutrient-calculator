// Target EC (mS/cm) and pH ranges by crop for hydroponic nutrient
// solutions. Sourced via WebSearch-result synthesis (WebFetch to the
// primary documents was denied in this environment, so these figures were
// cross-corroborated across multiple search passes rather than read
// directly from source PDFs — see docs/domain-reference.md for the full
// review, including where sources disagreed).
//
// Primary sources per figure:
//  - Lettuce, Spinach, Basil, Pepper, Cucumber, Strawberry EC: Oklahoma
//    State University Extension, "Electrical Conductivity and pH Guide
//    for Hydroponics" (HLA-6722, extension.okstate.edu).
//  - Lettuce pH: OK State and University of Florida IFAS (HS1422) both
//    cite 6.0-7.0 for home hydroponic systems; Cornell's CEA commercial
//    lettuce handbook recommends a tighter 5.6-6.0 for better iron
//    availability at higher pH. These sources genuinely disagree — the
//    range below spans both, with a note flagging it per-row rather than
//    picking one silently.
//  - Tomato EC: Ohio State University Extension (HYG-1437, ohioline.osu.
//    edu) reports ~2.0 dS/m at early growth rising toward 2.4+ dS/m at
//    fruiting; OK State's own tomato figures run higher still in some
//    citations. The range below spans early-to-fruiting rather than
//    quoting one stage as if it were constant.
//
// This is a starting reference, not a substitute for a crop-specific
// feeding program or your nutrient brand's own chart — and none of these
// ranges are broken out by growth stage, which extension sources
// generally agree matters more than any other single factor (young
// plants tolerate less EC than mature, fruiting plants of the same crop).
export interface CropEcTarget {
  crop: string;
  ecMin: number;
  ecMax: number;
  phMin: number;
  phMax: number;
  note: string;
}

export const CROP_EC_REFERENCE: CropEcTarget[] = [
  {
    crop: "Lettuce",
    ecMin: 1.2,
    ecMax: 1.8,
    phMin: 5.6,
    phMax: 6.5,
    note: "pH sources disagree: extension guides cite 6.0-7.0, Cornell's commercial handbook cites 5.6-6.0. Lean toward the lower half for long-running systems.",
  },
  {
    crop: "Spinach",
    ecMin: 1.8,
    ecMax: 2.3,
    phMin: 6.0,
    phMax: 7.0,
    note: "Reflects vegetative growth; not broken out by growth stage.",
  },
  {
    crop: "Basil",
    ecMin: 1.0,
    ecMax: 1.6,
    phMin: 5.5,
    phMax: 6.0,
    note: "Sensitive to EC above this range — favor the low end for cuttings and young plants.",
  },
  {
    crop: "Tomato",
    ecMin: 2.0,
    ecMax: 3.5,
    phMin: 6.0,
    phMax: 6.5,
    note: "Spans early growth (~2.0) to flowering/fruiting (2.4-3.5+) — raise EC as the plant matures rather than holding one fixed number.",
  },
  {
    crop: "Pepper",
    ecMin: 0.8,
    ecMax: 1.8,
    phMin: 5.5,
    phMax: 6.0,
    note: "Reflects early growth; many growers raise EC toward 2.0-2.5+ once fruit set begins.",
  },
  {
    crop: "Cucumber",
    ecMin: 1.7,
    ecMax: 2.0,
    phMin: 5.0,
    phMax: 5.5,
    note: "Some growers run cucumber higher (up to ~2.5) during heavy fruiting.",
  },
  {
    crop: "Strawberry",
    ecMin: 1.8,
    ecMax: 2.2,
    phMin: 6.0,
    phMax: 6.0,
    note: "Source cites a single pH value (6.0) rather than a range.",
  },
];
