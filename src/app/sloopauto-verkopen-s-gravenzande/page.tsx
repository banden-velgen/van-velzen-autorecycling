import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { CityQuoteForm } from "@/components/city-quote-form"

export const metadata: Metadata = {
  title: "Sloopauto Verkopen 's-Gravenzande | Snel geld en gratis ophalen | Van Velzen Autorecycling",
  description:
    "Verkoop uw sloopauto in 's-Gravenzande voor de beste prijs! ✓ Gratis afhalen ✓ Direct RDW vrijwaring ✓ Contant geld ✓ Milieuvriendelijk. Vraag nu een offerte aan!",
  keywords:
    "sloopauto verkopen 's-Gravenzande, auto verkopen 's-Gravenzande, autowrak verkopen 's-Gravenzande, kapotte auto verkopen 's-Gravenzande, schadeauto verkopen 's-Gravenzande, auto recycling 's-Gravenzande, rdw vrijwaring 's-Gravenzande, gratis auto ophalen 's-Gravenzande",
  alternates: {
    canonical: "/sloopauto-verkopen-s-gravenzande",
  },
  openGraph: {
    title: "Sloopauto Verkopen 's-Gravenzande | Snel geld en gratis ophalen | Van Velzen Autorecycling",
    description:
      "Verkoop uw sloopauto in 's-Gravenzande voor de beste prijs! ✓ Gratis afhalen ✓ Direct RDW vrijwaring ✓ Contant geld ✓ Milieuvriendelijk. Vraag nu een offerte aan!",
    url: "/sloopauto-verkopen-s-gravenzande",
    type: "website",
    images: [
      {
        url: "/images/tow-truck.jpeg",
        width: 1200,
        height: 630,
        alt: "Sloopauto verkopen bij Van Velzen Autorecycling in 's-Gravenzande",
      },
    ],
  },
}

export default function SloopautoVerkopenSGravenzande() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="relative rounded-lg overflow-hidden mb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-700/70 z-10"></div>
        <Image
          src="/images/tow-truck.jpeg"
          alt="Sloopauto verkopen in 's-Gravenzande"
          width={1200}
          height={600}
          className="w-full h-[400px] object-cover"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 md:px-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Sloopauto verkopen in 's-Gravenzande? Snel en voordelig bij Van Velzen Autorecycling
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl">
            Wij zijn geïnteresseerd in alle auto's, ongeacht de staat – of deze nu nog rijdt of niet. Krijg een eerlijke
            prijs en gratis ophaalservice in 's-Gravenzande.
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
              Is uw auto aan het einde van zijn levensduur en zoekt u een betrouwbare partij om uw sloopauto in
              's-Gravenzande te verkopen? Bij Van Velzen Autorecycling krijgt u een snelle, eerlijke en transparante
              oplossing. Wij zijn geïnteresseerd in alle auto's, of deze nu nog rijdt of niet en wij bieden een
              concurrerend bod op basis van de huidige metaalprijzen en recyclebare onderdelen.
            </p>
          </section>

          {/* Benefits Section */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-800">
              Waarom uw sloopauto in 's-Gravenzande aan ons verkopen?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <span className="text-green-600 text-xl mr-2">✔</span>
                <p className="text-gray-700">
                  <span className="font-semibold">Gratis afhalen in 's-Gravenzande en omgeving</span> – Wij komen uw
                  auto kosteloos ophalen, zonder gedoe.
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
                  <p className="text-gray-700">Wij halen uw sloopauto gratis bij u op in 's-Gravenzande.</p>
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
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-800">Welke auto&apos;s kopen wij op?</h2>
          </section>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Quote Form */}
          <CityQuoteForm cityName="'s-Gravenzande" />
        </div>
      </div>
    </div>
  )
}
