import { redirect } from "next/navigation"
import { getAdminDashboardStats } from "@/app/actions/admin-actions"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Car, ClipboardList, FileText, Truck } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

// Force dynamic rendering to prevent static generation issues with cookies
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function AdminDashboard() {
  let stats

  try {
    stats = await getAdminDashboardStats()
  } catch (error) {
    console.error("Error loading dashboard stats:", error)
    stats = {
      quotes: 0,
      vehicles: 0,
      pickups: 0,
      documents: 0,
      recentActivity: [],
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welkom in het beheerderspaneel</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Offertes</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.quotes}</div>
            <p className="text-xs text-muted-foreground">Totaal aantal offertes</p>
            <div className="mt-4">
              <Link href="/admin/quotes">
                <Button variant="outline" size="sm" className="w-full">
                  Bekijk offertes
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Voertuigen</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.vehicles}</div>
            <p className="text-xs text-muted-foreground">Geregistreerde voertuigen</p>
            <div className="mt-4">
              <Link href="/admin/vehicles">
                <Button variant="outline" size="sm" className="w-full">
                  Bekijk voertuigen
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ophaalafspraken</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pickups}</div>
            <p className="text-xs text-muted-foreground">Geplande ophaalafspraken</p>
            <div className="mt-4">
              <Link href="/admin/pickups">
                <Button variant="outline" size="sm" className="w-full">
                  Bekijk afspraken
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documenten</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.documents}</div>
            <p className="text-xs text-muted-foreground">Opgeslagen documenten</p>
            <div className="mt-4">
              <Link href="/admin/documents">
                <Button variant="outline" size="sm" className="w-full">
                  Bekijk documenten
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recente Activiteit</CardTitle>
            <CardDescription>De meest recente activiteiten in het systeem</CardDescription>
          </CardHeader>
          <CardContent>
            {stats.recentActivity && stats.recentActivity.length > 0 ? (
              <div className="space-y-4">
                {stats.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center">
                    <div className="mr-4 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {activity.action} {activity.entityType}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(activity.timestamp).toLocaleString("nl-NL")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Geen recente activiteit gevonden</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Snelle Links</CardTitle>
            <CardDescription>Veelgebruikte acties en pagina's</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              <Link href="/admin/quotes/create">
                <Button variant="outline" className="w-full justify-start">
                  <ClipboardList className="mr-2 h-4 w-4" />
                  Nieuwe offerte aanmaken
                </Button>
              </Link>
              <Link href="/admin/vehicles/create">
                <Button variant="outline" className="w-full justify-start">
                  <Car className="mr-2 h-4 w-4" />
                  Nieuw voertuig toevoegen
                </Button>
              </Link>
              <Link href="/admin/pickups/create">
                <Button variant="outline" className="w-full justify-start">
                  <Truck className="mr-2 h-4 w-4" />
                  Nieuwe ophaalafspraak plannen
                </Button>
              </Link>
              <Link href="/admin/documents/upload">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Document uploaden
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
