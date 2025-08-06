import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, PhoneCall, Truck, FileCheck, CreditCard, Recycle } from "lucide-react"
import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Proceso | Van Velzen Autorecycling",
  description:
    "Descubra cómo funciona el proceso de reciclaje de coches en Van Velzen Autorecycling. Desde solicitar oferta hasta reciclaje sostenible en 5 pasos simples.",
  keywords:
    "proceso de reciclaje de coches, vender coche de chatarra pasos, proceso de reciclaje de coches, baja RDW, servicio de recogida gratuito, cómo funciona el reciclaje de coches",
  alternates: {
    canonical: "/es/proceso",
  },
  openGraph: {
    title: "Proceso | Van Velzen Autorecycling",
    description: "Descubra nuestro proceso de 5 pasos para reciclaje de coches, desde oferta hasta procesamiento sostenible.",
    url: "/es/proceso",
  },
}

const steps = [
  {
    title: "Paso 1: Solicitar Oferta",
    description:
      "Complete el formulario con su matrícula y datos de contacto para solicitar una oferta sin compromiso. Nos pondremos en contacto con usted en 24 horas con una oferta por su coche.",
    icon: PhoneCall,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    position: "left",
  },
  {
    title: "Paso 2: Servicio de Recogida Gratuito",
    description:
      "Después del acuerdo, recogemos su coche gratuitamente en un momento que le convenga. Nuestros conductores profesionales vienen en el momento y lugar acordados, donde sea en Holanda.",
    icon: Truck,
    color: "text-green-500",
    bgColor: "bg-green-50",
    position: "right",
  },
  {
    title: "Paso 3: Baja RDW",
    description:
      "Al recoger su coche, gestionamos directamente la baja RDW. Esto significa que a partir de ese momento ya no tiene que pagar impuesto de circulación y no es responsable del coche.",
    icon: FileCheck,
    color: "text-orange-500",
    bgColor: "bg-orange-50",
    position: "left",
  },
  {
    title: "Paso 4: Pago Directo",
    description:
      "Recibe pago directo por su coche, en efectivo o por transferencia bancaria según desee. Ofrecemos un precio justo sin costes ocultos o sorpresas posteriores.",
    icon: CreditCard,
    color: "text-purple-500",
    bgColor: "bg-purple-50",
    position: "right",
  },
  {
    title: "Paso 5: Reciclaje Sostenible",
    description:
      "Su coche se recicla de manera respetuosa con el medio ambiente, cumpliendo con toda la normativa vigente. Hasta el 95% del coche se reutiliza, contribuyendo a una economía circular.",
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
            <h1 className="text-4xl font-bold text-gray-900">Cómo funciona</h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              En 5 pasos simples gestionamos la venta y reciclaje de su coche
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
          <h2 className="text-3xl font-bold mb-6">¿Listo para vender su coche?</h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Complete el formulario y reciba una oferta sin compromiso para su coche en 24 horas.
          </p>
          <Button asChild size="lg" className="bg-white hover:bg-gray-100 text-primary">
            <Link href="/es#offerte-aanvragen" className="flex items-center gap-2">
              Solicitar oferta
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  )
} 