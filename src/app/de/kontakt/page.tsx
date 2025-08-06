import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import WhatsAppButton from "@/components/whatsapp-button"
import { ThemeProvider } from "@/components/theme-provider"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Kontakt | Van Velzen Autorecycling",
  description:
    "Kontaktieren Sie Van Velzen Autorecycling für Fragen zum Verkauf Ihres Schrottautos oder beschädigten Autos. Wir sind für Sie da!",
  keywords:
    "Kontakt, Van Velzen Autorecycling, Schrottauto verkaufen, beschädigtes Auto verkaufen, Adresse, Telefon, E-Mail",
  alternates: {
    canonical: "/de/kontakt",
  },
  openGraph: {
    title: "Kontakt | Van Velzen Autorecycling",
    description: "Kontaktieren Sie uns für Fragen zum Verkauf Ihres Autos. Wir sind für Sie da!",
    url: "/de/kontakt",
  },
}

export default function ContactPage() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900">Kontakt</h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Haben Sie Fragen oder möchten Sie einen Termin vereinbaren? Nehmen Sie Kontakt mit uns auf.
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
                  <CardTitle>Kontaktdaten</CardTitle>
                  <CardDescription>Sie können uns auf verschiedene Weise erreichen</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-primary mr-3 mt-0.5" />
                    <div>
                      <h3 className="font-semibold">Adresse</h3>
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
                      <h3 className="font-semibold">Telefon</h3>
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
                      <h3 className="font-semibold">E-Mail</h3>
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
                      <h3 className="font-semibold">Öffnungszeiten</h3>
                      <p className="text-gray-600">
                        Montag bis Freitag: 08:00 - 20:00
                        <br />
                        Samstag: 08:00 - 20:00
                        <br />
                        Sonntag: Nach Vereinbarung
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Senden Sie uns eine Nachricht</CardTitle>
                  <CardDescription>Füllen Sie das Formular aus und wir nehmen so schnell wie möglich Kontakt mit Ihnen auf</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Name
                        </label>
                        <Input id="name" placeholder="Ihr Name" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          E-Mail-Adresse
                        </label>
                        <Input id="email" type="email" placeholder="ihre@email.de" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">
                        Betreff
                      </label>
                      <Input id="subject" placeholder="Betreff Ihrer Nachricht" />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Nachricht
                      </label>
                      <Textarea id="message" placeholder="Ihre Nachricht" rows={6} />
                    </div>

                    <Button type="submit" className="w-full">
                      Senden
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
            <h2 className="text-3xl font-bold text-gray-900">Standort</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">Besuchen Sie unser Unternehmen in Delft</p>
          </div>

          <div className="h-96 rounded-lg overflow-hidden shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4915.1650504242425!2d4.381474745914975!3d51.97803543722462!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c5ca81dff251cd%3A0x95c6569e4847f30b!2sLau%20Mazirelweg%208%2C%202629%20HW%20Delft!5e0!3m2!1snl!2snl!4v1742567811242!5m2!1snl!2snl"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Standort Van Velzen Autorecycling"
            ></iframe>
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