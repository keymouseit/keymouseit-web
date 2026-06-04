/* eslint-disable */

const ARCH_LAYERS = [
  { code: "L05", key: "dec",  label: "Decision",      blurb: "Surfaces tuned to leadership cadence", desc: "The right call, with the right context, at the right moment." },
  { code: "L04", key: "plan", label: "Planning",      blurb: "Forecasts, scenarios, replenishment",   desc: "Demand signals translated into procurement, capacity, and sequence." },
  { code: "L03", key: "orch", label: "Orchestration", blurb: "Workflow, exceptions, routing",         desc: "Work is sequenced and re-sequenced as reality changes." },
  { code: "L02", key: "vis",  label: "Visibility",    blurb: "Live operational state",                desc: "One observable state for inventory, lanes, lines, and people." },
  { code: "L01", key: "exec", label: "Execution",     blurb: "Shop floor, warehouse, vehicle, ERP",   desc: "Ground truth — where the operation actually happens." },
];

function Architecture() {
  return (
    <section id="architecture" className="section" data-screen-label="Architecture">
      <div className="wrap">
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: 56, gap: 40, flexWrap: "wrap" }}>
          <div style={{ maxWidth: 720 }}>
            <span className="eyebrow"><span className="num">04</span><span className="bar"/>Architecture</span>
            <h2 className="h2" style={{ marginTop: 18 }}>
              Five systems.<br/>
              <em>One</em> architecture.
            </h2>
          </div>
          <p style={{ maxWidth: 380, color: "var(--muted)", fontSize: 14.5, lineHeight: 1.6, margin: 0 }}>
            Every engagement plugs into the same five-layer model. Where you sit on it depends on which failure modes are costing you the most.
          </p>
        </header>

        <ArchitectureDiagram />

      </div>
    </section>
  );
}

function ArchitectureDiagram() {
  return (
    <div style={{
      position: "relative",
      background: "var(--panel)",
      border: "1px solid var(--line)",
      borderRadius: 22,
      padding: 36,
      boxShadow: "0 20px 50px -12px rgba(0,0,0,0.05)",
      overflow: "hidden",
    }}>
      {/* faint grid background */}
      <span aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "linear-gradient(to right, rgba(17,24,39,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(17,24,39,0.02) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
        maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, #000, transparent 95%)",
        WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, #000, transparent 95%)",
      }}/>

      {/* Top label */}
      <div style={{
        position: "relative", textAlign: "center",
        fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.18em",
        color: "var(--muted)", textTransform: "uppercase",
        marginBottom: 14,
      }}>
        Leadership · Strategic intent
      </div>

      <div className="arch-grid" style={{
        position: "relative",
        display: "grid",
        gridTemplateColumns: "160px 1fr 160px",
        gap: 0,
        alignItems: "stretch",
      }}>
        {/* LEFT GUTTER */}
        <ArchGutter
          direction="up"
          title="DATA"
          subtitle="flows up"
          captions={["Sensors", "Logs", "Scans", "Signals", "State"]}
        />

        {/* LAYERS */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: "0 24px" }}>
          {ARCH_LAYERS.map((L, i) => (
            <ArchLayer key={L.key} L={L} i={i} total={ARCH_LAYERS.length}/>
          ))}
        </div>

        {/* RIGHT GUTTER */}
        <ArchGutter
          direction="down"
          title="DECISIONS"
          subtitle="flow down"
          captions={["Strategy", "Targets", "Sequences", "Routes", "Tasks"]}
        />
      </div>

      {/* Bottom label */}
      <div style={{
        position: "relative", textAlign: "center",
        fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.18em",
        color: "var(--muted)", textTransform: "uppercase",
        marginTop: 14,
      }}>
        Operation · The real world
      </div>
    </div>
  );
}

function ArchLayer({ L, i, total }) {
  return (
    <div style={{
      position: "relative",
      border: "1px solid var(--line)",
      background: "var(--bg-2)",
      borderRadius: 12,
      padding: "20px 24px",
      display: "grid",
      gridTemplateColumns: "70px 56px 1fr auto",
      gap: 24,
      alignItems: "center",
      transition: "border-color .2s",
      overflow: "hidden",
    }}
    onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(37,99,255,0.25)"}
    onMouseLeave={e => e.currentTarget.style.borderColor = "var(--line)"}
    >
      {/* Code */}
      <span style={{
        fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.14em",
        color: "var(--muted)",
      }}>{L.code}</span>

      {/* glyph */}
      <span style={{
        width: 48, height: 48, borderRadius: 10,
        border: "1px solid var(--line)",
        display: "grid", placeItems: "center",
        color: "var(--accent)",
        background: "rgba(37,99,255,0.08)",
      }}>
        <LayerGlyph kind={L.key}/>
      </span>

      {/* Label + blurb */}
      <div>
        <div style={{ fontSize: 22, fontWeight: 500, letterSpacing: "-0.015em", color: "var(--text)", lineHeight: 1.1 }}>
          {L.label}
        </div>
        <div style={{ fontSize: 13.5, color: "var(--muted)", marginTop: 6 }}>{L.desc}</div>
      </div>

      {/* Right meta */}
      <span style={{
        fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.1em",
        color: "var(--text-2)", textTransform: "uppercase",
        textAlign: "right", maxWidth: 220,
      }}>
        {L.blurb}
      </span>
    </div>
  );
}

function ArchGutter({ direction, title, subtitle, captions }) {
  const up = direction === "up";
  return (
    <div style={{
      position: "relative",
      display: "flex", flexDirection: "column",
      justifyContent: "space-between",
      padding: "8px 0",
    }}>
      <div style={{
        fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.18em",
        color: up ? "var(--accent)" : "var(--blue)",
        textAlign: up ? "right" : "left",
        textTransform: "uppercase",
      }}>
        {up ? "↑" : "↓"} {title}
        <div style={{ color: "var(--muted)", fontSize: 10, marginTop: 4, letterSpacing: "0.14em" }}>{subtitle}</div>
      </div>

      {/* mini caption per layer */}
      <div style={{
        position: "absolute", top: 38, bottom: 38, left: 0, right: 0,
        display: "flex", flexDirection: "column", justifyContent: "space-around",
        pointerEvents: "none",
      }}>
        {captions.map((c, i) => (
          <span key={i} style={{
            fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.14em",
            color: "var(--muted-2)", textAlign: up ? "right" : "left",
            paddingRight: up ? 18 : 0,
            paddingLeft: up ? 0 : 18,
            opacity: 0.85,
          }}>{c.toUpperCase()}</span>
        ))}
      </div>

      {/* animated vertical line */}
      <svg width="14" height="100%" viewBox="0 0 14 400" preserveAspectRatio="none"
           style={{
             position: "absolute", top: 38, bottom: 38, height: "auto",
             left: up ? "auto" : -2, right: up ? -2 : "auto",
             width: 14,
           }}>
        <line x1="7" y1="0" x2="7" y2="400"
              stroke={up ? "rgba(37,99,255,0.4)" : "rgba(37,99,255,0.35)"}
              strokeWidth="1" strokeDasharray="3 4"
              style={{ animation: `flow 1.6s linear infinite`, animationDirection: up ? "reverse" : "normal" }}/>
      </svg>

      {/* placeholder bottom */}
      <div style={{
        fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.18em",
        color: "var(--muted-2)",
        textAlign: up ? "right" : "left",
      }}>
        {up ? "RAW" : "ACT"}
      </div>
    </div>
  );
}

window.Architecture = Architecture;
