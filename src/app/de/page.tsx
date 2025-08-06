import HeroSection from "@/components/hero-section"
import ServicesSection from "@/components/services-section"
import ProcessSteps from "@/components/process-steps"
import Testimonials from "@/components/testimonials"
import Header from "@/components/header"
import Footer from "@/components/footer"
import WhatsAppButton from "@/components/whatsapp-button"
import { ThemeProvider } from "@/components/theme-provider"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Van Velzen Autorecycling | Verkaufen Sie Ihr (Schrott/beschädigtes) Auto zum besten Preis",
  description:
    "Verkaufen Sie Ihr Schrottauto oder beschädigtes Auto zum besten Preis bei Van Velzen Autorecycling. Kostenloser Abholservice, direkte RDW-Abmeldung und Barzahlung möglich.",
  keywords:
    "Schrottauto verkaufen, beschädigtes Auto verkaufen, Autoverwertung delft, Schrottauto delft, Schrottauto pijnacker, Schrottauto zoetermeer, Schrottauto leiden, Schrottauto denhaag, Schrottauto rijswijk, Schrottauto scheveningen, Schrottauto rotterdam, Schrottauto schiedam, Schrottauto vlaardingen, Schrottauto westland, Schrottauto rijnmond, Schrottauto zuid holland, Autoverwertung delft, Autodemontage, RDW-Abmeldung, kostenloser Abholservice, Schrottauto ankauf, Autorecycling, van velzen, autorecycling, delft",
  alternates: {
    canonical: "/de",
  },
  openGraph: {
    title: "Van Velzen Autorecycling | Verkaufen Sie Ihr (Schrott/beschädigtes) Auto zum besten Preis",
    description: "Verkaufen Sie Ihr Schrottauto oder beschädigtes Auto zum besten Preis bei Van Velzen Autorecycling.",
    url: "/de",
  },
}

export default function Home() {
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