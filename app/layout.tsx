import type { Metadata } from "next";
import { Newsreader, Archivo, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ScrollProgress } from "@/components/scroll-progress";
import { WanderingGlobe } from "@/components/wandering-globe";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500"],
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Direct Line Marketing und Kommunikation GmbH",
    template: "%s · Direct Line",
  },
  description:
    "Direct Line Marketing und Kommunikation GmbH – Ihr Callcenter aus Hamburg seit 1995. Inbound, Outbound und Terminierung aus einer Hand.",
  openGraph: {
    title: "Direct Line Marketing und Kommunikation GmbH",
    description:
      "Callcenter aus Hamburg seit 1995. Inbound, Outbound und Terminierung aus einer Hand.",
    locale: "de_DE",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="de"
      className={`${newsreader.variable} ${archivo.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[--dl-cream] text-[--dl-ink]">
        <ScrollProgress />
        <WanderingGlobe />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
