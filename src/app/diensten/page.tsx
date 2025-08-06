import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Car, Truck, FileCheck, Recycle, Euro } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Diensten | Van Velzen Autorecycling",
  description:
    "Ontdek onze diensten: sloopauto verkopen, schadeauto verkopen, gratis ophaalservice, RDW vrijwaring en duurzame recycling.",
  keywords:
    "sloopauto verkopen, schadeauto verkopen, auto recycling, gratis ophaalservice, rdw vrijwaring, duurzame recycling, directe betaling",
  alternates: {
    canonical: "/diensten",
  },
  openGraph: {
    title: "Diensten | Van Velzen Autorecycling",
    description: "Ontdek onze diensten voor autorecycling, van ophaalservice tot RDW vrijwaring.",
    url: "/diensten",
  },
}

export default function ServicesPage() {
  // Component code remains unchanged
  return (
    // Existing component JSX
    <>
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900">Onze Diensten</h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Van Velzen Autorecycling biedt een compleet pakket aan diensten voor het verkopen en recyclen van uw auto
            </p>
          </div>
        </div>
      </section>

      <section id="sloopauto-verkopen" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-50 p-2 rounded-full">
                  <Car className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Sloopauto Verkopen</h2>
              </div>
              <p className="text-lg text-gray-600 mb-6">
                Heeft u een auto die aan het einde van zijn levensduur is? Bij Van Velzen Autorecycling krijgt u de
                beste prijs voor uw sloopauto. Wij maken het verkoopproces eenvoudig en zorgeloos.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Ongeacht de staat van uw auto, wij zijn geïnteresseerd. Of uw auto nog rijdt of niet, wij bieden een
                eerlijke prijs gebaseerd op de actuele marktwaarde en de waarde van de onderdelen en materialen.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Gratis ophaalservice in heel Nederland</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Directe RDW vrijwaring</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Contante betaling mogelijk</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Milieuvriendelijke recycling</span>
                </li>
              </ul>
              <Button asChild>
                <Link href="/#offerte-aanvragen" className="flex items-center gap-2">
                  Offerte aanvragen
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="order-1 lg:order-2 relative h-80 lg:h-96 rounded-lg overflow-hidden">
              <Image
                src="/images/tow-truck-1.jpeg?height=600&width=800"
                alt="Sloopauto verkopen"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="schadeauto-verkopen" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 lg:h-96 rounded-lg overflow-hidden">
              <Image
                src="/images/tow-truck-2.jpeg?height=600&width=800"
                alt="Schadeauto verkopen"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-purple-50 p-2 rounded-full">
                  <Car className="h-6 w-6 text-purple-500" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Schadeauto Verkopen</h2>
              </div>
              <p className="text-lg text-gray-600 mb-6">
                Heeft uw auto schade opgelopen door een ongeval of andere oorzaak? Wij bieden een eerlijke prijs voor uw
                schadeauto, ongeacht de ernst van de schade.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Vaak is het verkopen van een schadeauto aan Van Velzen Autorecycling voordeliger dan het laten
                repareren. Wij taxeren uw auto en doen een vrijblijvend bod.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Gratis taxatie van de schade</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Vrijblijvende offerte</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Snelle afhandeling</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Alle merken en modellen</span>
                </li>
              </ul>
              <Button asChild>
                <Link href="/#offerte-aanvragen" className="flex items-center gap-2">
                  Offerte aanvragen
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="gratis-ophaalservice" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-green-50 p-2 rounded-full">
                  <Truck className="h-6 w-6 text-green-500" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Gratis Ophaalservice</h2>
              </div>
              <p className="text-lg text-gray-600 mb-6">
                Bij Van Velzen Autorecycling hoeft u zich geen zorgen te maken over het transport van uw auto. Wij halen
                uw auto gratis op, waar dan ook in Nederland.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Onze professionele chauffeurs komen op een afgesproken tijdstip uw auto ophalen. Ook als uw auto niet
                meer rijdt of ernstige schade heeft, kunnen wij deze ophalen met onze speciaal uitgeruste
                transportwagens.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Gratis ophaalservice in heel Nederland</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Ophalen op een moment dat u uitkomt</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Professioneel transport, ook voor niet-rijdende auto's</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Alle papierwerk wordt ter plaatse geregeld</span>
                </li>
              </ul>
              <Button asChild>
                <Link href="/#offerte-aanvragen" className="flex items-center gap-2">
                  Offerte aanvragen
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="order-1 lg:order-2 relative h-80 lg:h-96 rounded-lg overflow-hidden">
              <Image
                src="/images/tow-truck-3.jpeg?height=600&width=800"
                alt="Gratis ophaalservice"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="rdw-vrijwaring" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 lg:h-96 rounded-lg overflow-hidden">
              <Image
                src="/images/tow-truck-4.jpeg?height=600&width=800"
                alt="RDW vrijwaring"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-orange-50 p-2 rounded-full">
                  <FileCheck className="h-6 w-6 text-orange-500" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">RDW Vrijwaring</h2>
              </div>
              <p className="text-lg text-gray-600 mb-6">
                Wanneer u uw auto verkoopt aan Van Velzen Autorecycling, regelen wij direct de RDW vrijwaring. Dit
                betekent dat u vanaf dat moment geen wegenbelasting meer hoeft te betalen en niet meer aansprakelijk
                bent voor de auto.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                De vrijwaring is een belangrijk document dat bewijst dat u niet langer de eigenaar bent van het
                voertuig. Wij zorgen ervoor dat dit correct wordt afgehandeld en u ontvangt een vrijwaringsbewijs.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Directe vrijwaring bij de RDW</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Geen wegenbelasting meer verschuldigd</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Geen aansprakelijkheid meer voor het voertuig</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">U ontvangt een vrijwaringsbewijs</span>
                </li>
              </ul>
              <Button asChild>
                <Link href="/#offerte-aanvragen" className="flex items-center gap-2">
                  Offerte aanvragen
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="duurzame-recycling" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-teal-50 p-2 rounded-full">
                  <Recycle className="h-6 w-6 text-teal-500" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Duurzame Recycling</h2>
              </div>
              <p className="text-lg text-gray-600 mb-6">
                Bij Van Velzen Autorecycling staat duurzaamheid centraal. Wij recyclen auto's op een milieuvriendelijke
                manier, waarbij we streven naar het hoogst mogelijke hergebruik van materialen.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Onze geavanceerde recyclingprocessen zorgen ervoor dat we tot 95% van een auto kunnen recyclen. Alle
                schadelijke stoffen worden veilig verwijderd en verwerkt volgens de strengste milieunormen.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-teal-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Tot 95% van de auto wordt gerecycled</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-teal-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Veilige verwijdering van schadelijke stoffen</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-teal-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Gecertificeerd volgens de strengste milieunormen</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-teal-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Bijdrage aan een circulaire economie</span>
                </li>
              </ul>
              <Button asChild>
                <Link href="/#offerte-aanvragen" className="flex items-center gap-2">
                  Offerte aanvragen
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="order-1 lg:order-2 relative h-80 lg:h-96 rounded-lg overflow-hidden">
              <Image
                src="/images/tow-truck-5.jpeg?height=600&width=800"
                alt="Duurzame recycling"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="directe-betaling" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 lg:h-96 rounded-lg overflow-hidden">
              <Image
                src="/images/tow-truck-6.jpeg?height=600&width=800"
                alt="Directe betaling"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-red-50 p-2 rounded-full">
                  <Euro className="h-6 w-6 text-red-500" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Directe Betaling</h2>
              </div>
              <p className="text-lg text-gray-600 mb-6">
                Bij Van Velzen Autorecycling ontvangt u direct betaling voor uw auto. U kunt kiezen voor contante
                betaling of een bankoverschrijving, wat voor u het meest geschikt is.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Wij bieden een eerlijke prijs gebaseerd op de actuele marktwaarde en de waarde van de onderdelen en
                materialen. Geen verborgen kosten of verrassingen achteraf.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Directe betaling bij ophalen van de auto</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Keuze tussen contante betaling of bankoverschrijving</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Eerlijke prijzen zonder verborgen kosten</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Transparant prijsbeleid</span>
                </li>
              </ul>
              <Button asChild>
                <Link href="/#offerte-aanvragen" className="flex items-center gap-2">
                  Offerte aanvragen
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Klaar om uw auto te verkopen?</h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Vul het formulier in en ontvang binnen 24 uur een vrijblijvende offerte voor uw auto.
          </p>
          <Button asChild size="lg" className="bg-white hover:bg-gray-100 text-primary">
            <Link href="/#offerte-aanvragen" className="flex items-center gap-2">
              Offerte aanvragen
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  )
}
