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
  title: "Van Velzen Autorecycling | Vendi la tua auto (rottame/danneggiata) al miglior prezzo",
  description:
    "Vendi la tua auto rottame o auto danneggiata al miglior prezzo da Van Velzen Autorecycling. Servizio di ritiro gratuito, radiazione RDW diretta e pagamento in contanti possibile.",
  keywords:
    "vendere auto rottame, vendere auto danneggiata, demolizione auto delft, auto rottame delft, auto rottame painacker, auto rottame zoetermeer, auto rottame leiden, auto rottame denhaag, auto rottame rijswijk, auto rottame scheveningen, auto rottame rotterdam, auto rottame schiedam, auto rottame vlaardingen, auto rottame westland, auto rottame rijnmond, auto rottame zuid holland, demolizione auto delft, smontaggio auto, radiazione rdw, servizio ritiro gratuito, acquisto auto rottame, riciclaggio auto, van velzen, autorecycling, delft",
  alternates: {
    canonical: "/it",
  },
  openGraph: {
    title: "Van Velzen Autorecycling | Vendi la tua auto (rottame/danneggiata) al miglior prezzo",
    description: "Vendi la tua auto rottame o auto danneggiata al miglior prezzo da Van Velzen Autorecycling.",
    url: "/it",
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