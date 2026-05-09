import { NextRequest, NextResponse } from "next/server";

// Creates a Razorpay order — called by checkout before showing payment widget
export async function POST(req: NextRequest) {
  try {
    const { amount, currency = "GBP", receipt } = await req.json();

    const key    = process.env.RAZORPAY_KEY_ID;
    const secret = process.env.RAZORPAY_KEY_SECRET;

    if (!key || !secret || key === "your_razorpay_key_id") {
      // Payment not configured yet — return mock for development
      return NextResponse.json({ orderId: `mock_${Date.now()}`, amount, currency, mock: true });
    }

    const amountPaise = Math.round(amount * 100); // Razorpay uses smallest currency unit

    const res = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(`${key}:${secret}`).toString("base64")}`,
      },
      body: JSON.stringify({
        amount: amountPaise,
        currency,
        receipt: receipt ?? `rcpt_${Date.now()}`,
      }),
    });

    const data = await res.json();
    if (!res.ok) return NextResponse.json({ error: data.error?.description ?? "Payment setup failed" }, { status: 400 });

    return NextResponse.json({ orderId: data.id, amount: data.amount, currency: data.currency });
  } catch (e: any) {
    return NextResponse.json({ error: e.message ?? "Payment setup failed" }, { status: 500 });
  }
}
