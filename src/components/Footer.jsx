import React from 'react';
import { Link } from 'react-router-dom';
import { Icon, Logo } from './site-ui';

export default function Footer() {
  const cols = [
    ["Solutions", ["Operational Intelligence", "AI Automation", "Enterprise Platforms", "Identity & Security"]],
    ["Industries", ["Logistics", "Manufacturing", "Energy", "Retail"]],
    ["Company", ["Case Studies", "Services", "Contact"]],
  ];

  const getHref = (link) => {
    switch (link) {
      case "Operational Intelligence":
      case "AI Automation":
      case "Enterprise Platforms":
      case "Identity & Security":
        return "#solutions";
      case "Logistics":
      case "Manufacturing":
      case "Energy":
      case "Retail":
        return "#industries";
      case "Case Studies":
        return "/case-studies/index.html";
      case "Services":
        return "#services";
      case "Contact":
        return "#contact";
      default:
        return "#contact";
    }
  };

  return (
    <footer style={{ background: "#070B14", color: "#8A97AC", padding: "64px 0 40px" }}>
      <div className="container">
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: 40 }}>
          <div>
            <a className="brand" href="#top" style={{ display: "flex", alignItems: "center", textDecoration: "none", color: "#fff" }}>
              <Logo height={48} mode="dark" />
            </a>
            <p style={{ fontSize: 15, lineHeight: 1.6, marginTop: 16, maxWidth: "26em", color: "#9FB0C8", fontWeight: 500 }}>
              KeyMouse IT builds AI-powered operational systems for companies that need to scale.
            </p>
            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              <a href="https://www.linkedin.com/company/keymouse-it" target='_blank' aria-label="LinkedIn" style={{ width: 38, height: 38, borderRadius: 10, border: "1px solid rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "#9FB0C8", textDecoration: "none" }}><Icon name="Linkedin" size={18} stroke={2} /></a>
              <a href="mailto:info@keymouseit.com" aria-label="Email" style={{ width: 38, height: 38, borderRadius: 10, border: "1px solid rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "#9FB0C8", textDecoration: "none" }}><Icon name="Mail" size={18} stroke={2} /></a>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 24, fontSize: 14.5, color: "#9FB0C8" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: "#6FA0FF", display: "inline-flex" }}><Icon name="Phone" size={16} stroke={2.2} /></span>
                <div style={{ display: "flex", gap: 8, fontWeight: 500 }}>
                  <a href="tel:+919501755574" style={{ color: "#9FB0C8", textDecoration: "none" }}>+91 95017 55574</a>
                  <span style={{ color: "rgba(255,255,255,0.2)" }}>|</span>
                  <a href="tel:+919501555574" style={{ color: "#9FB0C8", textDecoration: "none" }}>+91 95015 55574</a>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: "#25D366", display: "inline-flex", alignItems: "center" }}>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </span>
                <a href="https://wa.me/919501055574" target="_blank" rel="noopener noreferrer" style={{ color: "#9FB0C8", textDecoration: "none", fontWeight: 500, display: "flex", alignItems: "center", gap: 6 }}>
                  +91 95010 55574
                </a>
              </div>
            </div>
          </div>
          {cols.map(([h, links]) => (
            <div key={h}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", letterSpacing: 0.3, marginBottom: 16 }}>{h}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                {links.map((l) => <a key={l} href={getHref(l)} style={{ fontSize: 14.5, color: "#8A97AC", textDecoration: "none" }}>{l}</a>)}
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, marginTop: 48, paddingTop: 28, borderTop: "1px solid rgba(255,255,255,0.08)", fontSize: 13.5 }}>
          <span>© {new Date().getFullYear()} KeyMouse IT. All rights reserved.</span>
          <div style={{ display: "flex", gap: 24 }}>
            <Link to="/privacy" target='_blank' rel='noopener noreferrer' style={{ color: "#8A97AC", textDecoration: "none" }}>Privacy</Link>
            <Link to="/terms" target='_blank' rel='noopener noreferrer' style={{ color: "#8A97AC", textDecoration: "none" }}>Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
