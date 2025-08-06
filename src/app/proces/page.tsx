import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, PhoneCall, Truck, FileCheck, CreditCard, Recycle } from "lucide-react"
import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Proces | Van Velzen Autorecycling",
  description:
    "Ontdek hoe het proces van autorecycling werkt bij Van Velzen Autorecycling. Van offerte aanvragen tot duurzame recycling in 5 eenvoudige stappen.",
  keywords:
    "autorecycling proces, sloopauto verkopen stappen, auto recycling proces, rdw vrijwaring, gratis ophaalservice, hoe werkt autorecycling",
  alternates: {
    canonical: "/proces",
  },
  openGraph: {
    title: "Proces | Van Velzen Autorecycling",
    description: "Ontdek ons 5-stappen proces voor autorecycling, van offerte tot duurzame verwerking.",
    url: "/proces",
  },
}

const steps = [
  {
    title: "Stap 1: Offerte Aanvragen",
    description:
      "Vul het formulier in met uw kenteken en contactgegevens om een vrijblijvende offerte aan te vragen. Wij nemen binnen 24 uur contact met u op met een bod voor uw auto.",
    icon: PhoneCall,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    position: "left",
  },
  {
    title: "Stap 2: Gratis Ophaalservice",
    description:
      "Na akkoord halen wij uw auto gratis op, op een moment dat u het beste uitkomt. Onze professionele chauffeurs komen op de afgesproken tijd en locatie, waar dan ook in Nederland.",
    icon: Truck,
    color: "text-green-500",
    bgColor: "bg-green-50",
    position: "right",
  },
  {
    title: "Stap 3: RDW Vrijwaring",
    description:
      "Bij ophalen van uw auto regelen wij direct de RDW vrijwaring. Dit betekent dat u vanaf dat moment geen wegenbelasting meer hoeft te betalen en niet meer aansprakelijk bent voor de auto.",
    icon: FileCheck,
    color: "text-orange-500",
    bgColor: "bg-orange-50",
    position: "left",
  },
  {
    title: "Stap 4: Directe Betaling",
    description:
      "U ontvangt direct betaling voor uw auto, desgewenst contant of per bankoverschrijving. Wij bieden een eerlijke prijs zonder verborgen kosten of verrassingen achteraf.",
    icon: CreditCard,
    color: "text-purple-500",
    bgColor: "bg-purple-50",
    position: "right",
  },
  {
    title: "Stap 5: Duurzame Recycling",
    description:
      "Uw auto wordt op een milieuvriendelijke manier gerecycled, conform alle geldende regelgeving. Tot 95% van de auto wordt hergebruikt, wat bijdraagt aan een circulaire economie.",
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
            <h1 className="text-4xl font-bold text-gray-900">Hoe het werkt</h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              In 5 eenvoudige stappen regelen wij de verkoop en recycling van uw auto
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
