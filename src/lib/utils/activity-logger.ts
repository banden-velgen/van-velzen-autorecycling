"use server"

import { cookies } from "next/headers"
import pool from "@/lib/db/neon"
import { verifyToken } from "@/lib/auth/neon-auth"

export interface ActivityLog {
  action: string
  details?: string
  user_id?: string
  ip_address?: string
  user_agent?: string
}

export async function logActivity(activity: ActivityLog) {
  try {
    // Get user from token if available
    const cookieStore = cookies()
    const token = cookieStore.get('auth-token')?.value
    let userId = null
    
    if (token) {
      const user = verifyToken(token)
      if (user) {
        userId = user.id
      }
    }

    const { rows } = await pool.query(
      `INSERT INTO activity_logs (
        action, 
        details, 
        user_id, 
        ip_address, 
        user_agent, 
        created_at
      ) VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *`,
      [
        activity.action,
        activity.details || null,
        userId,
        activity.ip_address || null,
        activity.user_agent || null
      ]
    )

    console.log(`[ACTIVITY] Logged: ${activity.action}`, rows[0])
    return { success: true, data: rows[0] }
  } catch (error) {
    console.error("[ACTIVITY] Error logging activity:", error)
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
  }
}
