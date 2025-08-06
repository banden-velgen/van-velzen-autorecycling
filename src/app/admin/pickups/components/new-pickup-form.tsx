"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CalendarIcon, Loader2 } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { LicensePlateInput } from "@/components/license-plate-input"

// Define the form schema
const pickupFormSchema = z.object({
  license_plate: z.string().min(1, {
    message: "Kenteken is verplicht",
  }),
  scheduled_date: z.date({
    required_error: "Datum is verplicht",
  }),
  address: z.string().min(1, {
    message: "Adres is verplicht",
  }),
  postal_code: z.string().min(1, {
    message: "Postcode is verplicht",
  }),
  city: z.string().min(1, {
    message: "Plaats is verplicht",
  }),
  contact_name: z.string().min(1, {
    message: "Contactpersoon is verplicht",
  }),
  contact_phone: z.string().min(1, {
    message: "Telefoonnummer is verplicht",
  }),
  notes: z.string().optional(),
  status: z.string().min(1, {
    message: "Status is verplicht",
  }),
})

type PickupFormValues = z.infer<typeof pickupFormSchema>

// Define the createPickup function here to avoid import issues
async function createPickup(data: any) {
  const response = await fetch("/api/pickups", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Er is een fout opgetreden")
  }

  return response.json()
}

export function NewPickupForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Define default form values
  const defaultValues: Partial<PickupFormValues> = {
    license_plate: "",
    address: "",
    postal_code: "",
    city: "",
    contact_name: "",
    contact_phone: "",
    notes: "",
    status: "scheduled",
  }

  const form = useForm<PickupFormValues>({
    resolver: zodResolver(pickupFormSchema),
    defaultValues,
  })

  async function onSubmit(data: PickupFormValues) {
    setIsSubmitting(true)
    try {
      // Format the data for submission
      const formattedData = {
        ...data,
        scheduled_date: data.scheduled_date.toISOString(),
      }

      // Submit the data
      await fetch("/api/pickups", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      })

      toast({
        title: "Ophaling aangemaakt",
        description: "De ophaling is succesvol aangemaakt.",
      })

      router.push("/admin/pickups")
    } catch (error) {
      console.error("Error creating pickup:", error)
      toast({
        title: "Fout",
        description: "Er is een fout opgetreden bij het aanmaken van de ophaling.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="license_plate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kenteken</FormLabel>
              <FormControl>
                <LicensePlateInput value={field.value} onChange={field.onChange} placeholder="Voer kenteken in" />
              </FormControl>
              <FormDescription>Voer het kenteken van het voertuig in.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="scheduled_date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Ophaaldatum</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                      >
                        {field.value ? format(field.value, "PPP") : <span>Kies een datum</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>De datum waarop het voertuig opgehaald moet worden.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecteer een status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="scheduled">Gepland</SelectItem>
                    <SelectItem value="completed">Voltooid</SelectItem>
                    <SelectItem value="cancelled">Geannuleerd</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>De huidige status van de ophaling.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adres</FormLabel>
              <FormControl>
                <Input placeholder="Straatnaam en huisnummer" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="postal_code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Postcode</FormLabel>
                <FormControl>
                  <Input placeholder="1234 AB" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Plaats</FormLabel>
                <FormControl>
                  <Input placeholder="Plaats" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="contact_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contactpersoon</FormLabel>
                <FormControl>
                  <Input placeholder="Naam contactpersoon" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contact_phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefoonnummer</FormLabel>
                <FormControl>
                  <Input placeholder="Telefoonnummer" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Opmerkingen</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Eventuele opmerkingen of instructies voor de ophaling"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>Voeg eventuele extra informatie toe over de ophaling.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Bezig met opslaan...
            </>
          ) : (
            "Ophaling aanmaken"
          )}
        </Button>
      </form>
    </Form>
  )
}
