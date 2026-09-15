import type { Metadata } from "next";
import { RevealOnScroll } from "@/components/reveal-on-scroll";

export const metadata: Metadata = {
  title: "Outbound",
  description:
    "In jedem Kontakt steckt die Chance auf eine Conversion – und das Risiko, einen Namen zu verbrennen. Direct Line behandelt beides mit Respekt.",
};

const CARDS = [
  {
    title: "Produkt- & Angebotsinformation",
    text: "Wir rufen in Ihrem Namen an und informieren Ihre Kunden über Neuerungen – vorbereitet, nicht vorgelesen.",
  },
  {
    title: "Adressqualifizierung",
    text: "Vor dem Mailing prüfen wir Ansprechpartner und Bedarf – und bringen Ihre Datenbank auf Stand.",
  },
  {
    title: "Terminierung",
    text: "Qualifizierte Termine für Ihren Außendienst – nach Ihren Kriterien, nicht nach unserer Statistik.",
  },
];

export default function OutboundPage() {
  return (
    <>
      <section
        data-globe="30,84,0.8"
        className="relative flex min-h-[60vh] items-center px-5 py-24 sm:px-8"
      >
        <div className="mx-auto max-w-[1280px]">
          <RevealOnScroll>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-dl-burgundy">
              Outbound
            </p>
            <h1 className="mt-6 max-w-[20ch] text-[clamp(2.2rem,5vw,3.6rem)]">
              Eine Frage des Fingerspitzengefühls.
            </h1>
            <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-dl-ink/70">
              In jedem Kontakt steckt die Chance auf eine Conversion – und das
              Risiko, einen Namen zu verbrennen. Wir behandeln beides mit
              Respekt.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <section className="relative border-t border-dl-ink/8 bg-dl-cream px-5 py-24 sm:px-8">
        <div className="mx-auto grid max-w-[1280px] gap-8 md:grid-cols-3">
          {CARDS.map((card, i) => (
            <RevealOnScroll key={card.title} delay={i * 80}>
              <div className="flex h-full flex-col gap-3 rounded-[2px] border border-dl-ink/10 bg-white/50 p-8">
                <h3 className="text-xl">{card.title}</h3>
                <p className="text-sm leading-relaxed text-dl-ink/70">
                  {card.text}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>
    </>
  );
}
