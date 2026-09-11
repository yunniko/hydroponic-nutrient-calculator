"use client";

import { useMemo, useState } from "react";
import {
  NutrientDosingError,
  dilutionVolume,
  targetMeterReading,
} from "@/lib/nutrient-dosing-calculator";

type Mode = "target" | "dilute";

function round(n: number, decimals = 2): number {
  const factor = 10 ** decimals;
  return Math.round(n * factor) / factor;
}

export function NutrientDosingCalculatorForm() {
  const [mode, setMode] = useState<Mode>("target");

  // Target-reading mode inputs
  const [desiredEc, setDesiredEc] = useState("1.4");
  const [baselineEc, setBaselineEc] = useState("0.3");

  // Dilution mode inputs
  const [currentVolume, setCurrentVolume] = useState("10");
  const [currentEc, setCurrentEc] = useState("2.0");
  const [targetEc, setTargetEc] = useState("1.6");
  const [sourceWaterEc, setSourceWaterEc] = useState("0.3");

  const targetResult = useMemo(() => {
    try {
      return {
        error: null as string | null,
        value: targetMeterReading(Number(desiredEc), Number(baselineEc)),
      };
    } catch (e) {
      return {
        error: e instanceof NutrientDosingError ? e.message : "Invalid input.",
        value: null,
      };
    }
  }, [desiredEc, baselineEc]);

  const diluteResult = useMemo(() => {
    try {
      return {
        error: null as string | null,
        value: dilutionVolume(
          Number(currentVolume),
          Number(currentEc),
          Number(targetEc),
          Number(sourceWaterEc),
        ),
      };
    } catch (e) {
      return {
        error: e instanceof NutrientDosingError ? e.message : "Invalid input.",
        value: null,
      };
    }
  }, [currentVolume, currentEc, targetEc, sourceWaterEc]);

  return (
    <div className="rounded-lg border border-gray-200 p-6">
      <div className="flex gap-2">
        <button
          type="button"
          className={`rounded px-3 py-2 text-sm ${mode === "target" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"}`}
          onClick={() => setMode("target")}
        >
          Target reading (baseline-corrected)
        </button>
        <button
          type="button"
          className={`rounded px-3 py-2 text-sm ${mode === "dilute" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"}`}
          onClick={() => setMode("dilute")}
        >
          Dilute an over-strength reservoir
        </button>
      </div>

      {mode === "target" ? (
        <div className="mt-4">
          <div className="flex flex-wrap gap-3">
            <label className="flex flex-col gap-1">
              <span className="text-sm text-gray-600">Desired nutrient EC (mS/cm)</span>
              <input
                className="w-32 rounded border border-gray-300 px-3 py-2"
                value={desiredEc}
                onChange={(e) => setDesiredEc(e.target.value)}
                aria-label="Desired nutrient EC in mS/cm"
                inputMode="decimal"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm text-gray-600">Source water baseline EC (mS/cm)</span>
              <input
                className="w-32 rounded border border-gray-300 px-3 py-2"
                value={baselineEc}
                onChange={(e) => setBaselineEc(e.target.value)}
                aria-label="Source water baseline EC in mS/cm"
                inputMode="decimal"
              />
            </label>
          </div>
          <div className="mt-6" data-testid="result">
            {targetResult.error ? (
              <p className="text-red-600" role="alert">
                {targetResult.error}
              </p>
            ) : (
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-lg">
                  Aim for a total meter reading of{" "}
                  <span className="font-semibold">{round(targetResult.value!, 2)} mS/cm</span>
                </p>
                <p className="mt-2 text-sm text-gray-600">
                  Your meter can&rsquo;t tell baseline minerals apart from added nutrient. If your
                  chart&rsquo;s target assumes near-zero source water (common for extension/lab
                  figures), mixing only to that number <em>undershoots</em> the intended nutrient
                  strength by your baseline amount — this adds your baseline on top so the actual
                  nutrient concentration matches the chart. If your own chart already specifies a
                  fixed total reading regardless of source water, don&rsquo;t add baseline again on
                  top of it.
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="mt-4">
          <div className="flex flex-wrap gap-3">
            <label className="flex flex-col gap-1">
              <span className="text-sm text-gray-600">Current reservoir volume</span>
              <input
                className="w-28 rounded border border-gray-300 px-3 py-2"
                value={currentVolume}
                onChange={(e) => setCurrentVolume(e.target.value)}
                aria-label="Current reservoir volume"
                inputMode="decimal"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm text-gray-600">Current EC (mS/cm)</span>
              <input
                className="w-28 rounded border border-gray-300 px-3 py-2"
                value={currentEc}
                onChange={(e) => setCurrentEc(e.target.value)}
                aria-label="Current EC in mS/cm"
                inputMode="decimal"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm text-gray-600">Target EC (mS/cm)</span>
              <input
                className="w-28 rounded border border-gray-300 px-3 py-2"
                value={targetEc}
                onChange={(e) => setTargetEc(e.target.value)}
                aria-label="Target EC in mS/cm"
                inputMode="decimal"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm text-gray-600">Source (dilution) water EC (mS/cm)</span>
              <input
                className="w-28 rounded border border-gray-300 px-3 py-2"
                value={sourceWaterEc}
                onChange={(e) => setSourceWaterEc(e.target.value)}
                aria-label="Source water EC in mS/cm"
                inputMode="decimal"
              />
            </label>
          </div>
          <div className="mt-6" data-testid="result">
            {diluteResult.error ? (
              <p className="text-red-600" role="alert">
                {diluteResult.error}
              </p>
            ) : (
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-lg">
                  Add{" "}
                  <span className="font-semibold">
                    {round(diluteResult.value!.addedVolume, 2)}
                  </span>{" "}
                  more of your source water (new total:{" "}
                  {round(diluteResult.value!.finalVolume, 2)})
                </p>
                <p className="mt-2 text-sm text-gray-600">
                  Uses the standard conservation-of-mass dilution equation, accounting for your
                  dilution water&rsquo;s own EC rather than assuming it&rsquo;s zero.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
