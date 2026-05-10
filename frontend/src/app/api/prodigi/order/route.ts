import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSku(size: string, finish: string): string {
  const mat = finish?.toLowerCase().includes("gloss") ? "GLOSS" : "MATTE";
  if (size?.includes("A3")) return `GLOBAL-FAP-A3-${mat}`;
  return `GLOBAL-FAP-A4-${mat}`;
}

export async function POST(req: NextRequest) {
  try {
    const { orderId, orderData, items } = await req.json();
    const apiKey = process.env.PRODIGI_API_KEY;

    if (!apiKey || apiKey === "your_prodigi_api_key") {
      console.log("[Prodigi] Not configured — skipping fulfillment for order", orderId);
      return NextResponse.json({ skipped: true, reason: "Prodigi not configured" });
    }

    const lineItems = (items as any[]).map(item => ({
      merchantReference: `item-${item.product_id ?? "ai"}`,
      sku:               getSku(item.size, item.finish),
      copies:            item.qty ?? 1,
      sizing:            "fillPrintArea",
      assets: [{ printArea: "default", url: item.img }],
    }));

    const body = {
      merchantReference: `order-${orderId}`,
      shippingMethod:    "Standard",
      recipient: {
        name:        orderData.customer_name,
        email:       orderData.customer_email,
        phoneNumber: orderData.customer_phone ?? "",
        address: {
          line1:           orderData.address,
          townOrCity:      orderData.city,
          postalOrZipCode: orderData.postcode,
          countryCode:     "GB",
        },
      },
      items: lineItems,
    };

    const res  = await fetch("https://api.prodigi.com/v4.0/Orders", {
      method:  "POST",
      headers: { "Content-Type": "application/json", "X-API-Key": apiKey },
      body:    JSON.stringify(body),
    });
    const data = await res.json();

    if (!res.ok) {
      console.error("[Prodigi] Order failed:", data);
      return NextResponse.json({ error: "Prodigi order failed", detail: data }, { status: 400 });
    }

    // Update order with Prodigi ID
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (url && key) {
      const sb = createClient(url, key);
      await sb.from("orders").update({ prodigi_order_id: data.order?.id, status: "in_production" }).eq("id", orderId);
    }

    return NextResponse.json({ prodigiOrderId: data.order?.id });
  } catch (e: any) {
    console.error("[Prodigi] Exception:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
