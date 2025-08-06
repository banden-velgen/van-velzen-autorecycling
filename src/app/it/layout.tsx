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
    default: "Van Velzen Autorecycling | Smontaggio Auto Sostenibile nei Paesi Bassi",
    template: "%s | Van Velzen Autorecycling",
  },
  description:
    "Van Velzen Autorecycling è la più grande e sostenibile azienda di smontaggio auto dei Paesi Bassi. Vendete la vostra auto rottame al miglior prezzo e contribuite a un ambiente migliore.",
  keywords:
    "riciclaggio auto, azienda smontaggio auto, vendere auto rottame, riciclaggio auto, demolizione auto, smontaggio auto, demolizione auto, acquisto auto, vendere auto, smontaggio auto sostenibile",
  authors: [{ name: "Van Velzen Autorecycling" }],
  creator: "Van Velzen Autorecycling",
  publisher: "Van Velzen Autorecycling",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: "/it",
  },
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: "https://vanvelzenautorecycling.nl/it",
    title: "Van Velzen Autorecycling | Smontaggio Auto Sostenibile nei Paesi Bassi",
    description:
      "Van Velzen Autorecycling è la più grande e sostenibile azienda di smontaggio auto dei Paesi Bassi. Vendete la vostra auto rottame al miglior prezzo e contribuite a un ambiente migliore.",
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
    title: "Van Velzen Autorecycling | Smontaggio Auto Sostenibile nei Paesi Bassi",
    description: "Vendete la vostra auto rottame o auto danneggiata al miglior prezzo da Van Velzen Autorecycling.",
    images: ["/favicon.png"],
  },
  verification: {
    google: "google-site-verification-code", // Replace with your actual verification code if available
  },
  category: "Automotive",
  generator: 'v0.dev'
}

export default function ItalianLayout({
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