/* eslint-disable */

const TRUST_POINTS = [
  {
    k: "Built for messy operations",
    v: "Calls, spreadsheets, partial data, people-dependent handoffs — the system is designed around real-world constraints, not ideal workflows.",
  },
  {
    k: "Not a dashboard layer",
    v: "The control tower enforces readiness, sequencing, alerts, and decision flow. Visibility is an outcome — not the whole product.",
  },
  {
    k: "Phased implementation",
    v: "Start with readiness gates and dispatch sequencing, then expand into live tracking, SLA monitoring, and utilization intelligence.",
  },
  {
    k: "Operational + AI together",
    v: "Rule-based logic handles hard workflow gates. AI is applied where prediction, cascade risk, and dynamic prioritization matter.",
  },
];

function TrustLayerL() {
  return (
    <section className="section" id="trust" data-screen-label="Trust" style={{ padding: "80px 0" }}>
      <div className="wrap">
        <div style={{
          display: "grid",
          gridTemplateColumns: "0.8fr 1.2fr",
          gap: 44,
          alignItems: "start",
        }} className="trust-grid">
          <div>
            <span className="eyebrow"><span className="num">08</span><span className="bar"/>Why this works</span>
            <h2 className="h2" style={{ marginTop: 16 }}>
              Built for real-world logistics — not perfect-process diagrams.
            </h2>
            <p className="lead" style={{ marginTop: 18, fontSize: 16 }}>
              The value is not another screen. The value is the operating layer that makes the correct next step unavoidable.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }} className="trust-card-grid">
            {TRUST_POINTS.map((t, i) => (
              <div key={i} style={{
                background: "linear-gradient(180deg, rgba(37, 99, 255, 0.04), rgba(255, 255, 255, 0.8))",
                border: "1px solid var(--line)",
                borderRadius: 16,
                padding: "22px 22px 24px",
                boxShadow: "0 2px 8px rgba(11,17,32,0.04)",
              }}>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.12em",
                  textTransform: "uppercase", color: "var(--accent)", marginBottom: 14,
                }}>
                  <span className="live-dot"/> {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="h3" style={{ fontSize: 20, marginBottom: 10, color: "var(--blue)" }}>{t.k}</h3>
                <p style={{ margin: 0, color: "var(--text-2)", lineHeight: 1.55, fontSize: 14 }}>{t.v}</p>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 980px) {
            .trust-grid { grid-template-columns: 1fr !important; }
          }
          @media (max-width: 640px) {
            .trust-card-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </section>
  );
}

window.TrustLayerL = TrustLayerL;
