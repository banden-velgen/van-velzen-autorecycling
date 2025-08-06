"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Loader2 } from "lucide-react"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Naam moet minimaal 2 tekens bevatten.",
  }),
  description: z.string().optional(),
  category_id: z.string({
    required_error: "Selecteer een categorie.",
  }),
  vehicle_id: z.string().optional(),
  condition: z.string().optional(),
  sku: z.string().optional(),
  price: z.coerce.number().min(0, {
    message: "Prijs moet een positief getal zijn.",
  }),
  cost: z.coerce.number().min(0, {
    message: "Kostprijs moet een positief getal zijn.",
  }),
  quantity: z.coerce.number().int().min(0, {
    message: "Aantal moet een positief geheel getal zijn.",
  }),
  location: z.string().optional(),
  image_url: z.string().optional(),
  is_active: z.boolean().default(true),
})

type InventoryFormValues = z.infer<typeof formSchema>

type Category = {
  id: string
  name: string
}

type Vehicle = {
  id: string
  license_plate: string
  brand: string
  model: string
}

interface InventoryFormProps {
  initialData?: any
  categories: Category[]
  vehicles: Vehicle[]
  action: (formData: FormData) => Promise<{ error?: string }>
}

export function InventoryForm({ initialData, categories, vehicles, action }: InventoryFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<InventoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      category_id: "",
      vehicle_id: "not_selected",
      condition: "Gebruikt (A)",
      sku: "",
      price: 0,
      cost: 0,
      quantity: 1,
      location: "",
      image_url: "",
      is_active: true,
    },
  })

  async function onSubmit(values: InventoryFormValues) {
    setIsLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      Object.entries(values).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value.toString())
        }
      })

      const result = await action(formData)

      if (result.error) {
        setError(result.error)
        setIsLoading(false)
        return
      }
    } catch (error) {
      setError("Er is een onverwachte fout opgetreden.")
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {error && <div className="bg-destructive/15 p-3 rounded-md text-destructive text-sm">{error}</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Naam *</FormLabel>
                <FormControl>
                  <Input placeholder="Bijv. Koplamp links" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sku"
            render={({ field }) => (
              <FormItem>
                <FormLabel>SKU / Artikelnummer</FormLabel>
                <FormControl>
                  <Input placeholder="Bijv. KPL-001-L" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categorie *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecteer een categorie" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
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
            name="vehicle_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Voertuig</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecteer een voertuig (optioneel)" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="not_selected">Geen voertuig</SelectItem>
                    {vehicles.map((vehicle) => (
                      <SelectItem key={vehicle.id} value={vehicle.id}>
                        {vehicle.license_plate} - {vehicle.brand} {vehicle.model}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>Koppel dit onderdeel aan een voertuig (optioneel)</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="condition"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Conditie</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecteer conditie" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Nieuw">Nieuw</SelectItem>
                    <SelectItem value="Gebruikt (A)">Gebruikt (A) - Zeer goed</SelectItem>
                    <SelectItem value="Gebruikt (B)">Gebruikt (B) - Goed</SelectItem>
                    <SelectItem value="Gebruikt (C)">Gebruikt (C) - Redelijk</SelectItem>
                    <SelectItem value="Defect">Defect (voor onderdelen)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Locatie</FormLabel>
                <FormControl>
                  <Input placeholder="Bijv. Rek A3, Plank 2" {...field} />
                </FormControl>
                <FormDescription>Waar is dit item opgeslagen in het magazijn?</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Verkoopprijs (€)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" min="0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cost"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kostprijs (€)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" min="0" {...field} />
                </FormControl>
                <FormDescription>Interne kostprijs (niet zichtbaar voor klanten)</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Aantal</FormLabel>
                <FormControl>
                  <Input type="number" min="0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Afbeelding URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://..." {...field} />
                </FormControl>
                <FormDescription>URL naar een afbeelding van dit item (optioneel)</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Beschrijving</FormLabel>
              <FormControl>
                <Textarea placeholder="Voeg details toe over dit onderdeel..." className="min-h-32" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {initialData && (
          <FormField
            control={form.control}
            name="is_active"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Actief</FormLabel>
                  <FormDescription>Inactieve items worden niet getoond in de voorraadlijst</FormDescription>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
        )}

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.back()} disabled={isLoading}>
            Annuleren
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {initialData ? "Bijwerken" : "Opslaan"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
