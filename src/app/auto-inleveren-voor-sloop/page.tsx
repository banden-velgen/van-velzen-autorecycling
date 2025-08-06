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
  title: "Auto inleveren voor sloop | Hoogste prijs | Van Velzen Autorecycling",
  description:
    "Lever uw auto veilig in voor sloop bij Van Velzen Autorecycling. ✓ Beste prijs ✓ Directe RDW-vrijwaring ✓ Gratis ophalen ✓ 95% recycling. Vraag nu een offerte aan!",
  keywords:
    "auto inleveren voor sloop, sloopauto inleveren, auto recycling, auto sloop, rdw vrijwaring, auto verkopen, schadeauto inleveren, autosloperij delft, Van Velzen Autorecycling",
  alternates: {
    canonical: "/auto-inleveren-voor-sloop",
  },
  openGraph: {
    title: "Auto inleveren voor sloop | Hoogste prijs | Van Velzen Autorecycling",
    description:
      "Lever uw auto veilig in voor sloop bij Van Velzen Autorecycling. ✓ Beste prijs ✓ Directe RDW-vrijwaring ✓ Gratis ophalen ✓ 95% recycling. Vraag nu een offerte aan!",
    url: "/auto-inleveren-voor-sloop",
    type: "website",
    images: [
      {
        url: "/images/tow-truck-2.jpeg",
        width: 1200,
        height: 630,
        alt: "Auto inleveren voor sloop bij Van Velzen Autorecycling",
      },
    ],
  },}

export default function AutoInleverenVoorSloop() {
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
          alt="Auto inleveren voor sloop"
          width={1200}
          height={600}
          className="w-full h-[400px] object-cover"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 md:px-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Auto inleveren voor sloop? Krijg de beste prijs
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl">
            Bij Van Velzen Autorecycling kunt u uw auto eenvoudig en veilig inleveren voor sloop met de hoogste
            opbrengst en milieuvriendelijke recycling.
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
              Professionele en milieuvriendelijke auto recycling
            </h2>
            <p className="text-gray-700 mb-4">
              Bij Van Velzen Autorecycling bieden wij een complete oplossing voor het inleveren van uw auto voor sloop.
              Als erkend recyclingbedrijf garanderen wij een transparant proces, de hoogste opbrengst en zorgen voor
              milieuvriendelijke recycling volgens de strengste Europese normen.
            </p>
            <p className="text-gray-700">
              Of u nu kiest voor het zelf inleveren van uw auto bij onze vestiging of gebruik maakt van onze gratis
              ophaalservice, wij zorgen voor een snelle en correcte afhandeling inclusief alle benodigde documenten
              zoals de RDW-vrijwaring en het Certificaat van Vernietiging.
            </p>
          </section>

          {/* Benefits Section */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-800">
              Waarom uw auto voor sloop inleveren bij Van Velzen Autorecycling?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Beste marktprijs voor uw sloopauto",
                "Gratis inname zonder verborgen kosten",
                "Directe RDW-vrijwaring bij overdracht",
                "Officieel Certificaat van Vernietiging",
                "95% recyclinggarantie volgens Europese richtlijnen",
                "Landelijke dekking met gratis ophaalservice",
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
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-800">Hoe werkt auto inleveren voor sloop?</h2>

            {/* Zelf inleveren */}
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-4 text-gray-800">1. Zelf inleveren bij onze vestiging</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <span className="text-green-600 text-xl mr-2">✔</span>
                  <p className="text-gray-700">Directe waardebepaling door onze experts</p>
                </div>
                <div className="flex items-start">
                  <span className="text-green-600 text-xl mr-2">✔</span>
                  <p className="text-gray-700">Onmiddellijke contante betaling</p>
                </div>
                <div className="flex items-start">
                  <span className="text-green-600 text-xl mr-2">✔</span>
                  <p className="text-gray-700">Professionele advisering over recyclemogelijkheden</p>
                </div>
                <div className="flex items-start">
                  <span className="text-green-600 text-xl mr-2">✔</span>
                  <p className="text-gray-700">Mogelijkheid tot inruil van onderdelen</p>
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
                  Ma-Vr: 08:00-17:00
                  <br />
                  Za: 09:00-13:00
                  <br />
                  Zo: Gesloten
                </p>
              </div>
            </div>

            {/* Laten ophalen */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">2. Gratis laten ophalen aan huis</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <span className="text-green-600 text-xl mr-2">✔</span>
                  <p className="text-gray-700">Landelijke dekking zonder extra kosten</p>
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
                  <p className="text-gray-700">Zelfde gunstige voorwaarden als bij zelf inleveren</p>
                </div>
              </div>
            </div>
          </section>

          {/* Process Section */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-800">Stappenplan auto inleveren voor sloop</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-800 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                      1
                    </div>
                    <h3 className="font-bold text-lg">Aanvraag doen</h3>
                  </div>
                  <p className="text-gray-700">Via telefoon, website of app</p>
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
                  <p className="text-gray-700">Op basis van actuele marktprijzen</p>
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
                  <p className="text-gray-700">Voor inname of ophalen</p>
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
                  <p className="text-gray-700">Met directe betaling en documenten</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-800 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                      5
                    </div>
                    <h3 className="font-bold text-lg">Recycling</h3>
                  </div>
                  <p className="text-gray-700">Milieuvriendelijke verwerking</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Requirements Section */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-blue-800">Wat heeft u nodig bij inleveren?</h2>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-green-600 text-xl mr-2">✔</span>
                <p className="text-gray-700">Kentekenbewijs (deel I en II)</p>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 text-xl mr-2">✔</span>
                <p className="text-gray-700">Geldig legitimatiebewijs</p>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 text-xl mr-2">✔</span>
                <p className="text-gray-700">Eventuele sleutels en alarmcodes</p>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 text-xl mr-2">✔</span>
                <p className="text-gray-700">Overschrijvingsbewijs bij afmelding</p>
              </li>
            </ul>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-800">
              Veelgestelde vragen over auto inleveren voor sloop
            </h2>
            <div className="space-y-4">
              {[
                {
                  question: "Hoe snel kan ik mijn auto inleveren voor sloop?",
                  answer:
                    "In de meeste gevallen kunnen wij uw auto al binnen 24 uur na uw aanmelding ophalen of innemen. Bij spoed kunnen we vaak zelfs dezelfde dag nog langskomen, afhankelijk van uw locatie en onze planning.",
                },
                {
                  question: "Wat bepaalt de prijs van mijn sloopauto?",
                  answer:
                    "De prijs wordt bepaald door verschillende factoren: het gewicht van de auto, de staat en herbruikbaarheid van onderdelen, de actuele metaalprijzen, het merk en model, en de vraag naar specifieke onderdelen. Onze experts maken een eerlijke en transparante berekening.",
                },
                {
                  question: "Is inleveren zonder kentekenbewijs mogelijk?",
                  answer:
                    "In principe is het kentekenbewijs noodzakelijk voor de correcte afhandeling en RDW-vrijwaring. In specifieke situaties kunnen we echter helpen met alternatieve oplossingen. Neem contact met ons op om de mogelijkheden te bespreken.",
                },
                {
                  question: "Wat gebeurt er met mijn ingeleverde auto?",
                  answer:
                    "Na inname wordt uw auto eerst ontdaan van alle milieugevaarlijke stoffen zoals olie, koelvloeistof en accu's. Vervolgens worden herbruikbare onderdelen gedemonteerd voor verkoop. De resterende materialen worden gesorteerd en gerecycled volgens de Europese richtlijnen, waarbij we een recyclingpercentage van minimaal 95% garanderen.",
                },
              ].map((faq, index) => (
                <div key={index}>
                  <h3 className="font-bold text-gray-800 mb-1">{faq.question}</h3>
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Advantages Section */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-800">
              Voordelen van Van Velzen Autorecycling
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Gecertificeerd recyclingbedrijf",
                "Transparante en eerlijke prijzen",
                "Snelle en correcte afhandeling",
                "Maximale opbrengst voor uw oude auto",
                "Bijdrage aan een beter milieu",
                "Familiebedrijf met persoonlijke service",
              ].map((advantage, index) => (
                <div key={index} className="flex items-start">
                  <span className="text-green-600 text-xl mr-2">✔</span>
                  <p className="text-gray-700">{advantage}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Quote Form */}
          <div id="offerte" className="bg-gray-100 rounded-lg p-6 mb-8 sticky top-24">
            <h3 className="text-xl font-bold mb-4 text-blue-800">Bereken wat uw auto waard is</h3>
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
          Klaar om uw auto in te leveren voor sloop?
        </h2>
        <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
          Neem vandaag nog contact op voor een vrijblijvende offerte en ontdek hoeveel uw auto waard is. Bij Van Velzen
          Autorecycling zorgen we voor een zorgeloze ervaring en de hoogste prijs.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white">
            <Link href="#offerte">Offerte aanvragen</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-blue-800 text-blue-800 hover:bg-blue-50">
            <Link href="tel:0686301771">Bel direct: 06-86301771</Link>
          </Button>
        </div>
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
                name: "Hoe snel kan ik mijn auto inleveren voor sloop?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "In de meeste gevallen kunnen wij uw auto al binnen 24 uur na uw aanmelding ophalen of innemen. Bij spoed kunnen we vaak zelfs dezelfde dag nog langskomen, afhankelijk van uw locatie en onze planning.",
                },
              },
              {
                "@type": "Question",
                name: "Wat bepaalt de prijs van mijn sloopauto?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "De prijs wordt bepaald door verschillende factoren: het gewicht van de auto, de staat en herbruikbaarheid van onderdelen, de actuele metaalprijzen, het merk en model, en de vraag naar specifieke onderdelen. Onze experts maken een eerlijke en transparante berekening.",
                },
              },
              {
                "@type": "Question",
                name: "Is inleveren zonder kentekenbewijs mogelijk?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "In principe is het kentekenbewijs noodzakelijk voor de correcte afhandeling en RDW-vrijwaring. In specifieke situaties kunnen we echter helpen met alternatieve oplossingen. Neem contact met ons op om de mogelijkheden te bespreken.",
                },
              },
              {
                "@type": "Question",
                name: "Wat gebeurt er met mijn ingeleverde auto?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Na inname wordt uw auto eerst ontdaan van alle milieugevaarlijke stoffen zoals olie, koelvloeistof en accu's. Vervolgens worden herbruikbare onderdelen gedemonteerd voor verkoop. De resterende materialen worden gesorteerd en gerecycled volgens de Europese richtlijnen, waarbij we een recyclingpercentage van minimaal 95% garanderen.",
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