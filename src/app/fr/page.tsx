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
  title: "Van Velzen Autorecycling | Vendez votre voiture (de rebut/endommagée) au meilleur prix",
  description:
    "Vendez votre voiture de rebut ou voiture endommagée au meilleur prix chez Van Velzen Autorecycling. Service de collecte gratuit, décharge RDW directe et paiement en espèces possible.",
  keywords:
    "vendre voiture de rebut, vendre voiture endommagée, casse automobile delft, voiture de rebut delft, voiture de rebut pijnacker, voiture de rebut zoetermeer, voiture de rebut leiden, voiture de rebut denhaag, voiture de rebut rijswijk, voiture de rebut scheveningen, voiture de rebut rotterdam, voiture de rebut schiedam, voiture de rebut vlaardingen, voiture de rebut westland, voiture de rebut rijnmond, voiture de rebut zuid holland, casse automobile delft, démantèlement automobile, décharge RDW, service de collecte gratuit, achat voiture de rebut, recyclage automobile, van velzen, autorecycling, delft",
  alternates: {
    canonical: "/fr",
  },
  openGraph: {
    title: "Van Velzen Autorecycling | Vendez votre voiture (de rebut/endommagée) au meilleur prix",
    description: "Vendez votre voiture de rebut ou voiture endommagée au meilleur prix chez Van Velzen Autorecycling.",
    url: "/fr",
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