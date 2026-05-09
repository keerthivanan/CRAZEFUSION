import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const PACKS: Record<string, { credits: number; price: number }> = {
  starter: { credits: 30,  price: 2.99 },
  creator: { credits: 100, price: 7.99 },
  pro:     { credits: 250, price: 14.99 },
};

// Step 1: Create Razorpay order for credit purchase
export async function POST(req: NextRequest) {
  try {
    const { pack, userId } = await req.json();
    if (!pack || !PACKS[pack]) return NextResponse.json({ error: "Invalid pack" }, { status: 400 });
    if (!userId) return NextResponse.json({ error: "Must be logged in to buy credits" }, { status: 401 });

    const { price, credits } = PACKS[pack];
    const key    = process.env.RAZORPAY_KEY_ID;
    const secret = process.env.RAZORPAY_KEY_SECRET;

    if (!key || key === "your_razorpay_key_id") {
      // Dev mode — add credits directly
      await addCreditsToUser(userId, credits, "dev_mock");
      return NextResponse.json({ mock: true, credits, message: "Dev mode: credits added directly" });
    }

    const amountPaise = Math.round(price * 100);
    const res = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(`${key}:${secret}`).toString("base64")}`,
      },
      body: JSON.stringify({ amount: amountPaise, currency: "GBP", receipt: `credits_${pack}_${userId}_${Date.now()}`, notes: { pack, credits, userId } }),
    });

    const data = await res.json();
    if (!res.ok) return NextResponse.json({ error: data.error?.description ?? "Failed to create order" }, { status: 400 });

    return NextResponse.json({ razorpayOrderId: data.id, amount: data.amount, currency: data.currency, pack, credits });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// Step 2: After payment confirmed, add credits to user
export async function PUT(req: NextRequest) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, pack, userId } = await req.json();

    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (secret && secret !== "your_razorpay_key_secret") {
      const crypto = await import("crypto");
      const body     = `${razorpay_order_id}|${razorpay_payment_id}`;
      const expected = crypto.createHmac("sha256", secret).update(body).digest("hex");
      if (expected !== razorpay_signature) return NextResponse.json({ error: "Payment verification failed" }, { status: 400 });
    }

    const { credits } = PACKS[pack] ?? { credits: 0 };
    await addCreditsToUser(userId, credits, razorpay_payment_id);
    return NextResponse.json({ success: true, credits });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

async function addCreditsToUser(userId: string, credits: number, paymentId: string) {
  // Upsert: create row if not exists, otherwise increment
  const { data: existing } = await sb.from("user_credits").select("balance").eq("user_id", userId).single();
  const newBalance = (existing?.balance ?? 0) + credits;

  await sb.from("user_credits").upsert({ user_id: userId, balance: newBalance, updated_at: new Date().toISOString() }, { onConflict: "user_id" });
  await sb.from("credit_transactions").insert({ user_id: userId, amount: credits, type: "purchase", description: `Bought ${credits} credits`, stripe_payment_id: paymentId });
}
