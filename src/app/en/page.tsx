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
  title: "Van Velzen Autorecycling | Sell your (scrap/damaged) car for the best price",
  description:
    "Sell your scrap car or damaged car for the best price at Van Velzen Autorecycling. Free pickup service, direct RDW deregistration and cash payment possible.",
  keywords:
    "sell scrap car, sell damaged car, car scrapping delft, scrap car delft, scrap car painacker, scrap car zoetermeer, scrap car leiden, scrap car denhaag, scrap car rijswijk, scrap car scheveningen, scrap car rotterdam, scrap car schiedam, scrap car vlaardingen, scrap car westland, scrap car rijnmond, scrap car zuid holland, car scrapping delft, car dismantling, rdw deregistration, free pickup service, scrap car purchase, car recycling, van velzen, autorecycling, delft",
  alternates: {
    canonical: "/en",
  },
  openGraph: {
    title: "Van Velzen Autorecycling | Sell your (scrap/damaged) car for the best price",
    description: "Sell your scrap car or damaged car for the best price at Van Velzen Autorecycling.",
    url: "/en",
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