"use server"

import { createClient } from "@/lib/supabase/server"

export async function logActivity(
  action: "create" | "update" | "delete" | "view",
  entityType: string,
  entityId: string,
  metadata?: Record<string, any>,
) {
  try {
    const supabase = createClient()

    // Get current user (if authenticated)
    const {
      data: { session },
    } = await supabase.auth.getSession()
    const userId = session?.user?.id || "system"

    // Insert activity log
    const { error } = await supabase.from("activity_logs").insert({
      user_id: userId,
      action,
      entity_type: entityType,
      entity_id: entityId,
      metadata,
      created_at: new Date().toISOString(),
    })

    if (error) {
      console.error("Error logging activity:", error)
    }
  } catch (error) {
    console.error("Error in logActivity:", error)
    // Don't throw errors from the activity logger to prevent disrupting the main flow
  }
}
