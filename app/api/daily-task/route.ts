// app/api/daily-task/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');

  // Check for the secret token in the Authorization header
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  // Your job logic here...
  console.log("Executing daily task...");

  return NextResponse.json({ success: true });
}