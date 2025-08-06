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
    default: "Van Velzen Autorecycling | Sustainable Car Dismantling in the Netherlands",
    template: "%s | Van Velzen Autorecycling",
  },
  description:
    "Van Velzen Autorecycling is the largest and most sustainable car dismantling company in the Netherlands. Sell your scrap car for the best price and contribute to a better environment.",
  keywords:
    "car recycling, car dismantling company, sell scrap car, car recycling, car scrapping, car dismantling, car scrapping yard, car purchase, sell car, sustainable car dismantling",
  authors: [{ name: "Van Velzen Autorecycling" }],
  creator: "Van Velzen Autorecycling",
  publisher: "Van Velzen Autorecycling",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: "/en",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vanvelzenautorecycling.nl/en",
    title: "Van Velzen Autorecycling | Sustainable Car Dismantling in the Netherlands",
    description:
      "Van Velzen Autorecycling is the largest and most sustainable car dismantling company in the Netherlands. Sell your scrap car for the best price and contribute to a better environment.",
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
    title: "Van Velzen Autorecycling | Sustainable Car Dismantling in the Netherlands",
    description: "Sell your scrap car or damaged car for the best price at Van Velzen Autorecycling.",
    images: ["/favicon.png"],
  },
  verification: {
    google: "google-site-verification-code", // Replace with your actual verification code if available
  },
  category: "Automotive",
  generator: 'v0.dev'
}

export default function EnglishLayout({
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