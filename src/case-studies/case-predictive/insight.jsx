/* eslint-disable */

function Insight() {
  return (
    <section id="insight" data-screen-label="Insight" style={{
      position: "relative",
      padding: "100px 0",
      borderTop: "1px solid var(--line)",
      borderBottom: "1px solid var(--line)",
      overflow: "hidden",
    }}>
      {/* radial glow */}
      <span aria-hidden="true" style={{
        position: "absolute", left: "50%", top: "50%",
        width: 900, height: 900, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(37, 99, 255,0.08), rgba(37, 99, 255,0.02) 40%, transparent 70%)",
        filter: "blur(40px)",
        transform: "translate(-50%, -50%)",
        pointerEvents: "none", zIndex: 0,
      }}/>
      <div className="bg-grid"/>

      <div className="wrap" style={{ position: "relative", zIndex: 1, maxWidth: 1100, textAlign: "center" }}>
        <span className="eyebrow" style={{ justifyContent: "center" }}>
          <span className="dot"/>
          <span className="num">03</span><span className="bar"/>Core insight
        </span>

        <p style={{
          fontFamily: "var(--serif)", fontStyle: "italic",
          fontSize: "clamp(30px, 4.0vw, 52px)",
          lineHeight: 1.15, letterSpacing: "-0.01em",
          color: "var(--text)",
          margin: "28px auto 0",
          maxWidth: "22ch",
        }}>
          This wasn't an inventory problem. It was a <span style={{ color: "var(--accent)" }}>prediction failure</span>.
        </p>

        <div className="ba-grid" style={{
          marginTop: 52,
          display: "grid",
          gridTemplateColumns: "1fr 60px 1fr",
          gap: 0,
          alignItems: "stretch",
          textAlign: "left",
        }}>
          <BeforeAfterCard kind="before"/>
          <div style={{ display: "grid", placeItems: "center" }}>
            <span style={{
              fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.16em",
              color: "var(--muted)", textTransform: "uppercase",
              transform: "rotate(0deg)",
              padding: "8px 12px", border: "1px solid var(--line)",
              borderRadius: 999, background: "var(--bg-2)",
            }}>→ FIX</span>
          </div>
          <BeforeAfterCard kind="after"/>
        </div>

        <style>{`
          @media (max-width: 720px) {
            .ba-grid { grid-template-columns: 1fr !important; gap: 14px !important; }
          }
        `}</style>
      </div>
    </section>
  );
}

function BeforeAfterCard({ kind }) {
  const before = kind === "before";
  return (
    <div style={{
      background: before
        ? "linear-gradient(180deg, rgba(255,107,107,0.04), rgba(255,107,107,0.01))"
        : "linear-gradient(180deg, rgba(37, 99, 255,0.05), rgba(37, 99, 255,0.01))",
      border: `1px solid ${before ? "rgba(255,107,107,0.25)" : "rgba(37, 99, 255,0.35)"}`,
      borderRadius: 16,
      padding: "22px 24px",
    }}>
      <div style={{
        fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.14em",
        color: before ? "var(--warn)" : "var(--accent)",
        textTransform: "uppercase", marginBottom: 14,
      }}>
        {before ? "● BEFORE" : "● AFTER"}
      </div>
      <div style={{ fontSize: 19, fontWeight: 500, color: "var(--text)", letterSpacing: "-0.01em", lineHeight: 1.25, marginBottom: 12 }}>
        {before
          ? "Decisions on history. No demand signal."
          : "Decisions on forecasts. Signal-driven."}
      </div>
      <div style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.55 }}>
        {before
          ? "Reorders ran off last quarter's average. Buyer instinct filled the gap. Capital allocated by accident — carried forward from last cycle's orders."
          : "Per-SKU forecasts updated continuously. Reorders sized to projected demand and lead time. Capital allocation is a deliberate decision, not a leftover."}
      </div>
    </div>
  );
}

window.Insight = Insight;
