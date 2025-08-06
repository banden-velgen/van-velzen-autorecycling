import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Check, Award, Users, Leaf, ArrowRight } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Over Ons | Van Velzen Autorecycling",
  description:
    "Van Velzen Autorecycling is een familiebedrijf met meer dan 25 jaar ervaring in de autodemontage. Lees meer over onze geschiedenis, missie en visie.",
  keywords:
    "autorecycling, autodemontagebedrijf, familiebedrijf, duurzame autodemontage, over ons, geschiedenis, missie, visie",
  alternates: {
    canonical: "/over-ons",
  },
  openGraph: {
    title: "Over Ons | Van Velzen Autorecycling",
    description: "Lees meer over onze geschiedenis, missie en visie als familiebedrijf in autodemontage.",
    url: "/over-ons",
  },
}

export default function AboutPage() {
  return (
    <>
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900">Over Van Velzen Autorecycling</h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Al meer dan 25 jaar uw betrouwbare partner voor autodemontage en recycling
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Onze Geschiedenis</h2>
              <p className="text-lg text-gray-600 mb-6">
                Van Velzen Autorecycling is een familiebedrijf dat 50 jaar geleden werd opgericht door A.C. van Velzen.
                Wat begon als een kleine autosloperij is uitgegroeid tot een van de grootste en meest duurzame
                autodemontagebedrijven van Nederland.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Door de jaren heen hebben we ons ontwikkeld tot een toonaangevend bedrijf in de branche, met een sterke
                focus op duurzaamheid en klanttevredenheid. Inmiddels wordt het bedrijf geleid door de tweede generatie
                van de familie Van Velzen, die de traditie van kwaliteit en service voortzet.
              </p>
              <p className="text-lg text-gray-600">
                Onze jarenlange ervaring en expertise stellen ons in staat om u de beste service te bieden bij het
                verkopen van uw sloopauto of schadeauto.
              </p>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden">
              <Image
                src="/images/tow-truck.jpeg"
                alt="Van Velzen Autorecycling takelwagen met auto's"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Onze Missie & Visie</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Wij streven naar een duurzame toekomst door verantwoorde autorecycling
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Onze Missie</h3>
              <p className="text-lg text-gray-600 mb-6">
                Onze missie is om autorecycling toegankelijk, eerlijk en duurzaam te maken. Wij bieden klanten de beste
                prijs voor hun sloopauto of schadeauto, terwijl we tegelijkertijd zorgen voor een milieuvriendelijke
                verwerking van alle materialen.
              </p>
              <ul className="space-y-3">
                {[
                  "Eerlijke en transparante prijzen",
                  "Uitstekende klantenservice",
                  "Milieuvriendelijke recycling",
                  "Eenvoudig en zorgeloos proces",
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Onze Visie</h3>
              <p className="text-lg text-gray-600 mb-6">
                Wij streven ernaar om de toonaangevende speler te zijn in de autorecycling branche, bekend om onze
                duurzame aanpak, innovatieve methoden en uitmuntende klantenservice. We willen bijdragen aan een
                circulaire economie waarin auto's aan het einde van hun levensduur een waardevolle bron van materialen
                vormen.
              </p>
              <p className="text-lg text-gray-600">
                Door continu te investeren in nieuwe technologieën en processen, zorgen we ervoor dat we voorop blijven
                lopen in de branche en de hoogst mogelijke recyclingpercentages behalen.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Waarom Kiezen voor Van Velzen Autorecycling?</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Ontdek de voordelen van samenwerken met een ervaren en betrouwbare partner
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="mx-auto w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">50+ Jaar Ervaring</h3>
              <p className="text-gray-600">
                Met meer dan 50 jaar ervaring in de branche weten wij als geen ander hoe we u de beste service kunnen
                bieden bij het verkopen van uw auto.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="mx-auto w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mb-4">
                <Leaf className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Duurzame Aanpak</h3>
              <p className="text-gray-600">
                Wij recyclen auto's op een milieuvriendelijke manier, waarbij we streven naar het hoogst mogelijke
                hergebruik van materialen.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="mx-auto w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Familiebedrijf</h3>
              <p className="text-gray-600">
                Als familiebedrijf hechten wij veel waarde aan persoonlijk contact en een eerlijke, transparante
                werkwijze.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Button asChild size="lg">
              <Link href="/#offerte-aanvragen" className="flex items-center gap-2">
                Offerte aanvragen
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Certificeringen & Lidmaatschappen</h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-12">
              Van Velzen Autorecycling voldoet aan alle wettelijke eisen en is aangesloten bij diverse
              brancheorganisaties
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="bg-white/10 p-4 rounded-lg">
                  <div className="h-16 w-full relative">
                    <Image
                      src={`/placeholder.svg?height=64&width=180`}
                      alt={`Certificering ${item}`}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
