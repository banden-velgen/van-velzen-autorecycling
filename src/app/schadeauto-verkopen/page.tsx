import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import QuoteForm from "@/components/quote-form"
import Header from "@/components/header"
import Footer from "@/components/footer"
import WhatsAppButton from "@/components/whatsapp-button"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: "Schadeauto verkopen | Hoogste prijs | Van Velzen Autorecycling",
  description:
    "Verkoop uw schadeauto voor de beste prijs aan Van Velzen Autorecycling. ✓ Gratis ophalen ✓ Directe betaling ✓ RDW-vrijwaring ✓ Landelijke dekking.",
  keywords:
    "schadeauto verkopen, beschadigde auto verkopen, total loss auto verkopen, ongeluksauto verkopen, auto met schade verkopen, auto recycling, rdw vrijwaring",
  alternates: {
    canonical: "/schadeauto-verkopen",
  },
  openGraph: {
    title: "Schadeauto verkopen | Hoogste prijs | Van Velzen Autorecycling",
    description:
      "Verkoop uw schadeauto voor de beste prijs aan Van Velzen Autorecycling. ✓ Gratis ophalen ✓ Directe betaling ✓ RDW-vrijwaring ✓ Landelijke dekking.",
    url: "/schadeauto-verkopen",
    type: "website",
    images: [
      {
        url: "/images/tow-truck.jpeg",
        width: 1200,
        height: 630,
        alt: "Schadeauto Verkopen bij Van Velzen Autorecycling",
      },
    ],
  },}

export default function SchadeautoVerkopen() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
  return (
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="relative rounded-lg overflow-hidden mb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-700/70 z-10"></div>
        <Image
          src="/images/tow-truck.jpeg"
          alt="Schadeauto verkopen"
          width={1200}
          height={600}
          className="w-full h-[400px] object-cover"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 md:px-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Schadeauto verkopen? Ontvang de beste prijs bij Van Velzen Autorecycling
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl">
            Heeft u een schadeauto die u wilt verkopen? Bij Van Velzen Autorecycling krijgt u altijd een eerlijke en
            marktconforme prijs voor uw beschadigde voertuig.
          </p>
          <div className="mt-8">
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white">
              <Link href="#offerte">Vraag direct een offerte aan</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Intro Section */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-blue-800">
              Maximale waarde voor uw beschadigde auto
            </h2>
            <p className="text-gray-700 mb-4">
              Of het nu gaat om lichte of zware schade, een auto met schade na een ongeluk of als een auto total loss is verklaard - bij Van Velzen Autorecycling kopen
              wij alle schadeauto's aan tegen de hoogst mogelijke vergoeding. Onze experts beoordelen uw voertuig op
              basis van de actuele marktwaarde, herbruikbare onderdelen en materialen, zodat u altijd een eerlijke prijs
              ontvangt.
            </p>
            <p className="text-gray-700 mb-4">
              Wij begrijpen dat het verkopen van een beschadigde auto een stressvolle ervaring kan zijn. Daarom maken
              wij het proces zo eenvoudig en transparant mogelijk, met snelle afhandeling en gratis ophaalservice in
              heel Nederland.
            </p>
          </section>

          {/* Benefits Section */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-800">
              Waarom uw schadeauto verkopen aan Van Velzen Autorecycling?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <span className="text-green-600 text-xl mr-2">✅</span>
                <p className="text-gray-700">
                  <span className="font-semibold">Beste prijs voor beschadigde auto's</span> – Wij bieden de hoogst
                  mogelijke vergoeding op basis van actuele marktwaarde.
                </p>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 text-xl mr-2">✅</span>
                <p className="text-gray-700">
                  <span className="font-semibold">Gratis schade-inschatting</span> – Onze experts beoordelen uw auto
                  zonder kosten.
                </p>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 text-xl mr-2">✅</span>
                <p className="text-gray-700">
                  <span className="font-semibold">Snelle afhandeling</span> – Vaak binnen 24 uur geregeld.
                </p>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 text-xl mr-2">✅</span>
                <p className="text-gray-700">
                  <span className="font-semibold">Gratis ophalen in heel Nederland</span> – Waar u ook woont, wij komen
                  kosteloos naar u toe.
                </p>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 text-xl mr-2">✅</span>
                <p className="text-gray-700">
                  <span className="font-semibold">Directe RDW-vrijwaring</span> – U bent direct van alle
                  aansprakelijkheid af.
                </p>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 text-xl mr-2">✅</span>
                <p className="text-gray-700">
                  <span className="font-semibold">Contante betaling mogelijk</span> – Ontvang direct uw geld.
                </p>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 text-xl mr-2">✅</span>
                <p className="text-gray-700">
                  <span className="font-semibold">Milieuvriendelijke verwerking</span> – Wij recyclen volgens de hoogste
                  milieunormen.
                </p>
              </div>
            </div>
          </section>

          {/* Types of Cars Section */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-800">Welke schadeauto's kopen wij aan?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <span className="text-green-600 text-xl mr-2">✓</span>
                <p className="text-gray-700">Total loss auto's</p>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 text-xl mr-2">✓</span>
                <p className="text-gray-700">Auto's met lichte tot zware schade</p>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 text-xl mr-2">✓</span>
                <p className="text-gray-700">Auto's met schade na een ongeval</p>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 text-xl mr-2">✓</span>
                <p className="text-gray-700">Auto's met mechanische schade</p>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 text-xl mr-2">✓</span>
                <p className="text-gray-700">Auto's met waterschade</p>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 text-xl mr-2">✓</span>
                <p className="text-gray-700">Voertuigen met brandschade</p>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 text-xl mr-2">✓</span>
                <p className="text-gray-700">Auto's met chassis schade</p>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 text-xl mr-2">✓</span>
                <p className="text-gray-700">Alle merken en modellen</p>
              </div>
            </div>
          </section>

          {/* Process Section */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-800">
              Hoe werkt het verkopen van uw schadeauto?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-800 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                      1
                    </div>
                    <h3 className="font-bold text-lg">Aanmelden</h3>
                  </div>
                  <p className="text-gray-700">Stuur foto's en gegevens via ons online formulier of bel direct.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-800 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                      2
                    </div>
                    <h3 className="font-bold text-lg">Offerte ontvangen</h3>
                  </div>
                  <p className="text-gray-700">Binnen 2 uur een eerlijk bod op uw schadeauto.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-800 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                      3
                    </div>
                    <h3 className="font-bold text-lg">Afspraak maken</h3>
                  </div>
                  <p className="text-gray-700">Kies zelf een moment voor inspectie of directe ophaling.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-800 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                      4
                    </div>
                    <h3 className="font-bold text-lg">Overdracht & betaling</h3>
                  </div>
                  <p className="text-gray-700">U ontvangt direct geld en officiële documenten.</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Value Factors Section */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-800">
              Wat bepaalt de waarde van uw schadeauto?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <span className="text-green-600 text-xl mr-2">✔</span>
                <p className="text-gray-700">
                  <span className="font-semibold">Type en omvang van de schade</span> – De ernst en locatie van de
                  schade beïnvloeden de waarde.
                </p>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 text-xl mr-2">✔</span>
                <p className="text-gray-700">
                  <span className="font-semibold">Merk, model en bouwjaar</span> – Nieuwere en populaire modellen hebben
                  vaak meer waarde.
                </p>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 text-xl mr-2">✔</span>
                <p className="text-gray-700">
                  <span className="font-semibold">Staat van de onderdelen</span> – Herbruikbare onderdelen verhogen de
                  waarde.
                </p>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 text-xl mr-2">✔</span>
                <p className="text-gray-700">
                  <span className="font-semibold">Actuele metaalprijzen</span> – De marktwaarde van recyclebare
                  materialen.
                </p>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 text-xl mr-2">✔</span>
                <p className="text-gray-700">
                  <span className="font-semibold">Herbruikbare componenten</span> – Werkende elektronica, motor en
                  transmissie verhogen de waarde.
                </p>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-800">
              Veelgestelde vragen over schadeauto verkopen
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg mb-2">Hoe snel kan ik mijn schadeauto verkopen?</h3>
                <p className="text-gray-700">
                  Vaak al binnen 24 uur na acceptatie van onze offerte. We streven ernaar het proces zo snel mogelijk af
                  te handelen zodat u niet lang hoeft te wachten.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Moet ik mijn schadeauto eerst laten keuren?</h3>
                <p className="text-gray-700">
                  Nee, wij beoordelen uw auto op basis van uw informatie en eventueel foto's. Onze experts kunnen aan de
                  hand hiervan een accurate inschatting maken.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Is ophalen echt gratis?</h3>
                <p className="text-gray-700">
                  Ja, wij rekenen nooit kosten voor het ophalen van uw schadeauto, ongeacht uw locatie in Nederland.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Wat gebeurt er met mijn auto na verkoop?</h3>
                <p className="text-gray-700">
                  Herbruikbare onderdelen worden gedemonteerd en de rest wordt milieuvriendelijk gerecycled volgens de
                  strengste milieunormen.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Quote Form */}
          <div id="offerte" className="bg-gray-100 rounded-lg p-6 mb-8 sticky top-24">
            <h3 className="text-xl font-bold mb-4 text-blue-800">Bereken wat uw schadeauto waard is</h3>
            <p className="text-gray-700 mb-6">
              Laat uw beschadigde auto geld opleveren. Bij Van Velzen Autorecycling regelen wij alles snel, eerlijk en
              milieuvriendelijk.
            </p>
            <QuoteForm />
          </div>

          {/* Contact Info */}
          <div className="bg-blue-800 text-white rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4">Direct contact</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span>06-86301771</span>
              </div>
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>info@vanvelzenautorecycling.nl</span>
              </div>
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                  />
                </svg>
                <span>WhatsApp: 06-86301771</span>
              </div>
            </div>
            <div className="mt-6">
              <Button asChild variant="outline" className="w-full bg-white text-blue-800 hover:bg-gray-100">
                <Link href="/contact">Neem contact met ons op</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="mt-12 bg-blue-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-blue-800">
          Kies voor betrouwbaarheid, snelheid en de beste prijs
        </h2>
        <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
          Bij Van Velzen Autorecycling zorgen we voor een zorgeloze ervaring bij het verkopen van uw schadeauto.
          Profiteer van onze jarenlange expertise en uitstekende service.
        </p>
        <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white">
          <Link href="#offerte">Vraag direct een offerte aan</Link>
        </Button>
      </section>
    </div>
  )
        </main>
        <Footer />
      </div>
      <WhatsAppButton />
    </ThemeProvider>
  )
}