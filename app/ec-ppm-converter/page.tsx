import type { Metadata } from "next";
import Link from "next/link";
import { EcPpmConverterForm } from "../_components/ec-ppm-converter-form";
import { JsonLd } from "@/lib/json-ld";

export const metadata: Metadata = {
  title: "EC to PPM Converter (500 / 640 / 700 Scale)",
  description:
    "Convert between EC (mS/cm) and PPM/TDS under the 500, 640, or 700 meter scale, and see how much the same reading differs across scales.",
};

const FAQ = [
  {
    question: "Why do EC and PPM readings from different meters disagree?",
    answer:
      "EC (electrical conductivity, in mS/cm) is what the sensor actually measures. PPM is a derived number obtained by multiplying EC by a conversion factor that varies by meter brand: commonly 500, 640 (sometimes shown as 650), or 700. The same 1.4 mS/cm reading is 700 ppm on a 500-scale meter but 980 ppm on a 700-scale meter — a real, well-documented source of nutrient dosing errors when a feeding chart written for one scale is read against a meter using another.",
  },
  {
    question: "Which scale does my meter use?",
    answer:
      "It depends on the brand and model — this tool doesn't detect it for you, and manufacturers' own \"chemical standard\" names for these scales (NaCl, KCl, 442) are used inconsistently, so don't rely on a label alone. HM Digital meters and Hanna Instruments' DiST pocket testers are datasheet-confirmed at the 500 scale (factor 0.5); some meters, including certain Bluelab models, also display a 700-scale reading. The 640 scale is a generic default some references use when the calibration standard isn't stated. Check your meter's manual for its actual numeric conversion factor.",
  },
  {
    question: "Should I just use EC instead of PPM?",
    answer:
      "Many experienced growers do exactly that, since EC has no scale ambiguity — it's the same physical measurement everywhere. If your nutrient brand's feeding chart is published in ppm, convert it to EC once using your meter's known scale, then track EC going forward.",
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

      <h1 className="text-3xl font-semibold">EC / PPM Converter</h1>
      <p className="mt-3 text-gray-600">
        Convert between EC and PPM, and see how the same reading looks on each of the three
        common meter scales.
      </p>

      <div className="mt-6">
        <EcPpmConverterForm />
      </div>

      <p className="mt-4 text-sm text-gray-500">
        Use the result with the{" "}
        <Link href="/nutrient-dosing-calculator" className="underline">
          nutrient dosing calculator
        </Link>{" "}
        to account for your source water&rsquo;s own baseline EC.
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
