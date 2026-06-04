/* eslint-disable */

// Map case-study system ids → case-study HTML files (when published)
const CASE_HREFS = {
  mfg:  "Manufacturing Control Tower.html",
  inv:  "Inventory Intelligence.html",
  log:  "Logistics Control Tower.html",
  pred: "Predictive Inventory Planning.html",
  dec:  "Decision Intelligence.html",
};
function caseHref(id) { return CASE_HREFS[id] || "#"; }

const SYSTEMS = [
  {
    id: "mfg",
    code: "S.01",
    title: "Manufacturing Control Tower",
    glyph: "exec",
    tag: "EXECUTION LAYER",
    problem: "Compliance delays, inventory mismatch, batch coordination gaps, and production workflows that depend on the right person being available.",
    detail: "For teams where material readiness is verified manually, dispatch gates happen too late, and leadership sees problems only after escalation.",
    metrics: [
      { v: "~75%", l: "inventory mismatch reduction" },
      { v: "~70%", l: "batch delay reduction" },
      { v: "Eliminated", l: "dock compliance failures" },
    ],
    forWho: "Plant Heads · Manufacturing Ops",
  },
  {
    id: "inv",
    code: "S.02",
    title: "Inventory Intelligence System",
    glyph: "vis",
    tag: "VISIBILITY + MARGIN",
    problem: "Inventory leakage, peak-hour stockouts, emergency procurement, and vendor decisions made by memory instead of performance data.",
    detail: "For hospitality, F&B, retail, and fast-moving inventory teams where stock moves quickly but the system only catches up at the end of the shift.",
    metrics: [
      { v: "~70%", l: "inventory leakage reduction" },
      { v: "~80%", l: "emergency procurement cut" },
      { v: "15–25%", l: "procurement cost improvement" },
    ],
    forWho: "Inventory Heads · F&B Ops",
  },
  {
    id: "log",
    code: "S.03",
    title: "Logistics Control Tower",
    glyph: "orch",
    tag: "ORCHESTRATION",
    problem: "Dispatch planned on calls, WhatsApp, and spreadsheets — with drivers allocated before shipments are actually ready.",
    detail: "For teams where drivers wait at warehouses, SLA breaches cascade downstream, and status is still checked by calling the driver.",
    metrics: [
      { v: "~75%", l: "dispatch delay reduction" },
      { v: "~70%", l: "fleet idle time reduction" },
      { v: "40–50%", l: "manual coordination reduction" },
    ],
    forWho: "Logistics Managers · Fleet Ops",
  },
  {
    id: "pred",
    code: "S.04",
    title: "Predictive Inventory Planning",
    glyph: "plan",
    tag: "PLANNING LAYER",
    problem: "Stockouts and overstock happening at the same time because replenishment is driven by historical averages instead of demand signals.",
    detail: "For multi-SKU warehouses and supply teams where emergency procurement is recurring and capital is locked in slow-moving inventory.",
    metrics: [
      { v: "~75%", l: "peak stockout reduction" },
      { v: "~80%", l: "emergency procurement cut" },
      { v: "20–30%", l: "inventory turnover improvement" },
    ],
    forWho: "Supply Planners · Procurement Heads",
  },
  {
    id: "dec",
    code: "S.05",
    title: "Decision Intelligence System",
    glyph: "dec",
    tag: "DECISION LAYER",
    problem: "Three teams, three numbers, and leadership decisions delayed until the operational window has already closed.",
    detail: "For leadership teams operating across fragmented reports, stale dashboards, and conflicting KPIs that require manual reconciliation before action.",
    metrics: [
      { v: "50%+", l: "reconciliation effort reduction" },
      { v: "30–50%", l: "faster decision-making" },
      { v: "Eliminated", l: "conflicting report cycles" },
    ],
    forWho: "Founders · Leadership Teams",
  },
];

function Cases() {
  const [active, setActive] = React.useState("mfg");
  const sys = SYSTEMS.find(s => s.id === active);

  return (
    <section id="systems" className="section" style={{ background: "linear-gradient(180deg, transparent, rgba(37,99,255,0.015) 30%, transparent)" }} data-screen-label="Systems">
      <div className="wrap">
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: 56, gap: 40, flexWrap: "wrap" }}>
          <div style={{ maxWidth: 720 }}>
            <span className="eyebrow"><span className="num">02</span><span className="bar"/>Systems · Decision router</span>
            <h2 className="h2" style={{ marginTop: 18 }}>
              Find the system that fits<br/>
              <em>your operation</em>.
            </h2>
          </div>
          <p style={{ maxWidth: 380, color: "var(--muted)", fontSize: 14.5, lineHeight: 1.6, margin: 0 }}>
            Each card routes a different operational pain to the most relevant case study — so a logistics lead, plant head, or supply planner sees the problem that sounds like their day.
          </p>
        </header>

        {/* Router layout */}
        <div className="cases-grid" style={{
          display: "grid",
          gridTemplateColumns: "minmax(280px, 380px) 1fr",
          gap: 14,
          alignItems: "stretch",
        }}>
          {/* LIST */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {SYSTEMS.map((s, idx) => {
              const isActive = s.id === active;
              return (
                <button
                  key={s.id}
                  onClick={() => setActive(s.id)}
                  onMouseEnter={() => setActive(s.id)}
                  style={{
                    textAlign: "left",
                    background: isActive
                      ? "linear-gradient(180deg, rgba(37,99,255,0.06), rgba(37,99,255,0.02))"
                      : "var(--panel)",
                    border: `1px solid ${isActive ? "rgba(37,99,255,0.30)" : "var(--line)"}`,
                    borderRadius: 14,
                    padding: "16px 18px",
                    color: "var(--text)",
                    transition: "all .18s ease",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                  }}
                >
                  <span style={{
                    fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.12em",
                    color: isActive ? "var(--accent)" : "var(--muted)",
                    width: 36, flexShrink: 0,
                  }}>{s.code}</span>

                  <span style={{ flex: 1 }}>
                    <span style={{ display: "block", fontSize: 15, fontWeight: 500, letterSpacing: "-0.01em" }}>{s.title}</span>
                    <span style={{ display: "block", fontFamily: "var(--mono)", fontSize: 10.5, color: "var(--muted)", marginTop: 4, letterSpacing: "0.08em" }}>{s.tag}</span>
                  </span>

                  <span style={{
                    width: 18, height: 18, borderRadius: "50%",
                    border: `1px solid ${isActive ? "var(--accent)" : "var(--line-2)"}`,
                    display: "grid", placeItems: "center", flexShrink: 0,
                  }}>
                    {isActive && <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", boxShadow: "0 0 6px var(--accent)" }}/>}
                  </span>
                </button>
              );
            })}
          </div>

          {/* DETAIL */}
          <div style={{
            position: "relative",
            background: "var(--panel)",
            border: "1px solid var(--line)",
            borderRadius: 18,
            padding: 36,
            boxShadow: "0 10px 30px -10px rgba(0,0,0,0.04)",
            overflow: "hidden",
            minHeight: 460,
          }}>
            {/* subtle grid bg */}
            <span aria-hidden="true" style={{
              position: "absolute", inset: 0, pointerEvents: "none",
              backgroundImage: "linear-gradient(to right, rgba(17,24,39,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(17,24,39,0.02) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
              maskImage: "radial-gradient(ellipse 70% 60% at 80% 20%, #000, transparent 80%)",
              WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 80% 20%, #000, transparent 80%)",
              opacity: 0.6,
            }}/>

            <CaseDetail sys={sys}/>
          </div>
        </div>

        <style>{`
          @media (max-width: 900px) {
            .cases-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </section>
  );
}

function CaseDetail({ sys }) {
  return (
    <div key={sys.id} style={{
      position: "relative", display: "flex", flexDirection: "column", height: "100%",
      opacity: 1,
    }}>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32, gap: 16 }}>
        <span style={{
          fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.14em",
          color: "var(--muted)", textTransform: "uppercase",
        }}>
          <span style={{ color: "var(--accent)" }}>● </span>
          {sys.code} / {sys.tag}
        </span>
        <span style={{
          fontFamily: "var(--mono)", fontSize: 10.5, color: "var(--muted)", letterSpacing: "0.08em",
        }}>
          FOR — {sys.forWho.toUpperCase()}
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 64px", gap: 24, alignItems: "start", marginBottom: 28 }}>
        <h3 style={{
          fontSize: 36, fontWeight: 500, letterSpacing: "-0.022em", lineHeight: 1.05,
          margin: 0, color: "var(--text)",
        }}>
          {sys.title}
        </h3>
        <div style={{
          width: 64, height: 64, borderRadius: 14,
          border: "1px solid var(--line-2)",
          background: "rgba(37,99,255,0.08)",
          display: "grid", placeItems: "center",
          color: "var(--accent)",
        }}>
          <LayerGlyph kind={sys.glyph}/>
        </div>
      </div>

      <p style={{ fontSize: 16, lineHeight: 1.55, color: "var(--text-2)", margin: "0 0 14px", maxWidth: "60ch" }}>
        <span style={{ color: "var(--muted)", marginRight: 8, fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.1em" }}>IF THIS SOUNDS LIKE YOU</span>
        {sys.problem}
      </p>
      <p style={{ fontSize: 16, lineHeight: 1.55, color: "var(--text-2)", margin: "0 0 36px", maxWidth: "60ch" }}>
        <span style={{ color: "var(--muted)", marginRight: 8, fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.1em" }}>SYSTEM SHAPE</span>
        {sys.detail}
      </p>

      {/* Metrics */}
      <div style={{
        marginTop: "auto",
        display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
        borderTop: "1px solid var(--line-2)", paddingTop: 24, gap: 0,
      }}>
        {sys.metrics.map((m, i) => (
          <div key={i} style={{
            padding: "4px 0",
            borderRight: i < sys.metrics.length - 1 ? "1px solid var(--line)" : "none",
            paddingLeft: i === 0 ? 0 : 24,
            paddingRight: i === sys.metrics.length - 1 ? 0 : 24,
          }}>
            <div style={{
              fontFamily: "var(--sans)", fontSize: 30, fontWeight: 500, letterSpacing: "-0.02em",
              color: "var(--text)", lineHeight: 1,
            }}>{m.v}</div>
            <div style={{ fontSize: 12.5, color: "var(--muted)", marginTop: 8 }}>{m.l}</div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{ marginTop: 28, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <a href={caseHref(sys.id)} className="btn btn-ghost">
          View case study <ArrowUpRight />
        </a>
        <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--muted)", letterSpacing: "0.08em" }}>
          NDA available on request
        </span>
      </div>
    </div>
  );
}

window.Cases = Cases;
