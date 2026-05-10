import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(req: NextRequest) {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) return NextResponse.json({ balance: 0 });

    const sb     = createClient(url, key);
    const userId = req.nextUrl.searchParams.get("userId");
    if (!userId) return NextResponse.json({ balance: 0 });

    const { data } = await sb.from("user_credits").select("balance").eq("user_id", userId).single();
    return NextResponse.json({ balance: data?.balance ?? 0 });
  } catch {
    return NextResponse.json({ balance: 0 });
  }
}
