/* eslint-disable */

function LinkedInBanner() {
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const src = (p.get("utm_source") || "").toLowerCase();
    const ref = (document.referrer || "").toLowerCase();
    if (src === "linkedin" || ref.includes("linkedin.com")) setShow(true);
  }, []);
  if (!show) return null;
  return (
    <a href="#cta" className="linkedin-banner">
      <span className="li-icon" aria-hidden="true">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
          <path d="M3.5 3a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM.5 5.5h2.7V14H.5V5.5zm4.7 0h2.6v1.2h.03c.36-.66 1.24-1.36 2.55-1.36 2.73 0 3.23 1.7 3.23 3.92V14h-2.7v-3.78c0-.9-.02-2.07-1.27-2.07-1.27 0-1.46.98-1.46 2v3.85H5.2V5.5z"/>
        </svg>
      </span>
      <span className="li-text">
        <b>Saw our LinkedIn post?</b> See the planning engine in 60 seconds.
      </span>
      <span className="li-arrow">→</span>
    </a>
  );
}

function CaseHero() {
  return (
    <section className="hero" style={{ paddingTop: 56, paddingBottom: 80, position: "relative", overflow: "hidden" }} data-screen-label="Hero">
      <div className="bg-grid"/>
      <div className="glow-spot" style={{ left: -200, top: -200, opacity: 0.7 }}/>

      <div className="wrap" style={{ position: "relative", zIndex: 1 }}>

        <LinkedInBanner/>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22, gap: 16, flexWrap: "wrap" }}>
          <span className="eyebrow">
            <span style={{ color: "var(--accent)" }}>S.04</span>
            <span className="bar"/>
            Case study · Planning
          </span>
          <span style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.12em", color: "var(--muted)", textTransform: "uppercase" }}>
            60-sec read · 2026
          </span>
        </div>

        <h1 className="display">
          Predictive Inventory<br/>
          <span style={{ color: "var(--blue)" }}>&amp; Supply Planning.</span>
        </h1>
        <p className="lead" style={{ marginTop: 24, fontSize: 20, maxWidth: "52ch" }}>
          Cut peak-period stockouts{" "}
          <span style={{ color: "var(--accent)", fontWeight: 500 }}>~75%</span>{" "}
          — replacing reactive planning with demand-driven forecasting.
        </p>

        <p style={{
          marginTop: 16,
          maxWidth: "56ch",
          fontSize: 16.5,
          lineHeight: 1.55,
          color: "var(--text)",
          background: "linear-gradient(90deg, rgba(37, 99, 255,0.10), rgba(37, 99, 255,0.02))",
          border: "1px solid rgba(37, 99, 255,0.22)",
          borderRadius: 14,
          padding: "12px 16px",
        }}>
          If you plan inventory using past averages — you’re already behind.
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 22 }}>
          {[
            "Planning layer",
            "Multi-SKU",
            "Working capital",
            "Demand-driven",
          ].map((t, i) => (
            <span key={i} style={{
              fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.08em",
              padding: "6px 12px", borderRadius: 999, color: "var(--text-2)",
              border: "1px solid var(--line)", background: "var(--bg-2)",
              textTransform: "uppercase",
            }}>{t}</span>
          ))}
        </div>

        <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap", marginTop: 28 }}>
          <a href="#cta" className="btn btn-primary" style={{ color: "#fff" }}>Get Your Operational System Map <ArrowRight/></a>
          <a href="#built" className="btn btn-ghost">View System Architecture <ArrowUpRight/></a>
        </div>

        <div className="hero-proof">
          <div className="hero-proof-item">
            <b>~75%</b>
            <span>peak stockouts ↓</span>
          </div>
          <div className="hero-proof-item">
            <b>~80%</b>
            <span>emergency procurement ↓</span>
          </div>
          <div className="hero-proof-item">
            <b>20–30%</b>
            <span>turnover ↑</span>
          </div>
          <div className="hero-proof-item hero-proof-meta">
            <b><span className="live-dot"/>Q3 ’26</b>
            <span>3 audit slots left</span>
          </div>
        </div>

        <PlanningPipeline/>
      </div>
    </section>
  );
}

// ── Planning Lifecycle Pipeline ───────────────────────────────────────────
function PlanningPipeline() {
  const stages = [
    { code: "01", label: "Inventory Received",   sub: "Logged at receipt",            kind: "receive",  critical: false },
    { code: "02", label: "Real-Time Tracking",   sub: "Continuous SKU monitor",       kind: "track",    critical: false },
    { code: "03", label: "Demand Forecasting",   sub: "Per-SKU projections",          kind: "forecast", critical: true  },
    { code: "04", label: "Optimization",         sub: "Capital-aware allocation",     kind: "optimize", critical: false },
    { code: "05", label: "Reorder Trigger",      sub: "Lead-time aware",              kind: "reorder",  critical: false },
    { code: "06", label: "Replenishment",        sub: "Order placed",                 kind: "replenish",critical: false },
  ];
  return (
    <div style={{
      position: "relative",
      marginTop: 64,
      background: "var(--panel)",
      border: "1px solid var(--line)",
      borderRadius: 22,
      padding: "28px 28px 32px",
      overflow: "hidden",
    }}>
      {[
        { top: -1, left: -1, rot: 0 },
        { top: -1, right: -1, rot: 90 },
        { bottom: -1, right: -1, rot: 180 },
        { bottom: -1, left: -1, rot: 270 },
      ].map((p, i) => (
        <span key={i} style={{
          position: "absolute", width: 12, height: 12, ...p,
          transform: `rotate(${p.rot}deg)`,
          borderTop: "1px solid var(--accent)",
          borderLeft: "1px solid var(--accent)", opacity: 0.7,
        }}/>
      ))}

      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        paddingBottom: 18, marginBottom: 26,
        borderBottom: "1px dashed var(--line-2)",
        fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.12em",
        color: "var(--muted)", textTransform: "uppercase",
      }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 14 }}>
          <span style={{ color: "var(--accent)" }}>● LIVE</span>
          <span>PLANNING.LIFECYCLE</span>
        </span>
        <span>6 STAGES · 1 FORECAST LAYER</span>
      </div>

      <div className="pipeline-row" style={{
        display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 10, alignItems: "stretch", position: "relative",
      }}>
        {stages.map((s, i) => <PipelineStage key={i} s={s} i={i} last={i === stages.length - 1}/>)}
      </div>

      <div style={{
        marginTop: 22, paddingTop: 18, borderTop: "1px dashed var(--line-2)",
        display: "flex", justifyContent: "space-between", alignItems: "center", gap: 14, flexWrap: "wrap",
        fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.1em",
        color: "var(--muted)", textTransform: "uppercase",
      }}>
        <span><span style={{ color: "var(--accent)" }}>▲</span> Reorders driven by projected demand — not last quarter's average</span>
        <span>Signal-driven, not history-bound</span>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .pipeline-row { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 540px) {
          .pipeline-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

function PipelineStage({ s, i, last }) {
  const accent = s.critical;
  return (
    <div style={{
      position: "relative",
      background: accent
        ? "linear-gradient(180deg, rgba(37, 99, 255,0.10), rgba(37, 99, 255,0.02))"
        : "var(--bg-2)",
      border: `1px solid ${accent ? "rgba(37, 99, 255,0.45)" : "var(--line-2)"}`,
      borderRadius: 12,
      padding: "16px 12px",
      display: "flex", flexDirection: "column", gap: 12,
    }}>
      {!last && (
        <span aria-hidden="true" style={{
          position: "absolute", left: "100%", top: "50%",
          width: 10, height: 1, background: "var(--line-3)", zIndex: 2,
        }}>
          <span style={{
            position: "absolute", right: -3, top: -3, width: 0, height: 0,
            borderLeft: "5px solid var(--accent)",
            borderTop: "3px solid transparent", borderBottom: "3px solid transparent",
          }}/>
        </span>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{
          fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.14em",
          color: accent ? "var(--accent)" : "var(--muted)", textTransform: "uppercase",
        }}>{s.code}</span>
        {accent && (
          <span style={{
            fontFamily: "var(--mono)", fontSize: 9.5, letterSpacing: "0.16em",
            color: "var(--accent)", padding: "2px 7px",
            borderRadius: 999, border: "1px solid rgba(37, 99, 255,0.4)",
            textTransform: "uppercase", background: "rgba(37, 99, 255,0.08)",
          }}>FORECAST</span>
        )}
      </div>

      <StageGlyph kind={s.kind} accent={accent}/>

      <div>
        <div style={{ fontSize: 13.5, fontWeight: 500, color: "var(--text)", letterSpacing: "-0.01em", lineHeight: 1.2 }}>{s.label}</div>
        <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>{s.sub}</div>
      </div>

      <span style={{
        position: "absolute", bottom: 10, right: 12,
        width: 6, height: 6, borderRadius: "50%",
        background: accent ? "var(--accent)" : "var(--muted-2)",
        boxShadow: accent ? "0 0 8px var(--accent)" : "none",
        animation: accent ? "pulse-dot 2s ease-in-out infinite" : undefined,
      }}/>
    </div>
  );
}

function StageGlyph({ kind, accent }) {
  const c = accent ? "var(--accent)" : "var(--text-2)";
  const common = { width: 32, height: 32, viewBox: "0 0 36 36", fill: "none", stroke: c, strokeWidth: "1.3", strokeLinecap: "round", strokeLinejoin: "round" };
  // Receive — inbound box
  if (kind === "receive")    return (<svg {...common}><path d="M5 11 L18 6 L31 11 V25 L18 30 L5 25 Z"/><path d="M5 11 L18 16 L31 11"/><path d="M18 16 V30"/></svg>);
  // Track — bar chart
  if (kind === "track")      return (<svg {...common}><rect x="5" y="8" width="26" height="20" rx="2"/><path d="M5 14 H31"/><path d="M10 24 V18"/><path d="M14 24 V15"/><path d="M18 24 V21"/><path d="M22 24 V17"/><path d="M26 24 V20"/></svg>);
  // Forecast — trend line with horizon dots
  if (kind === "forecast")   return (<svg {...common}><path d="M5 26 L11 22 L17 24 L23 16 L29 14"/><path d="M29 14 L33 11" strokeDasharray="2 2"/><circle cx="5"  cy="26" r="1.6" fill={c}/><circle cx="11" cy="22" r="1.6" fill={c}/><circle cx="17" cy="24" r="1.6" fill={c}/><circle cx="23" cy="16" r="1.6" fill={c}/><circle cx="29" cy="14" r="1.6" fill={c}/></svg>);
  // Optimize — sliders / scale
  if (kind === "optimize")   return (<svg {...common}><path d="M8 12 H28"/><circle cx="14" cy="12" r="2.5" fill="var(--bg)" /><path d="M8 20 H28"/><circle cx="22" cy="20" r="2.5" fill="var(--bg)"/><path d="M8 28 H28"/><circle cx="18" cy="28" r="2.5" fill="var(--bg)"/></svg>);
  // Reorder — circular arrow
  if (kind === "reorder")    return (<svg {...common}><path d="M27 17 a9 9 0 1 1 -2.5 -6.3"/><path d="M27 10 V17 H20"/></svg>);
  // Replenish — truck with up-arrow
  if (kind === "replenish")  return (<svg {...common}><rect x="4" y="14" width="16" height="11" rx="1"/><path d="M20 18 L26 18 L30 22 V25 H20 Z"/><circle cx="10" cy="27" r="2"/><circle cx="25" cy="27" r="2"/><path d="M12 11 L12 6 M9 9 L12 6 L15 9" opacity="0.7"/></svg>);
  return null;
}

window.CaseHero = CaseHero;
