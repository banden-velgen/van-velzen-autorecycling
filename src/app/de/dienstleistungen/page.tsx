import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Car, Truck, FileCheck, Recycle, Euro } from "lucide-react"
import type { Metadata } from "next"
import Header from "@/components/header"
import Footer from "@/components/footer"
import WhatsAppButton from "@/components/whatsapp-button"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: "Dienstleistungen | Van Velzen Autorecycling",
  description:
    "Entdecken Sie unsere Dienstleistungen: Schrottauto verkaufen, beschädigtes Auto verkaufen, kostenloser Abholservice, RDW-Abmeldung und nachhaltiges Recycling.",
  keywords:
    "Schrottauto verkaufen, beschädigtes Auto verkaufen, Autorecycling, kostenloser Abholservice, RDW-Abmeldung, nachhaltiges Recycling, direkte Zahlung",
  alternates: {
    canonical: "/de/dienstleistungen",
  },
  openGraph: {
    title: "Dienstleistungen | Van Velzen Autorecycling",
    description: "Entdecken Sie unsere Dienstleistungen für Autorecycling, vom Abholservice bis zur RDW-Abmeldung.",
    url: "/de/dienstleistungen",
  },
}

export default function ServicesPage() {
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
            <h1 className="text-4xl font-bold text-gray-900">Unsere Dienstleistungen</h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Van Velzen Autorecycling bietet ein komplettes Paket an Dienstleistungen für den Verkauf und das Recycling Ihres Autos
            </p>
          </div>
        </div>
      </section>

      <section id="schrottauto-verkaufen" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-50 p-2 rounded-full">
                  <Car className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Schrottauto Verkaufen</h2>
              </div>
              <p className="text-lg text-gray-600 mb-6">
                Haben Sie ein Auto, das das Ende seiner Lebensdauer erreicht hat? Bei Van Velzen Autorecycling erhalten Sie den
                besten Preis für Ihr Schrottauto. Wir machen den Verkaufsprozess einfach und sorgenfrei.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Unabhängig vom Zustand Ihres Autos sind wir interessiert. Ob Ihr Auto noch fährt oder nicht, wir
                bieten einen fairen Preis basierend auf dem aktuellen Marktwert und dem Wert der Teile und Materialien.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Kostenloser Abholservice in ganz Holland</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Direkte RDW-Abmeldung</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Barzahlung möglich</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Umweltfreundliches Recycling</span>
                </li>
              </ul>
              <Button asChild>
                <Link href="/de/#angebot-anfordern" className="flex items-center gap-2">
                  Angebot anfordern
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="order-1 lg:order-2 relative h-80 lg:h-96 rounded-lg overflow-hidden">
              <Image
                src="/images/tow-truck-1.jpeg?height=600&width=800"
                alt="Schrottauto verkaufen"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="beschaedigtes-auto-verkaufen" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 lg:h-96 rounded-lg overflow-hidden">
              <Image
                src="/images/tow-truck-2.jpeg?height=600&width=800"
                alt="Beschädigtes Auto verkaufen"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-purple-50 p-2 rounded-full">
                  <Car className="h-6 w-6 text-purple-500" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Beschädigtes Auto Verkaufen</h2>
              </div>
              <p className="text-lg text-gray-600 mb-6">
                Hat Ihr Auto durch einen Unfall oder eine andere Ursache Schaden genommen? Wir bieten einen fairen Preis
                für Ihr beschädigtes Auto, unabhängig vom Ausmaß der Schäden.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Oft ist der Verkauf eines beschädigten Autos an Van Velzen Autorecycling vorteilhafter als die Reparatur.
                Wir bewerten Ihr Auto und machen ein unverbindliches Angebot.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Kostenlose Schadensbewertung</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Unverbindliches Angebot</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Schnelle Abwicklung</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Alle Marken und Modelle</span>
                </li>
              </ul>
              <Button asChild>
                <Link href="/de/#angebot-anfordern" className="flex items-center gap-2">
                  Angebot anfordern
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="kostenloser-abholservice" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-green-50 p-2 rounded-full">
                  <Truck className="h-6 w-6 text-green-500" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Kostenloser Abholservice</h2>
              </div>
              <p className="text-lg text-gray-600 mb-6">
                Bei Van Velzen Autorecycling müssen Sie sich keine Sorgen um den Transport Ihres Autos machen. Wir
                holen Ihr Auto kostenlos ab, überall in Holland.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Unsere professionellen Fahrer kommen zu einem vereinbarten Zeitpunkt, um Ihr Auto abzuholen. Auch wenn Ihr Auto
                nicht mehr fährt oder schwere Schäden hat, können wir es mit unseren speziell ausgestatteten
                Transportfahrzeugen abholen.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Kostenloser Abholservice in ganz Holland</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Abholung zu einem Zeitpunkt, der Ihnen passt</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Professioneller Transport, auch für nicht fahrende Autos</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Alle Unterlagen werden vor Ort geregelt</span>
                </li>
              </ul>
              <Button asChild>
                <Link href="/de/#angebot-anfordern" className="flex items-center gap-2">
                  Angebot anfordern
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="order-1 lg:order-2 relative h-80 lg:h-96 rounded-lg overflow-hidden">
              <Image
                src="/images/tow-truck-3.jpeg?height=600&width=800"
                alt="Kostenloser Abholservice"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="rdw-abmeldung" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 lg:h-96 rounded-lg overflow-hidden">
              <Image
                src="/images/tow-truck-4.jpeg?height=600&width=800"
                alt="RDW-Abmeldung"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-orange-50 p-2 rounded-full">
                  <FileCheck className="h-6 w-6 text-orange-500" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">RDW-Abmeldung</h2>
              </div>
              <p className="text-lg text-gray-600 mb-6">
                Wenn Sie Ihr Auto an Van Velzen Autorecycling verkaufen, regeln wir direkt die RDW-Abmeldung.
                Das bedeutet, dass Sie ab diesem Zeitpunkt keine Kfz-Steuer mehr zahlen müssen und nicht mehr
                für das Auto haftbar sind.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Die Abmeldung ist ein wichtiges Dokument, das beweist, dass Sie nicht mehr der Eigentümer des
                Fahrzeugs sind. Wir stellen sicher, dass dies korrekt abgewickelt wird und Sie erhalten eine Abmeldebescheinigung.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Direkte Abmeldung bei der RDW</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Keine Kfz-Steuer mehr fällig</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Keine Haftung mehr für das Fahrzeug</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Sie erhalten eine Abmeldebescheinigung</span>
                </li>
              </ul>
              <Button asChild>
                <Link href="/de/#angebot-anfordern" className="flex items-center gap-2">
                  Angebot anfordern
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="nachhaltiges-recycling" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-teal-50 p-2 rounded-full">
                  <Recycle className="h-6 w-6 text-teal-500" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Nachhaltiges Recycling</h2>
              </div>
              <p className="text-lg text-gray-600 mb-6">
                Bei Van Velzen Autorecycling steht Nachhaltigkeit im Mittelpunkt. Wir recyceln Autos auf umweltfreundliche
                Weise und streben die höchstmögliche Wiederverwendung von Materialien an.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Unsere fortschrittlichen Recyclingprozesse stellen sicher, dass wir bis zu 95% eines Autos recyceln können.
                Alle schädlichen Stoffe werden sicher entfernt und nach den strengsten Umweltstandards verarbeitet.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-teal-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Bis zu 95% des Autos wird recycelt</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-teal-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Sichere Entfernung schädlicher Stoffe</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-teal-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Zertifiziert nach den strengsten Umweltstandards</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-teal-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Beitrag zur Kreislaufwirtschaft</span>
                </li>
              </ul>
              <Button asChild>
                <Link href="/de/#angebot-anfordern" className="flex items-center gap-2">
                  Angebot anfordern
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="order-1 lg:order-2 relative h-80 lg:h-96 rounded-lg overflow-hidden">
              <Image
                src="/images/tow-truck-5.jpeg?height=600&width=800"
                alt="Nachhaltiges Recycling"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="direkte-zahlung" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 lg:h-96 rounded-lg overflow-hidden">
              <Image
                src="/images/tow-truck-6.jpeg?height=600&width=800"
                alt="Direkte Zahlung"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-red-50 p-2 rounded-full">
                  <Euro className="h-6 w-6 text-red-500" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Direkte Zahlung</h2>
              </div>
              <p className="text-lg text-gray-600 mb-6">
                Bei Van Velzen Autorecycling erhalten Sie eine direkte Zahlung für Ihr Auto. Sie können zwischen
                Barzahlung oder Banküberweisung wählen, je nachdem, was für Sie am besten passt.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Wir bieten einen fairen Preis basierend auf dem aktuellen Marktwert und dem Wert der Teile und
                Materialien. Keine versteckten Kosten oder Überraschungen im Nachhinein.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Direkte Zahlung bei Abholung des Autos</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Wahl zwischen Barzahlung oder Banküberweisung</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Faire Preise ohne versteckte Kosten</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Transparente Preispolitik</span>
                </li>
              </ul>
              <Button asChild>
                <Link href="/de/#angebot-anfordern" className="flex items-center gap-2">
                  Angebot anfordern
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Bereit, Ihr Auto zu verkaufen?</h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Füllen Sie das Formular aus und erhalten Sie ein unverbindliches Angebot für Ihr Auto innerhalb von 24 Stunden.
          </p>
          <Button asChild size="lg" className="bg-white hover:bg-gray-100 text-primary">
            <Link href="/de/#angebot-anfordern" className="flex items-center gap-2">
              Angebot anfordern
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