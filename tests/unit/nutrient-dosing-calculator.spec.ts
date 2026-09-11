import { describe, expect, it } from "vitest";
import {
  NutrientDosingError,
  dilutionVolume,
  targetMeterReading,
} from "@/lib/nutrient-dosing-calculator";

describe("targetMeterReading", () => {
  it("adds the source baseline to the desired nutrient EC", () => {
    expect(targetMeterReading(1.4, 0.3)).toBeCloseTo(1.7, 8);
  });

  it("handles a zero baseline (pure RO water)", () => {
    expect(targetMeterReading(1.4, 0)).toBeCloseTo(1.4, 8);
  });

  it("rejects a negative desired EC", () => {
    expect(() => targetMeterReading(-1, 0.3)).toThrow(NutrientDosingError);
  });

  it("rejects a negative baseline", () => {
    expect(() => targetMeterReading(1.4, -0.1)).toThrow(NutrientDosingError);
  });
});

describe("dilutionVolume", () => {
  it("computes the added volume via the mass-balance dilution equation", () => {
    // 10 gal at EC 2.0, source water EC 0.2, target 1.6:
    // added = 10 * (2.0 - 1.6) / (1.6 - 0.2) = 10 * 0.4 / 1.4 ≈ 2.857
    const result = dilutionVolume(10, 2.0, 1.6, 0.2);
    expect(result.addedVolume).toBeCloseTo(2.857142857, 6);
    expect(result.finalVolume).toBeCloseTo(12.857142857, 6);
  });

  it("handles zero-EC dilution water (pure RO) as a simpler case", () => {
    // 10 gal at EC 2.0 diluted with 0-EC water to target 1.0:
    // added = 10 * (2.0 - 1.0) / (1.0 - 0) = 10
    const result = dilutionVolume(10, 2.0, 1.0, 0);
    expect(result.addedVolume).toBeCloseTo(10, 8);
  });

  it("throws if target EC is not below current EC", () => {
    expect(() => dilutionVolume(10, 1.0, 1.0, 0.1)).toThrow(NutrientDosingError);
    expect(() => dilutionVolume(10, 1.0, 1.5, 0.1)).toThrow(NutrientDosingError);
  });

  it("throws if target EC is not above the source water's own baseline", () => {
    expect(() => dilutionVolume(10, 2.0, 0.2, 0.2)).toThrow(NutrientDosingError);
    expect(() => dilutionVolume(10, 2.0, 0.1, 0.2)).toThrow(NutrientDosingError);
  });

  it("rejects a non-positive current volume", () => {
    expect(() => dilutionVolume(0, 2.0, 1.0, 0)).toThrow(NutrientDosingError);
    expect(() => dilutionVolume(-5, 2.0, 1.0, 0)).toThrow(NutrientDosingError);
  });
});
