import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AGB",
};

export default function AgbPage() {
  return (
    <section className="px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-[760px]">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-dl-burgundy">
          Rechtliches
        </p>
        <h1 className="mt-6 text-[clamp(2rem,4vw,2.8rem)]">AGB</h1>
        <p className="mt-8 text-dl-ink/70">
          Allgemeine Geschäftsbedingungen der bestehenden Website übernehmen.
          Platzhalter – rechtlich geprüften Text einsetzen.
        </p>
      </div>
    </section>
  );
}
