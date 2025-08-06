import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

interface TableStatus {
  exists: boolean
  error: string | null
}

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

    // Check specific tables by trying to query them
    const requiredTables = [
      'quote_requests',
      'customers', 
      'vehicles',
      'pickups',
      'vehicle_documents',
      'activity_logs',
      'quotes'
    ]

    const tableStatus: Record<string, TableStatus> = {}

    for (const tableName of requiredTables) {
      try {
        const { data, error } = await supabase
          .from(tableName)
          .select('*')
          .limit(1)
        
        tableStatus[tableName] = {
          exists: !error,
          error: error ? error.message : null
        }
      } catch (err) {
        tableStatus[tableName] = {
          exists: false,
          error: err instanceof Error ? err.message : 'Unknown error'
        }
      }
    }

    const existingTables = Object.keys(tableStatus).filter(table => tableStatus[table].exists)
    const missingTables = Object.keys(tableStatus).filter(table => !tableStatus[table].exists)

    return NextResponse.json({
      success: true,
      message: "Database connection successful",
      supabaseUrl,
      connectionTest: "Success",
      tableStatus,
      requiredTables: {
        existing: existingTables,
        missing: missingTables,
        total: requiredTables.length
      },
      needsMigration: missingTables.length > 0,
      instructions: missingTables.length > 0 ? 
        "Run the migration script in Supabase SQL Editor" : 
        "All tables exist, database is properly configured"
    })

  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || "Not set",
    }, { status: 500 })
  }
} 