import type { Metadata } from "next";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Direct Line Marketing und Kommunikation GmbH, Süderstraße 77, 20097 Hamburg. Sprechen wir – unverbindlich.",
};

export default function KontaktPage() {
  return (
    <section
      data-globe="40,78,1.0"
      className="relative px-5 py-24 sm:px-8"
    >
      <div className="mx-auto grid max-w-[1280px] gap-16 lg:grid-cols-2">
        <RevealOnScroll>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-dl-burgundy">
            Kontakt
          </p>
          <h1 className="mt-6 max-w-[18ch] text-[clamp(2.2rem,5vw,3.6rem)]">
            Sprechen wir – <em className="italic text-dl-burgundy">unverbindlich</em>.
          </h1>

          <div className="mt-10 flex flex-col gap-1 text-dl-ink/75">
            <p>Direct Line Marketing und Kommunikation GmbH</p>
            <p>Süderstraße 77 · 20097 Hamburg</p>
            <p className="mt-3">
              <a href="tel:+494027147-0" className="hover:text-dl-burgundy">
                +49 (0)40 / 27 14 7-0
              </a>
            </p>
            <p>+49 (0)40 / 27 14 7-130 (Fax)</p>
            <p>
              <a
                href="mailto:info@directline-marketing.de"
                className="hover:text-dl-burgundy"
              >
                info@directline-marketing.de
              </a>
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={80}>
          <ContactForm />
        </RevealOnScroll>
      </div>
    </section>
  );
}
