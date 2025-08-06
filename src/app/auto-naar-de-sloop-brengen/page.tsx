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
  title: "Auto naar de Sloop Brengen | Hoogste Prijs | Van Velzen Autorecycling",
  description:
    "Breng uw schade/sloop auto naar de sloop bij Van Velzen Autorecycling. ✓ Hoogste prijs ✓ RDW-vrijwaring ✓ Milieuvriendelijke recycling ✓ Zelf brengen of gratis ophalen.",
  keywords:
    "auto naar de sloop brengen, auto recycling, sloopauto inleveren, schadeauto verkopen, auto slopen, rdw vrijwaring, auto sloop locatie, sloopauto prijs, milieuverantwoorde autosloop",
  alternates: {
    canonical: "/auto-naar-de-sloop-brengen",
  },
  openGraph: {
    title: "Auto naar de Sloop Brengen | Hoogste Prijs | Van Velzen Autorecycling",
    description:
      "Breng uw schade/sloop auto naar de sloop bij Van Velzen Autorecycling. ✓ Hoogste prijs ✓ RDW-vrijwaring ✓ Milieuvriendelijke recycling ✓ Zelf brengen of gratis ophalen.",
    url: "/auto-naar-de-sloop-brengen",
    type: "website",
    images: [
      {
        url: "/images/tow-truck-2.jpeg",
        width: 1200,
        height: 630,
        alt: "Auto naar de sloop brengen bij Van Velzen Autorecycling",
      },
    ],
  },}

export default function AutoNaarDeSloopBrengen() {
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
          src="/images/tow-truck-2.jpeg"
          alt="Auto naar de sloop brengen"
          width={1200}
          height={600}
          className="w-full h-[400px] object-cover"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 md:px-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Auto naar de sloop brengen? Kies voor Van Velzen Autorecycling
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl">
            Kies voor professionele recycling bij Van Velzen Autorecycling. Hoogste prijs garantie en milieuvriendelijke
            verwerking.
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
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-blue-800">Kies voor professionele recycling</h2>
            <p className="text-gray-700 mb-4">
              Wilt u uw auto naar de sloop brengen? Bij Van Velzen Autorecycling zorgen wij voor een correcte en
              milieuvriendelijke verwerking van uw voertuig. Of u nu zelf komt of gebruik maakt van onze ophaalservice -
              wij bieden altijd de beste prijs en een zorgvuldige afhandeling.
            </p>
            <p className="text-gray-700">
              Als officieel erkend recyclingbedrijf garanderen wij een professionele service waarbij u direct een
              RDW-vrijwaring ontvangt en een eerlijke prijs voor uw auto krijgt. Onze experts staan klaar om u te helpen
              met het hele proces.
            </p>
          </section>

          {/* Benefits Section */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-800">
              Waarom uw auto naar Van Velzen Autorecycling brengen?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Hoogste prijsgarantie voor uw sloopauto",
                "Officieel erkend recyclingbedrijf",
                "Milieuvriendelijke verwerking volgens Europese normen",
                "Directe RDW-vrijwaring bij overdracht",
                "Certificaat van Vernietiging als bewijs",
                "Gratis advies over de beste optie voor uw auto",
              ].map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <span className="text-green-600 text-xl mr-2">✔</span>
                  <p className="text-gray-700">
                    <span className="font-semibold">{benefit}</span>
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Options Section */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-800">
              Opties om uw auto naar de sloop te brengen
            </h2>

            {/* Zelf brengen */}
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-4 text-gray-800">1. Zelf brengen naar ons recyclingcentrum</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <span className="text-green-600 text-xl mr-2">✔</span>
                  <p className="text-gray-700">Direct persoonlijk contact met onze experts</p>
                </div>
                <div className="flex items-start">
                  <span className="text-green-600 text-xl mr-2">✔</span>
                  <p className="text-gray-700">Onmiddellijke waardebepaling en betaling</p>
                </div>
                <div className="flex items-start">
                  <span className="text-green-600 text-xl mr-2">✔</span>
                  <p className="text-gray-700">Geen wachttijd voor ophaalafspraken</p>
                </div>
                <div className="flex items-start">
                  <span className="text-green-600 text-xl mr-2">✔</span>
                  <p className="text-gray-700">Mogelijkheid om direct andere onderdelen te bekijken</p>
                </div>
              </div>
              <div className="bg-gray-100 p-4 rounded mt-4">
                <h4 className="font-semibold mb-2">Onze vestiging:</h4>
                <p className="text-gray-700">
                  Lau Mazirelweg 8<br />
                  2629 HW - Delft
                </p>
                <p className="text-gray-700 mt-2">
                  <span className="font-semibold">Openingstijden:</span>
                  <br />
                  Ma-Vr: 08:00-20:00
                  <br />
                  Za: 08:00-20:00
                  <br />
                  Zo: Op afspraak
                </p>
              </div>
            </div>

            {/* Laten ophalen */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">2. Gratis laten ophalen</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <span className="text-green-600 text-xl mr-2">✔</span>
                  <p className="text-gray-700">Landelijke ophaalservice zonder kosten</p>
                </div>
                <div className="flex items-start">
                  <span className="text-green-600 text-xl mr-2">✔</span>
                  <p className="text-gray-700">Flexibele afspraken die u schikt</p>
                </div>
                <div className="flex items-start">
                  <span className="text-green-600 text-xl mr-2">✔</span>
                  <p className="text-gray-700">Professionele afhandeling aan huis</p>
                </div>
                <div className="flex items-start">
                  <span className="text-green-600 text-xl mr-2">✔</span>
                  <p className="text-gray-700">Zelfde gunstige voorwaarden als bij zelf brengen</p>
                </div>
              </div>
            </div>
          </section>

          {/* Process Section */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-800">
              Zo werkt het wanneer u uw auto naar de sloop brengt
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-800 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                      1
                    </div>
                    <h3 className="font-bold text-lg">Contact opnemen</h3>
                  </div>
                  <p className="text-gray-700">
                    Neem contact op voor een vrijblijvende indicatie van de waarde van uw auto.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-800 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                      2
                    </div>
                    <h3 className="font-bold text-lg">Auto aanbieden</h3>
                  </div>
                  <p className="text-gray-700">
                    Breng uw auto naar ons terrein of kies voor onze gratis ophaalservice.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-800 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                      3
                    </div>
                    <h3 className="font-bold text-lg">Waardebepaling</h3>
                  </div>
                  <p className="text-gray-700">Onze specialisten bepalen de exacte waarde van uw voertuig.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-800 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                      4
                    </div>
                    <h3 className="font-bold text-lg">Afhandeling en betaling</h3>
                  </div>
                  <p className="text-gray-700">U krijgt direct geld en een officieel vrijwaringsbewijs.</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Requirements Section */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-blue-800">
              Wat moet u meenemen bij het brengen van uw auto?
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-green-600 text-xl mr-2">✔</span>
                <p className="text-gray-700">Het kentekenbewijs (deel I en II)</p>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 text-xl mr-2">✔</span>
                <p className="text-gray-700">Een geldig legitimatiebewijs</p>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 text-xl mr-2">✔</span>
                <p className="text-gray-700">Eventuele sleutels en alarmcodes</p>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 text-xl mr-2">✔</span>
                <p className="text-gray-700">Bij afmelding: het overschrijvingsbewijs</p>
              </li>
            </ul>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-800">
              Veelgestelde vragen over auto naar de sloop brengen
            </h2>
            <div className="space-y-4">
              {[
                {
                  question: "Hoe wordt de prijs van mijn sloopauto bepaald?",
                  answer:
                    "De waarde hangt af van het gewicht, herbruikbare onderdelen en actuele metaalprijzen. Onze experts maken een eerlijke inschatting gebaseerd op deze factoren en de staat van uw voertuig.",
                },
                {
                  question: "Kan ik zonder kentekenbewijs mijn auto brengen?",
                  answer:
                    "In principe is een kentekenbewijs nodig voor de RDW-vrijwaring. Neem contact met ons op voor de mogelijkheden in uw specifieke situatie, wij denken graag met u mee.",
                },
                {
                  question: "Is er verschil in prijs tussen brengen en ophalen?",
                  answer:
                    "Nee, u krijgt altijd onze beste prijs, ongeacht of u de auto zelf brengt of laat ophalen. Wij rekenen geen kosten voor onze ophaalservice.",
                },
                {
                  question: "Wat gebeurt er precies met mijn auto na inlevering?",
                  answer:
                    "Wij demonteren eerst alle milieugevaarlijke stoffen zoals olie, koelvloeistof en accu's. Daarna worden herbruikbare onderdelen gedemonteerd voor verkoop. De rest van de auto wordt gerecycled volgens de wettelijke normen, waarbij minimaal 95% van het materiaal wordt hergebruikt.",
                },
              ].map((faq, index) => (
                <div key={index}>
                  <h3 className="font-bold text-gray-800 mb-1">{faq.question}</h3>
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              ))}
            </div>
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
          Bij Van Velzen Autorecycling zorgen we voor een zorgeloze ervaring bij het brengen of laten ophalen van uw
          auto. Profiteer van onze jarenlange expertise en uitstekende service.
        </p>
        <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white">
          <Link href="#offerte">Vraag direct een offerte aan</Link>
        </Button>
      </section>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Hoe wordt de prijs van mijn sloopauto bepaald?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "De waarde hangt af van het gewicht, herbruikbare onderdelen en actuele metaalprijzen. Onze experts maken een eerlijke inschatting gebaseerd op deze factoren en de staat van uw voertuig.",
                },
              },
              {
                "@type": "Question",
                name: "Kan ik zonder kentekenbewijs mijn auto brengen?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "In principe is een kentekenbewijs nodig voor de RDW-vrijwaring. Neem contact met ons op voor de mogelijkheden in uw specifieke situatie, wij denken graag met u mee.",
                },
              },
              {
                "@type": "Question",
                name: "Is er verschil in prijs tussen brengen en ophalen?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Nee, u krijgt altijd onze beste prijs, ongeacht of u de auto zelf brengt of laat ophalen. Wij rekenen geen kosten voor onze ophaalservice.",
                },
              },
              {
                "@type": "Question",
                name: "Wat gebeurt er precies met mijn auto na inlevering?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Wij demonteren eerst alle milieugevaarlijke stoffen zoals olie, koelvloeistof en accu's. Daarna worden herbruikbare onderdelen gedemonteerd voor verkoop. De rest van de auto wordt gerecycled volgens de wettelijke normen, waarbij minimaal 95% van het materiaal wordt hergebruikt.",
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