import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Check, Award, Users, Leaf, ArrowRight } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us | Van Velzen Autorecycling",
  description:
    "Van Velzen Autorecycling is a family business with more than 25 years of experience in car dismantling. Read more about our history, mission and vision.",
  keywords:
    "car recycling, car dismantling company, family business, sustainable car dismantling, about us, history, mission, vision",
  alternates: {
    canonical: "/en/about-us",
  },
  openGraph: {
    title: "About Us | Van Velzen Autorecycling",
    description: "Read more about our history, mission and vision as a family business in car dismantling.",
    url: "/en/about-us",
  },
}

export default function AboutPage() {
  return (
    <>
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900">About Van Velzen Autorecycling</h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Your reliable partner for car dismantling and recycling for over 25 years
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our History</h2>
              <p className="text-lg text-gray-600 mb-6">
                Van Velzen Autorecycling is a family business that was founded 50 years ago by A.C. van Velzen.
                What started as a small car scrapping business has grown into one of the largest and most sustainable
                car dismantling companies in the Netherlands.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Over the years, we have developed into a leading company in the industry, with a strong focus on
                sustainability and customer satisfaction. The company is now led by the second generation of the Van
                Velzen family, who continue the tradition of quality and service.
              </p>
              <p className="text-lg text-gray-600">
                Our years of experience and expertise enable us to provide you with the best service when selling your
                scrap car or damaged car.
              </p>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden">
              <Image
                src="/images/tow-truck.jpeg"
                alt="Van Velzen Autorecycling tow truck with cars"
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
            <h2 className="text-3xl font-bold text-gray-900">Our Mission & Vision</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              We strive for a sustainable future through responsible car recycling
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-lg text-gray-600 mb-6">
                Our mission is to make car recycling accessible, fair and sustainable. We offer customers the best
                price for their scrap car or damaged car, while ensuring environmentally friendly processing of all
                materials.
              </p>
              <ul className="space-y-3">
                {[
                  "Fair and transparent prices",
                  "Excellent customer service",
                  "Environmentally friendly recycling",
                  "Simple and worry-free process",
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-lg text-gray-600 mb-6">
                We strive to be the leading player in the car recycling industry, known for our sustainable approach,
                innovative methods and excellent customer service. We want to contribute to a circular economy where
                cars at the end of their life become a valuable source of materials.
              </p>
              <p className="text-lg text-gray-600">
                By continuously investing in new technologies and processes, we ensure that we stay ahead in the
                industry and achieve the highest possible recycling rates.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose Van Velzen Autorecycling?</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the benefits of working with an experienced and reliable partner
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="mx-auto w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">50+ Years Experience</h3>
              <p className="text-gray-600">
                With more than 50 years of experience in the industry, we know better than anyone how to provide you
                with the best service when selling your car.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="mx-auto w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mb-4">
                <Leaf className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Sustainable Approach</h3>
              <p className="text-gray-600">
                We recycle cars in an environmentally friendly way, striving for the highest possible reuse of
                materials.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="mx-auto w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Family Business</h3>
              <p className="text-gray-600">
                As a family business, we attach great importance to personal contact and an honest, transparent way
                of working.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Button asChild size="lg">
              <Link href="/en/#offerte-aanvragen" className="flex items-center gap-2">
                Request Quote
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Certifications & Memberships</h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-12">
              Van Velzen Autorecycling meets all legal requirements and is affiliated with various industry
              organizations
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
} 