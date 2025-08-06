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
  title: "Contact | Van Velzen Autorecycling",
  description:
    "Neem contact op met Van Velzen Autorecycling voor vragen over het verkopen van uw sloopauto of schadeauto. Bezoek ons bedrijf of bel ons op 06-86301771.",
  keywords:
    "contact, autorecycling, sloopauto verkopen, contact opnemen, adres, telefoonnummer, e-mailadres, openingstijden",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact | Van Velzen Autorecycling",
    description: "Neem contact op met ons team voor vragen over autorecycling of het verkopen van uw auto.",
    url: "/contact",
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
            <h1 className="text-4xl font-bold text-gray-900">Contact</h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Heeft u vragen of wilt u een afspraak maken? Neem contact met ons op.
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
                  <CardTitle>Contactgegevens</CardTitle>
                  <CardDescription>U kunt ons op verschillende manieren bereiken</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-primary mr-3 mt-0.5" />
                    <div>
                      <h3 className="font-semibold">Adres</h3>
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
                      <h3 className="font-semibold">Telefoon</h3>
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
                      <h3 className="font-semibold">E-mail</h3>
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
                      <h3 className="font-semibold">Openingstijden</h3>
                      <p className="text-gray-600">
                        Maandag t/m vrijdag: 08:00 - 20:00
                        <br />
                        Zaterdag: 08:00 - 20:00
                        <br />
                        Zondag: Op afspraak
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Stuur ons een bericht</CardTitle>
                  <CardDescription>Vul het formulier in en we nemen zo snel mogelijk contact met u op</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Naam
                        </label>
                        <Input id="name" placeholder="Uw naam" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          E-mailadres
                        </label>
                        <Input id="email" type="email" placeholder="uw@email.nl" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">
                        Onderwerp
                      </label>
                      <Input id="subject" placeholder="Onderwerp van uw bericht" />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Bericht
                      </label>
                      <Textarea id="message" placeholder="Uw bericht" rows={6} />
                    </div>

                    <Button type="submit" className="w-full">
                      Versturen
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
            <h2 className="text-3xl font-bold text-gray-900">Locatie</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">Bezoek ons bedrijf in Delft</p>
          </div>

          <div className="h-96 rounded-lg overflow-hidden shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4915.1650504242425!2d4.381474745914975!3d51.97803543722462!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c5ca81dff251cd%3A0x95c6569e4847f30b!2sLau%20Mazirelweg%208%2C%202629%20HW%20Delft!5e0!3m2!1snl!2snl!4v1742567811242!5m2!1snl!2snl"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Locatie Van Velzen Autorecycling"
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
