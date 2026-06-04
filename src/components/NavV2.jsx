import React, { useState, useEffect } from 'react';
import { Icon, Btn, Arrow, Logo } from './site-ui';

export default function NavV2() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const links = [
    ["About Us", "#founder"],
    ["Capabilities", "#services"],
    ["Industries", "#industries"],
    ["Case Studies", "#cases"],
    ["AI Solutions", "#solutions"],
    ["Contact Us", "#contact"]
  ];

  return (
    <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
      <div className="container nav-inner">
        <a className="brand" href="/" onClick={() => setOpen(false)} style={{ display: "flex", alignItems: "center", textDecoration: "none", padding: "4px 0" }}>
          <Logo height={44} />
        </a>
        <div className="nav-links">
          {links.slice(0, 5).map(([l, h]) => (
            <a key={l} href={h}>{l}</a>
          ))}
        </div>
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
            <a key={l} href={h} onClick={() => setOpen(false)}>
              {l}
              <Icon name="ArrowUpRight,ArrowRight" size={18} stroke={2} color="var(--faint)" />
            </a>
          ))}
          <a className="btn btn-primary btn-lg btn-block" href="#contact" onClick={() => setOpen(false)} style={{ marginTop: 12 }}>
            Book Strategy Call <Arrow />
          </a>
          <div style={{ display: "flex", gap: 10, marginTop: 18, justifyContent: "center" }}>
            <a href="#contact" aria-label="LinkedIn" onClick={() => setOpen(false)} style={{ width: 42, height: 42, borderRadius: 11, border: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--muted)" }}><Icon name="Linkedin" size={19} stroke={2} /></a>
            <a href="#contact" aria-label="Email" onClick={() => setOpen(false)} style={{ width: 42, height: 42, borderRadius: 11, border: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--muted)" }}><Icon name="Mail" size={19} stroke={2} /></a>
          </div>
        </div>
      </div>
    </nav>
  );
}
