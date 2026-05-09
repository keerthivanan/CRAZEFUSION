import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { orderId, orderData, items } = await req.json();
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey || apiKey === "your_resend_api_key") {
      console.log("[Email] Not configured — skipping confirmation for order", orderId);
      return NextResponse.json({ skipped: true });
    }

    const itemsList = items.map((i: any) =>
      `<tr><td style="padding:8px 0;border-bottom:1px solid #f0f0f0">${i.title}</td><td style="padding:8px 0;border-bottom:1px solid #f0f0f0;text-align:right">£${(i.price * (i.qty ?? 1)).toFixed(2)}</td></tr>`
    ).join("");

    const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Order Confirmed</title></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:'Helvetica Neue',Arial,sans-serif">
  <div style="max-width:560px;margin:40px auto;background:#fff;border-radius:12px;overflow:hidden">
    <div style="background:#0a0a0a;padding:32px;text-align:center">
      <img src="${process.env.NEXT_PUBLIC_APP_URL}/logo.png" alt="CrazeFusion" style="height:48px" />
    </div>
    <div style="padding:40px 36px">
      <h1 style="font-size:24px;font-weight:700;color:#111;margin:0 0 8px;letter-spacing:-0.02em">Order Confirmed</h1>
      <p style="color:#888;font-size:14px;margin:0 0 32px">Order #${orderId} · We'll start printing right away.</p>

      <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
        ${itemsList}
      </table>

      <div style="border-top:2px solid #111;padding-top:16px;display:flex;justify-content:space-between">
        <span style="font-weight:700;font-size:15px">Total Paid</span>
        <span style="font-weight:700;font-size:15px">£${orderData.total?.toFixed(2)}</span>
      </div>

      <div style="margin-top:32px;padding:20px;background:#f9f9f9;border-radius:8px">
        <p style="margin:0 0 6px;font-size:13px;color:#555"><strong>Delivering to:</strong></p>
        <p style="margin:0;font-size:13px;color:#777">${orderData.customer_name}<br>${orderData.address}, ${orderData.city} ${orderData.postcode}</p>
      </div>

      <p style="margin:24px 0 0;font-size:13px;color:#aaa">Expected delivery: 2–4 working days via Royal Mail Tracked. You'll receive a tracking number once dispatched.</p>
    </div>
    <div style="background:#0a0a0a;padding:20px 36px;text-align:center">
      <p style="margin:0;font-size:11px;color:#555;letter-spacing:0.08em;text-transform:uppercase">CrazeFusion — Premium UK Wall Art</p>
    </div>
  </div>
</body>
</html>`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        from:    "orders@crazefusion.com",
        to:      orderData.customer_email,
        subject: `Order Confirmed — #${orderId}`,
        html,
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      console.error("[Email] Send failed:", err);
    }

    return NextResponse.json({ sent: res.ok });
  } catch (e: any) {
    console.error("[Email] Exception:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
