"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import Navbar from "@/components/navbar/Navbar";
import { useCart } from "@/context/CartContext";

const FO = "var(--font-poppins-var,'Poppins',sans-serif)";
const FE = "var(--font-epilogue-var,'Epilogue',sans-serif)";
const F  = "var(--font-space-var,'Space Grotesk',sans-serif)";

const steps = ["Delivery", "Payment", "Confirm"];

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [step, setStep]       = useState(0);
  const [form, setForm]       = useState({ name: "", email: "", phone: "", address: "", city: "", state: "", pincode: "" });
  const [payMethod, setPayMethod] = useState("upi");
  const [ordered, setOrdered] = useState(false);
  const orderIdRef            = useRef(`PK-${Math.random().toString(36).substring(2, 8).toUpperCase()}`);

  const shipping = subtotal >= 499 ? 0 : 49;
  const total    = subtotal + shipping;

  const handleField = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));
  const inputStyle = (val: string) => ({ width: "100%", padding: "14px 18px", border: `1.5px solid ${val ? "var(--c-text)" : "#ebebeb"}`, background: "var(--c-bg)", fontFamily: FO, fontSize: 13, color: "var(--c-text)", outline: "none", transition: "all 0.2s", boxSizing: "border-box" as const });
  const labelStyle = { fontFamily: FO, fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#999", marginBottom: 8, display: "block" };

  const handlePlaceOrder = () => {
    setOrdered(true);
    clearCart();
  };

  if (ordered) return (
    <div style={{ background: "var(--c-bg)", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 40 }}>
      <div style={{ textAlign: "center", maxWidth: 500 }}>
        <div style={{ width: 80, height: 80, background: "#16a34a", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, margin: "0 auto 24px", color: "#fff" }}>✓</div>
        <h1 style={{ fontFamily: FE, fontSize: 36, fontWeight: 900, color: "var(--c-text)", textTransform: "uppercase", marginBottom: 12 }}>Order Placed!</h1>
        <p style={{ fontFamily: F, fontSize: 14, color: "#666", lineHeight: 1.7, marginBottom: 8 }}>
          Thank you, <strong>{form.name || "Customer"}</strong>! Your order has been confirmed. You'll receive a confirmation email shortly.
        </p>
        <div style={{ background: "var(--c-bg-soft)", border: "1px solid var(--c-border)", padding: 20, margin: "24px 0", textAlign: "left" }}>
          <div style={{ fontFamily: F, fontSize: 11, color: "#aaa", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8 }}>Order ID</div>
          <div style={{ fontFamily: FE, fontSize: 22, fontWeight: 900, color: "var(--c-text)" }}>{orderIdRef.current}</div>
        </div>
        <p style={{ fontFamily: F, fontSize: 12, color: "#aaa", marginBottom: 28 }}>Expected delivery: 5–7 business days</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <Link href="/tracking"
            style={{ display: "inline-block", padding: "14px 28px", border: "1px solid #111", color: "var(--c-text)", fontFamily: F, fontSize: 12, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none" }}>
            Track Order
          </Link>
          <Link href="/"
            style={{ display: "inline-block", padding: "14px 28px", background: "#111", color: "#fff", fontFamily: F, fontSize: 12, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none" }}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );

  // Empty cart redirect hint
  if (items.length === 0 && !ordered) return (
    <div style={{ background: "var(--c-bg)", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, paddingTop: 64 }}>
      <Navbar />
      <div style={{ textAlign: "center" }}>
        <h2 style={{ fontFamily: FE, fontSize: 28, fontWeight: 900, color: "var(--c-text)", textTransform: "uppercase" }}>Your cart is empty</h2>
        <p style={{ fontFamily: F, fontSize: 14, color: "#aaa", marginBottom: 24 }}>Add products to your cart before checking out.</p>
        <Link href="/collection" style={{ display: "inline-block", padding: "14px 36px", background: "#111", color: "#fff", fontFamily: F, fontSize: 12, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none" }}>Shop Now</Link>
      </div>
    </div>
  );

  return (
    <div style={{ background: "var(--c-bg)", minHeight: "100vh" }}>
      <Navbar />
      <main style={{ paddingTop: 56 }}>
        {/* Steps Header */}
        <div style={{ background: "var(--c-bg-soft)", borderBottom: "1px solid var(--c-border)", padding: "20px 32px" }}>
          <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", gap: 0 }}>
            {steps.map((s, i) => (
              <div key={s} style={{ display: "flex", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: i <= step ? "#111" : "#e0e0e0", color: i <= step ? "#fff" : "#aaa", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FE, fontSize: 13, fontWeight: 900 }}>
                    {i < step ? "✓" : i + 1}
                  </div>
                  <span style={{ fontFamily: F, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: i <= step ? "#111" : "#aaa" }}>{s}</span>
                </div>
                {i < steps.length - 1 && <div style={{ width: 60, height: 1, background: i < step ? "#111" : "#e0e0e0", margin: "0 12px" }} />}
              </div>
            ))}
          </div>
        </div>

        <div className="checkout-layout" style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 32px", display: "grid", gridTemplateColumns: "1fr 360px", gap: 48 }}>
          {/* Form */}
          <div>
            {step === 0 && (
              <div>
                <h2 style={{ fontFamily: FE, fontSize: 24, fontWeight: 900, color: "var(--c-text)", textTransform: "uppercase", letterSpacing: "-0.02em", marginBottom: 28 }}>Delivery Details</h2>
                <div className="checkout-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                  {[["name", "Full Name"], ["email", "Email Address"]].map(([k, l]) => (
                    <div key={k}>
                      <label style={labelStyle}>{l}</label>
                      <input type={k === "email" ? "email" : "text"} placeholder={l} value={form[k as keyof typeof form]} onChange={e => handleField(k, e.target.value)} style={inputStyle(form[k as keyof typeof form])} />
                    </div>
                  ))}
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={labelStyle}>Phone Number</label>
                  <input type="tel" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={e => handleField("phone", e.target.value)} style={inputStyle(form.phone)} />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={labelStyle}>Delivery Address</label>
                  <input type="text" placeholder="House no., Street, Area" value={form.address} onChange={e => handleField("address", e.target.value)} style={inputStyle(form.address)} />
                </div>
                <div className="checkout-3col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 32 }}>
                  {[["city", "City"], ["state", "State"], ["pincode", "Pincode"]].map(([k, l]) => (
                    <div key={k}>
                      <label style={labelStyle}>{l}</label>
                      <input type="text" placeholder={l} value={form[k as keyof typeof form]} onChange={e => handleField(k, e.target.value)} style={inputStyle(form[k as keyof typeof form])} />
                    </div>
                  ))}
                </div>
                <button onClick={() => setStep(1)}
                  style={{ padding: "15px 40px", background: "#111", color: "#fff", fontFamily: F, fontSize: 12, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", border: "none", cursor: "pointer" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#333")}
                  onMouseLeave={e => (e.currentTarget.style.background = "#111")}>
                  Continue to Payment →
                </button>
              </div>
            )}

            {step === 1 && (
              <div>
                <h2 style={{ fontFamily: FE, fontSize: 24, fontWeight: 900, color: "var(--c-text)", textTransform: "uppercase", letterSpacing: "-0.02em", marginBottom: 28 }}>Payment Method</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
                  {[["upi", "UPI / Google Pay / PhonePe", "Instant · Most Popular"], ["card", "Credit / Debit Card", "Secured by Razorpay"], ["netbanking", "Net Banking", "All major banks supported"], ["cod", "Cash on Delivery", "+₹49 handling charge"]].map(([val, label, desc]) => (
                    <label key={val} onClick={() => setPayMethod(val)}
                      style={{ display: "flex", alignItems: "center", gap: 16, padding: "18px 20px", border: `1.5px solid ${payMethod === val ? "#111" : "#e0e0e0"}`, background: payMethod === val ? "#fafafa" : "#fff", cursor: "pointer", transition: "all 0.15s" }}>
                      <div style={{ width: 18, height: 18, borderRadius: "50%", border: `2px solid ${payMethod === val ? "#111" : "#ccc"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        {payMethod === val && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#111" }} />}
                      </div>
                      <div>
                        <div style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: "var(--c-text)" }}>{label}</div>
                        <div style={{ fontFamily: F, fontSize: 11, color: "#aaa", marginTop: 2 }}>{desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                  <button onClick={() => setStep(0)} style={{ padding: "15px 24px", background: "var(--c-bg)", color: "var(--c-text)", fontFamily: F, fontSize: 12, fontWeight: 700, border: "1px solid var(--c-border)", cursor: "pointer" }}>← Back</button>
                  <button onClick={() => setStep(2)} style={{ flex: 1, padding: "15px 24px", background: "#111", color: "#fff", fontFamily: F, fontSize: 12, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", border: "none", cursor: "pointer" }}>
                    Review Order →
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 style={{ fontFamily: FE, fontSize: 24, fontWeight: 900, color: "var(--c-text)", textTransform: "uppercase", letterSpacing: "-0.02em", marginBottom: 28 }}>Confirm Order</h2>
                {[["Deliver To", `${form.name || "—"}, ${form.address || "—"}, ${form.city || "—"} ${form.pincode || ""}`],
                  ["Payment", payMethod.toUpperCase()],
                  ["Expected", "5–7 Business Days"],
                  ["Items", `${items.reduce((s, i) => s + i.qty, 0)} items`],
                ].map(([label, val]) => (
                  <div key={label} style={{ display: "flex", gap: 20, padding: "16px 0", borderBottom: "1px solid var(--c-border)" }}>
                    <div style={{ fontFamily: F, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#aaa", width: 100, flexShrink: 0 }}>{label}</div>
                    <div style={{ fontFamily: F, fontSize: 13, color: "var(--c-text)" }}>{val}</div>
                  </div>
                ))}
                <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
                  <button onClick={() => setStep(1)} style={{ padding: "15px 24px", background: "var(--c-bg)", color: "var(--c-text)", fontFamily: F, fontSize: 12, fontWeight: 700, border: "1px solid var(--c-border)", cursor: "pointer" }}>← Back</button>
                  <button onClick={handlePlaceOrder}
                    style={{ flex: 1, padding: "15px 24px", background: "#e8a000", color: "#000", fontFamily: F, fontSize: 13, fontWeight: 900, letterSpacing: "0.12em", textTransform: "uppercase", border: "none", cursor: "pointer" }}>
                    Place Order · ₹{total}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div>
            <div style={{ border: "1px solid var(--c-border)", padding: 24, position: "sticky", top: 80 }}>
              <h3 style={{ fontFamily: FE, fontSize: 16, fontWeight: 900, color: "var(--c-text)", textTransform: "uppercase", marginBottom: 20, paddingBottom: 16, borderBottom: "1px solid var(--c-border)" }}>Order Summary</h3>
              <div style={{ maxHeight: 300, overflowY: "auto" }}>
                {items.map(item => (
                  <div key={`${item.id}-${item.size}-${item.finish}`} style={{ display: "flex", gap: 12, marginBottom: 16 }}>
                    <div style={{ width: 56, height: 56, flexShrink: 0, overflow: "hidden", background: "var(--c-bg-soft)" }}>
                      <img src={item.img} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: FE, fontSize: 11, fontWeight: 700, color: "var(--c-text)", textTransform: "uppercase", marginBottom: 2, lineHeight: 1.3 }}>{item.title}</div>
                      <div style={{ fontFamily: F, fontSize: 10, color: "#aaa" }}>{item.size} · {item.finish} · Qty: {item.qty}</div>
                    </div>
                    <div style={{ fontFamily: FE, fontSize: 14, fontWeight: 800, color: "var(--c-text)" }}>₹{item.price * item.qty}</div>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: "1px solid var(--c-border)", paddingTop: 16, marginTop: 8 }}>
                {[["Subtotal", `₹${subtotal}`], ["Shipping", shipping === 0 ? "FREE" : `₹${shipping}`], ["Total", `₹${total}`]].map(([label, val], i) => (
                  <div key={label} style={{ display: "flex", justifyContent: "space-between", marginBottom: i < 2 ? 8 : 0 }}>
                    <span style={{ fontFamily: F, fontSize: i === 2 ? 14 : 12, fontWeight: i === 2 ? 800 : 400, color: "#555" }}>{label}</span>
                    <span style={{ fontFamily: FE, fontSize: i === 2 ? 18 : 12, fontWeight: 900, color: i === 2 ? "#111" : val === "FREE" ? "#16a34a" : "#555" }}>{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <style>{`
        @media (max-width: 768px) {
          .checkout-layout  { grid-template-columns: 1fr !important; padding: 24px 16px !important; }
          .checkout-2col    { grid-template-columns: 1fr !important; }
          .checkout-3col    { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </div>
  );
}
