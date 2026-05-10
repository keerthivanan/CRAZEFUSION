import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) return NextResponse.json({ error: "Database not configured" }, { status: 503 });

    const sb = createClient(url, key);
    const { orderData, items } = await req.json();

    const { data: order, error: orderErr } = await sb.from("orders").insert({
      customer_name:     orderData.customer_name,
      customer_email:    orderData.customer_email,
      customer_phone:    orderData.customer_phone ?? "",
      address:           orderData.address,
      city:              orderData.city,
      postcode:          orderData.postcode,
      pay_method:        orderData.pay_method,
      subtotal:          orderData.subtotal,
      shipping:          orderData.shipping,
      total:             orderData.total,
      status:            "confirmed",
      stripe_payment_id: orderData.stripe_payment_id ?? null,
    }).select("id").single();

    if (orderErr || !order) {
      console.error("Order save error:", orderErr);
      return NextResponse.json({ error: orderErr?.message ?? "Failed to save order" }, { status: 500 });
    }

    const orderId  = order.id;
    const itemRows = (items as any[]).map(i => ({
      order_id:   orderId,
      product_id: (typeof i.id === "string" && i.id === "ai") ? null : (Number(i.product_id ?? i.id) || null),
      title:      i.title,
      img:        i.img ?? null,
      size:       i.size ?? "A4",
      finish:     i.finish ?? "Matte",
      qty:        i.qty ?? 1,
      price:      i.price,
    }));

    const { error: itemsErr } = await sb.from("order_items").insert(itemRows);
    if (itemsErr) {
      console.error("Order items error:", itemsErr);
      return NextResponse.json({ error: "Failed to save order items" }, { status: 500 });
    }

    // Credit partner 30% for partner designs
    for (const item of itemRows) {
      if (!item.product_id || item.product_id < 10000) continue;
      const { data: design } = await sb.from("partner_designs").select("partner_id, sales, earnings").eq("id", item.product_id).single();
      if (!design?.partner_id) continue;
      const commission  = parseFloat((item.price * 0.3 * item.qty).toFixed(2));
      await sb.from("partner_sales").insert({ partner_id: design.partner_id, order_id: orderId, product_id: item.product_id, amount: commission });
      await sb.from("partner_designs").update({ sales: (design.sales ?? 0) + item.qty, earnings: (design.earnings ?? 0) + commission }).eq("id", item.product_id);
    }

    return NextResponse.json({ orderId });
  } catch (e: any) {
    console.error("Save order exception:", e);
    return NextResponse.json({ error: e.message ?? "Server error" }, { status: 500 });
  }
}
