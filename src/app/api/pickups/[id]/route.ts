import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient()
    const id = params.id
    const data = await request.json()

    // Update the pickup
    const { error } = await supabase
      .from("pickups")
      .update({
        ...data,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)

    if (error) {
      console.error("Error updating pickup:", error)
      return NextResponse.json({ error: "Failed to update pickup" }, { status: 500 })
    }

    // Revalidate the paths
    revalidatePath(`/admin/pickups/${id}`)
    revalidatePath("/admin/pickups")

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error in PATCH /api/pickups/[id]:", error)
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient()
    const id = params.id

    console.log(`Attempting to delete pickup with ID: ${id}`)

    // Check if the pickup exists without using .single()
    const { data: existingPickups, error: fetchError } = await supabase.from("pickups").select("id").eq("id", id)

    if (fetchError) {
      console.error("Error checking if pickup exists:", fetchError)
      return NextResponse.json({ error: `Error checking pickup: ${fetchError.message}` }, { status: 500 })
    }

    if (!existingPickups || existingPickups.length === 0) {
      console.error("Pickup not found for deletion")
      return NextResponse.json({ error: "Pickup not found" }, { status: 404 })
    }

    // Delete the pickup
    const { error: deleteError } = await supabase.from("pickups").delete().eq("id", id)

    if (deleteError) {
      console.error("Error deleting pickup:", deleteError)
      return NextResponse.json({ error: `Failed to delete pickup: ${deleteError.message}` }, { status: 500 })
    }

    console.log(`Successfully deleted pickup with ID: ${id}`)

    // Revalidate the paths
    revalidatePath("/admin/pickups")

    return NextResponse.json({
      success: true,
      message: `Pickup with ID ${id} was successfully deleted`,
    })
  } catch (error) {
    console.error("Error in DELETE /api/pickups/[id]:", error)
    return NextResponse.json(
      { error: `An unexpected error occurred: ${error instanceof Error ? error.message : String(error)}` },
      { status: 500 },
    )
  }
}
