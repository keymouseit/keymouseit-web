/* eslint-disable */

const MODULES = [
  { code: "M.01", name: "Dispatch Engine",     fn: "Priority-based sequencing · Automated allocation",     out: "Sequence & priority" },
  { code: "M.02", name: "Warehouse Module",    fn: "Load preparation tracking · Readiness signal",         out: "Readiness gates" },
  { code: "M.03", name: "Fleet Tracking",      fn: "Live vehicle location · Route progress",               out: "Live location" },
  { code: "M.04", name: "SLA Monitor",         fn: "Window tracking · Breach risk detection",              out: "Window & risk" },
  { code: "M.05", name: "Alert System",        fn: "Delay · Deviation · Readiness fail",                    out: "Escalation triggers" },
];

function Built() {
  return (
    <section className="section" id="built" data-screen-label="Built">
      <div className="wrap">
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: 48, gap: 40, flexWrap: "wrap" }}>
          <div style={{ maxWidth: 720 }}>
            <span className="eyebrow"><span className="num">04</span><span className="bar"/>What was built</span>
            <h2 className="h2" style={{ marginTop: 16 }}>
              A <em>control tower</em><br/>for logistics ops.
            </h2>
          </div>
          <p style={{ maxWidth: 360, color: "var(--muted)", fontSize: 14.5, lineHeight: 1.55, margin: 0 }}>
            Not a dashboard bolted onto a process. The operational layer the dispatch cycle now runs through.
          </p>
        </header>

        <ControlTowerDiagram/>

        <h3 style={{
          fontSize: 20, fontWeight: 500, letterSpacing: "-0.015em", color: "var(--blue)",
          marginTop: 72, marginBottom: 22,
        }}>Core components <span style={{ color: "var(--muted)", fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.1em", marginLeft: 10 }}>5 OF 5</span></h3>

        <ModulesTable/>
      </div>
    </section>
  );
}

// ─── Control Tower Diagram ──────────────────────────────────────────────
function ControlTowerDiagram() {
  return (
    <div style={{
      position: "relative",
      background: "var(--panel)", boxShadow: "0 20px 50px -12px rgba(0,0,0,0.05)",
      border: "1px solid var(--line)",
      borderRadius: 22,
      padding: 32,
      overflow: "hidden",
    }}>
      {/* faint grid */}
      <span aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "linear-gradient(to right, rgba(17, 24, 39, 0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(17, 24, 39, 0.02) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
        maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, #000, transparent 95%)",
        WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, #000, transparent 95%)",
      }}/>

      <div style={{ position: "relative" }}>

        {/* Top: Central orchestrator */}
        <div style={{
          display: "grid", placeItems: "center",
          marginBottom: 36,
        }}>
          <div style={{
            position: "relative",
            background: "linear-gradient(180deg, rgba(37, 99, 255,0.10), rgba(37, 99, 255,0.02))",
            border: "1px solid rgba(37, 99, 255,0.40)",
            borderRadius: 16,
            padding: "20px 32px",
            textAlign: "center",
            minWidth: 360,
            boxShadow: "0 0 80px -20px rgba(37, 99, 255,0.30)",
          }}>
            <div style={{
              fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.14em",
              color: "var(--accent)", textTransform: "uppercase", marginBottom: 8,
              display: "inline-flex", alignItems: "center", gap: 8,
            }}>
              <span className="live-dot"/> CENTRAL ORCHESTRATION
            </div>
            <div style={{
              fontSize: 22, fontWeight: 500, color: "var(--text)",
              letterSpacing: "-0.015em",
            }}>
              Logistics Control Tower
            </div>
            <div style={{
              fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.1em",
              color: "var(--text-2)", marginTop: 6,
            }}>
              REAL-TIME · DEPENDENCY-ENFORCED · SLA-AWARE
            </div>
          </div>
        </div>

        {/* Connection lines from orchestrator down to modules */}
        <svg viewBox="0 0 1200 80" preserveAspectRatio="none" style={{
          width: "100%", height: 60, display: "block", marginBottom: 4,
        }}>
          {[120, 360, 600, 840, 1080].map((x, i) => (
            <g key={i}>
              <line x1="600" y1="0" x2={x} y2="78" stroke="rgba(37, 99, 255,0.25)" strokeWidth="1" strokeDasharray="3 4" style={{ animation: `flow-x 1.6s linear infinite` }}/>
            </g>
          ))}
        </svg>

        {/* Bottom: 5 module nodes */}
        <div className="modules-row" style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: 12,
        }}>
          {[
            { c: "WH",  l: "Warehouse",   d: "Readiness signals" },
            { c: "DE",  l: "Dispatch",    d: "Sequencing engine" },
            { c: "FT",  l: "Fleet",       d: "Live tracking" },
            { c: "SLA", l: "SLA Monitor", d: "Window & risk" },
            { c: "AL",  l: "Alerts",      d: "Escalation triggers" },
          ].map((m, i) => (
            <ModuleNode key={i} m={m}/>
          ))}
        </div>

        {/* Bottom caption */}
        <div style={{
          marginTop: 28, paddingTop: 18, borderTop: "1px dashed var(--line-2)",
          display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12,
          fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.1em",
          color: "var(--muted)", textTransform: "uppercase", flexWrap: "wrap",
        }}>
          <span><span style={{ color: "var(--accent)" }}>↓</span> Data into the tower</span>
          <span>The readiness gate is system-enforced — not human-remembered</span>
          <span>Decisions out <span style={{ color: "var(--accent)" }}>↑</span></span>
        </div>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .modules-row { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 540px) {
          .modules-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

function ModuleNode({ m }) {
  return (
    <div style={{
      background: "var(--bg-2)",
      border: "1px solid var(--line)",
      borderRadius: 12,
      padding: "14px 14px 16px",
      position: "relative",
    }}>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10,
      }}>
        <span style={{
          fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.14em",
          color: "var(--accent)", padding: "2px 7px", borderRadius: 5,
          background: "rgba(37, 99, 255,0.08)",
        }}>{m.c}</span>
        <span style={{
          width: 6, height: 6, borderRadius: "50%",
          background: "var(--accent)", boxShadow: "0 0 6px var(--accent)",
          animation: "pulse-dot 2.4s ease-in-out infinite",
        }}/>
      </div>
      <div style={{ fontSize: 14, fontWeight: 500, color: "var(--text)", letterSpacing: "-0.005em" }}>
        {m.l}
      </div>
      <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 4, fontFamily: "var(--mono)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
        {m.d}
      </div>
    </div>
  );
}

// ─── Modules Table ──────────────────────────────────────────────────────
function ModulesTable() {
  return (
    <div style={{
      border: "1px solid var(--line)",
      borderRadius: 16,
      overflow: "hidden",
      background: "var(--panel)",
    }}>
      {/* Header */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "80px 1.4fr 2fr 1.4fr",
        gap: 0,
        padding: "14px 22px",
        background: "var(--bg-2)",
        borderBottom: "1px solid var(--line-2)",
        fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.12em",
        color: "var(--muted)", textTransform: "uppercase",
      }}>
        <span>ID</span>
        <span>Component</span>
        <span>What it does</span>
        <span>Output</span>
      </div>
      {/* Rows */}
      {MODULES.map((m, i) => (
        <div key={m.code} className="mod-row" style={{
          display: "grid",
          gridTemplateColumns: "80px 1.4fr 2fr 1.4fr",
          gap: 0, alignItems: "center",
          padding: "16px 22px",
          borderBottom: i < MODULES.length - 1 ? "1px solid var(--line)" : "none",
          transition: "background .15s",
        }}
        onMouseEnter={e => e.currentTarget.style.background = "var(--bg-2)"}
        onMouseLeave={e => e.currentTarget.style.background = "transparent"}
        >
          <span style={{
            fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.1em",
            color: "var(--muted)",
          }}>{m.code}</span>
          <span style={{ fontSize: 14.5, fontWeight: 500, color: "var(--text)", letterSpacing: "-0.005em" }}>
            {m.name}
          </span>
          <span style={{ fontSize: 13.5, color: "var(--text-2)", lineHeight: 1.45 }}>
            {m.fn}
          </span>
          <span style={{
            fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.08em",
            color: "var(--accent)", textTransform: "uppercase",
          }}>
            <span style={{ marginRight: 6, opacity: 0.6 }}>→</span>{m.out}
          </span>
        </div>
      ))}
      <style>{`
        @media (max-width: 900px) {
          .mod-row {
            grid-template-columns: 60px 1fr !important;
            gap: 6px 12px !important;
            padding: 16px 18px !important;
            row-gap: 4px !important;
          }
          .mod-row > span:nth-child(3),
          .mod-row > span:nth-child(4) {
            grid-column: 1 / 3 !important;
          }
        }
      `}</style>
    </div>
  );
}

window.Built = Built;
