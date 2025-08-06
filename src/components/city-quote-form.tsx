"use client"

import { QuoteForm } from "./quote-form"
import { usePathname } from "next/navigation"

interface CityQuoteFormProps {
  cityName: string
}

export function CityQuoteForm({ cityName }: CityQuoteFormProps) {
  const pathname = usePathname()
  const currentLang = pathname.startsWith("/en") ? "en" : pathname.startsWith("/fr") ? "fr" : pathname.startsWith("/de") ? "de" : pathname.startsWith("/es") ? "es" : pathname.startsWith("/it") ? "it" : "nl"

  const content = {
    nl: {
      title: `Ontvang vandaag nog een bod op uw sloopauto in ${cityName}!`,
      description: "Waarom wachten? Laat uw oude auto geld opleveren in plaats van stof verzamelen. Bij Van Velzen Autorecycling regelen wij alles snel, eerlijk en milieuvriendelijk."
    },
    en: {
      title: `Receive an offer for your scrap car in ${cityName} today!`,
      description: "Why wait? Let your old car earn money instead of collecting dust. At Van Velzen Autorecycling, we arrange everything quickly, fairly and environmentally friendly."
    },
    de: {
      title: `Erhalten Sie noch heute ein Angebot für Ihr Schrottauto in ${cityName}!`,
      description: "Warum warten? Lassen Sie Ihr altes Auto Geld verdienen, anstatt Staub zu sammeln. Bei Van Velzen Autorecycling regeln wir alles schnell, fair und umweltfreundlich."
    },
    es: {
      title: `¡Reciba hoy mismo una oferta por su coche de chatarra en ${cityName}!`,
      description: "¿Por qué esperar? Deje que su coche viejo gane dinero en lugar de recoger polvo. En Van Velzen Autorecycling, organizamos todo de forma rápida, justa y respetuosa con el medio ambiente."
    },
    fr: {
      title: `Recevez aujourd'hui une offre pour votre voiture de rebut à ${cityName} !`,
      description: "Pourquoi attendre ? Laissez votre vieille voiture gagner de l'argent au lieu de ramasser la poussière. Chez Van Velzen Autorecycling, nous organisons tout rapidement, équitablement et de manière écologique."
    },
    it: {
      title: `Ricevete oggi stesso un'offerta per la vostra auto rottame a ${cityName}!`,
      description: "Perché aspettare? Lasciate che la vostra auto vecchia guadagni denaro invece di raccogliere polvere. Da Van Velzen Autorecycling, organizziamo tutto rapidamente, onestamente e rispettando l'ambiente."
    }
  }

  const currentContent = content[currentLang as keyof typeof content] || content.nl

  return (
    <div id="offerte" className="bg-gray-100 rounded-lg p-6 mb-8 sticky top-24">
      <h3 className="text-xl font-bold mb-4 text-blue-800">{currentContent.title}</h3>
      <p className="text-gray-700 mb-6">
        {currentContent.description}
      </p>
      <QuoteForm language={currentLang} />
    </div>
  )
}

export { CityQuoteForm as default }
