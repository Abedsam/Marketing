import Link from "next/link";

const LEISTUNGEN_LINKS = [
  { href: "/call-center-services", label: "Call-Center-Services" },
  { href: "/inbound", label: "Inbound" },
  { href: "/outbound", label: "Outbound" },
];

const UNTERNEHMEN_LINKS = [
  { href: "/ueber-uns", label: "Über uns" },
  { href: "/team", label: "Team" },
  { href: "/stellenangebote", label: "Stellenangebote" },
  { href: "/kundenstimmen", label: "Kundenstimmen" },
  { href: "/kontakt", label: "Kontakt" },
];

const LEGAL_LINKS = [
  { href: "/impressum", label: "Impressum" },
  { href: "/datenschutz", label: "Datenschutz" },
  { href: "/agb", label: "AGB" },
];

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-dl-ink/8 bg-dl-cream">
      <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-serif text-xl text-dl-ink">Direct Line</p>
            <p className="mt-3 max-w-[26ch] text-sm text-dl-ink/65">
              Ihr Callcenter in Hamburg seit 1995.
            </p>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-dl-ink/45">
              Leistungen
            </p>
            <ul className="mt-4 flex flex-col gap-3">
              {LEISTUNGEN_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-dl-ink/70 transition-colors hover:text-dl-burgundy"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-dl-ink/45">
              Unternehmen
            </p>
            <ul className="mt-4 flex flex-col gap-3">
              {UNTERNEHMEN_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-dl-ink/70 transition-colors hover:text-dl-burgundy"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-dl-ink/45">
              Kontakt
            </p>
            <address className="mt-4 flex flex-col gap-1 text-sm not-italic text-dl-ink/70">
              <span>Süderstraße 77</span>
              <span>20097 Hamburg</span>
              <a
                href="tel:+494027147-0"
                className="mt-2 transition-colors hover:text-dl-burgundy"
              >
                +49 (0)40 / 27 14 7-0
              </a>
              <a
                href="mailto:info@directline-marketing.de"
                className="transition-colors hover:text-dl-burgundy"
              >
                info@directline-marketing.de
              </a>
            </address>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-dl-ink/8 pt-8 text-xs text-dl-ink/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© 1995–2026 Direct Line Marketing und Kommunikation GmbH</p>
          <div className="flex gap-5">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-dl-burgundy"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
