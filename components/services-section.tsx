"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Car, Truck, FileCheck, Recycle, Euro } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

export default function ServicesSection() {
  const pathname = usePathname()
  const currentLang = pathname.startsWith("/en") ? "en" : pathname.startsWith("/fr") ? "fr" : pathname.startsWith("/de") ? "de" : pathname.startsWith("/es") ? "es" : pathname.startsWith("/it") ? "it" : "nl"

  const content = {
    nl: {
      title: "Onze Diensten",
      description: "Van Velzen Autorecycling biedt een compleet pakket aan diensten voor het verkopen en recyclen van uw auto.",
      services: [
        {
          title: "Sloopauto Verkopen",
          description: "Verkoop uw sloopauto voor de beste prijs. Wij regelen alles, inclusief gratis ophaalservice.",
          href: "/diensten#sloopauto-verkopen",
        },
        {
          title: "Schadeauto Verkopen",
          description: "Ook voor schadeauto's bieden wij een eerlijke prijs. Laat uw auto taxeren en ontvang direct een bod.",
          href: "/diensten#schadeauto-verkopen",
        },
        {
          title: "Gratis Ophaalservice",
          description: "Wij halen uw auto gratis op in heel Nederland, op een moment dat u het beste uitkomt.",
          href: "/diensten#gratis-ophaalservice",
        },
        {
          title: "RDW Vrijwaring",
          description: "Wij regelen direct de RDW vrijwaring, zodat u geen wegenbelasting meer hoeft te betalen.",
          href: "/diensten#rdw-vrijwaring",
        },
        {
          title: "Duurzame Recycling",
          description: "Uw auto wordt op een milieuvriendelijke manier gerecycled, conform alle geldende regelgeving.",
          href: "/diensten#duurzame-recycling",
        },
        {
          title: "Directe Betaling",
          description: "Na ophalen van uw auto ontvangt u direct betaling, desgewenst contant of per bankoverschrijving.",
          href: "/diensten#directe-betaling",
        },
      ]
    },
    en: {
      title: "Our Services",
      description: "Van Velzen Autorecycling offers a complete package of services for selling and recycling your car.",
      services: [
        {
          title: "Sell Scrap Car",
          description: "Sell your scrap car for the best price. We arrange everything, including free pickup service.",
          href: "/en/services#sloopauto-verkopen",
        },
        {
          title: "Sell Damaged Car",
          description: "We also offer a fair price for damaged cars. Have your car appraised and receive an immediate offer.",
          href: "/en/services#schadeauto-verkopen",
        },
        {
          title: "Free Pickup Service",
          description: "We pick up your car for free throughout the Netherlands, at a time that suits you best.",
          href: "/en/services#gratis-ophaalservice",
        },
        {
          title: "RDW Deregistration",
          description: "We arrange the RDW deregistration directly, so you no longer have to pay road tax.",
          href: "/en/services#rdw-vrijwaring",
        },
        {
          title: "Sustainable Recycling",
          description: "Your car is recycled in an environmentally friendly way, in compliance with all applicable regulations.",
          href: "/en/services#duurzame-recycling",
        },
        {
          title: "Direct Payment",
          description: "After picking up your car, you receive immediate payment, optionally cash or by bank transfer.",
          href: "/en/services#directe-betaling",
        },
      ]
    },
    fr: {
      title: "Nos Services",
      description: "Van Velzen Autorecycling propose un ensemble complet de services pour la vente et le recyclage de votre voiture.",
      services: [
        {
          title: "Vendre Voiture de Rebut",
          description: "Vendez votre voiture de rebut au meilleur prix. Nous réglons tout, y compris le service de collecte gratuit.",
          href: "/fr/services#vendre-voiture-rebut",
        },
        {
          title: "Vendre Voiture Endommagée",
          description: "Nous offrons également un prix équitable pour les voitures endommagées. Faites évaluer votre voiture et recevez une offre immédiate.",
          href: "/fr/services#vendre-voiture-endommagee",
        },
        {
          title: "Service de Collecte Gratuit",
          description: "Nous collectons votre voiture gratuitement dans toute la Hollande, à un moment qui vous convient.",
          href: "/fr/services#service-collecte-gratuit",
        },
        {
          title: "Décharge RDW",
          description: "Nous réglons directement la décharge RDW, vous n'avez plus à payer de taxe routière.",
          href: "/fr/services#decharge-rdw",
        },
        {
          title: "Recyclage Durable",
          description: "Votre voiture est recyclée de manière respectueuse de l'environnement, conformément à toutes les réglementations en vigueur.",
          href: "/fr/services#recyclage-durable",
        },
        {
          title: "Paiement Direct",
          description: "Après la collecte de votre voiture, vous recevez un paiement immédiat, en espèces ou par virement bancaire.",
          href: "/fr/services#paiement-direct",
        },
      ]
    },
    de: {
      title: "Unsere Dienstleistungen",
      description: "Van Velzen Autorecycling bietet ein komplettes Paket an Dienstleistungen für den Verkauf und das Recycling Ihres Autos.",
      services: [
        {
          title: "Schrottauto Verkaufen",
          description: "Verkaufen Sie Ihr Schrottauto zum besten Preis. Wir regeln alles, einschließlich des kostenlosen Abholservices.",
          href: "/de/dienstleistungen#schrottauto-verkaufen",
        },
        {
          title: "Beschädigtes Auto Verkaufen",
          description: "Wir bieten auch einen fairen Preis für beschädigte Autos. Lassen Sie Ihr Auto bewerten und erhalten Sie ein sofortiges Angebot.",
          href: "/de/dienstleistungen#beschaedigtes-auto-verkaufen",
        },
        {
          title: "Kostenloser Abholservice",
          description: "Wir holen Ihr Auto kostenlos ab, überall in Holland, zu einem Zeitpunkt, der Ihnen am besten passt.",
          href: "/de/dienstleistungen#kostenloser-abholservice",
        },
        {
          title: "RDW-Abmeldung",
          description: "Wir regeln direkt die RDW-Abmeldung, sodass Sie keine Kfz-Steuer mehr zahlen müssen.",
          href: "/de/dienstleistungen#rdw-abmeldung",
        },
        {
          title: "Nachhaltiges Recycling",
          description: "Ihr Auto wird auf umweltfreundliche Weise recycelt, konform mit allen geltenden Vorschriften.",
          href: "/de/dienstleistungen#nachhaltiges-recycling",
        },
        {
          title: "Direkte Zahlung",
          description: "Nach der Abholung Ihres Autos erhalten Sie eine sofortige Zahlung, wahlweise bar oder per Banküberweisung.",
          href: "/de/dienstleistungen#direkte-zahlung",
        },
      ]
    },
    es: {
      title: "Nuestros Servicios",
      description: "Van Velzen Autorecycling ofrece un paquete completo de servicios para vender y reciclar su coche.",
      services: [
        {
          title: "Vender Coche de Chatarra",
          description: "Venda su coche de chatarra por el mejor precio. Nos encargamos de todo, incluyendo el servicio de recogida gratuito.",
          href: "/es/servicios#vender-coche-chatarra",
        },
        {
          title: "Vender Coche Dañado",
          description: "También ofrecemos un precio justo para coches dañados. Haga tasar su coche y reciba una oferta inmediata.",
          href: "/es/servicios#vender-coche-danado",
        },
        {
          title: "Servicio de Recogida Gratuito",
          description: "Recogemos su coche gratuitamente en toda Holanda, en el momento que mejor le convenga.",
          href: "/es/servicios#servicio-recogida-gratuito",
        },
        {
          title: "Baja RDW",
          description: "Nos encargamos directamente de la baja RDW, para que no tenga que pagar más impuestos de circulación.",
          href: "/es/servicios#baja-rdw",
        },
        {
          title: "Reciclaje Sostenible",
          description: "Su coche se recicla de manera respetuosa con el medio ambiente, cumpliendo con todas las regulaciones vigentes.",
          href: "/es/servicios#reciclaje-sostenible",
        },
        {
          title: "Pago Directo",
          description: "Después de recoger su coche, recibe el pago inmediatamente, en efectivo o por transferencia bancaria.",
          href: "/es/servicios#pago-directo",
        },
      ]
    },
    it: {
      title: "I Nostri Servizi",
      description: "Van Velzen Autorecycling offre un pacchetto completo di servizi per la vendita e il riciclaggio della vostra auto.",
      services: [
        {
          title: "Vendere Auto Rottame",
          description: "Vendete la vostra auto rottame al miglior prezzo. Ci occupiamo di tutto, incluso il servizio di ritiro gratuito.",
          href: "/it/servizi#vendere-auto-rottame",
        },
        {
          title: "Vendere Auto Danneggiata",
          description: "Offriamo anche un prezzo onesto per auto danneggiate. Fate valutare la vostra auto e ricevete un'offerta immediata.",
          href: "/it/servizi#vendere-auto-danneggiata",
        },
        {
          title: "Servizio di Ritiro Gratuito",
          description: "Ritiriamo la vostra auto gratuitamente in tutta l'Olanda, quando vi fa più comodo.",
          href: "/it/servizi#servizio-ritiro-gratuito",
        },
        {
          title: "Radiazione RDW",
          description: "Ci occupiamo direttamente della radiazione RDW, così non dovete più pagare la tassa di circolazione.",
          href: "/it/servizi#radiazione-rdw",
        },
        {
          title: "Riciclaggio Sostenibile",
          description: "La vostra auto viene riciclata in modo rispettoso dell'ambiente, conformemente a tutte le normative vigenti.",
          href: "/it/servizi#riciclaggio-sostenibile",
        },
        {
          title: "Pagamento Diretto",
          description: "Dopo il ritiro della vostra auto, ricevete il pagamento immediatamente, in contanti o tramite bonifico bancario.",
          href: "/it/servizi#pagamento-diretto",
        },
      ]
    }
  }

  const currentContent = content[currentLang as keyof typeof content]

  const icons = [Car, Car, Truck, FileCheck, Recycle, Euro]
  const colors = ["text-blue-500", "text-purple-500", "text-green-500", "text-orange-500", "text-teal-500", "text-red-500"]
  const bgColors = ["bg-blue-50", "bg-purple-50", "bg-green-50", "bg-orange-50", "bg-teal-50", "bg-red-50"]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">{currentContent.title}</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            {currentContent.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentContent.services.map((service, index) => {
            const IconComponent = icons[index]
            return (
              <Link href={service.href} key={index} className="group">
                <Card className="h-full transition-all duration-300 hover:shadow-lg">
                  <CardHeader className="pb-2">
                    <div
                      className={cn("p-2 rounded-full w-12 h-12 flex items-center justify-center mb-2", bgColors[index])}
                    >
                      <IconComponent className={cn("h-6 w-6", colors[index])} />
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base text-gray-600">{service.description}</CardDescription>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
