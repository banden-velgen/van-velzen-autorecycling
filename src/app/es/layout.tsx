import type React from "react"
import "../globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    default: "Van Velzen Autorecycling - Reciclaje de Coches Sostenible",
    template: "%s | Van Velzen Autorecycling",
  },
  description:
    "Van Velzen Autorecycling es una de las empresas más grandes y sostenibles de reciclaje y desguace de coches en los Países Bajos. Venda su coche de chatarra o dañado por un precio justo.",
  keywords:
    "reciclaje de coches, vender coche chatarra, vender coche dañado, autorecycling, desguace de coches, reciclaje sostenible, Países Bajos, Delft",
  authors: [{ name: "Van Velzen Autorecycling" }],
  creator: "Van Velzen Autorecycling",
  publisher: "Van Velzen Autorecycling",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://vanvelzenautorecycling.nl"),
  alternates: {
    canonical: "/es",
    languages: {
      "nl": "/",
      "en": "/en",
      "fr": "/fr",
      "de": "/de",
      "es": "/es",
    },
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "/es",
    title: "Van Velzen Autorecycling - Reciclaje de Coches Sostenible",
    description: "Venda su coche de chatarra o dañado por un precio justo. Reciclaje sostenible de coches en los Países Bajos.",
    siteName: "Van Velzen Autorecycling",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Van Velzen Autorecycling - Reciclaje de Coches",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Van Velzen Autorecycling - Reciclaje de Coches Sostenible",
    description: "Venda su coche de chatarra o dañado por un precio justo. Reciclaje sostenible de coches en los Países Bajos.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function SpanishLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  )
} 