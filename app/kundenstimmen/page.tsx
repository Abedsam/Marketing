import type { Metadata } from "next";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { ReviewMarquee, type Review } from "@/components/review-marquee";

export const metadata: Metadata = {
  title: "Kundenstimmen",
  description:
    "Auftraggeber aus Versicherung, Handel und Charity arbeiten teils seit über einem Jahrzehnt mit Direct Line. 4,5 von 5 Sternen auf Google.",
};

const REVIEWS: Review[] = [
  {
    author: "Abel Von Lindern",
    source: "vor 7 Monaten",
    text: "Seitdem ich hier bin, habe ich ausschließlich positive Erfahrungen gemacht – mit den Kolleginnen und Kollegen wie mit der Führungsebene.",
  },
  {
    author: "Mherre Rasulli",
    source: "vor einem Jahr",
    text: "Hier trifft man wirklich nur auf nette und hilfsbereite Kollegen, da fühlt man sich sofort gut aufgehoben.",
  },
  {
    author: "Priscilla",
    source: "vor 9 Monaten",
    text: "Ganz nette Mitarbeiter und tolle Leiter bzw. Chefs. Ist auf jeden Fall weiterzuempfehlen.",
  },
  {
    author: "Tobias Frank",
    source: "vor 7 Monaten",
    text: "Sehr freundliche Mitarbeiter, immer sehr respektvoll und professionell.",
  },
  {
    author: "Pia F.",
    source: "vor 4 Jahren",
    text: "Die Firma ist einfach top. Man fühlt sich sehr gut aufgehoben und die getane Arbeit wird geschätzt.",
  },
  {
    author: "Inna J",
    source: "vor 2 Wochen",
    text: "Ich hatte ein super nettes Gespräch mit Herrn Bernd Standhardt – ein toller Recruiter und absolut sympathischer Mensch.",
  },
  {
    author: "Stephan Ring",
    source: "Google",
    text: "Kann ich nur empfehlen. Wurde herzlich aufgenommen, alle Kollegen helfen gern weiter.",
  },
  {
    author: "Henna Havenna",
    source: "Local Guide",
    text: "Bestes Callcenter in Hamburg.",
  },
  {
    author: "Karsten Gruendling",
    source: "Google",
    text: "Freundlich und sehr zuvorkommend.",
  },
  {
    author: "B. R.",
    source: "Google",
    text: "Super nette Kollegen.",
  },
];

const SEALS = [2022, 2023, 2024];

export default function KundenstimmenPage() {
  return (
    <>
      <section
        data-globe="28,84,0.75"
        className="relative flex min-h-[60vh] items-center px-5 py-24 sm:px-8"
      >
        <div className="w-full mx-auto max-w-[1280px]">
          <RevealOnScroll>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-dl-burgundy">
              Kundenstimmen
            </p>
            <h1 className="mt-6 max-w-[20ch] text-[clamp(2.2rem,5vw,3.6rem)]">
              Verlass ist keine Behauptung.
            </h1>
            <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-dl-ink/70">
              Auftraggeber aus Versicherung, Handel und Charity arbeiten
              teils seit über einem Jahrzehnt mit uns.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <span className="font-serif text-4xl text-dl-ink">4,5</span>
              <div>
                <p className="text-dl-burgundy">★★★★★</p>
                <p className="text-sm text-dl-ink/60">
                  27 Bewertungen auf Google
                </p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <section className="relative border-t border-dl-ink/8 bg-dl-cream px-5 py-24 sm:px-8">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-5">
          <ReviewMarquee reviews={REVIEWS} speed={80} />
          <ReviewMarquee reviews={REVIEWS} reverse speed={88} />
        </div>
      </section>

      <section className="relative border-t border-dl-ink/8 bg-dl-cream px-5 py-16 sm:px-8">
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-center gap-10">
          {SEALS.map((year) => (
            <RevealOnScroll key={year}>
              <div className="flex flex-col items-center gap-1 rounded-[2px] border border-dl-ink/10 px-8 py-6 text-center">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-dl-ink/50">
                  kununu
                </span>
                <span className="font-serif text-lg">Top Company</span>
                <span className="font-mono text-sm text-dl-burgundy">
                  {year}
                </span>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>
    </>
  );
}
