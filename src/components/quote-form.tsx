"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, AlertCircle, Loader2, Shield, Check, Car } from "lucide-react"
import { cn } from "@/lib/utils"
import LicensePlateInput from "@/components/license-plate-input"

// Form validation schema with multilingual error messages
const createFormSchema = (language: string) => {
  const errorMessages = {
    nl: {
      licensePlate: {
        required: "Kenteken is verplicht",
        format: "Kenteken mag alleen letters, cijfers en streepjes bevatten",
        max: "Kenteken is te lang"
      },
      name: {
        required: "Naam is verplicht",
        max: "Naam is te lang"
      },
      email: {
        invalid: "Voer een geldig e-mailadres in"
      },
      phone: {
        required: "Telefoonnummer is verplicht",
        max: "Telefoonnummer is te lang"
      },
      message: {
        max: "Bericht is te lang"
      },
      terms: {
        required: "U moet akkoord gaan met de voorwaarden"
      }
    },
    en: {
      licensePlate: {
        required: "License plate is required",
        format: "License plate can only contain letters, numbers and dashes",
        max: "License plate is too long"
      },
      name: {
        required: "Name is required",
        max: "Name is too long"
      },
      email: {
        invalid: "Please enter a valid email address"
      },
      phone: {
        required: "Phone number is required",
        max: "Phone number is too long"
      },
      message: {
        max: "Message is too long"
      },
      terms: {
        required: "You must agree to the terms and conditions"
      }
    },
    de: {
      licensePlate: {
        required: "Kennzeichen ist erforderlich",
        format: "Kennzeichen darf nur Buchstaben, Zahlen und Bindestriche enthalten",
        max: "Kennzeichen ist zu lang"
      },
      name: {
        required: "Name ist erforderlich",
        max: "Name ist zu lang"
      },
      email: {
        invalid: "Bitte geben Sie eine gültige E-Mail-Adresse ein"
      },
      phone: {
        required: "Telefonnummer ist erforderlich",
        max: "Telefonnummer ist zu lang"
      },
      message: {
        max: "Nachricht ist zu lang"
      },
      terms: {
        required: "Sie müssen den Bedingungen zustimmen"
      }
    },
    es: {
      licensePlate: {
        required: "La matrícula es obligatoria",
        format: "La matrícula solo puede contener letras, números y guiones",
        max: "La matrícula es demasiado larga"
      },
      name: {
        required: "El nombre es obligatorio",
        max: "El nombre es demasiado largo"
      },
      email: {
        invalid: "Por favor, introduzca una dirección de correo electrónico válida"
      },
      phone: {
        required: "El número de teléfono es obligatorio",
        max: "El número de teléfono es demasiado largo"
      },
      message: {
        max: "El mensaje es demasiado largo"
      },
      terms: {
        required: "Debe aceptar los términos y condiciones"
      }
    },
    fr: {
      licensePlate: {
        required: "La plaque d'immatriculation est obligatoire",
        format: "La plaque d'immatriculation ne peut contenir que des lettres, des chiffres et des tirets",
        max: "La plaque d'immatriculation est trop longue"
      },
      name: {
        required: "Le nom est obligatoire",
        max: "Le nom est trop long"
      },
      email: {
        invalid: "Veuillez saisir une adresse e-mail valide"
      },
      phone: {
        required: "Le numéro de téléphone est obligatoire",
        max: "Le numéro de téléphone est trop long"
      },
      message: {
        max: "Le message est trop long"
      },
      terms: {
        required: "Vous devez accepter les termes et conditions"
      }
    },
    it: {
      licensePlate: {
        required: "La targa è obbligatoria",
        format: "La targa può contenere solo lettere, numeri e trattini",
        max: "La targa è troppo lunga"
      },
      name: {
        required: "Il nome è obbligatorio",
        max: "Il nome è troppo lungo"
      },
      email: {
        invalid: "Inserisca un indirizzo e-mail valido"
      },
      phone: {
        required: "Il numero di telefono è obbligatorio",
        max: "Il numero di telefono è troppo lungo"
      },
      message: {
        max: "Il messaggio è troppo lungo"
      },
      terms: {
        required: "Deve accettare i termini e le condizioni"
      }
    }
  }

  const messages = errorMessages[language as keyof typeof errorMessages] || errorMessages.nl

  return z.object({
    licensePlate: z
      .string()
      .min(1, messages.licensePlate.required)
      .regex(/^[A-Z0-9-]+$/i, messages.licensePlate.format)
      .max(10, messages.licensePlate.max),
    name: z.string().min(1, messages.name.required).max(100, messages.name.max),
    email: z.string().email(messages.email.invalid),
    phone: z.string().min(1, messages.phone.required).max(20, messages.phone.max),
    message: z.string().max(500, messages.message.max).optional(),
    terms: z.boolean().refine((val) => val === true, messages.terms.required),
  })
}

interface QuoteFormProps {
  language?: string
}

export default function QuoteFormComponent({ language = "nl" }: QuoteFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const formSchema = createFormSchema(language)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      licensePlate: "",
      name: "",
      email: "",
      phone: "",
      message: "",
      terms: false,
    },
  })

  // Multilingual content
  const content = {
    nl: {
      title: "Verkoop uw auto direct",
      subtitle: "Ontvang binnen 24 uur een offerte",
      fields: {
        licensePlate: "Kenteken",
        name: "Naam",
        email: "E-mailadres",
        phone: "Telefoonnummer",
        message: "Bericht (optioneel)",
        terms: "Ik ga akkoord met de algemene voorwaarden en het privacybeleid",
      },
      submit: "Offerte aanvragen",
      success: {
        title: "Offerte aanvraag verzonden!",
        message: "We nemen binnen 24 uur contact met u op.",
      },
      error: {
        general: "Er is een fout opgetreden. Probeer het later opnieuw.",
        network: "Netwerkfout. Controleer uw internetverbinding.",
      },
      placeholder: {
        name: "Uw volledige naam",
        email: "uw@email.nl",
        phone: "06 12345678",
        message: "Eventuele toelichting over uw auto",
        licensePlate: "XX-XX-XX"
      }
    },
    en: {
      title: "Sell your car directly",
      subtitle: "Receive a quote within 24 hours",
      fields: {
        licensePlate: "License Plate",
        name: "Name",
        email: "Email Address",
        phone: "Phone Number",
        message: "Message (optional)",
        terms: "I agree to the terms and conditions and privacy policy",
      },
      submit: "Request Quote",
      success: {
        title: "Quote request sent!",
        message: "We will contact you within 24 hours.",
      },
      error: {
        general: "An error occurred. Please try again later.",
        network: "Network error. Please check your internet connection.",
      },
      placeholder: {
        name: "Your full name",
        email: "your@email.com",
        phone: "+31 6 12345678",
        message: "Any additional information about your car",
        licensePlate: "XX-XX-XX"
      }
    },
    de: {
      title: "Verkaufen Sie Ihr Auto direkt",
      subtitle: "Erhalten Sie innerhalb von 24 Stunden ein Angebot",
      fields: {
        licensePlate: "Kennzeichen",
        name: "Name",
        email: "E-Mail-Adresse",
        phone: "Telefonnummer",
        message: "Nachricht (optional)",
        terms: "Ich stimme den Allgemeinen Geschäftsbedingungen und der Datenschutzerklärung zu",
      },
      submit: "Angebot anfordern",
      success: {
        title: "Angebotsanfrage gesendet!",
        message: "Wir werden uns innerhalb von 24 Stunden bei Ihnen melden.",
      },
      error: {
        general: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.",
        network: "Netzwerkfehler. Bitte überprüfen Sie Ihre Internetverbindung.",
      },
      placeholder: {
        name: "Ihr vollständiger Name",
        email: "ihre@email.de",
        phone: "+31 6 12345678",
        message: "Zusätzliche Informationen über Ihr Auto",
        licensePlate: "XX-XX-XX"
      }
    },
    es: {
      title: "Venda su coche directamente",
      subtitle: "Reciba una oferta en 24 horas",
      fields: {
        licensePlate: "Matrícula",
        name: "Nombre",
        email: "Dirección de correo electrónico",
        phone: "Número de teléfono",
        message: "Mensaje (opcional)",
        terms: "Acepto los términos y condiciones y la política de privacidad",
      },
      submit: "Solicitar oferta",
      success: {
        title: "¡Solicitud de oferta enviada!",
        message: "Nos pondremos en contacto con usted en 24 horas.",
      },
      error: {
        general: "Ha ocurrido un error. Por favor, inténtelo de nuevo más tarde.",
        network: "Error de red. Por favor, compruebe su conexión a internet.",
      },
      placeholder: {
        name: "Su nombre completo",
        email: "su@email.es",
        phone: "+31 6 12345678",
        message: "Cualquier información adicional sobre su coche",
        licensePlate: "XX-XX-XX"
      }
    },
    fr: {
      title: "Vendez votre voiture directement",
      subtitle: "Recevez un devis sous 24 heures",
      fields: {
        licensePlate: "Plaque d'immatriculation",
        name: "Nom",
        email: "Adresse e-mail",
        phone: "Numéro de téléphone",
        message: "Message (optionnel)",
        terms: "J'accepte les termes et conditions et la politique de confidentialité",
      },
      submit: "Demander un devis",
      success: {
        title: "Demande de devis envoyée !",
        message: "Nous vous contacterons sous 24 heures.",
      },
      error: {
        general: "Une erreur s'est produite. Veuillez réessayer plus tard.",
        network: "Erreur réseau. Veuillez vérifier votre connexion internet.",
      },
      placeholder: {
        name: "Votre nom complet",
        email: "votre@email.fr",
        phone: "+31 6 12345678",
        message: "Toute information supplémentaire sur votre voiture",
        licensePlate: "XX-XX-XX"
      }
    },
    it: {
      title: "Vendete la vostra auto direttamente",
      subtitle: "Ricevete un preventivo entro 24 ore",
      fields: {
        licensePlate: "Targa",
        name: "Nome",
        email: "Indirizzo e-mail",
        phone: "Numero di telefono",
        message: "Messaggio (opzionale)",
        terms: "Accetto i termini e le condizioni e la politica sulla privacy",
      },
      submit: "Richiedere preventivo",
      success: {
        title: "Richiesta di preventivo inviata!",
        message: "Vi contatteremo entro 24 ore.",
      },
      error: {
        general: "Si è verificato un errore. Riprovate più tardi.",
        network: "Errore di rete. Controllate la vostra connessione internet.",
      },
      placeholder: {
        name: "Il vostro nome completo",
        email: "vostro@email.it",
        phone: "+31 6 12345678",
        message: "Qualsiasi informazione aggiuntiva sulla vostra auto",
        licensePlate: "XX-XX-XX"
      }
    }
  }

  const currentContent = content[language as keyof typeof content] || content.nl

  async function onSubmit(formData: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      // Format license plate (remove dashes)
      const formattedLicensePlate = formData.licensePlate.replace(/-/g, "").toUpperCase()

      // Submit to our API endpoint
      const response = await fetch('/api/quote-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          license_plate: formattedLicensePlate,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message || "",
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || 'Failed to submit quote request')
      }

      const result = await response.json()
      console.log("Quote request created successfully:", result)
      setSubmitSuccess(true)
      form.reset()
    } catch (error) {
      console.error("Error submitting quote request:", error)
      setSubmitError(
        error instanceof Error && error.message.includes('Failed to fetch')
          ? currentContent.error.network
          : currentContent.error.general
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitSuccess) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="p-6">
          <div className="text-center">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {currentContent.success.title}
            </h3>
            <p className="text-gray-600 mb-4">
              {currentContent.success.message}
            </p>
            <Button
              onClick={() => setSubmitSuccess(false)}
              className="w-full"
            >
              {language === "nl" ? "Nieuwe aanvraag" : 
               language === "en" ? "New request" :
               language === "de" ? "Neue Anfrage" :
               language === "es" ? "Nueva solicitud" :
               language === "fr" ? "Nouvelle demande" :
               language === "it" ? "Nuova richiesta" : "Nieuwe aanvraag"}
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-gray-900">
          {currentContent.title}
        </CardTitle>
        <CardDescription className="text-gray-600">
          {currentContent.subtitle}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {submitError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{submitError}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="licensePlate">{currentContent.fields.licensePlate}</Label>
            <LicensePlateInput
              id="licensePlate"
              placeholder={currentContent.placeholder.licensePlate}
              {...form.register("licensePlate")}
              error={!!form.formState.errors.licensePlate}
            />
            {form.formState.errors.licensePlate && (
              <p className="text-sm text-red-500">
                {form.formState.errors.licensePlate.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">{currentContent.fields.name}</Label>
            <Input
              id="name"
              placeholder={currentContent.placeholder.name}
              {...form.register("name")}
              className={cn(
                form.formState.errors.name && "border-red-500"
              )}
            />
            {form.formState.errors.name && (
              <p className="text-sm text-red-500">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">{currentContent.fields.email}</Label>
              <Input
                id="email"
                type="email"
                placeholder={currentContent.placeholder.email}
                {...form.register("email")}
                className={cn(
                  form.formState.errors.email && "border-red-500"
                )}
              />
              {form.formState.errors.email && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">{currentContent.fields.phone}</Label>
              <Input
                id="phone"
                type="tel"
                placeholder={currentContent.placeholder.phone}
                {...form.register("phone")}
                className={cn(
                  form.formState.errors.phone && "border-red-500"
                )}
              />
              {form.formState.errors.phone && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.phone.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">{currentContent.fields.message}</Label>
            <Textarea
              id="message"
              placeholder={currentContent.placeholder.message}
              rows={3}
              {...form.register("message")}
              className={cn(
                form.formState.errors.message && "border-red-500"
              )}
            />
            {form.formState.errors.message && (
              <p className="text-sm text-red-500">
                {form.formState.errors.message.message}
              </p>
            )}
          </div>

          <div className="flex items-start space-x-2">
            <input
              type="checkbox"
              id="terms"
              {...form.register("terms")}
              className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <Label htmlFor="terms" className="text-sm leading-relaxed">
              {language === "nl" ? (
                <>
                  Ik ga akkoord met de{" "}
                  <a href="/algemene-voorwaarden" className="text-primary hover:underline">
                    algemene voorwaarden
                  </a>{" "}
                  en het{" "}
                  <a href="/privacybeleid" className="text-primary hover:underline">
                    privacybeleid
                  </a>
                </>
              ) : language === "en" ? (
                <>
                  I agree to the{" "}
                  <a href="/en/algemene-voorwaarden" className="text-primary hover:underline">
                    terms and conditions
                  </a>{" "}
                  and{" "}
                  <a href="/en/privacybeleid" className="text-primary hover:underline">
                    privacy policy
                  </a>
                </>
              ) : language === "de" ? (
                <>
                  Ich stimme den{" "}
                  <a href="/de/algemene-voorwaarden" className="text-primary hover:underline">
                    Allgemeinen Geschäftsbedingungen
                  </a>{" "}
                  und der{" "}
                  <a href="/de/privacybeleid" className="text-primary hover:underline">
                    Datenschutzerklärung
                  </a>{" "}
                  zu
                </>
              ) : language === "es" ? (
                <>
                  Acepto los{" "}
                  <a href="/es/algemene-voorwaarden" className="text-primary hover:underline">
                    términos y condiciones
                  </a>{" "}
                  y la{" "}
                  <a href="/es/privacybeleid" className="text-primary hover:underline">
                    política de privacidad
                  </a>
                </>
              ) : language === "fr" ? (
                <>
                  J'accepte les{" "}
                  <a href="/fr/algemene-voorwaarden" className="text-primary hover:underline">
                    termes et conditions
                  </a>{" "}
                  et la{" "}
                  <a href="/fr/privacybeleid" className="text-primary hover:underline">
                    politique de confidentialité
                  </a>
                </>
              ) : language === "it" ? (
                <>
                  Accetto i{" "}
                  <a href="/it/algemene-voorwaarden" className="text-primary hover:underline">
                    termini e le condizioni
                  </a>{" "}
                  e la{" "}
                  <a href="/it/privacybeleid" className="text-primary hover:underline">
                    politica sulla privacy
                  </a>
                </>
              ) : currentContent.fields.terms}
            </Label>
          </div>
          {form.formState.errors.terms && (
            <p className="text-sm text-red-500">
              {form.formState.errors.terms.message}
            </p>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {language === "nl" ? "Versturen..." : 
                 language === "en" ? "Sending..." :
                 language === "de" ? "Senden..." :
                 language === "es" ? "Enviando..." :
                 language === "fr" ? "Envoi..." :
                 language === "it" ? "Invio..." : "Versturen..."}
              </>
            ) : (
              currentContent.submit
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4 bg-gray-50 rounded-b-lg">
        <p className="text-sm text-gray-600">
          {language === "nl" ? "Draag bij aan een beter milieu en verkoop jouw auto nu aan één van de grootste en duurzaamste autorecycling en demontagebedrijven in Nederland." :
           language === "en" ? "Contribute to a better environment and sell your car now to one of the largest and most sustainable car recycling and dismantling companies in the Netherlands." :
           language === "de" ? "Tragen Sie zu einer besseren Umwelt bei und verkaufen Sie Ihr Auto jetzt an eines der größten und nachhaltigsten Autorecycling- und Demontageunternehmen in den Niederlanden." :
           language === "es" ? "Contribuya a un mejor medio ambiente y venda su coche ahora a una de las empresas más grandes y sostenibles de reciclaje y desguace de coches en los Países Bajos." :
           language === "fr" ? "Contribuez à un meilleur environnement et vendez votre voiture maintenant à l'une des plus grandes et plus durables entreprises de recyclage et de démantèlement automobiles des Pays-Bas." :
           language === "it" ? "Contribuite a un ambiente migliore e vendete la vostra auto ora a una delle più grandi e sostenibili aziende di riciclaggio e smontaggio auto dei Paesi Bassi." :
           "Draag bij aan een beter milieu en verkoop jouw auto nu aan één van de grootste en duurzaamste autorecycling en demontagebedrijven in Nederland."}
        </p>
        <div className="flex flex-col sm:flex-row justify-between gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <span>
              {language === "nl" ? "Beveiligde aanvraag" :
               language === "en" ? "Secure request" :
               language === "de" ? "Sichere Anfrage" :
               language === "es" ? "Solicitud segura" :
               language === "fr" ? "Demande sécurisée" :
               language === "it" ? "Richiesta sicura" : "Beveiligde aanvraag"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-5 w-5 text-primary" />
            <span>
              {language === "nl" ? "Vrijblijvende offerte" :
               language === "en" ? "No-obligation quote" :
               language === "de" ? "Unverbindliches Angebot" :
               language === "es" ? "Oferta sin compromiso" :
               language === "fr" ? "Devis sans engagement" :
               language === "it" ? "Preventivo senza impegno" : "Vrijblijvende offerte"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Car className="h-5 w-5 text-primary" />
            <span>
              {language === "nl" ? "Gratis ophaalservice" :
               language === "en" ? "Free pickup service" :
               language === "de" ? "Kostenloser Abholservice" :
               language === "es" ? "Servicio de recogida gratuito" :
               language === "fr" ? "Service de ramassage gratuit" :
               language === "it" ? "Servizio di ritiro gratuito" : "Gratis ophaalservice"}
            </span>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          {language === "nl" ? "Van Velzen Autorecycling is één van de marktleiders in de autodemontage branche en is als familiebedrijf zeer betrokken. Wij gaan zorgvuldig om met gegevens en privacy. Deze aanvraag is beveiligd en versleuteld d.m.v. SSL, data en/of gegevens zullen nooit worden gedeeld met derden." :
           language === "en" ? "Van Velzen Autorecycling is one of the market leaders in the car dismantling industry and is very committed as a family business. We handle data and privacy carefully. This request is secured and encrypted via SSL, data and/or information will never be shared with third parties." :
           language === "de" ? "Van Velzen Autorecycling ist einer der Marktführer in der Autodemontage-Branche und ist als Familienunternehmen sehr engagiert. Wir gehen sorgfältig mit Daten und Privatsphäre um. Diese Anfrage ist über SSL gesichert und verschlüsselt, Daten und/oder Informationen werden niemals an Dritte weitergegeben." :
           language === "es" ? "Van Velzen Autorecycling es uno de los líderes del mercado en la industria del desguace de coches y está muy comprometido como empresa familiar. Manejamos los datos y la privacidad con cuidado. Esta solicitud está asegurada y encriptada mediante SSL, los datos y/o la información nunca se compartirán con terceros." :
           language === "fr" ? "Van Velzen Autorecycling est l'un des leaders du marché dans l'industrie du démantèlement automobile et est très engagé en tant qu'entreprise familiale. Nous traitons les données et la confidentialité avec soin. Cette demande est sécurisée et chiffrée via SSL, les données et/ou informations ne seront jamais partagées avec des tiers." :
           language === "it" ? "Van Velzen Autorecycling è uno dei leader del mercato nell'industria dello smontaggio auto ed è molto impegnata come azienda familiare. Gestiamo i dati e la privacy con attenzione. Questa richiesta è protetta e crittografata tramite SSL, i dati e/o le informazioni non saranno mai condivisi con terzi." :
           "Van Velzen Autorecycling is één van de marktleiders in de autodemontage branche en is als familiebedrijf zeer betrokken. Wij gaan zorgvuldig om met gegevens en privacy. Deze aanvraag is beveiligd en versleuteld d.m.v. SSL, data en/of gegevens zullen nooit worden gedeeld met derden."}
        </p>
      </CardFooter>
    </Card>
  )
}

// Also export as named export for backward compatibility
export const QuoteForm = QuoteFormComponent
