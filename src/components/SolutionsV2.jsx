import React from 'react';
import { Icon, SectionHead, Reveal, Arrow } from './site-ui';
import { SOLUTIONS } from '../data/site-data';

function MiniFlow() {
  const L = [16, 37, 58], R = [16, 37, 58];
  return (
    <svg className="sol-diagram" viewBox="0 0 240 74" width="100%" height="74" style={{ display: "block" }}>
      {/* connectors in */}
      {L.map((y, i) => <path key={"l" + i} d={`M24 ${y} C 70 ${y} 78 37 108 37`} fill="none" stroke="rgba(37,99,255,0.35)" strokeWidth="1.4" className="flow-line" />)}
      {/* connectors out */}
      {R.map((y, i) => <path key={"r" + i} d={`M132 37 C 162 37 170 ${y} 216 ${y}`} fill="none" stroke="rgba(37,99,255,0.35)" strokeWidth="1.4" className="flow-line" />)}
      {/* core node */}
      <rect x="106" y="25" width="28" height="24" rx="8" fill="url(#solgrad)" />
      <defs>
        <linearGradient id="solgrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2563FF" /><stop offset="1" stopColor="#7C3AED" />
        </linearGradient>
      </defs>
      {/* dots */}
      {L.map((y, i) => <circle key={"ld" + i} className="dot-pulse" cx="20" cy={y} r="4" fill="#2563FF" opacity="0.55" />)}
      {R.map((y, i) => <circle key={"rd" + i} className="dot-pulse" cx="220" cy={y} r="4" fill="#2563FF" opacity="0.55" />)}
    </svg>
  );
}

export default function SolutionsV2() {
  return (
    <section className="section band" id="solutions">
      <div className="container">
        <Reveal>
          <SectionHead center maxWidth={680}
            eyebrow="Solutions we build"
            title="Systems that solve real business problems."
            lead="Every solution follows the same logic — connect inputs, add intelligence, drive outcomes." />
        </Reveal>
        <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 22, marginTop: 56 }}>
          {SOLUTIONS.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 70}>
              <div className="card hover sol-card hover-card-tilt" style={{ padding: "26px 26px 24px", height: "100%", display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
                  <span className="icon-chip" style={{ width: 46, height: 46 }}><Icon name={s.icon} size={22} stroke={1.9} /></span>
                  <h3 className="h3" style={{ fontSize: 19 }}>{s.title}</h3>
                </div>
                <div style={{ margin: "20px 0 14px", padding: "8px 4px", borderTop: "1px solid var(--line-2)", borderBottom: "1px solid var(--line-2)" }}>
                  <MiniFlow />
                  <div style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: 0.4, color: "var(--muted)", textAlign: "center", marginTop: 8 }}>{s.flow}</div>
                </div>
                <p className="body" style={{ fontSize: 14.5 }}>{s.desc}</p>
                {/* hover reveal */}
                <div className="sol-reveal">
                  <div className="sol-reveal-inner">
                    <div style={{ display: "flex", gap: 9, alignItems: "flex-start", paddingTop: 14, borderTop: "1px dashed var(--line-strong)" }}>
                      <Icon name="CornerDownRight" size={15} stroke={2} color="var(--blue)" style={{ marginTop: 2, flexShrink: 0 }} />
                      <span style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.45 }}>{s.use}</span>
                    </div>
                    <a className="linka" href="#contact" style={{ marginTop: 12, fontSize: 13.5 }}>Explore capability <Arrow size={15} /></a>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
