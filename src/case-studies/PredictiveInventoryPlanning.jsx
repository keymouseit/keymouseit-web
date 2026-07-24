import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../components/site-ui';
import { ContactForm } from './components/contact-form';
import { ArrowRight, ArrowUpRight, IconCoordination, IconVisibility, IconSequencing, IconPlanning, IconLatency, LayerGlyph } from './components/icons';
import CaseStudyDetailNav from './components/CaseStudyDetailNav';
import './case-studies.css';
import './case-studies-mobile.css';


/* --- Section from case-predictive/nav.jsx --- */



/* --- Section from case-predictive/hero.jsx --- */


function LinkedInBanner() {
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const src = (p.get("utm_source") || "").toLowerCase();
    const ref = (document.referrer || "").toLowerCase();
    if (src === "linkedin" || ref.includes("linkedin.com")) setShow(true);
  }, []);
  if (!show) return null;
  return (
    <a href="#cta" className="linkedin-banner">
      <span className="li-icon" aria-hidden="true">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
          <path d="M3.5 3a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM.5 5.5h2.7V14H.5V5.5zm4.7 0h2.6v1.2h.03c.36-.66 1.24-1.36 2.55-1.36 2.73 0 3.23 1.7 3.23 3.92V14h-2.7v-3.78c0-.9-.02-2.07-1.27-2.07-1.27 0-1.46.98-1.46 2v3.85H5.2V5.5z"/>
        </svg>
      </span>
      <span className="li-text">
        <b>Saw our LinkedIn post?</b> See the planning engine in 60 seconds.
      </span>
      <span className="li-arrow">→</span>
    </a>
  );
}

function CaseHero() {
  return (
    <section className="hero" style={{ paddingTop: 56, paddingBottom: 80, position: "relative", overflow: "hidden" }} data-screen-label="Hero">
      <div className="bg-grid"/>
      <div className="glow-spot" style={{ left: -200, top: -200, opacity: 0.7 }}/>

      <div className="wrap" style={{ position: "relative", zIndex: 1 }}>

        <LinkedInBanner/>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22, gap: 16, flexWrap: "wrap" }}>
          <span className="eyebrow">
            <span style={{ color: "var(--accent)" }}>S.04</span>
            <span className="bar"/>
            Case study · Planning
          </span>
          <span style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.12em", color: "var(--muted)", textTransform: "uppercase" }}>
            60-sec read · 2026
          </span>
        </div>

        <h1 className="display">
          Predictive Inventory<br/>
          <span style={{ color: "var(--blue)" }}>&amp; Supply Planning.</span>
        </h1>
        <p className="lead" style={{ marginTop: 24, fontSize: 20, maxWidth: "52ch" }}>
          Cut peak-period stockouts{" "}
          <span style={{ color: "var(--accent)", fontWeight: 500 }}>~75%</span>{" "}
          — replacing reactive planning with demand-driven forecasting.
        </p>

        <p style={{
          marginTop: 16,
          maxWidth: "56ch",
          fontSize: 16.5,
          lineHeight: 1.55,
          color: "var(--text)",
          background: "linear-gradient(90deg, rgba(37, 99, 255,0.10), rgba(37, 99, 255,0.02))",
          border: "1px solid rgba(37, 99, 255,0.22)",
          borderRadius: 14,
          padding: "12px 16px",
        }}>
          If you plan inventory using past averages — you’re already behind.
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 22 }}>
          {[
            "Planning layer",
            "Multi-SKU",
            "Working capital",
            "Demand-driven",
          ].map((t, i) => (
            <span key={i} style={{
              fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.08em",
              padding: "6px 12px", borderRadius: 999, color: "var(--text-2)",
              border: "1px solid var(--line)", background: "var(--bg-2)",
              textTransform: "uppercase",
            }}>{t}</span>
          ))}
        </div>

        <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap", marginTop: 28 }}>
          <a href="#cta" className="btn btn-primary" style={{ color: "#fff" }}>Get Your Operational System Map <ArrowRight/></a>
          <a href="#built" className="btn btn-ghost">View System Architecture <ArrowUpRight/></a>
        </div>

        <div className="hero-proof">
          <div className="hero-proof-item">
            <b>~75%</b>
            <span>peak stockouts ↓</span>
          </div>
          <div className="hero-proof-item">
            <b>~80%</b>
            <span>emergency procurement ↓</span>
          </div>
          <div className="hero-proof-item">
            <b>20–30%</b>
            <span>turnover ↑</span>
          </div>
          <div className="hero-proof-item hero-proof-meta">
            <b><span className="live-dot"/>Q3 ’26</b>
            <span>3 audit slots left</span>
          </div>
        </div>

        <PlanningPipeline/>
      </div>
    </section>
  );
}

// ── Planning Lifecycle Pipeline ───────────────────────────────────────────
function PlanningPipeline() {
  const stages = [
    { code: "01", label: "Inventory Received",   sub: "Logged at receipt",            kind: "receive",  critical: false },
    { code: "02", label: "Real-Time Tracking",   sub: "Continuous SKU monitor",       kind: "track",    critical: false },
    { code: "03", label: "Demand Forecasting",   sub: "Per-SKU projections",          kind: "forecast", critical: true  },
    { code: "04", label: "Optimization",         sub: "Capital-aware allocation",     kind: "optimize", critical: false },
    { code: "05", label: "Reorder Trigger",      sub: "Lead-time aware",              kind: "reorder",  critical: false },
    { code: "06", label: "Replenishment",        sub: "Order placed",                 kind: "replenish",critical: false },
  ];
  return (
    <div style={{
      position: "relative",
      marginTop: 64,
      background: "var(--panel)",
      border: "1px solid var(--line)",
      borderRadius: 22,
      padding: "28px 28px 32px",
      overflow: "hidden",
    }}>
      {[
        { top: -1, left: -1, rot: 0 },
        { top: -1, right: -1, rot: 90 },
        { bottom: -1, right: -1, rot: 180 },
        { bottom: -1, left: -1, rot: 270 },
      ].map((p, i) => (
        <span key={i} style={{
          position: "absolute", width: 12, height: 12, ...p,
          transform: `rotate(${p.rot}deg)`,
          borderTop: "1px solid var(--accent)",
          borderLeft: "1px solid var(--accent)", opacity: 0.7,
        }}/>
      ))}

      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        paddingBottom: 18, marginBottom: 26,
        borderBottom: "1px dashed var(--line-2)",
        fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.12em",
        color: "var(--muted)", textTransform: "uppercase",
      }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 14 }}>
          <span style={{ color: "var(--accent)" }}>● LIVE</span>
          <span>PLANNING.LIFECYCLE</span>
        </span>
        <span>6 STAGES · 1 FORECAST LAYER</span>
      </div>

      <div className="pipeline-row" style={{
        display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 10, alignItems: "stretch", position: "relative",
      }}>
        {stages.map((s, i) => <PipelineStage key={i} s={s} i={i} last={i === stages.length - 1}/>)}
      </div>

      <div style={{
        marginTop: 22, paddingTop: 18, borderTop: "1px dashed var(--line-2)",
        display: "flex", justifyContent: "space-between", alignItems: "center", gap: 14, flexWrap: "wrap",
        fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.1em",
        color: "var(--muted)", textTransform: "uppercase",
      }}>
        <span><span style={{ color: "var(--accent)" }}>▲</span> Reorders driven by projected demand — not last quarter's average</span>
        <span>Signal-driven, not history-bound</span>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .pipeline-row { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 540px) {
          .pipeline-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

function PipelineStage({ s, i, last }) {
  const accent = s.critical;
  return (
    <div className="pipeline-stage-card" style={{
      position: "relative",
      background: accent
        ? "linear-gradient(180deg, rgba(37, 99, 255,0.10), rgba(37, 99, 255,0.02))"
        : "var(--bg-2)",
      border: `1px solid ${accent ? "rgba(37, 99, 255,0.45)" : "var(--line-2)"}`,
      borderRadius: 12,
      padding: "16px 12px",
      display: "flex", flexDirection: "column", gap: 12,
    }}>
      {!last && (
        <span className="pipeline-stage-arrow" aria-hidden="true" style={{
          position: "absolute", left: "100%", top: "50%",
          width: 10, height: 1, background: "var(--line-3)", zIndex: 2,
        }}>
          <span style={{
            position: "absolute", right: -3, top: -3, width: 0, height: 0,
            borderLeft: "5px solid var(--accent)",
            borderTop: "3px solid transparent", borderBottom: "3px solid transparent",
          }}/>
        </span>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{
          fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.14em",
          color: accent ? "var(--accent)" : "var(--muted)", textTransform: "uppercase",
        }}>{s.code}</span>
        {accent && (
          <span style={{
            fontFamily: "var(--mono)", fontSize: 9.5, letterSpacing: "0.16em",
            color: "var(--accent)", padding: "2px 7px",
            borderRadius: 999, border: "1px solid rgba(37, 99, 255,0.4)",
            textTransform: "uppercase", background: "rgba(37, 99, 255,0.08)",
          }}>FORECAST</span>
        )}
      </div>

      <div style={{
        width: 44, height: 44, borderRadius: 10,
        background: accent ? "rgba(37, 99, 255, 0.12)" : "var(--blue-50)",
        border: `1px solid ${accent ? "rgba(37, 99, 255, 0.3)" : "var(--blue-100)"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: accent ? "var(--accent)" : "var(--blue)", flexShrink: 0
      }}>
        <StageGlyph kind={s.kind} accent={accent}/>
      </div>

      <div>
        <div style={{ fontSize: 13.5, fontWeight: 500, color: "var(--blue)", letterSpacing: "-0.01em", lineHeight: 1.2 }}>{s.label}</div>
        <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>{s.sub}</div>
      </div>

      <span style={{
        position: "absolute", bottom: 10, right: 12,
        width: 6, height: 6, borderRadius: "50%",
        background: accent ? "var(--accent)" : "var(--muted-2)",
        boxShadow: accent ? "0 0 8px var(--accent)" : "none",
        animation: accent ? "pulse-dot 2s ease-in-out infinite" : undefined,
      }}/>
    </div>
  );
}

function StageGlyph({ kind, accent }) {
  const c = "currentColor";
  const common = { width: 24, height: 24, viewBox: "0 0 36 36", fill: "none", stroke: c, strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" };
  // Receive — inbound box
  if (kind === "receive")    return (<svg {...common}><path d="M5 11 L18 6 L31 11 V25 L18 30 L5 25 Z"/><path d="M5 11 L18 16 L31 11"/><path d="M18 16 V30"/></svg>);
  // Track — bar chart
  if (kind === "track")      return (<svg {...common}><rect x="5" y="8" width="26" height="20" rx="2"/><path d="M5 14 H31"/><path d="M10 24 V18"/><path d="M14 24 V15"/><path d="M18 24 V21"/><path d="M22 24 V17"/><path d="M26 24 V20"/></svg>);
  // Forecast — trend line with horizon dots
  if (kind === "forecast")   return (<svg {...common}><path d="M5 26 L11 22 L17 24 L23 16 L29 14"/><path d="M29 14 L33 11" strokeDasharray="2 2"/><circle cx="5"  cy="26" r="1.6" fill={c}/><circle cx="11" cy="22" r="1.6" fill={c}/><circle cx="17" cy="24" r="1.6" fill={c}/><circle cx="23" cy="16" r="1.6" fill={c}/><circle cx="29" cy="14" r="1.6" fill={c}/></svg>);
  // Optimize — sliders / scale
  if (kind === "optimize")   return (<svg {...common}><path d="M8 12 H28"/><circle cx="14" cy="12" r="2.5" fill="var(--bg)" /><path d="M8 20 H28"/><circle cx="22" cy="20" r="2.5" fill="var(--bg)"/><path d="M8 28 H28"/><circle cx="18" cy="28" r="2.5" fill="var(--bg)"/></svg>);
  // Reorder — circular arrow
  if (kind === "reorder")    return (<svg {...common}><path d="M27 17 a9 9 0 1 1 -2.5 -6.3"/><path d="M27 10 V17 H20"/></svg>);
  // Replenish — truck with up-arrow
  if (kind === "replenish")  return (<svg {...common}><rect x="4" y="14" width="16" height="11" rx="1"/><path d="M20 18 L26 18 L30 22 V25 H20 Z"/><circle cx="10" cy="27" r="2"/><circle cx="25" cy="27" r="2"/><path d="M12 11 L12 6 M9 9 L12 6 L15 9" opacity="0.7"/></svg>);
  return null;
}



/* --- Section from case-predictive/who.jsx --- */


const WHO_FOR = [
  "Stockouts still surprise you during peak demand",
  "Overstock exists at the same time as stockouts",
  "Reorders trigger too late — inside supplier lead time",
  "Planning runs on past averages or gut feel",
  "Capital is stuck in slow-moving SKUs",
];

const TLDR = [
  { k: "Problem",  v: "Average-based planning produced overstock + stockout in the same warehouse. Emergency procurement was a line item, not an exception." },
  { k: "Solution", v: "Demand intelligence layer — per-SKU forecasts, lead-time-aware reorders, slow-mover flagging, portfolio capital allocation." },
  { k: "Outcome",  v: "~75% peak stockouts cut · ~80% emergency procurement cut · 20–30% turnover improvement." },
];

function WhoFor() {
  return (
    <section className="section" id="who" data-screen-label="Summary" style={{ padding: "70px 0" }}>
      <div className="wrap">
        <div className="who-grid" style={{
          display: "grid", gridTemplateColumns: "1.2fr 1fr",
          gap: 32, alignItems: "stretch",
        }}>
          <div style={{
            background: "var(--panel)",
            border: "1px solid var(--line)", borderRadius: 18,
            padding: "26px 30px 28px",
          }}>
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              paddingBottom: 14, marginBottom: 18, borderBottom: "1px dashed var(--line-2)",
              fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.14em",
              color: "var(--muted)", textTransform: "uppercase",
            }}>
              <span><span style={{ color: "var(--accent)" }}>●</span> 60-SECOND READ</span>
              <span>TL;DR</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {TLDR.map((r, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "100px 1fr", gap: 16, alignItems: "start" }}>
                  <span style={{
                    fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.14em",
                    color: r.k === "Outcome" ? "var(--accent)" : "var(--muted)",
                    textTransform: "uppercase", paddingTop: 4,
                  }}>{r.k}</span>
                  <span style={{
                    fontSize: 16, lineHeight: 1.5,
                    color: r.k === "Outcome" ? "var(--accent)" : "var(--text-2)",
                    letterSpacing: "-0.005em", fontWeight: r.k === "Outcome" ? 500 : 400,
                  }}>{r.v}</span>
                </div>
              ))}
            </div>

            <div style={{
              marginTop: 24, paddingTop: 18, borderTop: "1px dashed var(--line-2)",
              display: "flex", flexWrap: "wrap", gap: 6,
            }}>
              <span style={{
                fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.12em",
                color: "var(--muted)", textTransform: "uppercase", marginRight: 6, alignSelf: "center",
              }}>JUMP →</span>
              {[
                { id: "incident", l: "The incident" },
                { id: "built",    l: "What we built" },
                { id: "ai",       l: "Where AI" },
                { id: "impact",   l: "Impact" },
                { id: "cta",      l: "Book audit", primary: true },
              ].map((s, i) => (
                <a key={i} href={"#" + s.id} style={{
                  fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.06em",
                  padding: "5px 10px", borderRadius: 999,
                  border: `1px solid ${s.primary ? "rgba(37, 99, 255,0.40)" : "var(--line-2)"}`,
                  color: s.primary ? "var(--accent)" : "var(--text-2)",
                  background: s.primary ? "rgba(37, 99, 255,0.06)" : "transparent",
                  transition: "all .15s",
                }}>{s.l}</a>
              ))}
            </div>
          </div>

          <div style={{
            background: "var(--panel)",
            border: "1px solid var(--line)", borderRadius: 18,
            padding: "26px 28px", display: "flex", flexDirection: "column",
          }}>
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              paddingBottom: 14, marginBottom: 16, borderBottom: "1px dashed var(--line-2)",
              fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.14em",
              color: "var(--muted)", textTransform: "uppercase",
            }}>
              <span><span style={{ color: "var(--accent)" }}>●</span> THIS IS FOR YOU IF</span>
              <span>{WHO_FOR.length}/5</span>
            </div>

            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 0, flex: 1 }}>
              {WHO_FOR.map((w, i) => (
                <li key={i} style={{
                  display: "grid", gridTemplateColumns: "22px 1fr", gap: 12, alignItems: "center",
                  padding: "10px 0", borderTop: i === 0 ? "none" : "1px solid var(--line)",
                }}>
                  <span style={{
                    width: 20, height: 20, borderRadius: 6,
                    background: "rgba(37, 99, 255,0.08)",
                    border: "1px solid rgba(37, 99, 255,0.30)",
                    display: "grid", placeItems: "center",
                  }}>
                    <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8.5 L6.5 12 L13 5" stroke="var(--accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <span style={{ fontSize: 14, lineHeight: 1.4, color: "var(--text)" }}>{w}</span>
                </li>
              ))}
            </ul>

            <a href="#cta" className="btn btn-primary" style={{
              width: "100%", justifyContent: "center", marginTop: 16, padding: "11px 16px", fontSize: 13.5,
            }}>
              Map my operation <ArrowRight/>
            </a>
          </div>
        </div>

        <style>{`
          @media (max-width: 980px) {
            .who-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
          }
        `}</style>
      </div>
    </section>
  );
}



/* --- Section from case-predictive/breaking.jsx --- */


const BREAKING = [
  {
    code: "B.01",
    title: "Average-based planning",
    body: "Reorders sized off last quarter’s numbers. Seasonal peaks flattened. Promotional lift invisible.",
    metric: { v: "Wrong input", l: "for peak demand" },
    glyph: "comm",
  },
  {
    code: "B.02",
    title: "Overstock + stockout, simultaneously",
    body: "Slow movers tied up cash while fast movers ran out. Same warehouse, same week.",
    metric: { v: "Lost revenue", l: "+ locked capital" },
    glyph: "gate",
  },
  {
    code: "B.03",
    title: "Reorders fired at zero",
    body: "Static thresholds. No depletion projection. Alerts arrived after the normal reorder window had already closed.",
    metric: { v: "Inside", l: "supplier lead time" },
    glyph: "vis",
  },
  {
    code: "B.04",
    title: "Emergency procurement as routine",
    body: "Rush orders became a recurring margin leak — not an occasional exception.",
    metric: { v: "Margin", l: "compressed" },
    glyph: "late",
  },
  {
    code: "B.05",
    title: "Capital locked, untracked",
    body: "Working capital sat in non-performing SKUs. Leadership knew the issue existed; no system quantified where.",
    metric: { v: "Cash", l: "stuck on shelves" },
    glyph: "split",
  },
];

function BreakingGlyph({ kind }) {
  const c = "currentColor";
  const common = { width: 24, height: 24, viewBox: "0 0 44 44", fill: "none", stroke: c, strokeWidth: "2.4", strokeLinecap: "round", strokeLinejoin: "round" };
  if (kind === "comm") return (
    <svg {...common}>
      {}
      <path d="M5 9 H20 V18 H12 L8 22 V18 H5 Z"/>
      <path d="M24 22 H39 V30 H32 L28 34 V30 H24 Z"/>
      <path d="M21 16 L24 22" strokeDasharray="2 3"/>
    </svg>
  );
  if (kind === "gate") return (
    <svg {...common}>
      <rect x="6" y="18" width="32" height="18" rx="2"/>
      <path d="M13 18 V12 a9 9 0 0 1 18 0 V18"/>
      {}
      <path d="M19 27 L25 27" stroke="var(--warn)"/>
    </svg>
  );
  if (kind === "vis") return (
    <svg {...common}>
      <rect x="6" y="10" width="32" height="22" rx="2"/>
      <path d="M6 16 H38"/>
      {}
      <path d="M12 28 V22" opacity="0.9"/>
      <path d="M18 28 V20" opacity="0.6"/>
      <path d="M24 28 V24" opacity="0.3"/>
      <path d="M30 28 V18" opacity="0.15"/>
    </svg>
  );
  if (kind === "late") return (
    <svg {...common}>
      <circle cx="22" cy="22" r="14"/>
      <path d="M22 12 V22 L30 26"/>
      <circle cx="35" cy="9" r="3" stroke="none" fill="var(--warn)"/>
    </svg>
  );
  if (kind === "split") return (
    <svg {...common}>
      <circle cx="10" cy="14" r="4"/>
      <circle cx="34" cy="14" r="4"/>
      <circle cx="22" cy="34" r="4"/>
      <path d="M10 18 V28 M34 18 V28 M14 14 H30" strokeDasharray="2 3"/>
    </svg>
  );
  return null;
}

function BreakingCard({ b }) {
  return (
    <article style={{
      position: "relative",
      background: "var(--panel)",
      border: "1px solid var(--line)",
      borderRadius: 16,
      padding: 26,
      transition: "all .25s ease",
      display: "flex", flexDirection: "column", gap: 18,
      height: "100%",
    }}
    onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(37, 99, 255,0.30)"}
    onMouseLeave={e => e.currentTarget.style.borderColor = "var(--line)"}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <span style={{
          fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.14em",
          color: "var(--muted)",
        }}>{b.code}</span>
        <div style={{
          width: 48, height: 48, borderRadius: 12,
          background: "var(--blue-50)",
          border: "1px solid var(--blue-100)",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "var(--blue)", flexShrink: 0
        }}>
          <BreakingGlyph kind={b.glyph}/>
        </div>
      </div>

      <div>
        <h3 className="h3" style={{ marginBottom: 8, color: "var(--blue)" }}>{b.title}</h3>
        <p style={{ fontSize: 14, lineHeight: 1.55, color: "var(--muted)", margin: 0 }}>
          {b.body}
        </p>
      </div>

      {}
      <div style={{
        marginTop: "auto", paddingTop: 16, borderTop: "1px dashed var(--line-2)",
        display: "flex", alignItems: "baseline", gap: 10,
      }}>
        <span style={{
          fontFamily: "var(--sans)", fontSize: 22, fontWeight: 500,
          letterSpacing: "-0.02em", color: "var(--warn)", lineHeight: 1,
        }}>{b.metric.v}</span>
        <span style={{ fontSize: 12, color: "var(--muted)", letterSpacing: "-0.005em" }}>
          {b.metric.l}
        </span>
      </div>
    </article>
  );
}

function Breaking() {
  return (
    <section className="section" id="breaking" data-screen-label="Breaking">
      <div className="wrap">
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: 48, gap: 40, flexWrap: "wrap" }}>
          <div style={{ maxWidth: 720 }}>
            <span className="eyebrow"><span className="num">01</span><span className="bar"/>What was breaking</span>
            <h2 className="h2" style={{ marginTop: 16 }}>
              One contradiction. <em>Two</em> expensive outcomes.
            </h2>
          </div>
          <p style={{ maxWidth: 360, color: "var(--muted)", fontSize: 14.5, lineHeight: 1.55, margin: 0 }}>
            Fast movers ran out while slow movers piled up — because demand signals never reached the reorder decision.
          </p>
        </header>

        <div className="breaking-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: 14,
          alignItems: "stretch",
        }}>
          {BREAKING.map((b, i) => <BreakingCard key={i} b={b}/>)}
        </div>

        <style>{`
          @media (max-width: 1100px) { .breaking-grid { grid-template-columns: repeat(3, 1fr) !important; } }
          @media (max-width: 720px)  { .breaking-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </div>
    </section>
  );
}



/* --- Section from case-predictive/incident.jsx --- */


const TIMELINE = [
  { t: "W-04", kind: "baseline", side: "L", title: "Reorder placed on average",              body: "SKU-A47 reordered based on last quarter's average consumption. Quantity sized for normal demand." },
  { t: "W-02", kind: "peak",     side: "R", title: "Peak demand cycle opens",                body: "Actual consumption 1.8× the historical average. Demand signal visible in the data — not being read.", warn: true },
  { t: "W-01", kind: "stockout", side: "L", title: "SKU-A47 stocks out mid-cycle",          body: "Static threshold alert fires only at zero. Standard lead time longer than the demand gap.", warn: true },
  { t: "W-00", kind: "premium",  side: "R", title: "Emergency procurement at premium",      body: "Alternative source delivers urgently — cost compresses margin. Orders still lost during the gap.",          warn: true },
  { t: "—",    kind: "root",     side: "L", title: "Root cause",                            body: "The demand pattern was visible in the data. It just wasn't being read into the reorder decision." },
];

function Incident() {
  return (
    <section className="section" id="incident" data-screen-label="Incident" style={{
      background: "linear-gradient(180deg, rgba(37, 99, 255, 0.025), transparent 70%)",
    }}>
      <div className="wrap">
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: 40, gap: 40, flexWrap: "wrap" }}>
          <div style={{ maxWidth: 720 }}>
            <span className="eyebrow" style={{ color: "var(--accent)" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", display: "inline-block" }}/>
              <span className="num">02</span><span className="bar"/>
              One SKU · one cycle
            </span>
            <h2 className="h2" style={{ marginTop: 16 }}>
              The demand signal was<br/>in the data. <em>Nobody</em> was reading it.
            </h2>
          </div>
          <p style={{ maxWidth: 360, color: "var(--muted)", fontSize: 14.5, lineHeight: 1.55, margin: 0 }}>
            Not unpredictability — the pattern repeated every peak cycle. The structure to read it didn't exist.
          </p>
        </header>

        <div style={{
          position: "relative",
          marginBottom: 22,
          padding: "26px 28px",
          borderRadius: 18,
          border: "1px solid rgba(37, 99, 255, 0.35)",
          background: "linear-gradient(180deg, rgba(37, 99, 255, 0.08), rgba(37, 99, 255, 0.025))",
          boxShadow: "0 0 80px -48px rgba(37, 99, 255, 0.35)",
        }}>
          <div style={{
            fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.14em",
            color: "var(--accent)", textTransform: "uppercase", marginBottom: 12,
          }}>The money moment</div>
          <p style={{
            margin: 0,
            maxWidth: "74ch",
            fontSize: "clamp(22px, 2.4vw, 34px)",
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
            color: "var(--text)",
          }}>
            A high-demand SKU stocked out during peak. Emergency procurement triggered. Cost increased. Sales were lost.
            <span style={{ color: "var(--accent)" }}> The signal was already in the data.</span>
          </p>
        </div>

        <Terminal />
      </div>
    </section>
  );
}

function Terminal() {
  return (
    <div style={{
      position: "relative",
      background: "var(--panel)", boxShadow: "0 20px 50px -12px rgba(0,0,0,0.05)",
      border: "1px solid var(--line)",
      borderRadius: 18,
      overflow: "hidden",
    }}>
      {}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "14px 22px",
        borderBottom: "1px solid var(--line)",
        background: "var(--bg-2)",
        fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.12em",
        color: "var(--muted)", textTransform: "uppercase",
      }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent)", boxShadow: "0 0 8px var(--accent)" }}/>
          OPS.LOG · SKU-A47
        </span>
        <span>PEAK STOCKOUT · RECURRING PATTERN</span>
      </div>

      {}
      <div style={{ position: "relative", padding: "28px 22px 32px" }}>
        {}
        <span className="timeline-center-spine" aria-hidden="true" style={{
          position: "absolute", top: 28, bottom: 32, left: "50%",
          width: 1, background: "var(--line-2)",
          transform: "translateX(-0.5px)",
        }}/>

        <div className="timeline" style={{
          display: "flex", flexDirection: "column", gap: 18,
        }}>
          {TIMELINE.map((e, i) => <TimelineEntry key={i} e={e} i={i}/>)}
        </div>
      </div>

      {}
      <div style={{
        padding: "18px 22px", borderTop: "1px solid var(--line)",
        background: "var(--bg-2)",
        display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap",
        fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.08em",
        color: "var(--muted)", textTransform: "uppercase",
      }}>
        <span>ROOT CAUSE — Forecast signal never reached the reorder decision</span>
        <span>TIME-TO-FIX (with system): <span style={{ color: "var(--accent)" }}>WEEKS AHEAD</span></span>
      </div>

      <style>{`
        @media (max-width: 720px) {
          .timeline .te { grid-template-columns: 64px 1fr !important; }
          .timeline .te .te-side-r,
          .timeline .te .te-side-l { grid-column: 2 / 3 !important; }
          .timeline .te .te-spine-dot { display: none !important; }
        }
      `}</style>
    </div>
  );
}

function TimelineEntry({ e, i }) {
  const right = e.side === "R";
  return (
    <div className="te" style={{
      display: "grid",
      gridTemplateColumns: "1fr 80px 1fr",
      alignItems: "center", gap: 12,
      position: "relative",
    }}>
      {}
      <span style={{
        gridColumn: "2 / 3",
        fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.06em",
        color: "var(--accent)", textAlign: "center",
        background: "var(--bg-2)", padding: "4px 8px", borderRadius: 999,
        border: "1px solid var(--line)",
        position: "relative", zIndex: 2,
        justifySelf: "center", minWidth: 60,
      }}>{e.t}</span>

      {}
      <span aria-hidden="true" className="te-spine-dot" style={{
        position: "absolute", left: "50%", top: "50%",
        width: 8, height: 8, borderRadius: "50%",
        background: "var(--accent)",
        boxShadow: "0 0 8px var(--accent)",
        transform: "translate(-50%, -50%)",
        zIndex: 1, opacity: 0,
      }}/>

      {}
      <div className={right ? "te-side-r" : "te-side-l"} style={{
        gridColumn: right ? "3 / 4" : "1 / 2",
        background: e.warn ? "linear-gradient(180deg, rgba(37, 99, 255, 0.06), rgba(37, 99, 255, 0.02))" : "rgba(255,255,255,0.02)",
        border: `1px solid ${e.warn ? "rgba(37, 99, 255, 0.30)" : "var(--line)"}`,
        borderRadius: 12,
        padding: "14px 16px",
        textAlign: right ? "left" : "right",
      }}>
        <div style={{
          display: "flex", alignItems: "center",
          gap: 8, justifyContent: right ? "flex-start" : "flex-end",
          marginBottom: 6,
        }}>
          <span style={{
            fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.14em",
            color: e.warn ? "var(--accent)" : "var(--muted)",
            textTransform: "uppercase",
          }}>
            {e.warn && <span style={{ marginRight: 6 }}>⚠</span>}
            {e.kind}
          </span>
        </div>
        <div style={{
          fontSize: 14.5, fontWeight: 500, color: "var(--text)", letterSpacing: "-0.005em", marginBottom: 4,
        }}>{e.title}</div>
        <div style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.5 }}>{e.body}</div>
      </div>

      {}
      <div style={{ gridColumn: right ? "1 / 2" : "3 / 4" }}/>
    </div>
  );
}



/* --- Section from case-predictive/insight.jsx --- */


function Insight() {
  return (
    <section id="insight" data-screen-label="Insight" style={{
      position: "relative",
      padding: "100px 0",
      borderTop: "1px solid var(--line)",
      borderBottom: "1px solid var(--line)",
      overflow: "hidden",
    }}>
      {}
      <span aria-hidden="true" style={{
        position: "absolute", left: "50%", top: "50%",
        width: 900, height: 900, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(37, 99, 255,0.08), rgba(37, 99, 255,0.02) 40%, transparent 70%)",
        filter: "blur(40px)",
        transform: "translate(-50%, -50%)",
        pointerEvents: "none", zIndex: 0,
      }}/>
      <div className="bg-grid"/>

      <div className="wrap" style={{ position: "relative", zIndex: 1, maxWidth: 1100, textAlign: "center" }}>
        <span className="eyebrow" style={{ justifyContent: "center" }}>
          <span className="dot"/>
          <span className="num">03</span><span className="bar"/>Core insight
        </span>

        <p style={{
          fontFamily: "var(--serif)", fontStyle: "italic",
          fontSize: "clamp(30px, 4.0vw, 52px)",
          lineHeight: 1.15, letterSpacing: "-0.01em",
          color: "var(--text)",
          margin: "28px auto 0",
          maxWidth: "22ch",
        }}>
          This wasn't an inventory problem. It was a <span style={{ color: "var(--accent)" }}>prediction failure</span>.
        </p>

        <div className="ba-grid" style={{
          marginTop: 52,
          display: "grid",
          gridTemplateColumns: "1fr 60px 1fr",
          gap: 0,
          alignItems: "stretch",
          textAlign: "left",
        }}>
          <BeforeAfterCard kind="before"/>
          <div style={{ display: "grid", placeItems: "center" }}>
            <span style={{
              fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.16em",
              color: "var(--muted)", textTransform: "uppercase",
              transform: "rotate(0deg)",
              padding: "8px 12px", border: "1px solid var(--line)",
              borderRadius: 999, background: "var(--bg-2)",
            }}>→ FIX</span>
          </div>
          <BeforeAfterCard kind="after"/>
        </div>

        <style>{`
          @media (max-width: 720px) {
            .ba-grid { grid-template-columns: 1fr !important; gap: 14px !important; }
          }
        `}</style>
      </div>
    </section>
  );
}

function BeforeAfterCard({ kind }) {
  const before = kind === "before";
  return (
    <div style={{
      background: before
        ? "linear-gradient(180deg, rgba(255,107,107,0.04), rgba(255,107,107,0.01))"
        : "linear-gradient(180deg, rgba(37, 99, 255,0.05), rgba(37, 99, 255,0.01))",
      border: `1px solid ${before ? "rgba(255,107,107,0.25)" : "rgba(37, 99, 255,0.35)"}`,
      borderRadius: 16,
      padding: "22px 24px",
    }}>
      <div style={{
        fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.14em",
        color: before ? "var(--warn)" : "var(--accent)",
        textTransform: "uppercase", marginBottom: 14,
      }}>
        {before ? "● BEFORE" : "● AFTER"}
      </div>
      <div style={{ fontSize: 19, fontWeight: 500, color: "var(--text)", letterSpacing: "-0.01em", lineHeight: 1.25, marginBottom: 12 }}>
        {before
          ? "Decisions on history. No demand signal."
          : "Decisions on forecasts. Signal-driven."}
      </div>
      <div style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.55 }}>
        {before
          ? "Reorders ran off last quarter's average. Buyer instinct filled the gap. Capital allocated by accident — carried forward from last cycle's orders."
          : "Per-SKU forecasts updated continuously. Reorders sized to projected demand and lead time. Capital allocation is a deliberate decision, not a leftover."}
      </div>
    </div>
  );
}



/* --- Section from case-predictive/built.jsx --- */


const MODULES = [
  { code: "M.01", name: "Inventory Engine",       fn: "Real-time SKU tracking · Continuous turnover monitoring",    out: "Stock health" },
  { code: "M.02", name: "Demand Forecasting",     fn: "Per-SKU models · Seasonal + promotional + trend detection", out: "Demand projections" },
  { code: "M.03", name: "Optimization Engine",    fn: "Capital-aware allocation · Service-level balancing",         out: "Capital signals" },
  { code: "M.04", name: "Automated Reorder",      fn: "Lead-time aware triggers · Fires before depletion",          out: "Order triggers" },
  { code: "M.05", name: "Slow-Mover Detection",   fn: "Turnover tiering · Capital-tied flagging",                   out: "Redeployment list" },
];

function Built() {
  return (
    <section className="section" id="built" data-screen-label="Built">
      <div className="wrap">
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: 48, gap: 40, flexWrap: "wrap" }}>
          <div style={{ maxWidth: 720 }}>
            <span className="eyebrow"><span className="num">04</span><span className="bar"/>What was built</span>
            <h2 className="h2" style={{ marginTop: 16 }}>
              A <em>demand intelligence</em><br/>layer for inventory.
            </h2>
          </div>
          <p style={{ maxWidth: 380, color: "var(--muted)", fontSize: 14.5, lineHeight: 1.55, margin: 0 }}>
            Not a warehouse system with better reports. A planning engine built around actual demand behavior.
            <br/><br/><span style={{ color: "var(--text)" }}>This system doesn’t react to demand. It anticipates it.</span>
          </p>
        </header>

        <ControlTowerDiagram/>

        <h3 style={{
          fontSize: 20, fontWeight: 500, letterSpacing: "-0.015em", color: "var(--blue)",
          marginTop: 72, marginBottom: 22,
        }}>Core components <span style={{ color: "var(--muted)", fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.1em", marginLeft: 10 }}>5 OF 5</span></h3>

        <ModulesTable/>
      </div>
    </section>
  );
}

// ─── Control Tower Diagram ──────────────────────────────────────────────
function ControlTowerDiagram() {
  return (
    <div style={{
      position: "relative",
      background: "var(--panel)", boxShadow: "0 20px 50px -12px rgba(0,0,0,0.05)",
      border: "1px solid var(--line)",
      borderRadius: 22,
      padding: 32,
      overflow: "hidden",
    }}>
      {}
      <span aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "linear-gradient(to right, rgba(17, 24, 39, 0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(17, 24, 39, 0.02) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
        maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, #000, transparent 95%)",
        WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, #000, transparent 95%)",
      }}/>

      <div style={{ position: "relative" }}>

        {}
        <div style={{
          display: "grid", placeItems: "center",
          marginBottom: 36,
        }}>
          <div style={{
            position: "relative",
            background: "linear-gradient(180deg, rgba(37, 99, 255,0.10), rgba(37, 99, 255,0.02))",
            border: "1px solid rgba(37, 99, 255,0.40)",
            borderRadius: 16,
            padding: "20px 32px",
            textAlign: "center",
            minWidth: "min(360px, 100%)",
            boxShadow: "0 0 80px -20px rgba(37, 99, 255,0.30)",
          }}>
            <div style={{
              fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.14em",
              color: "var(--accent)", textTransform: "uppercase", marginBottom: 8,
              display: "inline-flex", alignItems: "center", gap: 8,
            }}>
              <span className="live-dot"/> CENTRAL ORCHESTRATION
            </div>
            <div style={{
              fontSize: 22, fontWeight: 500, color: "var(--text)",
              letterSpacing: "-0.015em",
            }}>
              Predictive Planning System
            </div>
            <div style={{
              fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.1em",
              color: "var(--text-2)", marginTop: 6,
            }}>
              DEMAND-DRIVEN · CAPITAL-AWARE · CONTINUOUS
            </div>
          </div>
        </div>

        {}
        <svg viewBox="0 0 1200 80" preserveAspectRatio="none" style={{
          width: "100%", height: 60, display: "block", marginBottom: 4,
        }}>
          {[120, 360, 600, 840, 1080].map((x, i) => (
            <g key={i}>
              <line x1="600" y1="0" x2={x} y2="78" stroke="rgba(37, 99, 255,0.25)" strokeWidth="1" strokeDasharray="3 4" style={{ animation: `flow-x 1.6s linear infinite` }}/>
            </g>
          ))}
        </svg>

        {}
        <div className="modules-row" style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: 12,
        }}>
          {[
            { c: "INV",  l: "Inventory",  d: "Live SKU state" },
            { c: "DMD",  l: "Demand",     d: "Per-SKU forecast" },
            { c: "OPT",  l: "Optimizer",  d: "Capital allocation" },
            { c: "REO",  l: "Reorder",    d: "Lead-time aware" },
            { c: "SLW",  l: "Slow-mover", d: "Tiering + flags" },
          ].map((m, i) => (            <ModuleNode key={i} m={m}/>
          ))}
        </div>

        {}
        <div style={{
          marginTop: 28, paddingTop: 18, borderTop: "1px dashed var(--line-2)",
          display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12,
          fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.1em",
          color: "var(--muted)", textTransform: "uppercase", flexWrap: "wrap",
        }}>
          <span><span style={{ color: "var(--accent)" }}>↓</span> Consumption + lead time in</span>
          <span>Forecasts update continuously — before the reorder window closes</span>
          <span>Reorders + capital flags out <span style={{ color: "var(--accent)" }}>↑</span></span>
        </div>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .modules-row { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 540px) {
          .modules-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

function ModuleNode({ m }) {
  return (
    <div style={{
      background: "var(--bg-2)",
      border: "1px solid var(--line)",
      borderRadius: 12,
      padding: "14px 14px 16px",
      position: "relative",
    }}>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10,
      }}>
        <span style={{
          fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.14em",
          color: "var(--accent)", padding: "2px 7px", borderRadius: 5,
          background: "rgba(37, 99, 255,0.08)",
        }}>{m.c}</span>
        <span style={{
          width: 6, height: 6, borderRadius: "50%",
          background: "var(--accent)", boxShadow: "0 0 6px var(--accent)",
          animation: "pulse-dot 2.4s ease-in-out infinite",
        }}/>
      </div>
      <div style={{ fontSize: 14, fontWeight: 500, color: "var(--text)", letterSpacing: "-0.005em" }}>
        {m.l}
      </div>
      <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 4, fontFamily: "var(--mono)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
        {m.d}
      </div>
    </div>
  );
}

// ─── Modules Table ──────────────────────────────────────────────────────
function ModulesTable() {
  return (
    <div style={{
      border: "1px solid var(--line)",
      borderRadius: 16,
      overflow: "hidden",
      background: "var(--panel)",
    }}>
      {}
      <div style={{
        display: "grid",
        gridTemplateColumns: "80px 1.4fr 2fr 1.4fr",
        gap: 0,
        padding: "14px 22px",
        background: "var(--bg-2)",
        borderBottom: "1px solid var(--line-2)",
        fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.12em",
        color: "var(--muted)", textTransform: "uppercase",
      }}>
        <span>ID</span>
        <span>Component</span>
        <span>What it does</span>
        <span>Output</span>
      </div>
      {}
      {MODULES.map((m, i) => (
        <div key={m.code} className="mod-row" style={{
          display: "grid",
          gridTemplateColumns: "80px 1.4fr 2fr 1.4fr",
          gap: 0, alignItems: "center",
          padding: "16px 22px",
          borderBottom: i < MODULES.length - 1 ? "1px solid var(--line)" : "none",
          transition: "background .15s",
        }}
        onMouseEnter={e => e.currentTarget.style.background = "var(--bg-2)"}
        onMouseLeave={e => e.currentTarget.style.background = "transparent"}
        >
          <span style={{
            fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.1em",
            color: "var(--muted)",
          }}>{m.code}</span>
          <span style={{ fontSize: 14.5, fontWeight: 500, color: "var(--text)", letterSpacing: "-0.005em" }}>
            {m.name}
          </span>
          <span style={{ fontSize: 13.5, color: "var(--text-2)", lineHeight: 1.45 }}>
            {m.fn}
          </span>
          <span style={{
            fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.08em",
            color: "var(--accent)", textTransform: "uppercase",
          }}>
            <span style={{ marginRight: 6, opacity: 0.6 }}>→</span>{m.out}
          </span>
        </div>
      ))}
      <style>{`
        @media (max-width: 900px) {
          .mod-row {
            grid-template-columns: 60px 1fr !important;
            gap: 6px 12px !important;
            padding: 16px 18px !important;
            row-gap: 4px !important;
          }
          .mod-row > span:nth-child(3),
          .mod-row > span:nth-child(4) {
            grid-column: 1 / 3 !important;
          }
        }
      `}</style>
    </div>
  );
}



/* --- Section from case-predictive/ai.jsx --- */


const AI_USES = [
  {
    code: "AI.01",
    title: "Demand Forecasting per SKU",
    body: "Individual demand models per SKU — multi-horizon consumption history, seasonal peaks, promotional lift, trend shifts. Updated continuously.",
    chip: "AVERAGES → SIGNALS",
    quad: "op-dec",
  },
  {
    code: "AI.02",
    title: "Stockout Prediction with Lead Time",
    body: "Depletion projected against actual supplier lead times — not against a static minimum. Alert fires with runway to reorder at standard terms.",
    chip: "EMERGENCY → PLANNED",
    quad: "op-det",
  },
  {
    code: "AI.03",
    title: "Slow-Mover & Dead Stock Detection",
    body: "Turnover ratios per SKU tracked continuously. Stock tiered fast / slow / stagnant. Capital tied per tier surfaced.",
    chip: "CAPITAL VISIBLE",
    quad: "st-det",
  },
  {
    code: "AI.04",
    title: "Capital Allocation Intelligence",
    body: "Working capital modelled across the portfolio. Reallocation opportunities surfaced — reduce here, invest there — with quantified service-level impact.",
    chip: "INERTIA → DELIBERATE",
    quad: "st-dec",
  },
];

function AISection() {
  return (
    <section className="section" id="ai" data-screen-label="AI">
      <div className="wrap">
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: 48, gap: 40, flexWrap: "wrap" }}>
          <div style={{ maxWidth: 720 }}>
            <span className="eyebrow"><span className="num">05</span><span className="bar"/>Where AI was applied</span>
            <h2 className="h2" style={{ marginTop: 16 }}>
              Where signals beat <em>rules</em>.
            </h2>
          </div>
          <p style={{ maxWidth: 360, color: "var(--muted)", fontSize: 14.5, lineHeight: 1.55, margin: 0 }}>
            Static thresholds handled the easy cases. AI was applied where demand variability and capital trade-offs required judgment rules can't encode.
          </p>
        </header>

        {}
        <div className="ai-grid" style={{
          display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14, marginBottom: 56,
        }}>
          {AI_USES.map((a, i) => <AICard key={i} a={a}/>)}
        </div>

        {}
        <div className="ai-matrix-grid" style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 1fr",
          gap: 32, alignItems: "center",
        }}>
          <div>
            <span className="eyebrow"><span className="bar"/>Application Map</span>
            <h3 style={{
              fontSize: 26, fontWeight: 500, letterSpacing: "-0.015em", color: "var(--blue)",
              marginTop: 12, marginBottom: 14, lineHeight: 1.15,
            }}>
              Detection runs at both levels — stockout prediction is operational; slow-mover identification feeds strategic capital decisions.
            </h3>
            <p style={{ fontSize: 14.5, color: "var(--muted)", lineHeight: 1.6, maxWidth: "50ch", margin: 0 }}>
              The highest-value application is capital allocation intelligence — operating at portfolio level, not individual SKUs.
            </p>
          </div>

          <AIMatrix/>
        </div>

        <style>{`
          @media (max-width: 900px) {
            .ai-grid { grid-template-columns: 1fr !important; }
            .ai-matrix-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          }
        `}</style>
      </div>
    </section>
  );
}

function AICard({ a }) {
  return (
    <article style={{
      background: "var(--panel)",
      border: "1px solid var(--line)",
      borderRadius: 16,
      padding: 26,
      display: "flex", flexDirection: "column", gap: 14,
      transition: "border-color .2s",
      height: "100%",
    }}
    onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(37, 99, 255,0.30)"}
    onMouseLeave={e => e.currentTarget.style.borderColor = "var(--line-2)"}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{
          fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.14em",
          color: "var(--muted)",
        }}>{a.code}</span>
        <QuadrantBadge q={a.quad}/>
      </div>

      <h3 className="h3" style={{ fontSize: 20, color: "var(--blue)" }}>{a.title}</h3>

      <p style={{ fontSize: 14, lineHeight: 1.55, color: "var(--text-2)", margin: 0 }}>
        {a.body}
      </p>

      {}
      <div style={{
        marginTop: "auto", paddingTop: 14,
        borderTop: "1px dashed var(--line-2)",
      }}>
        <span style={{
          fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.12em",
          color: "var(--accent)", textTransform: "uppercase",
          display: "inline-flex", alignItems: "center", gap: 8,
        }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--accent)" }}/>
          {a.chip}
        </span>
      </div>
    </article>
  );
}

function QuadrantBadge({ q }) {
  const map = {
    "op-det": "OPERATIONAL · DETECTION",
    "op-dec": "OPERATIONAL · DECISION",
    "st-det": "STRATEGIC · DETECTION",
    "st-dec": "STRATEGIC · DECISION",
  };
  return (
    <span style={{
      fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.12em",
      color: "var(--text-2)", padding: "4px 10px",
      border: "1px solid var(--line)", borderRadius: 999,
      background: "rgba(255,255,255,0.02)", textTransform: "uppercase",
    }}>{map[q]}</span>
  );
}

function AIMatrix() {
  // 2x2 Detection/Decision × Operational/Strategic
  // Order: top-left=Strategic·Detection, top-right=Strategic·Decision,
  //        bottom-left=Operational·Detection, bottom-right=Operational·Decision
  const cells = [
    { row: 0, col: 0, code: "AI.03", title: "Slow-Mover Detection",    accent: false },
    { row: 0, col: 1, code: "AI.04", title: "Capital Allocation",      accent: false },
    { row: 1, col: 0, code: "AI.02", title: "Stockout Prediction",     accent: true },
    { row: 1, col: 1, code: "AI.01", title: "Demand Forecasting",      accent: true },
  ];
  return (
    <div style={{
      background: "var(--bg-2)",
      border: "1px solid var(--line)",
      borderRadius: 16,
      padding: 24,
      position: "relative",
    }}>
      {}
      <div style={{
        display: "grid", gridTemplateColumns: "80px 1fr 1fr",
        gap: 8, marginBottom: 8,
        fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.12em", color: "var(--text-2)", textTransform: "uppercase",
      }}>
        <span/>
        <span style={{ textAlign: "center" }}>Detection</span>
        <span style={{ textAlign: "center" }}>Decision</span>
      </div>

      <div style={{
        display: "grid", gridTemplateColumns: "80px 1fr 1fr", gap: 8,
      }}>
        {}
        <RowLabel label="Strategic"/>
        <MatrixCell c={cells[0]}/>
        <MatrixCell c={cells[1]}/>

        {}
        <RowLabel label="Operational"/>
        <MatrixCell c={cells[2]}/>
        <MatrixCell c={cells[3]}/>
      </div>
    </div>
  );
}

function RowLabel({ label }) {
  return (
    <span style={{
      display: "grid", placeItems: "center",
      fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.12em",
      color: "var(--text-2)", textTransform: "uppercase",
      writingMode: "vertical-rl", transform: "rotate(180deg)",
      padding: "16px 0",
    }}>{label}</span>
  );
}

function MatrixCell({ c }) {
  if (!c) return null;
  if (c.empty) {
    return (
      <div style={{
        padding: "20px 18px", borderRadius: 10,
        background: "transparent",
        border: "1px dashed var(--line-3)",
        minHeight: 110,
        display: "grid", placeItems: "center",
        opacity: 0.5,
      }}>
        <span style={{
          fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.14em",
          color: "var(--muted-2)", textTransform: "uppercase",
        }}>NOT APPLIED</span>
      </div>
    );
  }
  const accent = c.accent;
  return (
    <div style={{
      padding: "20px 18px", borderRadius: 10,
      background: accent
        ? "linear-gradient(180deg, #ffffff, rgba(37, 99, 255, 0.04))"
        : "var(--panel)",
      border: `1px solid ${accent ? "rgba(37, 99, 255, 0.30)" : "var(--line-2)"}`,
      minHeight: 110,
      display: "flex", flexDirection: "column", justifyContent: "space-between",
      boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
    }}>
      <span style={{
        fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.14em",
        color: accent ? "var(--accent)" : "var(--muted)",
      }}>{c.code}</span>
      <span style={{ fontSize: 15, fontWeight: 500, color: "var(--text)", letterSpacing: "-0.01em", lineHeight: 1.25 }}>
        {c.title}
      </span>
    </div>
  );
}



/* --- Section from case-predictive/impact.jsx --- */


const BIG_METRICS = [
  { v: "~75%",   l: "peak stockouts ↓",         ctx: "High-demand SKUs planned before peaks" },
  { v: "~80%",   l: "emergency procurement ↓", ctx: "Premium rush orders became rare" },
  { v: "25–35%", l: "overstock ↓",              ctx: "Capital freed from slow-moving SKUs" },
  { v: "20–30%", l: "inventory turnover ↑",     ctx: "Capital moved with demand signals" },
];

const BA_ROWS = [
  { area: "Peak stockout incidents",       before: "Recurring during demand peaks", after: "Rare exception",                 change: "~75% reduction" },
  { area: "Emergency procurement",         before: "Routine premium orders",        after: "Planned replenishment",          change: "~80% reduction" },
  { area: "Overstock on slow SKUs",        before: "Persistent capital lock",       after: "Actively flagged + reduced",     change: "25–35% reduction" },
  { area: "Inventory turnover",            before: "Average-based allocation",      after: "Demand-driven allocation",      change: "20–30% improvement" },
  { area: "Reorder timing",                before: "Triggered at static threshold", after: "Triggered against depletion + lead time", change: "Proactive vs reactive" },
  { area: "Planning mode",                 before: "Historical averages + instinct", after: "Forecasts + capital intelligence", change: "Signal-driven" },
];

function Impact() {
  return (
    <section className="section" id="impact" data-screen-label="Impact" style={{
      background: "linear-gradient(180deg, transparent, rgba(37, 99, 255,0.025), transparent)",
    }}>
      <div className="wrap">
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: 56, gap: 40, flexWrap: "wrap" }}>
          <div style={{ maxWidth: 720 }}>
            <span className="eyebrow"><span className="num">06</span><span className="bar"/>Impact</span>
            <h2 className="h2" style={{ marginTop: 16 }}>
              Reactive cycles <em>→</em><br/>demand-driven planning.
            </h2>
          </div>
          <p style={{ maxWidth: 360, color: "var(--muted)", fontSize: 14.5, lineHeight: 1.55, margin: 0 }}>
            Directional metrics, measured against the same operational periods before and after.
          </p>
        </header>

        {}
        <div className="big-grid" style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0,
          borderTop: "1px solid var(--line-2)",
          borderBottom: "1px solid var(--line-2)",
          marginBottom: 0,
        }}>
          {BIG_METRICS.map((m, i) => (
            <BigMetric key={i} m={m} i={i} last={i === BIG_METRICS.length - 1}/>
          ))}
        </div>

        {}
        <div className="org-grid" style={{
          marginTop: 64,
          display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 56, alignItems: "start",
        }}>
          <div>
            <span className="eyebrow"><span className="bar"/>What changed</span>
            <h3 style={{
              fontSize: 24, fontWeight: 500, letterSpacing: "-0.015em", color: "var(--blue)",
              marginTop: 12, marginBottom: 22, lineHeight: 1.2,
            }}>
              Planning moves from historical averages to live demand signals.
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                "Reorder decisions backed by forecast data, not historical averages.",
                "Leadership sees inventory health, turnover, and capital utilization in one view.",
                "Capital is freed from slow movers and redeployed into high-velocity SKUs.",
                "Procurement costs normalized — emergency orders → planned replenishment.",
              ].map((o, i) => (
                <li key={i} style={{ display: "grid", gridTemplateColumns: "20px 1fr", gap: 12, alignItems: "start" }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginTop: 3 }}>
                    <circle cx="8" cy="8" r="7" stroke="rgba(37, 99, 255,0.35)" strokeWidth="1"/>
                    <path d="M5 8.5 L7.2 11 L11.5 6" stroke="var(--accent)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span style={{ fontSize: 14.5, lineHeight: 1.5, color: "var(--text-2)" }}>{o}</span>
                </li>
              ))}
            </ul>
          </div>

          {}
          <ModeShift/>
        </div>

        <style>{`
          @media (max-width: 980px) {
            .big-grid { grid-template-columns: repeat(2, 1fr) !important; }
            .org-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          }
          @media (max-width: 540px) {
            .big-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </section>
  );
}

function BigMetric({ m, i, last }) {
  return (
    <div style={{
      padding: "40px 28px",
      borderRight: last ? "none" : "1px solid var(--line)",
    }}>
      <span style={{
        fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.12em", color: "var(--muted)",
      }}>M.0{i + 1}</span>
      <div style={{
        fontSize: m.small ? "clamp(32px, 3.5vw, 48px)" : "clamp(44px, 4.4vw, 64px)",
        fontWeight: 500, letterSpacing: "-0.03em", lineHeight: 1,
        color: "var(--blue)", marginTop: 16, marginBottom: 14,
        fontFeatureSettings: '"ss01"',
      }}>{m.v}</div>
      <div style={{ fontSize: 15, color: "var(--text-2)" }}>{m.l}</div>
      <div style={{ fontSize: 12.5, color: "var(--muted)", marginTop: 6, lineHeight: 1.5 }}>{m.ctx}</div>
    </div>
  );
}

function BeforeAfterTable() {
  return (
    <div style={{
      border: "1px solid var(--line)",
      borderRadius: 16, overflow: "hidden",
      background: "var(--bg-2)",
    }}>
      <div className="ba-head" style={{
        display: "grid", gridTemplateColumns: "1.4fr 1.2fr 1.2fr 1fr",
        padding: "14px 22px", background: "rgba(0,0,0,0.25)",
        borderBottom: "1px solid var(--line-2)",
        fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.12em",
        color: "var(--muted)", textTransform: "uppercase",
      }}>
        <span>Area</span>
        <span style={{ color: "var(--warn)" }}>Before</span>
        <span style={{ color: "var(--accent)" }}>After</span>
        <span>Change</span>
      </div>
      {BA_ROWS.map((r, i) => (
        <div key={i} className="ba-row" style={{
          display: "grid", gridTemplateColumns: "1.4fr 1.2fr 1.2fr 1fr",
          alignItems: "center", padding: "16px 22px",
          borderBottom: i < BA_ROWS.length - 1 ? "1px solid var(--line)" : "none",
          fontSize: 14, lineHeight: 1.4,
        }}>
          <span style={{ color: "var(--text)", fontWeight: 500, letterSpacing: "-0.005em" }}>{r.area}</span>
          <span style={{ color: "var(--text-2)" }}>
            <span style={{ color: "var(--warn)", marginRight: 8, opacity: 0.7 }}>—</span>
            {r.before}
          </span>
          <span style={{ color: "var(--text-2)" }}>
            <span style={{ color: "var(--accent)", marginRight: 8 }}>→</span>
            {r.after}
          </span>
          <span style={{
            fontFamily: "var(--mono)", fontSize: 12, letterSpacing: "0.06em",
            color: "var(--accent)",
          }}>{r.change}</span>
        </div>
      ))}
      <style>{`
        @media (max-width: 900px) {
          .ba-head { display: none !important; }
          .ba-row {
            grid-template-columns: 1fr 1fr !important;
            gap: 6px 14px !important;
            row-gap: 4px !important;
          }
          .ba-row > span:first-child {
            grid-column: 1 / 3 !important;
            font-size: 15px !important; margin-bottom: 4px;
          }
          .ba-row > span:nth-child(4) {
            grid-column: 1 / 3 !important;
            font-size: 11px !important;
          }
        }
      `}</style>
    </div>
  );
}

function ModeShift() {
  return (
    <div style={{
      background: "var(--panel)",
      border: "1px solid var(--line)",
      borderRadius: 16,
      padding: "26px 28px",
    }}>
      <div style={{
        fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.14em",
        color: "var(--muted)", textTransform: "uppercase",
        paddingBottom: 14, marginBottom: 16,
        borderBottom: "1px dashed var(--line-2)",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <span><span style={{ color: "var(--accent)" }}>●</span> OPERATING MODE</span>
        <span>BEFORE → AFTER</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {[
          { b: "Planning on averages",        a: "Planning on forecasts" },
          { b: "Reorder at zero",             a: "Reorder against lead time" },
          { b: "Procurement reactive",        a: "Procurement strategic" },
          { b: "Capital allocated by inertia",a: "Capital allocated deliberately" },
        ].map((p, i) => (
          <div key={i} style={{
            display: "grid", gridTemplateColumns: "1fr 30px 1fr",
            alignItems: "center", gap: 10,
          }}>
            <span style={{ fontSize: 13.5, color: "var(--muted)", textDecoration: "line-through", textDecorationColor: "rgba(255,107,107,0.5)" }}>
              {p.b}
            </span>
            <span style={{ color: "var(--accent)", textAlign: "center", fontFamily: "var(--mono)", fontSize: 11 }}>→</span>
            <span style={{ fontSize: 14, color: "var(--text)", letterSpacing: "-0.005em", fontWeight: 500 }}>
              {p.a}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}



/* --- Section from case-predictive/relevant.jsx --- */


const RELEVANT_IF = [
  { title: "Weekend or seasonal stockouts",   glyph: "sla"     },
  { title: "Overstock on slow-moving SKUs",   glyph: "cascade" },
  { title: "Premium emergency procurement",  glyph: "idle"    },
  { title: "Large multi-SKU catalog",         glyph: "multi"   },
  { title: "Planning by instinct + averages", glyph: "comms"   },
];

function RelevantGlyph({ kind }) {
  const c = "currentColor";
  const common = { width: 20, height: 20, viewBox: "0 0 28 28", fill: "none", stroke: c, strokeWidth: "1.4", strokeLinecap: "round", strokeLinejoin: "round" };
  if (kind === "multi") return (
    <svg {...common}>
      <rect x="3" y="6" width="8" height="6" rx="1"/>
      <rect x="17" y="6" width="8" height="6" rx="1"/>
      <rect x="10" y="18" width="8" height="6" rx="1"/>
      <path d="M7 12 L14 18 M21 12 L14 18" strokeDasharray="1.5 2"/>
    </svg>
  );
  if (kind === "sla") return (
    <svg {...common}>
      <circle cx="14" cy="14" r="9"/>
      <path d="M14 7 V14 L18 17"/>
      <path d="M14 4 V5 M14 23 V24 M4 14 H5 M23 14 H24" />
    </svg>
  );
  if (kind === "idle") return (
    <svg {...common}>
      <rect x="3" y="10" width="13" height="9" rx="1"/>
      <path d="M16 12 L22 12 L25 16 V19 H16 Z"/>
      <circle cx="8" cy="21" r="1.6"/>
      <circle cx="20" cy="21" r="1.6"/>
    </svg>
  );
  if (kind === "comms") return (
    <svg {...common}>
      <path d="M4 7 H15 V14 H9 L6 17 V14 H4 Z"/>
      <path d="M13 14 H24 V20 H18 L15 23 V20 H13 Z" />
    </svg>
  );
  if (kind === "cascade") return (
    <svg {...common}>
      <circle cx="6" cy="6" r="2" fill={c}/>
      <circle cx="14" cy="13" r="2"/>
      <circle cx="22" cy="20" r="2"/>
      <path d="M7.5 7.5 L12.5 11.5 M15.5 14.5 L20.5 18.5"/>
    </svg>
  );
  return null;
}

function Relevant() {
  return (
    <section className="section" id="relevant" data-screen-label="Relevant" style={{ padding: "70px 0" }}>
      <div className="wrap">
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: 32, gap: 40, flexWrap: "wrap" }}>
          <div style={{ maxWidth: 720 }}>
            <span className="eyebrow"><span className="num">07</span><span className="bar"/>Where this shows up</span>
            <h2 className="h2" style={{ marginTop: 14 }}>
              This is what broken planning looks like in your business.
            </h2>
          </div>
          <p style={{ maxWidth: 360, color: "var(--muted)", fontSize: 14, lineHeight: 1.55, margin: 0 }}>
            Two or more of these = your inventory is probably reacting to demand instead of anticipating it.
          </p>
        </header>

        <div className="relevant-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: 10, alignItems: "stretch",
        }}>
          {RELEVANT_IF.map((r, i) => (
            <div key={i} style={{
              background: "var(--panel)",
              border: "1px solid var(--line)",
              borderRadius: 12,
              padding: "16px 16px",
              transition: "all .2s",
              display: "flex", alignItems: "center", gap: 12,
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(37, 99, 255,0.30)"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "var(--line)"}
            >
              <div style={{
                width: 38, height: 38, borderRadius: 10,
                background: "var(--blue-50)",
                border: "1px solid var(--blue-100)",
                display: "grid", placeItems: "center", flexShrink: 0,
                color: "var(--blue)",
              }}>
                <RelevantGlyph kind={r.glyph}/>
              </div>
              <span style={{ fontSize: 13.5, fontWeight: 500, color: "var(--blue)", letterSpacing: "-0.005em", lineHeight: 1.3 }}>
                {r.title}
              </span>
            </div>
          ))}
        </div>

        <style>{`
          @media (max-width: 1100px) { .relevant-grid { grid-template-columns: repeat(2, 1fr) !important; } }
          @media (max-width: 540px)  { .relevant-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </div>
    </section>
  );
}



/* --- Section from case-predictive/cta.jsx --- */


function CaseCTA() {
  return (
    <section className="section" id="cta" data-screen-label="CTA" style={{ borderTop: 0, padding: "100px 0 80px" }}>
      <div className="wrap">
        <div className="cta-card" style={{
          position: "relative",
          background: "linear-gradient(180deg, rgba(15,18,26,0.95), rgba(9,11,16,0.95))",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 24,
          padding: "72px 64px",
          overflow: "hidden",
        }}>
          {}
          <span aria-hidden="true" style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse 60% 80% at 80% 30%, #000 0%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse 60% 80% at 80% 30%, #000 0%, transparent 80%)",
          }}/>
          <span aria-hidden="true" style={{
            position: "absolute", right: -120, top: -120, width: 460, height: 460, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(37, 99, 255,0.18), rgba(37, 99, 255,0.04) 40%, transparent 70%)",
            filter: "blur(20px)", pointerEvents: "none",
          }}/>

          {}
          {[
            { top: 14, left: 14, rot: 0 },
            { top: 14, right: 14, rot: 90 },
            { bottom: 14, right: 14, rot: 180 },
            { bottom: 14, left: 14, rot: 270 },
          ].map((p, i) => (
            <span key={i} style={{
              position: "absolute", width: 10, height: 10, ...p,
              transform: `rotate(${p.rot}deg)`,
              borderTop: "1px solid var(--muted)",
              borderLeft: "1px solid var(--muted)", opacity: 0.5,
            }}/>
          ))}

          <div className="cta-inner" style={{
            position: "relative",
            display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 60, alignItems: "center",
          }}>
            <div>
              <span className="eyebrow" style={{ color: "var(--accent)" }}>
                <span className="dot"/>WANT THIS SYSTEM IN YOUR OPERATION?
              </span>
              <h2 className="h2" style={{ marginTop: 22, marginBottom: 22, color: "#fff" }}>
                From reactive<br/>to <em>predictive</em> planning.
              </h2>
              <p style={{ fontSize: 17, lineHeight: 1.55, color: "rgba(255,255,255,0.7)", margin: 0, maxWidth: "50ch" }}>
                30 minutes. We’ll map your demand patterns, identify where your planning is failing, and show exactly where inventory capital is getting trapped.
              </p>

              <div style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 32, flexWrap: "wrap" }}>
                {}
                <a href="mailto:hello@keymouseit.com" className="btn btn-ghost" style={{ padding: "14px 22px", fontSize: 14.5, color: "#fff", borderColor: "rgba(255,255,255,0.2)" }}>
                  hello@keymouseit.com <ArrowUpRight/>
                </a>
              </div>

              <div className="cta-trust" style={{ marginTop: 28, display: "flex", gap: 22, flexWrap: "wrap", fontSize: 12.5, color: "rgba(255,255,255,0.5)" }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                  <span style={{ color: "var(--accent)" }}>✓</span> No sales call
                </span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                  <span style={{ color: "var(--accent)" }}>✓</span> NDA on request
                </span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                  <span style={{ color: "var(--accent)" }}>✓</span> 1-page gap map after
                </span>
              </div>
            </div>

            <ContactForm/>
          </div>

          <style>{`
            @media (max-width: 900px) {
              .cta-inner { grid-template-columns: 1fr !important; }
              .cta-card { padding: 48px 28px !important; }
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}


// Footer
function CaseFooter() {
  return (
    <footer style={{
      padding: "56px 0 40px", borderTop: "1px solid var(--line)",
      fontSize: 13, color: "var(--muted)",
    }}>
      <div className="wrap" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Logo height={28} mode="light" />
          <span style={{ color: "var(--muted-2)", marginLeft: 12 }}>·</span>
          <span style={{ marginLeft: 8 }}>Operational software & AI systems for complex, real-world workflows.</span>
        </div>
        <div style={{ display: "flex", gap: 22, fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase" }}>
          <Link to="/case-studies" style={{ color: "var(--text-2)" }}>← Back to systems</Link>
          <span><span style={{ color: "var(--accent)" }}>●</span> Q3 ’26 — accepting engagements</span>
        </div>
      </div>
    </footer>
  );
}

// Mobile sticky CTA
function MobileCaseCTA() {
  return (
    <div className="mobile-cta">
      <div className="slot">
        <span className="live-dot"/>
        3 audit slots left · Q3 ’26
      </div>
      <div className="row">
        <a href="#cta" className="btn btn-primary" style={{ color: "#fff" }}>
          Get Your System Map <ArrowRight/>
        </a>
        <a href="mailto:hello@keymouseit.com" className="btn btn-ghost" aria-label="Email">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
            <rect x="1.5" y="3" width="13" height="10" rx="1.5"/>
            <path d="M2 4l6 5 6-5"/>
          </svg>
        </a>
      </div>
    </div>
  );
}





// ── Cross-sell: read next case study ────────────────────────────────────
function CrossSell() {
  return (
    <section data-screen-label="Read-Next" style={{ padding: "20px 0 60px" }}>
      <div className="wrap">
        <div style={{
          fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.14em",
          color: "var(--muted)", textTransform: "uppercase", marginBottom: 14,
          display: "inline-flex", alignItems: "center", gap: 10,
        }}>
          <span style={{ color: "var(--accent)" }}>●</span> READ NEXT
        </div>

        <Link to="/case-studies/inventory-intelligence" style={{ display: "block" }}>
          <div className="rn-card" style={{
            position: "relative",
            display: "grid", gridTemplateColumns: "84px 1fr auto", gap: 28,
            alignItems: "center",
            padding: "26px 32px",
            background: "var(--panel)",
            border: "1px solid var(--line)",
            borderRadius: 16,
            transition: "all .2s",
            boxShadow: "0 2px 8px rgba(11,17,32,0.04)",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = "rgba(37, 99, 255,0.40)";
            e.currentTarget.style.background = "linear-gradient(180deg, rgba(37, 99, 255, 0.04), rgba(255, 255, 255, 0.8))";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = "var(--line)";
            e.currentTarget.style.background = "var(--panel)";
          }}
          >
            <div style={{
              width: 60, height: 60, borderRadius: 12,
              border: "1px solid rgba(37, 99, 255,0.30)",
              background: "rgba(37, 99, 255,0.06)",
              display: "grid", placeItems: "center",
              color: "var(--accent)",
              fontFamily: "var(--mono)", fontSize: 16, fontWeight: 500, letterSpacing: "0.04em",
            }}>S.02</div>

            <div>
              <div style={{
                fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.14em",
                color: "var(--muted)", textTransform: "uppercase", marginBottom: 6,
              }}>
                Visibility · 4 min read
              </div>
              <div style={{
                fontSize: 22, fontWeight: 500, color: "var(--blue)", letterSpacing: "-0.015em", marginBottom: 6,
              }}>
                Inventory Intelligence
              </div>
              <div style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.5, maxWidth: "60ch" }}>
                A high-volume hospitality op cut leakage{" "}
                <span style={{ color: "var(--accent)" }}>~70%</span>{" "}
                with real-time consumption intelligence.
              </div>
            </div>

            <span style={{
              fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.1em",
              color: "var(--accent)", textTransform: "uppercase",
              display: "inline-flex", alignItems: "center", gap: 8,
              whiteSpace: "nowrap",
            }}>
              Read case <ArrowUpRight/>
            </span>
          </div>
        </Link>

        <style>{`
          @media (max-width: 720px) {
            .rn-card { grid-template-columns: 56px 1fr !important; padding: 18px 20px !important; }
            .rn-card > span:last-child { grid-column: 1 / 3 !important; margin-top: 8px; }
          }
        `}</style>
      </div>
    </section>
  );
}


// ── Mid-page inline CTA ───────────────────────────────────────────
function MidCTA({ headline, sub, btn }) {
  return (
    <section data-screen-label="Mid-CTA" style={{ padding: "20px 0 50px" }}>
      <div className="wrap">
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: 28, padding: "22px 28px", flexWrap: "wrap",
          background: "linear-gradient(90deg, rgba(37, 99, 255,0.04), rgba(37, 99, 255,0.0))",
          border: "1px solid rgba(255,255,255,0.1)",
          borderLeft: "2px solid var(--accent)",
          borderRadius: 14,
        }}>
          <div>
            <div style={{ fontSize: 17, fontWeight: 500, letterSpacing: "-0.01em", color: "var(--text)", marginBottom: 4 }}>
              {headline}
            </div>
            <div style={{ fontSize: 13.5, color: "var(--muted)" }}>
              {sub}
            </div>
          </div>
          <a href="#cta" className="btn btn-primary" style={{ color: "#fff" }}>
            {btn} <ArrowRight />
          </a>
        </div>
      </div>
    </section>
  );
}


/* --- Section from case-predictive/app.jsx --- */


export default function PredictiveInventoryPlanning() {
  return (
    <div className="case-study-theme">
      <CaseStudyDetailNav title="Predictive Inventory Planning" />
      <CaseHero/>
      <WhoFor/>
      <Breaking/>
      <Incident/>
      <MidCTA
        headline="Recognise the cycle?"
        sub="Skip the deep dive — 30 min, no slides. We'll map your demand patterns directly."
        btn="Book Audit"
      />
      <Insight/>
      <Built/>
      <AISection/>
      <Impact/>
      <Relevant/>
      <CrossSell/>
      <CaseCTA/>
      <CaseFooter/>
      <MobileCaseCTA/>
    </div>
  );
}


