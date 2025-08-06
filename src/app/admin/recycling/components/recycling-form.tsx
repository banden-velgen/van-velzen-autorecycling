"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { nl } from "date-fns/locale"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

interface Vehicle {
  id: string
  license_plate: string
  brand: string
  model: string
  status: string
}

interface RecyclingFormProps {
  vehicles: Vehicle[]
}

const formSchema = z.object({
  vehicle_id: z.string({
    required_error: "Selecteer een voertuig",
  }),
  recycling_date: z.date({
    required_error: "Selecteer een datum",
  }),
  recycling_certificate: z.string().optional(),
  recycling_method: z.string().min(1, "Selecteer een recycling methode"),
  recycling_location: z.string().min(1, "Vul een recycling locatie in"),
  notes: z.string().optional(),
})

export function RecyclingForm({ vehicles }: RecyclingFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      recycling_method: "",
      recycling_location: "",
      notes: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true)

    try {
      const formData = new FormData()
      formData.append("vehicle_id", values.vehicle_id)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Er ging iets fout!",
        description: "Neem contact op met de beheerder",
      })
    } finally {
      setIsLoading(false)
      router.refresh()
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="vehicle_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Voertuig</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecteer een voertuig" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {vehicles.map((vehicle) => (
                    <SelectItem key={vehicle.id} value={vehicle.id}>
                      {vehicle.license_plate} - {vehicle.brand} {vehicle.model}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="recycling_date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Datum</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn("w-[240px] pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                    >
                      {field.value ? format(field.value, "PPP", { locale: nl }) : <span>Kies een datum</span>}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    locale={nl}
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date > new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="recycling_method"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Recycling methode</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecteer een methode" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Demontage">Demontage</SelectItem>
                  <SelectItem value="Versnippering">Versnippering</SelectItem>
                  <SelectItem value="Hergebruik">Hergebruik</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="recycling_location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Recycling locatie</FormLabel>
              <FormControl>
                <Input placeholder="Locatie" {...field} />
              </FormControl>
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
                <Textarea placeholder="Extra notities" className="resize-none" {...field} />
              </FormControl>
              <FormDescription>Extra informatie over de recycling.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading} type="submit">
          {isLoading && (
            <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          )}
          Opslaan
        </Button>
      </form>
    </Form>
  )
}
