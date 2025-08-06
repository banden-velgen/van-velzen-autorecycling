import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { logActivity } from "@/lib/utils/activity-logger"
import { revalidatePath } from "next/cache"

export async function POST(request: Request) {
  try {
    const supabase = createClient()
    const data = await request.json()

    console.log("Creating pickup with data:", data)

    // Validate required fields
    if (!data.vehicle_id) {
      return NextResponse.json({ error: "Vehicle ID is required" }, { status: 400 })
    }

    // First, verify the vehicle exists
    const { data: vehicleCheck, error: vehicleCheckError } = await supabase
      .from("vehicles")
      .select("id, customer_id")
      .eq("id", data.vehicle_id)
      .single()

    if (vehicleCheckError) {
      console.error("Error checking vehicle:", vehicleCheckError)
      return NextResponse.json({ error: `Voertuig niet gevonden: ${vehicleCheckError.message}` }, { status: 404 })
    }

    if (!vehicleCheck) {
      console.error("Vehicle not found with ID:", data.vehicle_id)
      return NextResponse.json({ error: "Voertuig niet gevonden in de database" }, { status: 404 })
    }

    console.log("Found vehicle:", vehicleCheck)

    // Create the pickup
    const pickupData = {
      vehicle_id: data.vehicle_id,
      customer_id: vehicleCheck.customer_id,
      scheduled_date: data.scheduled_date,
      address: data.address,
      postal_code: data.postal_code,
      city: data.city,
      contact_name: data.contact_name,
      contact_phone: data.contact_phone,
      notes: data.notes || "",
      status: data.status,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    console.log("Inserting pickup with data:", pickupData)

    const { data: pickup, error: pickupError } = await supabase.from("pickups").insert(pickupData).select().single()

    if (pickupError) {
      console.error("Error creating pickup:", pickupError)
      return NextResponse.json(
        { error: "Fout bij het aanmaken van de ophaling: " + pickupError.message },
        { status: 500 },
      )
    }

    console.log("Successfully created pickup:", pickup)

    // Log the activity
    await logActivity("create", "pickup", pickup.id, {
      vehicle_id: data.vehicle_id,
      license_plate: data.license_plate,
      scheduled_date: data.scheduled_date,
    })

    // Revalidate the paths
    revalidatePath("/admin/pickups")

    return NextResponse.json({ success: true, id: pickup.id })
  } catch (error) {
    console.error("Error in createPickup:", error)
    return NextResponse.json(
      {
        error: `Er is een fout opgetreden: ${error instanceof Error ? error.message : String(error)}`,
      },
      { status: 500 },
    )
  }
}
