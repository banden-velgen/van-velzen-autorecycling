"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { Shield, Check, Car } from "lucide-react"
import LicensePlateInput from "@/components/license-plate-input"
import { createClient } from "@/lib/supabase/client"
import { usePathname } from "next/navigation"

export default function QuoteFormComponent() {
  const pathname = usePathname()
  const currentLang = pathname.startsWith("/en") ? "en" : pathname.startsWith("/fr") ? "fr" : pathname.startsWith("/de") ? "de" : pathname.startsWith("/es") ? "es" : pathname.startsWith("/it") ? "it" : "nl"
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const content = {
    nl: {
      title: "Verkoop uw auto direct",
      subtitle: "Ontvang binnen 24 uur een offerte",
      success: {
        title: "Aanvraag succesvol verzonden!",
        message: "Bedankt voor uw aanvraag. Wij nemen binnen 24 uur contact met u op met een vrijblijvende offerte.",
        button: "Nieuwe aanvraag"
      },
      form: {
        licensePlate: "Kenteken",
        name: "Naam",
        namePlaceholder: "Uw volledige naam",
        email: "E-mailadres",
        emailPlaceholder: "uw@email.nl",
        phone: "Telefoonnummer",
        phonePlaceholder: "06 12345678",
        message: "Bericht (optioneel)",
        messagePlaceholder: "Eventuele toelichting over uw auto",
        terms: "Ik ga akkoord met de",
        termsLink: "algemene voorwaarden",
        privacy: "privacybeleid",
        submit: "Offerte aanvragen",
        submitting: "Bezig met verzenden..."
      },
      validation: {
        licensePlate: "Kenteken moet minimaal 4 tekens bevatten",
        name: "Naam moet minimaal 2 tekens bevatten",
        email: "Voer een geldig e-mailadres in",
        phone: "Voer een geldig telefoonnummer in",
        terms: "U moet akkoord gaan met de voorwaarden"
      },
      error: {
        network: "Netwerkfout: Kan geen verbinding maken met de server. Controleer uw internetverbinding en probeer het opnieuw.",
        general: "Er is een fout opgetreden bij het versturen van uw aanvraag. Probeer het later opnieuw."
      },
      footer: {
        description: "Draag bij aan een beter milieu en verkoop jouw auto nu aan één van de grootste en duurzaamste autorecycling en demontagebedrijven in Nederland.",
        secure: "Beveiligde aanvraag",
        noObligation: "Vrijblijvende offerte",
        freePickup: "Gratis ophaalservice",
        privacy: "Van Velzen Autorecycling is één van de marktleiders in de autodemontage branche en is als familiebedrijf zeer betrokken. Wij gaan zorgvuldig om met gegevens en privacy. Deze aanvraag is beveiligd en versleuteld d.m.v. SSL, data en/of gegevens zullen nooit worden gedeeld met derden."
      }
    },
    fr: {
      title: "Vendez votre voiture directement",
      subtitle: "Recevez un devis sous 24 heures",
      success: {
        title: "Demande envoyée avec succès !",
        message: "Merci pour votre demande. Nous vous contacterons sous 24 heures avec un devis sans engagement.",
        button: "Nouvelle demande"
      },
      form: {
        licensePlate: "Plaque d'immatriculation",
        name: "Nom",
        namePlaceholder: "Votre nom complet",
        email: "Adresse e-mail",
        emailPlaceholder: "votre@email.fr",
        phone: "Numéro de téléphone",
        phonePlaceholder: "06 12345678",
        message: "Message (optionnel)",
        messagePlaceholder: "Toute information supplémentaire sur votre voiture",
        terms: "J'accepte les",
        termsLink: "conditions générales",
        privacy: "politique de confidentialité",
        submit: "Demander un devis",
        submitting: "Envoi en cours..."
      },
      validation: {
        licensePlate: "La plaque d'immatriculation doit contenir au moins 4 caractères",
        name: "Le nom doit contenir au moins 2 caractères",
        email: "Veuillez entrer une adresse e-mail valide",
        phone: "Veuillez entrer un numéro de téléphone valide",
        terms: "Vous devez accepter les conditions générales"
      },
      error: {
        network: "Erreur réseau : Impossible de se connecter au serveur. Vérifiez votre connexion internet et réessayez.",
        general: "Une erreur s'est produite lors de l'envoi de votre demande. Veuillez réessayer plus tard."
      },
      footer: {
        description: "Contribuez à un meilleur environnement et vendez votre voiture maintenant à l'une des plus grandes entreprises de recyclage et de démantèlement automobile durables des Pays-Bas.",
        secure: "Demande sécurisée",
        noObligation: "Devis sans engagement",
        freePickup: "Service de collecte gratuit",
        privacy: "Van Velzen Autorecycling est l'un des leaders du marché dans l'industrie du démantèlement automobile et est très impliqué en tant qu'entreprise familiale. Nous traitons les données et la confidentialité avec soin. Cette demande est sécurisée et chiffrée via SSL, les données et/ou informations ne seront jamais partagées avec des tiers."
      }
    },
    de: {
      title: "Verkaufen Sie Ihr Auto direkt",
      subtitle: "Erhalten Sie ein Angebot innerhalb von 24 Stunden",
      success: {
        title: "Anfrage erfolgreich gesendet!",
        message: "Vielen Dank für Ihre Anfrage. Wir werden Sie innerhalb von 24 Stunden mit einem unverbindlichen Angebot kontaktieren.",
        button: "Neue Anfrage"
      },
      form: {
        licensePlate: "Kennzeichen",
        name: "Name",
        namePlaceholder: "Ihr vollständiger Name",
        email: "E-Mail-Adresse",
        emailPlaceholder: "ihre@email.de",
        phone: "Telefonnummer",
        phonePlaceholder: "06 12345678",
        message: "Nachricht (optional)",
        messagePlaceholder: "Zusätzliche Informationen über Ihr Auto",
        terms: "Ich stimme den",
        termsLink: "Allgemeinen Geschäftsbedingungen",
        privacy: "Datenschutzrichtlinie",
        submit: "Angebot anfordern",
        submitting: "Wird gesendet..."
      },
      validation: {
        licensePlate: "Kennzeichen muss mindestens 4 Zeichen enthalten",
        name: "Name muss mindestens 2 Zeichen enthalten",
        email: "Bitte geben Sie eine gültige E-Mail-Adresse ein",
        phone: "Bitte geben Sie eine gültige Telefonnummer ein",
        terms: "Sie müssen den Allgemeinen Geschäftsbedingungen zustimmen"
      },
      error: {
        network: "Netzwerkfehler: Kann keine Verbindung zum Server herstellen. Überprüfen Sie Ihre Internetverbindung und versuchen Sie es erneut.",
        general: "Beim Senden Ihrer Anfrage ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut."
      },
      footer: {
        description: "Tragen Sie zu einer besseren Umwelt bei und verkaufen Sie Ihr Auto jetzt an eines der größten und nachhaltigsten Autorecycling- und Demontageunternehmen in den Niederlanden.",
        secure: "Sichere Anfrage",
        noObligation: "Unverbindliches Angebot",
        freePickup: "Kostenloser Abholservice",
        privacy: "Van Velzen Autorecycling ist einer der Marktführer in der Autodemontage-Branche und ist als Familienunternehmen sehr engagiert. Wir gehen sorgfältig mit Daten und Privatsphäre um. Diese Anfrage ist gesichert und verschlüsselt über SSL, Daten und/oder Informationen werden niemals an Dritte weitergegeben."
      }
    },
    en: {
      title: "Sell your car directly",
      subtitle: "Receive a quote within 24 hours",
      success: {
        title: "Request successfully sent!",
        message: "Thank you for your request. We will contact you within 24 hours with a no-obligation quote.",
        button: "New request"
      },
      form: {
        licensePlate: "License Plate",
        name: "Name",
        namePlaceholder: "Your full name",
        email: "Email address",
        emailPlaceholder: "your@email.com",
        phone: "Phone number",
        phonePlaceholder: "06 12345678",
        message: "Message (optional)",
        messagePlaceholder: "Any additional information about your car",
        terms: "I agree to the",
        termsLink: "terms and conditions",
        privacy: "privacy policy",
        submit: "Request Quote",
        submitting: "Sending..."
      },
      validation: {
        licensePlate: "License plate must contain at least 4 characters",
        name: "Name must contain at least 2 characters",
        email: "Please enter a valid email address",
        phone: "Please enter a valid phone number",
        terms: "You must agree to the terms and conditions"
      },
      error: {
        network: "Network error: Cannot connect to server. Check your internet connection and try again.",
        general: "An error occurred while sending your request. Please try again later."
      },
      footer: {
        description: "Contribute to a better environment and sell your car now to one of the largest and most sustainable car recycling and dismantling companies in the Netherlands.",
        secure: "Secure request",
        noObligation: "No-obligation quote",
        freePickup: "Free pickup service",
        privacy: "Van Velzen Autorecycling is one of the market leaders in the car dismantling industry and is very involved as a family business. We handle data and privacy carefully. This request is secured and encrypted via SSL, data and/or information will never be shared with third parties."
      }
    },
    es: {
      title: "Venda su coche directamente",
      subtitle: "Reciba una oferta en 24 horas",
      success: {
        title: "¡Solicitud enviada con éxito!",
        message: "Gracias por su solicitud. Nos pondremos en contacto con usted en 24 horas con una oferta sin compromiso.",
        button: "Nueva solicitud"
      },
      form: {
        licensePlate: "Matrícula",
        name: "Nombre",
        namePlaceholder: "Su nombre completo",
        email: "Dirección de email",
        emailPlaceholder: "su@email.es",
        phone: "Número de teléfono",
        phonePlaceholder: "06 12345678",
        message: "Mensaje (opcional)",
        messagePlaceholder: "Cualquier información adicional sobre su coche",
        terms: "Acepto las",
        termsLink: "condiciones generales",
        privacy: "política de privacidad",
        submit: "Solicitar Oferta",
        submitting: "Enviando..."
      },
      validation: {
        licensePlate: "La matrícula debe contener al menos 4 caracteres",
        name: "El nombre debe contener al menos 2 caracteres",
        email: "Por favor, introduzca una dirección de email válida",
        phone: "Por favor, introduzca un número de teléfono válido",
        terms: "Debe aceptar las condiciones generales"
      },
      error: {
        network: "Error de red: No se puede conectar al servidor. Compruebe su conexión a internet e inténtelo de nuevo.",
        general: "Se ha producido un error al enviar su solicitud. Por favor, inténtelo más tarde."
      },
      footer: {
        description: "Contribuya a un mejor medio ambiente y venda su coche ahora a una de las empresas más grandes y sostenibles de reciclaje y desguace de coches en los Países Bajos.",
        secure: "Solicitud segura",
        noObligation: "Oferta sin compromiso",
        freePickup: "Servicio de recogida gratuito",
        privacy: "Van Velzen Autorecycling es uno de los líderes del mercado en la industria del desguace de coches y está muy involucrado como empresa familiar. Manejamos los datos y la privacidad con cuidado. Esta solicitud está asegurada y encriptada vía SSL, los datos y/o información nunca serán compartidos con terceros."
      }
    },
    it: {
      title: "Vendete la vostra auto direttamente",
      subtitle: "Ricevete un preventivo entro 24 ore",
      success: {
        title: "Richiesta inviata con successo!",
        message: "Grazie per la vostra richiesta. Vi contatteremo entro 24 ore con un preventivo senza impegno.",
        button: "Nuova richiesta"
      },
      form: {
        licensePlate: "Targa",
        name: "Nome",
        namePlaceholder: "Il vostro nome completo",
        email: "Indirizzo email",
        emailPlaceholder: "vostro@email.it",
        phone: "Numero di telefono",
        phonePlaceholder: "06 12345678",
        message: "Messaggio (opzionale)",
        messagePlaceholder: "Eventuali informazioni aggiuntive sulla vostra auto",
        terms: "Accetto le",
        termsLink: "condizioni generali",
        privacy: "politica sulla privacy",
        submit: "Richiedi Preventivo",
        submitting: "Invio in corso..."
      },
      validation: {
        licensePlate: "La targa deve contenere almeno 4 caratteri",
        name: "Il nome deve contenere almeno 2 caratteri",
        email: "Inserite un indirizzo email valido",
        phone: "Inserite un numero di telefono valido",
        terms: "Dovete accettare le condizioni generali"
      },
      error: {
        network: "Errore di rete: Impossibile connettersi al server. Controllate la vostra connessione internet e riprovate.",
        general: "Si è verificato un errore durante l'invio della vostra richiesta. Riprovate più tardi."
      },
      footer: {
        description: "Contribuite a un ambiente migliore e vendete la vostra auto ora a una delle più grandi e sostenibili aziende di riciclaggio e smontaggio auto dei Paesi Bassi.",
        secure: "Richiesta sicura",
        noObligation: "Preventivo senza impegno",
        freePickup: "Servizio di ritiro gratuito",
        privacy: "Van Velzen Autorecycling è uno dei leader di mercato nell'industria dello smontaggio auto ed è molto coinvolta come azienda familiare. Gestiamo i dati e la privacy con cura. Questa richiesta è protetta e crittografata tramite SSL, i dati e/o le informazioni non saranno mai condivisi con terzi."
      }
    }
  }

  const currentContent = content[currentLang as keyof typeof content]

  const formSchema = z.object({
    licensePlate: z.string().min(4, {
      message: currentContent.validation.licensePlate,
    }),
    name: z.string().min(2, {
      message: currentContent.validation.name,
    }),
    email: z.string().email({
      message: currentContent.validation.email,
    }),
    phone: z.string().min(10, {
      message: currentContent.validation.phone,
    }),
    message: z.string().optional(),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: currentContent.validation.terms,
    }),
  })

  type FormValues = z.infer<typeof formSchema>

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      licensePlate: "",
      name: "",
      email: "",
      phone: "",
      message: "",
      acceptTerms: false,
    },
  })

  async function onSubmit(formData: FormValues) {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      // Format license plate (remove dashes)
      const formattedLicensePlate = formData.licensePlate.replace(/-/g, "").toUpperCase()

      // Use client-side Supabase instance
      const supabase = createClient()

      if (!supabase) {
        throw new Error("Failed to initialize Supabase client")
      }

      // Step 1: Insert the quote request (using only the fields that exist in the schema)
      const { data: quoteData, error: quoteError } = await supabase
        .from("quote_requests")
        .insert({
          license_plate: formattedLicensePlate,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message || "",
          status: "new",
        })
        .select()
        .single()

      if (quoteError) {
        console.error("Error creating quote request:", quoteError)
        throw new Error(quoteError.message)
      }

      console.log("Quote request created successfully:", quoteData)

      // Step 2: Check if vehicles table exists and has the necessary structure
      const { data: vehiclesInfo, error: schemaError } = await supabase
        .from("vehicles")
        .select("*")
        .limit(1)
        .maybeSingle()

      // If vehicles table exists, try to create/update a vehicle record
      if (!schemaError) {
        try {
          const vehicleData = {
            license_plate: formattedLicensePlate,
            status: "pending",
          }

          // Add created_at and updated_at if they exist in the schema
          if (vehiclesInfo && "created_at" in vehiclesInfo) {
            Object.assign(vehicleData, {
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            })
          }

          const { data: vehicle, error: vehicleError } = await supabase
            .from("vehicles")
            .upsert(vehicleData, { onConflict: "license_plate" })
            .select()
            .single()

          if (vehicleError) {
            console.error("Error creating/updating vehicle:", vehicleError)
            // Don't throw here, as the quote request was already created
          } else {
            console.log("Vehicle created/updated successfully:", vehicle)
          }
        } catch (vehicleErr) {
          console.error("Error handling vehicle creation:", vehicleErr)
          // Don't throw here, as the quote request was already created
        }
      } else {
        console.log("Vehicles table might not exist or have the right structure:", schemaError)
      }

      setSubmitSuccess(true)
      form.reset()
    } catch (error) {
      console.error("Form submission error:", error)

      // Provide more specific error messages based on the error type
      if (error instanceof TypeError && error.message.includes("fetch")) {
        setSubmitError(currentContent.error.network)
      } else {
        setSubmitError(currentContent.error.general)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full shadow-lg">
      <CardHeader className="bg-primary text-white rounded-t-lg">
        <CardTitle className="text-2xl font-bold">{currentContent.title}</CardTitle>
        <CardDescription className="text-white/90">{currentContent.subtitle}</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        {submitSuccess ? (
          <div className="text-center py-8">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">{currentContent.success.title}</h3>
            <p className="mt-2 text-sm text-gray-500">
              {currentContent.success.message}
            </p>
            <div className="mt-6">
              <Button type="button" onClick={() => setSubmitSuccess(false)} className="mt-4">
                {currentContent.success.button}
              </Button>
            </div>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" noValidate>
              <FormField
                control={form.control}
                name="licensePlate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{currentContent.form.licensePlate}</FormLabel>
                    <FormControl>
                      <LicensePlateInput
                        value={field.value}
                        onChange={field.onChange}
                        error={form.formState.errors.licensePlate?.message}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{currentContent.form.name}</FormLabel>
                    <FormControl>
                      <Input placeholder={currentContent.form.namePlaceholder} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{currentContent.form.email}</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder={currentContent.form.emailPlaceholder} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{currentContent.form.phone}</FormLabel>
                      <FormControl>
                        <Input placeholder={currentContent.form.phonePlaceholder} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{currentContent.form.message}</FormLabel>
                    <FormControl>
                      <Textarea placeholder={currentContent.form.messagePlaceholder} className="resize-none" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="acceptTerms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        {currentContent.form.terms}{" "}
                        <a href={currentLang === "en" ? "/en/algemene-voorwaarden" : currentLang === "fr" ? "/fr/conditions-generales" : currentLang === "de" ? "/de/allgemeine-geschaeftsbedingungen" : currentLang === "es" ? "/es/condiciones-generales" : "/algemene-voorwaarden"} className="text-primary hover:underline">
                          {currentContent.form.termsLink}
                        </a>{" "}
                        {currentLang === "en" ? "and the" : currentLang === "fr" ? "et la" : currentLang === "de" ? "und der" : currentLang === "es" ? "y la" : "en het"}{" "}
                        <a href={currentLang === "en" ? "/en/privacybeleid" : currentLang === "fr" ? "/fr/politique-confidentialite" : currentLang === "de" ? "/de/datenschutzrichtlinie" : currentLang === "es" ? "/es/politica-privacidad" : "/privacybeleid"} className="text-primary hover:underline">
                          {currentContent.form.privacy}
                        </a>
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              {submitError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
                  <span className="block sm:inline">{submitError}</span>
                </div>
              )}

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? currentContent.form.submitting : currentContent.form.submit}
              </Button>
            </form>
          </Form>
        )}
      </CardContent>
      <CardFooter className="flex flex-col space-y-4 bg-gray-50 rounded-b-lg">
        <p className="text-sm text-gray-600">
          {currentContent.footer.description}
        </p>
        <div className="flex flex-col sm:flex-row justify-between gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <span>{currentContent.footer.secure}</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-5 w-5 text-primary" />
            <span>{currentContent.footer.noObligation}</span>
          </div>
          <div className="flex items-center gap-2">
            <Car className="h-5 w-5 text-primary" />
            <span>{currentContent.footer.freePickup}</span>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          {currentContent.footer.privacy}
        </p>
      </CardFooter>
    </Card>
  )
}

// Export both as default and named export
export { QuoteFormComponent as QuoteForm }
