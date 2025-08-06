import { notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getVehicleWithRelatedData } from "@/app/actions/vehicle-actions"
import VehicleEditForm from "../components/vehicle-edit-form"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export const metadata = {
  title: "Voertuig bewerken | Van Velzen Autorecycling Admin",
  description: "Bewerk voertuiggegevens van Van Velzen Autorecycling",
}

export default async function VehicleEditPage({
  params,
}: {
  params: { id: string }
}) {
  try {
    const vehicleData = await getVehicleWithRelatedData(params.id)
    const { vehicle } = vehicleData

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href={`/admin/vehicles/${params.id}`}>
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold tracking-tight">Voertuig bewerken</h1>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Voertuiggegevens</CardTitle>
            <CardDescription>Bewerk de gegevens van dit voertuig</CardDescription>
          </CardHeader>
          <CardContent>
            <VehicleEditForm vehicle={vehicle} />
          </CardContent>
        </Card>
      </div>
    )
  } catch (error) {
    console.error("Error loading vehicle:", error)
    notFound()
  }
}
