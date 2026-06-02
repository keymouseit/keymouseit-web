// KeyMouse IT V2 — Problem section: scroll-driven Before KeyMouse / After KeyMouse.
// Disconnected, drifting tools with warning badges → one connected system around an
// AI Processing Layer, with outcome chips. Auto-flips on scroll; pills allow manual control.

const { useState: useStateP, useEffect: useEffectP, useRef: useRefP } = React;

const TOOLS = [
  { t: "CRM", i: "Users" }, { t: "ERP", i: "Layers" }, { t: "Email", i: "Mail" },
  { t: "Spreadsheets", i: "Table,Sheet" }, { t: "Inventory", i: "Package" }, { t: "Documents", i: "FileText" },
];
// scattered (messy) positions, %                ring (organized) positions computed
const SCATTER = [{ x: 16, y: 16 }, { x: 74, y: 12 }, { x: 88, y: 46 }, { x: 70, y: 84 }, { x: 14, y: 80 }, { x: 32, y: 50 }];
const ring = (i, n = 6) => { const a = (-90 + i * (360 / n)) * Math.PI / 180; return { x: 50 + 38 * Math.cos(a), y: 50 + 38 * Math.sin(a) }; };

const BADGES = [
  { t: "Duplicate data", x: 50, y: 8, i: "Copy" },
  { t: "Manual handoff", x: 86, y: 70, i: "Hand,MousePointerClick" },
  { t: "Delayed decisions", x: 12, y: 52, i: "Clock" },
];
const OUTCOMES = ["Less manual work", "Faster decisions", "Real-time visibility", "Scalable operations"];

function SilosViz({ connected }) {
  return (
    <div style={{ position: "relative", width: "100%", aspectRatio: "1 / 1", maxWidth: 480, margin: "0 auto" }}>
      {/* connection lines */}
      <svg viewBox="0 0 100 100" width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
        {/* messy broken red lines (before) */}
        <g style={{ opacity: connected ? 0 : 1, transition: "opacity 0.4s var(--ease)" }}>
          {[[0, 5], [1, 2], [3, 4], [5, 1], [2, 3]].map(([a, b], k) => (
            <line key={k} x1={SCATTER[a].x} y1={SCATTER[a].y} x2={SCATTER[b].x} y2={SCATTER[b].y} stroke="#F0792B" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.55" />
          ))}
        </g>
        {/* clean blue lines to center (after) */}
        <g style={{ opacity: connected ? 1 : 0, transition: "opacity 0.5s var(--ease) 0.15s" }}>
          {TOOLS.map((_, i) => { const p = ring(i); return <line key={i} x1="50" y1="50" x2={p.x} y2={p.y} stroke="rgba(37,99,255,0.5)" strokeWidth="0.5" strokeDasharray="1.4 1.4" className={connected ? "flow-line" : ""} />; })}
        </g>
      </svg>

      {/* center hub (after) */}
      <div style={{ position: "absolute", left: "50%", top: "50%", transform: `translate(-50%,-50%) scale(${connected ? 1 : 0.6})`, display: "flex", flexDirection: "column", alignItems: "center", transition: "opacity 0.5s var(--ease), transform 0.5s var(--ease)", opacity: connected ? 1 : 0, pointerEvents: "none", zIndex: 3 }}>
        <div className={connected ? "core-glow" : ""} style={{ width: 92, height: 92, borderRadius: "50%", background: "linear-gradient(150deg,#2563FF,#7C3AED)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 16px 40px rgba(37,99,255,0.4)" }}>
          <Icon name="BrainCircuit,Brain" size={36} color="#fff" stroke={1.9} />
        </div>
        <div style={{ marginTop: 9, fontFamily: "var(--mono)", fontSize: 9.5, fontWeight: 700, letterSpacing: 0.4, color: "var(--blue)", textTransform: "uppercase", background: "#fff", padding: "4px 9px", borderRadius: 6, boxShadow: "var(--sh-xs)", whiteSpace: "nowrap" }}>AI Processing Layer</div>
      </div>

      {/* warning badges (before) */}
      {BADGES.map((b) => (
        <div key={b.t} style={{ position: "absolute", left: `${b.x}%`, top: `${b.y}%`, transform: "translate(-50%,-50%)", transition: "opacity 0.4s var(--ease)", opacity: connected ? 0 : 1, zIndex: 4, pointerEvents: "none" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#fff", border: "1px solid #FCD9C4", color: "#D9531E", borderRadius: 999, padding: "5px 10px", fontSize: 11, fontWeight: 600, boxShadow: "var(--sh-sm)", whiteSpace: "nowrap" }}>
            <Icon name={b.i} size={12} stroke={2} />{b.t}
          </span>
        </div>
      ))}

      {/* tool chips */}
      {TOOLS.map((tool, i) => {
        const pos = connected ? ring(i) : SCATTER[i];
        return (
          <div key={tool.t} className={connected ? "" : ["drift-a", "drift-b", "drift-c"][i % 3]}
            style={{ position: "absolute", left: `${pos.x}%`, top: `${pos.y}%`, transform: "translate(-50%,-50%)", transition: "left 0.7s var(--ease), top 0.7s var(--ease)", zIndex: 2 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "8px 12px", background: "#fff", borderRadius: 11, border: `1px solid ${connected ? "var(--blue-100)" : "var(--line-strong)"}`, boxShadow: connected ? "var(--sh-md)" : "var(--sh-sm)", transition: "border-color 0.5s, box-shadow 0.5s", whiteSpace: "nowrap" }}>
              <span style={{ width: 24, height: 24, borderRadius: 7, background: connected ? "var(--blue-50)" : "#F1F3F7", color: connected ? "var(--blue)" : "var(--faint)", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.5s" }}>
                <Icon name={tool.i} size={13} stroke={2} />
              </span>
              <span style={{ fontSize: 12.5, fontWeight: 600, color: "var(--text)" }}>{tool.t}</span>
            </div>
          </div>
        );
      })}

      {/* "no single source of truth" (before) */}
      <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", transition: "opacity 0.4s", opacity: connected ? 0 : 1, zIndex: 1, pointerEvents: "none" }}>
        <span style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 0.5, color: "var(--faint)", textTransform: "uppercase", textAlign: "center", display: "block", maxWidth: 120 }}>No single source of truth</span>
      </div>
    </div>
  );
}

function ProblemV2() {
  const trackRef = useRefP(null);
  const [connected, setConnected] = useStateP(false);
  const [manual, setManual] = useStateP(false); // user took control via pills

  // GSAP pinned scrub on desktop; lightweight scroll-flip on mobile. Reduced-motion safe.
  useEffectP(() => {
    if (manual) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const gsap = window.gsap, ST = window.ScrollTrigger;
    const section = trackRef.current;
    if (!section) return;

    // Fallback (mobile / no-GSAP / reduced-motion): flip on scroll position, no pin.
    if (!gsap || !ST || reduce || window.innerWidth < 769) {
      let raf = null;
      const onScroll = () => {
        if (raf) return;
        raf = requestAnimationFrame(() => {
          raf = null;
          const r = section.getBoundingClientRect();
          const vh = window.innerHeight || 800;
          setConnected(r.top + r.height / 2 < vh * 0.55);
        });
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
    }

    // Desktop: pin the section and scrub the Before→After state across the pin distance.
    gsap.registerPlugin(ST);
    let st;
    const ctx = gsap.context(() => {
      st = ST.create({
        trigger: section,
        start: "top top",
        end: "+=900",
        scrub: 0.6,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        onUpdate: (self) => setConnected(self.progress > 0.45),
      });
    }, section);
    const refresh = () => ST.refresh();
    window.addEventListener("load", refresh);
    const t = setTimeout(refresh, 400);
    return () => { ctx.revert(); window.removeEventListener("load", refresh); clearTimeout(t); };
  }, [manual]);

  const setState = (v) => { setManual(true); setConnected(v); };

  return (
    <section className="section band" id="problem" ref={trackRef}>
      <div className="container">
        <div className="v2-hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}>
          {/* copy */}
          <div>
            <Eyebrow>The real problem</Eyebrow>
            <h2 className="h2" style={{ marginTop: 16 }}>Your tools aren't the problem. <span className="grad-text">Silos are.</span></h2>
            <p className="lead" style={{ marginTop: 18 }}>
              Disconnected systems create manual work, slow decisions, and hidden operational costs.
            </p>

            {/* before/after pills */}
            <div style={{ display: "inline-flex", gap: 4, marginTop: 28, background: "#fff", border: "1px solid var(--line)", borderRadius: 12, padding: 5 }}>
              {[["Before KeyMouse", false], ["After KeyMouse", true]].map(([label, v]) => (
                <button key={label} onClick={() => setState(v)} style={{
                  border: 0, cursor: "pointer", borderRadius: 8, padding: "10px 18px", fontSize: 13.5, fontWeight: 600, fontFamily: "var(--font)",
                  background: connected === v ? "var(--blue)" : "transparent", color: connected === v ? "#fff" : "var(--muted)", transition: "all 0.18s",
                }}>{label}</button>
              ))}
            </div>

            {/* state-dependent copy */}
            <div style={{ marginTop: 24, minHeight: 90 }}>
              <p className="body" key={connected ? "a" : "b"} style={{ fontSize: 16, color: connected ? "var(--text)" : "var(--text-2)", fontWeight: connected ? 500 : 400, transition: "color 0.3s" }}>
                {connected
                  ? "KeyMouse connects your tools, workflows, and data into intelligent systems that create real-time visibility and measurable outcomes."
                  : "Disconnected tools create duplicate work, manual handoffs, and delayed decisions."}
              </p>
              {/* outcome chips (after) */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 9, marginTop: 16, opacity: connected ? 1 : 0, transform: connected ? "none" : "translateY(6px)", transition: "opacity 0.4s var(--ease), transform 0.4s var(--ease)", pointerEvents: connected ? "auto" : "none" }}>
                {OUTCOMES.map((o) => (
                  <span key={o} className="pill" style={{ background: "var(--blue-50)", borderColor: "var(--blue-100)", color: "var(--blue-700)" }}>
                    <Icon name="Check" size={13} stroke={2.6} color="var(--blue)" />{o}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* viz */}
          <div className="card" style={{ padding: 24, borderRadius: 22, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 18, left: 24, fontFamily: "var(--mono)", fontSize: 11, letterSpacing: 1, textTransform: "uppercase", color: connected ? "var(--blue)" : "#D9531E", transition: "color 0.4s", zIndex: 5 }}>
              {connected ? "Connected system" : "Disconnected tools"}
            </div>
            <div style={{ paddingTop: 18 }}><SilosViz connected={connected} /></div>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { ProblemV2 });
