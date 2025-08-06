import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { QuoteForm } from "@/components/quote-form"
import { Check, Phone, Mail, MessageSquare, Scale, Car, Wrench, TrendingUp, Clipboard } from "lucide-react"

export const metadata: Metadata = {
  title: "Hoeveel is mijn sloopauto waard? | Vraag direct een offerte aan",
  description:
    "Ontdek de waarde van uw sloopauto bij Van Velzen Autorecycling. Eerlijke prijsbepaling op basis van gewicht, onderdelen en metaalwaarde. Vraag nu uw vrijblijvende offerte aan!",
  keywords: [
    "sloopauto waarde",
    "hoeveel is mijn sloopauto waard",
    "sloopauto prijs",
    "auto waardebepaling",
    "sloopauto verkopen prijs",
    "auto recycling waarde",
    "Van Velzen Autorecycling",
  ],
  alternates: {
    canonical: "https://www.vanvelzenautorecycling.nl/hoeveel-is-mijn-sloopauto-waard",
  },
  openGraph: {
    title: "Hoeveel is mijn sloopauto waard? | Van Velzen Autorecycling",
    description:
      "Ontdek de waarde van uw sloopauto bij Van Velzen Autorecycling. Eerlijke prijsbepaling op basis van gewicht, onderdelen en metaalwaarde.",
    url: "https://www.vanvelzenautorecycling.nl/hoeveel-is-mijn-sloopauto-waard",
    siteName: "Van Velzen Autorecycling",
    locale: "nl_NL",
    type: "website",
  },
}

export default function HoeveelIsMijnSloopautoWaardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div
        className="relative rounded-lg overflow-hidden mb-12"
        style={{
          backgroundImage: "url('/images/tow-truck-1.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "400px",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-700/70"></div>
        <div className="relative h-full flex flex-col justify-center px-6 md:px-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Hoeveel is mijn sloopauto waard?
          </h1>
          <p className="text-white text-lg md:text-xl max-w-2xl mb-8">
            Bij Van Velzen Autorecycling ontvangt u altijd een eerlijke en marktconforme prijs voor uw sloopauto. Vraag
            nu een vrijblijvende offerte aan en ontdek wat uw auto waard is!
          </p>
          <div>
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white">
              <Link href="#offerte">Vraag direct een offerte aan</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Introduction */}
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-blue-800">
              Eerlijke waardebepaling voor uw sloopauto
            </h2>
            <p className="text-gray-700 mb-4">
              De exacte waarde van uw voertuig hangt af van verschillende factoren die wij zorgvuldig beoordelen. Bij
              Van Velzen Autorecycling krijgt u altijd een transparante en marktconforme prijs, gebaseerd op actuele
              gegevens en een professionele beoordeling.
            </p>
            <p className="text-gray-700">
              Onze experts hebben jarenlange ervaring in het bepalen van de waarde van sloopauto's en weten precies
              welke onderdelen nog herbruikbaar zijn en wat de actuele metaalprijzen zijn. Zo krijgt u altijd de beste
              prijs voor uw sloopauto.
            </p>
          </div>

          {/* Factors Section */}
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-800">
              Factoren die de waarde van uw sloopauto bepalen
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-start mb-3">
                  <Scale className="text-blue-800 mr-3 h-6 w-6 mt-1" />
                  <h3 className="text-xl font-semibold">Gewicht en afmetingen</h3>
                </div>
                <p className="text-gray-700">
                  Het gewicht van uw auto is een belangrijke factor in de waardebepaling. Hoe zwaarder de auto, hoe meer
                  metaal er gerecycled kan worden, wat de waarde positief beïnvloedt.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-start mb-3">
                  <Wrench className="text-blue-800 mr-3 h-6 w-6 mt-1" />
                  <h3 className="text-xl font-semibold">Staat van herbruikbare onderdelen</h3>
                </div>
                <p className="text-gray-700">
                  Onderdelen die nog goed functioneren kunnen de waarde aanzienlijk verhogen. Denk aan de motor,
                  versnellingsbak, elektronica en andere componenten die nog een tweede leven kunnen krijgen.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-start mb-3">
                  <TrendingUp className="text-blue-800 mr-3 h-6 w-6 mt-1" />
                  <h3 className="text-xl font-semibold">Actuele metaalprijzen</h3>
                </div>
                <p className="text-gray-700">
                  Wij houden continu de ontwikkelingen op de metaalmarkt in de gaten. De actuele prijzen van staal,
                  aluminium en andere metalen hebben direct invloed op wat uw sloopauto waard is.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-start mb-3">
                  <Car className="text-blue-800 mr-3 h-6 w-6 mt-1" />
                  <h3 className="text-xl font-semibold">Merk en model</h3>
                </div>
                <p className="text-gray-700">
                  Sommige merken en modellen hebben meer vraag naar onderdelen dan andere. Populaire modellen kunnen
                  daardoor meer waard zijn omdat de onderdelen beter verkocht kunnen worden.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 md:col-span-2">
                <div className="flex items-start mb-3">
                  <Clipboard className="text-blue-800 mr-3 h-6 w-6 mt-1" />
                  <h3 className="text-xl font-semibold">Algemene staat van het voertuig</h3>
                </div>
                <p className="text-gray-700">
                  Rijdt de auto nog? Hoeveel schade is er? Is er sprake van roest of andere gebreken? De algemene
                  conditie van uw voertuig heeft grote invloed op de uiteindelijke waarde. Een auto die nog rijdt is
                  vaak meer waard dan een die niet meer start.
                </p>
              </div>
            </div>
          </div>

          {/* Professional Valuation */}
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-800">Onze professionele waardebepaling</h2>
            <div className="bg-blue-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-4">
                Bij Van Velzen Autorecycling hanteren wij een transparante waardebepaling:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="text-green-600 mr-3 h-5 w-5 mt-1" />
                  <span>Wij beoordelen uw auto op basis van actuele marktgegevens</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-600 mr-3 h-5 w-5 mt-1" />
                  <span>Geen verborgen kosten of onverwachte kortingen</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-600 mr-3 h-5 w-5 mt-1" />
                  <span>Eerlijke prijs op basis van werkelijke waarde</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-600 mr-3 h-5 w-5 mt-1" />
                  <span>Direct duidelijkheid over wat u kunt verwachten</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Process Section */}
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-800">Hoe werkt onze prijsbepaling?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 relative">
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-blue-800 text-white flex items-center justify-center font-bold">
                  1
                </div>
                <h3 className="text-lg font-semibold mb-2 mt-2">Informatie doorgeven</h3>
                <p className="text-gray-700">
                  U geeft informatie over uw auto door via ons formulier, telefonisch of per e-mail.
                </p>
              </div>

              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 relative">
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-blue-800 text-white flex items-center justify-center font-bold">
                  2
                </div>
                <h3 className="text-lg font-semibold mb-2 mt-2">Analyse door experts</h3>
                <p className="text-gray-700">Onze experts analyseren de gegevens en beoordelen de potentiële waarde.</p>
              </div>

              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 relative">
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-blue-800 text-white flex items-center justify-center font-bold">
                  3
                </div>
                <h3 className="text-lg font-semibold mb-2 mt-2">Onderdelen waarderen</h3>
                <p className="text-gray-700">
                  Wij berekenen de waarde van herbruikbare onderdelen op basis van vraag en aanbod.
                </p>
              </div>

              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 relative">
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-blue-800 text-white flex items-center justify-center font-bold">
                  4
                </div>
                <h3 className="text-lg font-semibold mb-2 mt-2">Metaalwaarde bepalen</h3>
                <p className="text-gray-700">
                  De metaalwaarde wordt bepaald op basis van gewicht en actuele marktprijzen.
                </p>
              </div>

              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 relative">
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-blue-800 text-white flex items-center justify-center font-bold">
                  5
                </div>
                <h3 className="text-lg font-semibold mb-2 mt-2">Offerte ontvangen</h3>
                <p className="text-gray-700">
                  U ontvangt een duidelijke en eerlijke offerte zonder verborgen voorwaarden.
                </p>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-800">
              Waarom kiezen voor onze waardebepaling?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <Check className="text-green-600 mr-3 h-5 w-5 mt-1" />
                <div>
                  <h3 className="font-semibold">Volledig transparant</h3>
                  <p className="text-gray-700">Geen verrassingen achteraf, wat wij bieden is wat u krijgt.</p>
                </div>
              </div>

              <div className="flex items-start">
                <Check className="text-green-600 mr-3 h-5 w-5 mt-1" />
                <div>
                  <h3 className="font-semibold">Marktconform</h3>
                  <p className="text-gray-700">Wij houden rekening met actuele ontwikkelingen in de markt.</p>
                </div>
              </div>

              <div className="flex items-start">
                <Check className="text-green-600 mr-3 h-5 w-5 mt-1" />
                <div>
                  <h3 className="font-semibold">Snel</h3>
                  <p className="text-gray-700">Binnen 2 uur een duidelijke offerte in uw inbox.</p>
                </div>
              </div>

              <div className="flex items-start">
                <Check className="text-green-600 mr-3 h-5 w-5 mt-1" />
                <div>
                  <h3 className="font-semibold">Vrijblijvend</h3>
                  <p className="text-gray-700">U zit nergens aan vast en kunt in alle rust beslissen.</p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-800">Veelgestelde vragen</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">Hoe snel weet ik wat mijn auto waard is?</h3>
                <p className="text-gray-700">
                  Binnen 2 uur na uw aanvraag ontvangt u een duidelijke offerte. In sommige gevallen zelfs sneller. Wij
                  streven ernaar om u zo snel mogelijk van dienst te zijn.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">Krijg ik dezelfde prijs bij ophalen als in de offerte?</h3>
                <p className="text-gray-700">
                  Ja, tenzij de staat van de auto significant afwijkt van uw beschrijving. Wij houden ons aan de
                  afgesproken prijs als de informatie die u heeft verstrekt correct is.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">Waarom verschillen de prijzen tussen bedrijven?</h3>
                <p className="text-gray-700">
                  Niet alle bedrijven hanteren dezelfde transparante berekeningsmethode als wij. Sommige bedrijven
                  bieden eerst een hoge prijs, maar komen later met extra kosten of kortingen. Bij ons krijgt u direct
                  een eerlijke prijs zonder verrassingen.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">Wat als mijn auto nog rijdt?</h3>
                <p className="text-gray-700">
                  Dit kan de waarde positief beïnvloeden. Een rijdende auto heeft vaak meer waarde omdat de onderdelen
                  nog functioneren en getest kunnen worden. Geef dit duidelijk aan bij uw aanvraag.
                </p>
              </div>
            </div>
          </div>
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
                <Phone className="h-5 w-5 mr-3" />
                <span>06-86301771</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-3" />
                <span>info@vanvelzenautorecycling.nl</span>
              </div>
              <div className="flex items-center">
                <MessageSquare className="h-5 w-5 mr-3" />
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

      {/* Bottom CTA */}
      <section className="mt-12 bg-blue-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-blue-800">
          Kies voor betrouwbaarheid, snelheid en de beste prijs
        </h2>
        <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
          Bij Van Velzen Autorecycling krijgt u altijd een eerlijke prijs voor uw sloopauto. Onze transparante
          waardebepaling zorgt ervoor dat u precies weet waar u aan toe bent.
        </p>
        <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white">
          <Link href="#offerte">Vraag direct een offerte aan</Link>
        </Button>
      </section>
    </div>
  )
}
