import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Car, Truck, FileCheck, Recycle, Euro } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Services | Van Velzen Autorecycling",
  description:
    "Découvrez nos services : vendre voiture de rebut, vendre voiture endommagée, service de collecte gratuit, décharge RDW et recyclage durable.",
  keywords:
    "vendre voiture de rebut, vendre voiture endommagée, recyclage automobile, service de collecte gratuit, décharge RDW, recyclage durable, paiement direct",
  alternates: {
    canonical: "/fr/services",
  },
  openGraph: {
    title: "Services | Van Velzen Autorecycling",
    description: "Découvrez nos services de recyclage automobile, du service de collecte à la décharge RDW.",
    url: "/fr/services",
  },
}

export default function ServicesPage() {
  return (
    <>
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900">Nos Services</h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Van Velzen Autorecycling propose un ensemble complet de services pour la vente et le recyclage de votre voiture
            </p>
          </div>
        </div>
      </section>

      <section id="vendre-voiture-rebut" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-50 p-2 rounded-full">
                  <Car className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Vendre Voiture de Rebut</h2>
              </div>
              <p className="text-lg text-gray-600 mb-6">
                Avez-vous une voiture qui a atteint la fin de sa vie ? Chez Van Velzen Autorecycling, vous obtenez le
                meilleur prix pour votre voiture de rebut. Nous rendons le processus de vente simple et sans souci.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Peu importe l'état de votre voiture, nous sommes intéressés. Que votre voiture roule encore ou non, nous
                offrons un prix équitable basé sur la valeur actuelle du marché et la valeur des pièces et matériaux.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Service de collecte gratuit dans toute la Hollande</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Décharge RDW directe</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Paiement en espèces possible</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Recyclage respectueux de l'environnement</span>
                </li>
              </ul>
              <Button asChild>
                <Link href="/fr/#demander-devis" className="flex items-center gap-2">
                  Demander un devis
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="order-1 lg:order-2 relative h-80 lg:h-96 rounded-lg overflow-hidden">
              <Image
                src="/images/tow-truck-1.jpeg?height=600&width=800"
                alt="Vendre voiture de rebut"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="vendre-voiture-endommagee" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 lg:h-96 rounded-lg overflow-hidden">
              <Image
                src="/images/tow-truck-2.jpeg?height=600&width=800"
                alt="Vendre voiture endommagée"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-purple-50 p-2 rounded-full">
                  <Car className="h-6 w-6 text-purple-500" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Vendre Voiture Endommagée</h2>
              </div>
              <p className="text-lg text-gray-600 mb-6">
                Votre voiture a-t-elle été endommagée par un accident ou une autre cause ? Nous offrons un prix équitable
                pour votre voiture endommagée, peu importe la gravité des dégâts.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Souvent, vendre une voiture endommagée à Van Velzen Autorecycling est plus avantageux que de la faire
                réparer. Nous évaluons votre voiture et faisons une offre sans engagement.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Évaluation gratuite des dégâts</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Devis sans engagement</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Traitement rapide</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Toutes marques et modèles</span>
                </li>
              </ul>
              <Button asChild>
                <Link href="/fr/#demander-devis" className="flex items-center gap-2">
                  Demander un devis
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="service-collecte-gratuit" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-green-50 p-2 rounded-full">
                  <Truck className="h-6 w-6 text-green-500" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Service de Collecte Gratuit</h2>
              </div>
              <p className="text-lg text-gray-600 mb-6">
                Chez Van Velzen Autorecycling, vous n'avez pas à vous soucier du transport de votre voiture. Nous
                collectons votre voiture gratuitement, partout en Hollande.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Nos chauffeurs professionnels viennent collecter votre voiture à un moment convenu. Même si votre voiture
                ne roule plus ou a des dégâts graves, nous pouvons la collecter avec nos véhicules de transport
                spécialement équipés.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Service de collecte gratuit dans toute la Hollande</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Collecte à un moment qui vous convient</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Transport professionnel, même pour les voitures qui ne roulent plus</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Tous les documents sont réglés sur place</span>
                </li>
              </ul>
              <Button asChild>
                <Link href="/fr/#demander-devis" className="flex items-center gap-2">
                  Demander un devis
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="order-1 lg:order-2 relative h-80 lg:h-96 rounded-lg overflow-hidden">
              <Image
                src="/images/tow-truck-3.jpeg?height=600&width=800"
                alt="Service de collecte gratuit"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="decharge-rdw" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 lg:h-96 rounded-lg overflow-hidden">
              <Image
                src="/images/tow-truck-4.jpeg?height=600&width=800"
                alt="Décharge RDW"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-orange-50 p-2 rounded-full">
                  <FileCheck className="h-6 w-6 text-orange-500" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Décharge RDW</h2>
              </div>
              <p className="text-lg text-gray-600 mb-6">
                Lorsque vous vendez votre voiture à Van Velzen Autorecycling, nous réglons directement la décharge RDW.
                Cela signifie qu'à partir de ce moment, vous n'avez plus à payer de taxe routière et n'êtes plus
                responsable de la voiture.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                La décharge est un document important qui prouve que vous n'êtes plus le propriétaire du véhicule.
                Nous nous assurons que cela est correctement traité et vous recevez un certificat de décharge.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Décharge directe auprès de la RDW</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Plus de taxe routière due</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Plus de responsabilité pour le véhicule</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Vous recevez un certificat de décharge</span>
                </li>
              </ul>
              <Button asChild>
                <Link href="/fr/#demander-devis" className="flex items-center gap-2">
                  Demander un devis
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="recyclage-durable" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-teal-50 p-2 rounded-full">
                  <Recycle className="h-6 w-6 text-teal-500" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Recyclage Durable</h2>
              </div>
              <p className="text-lg text-gray-600 mb-6">
                Chez Van Velzen Autorecycling, la durabilité est au cœur de nos préoccupations. Nous recyclons les
                voitures de manière respectueuse de l'environnement, en visant la réutilisation la plus élevée possible
                des matériaux.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Nos processus de recyclage avancés garantissent que nous pouvons recycler jusqu'à 95% d'une voiture.
                Toutes les substances nocives sont éliminées en toute sécurité et traitées selon les normes
                environnementales les plus strictes.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-teal-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Jusqu'à 95% de la voiture est recyclée</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-teal-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Élimination sécurisée des substances nocives</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-teal-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Certifié selon les normes environnementales les plus strictes</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-teal-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Contribution à une économie circulaire</span>
                </li>
              </ul>
              <Button asChild>
                <Link href="/fr/#demander-devis" className="flex items-center gap-2">
                  Demander un devis
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="order-1 lg:order-2 relative h-80 lg:h-96 rounded-lg overflow-hidden">
              <Image
                src="/images/tow-truck-5.jpeg?height=600&width=800"
                alt="Recyclage durable"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="paiement-direct" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 lg:h-96 rounded-lg overflow-hidden">
              <Image
                src="/images/tow-truck-6.jpeg?height=600&width=800"
                alt="Paiement direct"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-red-50 p-2 rounded-full">
                  <Euro className="h-6 w-6 text-red-500" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Paiement Direct</h2>
              </div>
              <p className="text-lg text-gray-600 mb-6">
                Chez Van Velzen Autorecycling, vous recevez un paiement direct pour votre voiture. Vous pouvez choisir
                entre un paiement en espèces ou un virement bancaire, selon ce qui vous convient le mieux.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Nous offrons un prix équitable basé sur la valeur actuelle du marché et la valeur des pièces et
                matériaux. Aucun coût caché ou surprise après coup.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Paiement direct lors de la collecte de la voiture</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Choix entre paiement en espèces ou virement bancaire</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Prix équitables sans coûts cachés</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Politique de prix transparente</span>
                </li>
              </ul>
              <Button asChild>
                <Link href="/fr/#demander-devis" className="flex items-center gap-2">
                  Demander un devis
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Prêt à vendre votre voiture ?</h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Remplissez le formulaire et recevez un devis sans engagement pour votre voiture sous 24 heures.
          </p>
          <Button asChild size="lg" className="bg-white hover:bg-gray-100 text-primary">
            <Link href="/fr/#demander-devis" className="flex items-center gap-2">
              Demander un devis
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  )
} 