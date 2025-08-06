"use server"

import { createClient } from "@/lib/supabase/server"

interface ActivityLog {
  action: string
  entityType: string
  entityId: any
  timestamp: any
  user: any
}

interface DashboardStats {
  quotes: number
  vehicles: number
  pickups: number
  documents: number
  recentActivity: ActivityLog[]
}

export async function getAdminDashboardStats(): Promise<DashboardStats> {
  try {
    const supabase = await createClient()

    // Initialize default values
    const stats: DashboardStats = {
      quotes: 0,
      vehicles: 0,
      pickups: 0,
      documents: 0,
      recentActivity: [],
    }

    try {
      // Get quotes count
      const { count: quotesCount, error: quotesError } = await supabase
        .from("quotes")
        .select("*", { count: "exact", head: true })

      if (!quotesError) {
        stats.quotes = quotesCount || 0
      }
    } catch (error) {
      console.error("Error fetching quotes count:", error)
    }

    try {
      // Get vehicles count
      const { count: vehiclesCount, error: vehiclesError } = await supabase
        .from("vehicles")
        .select("*", { count: "exact", head: true })

      if (!vehiclesError) {
        stats.vehicles = vehiclesCount || 0
      }
    } catch (error) {
      console.error("Error fetching vehicles count:", error)
    }

    try {
      // Get pickups count - check if table exists first
      const { count: pickupsCount, error: pickupsError } = await supabase
        .from("pickups")
        .select("*", { count: "exact", head: true })

      if (!pickupsError) {
        stats.pickups = pickupsCount || 0
      }
    } catch (error) {
      console.error("Error fetching pickups count:", error)
    }

    try {
      // Get documents count
      const { count: documentsCount, error: documentsError } = await supabase
        .from("vehicle_documents")
        .select("*", { count: "exact", head: true })

      if (!documentsError) {
        stats.documents = documentsCount || 0
      }
    } catch (error) {
      console.error("Error fetching documents count:", error)
    }

    try {
      // Get recent activity - check if table exists first
      const { data: activityData, error: activityError } = await supabase
        .from("activity_logs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5)

      if (!activityError && activityData) {
        // Format activity data
        stats.recentActivity = activityData.map((log) => ({
          action: formatAction(log.action),
          entityType: formatEntityType(log.entity_type),
          entityId: log.entity_id,
          timestamp: log.created_at,
          user: log.user_id,
        }))
      }
    } catch (error) {
      console.error("Error fetching activity logs:", error)
    }

    return stats
  } catch (error) {
    console.error("Error in getAdminDashboardStats:", error)
    // Return default values in case of error
    return {
      quotes: 0,
      vehicles: 0,
      pickups: 0,
      documents: 0,
      recentActivity: [],
    }
  }
}

// Helper functions to format activity data
function formatAction(action: string): string {
  switch (action) {
    case "create":
      return "Aangemaakt"
    case "update":
      return "Bijgewerkt"
    case "delete":
      return "Verwijderd"
    case "view":
      return "Bekeken"
    default:
      return action
  }
}

function formatEntityType(entityType: string): string {
  switch (entityType) {
    case "quote":
      return "offerte"
    case "vehicle":
      return "voertuig"
    case "pickup":
      return "ophaalafspraak"
    case "document":
      return "document"
    case "payment":
      return "betaling"
    case "vrijwaring":
      return "vrijwaring"
    case "recycling":
      return "recycling"
    default:
      return entityType
  }
}
