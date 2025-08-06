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
    default: "Van Velzen Autorecycling | Démantèlement Automobile Durable aux Pays-Bas",
    template: "%s | Van Velzen Autorecycling",
  },
  description:
    "Van Velzen Autorecycling est la plus grande entreprise de démantèlement automobile durable des Pays-Bas. Vendez votre voiture de rebut au meilleur prix et contribuez à un meilleur environnement.",
  keywords:
    "recyclage automobile, entreprise de démantèlement automobile, vendre voiture de rebut, recyclage automobile, mise au rebut automobile, démantèlement automobile, casse automobile, achat automobile, vendre voiture, démantèlement automobile durable",
  authors: [{ name: "Van Velzen Autorecycling" }],
  creator: "Van Velzen Autorecycling",
  publisher: "Van Velzen Autorecycling",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: "/fr",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://vanvelzenautorecycling.nl/fr",
    title: "Van Velzen Autorecycling | Démantèlement Automobile Durable aux Pays-Bas",
    description:
      "Van Velzen Autorecycling est la plus grande entreprise de démantèlement automobile durable des Pays-Bas. Vendez votre voiture de rebut au meilleur prix et contribuez à un meilleur environnement.",
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
    title: "Van Velzen Autorecycling | Démantèlement Automobile Durable aux Pays-Bas",
    description: "Vendez votre voiture de rebut ou voiture endommagée au meilleur prix chez Van Velzen Autorecycling.",
    images: ["/favicon.png"],
  },
  verification: {
    google: "google-site-verification-code", // Replace with your actual verification code if available
  },
  category: "Automotive",
  generator: 'v0.dev'
}

export default function FrenchLayout({
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