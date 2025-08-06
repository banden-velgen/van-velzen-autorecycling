import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Car, Truck, FileCheck, Recycle, Euro } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Servicios | Van Velzen Autorecycling",
  description:
    "Ofrecemos servicios completos de reciclaje de coches, incluyendo la venta de coches de chatarra, coches dañados, recogida gratuita y baja RDW.",
  keywords:
    "servicios, reciclaje de coches, vender coche chatarra, vender coche dañado, recogida gratuita, baja RDW, autorecycling, Países Bajos",
  alternates: {
    canonical: "/es/servicios",
  },
  openGraph: {
    title: "Servicios | Van Velzen Autorecycling",
    description: "Servicios completos de reciclaje de coches con recogida gratuita y baja RDW incluida.",
    url: "/es/servicios",
  },
}

export default function ServicesPage() {
  return (
    <>
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900">Nuestros Servicios</h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Van Velzen Autorecycling ofrece un paquete completo de servicios para vender y reciclar su coche
            </p>
          </div>
        </div>
      </section>

      <section id="vender-coche-chatarra" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-50 p-2 rounded-full">
                  <Car className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Vender Coche de Chatarra</h2>
              </div>
              <p className="text-lg text-gray-600 mb-6">
                ¿Tiene un coche que ha llegado al final de su vida útil? En Van Velzen Autorecycling obtendrá el
                mejor precio por su coche de chatarra. Hacemos que el proceso de venta sea simple y sin preocupaciones.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Independientemente del estado de su coche, estamos interesados. Ya sea que su coche funcione o no, ofrecemos un
                precio justo basado en el valor actual del mercado y el valor de las piezas y materiales.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Servicio de recogida gratuito en toda Holanda</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Baja RDW directa</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Pago en efectivo posible</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Reciclaje respetuoso con el medio ambiente</span>
                </li>
              </ul>
              <Button asChild>
                <Link href="/es#offerte-aanvragen" className="flex items-center gap-2">
                  Solicitar oferta
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="order-1 lg:order-2 relative h-80 lg:h-96 rounded-lg overflow-hidden">
              <Image
                src="/images/tow-truck-1.jpeg?height=600&width=800"
                alt="Vender coche de chatarra"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="vender-coche-danado" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 lg:h-96 rounded-lg overflow-hidden">
              <Image
                src="/images/tow-truck-2.jpeg?height=600&width=800"
                alt="Vender coche dañado"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-purple-50 p-2 rounded-full">
                  <Car className="h-6 w-6 text-purple-500" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Vender Coche Dañado</h2>
              </div>
              <p className="text-lg text-gray-600 mb-6">
                ¿Su coche ha sufrido daños por un accidente u otra causa? Ofrecemos un precio justo por su
                coche dañado, independientemente de la gravedad de los daños.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                A menudo, vender un coche dañado a Van Velzen Autorecycling es más ventajoso que repararlo.
                Evaluamos su coche y hacemos una oferta sin compromiso.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Evaluación gratuita de los daños</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Oferta sin compromiso</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Procesamiento rápido</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Todas las marcas y modelos</span>
                </li>
              </ul>
              <Button asChild>
                <Link href="/es#offerte-aanvragen" className="flex items-center gap-2">
                  Solicitar oferta
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="servicio-recogida-gratuito" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-green-50 p-2 rounded-full">
                  <Truck className="h-6 w-6 text-green-500" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Servicio de Recogida Gratuito</h2>
              </div>
              <p className="text-lg text-gray-600 mb-6">
                En Van Velzen Autorecycling no tiene que preocuparse por el transporte de su coche. Recogemos
                su coche gratuitamente, donde sea en Holanda.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Nuestros conductores profesionales vienen a recoger su coche en un momento acordado. Incluso si su coche no
                funciona o tiene daños graves, podemos recogerlo con nuestros vehículos de transporte especialmente equipados.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Servicio de recogida gratuito en toda Holanda</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Recogida en un momento que le convenga</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Transporte profesional, también para coches que no funcionan</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Todo el papeleo se gestiona in situ</span>
                </li>
              </ul>
              <Button asChild>
                <Link href="/es#offerte-aanvragen" className="flex items-center gap-2">
                  Solicitar oferta
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="order-1 lg:order-2 relative h-80 lg:h-96 rounded-lg overflow-hidden">
              <Image
                src="/images/tow-truck-3.jpeg?height=600&width=800"
                alt="Servicio de recogida gratuito"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="baja-rdw" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 lg:h-96 rounded-lg overflow-hidden">
              <Image
                src="/images/tow-truck-4.jpeg?height=600&width=800"
                alt="Baja RDW"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-orange-50 p-2 rounded-full">
                  <FileCheck className="h-6 w-6 text-orange-500" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Baja RDW</h2>
              </div>
              <p className="text-lg text-gray-600 mb-6">
                Cuando vende su coche a Van Velzen Autorecycling, gestionamos directamente la baja RDW. Esto
                significa que a partir de ese momento ya no tiene que pagar impuesto de circulación y no es responsable
                del coche.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                La baja es un documento importante que prueba que ya no es el propietario del
                vehículo. Nos aseguramos de que esto se gestione correctamente y recibe un certificado de baja.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Baja directa en el RDW</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Ya no debe impuesto de circulación</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Ya no es responsable del vehículo</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Recibe un certificado de baja</span>
                </li>
              </ul>
              <Button asChild>
                <Link href="/es#offerte-aanvragen" className="flex items-center gap-2">
                  Solicitar oferta
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="reciclaje-sostenible" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-teal-50 p-2 rounded-full">
                  <Recycle className="h-6 w-6 text-teal-500" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Reciclaje Sostenible</h2>
              </div>
              <p className="text-lg text-gray-600 mb-6">
                En Van Velzen Autorecycling, la sostenibilidad es central. Reciclamos coches de manera respetuosa con el medio ambiente,
                aspirando al máximo reutilización posible de materiales.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Nuestros procesos de reciclaje avanzados aseguran que podemos reciclar hasta el 95% de un coche. Todas
                las sustancias nocivas se eliminan y procesan de forma segura según las normas medioambientales más estrictas.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-teal-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Hasta el 95% del coche se recicla</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-teal-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Eliminación segura de sustancias nocivas</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-teal-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Certificado según las normas medioambientales más estrictas</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-teal-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Contribución a una economía circular</span>
                </li>
              </ul>
              <Button asChild>
                <Link href="/es#offerte-aanvragen" className="flex items-center gap-2">
                  Solicitar oferta
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="order-1 lg:order-2 relative h-80 lg:h-96 rounded-lg overflow-hidden">
              <Image
                src="/images/tow-truck-5.jpeg?height=600&width=800"
                alt="Reciclaje sostenible"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="pago-directo" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 lg:h-96 rounded-lg overflow-hidden">
              <Image
                src="/images/tow-truck-6.jpeg?height=600&width=800"
                alt="Pago directo"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-red-50 p-2 rounded-full">
                  <Euro className="h-6 w-6 text-red-500" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Pago Directo</h2>
              </div>
              <p className="text-lg text-gray-600 mb-6">
                En Van Velzen Autorecycling recibe pago directo por su coche. Puede elegir entre pago en efectivo
                o transferencia bancaria, lo que sea más conveniente para usted.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Ofrecemos un precio justo basado en el valor actual del mercado y el valor de las piezas y
                materiales. Sin costes ocultos o sorpresas posteriores.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Pago directo al recoger el coche</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Elección entre pago en efectivo o transferencia bancaria</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Precios justos sin costes ocultos</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Política de precios transparente</span>
                </li>
              </ul>
              <Button asChild>
                <Link href="/es#offerte-aanvragen" className="flex items-center gap-2">
                  Solicitar oferta
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
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