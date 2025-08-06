import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Calendar, MapPin, Pencil, Truck, User } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { formatDate } from "@/lib/utils"
import { FileUpload } from "@/components/file-upload"
import { getFilesAction } from "@/app/actions/file-actions"
import { StatusUpdateButton } from "./components/status-update-button"

export const metadata = {
  title: "Ophaling details | Van Velzen Autorecycling Admin",
  description: "Bekijk ophaling details van Van Velzen Autorecycling",
}

export default async function PickupDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const supabase = createClient()

  // Fetch pickup with related vehicle and customer data
  const { data: pickup, error } = await supabase
    .from("pickups")
    .select(`
      *,
      vehicles(id, license_plate, make, model, year, color),
      customers:vehicles(customer_id, customers(id, name, email, phone, address, postal_code, city))
    `)
    .eq("id", params.id)
    .single()

  if (error || !pickup) {
    console.error("Error fetching pickup:", error)
    notFound()
  }

  // Get files for this pickup
  const filesResult = await getFilesAction("pickup", params.id)
  const files = filesResult.success ? filesResult.files : []

  // Process the data to make it easier to work with
  const vehicle = pickup.vehicles
  const customer = pickup.customers?.customers

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/admin/pickups">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">Ophaling {formatDate(pickup.scheduled_date)}</h1>
        </div>
        <div className="flex gap-2">
          <Link href={`/admin/pickups/${params.id}/edit`}>
            <Button variant="outline" className="flex items-center gap-1">
              <Pencil className="h-4 w-4" />
              Bewerken
            </Button>
          </Link>
          <StatusUpdateButton pickupId={params.id} currentStatus={pickup.status} />
        </div>
      </div>

      <Tabs defaultValue="details">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="vehicle">Voertuig</TabsTrigger>
          <TabsTrigger value="customer">Klant</TabsTrigger>
          <TabsTrigger value="files">Bestanden</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Ophaling details</CardTitle>
              <CardDescription>Details van deze ophaling</CardDescription>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Datum</dt>
                  <dd className="mt-1 text-sm flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    {formatDate(pickup.scheduled_date)}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Tijdslot</dt>
                  <dd className="mt-1 text-sm">{pickup.time_slot || "-"}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Adres</dt>
                  <dd className="mt-1 text-sm flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    {pickup.address || "-"}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Status</dt>
                  <dd className="mt-1 text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        pickup.status === "scheduled"
                          ? "bg-yellow-100 text-yellow-800"
                          : pickup.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : pickup.status === "cancelled"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {pickup.status === "scheduled"
                        ? "Gepland"
                        : pickup.status === "completed"
                          ? "Voltooid"
                          : pickup.status === "cancelled"
                            ? "Geannuleerd"
                            : pickup.status}
                    </span>
                  </dd>
                </div>
                <div className="md:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">Notities</dt>
                  <dd className="mt-1 text-sm">{pickup.notes || "-"}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vehicle" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Voertuig informatie</CardTitle>
              <CardDescription>Details van het op te halen voertuig</CardDescription>
            </CardHeader>
            <CardContent>
              {vehicle ? (
                <div className="space-y-4">
                  <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Kenteken</dt>
                      <dd className="mt-1 text-sm flex items-center gap-1">
                        <Truck className="h-4 w-4 text-gray-500" />
                        {vehicle.license_plate}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Merk & Model</dt>
                      <dd className="mt-1 text-sm">
                        {vehicle.make} {vehicle.model}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Bouwjaar</dt>
                      <dd className="mt-1 text-sm">{vehicle.year || "-"}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Kleur</dt>
                      <dd className="mt-1 text-sm">{vehicle.color || "-"}</dd>
                    </div>
                  </dl>
                  <div className="pt-2">
                    <Link href={`/admin/vehicles/${vehicle.id}`}>
                      <Button variant="outline">Bekijk voertuig details</Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500">Geen voertuig gekoppeld aan deze ophaling</div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customer" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Klant informatie</CardTitle>
              <CardDescription>Details van de klant</CardDescription>
            </CardHeader>
            <CardContent>
              {customer ? (
                <div className="space-y-4">
                  <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Naam</dt>
                      <dd className="mt-1 text-sm flex items-center gap-1">
                        <User className="h-4 w-4 text-gray-500" />
                        {customer.name}
                      </dd>
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
                  <div className="pt-2">
                    <Link href={`/admin/customers/${customer.id}`}>
                      <Button variant="outline">Bekijk klant details</Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500">Geen klant gekoppeld aan deze ophaling</div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="files" className="space-y-4">
          <FileUpload
            entityType="pickup"
            entityId={params.id}
            initialFiles={files}
            title="Ophaling bestanden"
            description="Upload bestanden voor deze ophaling, zoals foto's, documenten, etc."
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
