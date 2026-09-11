import type { Metadata } from "next";
import Link from "next/link";
import { NutrientDosingCalculatorForm } from "../_components/nutrient-dosing-calculator-form";
import { JsonLd } from "@/lib/json-ld";

export const metadata: Metadata = {
  title: "Nutrient Dosing & Dilution Calculator",
  description:
    "Find the total meter reading to aim for after accounting for your source water's baseline EC, or how much water to add to dilute an over-strength hydroponic reservoir.",
};

const FAQ = [
  {
    question: "Why does my source water's baseline EC matter?",
    answer:
      "Tap water isn't EC-zero — dissolved minerals (mainly calcium, magnesium, and bicarbonates) already register on your meter before you add any nutrient (RO permeate is usually very close to zero, but check it rather than assume). If a feeding chart's target assumes near-zero source water and yours reads 0.3 mS/cm on its own, mixing only to the chart's 1.4 mS/cm total actually gives you just 1.1 mS/cm of real nutrient — an under-dose relative to what the chart intended, not an over-dose.",
  },
  {
    question: "How do I measure my source water's baseline EC?",
    answer:
      "Fill your reservoir with plain source water (no nutrient added yet) and take an EC reading before mixing anything in. Do this at the start of each fresh reservoir fill rather than assuming a fixed number — water chemistry can vary seasonally and between fills, especially with municipal tap water. Take both readings at a similar temperature, or use a meter with automatic temperature compensation — EC changes roughly 2% per °C, which can rival the baseline correction itself.",
  },
  {
    question: "Does the dilution calculator assume my dilution water is EC-zero?",
    answer:
      "No — it asks for your dilution water's own EC and accounts for it in the calculation, rather than assuming pure water. If you're diluting with true 0-EC RO water, just enter 0. Note that dilution corrects EC but not nutrient ratios or pH — recheck pH after diluting, especially with alkaline tap water.",
  },
  {
    question: "What does over-fertilizing actually do to my plants?",
    answer:
      "Excess EC causes osmotic stress: roots struggle to take up water against the concentrated solution, showing as wilting even in wet media, leaf-margin necrosis, and stunted growth. If a reservoir tests well above target, dilute promptly rather than waiting — and expect reservoir EC to drift upward over time between refills as plants take up water faster than dissolved salts (\"EC creep\"), so recheck periodically rather than only at mix time.",
  },
];

export default function Page() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }}
      />

      <nav className="mb-6 text-sm">
        <Link href="/" className="text-blue-600 hover:underline">
          ← All tools
        </Link>
      </nav>

      <h1 className="text-3xl font-semibold">Nutrient Dosing &amp; Dilution Calculator</h1>
      <p className="mt-3 text-gray-600">
        Correct your target EC for your source water&rsquo;s baseline, or figure out how much water to
        add to bring an over-strength reservoir back down.
      </p>

      <div className="mt-6">
        <NutrientDosingCalculatorForm />
      </div>

      <p className="mt-4 text-sm text-gray-500">
        Check crop-specific target EC ranges on the{" "}
        <Link href="/hydroponic-ec-reference" className="underline">
          EC/pH reference chart
        </Link>
        , and convert between EC and PPM on the{" "}
        <Link href="/ec-ppm-converter" className="underline">
          EC/PPM converter
        </Link>
        .
      </p>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Frequently asked questions</h2>
        <dl className="mt-3 space-y-4">
          {FAQ.map((item) => (
            <div key={item.question}>
              <dt className="font-medium text-gray-900">{item.question}</dt>
              <dd className="mt-1 text-gray-600">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </section>
    </main>
  );
}
