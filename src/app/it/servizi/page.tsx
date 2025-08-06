import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Car, Truck, FileCheck, Recycle, Euro } from "lucide-react"
import type { Metadata } from "next"
import Header from "@/components/header"
import Footer from "@/components/footer"
import WhatsAppButton from "@/components/whatsapp-button"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: "Servizi | Van Velzen Autorecycling",
  description:
    "Scopri i nostri servizi: vendere auto rottame, vendere auto danneggiata, servizio di ritiro gratuito, radiazione RDW e riciclaggio sostenibile.",
  keywords:
    "vendere auto rottame, vendere auto danneggiata, riciclaggio auto, servizio ritiro gratuito, radiazione rdw, riciclaggio sostenibile, pagamento diretto",
  alternates: {
    canonical: "/it/servizi",
  },
  openGraph: {
    title: "Servizi | Van Velzen Autorecycling",
    description: "Scopri i nostri servizi per il riciclaggio auto, dal servizio di ritiro alla radiazione RDW.",
    url: "/it/servizi",
  },
}

export default function ServicesPage() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900">I Nostri Servizi</h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Van Velzen Autorecycling offre un pacchetto completo di servizi per la vendita e il riciclaggio della vostra auto
            </p>
          </div>
        </div>
      </section>

      <section id="vendere-auto-rottame" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-50 p-2 rounded-full">
                  <Car className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Vendere Auto Rottame</h2>
              </div>
              <p className="text-lg text-gray-600 mb-6">
                Avete un'auto che ha raggiunto la fine della sua vita utile? Da Van Velzen Autorecycling riceverete il
                miglior prezzo per la vostra auto rottame. Rendiamo il processo di vendita semplice e senza preoccupazioni.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Indipendentemente dalle condizioni della vostra auto, siamo interessati. Che la vostra auto funzioni ancora o meno, offriamo un
                prezzo onesto basato sul valore di mercato attuale e sul valore dei pezzi di ricambio e dei materiali.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Servizio di ritiro gratuito in tutta l'Olanda</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Radiazione RDW diretta</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Pagamento in contanti possibile</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Riciclaggio rispettoso dell'ambiente</span>
                </li>
              </ul>
              <Button asChild>
                <Link href="/it/#richiedi-preventivo" className="flex items-center gap-2">
                  Richiedi preventivo
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="order-1 lg:order-2 relative h-80 lg:h-96 rounded-lg overflow-hidden">
              <Image
                src="/images/tow-truck-1.jpeg?height=600&width=800"
                alt="Vendere auto rottame"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="vendere-auto-danneggiata" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 lg:h-96 rounded-lg overflow-hidden">
              <Image
                src="/images/tow-truck-2.jpeg?height=600&width=800"
                alt="Vendere auto danneggiata"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-purple-50 p-2 rounded-full">
                  <Car className="h-6 w-6 text-purple-500" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Vendere Auto Danneggiata</h2>
              </div>
              <p className="text-lg text-gray-600 mb-6">
                La vostra auto ha subito danni a causa di un incidente o di altre cause? Offriamo un prezzo onesto per la vostra
                auto danneggiata, indipendentemente dalla gravità dei danni.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Spesso vendere un'auto danneggiata a Van Velzen Autorecycling è più vantaggioso che farla riparare.
                Valutiamo la vostra auto e facciamo un'offerta senza impegno.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Valutazione gratuita dei danni</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Preventivo senza impegno</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Gestione rapida</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Tutti i marchi e modelli</span>
                </li>
              </ul>
              <Button asChild>
                <Link href="/it/#richiedi-preventivo" className="flex items-center gap-2">
                  Richiedi preventivo
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="servizio-ritiro-gratuito" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-green-50 p-2 rounded-full">
                  <Truck className="h-6 w-6 text-green-500" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Servizio di Ritiro Gratuito</h2>
              </div>
              <p className="text-lg text-gray-600 mb-6">
                Da Van Velzen Autorecycling non dovete preoccuparvi del trasporto della vostra auto. Ritiriamo
                la vostra auto gratuitamente, ovunque in Olanda.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                I nostri autisti professionisti vengono a ritirare la vostra auto all'orario concordato. Anche se la vostra auto non
                funziona più o ha danni gravi, possiamo ritirarla con i nostri veicoli di trasporto appositamente attrezzati.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Servizio di ritiro gratuito in tutta l'Olanda</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Ritiro quando vi fa più comodo</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Trasporto professionale, anche per auto non funzionanti</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Tutta la documentazione viene gestita sul posto</span>
                </li>
              </ul>
              <Button asChild>
                <Link href="/it/#richiedi-preventivo" className="flex items-center gap-2">
                  Richiedi preventivo
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="order-1 lg:order-2 relative h-80 lg:h-96 rounded-lg overflow-hidden">
              <Image
                src="/images/tow-truck-3.jpeg?height=600&width=800"
                alt="Servizio di ritiro gratuito"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="radiazione-rdw" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 lg:h-96 rounded-lg overflow-hidden">
              <Image
                src="/images/tow-truck-4.jpeg?height=600&width=800"
                alt="Radiazione RDW"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-orange-50 p-2 rounded-full">
                  <FileCheck className="h-6 w-6 text-orange-500" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Radiazione RDW</h2>
              </div>
              <p className="text-lg text-gray-600 mb-6">
                Quando vendete la vostra auto a Van Velzen Autorecycling, gestiamo direttamente la radiazione RDW. Questo
                significa che da quel momento non dovete più pagare la tassa di circolazione e non siete più responsabili dell'auto.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                La radiazione è un documento importante che prova che non siete più i proprietari del
                veicolo. Ci assicuriamo che questo venga gestito correttamente e riceverete un certificato di radiazione.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Radiazione diretta presso la RDW</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Nessuna tassa di circolazione dovuta</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Nessuna responsabilità per il veicolo</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Riceverete un certificato di radiazione</span>
                </li>
              </ul>
              <Button asChild>
                <Link href="/it/#richiedi-preventivo" className="flex items-center gap-2">
                  Richiedi preventivo
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="riciclaggio-sostenibile" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-teal-50 p-2 rounded-full">
                  <Recycle className="h-6 w-6 text-teal-500" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Riciclaggio Sostenibile</h2>
              </div>
              <p className="text-lg text-gray-600 mb-6">
                Il riciclaggio sostenibile è al centro della nostra attività. Ci assicuriamo che la vostra auto
                venga smontata e riciclata nel modo più rispettoso dell'ambiente possibile.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Fino al 95% della vostra auto viene riutilizzato, contribuendo a un'economia circolare. Tutti i materiali
                vengono separati e riciclati secondo le normative vigenti.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-teal-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Fino al 95% di riutilizzo</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-teal-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Processo rispettoso dell'ambiente</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-teal-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Conformità alle normative</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-teal-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Contributo all'economia circolare</span>
                </li>
              </ul>
              <Button asChild>
                <Link href="/it/#richiedi-preventivo" className="flex items-center gap-2">
                  Richiedi preventivo
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="order-1 lg:order-2 relative h-80 lg:h-96 rounded-lg overflow-hidden">
              <Image
                src="/images/tow-truck-5.jpeg?height=600&width=800"
                alt="Riciclaggio sostenibile"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Pronti a vendere la vostra auto?</h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Compilate il modulo e ricevete entro 24 ore un preventivo senza impegno per la vostra auto.
          </p>
          <Button asChild size="lg" className="bg-white hover:bg-gray-100 text-primary">
            <Link href="/it/#richiedi-preventivo" className="flex items-center gap-2">
              Richiedi preventivo
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
        </main>
        <Footer />
      </div>
      <WhatsAppButton />
    </ThemeProvider>
  )
}