"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import Newsletter from "@/components/footer/Newsletter";
import { useCart } from "@/context/CartContext";

const FO = "var(--font-poppins-var,'Poppins',sans-serif)";
const FE = "var(--font-epilogue-var,'Epilogue',sans-serif)";
const F  = "var(--font-space-var,'Space Grotesk',sans-serif)";

export default function CartPage() {
  const { items, updateQty, removeItem, subtotal } = useCart();
  const [promoCode, setPromoCode]   = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const shipping  = subtotal >= 499 ? 0 : 49;
  const total     = subtotal - discount + shipping;

  return (
    <div style={{ background: "var(--c-bg)", minHeight: "100vh" }}>
      <Navbar />
      <main style={{ paddingTop: 56 }}>
        {/* Header */}
        <div style={{ borderBottom: "1px solid var(--c-border)", padding: "28px 32px" }}>
          <div style={{ maxWidth: 1400, margin: "0 auto" }}>
            <div style={{ fontFamily: F, fontSize: 10, color: "#aaa", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 6 }}>
              <Link href="/" style={{ color: "#aaa", textDecoration: "none" }}>Home</Link>
              <span style={{ margin: "0 8px" }}>›</span>
              <span style={{ color: "var(--c-text)" }}>Cart</span>
            </div>
            <h1 style={{ fontFamily: FO, fontSize: "clamp(24px,4vw,42px)", fontWeight: 400, color: "var(--c-text)", textTransform: "uppercase", letterSpacing: "-0.03em", margin: 0 }}>
              Your Cart <span style={{ color: "#aaa", fontWeight: 400, fontSize: "0.5em" }}>({items.reduce((s, i) => s + i.qty, 0)} items)</span>
            </h1>
          </div>
        </div>

        <div className="cart-layout" style={{ maxWidth: 1400, margin: "0 auto", padding: "40px 32px", display: "grid", gridTemplateColumns: "1fr 380px", gap: 48 }}>
          {/* Cart Items */}
          <div>
            {/* Free delivery banner */}
            <div style={{ background: subtotal >= 499 ? "#111" : "#f9f9f9", color: subtotal >= 499 ? "#fff" : "#555", padding: "12px 20px", marginBottom: 24, display: "flex", alignItems: "center", gap: 10, border: `1px solid ${subtotal >= 499 ? "#111" : "#e0e0e0"}` }}>
              <span style={{ fontFamily: F, fontSize: 12, fontWeight: 600 }}>
                {subtotal >= 499
                  ? "You qualify for FREE delivery on prepaid!"
                  : `Add ₹${499 - subtotal} more for free delivery`}
              </span>
            </div>

            {items.length === 0 ? (
              <div style={{ textAlign: "center", padding: "80px 20px" }}>
                <h2 style={{ fontFamily: FE, fontSize: 28, fontWeight: 400, color: "var(--c-text)", textTransform: "uppercase", marginBottom: 8 }}>Your cart is empty</h2>
                <p style={{ fontFamily: F, fontSize: 14, color: "#aaa", marginBottom: 24 }}>Browse our collection and find something you love.</p>
                <Link href="/collection"
                  style={{ display: "inline-block", padding: "14px 36px", background: "#111", color: "#fff", fontFamily: F, fontSize: 12, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", borderRadius: 8 }}>
                  Shop Now
                </Link>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column" }}>
                {items.map(item => (
                  <div key={`${item.id}-${item.size}-${item.finish}`}
                    className="cart-item-row"
                    style={{ display: "grid", gridTemplateColumns: "100px 1fr auto", gap: 20, padding: "24px 0", borderBottom: "1px solid var(--c-border)", alignItems: "start" }}>
                    <Link href={`/product/${item.id}`}>
                      <div style={{ aspectRatio: "1/1", overflow: "hidden", background: "var(--c-bg-soft)" }}>
                        <img src={item.img} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                    </Link>
                    <div>
                      <div style={{ fontFamily: FE, fontSize: 14, fontWeight: 500, color: "var(--c-text)", textTransform: "uppercase", marginBottom: 4, lineHeight: 1.2 }}>{item.title}</div>
                      <div style={{ fontFamily: F, fontSize: 12, color: "#aaa", marginBottom: 12 }}>
                        {item.sub} · Size: {item.size} · {item.finish}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--c-border)" }}>
                          <button onClick={() => updateQty(item.id, item.size, item.finish, -1)}
                            style={{ width: 34, height: 34, background: "var(--c-bg)", border: "none", fontSize: 18, cursor: "pointer", color: "var(--c-text)" }}>−</button>
                          <span style={{ width: 34, textAlign: "center", fontFamily: FE, fontSize: 14, fontWeight: 700 }}>{item.qty}</span>
                          <button onClick={() => updateQty(item.id, item.size, item.finish, +1)}
                            style={{ width: 34, height: 34, background: "var(--c-bg)", border: "none", fontSize: 18, cursor: "pointer", color: "var(--c-text)" }}>+</button>
                        </div>
                        <button onClick={() => removeItem(item.id, item.size, item.finish)}
                          style={{ background: "none", border: "none", fontFamily: F, fontSize: 11, color: "#dc2626", cursor: "pointer", textDecoration: "underline" }}>
                          Remove
                        </button>
                      </div>
                    </div>
                    <div style={{ fontFamily: FE, fontSize: 18, fontWeight: 400, color: "var(--c-text)", textAlign: "right" }}>
                      ₹{item.price * item.qty}
                      {item.price < item.original && (
                        <div style={{ fontFamily: F, fontSize: 11, color: "#bbb", textDecoration: "line-through", fontWeight: 400 }}>₹{item.original * item.qty}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div style={{ marginTop: 24 }}>
              <Link href="/collection" style={{ fontFamily: F, fontSize: 12, color: "#555", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, letterSpacing: "0.05em" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#111")}
                onMouseLeave={e => (e.currentTarget.style.color = "#555")}>
                ← Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div style={{ border: "1px solid var(--c-border)", padding: 28, position: "sticky", top: 80 }}>
              <h2 style={{ fontFamily: FE, fontSize: 20, fontWeight: 400, color: "var(--c-text)", textTransform: "uppercase", letterSpacing: "-0.01em", marginBottom: 24, paddingBottom: 20, borderBottom: "1px solid var(--c-border)" }}>Order Summary</h2>

              <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 24 }}>
                {[["Subtotal", `₹${subtotal}`], ["Discount", discount > 0 ? `-₹${discount}` : "—"], ["Shipping", shipping === 0 ? "FREE" : `₹${shipping}`]].map(([label, val]) => (
                  <div key={label} style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontFamily: F, fontSize: 13, color: "#666" }}>{label}</span>
                    <span style={{ fontFamily: F, fontSize: 13, color: (val as string).startsWith("-") ? "#dc2626" : val === "FREE" ? "#16a34a" : "#111", fontWeight: 700 }}>{val}</span>
                  </div>
                ))}
              </div>

              {/* Promo */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: "flex" }}>
                  <input type="text" placeholder="Promo code" value={promoCode} onChange={e => setPromoCode(e.target.value)}
                    style={{ flex: 1, padding: "10px 14px", border: "1px solid var(--c-border)", borderRight: "none", fontFamily: F, fontSize: 12, color: "var(--c-text)", outline: "none" }} />
                  <button onClick={() => { if (promoCode.trim()) setPromoApplied(true); }}
                    style={{ padding: "10px 16px", background: "#111", color: "#fff", fontFamily: F, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", border: "none", cursor: "pointer", borderRadius: "0 8px 8px 0" }}>
                    Apply
                  </button>
                </div>
                {promoApplied && <div style={{ fontFamily: F, fontSize: 11, color: "#16a34a", marginTop: 6 }}>✓ 10% discount applied!</div>}
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 20, borderTop: "1px solid var(--c-border)", marginBottom: 20 }}>
                <span style={{ fontFamily: FE, fontSize: 18, fontWeight: 400, color: "var(--c-text)", textTransform: "uppercase" }}>Total</span>
                <span style={{ fontFamily: FE, fontSize: 22, fontWeight: 400, color: "var(--c-text)" }}>₹{total}</span>
              </div>

              <Link href="/checkout"
                style={{ display: "block", width: "100%", padding: "16px 0", background: "#111", color: "#fff", textAlign: "center", fontFamily: FO, fontSize: 13, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", transition: "background 0.2s, box-shadow 0.2s", marginBottom: 12, borderRadius: 8 }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "#333"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 18px rgba(160,160,160,0.25)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "#111"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none"; }}>
                Proceed to Checkout →
              </Link>

              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 16 }}>
                {["Secured by Razorpay", "Free delivery on prepaid", "7-day easy returns"].map((text) => (
                  <div key={text} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontFamily: F, fontSize: 11, color: "#888" }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Newsletter />
      <Footer />
      <style>{`
        @media (max-width: 768px) {
          .cart-layout { grid-template-columns: 1fr !important; padding: 24px 16px !important; }
          .cart-item-row { grid-template-columns: 80px 1fr !important; }
          .cart-item-row > div:last-child { grid-column: 2; text-align: left !important; }
        }
      `}</style>
    </div>
  );
}
