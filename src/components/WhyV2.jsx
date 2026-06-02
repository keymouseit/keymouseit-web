import React from 'react';
import { Icon, SectionHead, Reveal, Btn } from './site-ui';
import { WHY_COMPARE } from '../data/site-data';

function CompareRow({ row, i, header }) {
  if (header) {
    return (
      <div className="cmp-head" style={{ display: "flex", alignItems: "stretch", background: "linear-gradient(180deg,#FBFCFE,#fff)" }}>
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 10, padding: "18px 28px" }}>
          <Icon name="Building2" size={18} stroke={2} color="var(--faint)" />
          <span style={{ fontSize: 15, fontWeight: 700, color: "var(--muted)" }}>Typical Agency</span>
        </div>
        <div style={{ width: 64, flexShrink: 0 }} />
        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 10, padding: "18px 28px", background: "linear-gradient(180deg, rgba(37,99,255,0.10), rgba(124,58,237,0.05))", borderLeft: "2px solid var(--blue)" }}>
          <span style={{ width: 26, height: 26, borderRadius: 7, background: "var(--blue)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "var(--sh-blue)" }}><Icon name="MousePointer2,MousePointer" size={14} color="#fff" stroke={2.2} /></span>
          <span style={{ fontSize: 16.5, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.01em" }}>KeyMouse</span>
        </div>
      </div>
    );
  }
  return (
    <div className="cmp-r" style={{ display: "flex", alignItems: "stretch", borderTop: "1px solid var(--line)", overflow: "hidden" }}>
      {/* agency */}
      <Reveal variant="slide-left" delay={i * 80} style={{ flex: 1, display: "flex" }}>
        <div className="cmp-agency" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 12, padding: "22px 28px", textAlign: "right" }}>
          <span style={{ fontSize: 15.5, color: "var(--muted)", textDecoration: "line-through", textDecorationColor: "rgba(225,29,72,0.4)", textDecorationThickness: "1.5px" }}>{row.agency}</span>
          <span style={{ width: 22, height: 22, flexShrink: 0, borderRadius: "50%", background: "#FEF2F2", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name="X" size={13} stroke={2.6} color="#E11D48" /></span>
        </div>
      </Reveal>
      
      {/* transformation arrow */}
      <div className="cmp-spine" style={{ width: 64, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <span style={{ position: "absolute", top: 0, bottom: 0, left: "50%", width: 1, background: "var(--line)" }} />
        <Reveal variant="scale-in" delay={i * 80 + 30}>
          <span className="cmp-arrow" style={{ position: "relative", width: 32, height: 32, borderRadius: "50%", background: "#fff", border: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--blue)", boxShadow: "var(--sh-sm)" }}>
            <Icon name="ArrowRight" size={16} stroke={2.4} />
          </span>
        </Reveal>
      </div>
      
      {/* keymouse */}
      <Reveal variant="slide-right" delay={i * 80 + 60} style={{ flex: 1, display: "flex" }}>
        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 12, padding: "22px 28px", background: "linear-gradient(90deg, rgba(37,99,255,0.06), rgba(124,58,237,0.04))", borderLeft: "2px solid var(--blue)" }}>
          <span style={{ width: 24, height: 24, flexShrink: 0, borderRadius: "50%", background: "var(--green-50)", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name="Check" size={14} stroke={2.8} color="var(--green)" /></span>
          <span style={{ fontSize: 17, fontWeight: 700, color: "var(--text)", letterSpacing: "-0.01em" }}>{row.us}</span>
        </div>
      </Reveal>
    </div>
  );
}

export default function WhyV2() {
  return (
    <section className="section" id="why" style={{ position: "relative", overflow: "hidden", background: "linear-gradient(180deg,#FFFFFF,#F6F8FE)" }}>
      <div className="mesh" style={{ opacity: 0.8 }} />
      <div className="container" style={{ position: "relative" }}>
        <Reveal>
          <SectionHead center maxWidth={700}
            eyebrow="Why KeyMouse"
            title="Not another development agency."
            lead="We help companies build operational systems that create measurable business outcomes — not just ship features." />
        </Reveal>

        <Reveal delay={60}>
          <div style={{ textAlign: "center", marginTop: 22 }}>
            <span style={{ fontSize: 17, fontStyle: "italic", color: "var(--text-2)", fontWeight: 500 }}>
              Most agencies ship features. <span style={{ color: "var(--blue)", fontStyle: "normal", fontWeight: 700 }}>KeyMouse ships outcomes.</span>
            </span>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="card cmp-card" style={{ maxWidth: 880, margin: "36px auto 0", overflow: "hidden", boxShadow: "var(--sh-xl)" }}>
            <CompareRow header />
            {WHY_COMPARE.map((row, i) => <CompareRow key={row.us} row={row} i={i} />)}
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <Btn variant="primary" lg href="#contact" icon>See what that looks like for you</Btn>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
