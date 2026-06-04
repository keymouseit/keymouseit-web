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
        <b>Saw our LinkedIn post?</b> See the decision layer in 60 seconds.
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
            <span style={{ color: "var(--accent)" }}>S.05</span>
            <span className="bar"/>
            Case study · Decision
          </span>
          <span style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.12em", color: "var(--muted)", textTransform: "uppercase" }}>
            60-sec read · 2026
          </span>
        </div>

        <h1 className="display">
          Decision<br/>
          <span style={{ color: "var(--blue)" }}>Intelligence System.</span>
        </h1>
        <p className="lead" style={{ marginTop: 24, fontSize: 20, maxWidth: "58ch", color: "var(--text)" }}>
          If your teams report different numbers — your decisions are already compromised.
        </p>
        <p style={{ marginTop: 14, fontSize: 17, lineHeight: 1.55, color: "var(--text-2)", maxWidth: "58ch" }}>
          Reduced decision time by <span style={{ color: "var(--accent)", fontWeight: 500 }}>30–50%</span> by replacing fragmented reporting with one validated operational truth.
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 22 }}>
          {[
            "Decision layer",
            "Cross-functional",
            "Leadership-grade",
            "Single source of truth",
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
          <a href="#cta" className="btn btn-primary" style={{ color: "#fff" }}>Get Your Decision System Map <ArrowRight/></a>
          <a href="#built" className="btn btn-ghost">View System Architecture <ArrowUpRight/></a>
        </div>

        <div className="hero-proof">
          <div className="hero-proof-item">
            <b>30–50%</b>
            <span>decision time ↓</span>
          </div>
          <div className="hero-proof-item">
            <b>50%+</b>
            <span>reconciliation effort ↓</span>
          </div>
          <div className="hero-proof-item">
            <b>→ 0</b>
            <span>conflicting reports</span>
          </div>
          <div className="hero-proof-item hero-proof-meta">
            <b><span className="live-dot"/>Live map</b>
            <span>data flows → decisions</span>
          </div>
        </div>

        <DecisionPipeline/>
      </div>
    </section>
  );
}

// ── Decision Lifecycle Pipeline ───────────────────────────────────────────
function DecisionPipeline() {
  const stages = [
    { code: "01", label: "Multi-Source Data",      sub: "All functions feed in",         kind: "ingest",    critical: false },
    { code: "02", label: "Validation",             sub: "Definitions aligned",           kind: "validate",  critical: false },
    { code: "03", label: "Single Source of Truth", sub: "Continuous unified picture",    kind: "truth",     critical: true  },
    { code: "04", label: "AI Insight Engine",      sub: "Risks & signals",               kind: "insight",   critical: false },
    { code: "05", label: "Decision Surface",       sub: "Prioritized action queue",      kind: "decide",    critical: false },
    { code: "06", label: "Leadership Action",      sub: "Within the window",             kind: "act",       critical: false },
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
          <span>DECISION.LIFECYCLE</span>
        </span>
        <span>6 STAGES · 1 SOURCE OF TRUTH</span>
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
        <span><span style={{ color: "var(--accent)" }}>▲</span> Data conflicts resolved at the source — not in a meeting</span>
        <span>Trust the layer underneath, not the reports on top</span>
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
          }}>TRUTH</span>
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
  // Ingest — multiple streams converging
  if (kind === "ingest")   return (<svg {...common}><circle cx="6"  cy="8"  r="2"/><circle cx="6"  cy="18" r="2"/><circle cx="6"  cy="28" r="2"/><path d="M8 8 L20 18 M8 18 H20 M8 28 L20 18"/><circle cx="22" cy="18" r="2.5" fill={c}/></svg>);
  // Validate — checks in a stack
  if (kind === "validate") return (<svg {...common}><rect x="6"  y="8"  width="24" height="6" rx="1.5"/><rect x="6"  y="16" width="24" height="6" rx="1.5"/><rect x="6"  y="24" width="24" height="6" rx="1.5"/><path d="M22 11 L24 13 L28 9" /><path d="M22 19 L24 21 L28 17"/><path d="M22 27 L24 29 L28 25"/></svg>);
  // Truth — single circle / hub
  if (kind === "truth")    return (<svg {...common}><circle cx="18" cy="18" r="10"/><circle cx="18" cy="18" r="3" fill={c}/></svg>);
  // Insight — sparkle / spark
  if (kind === "insight")  return (<svg {...common}><path d="M18 6 V14 M18 22 V30 M6 18 H14 M22 18 H30"/><circle cx="18" cy="18" r="2.5" fill={c}/><path d="M10 10 L13 13 M23 23 L26 26 M26 10 L23 13 M10 26 L13 23"/></svg>);
  // Decide — priority list
  if (kind === "decide")   return (<svg {...common}><rect x="6"  y="8"  width="24" height="6" rx="1.5" fill={c} stroke="none"/><rect x="6"  y="16" width="20" height="6" rx="1.5"/><rect x="6"  y="24" width="14" height="6" rx="1.5"/></svg>);
  // Act — outward arrow
  if (kind === "act")      return (<svg {...common}><circle cx="14" cy="18" r="6"/><path d="M14 18 L28 18 M22 12 L28 18 L22 24"/></svg>);
  return null;
}

window.CaseHero = CaseHero;
