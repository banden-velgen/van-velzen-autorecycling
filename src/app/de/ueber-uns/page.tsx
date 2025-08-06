import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Check, Award, Users, Leaf, ArrowRight } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import WhatsAppButton from "@/components/whatsapp-button"
import { ThemeProvider } from "@/components/theme-provider"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Über uns | Van Velzen Autorecycling",
  description:
    "Van Velzen Autorecycling ist ein Familienunternehmen mit mehr als 25 Jahren Erfahrung in der Autodemontage. Erfahren Sie mehr über unsere Geschichte, Mission und Vision.",
  keywords:
    "Autorecycling, Autodemontageunternehmen, Familienunternehmen, nachhaltige Autodemontage, über uns, Geschichte, Mission, Vision",
  alternates: {
    canonical: "/de/ueber-uns",
  },
  openGraph: {
    title: "Über uns | Van Velzen Autorecycling",
    description: "Erfahren Sie mehr über unsere Geschichte, Mission und Vision als Familienunternehmen in der Autodemontage.",
    url: "/de/ueber-uns",
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
            <h1 className="text-4xl font-bold text-gray-900">Über Van Velzen Autorecycling</h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Mehr als 25 Jahre Ihr vertrauensvoller Partner für Autodemontage und Recycling
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Unsere Geschichte</h2>
              <p className="text-lg text-gray-600 mb-6">
                Van Velzen Autorecycling ist ein Familienunternehmen, das vor 50 Jahren von A.C. van Velzen gegründet wurde.
                Was als kleine Autoverwertung begann, hat sich zu einem der größten und nachhaltigsten
                Autodemontageunternehmen der Niederlande entwickelt.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Im Laufe der Jahre haben wir uns zu einem führenden Unternehmen in der Branche entwickelt,
                mit einem starken Fokus auf Nachhaltigkeit und Kundenzufriedenheit. Heute wird das Unternehmen
                von der zweiten Generation der Familie Van Velzen geleitet, die die Tradition von Qualität und Service fortsetzt.
              </p>
              <p className="text-lg text-gray-600">
                Unsere langjährige Erfahrung und Expertise ermöglicht es uns, Ihnen den besten Service
                beim Verkauf Ihres Schrottautos oder beschädigten Autos zu bieten.
              </p>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden">
              <Image
                src="/images/tow-truck.jpeg"
                alt="Van Velzen Autorecycling Abschleppwagen mit Autos"
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
            <h2 className="text-3xl font-bold text-gray-900">Unsere Mission & Vision</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Wir streben eine nachhaltige Zukunft durch verantwortungsvolles Autorecycling an
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Unsere Mission</h3>
              <p className="text-lg text-gray-600 mb-6">
                Unsere Mission ist es, Autorecycling zugänglich, fair und nachhaltig zu machen. Wir bieten Kunden den besten
                Preis für ihr Schrottauto oder beschädigtes Auto, während wir gleichzeitig für eine umweltfreundliche
                Verarbeitung aller Materialien sorgen.
              </p>
              <ul className="space-y-3">
                {[
                  "Faire und transparente Preise",
                  "Ausgezeichneter Kundenservice",
                  "Umweltfreundliches Recycling",
                  "Einfacher und sorgenfreier Prozess",
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Unsere Vision</h3>
              <p className="text-lg text-gray-600 mb-6">
                Wir streben danach, der führende Akteur in der Autorecycling-Branche zu sein, bekannt für unseren
                nachhaltigen Ansatz, innovative Methoden und herausragenden Kundenservice. Wir möchten zu einer
                Kreislaufwirtschaft beitragen, in der Autos am Ende ihrer Lebensdauer eine wertvolle Quelle für Materialien darstellen.
              </p>
              <p className="text-lg text-gray-600">
                Durch kontinuierliche Investitionen in neue Technologien und Prozesse stellen wir sicher, dass wir
                in der Branche führend bleiben und die höchstmöglichen Recyclingquoten erreichen.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Warum Van Velzen Autorecycling wählen?</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Entdecken Sie die Vorteile der Zusammenarbeit mit einem erfahrenen und vertrauenswürdigen Partner
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="mx-auto w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">50+ Jahre Erfahrung</h3>
              <p className="text-gray-600">
                Mit mehr als 50 Jahren Erfahrung in der Branche wissen wir wie kein anderer, wie wir Ihnen
                den besten Service beim Verkauf Ihres Autos bieten können.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="mx-auto w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mb-4">
                <Leaf className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Nachhaltiger Ansatz</h3>
              <p className="text-gray-600">
                Wir recyceln Autos auf umweltfreundliche Weise und streben die höchstmögliche
                Wiederverwendung von Materialien an.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="mx-auto w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Familienunternehmen</h3>
              <p className="text-gray-600">
                Als Familienunternehmen legen wir großen Wert auf persönlichen Kontakt und eine
                ehrliche, transparente Arbeitsweise.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Button asChild size="lg">
              <Link href="/de/#angebot-anfordern" className="flex items-center gap-2">
                Angebot anfordern
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Zertifizierungen & Mitgliedschaften</h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-12">
              Van Velzen Autorecycling erfüllt alle gesetzlichen Anforderungen und ist Mitglied verschiedener
              Branchenorganisationen
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="bg-white/10 p-4 rounded-lg">
                  <div className="h-16 w-full relative">
                    <Image
                      src={`/placeholder.svg?height=64&width=180`}
                      alt={`Zertifizierung ${item}`}
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