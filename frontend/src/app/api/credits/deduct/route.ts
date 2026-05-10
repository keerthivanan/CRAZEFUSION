import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) return NextResponse.json({ success: false, reason: "db_not_configured" });

    const sb = createClient(url, key);
    const { userId, amount, type, description } = await req.json();
    if (!userId || !amount) return NextResponse.json({ success: false, reason: "invalid_request" }, { status: 400 });

    const { data, error } = await sb.rpc("use_credits", {
      p_user_id:     userId,
      p_amount:      amount,
      p_type:        type ?? "usage",
      p_description: description ?? "AI generation",
    });

    if (error) return NextResponse.json({ success: false, reason: error.message }, { status: 500 });
    if (!data)  return NextResponse.json({ success: false, reason: "insufficient_credits" });
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ success: false, reason: e.message }, { status: 500 });
  }
}
