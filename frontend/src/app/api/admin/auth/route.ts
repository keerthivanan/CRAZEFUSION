import { NextRequest, NextResponse } from "next/server";

// Server-side admin auth — password never reaches the client bundle
export async function POST(req: NextRequest) {
  const { password } = await req.json();
  const correct = process.env.ADMIN_PASSWORD ?? "crazefusion2026";
  if (password === correct) return NextResponse.json({ ok: true });
  return NextResponse.json({ ok: false }, { status: 401 });
}
