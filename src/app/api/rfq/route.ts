import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.json();

  // Wire this up to your existing inquiry handling (email, CRM, etc.).
  console.log("RFQ inquiry received:", data);

  return NextResponse.json({ ok: true });
}
