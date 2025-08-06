"use server"

import { createClient } from "@/lib/supabase/server"

export async function getDashboardStats() {
  try {
    const supabase = await createClient()

    // Get quotes count
    const { count: totalQuotes, error: quotesError } = await supabase
      .from("quotes")
      .select("*", { count: "exact", head: true })

    if (quotesError) {
      console.error("Error fetching quotes count:", quotesError)
    }

    // Get new quotes this month
    const startOfMonth = new Date()
    startOfMonth.setDate(1)
    startOfMonth.setHours(0, 0, 0, 0)

    const { count: newQuotesThisMonth, error: newQuotesError } = await supabase
      .from("quotes")
      .select("*", { count: "exact", head: true })
      .gte("created_at", startOfMonth.toISOString())

    if (newQuotesError) {
      console.error("Error fetching new quotes count:", newQuotesError)
    }

    // Get vehicles in process
    const { count: vehiclesInProcess, error: vehiclesError } = await supabase
      .from("vehicles")
      .select("*", { count: "exact", head: true })
      .in("status", ["pending", "processing", "scheduled"])

    if (vehiclesError) {
      console.error("Error fetching vehicles count:", vehiclesError)
    }

    // Get vehicles completed this month
    const { count: vehiclesCompletedThisMonth, error: completedVehiclesError } = await supabase
      .from("vehicles")
      .select("*", { count: "exact", head: true })
      .eq("status", "completed")
      .gte("updated_at", startOfMonth.toISOString())

    if (completedVehiclesError) {
      console.error("Error fetching completed vehicles count:", completedVehiclesError)
    }

    // Get scheduled pickups
    const { count: scheduledPickups, error: pickupsError } = await supabase
      .from("pickups")
      .select("*", { count: "exact", head: true })
      .eq("status", "scheduled")

    if (pickupsError) {
      console.error("Error fetching pickups count:", pickupsError)
    }

    // Get pickups scheduled for today
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const { count: pickupsToday, error: pickupsTodayError } = await supabase
      .from("pickups")
      .select("*", { count: "exact", head: true })
      .eq("status", "scheduled")
      .gte("scheduled_date", today.toISOString())
      .lt("scheduled_date", tomorrow.toISOString())

    if (pickupsTodayError) {
      console.error("Error fetching today's pickups count:", pickupsTodayError)
    }

    // Get pending payments (if payments table exists)
    let pendingPaymentsAmount = 0
    try {
      const { data: pendingPayments, error: paymentsError } = await supabase
        .from("payments")
        .select("amount")
        .eq("status", "pending")

      if (paymentsError) {
        console.error("Error fetching payments:", paymentsError)
      } else {
        pendingPaymentsAmount = pendingPayments
          ? pendingPayments.reduce((sum, payment) => sum + (payment.amount || 0), 0)
          : 0
      }
    } catch (error) {
      console.log("Payments table doesn't exist, skipping payments data")
    }

    // Generate mock data for the overview chart
    const overviewData = [
      { name: "Jan", total: 12 },
      { name: "Feb", total: 18 },
      { name: "Mar", total: 24 },
      { name: "Apr", total: 32 },
      { name: "Mei", total: 28 },
      { name: "Jun", total: 36 },
      { name: "Jul", total: 42 },
      { name: "Aug", total: 38 },
      { name: "Sep", total: 44 },
      { name: "Okt", total: 52 },
      { name: "Nov", total: 48 },
      { name: "Dec", total: 56 },
    ]

    // Get recent activity
    const { data: recentActivity, error: activityError } = await supabase
      .from("activity_logs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5)

    if (activityError) {
      console.error("Error fetching activity logs:", activityError)
    }

    // Format activity data
    const formattedActivity = recentActivity
      ? recentActivity.map((activity) => ({
          id: activity.id,
          type: activity.entity_type,
          content: formatActivityContent(activity),
          timestamp: activity.created_at,
        }))
      : generateMockActivity() // Use mock data if no real activity is available

    return {
      totalQuotes: totalQuotes || 0,
      newQuotesThisMonth: newQuotesThisMonth || 0,
      vehiclesInProcess: vehiclesInProcess || 0,
      vehiclesCompletedThisMonth: vehiclesCompletedThisMonth || 0,
      scheduledPickups: scheduledPickups || 0,
      pickupsToday: pickupsToday || 0,
      pendingPayments: 0, // Simplified for now
      pendingPaymentsAmount: Math.round(pendingPaymentsAmount) || 0,
      overviewData,
      recentActivity: formattedActivity,
    }
  } catch (error) {
    console.error("Error in getDashboardStats:", error)
    // Return default values in case of error
    return {
      totalQuotes: 0,
      newQuotesThisMonth: 0,
      vehiclesInProcess: 0,
      vehiclesCompletedThisMonth: 0,
      scheduledPickups: 0,
      pickupsToday: 0,
      pendingPayments: 0,
      pendingPaymentsAmount: 0,
      overviewData: [],
      recentActivity: [],
    }
  }
}

function formatActivityContent(activity: any): string {
  const action = activity.action
  const entityType = activity.entity_type

  switch (entityType) {
    case "quote":
      return `Offerte ${activity.entity_id.substring(0, 8)} ${action === "create" ? "aangemaakt" : action === "update" ? "bijgewerkt" : "verwijderd"}`
    case "vehicle":
      return `Voertuig ${activity.details?.license_plate || activity.entity_id.substring(0, 8)} ${action === "create" ? "toegevoegd" : action === "update" ? "bijgewerkt" : "verwijderd"}`
    case "pickup":
      return `Ophaalafspraak ${activity.entity_id.substring(0, 8)} ${action === "create" ? "gepland" : action === "update" ? "bijgewerkt" : "geannuleerd"}`
    case "payment":
      return `Betaling ${activity.entity_id.substring(0, 8)} ${action === "create" ? "geregistreerd" : action === "update" ? "bijgewerkt" : "verwijderd"}`
    case "vrijwaring":
      return `Vrijwaring ${activity.entity_id.substring(0, 8)} ${action === "create" ? "aangemaakt" : action === "update" ? "bijgewerkt" : "verwijderd"}`
    case "recycling":
      return `Recycling ${activity.entity_id.substring(0, 8)} ${action === "create" ? "gestart" : action === "update" ? "bijgewerkt" : "voltooid"}`
    default:
      return `${entityType} ${activity.entity_id.substring(0, 8)} ${action}`
  }
}

function generateMockActivity() {
  return [
    {
      id: "1",
      type: "quote",
      content: "Offerte Q-12345 aangemaakt",
      timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 minutes ago
    },
    {
      id: "2",
      type: "vehicle",
      content: "Voertuig AB-123-CD toegevoegd",
      timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 minutes ago
    },
    {
      id: "3",
      type: "pickup",
      content: "Ophaalafspraak P-67890 gepland",
      timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 2 hours ago
    },
    {
      id: "4",
      type: "payment",
      content: "Betaling B-11111 geregistreerd",
      timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(), // 3 hours ago
    },
    {
      id: "5",
      type: "recycling",
      content: "Recycling R-22222 voltooid",
      timestamp: new Date(Date.now() - 1000 * 60 * 240).toISOString(), // 4 hours ago
    },
  ]
}
