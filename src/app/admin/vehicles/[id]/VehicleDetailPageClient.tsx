"use client"

import { useState } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getVehicleWithRelatedData, updateVehicleStatus } from "@/app/actions/vehicle-actions"
import { FileUpload } from "@/components/file-upload"
import { getFilesAction } from "@/app/actions/file-actions"
import { ArrowLeft, Pencil } from "lucide-react"
import { toast } from "sonner"
import { revalidatePath } from "next/cache"

function StatusUpdateButton({ vehicleId, currentStatus }: { vehicleId: string; currentStatus: string }) {
  const [status, setStatus] = useState(currentStatus)
  const [isPending, startTransition] = useState(false)

  async function handleStatusUpdate(vehicleId: string, status: string) {
    startTransition(async () => {
      const result = await updateVehicleStatus(vehicleId, status)
      if (result?.success) {
        toast.success("Status gewijzigd")
        setStatus(status)
        revalidatePath(`/admin/vehicles/${vehicleId}`)
      } else {
        toast.error("Er ging iets fout")
      }
    })
  }

  return (
    <select
      className="px-4 py-2 rounded-md bg-white border border-gray-200 text-sm"
      value={status}
      onChange={(e) => handleStatusUpdate(vehicleId, e.target.value)}
      disabled={isPending}
    >
      <option value="pending">Wachtend</option>
      <option value="processing">In verwerking</option>
      <option value="recycled">Gerecycled</option>
      <option value="sold">Verkocht</option>
    </select>
  )
}

export default function VehicleDetailPageClient({
  params,
}: {
  params: { id: string }
}) {
  const [vehicleData, setVehicleData] = useState<any>(null)
  const [files, setFiles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useState(() => {
    const fetchData = async () => {
      try {
        const vehicleData = await getVehicleWithRelatedData(params.id)
        const filesResult = await getFilesAction("vehicle", params.id)
        const files = filesResult.success ? filesResult.files : []

        setVehicleData(vehicleData)
        setFiles(files)
        setLoading(false)
      } catch (error) {
        console.error("Error loading vehicle:", error)
        notFound()
      }
    }

    fetchData()
  }, [params.id])

  if (loading || !vehicleData) {
    return <div>Loading...</div>
  }

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
                <div>
                  <dt className="text-sm font-medium text-gray-500">Aangemaakt op</dt>
                  <dd className="mt-1 text-sm">
                    {new Date(vehicle.created_at).toLocaleDateString("nl-NL", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Laatst bijgewerkt</dt>
                  <dd className="mt-1 text-sm">
                    {new Date(vehicle.updated_at).toLocaleDateString("nl-NL", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quotes" className="space-y-4">
          {/* Existing quotes content */}
        </TabsContent>

        <TabsContent value="pickups" className="space-y-4">
          {/* Existing pickups content */}
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
      </Tabs>
    </div>
  )
}
