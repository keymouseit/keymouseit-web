// KeyMouse IT V2 — Founder section (editorial, human, trust-building).

function FounderV2() {
  const domains = ["Identity & Security", "Healthcare", "Logistics", "Fintech", "Education", "Energy"];
  return (
    <section className="section" id="founder" style={{ position: "relative", overflow: "hidden" }}>
      <div className="container">
        <div className="v2-hero-grid" style={{ display: "grid", gridTemplateColumns: "0.82fr 1.18fr", gap: 60, alignItems: "center" }}>
          {/* portrait */}
          <Reveal>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", inset: -14, borderRadius: 28, background: "linear-gradient(150deg, rgba(37,99,255,0.12), rgba(124,58,237,0.10))", filter: "blur(2px)" }} />
              <div style={{ position: "relative", borderRadius: 22, overflow: "hidden", border: "1px solid var(--line)", boxShadow: "var(--sh-xl)", background: "#fff" }}>
                <image-slot id="founder-photo-v2" style={{ display: "block", width: "100%", height: "440px" }} shape="rect" placeholder="Drop founder photo"></image-slot>
              </div>
              <div className="glass" style={{ position: "absolute", bottom: 16, left: 16, right: 16, borderRadius: 14, padding: "14px 18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: 17, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.01em" }}>Shiven Juneja</div>
                  <div style={{ fontSize: 13, color: "var(--muted)" }}>Founder &amp; CEO</div>
                </div>
                <span className="pill"><span className="dot" />10+ yrs delivery</span>
              </div>
            </div>
          </Reveal>

          {/* story */}
          <Reveal delay={80}>
            <Eyebrow>The founder</Eyebrow>
            <h2 className="h2" style={{ marginTop: 16 }}>Built by engineers who understand delivery.</h2>
            <p className="lead" style={{ marginTop: 20 }}>
              Over the last 10+ years, Shiven Juneja has led the delivery of software products across identity, healthcare, logistics, education, fintech, retail, and energy.
            </p>
            <p className="body" style={{ marginTop: 16, fontSize: 16.5 }}>
              KeyMouse was built to help companies turn complex operational challenges into scalable software systems — engineered to perform, secure by default, and ready for AI.
            </p>

            {/* founder quote */}
            <div style={{ marginTop: 24, padding: "20px 24px", borderLeft: "3px solid var(--blue)", background: "linear-gradient(180deg, rgba(37,99,255,0.05), rgba(124,58,237,0.03))", borderRadius: "0 12px 12px 0" }}>
              <p style={{ fontSize: 17, lineHeight: 1.55, color: "var(--text)", fontWeight: 500, fontStyle: "italic", letterSpacing: "-0.01em", margin: 0 }}>
                “We don't just build software. We build systems that make operations faster, clearer, and easier to scale.”
              </p>
            </div>

            {/* credibility markers */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 24px", marginTop: 24 }}>
              {[["Briefcase,Award", "10+ years in product engineering"], ["Boxes,Box", "50+ projects delivered"], ["Globe,Layers", "Multiple industries served"], ["UserCheck,Users", "Founder-led delivery"]].map(([ic, t]) => (
                <div key={t} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ width: 28, height: 28, flexShrink: 0, borderRadius: 8, background: "var(--blue-50)", color: "var(--blue)", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name={ic} size={15} stroke={2} /></span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "var(--text-2)" }}>{t}</span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 28 }}>
              <Btn variant="primary" href="#contact" icon>Talk to the founder</Btn>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { FounderV2 });
