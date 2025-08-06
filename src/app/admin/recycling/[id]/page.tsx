import { notFound } from "next/navigation"
import Link from "next/link"
import { format } from "date-fns"
import { nl } from "date-fns/locale"
import { ArrowLeft, Edit } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getRecycledVehicleById } from "@/app/actions/recycling-actions"
import { StatusUpdateButton } from "./components/status-update-button"
import { RecyclingFiles } from "./components/recycling-files"

export default async function RecyclingDetailPage({ params }: { params: { id: string } }) {
  const recycledVehicle = await getRecycledVehicleById(params.id)

  if (!recycledVehicle) {
    notFound()
  }

  const { recycling } = recycledVehicle

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link href="/admin/recycling">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <Heading
            title={`Recycling: ${recycledVehicle.license_plate}`}
            description={`${recycledVehicle.brand} ${recycledVehicle.model}`}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Link href={`/admin/recycling/${params.id}/edit`}>
            <Button variant="outline" size="sm">
              <Edit className="mr-2 h-4 w-4" />
              Bewerken
            </Button>
          </Link>
          {recycling && <StatusUpdateButton id={recycling.id} currentStatus={recycling.status || "pending"} />}
        </div>
      </div>
      <Separator />

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Voertuig Informatie</CardTitle>
            <CardDescription>Details van het gerecyclede voertuig</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">Kenteken</p>
                <p className="text-sm text-muted-foreground">{recycledVehicle.license_plate}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Merk</p>
                <p className="text-sm text-muted-foreground">{recycledVehicle.brand}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Model</p>
                <p className="text-sm text-muted-foreground">{recycledVehicle.model}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Status</p>
                <p className="text-sm text-muted-foreground">{recycledVehicle.status}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Aangemaakt op</p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(recycledVehicle.created_at), "d MMMM yyyy", { locale: nl })}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Laatst bijgewerkt</p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(recycledVehicle.updated_at), "d MMMM yyyy", { locale: nl })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recycling Informatie</CardTitle>
            <CardDescription>Details van het recyclingproces</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {recycling ? (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Recycling Datum</p>
                  <p className="text-sm text-muted-foreground">
                    {recycling.recycling_date
                      ? format(new Date(recycling.recycling_date), "d MMMM yyyy", { locale: nl })
                      : "-"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Certificaat</p>
                  <p className="text-sm text-muted-foreground">{recycling.recycling_certificate || "-"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Methode</p>
                  <p className="text-sm text-muted-foreground">{recycling.recycling_method || "-"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Locatie</p>
                  <p className="text-sm text-muted-foreground">{recycling.recycling_location || "-"}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm font-medium">Notities</p>
                  <p className="text-sm text-muted-foreground">{recycling.notes || "-"}</p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Geen recycling informatie beschikbaar.</p>
            )}
          </CardContent>
        </Card>
      </div>

      {recycling && <RecyclingFiles vehicleId={params.id} recyclingId={recycling.id} />}
    </div>
  )
}
