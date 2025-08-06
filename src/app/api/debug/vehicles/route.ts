import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    const supabase = createClient()

    // Get a sample of vehicles from the database
    const { data: vehicles, error } = await supabase
      .from("vehicles")
      .select("id, license_plate, make, model, customer_id")
      .limit(10)

    if (error) {
      console.error("Error fetching vehicles:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Get the table structure
    const { data: tableInfo, error: tableError } = await supabase.rpc("get_table_info", { table_name: "vehicles" })

    if (tableError) {
      console.error("Error fetching table info:", tableError)
    }

    return NextResponse.json({
      vehicles,
      tableInfo: tableInfo || [],
      count: vehicles?.length || 0,
    })
  } catch (error) {
    console.error("Debug API error:", error)
    return NextResponse.json({ error: error instanceof Error ? error.message : String(error) }, { status: 500 })
  }
}
