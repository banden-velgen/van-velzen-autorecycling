import { Suspense } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getCustomer } from "@/app/actions/customer-actions"
import { FileUpload } from "@/components/file-upload"
import { getFilesAction } from "@/app/actions/file-actions"
import { ArrowLeft, Pencil } from "lucide-react"
import { createClient } from "@/lib/supabase/server"

export const metadata = {
  title: "Klantdetails | Van Velzen Autorecycling Admin",
  description: "Bekijk klantdetails van Van Velzen Autorecycling",
}

export default async function CustomerDetailPage({
  params,
}: {
  params: { id: string }
}) {
  try {
    const customer = await getCustomer(params.id)
    const filesResult = await getFilesAction("customer", params.id)
    const files = filesResult.success ? filesResult.files : []

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/admin/customers">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold tracking-tight">{customer.name}</h1>
          </div>
          <div className="flex gap-2">
            <Link href={`/admin/customers/${params.id}/edit`}>
              <Button variant="outline" className="flex items-center gap-1">
                <Pencil className="h-4 w-4" />
                Bewerken
              </Button>
            </Link>
          </div>
        </div>

        <Tabs defaultValue="details">
          <TabsList>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="vehicles">Voertuigen</TabsTrigger>
            <TabsTrigger value="quotes">Offertes</TabsTrigger>
            <TabsTrigger value="files">Bestanden</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4">
            {/* Customer details content */}
            <Card>
              <CardHeader>
                <CardTitle>Klantgegevens</CardTitle>
                <CardDescription>Bekijk de gegevens van deze klant</CardDescription>
              </CardHeader>
              <CardContent>
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Naam</dt>
                    <dd className="mt-1 text-sm">{customer.name}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">E-mail</dt>
                    <dd className="mt-1 text-sm">
                      <a href={`mailto:${customer.email}`} className="text-blue-600 hover:underline">
                        {customer.email}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Telefoon</dt>
                    <dd className="mt-1 text-sm">
                      <a href={`tel:${customer.phone}`} className="text-blue-600 hover:underline">
                        {customer.phone}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Adres</dt>
                    <dd className="mt-1 text-sm">{customer.address || "-"}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Postcode</dt>
                    <dd className="mt-1 text-sm">{customer.postal_code || "-"}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Plaats</dt>
                    <dd className="mt-1 text-sm">{customer.city || "-"}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vehicles" className="space-y-4">
            <Suspense fallback={<div>Voertuigen laden...</div>}>
              <CustomerVehicles customerId={params.id} />
            </Suspense>
          </TabsContent>

          <TabsContent value="quotes" className="space-y-4">
            <Suspense fallback={<div>Offertes laden...</div>}>
              <CustomerQuotes customerId={params.id} />
            </Suspense>
          </TabsContent>

          <TabsContent value="files" className="space-y-4">
            <FileUpload
              entityType="customer"
              entityId={params.id}
              initialFiles={files}
              title="Klantbestanden"
              description="Upload bestanden voor deze klant, zoals contracten, ID-kopieën, etc."
            />
          </TabsContent>
        </Tabs>
      </div>
    )
  } catch (error) {
    console.error("Error loading customer:", error)
    notFound()
  }
}

async function CustomerVehicles({ customerId }: { customerId: string }) {
  const supabase = createClient()

  try {
    const { data: vehicles, error } = await supabase
      .from("vehicles")
      .select("*")
      .eq("customer_id", customerId)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching customer vehicles:", error)
      return <div>Fout bij het laden van voertuigen: {error.message}</div>
    }

    if (!vehicles || vehicles.length === 0) {
      return (
        <Card>
          <CardHeader>
            <CardTitle>Voertuigen</CardTitle>
            <CardDescription>Voertuigen gekoppeld aan deze klant</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-6 text-gray-500">Geen voertuigen gevonden voor deze klant</div>
          </CardContent>
        </Card>
      )
    }

    return (
      <Card>
        <CardHeader>
          <CardTitle>Voertuigen</CardTitle>
          <CardDescription>Voertuigen gekoppeld aan deze klant</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-4 py-3">Kenteken</th>
                  <th className="px-4 py-3">Merk & Model</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Acties</th>
                </tr>
              </thead>
              <tbody>
                {vehicles.map((vehicle) => (
                  <tr key={vehicle.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{vehicle.license_plate}</td>
                    <td className="px-4 py-3">
                      {vehicle.make} {vehicle.model} {vehicle.year && `(${vehicle.year})`}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          vehicle.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : vehicle.status === "processing"
                              ? "bg-blue-100 text-blue-800"
                              : vehicle.status === "recycled"
                                ? "bg-green-100 text-green-800"
                                : vehicle.status === "sold"
                                  ? "bg-purple-100 text-purple-800"
                                  : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {vehicle.status === "pending"
                          ? "Wachtend"
                          : vehicle.status === "processing"
                            ? "In verwerking"
                            : vehicle.status === "recycled"
                              ? "Gerecycled"
                              : vehicle.status === "sold"
                                ? "Verkocht"
                                : vehicle.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <Link href={`/admin/vehicles/${vehicle.id}`}>
                        <Button variant="outline" size="sm">
                          Details
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    )
  } catch (error) {
    console.error("Error in CustomerVehicles component:", error)
    return <div>Fout bij het laden van voertuigen: Er is een onverwachte fout opgetreden</div>
  }
}

async function CustomerQuotes({ customerId }: { customerId: string }) {
  const supabase = createClient()

  const { data: quotes, error } = await supabase
    .from("quotes")
    .select(`
      *,
      vehicle:vehicle_id(license_plate, make, model, year)
    `)
    .eq("customer_id", customerId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching customer quotes:", error)
    return <div>Fout bij het laden van offertes</div>
  }

  if (!quotes || quotes.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Offertes</CardTitle>
          <CardDescription>Offertes gekoppeld aan deze klant</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6 text-gray-500">Geen offertes gevonden voor deze klant</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Offertes</CardTitle>
        <CardDescription>Offertes gekoppeld aan deze klant</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-4 py-3">Offerte #</th>
                <th className="px-4 py-3">Voertuig</th>
                <th className="px-4 py-3">Bedrag</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Acties</th>
              </tr>
            </thead>
            <tbody>
              {quotes.map((quote) => (
                <tr key={quote.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">#{quote.id.substring(0, 8)}</td>
                  <td className="px-4 py-3">
                    {quote.vehicle?.license_plate} - {quote.vehicle?.make} {quote.vehicle?.model}
                  </td>
                  <td className="px-4 py-3">€{quote.amount.toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        quote.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : quote.status === "accepted"
                            ? "bg-green-100 text-green-800"
                            : quote.status === "rejected"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {quote.status === "pending"
                        ? "In afwachting"
                        : quote.status === "accepted"
                          ? "Geaccepteerd"
                          : quote.status === "rejected"
                            ? "Afgewezen"
                            : quote.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Link href={`/admin/quotes/${quote.id}`}>
                      <Button variant="outline" size="sm">
                        Details
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
