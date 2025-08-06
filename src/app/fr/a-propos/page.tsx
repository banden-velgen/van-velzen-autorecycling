import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Check, Award, Users, Leaf, ArrowRight } from "lucide-react"
import type { Metadata } from "next"
import Header from "@/components/header"
import Footer from "@/components/footer"
import WhatsAppButton from "@/components/whatsapp-button"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: "À Propos | Van Velzen Autorecycling",
  description:
    "Van Velzen Autorecycling est une entreprise familiale avec plus de 25 ans d'expérience dans le démantèlement automobile. En savoir plus sur notre histoire, mission et vision.",
  keywords:
    "recyclage automobile, entreprise de démantèlement automobile, entreprise familiale, démantèlement automobile durable, à propos, histoire, mission, vision",
  alternates: {
    canonical: "/fr/a-propos",
  },
  openGraph: {
    title: "À Propos | Van Velzen Autorecycling",
    description: "En savoir plus sur notre histoire, mission et vision en tant qu'entreprise familiale de démantèlement automobile.",
    url: "/fr/a-propos",
  },
}

export default function AboutPage() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
  return (
  return (
    <>
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900">À Propos de Van Velzen Autorecycling</h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Plus de 25 ans votre partenaire de confiance pour le démantèlement automobile et le recyclage
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Notre Histoire</h2>
              <p className="text-lg text-gray-600 mb-6">
                Van Velzen Autorecycling est une entreprise familiale fondée il y a 50 ans par A.C. van Velzen.
                Ce qui a commencé comme une petite casse automobile s'est développé pour devenir l'une des plus grandes
                et des plus durables entreprises de démantèlement automobile des Pays-Bas.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Au fil des années, nous nous sommes développés pour devenir une entreprise de premier plan dans le secteur,
                avec un fort accent sur la durabilité et la satisfaction client. Aujourd'hui, l'entreprise est dirigée par
                la deuxième génération de la famille Van Velzen, qui perpétue la tradition de qualité et de service.
              </p>
              <p className="text-lg text-gray-600">
                Notre expérience et expertise de longue date nous permettent de vous offrir le meilleur service
                lors de la vente de votre voiture de rebut ou voiture endommagée.
              </p>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden">
              <Image
                src="/images/tow-truck.jpeg"
                alt="Dépanneuse Van Velzen Autorecycling avec voitures"
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
            <h2 className="text-3xl font-bold text-gray-900">Notre Mission & Vision</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Nous aspirons à un avenir durable grâce au recyclage automobile responsable
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Notre Mission</h3>
              <p className="text-lg text-gray-600 mb-6">
                Notre mission est de rendre le recyclage automobile accessible, équitable et durable. Nous offrons aux clients
                le meilleur prix pour leur voiture de rebut ou voiture endommagée, tout en veillant à un traitement respectueux
                de l'environnement de tous les matériaux.
              </p>
              <ul className="space-y-3">
                {[
                  "Prix équitables et transparents",
                  "Service client excellent",
                  "Recyclage respectueux de l'environnement",
                  "Processus simple et sans souci",
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Notre Vision</h3>
              <p className="text-lg text-gray-600 mb-6">
                Nous aspirons à être le leader du secteur du recyclage automobile, reconnu pour notre approche durable,
                nos méthodes innovantes et notre service client exceptionnel. Nous voulons contribuer à une économie
                circulaire où les voitures en fin de vie deviennent une source précieuse de matériaux.
              </p>
              <p className="text-lg text-gray-600">
                En investissant continuellement dans de nouvelles technologies et processus, nous nous assurons de rester
                à la pointe du secteur et d'atteindre les taux de recyclage les plus élevés possibles.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Pourquoi Choisir Van Velzen Autorecycling ?</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez les avantages de travailler avec un partenaire expérimenté et fiable
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="mx-auto w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">50+ Ans d'Expérience</h3>
              <p className="text-gray-600">
                Avec plus de 50 ans d'expérience dans le secteur, nous savons mieux que quiconque comment vous offrir
                le meilleur service lors de la vente de votre voiture.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="mx-auto w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mb-4">
                <Leaf className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Approche Durable</h3>
              <p className="text-gray-600">
                Nous recyclons les voitures de manière respectueuse de l'environnement, en visant la réutilisation
                la plus élevée possible des matériaux.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="mx-auto w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Entreprise Familiale</h3>
              <p className="text-gray-600">
                En tant qu'entreprise familiale, nous accordons une grande valeur au contact personnel et à une
                approche honnête et transparente.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Button asChild size="lg">
              <Link href="/fr/#demander-devis" className="flex items-center gap-2">
                Demander un devis
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Certifications & Adhésions</h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-12">
              Van Velzen Autorecycling répond à toutes les exigences légales et est membre de diverses
              organisations professionnelles
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="bg-white/10 p-4 rounded-lg">
                  <div className="h-16 w-full relative">
                    <Image
                      src={`/placeholder.svg?height=64&width=180`}
                      alt={`Certification ${item}`}
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
        </main>
        <Footer />
      </div>
      <WhatsAppButton />
    </ThemeProvider>
  )
        </main>
        <Footer />
      </div>
      <WhatsAppButton />
    </ThemeProvider>
  )
}