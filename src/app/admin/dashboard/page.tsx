"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Car, FileText, CreditCard, Recycle, Clock, TrendingUp } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

export default function DashboardPage() {
  const router = useRouter()
  const [stats, setStats] = useState({
    newRequests: 0,
    totalVehicles: 0,
    pendingQuotes: 0,
    totalPayments: 0,
    recyclingPercentage: 0,
    recentActivities: [] as any[],
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true)
        const supabase = createClient()

        // Fetch new requests count
        const { data: newRequests, error: newRequestsError } = await supabase
          .from("quote_requests")
          .select("id")
          .eq("status", "new")

        if (newRequestsError) throw newRequestsError

        // Fetch total vehicles
        const { data: allVehicles, error: vehiclesError } = await supabase.from("vehicles").select("id")

        if (vehiclesError) throw vehiclesError

        // Fetch pending quotes
        const { data: pendingQuotes, error: quotesError } = await supabase
          .from("quotes")
          .select("id")
          .eq("status", "pending")

        if (quotesError) throw quotesError

        // Fetch total payments for current month
        const now = new Date()
        const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
        const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString()

        const { data: payments, error: paymentsError } = await supabase
          .from("payments")
          .select("amount")
          .gte("payment_date", firstDayOfMonth)
          .lte("payment_date", lastDayOfMonth)
          .eq("status", "completed")

        if (paymentsError) throw paymentsError

        const totalPayments = payments?.reduce((sum, payment) => sum + (payment.amount || 0), 0) || 0

        // Fetch average recycling percentage
        const { data: recyclingData, error: recyclingError } = await supabase
          .from("recycling_records")
          .select("recycling_percentage")
          .not("recycling_percentage", "is", null)

        if (recyclingError) throw recyclingError

        const recyclingPercentage = recyclingData?.length
          ? recyclingData.reduce((sum, record) => sum + (record.recycling_percentage || 0), 0) / recyclingData.length
          : 0

        // Fetch recent activities
        const { data: recentActivities, error: activitiesError } = await supabase
          .from("activity_logs")
          .select(`
            *,
            admin_users(name, email)
          `)
          .order("created_at", { ascending: false })
          .limit(5)

        if (activitiesError) throw activitiesError

        setStats({
          newRequests: newRequests?.length || 0,
          totalVehicles: allVehicles?.length || 0,
          pendingQuotes: pendingQuotes?.length || 0,
          totalPayments,
          recyclingPercentage,
          recentActivities: recentActivities || [],
        })

        setLoading(false)
      } catch (err) {
        console.error("Error fetching dashboard stats:", err)
        setError("Er is een fout opgetreden bij het ophalen van de statistieken")
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return <div className="container mx-auto py-10 text-center">Laden...</div>
  }

  if (error) {
    return (
      <div className="container mx-auto py-10 text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <Button onClick={() => router.push("/admin")}>Terug naar admin</Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Nieuwe aanvragen</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.newRequests}</div>
            <p className="text-xs text-muted-foreground">Onverwerkte offerteaanvragen</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Voertuigen</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalVehicles}</div>
            <p className="text-xs text-muted-foreground">Totaal aantal geregistreerde voertuigen</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Openstaande offertes</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingQuotes}</div>
            <p className="text-xs text-muted-foreground">Wachtend op reactie van klant</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Omzet deze maand</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{stats.totalPayments.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Totaal aan betalingen deze maand</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Recente activiteiten</CardTitle>
            <CardDescription>De laatste 5 activiteiten in het systeem</CardDescription>
          </CardHeader>
          <CardContent>
            {stats.recentActivities.length > 0 ? (
              <div className="space-y-4">
                {stats.recentActivities.map((activity: any) => (
                  <div key={activity.id} className="flex items-start gap-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                      {activity.action === "create" && <TrendingUp className="h-4 w-4 text-primary" />}
                      {activity.action === "update" && <Clock className="h-4 w-4 text-primary" />}
                      {activity.action === "delete" && <Recycle className="h-4 w-4 text-primary" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {activity.admin_users?.name || "Systeem"} heeft een {activity.entity_type}{" "}
                        {activity.action === "create"
                          ? "aangemaakt"
                          : activity.action === "update"
                            ? "bijgewerkt"
                            : "verwijderd"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(activity.created_at).toLocaleString("nl-NL")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">Geen recente activiteiten gevonden</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recycling statistieken</CardTitle>
            <CardDescription>Gemiddeld recyclingpercentage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center h-40">
              <div className="text-5xl font-bold text-primary">{stats.recyclingPercentage.toFixed(1)}%</div>
              <p className="text-sm text-muted-foreground mt-2">Gemiddeld recyclingpercentage van alle voertuigen</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
