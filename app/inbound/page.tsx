import type { Metadata } from "next";
import { RevealOnScroll } from "@/components/reveal-on-scroll";

export const metadata: Metadata = {
  title: "Inbound",
  description:
    "Erreichbarkeit ist kein Kostenfaktor, sondern Ihr Serviceversprechen. Direct Line nimmt ab – kompetent, freundlich und mit Produktwissen.",
};

const ROWS = [
  {
    title: "Service-Hotline",
    text: "Feste Teams, definierte Servicelevel, Betreuung auch in Spitzenzeiten und Kampagnenwellen.",
  },
  {
    title: "Bestell- & Auftragsannahme",
    text: "Direkte Erfassung in Ihrem System, saubere Daten, keine Nacharbeit in Ihrem Haus.",
  },
  {
    title: "Beschwerdemanagement",
    text: "Aus einem verärgerten Anruf wird ein gehaltener Kunde – geschulte Deeskalation statt Textbaustein.",
  },
  {
    title: "Backoffice & Büroservice",
    text: "E-Mail, Post, Dokumentenprüfung und Nachbearbeitung – der unsichtbare Teil guten Services.",
  },
];

export default function InboundPage() {
  return (
    <>
      <section
        data-globe="30,84,0.8"
        className="relative flex min-h-[60vh] items-center px-5 py-24 sm:px-8"
      >
        <div className="mx-auto max-w-[1280px]">
          <RevealOnScroll>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-dl-burgundy">
              Inbound
            </p>
            <h1 className="mt-6 max-w-[20ch] text-[clamp(2.2rem,5vw,3.6rem)]">
              Wenn Ihr Kunde anruft, zählt die erste Minute.
            </h1>
            <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-dl-ink/70">
              Erreichbarkeit ist kein Kostenfaktor, sondern Ihr
              Serviceversprechen. Wir nehmen ab – kompetent, freundlich und
              mit dem Wissen über Ihr Produkt.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <section className="relative border-t border-dl-ink/8 bg-dl-cream px-5 py-24 sm:px-8">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-8">
          {ROWS.map((row, i) => (
            <RevealOnScroll key={row.title} delay={i * 80}>
              <div className="grid gap-3 border-t border-dl-ink/8 pt-8 sm:grid-cols-[minmax(0,1fr)_2fr]">
                <h3 className="text-xl">{row.title}</h3>
                <p className="text-sm leading-relaxed text-dl-ink/70">
                  {row.text}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>
    </>
  );
}
