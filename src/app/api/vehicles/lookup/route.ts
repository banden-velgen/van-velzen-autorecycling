import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const licensePlate = searchParams.get("license_plate")

    if (!licensePlate) {
      return NextResponse.json({ error: "Kenteken is vereist" }, { status: 400 })
    }

    const supabase = createClient()

    // Format the license plate (remove spaces, convert to uppercase)
    const formattedLicensePlate = licensePlate.replace(/\s+/g, "").toUpperCase()

    // First, try to find an exact match
    const { data: exactMatch, error: exactMatchError } = await supabase
      .from("vehicles")
      .select("id, license_plate, make, model")
      .eq("license_plate", formattedLicensePlate)
      .single()

    if (exactMatch) {
      return NextResponse.json({
        exact: true,
        vehicle: exactMatch,
      })
    }

    // If no exact match, find similar license plates
    const { data: suggestions, error: suggestionsError } = await supabase
      .from("vehicles")
      .select("id, license_plate")
      .ilike("license_plate", `%${formattedLicensePlate}%`)
      .limit(5)

    if (suggestionsError) {
      console.error("Error finding license plate suggestions:", suggestionsError)
      return NextResponse.json({ error: "Fout bij het zoeken naar kenteken suggesties" }, { status: 500 })
    }

    return NextResponse.json({
      exact: false,
      suggestions: suggestions || [],
    })
  } catch (error) {
    console.error("Error in license plate lookup:", error)
    return NextResponse.json({ error: "Er is een fout opgetreden bij het opzoeken van het kenteken" }, { status: 500 })
  }
}
