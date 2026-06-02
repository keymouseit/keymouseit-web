// KeyMouse IT — Nav, Hero, and interactive Industry Showcase.

const { useState: useStateH, useEffect: useEffectH } = React;

const SHORT_TAB = { ai: "AI", logistics: "Logistics", manufacturing: "Manufacturing", identity: "Identity", energy: "Energy", retail: "Retail" };

/* ---------------- Nav ---------------- */
function Nav() {
  const [scrolled, setScrolled] = useStateH(false);
  useEffectH(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const links = [["Industries", "#industries"], ["Solutions", "#solutions"], ["Services", "#services"], ["Process", "#process"], ["Case Studies", "#cases"]];
  return (
    <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
      <div className="container nav-inner">
        <a className="brand" href="#top">
          <span className="glyph"><Icon name="MousePointer2,MousePointer" size={18} color="#fff" stroke={2.2} /></span>
          KeyMouse<span style={{ color: "var(--blue)" }}>IT</span>
        </a>
        <div className="nav-links">
          {links.map(([l, h]) => <a key={l} href={h}>{l}</a>)}
        </div>
        <div className="nav-cta">
          <Btn variant="ghost" href="#cases">View Work</Btn>
          <Btn variant="primary" href="#contact" icon>Book Strategy Call</Btn>
        </div>
      </div>
    </nav>
  );
}

/* ---------------- Interactive Industry Showcase ---------------- */
function IndustryShowcase() {
  const data = window.INDUSTRIES.slice(0, 5);
  const [idx, setIdx] = useStateH(0);
  const [paused, setPaused] = useStateH(false);
  const ind = data[idx];
  const accent = ind.accent;

  useEffectH(() => {
    if (paused) return;
    const id = setTimeout(() => setIdx((i) => (i + 1) % data.length), 6000);
    return () => clearTimeout(id);
  }, [idx, paused, data.length]);

  return (
    <div className="card" style={{ borderRadius: 22, overflow: "hidden", boxShadow: "var(--sh-xl)", background: "#fff" }}
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {/* header strip */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: "1px solid var(--line)", background: "linear-gradient(180deg,#FBFCFE,#fff)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9, fontFamily: "var(--mono)", fontSize: 11.5, letterSpacing: 1, color: "var(--muted)", textTransform: "uppercase" }}>
          <span style={{ position: "relative", width: 8, height: 8 }}>
            <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "var(--green)" }} />
            <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "var(--green)", animation: "kmPing 2.2s ease-out infinite" }} />
          </span>
          Operational System · Live
        </div>
        <div style={{ display: "flex", gap: 5 }}>
          {["#E5E8EE", "#E5E8EE", "#E5E8EE"].map((c, i) => <span key={i} style={{ width: 9, height: 9, borderRadius: "50%", background: c }} />)}
        </div>
      </div>

      {/* tabs */}
      <div style={{ display: "flex", gap: 4, padding: "12px 12px 0" }}>
        {data.map((d, i) => {
          const on = i === idx;
          return (
            <button key={d.id} onClick={() => setIdx(i)} style={{
              flex: 1, border: 0, cursor: "pointer", borderRadius: 10, padding: "10px 4px 9px",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
              background: on ? withAlpha(d.accent, 0.10) : "transparent",
              transition: "background 0.16s",
            }}>
              <Icon name={d.icon} size={19} stroke={2} color={on ? d.accent : "var(--faint)"} />
              <span style={{ fontSize: 11.5, fontWeight: on ? 700 : 500, color: on ? d.accent : "var(--muted)", letterSpacing: 0.1 }}>{SHORT_TAB[d.id]}</span>
            </button>
          );
        })}
      </div>

      {/* body: workflow + outcome */}
      <div key={ind.id} className="km-fade" style={{ padding: "22px 22px 8px" }}>
        <div style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: 1.4, textTransform: "uppercase", color: accent, fontWeight: 600 }}>{ind.tab}</div>
        <div style={{ fontSize: 17.5, fontWeight: 700, color: "var(--text)", lineHeight: 1.3, marginTop: 7, letterSpacing: "-0.01em" }}>{ind.headline}</div>

        {/* vertical workflow */}
        <div style={{ position: "relative", marginTop: 20, paddingLeft: 4 }}>
          {ind.workflow.map((s, i) => {
            const last = i === ind.workflow.length - 1;
            return (
              <div key={s.label} className="km-step" style={{ display: "flex", alignItems: "flex-start", gap: 14, position: "relative", paddingBottom: last ? 0 : 16, animationDelay: `${i * 90}ms` }}>
                {!last && <span style={{ position: "absolute", left: 18, top: 38, bottom: 0, width: 2, background: `linear-gradient(${withAlpha(accent, 0.5)}, ${withAlpha(accent, 0.12)})` }} />}
                <span style={{ width: 38, height: 38, flexShrink: 0, borderRadius: 11, background: withAlpha(accent, 0.10), border: `1px solid ${withAlpha(accent, 0.22)}`, display: "flex", alignItems: "center", justifyContent: "center", color: accent, position: "relative", zIndex: 1 }}>
                  <Icon name={s.icon} size={18} stroke={2} />
                </span>
                <div style={{ paddingTop: 8 }}>
                  <span style={{ fontSize: 14.5, fontWeight: 600, color: "var(--text)" }}>{s.label}</span>
                </div>
                <span style={{ marginLeft: "auto", marginTop: 12, fontFamily: "var(--mono)", fontSize: 10.5, color: "var(--faint)" }}>{String(i + 1).padStart(2, "0")}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* metrics */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", borderTop: "1px solid var(--line)", marginTop: 14 }}>
        {ind.metrics.map((m, i) => (
          <div key={m.label} className="km-fade" style={{ padding: "18px 14px", textAlign: "center", borderLeft: i === 0 ? "none" : "1px solid var(--line)" }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.02em" }}>{m.value}</div>
            <div style={{ fontSize: 11.5, color: "var(--muted)", marginTop: 3, lineHeight: 1.3 }}>{m.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Hero ---------------- */
function Hero() {
  return (
    <header id="top" style={{ position: "relative", overflow: "hidden" }}>
      {/* soft background flourish */}
      <div style={{ position: "absolute", top: -180, right: -160, width: 620, height: 620, background: "radial-gradient(circle, rgba(37,99,255,0.10), transparent 68%)", pointerEvents: "none" }} />
      <div className="dotgrid" style={{ position: "absolute", inset: 0, opacity: 0.5, maskImage: "radial-gradient(120% 80% at 50% 0%, #000 30%, transparent 75%)", WebkitMaskImage: "radial-gradient(120% 80% at 50% 0%, #000 30%, transparent 75%)", pointerEvents: "none" }} />
      <div className="container" style={{ position: "relative", padding: "72px 32px 92px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.04fr 0.96fr", gap: 64, alignItems: "center" }}>
          {/* left */}
          <div>
            <Reveal><div className="pill" style={{ marginBottom: 22 }}><span className="dot" />AI-Powered Software Engineering Partner</div></Reveal>
            <Reveal delay={60}>
              <h1 className="display">Building AI-Powered Operational Systems That <span style={{ color: "var(--blue)" }}>Scale Businesses.</span></h1>
            </Reveal>
            <Reveal delay={120}>
              <p className="lead" style={{ marginTop: 24, maxWidth: "32em" }}>
                We design and build custom software, AI workflows, and enterprise platforms that automate operations, reduce costs, and drive growth.
              </p>
            </Reveal>
            <Reveal delay={180}>
              <div style={{ display: "flex", gap: 14, marginTop: 36, flexWrap: "wrap" }}>
                <Btn variant="primary" lg href="#contact" icon>Book Strategy Call</Btn>
                <Btn variant="ghost" lg href="#cases">View Case Studies</Btn>
              </div>
            </Reveal>
            {/* trust metrics */}
            <Reveal delay={240}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,auto)", gap: 36, marginTop: 52 }}>
                {window.TRUST_METRICS.map((m) => (
                  <div key={m.label}>
                    <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.03em", color: "var(--text)" }}>{m.value}</div>
                    <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 2 }}>{m.label}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
          {/* right */}
          <Reveal delay={140}><IndustryShowcase /></Reveal>
        </div>

        {/* client logos */}
        <Reveal delay={120}>
          <div style={{ marginTop: 80, paddingTop: 30, borderTop: "1px solid var(--line)" }}>
            <div style={{ fontFamily: "var(--mono)", fontSize: 11.5, letterSpacing: 1.4, textTransform: "uppercase", color: "var(--faint)", marginBottom: 22, textAlign: "center" }}>Trusted by teams building operational software</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: "20px 54px" }}>
              {window.CLIENT_LOGOS.map((l) => (
                <span key={l} style={{ fontSize: 19, fontWeight: 700, color: "#A6AEBD", letterSpacing: "-0.01em" }}>{l}</span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </header>
  );
}

Object.assign(window, { Nav, Hero, IndustryShowcase });
