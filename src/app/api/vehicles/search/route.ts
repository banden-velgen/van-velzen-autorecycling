import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q")

    if (!query) {
      return NextResponse.json({ vehicles: [] })
    }

    const supabase = createClient()

    console.log("Searching for vehicles with query:", query)

    // Search for vehicles by license plate (case insensitive)
    const { data: vehicles, error } = await supabase
      .from("vehicles")
      .select("id, license_plate, make, model")
      .ilike("license_plate", `%${query}%`)
      .order("license_plate")
      .limit(10)

    if (error) {
      console.error("Error searching vehicles:", error)
      return NextResponse.json({ error: "Fout bij het zoeken naar voertuigen" }, { status: 500 })
    }

    console.log("Found vehicles:", vehicles)

    return NextResponse.json({ vehicles: vehicles || [] })
  } catch (error) {
    console.error("Error in vehicle search:", error)
    return NextResponse.json({ error: "Er is een fout opgetreden bij het zoeken naar voertuigen" }, { status: 500 })
  }
}
