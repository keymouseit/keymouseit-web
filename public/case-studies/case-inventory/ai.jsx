/* eslint-disable */

const AI_USES = [
  {
    code: "AI.01",
    title: "Consumption Pattern Intelligence",
    body: "SKU-level consumption profiles — hourly, daily, weekend vs. weekday — with deviation alerts when behaviour shifts.",
    chip: "OVERSTOCK ↓ · PEAK AVAILABILITY ↑",
    quad: "op-dec",
  },
  {
    code: "AI.02",
    title: "Predictive Reorder Timing",
    body: "Depletion projected from live consumption trajectory + upcoming demand. Reorder fires before service is affected.",
    chip: "PEAK STOCKOUTS → RARE",
    quad: "op-det",
  },
  {
    code: "AI.03",
    title: "Leakage & Anomaly Detection",
    body: "Expected vs. actual consumption modelled per SKU. Anomalies surface within a shift — not at end-of-day.",
    chip: "LEAKAGE VISIBLE IN-SERVICE",
    quad: "st-det",
  },
  {
    code: "AI.04",
    title: "Vendor Performance & Pricing",
    body: "Per-SKU pricing history, delivery reliability, and market benchmarks delivered as vendor scorecards before each order.",
    chip: "RELATIONSHIP → PERFORMANCE",
    quad: "st-dec",
  },
];

function AISection() {
  return (
    <section className="section" id="ai" data-screen-label="AI">
      <div className="wrap">
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: 48, gap: 40, flexWrap: "wrap" }}>
          <div style={{ maxWidth: 720 }}>
            <span className="eyebrow"><span className="num">05</span><span className="bar"/>Where AI was applied</span>
            <h2 className="h2" style={{ marginTop: 16 }}>
              Rules ran the gates.<br/>AI saw the <em>patterns</em>.
            </h2>
          </div>
          <p style={{ maxWidth: 360, color: "var(--muted)", fontSize: 14.5, lineHeight: 1.55, margin: 0 }}>
            Threshold and reorder logic is deterministic. AI was applied only where variability and pattern recognition genuinely added lift.
          </p>
        </header>

        {/* Cards grid */}
        <div className="ai-grid" style={{
          display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14, marginBottom: 56,
        }}>
          {AI_USES.map((a, i) => <AICard key={i} a={a}/>)}
        </div>

        {/* 2x2 Matrix */}
        <div className="ai-matrix-grid" style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 1fr",
          gap: 32, alignItems: "center",
        }}>
          <div>
            <span className="eyebrow"><span className="bar"/>Application Map</span>
            <h3 style={{
              fontSize: 26, fontWeight: 500, letterSpacing: "-0.015em", color: "var(--text)",
              marginTop: 12, marginBottom: 14, lineHeight: 1.15,
            }}>
              Most AI work sat on the floor — spotting what was happening before it became a problem, surfacing the right procurement call before the wrong one was made.
            </h3>
            <p style={{ fontSize: 14.5, color: "var(--muted)", lineHeight: 1.6, maxWidth: "50ch", margin: 0 }}>
              Vendor intelligence informs longer-term decisions; everything else lives in the daily loop where the cost of latency is highest.
            </p>
          </div>

          <AIMatrix/>
        </div>

        <style>{`
          @media (max-width: 900px) {
            .ai-grid { grid-template-columns: 1fr !important; }
            .ai-matrix-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          }
        `}</style>
      </div>
    </section>
  );
}

function AICard({ a }) {
  return (
    <article style={{
      background: "var(--panel)",
      border: "1px solid var(--line)",
      borderRadius: 16,
      padding: 26,
      display: "flex", flexDirection: "column", gap: 14,
      transition: "border-color .2s",
      height: "100%",
    }}
    onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(37, 99, 255,0.30)"}
    onMouseLeave={e => e.currentTarget.style.borderColor = "var(--line-2)"}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{
          fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.14em",
          color: "var(--muted)",
        }}>{a.code}</span>
        <QuadrantBadge q={a.quad}/>
      </div>

      <h3 className="h3" style={{ fontSize: 20 }}>{a.title}</h3>

      <p style={{ fontSize: 14, lineHeight: 1.55, color: "var(--text-2)", margin: 0 }}>
        {a.body}
      </p>

      {/* Outcome chip */}
      <div style={{
        marginTop: "auto", paddingTop: 14,
        borderTop: "1px dashed var(--line-2)",
      }}>
        <span style={{
          fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.12em",
          color: "var(--accent)", textTransform: "uppercase",
          display: "inline-flex", alignItems: "center", gap: 8,
        }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--accent)" }}/>
          {a.chip}
        </span>
      </div>
    </article>
  );
}

function QuadrantBadge({ q }) {
  const map = {
    "op-det": "OPERATIONAL · DETECTION",
    "op-dec": "OPERATIONAL · DECISION",
    "st-det": "STRATEGIC · DETECTION",
    "st-dec": "STRATEGIC · DECISION",
  };
  return (
    <span style={{
      fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.12em",
      color: "var(--text-2)", padding: "4px 10px",
      border: "1px solid var(--line)", borderRadius: 999,
      background: "rgba(255,255,255,0.02)", textTransform: "uppercase",
    }}>{map[q]}</span>
  );
}

function AIMatrix() {
  // 2x2 Detection/Decision × Operational/Strategic
  // Order: top-left=Strategic·Detection, top-right=Strategic·Decision,
  //        bottom-left=Operational·Detection, bottom-right=Operational·Decision
  const cells = [
    { row: 0, col: 0, code: "AI.03", title: "Leakage Detection",         accent: false },
    { row: 0, col: 1, code: "AI.04", title: "Vendor Performance",        accent: false },
    { row: 1, col: 0, code: "AI.02", title: "Predictive Reorder",        accent: true },
    { row: 1, col: 1, code: "AI.01", title: "Consumption Intelligence",  accent: true },
  ];
  return (
    <div style={{
      background: "var(--bg-2)",
      border: "1px solid var(--line)",
      borderRadius: 16,
      padding: 24,
      position: "relative",
    }}>
      {/* Top axis labels */}
      <div style={{
        display: "grid", gridTemplateColumns: "80px 1fr 1fr",
        gap: 8, marginBottom: 8,
        fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.12em", color: "var(--text-2)", textTransform: "uppercase",
      }}>
        <span/>
        <span style={{ textAlign: "center" }}>Detection</span>
        <span style={{ textAlign: "center" }}>Decision</span>
      </div>

      <div style={{
        display: "grid", gridTemplateColumns: "80px 1fr 1fr", gap: 8,
      }}>
        {/* Strategic row */}
        <RowLabel label="Strategic"/>
        <MatrixCell c={cells[0]}/>
        <MatrixCell c={cells[1]}/>

        {/* Operational row */}
        <RowLabel label="Operational"/>
        <MatrixCell c={cells[2]}/>
        <MatrixCell c={cells[3]}/>
      </div>
    </div>
  );
}

function RowLabel({ label }) {
  return (
    <span style={{
      display: "grid", placeItems: "center",
      fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.12em",
      color: "var(--text-2)", textTransform: "uppercase",
      writingMode: "vertical-rl", transform: "rotate(180deg)",
      padding: "16px 0",
    }}>{label}</span>
  );
}

function MatrixCell({ c }) {
  if (!c) return null;
  if (c.empty) {
    return (
      <div style={{
        padding: "20px 18px", borderRadius: 10,
        background: "transparent",
        border: "1px dashed var(--line-3)",
        minHeight: 110,
        display: "grid", placeItems: "center",
        opacity: 0.5,
      }}>
        <span style={{
          fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.14em",
          color: "var(--muted-2)", textTransform: "uppercase",
        }}>NOT APPLIED</span>
      </div>
    );
  }
  const accent = c.accent;
  return (
    <div style={{
      padding: "20px 18px", borderRadius: 10,
      background: accent
        ? "linear-gradient(180deg, #ffffff, rgba(37, 99, 255, 0.04))"
        : "var(--panel)",
      border: `1px solid ${accent ? "rgba(37, 99, 255, 0.30)" : "var(--line-2)"}`,
      minHeight: 110,
      display: "flex", flexDirection: "column", justifyContent: "space-between",
      boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
    }}>
      <span style={{
        fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.14em",
        color: accent ? "var(--accent)" : "var(--muted)",
      }}>{c.code}</span>
      <span style={{ fontSize: 15, fontWeight: 500, color: "var(--text)", letterSpacing: "-0.01em", lineHeight: 1.25 }}>
        {c.title}
      </span>
    </div>
  );
}

window.AISection = AISection;
