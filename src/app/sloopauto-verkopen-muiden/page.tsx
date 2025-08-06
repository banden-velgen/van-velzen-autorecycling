import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Sloopauto Verkopen Muiden | Snel geld en gratis ophalen | Van Velzen Autorecycling",
  description:
    "Verkoop uw sloopauto in Muiden voor de beste prijs! ✓ Gratis afhalen ✓ Direct RDW vrijwaring ✓ Contant geld ✓ Milieuvriendelijk. Vraag nu een offerte aan!",
  keywords:
    "sloopauto verkopen Muiden, auto verkopen Muiden, autowrak verkopen Muiden, kapotte auto verkopen Muiden, schadeauto verkopen Muiden, auto recycling Muiden, rdw vrijwaring Muiden, gratis auto ophalen Muiden",
  alternates: {
    canonical: "/sloopauto-verkopen-muiden",
  },
  openGraph: {
    title: "Sloopauto Verkopen Muiden | Snel geld en gratis ophalen | Van Velzen Autorecycling",
    description:
      "Verkoop uw sloopauto in Muiden voor de beste prijs! ✓ Gratis afhalen ✓ Direct RDW vrijwaring ✓ Contant geld ✓ Milieuvriendelijk. Vraag nu een offerte aan!",
    url: "/sloopauto-verkopen-muiden",
    type: "website",
    images: [
      {
        url: "/images/tow-truck.jpeg",
        width: 1200,
        height: 630,
        alt: "Sloopauto verkopen bij Van Velzen Autorecycling in Muiden",
      },
    ],
  },
}

export default function SloopautoVerkopenMuiden() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="relative rounded-lg overflow-hidden mb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-700/70 z-10"></div>
        <Image
          src="/images/tow-truck.jpeg"
          alt="Sloopauto verkopen in Muiden"
          width={1200}
          height={600}
          className="w-full h-[400px] object-cover"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 md:px-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Sloopauto verkopen in Muiden? Snel en voordelig bij Van Velzen Autorecycling
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl">
            Wij zijn geïnteresseerd in alle auto's, ongeacht de staat – of deze nu nog rijdt of niet. Krijg een eerlijke
            prijs en gratis ophaalservice in Muiden.
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
              Is uw auto aan het einde van zijn levensduur?
            </h2>
            <p className="text-gray-700 mb-4">
              Is uw auto aan het einde van zijn levensduur en zoekt u een betrouwbare partij om uw sloopauto in Muiden
              te verkopen? Bij Van Velzen Autorecycling krijgt u een snelle, eerlijke en transparante oplossing. Wij
              zijn geïnteresseerd in alle auto's, of deze nu nog rijdt of niet en wij bieden een concurrerend bod op
              basis van de huidige metaalprijzen en recyclebare onderdelen.
            </p>
          </section>

          {/* Benefits Section */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-800">
              Waarom uw sloopauto in Muiden aan ons verkopen?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <span className="text-green-600 text-xl mr-2">✔</span>
                <p className="text-gray-700">
                  <span className="font-semibold">Gratis afhalen in Muiden en omgeving</span> – Wij komen uw auto
                  kosteloos ophalen, zonder gedoe.
                </p>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 text-xl mr-2">✔</span>
                <p className="text-gray-700">
                  <span className="font-semibold">Directe RDW vrijwaring</span> – Geen risico's meer, u bent direct
                  juridisch ontzorgd.
                </p>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 text-xl mr-2">✔</span>
                <p className="text-gray-700">
                  <span className="font-semibold">Contant of per Bankoverschrijving</span> – Kies zelf hoe u betaald
                  wilt worden.
                </p>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 text-xl mr-2">✔</span>
                <p className="text-gray-700">
                  <span className="font-semibold">Duurzame verwerking</span> – Wij recyclen volgens de nieuwste
                  milieunormen.
                </p>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 text-xl mr-2">✔</span>
                <p className="text-gray-700">
                  <span className="font-semibold">Binnen 24 uur een bod</span> – Snel en zonder verplichtingen.
                </p>
              </div>
            </div>
          </section>

          {/* Process Section */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-800">Zo werkt het</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-800 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                      1
                    </div>
                    <h3 className="font-bold text-lg">Aanvraag indienen</h3>
                  </div>
                  <p className="text-gray-700">Via de website, telefoon of WhatsApp.</p>
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
                  <p className="text-gray-700">Wij beoordelen uw auto en bieden een eerlijke prijs.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-800 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                      3
                    </div>
                    <h3 className="font-bold text-lg">Afspraak plannen</h3>
                  </div>
                  <p className="text-gray-700">Wij halen uw sloopauto gratis bij u op in Muiden.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-800 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                      4
                    </div>
                    <h3 className="font-bold text-lg">Betaling en vrijwarring!</h3>
                  </div>
                  <p className="text-gray-700">U krijgt direct geld en een officieel vrijwaringsbewijs.</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Types of Cars Section */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-800">Welke auto's kopen wij op?</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Kapotte auto's (motorpech, ongeval, roest)</li>
              <li>Auto's zonder APK of met dure reparaties</li>
              <li>Oude occasions die niet meer de weg op kunnen</li>
              <li>Alle merken en modellen – Van kleine hatchbacks tot grote bestelwagens</li>
            </ul>
          </section>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Quote Form */}
          <div id="offerte" className="bg-gray-100 rounded-lg p-6 mb-8 sticky top-24">
            <h3 className="text-xl font-bold mb-4 text-blue-800">
              Krijg vandaag nog een bod op uw sloopauto in Muiden!
            </h3>
            <p className="text-gray-700 mb-6">
              Waarom wachten? Laat uw oude auto geld opleveren in plaats van stof verzamelen. Bij Van Velzen
              Autorecycling regelen wij alles snel, eerlijk en milieuvriendelijk.
            </p>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Naam
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Uw volledige naam"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="uw@email.nl"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Telefoonnummer
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="06 12345678"
                />
              </div>
              <div>
                <label htmlFor="license" className="block text-sm font-medium text-gray-700 mb-1">
                  Kenteken
                </label>
                <input
                  type="text"
                  id="license"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="AB-12-CD"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Toelichting (optioneel)
                </label>
                <textarea
                  id="message"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Beschrijf de staat van uw auto"
                ></textarea>
              </div>
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white">Offerte aanvragen</Button>
            </form>
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
          Bij Van Velzen Autorecycling zorgen we voor een zorgeloze ervaring bij het verkopen van uw sloopauto in
          Muiden. Profiteer van onze jarenlange expertise en uitstekende service.
        </p>
      </section>
    </div>
  )
}
