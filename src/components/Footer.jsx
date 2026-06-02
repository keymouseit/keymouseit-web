import React from 'react';
import { Icon } from './site-ui';

export default function Footer() {
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
