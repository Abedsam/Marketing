import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RevealOnScroll } from "@/components/reveal-on-scroll";

export const metadata: Metadata = {
  title: "Call-Center-Services",
  description:
    "Telefon, E-Mail, Post, Social Media – Direct Line führt die Kommunikation mit Ihren Kunden auf allen Kanälen.",
};

const SERVICES = [
  {
    title: "Kundenservice & Hotline",
    text: "Erste und zweite Ebene, Bestellannahme, Reklamation, Terminvereinbarung, Büro- und Backoffice-Service.",
  },
  {
    title: "Neukundenakquise",
    text: "Sondierung von Kaufinteressen, Qualifizierung von Adressen, Direktabschluss am Telefon – B2B wie B2C.",
  },
  {
    title: "Bestandskundenbetreuung",
    text: "Beratung, Upgrade und Rückgewinnung – ein Schwerpunkt in der Versicherungsbranche.",
  },
  {
    title: "Terminierung Außendienst",
    text: "Planung, Organisation und Nachfassen von Terminen – damit Ihr Vertrieb verkauft statt telefoniert.",
  },
  {
    title: "Charity & Fundraising",
    text: "Täglich gewinnen wir neue Spender und reaktivieren ehemalige – mit dem gebotenen Feingefühl.",
  },
  {
    title: "Leads & Kampagnensteuerung",
    text: "OPT-IN-Adressen über Direct Leads, flankierende Maßnahmen und Koordination aller Dienstleister.",
  },
];

export default function CallCenterServicesPage() {
  return (
    <>
      <section
        data-globe="26,86,0.7"
        className="relative flex min-h-[60vh] items-center px-5 py-24 sm:px-8"
      >
        <div className="w-full mx-auto max-w-[1280px]">
          <RevealOnScroll>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-dl-burgundy">
              Call-Center-Services
            </p>
            <h1 className="mt-6 max-w-[20ch] text-[clamp(2.2rem,5vw,3.6rem)]">
              Ein Dienstleister. Alle Kanäle.
            </h1>
            <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-dl-ink/70">
              Telefon, E-Mail, Post, Social Media – wir führen die
              Kommunikation mit den Kunden unserer Auftraggeber auf allen
              Wegen, an denen sie tatsächlich erreichbar sind.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <section className="relative border-t border-dl-ink/8 bg-dl-cream px-5 py-24 sm:px-8">
        <div className="w-full mx-auto max-w-[1280px]">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service, i) => (
              <RevealOnScroll key={service.title} delay={(i % 3) * 80}>
                <div className="flex h-full flex-col gap-3 rounded-[2px] border border-dl-ink/10 bg-white/50 p-8">
                  <h3 className="text-xl">{service.title}</h3>
                  <p className="text-sm leading-relaxed text-dl-ink/70">
                    {service.text}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section
        data-globe="50,50,1.9"
        data-globe-dark="true"
        className="relative overflow-hidden bg-dl-plum px-5 py-24 text-dl-text-on-dark sm:px-8"
      >
        <div className="relative z-10 w-full mx-auto max-w-[1280px]">
          <RevealOnScroll>
            <h2 className="max-w-[24ch] text-[clamp(1.9rem,3.6vw,2.8rem)] text-dl-text-on-dark">
              Sie wissen noch nicht, welches Modell passt?
            </h2>
            <p className="mt-6 max-w-[60ch] text-dl-text-on-dark/75">
              Wir rechnen Ihnen zwei Varianten durch – ehrlich, auch wenn eine
              davon kleiner ausfällt.
            </p>
            <Button variant="dark" size="lg" asChild className="mt-8">
              <Link href="/kontakt">Unverbindlich anfragen</Link>
            </Button>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
