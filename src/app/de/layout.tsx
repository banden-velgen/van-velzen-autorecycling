import type React from "react"
import "../globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import RightClickProtection from "@/components/right-click-protection"
import type { Metadata } from "next"
import ImageProtection from "@/components/image-protection"

const inter = Inter({
  subsets: ["latin"],
  display: "swap", // Optimize font loading
  preload: true,
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://vanvelzenautorecycling.nl"),
  title: {
    default: "Van Velzen Autorecycling | Nachhaltige Autodemontage in den Niederlanden",
    template: "%s | Van Velzen Autorecycling",
  },
  description:
    "Van Velzen Autorecycling ist das größte und nachhaltigste Autodemontageunternehmen der Niederlande. Verkaufen Sie Ihr Schrottauto zum besten Preis und tragen Sie zu einer besseren Umwelt bei.",
  keywords:
    "Autorecycling, Autodemontageunternehmen, Schrottauto verkaufen, Autorecycling, Autoverschrottung, Autodemontage, Autoverwertung, Autoankauf, Auto verkaufen, nachhaltige Autodemontage",
  authors: [{ name: "Van Velzen Autorecycling" }],
  creator: "Van Velzen Autorecycling",
  publisher: "Van Velzen Autorecycling",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: "/de",
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "https://vanvelzenautorecycling.nl/de",
    title: "Van Velzen Autorecycling | Nachhaltige Autodemontage in den Niederlanden",
    description:
      "Van Velzen Autorecycling ist das größte und nachhaltigste Autodemontageunternehmen der Niederlande. Verkaufen Sie Ihr Schrottauto zum besten Preis und tragen Sie zu einer besseren Umwelt bei.",
    siteName: "Van Velzen Autorecycling",
    images: [
      {
        url: "/favicon.png",
        width: 512,
        height: 512,
        alt: "Van Velzen Autorecycling Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Van Velzen Autorecycling | Nachhaltige Autodemontage in den Niederlanden",
    description: "Verkaufen Sie Ihr Schrottauto oder beschädigtes Auto zum besten Preis bei Van Velzen Autorecycling.",
    images: ["/favicon.png"],
  },
  verification: {
    google: "google-site-verification-code", // Replace with your actual verification code if available
  },
  category: "Automotive",
  generator: 'v0.dev'
}

export default function GermanLayout({
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