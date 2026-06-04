/* eslint-disable */

const METRICS = [
  { v: "~75%",   l: "dispatch / coordination delay reduction",              ctx: "across manufacturing & dispatch" },
  { v: "~70%",   l: "inventory leakage reduction",            ctx: "inventory + warehouse" },
  { v: "~80%",   l: "emergency procurement reduction",    ctx: "replenishment under volatility" },
  { v: "30–50%", l: "faster decision making",       ctx: "leadership review cadence" },
];

function Metrics() {
  return (
    <section id="proof" className="section" data-screen-label="Proof" style={{
      background: "linear-gradient(180deg, transparent, rgba(37,99,255,0.015), transparent)",
    }}>
      <div className="wrap">
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: 64, gap: 40, flexWrap: "wrap" }}>
          <div style={{ maxWidth: 720 }}>
            <span className="eyebrow"><span className="num">04</span><span className="bar"/>Proof</span>
            <h2 className="h2" style={{ marginTop: 18 }}>
              Real impact.<br/>Measurable <em>change</em>.
            </h2>
          </div>
          <p style={{ maxWidth: 380, color: "var(--muted)", fontSize: 14.5, lineHeight: 1.6, margin: 0 }}>
            Across logistics, manufacturing, inventory, and leadership operations — focused on dispatch / coordination delay reduction, leakage control, procurement efficiency, and decision speed.
          </p>
        </header>

        <div className="metrics-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 0,
          borderTop: "1px solid var(--line-2)",
          borderBottom: "1px solid var(--line-2)",
        }}>
          {METRICS.map((m, i) => <MetricCell key={i} m={m} i={i}/>)}
        </div>

        <p style={{
          fontSize: 12.5, color: "var(--muted-2)", marginTop: 18,
          fontFamily: "var(--mono)", letterSpacing: "0.08em",
        }}>
          AGGREGATE · LAST 18 MONTHS · NDA SUMMARY AVAILABLE
        </p>

        <style>{`
          @media (max-width: 980px) { .metrics-grid { grid-template-columns: repeat(2, 1fr) !important; } }
          @media (max-width: 540px) { .metrics-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </div>
    </section>
  );
}

function MetricCell({ m, i }) {
  return (
    <div style={{
      padding: "40px 28px",
      borderRight: i < METRICS.length - 1 ? "1px solid var(--line)" : "none",
      position: "relative",
    }}>
      <span style={{
        fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.12em",
        color: "var(--muted)",
      }}>
        M.0{i + 1}
      </span>
      <div style={{
        fontSize: "clamp(44px, 4.4vw, 64px)",
        fontWeight: 500,
        letterSpacing: "-0.03em",
        lineHeight: 1,
        color: "var(--text)",
        marginTop: 16,
        marginBottom: 16,
        fontFeatureSettings: '"ss01"',
      }}>{m.v}</div>
      <div style={{ fontSize: 15, color: "var(--text-2)", letterSpacing: "-0.005em" }}>{m.l}</div>
      <div style={{ fontSize: 12.5, color: "var(--muted)", marginTop: 6, lineHeight: 1.5 }}>{m.ctx}</div>
    </div>
  );
}

window.Metrics = Metrics;
