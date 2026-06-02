import React, { useState, useEffect, useRef } from 'react';
import { Icon, SectionHead, Reveal } from './site-ui';
import { PROCESS } from '../data/site-data';

export default function ProcessV2() {
  const [active, setActive] = useState(0);
  const trackRef = useRef(null);

  useEffect(() => {
    let raf = null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        const el = trackRef.current; if (!el) return;
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight || 800;
        const center = r.top + r.height / 2;
        const p = 1 - (center - vh * 0.32) / (vh * 0.46);
        const clamped = Math.max(0, Math.min(0.999, p));
        setActive(Math.floor(clamped * PROCESS.length));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const pct = PROCESS.length > 1 ? (active / (PROCESS.length - 1)) * 100 : 0;

  return (
    <section className="section" id="process">
      <div className="container">
        <Reveal>
          <SectionHead center maxWidth={560}
            eyebrow="Delivery process"
            title="Clear steps. Measurable results."
            lead="A disciplined path from first conversation to a system that scales with you." />
        </Reveal>

        <div ref={trackRef} style={{ position: "relative", marginTop: 64 }}>
          {/* base line + progress */}
          <div className="proc-line" style={{ position: "absolute", top: 27, left: "8%", right: "8%", height: 2, background: "var(--line-strong)" }} />
          <div className="proc-line" style={{ position: "absolute", top: 27, left: "8%", width: `calc((100% - 16%) * ${pct / 100})`, height: 2, background: "linear-gradient(90deg,#2563FF,#7C3AED)", transition: "width 0.5s var(--ease)" }} />

          <div className="proc-grid" style={{ display: "grid", gridTemplateColumns: `repeat(${PROCESS.length},1fr)`, gap: 14, position: "relative" }}>
            {PROCESS.map((p, i) => {
              const on = i <= active;
              const cur = i === active;
              return (
                <div key={p.n} className="proc-step" style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", transition: "opacity 0.4s", opacity: on ? 1 : 0.5 }}>
                  <span className="proc-dot" style={{
                    width: 56, height: 56, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    background: on ? "linear-gradient(150deg,#2563FF,#7C3AED)" : "#fff",
                    border: on ? "0" : "2px solid var(--line-strong)",
                    color: on ? "#fff" : "var(--faint)", position: "relative", zIndex: 1,
                    boxShadow: cur ? "0 10px 26px rgba(37,99,255,0.4)" : (on ? "var(--sh-md)" : "none"),
                    transform: cur ? "scale(1.12)" : "scale(1)", transition: "all 0.4s var(--ease)",
                  }}>
                    <Icon name={p.icon} size={24} stroke={2} />
                  </span>
                  <div className="proc-body">
                    <div style={{ fontFamily: "var(--mono)", fontSize: 12, fontWeight: 600, color: on ? "var(--blue)" : "var(--faint)", marginTop: 16, letterSpacing: 1 }}>{p.n}</div>
                    <div style={{ fontSize: 16.5, fontWeight: 700, color: "var(--text)", marginTop: 6, letterSpacing: "-0.01em" }}>{p.title}</div>
                    <div className="body" style={{ fontSize: 13.5, marginTop: 7, lineHeight: 1.5 }}>{p.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
