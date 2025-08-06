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
  title: "Sobre Nosotros | Van Velzen Autorecycling",
  description:
    "Conozca más sobre Van Velzen Autorecycling, una de las empresas más grandes y sostenibles de reciclaje de coches en los Países Bajos.",
  keywords:
    "sobre nosotros, van velzen autorecycling, historia, misión, valores, equipo, reciclaje de coches, Países Bajos",
  alternates: {
    canonical: "/es/sobre-nosotros",
  },
  openGraph: {
    title: "Sobre Nosotros | Van Velzen Autorecycling",
    description: "Conozca más sobre nuestra empresa y nuestro compromiso con el reciclaje sostenible de coches.",
    url: "/es/sobre-nosotros",
  },
}

export default function AboutPage() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900">Sobre Van Velzen Autorecycling</h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Más de 25 años como su socio de confianza para desguace y reciclaje de coches
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Nuestra Historia</h2>
              <p className="text-lg text-gray-600 mb-6">
                Van Velzen Autorecycling es una empresa familiar fundada hace 50 años por A.C. van Velzen.
                Lo que comenzó como un pequeño desguace de coches se ha convertido en una de las empresas más grandes y sostenibles
                de desguace de coches de los Países Bajos.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                A lo largo de los años, nos hemos desarrollado hasta convertirnos en una empresa líder en el sector, con un fuerte
                enfoque en la sostenibilidad y la satisfacción del cliente. Actualmente, la empresa está dirigida por la segunda generación
                de la familia Van Velzen, que continúa la tradición de calidad y servicio.
              </p>
              <p className="text-lg text-gray-600">
                Nuestros años de experiencia y experiencia nos permiten ofrecerle el mejor servicio al vender
                su coche de chatarra o dañado.
              </p>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden">
              <Image
                src="/images/tow-truck.jpeg"
                alt="Van Velzen Autorecycling grúa con coches"
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
            <h2 className="text-3xl font-bold text-gray-900">Nuestra Misión y Visión</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Aspiramos a un futuro sostenible a través del reciclaje responsable de coches
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Nuestra Misión</h3>
              <p className="text-lg text-gray-600 mb-6">
                Nuestra misión es hacer que el reciclaje de coches sea accesible, justo y sostenible. Ofrecemos a los clientes el mejor
                precio por su coche de chatarra o dañado, mientras nos aseguramos de que todos los materiales se procesen de manera respetuosa con el medio ambiente.
              </p>
              <ul className="space-y-3">
                {[
                  "Precios justos y transparentes",
                  "Excelente servicio al cliente",
                  "Reciclaje respetuoso con el medio ambiente",
                  "Proceso simple y sin preocupaciones",
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Nuestra Visión</h3>
              <p className="text-lg text-gray-600 mb-6">
                Aspiramos a ser el actor líder en la industria del reciclaje de coches, conocido por nuestro
                enfoque sostenible, métodos innovadores y servicio al cliente excepcional. Queremos contribuir a una
                economía circular donde los coches al final de su vida útil sean una valiosa fuente de materiales.
              </p>
              <p className="text-lg text-gray-600">
                Al invertir continuamente en nuevas tecnologías y procesos, nos aseguramos de mantenernos a la vanguardia
                de la industria y lograr los porcentajes de reciclaje más altos posibles.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">¿Por qué elegir Van Velzen Autorecycling?</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Descubra las ventajas de trabajar con un socio experimentado y confiable
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="mx-auto w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">50+ Años de Experiencia</h3>
              <p className="text-gray-600">
                Con más de 50 años de experiencia en el sector, sabemos mejor que nadie cómo ofrecerle el mejor servicio
                al vender su coche.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="mx-auto w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mb-4">
                <Leaf className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Enfoque Sostenible</h3>
              <p className="text-gray-600">
                Reciclamos coches de manera respetuosa con el medio ambiente, aspirando al máximo reutilización posible
                de materiales.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="mx-auto w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Empresa Familiar</h3>
              <p className="text-gray-600">
                Como empresa familiar, valoramos mucho el contacto personal y un enfoque honesto y transparente.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Button asChild size="lg">
              <Link href="/es#offerte-aanvragen" className="flex items-center gap-2">
                Solicitar oferta
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Certificaciones y Membresías</h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-12">
              Van Velzen Autorecycling cumple con todos los requisitos legales y está afiliado a diversas
              organizaciones del sector
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="bg-white/10 p-4 rounded-lg">
                  <div className="h-16 w-full relative">
                    <Image
                      src={`/placeholder.svg?height=64&width=180`}
                      alt={`Certificación ${item}`}
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
        </main>
        <Footer />
      </div>
      <WhatsAppButton />
    </ThemeProvider>
  )
}