import { NextResponse } from 'next/server'

export async function GET() {
  console.log(`[${new Date()}] /health`)
  return NextResponse.json({
    status: 'OK',
  })
}

export async function HEAD() {
  console.log(`[${new Date()}] /health`)
  return NextResponse.json({
    status: 'OK',
  })
}
