// KeyMouse IT — Problem section + Featured Case Studies.

/* ---------------- Problem ---------------- */
function ProblemSection() {
  return (
    <section className="section band" id="problem">
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "0.92fr 1.08fr", gap: 72, alignItems: "start" }}>
          <Reveal>
            <Eyebrow>The real problem</Eyebrow>
            <h2 className="h2" style={{ marginTop: 16 }}>Your tools aren't the problem. <span style={{ color: "var(--blue)" }}>Silos are.</span></h2>
            <p className="lead" style={{ marginTop: 18 }}>
              Most growing companies struggle because data, workflows, and decisions are scattered across disconnected systems — not because they're missing another tool.
            </p>
            <div style={{ marginTop: 28 }}>
              <a className="linka" href="#solutions">See how we connect them <Arrow /></a>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {window.PROBLEMS.map((p, i) => (
              <Reveal key={p.title} delay={i * 60}>
                <div className="card hover" style={{ padding: "22px 22px", display: "flex", alignItems: "center", gap: 15, height: "100%" }}>
                  <span style={{ width: 44, height: 44, flexShrink: 0, borderRadius: 12, background: "#FEF2F2", border: "1px solid #FEE2E2", color: "#E11D48", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon name={p.icon} size={20} stroke={2} />
                  </span>
                  <span style={{ fontSize: 15.5, fontWeight: 600, color: "var(--text)", lineHeight: 1.3 }}>{p.title}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Featured Case Studies ---------------- */
function CaseCard({ c, i }) {
  return (
    <Reveal delay={i * 80}>
      <div className="card hover" style={{ padding: 0, overflow: "hidden", height: "100%", display: "flex", flexDirection: "column" }}>
        {/* header band */}
        <div style={{ padding: "24px 26px", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "space-between", background: "linear-gradient(180deg,#FBFCFE,#fff)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
            <span className="icon-chip"><Icon name={c.icon} size={22} stroke={2} /></span>
            <div>
              <div style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: 1, textTransform: "uppercase", color: "var(--muted)" }}>{c.industry}</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginTop: 3, letterSpacing: "-0.01em" }}>{c.title}</div>
            </div>
          </div>
          <span className="pill" style={{ fontSize: 11.5 }}><span className="dot" />{c.tag}</span>
        </div>
        {/* body */}
        <div style={{ padding: "24px 26px", display: "flex", flexDirection: "column", gap: 16, flex: 1 }}>
          <div>
            <div style={{ fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: 1, textTransform: "uppercase", color: "var(--faint)", marginBottom: 5 }}>Challenge</div>
            <div className="body" style={{ fontSize: 15 }}>{c.challenge}</div>
          </div>
          <div>
            <div style={{ fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: 1, textTransform: "uppercase", color: "var(--faint)", marginBottom: 5 }}>Solution</div>
            <div className="body" style={{ fontSize: 15 }}>{c.solution}</div>
          </div>
        </div>
        {/* impact footer */}
        <div style={{ padding: "18px 26px", borderTop: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 28 }}>
            {c.impact.map((m) => (
              <div key={m.l}>
                <div style={{ fontSize: 21, fontWeight: 800, color: "var(--blue)", letterSpacing: "-0.02em" }}>{m.v}</div>
                <div style={{ fontSize: 11.5, color: "var(--muted)", marginTop: 1 }}>{m.l}</div>
              </div>
            ))}
          </div>
          <a className="linka" href="#contact" style={{ fontSize: 14 }}>View Case Study <Arrow size={15} /></a>
        </div>
      </div>
    </Reveal>
  );
}

function CaseStudies() {
  return (
    <section className="section" id="cases">
      <div className="container">
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
          <Reveal>
            <Eyebrow>Featured case studies</Eyebrow>
            <h2 className="h2" style={{ marginTop: 16 }}>Real systems. Real business outcomes.</h2>
          </Reveal>
          <Reveal delay={80}><a className="linka" href="#contact">Browse all work <Arrow /></a></Reveal>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22, marginTop: 44 }}>
          {window.CASES.map((c, i) => <CaseCard key={c.title} c={c} i={i} />)}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { ProblemSection, CaseStudies });
