"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PhoneCall, Truck, FileCheck, CreditCard, Recycle } from "lucide-react"
import { usePathname } from "next/navigation"

export default function ProcessSteps() {
  const pathname = usePathname()
  const currentLang = pathname.startsWith("/en") ? "en" : pathname.startsWith("/fr") ? "fr" : pathname.startsWith("/de") ? "de" : pathname.startsWith("/es") ? "es" : pathname.startsWith("/it") ? "it" : "nl"

  const content = {
    nl: {
      title: "Hoe het werkt",
      description: "In 5 eenvoudige stappen regelen wij de verkoop en recycling van uw auto.",
      steps: [
        {
          title: "Offerte Aanvragen",
          description: "Vul het formulier in met uw kenteken en contactgegevens om een vrijblijvende offerte aan te vragen.",
          position: "left",
        },
        {
          title: "Gratis Ophaalservice",
          description: "Na akkoord halen wij uw auto gratis op, op een moment dat u het beste uitkomt.",
          position: "right",
        },
        {
          title: "RDW Vrijwaring",
          description: "Wij regelen direct de RDW vrijwaring, zodat u geen wegenbelasting meer hoeft te betalen.",
          position: "left",
        },
        {
          title: "Directe Betaling",
          description: "U ontvangt direct betaling voor uw auto, desgewenst contant of per bankoverschrijving.",
          position: "right",
        },
        {
          title: "Duurzame Recycling",
          description: "Uw auto wordt op een milieuvriendelijke manier gerecycled, conform alle geldende regelgeving.",
          position: "left",
        },
      ]
    },
    en: {
      title: "How it works",
      description: "In 5 simple steps, we arrange the sale and recycling of your car.",
      steps: [
        {
          title: "Request Quote",
          description: "Fill in the form with your license plate and contact details to request a no-obligation quote.",
          position: "left",
        },
        {
          title: "Free Pickup Service",
          description: "After agreement, we pick up your car for free, at a time that suits you best.",
          position: "right",
        },
        {
          title: "RDW Deregistration",
          description: "We arrange the RDW deregistration directly, so you no longer have to pay road tax.",
          position: "left",
        },
        {
          title: "Direct Payment",
          description: "You receive immediate payment for your car, optionally cash or by bank transfer.",
          position: "right",
        },
        {
          title: "Sustainable Recycling",
          description: "Your car is recycled in an environmentally friendly way, in compliance with all applicable regulations.",
          position: "left",
        },
      ]
    },
    fr: {
      title: "Comment ça fonctionne",
      description: "En 5 étapes simples, nous réglons la vente et le recyclage de votre voiture.",
      steps: [
        {
          title: "Demander un Devis",
          description: "Remplissez le formulaire avec votre plaque d'immatriculation et vos coordonnées pour demander un devis sans engagement.",
          position: "left",
        },
        {
          title: "Service de Collecte Gratuit",
          description: "Après accord, nous collectons votre voiture gratuitement, à un moment qui vous convient.",
          position: "right",
        },
        {
          title: "Décharge RDW",
          description: "Nous réglons directement la décharge RDW, vous n'avez plus à payer de taxe routière.",
          position: "left",
        },
        {
          title: "Paiement Direct",
          description: "Vous recevez un paiement immédiat pour votre voiture, en espèces ou par virement bancaire.",
          position: "right",
        },
        {
          title: "Recyclage Durable",
          description: "Votre voiture est recyclée de manière respectueuse de l'environnement, conformément à toutes les réglementations en vigueur.",
          position: "left",
        },
      ]
    },
    de: {
      title: "Wie funktioniert es",
      description: "In 5 einfachen Schritten regeln wir den Verkauf und das Recycling Ihres Autos.",
      steps: [
        {
          title: "Angebot anfordern",
          description: "Füllen Sie das Formular mit Ihrem Kennzeichen und Ihren Kontaktdaten aus, um ein unverbindliches Angebot anzufordern.",
          position: "left",
        },
        {
          title: "Kostenloser Abholservice",
          description: "Nach Zustimmung holen wir Ihr Auto kostenlos ab, zu einem Zeitpunkt, der Ihnen am besten passt.",
          position: "right",
        },
        {
          title: "RDW-Abmeldung",
          description: "Wir regeln direkt die RDW-Abmeldung, sodass Sie keine Kfz-Steuer mehr zahlen müssen.",
          position: "left",
        },
        {
          title: "Direkte Zahlung",
          description: "Sie erhalten eine direkte Zahlung für Ihr Auto, wahlweise bar oder per Banküberweisung.",
          position: "right",
        },
        {
          title: "Nachhaltiges Recycling",
          description: "Ihr Auto wird auf umweltfreundliche Weise recycelt, konform mit allen geltenden Vorschriften.",
          position: "left",
        },
      ]
    },
    es: {
      title: "Cómo funciona",
      description: "En 5 pasos simples, organizamos la venta y reciclaje de su coche.",
      steps: [
        {
          title: "Solicitar Oferta",
          description: "Rellene el formulario con su matrícula y datos de contacto para solicitar una oferta sin compromiso.",
          position: "left",
        },
        {
          title: "Servicio de Recogida Gratuito",
          description: "Después del acuerdo, recogemos su coche gratuitamente, en el momento que mejor le convenga.",
          position: "right",
        },
        {
          title: "Baja RDW",
          description: "Nos encargamos directamente de la baja RDW, para que no tenga que pagar más impuestos de circulación.",
          position: "left",
        },
        {
          title: "Pago Directo",
          description: "Recibe el pago inmediatamente por su coche, en efectivo o por transferencia bancaria.",
          position: "right",
        },
        {
          title: "Reciclaje Sostenible",
          description: "Su coche se recicla de manera respetuosa con el medio ambiente, cumpliendo con todas las regulaciones vigentes.",
          position: "left",
        },
      ]
    },
    it: {
      title: "Come Funziona",
      description: "In 5 semplici passaggi, gestiamo la vendita e il riciclaggio della vostra auto.",
      steps: [
        {
          title: "Richiedi Preventivo",
          description: "Compilate il modulo con la vostra targa e i dati di contatto per richiedere un preventivo senza impegno.",
          position: "left",
        },
        {
          title: "Servizio di Ritiro Gratuito",
          description: "Dopo l'accordo, ritiriamo la vostra auto gratuitamente, quando vi fa più comodo.",
          position: "right",
        },
        {
          title: "Radiazione RDW",
          description: "Ci occupiamo direttamente della radiazione RDW, così non dovete più pagare la tassa di circolazione.",
          position: "left",
        },
        {
          title: "Pagamento Diretto",
          description: "Ricevete il pagamento immediato per la vostra auto, in contanti o tramite bonifico bancario.",
          position: "right",
        },
        {
          title: "Riciclaggio Sostenibile",
          description: "La vostra auto viene riciclata in modo rispettoso dell'ambiente, conformemente a tutte le normative vigenti.",
          position: "left",
        },
      ]
    }
  }

  const currentContent = content[currentLang as keyof typeof content]

  const icons = [PhoneCall, Truck, FileCheck, CreditCard, Recycle]
  const colors = ["text-blue-500", "text-green-500", "text-orange-500", "text-purple-500", "text-teal-500"]
  const bgColors = ["bg-blue-50", "bg-green-50", "bg-orange-50", "bg-purple-50", "bg-teal-50"]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">{currentContent.title}</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            {currentContent.description}
          </p>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gray-200 hidden md:block"></div>

          <div className="space-y-12 relative">
            {currentContent.steps.map((step, index) => {
              const IconComponent = icons[index]
              return (
                <div key={index} className="relative">
                  <div
                    className={`md:absolute md:left-1/2 md:transform md:-translate-x-1/2 z-10 w-12 h-12 rounded-full ${bgColors[index]} flex items-center justify-center mx-auto md:mx-0 mb-4 md:mb-0`}
                  >
                    <IconComponent className={`h-6 w-6 ${colors[index]}`} />
                  </div>

                  <div className="md:grid md:grid-cols-2 gap-8">
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
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
