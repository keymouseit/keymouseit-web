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
        <b>Saw our LinkedIn post?</b> See the control tower for multi-client production.
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
            <span style={{ color: "var(--accent)" }}>S.01</span>
            <span className="bar"/>
            Case study · Execution
          </span>
          <span style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.12em", color: "var(--muted)", textTransform: "uppercase" }}>
            60-sec read · 2026
          </span>
        </div>

        <h1 className="display">
          Manufacturing<br/>
          <span style={{ color: "var(--blue)" }}>Control Tower.</span>
        </h1>
        <p className="lead" style={{ marginTop: 24, fontSize: 20, maxWidth: "52ch" }}>
          Cut batch delays{" "}
          <span style={{ color: "var(--accent)", fontWeight: 500 }}>~70%</span>{" "}
          — replacing coordination chaos with system-enforced workflows.
        </p>
        <p style={{
          marginTop: 16,
          maxWidth: "58ch",
          fontSize: 16.5,
          lineHeight: 1.55,
          color: "var(--text-2)",
        }}>
          If your production depends on coordination between teams — this is the system you’re missing.
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 22 }}>
          {[
            "Execution layer",
            "Manufacturing",
            "Compliance-heavy",
            "Multi-client",
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
            <span>inventory accuracy</span>
          </div>
          <div className="hero-proof-item">
            <b>~70%</b>
            <span>batch delay cut</span>
          </div>
          <div className="hero-proof-item">
            <b>6–8h → 0</b>
            <span>dock-side compliance holds</span>
          </div>
          <div className="hero-proof-item hero-proof-meta">
            <b><span className="live-dot"/>Phased rollout</b>
            <span>inventory + compliance first</span>
          </div>
        </div>

        <FactoryPipeline/>
      </div>
    </section>
  );
}

// ── Factory Lifecycle Pipeline ───────────────────────────────────────────
function FactoryPipeline() {
  const stages = [
    { code: "01", label: "Procurement",          sub: "Raw materials confirmed",     kind: "proc",       critical: false },
    { code: "02", label: "Production",           sub: "Batch start",                 kind: "prod",       critical: false },
    { code: "03", label: "Label Approval",       sub: "Artwork cleared",             kind: "label",      critical: false },
    { code: "04", label: "Compliance Validation",sub: "Label + excise aligned",      kind: "compliance", critical: true  },
    { code: "05", label: "Dispatch",             sub: "Readiness queue",             kind: "dispatch",   critical: false },
    { code: "06", label: "Shipment",             sub: "Released to lane",            kind: "shipment",   critical: false },
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
          <span>FACTORY.PIPELINE</span>
        </span>
        <span>6 STAGES · 1 COMPLIANCE GATE</span>
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
        <span><span style={{ color: "var(--accent)" }}>▲</span> Compliance enforced mid-pipeline — not at the dock</span>
        <span>System-enforced, not memory-driven</span>
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
    <div className="pipeline-stage-card" style={{
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
        <span className="pipeline-stage-arrow" aria-hidden="true" style={{
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
          }}>GATE</span>
        )}
      </div>

      <div style={{
        width: 44, height: 44, borderRadius: 10,
        background: accent ? "rgba(37, 99, 255, 0.12)" : "var(--blue-50)",
        border: `1px solid ${accent ? "rgba(37, 99, 255, 0.3)" : "var(--blue-100)"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: accent ? "var(--accent)" : "var(--blue)", flexShrink: 0
      }}>
        <StageGlyph kind={s.kind} accent={accent}/>
      </div>

      <div>
        <div style={{ fontSize: 13.5, fontWeight: 500, color: "var(--blue)", letterSpacing: "-0.01em", lineHeight: 1.2 }}>{s.label}</div>
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
  const c = "currentColor";
  const common = { width: 24, height: 24, viewBox: "0 0 36 36", fill: "none", stroke: c, strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" };
  // Procurement — inbound boxes
  if (kind === "proc")       return (<svg {...common}><path d="M5 11 L18 6 L31 11 V25 L18 30 L5 25 Z"/><path d="M5 11 L18 16 L31 11"/><path d="M18 16 V30"/><path d="M3 6 L7 10 L3 14" opacity="0.7"/></svg>);
  // Production — gear / spinner
  if (kind === "prod")       return (<svg {...common}><circle cx="18" cy="18" r="6"/><path d="M18 8 V11 M18 25 V28 M8 18 H11 M25 18 H28 M11 11 L13 13 M23 23 L25 25 M25 11 L23 13 M11 25 L13 23"/></svg>);
  // Label — tag
  if (kind === "label")      return (<svg {...common}><path d="M18 6 L30 6 V18 L18 30 L6 18 Z"/><circle cx="24" cy="12" r="1.6" fill={c}/></svg>);
  // Compliance — shield with check
  if (kind === "compliance") return (<svg {...common}><path d="M18 5 L29 9 V18 c0 6 -5 11 -11 13 c-6 -2 -11 -7 -11 -13 V9 Z"/><path d="M13 18 L17 22 L24 14"/></svg>);
  // Dispatch — outbound truck
  if (kind === "dispatch")   return (<svg {...common}><rect x="4" y="14" width="16" height="11" rx="1"/><path d="M20 18 L26 18 L30 22 V25 H20 Z"/><circle cx="10" cy="27" r="2"/><circle cx="25" cy="27" r="2"/></svg>);
  // Shipment — paper plane / chevrons
  if (kind === "shipment")   return (<svg {...common}><path d="M6 22 L16 28 L30 14"/><circle cx="30" cy="14" r="2" fill={c}/></svg>);
  return null;
}

window.CaseHero = CaseHero;
