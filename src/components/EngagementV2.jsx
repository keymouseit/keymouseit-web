import React, { useState } from 'react';
import { Icon, SectionHead, Reveal } from './site-ui';
import { MODELS } from '../data/site-data';

const NEEDS = [
  { id: "scratch", label: "Build from scratch", rec: 0, icon: "Rocket,Sparkles" },
  { id: "modernize", label: "Modernize existing product", rec: 1, icon: "RefreshCw,Wrench" },
  { id: "capacity", label: "Add engineering capacity", rec: 2, icon: "UserPlus" },
  { id: "partner", label: "Long-term technology partner", rec: 3, icon: "Handshake,Compass" },
];

export default function EngagementV2() {
  const [need, setNeed] = useState("scratch");
  const recIdx = NEEDS.find((n) => n.id === need).rec;

  return (
    <section className="section band" id="models">
      <div className="container">
        <Reveal>
          <SectionHead center maxWidth={640}
            eyebrow="Engagement models"
            title="Flexible models to fit your needs."
            lead="Choose the model that fits your stage, budget, and internal capacity." />
        </Reveal>

        {/* selector */}
        <Reveal delay={60}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 44 }}>
            <div style={{ fontFamily: "var(--mono)", fontSize: 11.5, letterSpacing: 1.2, textTransform: "uppercase", color: "var(--muted)", marginBottom: 16 }}>What do you need?</div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
              {NEEDS.map((n) => {
                const on = need === n.id;
                return (
                  <button key={n.id} onClick={() => setNeed(n.id)} style={{
                    display: "inline-flex", alignItems: "center", gap: 9, cursor: "pointer",
                    border: `1px solid ${on ? "var(--blue)" : "var(--line-strong)"}`, borderRadius: 999,
                    background: on ? "var(--blue)" : "#fff", color: on ? "#fff" : "var(--text-2)",
                    padding: "11px 20px", fontSize: 14.5, fontWeight: 600, fontFamily: "var(--font)",
                    boxShadow: on ? "var(--sh-blue)" : "var(--sh-xs)", transition: "all 0.18s var(--ease)",
                  }}>
                    <Icon name={n.icon} size={17} stroke={2} color={on ? "#fff" : "var(--blue)"} />
                    {n.label}
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* models */}
        <div className="grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20, marginTop: 40 }}>
          {MODELS.map((m, i) => {
            const rec = i === recIdx;
            return (
              <Reveal key={m.title} delay={i * 70}>
                <div className="card" style={{
                  padding: "28px 24px", height: "100%", display: "flex", flexDirection: "column", position: "relative",
                  border: rec ? "1.5px solid var(--blue)" : "1px solid var(--line)",
                  boxShadow: rec ? "0 18px 40px rgba(37,99,255,0.16)" : "var(--sh-sm)",
                  transform: rec ? "translateY(-4px)" : "none", transition: "all 0.3s var(--ease)",
                }}>
                  {rec && <span style={{ position: "absolute", top: -11, left: 24, background: "var(--blue)", color: "#fff", fontSize: 11, fontWeight: 700, letterSpacing: 0.4, padding: "4px 11px", borderRadius: 999, boxShadow: "var(--sh-blue)", display: "inline-flex", alignItems: "center", gap: 5 }}><Icon name="Sparkles" size={12} stroke={2.2} />Recommended</span>}
                  <span className="icon-chip" style={{ width: 48, height: 48, borderRadius: 14, background: rec ? "var(--blue)" : "var(--blue-50)", color: rec ? "#fff" : "var(--blue)", borderColor: rec ? "var(--blue)" : "var(--blue-100)" }}><Icon name={m.icon} size={22} stroke={1.9} /></span>
                  <h3 className="h3" style={{ marginTop: 20, fontSize: 18, color: "var(--blue)" }}>{m.title}</h3>
                  <p className="body" style={{ marginTop: 10, fontSize: 14, flex: 1 }}>{m.desc}</p>
                  <div style={{ marginTop: 18, paddingTop: 14, borderTop: "1px solid var(--line)", display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 0.6, textTransform: "uppercase", color: "var(--faint)" }}>Best for</span>
                    <span style={{ fontSize: 12.5, fontWeight: 600, color: "var(--blue)" }}>{m.best}</span>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
