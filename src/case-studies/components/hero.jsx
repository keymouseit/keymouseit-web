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
    <a href="#audit" className="linkedin-banner" aria-label="Saw our LinkedIn post — book an audit">
      <span className="li-icon" aria-hidden="true">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
          <path d="M3.5 3a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM.5 5.5h2.7V14H.5V5.5zm4.7 0h2.6v1.2h.03c.36-.66 1.24-1.36 2.55-1.36 2.73 0 3.23 1.7 3.23 3.92V14h-2.7v-3.78c0-.9-.02-2.07-1.27-2.07-1.27 0-1.46.98-1.46 2v3.85H5.2V5.5z"/>
        </svg>
      </span>
      <span className="li-text">
        <b>Saw our LinkedIn post?</b> Skip the deck — book a 30-min audit.
      </span>
      <span className="li-arrow">→</span>
    </a>
  );
}

function HeroDiagram() {
  // Stacked architecture viz: 5 horizontal layers
  // Top → Bottom: Decision, Planning, Orchestration, Visibility, Execution
  // Data flows UP (left edge), Decisions flow DOWN (right edge)
  const layers = [
    { key: "dec",  label: "Decision",      sub: "L05", nodes: 3 },
    { key: "plan", label: "Planning",      sub: "L04", nodes: 5 },
    { key: "orch", label: "Orchestration", sub: "L03", nodes: 7 },
    { key: "vis",  label: "Visibility",    sub: "L02", nodes: 9 },
    { key: "exec", label: "Execution",     sub: "L01", nodes: 11 },
  ];

  return (
    <div style={{ position: "relative" }}>
      {/* outer frame */}
      <div style={{
        position: "relative",
        background: "var(--panel)",
        border: "1px solid var(--line)",
        borderRadius: 22,
        padding: 22,
        overflow: "hidden",
        boxShadow: "0 20px 50px -12px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.8)",
      }}>
        {/* corner crosshairs */}
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
            borderLeft: "1px solid var(--accent)",
            opacity: 0.7,
          }}/>
        ))}

        {/* Header bar */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          paddingBottom: 16, marginBottom: 20,
          borderBottom: "1px dashed var(--line-2)",
          fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.1em",
          color: "var(--muted)", textTransform: "uppercase",
        }}>
          <span style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <span style={{ color: "var(--accent)" }}>● LIVE</span>
            <span>SYS / ARCHITECTURE.MAP</span>
          </span>
          <span>NODES: 35 / LINKS: 42</span>
        </div>

        {/* Diagram body: side gutters + stacked layers */}
        <div style={{ position: "relative", display: "grid", gridTemplateColumns: "44px 1fr 44px", gap: 0 }}>
          {/* LEFT GUTTER — data flows up */}
          <FlowGutter direction="up" label="DATA" />

          {/* LAYERS */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {layers.map((L, idx) => (
              <Layer key={L.key} layer={L} idx={idx} total={layers.length}/>
            ))}
          </div>

          {/* RIGHT GUTTER — decisions flow down */}
          <FlowGutter direction="down" label="DECISIONS" />
        </div>

        {/* Footer caption */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          paddingTop: 18, marginTop: 18,
          borderTop: "1px dashed var(--line-2)",
          fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.1em",
          color: "var(--muted)", textTransform: "uppercase",
        }}>
          <span>↑ Data flows up</span>
          <span>↓ Decisions flow down</span>
        </div>
      </div>
    </div>
  );
}

function Layer({ layer, idx, total }) {
  // Layer = horizontal track with N nodes
  const nodeCount = layer.nodes;
  // Highlight one or two nodes per layer (deterministic pseudo-random)
  const accentIdx = (idx * 3 + 2) % nodeCount;
  const accent2Idx = (idx * 5 + 4) % nodeCount;
  return (
    <div style={{
      position: "relative",
      background: "var(--bg-2)",
      border: "1px solid var(--line)",
      borderRadius: 10,
      padding: "12px 14px",
      overflow: "hidden",
    }}>
      {/* Label */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        marginBottom: 10,
      }}>
        <span style={{
          fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.12em",
          textTransform: "uppercase", color: "var(--text-2)",
        }}>
          <span style={{ color: "var(--muted)" }}>{layer.sub}</span>
          <span style={{ color: "var(--muted-2)", margin: "0 8px" }}>/</span>
          {layer.label}
        </span>
        <span style={{
          fontFamily: "var(--mono)", fontSize: 10, color: "var(--muted)",
          opacity: 0.7,
        }}>
          {String(nodeCount).padStart(2,"0")} nodes
        </span>
      </div>

      {/* Node track */}
      <div style={{
        position: "relative", height: 26,
        display: "grid",
        gridTemplateColumns: `repeat(${nodeCount}, 1fr)`,
        alignItems: "center",
        gap: 4,
      }}>
        {/* connecting line */}
        <span style={{
          position: "absolute", left: 6, right: 6, top: "50%",
          height: 1, background: "var(--line-2)",
        }} />
        {Array.from({ length: nodeCount }).map((_, i) => {
          const isAccent = i === accentIdx;
          const isAccent2 = i === accent2Idx;
          return (
            <span key={i} style={{
              position: "relative",
              justifySelf: "center",
              width: isAccent ? 10 : 6,
              height: isAccent ? 10 : 6,
              borderRadius: "50%",
              background: isAccent ? "var(--accent)" :
                          isAccent2 ? "var(--blue)" :
                          "var(--line-3)",
              boxShadow: isAccent ? "0 0 10px var(--accent)" :
                         isAccent2 ? "0 0 8px var(--blue)" : "none",
              border: !isAccent && !isAccent2 ? "1px solid var(--line-3)" : "none",
              animation: isAccent ? "pulse-dot 2.4s ease-in-out infinite" : undefined,
              animationDelay: `${idx * 0.3}s`,
            }}/>
          );
        })}
      </div>

      {/* Sweep line (subtle) */}
      <span style={{
        position: "absolute", left: 0, right: 0, top: 0, height: "200%",
        background: "linear-gradient(180deg, transparent 0%, rgba(37,99,255,0.04) 50%, transparent 100%)",
        animation: `sweep 6s linear infinite`, animationDelay: `${idx * 1.1}s`,
        pointerEvents: "none",
      }}/>
    </div>
  );
}

function FlowGutter({ direction, label }) {
  // vertical channel with animated dashed line
  const up = direction === "up";
  return (
    <div style={{
      position: "relative",
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "space-between",
      paddingTop: 6, paddingBottom: 6,
    }}>
      <span style={{
        fontFamily: "var(--mono)", fontSize: 9.5, letterSpacing: "0.18em",
        color: "var(--muted)", writingMode: "vertical-rl",
        transform: up ? "rotate(180deg)" : "rotate(0)",
        textTransform: "uppercase",
        marginTop: up ? 15 : 0
      }}>
        {label}
      </span>
      <svg width="14" height="100%" viewBox="0 0 14 200" preserveAspectRatio="none"
           style={{ position: "absolute", inset: 0, height: "100%", left: "50%", transform: "translateX(-50%)" }}>
        <line x1="7" y1="0" x2="7" y2="200" stroke="var(--line-2)" strokeWidth="1" strokeDasharray="3 4"
              style={{ animation: `flow 1.4s linear infinite`, animationDirection: up ? "reverse" : "normal" }}/>
        {/* arrowhead */}
        {up ? (
          <path d="M3 8 L7 2 L11 8" stroke="var(--accent)" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
        ) : (
          <path d="M3 192 L7 198 L11 192" stroke="var(--accent)" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
        )}
      </svg>
    </div>
  );
}


function Hero() {
  return (
    <section className="hero" data-screen-label="Hero">
      <div className="bg-grid"/>
      <div className="glow-spot"/>
      <div className="wrap hero-grid">
        {/* LEFT: copy */}
        <div>
          <LinkedInBanner/>
          <span className="hero-tag">
            <span className="pill">v2026</span>
            Custom operational software + AI systems
          </span>

          <h1 className="display">
            Operational systems<br/>
            that <em>actually</em> work.
          </h1>

          <p className="lead" style={{ marginBottom: 16 }}>
            If your operations run on calls, spreadsheets, or WhatsApp — <span style={{ color: "var(--text)", fontWeight: 500 }}>this is the system layer you're missing.</span>
          </p>

          <p style={{ fontSize: 16, lineHeight: 1.65, color: "var(--text-2)", maxWidth: "62ch", margin: "0 0 34px" }}>
            We build custom control towers, inventory intelligence, dispatch orchestration, predictive planning, and decision intelligence systems that enforce workflows, connect teams, and eliminate coordination gaps.
          </p>

          <div className="hero-cta">
            <a href="#audit" className="btn btn-primary">
              Find your system<ArrowRight/>
            </a>
            <a href="#systems" className="btn btn-ghost">
              Get your operational system map<ArrowUpRight/>
            </a>
          </div>

          {/* Above-the-fold proof — for LinkedIn skimmers */ }
          <div className="hero-proof">
            <div className="hero-proof-item">
              <b>~75%</b>
              <span>delay reduction</span>
            </div>
            <div className="hero-proof-item">
              <b>~70%</b>
              <span>leakage cut</span>
            </div>
            <div className="hero-proof-item">
              <b>30–50%</b>
              <span>faster decisions</span>
            </div>
            <div className="hero-proof-item hero-proof-meta">
              <b><span className="live-dot"/>SYSTEM MAP</b>
              <span>30-min diagnostic</span>
            </div>
          </div>
        </div>

        {/* RIGHT: architecture diagram */ }
        <div>
          <HeroDiagram/>
        </div>
      </div>
    </section>
  );
}

window.Hero = Hero;
