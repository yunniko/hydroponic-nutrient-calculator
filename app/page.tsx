import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hydroponic Nutrient Calculator",
  description:
    "Free tools for hydroponic growers: an EC/PPM meter-scale converter, a baseline-water-corrected nutrient dosing and dilution calculator, and a sourced target EC/pH reference chart by crop.",
};

const TOOLS = [
  {
    href: "/ec-ppm-converter",
    title: "EC / PPM converter",
    description:
      "Convert between EC (mS/cm) and PPM under the 500, 640, or 700 meter scale — the same reading means very different ppm numbers depending on your meter.",
  },
  {
    href: "/nutrient-dosing-calculator",
    title: "Nutrient dosing & dilution calculator",
    description:
      "Find the total meter reading to aim for after accounting for your source water's own baseline EC, or how much water to add to dilute an over-strength reservoir.",
  },
  {
    href: "/hydroponic-ec-reference",
    title: "Crop EC / pH reference chart",
    description:
      "Sourced target EC and pH ranges by crop, from university extension hydroponics guides.",
  },
];

export default function Home() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-3xl font-semibold">Hydroponic Nutrient Calculator</h1>
      <p className="mt-3 text-gray-600">
        Free tools for hydroponic growers — an EC/PPM scale converter, a baseline-corrected
        dosing and dilution calculator, and a sourced crop EC/pH reference chart.
      </p>

      <div className="mt-6 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
        <strong>Before you dose a reservoir:</strong> these are planning aids based on published
        conversion factors and university extension guidance, not a substitute for your own
        meter readings or your nutrient brand&rsquo;s own feeding chart. Always confirm your
        meter&rsquo;s actual conversion scale in its manual — see the{" "}
        <Link href="/ec-ppm-converter" className="underline">
          EC/PPM converter
        </Link>{" "}
        page for why that matters.
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {TOOLS.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            data-testid={`tool-card-${tool.href.slice(1)}`}
            className="rounded-lg border border-gray-200 p-5 hover:border-gray-400"
          >
            <h2 className="font-semibold text-blue-700">{tool.title}</h2>
            <p className="mt-1 text-sm text-gray-600">{tool.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
