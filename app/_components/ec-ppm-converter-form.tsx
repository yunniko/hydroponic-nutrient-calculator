"use client";

import { useMemo, useState } from "react";
import {
  EcPpmConverterError,
  PPM_SCALES,
  ecToPpm,
  ppmToEc,
  type PpmScale,
} from "@/lib/ec-ppm-converter";

type Direction = "ecToPpm" | "ppmToEc";

function round(n: number, decimals = 0): number {
  const factor = 10 ** decimals;
  return Math.round(n * factor) / factor;
}

export function EcPpmConverterForm() {
  const [direction, setDirection] = useState<Direction>("ecToPpm");
  const [value, setValue] = useState("1.4");
  const [scale, setScale] = useState<PpmScale>(500);

  const result = useMemo(() => {
    try {
      const numeric = Number(value);
      const converted =
        direction === "ecToPpm" ? ecToPpm(numeric, scale) : ppmToEc(numeric, scale);
      return { error: null as string | null, value: converted };
    } catch (e) {
      return {
        error: e instanceof EcPpmConverterError ? e.message : "Invalid input.",
        value: null,
      };
    }
  }, [direction, value, scale]);

  const allScales = useMemo(() => {
    try {
      const numeric = Number(value);
      if (!Number.isFinite(numeric) || numeric < 0) return null;
      return PPM_SCALES.map((s) => ({
        scale: s,
        ppm: direction === "ecToPpm" ? ecToPpm(numeric, s) : ecToPpm(ppmToEc(numeric, scale), s),
      }));
    } catch {
      return null;
    }
  }, [direction, value, scale]);

  return (
    <div className="rounded-lg border border-gray-200 p-6">
      <div className="flex flex-wrap gap-3">
        <label className="flex flex-col gap-1">
          <span className="text-sm text-gray-600">Convert</span>
          <select
            className="w-40 rounded border border-gray-300 px-3 py-2"
            value={direction}
            onChange={(e) => setDirection(e.target.value as Direction)}
            aria-label="Conversion direction"
          >
            <option value="ecToPpm">EC → PPM</option>
            <option value="ppmToEc">PPM → EC</option>
          </select>
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm text-gray-600">
            {direction === "ecToPpm" ? "EC (mS/cm)" : "PPM"}
          </span>
          <input
            className="w-32 rounded border border-gray-300 px-3 py-2"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            aria-label={direction === "ecToPpm" ? "EC in mS/cm" : "PPM"}
            inputMode="decimal"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm text-gray-600">Meter scale</span>
          <select
            className="w-32 rounded border border-gray-300 px-3 py-2"
            value={scale}
            onChange={(e) => setScale(Number(e.target.value) as PpmScale)}
            aria-label="Meter scale"
          >
            {PPM_SCALES.map((s) => (
              <option key={s} value={s}>
                {s} scale
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-6" data-testid="result">
        {result.error ? (
          <p className="text-red-600" role="alert">
            {result.error}
          </p>
        ) : (
          <div className="rounded-lg bg-gray-50 p-4">
            <p className="text-lg">
              Result:{" "}
              <span className="font-semibold">
                {direction === "ecToPpm"
                  ? `${round(result.value!, 0)} ppm`
                  : `${round(result.value!, 3)} mS/cm`}
              </span>{" "}
              on the {scale} scale
            </p>
            {allScales && (
              <p className="mt-2 text-sm text-gray-600" data-testid="all-scales">
                Same reading on other scales:{" "}
                {allScales
                  .filter((s) => s.scale !== scale)
                  .map((s) => `${s.scale} scale: ${round(s.ppm, 0)} ppm`)
                  .join(", ")}
                . Mixing these up is a common, real cause of over- or under-fertilizing — always
                confirm which scale your own meter uses.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
