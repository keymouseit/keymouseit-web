/* eslint-disable */

const AI_USES = [
  {
    code: "AI.01",
    title: "Demand Forecasting per SKU",
    body: "Individual demand models per SKU — multi-horizon consumption history, seasonal peaks, promotional lift, trend shifts. Updated continuously.",
    chip: "AVERAGES → SIGNALS",
    quad: "op-dec",
  },
  {
    code: "AI.02",
    title: "Stockout Prediction with Lead Time",
    body: "Depletion projected against actual supplier lead times — not against a static minimum. Alert fires with runway to reorder at standard terms.",
    chip: "EMERGENCY → PLANNED",
    quad: "op-det",
  },
  {
    code: "AI.03",
    title: "Slow-Mover & Dead Stock Detection",
    body: "Turnover ratios per SKU tracked continuously. Stock tiered fast / slow / stagnant. Capital tied per tier surfaced.",
    chip: "CAPITAL VISIBLE",
    quad: "st-det",
  },
  {
    code: "AI.04",
    title: "Capital Allocation Intelligence",
    body: "Working capital modelled across the portfolio. Reallocation opportunities surfaced — reduce here, invest there — with quantified service-level impact.",
    chip: "INERTIA → DELIBERATE",
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
              Where signals beat <em>rules</em>.
            </h2>
          </div>
          <p style={{ maxWidth: 360, color: "var(--muted)", fontSize: 14.5, lineHeight: 1.55, margin: 0 }}>
            Static thresholds handled the easy cases. AI was applied where demand variability and capital trade-offs required judgment rules can't encode.
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
              fontSize: 26, fontWeight: 500, letterSpacing: "-0.015em", color: "var(--blue)",
              marginTop: 12, marginBottom: 14, lineHeight: 1.15,
            }}>
              Detection runs at both levels — stockout prediction is operational; slow-mover identification feeds strategic capital decisions.
            </h3>
            <p style={{ fontSize: 14.5, color: "var(--muted)", lineHeight: 1.6, maxWidth: "50ch", margin: 0 }}>
              The highest-value application is capital allocation intelligence — operating at portfolio level, not individual SKUs.
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

      <h3 className="h3" style={{ fontSize: 20, color: "var(--blue)" }}>{a.title}</h3>

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
    { row: 0, col: 0, code: "AI.03", title: "Slow-Mover Detection",    accent: false },
    { row: 0, col: 1, code: "AI.04", title: "Capital Allocation",      accent: false },
    { row: 1, col: 0, code: "AI.02", title: "Stockout Prediction",     accent: true },
    { row: 1, col: 1, code: "AI.01", title: "Demand Forecasting",      accent: true },
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
