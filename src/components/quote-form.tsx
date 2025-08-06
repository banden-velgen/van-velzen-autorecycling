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
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

// Form validation schema
const formSchema = z.object({
  licensePlate: z
    .string()
    .min(1, "Kenteken is verplicht")
    .regex(/^[A-Z0-9-]+$/i, "Kenteken mag alleen letters, cijfers en streepjes bevatten")
    .max(10, "Kenteken is te lang"),
  name: z.string().min(1, "Naam is verplicht").max(100, "Naam is te lang"),
  email: z.string().email("Voer een geldig e-mailadres in"),
  phone: z.string().min(1, "Telefoonnummer is verplicht").max(20, "Telefoonnummer is te lang"),
  message: z.string().max(500, "Bericht is te lang").optional(),
  terms: z.boolean().refine((val) => val === true, "U moet akkoord gaan met de voorwaarden"),
})

export default function QuoteFormComponent() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

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

  // Content in Dutch
  const currentContent = {
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
  }

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
        <CardDescription className="text-white/90">
          {currentContent.subtitle}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        {submitSuccess ? (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              <strong>{currentContent.success.title}</strong>
              <br />
              {currentContent.success.message}
            </AlertDescription>
          </Alert>
        ) : (
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {submitError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{submitError}</AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="licensePlate">{currentContent.fields.licensePlate}</Label>
                <Input
                  id="licensePlate"
                  placeholder="12-ABC-3"
                  {...form.register("licensePlate")}
                  className={cn(
                    form.formState.errors.licensePlate && "border-red-500"
                  )}
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
                  placeholder="Uw naam"
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">{currentContent.fields.email}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="uw@email.nl"
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
                  placeholder="06-12345678"
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
                placeholder="Optionele opmerkingen over uw auto..."
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
                {currentContent.fields.terms}
              </Label>
            </div>
            {form.formState.errors.terms && (
              <p className="text-sm text-red-500">
                {form.formState.errors.terms.message}
              </p>
            )}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary/90 text-white"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Versturen...
                </>
              ) : (
                currentContent.submit
              )}
            </Button>
          </form>
        )}
      </CardContent>
      <CardFooter className="bg-gray-50 px-6 py-4">
        <p className="text-sm text-gray-600">
          <strong>Van Velzen Autorecycling</strong> is één van de marktleiders in de autodemontage branche en is als familiebedrijf zeer betrokken. 
          Wij gaan zorgvuldig om met gegevens en privacy. Deze aanvraag is beveiligd en versleuteld d.m.v. SSL, 
          data en/of gegevens zullen nooit worden gedeeld met derden.
        </p>
      </CardFooter>
    </Card>
  )
}

// Also export as named export for backward compatibility
export const QuoteForm = QuoteFormComponent
