import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from "lucide-react"
import { PickupsTable } from "./components/pickups-table"
import { getPickups } from "@/app/actions/pickup-actions"

// Force dynamic rendering to prevent static generation issues with cookies
export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata = {
  title: "Ophalingen | Van Velzen Autorecycling Admin",
  description: "Beheer ophalingen van Van Velzen Autorecycling",
}

export default async function PickupsPage() {
  try {
    // Use the server action to get pickups
    const pickups = await getPickups()

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Ophalingen</h1>
          <Link href="/admin/pickups/new">
            <Button className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              Nieuwe ophaling
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Alle ophalingen</CardTitle>
            <CardDescription>Bekijk en beheer alle geplande en voltooide ophalingen.</CardDescription>
          </CardHeader>
          <CardContent>
            <PickupsTable pickups={pickups} />
          </CardContent>
        </Card>
      </div>
    )
  } catch (error) {
    console.error("Error in PickupsPage:", error)
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Ophalingen</h1>
        <Card>
          <CardContent>
            <div className="text-center py-6 text-red-500">
              Er is een fout opgetreden bij het ophalen van de ophalingen.
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }
}
