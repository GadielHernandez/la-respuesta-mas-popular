import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = await createClient()

    // Test the connection by getting the current timestamp from the database
    const { data, error } = await supabase
      .from('_test')
      .select('*')
      .limit(1)

    // Note: This query will fail if no tables exist yet, which is expected
    // The important thing is that we can connect to Supabase

    if (error) {
      // If the error is about a missing table, the connection is working
      if (error.message.includes('does not exist') || error.message.includes('relation')) {
        return NextResponse.json({
          success: true,
          message: 'Supabase connection successful (no tables exist yet)',
          error: null
        })
      }

      return NextResponse.json({
        success: false,
        message: 'Supabase query failed',
        error: error.message
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'Supabase connection successful',
      error: null
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Failed to connect to Supabase',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
