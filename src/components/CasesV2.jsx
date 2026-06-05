import React from 'react';
import { Link } from 'react-router-dom';
import { Icon, Eyebrow, Arrow, Reveal, CountUp, withAlpha } from './site-ui';


import { CASES } from '../data/site-data';

function FlowStep({ kind, text, accent, last }) {
  const meta = {
    Challenge: { i: "CircleAlert,AlertCircle", c: "#E11D48", bg: "#FEF2F2" },
    Solution: { i: "Lightbulb,Wrench", c: accent, bg: withAlpha(accent, 0.1) },
    Outcome: { i: "TrendingUp", c: "var(--green)", bg: "var(--green-50)" }
  }[kind];
  
  return (
    <div style={{ position: "relative", paddingLeft: 44, paddingBottom: last ? 0 : 22 }}>
      {!last && <span style={{ position: "absolute", left: 15, top: 34, bottom: 0, width: 2, background: "var(--line)" }} />}
      <span style={{ position: "absolute", left: 0, top: 0, width: 32, height: 32, borderRadius: 9, background: meta.bg, color: meta.c, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon name={meta.i} size={17} stroke={2} />
      </span>
      <div style={{ fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: 1.2, textTransform: "uppercase", color: "var(--faint)", marginBottom: 5, paddingTop: 7 }}>{kind}</div>
      <div style={{ fontSize: 15.5, lineHeight: 1.5, color: "var(--text)" }}>{text}</div>
    </div>
  );
}

function FeaturedCase({ c }) {
  return (
    <Reveal variant="slide-left">
      <div className="card feat-case" style={{ padding: 0, overflow: "hidden", display: "grid", gridTemplateColumns: "1.25fr 0.75fr", boxShadow: "var(--sh-lg)" }}>
        <div style={{ padding: "38px 40px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 13, marginBottom: 24 }}>
            <span className="icon-chip" style={{ width: 50, height: 50, borderRadius: 14 }}><Icon name={c.icon} size={24} stroke={2} /></span>










            <div>
              <div style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: 1, textTransform: "uppercase", color: "var(--muted)" }}>{c.industry}</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: "var(--text)", marginTop: 3, letterSpacing: "-0.02em" }}>{c.title}</div>
            </div>
          </div>
          <FlowStep kind="Challenge" text={c.challenge} accent={c.accent} />
          <FlowStep kind="Solution" text={c.solution} accent={c.accent} />
          <FlowStep kind="Outcome" text="A real-time operational backbone that leadership trusts for daily decisions." accent={c.accent} last />
        </div>
        {/* metrics rail */}
        <div style={{ background: "linear-gradient(160deg,#0B1120,#131A2C)", padding: "38px 36px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 26, position: "relative", overflow: "hidden" }}>
          <div className="mesh" style={{ opacity: 0.6 }} />
          {c.impact.map((m) => (
            <div key={m.l} style={{ position: "relative" }}>
              <div style={{ fontSize: 44, fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1 }}><CountUp value={m.v} /></div>
              <div style={{ fontSize: 13.5, color: "#9FB0C8", marginTop: 6 }}>{m.l}</div>
            </div>
          ))}
          {c.link && c.link.startsWith('/') ? (
            <Link className="btn btn-primary" to={c.link} style={{ position: "relative", marginTop: 8 }}>View Case Study <Arrow /></Link>
          ) : (
            <a className="btn btn-primary" href={c.link || "#contact"} rel="noopener noreferrer" style={{ position: "relative", marginTop: 8 }}>View Case Study <Arrow /></a>
          )}
        </div>
      </div>
    </Reveal>
  );
}

function SupportingCase({ c, i }) {
  return (
    <Reveal variant="scale-in" delay={i * 120 + 80}>
      <div className={`card ${c.comingSoon ? '' : 'hover'} supp-case`} style={{ padding: 0, height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <span className="supp-accent" style={{ height: 3, background: "linear-gradient(90deg,#2563FF,#7C3AED)", display: "block" }} />
        <div style={{ padding: "26px 28px", display: "flex", flexDirection: "column", flex: 1 }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span className="icon-chip"><Icon name={c.icon} size={22} stroke={2} /></span>
              <div>
                <div style={{ fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: 1, textTransform: "uppercase", color: "var(--muted)" }}>{c.industry}</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginTop: 2, letterSpacing: "-0.01em" }}>{c.title}</div>
              </div>
            </div>
            {c.comingSoon && (
              <span style={{
                fontFamily: "var(--mono)",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: 0.8,
                textTransform: "uppercase",
                background: "rgba(37, 99, 255, 0.08)",
                color: "var(--blue)",
                padding: "4px 10px",
                borderRadius: 6,
                border: "1px solid rgba(37, 99, 255, 0.15)",
                whiteSpace: "nowrap",
                marginTop: 2
              }}>
                Coming Soon
              </span>
            )}
          </div>
          {/* challenge -> solution */}
          <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 12 }}>
            {[["Challenge", c.challenge, "CircleAlert,AlertCircle", "#E11D48"], ["Solution", c.solution, "Lightbulb,Wrench", "var(--blue)"]].map(([k, t, ic, col]) => (
              <div key={k} style={{ display: "flex", gap: 11, alignItems: "flex-start" }}>
                <span style={{ width: 26, height: 26, flexShrink: 0, borderRadius: 8, background: col === "#E11D48" ? "#FEF2F2" : "var(--blue-50)", color: col, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1 }}><Icon name={ic} size={14} stroke={2} /></span>
                <div>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 9.5, letterSpacing: 1, textTransform: "uppercase", color: "var(--faint)" }}>{k}</div>
                  <div style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.45, marginTop: 2 }}>{t}</div>
                </div>
              </div>
            ))}
          </div>
          {/* outcome — emphasized */}
          <div style={{ marginTop: "auto", paddingTop: 18 }}>
            <div style={{ fontFamily: "var(--mono)", fontSize: 9.5, letterSpacing: 1, textTransform: "uppercase", color: "var(--green)", marginBottom: 10, display: "flex", alignItems: "center", gap: 6 }}><Icon name="TrendingUp" size={13} stroke={2.2} /> Outcome</div>
            {!c.comingSoon ? (
              c.link && c.link.startsWith('/') ? (
                <Link 
                  className="supp-outcome-link" 
                  to={c.link} 
                  style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "space-between", 
                    padding: "14px 16px", 
                    background: "linear-gradient(90deg, rgba(37,99,255,0.04), rgba(124,58,237,0.02))", 
                    borderRadius: 12, 
                    border: "1px solid var(--line)",
                    textDecoration: "none",
                    color: "inherit",
                    cursor: "pointer",
                    transition: "all 0.2s ease"
                  }}
                >
                  <div style={{ display: "flex", gap: 22 }}>
                    {c.impact.slice(0, 2).map((m) => (
                      <div key={m.l}>
                        <div style={{ fontSize: 21, fontWeight: 800, color: "var(--blue)", letterSpacing: "-0.02em" }}>{m.v}</div>
                        <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 1 }}>{m.l}</div>
                      </div>
                    ))}
                  </div>
                  <span className="supp-arrow" style={{ color: "var(--blue)", display: "flex", alignItems: "center", transition: "transform 0.2s ease" }}>
                    <Arrow size={16} />
                  </span>
                </Link>
              ) : (
                <a 
                  className="supp-outcome-link" 
                  href={c.link || "#contact"} 
                  rel="noopener noreferrer" 
                  style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "space-between", 
                    padding: "14px 16px", 
                    background: "linear-gradient(90deg, rgba(37,99,255,0.04), rgba(124,58,237,0.02))", 
                    borderRadius: 12, 
                    border: "1px solid var(--line)",
                    textDecoration: "none",
                    color: "inherit",
                    cursor: "pointer",
                    transition: "all 0.2s ease"
                  }}
                >
                  <div style={{ display: "flex", gap: 22 }}>
                    {c.impact.slice(0, 2).map((m) => (
                      <div key={m.l}>
                        <div style={{ fontSize: 21, fontWeight: 800, color: "var(--blue)", letterSpacing: "-0.02em" }}>{m.v}</div>
                        <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 1 }}>{m.l}</div>
                      </div>
                    ))}
                  </div>
                  <span className="supp-arrow" style={{ color: "var(--blue)", display: "flex", alignItems: "center", transition: "transform 0.2s ease" }}>
                    <Arrow size={16} />
                  </span>
                </a>
              )
            ) : (
              <div 
                style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "space-between", 
                  padding: "14px 16px", 
                  background: "linear-gradient(90deg, rgba(37,99,255,0.02), rgba(124,58,237,0.01))", 
                  borderRadius: 12, 
                  border: "1px solid var(--line)",
                  color: "inherit"
                }}
              >
                <div style={{ display: "flex", gap: 22 }}>
                  {c.impact.slice(0, 2).map((m) => (
                    <div key={m.l}>
                      <div style={{ fontSize: 21, fontWeight: 800, color: "var(--blue)", letterSpacing: "-0.02em" }}>{m.v}</div>
                      <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 1 }}>{m.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function CasesV2() {
  return (
    <section className="section" id="cases">
      <div className="container">
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, flexWrap: "wrap", marginBottom: 44 }}>
          <Reveal>
            <Eyebrow>Featured case studies</Eyebrow>
            <h2 className="h2" style={{ marginTop: 16 }}>Real systems. Real business outcomes.</h2>
          </Reveal>
          <Reveal delay={80}><Link className="linka" to="/case-studies">Browse all work <Arrow /></Link></Reveal>




        </div>
        <FeaturedCase c={CASES[0]} />
        <div className="cases-supp" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22, marginTop: 22 }}>
          <SupportingCase c={CASES[1]} i={0} />
          <SupportingCase c={CASES[3]} i={1} />



        </div>
      </div>
    </section>
  );
}