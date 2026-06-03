import React, { useState } from 'react';
import { Icon, Eyebrow, Btn, Reveal } from './site-ui';

const NET_NODES = [
  [80, 90], [240, 200], [140, 360], [330, 470], [60, 520],
  [470, 110], [620, 300], [560, 520], [780, 180], [900, 420],
  [1050, 120], [1140, 340], [1010, 540], [380, 80], [720, 60],
];
const NET_EDGES = [[0, 1], [1, 2], [2, 3], [2, 4], [1, 5], [5, 6], [6, 7], [3, 7], [5, 8], [8, 9], [8, 10], [9, 11], [9, 12], [10, 11], [13, 5], [14, 8], [6, 9]];

function NetworkBg() {
  return (
    <svg viewBox="0 0 1200 600" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0, opacity: 0.5, pointerEvents: "none" }}>
      {NET_EDGES.map(([a, b], i) => (
        <line key={i} x1={NET_NODES[a][0]} y1={NET_NODES[a][1]} x2={NET_NODES[b][0]} y2={NET_NODES[b][1]} stroke="rgba(111,160,255,0.18)" strokeWidth="1" />
      ))}
      {NET_NODES.map(([x, y], i) => (
        <circle key={i} className="net-node" cx={x} cy={y} r={i % 4 === 0 ? 4 : 2.5} fill={i % 4 === 0 ? "#6FA0FF" : "rgba(111,160,255,0.5)"} style={{ animationDelay: `${(i % 6) * 0.5}s`, transformBox: "fill-box", transformOrigin: "center" }} />
      ))}
    </svg>
  );
}

export default function FinalCTAV2() {
  const [sent, setSent] = useState(false);
  const submit = (e) => { e.preventDefault(); setSent(true); };
  const notes = [["CircleCheck,CheckCircle", "Free consultation"], ["Lock", "No commitment"], ["Sparkles", "Expert guidance"], ["Zap", "Quick response"]];
  
  return (
    <section className="section ink cta-pad" id="contact" style={{ position: "relative", overflow: "hidden", paddingTop: 130, paddingBottom: 130 }}>
      <NetworkBg />
      <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: 700, height: 400, background: "radial-gradient(circle, rgba(37,99,255,0.22), transparent 68%)", pointerEvents: "none" }} />
      <div className="container" style={{ position: "relative" }}>
        <div className="v2-hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.04fr", gap: 72, alignItems: "center" }}>
          <Reveal>
            <Eyebrow>Let's talk</Eyebrow>
            <h2 style={{ marginTop: 18, fontSize: "clamp(44px, 5.6vw, 76px)", lineHeight: 1.0, fontWeight: 800, letterSpacing: "-0.04em", color: "#fff" }}>
              Let's build<br />what's <span className="grad-text" style={{ backgroundImage: "linear-gradient(110deg,#6FA0FF,#B98CFF)" }}>next.</span>
            </h2>
            <p className="lead" style={{ marginTop: 24, fontSize: 19, color: "#B9C6D9", maxWidth: "26em" }}>
              Share your goals and challenges. We'll review your requirements and recommend the best path forward.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "14px 28px", marginTop: 30 }}>
              {notes.map(([ic, t]) => (
                <div key={t} style={{ display: "flex", alignItems: "center", gap: 9 }}>
                  <span style={{ color: "#6FA0FF" }}><Icon name={ic} size={18} stroke={2} /></span>
                  <span style={{ fontSize: 15, color: "#C7D2E0", fontWeight: 500 }}>{t}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="card" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.13)", borderRadius: 22, padding: 34, boxShadow: "var(--sh-xl)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}>
              {sent ? (
                <div style={{ textAlign: "center", padding: "44px 10px" }}>
                  <span style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(22,163,74,0.16)", border: "1px solid rgba(22,163,74,0.4)", color: "#4ADE80", display: "inline-flex", alignItems: "center", justifyContent: "center" }}><Icon name="Check" size={32} stroke={2.4} /></span>
                  <h3 style={{ color: "#fff", fontSize: 24, marginTop: 22 }}>Thank you — message received.</h3>
                  <p style={{ color: "#9FB0C8", fontSize: 16, marginTop: 10, lineHeight: 1.6 }}>We'll review your requirements and get back to you within one business day.</p>
                </div>
              ) : (
                <form onSubmit={submit}>
                  <div className="form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div className="field"><label>Name</label><input required placeholder="Your name" /></div>
                    <div className="field"><label>Work email</label><input required type="email" placeholder="you@company.com" /></div>
                    <div className="field" style={{ gridColumn: "1 / -1" }}><label>Company</label><input required placeholder="Company name" /></div>
                    <div className="field" style={{ gridColumn: "1 / -1" }}><label>Project challenge</label><textarea required rows="3" placeholder="What operational problem are you trying to solve?"></textarea></div>
                    <div className="field"><label>Budget range</label>
                      <select defaultValue=""><option value="" disabled>Select range</option><option>{"< $25k"}</option><option>$25k – $75k</option><option>$75k – $200k</option><option>$200k+</option></select>
                    </div>
                    <div className="field"><label>Timeline</label>
                      <select defaultValue=""><option value="" disabled>Select timeline</option><option>ASAP</option><option>1–3 months</option><option>3–6 months</option><option>Exploring</option></select>
                    </div>
                  </div>
                  <Btn type="submit" variant="primary" lg block style={{ marginTop: 22 }}>Book Strategy Call</Btn>
                  <p style={{ fontSize: 12.5, color: "#6B7689", textAlign: "center", marginTop: 14 }}>Free consultation · No commitment · Quick response</p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
