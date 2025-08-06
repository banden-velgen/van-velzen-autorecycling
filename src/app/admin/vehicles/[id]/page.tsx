import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getVehicleWithRelatedData } from "@/app/actions/vehicle-actions"
import { FileUpload } from "@/components/file-upload"
import { getFilesAction } from "@/app/actions/file-actions"
import { ArrowLeft, Pencil } from "lucide-react"
import { StatusUpdateButton } from "./components/status-update-button"
import { DocumentsTab } from "./components/documents-tab"

export const metadata = {
  title: "Voertuigdetails | Van Velzen Autorecycling Admin",
  description: "Bekijk voertuigdetails van Van Velzen Autorecycling",
}

export default async function VehicleDetailPage({
  params,
}: {
  params: { id: string }
}) {
  try {
    const vehicleData = await getVehicleWithRelatedData(params.id)
    const filesResult = await getFilesAction("vehicle", params.id)
    const files = filesResult.success ? filesResult.files : []

    const { vehicle, quotes, pickups, vrijwaringen, recyclingRecords, payments } = vehicleData

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/admin/vehicles">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold tracking-tight">{vehicle.license_plate}</h1>
          </div>
          <div className="flex gap-2">
            <Link href={`/admin/vehicles/${params.id}/edit`}>
              <Button variant="outline" className="flex items-center gap-1">
                <Pencil className="h-4 w-4" />
                Bewerken
              </Button>
            </Link>
            <StatusUpdateButton vehicleId={params.id} currentStatus={vehicle.status} />
          </div>
        </div>

        <Tabs defaultValue="details">
          <TabsList>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="quotes">Offertes</TabsTrigger>
            <TabsTrigger value="pickups">Ophalingen</TabsTrigger>
            
            <TabsTrigger value="files">Bestanden</TabsTrigger>
            <TabsTrigger value="documents">Documenten</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Voertuiggegevens</CardTitle>
                <CardDescription>Bekijk de gegevens van dit voertuig</CardDescription>
              </CardHeader>
              <CardContent>
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Kenteken</dt>
                    <dd className="mt-1 text-sm">{vehicle.license_plate}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Merk</dt>
                    <dd className="mt-1 text-sm">{vehicle.make || "-"}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Model</dt>
                    <dd className="mt-1 text-sm">{vehicle.model || "-"}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Bouwjaar</dt>
                    <dd className="mt-1 text-sm">{vehicle.year || "-"}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Kleur</dt>
                    <dd className="mt-1 text-sm">{vehicle.color || "-"}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">VIN</dt>
                    <dd className="mt-1 text-sm">{vehicle.vin || "-"}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Status</dt>
                    <dd className="mt-1 text-sm">
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
                    </dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="quotes" className="space-y-4">
            <VehicleQuotes quotes={quotes} />
          </TabsContent>

          <TabsContent value="pickups" className="space-y-4">
            <VehiclePickups pickups={pickups} />
          </TabsContent>

          <TabsContent value="vrijwaringen" className="space-y-4">
            <VehicleVrijwaringen vrijwaringen={vrijwaringen} />
          </TabsContent>

          <TabsContent value="recycling" className="space-y-4">
            <VehicleRecycling recyclingRecords={recyclingRecords} />
          </TabsContent>

          <TabsContent value="payments" className="space-y-4">
            <VehiclePayments payments={payments} />
          </TabsContent>

          <TabsContent value="files" className="space-y-4">
            <FileUpload
              entityType="vehicle"
              entityId={params.id}
              initialFiles={files}
              title="Voertuigbestanden"
              description="Upload bestanden voor dit voertuig, zoals foto's, documenten, etc."
            />
          </TabsContent>
          <TabsContent value="documents" className="space-y-4">
            <DocumentsTab vehicleId={params.id} />
          </TabsContent>
        </Tabs>
      </div>
    )
  } catch (error) {
    console.error("Error loading vehicle:", error)
    notFound()
  }
}

function VehicleQuotes({ quotes }: { quotes: any[] }) {
  if (!quotes || quotes.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Offertes</CardTitle>
          <CardDescription>Offertes gekoppeld aan dit voertuig</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6 text-gray-500">Geen offertes gevonden voor dit voertuig</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Offertes</CardTitle>
        <CardDescription>Offertes gekoppeld aan dit voertuig</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-4 py-3">Offerte #</th>
                <th className="px-4 py-3">Klant</th>
                <th className="px-4 py-3">Bedrag</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Datum</th>
                <th className="px-4 py-3">Acties</th>
              </tr>
            </thead>
            <tbody>
              {quotes.map((quote) => (
                <tr key={quote.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">#{quote.id.substring(0, 8)}</td>
                  <td className="px-4 py-3">{quote.customers?.name || "-"}</td>
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
                  <td className="px-4 py-3">{new Date(quote.created_at).toLocaleDateString("nl-NL")}</td>
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

function VehiclePickups({ pickups }: { pickups: any[] }) {
  if (!pickups || pickups.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Ophalingen</CardTitle>
          <CardDescription>Ophalingen gekoppeld aan dit voertuig</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6 text-gray-500">Geen ophalingen gevonden voor dit voertuig</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ophalingen</CardTitle>
        <CardDescription>Ophalingen gekoppeld aan dit voertuig</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-4 py-3">Datum</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Adres</th>
                <th className="px-4 py-3">Acties</th>
              </tr>
            </thead>
            <tbody>
              {pickups.map((pickup) => (
                <tr key={pickup.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">
                    {new Date(pickup.scheduled_date).toLocaleDateString("nl-NL")}
                  </td>
                  <td className="px-4 py-3">
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
                  </td>
                  <td className="px-4 py-3">{pickup.address || "-"}</td>
                  <td className="px-4 py-3">
                    <Link href={`/admin/pickups/${pickup.id}`}>
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

function VehicleVrijwaringen({ vrijwaringen }: { vrijwaringen: any[] }) {
  if (!vrijwaringen || vrijwaringen.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>RDW Vrijwaringen</CardTitle>
          <CardDescription>Vrijwaringen gekoppeld aan dit voertuig</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6 text-gray-500">Geen vrijwaringen gevonden voor dit voertuig</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>RDW Vrijwaringen</CardTitle>
        <CardDescription>Vrijwaringen gekoppeld aan dit voertuig</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-4 py-3">Datum</th>
                <th className="px-4 py-3">Referentie</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Acties</th>
              </tr>
            </thead>
            <tbody>
              {vrijwaringen.map((vrijwaring) => (
                <tr key={vrijwaring.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">
                    {new Date(vrijwaring.created_at).toLocaleDateString("nl-NL")}
                  </td>
                  <td className="px-4 py-3">{vrijwaring.reference_number || "-"}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        vrijwaring.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : vrijwaring.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : vrijwaring.status === "failed"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {vrijwaring.status === "pending"
                        ? "In behandeling"
                        : vrijwaring.status === "completed"
                          ? "Voltooid"
                          : vrijwaring.status === "failed"
                            ? "Mislukt"
                            : vrijwaring.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Link href={`/admin/vrijwaringen/${vrijwaring.id}`}>
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

function VehicleRecycling({ recyclingRecords }: { recyclingRecords: any[] }) {
  if (!recyclingRecords || recyclingRecords.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recycling</CardTitle>
          <CardDescription>Recycling gegevens van dit voertuig</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6 text-gray-500">Geen recycling gegevens gevonden voor dit voertuig</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recycling</CardTitle>
        <CardDescription>Recycling gegevens van dit voertuig</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-4 py-3">Datum</th>
                <th className="px-4 py-3">Percentage</th>
                <th className="px-4 py-3">Notities</th>
                <th className="px-4 py-3">Acties</th>
              </tr>
            </thead>
            <tbody>
              {recyclingRecords.map((record) => (
                <tr key={record.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{new Date(record.created_at).toLocaleDateString("nl-NL")}</td>
                  <td className="px-4 py-3">{record.recycling_percentage}%</td>
                  <td className="px-4 py-3">{record.notes || "-"}</td>
                  <td className="px-4 py-3">
                    <Link href={`/admin/recycling/${record.id}`}>
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

function VehiclePayments({ payments }: { payments: any[] }) {
  if (!payments || payments.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Betalingen</CardTitle>
          <CardDescription>Betalingen gekoppeld aan dit voertuig</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6 text-gray-500">Geen betalingen gevonden voor dit voertuig</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Betalingen</CardTitle>
        <CardDescription>Betalingen gekoppeld aan dit voertuig</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-4 py-3">Datum</th>
                <th className="px-4 py-3">Bedrag</th>
                <th className="px-4 py-3">Methode</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Acties</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">
                    {new Date(payment.payment_date).toLocaleDateString("nl-NL")}
                  </td>
                  <td className="px-4 py-3">€{payment.amount.toFixed(2)}</td>
                  <td className="px-4 py-3">{payment.payment_method}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        payment.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : payment.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : payment.status === "failed"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {payment.status === "pending"
                        ? "In behandeling"
                        : payment.status === "completed"
                          ? "Voltooid"
                          : payment.status === "failed"
                            ? "Mislukt"
                            : payment.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Link href={`/admin/payments/${payment.id}`}>
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
