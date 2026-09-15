import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum",
};

export default function ImpressumPage() {
  return (
    <section className="px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-[760px]">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-dl-burgundy">
          Rechtliches
        </p>
        <h1 className="mt-6 text-[clamp(2rem,4vw,2.8rem)]">Impressum</h1>
        <div className="mt-8 flex flex-col gap-2 text-dl-ink/80">
          <p>Direct Line Marketing und Kommunikation GmbH</p>
          <p>Süderstraße 77, 20097 Hamburg</p>
          <p>Geschäftsführer: Matthias Malik</p>
          <p>
            Telefon: +49 (0)40 / 27 14 7-0 ·{" "}
            <a
              href="mailto:info@directline-marketing.de"
              className="text-dl-burgundy"
            >
              info@directline-marketing.de
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
