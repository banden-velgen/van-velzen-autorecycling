"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import { logActivity } from "@/lib/utils/activity-logger"

/**
 * Update the status of a pickup
 */
export async function updatePickupStatus(
  pickupId: string,
  status: string,
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = await createClient()

    // Get the current pickup data for activity logging
    const { data: currentPickup, error: fetchError } = await supabase
      .from("pickups")
      .select("*")
      .eq("id", pickupId)
      .single()

    if (fetchError) {
      console.error("Error fetching pickup:", fetchError)
      return { success: false, error: "Ophaling niet gevonden" }
    }

    // Update the pickup status
    const { error: updateError } = await supabase
      .from("pickups")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", pickupId)

    if (updateError) {
      console.error("Error updating pickup status:", updateError)
      return { success: false, error: "Fout bij het bijwerken van de ophaling status" }
    }

    // Log the activity
    await logActivity("update", "pickup", pickupId, {
      status_changed_from: currentPickup.status,
      status_changed_to: status,
    })

    // Revalidate the paths
    revalidatePath(`/admin/pickups/${pickupId}`)
    revalidatePath("/admin/pickups")

    return { success: true }
  } catch (error) {
    console.error("Error in updatePickupStatus:", error)
    return {
      success: false,
      error: `Er is een fout opgetreden: ${error instanceof Error ? error.message : String(error)}`,
    }
  }
}

/**
 * Get a pickup by ID with related data
 */
export async function getPickup(pickupId: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("pickups")
    .select(`
      *,
      vehicles(id, license_plate, make, model, year, color),
      customers:vehicles(customer_id, customers(id, name, email, phone, address, postal_code, city))
    `)
    .eq("id", pickupId)
    .single()

  if (error) {
    console.error("Error fetching pickup:", error)
    throw new Error("Ophaling niet gevonden")
  }

  return {
    ...data,
    vehicle: data.vehicles,
    customer: data.customers?.customers,
  }
}

/**
 * Get all pickups with related data
 */
export async function getPickups() {
  try {
    const supabase = await createClient()

    // First, get all pickups
    const { data: pickups, error: pickupsError } = await supabase
      .from("pickups")
      .select("*")
      .order("scheduled_date", { ascending: false })

    if (pickupsError) {
      console.error("Error fetching pickups:", pickupsError)
      throw new Error("Fout bij het ophalen van ophalingen")
    }

    // Process each pickup to get related data
    const processedPickups = await Promise.all(
      pickups.map(async (pickup) => {
        // Get vehicle data if vehicle_id exists
        let vehicle = null
        if (pickup.vehicle_id) {
          const { data: vehicleData, error: vehicleError } = await supabase
            .from("vehicles")
            .select("id, license_plate, make, model, year")
            .eq("id", pickup.vehicle_id)
            .single()

          if (!vehicleError) {
            vehicle = vehicleData
          }
        }

        // Get customer data if customer_id exists
        let customer = null
        if (pickup.customer_id) {
          const { data: customerData, error: customerError } = await supabase
            .from("customers")
            .select("id, name, email, phone")
            .eq("id", pickup.customer_id)
            .single()

          if (!customerError) {
            customer = customerData
          }
        }

        return {
          ...pickup,
          vehicle,
          customer,
        }
      }),
    )

    return processedPickups
  } catch (error) {
    console.error("Error in getPickups:", error)
    throw new Error(`Fout bij het ophalen van ophalingen: ${error instanceof Error ? error.message : String(error)}`)
  }
}

/**
 * Create a new pickup
 */
export async function createPickup(data: {
  license_plate: string
  scheduled_date: Date
  address: string
  postal_code: string
  city: string
  contact_name: string
  contact_phone: string
  notes?: string
  status: string
}): Promise<{ success: boolean; error?: string; id?: string }> {
  try {
    const supabase = await createClient()

    // First, find the vehicle by license plate
    const { data: vehicle, error: vehicleError } = await supabase
      .from("vehicles")
      .select("id, customer_id")
      .eq("license_plate", data.license_plate)
      .single()

    if (vehicleError) {
      console.error("Error finding vehicle:", vehicleError)
      return { success: false, error: "Voertuig met dit kenteken niet gevonden" }
    }

    // Create the pickup
    const { data: pickup, error: pickupError } = await supabase
      .from("pickups")
      .insert({
        vehicle_id: vehicle.id,
        customer_id: vehicle.customer_id,
        scheduled_date: data.scheduled_date.toISOString(),
        address: data.address,
        postal_code: data.postal_code,
        city: data.city,
        contact_name: data.contact_name,
        contact_phone: data.contact_phone,
        notes: data.notes,
        status: data.status,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (pickupError) {
      console.error("Error creating pickup:", pickupError)
      return { success: false, error: "Fout bij het aanmaken van de ophaling" }
    }

    // Log the activity
    await logActivity("create", "pickup", pickup.id, {
      license_plate: data.license_plate,
      scheduled_date: data.scheduled_date,
    })

    // Revalidate the paths
    revalidatePath("/admin/pickups")

    return { success: true, id: pickup.id }
  } catch (error) {
    console.error("Error in createPickup:", error)
    return {
      success: false,
      error: `Er is een fout opgetreden: ${error instanceof Error ? error.message : String(error)}`,
    }
  }
}

/**
 * Delete a pickup
 */
export async function deletePickup(pickupId: string): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = await createClient()

    // Get pickup info for logging
    const { data: pickup, error: fetchError } = await supabase
      .from("pickups")
      .select("*")
      .eq("id", pickupId)
      .single()

    if (fetchError) {
      console.error("Error fetching pickup for deletion:", fetchError)
      return { success: false, error: "Ophaling niet gevonden" }
    }

    // Delete the pickup
    const { error: deleteError } = await supabase
      .from("pickups")
      .delete()
      .eq("id", pickupId)

    if (deleteError) {
      console.error("Error deleting pickup:", deleteError)
      return { success: false, error: "Fout bij het verwijderen van de ophaling" }
    }

    // Log the activity
    await logActivity("delete", "pickup", pickupId, {
      license_plate: pickup.license_plate,
      scheduled_date: pickup.scheduled_date,
    })

    // Revalidate the paths
    revalidatePath("/admin/pickups")

    return { success: true }
  } catch (error) {
    console.error("Error in deletePickup:", error)
    return {
      success: false,
      error: `Er is een fout opgetreden: ${error instanceof Error ? error.message : String(error)}`,
    }
  }
}
