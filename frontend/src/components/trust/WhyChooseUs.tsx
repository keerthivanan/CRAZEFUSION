"use client";
import AnimatedContent from "@/components/reactbits/AnimatedContent";

const features = [
  { icon: "01", title: "Premium Quality", desc: "HD printing on 200GSM art paper. Vibrant colours that last years." },
  { icon: "02", title: "Custom Creations", desc: "Upload any photo. Single, 3-piece, 4-piece, 8-panel layouts." },
  { icon: "03", title: "Fast Delivery", desc: "Shipped within 24hrs. Delivered in 5–7 days pan-India." },
  { icon: "04", title: "Free Shipping", desc: "Zero charges on all prepaid orders. No hidden fees." },
  { icon: "05", title: "Secure Payments", desc: "Razorpay secured. UPI, cards, netbanking, COD accepted." },
  { icon: "06", title: "Easy Returns", desc: "7-day hassle-free return policy. No questions asked." },
];

const F  = "var(--font-space-var,'Space Grotesk',sans-serif)";
const FE = "var(--font-epilogue-var,'Epilogue',sans-serif)";

export default function WhyChooseUs() {
  return (
    <section style={{ padding: "80px 0", background: "#f7f7f7", borderTop: "1px solid #f0f0f0" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 32px" }}>
        <AnimatedContent distance={24} duration={0.55}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontFamily: F, fontSize: 10, fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#999", marginBottom: 10 }}>
              Why thousands love us
            </div>
            <h2 style={{ fontFamily: FE, fontSize: "clamp(24px,3.5vw,42px)", fontWeight: 900, letterSpacing: "-0.03em", color: "#111", textTransform: "uppercase", margin: 0 }}>
              The PosterKing <span style={{ color: "#e8a000" }}>Difference</span>
            </h2>
          </div>
        </AnimatedContent>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 1, background: "#e8e8e8", border: "1px solid #e8e8e8" }}>
          {features.map((f, i) => (
            <AnimatedContent key={f.title} distance={16} delay={i * 0.07} duration={0.5} threshold={0.05}>
              <div style={{ background: "#fff", padding: "32px 28px", transition: "background 0.2s" }}
                onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = "#fafafa"}
                onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = "#fff"}>
                <div style={{ fontSize: 32, marginBottom: 16 }}>{f.icon}</div>
                <div style={{ fontFamily: FE, fontSize: 16, fontWeight: 800, color: "#111", textTransform: "uppercase", marginBottom: 8 }}>{f.title}</div>
                <p style={{ fontFamily: F, fontSize: 13, color: "#888", lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
              </div>
            </AnimatedContent>
          ))}
        </div>
      </div>
    </section>
  );
}
