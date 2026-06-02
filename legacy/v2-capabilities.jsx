// KeyMouse IT V2 — Engineering Capabilities (Plan → Build → Scale stack).

const CAP_STAGES = [
  { stage: "Plan", n: "01", icon: "Compass,Map", caps: [
    { t: "Strategy & Architecture", d: "Requirements, discovery, and architecture planning.", i: "Compass,Map" },
    { t: "Product Design", d: "UX, UI, workflows, and prototyping.", i: "PenTool,Figma" },
  ] },
  { stage: "Build", n: "02", icon: "Code2,Code", caps: [
    { t: "Engineering", d: "Frontend, backend, mobile, and integrations.", i: "Code2,Code" },
    { t: "AI Automation", d: "Agents, workflow automation, and AI integrations.", i: "Sparkles" },
    { t: "QA & Release", d: "Manual and automated quality assurance.", i: "CircleCheck,CheckCircle" },
  ] },
  { stage: "Scale", n: "03", icon: "TrendingUp", caps: [
    { t: "Cloud & DevOps", d: "Infrastructure, CI/CD, and monitoring.", i: "Cloud" },
    { t: "Maintenance & Support", d: "Post-launch support and optimization.", i: "LifeBuoy,Headphones" },
  ] },
];

function StagePanel({ s, i, open, onToggle }) {
  return (
    <Reveal delay={i * 110} className="cap-panel">
      <div className="card" style={{ padding: 0, overflow: "hidden", height: "100%", display: "flex", flexDirection: "column" }}>
        <button className="cap-head" aria-expanded={open} onClick={onToggle} style={{ display: "flex", alignItems: "center", gap: 12, padding: "20px 24px", borderBottom: "1px solid var(--line)", background: "linear-gradient(180deg,#FBFCFE,#fff)", width: "100%", border: 0, borderBottomWidth: 1, borderBottomStyle: "solid", borderBottomColor: "var(--line)", cursor: "pointer", textAlign: "left", fontFamily: "var(--font)" }}>
          <span className="icon-chip" style={{ width: 42, height: 42 }}><Icon name={s.icon} size={21} stroke={2} /></span>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: 1, color: "var(--faint)" }}>{s.n}</div>
            <div style={{ fontSize: 19, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.01em" }}>{s.stage}</div>
          </div>
          <span className="cap-chev" style={{ color: "var(--blue)", transition: "transform 0.28s var(--ease)", transform: open ? "rotate(180deg)" : "none" }}><Icon name="ChevronDown" size={20} stroke={2.2} /></span>
        </button>
        <div className={`cap-body ${open ? "open" : ""}`} style={{ flex: 1 }}>
          <div className="cap-body-inner">
            {s.caps.map((c, j) => (
              <div key={c.t} className="svc-row" style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "18px 24px", borderTop: j === 0 ? "none" : "1px solid var(--line-2)" }}>
                <span className="icon-chip plain" style={{ width: 38, height: 38, borderRadius: 11 }}><Icon name={c.i} size={18} stroke={1.9} /></span>
                <div>
                  <div style={{ fontSize: 15.5, fontWeight: 700, color: "var(--text)" }}>{c.t}</div>
                  <div className="body" style={{ fontSize: 13.5, marginTop: 3 }}>{c.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function CapabilitiesV2() {
  const [open, setOpen] = React.useState(0);
  return (
    <section className="section" id="services">
      <div className="container">
        <Reveal><SectionHead center maxWidth={700}
          eyebrow="Engineering capabilities"
          title="Engineering capabilities for systems that need to scale."
          lead="One partner across the entire lifecycle — from strategy to scale. No hand-offs, no gaps." /></Reveal>

        <div className="cap-stack" style={{ display: "flex", alignItems: "stretch", gap: 0, marginTop: 52 }}>
          {CAP_STAGES.map((s, i) => (
            <React.Fragment key={s.stage}>
              <div style={{ flex: 1, display: "flex" }}><StagePanel s={s} i={i} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} /></div>
              {i < CAP_STAGES.length - 1 && (
                <div className="cap-arrow" style={{ flexShrink: 0, display: "flex", alignItems: "center", padding: "0 14px" }}>
                  <span style={{ width: 38, height: 38, borderRadius: "50%", background: "#fff", border: "1px solid var(--line)", boxShadow: "var(--sh-sm)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--blue)" }}>
                    <Icon name="ArrowRight" size={18} stroke={2.4} />
                  </span>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { CapabilitiesV2 });
