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
  title: "Sloopauto laten ophalen | Gratis en snel | Van Velzen Autorecycling",
  description:
    "Laat uw sloopauto gratis ophalen door Van Velzen Autorecycling. ✓ Binnen 24 uur een bod ✓ Ophalen op een moment dat u uitkomt ✓ Direct RDW-vrijwaring ✓ Contante betaling. Vraag nu aan!",
  keywords:
    "sloopauto ophalen, auto laten ophalen, gratis auto laten ophalen, sloopauto ophaalservice, rdw vrijwaring, auto recycling, mijn auto verkopen, schadeauto laten ophalen",
  alternates: {
    canonical: "/sloopauto-laten-ophalen",
  },
  openGraph: {
    title: "Sloopauto laten ophalen | Gratis en snel | Van Velzen Autorecycling",
    description:
      "Laat uw sloopauto gratis ophalen door Van Velzen Autorecycling. Binnen 24 uur een bod, gratis ophalen in heel Nederland en directe RDW-vrijwaring.",
    url: "/sloopauto-laten-ophalen",
    type: "website",
    images: [
      {
        url: "/images/tow-truck.jpeg",
        width: 1200,
        height: 630,
        alt: "Sloopauto laten ophalen bij Van Velzen Autorecycling",
      },
    ],
  },}

export default function SloopautoLatenOphalenPage() {
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
          alt="Sloopauto laten ophalen"
          width={1200}
          height={600}
          className="w-full h-[400px] object-cover"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 md:px-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Sloopauto laten ophalen? Snel, gratis en professioneel
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl">
            Bij Van Velzen Autorecycling maken wij het u gemakkelijk om uw sloopauto te laten ophalen. Binnen 24 uur een
            eerlijke prijs, gratis ophalen in heel Nederland en directe RDW-vrijwaring.
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
              Professionele ophaalservice voor uw sloopauto
            </h2>
            <p className="text-gray-700 mb-4">
              Heeft u een auto die aan het einde van zijn levensduur is gekomen? Een voertuig met schade of hoge
              reparatiekosten? Bij Van Velzen Autorecycling bieden wij een complete oplossing voor het ophalen en
              recyclen van uw sloopauto. Wij zorgen voor een zorgeloze afhandeling, waarbij u nog geld ontvangt voor uw
              oude auto.
            </p>
            <p className="text-gray-700 mb-4">
              Als erkend autodemontagebedrijf werken wij volgens de strengste milieunormen en garanderen wij een
              correcte administratieve afhandeling, inclusief directe vrijwaring bij de RDW. Zo bent u direct van alle
              zorgen en aansprakelijkheden af.
            </p>
          </section>

          {/* Benefits Section */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-800">
              Voordelen van uw sloopauto laten ophalen door Van Velzen Autorecycling
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <span className="text-green-600 text-xl mr-2">✔</span>
                <p className="text-gray-700">
                  <span className="font-semibold">Gratis ophalen</span> – Geen kosten voor de ophaalservice in heel
                  Nederland.
                </p>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 text-xl mr-2">✔</span>
                <p className="text-gray-700">
                  <span className="font-semibold">Landelijke dekking</span> – Wij halen uw auto overal in Nederland op.
                </p>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 text-xl mr-2">✔</span>
                <p className="text-gray-700">
                  <span className="font-semibold">Snelle afhandeling</span> – Vaak al binnen 24 uur ophalen na akkoord.
                </p>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 text-xl mr-2">✔</span>
                <p className="text-gray-700">
                  <span className="font-semibold">Direct RDW-vrijwaringsbewijs</span> – Geen zorgen meer over
                  aansprakelijkheid.
                </p>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 text-xl mr-2">✔</span>
                <p className="text-gray-700">
                  <span className="font-semibold">Contante betaling</span> – U krijgt direct geld bij overdracht van uw
                  auto.
                </p>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 text-xl mr-2">✔</span>
                <p className="text-gray-700">
                  <span className="font-semibold">Certificaat Vernietiging</span> – Officieel bewijs van
                  milieuvriendelijke recycling.
                </p>
              </div>
              <div className="flex items-start md:col-span-2">
                <span className="text-green-600 text-xl mr-2">✔</span>
                <p className="text-gray-700">
                  <span className="font-semibold">Milieuvriendelijk</span> – Tot 95% van uw auto wordt gerecycled
                  volgens de strengste milieunormen.
                </p>
              </div>
            </div>
          </section>

          {/* Process Section */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-800">
              Zo werkt het bij Van Velzen Autorecycling
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
                  <p className="text-gray-700">
                    Vul ons online formulier in of bel direct voor een vrijblijvende offerte.
                  </p>
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
                  <p className="text-gray-700">Binnen 24 uur krijgt u een eerlijke prijsopgave voor uw auto.</p>
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
                  <p className="text-gray-700">Wij plannen een moment dat u schikt voor de gratis ophaalservice.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-800 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                      4
                    </div>
                    <h3 className="font-bold text-lg">Overdracht en betaling</h3>
                  </div>
                  <p className="text-gray-700">Bij ophalen ontvangt u direct geld en alle benodigde documenten.</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Types of Cars Section */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-800">Wij halen alle soorten auto's op</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Auto's met schade (ongeluk, roest, technische mankementen)</li>
              <li>Auto's zonder APK of die niet meer rijden</li>
              <li>Occasions met hoge reparatiekosten</li>
              <li>Alle merken en modellen</li>
              <li>Personenauto's en kleine bedrijfswagens</li>
              <li>Bestelbussen en lichte vrachtwagens</li>
            </ul>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-800">
              Veelgestelde vragen over sloopauto ophalen
            </h2>
            <div className="space-y-4">
              <div className="border-b pb-4">
                <h3 className="font-bold text-lg mb-2">Hoe snel kan mijn auto worden opgehaald?</h3>
                <p className="text-gray-700">
                  Bij Van Velzen Autorecycling streven we naar een snelle service. In de meeste gevallen kunnen we uw
                  auto al binnen 24-48 uur na acceptatie van onze offerte ophalen. We plannen altijd een ophaalmoment
                  dat voor u het beste uitkomt. Voor spoedgevallen kunnen we vaak zelfs dezelfde dag nog langskomen,
                  afhankelijk van onze planning en uw locatie.
                </p>
              </div>
              <div className="border-b pb-4">
                <h3 className="font-bold text-lg mb-2">Moet ik zelf iets regelen met de RDW?</h3>
                <p className="text-gray-700">
                  Nee, u hoeft zich geen zorgen te maken over de administratieve afhandeling. Wij verzorgen de volledige
                  vrijwaringsprocedure bij de RDW voor u. Na overdracht van uw auto ontvangt u direct het
                  vrijwaringsbewijs, waarmee u officieel niet meer aansprakelijk bent voor het voertuig. Dit betekent
                  dat u geen wegenbelasting, verzekering of andere kosten meer hoeft te betalen.
                </p>
              </div>
              <div className="border-b pb-4">
                <h3 className="font-bold text-lg mb-2">Krijg ik een bewijs van recycling?</h3>
                <p className="text-gray-700">
                  Ja, na de verwerking van uw auto ontvangt u een officieel Certificaat van vernietiging. Dit document
                  bevestigt dat uw voertuig volgens de geldende milieunormen is gerecycled. Bij Van Velzen Autorecycling
                  recyclen we tot 95% van elk voertuig, wat bijdraagt aan een duurzamere toekomst. Het certificaat dient
                  ook als bewijs dat uw auto op een legale en milieuvriendelijke manier is verwerkt.
                </p>
              </div>
              <div className="border-b pb-4">
                <h3 className="font-bold text-lg mb-2">Is de ophaalservice echt gratis?</h3>
                <p className="text-gray-700">
                  Ja, onze ophaalservice is 100% gratis in heel Nederland. Wij rekenen nooit kosten voor het ophalen van
                  uw auto, ongeacht uw locatie of de staat van het voertuig. De prijs die wij u bieden is het bedrag dat
                  u daadwerkelijk ontvangt bij overdracht. Er zijn geen verborgen kosten of verrassingen achteraf.
                </p>
              </div>
            </div>
          </section>

          {/* Why Choose Us */}
          <section className="mb-12 bg-gray-100 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-blue-800">Waarom kiezen voor Van Velzen Autorecycling?</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-green-600 text-xl mr-2">✔</span>
                <span>Al jaren betrouwbare partner in autorecycling met duizenden tevreden klanten</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 text-xl mr-2">✔</span>
                <span>Snelle en correcte afhandeling zonder verborgen kosten of verrassingen</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 text-xl mr-2">✔</span>
                <span>De beste prijs voor uw sloopauto gebaseerd op eerlijke marktwaarde</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 text-xl mr-2">✔</span>
                <span>Volledig ontzorgd van A tot Z met alle administratieve afhandeling</span>
              </li>
            </ul>
          </section>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Quote Form */}
          <div id="offerte" className="bg-gray-100 rounded-lg p-6 mb-8 sticky top-24">
            <h3 className="text-xl font-bold mb-4 text-blue-800">Bereken wat uw sloopauto waard is</h3>
            <p className="text-gray-700 mb-6">
              Waarom wachten? Laat uw oude auto geld opleveren in plaats van stof verzamelen. Bij Van Velzen
              Autorecycling regelen wij alles snel, eerlijk en milieuvriendelijk.
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
          Kies voor gemak, betrouwbaarheid en de hoogste prijs
        </h2>
        <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
          Bij Van Velzen Autorecycling zorgen we voor een zorgeloze ervaring bij het ophalen van uw sloopauto. Profiteer
          van onze jarenlange expertise en uitstekende service.
        </p>
        <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white">
          <Link href="#offerte">Vraag nu een offerte aan</Link>
        </Button>
      </section>

      {/* Schema.org structured data for FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Hoe snel kan mijn auto worden opgehaald?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Bij Van Velzen Autorecycling streven we naar een snelle service. In de meeste gevallen kunnen we uw auto al binnen 24-48 uur na acceptatie van onze offerte ophalen. We plannen altijd een ophaalmoment dat voor u het beste uitkomt. Voor spoedgevallen kunnen we vaak zelfs dezelfde dag nog langskomen, afhankelijk van onze planning en uw locatie.",
                },
              },
              {
                "@type": "Question",
                name: "Moet ik zelf iets regelen met de RDW?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Nee, u hoeft zich geen zorgen te maken over de administratieve afhandeling. Wij verzorgen de volledige vrijwaringsprocedure bij de RDW voor u. Na overdracht van uw auto ontvangt u direct het vrijwaringsbewijs, waarmee u officieel niet meer aansprakelijk bent voor het voertuig. Dit betekent dat u geen wegenbelasting, verzekering of andere kosten meer hoeft te betalen.",
                },
              },
              {
                "@type": "Question",
                name: "Krijg ik een bewijs van recycling?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Ja, na de verwerking van uw auto ontvangt u een officieel Certificaat Vernietiging. Dit document bevestigt dat uw voertuig volgens de geldende milieunormen is gerecycled. Bij Van Velzen Autorecycling recyclen we tot 95% van elk voertuig, wat bijdraagt aan een duurzamere toekomst. Het certificaat dient ook als bewijs dat uw auto op een legale en milieuvriendelijke manier is verwerkt.",
                },
              },
              {
                "@type": "Question",
                name: "Is de ophaalservice echt gratis?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Ja, onze ophaalservice is 100% gratis in heel Nederland. Wij rekenen nooit kosten voor het ophalen van uw auto, ongeacht uw locatie of de staat van het voertuig. De prijs die wij u bieden is het bedrag dat u daadwerkelijk ontvangt bij overdracht. Er zijn geen verborgen kosten of verrassingen achteraf.",
                },
              },
            ],
          }),
        }}
      />
    </div>
  )
        </main>
        <Footer />
      </div>
      <WhatsAppButton />
    </ThemeProvider>
  )
}