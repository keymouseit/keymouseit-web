import React, { useState, useEffect } from 'react';
import { Icon, SectionHead, Reveal, withAlpha, Arrow } from './site-ui';
import { INDUSTRIES } from '../data/site-data';

function Ledger({ label, items, accent, align }) {
  return (
    <div style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: 16, overflow: "hidden", boxShadow: "var(--sh-sm)", height: "100%" }}>
      <div style={{ padding: "13px 18px", borderBottom: "1px solid var(--line-2)", fontFamily: "var(--mono)", fontSize: 10.5, fontWeight: 600, letterSpacing: 1.2, color: accent, textTransform: "uppercase", textAlign: align }}>{label}</div>
      {items.map((m, i) => (
        <div key={m.title} className="km-step" style={{
          display: "flex", alignItems: "center", gap: 13, padding: "13px 18px",
          borderTop: i === 0 ? "none" : "1px solid var(--line-2)",
          flexDirection: align === "right" ? "row-reverse" : "row",
          textAlign: align === "right" ? "right" : "left",
          animationDelay: `${i * 70}ms`,
        }}>
          <span style={{ width: 36, height: 36, flexShrink: 0, borderRadius: 10, background: withAlpha(accent, 0.10), border: `1px solid ${withAlpha(accent, 0.18)}`, color: accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name={m.icon} size={17} stroke={2} />
          </span>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text)", lineHeight: 1.2 }}>{m.title}</div>
            {m.desc && <div style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.35, marginTop: 2 }}>{m.desc}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function IndustrySolutions() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const ind = INDUSTRIES[idx];
  const accent = ind.accent;
  const grad = `linear-gradient(150deg, ${accent}, ${ind.accent2})`;

  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => setIdx((i) => (i + 1) % INDUSTRIES.length), 8000);
    return () => clearTimeout(id);
  }, [idx, paused]);

  const connector = (dir) => (
    <div className="ind-conn" style={{ flex: 1, display: "flex", alignItems: "center", minWidth: 22 }}>
      <div style={{ width: "100%", height: 0, borderTop: `1.5px dashed ${withAlpha(accent, 0.4)}`, position: "relative" }}>
        <span style={{ position: "absolute", top: -3.5, [dir === "in" ? "right" : "left"]: -1, width: 7, height: 7, borderRadius: "50%", background: accent }} />
      </div>
    </div>
  );

  return (
    <section className="section band" id="industries">
      <div className="container">
        <Reveal>
          <SectionHead center maxWidth={700}
            eyebrow="Industry solutions"
            title="Built for industries where operations matter."
            lead="Select an industry to see the operational system we'd build — the platform modules, the intelligence core that connects them, and the business outcomes that follow." />
        </Reveal>

        <Reveal delay={80}>
          <div className="ind-grid" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
            style={{ display: "grid", gridTemplateColumns: "264px 1fr", gap: 32, alignItems: "start", marginTop: 52 }}>
            {/* left rail */}
            <div className="ind-rail" style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: 16, padding: 8, boxShadow: "var(--sh-sm)" }}>
              {INDUSTRIES.map((d, i) => {
                const on = i === idx;
                return (
                  <button key={d.id} onClick={() => setIdx(i)} style={{
                    width: "100%", textAlign: "left", border: 0, cursor: "pointer", borderRadius: 12,
                    background: on ? withAlpha(d.accent, 0.08) : "transparent",
                    padding: "13px 14px", display: "flex", alignItems: "center", gap: 12, position: "relative", marginBottom: 2,
                    transition: "background 0.16s var(--ease)",
                  }}>
                    {on && <span style={{ position: "absolute", left: 0, top: 12, bottom: 12, width: 3, borderRadius: 3, background: `linear-gradient(180deg, ${d.accent}, ${d.accent2})` }} />}
                    <span style={{ width: 38, height: 38, flexShrink: 0, borderRadius: 10, background: on ? `linear-gradient(150deg, ${d.accent}, ${d.accent2})` : "#F1F5FB", color: on ? "#fff" : "var(--faint)", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.16s var(--ease)" }}>
                      <Icon name={d.icon} size={18} stroke={2} />
                    </span>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: on ? 700 : 600, color: on ? "var(--text)" : "var(--muted)", lineHeight: 1.2 }}>{d.tab}</div>
                      {on && <div style={{ fontSize: 11.5, color: "var(--muted)", marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 168 }}>{d.core.label}</div>}
                    </div>
                  </button>
                );
              })}
              <div className="ind-rail-hint" style={{ padding: "14px 14px 8px", marginTop: 6, borderTop: "1px solid var(--line-2)" }}>
                <div style={{ fontSize: 11.5, color: "var(--faint)", lineHeight: 1.5 }}>Select an industry to explore the system we'd build for it.</div>
              </div>
            </div>

            {/* main */}
            <div key={ind.id} className="km-fade">
              <div style={{ marginBottom: 22 }}>
                <h3 className="h3" style={{ fontSize: 25 }}>{ind.headline}</h3>
                <p className="body" style={{ fontSize: 15.5, marginTop: 9, maxWidth: 640 }}>{ind.summary}</p>
              </div>

              <div className="ind-ledgers" style={{ display: "grid", gridTemplateColumns: "1fr 176px 1fr", alignItems: "stretch", gap: 0 }}>
                <Ledger label="Platform Modules" items={ind.modules} accent={accent} align="left" />

                {/* core */}
                <div className="ind-core" style={{ display: "flex", alignItems: "center" }}>
                  {connector("in")}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                    <div style={{ width: 96, height: 96, borderRadius: "50%", background: grad, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 16px 44px ${withAlpha(accent, 0.4)}, inset 0 2px 0 rgba(255,255,255,0.28)` }}>
                      <Icon name={ind.icon} size={38} stroke={1.8} color="#fff" />
                    </div>
                    <div style={{ fontFamily: "var(--mono)", fontSize: 11, fontWeight: 700, letterSpacing: 0.6, color: accent, marginTop: 14, textAlign: "center", maxWidth: 150, textTransform: "uppercase" }}>{ind.core.label}</div>
                  </div>
                  {connector("out")}
                </div>

                <Ledger label="Business Outcomes" items={ind.outcomes} accent={accent} align="right" />
              </div>

              <div style={{ textAlign: "center", margin: "20px 0 2px", fontSize: 14, fontWeight: 600, color: "var(--text-2)" }}>{ind.core.line}</div>

              {/* metrics + CTA */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", background: "#fff", border: "1px solid var(--line)", borderRadius: 16, marginTop: 18, overflow: "hidden" }}>
                {ind.metrics.map((m, i) => (
                  <div key={m.label} style={{ padding: "22px 18px", textAlign: "center", borderLeft: i === 0 ? "none" : "1px solid var(--line)" }}>
                    <div style={{ fontSize: 26, fontWeight: 800, color: accent, letterSpacing: "-0.02em" }}>{m.value}</div>
                    <div style={{ fontSize: 12.5, color: "var(--muted)", marginTop: 4 }}>{m.label}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "center", marginTop: 26 }}>
                <a className="btn btn-primary" href="#contact" style={{ background: accent, boxShadow: `0 10px 30px ${withAlpha(accent, 0.3)}` }}>
                  Explore {ind.tab.split(" ")[0]} solutions <Arrow />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
