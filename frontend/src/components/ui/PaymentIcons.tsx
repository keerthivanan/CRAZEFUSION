"use client";

const iconBase: React.CSSProperties = {
  borderRadius: 5,
  padding: "4px 8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: 28,
};

export default function PaymentIcons({ label = true }: { label?: boolean }) {
  return (
    <div>
      {label && (
        <div style={{ fontFamily: "var(--font-poppins-var,'Poppins',sans-serif)", fontSize: 9, fontWeight: 600, color: "#aaa", letterSpacing: "0.12em", textTransform: "uppercase", textAlign: "center", marginBottom: 8 }}>
          🔒 Secure checkout
        </div>
      )}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center", alignItems: "center" }}>

        {/* Visa */}
        <div style={{ ...iconBase, background: "#1a1f71" }}>
          <span style={{ fontFamily: "Arial,sans-serif", fontSize: 12, fontWeight: 900, color: "#fff", fontStyle: "italic" }}>VISA</span>
        </div>

        {/* Mastercard */}
        <div style={{ ...iconBase, background: "#fff", border: "1px solid #e5e5e5" }}>
          <div style={{ position: "relative", width: 28, height: 18, display: "flex", alignItems: "center" }}>
            <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#eb001b", position: "absolute", left: 0 }} />
            <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#f79e1b", position: "absolute", left: 10, opacity: 0.95 }} />
          </div>
        </div>

        {/* Amex */}
        <div style={{ ...iconBase, background: "#2E77BC" }}>
          <span style={{ fontFamily: "Arial,sans-serif", fontSize: 10, fontWeight: 800, color: "#fff", letterSpacing: "0.04em" }}>AMEX</span>
        </div>

        {/* PayPal */}
        <div style={{ ...iconBase, background: "#fff", border: "1px solid #e5e5e5" }}>
          <span style={{ fontFamily: "Arial,sans-serif", fontSize: 11, fontWeight: 800, color: "#003087" }}>Pay</span>
          <span style={{ fontFamily: "Arial,sans-serif", fontSize: 11, fontWeight: 800, color: "#009cde" }}>Pal</span>
        </div>

        {/* Apple Pay */}
        <div style={{ ...iconBase, background: "#000" }}>
          <span style={{ fontFamily: "-apple-system,sans-serif", fontSize: 11, fontWeight: 600, color: "#fff" }}> Pay</span>
        </div>

        {/* Google Pay */}
        <div style={{ ...iconBase, background: "#fff", border: "1px solid #e5e5e5" }}>
          <span style={{ fontFamily: "Arial,sans-serif", fontSize: 10, fontWeight: 700 }}>
            <span style={{ color: "#4285F4" }}>G</span>
            <span style={{ color: "#EA4335" }}>o</span>
            <span style={{ color: "#FBBC05" }}>o</span>
            <span style={{ color: "#4285F4" }}>g</span>
            <span style={{ color: "#34A853" }}>l</span>
            <span style={{ color: "#EA4335" }}>e</span>
          </span>
          <span style={{ fontFamily: "Arial,sans-serif", fontSize: 10, fontWeight: 700, color: "#5f6368", marginLeft: 2 }}>Pay</span>
        </div>

      </div>
    </div>
  );
}
