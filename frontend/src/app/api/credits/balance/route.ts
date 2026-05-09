import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get("userId");
    if (!userId) return NextResponse.json({ balance: 0 });

    const { data, error } = await sb
      .from("user_credits")
      .select("balance")
      .eq("user_id", userId)
      .single();

    if (error || !data) return NextResponse.json({ balance: 0 });
    return NextResponse.json({ balance: data.balance });
  } catch {
    return NextResponse.json({ balance: 0 });
  }
}
