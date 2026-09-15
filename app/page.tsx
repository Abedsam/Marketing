import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { Counter } from "@/components/counter";
import { ReviewMarquee, type Review } from "@/components/review-marquee";

const LEISTUNGEN = [
  {
    numeral: "I",
    title: "Inbound & Kundenservice",
    text: "Hotline, Bestellannahme, Beschwerde, Backoffice. Ihre Kunden erreichen Menschen, die Ihr Produkt kennen – nicht ein Skript.",
  },
  {
    numeral: "II",
    title: "Outbound & Akquise",
    text: "Neukunden, Bestandskunden-Upgrades, Terminierung für den Außendienst, Spenderrückgewinnung. Mit Fingerspitzengefühl statt Druck.",
  },
  {
    numeral: "III",
    title: "Leads, Daten & Multichannel",
    text: "Über Direct Leads generieren wir qualifizierte OPT-IN-Adressen; über E-Mail, Post und Social Media halten wir den Kontakt lebendig.",
  },
];

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Strategiegespräch",
    text: "Ziele, Zielgruppe, KPIs – unverbindlich und ohne Vertriebsfolklore.",
  },
  {
    number: "02",
    title: "Konzept & Team",
    text: "Gesprächsleitfaden, Schulung, dediziertes Team und ein fester Ansprechpartner.",
  },
  {
    number: "03",
    title: "Pilot & Feinschliff",
    text: "Testphase mit echtem Datenrücklauf, dann Optimierung von Argumentation und Timing.",
  },
  {
    number: "04",
    title: "Betrieb & Reporting",
    text: "Transparente Kennzahlen, regelmäßige Reviews, planbare Kosten.",
  },
];

const REVIEWS: Review[] = [
  {
    author: "Abel Von Lindern",
    source: "Google",
    text: "Es herrscht eine gesunde Arbeitsmoral, in der Fokus und Lockerheit harmonisch zusammenkommen.",
  },
  {
    author: "Mherre Rasulli",
    source: "Google",
    text: "Das Team hat mich herzlich aufgenommen, die Einarbeitung war gut organisiert. Ich kann die Firma nur weiterempfehlen!",
  },
  {
    author: "Priscilla",
    source: "Google",
    text: "Ganz nette Mitarbeiter und tolle Leiter bzw. Chefs. Eine schöne Arbeitsatmosphäre.",
  },
  {
    author: "Tobias Frank",
    source: "Google",
    text: "Sehr freundliche Mitarbeiter, immer sehr respektvoll und professionell.",
  },
  {
    author: "Pia F.",
    source: "Google",
    text: "Die Firma ist einfach top. Man fühlt sich sehr gut aufgehoben und die getane Arbeit wird geschätzt.",
  },
  {
    author: "Stephan Ring",
    source: "Google",
    text: "Kann ich nur empfehlen. Wurde herzlich aufgenommen, alle Kollegen helfen gern weiter.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section
        data-globe="46,74,1.15"
        className="relative flex min-h-[92vh] items-center px-5 py-20 sm:px-8"
      >
        <div className="w-full mx-auto max-w-[1280px]">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-dl-burgundy">
            Callcenter Hamburg · seit 1995
          </p>
          <h1 className="mt-6 max-w-[16ch] text-[clamp(2.4rem,6vw,4.6rem)] text-dl-ink">
            Wir geben Ihren Zielen eine Stimme.
          </h1>
          <p className="mt-6 max-w-[56ch] text-lg leading-relaxed text-dl-ink/70">
            250 festangestellte Agents, drei Jahrzehnte Erfahrung und
            hanseatische Verlässlichkeit. Wir übernehmen Inbound, Outbound und
            Terminierung – und liefern messbare Ergebnisse statt
            Gesprächsminuten.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button size="lg" asChild>
              <Link href="/kontakt">Erstgespräch vereinbaren</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/call-center-services">Leistungen ansehen</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Kennzahlen */}
      <section className="relative border-t border-dl-ink/8 bg-dl-cream px-5 py-16 sm:px-8">
        <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-10 md:grid-cols-4">
          <RevealOnScroll>
            <p className="font-serif text-4xl text-dl-ink">
              <Counter value={250} suffix="+" />
            </p>
            <p className="mt-2 text-sm text-dl-ink/60">
              Agents in Vollzeit
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={80}>
            <p className="font-serif text-4xl text-dl-ink">
              <Counter value={30} />
            </p>
            <p className="mt-2 text-sm text-dl-ink/60">Jahre am Markt</p>
          </RevealOnScroll>
          <RevealOnScroll delay={160}>
            <p className="font-serif text-4xl text-dl-ink">
              <Counter value={3} />
            </p>
            <p className="mt-2 text-sm text-dl-ink/60">
              kununu Top-Company-Siegel
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={240}>
            <p className="font-serif text-4xl text-dl-ink">B2B / B2C</p>
            <p className="mt-2 text-sm text-dl-ink/60">
              Kampagnen aus einer Hand
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Leistungen */}
      <section
        data-globe="30,18,0.55"
        className="relative border-t border-dl-ink/8 bg-dl-cream px-5 py-24 sm:px-8"
      >
        <div className="w-full mx-auto max-w-[1280px]">
          <RevealOnScroll>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-dl-burgundy">
              01 — Leistungen
            </p>
            <h2 className="mt-4 max-w-[20ch] text-[clamp(1.9rem,3.6vw,2.8rem)]">
              Clever, transparent, individuell.
            </h2>
            <p className="mt-4 max-w-[60ch] text-dl-ink/70">
              Jede Kampagne bekommt ihr eigenes Team, ihre eigene
              Gesprächslogik und ein Reporting, das Sie wirklich lesen
              wollen.
            </p>
          </RevealOnScroll>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {LEISTUNGEN.map((item, i) => (
              <RevealOnScroll key={item.title} delay={i * 80}>
                <div className="flex h-full flex-col gap-4 rounded-[2px] border border-dl-ink/10 bg-white/50 p-8">
                  <span className="font-serif text-3xl text-dl-burgundy">
                    {item.numeral}
                  </span>
                  <h3 className="text-xl">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-dl-ink/70">
                    {item.text}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          <RevealOnScroll delay={240}>
            <Link
              href="/call-center-services"
              className="mt-10 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-dl-burgundy"
            >
              Alle Services <ArrowRight size={14} />
            </Link>
          </RevealOnScroll>
        </div>
      </section>

      {/* Haltung (dark) */}
      <section
        data-globe="52,50,2.1"
        data-globe-dark="true"
        className="relative overflow-hidden bg-dl-plum px-5 py-24 text-dl-text-on-dark sm:px-8"
      >
        <div className="relative z-10 w-full mx-auto max-w-[1280px]">
          <RevealOnScroll>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-dl-rose">
              02 — Haltung
            </p>
            <h2 className="mt-4 max-w-[24ch] text-[clamp(1.9rem,3.6vw,2.8rem)] text-dl-text-on-dark">
              Ehrlichkeit, Verlässlichkeit, Integrität – hanseatisch eben.
            </h2>
            <p className="mt-6 max-w-[64ch] text-dl-text-on-dark/75">
              Sie vertrauen uns das Herzstück Ihres Unternehmens an: den
              Kontakt zu Ihren Kunden. Deshalb schulen wir intensiv, betreuen
              eng und melden auch dann zurück, wenn eine Kampagne anders
              läuft als geplant.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Kundenstimmen */}
      <section className="relative border-t border-dl-ink/8 bg-dl-cream px-5 py-24 sm:px-8">
        <div className="w-full mx-auto max-w-[1280px]">
          <RevealOnScroll>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-dl-burgundy">
                  03 — Kundenstimmen
                </p>
                <h2 className="mt-4 text-[clamp(1.9rem,3.6vw,2.8rem)]">
                  Was Auftraggeber sagen
                </h2>
              </div>
              <div className="text-right">
                <p className="text-dl-burgundy">★★★★★</p>
                <p className="mt-1 text-sm text-dl-ink/60">
                  4,5 auf Google · 27 Berichte
                </p>
              </div>
            </div>
          </RevealOnScroll>

          <div className="mt-12 flex flex-col gap-5">
            <ReviewMarquee reviews={REVIEWS} speed={64} />
            <ReviewMarquee reviews={REVIEWS} reverse speed={70} />
          </div>

          <RevealOnScroll delay={80}>
            <Link
              href="/kundenstimmen"
              className="mt-10 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-dl-burgundy"
            >
              Alle Stimmen <ArrowRight size={14} />
            </Link>
          </RevealOnScroll>
        </div>
      </section>

      {/* Zusammenarbeit */}
      <section
        data-globe="58,86,0.75"
        className="relative border-t border-dl-ink/8 bg-dl-cream px-5 py-24 sm:px-8"
      >
        <div className="w-full mx-auto max-w-[1280px]">
          <RevealOnScroll>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-dl-burgundy">
                  04 — Zusammenarbeit
                </p>
                <h2 className="mt-4 max-w-[22ch] text-[clamp(1.9rem,3.6vw,2.8rem)]">
                  Von der Anfrage zur laufenden Kampagne in vier Schritten.
                </h2>
              </div>
              <Button asChild>
                <Link href="/kontakt">Jetzt anfragen</Link>
              </Button>
            </div>
          </RevealOnScroll>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map((step, i) => (
              <RevealOnScroll key={step.number} delay={i * 80}>
                <p className="font-mono text-sm text-dl-burgundy">
                  {step.number}
                </p>
                <h3 className="mt-3 text-lg">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-dl-ink/70">
                  {step.text}
                </p>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
