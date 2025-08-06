import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contatto | Van Velzen Autorecycling",
  description:
    "Contattate Van Velzen Autorecycling per domande sulla vendita della vostra auto rottame o auto danneggiata. Visitate la nostra azienda o chiamateci al 06-86301771.",
  keywords:
    "contatto, autorecycling, vendere auto rottame, contattare, indirizzo, numero di telefono, indirizzo email, orari di apertura",
  alternates: {
    canonical: "/it/contatto",
  },
  openGraph: {
    title: "Contatto | Van Velzen Autorecycling",
    description: "Contattate il nostro team per domande sul riciclaggio auto o sulla vendita della vostra auto.",
    url: "/it/contatto",
  },
}

export default function ContactPage() {
  return (
    <>
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900">Contatto</h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Avete domande o volete fissare un appuntamento? Contattateci.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Dati di Contatto</CardTitle>
                  <CardDescription>Potete raggiungerci in diversi modi</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-primary mr-3 mt-0.5" />
                    <div>
                      <h3 className="font-semibold">Indirizzo</h3>
                      <p className="text-gray-600">
                        Lau Mazirelweg 8
                        <br />
                        2629 HW - Delft
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-primary mr-3 mt-0.5" />
                    <div>
                      <h3 className="font-semibold">Telefono</h3>
                      <p className="text-gray-600">
                        <a href="tel:+31686301771" className="hover:text-primary">
                          06-86301771
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-primary mr-3 mt-0.5" />
                    <div>
                      <h3 className="font-semibold">Email</h3>
                      <p className="text-gray-600">
                        <a href="mailto:info@vanvelzenautorecycling.nl" className="hover:text-primary">
                          info@vanvelzenautorecycling.nl
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-primary mr-3 mt-0.5" />
                    <div>
                      <h3 className="font-semibold">Orari di Apertura</h3>
                      <p className="text-gray-600">
                        Lunedì - Venerdì: 08:00 - 20:00
                        <br />
                        Sabato: 08:00 - 20:00
                        <br />
                        Domenica: Su appuntamento
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Inviateci un messaggio</CardTitle>
                  <CardDescription>Compilate il modulo e vi contatteremo il prima possibile</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Nome
                        </label>
                        <Input id="name" placeholder="Il vostro nome" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Indirizzo Email
                        </label>
                        <Input id="email" type="email" placeholder="vostro@email.it" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">
                        Oggetto
                      </label>
                      <Input id="subject" placeholder="Oggetto del vostro messaggio" />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Messaggio
                      </label>
                      <Textarea id="message" placeholder="Il vostro messaggio" rows={6} />
                    </div>

                    <Button type="submit" className="w-full">
                      Invia
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Posizione</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">Visitate la nostra azienda a Delft</p>
          </div>

          <div className="h-96 rounded-lg overflow-hidden shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4915.1650504242425!2d4.381474745914975!3d51.97803543722462!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c5ca81dff251cd%3A0x95c6569e4847f30b!2sLau%20Mazirelweg%208%2C%202629%20HW%20Delft!5e0!3m2!1snl!2snl!4v1742567811242!5m2!1snl!2snl"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Posizione Van Velzen Autorecycling"
            ></iframe>
          </div>
        </div>
      </section>
    </>
  )
} 