import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    const supabase = createClient()

    console.log("Fetching all vehicles")

    const { data: vehicles, error } = await supabase
      .from("vehicles")
      .select("id, license_plate, make, model, customer_id")
      .order("license_plate")

    if (error) {
      console.error("Error fetching vehicles:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log(`Found ${vehicles?.length || 0} vehicles`)

    return NextResponse.json({ vehicles: vehicles || [] })
  } catch (error) {
    console.error("Error in vehicle list API:", error)
    return NextResponse.json({ error: error instanceof Error ? error.message : String(error) }, { status: 500 })
  }
}
