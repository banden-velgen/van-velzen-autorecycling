"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createVehicle } from "@/app/actions/vehicle-actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { CheckCircle2, Loader2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Customer {
  id: string
  name: string
  email: string | null
  phone: string | null
}

export function VehicleCreateForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [customers, setCustomers] = useState<Customer[]>([])
  const [isLoadingCustomers, setIsLoadingCustomers] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData(event.currentTarget)
      if (selectedCustomer) {
        formData.set("customer_id", selectedCustomer)
      }

      const result = await createVehicle(formData)

      if (result.success) {
        toast({
          title: "Voertuig aangemaakt",
          description: `Het voertuig met kenteken ${formData.get("license_plate")} is succesvol aangemaakt.`,
          variant: "default",
        })
        router.push(`/admin/vehicles/${result.vehicle.id}`)
      } else {
        if (result.existingId) {
          toast({
            title: "Voertuig bestaat al",
            description: "Er bestaat al een voertuig met dit kenteken.",
            variant: "destructive",
          })
          router.push(`/admin/vehicles/${result.existingId}`)
        } else {
          toast({
            title: "Fout",
            description: result.error || "Er is een fout opgetreden bij het aanmaken van het voertuig.",
            variant: "destructive",
          })
        }
      }
    } catch (error) {
      console.error("Error creating vehicle:", error)
      toast({
        title: "Fout",
        description: "Er is een onverwachte fout opgetreden bij het aanmaken van het voertuig.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const searchCustomers = async (query: string) => {
    if (!query || query.length < 2) {
      setCustomers([])
      return
    }

    setIsLoadingCustomers(true)
    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from("customers")
        .select("id, name, email, phone")
        .or(`name.ilike.%${query}%,email.ilike.%${query}%,phone.ilike.%${query}%`)
        .limit(10)

      if (error) {
        console.error("Error searching customers:", error)
        return
      }

      setCustomers(data || [])
    } catch (error) {
      console.error("Error in searchCustomers:", error)
    } finally {
      setIsLoadingCustomers(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nieuw voertuig toevoegen</CardTitle>
        <CardDescription>Voeg een nieuw voertuig toe aan het systeem</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="license_plate">Kenteken *</Label>
            <Input id="license_plate" name="license_plate" placeholder="AB-123-C" required className="uppercase" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="make">Merk</Label>
              <Input id="make" name="make" placeholder="Bijv. Volkswagen" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="model">Model</Label>
              <Input id="model" name="model" placeholder="Bijv. Golf" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="year">Bouwjaar</Label>
              <Input
                id="year"
                name="year"
                type="number"
                min="1900"
                max={new Date().getFullYear()}
                placeholder="Bijv. 2015"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="color">Kleur</Label>
              <Input id="color" name="color" placeholder="Bijv. Zwart" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="vin">Chassisnummer (VIN)</Label>
            <Input id="vin" name="vin" placeholder="Bijv. WVWZZZ1KZAW123456" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="customer_search">Klant zoeken</Label>
            <div className="flex gap-2">
              <Input
                id="customer_search"
                placeholder="Zoek op naam, e-mail of telefoon"
                onChange={(e) => searchCustomers(e.target.value)}
              />
            </div>
            {isLoadingCustomers && (
              <div className="flex items-center text-sm text-muted-foreground">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Klanten zoeken...
              </div>
            )}
            {customers.length > 0 && (
              <div className="space-y-2">
                <Label htmlFor="customer_id">Selecteer een klant</Label>
                <Select value={selectedCustomer || undefined} onValueChange={setSelectedCustomer}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecteer een klant" />
                  </SelectTrigger>
                  <SelectContent>
                    {customers.map((customer) => (
                      <SelectItem key={customer.id} value={customer.id}>
                        {customer.name} {customer.email && `(${customer.email})`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notities</Label>
            <Textarea id="notes" name="notes" placeholder="Voeg eventuele notities toe over dit voertuig" />
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button variant="outline" type="button" onClick={() => router.back()}>
            Annuleren
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Bezig met opslaan...
              </>
            ) : (
              <>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Voertuig opslaan
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
