import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Car, Truck, FileCheck, Recycle, Euro } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Services | Van Velzen Autorecycling",
  description:
    "Discover our services: sell scrap car, sell damaged car, free pickup service, RDW deregistration and sustainable recycling.",
  keywords:
    "sell scrap car, sell damaged car, car recycling, free pickup service, rdw deregistration, sustainable recycling, direct payment",
  alternates: {
    canonical: "/en/services",
  },
  openGraph: {
    title: "Services | Van Velzen Autorecycling",
    description: "Discover our services for car recycling, from pickup service to RDW deregistration.",
    url: "/en/services",
  },
}

export default function ServicesPage() {
  return (
    <>
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900">Our Services</h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Van Velzen Autorecycling offers a complete package of services for selling and recycling your car
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
                <h2 className="text-3xl font-bold text-gray-900">Sell Scrap Car</h2>
              </div>
              <p className="text-lg text-gray-600 mb-6">
                Do you have a car that has reached the end of its life? At Van Velzen Autorecycling, you get the best
                price for your scrap car. We make the selling process simple and worry-free.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Regardless of the condition of your car, we are interested. Whether your car still runs or not, we offer
                a fair price based on the current market value and the value of parts and materials.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Free pickup service throughout the Netherlands</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Direct RDW deregistration</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Cash payment possible</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Environmentally friendly recycling</span>
                </li>
              </ul>
              <Button asChild>
                <Link href="/en/#offerte-aanvragen" className="flex items-center gap-2">
                  Request Quote
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="order-1 lg:order-2 relative h-80 lg:h-96 rounded-lg overflow-hidden">
              <Image
                src="/images/tow-truck-1.jpeg?height=600&width=800"
                alt="Sell scrap car"
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
                alt="Sell damaged car"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-purple-50 p-2 rounded-full">
                  <Car className="h-6 w-6 text-purple-500" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Sell Damaged Car</h2>
              </div>
              <p className="text-lg text-gray-600 mb-6">
                Has your car been damaged in an accident or other cause? We offer a fair price for your damaged car,
                regardless of the severity of the damage.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Often, selling a damaged car to Van Velzen Autorecycling is more advantageous than having it repaired.
                We assess your car and make a no-obligation offer.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Free damage assessment</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">No-obligation quote</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Quick processing</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">All brands and models</span>
                </li>
              </ul>
              <Button asChild>
                <Link href="/en/#offerte-aanvragen" className="flex items-center gap-2">
                  Request Quote
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
                <h2 className="text-3xl font-bold text-gray-900">Free Pickup Service</h2>
              </div>
              <p className="text-lg text-gray-600 mb-6">
                At Van Velzen Autorecycling, you don't have to worry about transporting your car. We pick up your car
                for free, anywhere in the Netherlands.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Our professional drivers will pick up your car at an agreed time. Even if your car no longer runs or has
                serious damage, we can pick it up with our specially equipped transport vehicles.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Free pickup service throughout the Netherlands</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Pickup at a time that suits you</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Professional transport, also for non-running cars</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">All paperwork is arranged on site</span>
                </li>
              </ul>
              <Button asChild>
                <Link href="/en/#offerte-aanvragen" className="flex items-center gap-2">
                  Request Quote
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="order-1 lg:order-2 relative h-80 lg:h-96 rounded-lg overflow-hidden">
              <Image
                src="/images/tow-truck-3.jpeg?height=600&width=800"
                alt="Free pickup service"
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
                alt="RDW deregistration"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-orange-50 p-2 rounded-full">
                  <FileCheck className="h-6 w-6 text-orange-500" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">RDW Deregistration</h2>
              </div>
              <p className="text-lg text-gray-600 mb-6">
                When you sell your car to Van Velzen Autorecycling, we arrange the RDW deregistration immediately. This
                means that from that moment on, you no longer have to pay road tax and are no longer liable for the car.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                The deregistration is an important document that proves that you are no longer the owner of the vehicle.
                We ensure that this is handled correctly and you receive a deregistration certificate.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Direct deregistration with the RDW</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">No more road tax owed</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">No more liability for the vehicle</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">You receive a deregistration certificate</span>
                </li>
              </ul>
              <Button asChild>
                <Link href="/en/#offerte-aanvragen" className="flex items-center gap-2">
                  Request Quote
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
                <h2 className="text-3xl font-bold text-gray-900">Sustainable Recycling</h2>
              </div>
              <p className="text-lg text-gray-600 mb-6">
                At Van Velzen Autorecycling, sustainability is central. We recycle cars in an environmentally friendly
                way, striving for the highest possible reuse of materials.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Our advanced recycling processes ensure that we can recycle up to 95% of a car. All harmful substances
                are safely removed and processed according to the strictest environmental standards.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-teal-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Up to 95% of the car is recycled</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-teal-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Safe removal of harmful substances</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-teal-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Certified according to the strictest environmental standards</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-teal-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Contribution to a circular economy</span>
                </li>
              </ul>
              <Button asChild>
                <Link href="/en/#offerte-aanvragen" className="flex items-center gap-2">
                  Request Quote
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="order-1 lg:order-2 relative h-80 lg:h-96 rounded-lg overflow-hidden">
              <Image
                src="/images/tow-truck-5.jpeg?height=600&width=800"
                alt="Sustainable recycling"
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
                alt="Direct payment"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-red-50 p-2 rounded-full">
                  <Euro className="h-6 w-6 text-red-500" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Direct Payment</h2>
              </div>
              <p className="text-lg text-gray-600 mb-6">
                At Van Velzen Autorecycling, you receive immediate payment for your car. You can choose between cash
                payment or a bank transfer, whichever is most suitable for you.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                We offer a fair price based on the current market value and the value of parts and materials. No hidden
                costs or surprises afterwards.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Direct payment when picking up the car</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Choice between cash payment or bank transfer</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Fair prices without hidden costs</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Transparent pricing policy</span>
                </li>
              </ul>
              <Button asChild>
                <Link href="/en/#offerte-aanvragen" className="flex items-center gap-2">
                  Request Quote
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to sell your car?</h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Fill out the form and receive a no-obligation quote for your car within 24 hours.
          </p>
          <Button asChild size="lg" className="bg-white hover:bg-gray-100 text-primary">
            <Link href="/en/#offerte-aanvragen" className="flex items-center gap-2">
              Request Quote
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  )
} 