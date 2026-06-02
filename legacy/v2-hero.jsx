// KeyMouse IT V2 — Nav, Hero, and the living AI-system visual.
// Inputs → Intelligence → Outcomes, animated, transformed by industry tabs.

const { useState: useStateV, useEffect: useEffectV } = React;
const SHORT = { ai: "AI Automation", logistics: "Logistics", manufacturing: "Manufacturing", identity: "Identity", energy: "Energy", retail: "Retail" };

/* ---------------- Nav ---------------- */
function NavV2() {
  const [scrolled, setScrolled] = useStateV(false);
  const [open, setOpen] = useStateV(false);
  useEffectV(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffectV(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);
  const links = [["About Us", "#founder"], ["Capabilities", "#services"], ["Industries", "#industries"], ["Case Studies", "#cases"], ["AI Solutions", "#solutions"], ["Contact Us", "#contact"]];
  return (
    <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
      <div className="container nav-inner">
        <a className="brand" href="#top" onClick={() => setOpen(false)}>
          <span className="glyph"><Icon name="MousePointer2,MousePointer" size={18} color="#fff" stroke={2.2} /></span>
          KeyMouse<span style={{ color: "var(--blue)" }}>IT</span>
        </a>
        <div className="nav-links">{links.slice(0, 5).map(([l, h]) => <a key={l} href={h}>{l}</a>)}</div>
        <div className="nav-cta">
          <Btn variant="primary" href="#contact" icon>Book Strategy Call</Btn>
        </div>
        {/* hamburger (mobile only) */}
        <button className="nav-burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
          <Icon name={open ? "X" : "Menu"} size={24} stroke={2.2} color="var(--text)" />
        </button>
      </div>

      {/* mobile drawer */}
      <div className={`nav-drawer ${open ? "open" : ""}`} onClick={() => setOpen(false)}>
        <div className="nav-drawer-panel" onClick={(e) => e.stopPropagation()}>
          {links.map(([l, h]) => (
            <a key={l} href={h} onClick={() => setOpen(false)}>{l}<Icon name="ArrowUpRight,ArrowRight" size={18} stroke={2} color="var(--faint)" /></a>
          ))}
          <a className="btn btn-primary btn-lg btn-block" href="#contact" onClick={() => setOpen(false)} style={{ marginTop: 12 }}>Book Strategy Call <Arrow /></a>
          <div style={{ display: "flex", gap: 10, marginTop: 18, justifyContent: "center" }}>
            <a href="#contact" aria-label="LinkedIn" onClick={() => setOpen(false)} style={{ width: 42, height: 42, borderRadius: 11, border: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--muted)" }}><Icon name="Linkedin" size={19} stroke={2} /></a>
            <a href="#contact" aria-label="Email" onClick={() => setOpen(false)} style={{ width: 42, height: 42, borderRadius: 11, border: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--muted)" }}><Icon name="Mail" size={19} stroke={2} /></a>
          </div>
        </div>
      </div>
    </nav>
  );
}

/* ---------------- Living AI system ---------------- */
function FlowNode({ item, side, cy, accent, k }) {
  const left = side === "in" ? "14%" : "86%";
  return (
    <div style={{ position: "absolute", left, top: `${cy / 500 * 100}%`, transform: "translate(-50%,-50%)", width: 150 }}>
      <div className="node-in" key={k}>
        <div className="node-float" style={{ animationDelay: `${(cy % 7) * 0.2}s` }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 9, padding: "9px 12px",
            background: "#fff", border: "1px solid var(--line)", borderRadius: 11,
            boxShadow: "var(--sh-md)", flexDirection: side === "in" ? "row" : "row-reverse",
            textAlign: side === "in" ? "left" : "right",
          }}>
            <span style={{ width: 28, height: 28, flexShrink: 0, borderRadius: 8, background: withAlpha(accent, 0.1), color: accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name={item.i} size={15} stroke={2} />
            </span>
            <span style={{ fontSize: 12.5, fontWeight: 600, color: "var(--text)", lineHeight: 1.1, flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.t}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function LivingSystem() {
  const data = window.INDUSTRIES.slice(0, 5);
  const [idx, setIdx] = useStateV(0);
  const [paused, setPaused] = useStateV(false);
  const ind = data[idx];
  const flow = ind.flow;
  const accent = ind.accent;
  const cys = [54, 152, 250, 348, 446];

  // Scale the fixed 600×500 stage to fit the container — guarantees no overflow on mobile.
  const vizWrapRef = React.useRef(null);
  const [fit, setFit] = useStateV({ scale: 1, left: 0, h: 500 });
  useEffectV(() => {
    const el = vizWrapRef.current; if (!el) return;
    const measure = () => {
      const w = el.clientWidth || 600;
      const scale = Math.min(1, w / 600);
      setFit({ scale, left: Math.max(0, (w - 600 * scale) / 2), h: 500 * scale });
    };
    measure();
    let ro;
    if (typeof ResizeObserver !== "undefined") { ro = new ResizeObserver(measure); ro.observe(el); }
    window.addEventListener("resize", measure);
    return () => { if (ro) ro.disconnect(); window.removeEventListener("resize", measure); };
  }, []);

  useEffectV(() => {
    if (paused) return;
    const id = setTimeout(() => setIdx((i) => (i + 1) % data.length), 5500);
    return () => clearTimeout(id);
  }, [idx, paused, data.length]);

  const inPath = (cy) => `M158 ${cy} C 232 ${cy} 230 250 248 250`;
  const outPath = (cy) => `M352 250 C 372 250 370 ${cy} 442 ${cy}`;

  return (
    <div className="glass" style={{ borderRadius: 24, padding: 0, overflow: "hidden" }}
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {/* header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "15px 20px", borderBottom: "1px solid var(--line)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9, fontFamily: "var(--mono)", fontSize: 11, letterSpacing: 1.2, color: "var(--muted)", textTransform: "uppercase" }}>
          <span style={{ position: "relative", width: 8, height: 8 }}>
            <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "var(--green)" }} />
            <span className="core-ring" style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "var(--green)" }} />
          </span>
          Live System
        </div>
        <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: accent, fontWeight: 600, letterSpacing: 0.5 }}>{ind.tab}</span>
      </div>

      {/* tabs */}
      <div style={{ display: "flex", gap: 4, padding: "12px 12px 6px" }}>
        {data.map((d, i) => {
          const on = i === idx;
          return (
            <button key={d.id} onClick={() => setIdx(i)} style={{
              flex: 1, border: 0, cursor: "pointer", borderRadius: 9, padding: "9px 4px",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 5,
              background: on ? withAlpha(d.accent, 0.1) : "transparent", transition: "background 0.16s",
            }}>
              <Icon name={d.icon} size={17} stroke={2} color={on ? d.accent : "var(--faint)"} />
              <span style={{ fontSize: 10.5, fontWeight: on ? 700 : 500, color: on ? d.accent : "var(--muted)" }}>{SHORT[d.id]}</span>
            </button>
          );
        })}
      </div>

      {/* viz — desktop node map */}
      <div ref={vizWrapRef} className="ls-desktop" style={{ position: "relative", width: "100%", height: fit.h, margin: "0 auto" }}>
       <div style={{ position: "absolute", top: 0, left: fit.left, width: 600, height: 500, transform: `scale(${fit.scale})`, transformOrigin: "top left" }}>
        <svg viewBox="0 0 600 500" width="600" height="500" style={{ position: "absolute", inset: 0, display: "block" }}>
          {/* column labels */}
          <text x="84" y="22" textAnchor="middle" fontFamily="var(--mono)" fontSize="11" letterSpacing="1" fill="#98A2B3">INPUTS</text>
          <text x="300" y="22" textAnchor="middle" fontFamily="var(--mono)" fontSize="11" letterSpacing="1" fill="#98A2B3">INTELLIGENCE</text>
          <text x="516" y="22" textAnchor="middle" fontFamily="var(--mono)" fontSize="11" letterSpacing="1" fill="#98A2B3">OUTCOMES</text>
          {cys.map((cy, i) => <path key={"ip" + i} id={`ip${idx}-${i}`} d={inPath(cy)} fill="none" stroke={withAlpha(accent, 0.45)} strokeWidth="1.6" className="flow-line" />)}
          {cys.map((cy, j) => <path key={"op" + j} id={`op${idx}-${j}`} d={outPath(cy)} fill="none" stroke={withAlpha(accent, 0.45)} strokeWidth="1.6" className="flow-line" />)}
          {cys.map((cy, i) => (
            <circle key={"ic" + i} r="4" fill={accent}>
              <animateMotion dur="2.4s" repeatCount="indefinite" begin={`${i * 0.32}s`}><mpath href={`#ip${idx}-${i}`} /></animateMotion>
            </circle>
          ))}
          {cys.map((cy, j) => (
            <circle key={"oc" + j} r="4" fill={accent}>
              <animateMotion dur="2.4s" repeatCount="indefinite" begin={`${0.6 + j * 0.32}s`}><mpath href={`#op${idx}-${j}`} /></animateMotion>
            </circle>
          ))}
        </svg>

        {/* input nodes */}
        {flow.inputs.map((it, i) => <FlowNode key={ind.id + "i" + i} k={ind.id + "i" + i} item={it} side="in" cy={cys[i]} accent={accent} />)}
        {/* output nodes */}
        {flow.outputs.map((it, j) => <FlowNode key={ind.id + "o" + j} k={ind.id + "o" + j} item={it} side="out" cy={cys[j]} accent={accent} />)}

        {/* core */}
        <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ position: "relative", width: 104, height: 104, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span className="core-ring" style={{ position: "absolute", inset: 0, borderRadius: "50%", border: `1.5px solid ${withAlpha(accent, 0.4)}` }} />
            <span className="core-ring d" style={{ position: "absolute", inset: 0, borderRadius: "50%", border: `1.5px solid ${withAlpha(accent, 0.4)}` }} />
            <div className="core-glow" style={{ width: 104, height: 104, borderRadius: "50%", background: `linear-gradient(150deg, ${accent}, ${ind.accent2})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name={flow.coreIcon} size={42} stroke={1.7} color="#fff" />
            </div>
          </div>
          <div key={ind.id} className="node-in" style={{ marginTop: 12, fontFamily: "var(--mono)", fontSize: 11, fontWeight: 700, letterSpacing: 0.5, color: accent, textTransform: "uppercase", textAlign: "center", background: "rgba(255,255,255,0.85)", padding: "4px 10px", borderRadius: 7, whiteSpace: "nowrap" }}>{flow.core}</div>
        </div>
       </div>
      </div>

      {/* viz — mobile simplified stacked flow */}
      <div className="ls-mobile" key={ind.id + "-m"}>
        <div className="ls-m-label">Inputs</div>
        <div className="ls-m-chips">
          {flow.inputs.slice(0, 3).map((it, i) => (
            <span key={i} className="ls-m-chip node-in" style={{ animationDelay: `${i * 70}ms` }}>
              <span style={{ color: accent }}><Icon name={it.i} size={15} stroke={2} /></span>{it.t}
            </span>
          ))}
        </div>
        <div className="ls-m-arrow"><Icon name="ChevronDown" size={20} stroke={2.4} color={withAlpha(accent, 0.7)} /></div>
        <div className="ls-m-core core-glow" style={{ background: `linear-gradient(135deg, ${accent}, ${ind.accent2})` }}>
          <Icon name={flow.coreIcon} size={26} stroke={1.8} color="#fff" />
          <span>{flow.core}</span>
        </div>
        <div className="ls-m-arrow"><Icon name="ChevronDown" size={20} stroke={2.4} color={withAlpha(accent, 0.7)} /></div>
        <div className="ls-m-label">Outcomes</div>
        <div className="ls-m-chips">
          {flow.outputs.slice(0, 3).map((it, i) => (
            <span key={i} className="ls-m-chip node-in" style={{ animationDelay: `${(i + 3) * 70}ms`, borderColor: withAlpha(accent, 0.25), background: withAlpha(accent, 0.04) }}>
              <span style={{ color: accent }}><Icon name={it.i} size={15} stroke={2} /></span>{it.t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Hero ---------------- */
function HeroV2() {
  return (
    <header id="top" style={{ position: "relative", overflow: "hidden" }}>
      <div className="mesh" />
      <div className="grid-lines" />
      <div className="container" style={{ position: "relative", padding: "64px 32px 84px" }}>
        <div className="v2-hero-grid" style={{ display: "grid", gridTemplateColumns: "0.92fr 1.08fr", gap: 56, alignItems: "center" }}>
          <div>
            <Reveal delay={20}><div className="pill" style={{ marginBottom: 22 }}><span className="dot" />AI-Powered Software Engineering Partner</div></Reveal>
            <h1 className="display">
              <Reveal as="span" delay={90} style={{ display: "block" }}>AI-Powered Systems.</Reveal>
              <Reveal as="span" delay={200} className="grad-text" style={{ display: "block" }}>Real Business Impact.</Reveal>
            </h1>
            <Reveal delay={120}>
              <p className="lead" style={{ marginTop: 24, maxWidth: "31em" }}>
                We design and build operational systems, AI workflows, and enterprise platforms that automate operations, reduce costs, and drive growth.
              </p>
            </Reveal>
            <Reveal delay={180}>
              <div style={{ display: "flex", gap: 14, marginTop: 36, flexWrap: "wrap" }}>
                <Btn variant="primary" lg href="#contact" icon>Book Strategy Call</Btn>
                <Btn variant="ghost" lg href="#cases">View Case Studies</Btn>
              </div>
            </Reveal>
            <Reveal delay={240}>
              <div className="hero-metrics" style={{ display: "grid", gridTemplateColumns: "repeat(4,auto)", gap: 34, marginTop: 50 }}>
                {window.TRUST_METRICS.map((m) => (
                  <div key={m.label}>
                    <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.03em", color: "var(--text)" }}><CountUp value={m.value} /></div>
                    <div style={{ fontSize: 12.5, color: "var(--muted)", marginTop: 2 }}>{m.label}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
          <Reveal delay={140}><LivingSystem /></Reveal>
        </div>

        {/* client logos marquee */}
        <Reveal delay={120}>
          <div style={{ marginTop: 72, paddingTop: 28, borderTop: "1px solid var(--line)" }}>
            <div style={{ fontFamily: "var(--mono)", fontSize: 11.5, letterSpacing: 1.4, textTransform: "uppercase", color: "var(--faint)", marginBottom: 24, textAlign: "center" }}>Trusted by teams building operational software</div>
            <div className="marquee-mask" style={{ overflow: "hidden" }}>
              <div className="marquee-track" style={{ gap: 64 }}>
                {[...window.CLIENT_LOGOS, ...window.CLIENT_LOGOS].map((l, i) => (
                  <span key={i} style={{ fontSize: 20, fontWeight: 700, color: "#A6AEBD", letterSpacing: "-0.01em", whiteSpace: "nowrap" }}>{l}</span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </header>
  );
}

/* ---------------- Signature ribbon: the visual identity ---------------- */
const STAGES = [
  { k: "Inputs", d: "CRM · ERP · Docs · Orders", i: "Database", c: "#64748B" },
  { k: "Intelligence", d: "AI processing & orchestration", i: "BrainCircuit,Brain", c: "#2563FF" },
  { k: "Decisions", d: "Forecasts · Alerts · Approvals", i: "GitBranch,Workflow", c: "#6D4AE6" },
  { k: "Outcomes", d: "Automation · Lower cost · Scale", i: "TrendingUp", c: "#7C3AED" },
];

function SignatureRibbon() {
  return (
    <div style={{ position: "relative", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", background: "linear-gradient(180deg, #FFFFFF, #FAFBFF)", overflow: "hidden" }}>
      <div className="grid-lines" style={{ opacity: 0.5 }} />
      <div className="container" style={{ position: "relative", padding: "30px 32px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 22 }}>
          <span style={{ fontFamily: "var(--mono)", fontSize: 11.5, letterSpacing: 2, textTransform: "uppercase", color: "var(--muted)" }}>The KeyMouse method</span>
        </div>
        <div className="sig-row" style={{ display: "flex", alignItems: "stretch", gap: 0 }}>
          {STAGES.map((s, i) => {
            const last = i === STAGES.length - 1;
            return (
              <React.Fragment key={s.k}>
                <div className="sig-stage" style={{ flex: 1, display: "flex", alignItems: "center", gap: 14, padding: "4px 8px", justifyContent: "center" }}>
                  <span className="node-float" style={{ width: 46, height: 46, flexShrink: 0, borderRadius: 13, background: withAlpha(s.c, 0.1), border: `1px solid ${withAlpha(s.c, 0.22)}`, color: s.c, display: "flex", alignItems: "center", justifyContent: "center", animationDelay: `${i * 0.5}s` }}>
                    <Icon name={s.i} size={22} stroke={2} />
                  </span>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.01em" }}>{s.k}</div>
                    <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>{s.d}</div>
                  </div>
                </div>
                {!last && (
                  <div className="sig-arrow" style={{ flexShrink: 0, display: "flex", alignItems: "center", color: "var(--blue)", padding: "0 6px" }}>
                    <svg width="34" height="14" viewBox="0 0 34 14" fill="none">
                      <line x1="0" y1="7" x2="26" y2="7" stroke={withAlpha("#2563FF", 0.45)} strokeWidth="1.6" strokeDasharray="3 5" className="flow-line" />
                      <path d="M24 2 L30 7 L24 12" stroke="#2563FF" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Sticky mobile bottom CTA ---------------- */
function MobileCTABar() {
  const [show, setShow] = useStateV(false);
  useEffectV(() => {
    const onScroll = () => {
      const de = document.documentElement;
      const scrolled = (de.scrollTop) / (de.scrollHeight - de.clientHeight || 1);
      const contact = document.getElementById("contact");
      let nearContact = false;
      if (contact) {
        const r = contact.getBoundingClientRect();
        nearContact = r.top < (window.innerHeight || 800) * 0.9;
      }
      setShow(scrolled > 0.3 && !nearContact);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);
  return (
    <div className={`mobile-cta-bar ${show ? "show" : ""}`}>
      <div className="mc-txt">Build your operational system<span>Free consultation · 1-day response</span></div>
      <a className="mc-btn" href="#contact">Book Call <Arrow size={15} /></a>
    </div>
  );
}

Object.assign(window, { NavV2, HeroV2, LivingSystem, SignatureRibbon, MobileCTABar });
