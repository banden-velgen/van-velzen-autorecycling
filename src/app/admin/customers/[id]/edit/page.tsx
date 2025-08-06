import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"
import { getCustomer, updateCustomer } from "@/app/actions/customer-actions"

export const metadata = {
  title: "Klant Bewerken | Van Velzen Autorecycling Admin",
  description: "Bewerk klantgegevens van Van Velzen Autorecycling",
}

export default async function EditCustomerPage({
  params,
}: {
  params: { id: string }
}) {
  let customer

  try {
    customer = await getCustomer(params.id)
  } catch (error) {
    notFound()
  }

  async function handleUpdateCustomer(formData: FormData) {
    "use server"

    try {
      const result = await updateCustomer(params.id, formData)
      if (result.success) {
        redirect(`/admin/customers/${params.id}`)
      }
    } catch (error: any) {
      return { error: error.message }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href={`/admin/customers/${params.id}`}>
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">Klant Bewerken</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Klantgegevens</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={handleUpdateCustomer} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Naam *</Label>
                <Input id="name" name="name" defaultValue={customer.name} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input id="email" name="email" type="email" defaultValue={customer.email} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefoon *</Label>
                <Input id="phone" name="phone" defaultValue={customer.phone} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Adres</Label>
                <Input id="address" name="address" defaultValue={customer.address || ""} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="postal_code">Postcode</Label>
                <Input id="postal_code" name="postal_code" defaultValue={customer.postal_code || ""} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">Plaats</Label>
                <Input id="city" name="city" defaultValue={customer.city || ""} />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Link href={`/admin/customers/${params.id}`}>
                <Button variant="outline">Annuleren</Button>
              </Link>
              <Button type="submit">Wijzigingen Opslaan</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
