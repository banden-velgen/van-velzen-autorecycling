import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, PhoneCall, Truck, FileCheck, CreditCard, Recycle } from "lucide-react"
import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Process | Van Velzen Autorecycling",
  description:
    "Discover how the car recycling process works at Van Velzen Autorecycling. From requesting a quote to sustainable recycling in 5 simple steps.",
  keywords:
    "car recycling process, sell scrap car steps, car recycling process, rdw deregistration, free pickup service, how does car recycling work",
  alternates: {
    canonical: "/en/process",
  },
  openGraph: {
    title: "Process | Van Velzen Autorecycling",
    description: "Discover our 5-step process for car recycling, from quote to sustainable processing.",
    url: "/en/process",
  },
}

const steps = [
  {
    title: "Step 1: Request Quote",
    description:
      "Fill out the form with your license plate and contact details to request a no-obligation quote. We will contact you within 24 hours with an offer for your car.",
    icon: PhoneCall,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    position: "left",
  },
  {
    title: "Step 2: Free Pickup Service",
    description:
      "After agreement, we pick up your car for free at a time that suits you best. Our professional drivers arrive at the agreed time and location, anywhere in the Netherlands.",
    icon: Truck,
    color: "text-green-500",
    bgColor: "bg-green-50",
    position: "right",
  },
  {
    title: "Step 3: RDW Deregistration",
    description:
      "When picking up your car, we arrange the RDW deregistration immediately. This means that from that moment on, you no longer have to pay road tax and are no longer liable for the car.",
    icon: FileCheck,
    color: "text-orange-500",
    bgColor: "bg-orange-50",
    position: "left",
  },
  {
    title: "Step 4: Direct Payment",
    description:
      "You receive immediate payment for your car, optionally in cash or by bank transfer. We offer a fair price without hidden costs or surprises afterwards.",
    icon: CreditCard,
    color: "text-purple-500",
    bgColor: "bg-purple-50",
    position: "right",
  },
  {
    title: "Step 5: Sustainable Recycling",
    description:
      "Your car is recycled in an environmentally friendly manner, in accordance with all applicable regulations. Up to 95% of the car is reused, contributing to a circular economy.",
    icon: Recycle,
    color: "text-teal-500",
    bgColor: "bg-teal-50",
    position: "left",
  },
]

export default function ProcessPage() {
  return (
    <>
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900">How it works</h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              In 5 simple steps, we arrange the sale and recycling of your car
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gray-200 hidden md:block"></div>

            <div className="space-y-12 relative">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  <div
                    className={`md:absolute md:left-1/2 md:transform md:-translate-x-1/2 z-10 w-12 h-12 rounded-full ${step.bgColor} flex items-center justify-center mx-auto md:mx-0 mb-4 md:mb-0`}
                  >
                    <step.icon className={`h-6 w-6 ${step.color}`} />
                  </div>

                  <div className={`md:grid md:grid-cols-2 gap-8 ${step.position === "right" ? "md:rtl" : ""}`}>
                    {step.position === "left" ? (
                      <>
                        <div className="md:text-right md:pr-16">
                          <Card className="border-none shadow-none bg-transparent">
                            <CardHeader className="pb-2 px-0">
                              <CardTitle className="text-xl">{step.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="px-0">
                              <CardDescription className="text-base text-gray-600">{step.description}</CardDescription>
                            </CardContent>
                          </Card>
                        </div>
                        <div className="hidden md:block"></div>
                      </>
                    ) : (
                      <>
                        <div className="hidden md:block"></div>
                        <div className="md:text-left md:pl-16">
                          <Card className="border-none shadow-none bg-transparent">
                            <CardHeader className="pb-2 px-0">
                              <CardTitle className="text-xl">{step.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="px-0">
                              <CardDescription className="text-base text-gray-600">{step.description}</CardDescription>
                            </CardContent>
                          </Card>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
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