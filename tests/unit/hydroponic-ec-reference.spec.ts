import { describe, expect, it } from "vitest";
import { CROP_EC_REFERENCE } from "@/lib/hydroponic-ec-reference";

describe("CROP_EC_REFERENCE", () => {
  it("is non-empty", () => {
    expect(CROP_EC_REFERENCE.length).toBeGreaterThan(0);
  });

  it("has valid, internally consistent ranges for every crop", () => {
    for (const entry of CROP_EC_REFERENCE) {
      expect(entry.ecMin).toBeGreaterThan(0);
      expect(entry.ecMax).toBeGreaterThanOrEqual(entry.ecMin);
      expect(entry.phMin).toBeGreaterThan(0);
      expect(entry.phMax).toBeGreaterThanOrEqual(entry.phMin);
      expect(entry.note.length).toBeGreaterThan(0);
    }
  });

  it("has no duplicate crop names", () => {
    const names = CROP_EC_REFERENCE.map((entry) => entry.crop);
    expect(new Set(names).size).toBe(names.length);
  });
});
