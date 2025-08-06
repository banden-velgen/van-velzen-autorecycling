import Link from "next/link"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"
import { createCustomer } from "@/app/actions/customer-actions"

export const metadata = {
  title: "Nieuwe Klant | Van Velzen Autorecycling Admin",
  description: "Maak een nieuwe klant aan voor Van Velzen Autorecycling",
}

export default function CreateCustomerPage() {
  async function handleCreateCustomer(formData: FormData) {
    "use server"

    try {
      const result = await createCustomer(formData)
      if (result.success) {
        redirect("/admin/customers")
      }
    } catch (error: any) {
      return { error: error.message }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/admin/customers">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">Nieuwe Klant</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Klantgegevens</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={handleCreateCustomer} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Naam *</Label>
                <Input id="name" name="name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input id="email" name="email" type="email" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefoon *</Label>
                <Input id="phone" name="phone" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Adres</Label>
                <Input id="address" name="address" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="postal_code">Postcode</Label>
                <Input id="postal_code" name="postal_code" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">Plaats</Label>
                <Input id="city" name="city" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Link href="/admin/customers">
                <Button variant="outline">Annuleren</Button>
              </Link>
              <Button type="submit">Klant Aanmaken</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
