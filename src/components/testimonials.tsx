"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

const testimonials = [
  {
    name: "Jan de Vries",
    role: "Particulier",
    content:
      "Zeer tevreden over de service van Van Velzen Autorecycling. Ze hebben mijn oude auto opgehaald en ik kreeg een goede prijs. Alles werd netjes afgehandeld, inclusief de RDW vrijwaring.",
    rating: 5,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Lisa Jansen",
    role: "Particulier",
    content:
      "Na een ongeluk was mijn auto total loss. Van Velzen bood mij een eerlijke prijs en haalde de auto dezelfde dag nog op. De betaling was direct geregeld. Aanrader!",
    rating: 5,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Autobedrijf Smit",
    role: "Zakelijke klant",
    content:
      "Als autobedrijf werken we al jaren samen met Van Velzen Autorecycling. Ze zijn altijd betrouwbaar, bieden goede prijzen en de communicatie verloopt soepel. Een professionele partner.",
    rating: 5,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Pieter van der Berg",
    role: "Particulier",
    content:
      "Mijn oude auto moest weg. Hij werd binnen 2,5 uur opgehaald en ik kreeg contant uitbetaald. Kortom top service!",
    rating: 5,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Marieke Bakker",
    role: "Particulier",
    content:
      "Ik had flinke schade na een aanrijding en kreeg nog meer dan terug dan ik had verwacht plus ze namen alle zorgen uit handen. Nogmaals bedankt",
    rating: 5,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Henk Visser",
    role: "Particulier",
    content:
      "Auto kapot na 15 jaar trouwe dienst. van Velzen bood een eerlijke prijs en haalde hem gratis op. Heel tevreden!",
    rating: 5,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Saskia de Jong",
    role: "Particulier",
    content:
      "Perfecte ervaring! Mijn oude Volkswagen werd snel opgehaald en ik kreeg een goede vergoeding. Alles verliep zoals beloofd. Zeker een aanrader voor iedereen.",
    rating: 5,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Kees Mulder",
    role: "Particulier",
    content:
      "Mijn auto was helaas kapot gegaan. Binnen 2 dagen werd hij opgehaald en was alles geregeld, zeer professioneel en betrouwbaar bedrijf.",
    rating: 5,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Ingrid Scholten",
    role: "Particulier",
    content:
      "Mijn kapotte auto werd snel opgehaald, goede prijs gekregen en alle papieren werden geregeld. Heel blij mee!",
    rating: 5,
    image: "/placeholder.svg?height=100&width=100",
  },
]

export default function Testimonials() {
  const pathname = usePathname()
  const currentLang = pathname.startsWith("/en") ? "en" : pathname.startsWith("/fr") ? "fr" : pathname.startsWith("/de") ? "de" : pathname.startsWith("/es") ? "es" : pathname.startsWith("/it") ? "it" : "nl"
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const content = {
    nl: {
      title: "Wat onze klanten zeggen",
      description: "Ontdek waarom klanten kiezen voor Van Velzen Autorecycling."
    },
    en: {
      title: "What our customers say",
      description: "Discover why customers choose Van Velzen Autorecycling."
    },
    fr: {
      title: "Ce que disent nos clients",
      description: "Découvrez pourquoi les clients choisissent Van Velzen Autorecycling."
    },
    de: {
      title: "Was unsere Kunden sagen",
      description: "Entdecken Sie, warum Kunden Van Velzen Autorecycling wählen."
    },
    es: {
      title: "Lo que dicen nuestros clientes",
      description: "Descubra por qué los clientes eligen Van Velzen Autorecycling."
    },
    it: {
      title: "Cosa dicono i nostri clienti",
      description: "Scoprite perché i clienti scelgono Van Velzen Autorecycling."
    }
  }

  const currentContent = content[currentLang as keyof typeof content]

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.ceil(testimonials.length / 3))
    }, 4000) // Change slide every 4 seconds

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const totalSlides = Math.ceil(testimonials.length / 3)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  const getCurrentTestimonials = () => {
    const startIndex = currentSlide * 3
    return testimonials.slice(startIndex, startIndex + 3)
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">{currentContent.title}</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            {currentContent.description}
          </p>
        </div>

        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </button>

          <button
            onClick={nextSlide}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors"
            aria-label="Next testimonials"
          >
            <ChevronRight className="h-6 w-6 text-gray-600" />
          </button>

          {/* Testimonials Grid */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-500 ease-in-out"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {getCurrentTestimonials().map((testimonial, index) => (
              <Card key={`${currentSlide}-${index}`} className="h-full">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-700">{testimonial.content}</p>
                </CardContent>
                <CardFooter className="flex items-center gap-4 pt-4 border-t">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? "bg-blue-600" : "bg-gray-300"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
