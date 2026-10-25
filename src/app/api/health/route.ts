import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json(
    {
      status: 'ok',
      service: 'portfolio',
      uptime: Number(process.uptime().toFixed(1)),
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
    },
    {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    }
  );
}
