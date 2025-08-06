import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus, Search } from "lucide-react"
import { getCustomers } from "@/app/actions/customer-actions"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export const metadata = {
  title: "Klanten | Van Velzen Autorecycling Admin",
  description: "Beheer klanten van Van Velzen Autorecycling",
}

export default async function CustomersPage({
  searchParams,
}: {
  searchParams: { search?: string }
}) {
  const customers = await getCustomers()

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Klanten</h1>
        <Link href="/admin/customers/create">
          <Button className="flex items-center gap-1">
            <Plus className="h-4 w-4" />
            Nieuwe Klant
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Klanten Overzicht</CardTitle>
          <div className="relative mt-2">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <form>
              <Input
                type="search"
                name="search"
                placeholder="Zoek op naam, email of telefoonnummer..."
                className="pl-8"
                defaultValue={searchParams.search || ""}
              />
            </form>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-4 py-3">Naam</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Telefoon</th>
                  <th className="px-4 py-3">Plaats</th>
                  <th className="px-4 py-3">Acties</th>
                </tr>
              </thead>
              <tbody>
                {customers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-3 text-center text-gray-500">
                      Geen klanten gevonden
                    </td>
                  </tr>
                ) : (
                  customers.map((customer) => (
                    <tr key={customer.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium">{customer.name}</td>
                      <td className="px-4 py-3">{customer.email}</td>
                      <td className="px-4 py-3">{customer.phone}</td>
                      <td className="px-4 py-3">{customer.city}</td>
                      <td className="px-4 py-3">
                        <Link href={`/admin/customers/${customer.id}`}>
                          <Button variant="outline" size="sm">
                            Details
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
