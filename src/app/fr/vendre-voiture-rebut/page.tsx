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
  title: "Vendre voiture de rebut ? Argent direct et collecte gratuite | Van Velzen Autorecycling",
  description:
    "Vendez votre voiture de rebut au meilleur prix ! ✓ Collecte gratuite ✓ Décharge RDW directe ✓ Argent comptant ✓ Traitement respectueux de l'environnement. Demandez un devis maintenant !",
  keywords:
    "vendre voiture de rebut, vendre voiture, vendre épave automobile, vendre voiture cassée, vendre voiture endommagée, recyclage automobile, décharge RDW, collecte gratuite voiture",
  alternates: {
    canonical: "/fr/vendre-voiture-rebut",
  },
  openGraph: {
    title: "Vendre voiture de rebut ? Argent direct et collecte gratuite | Van Velzen Autorecycling",
    description:
      "Vendez votre voiture de rebut au meilleur prix ! ✓ Collecte gratuite ✓ Décharge RDW directe ✓ Argent comptant ✓ Traitement respectueux de l'environnement. Demandez un devis maintenant !",
    url: "/fr/vendre-voiture-rebut",
    type: "website",
    images: [
      {
        url: "/images/tow-truck.jpeg",
        width: 1200,
        height: 630,
        alt: "Vendre Voiture de Rebut chez Van Velzen Autorecycling",
      },
    ],
  },
}

export default function VendreVoitureRebut() {
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
          alt="Vendre voiture de rebut"
          width={1200}
          height={600}
          className="w-full h-[400px] object-cover"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 md:px-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Vendre voiture de rebut ? Recevez le meilleur prix chez Van Velzen Autorecycling
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl">
            Nous sommes intéressés par toutes les voitures, peu importe leur état – qu'elles roulent encore ou non. Obtenez un prix équitable et un service de collecte gratuit.
          </p>
          <div className="mt-8">
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white">
              <Link href="#devis">Demandez un devis directement</Link>
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
              Votre voiture a-t-elle atteint la fin de sa vie ?
            </h2>
            <p className="text-gray-700 mb-4">
              Votre voiture a-t-elle atteint la fin de sa vie et cherchez-vous un partenaire fiable pour vendre votre voiture de rebut à Delft ? Chez Van Velzen Autorecycling, vous obtenez une solution rapide, équitable et transparente. Nous sommes intéressés par toutes les voitures, qu'elles roulent encore ou non, et nous offrons une offre concurrentielle basée sur les prix actuels du métal et les pièces recyclables.
            </p>
          </section>

          {/* Benefits Section */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-800">
              Pourquoi vendre votre voiture de rebut à Van Velzen Autorecycling ?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <span className="text-green-600 text-xl mr-2">✅</span>
                <p className="text-gray-700">
                  <span className="font-semibold">Meilleur prix pour les voitures endommagées</span> – Nous offrons la compensation la plus élevée possible basée sur la valeur actuelle du marché.
                </p>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 text-xl mr-2">✅</span>
                <p className="text-gray-700">
                  <span className="font-semibold">Évaluation gratuite des dégâts</span> – Nos experts évaluent votre voiture sans frais.
                </p>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 text-xl mr-2">✅</span>
                <p className="text-gray-700">
                  <span className="font-semibold">Traitement rapide</span> – Souvent réglé sous 24 heures.
                </p>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 text-xl mr-2">✅</span>
                <p className="text-gray-700">
                  <span className="font-semibold">Collecte gratuite dans toute la Hollande</span> – Où que vous habitiez, nous venons gratuitement chez vous.
                </p>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 text-xl mr-2">✅</span>
                <p className="text-gray-700">
                  <span className="font-semibold">Décharge RDW directe</span> – Vous êtes immédiatement libéré de toute responsabilité.
                </p>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 text-xl mr-2">✅</span>
                <p className="text-gray-700">
                  <span className="font-semibold">Paiement en espèces possible</span> – Recevez votre argent directement.
                </p>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 text-xl mr-2">✅</span>
                <p className="text-gray-700">
                  <span className="font-semibold">Traitement respectueux de l'environnement</span> – Nous recyclons selon les normes environnementales les plus élevées.
                </p>
              </div>
            </div>
          </section>

          {/* Process Section */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-800">Comment ça fonctionne ?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-800 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                      1
                    </div>
                    <h3 className="font-bold text-lg">Soumettre une demande</h3>
                  </div>
                  <p className="text-gray-700">Remplissez notre formulaire en ligne ou appelez-nous directement.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-800 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                      2
                    </div>
                    <h3 className="font-bold text-lg">Recevoir un devis</h3>
                  </div>
                  <p className="text-gray-700">Nous évaluons votre voiture et offrons un prix équitable.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-800 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                      3
                    </div>
                    <h3 className="font-bold text-lg">Planifier un rendez-vous</h3>
                  </div>
                  <p className="text-gray-700">Nous collectons votre voiture gratuitement.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-800 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                      4
                    </div>
                    <h3 className="font-bold text-lg">Paiement et décharge</h3>
                  </div>
                  <p className="text-gray-700">Vous recevez directement de l'argent et un certificat de décharge RDW.</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Types of Cars Section */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-800">Quelles voitures achetons-nous ?</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Voitures endommagées (accident, corrosion, défauts techniques)</li>
              <li>Voitures sans contrôle technique ou qui ne roulent plus</li>
              <li>Occasions avec des coûts de réparation élevés</li>
              <li>Toutes marques et modèles</li>
            </ul>
          </section>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Quote Form */}
          <div id="devis" className="sticky top-4">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-blue-800 mb-4">Demander un devis gratuit</h3>
                <p className="text-gray-600 mb-6">
                  Remplissez le formulaire et recevez un devis sans engagement sous 24 heures.
                </p>
                <QuoteForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
        </main>
        <Footer />
      </div>
      <WhatsAppButton />
    </ThemeProvider>
  )
}