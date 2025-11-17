import { NextRequest, NextResponse } from 'next/server'

// This is optional - Payload already handles /api routes
// Only create this if you need custom API endpoints

export async function GET(request: NextRequest) {
  return NextResponse.json({ message: 'Custom API route' })
}
