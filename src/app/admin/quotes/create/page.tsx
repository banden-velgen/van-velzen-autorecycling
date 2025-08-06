"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { createQuote } from "@/app/actions/quote-actions"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { format } from "date-fns"
import { nl } from "date-fns/locale"
import { CalendarIcon, AlertCircle } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase/client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface QuoteRequest {
  id: string
  license_plate: string
  name: string
  email: string
  phone: string
  message: string | null
  status: string
  created_at: string
  updated_at: string
}

interface Vehicle {
  id: string
  license_plate: string
  make: string | null
  model: string | null
  year: number | null
  status: string
  created_at: string
  updated_at: string
}

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  created_at: string
  updated_at: string
}

const formSchema = z.object({
  amount: z.string().min(1, { message: "Bedrag is verplicht" }),
  validUntil: z.date({
    required_error: "Selecteer een geldigheidsdatum",
  }),
  notes: z.string().optional(),
})

const manualFormSchema = z.object({
  licensePlate: z.string().min(1, { message: "Kenteken is verplicht" }),
  customerName: z.string().min(1, { message: "Naam is verplicht" }),
  customerEmail: z.string().email({ message: "Voer een geldig e-mailadres in" }),
  customerPhone: z.string().min(1, { message: "Telefoonnummer is verplicht" }),
  amount: z.string().min(1, { message: "Bedrag is verplicht" }),
  validUntil: z.date({
    required_error: "Selecteer een geldigheidsdatum",
  }),
  notes: z.string().optional(),
})

export default function CreateQuotePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const requestId = searchParams.get("requestId")

  const [quoteRequest, setQuoteRequest] = useState<QuoteRequest | null>(null)
  const [vehicle, setVehicle] = useState<Vehicle | null>(null)
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState(requestId ? "fromRequest" : "manual")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
      notes: "",
    },
  })

  const manualForm = useForm<z.infer<typeof manualFormSchema>>({
    resolver: zodResolver(manualFormSchema),
    defaultValues: {
      licensePlate: "",
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      amount: "",
      notes: "",
    },
  })

  useEffect(() => {
    const fetchData = async () => {
      if (!requestId) {
        setLoading(false)
        return
      }

      try {
        const supabase = createClient()

        // Fetch quote request
        const { data: request, error: requestError } = await supabase
          .from("quote_requests")
          .select("*")
          .eq("id", requestId)
          .single()

        if (requestError) throw requestError

        if (!request) {
          setError("Aanvraag niet gevonden")
          setLoading(false)
          return
        }
        setQuoteRequest(request)

        // Fetch or create vehicle
        let { data: vehicleData, error: vehicleError } = await supabase
          .from("vehicles")
          .select("*")
          .eq("license_plate", request.license_plate)
          .single()

        if (vehicleError && vehicleError.code !== "PGRST116") {
          // PGRST116 is "no rows returned"
          throw vehicleError
        }

        if (!vehicleData) {
          // Create vehicle if it doesn't exist
          const { data: newVehicle, error: createError } = await supabase
            .from("vehicles")
            .insert({
              license_plate: request.license_plate,
              status: "pending",
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            })
            .select()
            .single()

          if (createError) throw createError

          vehicleData = newVehicle
        }

        setVehicle(vehicleData)

        // Fetch or create customer
        let { data: customerData, error: customerError } = await supabase
          .from("customers")
          .select("*")
          .eq("email", request.email)
          .single()

        if (customerError && customerError.code !== "PGRST116") {
          throw customerError
        }

        if (!customerData) {
          // Create customer if it doesn't exist
          const { data: newCustomer, error: createCustomerError } = await supabase
            .from("customers")
            .insert({
              name: request.name,
              email: request.email,
              phone: request.phone,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            })
            .select()
            .single()

          if (createCustomerError) throw createCustomerError

          customerData = newCustomer
        }

        setCustomer(customerData)

        setLoading(false)
      } catch (err) {
        console.error("Error fetching data:", err)
        setError("Er is een fout opgetreden bij het ophalen van de gegevens")
        setLoading(false)
      }
    }

    fetchData()
  }, [requestId])

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!quoteRequest || !vehicle || !customer) {
      setError("Ontbrekende gegevens")
      return
    }

    setSubmitting(true)
    setError(null)

    try {
      const amount = Number.parseFloat(data.amount.replace(",", "."))
      const validUntil = data.validUntil.toISOString()

      const result = await createQuote(quoteRequest.id, vehicle.id, customer.id, amount, validUntil, data.notes)

      if (result.success) {
        router.push(`/admin/quotes/${result.quoteId}`)
      } else {
        throw new Error("Failed to create quote")
      }
    } catch (err) {
      console.error("Error creating quote:", err)
      setError("Er is een fout opgetreden bij het aanmaken van de offerte")
    } finally {
      setSubmitting(false)
    }
  }

  const onManualSubmit = async (data: z.infer<typeof manualFormSchema>) => {
    setSubmitting(true)
    setError(null)

    try {
      const supabase = createClient()

      // Format license plate
      const formattedLicensePlate = data.licensePlate.replace(/-/g, "").toUpperCase()

      // 1. Create or get vehicle
      let vehicleId: string
      const { data: existingVehicle, error: vehicleError } = await supabase
        .from("vehicles")
        .select("id")
        .eq("license_plate", formattedLicensePlate)
        .maybeSingle()

      if (vehicleError && vehicleError.code !== "PGRST116") throw vehicleError

      if (existingVehicle) {
        vehicleId = existingVehicle.id
      } else {
        const { data: newVehicle, error: createVehicleError } = await supabase
          .from("vehicles")
          .insert({
            license_plate: formattedLicensePlate,
            status: "pending",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .select("id")
          .single()

        if (createVehicleError) throw createVehicleError
        vehicleId = newVehicle.id
      }

      // 2. Create or get customer
      let customerId: string
      const { data: existingCustomer, error: customerError } = await supabase
        .from("customers")
        .select("id")
        .eq("email", data.customerEmail)
        .maybeSingle()

      if (customerError && customerError.code !== "PGRST116") throw customerError

      if (existingCustomer) {
        customerId = existingCustomer.id
      } else {
        const { data: newCustomer, error: createCustomerError } = await supabase
          .from("customers")
          .insert({
            name: data.customerName,
            email: data.customerEmail,
            phone: data.customerPhone,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .select("id")
          .single()

        if (createCustomerError) throw createCustomerError
        customerId = newCustomer.id
      }

      // 3. Create quote directly
      const amount = Number.parseFloat(data.amount.replace(",", "."))
      const validUntil = data.validUntil.toISOString()

      const { data: quote, error: quoteError } = await supabase
        .from("quotes")
        .insert({
          vehicle_id: vehicleId,
          customer_id: customerId,
          amount,
          status: "pending",
          notes: data.notes || null,
          valid_until: validUntil,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select("id")
        .single()

      if (quoteError) throw quoteError

      router.push(`/admin/quotes/${quote.id}`)
    } catch (err) {
      console.error("Error creating manual quote:", err)
      setError("Er is een fout opgetreden bij het aanmaken van de offerte")
    } finally {
      setSubmitting(false)
    }
  }

  if (loading && requestId) {
    return <div className="container mx-auto py-10 text-center">Laden...</div>
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Offerte aanmaken</h1>
        <p className="text-gray-500">
          {requestId && quoteRequest ? `Voor aanvraag van ${quoteRequest.name}` : "Nieuwe offerte"}
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          {requestId && <TabsTrigger value="fromRequest">Van aanvraag</TabsTrigger>}
          <TabsTrigger value="manual">Handmatig</TabsTrigger>
        </TabsList>

        {requestId && (
          <TabsContent value="fromRequest">
            {error && !quoteRequest && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Fout</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {quoteRequest && vehicle && customer ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Offerte details</CardTitle>
                      <CardDescription>Vul de details in voor de offerte</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                          <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Bedrag (€)</FormLabel>
                                <FormControl>
                                  <Input placeholder="0,00" {...field} />
                                </FormControl>
                                <FormDescription>Voer het bedrag in dat u wilt aanbieden voor de auto</FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="validUntil"
                            render={({ field }) => (
                              <FormItem className="flex flex-col">
                                <FormLabel>Geldig tot</FormLabel>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <FormControl>
                                      <Button
                                        variant={"outline"}
                                        className={cn(
                                          "w-full pl-3 text-left font-normal",
                                          !field.value && "text-muted-foreground",
                                        )}
                                      >
                                        {field.value ? (
                                          format(field.value, "PPP", { locale: nl })
                                        ) : (
                                          <span>Selecteer een datum</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                      mode="single"
                                      selected={field.value}
                                      onSelect={field.onChange}
                                      disabled={(date) => date < new Date()}
                                      initialFocus
                                    />
                                  </PopoverContent>
                                </Popover>
                                <FormDescription>De datum tot wanneer de offerte geldig is</FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="notes"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Notities</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Voeg eventuele notities toe..."
                                    className="resize-none"
                                    {...field}
                                  />
                                </FormControl>
                                <FormDescription>
                                  Interne notities over deze offerte (niet zichtbaar voor de klant)
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="flex justify-end gap-4">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => router.push("/admin/quotes")}
                              disabled={submitting}
                            >
                              Annuleren
                            </Button>
                            <Button type="submit" disabled={submitting}>
                              {submitting ? "Bezig met opslaan..." : "Offerte aanmaken"}
                            </Button>
                          </div>
                        </form>
                      </Form>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Aanvraag informatie</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-medium">Klant</h3>
                          <p>{customer.name}</p>
                          <p>{customer.email}</p>
                          <p>{customer.phone}</p>
                        </div>
                        <div>
                          <h3 className="font-medium">Voertuig</h3>
                          <p>Kenteken: {vehicle.license_plate}</p>
                          {vehicle.make && <p>Merk: {vehicle.make}</p>}
                          {vehicle.model && <p>Model: {vehicle.model}</p>}
                          {vehicle.year && <p>Jaar: {vehicle.year}</p>}
                        </div>
                        {quoteRequest.message && (
                          <div>
                            <h3 className="font-medium">Bericht</h3>
                            <p>{quoteRequest.message}</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ) : (
              <div className="text-center py-10">
                <p>Geen geldige aanvraag gevonden. Gebruik het handmatige formulier om een offerte aan te maken.</p>
                <Button onClick={() => setActiveTab("manual")} className="mt-4">
                  Handmatig offerte aanmaken
                </Button>
              </div>
            )}
          </TabsContent>
        )}

        <TabsContent value="manual">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Handmatige offerte</CardTitle>
                  <CardDescription>Maak een nieuwe offerte zonder bestaande aanvraag</CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...manualForm}>
                    <form onSubmit={manualForm.handleSubmit(onManualSubmit)} className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Voertuig informatie</h3>
                        <FormField
                          control={manualForm.control}
                          name="licensePlate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Kenteken</FormLabel>
                              <FormControl>
                                <Input placeholder="AB-123-C" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Klant informatie</h3>
                        <FormField
                          control={manualForm.control}
                          name="customerName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Naam</FormLabel>
                              <FormControl>
                                <Input placeholder="Volledige naam" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={manualForm.control}
                            name="customerEmail"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>E-mail</FormLabel>
                                <FormControl>
                                  <Input type="email" placeholder="email@voorbeeld.nl" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={manualForm.control}
                            name="customerPhone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Telefoonnummer</FormLabel>
                                <FormControl>
                                  <Input placeholder="06 12345678" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Offerte details</h3>
                        <FormField
                          control={manualForm.control}
                          name="amount"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Bedrag (€)</FormLabel>
                              <FormControl>
                                <Input placeholder="0,00" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={manualForm.control}
                          name="validUntil"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>Geldig tot</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant={"outline"}
                                      className={cn(
                                        "w-full pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground",
                                      )}
                                    >
                                      {field.value ? (
                                        format(field.value, "PPP", { locale: nl })
                                      ) : (
                                        <span>Selecteer een datum</span>
                                      )}
                                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) => date < new Date()}
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={manualForm.control}
                          name="notes"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Notities</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Voeg eventuele notities toe..."
                                  className="resize-none"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {error && (
                        <Alert variant="destructive">
                          <AlertCircle className="h-4 w-4" />
                          <AlertTitle>Fout</AlertTitle>
                          <AlertDescription>{error}</AlertDescription>
                        </Alert>
                      )}

                      <div className="flex justify-end gap-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => router.push("/admin/quotes")}
                          disabled={submitting}
                        >
                          Annuleren
                        </Button>
                        <Button type="submit" disabled={submitting}>
                          {submitting ? "Bezig met opslaan..." : "Offerte aanmaken"}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Hulp</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 text-sm">
                    <p>
                      Gebruik dit formulier om handmatig een nieuwe offerte aan te maken zonder een bestaande aanvraag.
                    </p>
                    <p>
                      Als de klant of het voertuig al bestaat in het systeem, zal deze worden gekoppeld aan de nieuwe
                      offerte.
                    </p>
                    <p>
                      Alle velden met een <span className="text-red-500">*</span> zijn verplicht.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
