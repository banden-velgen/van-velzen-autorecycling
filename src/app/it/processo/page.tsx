import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, PhoneCall, Truck, FileCheck, CreditCard, Recycle } from "lucide-react"
import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Header from "@/components/header"
import Footer from "@/components/footer"
import WhatsAppButton from "@/components/whatsapp-button"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: "Processo | Van Velzen Autorecycling",
  description:
    "Scopri come funziona il processo di riciclaggio auto da Van Velzen Autorecycling. Dalla richiesta di preventivo al riciclaggio sostenibile in 5 semplici passaggi.",
  keywords:
    "processo riciclaggio auto, passaggi vendita auto rottame, processo riciclaggio auto, radiazione rdw, servizio ritiro gratuito, come funziona riciclaggio auto",
  alternates: {
    canonical: "/it/processo",
  },
  openGraph: {
    title: "Processo | Van Velzen Autorecycling",
    description: "Scopri il nostro processo in 5 passaggi per il riciclaggio auto, dal preventivo alla lavorazione sostenibile.",
    url: "/it/processo",
  },
}

const steps = [
  {
    title: "Passaggio 1: Richiedi Preventivo",
    description:
      "Compilate il modulo con la vostra targa e i dati di contatto per richiedere un preventivo senza impegno. Vi contatteremo entro 24 ore con un'offerta per la vostra auto.",
    icon: PhoneCall,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    position: "left",
  },
  {
    title: "Passaggio 2: Servizio di Ritiro Gratuito",
    description:
      "Dopo l'accordo, ritiriamo la vostra auto gratuitamente, quando vi fa più comodo. I nostri autisti professionisti arrivano all'orario e nel luogo concordati, ovunque in Olanda.",
    icon: Truck,
    color: "text-green-500",
    bgColor: "bg-green-50",
    position: "right",
  },
  {
    title: "Passaggio 3: Radiazione RDW",
    description:
      "Al momento del ritiro della vostra auto, gestiamo direttamente la radiazione RDW. Questo significa che da quel momento non dovete più pagare la tassa di circolazione e non siete più responsabili dell'auto.",
    icon: FileCheck,
    color: "text-orange-500",
    bgColor: "bg-orange-50",
    position: "left",
  },
  {
    title: "Passaggio 4: Pagamento Diretto",
    description:
      "Ricevete il pagamento diretto per la vostra auto, se desiderato in contanti o tramite bonifico bancario. Offriamo un prezzo onesto senza costi nascosti o sorprese successive.",
    icon: CreditCard,
    color: "text-purple-500",
    bgColor: "bg-purple-50",
    position: "right",
  },
  {
    title: "Passaggio 5: Riciclaggio Sostenibile",
    description:
      "La vostra auto viene riciclata in modo rispettoso dell'ambiente, conformemente a tutte le normative vigenti. Fino al 95% dell'auto viene riutilizzato, contribuendo a un'economia circolare.",
    icon: Recycle,
    color: "text-teal-500",
    bgColor: "bg-teal-50",
    position: "left",
  },
]

export default function ProcessPage() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900">Come Funziona</h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              In 5 semplici passaggi gestiamo la vendita e il riciclaggio della vostra auto
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gray-200 hidden md:block"></div>

            <div className="space-y-12 relative">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  <div
                    className={`md:absolute md:left-1/2 md:transform md:-translate-x-1/2 z-10 w-12 h-12 rounded-full ${step.bgColor} flex items-center justify-center mx-auto md:mx-0 mb-4 md:mb-0`}
                  >
                    <step.icon className={`h-6 w-6 ${step.color}`} />
                  </div>

                  <div className={`md:grid md:grid-cols-2 gap-8 ${step.position === "right" ? "md:rtl" : ""}`}>
                    {step.position === "left" ? (
                      <>
                        <div className="md:text-right md:pr-16">
                          <Card className="border-none shadow-none bg-transparent">
                            <CardHeader className="pb-2 px-0">
                              <CardTitle className="text-xl">{step.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="px-0">
                              <CardDescription className="text-base text-gray-600">{step.description}</CardDescription>
                            </CardContent>
                          </Card>
                        </div>
                        <div className="hidden md:block"></div>
                      </>
                    ) : (
                      <>
                        <div className="hidden md:block"></div>
                        <div className="md:text-left md:pl-16">
                          <Card className="border-none shadow-none bg-transparent">
                            <CardHeader className="pb-2 px-0">
                              <CardTitle className="text-xl">{step.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="px-0">
                              <CardDescription className="text-base text-gray-600">{step.description}</CardDescription>
                            </CardContent>
                          </Card>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Pronti a vendere la vostra auto?</h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Compilate il modulo e ricevete entro 24 ore un preventivo senza impegno per la vostra auto.
          </p>
          <Button asChild size="lg" className="bg-white hover:bg-gray-100 text-primary">
            <Link href="/it/#richiedi-preventivo" className="flex items-center gap-2">
              Richiedi preventivo
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
        </main>
        <Footer />
      </div>
      <WhatsAppButton />
    </ThemeProvider>
  )
}