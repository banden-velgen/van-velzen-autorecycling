import type { Metadata } from "next"
import HeroSection from "@/components/hero-section"
import ServicesSection from "@/components/services-section"
import ProcessSteps from "@/components/process-steps"
import Testimonials from "@/components/testimonials"
import Header from "@/components/header"
import Footer from "@/components/footer"
import WhatsAppButton from "@/components/whatsapp-button"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: "Van Velzen Autorecycling - Reciclaje de Coches Sostenible",
  description:
    "Venda su coche de chatarra o dañado por un precio justo. Van Velzen Autorecycling es una de las empresas más grandes de reciclaje de coches en los Países Bajos.",
  keywords:
    "reciclaje de coches, vender coche chatarra, vender coche dañado, autorecycling, desguace de coches, reciclaje sostenible, Países Bajos, Delft",
  alternates: {
    canonical: "/es",
  },
  openGraph: {
    title: "Van Velzen Autorecycling - Reciclaje de Coches Sostenible",
    description: "Venda su coche de chatarra o dañado por un precio justo. Reciclaje sostenible de coches en los Países Bajos.",
    url: "/es",
  },
}

export default function HomePage() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <HeroSection />
          <ServicesSection />
          <ProcessSteps />
          <Testimonials />
        </main>
        <Footer />
      </div>
      <WhatsAppButton />
    </ThemeProvider>
  )
} 