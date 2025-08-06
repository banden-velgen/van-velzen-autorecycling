import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    // Check if environment variables are set
    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json({
        success: false,
        error: "Missing environment variables",
        supabaseUrl: supabaseUrl ? "Set" : "Missing",
        supabaseAnonKey: supabaseAnonKey ? "Set" : "Missing",
      }, { status: 500 })
    }

    // Try to create Supabase client
    const supabase = await createClient()

    // Test basic connection
    const { data, error } = await supabase.from("quote_requests").select("count", { count: "exact", head: true })

    if (error) {
      return NextResponse.json({
        success: false,
        error: error.message,
        supabaseUrl,
        connectionTest: "Failed",
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: "Supabase connection successful",
      supabaseUrl,
      connectionTest: "Success",
      tableCount: data?.length || 0,
    })

  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || "Not set",
    }, { status: 500 })
  }
} 