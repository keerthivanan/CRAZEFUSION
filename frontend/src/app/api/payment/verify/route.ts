import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

// Verifies Razorpay payment signature — called after user completes payment
// On success: saves order to Supabase, triggers Prodigi, sends email
export async function POST(req: NextRequest) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderData, items } = await req.json();

    const secret = process.env.RAZORPAY_KEY_SECRET;

    // Skip verification in mock/dev mode
    if (!secret || secret === "your_razorpay_key_secret" || razorpay_order_id?.startsWith("mock_")) {
      return await finaliseOrder(orderData, items, razorpay_payment_id ?? "mock_payment");
    }

    // Verify Razorpay signature
    const body      = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expected  = crypto.createHmac("sha256", secret).update(body).digest("hex");
    if (expected !== razorpay_signature) {
      return NextResponse.json({ error: "Payment verification failed" }, { status: 400 });
    }

    return await finaliseOrder(orderData, items, razorpay_payment_id);
  } catch (e: any) {
    return NextResponse.json({ error: e.message ?? "Verification failed" }, { status: 500 });
  }
}

async function finaliseOrder(orderData: any, items: any[], paymentId: string) {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  // 1. Save order to Supabase
  const orderRes  = await fetch(`${base}/api/orders/save`, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify({ orderData: { ...orderData, stripe_payment_id: paymentId }, items }),
  });
  const { orderId, error } = await orderRes.json();
  if (error || !orderId) return NextResponse.json({ error: "Failed to save order" }, { status: 500 });

  // 2. Send to Prodigi for fulfillment (non-blocking)
  fetch(`${base}/api/prodigi/order`, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify({ orderId, orderData, items }),
  }).catch(console.error);

  // 3. Send confirmation email (non-blocking)
  fetch(`${base}/api/email/order`, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify({ orderId, orderData, items }),
  }).catch(console.error);

  return NextResponse.json({ orderId, success: true });
}
