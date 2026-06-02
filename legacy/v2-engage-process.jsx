// KeyMouse IT V2 — Engagement Models with "What do you need?" selector
// + scroll-activated horizontal Delivery Process timeline.

const { useState: useStateE, useEffect: useEffectE } = React;

/* ---- Engagement models + recommender ---- */
const NEEDS = [
  { id: "scratch", label: "Build from scratch", rec: 0, icon: "Rocket,Sparkles" },
  { id: "modernize", label: "Modernize existing product", rec: 1, icon: "RefreshCw,Wrench" },
  { id: "capacity", label: "Add engineering capacity", rec: 2, icon: "UserPlus" },
  { id: "partner", label: "Long-term technology partner", rec: 3, icon: "Handshake,Compass" },
];

function EngagementV2() {
  const [need, setNeed] = useStateE("scratch");
  const recIdx = NEEDS.find((n) => n.id === need).rec;
  const models = window.MODELS;

  return (
    <section className="section band" id="models">
      <div className="container">
        <Reveal><SectionHead center maxWidth={640}
          eyebrow="Engagement models"
          title="Flexible models to fit your needs."
          lead="Choose the model that fits your stage, budget, and internal capacity." /></Reveal>

        {/* selector */}
        <Reveal delay={60}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 44 }}>
            <div style={{ fontFamily: "var(--mono)", fontSize: 11.5, letterSpacing: 1.2, textTransform: "uppercase", color: "var(--muted)", marginBottom: 16 }}>What do you need?</div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
              {NEEDS.map((n) => {
                const on = need === n.id;
                return (
                  <button key={n.id} onClick={() => setNeed(n.id)} style={{
                    display: "inline-flex", alignItems: "center", gap: 9, cursor: "pointer",
                    border: `1px solid ${on ? "var(--blue)" : "var(--line-strong)"}`, borderRadius: 999,
                    background: on ? "var(--blue)" : "#fff", color: on ? "#fff" : "var(--text-2)",
                    padding: "11px 20px", fontSize: 14.5, fontWeight: 600, fontFamily: "var(--font)",
                    boxShadow: on ? "var(--sh-blue)" : "var(--sh-xs)", transition: "all 0.18s var(--ease)",
                  }}>
                    <Icon name={n.icon} size={17} stroke={2} color={on ? "#fff" : "var(--blue)"} />
                    {n.label}
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* models */}
        <div className="grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20, marginTop: 40 }}>
          {models.map((m, i) => {
            const rec = i === recIdx;
            return (
              <Reveal key={m.title} delay={i * 70}>
                <div className="card" style={{
                  padding: "28px 24px", height: "100%", display: "flex", flexDirection: "column", position: "relative",
                  border: rec ? "1.5px solid var(--blue)" : "1px solid var(--line)",
                  boxShadow: rec ? "0 18px 40px rgba(37,99,255,0.16)" : "var(--sh-sm)",
                  transform: rec ? "translateY(-4px)" : "none", transition: "all 0.3s var(--ease)",
                }}>
                  {rec && <span style={{ position: "absolute", top: -11, left: 24, background: "var(--blue)", color: "#fff", fontSize: 11, fontWeight: 700, letterSpacing: 0.4, padding: "4px 11px", borderRadius: 999, boxShadow: "var(--sh-blue)", display: "inline-flex", alignItems: "center", gap: 5 }}><Icon name="Sparkles" size={12} stroke={2.2} />Recommended</span>}
                  <span className="icon-chip" style={{ width: 48, height: 48, borderRadius: 14, background: rec ? "var(--blue)" : "var(--blue-50)", color: rec ? "#fff" : "var(--blue)", borderColor: rec ? "var(--blue)" : "var(--blue-100)" }}><Icon name={m.icon} size={22} stroke={1.9} /></span>
                  <h3 className="h3" style={{ marginTop: 20, fontSize: 18 }}>{m.title}</h3>
                  <p className="body" style={{ marginTop: 10, fontSize: 14, flex: 1 }}>{m.desc}</p>
                  <div style={{ marginTop: 18, paddingTop: 14, borderTop: "1px solid var(--line)", display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 0.6, textTransform: "uppercase", color: "var(--faint)" }}>Best for</span>
                    <span style={{ fontSize: 12.5, fontWeight: 600, color: "var(--blue)" }}>{m.best}</span>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---- Delivery Process — scroll-activated horizontal timeline ---- */
function ProcessV2() {
  const data = window.PROCESS;
  const [active, setActive] = useStateE(0);
  const trackRef = React.useRef(null);

  useEffectE(() => {
    let raf = null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        const el = trackRef.current; if (!el) return;
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight || 800;
        // progress of the section center through the viewport
        const center = r.top + r.height / 2;
        const p = 1 - (center - vh * 0.32) / (vh * 0.46);
        const clamped = Math.max(0, Math.min(0.999, p));
        setActive(Math.floor(clamped * data.length));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, [data.length]);

  const pct = data.length > 1 ? (active / (data.length - 1)) * 100 : 0;

  return (
    <section className="section" id="process">
      <div className="container">
        <Reveal><SectionHead center maxWidth={560}
          eyebrow="Delivery process"
          title="Clear steps. Measurable results."
          lead="A disciplined path from first conversation to a system that scales with you." /></Reveal>

        <div ref={trackRef} style={{ position: "relative", marginTop: 64 }}>
          {/* base line + progress */}
          <div className="proc-line" style={{ position: "absolute", top: 27, left: "8%", right: "8%", height: 2, background: "var(--line-strong)" }} />
          <div className="proc-line" style={{ position: "absolute", top: 27, left: "8%", width: `calc((100% - 16%) * ${pct / 100})`, height: 2, background: "linear-gradient(90deg,#2563FF,#7C3AED)", transition: "width 0.5s var(--ease)" }} />

          <div className="proc-grid" style={{ display: "grid", gridTemplateColumns: `repeat(${data.length},1fr)`, gap: 14, position: "relative" }}>
            {data.map((p, i) => {
              const on = i <= active;
              const cur = i === active;
              return (
                <div key={p.n} className="proc-step" style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", transition: "opacity 0.4s", opacity: on ? 1 : 0.5 }}>
                  <span className="proc-dot" style={{
                    width: 56, height: 56, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    background: on ? "linear-gradient(150deg,#2563FF,#7C3AED)" : "#fff",
                    border: on ? "0" : "2px solid var(--line-strong)",
                    color: on ? "#fff" : "var(--faint)", position: "relative", zIndex: 1,
                    boxShadow: cur ? "0 10px 26px rgba(37,99,255,0.4)" : (on ? "var(--sh-md)" : "none"),
                    transform: cur ? "scale(1.12)" : "scale(1)", transition: "all 0.4s var(--ease)",
                  }}>
                    <Icon name={p.icon} size={24} stroke={2} />
                  </span>
                  <div className="proc-body">
                    <div style={{ fontFamily: "var(--mono)", fontSize: 12, fontWeight: 600, color: on ? "var(--blue)" : "var(--faint)", marginTop: 16, letterSpacing: 1 }}>{p.n}</div>
                    <div style={{ fontSize: 16.5, fontWeight: 700, color: "var(--text)", marginTop: 6, letterSpacing: "-0.01em" }}>{p.title}</div>
                    <div className="body" style={{ fontSize: 13.5, marginTop: 7, lineHeight: 1.5 }}>{p.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { EngagementV2, ProcessV2 });
