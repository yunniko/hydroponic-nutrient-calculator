import { describe, expect, it } from "vitest";
import { EcPpmConverterError, ecToPpm, ppmToEc } from "@/lib/ec-ppm-converter";

describe("ecToPpm", () => {
  it("converts EC to PPM on the 500 scale", () => {
    expect(ecToPpm(1.0, 500)).toBeCloseTo(500, 5);
  });

  it("converts EC to PPM on the 640 scale", () => {
    expect(ecToPpm(1.0, 640)).toBeCloseTo(640, 5);
  });

  it("converts EC to PPM on the 700 scale", () => {
    expect(ecToPpm(1.4, 700)).toBeCloseTo(980, 5);
  });

  it("rejects negative EC", () => {
    expect(() => ecToPpm(-1, 500)).toThrow(EcPpmConverterError);
  });

  it("rejects non-finite EC", () => {
    expect(() => ecToPpm(NaN, 500)).toThrow(EcPpmConverterError);
  });
});

describe("ppmToEc", () => {
  it("converts PPM to EC on the 500 scale", () => {
    expect(ppmToEc(500, 500)).toBeCloseTo(1.0, 5);
  });

  it("converts PPM to EC on the 700 scale", () => {
    expect(ppmToEc(980, 700)).toBeCloseTo(1.4, 5);
  });

  it("round-trips through both scales' conversions", () => {
    const ec = 1.6;
    expect(ppmToEc(ecToPpm(ec, 640), 640)).toBeCloseTo(ec, 8);
  });

  it("shows the same EC reads very differently across scales", () => {
    const ec = 1.4;
    const ppm500 = ecToPpm(ec, 500);
    const ppm700 = ecToPpm(ec, 700);
    expect(ppm700 - ppm500).toBeCloseTo(280, 5);
  });

  it("rejects negative PPM", () => {
    expect(() => ppmToEc(-1, 500)).toThrow(EcPpmConverterError);
  });
});
