import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../components/site-ui';
import { ContactForm } from './components/contact-form';
import { ArrowRight, ArrowUpRight, IconCoordination, IconVisibility, IconSequencing, IconPlanning, IconLatency, LayerGlyph } from './components/icons';
import './case-studies.css';


/* --- Section from case-manufacturing/nav.jsx --- */


function CaseNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <nav className={`nav ${scrolled ? "scrolled" : ""}`} data-screen-label="Nav">
      <div className="wrap nav-inner">
        <Link to="/" className="brand" style={{ display: "inline-flex", alignItems: "center" }}>
          <Logo height={40} mode="light" />
        </Link>

        <div className="crumbs" style={{ display: "flex" }}>
          <Link to="/case-studies">Case Studies</Link>
          <span className="sep">/</span>
          <span className="cur">Manufacturing Control Tower</span>
        </div>

        <div className="nav-cta" style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <a href="#cta" className="btn btn-primary" style={{ padding: "9px 14px", fontSize: 13 }}>
            Get System Map <ArrowRight />
          </a>
        </div>
      </div>
    </nav>
  );
}



/* --- Section from case-manufacturing/hero.jsx --- */


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
        <b>Saw our LinkedIn post?</b> See the control tower for multi-client production.
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
            <span style={{ color: "var(--accent)" }}>S.01</span>
            <span className="bar"/>
            Case study · Execution
          </span>
          <span style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.12em", color: "var(--muted)", textTransform: "uppercase" }}>
            60-sec read · 2026
          </span>
        </div>

        <h1 className="display">
          Manufacturing<br/>
          <span style={{ color: "var(--blue)" }}>Control Tower.</span>
        </h1>
        <p className="lead" style={{ marginTop: 24, fontSize: 20, maxWidth: "52ch" }}>
          Cut batch delays{" "}
          <span style={{ color: "var(--accent)", fontWeight: 500 }}>~70%</span>{" "}
          — replacing coordination chaos with system-enforced workflows.
        </p>
        <p style={{
          marginTop: 16,
          maxWidth: "58ch",
          fontSize: 16.5,
          lineHeight: 1.55,
          color: "var(--text-2)",
        }}>
          If your production depends on coordination between teams — this is the system you’re missing.
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 22 }}>
          {[
            "Execution layer",
            "Manufacturing",
            "Compliance-heavy",
            "Multi-client",
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
            <span>inventory accuracy</span>
          </div>
          <div className="hero-proof-item">
            <b>~70%</b>
            <span>batch delay cut</span>
          </div>
          <div className="hero-proof-item">
            <b>6–8h → 0</b>
            <span>dock-side compliance holds</span>
          </div>
          <div className="hero-proof-item hero-proof-meta">
            <b><span className="live-dot"/>Phased rollout</b>
            <span>inventory + compliance first</span>
          </div>
        </div>

        <FactoryPipeline/>
      </div>
    </section>
  );
}

// ── Factory Lifecycle Pipeline ───────────────────────────────────────────
function FactoryPipeline() {
  const stages = [
    { code: "01", label: "Procurement",          sub: "Raw materials confirmed",     kind: "proc",       critical: false },
    { code: "02", label: "Production",           sub: "Batch start",                 kind: "prod",       critical: false },
    { code: "03", label: "Label Approval",       sub: "Artwork cleared",             kind: "label",      critical: false },
    { code: "04", label: "Compliance Validation",sub: "Label + excise aligned",      kind: "compliance", critical: true  },
    { code: "05", label: "Dispatch",             sub: "Readiness queue",             kind: "dispatch",   critical: false },
    { code: "06", label: "Shipment",             sub: "Released to lane",            kind: "shipment",   critical: false },
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
          <span>FACTORY.PIPELINE</span>
        </span>
        <span>6 STAGES · 1 COMPLIANCE GATE</span>
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
        <span><span style={{ color: "var(--accent)" }}>▲</span> Compliance enforced mid-pipeline — not at the dock</span>
        <span>System-enforced, not memory-driven</span>
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
    <div style={{
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
        <span aria-hidden="true" style={{
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
          }}>GATE</span>
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
  // Procurement — inbound boxes
  if (kind === "proc")       return (<svg {...common}><path d="M5 11 L18 6 L31 11 V25 L18 30 L5 25 Z"/><path d="M5 11 L18 16 L31 11"/><path d="M18 16 V30"/><path d="M3 6 L7 10 L3 14" opacity="0.7"/></svg>);
  // Production — gear / spinner
  if (kind === "prod")       return (<svg {...common}><circle cx="18" cy="18" r="6"/><path d="M18 8 V11 M18 25 V28 M8 18 H11 M25 18 H28 M11 11 L13 13 M23 23 L25 25 M25 11 L23 13 M11 25 L13 23"/></svg>);
  // Label — tag
  if (kind === "label")      return (<svg {...common}><path d="M18 6 L30 6 V18 L18 30 L6 18 Z"/><circle cx="24" cy="12" r="1.6" fill={c}/></svg>);
  // Compliance — shield with check
  if (kind === "compliance") return (<svg {...common}><path d="M18 5 L29 9 V18 c0 6 -5 11 -11 13 c-6 -2 -11 -7 -11 -13 V9 Z"/><path d="M13 18 L17 22 L24 14"/></svg>);
  // Dispatch — outbound truck
  if (kind === "dispatch")   return (<svg {...common}><rect x="4" y="14" width="16" height="11" rx="1"/><path d="M20 18 L26 18 L30 22 V25 H20 Z"/><circle cx="10" cy="27" r="2"/><circle cx="25" cy="27" r="2"/></svg>);
  // Shipment — paper plane / chevrons
  if (kind === "shipment")   return (<svg {...common}><path d="M6 22 L16 28 L30 14"/><circle cx="30" cy="14" r="2" fill={c}/></svg>);
  return null;
}



/* --- Section from case-manufacturing/who.jsx --- */


const WHO_FOR = [
  "Production depends on coordination across multiple teams",
  "Inventory still needs physical verification before batch start",
  "Compliance blocks dispatch instead of being enforced upstream",
  "Batches get delayed waiting for approvals or document alignment",
  "Execution depends on specific people being available",
];

const TLDR = [
  { k: "Problem",  v: "Multi-client production held together by phone calls, Excel, and key people. Inventory variance 8–12%. Dock-side compliance holds 6–8 hrs." },
  { k: "Solution", v: "Control tower with state-machine workflow, client-wise inventory, and a compliance gate enforced mid-pipeline — not at dispatch." },
  { k: "Outcome",  v: "~75% inventory accuracy gain · ~70% batch delay cut · dock-side holds eliminated." },
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



/* --- Section from case-manufacturing/breaking.jsx --- */


const BREAKING = [
  {
    code: "B.01",
    title: "Inventory mismatch",
    body: "Client materials sat in shared space. Physical verification was required before every batch could start.",
    metric: { v: "8–12%", l: "variance vs physical stock" },
    glyph: "comm",
  },
  {
    code: "B.02",
    title: "Batch delay",
    body: "Phone calls, Excel updates, and manual follow-ups introduced avoidable delay before each production run.",
    metric: { v: "2–4 hr", l: "delay per batch" },
    glyph: "gate",
  },
  {
    code: "B.03",
    title: "Compliance at dispatch",
    body: "Label approvals and excise documents were checked only after trucks were staged and product was loaded.",
    metric: { v: "6–8 hr", l: "dock-side holds" },
    glyph: "vis",
  },
  {
    code: "B.04",
    title: "Manual coordination",
    body: "Procurement, production, compliance, and dispatch moved through calls, Excel, and follow-ups.",
    metric: { v: "4 teams", l: "no shared layer" },
    glyph: "late",
  },
  {
    code: "B.05",
    title: "No leadership visibility",
    body: "Real status surfaced through escalation only. By the time leadership saw the problem, delay was already created.",
    metric: { v: "Reactive", l: "escalation-only" },
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
              Five gaps. <em>Every</em> batch.
            </h2>
          </div>
          <p style={{ maxWidth: 360, color: "var(--muted)", fontSize: 14.5, lineHeight: 1.55, margin: 0 }}>
            These were not individual mistakes. They were structural gaps: no shared workflow, no enforced gate, no real-time operating layer.
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



/* --- Section from case-manufacturing/incident.jsx --- */


const TIMELINE = [
  { t: "06:00", kind: "ready",    side: "L", title: "Batch #B-2148 ready",                  body: "Trucks staged. Product loaded. Dispatch initiated for the morning shipment." },
  { t: "06:42", kind: "hold",     side: "R", title: "Held at dock — documents don't match",  body: "Label approval references batch v3. Excise docs cite v2. Mismatch surfaces only at release.", warn: true },
  { t: "09:18", kind: "unload",   side: "L", title: "Batch unloaded for reprocessing",      body: "Truck released. Product returned to staging. Labels reprinted, docs re-aligned.", warn: true },
  { t: "13:30", kind: "shift",    side: "R", title: "6–8 hours lost — next-day ship",        body: "Original dispatch window missed. Client notified. Same pattern repeats weekly.",          warn: true },
  { t: "—",     kind: "root",     side: "L", title: "Root cause",                            body: "No system enforced label + excise alignment before dispatch. The gate sat at the wrong end of the pipeline." },
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
              One batch · one dock
            </span>
            <h2 className="h2" style={{ marginTop: 16 }}>
              A full batch held<br/>at the dock for <em>8</em> hours.
            </h2>
          </div>
          <p style={{ maxWidth: 360, color: "var(--muted)", fontSize: 14.5, lineHeight: 1.55, margin: 0 }}>
            Not a one-off. This was the pattern that appeared whenever compliance was checked at the end instead of enforced upstream.
          </p>
        </header>

        <div style={{
          marginBottom: 28,
          padding: "28px 30px",
          borderRadius: 18,
          border: "1px solid rgba(37, 99, 255, 0.28)",
          background: "linear-gradient(180deg, rgba(37, 99, 255, 0.075), rgba(37, 99, 255, 0.02))",
          boxShadow: "0 0 80px -45px rgba(37, 99, 255, 0.35)",
        }}>
          <p style={{
            margin: 0,
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: "clamp(25px, 3vw, 42px)",
            lineHeight: 1.18,
            color: "var(--text)",
            maxWidth: "24ch",
          }}>
            Trucks loaded. Dispatch blocked. Documents didn’t match. The batch was unloaded.
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
          OPS.LOG · BATCH-2148
        </span>
        <span>DOCK HOLD · RECURRING PATTERN</span>
      </div>

      {}
      <div style={{ position: "relative", padding: "28px 22px 32px" }}>
        {}
        <span aria-hidden="true" style={{
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
        <span>ROOT CAUSE — Compliance gate at the wrong end of the pipeline</span>
        <span>TIME-TO-FIX (with system): <span style={{ color: "var(--accent)" }}>MID-PIPELINE</span></span>
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
        color: "var(--accent)", textAlign: "center", background: "var(--bg-2)", padding: "4px 8px", borderRadius: 999,
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



/* --- Section from case-manufacturing/insight.jsx --- */


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
          This wasn’t a production problem. It was a <span style={{ color: "var(--accent)" }}>system failure</span>.
        </p>

        <p style={{
          margin: "22px auto 0",
          maxWidth: "54ch",
          color: "var(--text-2)",
          fontSize: 17,
          lineHeight: 1.6,
        }}>
          The teams were capable. The missing layer was the one that enforced dependencies before a mistake reached the dock.
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
          ? "Four functions. No system between them."
          : "One workflow. Dependencies enforced."}
      </div>
      <div style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.55 }}>
        {before
          ? "Inventory, production, compliance, and dispatch — each on their own track. Every handoff a phone call. Every check at the wrong end of the pipeline."
          : "Workflow state machine connects all four. Compliance gate enforced mid-pipeline. Leadership sees real-time status without escalation."}
      </div>
    </div>
  );
}



/* --- Section from case-manufacturing/built.jsx --- */


const MODULES = [
  { code: "M.01", name: "Inventory Engine",   fn: "Client-wise raw / WIP / finished tracking · Auto-reconciliation", out: "Live stock state" },
  { code: "M.02", name: "Workflow Engine",    fn: "Production-to-dispatch as a state machine · No stage starts early", out: "Enforced sequence" },
  { code: "M.03", name: "Compliance Engine",  fn: "Label + excise cross-check · Mid-pipeline gate",            out: "Pre-dispatch clearance" },
  { code: "M.04", name: "Scheduling Engine",  fn: "Capacity + WIP + client priorities · Ranked recommendations",  out: "Auditable schedule" },
  { code: "M.05", name: "Alert System",       fn: "Shortage · Bottleneck · Compliance gap",                    out: "Predictive triggers" },
];

function Built() {
  return (
    <section className="section" id="built" data-screen-label="Built">
      <div className="wrap">
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: 48, gap: 40, flexWrap: "wrap" }}>
          <div style={{ maxWidth: 720 }}>
            <span className="eyebrow"><span className="num">04</span><span className="bar"/>What was built</span>
            <h2 className="h2" style={{ marginTop: 16 }}>
              A <em>control tower</em><br/>for manufacturing ops.
            </h2>
          </div>
          <p style={{ maxWidth: 360, color: "var(--muted)", fontSize: 14.5, lineHeight: 1.55, margin: 0 }}>
            This wasn’t visibility. This was control — the system the facility now operates through, with dependencies enforced before dispatch risk appears.
          </p>
        </header>

        <div style={{
          marginBottom: 24,
          padding: "16px 18px",
          borderRadius: 14,
          border: "1px solid rgba(37, 99, 255,0.28)",
          background: "rgba(37, 99, 255,0.055)",
          color: "var(--text-2)",
          fontSize: 14.5,
          lineHeight: 1.55,
        }}>
          Built in phases — starting with inventory and compliance before expanding into scheduling and dispatch — so the plant could adopt control without disrupting live production.
        </div>

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
            minWidth: 360,
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
              Manufacturing Control Tower
            </div>
            <div style={{
              fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.1em",
              color: "var(--text-2)", marginTop: 6,
            }}>
              REAL-TIME · DEPENDENCY-ENFORCED · COMPLIANCE-GATED
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
            { c: "INV",   l: "Inventory",   d: "Client-wise state" },
            { c: "WFL",   l: "Workflow",    d: "State machine" },
            { c: "COMP",  l: "Compliance",  d: "Mid-pipe gate" },
            { c: "SCH",   l: "Schedule",    d: "Capacity + WIP" },
            { c: "ALR",   l: "Alerts",      d: "Predictive triggers" },
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
          <span><span style={{ color: "var(--accent)" }}>↓</span> Inputs to the tower</span>
          <span>Compliance gate enforced mid-pipeline — not at the dock</span>
          <span>Decisions out <span style={{ color: "var(--accent)" }}>↑</span></span>
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



/* --- Section from case-manufacturing/ai.jsx --- */


const AI_USES = [
  {
    code: "AI.01",
    title: "Predictive Shortage Alerts",
    body: "Historical consumption per client × SKU vs current stock + scheduled batch volume. Alert fires days before a shortage — not at batch start.",
    chip: "IDLE LINE TIME ↓",
    quad: "op-det",
  },
  {
    code: "AI.02",
    title: "Bottleneck Detection",
    body: "Time-at-stage tracked per batch. Batches exceeding expected duration flagged immediately — surfaced to the right team without escalation.",
    chip: "CASCADE → LOCAL FIX",
    quad: "op-det",
  },
  {
    code: "AI.03",
    title: "Compliance Validation",
    body: "Label approvals + excise documents cross-referenced against the batch manifest before dispatch ever unlocks.",
    chip: "DOCK HOLDS → ZERO",
    quad: "op-dec",
  },
  {
    code: "AI.04",
    title: "Scheduling Decision Support",
    body: "Inventory + WIP + client commitments + capacity → ranked production sequence. Planner adjusts, doesn't build from scratch.",
    chip: "BUILDING → REVIEWING",
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
              Rules handled the gates.<br/>AI caught the <em>variance</em>.
            </h2>
          </div>
          <p style={{ maxWidth: 360, color: "var(--muted)", fontSize: 14.5, lineHeight: 1.55, margin: 0 }}>
            State transitions are deterministic. AI was applied only where prediction and judgment genuinely added lift.
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
              Most AI work sits on the floor — catching shortages, bottlenecks, and compliance gaps before they hit the dock.
            </h3>
            <p style={{ fontSize: 14.5, color: "var(--muted)", lineHeight: 1.6, maxWidth: "50ch", margin: 0 }}>
              Scheduling support informs longer-term decisions; everything else lives in the daily loop where the cost of latency is highest.
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
    { row: 0, col: 0, code: "AI.04", title: "Scheduling Decision", accent: false },
    { row: 0, col: 1, code: "—",     title: "—",                    accent: false, empty: true },
    { row: 1, col: 0, code: "AI.01", title: "Shortage Alerts",     accent: true },
    { row: 1, col: 1, code: "AI.02 / AI.03", title: "Bottleneck · Compliance", accent: true },
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



/* --- Section from case-manufacturing/impact.jsx --- */


const BIG_METRICS = [
  { v: "75%",    l: "inventory accuracy ↑",       ctx: "8–12% mismatch → <3%" },
  { v: "70%",    l: "batch delay ↓",              ctx: "2–4 hr per batch → <45 min" },
  { v: "0",      l: "dock compliance failures",   ctx: "6–8 hr holds removed upstream" },
  { v: "80%",    l: "idle line time ↓",           ctx: "Material gaps surfaced before batch start" },
];

const BA_ROWS = [
  { area: "Inventory accuracy",           before: "8–12% mismatch",          after: "<3% mismatch",             change: "~75% improvement" },
  { area: "Batch coordination delay",     before: "2–4 hrs per batch",       after: "<45 min average",          change: "~70% reduction" },
  { area: "Compliance dispatch failures", before: "Recurring · weekly",      after: "Near zero",                change: "Effectively eliminated" },
  { area: "Dock-to-shipment delay",       before: "6–8 hrs per incident",    after: "Resolved upstream",        change: "Removed" },
  { area: "Idle line time",               before: "Material gaps found late", after: "Shortages flagged early",  change: "~80% reduction" },
  { area: "Leadership visibility",        before: "Escalation-only",         after: "Live operating view",      change: "Real-time control" },
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
              Firefighting <em>→</em><br/>predictable execution.
            </h2>
          </div>
          <p style={{ maxWidth: 360, color: "var(--muted)", fontSize: 14.5, lineHeight: 1.55, margin: 0 }}>
            Directional metrics from comparable production periods before and after implementation.
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
              The plant runs on a system — not on people.
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                "Critical workflows don't stall when a key coordinator is out.",
                "Leadership sees production + inventory status without asking anyone.",
                "Compliance posture: validated before dispatch, not at it.",
                "New clients are a configuration task, not an operational restructure.",
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
          { b: "Coordinated by people",   a: "Coordinated by state" },
          { b: "Compliance at the dock",  a: "Compliance mid-pipeline" },
          { b: "Status by escalation",    a: "Status on a dashboard" },
          { b: "Schedule from scratch",   a: "Schedule reviewed" },
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



/* --- Section from case-manufacturing/relevant.jsx --- */


const RELEVANT_IF = [
  { title: "Multi-client / shared production",  glyph: "multi"   },
  { title: "Compliance critical to dispatch",   glyph: "sla"     },
  { title: "Frequent production delays",        glyph: "idle"    },
  { title: "Unreliable inventory tracking",     glyph: "comms"   },
  { title: "Cross-team coordination overhead",  glyph: "cascade" },
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
            <span className="eyebrow"><span className="num">07</span><span className="bar"/>Relevant for</span>
            <h2 className="h2" style={{ marginTop: 14 }}>
              Sound familiar?
            </h2>
          </div>
          <p style={{ maxWidth: 360, color: "var(--muted)", fontSize: 14, lineHeight: 1.55, margin: 0 }}>
            Two or more of these = you're inside the shape of this engagement.
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



/* --- Section from case-manufacturing/cta.jsx --- */


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
                Want this system<br/>in your <em>plant</em>?
              </h2>
              <p style={{ fontSize: 17, lineHeight: 1.55, color: "rgba(255,255,255,0.7)", margin: 0, maxWidth: "50ch" }}>
                30 minutes. We’ll map your workflow gaps — inventory, production, compliance, dispatch — and identify the missing system layer that would create the highest operational leverage.
              </p>

              <div style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 32, flexWrap: "wrap" }}>
                {}
                <a href="mailto:hello@keymouseit.com" className="btn btn-ghost" style={{ padding: "14px 22px", fontSize: 14.5, color: "#fff", borderColor: "rgba(255,255,255,0.2)" }}>
                  hello@keymouseit.com <ArrowUpRight/>
                </a>
              </div>

              <div style={{ marginTop: 28, display: "flex", gap: 22, flexWrap: "wrap", fontSize: 12.5, color: "rgba(255,255,255,0.5)" }}>
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
          Get Your Operational System Map <ArrowRight/>
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

        <Link to="/case-studies/logistics-control-tower" style={{ display: "block" }}>
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
            }}>S.03</div>

            <div>
              <div style={{
                fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.14em",
                color: "var(--muted)", textTransform: "uppercase", marginBottom: 6,
              }}>
                Orchestration · 4 min read
              </div>
              <div style={{
                fontSize: 22, fontWeight: 500, color: "var(--blue)", letterSpacing: "-0.015em", marginBottom: 6,
              }}>
                Logistics Control Tower
              </div>
              <div style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.5, maxWidth: "60ch" }}>
                Multi-node logistics op cut dispatch delays{" "}
                <span style={{ color: "var(--accent)" }}>~75%</span>{" "}
                by enforcing readiness before allocation.
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


/* --- Section from case-manufacturing/app.jsx --- */


export default function ManufacturingControlTower() {
  return (
    <div className="case-study-theme">
      <CaseNav/>
      <CaseHero/>
      <WhoFor/>
      <Breaking/>
      <Incident/>
      <MidCTA
        headline="Recognise your dock?"
        sub="Skip the deep dive — 30 min, no slides. We'll map where the workflow is breaking."
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


