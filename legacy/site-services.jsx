// KeyMouse IT — Services, Engagement Models, Delivery Process.

/* ---------------- Services ---------------- */
function ServicesSection() {
  return (
    <section className="section" id="services">
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "0.82fr 1.18fr", gap: 64, alignItems: "start" }}>
          <Reveal>
            <div style={{ position: "sticky", top: 100 }}>
              <Eyebrow>Services</Eyebrow>
              <h2 className="h2" style={{ marginTop: 16 }}>Full-cycle engineering for products that need to scale.</h2>
              <p className="lead" style={{ marginTop: 18 }}>
                One partner across the entire lifecycle — strategy, design, engineering, AI, and operations. No hand-offs, no gaps.
              </p>
              <div style={{ marginTop: 28 }}><Btn variant="primary" href="#contact" icon>Start a project</Btn></div>
            </div>
          </Reveal>

          <div className="card" style={{ overflow: "hidden" }}>
            {window.SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={i * 40}>
                <div className="svc-row" style={{ display: "flex", alignItems: "center", gap: 20, padding: "22px 26px", borderTop: i === 0 ? "none" : "1px solid var(--line)", transition: "background 0.16s" }}>
                  <span className="icon-chip plain" style={{ width: 48, height: 48, borderRadius: 13 }}><Icon name={s.icon} size={22} stroke={1.9} /></span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 17.5, fontWeight: 700, color: "var(--text)", letterSpacing: "-0.01em" }}>{s.title}</div>
                    <div className="body" style={{ fontSize: 14.5, marginTop: 3 }}>{s.desc}</div>
                  </div>
                  <span style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--faint)" }}>{String(i + 1).padStart(2, "0")}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Engagement Models ---------------- */
function EngagementModels() {
  return (
    <section className="section band" id="models">
      <div className="container">
        <Reveal><SectionHead center maxWidth={640}
          eyebrow="Engagement models"
          title="Flexible models to fit your needs."
          lead="Engage the way that suits your stage and goals — from a dedicated team to a strategic partnership." /></Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20, marginTop: 52 }}>
          {window.MODELS.map((m, i) => (
            <Reveal key={m.title} delay={i * 70}>
              <div className="card hover" style={{ padding: "28px 26px", height: "100%", display: "flex", flexDirection: "column" }}>
                <span className="icon-chip" style={{ width: 50, height: 50, borderRadius: 14 }}><Icon name={m.icon} size={23} stroke={1.9} /></span>
                <h3 className="h3" style={{ marginTop: 22, fontSize: 19 }}>{m.title}</h3>
                <p className="body" style={{ marginTop: 10, fontSize: 14.5, flex: 1 }}>{m.desc}</p>
                <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid var(--line)", display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: 0.8, textTransform: "uppercase", color: "var(--faint)" }}>Best for</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "var(--blue)" }}>{m.best}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Delivery Process ---------------- */
function DeliveryProcess() {
  return (
    <section className="section" id="process">
      <div className="container">
        <Reveal><SectionHead center maxWidth={600}
          eyebrow="Delivery process"
          title="Clear steps. Measurable results."
          lead="A disciplined path from first conversation to a system that scales with you." /></Reveal>

        <div style={{ position: "relative", marginTop: 60 }}>
          {/* connecting line */}
          <div style={{ position: "absolute", top: 27, left: "8%", right: "8%", height: 2, background: "linear-gradient(90deg, var(--blue-100), var(--blue), var(--blue-100))", opacity: 0.5 }} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 16, position: "relative" }}>
            {window.PROCESS.map((p, i) => (
              <Reveal key={p.n} delay={i * 80}>
                <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <span style={{ width: 56, height: 56, borderRadius: "50%", background: "#fff", border: "2px solid var(--blue)", color: "var(--blue)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "var(--sh-md)", position: "relative", zIndex: 1 }}>
                    <Icon name={p.icon} size={24} stroke={2} />
                  </span>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 12, fontWeight: 600, color: "var(--blue)", marginTop: 16, letterSpacing: 1 }}>{p.n}</div>
                  <div style={{ fontSize: 16.5, fontWeight: 700, color: "var(--text)", marginTop: 6, letterSpacing: "-0.01em" }}>{p.title}</div>
                  <div className="body" style={{ fontSize: 13.5, marginTop: 7, lineHeight: 1.5 }}>{p.desc}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { ServicesSection, EngagementModels, DeliveryProcess });
