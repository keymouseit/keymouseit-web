import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Icon, Btn, CountUp, Reveal, withAlpha } from './site-ui';
import { INDUSTRIES, TRUST_METRICS, CLIENT_LOGOS } from '../data/site-data';

const SHORT = {
  ai: "AI Automation",
  logistics: "Logistics",
  manufacturing: "Manufacturing",
  identity: "Identity",
  energy: "Energy",
  retail: "Retail"
};

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
  const data = INDUSTRIES.slice(0, 5);
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const ind = data[idx];
  const flow = ind.flow;
  const accent = ind.accent;
  const cys = [54, 152, 250, 348, 446];

  const vizWrapRef = useRef(null);
  const [fit, setFit] = useState({ scale: 1, left: 0, h: 500 });

  useEffect(() => {
    const el = vizWrapRef.current;
    if (!el) return;
    const measure = () => {
      const w = el.clientWidth || 600;
      const scale = Math.min(1, w / 600);
      setFit({ scale, left: Math.max(0, (w - 600 * scale) / 2), h: 500 * scale });
    };
    measure();
    let ro;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(measure);
      ro.observe(el);
    }
    window.addEventListener("resize", measure);
    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  useEffect(() => {
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

export default function HeroV2() {
  const heroRef = useRef(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Stagger elements fade-in & slide-up smoothly
      gsap.fromTo(".gsap-hero-fade", 
        { opacity: 0, y: 36 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.95, 
          stagger: 0.12, 
          ease: "power3.out",
          delay: 0.1 
        }
      );

      // LivingSystem slide & scale-in
      gsap.fromTo(".gsap-hero-scale", 
        { opacity: 0, scale: 0.93, x: 30 },
        { 
          opacity: 1, 
          scale: 1, 
          x: 0,
          duration: 1.2, 
          ease: "power4.out",
          delay: 0.5 
        }
      );

      // Bottom trusted client logos fade-in
      gsap.fromTo(".gsap-hero-logos", 
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          ease: "power2.out",
          delay: 0.8 
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <header id="top" ref={heroRef} style={{ position: "relative", overflow: "hidden" }}>
      <div className="mesh" />
      <div className="grid-lines" />
      <div className="container" style={{ position: "relative", padding: "64px 32px 84px" }}>
        <div className="v2-hero-grid" style={{ display: "grid", gridTemplateColumns: "0.92fr 1.08fr", gap: 56, alignItems: "center" }}>
          <div>
            <div className="gsap-hero-fade pill" style={{ marginBottom: 22, opacity: 0 }}>
              <span className="dot" />AI-Powered Software Engineering Partner
            </div>
            
            <h1 className="display" style={{ margin: 0 }}>
              <span className="gsap-hero-fade" style={{ display: "block", opacity: 0 }}>AI-Powered Systems.</span>
              <span className="gsap-hero-fade grad-text" style={{ display: "block", opacity: 0 }}>Real Business Impact.</span>
            </h1>
            
            <p className="gsap-hero-fade lead" style={{ marginTop: 24, maxWidth: "31em", opacity: 0 }}>
              We design and build operational systems, AI workflows, and enterprise platforms that automate operations, reduce costs, and drive growth.
            </p>
            
            <div className="gsap-hero-fade" style={{ display: "flex", gap: 14, marginTop: 36, flexWrap: "wrap", opacity: 0 }}>
              <Btn variant="primary" lg href="#contact" icon>Book Strategy Call</Btn>
              <Btn variant="ghost" lg href="#cases">View Case Studies</Btn>
            </div>
            
            <div className="gsap-hero-fade hero-metrics" style={{ display: "grid", gridTemplateColumns: "repeat(4,auto)", gap: 34, marginTop: 50, opacity: 0 }}>
              {TRUST_METRICS.map((m) => (
                <div key={m.label}>
                  <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.03em", color: "var(--text)" }}><CountUp value={m.value} /></div>
                  <div style={{ fontSize: 12.5, color: "var(--muted)", marginTop: 2 }}>{m.label}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="gsap-hero-scale" style={{ opacity: 0 }}><LivingSystem /></div>
        </div>

        {/* client logos marquee */}
        <div className="gsap-hero-logos" style={{ marginTop: 72, paddingTop: 28, borderTop: "1px solid var(--line)", opacity: 0 }}>
          <div style={{ fontFamily: "var(--mono)", fontSize: 11.5, letterSpacing: 1.4, textTransform: "uppercase", color: "var(--faint)", marginBottom: 24, textAlign: "center" }}>Trusted by teams building operational software</div>
          <div className="marquee-mask" style={{ overflow: "hidden" }}>
            <div className="marquee-track" style={{ gap: 64 }}>
              {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((l, i) => (
                <span key={i} style={{ fontSize: 20, fontWeight: 700, color: "#A6AEBD", letterSpacing: "-0.01em", whiteSpace: "nowrap" }}>{l}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
