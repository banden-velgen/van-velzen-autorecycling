import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Check, Award, Users, Leaf, ArrowRight } from "lucide-react"
import type { Metadata } from "next"
import Header from "@/components/header"
import Footer from "@/components/footer"
import WhatsAppButton from "@/components/whatsapp-button"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: "Chi Siamo | Van Velzen Autorecycling",
  description:
    "Van Velzen Autorecycling è un'azienda familiare con oltre 25 anni di esperienza nello smontaggio auto. Scopri la nostra storia, missione e visione.",
  keywords:
    "autorecycling, azienda smontaggio auto, azienda familiare, smontaggio auto sostenibile, chi siamo, storia, missione, visione",
  alternates: {
    canonical: "/it/chi-siamo",
  },
  openGraph: {
    title: "Chi Siamo | Van Velzen Autorecycling",
    description: "Scopri la nostra storia, missione e visione come azienda familiare nello smontaggio auto.",
    url: "/it/chi-siamo",
  },
}

export default function AboutPage() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900">Chi Siamo - Van Velzen Autorecycling</h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Da oltre 25 anni il tuo partner affidabile per lo smontaggio e il riciclaggio auto
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">La Nostra Storia</h2>
              <p className="text-lg text-gray-600 mb-6">
                Van Velzen Autorecycling è un'azienda familiare fondata 50 anni fa da A.C. van Velzen.
                Quello che è iniziato come una piccola demolizione auto è cresciuto fino a diventare una delle più grandi
                e sostenibili aziende di smontaggio auto dei Paesi Bassi.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Nel corso degli anni ci siamo sviluppati in un'azienda leader nel settore, con una forte
                attenzione alla sostenibilità e alla soddisfazione del cliente. Attualmente l'azienda è guidata dalla seconda generazione
                della famiglia Van Velzen, che continua la tradizione di qualità e servizio.
              </p>
              <p className="text-lg text-gray-600">
                La nostra pluriennale esperienza e competenza ci permettono di offrirvi il miglior servizio
                nella vendita della vostra auto rottame o auto danneggiata.
              </p>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden">
              <Image
                src="/images/tow-truck.jpeg"
                alt="Van Velzen Autorecycling carro attrezzi con auto"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">La Nostra Missione & Visione</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Ci impegniamo per un futuro sostenibile attraverso il riciclaggio responsabile delle auto
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">La Nostra Missione</h3>
              <p className="text-lg text-gray-600 mb-6">
                La nostra missione è rendere il riciclaggio auto accessibile, onesto e sostenibile. Offriamo ai clienti il miglior
                prezzo per la loro auto rottame o auto danneggiata, garantendo al contempo una lavorazione
                rispettosa dell'ambiente di tutti i materiali.
              </p>
              <ul className="space-y-3">
                {[
                  "Prezzi onesti e trasparenti",
                  "Eccellente servizio clienti",
                  "Riciclaggio rispettoso dell'ambiente",
                  "Processo semplice e senza preoccupazioni",
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">La Nostra Visione</h3>
              <p className="text-lg text-gray-600 mb-6">
                Ci impegniamo a essere il leader nel settore del riciclaggio auto, noti per il nostro
                approccio sostenibile, metodi innovativi e servizio clienti eccellente. Vogliamo contribuire a un'economia
                circolare in cui le auto alla fine della loro vita utile diventino una preziosa fonte di materiali.
              </p>
              <p className="text-lg text-gray-600">
                Investendo continuamente in nuove tecnologie e processi, ci assicuriamo di rimanere all'avanguardia
                nel settore e di raggiungere le più alte percentuali di riciclaggio possibili.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Perché Scegliere Van Velzen Autorecycling?</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Scopri i vantaggi di collaborare con un partner esperto e affidabile
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="mx-auto w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">50+ Anni di Esperienza</h3>
              <p className="text-gray-600">
                Con oltre 50 anni di esperienza nel settore, sappiamo come nessun altro come offrirvi il miglior servizio
                nella vendita della vostra auto.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="mx-auto w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mb-4">
                <Leaf className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Approccio Sostenibile</h3>
              <p className="text-gray-600">
                Ricicliamo le auto in modo rispettoso dell'ambiente, puntando al massimo riutilizzo
                possibile dei materiali.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="mx-auto w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Azienda Familiare</h3>
              <p className="text-gray-600">
                Come azienda familiare, diamo grande valore al contatto personale e a un modo di lavorare
                onesto e trasparente.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Button asChild size="lg">
              <Link href="/it/#richiedi-preventivo" className="flex items-center gap-2">
                Richiedi preventivo
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Certificazioni & Appartenenze</h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-12">
              Van Velzen Autorecycling soddisfa tutti i requisiti legali ed è membro di diverse
              organizzazioni di settore
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="bg-white/10 p-4 rounded-lg">
                  <div className="h-16 w-full relative">
                    <Image
                      src={`/placeholder.svg?height=64&width=180`}
                      alt={`Certificazione ${item}`}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
        </main>
        <Footer />
      </div>
      <WhatsAppButton />
    </ThemeProvider>
  )
}