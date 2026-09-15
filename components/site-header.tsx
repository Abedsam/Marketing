"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { BASE_PATH } from "@/lib/base-path";

const NAV_LINKS = [
  { href: "/call-center-services", label: "Services" },
  { href: "/inbound", label: "Inbound" },
  { href: "/outbound", label: "Outbound" },
  { href: "/ueber-uns", label: "Über uns" },
  { href: "/team", label: "Team" },
  { href: "/kundenstimmen", label: "Kundenstimmen" },
  { href: "/stellenangebote", label: "Jobs" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-[60] border-b border-dl-ink/8 bg-dl-cream/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-5 sm:px-8">
        <Link href="/" onClick={() => setOpen(false)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${BASE_PATH}/logo.png`}
            alt="Direct Line"
            width={183}
            height={85}
            className="h-9 w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-mono text-[11px] uppercase tracking-[0.14em] text-dl-ink/70 transition-colors hover:text-dl-burgundy"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button asChild size="sm">
            <Link href="/kontakt">Kontakt</Link>
          </Button>
        </div>

        <button
          type="button"
          aria-label={open ? "Menü schließen" : "Menü öffnen"}
          className="flex h-9 w-9 items-center justify-center text-dl-ink lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-dl-ink/8 bg-dl-cream px-5 py-6 lg:hidden">
          <nav className="flex flex-col gap-5">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-mono text-xs uppercase tracking-[0.14em] text-dl-ink/80"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/kontakt"
              className="font-mono text-xs uppercase tracking-[0.14em] text-dl-burgundy"
              onClick={() => setOpen(false)}
            >
              Kontakt
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
