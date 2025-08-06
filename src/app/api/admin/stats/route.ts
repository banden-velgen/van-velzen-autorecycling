import { NextRequest, NextResponse } from 'next/server'
import pool from '@/lib/db/neon'

export async function GET(request: NextRequest) {
  try {
    // Get total quotes
    const totalQuotesResult = await pool.query('SELECT COUNT(*) as count FROM quote_requests')
    const totalQuotes = parseInt(totalQuotesResult.rows[0].count)

    // Get pending quotes
    const pendingQuotesResult = await pool.query(
      'SELECT COUNT(*) as count FROM quote_requests WHERE status = $1',
      ['pending']
    )
    const pendingQuotes = parseInt(pendingQuotesResult.rows[0].count)

    // Get completed quotes
    const completedQuotesResult = await pool.query(
      'SELECT COUNT(*) as count FROM quote_requests WHERE status = $1',
      ['completed']
    )
    const completedQuotes = parseInt(completedQuotesResult.rows[0].count)

    // Calculate total revenue (placeholder - you can implement actual revenue tracking)
    const totalRevenue = completedQuotes * 500 // Example: €500 per completed quote

    return NextResponse.json({
      totalQuotes,
      pendingQuotes,
      completedQuotes,
      totalRevenue
    })

  } catch (error) {
    console.error('Error fetching admin stats:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 