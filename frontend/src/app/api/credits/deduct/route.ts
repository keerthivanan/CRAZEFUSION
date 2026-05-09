import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Atomically deducts credits using the use_credits Supabase function
// Returns { success: true } or { success: false, reason: "insufficient_credits" }
export async function POST(req: NextRequest) {
  try {
    const { userId, amount, type, description } = await req.json();
    if (!userId || !amount) return NextResponse.json({ success: false, reason: "invalid_request" }, { status: 400 });

    const { data, error } = await sb.rpc("use_credits", {
      p_user_id:    userId,
      p_amount:     amount,
      p_type:       type ?? "usage",
      p_description: description ?? "AI generation",
    });

    if (error) {
      console.error("[Credits] Deduct error:", error);
      return NextResponse.json({ success: false, reason: error.message }, { status: 500 });
    }

    if (!data) return NextResponse.json({ success: false, reason: "insufficient_credits" });
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ success: false, reason: e.message }, { status: 500 });
  }
}
