import type { Metadata } from "next";
import { RevealOnScroll } from "@/components/reveal-on-scroll";

export const metadata: Metadata = {
  title: "Über uns",
  description:
    "Seit 1995 an der Süderstraße: Direct Line verbindet zielorientiertes Telefonmarketing mit eigener IT-Kompetenz.",
};

const VALUES = [
  {
    title: "Erfahren und etabliert",
    text: "Bewährte Methodik trifft Multichannel: Telefon, E-Mail, Social Media – dort, wo Ihre Zielgruppe wirklich ist.",
  },
  {
    title: "Ein Team, das zusammenhält",
    text: "Flache Hierarchien, offene Kommunikation, engmaschige Betreuung. Dreimal in Folge als kununu Top Company ausgezeichnet.",
  },
  {
    title: "Zwei starke Töchter",
    text: "Direct Leads liefert qualifizierte OPT-IN-Adressen, Direct Job qualifizierte Agents. Beides aus eigener Hand.",
  },
];

export default function UeberUnsPage() {
  return (
    <>
      <section
        data-globe="34,80,0.9"
        className="relative flex min-h-[60vh] items-center px-5 py-24 sm:px-8"
      >
        <div className="w-full mx-auto max-w-[1280px]">
          <RevealOnScroll>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-dl-burgundy">
              Über uns
            </p>
            <h1 className="mt-6 max-w-[20ch] text-[clamp(2.2rem,5vw,3.6rem)]">
              Seit 1995 an der Süderstraße.
            </h1>
            <p className="mt-6 max-w-[64ch] text-lg leading-relaxed text-dl-ink/70">
              Gegründet von Matthias Malik, gewachsen mit Hamburger
              Handschlag-Mentalität: Direct Line verbindet zielorientiertes
              Telefonmarketing mit eigener IT-Kompetenz – und bleibt dabei
              ein Haus, in dem man sich kennt.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <section className="relative border-t border-dl-ink/8 bg-dl-cream px-5 py-24 sm:px-8">
        <div className="mx-auto grid max-w-[1280px] gap-8 md:grid-cols-3">
          {VALUES.map((value, i) => (
            <RevealOnScroll key={value.title} delay={i * 80}>
              <div className="flex h-full flex-col gap-3 rounded-[2px] border border-dl-ink/10 bg-white/50 p-8">
                <h3 className="text-xl">{value.title}</h3>
                <p className="text-sm leading-relaxed text-dl-ink/70">
                  {value.text}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      <section
        data-globe="52,50,2.0"
        data-globe-dark="true"
        className="relative overflow-hidden bg-dl-plum px-5 py-24 text-dl-text-on-dark sm:px-8"
      >
        <div className="relative z-10 mx-auto max-w-[900px] text-center">
          <RevealOnScroll>
            <p className="font-serif text-[clamp(1.6rem,3vw,2.2rem)] italic text-dl-text-on-dark">
              „In Kundenzufriedenheit zu investieren ist eine Investition, die
              sich immer auszahlt.“
            </p>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-dl-rose">
              Matthias Malik, Gründer &amp; Geschäftsführer
            </p>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
