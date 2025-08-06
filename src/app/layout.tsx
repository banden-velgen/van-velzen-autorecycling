import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Van Velzen Autorecycling | Verkoop uw (sloop/schade) auto voor de beste prijs",
  description: "Verkoop uw sloopauto of schadeauto voor de beste prijs bij Van Velzen Autorecycling. Gratis ophaalservice, directe RDW vrijwaring en contante betaling mogelijk.",
  keywords: "sloopauto verkopen, schadeauto verkopen, autosloperij delft, sloopauto delft, sloopauto pijnacker, sloopauto zoetermeer, sloopauto leiden, sloopauto denhaag, sloopauto rijswijk, sloopauto scheveningen, sloopauto rotterdam, sloopauto schiedam, sloopauto vlaardingen, sloopauto westland, sloopauto rijnmond, sloopauto zuid holland, autosloop delft, autodemontage, rdw vrijwaring, gratis ophaalservice, sloopauto inkoop, auto recycling, van velzen, autorecycling, delft",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Van Velzen Autorecycling | Verkoop uw (sloop/schade) auto voor de beste prijs",
    description: "Verkoop uw sloopauto of schadeauto voor de beste prijs bij Van Velzen Autorecycling.",
    url: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
