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
  title: "Sloopauto's gevraagd | Hoogste prijs | Van Velzen Autorecycling",
  description:
    "Wij kopen uw sloopauto tegen top prijzen! ✓ Gratis ophalen ✓ Directe betaling ✓ RDW-vrijwaring ✓ Landelijke dekking. Vraag nu een offerte aan.",
  keywords:
    "sloopautos gevraagd, sloopauto verkopen, auto recycling, autowrak verkopen, kapotte auto verkopen, rdw vrijwaring, gratis sloopauto ophalen",
  alternates: {
    canonical: "/sloopautos-gevraagd",
  },
  openGraph: {
    title: "Sloopauto's gevraagd | Hoogste prijs | Van Velzen Autorecycling",
    description:
      "Wij kopen uw sloopauto voor een top prijs! ✓ Gratis ophalen ✓ Directe betaling ✓ RDW-vrijwaring ✓ Landelijke dekking. Vraag nu een offerte aan.",
    url: "/sloopautos-gevraagd",
    type: "website",
    images: [
      {
        url: "/images/tow-truck.jpeg",
        width: 1200,
        height: 630,
        alt: "Sloopauto's gevraagd bij Van Velzen Autorecycling",
      },
    ],
  },}

export default function SloopautoGevraagd() {
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
          alt="Sloopauto's gevraagd"
          width={1200}
          height={600}
          className="w-full h-[400px] object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 1200px"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 md:px-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Sloopauto's gevraagd - Beste prijs bij Van Velzen Autorecycling
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl">
            Wij kopen dagelijks sloopauto's op in heel Nederland! Of uw auto nu rijdt of niet, beschadigd is of gewoon
            aan het einde van zijn levensduur - wij bieden altijd een eerlijke prijs.
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
              Wij zijn op zoek naar sloopauto's in heel Nederland
            </h2>
            <p className="text-gray-700 mb-4">
              Bij Van Velzen Autorecycling zijn wij continu op zoek naar sloopauto's voor recycling en onderdelen. Wij
              bieden een professionele en milieuvriendelijke oplossing voor uw oude, kapotte of beschadigde auto,
              ongeacht de staat waarin deze verkeert. Met onze jarenlange ervaring in de autorecycling garanderen wij
              een eerlijke prijs en een zorgeloze afhandeling.
            </p>
            <p className="text-gray-700">
              Heeft u een auto die niet meer de moeite waard is om te repareren? Of een voertuig dat al jaren stilstaat?
              Wij zijn geïnteresseerd! Onze experts beoordelen uw auto op basis van gewicht, herbruikbare onderdelen en
              actuele metaalprijzen om u de beste prijs te bieden.
            </p>
          </section>

          {/* Benefits Section */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-800">Waarom uw sloopauto aan ons verkopen?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <span className="text-green-600 text-xl mr-2">✓</span>
                <p className="text-gray-700">
                  <span className="font-semibold">Hoogste prijzen voor uw oude auto</span> – Wij bieden marktconforme
                  prijzen gebaseerd op actuele metaalwaarden en herbruikbare onderdelen.
                </p>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 text-xl mr-2">✓</span>
                <p className="text-gray-700">
                  <span className="font-semibold">Gratis ophalen in heel Nederland</span> – Onze ophaalservice is
                  volledig kosteloos, ongeacht uw locatie.
                </p>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 text-xl mr-2">✓</span>
                <p className="text-gray-700">
                  <span className="font-semibold">Directe RDW-vrijwaring bij overdracht</span> – U bent direct
                  gevrijwaard van alle aansprakelijkheden.
                </p>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 text-xl mr-2">✓</span>
                <p className="text-gray-700">
                  <span className="font-semibold">Contante betaling mogelijk</span> – Ontvang direct geld voor uw
                  sloopauto bij overdracht.
                </p>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 text-xl mr-2">✓</span>
                <p className="text-gray-700">
                  <span className="font-semibold">Certificaat van Vernietiging inbegrepen</span> – Alle wettelijke
                  documenten worden door ons verzorgd.
                </p>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 text-xl mr-2">✓</span>
                <p className="text-gray-700">
                  <span className="font-semibold">Milieuvriendelijke recycling</span> – Wij verwerken uw auto volgens de
                  strengste milieunormen.
                </p>
              </div>
            </div>
          </section>

          {/* Types of Cars Section */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-800">
              Welke sloopauto's zijn wij op zoek naar?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <span className="text-green-600 text-xl mr-2">✓</span>
                <p className="text-gray-700">Auto's met mechanische problemen</p>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 text-xl mr-2">✓</span>
                <p className="text-gray-700">Voertuigen met schade (ongeluk, roest, brand)</p>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 text-xl mr-2">✓</span>
                <p className="text-gray-700">Auto's zonder APK of die niet meer rijden</p>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 text-xl mr-2">✓</span>
                <p className="text-gray-700">Occasions met hoge reparatiekosten</p>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 text-xl mr-2">✓</span>
                <p className="text-gray-700">Oude auto's aan het einde van hun levensduur</p>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 text-xl mr-2">✓</span>
                <p className="text-gray-700">Alle merken en modellen</p>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 text-xl mr-2">✓</span>
                <p className="text-gray-700">Personenauto's en kleine bestelwagens</p>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 text-xl mr-2">✓</span>
                <p className="text-gray-700">Auto's met brandschade of waterschade</p>
              </div>
            </div>
          </section>

          {/* Process Section */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-800">
              Ons aankoopproces in 4 eenvoudige stappen
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-800 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                      1
                    </div>
                    <h3 className="font-bold text-lg">Aanmelding</h3>
                  </div>
                  <p className="text-gray-700">Bel, mail of vul ons online formulier in met de gegevens van uw auto.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-800 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                      2
                    </div>
                    <h3 className="font-bold text-lg">Waardebepaling</h3>
                  </div>
                  <p className="text-gray-700">Ontvang binnen 2 uur een eerlijke prijsindicatie voor uw sloopauto.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-800 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                      3
                    </div>
                    <h3 className="font-bold text-lg">Ophaalafspraak</h3>
                  </div>
                  <p className="text-gray-700">
                    Wij halen uw auto gratis op wanneer het u schikt, vaak al binnen 24-48 uur.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-800 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                      4
                    </div>
                    <h3 className="font-bold text-lg">Overdracht</h3>
                  </div>
                  <p className="text-gray-700">Directe betaling en officiële documenten, inclusief RDW-vrijwaring.</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Value Factors Section */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-800">
              Wat bepaalt de waarde van uw sloopauto?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <span className="text-green-600 text-xl mr-2">✓</span>
                <div>
                  <p className="font-semibold text-gray-800">Gewicht en metaalprijzen</p>
                  <p className="text-gray-700">
                    De basiswaarde wordt bepaald door het gewicht van uw auto en de actuele metaalprijzen.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 text-xl mr-2">✓</span>
                <div>
                  <p className="font-semibold text-gray-800">Staat van herbruikbare onderdelen</p>
                  <p className="text-gray-700">Werkende onderdelen die hergebruikt kunnen worden verhogen de waarde.</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 text-xl mr-2">✓</span>
                <div>
                  <p className="font-semibold text-gray-800">Merk en model</p>
                  <p className="text-gray-700">Populaire merken en modellen hebben vaak meer waardevolle onderdelen.</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 text-xl mr-2">✓</span>
                <div>
                  <p className="font-semibold text-gray-800">Actuele marktvraag</p>
                  <p className="text-gray-700">De vraag naar specifieke onderdelen kan de waarde beïnvloeden.</p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-800">Veelgestelde vragen</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg text-gray-800 mb-2">Hoe snel kan mijn auto worden opgehaald?</h3>
                <p className="text-gray-700">
                  Vaak al binnen 24-48 uur na akkoord op onze offerte. We plannen de ophaling op een moment dat u het
                  beste uitkomt.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-800 mb-2">Moet ik zelf iets regelen met de RDW?</h3>
                <p className="text-gray-700">
                  Nee, wij zorgen voor de volledige administratieve afhandeling. U ontvangt direct een vrijwaringsbewijs
                  bij overdracht van uw auto.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-800 mb-2">Is de ophaalservice echt gratis?</h3>
                <p className="text-gray-700">
                  Ja, wij rekenen nooit kosten voor het ophalen van sloopauto's, ongeacht uw locatie in Nederland.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-800 mb-2">Wat gebeurt er met mijn auto na verkoop?</h3>
                <p className="text-gray-700">
                  Uw auto wordt milieuvriendelijk gedemonteerd. Herbruikbare onderdelen worden gereviseerd en opnieuw
                  gebruikt, terwijl de rest van de materialen volgens strenge milieunormen wordt gerecycled.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-800 mb-2">Welke documenten heb ik nodig bij de verkoop?</h3>
                <p className="text-gray-700">
                  U heeft het kentekenbewijs en uw legitimatiebewijs nodig. Als u deze niet meer heeft, kunnen wij in
                  veel gevallen alsnog helpen.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Quote Form */}
          <div id="offerte" className="bg-gray-100 rounded-lg p-6 mb-8 sticky top-24">
            <h3 className="text-xl font-bold mb-4 text-blue-800">Bereken wat uw sloopauto waard is</h3>
            <p className="text-gray-700 mb-6">
              Laat uw oude auto geld opleveren. Bij Van Velzen Autorecycling regelen wij alles snel, eerlijk en
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
          Bij Van Velzen Autorecycling zorgen we voor een zorgeloze ervaring bij het verkopen van uw sloopauto.
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