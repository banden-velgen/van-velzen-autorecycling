"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image" // Using Next.js Image component
import { ArrowRight, Check } from "lucide-react"
import QuoteForm from "@/components/quote-form"
import { usePathname } from "next/navigation"

export default function HeroSection() {
  const pathname = usePathname()
  const currentLang = pathname.startsWith("/en") ? "en" : pathname.startsWith("/fr") ? "fr" : pathname.startsWith("/de") ? "de" : pathname.startsWith("/es") ? "es" : pathname.startsWith("/it") ? "it" : "nl"

  const content = {
    nl: {
      title: "De beste prijs voor uw (sloop/schade) auto",
      description: "Van Velzen Autorecycling is één van de grootste en duurzaamste autorecycling en demontagebedrijven in Nederland. Wij bieden altijd een realistische prijs voor uw (sloop/schade) auto.",
      features: [
        "Direct vrijblijvende offerte",
        "Gratis ophaalservice in heel Nederland",
        "Directe RDW vrijwaring",
        "Milieuvriendelijke recycling",
        "Contante betaling mogelijk",
      ],
      cta: "Hoe werkt het",
      ctaLink: "/proces"
    },
    en: {
      title: "The best price for your (scrap/damaged) car",
      description: "Van Velzen Autorecycling is one of the largest and most sustainable car recycling and dismantling companies in the Netherlands. We always offer a realistic price for your (scrap/damaged) car.",
      features: [
        "Direct no-obligation quote",
        "Free pickup service throughout the Netherlands",
        "Direct RDW deregistration",
        "Environmentally friendly recycling",
        "Cash payment possible",
      ],
      cta: "How it works",
      ctaLink: "/en/process"
    },
    fr: {
      title: "Le meilleur prix pour votre voiture (de rebut/endommagée)",
      description: "Van Velzen Autorecycling est l'une des plus grandes entreprises de recyclage et de démantèlement automobile durables des Pays-Bas. Nous offrons toujours un prix réaliste pour votre voiture (de rebut/endommagée).",
      features: [
        "Devis sans engagement direct",
        "Service de collecte gratuit dans toute la Hollande",
        "Décharge RDW directe",
        "Recyclage respectueux de l'environnement",
        "Paiement en espèces possible",
      ],
      cta: "Comment ça fonctionne",
      ctaLink: "/fr/processus"
    },
    de: {
      title: "Der beste Preis für Ihr (Schrott-/beschädigtes) Auto",
      description: "Van Velzen Autorecycling ist eines der größten und nachhaltigsten Autorecycling- und Demontageunternehmen in den Niederlanden. Wir bieten immer einen realistischen Preis für Ihr (Schrott-/beschädigtes) Auto.",
      features: [
        "Direktes unverbindliches Angebot",
        "Kostenloser Abholservice in ganz Holland",
        "Direkte RDW-Abmeldung",
        "Umweltfreundliches Recycling",
        "Barzahlung möglich",
      ],
      cta: "Wie funktioniert es",
      ctaLink: "/de/prozess"
    },
    es: {
      title: "El mejor precio para su coche (de chatarra/dañado)",
      description: "Van Velzen Autorecycling es una de las empresas más grandes y sostenibles de reciclaje y desguace de coches en los Países Bajos. Siempre ofrecemos un precio realista para su coche (de chatarra/dañado).",
      features: [
        "Oferta gratuita sin compromiso",
        "Servicio de recogida gratuito en toda Holanda",
        "Baja RDW directa",
        "Reciclaje respetuoso con el medio ambiente",
        "Pago en efectivo posible",
      ],
      cta: "Cómo funciona",
      ctaLink: "/es/proceso"
    },
    it: {
      title: "Il miglior prezzo per la vostra auto (rottame/danneggiata)",
      description: "Van Velzen Autorecycling è una delle più grandi e sostenibili aziende di riciclaggio e smontaggio auto dei Paesi Bassi. Offriamo sempre un prezzo realistico per la vostra auto (rottame/danneggiata).",
      features: [
        "Preventivo gratuito senza impegno",
        "Servizio di ritiro gratuito in tutta l'Olanda",
        "Radiazione RDW diretta",
        "Riciclaggio rispettoso dell'ambiente",
        "Pagamento in contanti possibile",
      ],
      cta: "Come funziona",
      ctaLink: "/it/processo"
    }
  }

  const currentContent = content[currentLang as keyof typeof content]

  return (
    <div className="relative bg-white overflow-hidden">
      {/* Background image with optimized loading */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/achtergrond.jpeg"
          alt="Background"
          fill
          priority // Mark as priority image
          sizes="100vw"
          quality={80}
          className="object-cover object-center opacity-50"
          style={{
            objectFit: "cover",
          }}
        />
      </div>

      {/* Background color with 70% opacity for blending */}
      <div className="absolute inset-0 z-0 bg-primary opacity-70" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <QuoteForm language={currentLang} />
          </div>

          <div className="text-white">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              {currentContent.title}
            </h1>
            <p className="text-xl text-white/90 mb-8">
              {currentContent.description}
            </p>

            <ul className="space-y-3 mb-8">
              {currentContent.features.map((item, index) => (
                <li key={index} className="flex items-center">
                  <Check className="h-5 w-5 text-secondary mr-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-white/10 text-white border-white/20 hover:bg-white/20"
              >
                <Link href={currentContent.ctaLink} className="flex items-center gap-2">
                  {currentContent.cta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
