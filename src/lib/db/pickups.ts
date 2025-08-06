import pool from "@/lib/db/neon"

export async function deletePickup(id: string) {
  try {
    const { rows } = await pool.query(
      "DELETE FROM pickups WHERE id = $1 RETURNING *",
      [id]
    )
    
    if (rows.length === 0) {
      throw new Error("Pickup not found")
    }
    
    return { success: true, data: rows[0] }
  } catch (error) {
    console.error("Error deleting pickup:", error)
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
  }
}

export async function verifyPickupExists(id: string) {
  try {
    const { rows } = await pool.query(
      "SELECT id FROM pickups WHERE id = $1",
      [id]
    )
    
    return rows.length > 0
  } catch (error) {
    console.error("Error verifying pickup:", error)
    return false
  }
}
