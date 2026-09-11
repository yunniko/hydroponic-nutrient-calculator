import type { Metadata } from "next";
import Link from "next/link";
import { CROP_EC_REFERENCE } from "@/lib/hydroponic-ec-reference";
import { JsonLd } from "@/lib/json-ld";

export const metadata: Metadata = {
  title: "Hydroponic Crop EC / pH Reference Chart",
  description:
    "Sourced target EC (mS/cm) and pH ranges by crop for hydroponic nutrient solutions, from university extension hydroponics guides.",
};

const FAQ = [
  {
    question: "Where does this data come from?",
    answer:
      "Primarily Oklahoma State University Extension's \"Electrical Conductivity and pH Guide for Hydroponics\" fact sheet, cross-corroborated for lettuce against University of Florida IFAS, for tomato against Ohio State University Extension, and for lettuce pH additionally against Cornell's CEA lettuce handbook. WebFetch to the primary documents wasn't available while building this, so figures came from search-result synthesis and a domain-expert review rather than reading every source document directly — see this project's docs/domain-reference.md for the full review, including where sources genuinely disagreed, and lib/hydroponic-ec-reference.ts's header comment for per-crop citations.",
  },
  {
    question: "Why might my nutrient brand's feeding chart give different numbers?",
    answer:
      "Commercial nutrient lines (General Hydroponics, Masterblend, and others) tune their own feeding charts to their specific formulations and target ranges, which can reasonably differ from these general extension-sourced ranges. Treat this chart as a starting reference, not a replacement for your nutrient brand's own guidance.",
  },
  {
    question: "Why is there only one EC range per crop instead of one per growth stage?",
    answer:
      "Growth stage is genuinely the biggest factor in target EC — young/seedling plants tolerate much less than mature, fruiting plants of the same crop — and this chart doesn't yet break ranges out by stage. Where a source specifically noted this (tomato, pepper, cucumber), the per-crop note says so; treat the low end of a range as safer for young plants and the high end as more appropriate once a crop is established or fruiting.",
  },
];

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
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

      <h1 className="text-3xl font-semibold">Hydroponic Crop EC / pH Reference Chart</h1>
      <p className="mt-3 text-gray-600">
        Sourced target EC and pH ranges for {CROP_EC_REFERENCE.length} common hydroponic crops.
      </p>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="py-2 pr-4">Crop</th>
              <th className="py-2 pr-4">Target EC (mS/cm)</th>
              <th className="py-2 pr-4">Target pH</th>
              <th className="py-2">Note</th>
            </tr>
          </thead>
          <tbody>
            {CROP_EC_REFERENCE.map((c) => (
              <tr key={c.crop} className="border-b border-gray-100 align-top">
                <td className="py-2 pr-4 font-medium">{c.crop}</td>
                <td className="py-2 pr-4 whitespace-nowrap">
                  {c.ecMin}–{c.ecMax}
                </td>
                <td className="py-2 pr-4 whitespace-nowrap">
                  {c.phMin === c.phMax ? c.phMin : `${c.phMin}–${c.phMax}`}
                </td>
                <td className="py-2 text-gray-600">{c.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-sm text-gray-500">
        Use these ranges with the{" "}
        <Link href="/nutrient-dosing-calculator" className="underline">
          nutrient dosing calculator
        </Link>{" "}
        to find your total target meter reading after accounting for your source water.
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
