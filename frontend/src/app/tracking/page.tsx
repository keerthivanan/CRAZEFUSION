"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

const FE = "var(--font-epilogue-var,'Epilogue',sans-serif)";
const F  = "var(--font-space-var,'Space Grotesk',sans-serif)";

const mockOrder = {
  id: "PK-A8X2C1",
  status: "In Transit",
  progress: 3,
  product: "DEFENDER | Built For No Roads | 8 Panel Split Wall Set",
  img: "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=120&h=120&fit=crop&q=80",
  price: 499,
  placed: "28 Apr 2026",
  expected: "3 May 2026",
  carrier: "Delhivery",
  awb: "AWB1234567890",
  steps: [
    { label: "Order Placed",        desc: "Your order was confirmed",                       done: true,  date: "28 Apr, 10:12 AM" },
    { label: "Printing Started",    desc: "Your poster is being printed",                   done: true,  date: "28 Apr, 4:30 PM"  },
    { label: "Quality Check",       desc: "Poster inspected and approved",                  done: true,  date: "29 Apr, 9:00 AM"  },
    { label: "Shipped",             desc: "Handed over to Delhivery courier",               done: false, date: "Expected: 29 Apr"  },
    { label: "Out for Delivery",    desc: "Your poster is out for delivery",                done: false, date: "Expected: 3 May"   },
    { label: "Delivered",           desc: "Enjoy your poster! Leave us a review.",         done: false, date: "Expected: 3 May"   },
  ],
};

export default function TrackingPage() {
  const [orderId, setOrderId] = useState("");
  const [tracked, setTracked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleTrack = () => {
    if (!orderId && !tracked) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setTracked(true); }, 1000);
  };

  return (
    <div style={{ background: "var(--c-bg)", minHeight: "100vh" }}>
      <Navbar />
      <main style={{ paddingTop: 64 }}>
        {/* Header */}
        <div style={{ background: "#f9f9f9", borderBottom: "1px solid #f0f0f0", padding: "56px 32px", textAlign: "center" }}>
          <div style={{ fontFamily: F, fontSize: 10, fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", color: "#e8a000", marginBottom: 12 }}>Real-Time Updates</div>
          <h1 style={{ fontFamily: FE, fontSize: "clamp(28px,5vw,56px)", fontWeight: 900, color: "#111", textTransform: "uppercase", letterSpacing: "-0.04em", marginBottom: 12 }}>Track Your Order</h1>
          <p style={{ fontFamily: F, fontSize: 14, color: "#888", maxWidth: 380, margin: "0 auto 32px" }}>Enter your Order ID to see real-time shipping updates.</p>

          {/* Search Bar */}
          <div style={{ display: "flex", maxWidth: 480, margin: "0 auto", gap: 0 }}>
            <input type="text" placeholder="Enter Order ID (e.g. PK-A8X2C1)" value={orderId} onChange={e => setOrderId(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleTrack()}
              style={{ flex: 1, padding: "14px 20px", border: "1.5px solid #e0e0e0", borderRight: "none", fontFamily: F, fontSize: 13, color: "#111", outline: "none", background: "var(--c-bg)" }} />
            <button onClick={handleTrack}
              style={{ padding: "14px 28px", background: "#111", color: "#fff", fontFamily: F, fontSize: 12, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", border: "none", cursor: "pointer", transition: "background 0.2s" }}
              onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = "#333"}
              onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = "#111"}>
              {loading ? "..." : "Track"}
            </button>
          </div>
          <div style={{ fontFamily: F, fontSize: 11, color: "#ccc", marginTop: 12 }}>
            Try: <button onClick={() => { setOrderId("PK-A8X2C1"); setTracked(true); }}
              style={{ background: "none", border: "none", fontFamily: F, fontSize: 11, color: "#aaa", cursor: "pointer", textDecoration: "underline" }}>
              PK-A8X2C1
            </button>
          </div>
        </div>

        {/* Tracking Result */}
        {tracked && (
          <div style={{ maxWidth: 900, margin: "48px auto", padding: "0 32px" }}>
            {/* Order Info Card */}
            <div style={{ border: "1px solid #f0f0f0", marginBottom: 32, overflow: "hidden" }}>
              <div style={{ background: "#111", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                <div>
                  <div style={{ fontFamily: F, fontSize: 10, color: "#666", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 4 }}>Order ID</div>
                  <div style={{ fontFamily: FE, fontSize: 20, fontWeight: 900, color: "#fff" }}>{mockOrder.id}</div>
                </div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#e8a000", padding: "8px 16px" }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#000", display: "inline-block", animation: "scrollPulse 1.5s ease infinite" }} />
                  <span style={{ fontFamily: F, fontSize: 12, fontWeight: 800, letterSpacing: "0.1em", color: "#000", textTransform: "uppercase" }}>{mockOrder.status}</span>
                </div>
              </div>
              <div style={{ padding: "24px", display: "flex", gap: 20, alignItems: "flex-start", flexWrap: "wrap" }}>
                <div style={{ width: 80, height: 80, flexShrink: 0, overflow: "hidden", background: "var(--c-bg-soft)" }}>
                  <img src={mockOrder.img} alt={mockOrder.product} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: FE, fontSize: 14, fontWeight: 800, color: "#111", textTransform: "uppercase", lineHeight: 1.3, marginBottom: 8 }}>{mockOrder.product}</div>
                  <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                    {[["Placed", mockOrder.placed], ["Expected", mockOrder.expected], ["Carrier", mockOrder.carrier], ["AWB", mockOrder.awb]].map(([label, val]) => (
                      <div key={label as string}>
                        <div style={{ fontFamily: F, fontSize: 10, color: "#aaa", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 2 }}>{label as string}</div>
                        <div style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: "#111" }}>{val as string}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontFamily: F, fontSize: 11, color: "#aaa" }}>Order Total</div>
                  <div style={{ fontFamily: FE, fontSize: 24, fontWeight: 900, color: "#111" }}>₹{mockOrder.price}</div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div style={{ border: "1px solid #f0f0f0", padding: "32px", marginBottom: 32 }}>
              <h2 style={{ fontFamily: FE, fontSize: 20, fontWeight: 900, color: "#111", textTransform: "uppercase", letterSpacing: "-0.01em", marginBottom: 32 }}>Shipment Timeline</h2>
              <div style={{ position: "relative", paddingLeft: 40 }}>
                {/* Vertical line */}
                <div style={{ position: "absolute", left: 12, top: 0, bottom: 0, width: 2, background: "#f0f0f0" }} />

                {mockOrder.steps.map((step, i) => (
                  <div key={i} style={{ position: "relative", paddingBottom: i < mockOrder.steps.length - 1 ? 28 : 0 }}>
                    {/* Dot */}
                    <div style={{ position: "absolute", left: -32, top: 2, width: 20, height: 20, borderRadius: "50%", background: step.done ? "#111" : "#fff", border: `2px solid ${step.done ? "#111" : "#e0e0e0"}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {step.done && <div style={{ color: "#fff", fontSize: 10, fontWeight: 900 }}>✓</div>}
                    </div>
                    <div style={{ opacity: step.done ? 1 : 0.4 }}>
                      <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
                        <div style={{ fontFamily: FE, fontSize: 15, fontWeight: 800, color: "#111", textTransform: "uppercase" }}>{step.label}</div>
                        <div style={{ fontFamily: F, fontSize: 11, color: step.done ? "#e8a000" : "#aaa" }}>{step.date}</div>
                      </div>
                      <div style={{ fontFamily: F, fontSize: 13, color: "#666", marginTop: 2 }}>{step.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Help */}
            <div style={{ background: "#f9f9f9", border: "1px solid #f0f0f0", padding: "24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
              <div>
                <div style={{ fontFamily: FE, fontSize: 16, fontWeight: 800, color: "#111", marginBottom: 4 }}>Need Help?</div>
                <div style={{ fontFamily: F, fontSize: 13, color: "#666" }}>Contact us at <strong>support@crazefusion.in</strong> with your Order ID.</div>
              </div>
              <a href="mailto:support@crazefusion.in"
                style={{ padding: "12px 24px", background: "#111", color: "#fff", fontFamily: F, fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", transition: "background 0.2s" }}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.background = "#333"}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.background = "#111"}>
                Contact Support
              </a>
            </div>
          </div>
        )}

        {/* Empty state if not tracked */}
        {!tracked && (
          <div style={{ maxWidth: 1400, margin: "0 auto", padding: "64px 32px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 20 }}>
            {[["01", "Order Confirmed", "Get instant email confirmation with your order details."],
              ["02", "Printing & QC", "Your poster is printed and quality-checked by our team."],
              ["03", "Shipped Fast", "Handed to courier within 24 hours of order placement."],
              ["04", "5–7 Day Delivery", "Delivered to your doorstep across India."]
            ].map(([num, title, desc]) => (
              <div key={title as string} style={{ padding: 24, border: "1px solid #f0f0f0", textAlign: "center" }}>
                <div style={{ fontFamily: FE, fontSize: 28, fontWeight: 900, color: "#e8a000", marginBottom: 12 }}>{num}</div>
                <div style={{ fontFamily: FE, fontSize: 16, fontWeight: 800, color: "#111", textTransform: "uppercase", marginBottom: 8 }}>{title as string}</div>
                <div style={{ fontFamily: F, fontSize: 13, color: "#888", lineHeight: 1.6 }}>{desc as string}</div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
