import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"
import { logActivity } from "@/lib/utils/activity-logger"
import { revalidatePath } from "next/cache"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient()
    const vehicleId = params.id
    const data = await request.json()

    // Update the vehicle in the database
    const { data: updatedVehicle, error } = await supabase
      .from("vehicles")
      .update({
        license_plate: data.license_plate,
        make: data.make,
        model: data.model,
        year: data.year,
        color: data.color,
        vin: data.vin,
        status: data.status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", vehicleId)
      .select()
      .single()

    if (error) {
      console.error("Error updating vehicle:", error)
      return NextResponse.json(
        { error: "Er is een fout opgetreden bij het bijwerken van het voertuig" },
        { status: 500 },
      )
    }

    // Log activity
    await logActivity("update", "vehicle", vehicleId, {
      license_plate: data.license_plate,
      status: data.status,
    })

    // Revalidate paths
    revalidatePath(`/admin/vehicles/${vehicleId}`)
    revalidatePath("/admin/vehicles")

    return NextResponse.json({ success: true, vehicle: updatedVehicle })
  } catch (error) {
    console.error("Error in PUT /api/vehicles/[id]:", error)
    return NextResponse.json({ error: "Er is een onverwachte fout opgetreden" }, { status: 500 })
  }
}
