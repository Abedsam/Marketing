import type { Metadata } from "next";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Stellenangebote",
  description:
    "Festanstellung in Vollzeit, echte Aufstiegschancen, Schulungen von Tag eins – mitten in Hamburg an der Süderstraße.",
};

const JOBS = [
  {
    title: "Call-Center-Agent (m/w/d) Inbound",
    meta: "Vollzeit · Hamburg · ab sofort",
  },
  {
    title: "Call-Center-Agent (m/w/d) Outbound",
    meta: "Vollzeit · Hamburg · ab sofort",
  },
  {
    title: "Teamleitung Kundenservice (m/w/d)",
    meta: "Vollzeit · Hamburg · ab sofort",
  },
];

export default function StellenangebotePage() {
  return (
    <>
      <section
        data-globe="30,82,0.8"
        className="relative flex min-h-[60vh] items-center px-5 py-24 sm:px-8"
      >
        <div className="mx-auto max-w-[1280px]">
          <RevealOnScroll>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-dl-burgundy">
              Stellenangebote
            </p>
            <h1 className="mt-6 max-w-[20ch] text-[clamp(2.2rem,5vw,3.6rem)]">
              Reden können viele. Du kannst zuhören.
            </h1>
            <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-dl-ink/70">
              Festanstellung in Vollzeit, echte Aufstiegschancen, Schulungen
              von Tag eins – mitten in Hamburg an der Süderstraße.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <section className="relative border-t border-dl-ink/8 bg-dl-cream px-5 py-24 sm:px-8">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-6">
          {JOBS.map((job, i) => (
            <RevealOnScroll key={job.title} delay={i * 80}>
              <div className="flex flex-wrap items-center justify-between gap-4 rounded-[2px] border border-dl-ink/10 bg-white/50 p-8">
                <div>
                  <h3 className="text-xl">{job.title}</h3>
                  <p className="mt-1 text-sm text-dl-ink/60">
                    {job.meta}
                  </p>
                </div>
                <Button asChild>
                  <a href="mailto:personal@directline-marketing.de">
                    Bewerben
                  </a>
                </Button>
              </div>
            </RevealOnScroll>
          ))}

          <RevealOnScroll delay={240}>
            <p className="mt-4 text-sm text-dl-ink/60">
              Ansprechpartner: Bernd Standhardt · 040 / 27 14 7-212 ·{" "}
              <a
                href="mailto:personal@directline-marketing.de"
                className="text-dl-burgundy"
              >
                personal@directline-marketing.de
              </a>
            </p>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
