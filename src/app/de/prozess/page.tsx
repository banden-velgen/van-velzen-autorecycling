import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, PhoneCall, Truck, FileCheck, CreditCard, Recycle } from "lucide-react"
import type { Metadata } from "next"
import Header from "@/components/header"
import Footer from "@/components/footer"
import WhatsAppButton from "@/components/whatsapp-button"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: "Prozess | Van Velzen Autorecycling",
  description:
    "Erfahren Sie, wie der Verkaufsprozess Ihres Autos bei Van Velzen Autorecycling abläuft. In 5 einfachen Schritten zum besten Preis.",
  keywords:
    "Autoverkauf Prozess, Schrottauto verkaufen, beschädigtes Auto verkaufen, RDW-Abmeldung, kostenloser Abholservice, direkte Zahlung",
  alternates: {
    canonical: "/de/prozess",
  },
  openGraph: {
    title: "Prozess | Van Velzen Autorecycling",
    description: "Erfahren Sie, wie der Verkaufsprozess Ihres Autos in 5 einfachen Schritten abläuft.",
    url: "/de/prozess",
  },
}

export default function ProcessPage() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900">Wie funktioniert es?</h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              In 5 einfachen Schritten regeln wir den Verkauf und das Recycling Ihres Autos
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gray-200 hidden md:block"></div>

            <div className="space-y-12 relative">
              <div className="relative">
                <div className="md:absolute md:left-1/2 md:transform md:-translate-x-1/2 z-10 w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mx-auto md:mx-0 mb-4 md:mb-0">
                  <PhoneCall className="h-6 w-6 text-blue-500" />
                </div>

                <div className="md:grid md:grid-cols-2 gap-8">
                  <div className="md:text-right md:pr-16">
                    <div className="border-none shadow-none bg-transparent">
                      <div className="pb-2 px-0">
                        <h3 className="text-xl font-bold">Angebot anfordern</h3>
                      </div>
                      <div className="px-0">
                        <p className="text-base text-gray-600">
                          Füllen Sie das Formular mit Ihrem Kennzeichen und Ihren Kontaktdaten aus, um ein unverbindliches Angebot anzufordern.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block"></div>
                </div>
              </div>

              <div className="relative">
                <div className="md:absolute md:left-1/2 md:transform md:-translate-x-1/2 z-10 w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mx-auto md:mx-0 mb-4 md:mb-0">
                  <Truck className="h-6 w-6 text-green-500" />
                </div>

                <div className="md:grid md:grid-cols-2 gap-8">
                  <div className="hidden md:block"></div>
                  <div className="md:text-left md:pl-16">
                    <div className="border-none shadow-none bg-transparent">
                      <div className="pb-2 px-0">
                        <h3 className="text-xl font-bold">Kostenloser Abholservice</h3>
                      </div>
                      <div className="px-0">
                        <p className="text-base text-gray-600">
                          Nach Zustimmung holen wir Ihr Auto kostenlos ab, zu einem Zeitpunkt, der Ihnen am besten passt.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="md:absolute md:left-1/2 md:transform md:-translate-x-1/2 z-10 w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center mx-auto md:mx-0 mb-4 md:mb-0">
                  <FileCheck className="h-6 w-6 text-orange-500" />
                </div>

                <div className="md:grid md:grid-cols-2 gap-8">
                  <div className="md:text-right md:pr-16">
                    <div className="border-none shadow-none bg-transparent">
                      <div className="pb-2 px-0">
                        <h3 className="text-xl font-bold">RDW-Abmeldung</h3>
                      </div>
                      <div className="px-0">
                        <p className="text-base text-gray-600">
                          Wir regeln direkt die RDW-Abmeldung, sodass Sie keine Kfz-Steuer mehr zahlen müssen.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block"></div>
                </div>
              </div>

              <div className="relative">
                <div className="md:absolute md:left-1/2 md:transform md:-translate-x-1/2 z-10 w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center mx-auto md:mx-0 mb-4 md:mb-0">
                  <CreditCard className="h-6 w-6 text-purple-500" />
                </div>

                <div className="md:grid md:grid-cols-2 gap-8">
                  <div className="hidden md:block"></div>
                  <div className="md:text-left md:pl-16">
                    <div className="border-none shadow-none bg-transparent">
                      <div className="pb-2 px-0">
                        <h3 className="text-xl font-bold">Direkte Zahlung</h3>
                      </div>
                      <div className="px-0">
                        <p className="text-base text-gray-600">
                          Sie erhalten eine direkte Zahlung für Ihr Auto, wahlweise bar oder per Banküberweisung.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="md:absolute md:left-1/2 md:transform md:-translate-x-1/2 z-10 w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center mx-auto md:mx-0 mb-4 md:mb-0">
                  <Recycle className="h-6 w-6 text-teal-500" />
                </div>

                <div className="md:grid md:grid-cols-2 gap-8">
                  <div className="md:text-right md:pr-16">
                    <div className="border-none shadow-none bg-transparent">
                      <div className="pb-2 px-0">
                        <h3 className="text-xl font-bold">Nachhaltiges Recycling</h3>
                      </div>
                      <div className="px-0">
                        <p className="text-base text-gray-600">
                          Ihr Auto wird auf umweltfreundliche Weise recycelt, konform mit allen geltenden Vorschriften.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Warum Van Velzen Autorecycling wählen?</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Entdecken Sie die Vorteile unserer Dienstleistungen
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                <PhoneCall className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Schnelle Reaktion</h3>
              <p className="text-gray-600">
                Innerhalb von 24 Stunden erhalten Sie ein unverbindliches Angebot für Ihr Auto.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mb-4">
                <Truck className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Kostenloser Abholservice</h3>
              <p className="text-gray-600">
                Wir holen Ihr Auto kostenlos ab, überall in Holland, zu einem Zeitpunkt, der Ihnen passt.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center mb-4">
                <FileCheck className="h-6 w-6 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">RDW-Abmeldung</h3>
              <p className="text-gray-600">
                Wir regeln direkt die RDW-Abmeldung, sodass Sie keine Kfz-Steuer mehr zahlen müssen.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center mb-4">
                <CreditCard className="h-6 w-6 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Direkte Zahlung</h3>
              <p className="text-gray-600">
                Sie erhalten eine direkte Zahlung für Ihr Auto, wahlweise bar oder per Banküberweisung.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center mb-4">
                <Recycle className="h-6 w-6 text-teal-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Nachhaltiges Recycling</h3>
              <p className="text-gray-600">
                Ihr Auto wird auf umweltfreundliche Weise recycelt, konform mit allen geltenden Vorschriften.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mb-4">
                <ArrowRight className="h-6 w-6 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Einfacher Prozess</h3>
              <p className="text-gray-600">
                Der gesamte Verkaufsprozess ist einfach und sorgenfrei. Wir übernehmen alle Formalitäten.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Häufig gestellte Fragen</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Wie schnell kann ich ein Angebot erhalten?
                  </h3>
                  <p className="text-gray-600">
                    Innerhalb von 24 Stunden nach Ihrer Anfrage erhalten Sie ein unverbindliches Angebot für Ihr Auto.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Muss mein Auto noch fahren?
                  </h3>
                  <p className="text-gray-600">
                    Nein, Ihr Auto muss nicht mehr fahren. Wir holen auch nicht fahrende Autos kostenlos ab.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Wie läuft die RDW-Abmeldung ab?
                  </h3>
                  <p className="text-gray-600">
                    Wir regeln die RDW-Abmeldung direkt für Sie. Sie erhalten eine Abmeldebescheinigung und müssen keine Kfz-Steuer mehr zahlen.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Kann ich bar bezahlt werden?
                  </h3>
                  <p className="text-gray-600">
                    Ja, Sie können zwischen Barzahlung oder Banküberweisung wählen, je nachdem, was für Sie am besten passt.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative h-96 rounded-lg overflow-hidden">
              <Image
                src="/images/tow-truck.jpeg"
                alt="Van Velzen Autorecycling Prozess"
                fill
                className="object-cover"
              />
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
        </main>
        <Footer />
      </div>
      <WhatsAppButton />
    </ThemeProvider>
  )
}