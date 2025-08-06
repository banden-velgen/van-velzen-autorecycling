import { NextRequest, NextResponse } from 'next/server'
import pool from '@/lib/db/neon'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { license_plate, name, email, phone, message } = body

    // Validate required fields
    if (!license_plate || !name || !email || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Format license plate
    const formattedLicensePlate = license_plate.replace(/-/g, "").toUpperCase()

    // Insert quote request
    const { rows } = await pool.query(
      `INSERT INTO quote_requests (
        license_plate, 
        name, 
        email, 
        phone, 
        message, 
        status, 
        created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, NOW()) RETURNING *`,
      [
        formattedLicensePlate,
        name,
        email,
        phone,
        message || "",
        "new"
      ]
    )

    const quoteRequest = rows[0]

    // Try to create/update vehicle record
    try {
      await pool.query(
        `INSERT INTO vehicles (
          license_plate, 
          status, 
          created_at, 
          updated_at
        ) VALUES ($1, $2, NOW(), NOW())
        ON CONFLICT (license_plate) 
        DO UPDATE SET 
          status = $2,
          updated_at = NOW()`,
        [formattedLicensePlate, "pending"]
      )
    } catch (vehicleError) {
      console.error("Error creating/updating vehicle:", vehicleError)
      // Don't fail the request if vehicle creation fails
    }

    return NextResponse.json({
      success: true,
      data: quoteRequest
    })

  } catch (error) {
    console.error('Error creating quote request:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    let query = `
      SELECT * FROM quote_requests 
      ORDER BY created_at DESC 
      LIMIT $1 OFFSET $2
    `
    let params = [limit, offset]

    if (status) {
      query = `
        SELECT * FROM quote_requests 
        WHERE status = $1
        ORDER BY created_at DESC 
        LIMIT $2 OFFSET $3
      `
      params = [status, limit, offset]
    }

    const { rows } = await pool.query(query, params)

    return NextResponse.json({
      success: true,
      data: rows
    })

  } catch (error) {
    console.error('Error fetching quote requests:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 