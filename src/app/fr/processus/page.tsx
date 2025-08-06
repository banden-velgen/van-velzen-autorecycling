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
  title: "Processus | Van Velzen Autorecycling",
  description:
    "Découvrez comment fonctionne le processus de recyclage automobile chez Van Velzen Autorecycling. De la demande de devis au recyclage durable en 5 étapes simples.",
  keywords:
    "processus recyclage automobile, étapes vendre voiture de rebut, processus recyclage auto, décharge RDW, service de collecte gratuit, comment fonctionne recyclage automobile",
  alternates: {
    canonical: "/fr/processus",
  },
  openGraph: {
    title: "Processus | Van Velzen Autorecycling",
    description: "Découvrez notre processus en 5 étapes pour le recyclage automobile, du devis au traitement durable.",
    url: "/fr/processus",
  },
}

const steps = [
  {
    title: "Étape 1 : Demander un Devis",
    description:
      "Remplissez le formulaire avec votre plaque d'immatriculation et vos coordonnées pour demander un devis sans engagement. Nous vous contactons sous 24 heures avec une offre pour votre voiture.",
    icon: PhoneCall,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    position: "left",
  },
  {
    title: "Étape 2 : Service de Collecte Gratuit",
    description:
      "Après accord, nous collectons votre voiture gratuitement, à un moment qui vous convient. Nos chauffeurs professionnels viennent à l'heure et au lieu convenus, partout en Hollande.",
    icon: Truck,
    color: "text-green-500",
    bgColor: "bg-green-50",
    position: "right",
  },
  {
    title: "Étape 3 : Décharge RDW",
    description:
      "Lors de la collecte de votre voiture, nous réglons directement la décharge RDW. Cela signifie qu'à partir de ce moment, vous n'avez plus à payer de taxe routière et n'êtes plus responsable de la voiture.",
    icon: FileCheck,
    color: "text-orange-500",
    bgColor: "bg-orange-50",
    position: "left",
  },
  {
    title: "Étape 4 : Paiement Direct",
    description:
      "Vous recevez un paiement direct pour votre voiture, en espèces ou par virement bancaire selon votre préférence. Nous offrons un prix équitable sans coûts cachés ou surprises après coup.",
    icon: CreditCard,
    color: "text-purple-500",
    bgColor: "bg-purple-50",
    position: "right",
  },
  {
    title: "Étape 5 : Recyclage Durable",
    description:
      "Votre voiture est recyclée de manière respectueuse de l'environnement, conformément à toutes les réglementations en vigueur. Jusqu'à 95% de la voiture est réutilisée, contribuant à une économie circulaire.",
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
  return (
  return (
    <>
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900">Comment ça fonctionne</h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              En 5 étapes simples, nous réglons la vente et le recyclage de votre voiture
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
          <h2 className="text-3xl font-bold mb-6">Prêt à vendre votre voiture ?</h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Remplissez le formulaire et recevez un devis sans engagement pour votre voiture sous 24 heures.
          </p>
          <Button asChild size="lg" className="bg-white hover:bg-gray-100 text-primary">
            <Link href="/fr/#demander-devis" className="flex items-center gap-2">
              Demander un devis
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  )
        </main>
        <Footer />
      </div>
      <WhatsAppButton />
    </ThemeProvider>
  )
        </main>
        <Footer />
      </div>
      <WhatsAppButton />
    </ThemeProvider>
  )
}