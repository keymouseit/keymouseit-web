// DearDev hero redesign — three conversion-led variants.
// Shared chrome + per-variant focal element. Exports to window.

const NAV_LINKS = ["Work", "Services", "Industries", "About"];

function HeroNav() {
  return (
    <nav className="nav">
      <span className="wordmark">_DearDev</span>
      <div className="links">
        {NAV_LINKS.map(l => <a key={l} href="#">{l}</a>)}
        <a href="#" className="nav-cta">Book a call</a>
      </div>
    </nav>
  );
}

function Eyebrow({ children }) {
  return (
    <div className="eyebrow"><span className="tick" />{children}</div>
  );
}

function CtaRow() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 28, marginTop: 40, flexWrap: "wrap" }}>
      <a href="#" className="cta-primary">
        Book a discovery call
        <span className="arrow" aria-hidden="true">→</span>
      </a>
      <a href="#" className="cta-secondary">
        <span className="ln">See selected work</span>
      </a>
    </div>
  );
}

// Named-proof lozenge row (shared core proof)
function ProofRow({ items }) {
  return (
    <div className="proof-row">
      {items.map((t, i) => (
        <span key={i} className="lozenge"><span className="dot" />{t}</span>
      ))}
    </div>
  );
}

const PROOF = [
  "Live in 15+ countries",
  "Healthcare & government-grade",
  "Brands like Mercedes-Benz",
];

/* ============================================================
   VARIANT A — Speed / reliability angle. Focal: 3D glass render.
   ============================================================ */
function HeroSpeed() {
  return (
    <div className="hero-sys" style={{ position: "relative", minHeight: 840, overflow: "hidden" }}>
      <div className="glow" style={{ width: 620, height: 620, right: -120, top: -40, background: "radial-gradient(circle, rgba(71,125,240,0.55), transparent 70%)" }} />
      <HeroNav />
      <section style={{ position: "relative", padding: "92px 40px 0", display: "grid", gridTemplateColumns: "1.18fr 0.82fr", gap: 48, alignItems: "center", maxWidth: 1280, margin: "0 auto" }}>
        <div>
          <Eyebrow>AI-first product studio · Dubai × Chandigarh</Eyebrow>
          <h1 className="head" style={{ marginTop: 26 }}>
            Ship reliable products <span className="focal-word">faster</span> than your roadmap predicts.
          </h1>
          <p className="subhead">
            DearDev is the full-stack, AI-first engineering partner that turns ambitious
            roadmaps into shipped, production-grade software — for SaaS founders, CTOs, and ops leads.
          </p>
          <CtaRow />
          <div style={{ marginTop: 48 }}>
            <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "var(--h-faint)", fontWeight: 600, marginBottom: 14 }}>Proven in production</div>
            <ProofRow items={PROOF} />
          </div>
        </div>
        <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <img src="assets/hero-abstract.png" alt="DearDev product surfaces" style={{ width: "100%", maxWidth: 440, filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.55))" }} />
        </div>
      </section>
    </div>
  );
}

/* ============================================================
   VARIANT B — Regulated-domain angle. Focal: credibility card.
   ============================================================ */
function HireCard() {
  const rows = [
    { k: "Regulated builds", v: "Healthcare & government-grade systems, shipped and maintained." },
    { k: "Apps that go live", v: "On the App Store & Play Store in 15+ countries." },
    { k: "Brand-grade polish", v: "Product & brand work for Mercedes-Benz and William Adams." },
  ];
  return (
    <div style={{ background: "var(--h-card)", border: "1px solid var(--h-line)", padding: 32, boxShadow: "0 30px 70px rgba(0,0,0,0.5)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: "var(--h-mut)" }}>What teams hire us for</div>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--h-accent)", boxShadow: "0 0 12px rgba(67,189,250,0.9)" }} />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {rows.map((r, i) => (
          <div key={r.k} style={{ display: "flex", gap: 14, padding: "18px 0", borderTop: i === 0 ? "none" : "1px solid var(--h-line-2)" }}>
            <span style={{ marginTop: 3, color: "var(--h-accent)", flexShrink: 0 }} aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
            </span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15.5, color: "var(--h-fg)", marginBottom: 4 }}>{r.k}</div>
              <div style={{ fontSize: 14, lineHeight: 1.5, color: "var(--h-mut)" }}>{r.v}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 24, marginTop: 22, paddingTop: 20, borderTop: "1px solid var(--h-line)" }}>
        {[["60+", "products shipped"], ["10 yrs", "in production"], ["NDA", "ready, day one"]].map(([v, k]) => (
          <div key={k}>
            <div style={{ fontWeight: 800, fontSize: 22, color: "var(--h-fg)", letterSpacing: -0.5 }}>{v}</div>
            <div style={{ fontSize: 11.5, color: "var(--h-faint)", letterSpacing: 0.3, marginTop: 2 }}>{k}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HeroRegulated() {
  return (
    <div className="hero-sys" style={{ position: "relative", minHeight: 840, overflow: "hidden" }}>
      <div className="glow" style={{ width: 560, height: 560, left: -160, top: 120, background: "radial-gradient(circle, rgba(142,65,201,0.4), transparent 70%)" }} />
      <HeroNav />
      <section style={{ position: "relative", padding: "92px 40px 0", display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 56, alignItems: "center", maxWidth: 1280, margin: "0 auto" }}>
        <div>
          <Eyebrow>Full-stack product engineering · est. 2016</Eyebrow>
          <h1 className="head" style={{ marginTop: 26 }}>
            Software that <span className="focal-word">holds up</span> in healthcare, government, and the real world.
          </h1>
          <p className="subhead">
            We've built and maintained sensitive systems in regulated domains for a decade —
            secure, compliant, and live in 15+ countries. The hard version of your project is the one we've already shipped.
          </p>
          <CtaRow />
          <div style={{ marginTop: 44 }}>
            <ProofRow items={PROOF} />
          </div>
        </div>
        <HireCard />
      </section>
    </div>
  );
}

/* ============================================================
   VARIANT C — Proof / partner angle. Focal: named-proof wall.
   ============================================================ */
function ProofWall() {
  const logos = ["Mercedes-Benz", "William Adams", "App Store", "Google Play"];
  return (
    <div style={{ background: "var(--h-card)", border: "1px solid var(--h-line)", padding: 30 }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: "var(--h-mut)", marginBottom: 20 }}>Shipped &amp; trusted</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "var(--h-line-2)", border: "1px solid var(--h-line-2)" }}>
        {logos.map(l => (
          <div key={l} style={{ background: "var(--h-card)", padding: "26px 18px", display: "flex", alignItems: "center", justifyContent: "center", minHeight: 86 }}>
            <span style={{ fontWeight: 700, fontSize: 17, color: "var(--h-fg-2)", letterSpacing: 0.2 }}>{l}</span>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "stretch", marginTop: 24 }}>
        {[["15+", "countries live"], ["60+", "products"], ["4.9/5", "client rating"]].map(([v, k], i) => (
          <div key={k} style={{ flex: 1, paddingLeft: i === 0 ? 0 : 22, borderLeft: i === 0 ? "none" : "1px solid var(--h-line)" }}>
            <div style={{ fontWeight: 800, fontSize: 26, color: "var(--h-fg)", letterSpacing: -1 }}>{v}</div>
            <div style={{ fontSize: 11.5, color: "var(--h-faint)", letterSpacing: 0.3, marginTop: 3 }}>{k}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HeroProof() {
  return (
    <div className="hero-sys" style={{ position: "relative", minHeight: 840, overflow: "hidden" }}>
      <div className="glow" style={{ width: 600, height: 600, right: -100, top: 60, background: "radial-gradient(circle, rgba(71,125,240,0.45), transparent 70%)" }} />
      <HeroNav />
      <section style={{ position: "relative", padding: "100px 40px 0", display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: 56, alignItems: "center", maxWidth: 1280, margin: "0 auto" }}>
        <div>
          <Eyebrow>Trusted in production · US · UAE · Asia</Eyebrow>
          <h1 className="head" style={{ marginTop: 26 }}>
            Hire the team that's <span className="focal-word">already shipped</span> what you're planning.
          </h1>
          <p className="subhead">
            60+ products over 10 years for SaaS founders, CTOs, and ops leads — now AI-first.
            You get senior engineers who've taken sensitive products from zero to live, at scale.
          </p>
          <CtaRow />
        </div>
        <ProofWall />
      </section>
    </div>
  );
}

Object.assign(window, { HeroSpeed, HeroRegulated, HeroProof });
