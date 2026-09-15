import type { Metadata } from "next";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { User } from "lucide-react";

export const metadata: Metadata = {
  title: "Team",
  description:
    "Über 250 Kolleginnen und Kollegen in Hamburg. Die Menschen hinter der Leitung von Direct Line.",
};

const TEAM = [
  {
    name: "Matthias Malik",
    role: "Geschäftsführer",
    text: "Gründete Direct Line 1995 und führt das Haus bis heute – mit kurzem Draht zu Kunden und Team.",
  },
  {
    name: "Bernd Standhardt",
    role: "Personal & Bewerbungen",
    text: "Ansprechpartner für alle, die bei Direct Line anfangen möchten. 040 / 27 14 7-212",
  },
  {
    name: "Name",
    role: "Projektleitung",
    text: "Kurzvorstellung – zwei Sätze zur Rolle und zum Verantwortungsbereich.",
  },
  {
    name: "Name",
    role: "Qualitätsmanagement",
    text: "Kurzvorstellung – zwei Sätze zur Rolle und zum Verantwortungsbereich.",
  },
];

export default function TeamPage() {
  return (
    <>
      <section
        data-globe="26,86,0.7"
        className="relative flex min-h-[60vh] items-center px-5 py-24 sm:px-8"
      >
        <div className="w-full mx-auto max-w-[1280px]">
          <RevealOnScroll>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-dl-burgundy">
              Team
            </p>
            <h1 className="mt-6 max-w-[20ch] text-[clamp(2.2rem,5vw,3.6rem)]">
              Die Menschen hinter der Leitung.
            </h1>
            <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-dl-ink/70">
              Über 250 Kolleginnen und Kollegen in Hamburg. Hier stellen wir
              die vor, die Ihre Kampagne täglich verantworten.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <section className="relative border-t border-dl-ink/8 bg-dl-cream px-5 py-24 sm:px-8">
        <div className="mx-auto grid max-w-[1280px] gap-8 sm:grid-cols-2">
          {TEAM.map((member, i) => (
            <RevealOnScroll key={`${member.name}-${i}`} delay={(i % 2) * 80}>
              <div className="flex h-full flex-col gap-4 rounded-[2px] border border-dl-ink/10 bg-white/50 p-8">
                <div className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[2px] bg-dl-ink/5">
                  <div className="flex flex-col items-center gap-2 text-dl-ink/35">
                    <User size={32} strokeWidth={1.2} />
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em]">
                      Porträt
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl">{member.name}</h3>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-dl-burgundy">
                    {member.role}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-dl-ink/70">
                    {member.text}
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>
    </>
  );
}
