import { createClient } from "@/utils/supabase/server"

/**
 * Delete a pickup from the database
 */
export async function deletePickupFromDatabase(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    console.log(`[DB] Attempting to delete pickup with ID: ${id}`)
    const supabase = createClient()

    // Delete the pickup
    const { error } = await supabase.from("pickups").delete().eq("id", id)

    if (error) {
      console.error(`[DB] Error deleting pickup with ID ${id}:`, error)
      return {
        success: false,
        error: `Database error: ${error.message}`,
      }
    }

    // Verify the pickup was deleted
    const { data, error: verifyError } = await supabase.from("pickups").select("id").eq("id", id).single()

    if (!verifyError && data) {
      console.error(`[DB] Pickup with ID ${id} still exists after deletion attempt`)
      return {
        success: false,
        error: "Pickup was not deleted successfully",
      }
    }

    console.log(`[DB] Successfully deleted pickup with ID: ${id}`)
    return { success: true }
  } catch (error) {
    console.error(`[DB] Unexpected error deleting pickup with ID ${id}:`, error)
    return {
      success: false,
      error: `Unexpected error: ${error instanceof Error ? error.message : String(error)}`,
    }
  }
}
