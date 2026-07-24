import React from 'react';
import { Icon, Reveal, withAlpha } from './site-ui';

const STAGES = [
  { k: "Inputs", d: "CRM · ERP · Docs · Orders", i: "Database", c: "#64748B", anim: "slide-left" },
  { k: "Intelligence", d: "AI processing & orchestration", i: "BrainCircuit,Brain", c: "#2563FF", anim: "scale-in" },
  { k: "Decisions", d: "Forecasts · Alerts · Approvals", i: "GitBranch,Workflow", c: "#6D4AE6", anim: "scale-in" },
  { k: "Outcomes", d: "Automation · Lower cost · Scale", i: "TrendingUp", c: "#7C3AED", anim: "slide-right" },
];

export default function SignatureRibbon() {
  return (
    <div style={{ position: "relative", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", background: "linear-gradient(180deg, #FFFFFF, #FAFBFF)", overflow: "hidden" }}>
      <div className="grid-lines" style={{ opacity: 0.5 }} />
      <div className="container sig-ribbon-container" style={{ position: "relative", padding: "30px 32px" }}>
        <Reveal variant="fade-in">
          <div style={{ display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center", gap: 8, marginBottom: 22 }}>
            <span style={{ fontFamily: "var(--mono)", fontSize: 11.5, letterSpacing: 2, textTransform: "uppercase", color: "var(--muted)" }}>The KeyMouse IT method</span>
          </div>
        </Reveal>

        <div className="sig-row" style={{ display: "flex", alignItems: "stretch", gap: 0 }}>
          {STAGES.map((s, i) => {
            const last = i === STAGES.length - 1;
            return (
              <div className="sig-step" key={s.k}>
                <Reveal variant={s.anim} delay={i * 120} style={{ flex: 1, display: "flex", width: "100%" }}>
                  <div className="sig-stage" style={{ flex: 1, display: "flex", alignItems: "center", gap: 14, padding: "4px 8px", justifyContent: "center", width: "100%" }}>
                    <span className="node-float" style={{ width: 46, height: 46, flexShrink: 0, borderRadius: 13, background: withAlpha(s.c, 0.1), border: `1px solid ${withAlpha(s.c, 0.22)}`, color: s.c, display: "flex", alignItems: "center", justifyContent: "center", animationDelay: `${i * 0.5}s` }}>
                      <Icon name={s.i} size={22} stroke={2} />
                    </span>
                    <div>
                      <div style={{ fontSize: 16, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.01em" }}>{s.k}</div>
                      <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>{s.d}</div>
                    </div>
                  </div>
                </Reveal>

                {!last && (
                  <div className="sig-arrow" aria-hidden="true" style={{ flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--blue)", padding: "0 6px" }}>
                    <svg width="34" height="14" viewBox="0 0 34 14" fill="none">
                      <line x1="0" y1="7" x2="26" y2="7" stroke={withAlpha("#2563FF", 0.45)} strokeWidth="1.6" strokeDasharray="3 5" className="flow-line" />
                      <path d="M24 2 L30 7 L24 12" stroke="#2563FF" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
