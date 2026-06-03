// KeyMouse IT — Why Choose Us + Founder.

/* ---------------- Why Choose Us ---------------- */
function WhyChoose() {
  return (
    <section className="section" id="why">
      <div className="container">
        <Reveal><SectionHead center maxWidth={640}
          eyebrow="Why companies choose us"
          title="Trusted for execution, not presentations."
          lead="We're measured by what we ship and the results it drives — not by decks and demos." /></Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 22, marginTop: 56 }}>
          {window.WHY.map((w, i) => (
            <Reveal key={w.title} delay={(i % 3) * 70}>
              <div className="card hover" style={{ padding: "30px 28px", height: "100%" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <span className="icon-chip" style={{ width: 46, height: 46 }}><Icon name={w.icon} size={22} stroke={1.9} /></span>
                  <h3 className="h3" style={{ fontSize: 18.5 }}>{w.title}</h3>
                </div>
                <p className="body" style={{ marginTop: 16, fontSize: 15 }}>{w.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Founder ---------------- */
function FounderSection() {
  return (
    <section className="section ink" id="founder" style={{ overflow: "hidden", position: "relative" }}>
      <div style={{ position: "absolute", top: -140, left: -120, width: 480, height: 480, background: "radial-gradient(circle, rgba(37,99,255,0.22), transparent 68%)", pointerEvents: "none" }} />
      <div className="container" style={{ position: "relative" }}>
        <div style={{ display: "grid", gridTemplateColumns: "0.78fr 1.22fr", gap: 64, alignItems: "center" }}>
          {/* photo */}
          <Reveal>
            <div style={{ position: "relative" }}>
              <div style={{ borderRadius: 22, overflow: "hidden", border: "1px solid rgba(255,255,255,0.12)", boxShadow: "var(--sh-xl)" }}>
                <image-slot id="founder-photo" style={{ display: "block", width: "100%", height: "420px" }} shape="rect" placeholder="Drop founder photo"></image-slot>
              </div>
              <div style={{ position: "absolute", bottom: 18, left: 18, right: 18, background: "rgba(11,17,32,0.72)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 14, padding: "14px 18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: 17, fontWeight: 700, color: "#fff" }}>Shiven Juneja</div>
                  <div style={{ fontSize: 13, color: "#9FB0C8" }}>Founder &amp; CEO</div>
                </div>
                <span className="pill" style={{ background: "rgba(255,255,255,0.06)", borderColor: "rgba(255,255,255,0.16)", color: "#C7D2E0" }}><span className="dot" />10+ yrs delivery</span>
              </div>
            </div>
          </Reveal>

          {/* text */}
          <Reveal delay={80}>
            <Eyebrow>Founder</Eyebrow>
            <h2 className="h2" style={{ marginTop: 16 }}>Built by engineers who understand delivery.</h2>
            <p className="lead" style={{ marginTop: 20, fontSize: 19, color: "#B9C6D9" }}>
              Over the last 10+ years, Shiven has led the delivery of software products across healthcare, logistics, education, fintech, retail, and enterprise identity.
            </p>
            <p className="body" style={{ marginTop: 18, fontSize: 16.5, color: "#9FB0C8" }}>
              His focus: helping organizations transform complex operational challenges into scalable software systems — built to perform, secure by default, and ready for AI.
            </p>
            <div style={{ display: "flex", gap: 14, marginTop: 32, flexWrap: "wrap" }}>
              <Btn variant="primary" href="#contact" icon>Book a strategy call</Btn>
              <Btn variant="ink" href="#cases">See the work</Btn>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { WhyChoose, FounderSection });
