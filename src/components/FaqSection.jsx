import React, { useState } from 'react';
import { Icon, Eyebrow, Arrow, Reveal } from './site-ui';
import { FAQS } from '../data/site-data';

function FaqItem({ item, open, onToggle }) {
  return (
    <div className={`faq-item ${open ? "open" : ""}`}>
      <button className="faq-q" onClick={onToggle} aria-expanded={open}>
        {item.q}
        <span className="chev"><Icon name="Plus" size={22} stroke={2.2} /></span>
      </button>
      <div className="faq-a"><div className="faq-a-inner">{item.a}</div></div>
    </div>
  );
}

export default function FaqSection() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section band" id="faq">
      <div className="container">
        <div className="faq-grid" style={{ display: "grid", gridTemplateColumns: "0.8fr 1.2fr", gap: 64, alignItems: "start" }}>
          <Reveal>
            <div className="faq-sticky" style={{ position: "sticky", top: 100 }}>
              <Eyebrow>FAQ</Eyebrow>
              <h2 className="h2" style={{ marginTop: 16 }}>Questions, answered.</h2>
              <p className="lead" style={{ marginTop: 18 }}>Everything you need to know about working with KeyMouse IT.</p>
              <div style={{ marginTop: 26 }}><a className="linka" href="#contact">Still have questions? Talk to us <Arrow /></a></div>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div>
              {FAQS.map((f, i) => (
                <FaqItem key={f.q} item={f} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
              ))}
              <div className="faq-reassure" style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 26, padding: "20px 24px", background: "#fff", border: "1px solid var(--line)", borderRadius: 14, boxShadow: "var(--sh-xs)" }}>
                <span style={{ width: 40, height: 40, flexShrink: 0, borderRadius: 11, background: "var(--blue-50)", color: "var(--blue)", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name="Compass,Map" size={20} stroke={2} /></span>
                <span style={{ fontSize: 15, color: "var(--text-2)", flex: 1, minWidth: 0 }}>Still unsure where to start? Book a strategy call and we'll help define the right path.</span>
                <a className="btn btn-primary faq-reassure-btn" href="#contact" style={{ flexShrink: 0 }}>Book a call <Arrow /></a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
