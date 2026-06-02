// KeyMouse IT — FAQ, Final CTA form, Footer.

const { useState: useStateF } = React;

/* ---------------- FAQ ---------------- */
function FaqItem({ item, open, onToggle }) {
  return (
    <div className={`faq-item ${open ? "open" : ""}`}>
      <button className="faq-q" onClick={onToggle} aria-expanded={open}>
        {item.q}
        <span className="chev"><Icon name="Plus" size={22} stroke={2.2} /></span>
      </button>
      <div className="faq-a"><div className="faq-a-inner">{item.a}</div></div>
    </div>
  );
}

function FaqSection() {
  const [open, setOpen] = useStateF(0);
  return (
    <section className="section band" id="faq">
      <div className="container">
        <div className="faq-grid" style={{ display: "grid", gridTemplateColumns: "0.8fr 1.2fr", gap: 64, alignItems: "start" }}>
          <Reveal>
            <div className="faq-sticky" style={{ position: "sticky", top: 100 }}>
              <Eyebrow>FAQ</Eyebrow>
              <h2 className="h2" style={{ marginTop: 16 }}>Questions, answered.</h2>
              <p className="lead" style={{ marginTop: 18 }}>Everything you need to know about working with KeyMouse IT.</p>
              <div style={{ marginTop: 26 }}><a className="linka" href="#contact">Still have questions? Talk to us <Arrow /></a></div>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div>
              {window.FAQS.map((f, i) => (
                <FaqItem key={f.q} item={f} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
              ))}
              <div className="faq-reassure" style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 26, padding: "20px 24px", background: "#fff", border: "1px solid var(--line)", borderRadius: 14, boxShadow: "var(--sh-xs)" }}>
                <span style={{ width: 40, height: 40, flexShrink: 0, borderRadius: 11, background: "var(--blue-50)", color: "var(--blue)", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name="Compass,Map" size={20} stroke={2} /></span>
                <span style={{ fontSize: 15, color: "var(--text-2)", flex: 1, minWidth: 0 }}>Still unsure where to start? Book a strategy call and we'll help define the right path.</span>
                <a className="btn btn-primary faq-reassure-btn" href="#contact" style={{ flexShrink: 0 }}>Book a call <Arrow /></a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Final CTA + form ---------------- */
function FinalCTA() {
  const [sent, setSent] = useStateF(false);
  const submit = (e) => { e.preventDefault(); setSent(true); };
  return (
    <section className="section ink" id="contact" style={{ position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -160, right: -120, width: 560, height: 560, background: "radial-gradient(circle, rgba(37,99,255,0.25), transparent 66%)", pointerEvents: "none" }} />
      <div className="dotgrid" style={{ position: "absolute", inset: 0, opacity: 0.12, pointerEvents: "none" }} />
      <div className="container" style={{ position: "relative" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.06fr", gap: 72, alignItems: "center" }}>
          <Reveal>
            <Eyebrow>Let's build</Eyebrow>
            <h2 className="h2" style={{ marginTop: 16, fontSize: "clamp(34px,3.6vw,50px)" }}>Let's build the system that moves your business forward.</h2>
            <p className="lead" style={{ marginTop: 20, fontSize: 19, color: "#B9C6D9" }}>
              Share your goals and challenges. Our team will review your requirements and recommend the best path forward.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 32 }}>
              {[["MailCheck,Mail", "A senior engineer reviews every inquiry"], ["Clock", "Response within one business day"], ["ShieldCheck", "NDA-ready from the first conversation"]].map(([ic, t]) => (
                <div key={t} style={{ display: "flex", alignItems: "center", gap: 13 }}>
                  <span style={{ width: 38, height: 38, borderRadius: 11, background: "rgba(37,99,255,0.16)", border: "1px solid rgba(37,99,255,0.3)", color: "#6FA0FF", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name={ic} size={18} stroke={2} /></span>
                  <span style={{ fontSize: 15.5, color: "#C7D2E0", fontWeight: 500 }}>{t}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="card" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 22, padding: 34, boxShadow: "var(--sh-xl)" }}>
              {sent ? (
                <div style={{ textAlign: "center", padding: "40px 10px" }}>
                  <span style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(22,163,74,0.16)", border: "1px solid rgba(22,163,74,0.4)", color: "#4ADE80", display: "inline-flex", alignItems: "center", justifyContent: "center" }}><Icon name="Check" size={32} stroke={2.4} /></span>
                  <h3 style={{ color: "#fff", fontSize: 24, marginTop: 22 }}>Thank you — message received.</h3>
                  <p style={{ color: "#9FB0C8", fontSize: 16, marginTop: 10, lineHeight: 1.6 }}>We'll review your requirements and get back to you within one business day.</p>
                </div>
              ) : (
                <form onSubmit={submit}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div className="field"><label>Name</label><input required placeholder="Your name" /></div>
                    <div className="field"><label>Work email</label><input required type="email" placeholder="you@company.com" /></div>
                    <div className="field" style={{ gridColumn: "1 / -1" }}><label>Company</label><input required placeholder="Company name" /></div>
                    <div className="field" style={{ gridColumn: "1 / -1" }}><label>Project challenge</label><textarea required rows="3" placeholder="What operational problem are you trying to solve?"></textarea></div>
                    <div className="field"><label>Budget range</label>
                      <select defaultValue=""><option value="" disabled>Select range</option><option>{"< $25k"}</option><option>$25k – $75k</option><option>$75k – $200k</option><option>$200k+</option></select>
                    </div>
                    <div className="field"><label>Timeline</label>
                      <select defaultValue=""><option value="" disabled>Select timeline</option><option>ASAP</option><option>1–3 months</option><option>3–6 months</option><option>Exploring</option></select>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary btn-lg btn-block" style={{ marginTop: 22 }}>Book a Strategy Call <Arrow /></button>
                  <p style={{ fontSize: 12.5, color: "#6B7689", textAlign: "center", marginTop: 14 }}>By submitting, you agree to be contacted about your project.</p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */
function Footer() {
  const cols = [
    ["Solutions", ["Operational Intelligence", "AI Automation", "Enterprise Platforms", "Identity & Security"]],
    ["Industries", ["Logistics", "Manufacturing", "Energy", "Retail"]],
    ["Company", ["Case Studies", "Services", "Contact"]],
  ];
  return (
    <footer style={{ background: "#070B14", color: "#8A97AC", padding: "64px 0 40px" }}>
      <div className="container">
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: 40 }}>
          <div>
            <a className="brand" href="#top" style={{ color: "#fff" }}>
              <span className="glyph"><Icon name="MousePointer2,MousePointer" size={18} color="#fff" stroke={2.2} /></span>
              KeyMouse<span style={{ color: "var(--blue)" }}>IT</span>
            </a>
            <p style={{ fontSize: 15, lineHeight: 1.6, marginTop: 16, maxWidth: "26em", color: "#9FB0C8", fontWeight: 500 }}>
              KeyMouse IT builds AI-powered operational systems for companies that need to scale.
            </p>
            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              <a href="#contact" aria-label="LinkedIn" style={{ width: 38, height: 38, borderRadius: 10, border: "1px solid rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "#9FB0C8", textDecoration: "none" }}><Icon name="Linkedin" size={18} stroke={2} /></a>
              <a href="#contact" aria-label="Email" style={{ width: 38, height: 38, borderRadius: 10, border: "1px solid rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "#9FB0C8", textDecoration: "none" }}><Icon name="Mail" size={18} stroke={2} /></a>
            </div>
          </div>
          {cols.map(([h, links]) => (
            <div key={h}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", letterSpacing: 0.3, marginBottom: 16 }}>{h}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                {links.map((l) => <a key={l} href="#contact" style={{ fontSize: 14.5, color: "#8A97AC", textDecoration: "none" }}>{l}</a>)}
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, marginTop: 48, paddingTop: 28, borderTop: "1px solid rgba(255,255,255,0.08)", fontSize: 13.5 }}>
          <span>© {new Date().getFullYear()} KeyMouse IT. All rights reserved.</span>
          <div style={{ display: "flex", gap: 24 }}>
            <a href="#contact" style={{ color: "#8A97AC", textDecoration: "none" }}>Privacy</a>
            <a href="#contact" style={{ color: "#8A97AC", textDecoration: "none" }}>Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { FaqSection, FinalCTA, Footer });
