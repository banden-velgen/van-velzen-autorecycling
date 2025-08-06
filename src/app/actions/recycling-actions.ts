"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { logActivity } from "@/lib/utils/activity-logger"

export async function getRecycledVehicles() {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from("vehicles")
      .select("*")
      .eq("status", "recycled")
      .order("created_at", { ascending: false })

    if (error) throw error

    return data
  } catch (error) {
    console.error("Error fetching recycled vehicles:", error)
    throw new Error("Fout bij het ophalen van gerecyclede voertuigen")
  }
}

export async function getRecycledVehicleById(id: string) {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from("vehicles")
      .select(`
        *,
        recycling:recycling_id(*)
      `)
      .eq("id", id)
      .single()

    if (error) {
      console.error("Error fetching vehicle:", error)
      throw new Error("Fout bij het ophalen van voertuiggegevens")
    }

    return {
      ...data,
      license_plate: data.license_plate,
      brand: data.make,
      model: data.model,
      created_at: data.created_at,
      updated_at: data.updated_at,
    }
  } catch (error) {
    console.error("Error in getRecycledVehicleById:", error)
    throw new Error("Er is een onverwachte fout opgetreden bij het ophalen van de gegevens")
  }
}

// Add the missing getVehiclesForRecycling function
export async function getVehiclesForRecycling() {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from("vehicles")
      .select("id, license_plate, brand, model, status")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching vehicles for recycling:", error)
      return []
    }

    return data
  } catch (error) {
    console.error("Error in getVehiclesForRecycling:", error)
    return []
  }
}

export async function getAvailableVehiclesForRecycling() {
  try {
    const supabase = await createClient()

    // Get vehicles that are not already in recycling
    const { data, error } = await supabase
      .from("vehicles")
      .select("id, license_plate, make, model, year, status")
      .in("status", ["pending", "processing"])
      .order("created_at", { ascending: false })

    if (error) throw error

    return data
  } catch (error) {
    console.error("Error fetching vehicles for recycling:", error)
    throw new Error("Fout bij het ophalen van voertuigen voor recycling")
  }
}

export async function updateRecyclingStatus(id: string, status: string) {
  try {
    const supabase = createClient()

    const { error } = await supabase
      .from("recycling")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", id)

    if (error) {
      console.error("Error updating recycling status:", error)
      return { success: false, error: "Fout bij het bijwerken van de recycling status" }
    }

    // Log activity
    await logActivity("update", "recycling", id, { status })

    revalidatePath(`/admin/recycling/${id}`)
    revalidatePath("/admin/recycling")
    return { success: true }
  } catch (error) {
    console.error("Error in updateRecyclingStatus:", error)
    return { success: false, error: "Er is een onverwachte fout opgetreden bij het bijwerken van de recycling status" }
  }
}
