import HeroSection from "@/components/hero-section"
import ServicesSection from "@/components/services-section"
import ProcessSteps from "@/components/process-steps"
import Testimonials from "@/components/testimonials"
import Header from "@/components/header"
import Footer from "@/components/footer"
import WhatsAppButton from "@/components/whatsapp-button"
import { ThemeProvider } from "@/components/theme-provider"

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
