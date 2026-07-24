import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { Logo, Icon, Arrow, Reveal } from '../components/site-ui';
import { ContactForm } from './components/contact-form';
import './case-studies.css';
import { ArrowRight, ArrowUpRight, IconCoordination, IconVisibility, IconSequencing, IconPlanning, IconLatency, LayerGlyph } from './components/icons';


/* --- Section from components/nav.jsx --- */


function Nav() {
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
    ["Case Studies", "#systems"],
    ["Architecture", "#architecture"],
    ["Proof", "#proof"],
    ["Contact", "#audit"],
  ];

  const closeMenu = () => setOpen(false);

  const mobileMenu = (
    <div
      className={`nav-drawer${open ? " open" : ""}`}
      aria-hidden={!open}
      onClick={closeMenu}
    >
      <div className="nav-drawer-panel" onClick={(e) => e.stopPropagation()}>
        <div className="nav-drawer-header">
          <Link to="/" className="brand" onClick={closeMenu}>
            <Logo height={40} mode="light" />
          </Link>
          <button type="button" className="nav-drawer-close" aria-label="Close menu" onClick={closeMenu}>
            <Icon name="X" size={22} stroke={2.2} color="var(--text)" />
          </button>
        </div>
        <nav className="nav-drawer-links" aria-label="Mobile">
          {links.map(([label, href]) => (
            <a key={label} href={href} onClick={closeMenu}>
              <span>{label}</span>
              <Icon name="ArrowUpRight" size={18} stroke={2} color="var(--faint)" />
            </a>
          ))}
        </nav>
        <div className="nav-drawer-footer">
          <a href="#audit" className="btn btn-primary" onClick={closeMenu}>
            Get System Map <ArrowRight />
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <nav className={`nav${scrolled ? " scrolled" : ""}${open ? " menu-open" : ""}`} data-screen-label="Nav">
      <div className="wrap nav-inner">
        <Link to="/" className="brand" onClick={closeMenu}>
          <Logo height={40} mode="light" />
          <span className="brand-tag">OPERATIONAL SYSTEMS</span>
        </Link>

        <div className="nav-links">
          <a href="#systems">Case Studies</a>
          <a href="#architecture">Architecture</a>
          <a href="#proof">Proof</a>
        </div>

        <div className="nav-cta">
          <a href="#audit" className="btn btn-primary" style={{ padding: "9px 14px", fontSize: 13 }}>
            Get System Map<ArrowRight />
          </a>
        </div>

        <button
          type="button"
          className="nav-burger"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((isOpen) => !isOpen)}
        >
          <Icon name={open ? "X" : "Menu"} size={24} stroke={2.2} color="var(--text)" />
        </button>
      </div>

      {typeof document !== "undefined" ? createPortal(mobileMenu, document.body) : null}
    </nav>
  );
}


/* --- Section from components/hero.jsx --- */


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
    <a href="#audit" className="linkedin-banner" aria-label="Saw our LinkedIn post — book an audit">
      <span className="li-icon" aria-hidden="true">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
          <path d="M3.5 3a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM.5 5.5h2.7V14H.5V5.5zm4.7 0h2.6v1.2h.03c.36-.66 1.24-1.36 2.55-1.36 2.73 0 3.23 1.7 3.23 3.92V14h-2.7v-3.78c0-.9-.02-2.07-1.27-2.07-1.27 0-1.46.98-1.46 2v3.85H5.2V5.5z"/>
        </svg>
      </span>
      <span className="li-text">
        <b>Saw our LinkedIn post?</b> Skip the deck — book a 30-min audit.
      </span>
      <span className="li-arrow">→</span>
    </a>
  );
}

function HeroDiagram() {
  // Stacked architecture viz: 5 horizontal layers
  // Top → Bottom: Decision, Planning, Orchestration, Visibility, Execution
  // Data flows UP (left edge), Decisions flow DOWN (right edge)
  const layers = [
    { key: "dec",  label: "Decision",      sub: "L05", nodes: 3 },
    { key: "plan", label: "Planning",      sub: "L04", nodes: 5 },
    { key: "orch", label: "Orchestration", sub: "L03", nodes: 7 },
    { key: "vis",  label: "Visibility",    sub: "L02", nodes: 9 },
    { key: "exec", label: "Execution",     sub: "L01", nodes: 11 },
  ];

  return (
    <div style={{ position: "relative" }}>
      {}
      <div style={{
        position: "relative",
        background: "var(--panel)",
        border: "1px solid var(--line)",
        borderRadius: 22,
        padding: 22,
        overflow: "hidden",
        boxShadow: "0 20px 50px -12px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.8)",
      }}>
        {}
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
            borderLeft: "1px solid var(--accent)",
            opacity: 0.7,
          }}/>
        ))}

        {}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          paddingBottom: 16, marginBottom: 20,
          borderBottom: "1px dashed var(--line-2)",
          fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.1em",
          color: "var(--muted)", textTransform: "uppercase",
        }}>
          <span style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <span style={{ color: "var(--accent)" }}>● LIVE</span>
            <span>SYS / ARCHITECTURE.MAP</span>
          </span>
          <span>NODES: 35 / LINKS: 42</span>
        </div>

        {}
        <div style={{ position: "relative", display: "grid", gridTemplateColumns: "44px 1fr 44px", gap: 0 }}>
          {}
          <FlowGutter direction="up" label="DATA" />

          {}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {layers.map((L, idx) => (
              <Layer key={L.key} layer={L} idx={idx} total={layers.length}/>
            ))}
          </div>

          {}
          <FlowGutter direction="down" label="DECISIONS" />
        </div>

        {}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          paddingTop: 18, marginTop: 18,
          borderTop: "1px dashed var(--line-2)",
          fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.1em",
          color: "var(--muted)", textTransform: "uppercase",
        }}>
          <span>↑ Data flows up</span>
          <span>↓ Decisions flow down</span>
        </div>
      </div>
    </div>
  );
}

function Layer({ layer, idx, total }) {
  // Layer = horizontal track with N nodes
  const nodeCount = layer.nodes;
  // Highlight one or two nodes per layer (deterministic pseudo-random)
  const accentIdx = (idx * 3 + 2) % nodeCount;
  const accent2Idx = (idx * 5 + 4) % nodeCount;
  return (
    <div style={{
      position: "relative",
      background: "var(--bg-2)",
      border: "1px solid var(--line)",
      borderRadius: 10,
      padding: "12px 14px",
      overflow: "hidden",
    }}>
      {}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        marginBottom: 10,
      }}>
        <span style={{
          fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.12em",
          textTransform: "uppercase", color: "var(--text-2)",
        }}>
          <span style={{ color: "var(--muted)" }}>{layer.sub}</span>
          <span style={{ color: "var(--muted-2)", margin: "0 8px" }}>/</span>
          {layer.label}
        </span>
        <span style={{
          fontFamily: "var(--mono)", fontSize: 10, color: "var(--muted)",
          opacity: 0.7,
        }}>
          {String(nodeCount).padStart(2,"0")} nodes
        </span>
      </div>

      {}
      <div style={{
        position: "relative", height: 26,
        display: "grid",
        gridTemplateColumns: `repeat(${nodeCount}, 1fr)`,
        alignItems: "center",
        gap: 4,
      }}>
        {}
        <span style={{
          position: "absolute", left: 6, right: 6, top: "50%",
          height: 1, background: "var(--line-2)",
        }} />
        {Array.from({ length: nodeCount }).map((_, i) => {
          const isAccent = i === accentIdx;
          const isAccent2 = i === accent2Idx;
          return (
            <span key={i} style={{
              position: "relative",
              justifySelf: "center",
              width: isAccent ? 10 : 6,
              height: isAccent ? 10 : 6,
              borderRadius: "50%",
              background: isAccent ? "var(--accent)" :
                          isAccent2 ? "var(--blue)" :
                          "var(--line-3)",
              boxShadow: isAccent ? "0 0 10px var(--accent)" :
                         isAccent2 ? "0 0 8px var(--blue)" : "none",
              border: !isAccent && !isAccent2 ? "1px solid var(--line-3)" : "none",
              animation: isAccent ? "pulse-dot 2.4s ease-in-out infinite" : undefined,
              animationDelay: `${idx * 0.3}s`,
            }}/>
          );
        })}
      </div>

      {}
      <span style={{
        position: "absolute", left: 0, right: 0, top: 0, height: "200%",
        background: "linear-gradient(180deg, transparent 0%, rgba(37,99,255,0.04) 50%, transparent 100%)",
        animation: `sweep 6s linear infinite`, animationDelay: `${idx * 1.1}s`,
        pointerEvents: "none",
      }}/>
    </div>
  );
}

function FlowGutter({ direction, label }) {
  // vertical channel with animated dashed line
  const up = direction === "up";
  return (
    <div style={{
      position: "relative",
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "space-between",
      paddingTop: 6, paddingBottom: 6,
    }}>
      <span style={{
        fontFamily: "var(--mono)", fontSize: 9.5, letterSpacing: "0.18em",
        color: "var(--muted)", writingMode: "vertical-rl",
        transform: up ? "rotate(180deg)" : "rotate(0)",
        textTransform: "uppercase",
        marginTop: up ? 15 : 0
      }}>
        {label}
      </span>
      <svg width="14" height="100%" viewBox="0 0 14 200" preserveAspectRatio="none"
           style={{ position: "absolute", inset: 0, height: "100%", left: "50%", transform: "translateX(-50%)" }}>
        <line x1="7" y1="0" x2="7" y2="200" stroke="var(--line-2)" strokeWidth="1" strokeDasharray="3 4"
              style={{ animation: `flow 1.4s linear infinite`, animationDirection: up ? "reverse" : "normal" }}/>
        {}
        {up ? (
          <path d="M3 8 L7 2 L11 8" stroke="var(--accent)" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
        ) : (
          <path d="M3 192 L7 198 L11 192" stroke="var(--accent)" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
        )}
      </svg>
    </div>
  );
}


function Hero() {
  return (
    <section className="hero" data-screen-label="Hero">
      <div className="bg-grid"/>
      <div className="glow-spot"/>
      <div className="wrap hero-grid">
        {}
        <div>
          <LinkedInBanner/>
          <span className="hero-tag">
            <span className="pill">v2026</span>
            Custom operational software + AI systems
          </span>

          <h1 className="display">
            Operational systems<br/>
            that <em>actually</em> work.
          </h1>

          <p className="lead" style={{ marginBottom: 16 }}>
            If your operations run on calls, spreadsheets, or WhatsApp — <span style={{ color: "var(--text)", fontWeight: 500 }}>this is the system layer you're missing.</span>
          </p>

          <p style={{ fontSize: 16, lineHeight: 1.65, color: "var(--text-2)", maxWidth: "62ch", margin: "0 0 34px" }}>
            We build custom control towers, inventory intelligence, dispatch orchestration, predictive planning, and decision intelligence systems that enforce workflows, connect teams, and eliminate coordination gaps.
          </p>

          <div className="hero-cta">
            <a href="#audit" className="btn btn-primary">
              Find your system<ArrowRight/>
            </a>
            <a href="#systems" className="btn btn-ghost">
              Get your operational system map<ArrowUpRight/>
            </a>
          </div>

          { }
          <div className="hero-proof">
            <div className="hero-proof-item">
              <b>~75%</b>
              <span>delay reduction</span>
            </div>
            <div className="hero-proof-item">
              <b>~70%</b>
              <span>leakage cut</span>
            </div>
            <div className="hero-proof-item">
              <b>30–50%</b>
              <span>faster decisions</span>
            </div>
            <div className="hero-proof-item hero-proof-meta">
              <b><span className="live-dot"/>SYSTEM MAP</b>
              <span>30-min diagnostic</span>
            </div>
          </div>
        </div>

        { }
        <div>
          <HeroDiagram/>
        </div>
      </div>
    </section>
  );
}



/* --- Section from components/failures.jsx --- */


const FAILURES = [
  {
    id: "coord",
    Icon: IconCoordination,
    code: "F.01",
    title: "Coordination gaps",
    body: "Every handoff is a phone call, WhatsApp message, or follow-up.",
  },
  {
    id: "vis",
    Icon: IconVisibility,
    code: "F.02",
    title: "Visibility gaps",
    body: "Real-time decisions are made on data that is already outdated.",
  },
  {
    id: "seq",
    Icon: IconSequencing,
    code: "F.03",
    title: "Sequencing failures",
    body: "Right thing, wrong order. One missed gate cascades downstream.",
  },
  {
    id: "plan",
    Icon: IconPlanning,
    code: "F.04",
    title: "Planning failures",
    body: "Stockout and overstock happen at the same time.",
  },
  {
    id: "lat",
    Icon: IconLatency,
    code: "F.05",
    title: "Decision latency",
    body: "The window closes before anyone agrees on what is true.",
  },
];

function FailureCard({ f, idx }) {
  return (
    <article style={{
      position: "relative",
      background: "var(--panel)",
      border: "1px solid var(--line)",
      borderRadius: 18,
      padding: 26,
      boxShadow: "0 2px 8px rgba(11,17,32,0.04)",
      transition: "all .25s ease",
      transform: "translateY(0)",
      overflow: "hidden",
    }}
    onMouseEnter={e => {
      e.currentTarget.style.borderColor = "var(--accent)";
      e.currentTarget.style.transform = "translateY(-3px)";
      e.currentTarget.style.boxShadow = "0 12px 30px rgba(11,17,32,0.06), 0 2px 8px rgba(11,17,32,0.03)";
    }}
    onMouseLeave={e => {
      e.currentTarget.style.borderColor = "var(--line)";
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "0 2px 8px rgba(11,17,32,0.04)";
    }}
    >
      {}
      <span style={{
        fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.12em",
        color: "var(--muted)", display: "block", marginBottom: 18,
      }}>
        {f.code}
      </span>

      {}
      <div style={{
        width: 48, height: 48, borderRadius: 12,
        background: "var(--blue-50)",
        border: "1px solid var(--blue-100)",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "var(--blue)",
        marginBottom: 22,
        flexShrink: 0
      }}>
        <f.Icon/>
      </div>

      <h3 style={{
        fontSize: 19, fontWeight: 500, letterSpacing: "-0.01em",
        margin: "0 0 10px", color: "var(--blue)",
      }}>{f.title}</h3>
      <p style={{
        fontSize: 14, lineHeight: 1.55, color: "var(--muted)",
        margin: 0,
      }}>{f.body}</p>

      {}
      <span aria-hidden="true" style={{
        position: "absolute", top: 14, right: 14,
        width: 6, height: 6, borderRadius: "50%",
        background: "var(--muted-2)",
      }}/>
    </article>
  );
}

function Failures() {
  return (
    <section id="failure" className="section" data-screen-label="Failures">
      <div className="wrap">
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: 56, gap: 40, flexWrap: "wrap" }}>
          <div style={{ maxWidth: 720 }}>
            <span className="eyebrow"><span className="num">01</span><span className="bar"/>Failure modes</span>
            <h2 className="h2" style={{ marginTop: 18 }}>
              The root causes behind<br/>
              <em>operational chaos</em>.
            </h2>
          </div>
          <p style={{ maxWidth: 380, color: "var(--muted)", fontSize: 14.5, lineHeight: 1.6, margin: 0 }}>
            These are structural failures — not people problems. They repeat across logistics, manufacturing, inventory, planning, and leadership operations.
          </p>
        </header>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: 14,
        }} className="failures-grid">
          {FAILURES.map((f, i) => <FailureCard key={f.id} f={f} idx={i}/>)}
        </div>

        <style>{`
          @media (max-width: 1100px) { .failures-grid { grid-template-columns: repeat(3, 1fr) !important; } }
          @media (max-width: 720px)  { .failures-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        `}</style>
      </div>
    </section>
  );
}



/* --- Section from components/cases.jsx --- */


// Map case-study system ids → case-study HTML files (when published)
const CASE_HREFS = {
  mfg:  "/case-studies/manufacturing-control-tower",
  inv:  "/case-studies/inventory-intelligence",
  log:  "/case-studies/logistics-control-tower",
  pred: "/case-studies/predictive-inventory-planning",
  dec:  "/case-studies/decision-intelligence",
  care: "/case-studies/connected-care-operations",
};
function caseHref(id) { return CASE_HREFS[id] || "#"; }

const SYSTEMS = [
  {
    id: "mfg",
    code: "S.01",
    title: "Manufacturing Control Tower",
    glyph: "exec",
    tag: "EXECUTION LAYER",
    problem: "Compliance delays, inventory mismatch, batch coordination gaps, and production workflows that depend on the right person being available.",
    detail: "For teams where material readiness is verified manually, dispatch gates happen too late, and leadership sees problems only after escalation.",
    metrics: [
      { v: "~75%", l: "inventory mismatch reduction" },
      { v: "~70%", l: "batch delay reduction" },
      { v: "Eliminated", l: "dock compliance failures" },
    ],
    forWho: "Plant Heads · Manufacturing Ops",
  },
  {
    id: "inv",
    code: "S.02",
    title: "Inventory Intelligence System",
    glyph: "vis",
    tag: "VISIBILITY + MARGIN",
    problem: "Inventory leakage, peak-hour stockouts, emergency procurement, and vendor decisions made by memory instead of performance data.",
    detail: "For hospitality, F&B, retail, and fast-moving inventory teams where stock moves quickly but the system only catches up at the end of the shift.",
    metrics: [
      { v: "~70%", l: "inventory leakage reduction" },
      { v: "~80%", l: "emergency procurement cut" },
      { v: "15–25%", l: "procurement cost improvement" },
    ],
    forWho: "Inventory Heads · F&B Ops",
  },
  {
    id: "log",
    code: "S.03",
    title: "Logistics Control Tower",
    glyph: "orch",
    tag: "ORCHESTRATION",
    problem: "Dispatch planned on calls, WhatsApp, and spreadsheets — with drivers allocated before shipments are actually ready.",
    detail: "For teams where drivers wait at warehouses, SLA breaches cascade downstream, and status is still checked by calling the driver.",
    metrics: [
      { v: "~75%", l: "dispatch delay reduction" },
      { v: "~70%", l: "fleet idle time reduction" },
      { v: "40–50%", l: "manual coordination reduction" },
    ],
    forWho: "Logistics Managers · Fleet Ops",
  },
  {
    id: "pred",
    code: "S.04",
    title: "Predictive Inventory Planning",
    glyph: "plan",
    tag: "PLANNING LAYER",
    problem: "Stockouts and overstock happening at the same time because replenishment is driven by historical averages instead of demand signals.",
    detail: "For multi-SKU warehouses and supply teams where emergency procurement is recurring and capital is locked in slow-moving inventory.",
    metrics: [
      { v: "~75%", l: "peak stockout reduction" },
      { v: "~80%", l: "emergency procurement cut" },
      { v: "20–30%", l: "inventory turnover improvement" },
    ],
    forWho: "Supply Planners · Procurement Heads",
  },
  {
    id: "dec",
    code: "S.05",
    title: "Decision Intelligence System",
    glyph: "dec",
    tag: "DECISION LAYER",
    problem: "Three teams, three numbers, and leadership decisions delayed until the operational window has already closed.",
    detail: "For leadership teams operating across fragmented reports, stale dashboards, and conflicting KPIs that require manual reconciliation before action.",
    metrics: [
      { v: "50%+", l: "reconciliation effort reduction" },
      { v: "30–50%", l: "faster decision-making" },
      { v: "Eliminated", l: "conflicting report cycles" },
    ],
    forWho: "Founders · Leadership Teams",
  },
  {
    id: "care",
    code: "S.06",
    title: "Connected Care Operations",
    glyph: "orch",
    tag: "CARE ORCHESTRATION",
    problem: "Bookings on calls and WhatsApp, fragmented records, repeated patient intake, and follow-ups with no clear owner.",
    detail: "For multi-specialty clinics where reception reconciles schedules manually and patients resubmit the same details at every specialty handoff.",
    metrics: [
      { v: "05", l: "care stages connected" },
      { v: "One", l: "shared patient record" },
      { v: "24/7", l: "patient self-service" },
    ],
    forWho: "Clinic Ops · Care Coordinators",
  },
];

function Cases() {
  const [active, setActive] = React.useState("mfg");
  const sys = SYSTEMS.find(s => s.id === active);

  return (
    <section id="systems" className="section" style={{ background: "linear-gradient(180deg, transparent, rgba(37,99,255,0.015) 30%, transparent)" }} data-screen-label="Systems">
      <div className="wrap">
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: 56, gap: 40, flexWrap: "wrap" }}>
          <div style={{ maxWidth: 720 }}>
            <span className="eyebrow"><span className="num">02</span><span className="bar"/>Systems · Decision router</span>
            <h2 className="h2" style={{ marginTop: 18 }}>
              Find the system that fits<br/>
              <em>your operation</em>.
            </h2>
          </div>
          <p style={{ maxWidth: 380, color: "var(--muted)", fontSize: 14.5, lineHeight: 1.6, margin: 0 }}>
            Each card routes a different operational pain to the most relevant case study — so a logistics lead, plant head, or supply planner sees the problem that sounds like their day.
          </p>
        </header>

        {}
        <div className="cases-grid" style={{
          display: "grid",
          gridTemplateColumns: "minmax(280px, 380px) 1fr",
          gap: 14,
          alignItems: "stretch",
        }}>
          {}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {SYSTEMS.map((s, idx) => {
              const isActive = s.id === active;
              return (
                <button
                  key={s.id}
                  onClick={() => setActive(s.id)}
                  onMouseEnter={() => setActive(s.id)}
                  style={{
                    textAlign: "left",
                    background: isActive
                      ? "linear-gradient(180deg, rgba(37,99,255,0.06), rgba(37,99,255,0.02))"
                      : "var(--panel)",
                    border: `1px solid ${isActive ? "rgba(37,99,255,0.30)" : "var(--line)"}`,
                    borderRadius: 14,
                    padding: "16px 18px",
                    color: "var(--text)",
                    transition: "all .18s ease",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                  }}
                >
                  <span style={{
                    fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.12em",
                    color: isActive ? "var(--accent)" : "var(--muted)",
                    width: 36, flexShrink: 0,
                  }}>{s.code}</span>

                  <span style={{ flex: 1 }}>
                    <span style={{ display: "block", fontSize: 15, fontWeight: 500, letterSpacing: "-0.01em" }}>{s.title}</span>
                    <span style={{ display: "block", fontFamily: "var(--mono)", fontSize: 10.5, color: "var(--muted)", marginTop: 4, letterSpacing: "0.08em" }}>{s.tag}</span>
                  </span>

                  <span style={{
                    width: 18, height: 18, borderRadius: "50%",
                    border: `1px solid ${isActive ? "var(--accent)" : "var(--line-2)"}`,
                    display: "grid", placeItems: "center", flexShrink: 0,
                  }}>
                    {isActive && <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", boxShadow: "0 0 6px var(--accent)" }}/>}
                  </span>
                </button>
              );
            })}
          </div>

          {}
          <div style={{
            position: "relative",
            background: "var(--panel)",
            border: "1px solid var(--line)",
            borderRadius: 18,
            padding: 36,
            boxShadow: "0 10px 30px -10px rgba(0,0,0,0.04)",
            overflow: "hidden",
            minHeight: 460,
          }}>
            {}
            <span aria-hidden="true" style={{
              position: "absolute", inset: 0, pointerEvents: "none",
              backgroundImage: "linear-gradient(to right, rgba(17,24,39,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(17,24,39,0.02) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
              maskImage: "radial-gradient(ellipse 70% 60% at 80% 20%, #000, transparent 80%)",
              WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 80% 20%, #000, transparent 80%)",
              opacity: 0.6,
            }}/>

            <CaseDetail sys={sys}/>
          </div>
        </div>

        <style>{`
          @media (max-width: 900px) {
            .cases-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </section>
  );
}

function CaseDetail({ sys }) {
  return (
    <div key={sys.id} style={{
      position: "relative", display: "flex", flexDirection: "column", height: "100%",
      opacity: 1,
    }}>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32, gap: 16 }}>
        <span style={{
          fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.14em",
          color: "var(--muted)", textTransform: "uppercase",
        }}>
          <span style={{ color: "var(--accent)" }}>● </span>
          {sys.code} / {sys.tag}
        </span>
        <span style={{
          fontFamily: "var(--mono)", fontSize: 10.5, color: "var(--muted)", letterSpacing: "0.08em",
        }}>
          FOR — {sys.forWho.toUpperCase()}
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 64px", gap: 24, alignItems: "start", marginBottom: 28 }}>
        <h3 style={{
          fontSize: 36, fontWeight: 500, letterSpacing: "-0.022em", lineHeight: 1.05,
          margin: 0, color: "var(--blue)", }}>{sys.title}
        </h3>
        <div style={{
          width: 64, height: 64, borderRadius: 14,
          border: "1px solid var(--blue-100)", background: "var(--blue-50)", display: "grid", placeItems: "center", color: "var(--blue)",
        }}>
          <LayerGlyph kind={sys.glyph}/>
        </div>
      </div>

      <p style={{ fontSize: 16, lineHeight: 1.55, color: "var(--text-2)", margin: "0 0 14px", maxWidth: "60ch" }}>
        <span style={{ color: "var(--muted)", marginRight: 8, fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.1em" }}>IF THIS SOUNDS LIKE YOU</span>
        {sys.problem}
      </p>
      <p style={{ fontSize: 16, lineHeight: 1.55, color: "var(--text-2)", margin: "0 0 36px", maxWidth: "60ch" }}>
        <span style={{ color: "var(--muted)", marginRight: 8, fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.1em" }}>SYSTEM SHAPE</span>
        {sys.detail}
      </p>

      {}
      <div style={{
        marginTop: "auto",
        display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
        borderTop: "1px solid var(--line-2)", paddingTop: 24, gap: 0,
      }}>
        {sys.metrics.map((m, i) => (
          <div key={i} style={{
            padding: "4px 0",
            borderRight: i < sys.metrics.length - 1 ? "1px solid var(--line)" : "none",
            paddingLeft: i === 0 ? 0 : 24,
            paddingRight: i === sys.metrics.length - 1 ? 0 : 24,
          }}>
            <div style={{
              fontFamily: "var(--sans)", fontSize: 30, fontWeight: 500, letterSpacing: "-0.02em",
              color: "var(--blue)", lineHeight: 1,
            }}>{m.v}</div>
            <div style={{ fontSize: 12.5, color: "var(--muted)", marginTop: 8 }}>{m.l}</div>
          </div>
        ))}
      </div>

      {}
      <div style={{ marginTop: 28, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <Link to={caseHref(sys.id)} className="btn btn-ghost">
          View case study <ArrowUpRight />
        </Link>
        <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--muted)", letterSpacing: "0.08em" }}>
          NDA available on request
        </span>
      </div>
    </div>
  );
}



/* --- Section from components/architecture.jsx --- */


const ARCH_LAYERS = [
  { code: "L05", key: "dec",  label: "Decision",      blurb: "Surfaces tuned to leadership cadence", desc: "The right call, with the right context, at the right moment." },
  { code: "L04", key: "plan", label: "Planning",      blurb: "Forecasts, scenarios, replenishment",   desc: "Demand signals translated into procurement, capacity, and sequence." },
  { code: "L03", key: "orch", label: "Orchestration", blurb: "Workflow, exceptions, routing",         desc: "Work is sequenced and re-sequenced as reality changes." },
  { code: "L02", key: "vis",  label: "Visibility",    blurb: "Live operational state",                desc: "One observable state for inventory, lanes, lines, and people." },
  { code: "L01", key: "exec", label: "Execution",     blurb: "Shop floor, warehouse, vehicle, ERP",   desc: "Ground truth — where the operation actually happens." },
];

function Architecture() {
  return (
    <section id="architecture" className="section" data-screen-label="Architecture">
      <div className="wrap">
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: 56, gap: 40, flexWrap: "wrap" }}>
          <div style={{ maxWidth: 720 }}>
            <span className="eyebrow"><span className="num">04</span><span className="bar"/>Architecture</span>
            <h2 className="h2" style={{ marginTop: 18 }}>
              Five systems.<br/>
              <em>One</em> architecture.
            </h2>
          </div>
          <p style={{ maxWidth: 380, color: "var(--muted)", fontSize: 14.5, lineHeight: 1.6, margin: 0 }}>
            Every engagement plugs into the same five-layer model. Where you sit on it depends on which failure modes are costing you the most.
          </p>
        </header>

        <ArchitectureDiagram />

      </div>
    </section>
  );
}

function ArchitectureDiagram() {
  return (
    <div style={{
      position: "relative",
      background: "var(--panel)",
      border: "1px solid var(--line)",
      borderRadius: 22,
      padding: 36,
      boxShadow: "0 20px 50px -12px rgba(0,0,0,0.05)",
      overflow: "hidden",
    }}>
      {}
      <span aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "linear-gradient(to right, rgba(17,24,39,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(17,24,39,0.02) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
        maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, #000, transparent 95%)",
        WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, #000, transparent 95%)",
      }}/>

      {}
      <div style={{
        position: "relative", textAlign: "center",
        fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.18em",
        color: "var(--muted)", textTransform: "uppercase",
        marginBottom: 14,
      }}>
        Leadership · Strategic intent
      </div>

      <div className="arch-grid" style={{
        position: "relative",
        display: "grid",
        gridTemplateColumns: "160px 1fr 160px",
        gap: 0,
        alignItems: "stretch",
      }}>
        {}
        <ArchGutter
          direction="up"
          title="DATA"
          subtitle="flows up"
          captions={["Sensors", "Logs", "Scans", "Signals", "State"]}
        />

        {}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: "0 24px" }}>
          {ARCH_LAYERS.map((L, i) => (
            <ArchLayer key={L.key} L={L} i={i} total={ARCH_LAYERS.length}/>
          ))}
        </div>

        {}
        <ArchGutter
          direction="down"
          title="DECISIONS"
          subtitle="flow down"
          captions={["Strategy", "Targets", "Sequences", "Routes", "Tasks"]}
        />
      </div>

      {}
      <div style={{
        position: "relative", textAlign: "center",
        fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.18em",
        color: "var(--muted)", textTransform: "uppercase",
        marginTop: 14,
      }}>
        Operation · The real world
      </div>
    </div>
  );
}

function ArchLayer({ L, i, total }) {
  return (
    <div style={{
      position: "relative",
      border: "1px solid var(--line)",
      background: "var(--bg-2)",
      borderRadius: 12,
      padding: "20px 24px",
      display: "grid",
      gridTemplateColumns: "70px 56px 1fr auto",
      gap: 24,
      alignItems: "center",
      transition: "border-color .2s",
      overflow: "hidden",
    }}
    onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(37,99,255,0.25)"}
    onMouseLeave={e => e.currentTarget.style.borderColor = "var(--line)"}
    >
      {}
      <span style={{
        fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.14em",
        color: "var(--muted)",
      }}>{L.code}</span>

      {}
      <span style={{
        width: 48, height: 48, borderRadius: 10,
        border: "1px solid var(--blue-100)", display: "grid", placeItems: "center", color: "var(--blue)", background: "var(--blue-50)",
      }}>
        <LayerGlyph kind={L.key}/>
      </span>

      {}
      <div>
        <div style={{ fontSize: 22, fontWeight: 500, letterSpacing: "-0.015em", color: "var(--blue)", lineHeight: 1.1 }}>
          {L.label}
        </div>
        <div style={{ fontSize: 13.5, color: "var(--muted)", marginTop: 6 }}>{L.desc}</div>
      </div>

      {}
      <span style={{
        fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.1em",
        color: "var(--text-2)", textTransform: "uppercase",
        textAlign: "right", maxWidth: 220,
      }}>
        {L.blurb}
      </span>
    </div>
  );
}

function ArchGutter({ direction, title, subtitle, captions }) {
  const up = direction === "up";
  return (
    <div style={{
      position: "relative",
      display: "flex", flexDirection: "column",
      justifyContent: "space-between",
      padding: "8px 0",
    }}>
      <div style={{
        fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.18em",
        color: up ? "var(--accent)" : "var(--blue)",
        textAlign: up ? "right" : "left",
        textTransform: "uppercase",
      }}>
        {up ? "↑" : "↓"} {title}
        <div style={{ color: "var(--muted)", fontSize: 10, marginTop: 4, letterSpacing: "0.14em" }}>{subtitle}</div>
      </div>

      {}
      <div style={{
        position: "absolute", top: 38, bottom: 38, left: 0, right: 0,
        display: "flex", flexDirection: "column", justifyContent: "space-around",
        pointerEvents: "none",
      }}>
        {captions.map((c, i) => (
          <span key={i} style={{
            fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.14em",
            color: "var(--muted-2)", textAlign: up ? "right" : "left",
            paddingRight: up ? 18 : 0,
            paddingLeft: up ? 0 : 18,
            opacity: 0.85,
          }}>{c.toUpperCase()}</span>
        ))}
      </div>

      {}
      <svg width="14" height="100%" viewBox="0 0 14 400" preserveAspectRatio="none"
           style={{
             position: "absolute", top: 38, bottom: 38, height: "auto",
             left: up ? "auto" : -2, right: up ? -2 : "auto",
             width: 14,
           }}>
        <line x1="7" y1="0" x2="7" y2="400"
              stroke={up ? "rgba(37,99,255,0.4)" : "rgba(37,99,255,0.35)"}
              strokeWidth="1" strokeDasharray="3 4"
              style={{ animation: `flow 1.6s linear infinite`, animationDirection: up ? "reverse" : "normal" }}/>
      </svg>

      {}
      <div style={{
        fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.18em",
        color: "var(--muted-2)",
        textAlign: up ? "right" : "left",
      }}>
        {up ? "RAW" : "ACT"}
      </div>
    </div>
  );
}



/* --- Section from components/metrics.jsx --- */


const METRICS = [
  { v: "~75%",   l: "dispatch / coordination delay reduction",              ctx: "across manufacturing & dispatch" },
  { v: "~70%",   l: "inventory leakage reduction",            ctx: "inventory + warehouse" },
  { v: "~80%",   l: "emergency procurement reduction",    ctx: "replenishment under volatility" },
  { v: "30–50%", l: "faster decision making",       ctx: "leadership review cadence" },
];

function Metrics() {
  return (
    <section id="proof" className="section" data-screen-label="Proof" style={{
      background: "linear-gradient(180deg, transparent, rgba(37,99,255,0.015), transparent)",
    }}>
      <div className="wrap">
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: 64, gap: 40, flexWrap: "wrap" }}>
          <div style={{ maxWidth: 720 }}>
            <span className="eyebrow"><span className="num">04</span><span className="bar"/>Proof</span>
            <h2 className="h2" style={{ marginTop: 18 }}>
              Real impact.<br/>Measurable <em>change</em>.
            </h2>
          </div>
          <p style={{ maxWidth: 380, color: "var(--muted)", fontSize: 14.5, lineHeight: 1.6, margin: 0 }}>
            Across logistics, manufacturing, inventory, and leadership operations — focused on dispatch / coordination delay reduction, leakage control, procurement efficiency, and decision speed.
          </p>
        </header>

        <div className="metrics-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 0,
          borderTop: "1px solid var(--line-2)",
          borderBottom: "1px solid var(--line-2)",
        }}>
          {METRICS.map((m, i) => <MetricCell key={i} m={m} i={i}/>)}
        </div>

        <p style={{
          fontSize: 12.5, color: "var(--muted-2)", marginTop: 18,
          fontFamily: "var(--mono)", letterSpacing: "0.08em",
        }}>
          AGGREGATE · LAST 18 MONTHS · NDA SUMMARY AVAILABLE
        </p>

        <style>{`
          @media (max-width: 980px) { .metrics-grid { grid-template-columns: repeat(2, 1fr) !important; } }
          @media (max-width: 540px) { .metrics-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </div>
    </section>
  );
}

function MetricCell({ m, i }) {
  return (
    <div style={{
      padding: "40px 28px",
      borderRight: i < METRICS.length - 1 ? "1px solid var(--line)" : "none",
      position: "relative",
    }}>
      <span style={{
        fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.12em",
        color: "var(--muted)",
      }}>
        M.0{i + 1}
      </span>
      <div style={{
        fontSize: "clamp(44px, 4.4vw, 64px)",
        fontWeight: 500,
        letterSpacing: "-0.03em",
        lineHeight: 1,
        color: "var(--blue)",
        marginTop: 16,
        marginBottom: 16,
        fontFeatureSettings: '"ss01"',
      }}>{m.v}</div>
      <div style={{ fontSize: 15, color: "var(--text-2)", letterSpacing: "-0.005em" }}>{m.l}</div>
      <div style={{ fontSize: 12.5, color: "var(--muted)", marginTop: 6, lineHeight: 1.5 }}>{m.ctx}</div>
    </div>
  );
}



/* --- Section from components/cta.jsx --- */


function CTA() {
  return (
    <section id="audit" className="section" data-screen-label="CTA" style={{ borderTop: 0, padding: "120px 0 80px" }}>
      <div className="wrap">
        <div style={{
          position: "relative",
          background: "linear-gradient(180deg, rgba(15,18,26,0.95), rgba(9,11,16,0.95))",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 24,
          padding: "72px 64px",
          overflow: "hidden",
        }} className="cta-card">
          {}
          <span aria-hidden="true" style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse 60% 80% at 80% 30%, #000 0%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse 60% 80% at 80% 30%, #000 0%, transparent 80%)",
          }}/>
          {}
          <span aria-hidden="true" style={{
            position: "absolute", right: -120, top: -120, width: 460, height: 460, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(37,99,255,0.18), rgba(37,99,255,0.04) 40%, transparent 70%)",
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
              borderLeft: "1px solid var(--muted)",
              opacity: 0.5,
            }}/>
          ))}

          <div style={{ position: "relative", display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 60, alignItems: "center" }} className="cta-inner">
            <div>
              <span className="eyebrow" style={{ color: "var(--accent)" }}>
                <span className="dot"/>BOOK A 30-MIN AUDIT
              </span>
              <h2 className="h2" style={{ marginTop: 22, marginBottom: 22, color: "#fff" }}>
                Not sure which system your operation needs?<br/>Get your <em>operational system map</em>.
              </h2>
              <p style={{ fontSize: 17, lineHeight: 1.55, color: "rgba(255,255,255,0.7)", margin: 0, maxWidth: "50ch" }}>
                You talk. We map your gaps against the five failure modes, locate what's actually costing you money, and tell you what to build before you build it. If we can't help, we'll say so on the call.
              </p>

              <div style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 32, flexWrap: "wrap" }}>
                {}
                <a href="mailto:hello@keymouseit.com" className="btn btn-ghost" style={{ padding: "14px 22px", fontSize: 14.5, color: "#fff", borderColor: "rgba(255,255,255,0.2)" }}>
                  hello@keymouseit.com <ArrowUpRight />
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
        </div>

        <style>{`
          @media (max-width: 900px) {
            .cta-inner { grid-template-columns: 1fr !important; }
            .cta-card { padding: 48px 28px !important; }
          }
        `}</style>
      </div>
    </section>
  );
}


function AuditCardDummy() {
  // Real-feeling availability slots — high-conversion, lower friction than a form.
  const slots = [
    { day: "Tue", date: "27 May", time: "10:30",    tz: "IST",  open: true  },
    { day: "Wed", date: "28 May", time: "16:00",    tz: "IST",  open: true  },
    { day: "Thu", date: "29 May", time: "09:00",    tz: "GST",  open: true  },
    { day: "Fri", date: "30 May", time: "—",        tz: "FULL", open: false },
  ];
  const [picked, setPicked] = React.useState(0);

  return (
    <div style={{
      position: "relative",
      background: "rgba(8,10,15,0.6)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 16,
      padding: "20px 20px 22px",
      backdropFilter: "blur(10px)",
    }}>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        paddingBottom: 14, marginBottom: 14,
        borderBottom: "1px dashed rgba(255,255,255,0.1)",
        fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.14em",
        color: "rgba(255,255,255,0.5)", textTransform: "uppercase",
      }}>
        <span><span style={{ color: "var(--accent)" }}>●</span> NEXT AVAILABLE</span>
        <span>30 MIN · ZOOM</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 }}>
        {slots.map((s, i) => {
          const active = i === picked && s.open;
          return (
            <button
              key={i}
              onClick={() => s.open && setPicked(i)}
              disabled={!s.open}
              style={{
                display: "grid",
                gridTemplateColumns: "40px 90px 1fr auto",
                gap: 12, alignItems: "center",
                padding: "10px 12px",
                background: active ? "rgba(37,99,255,0.06)" : "rgba(255,255,255,0.015)",
                border: `1px solid ${active ? "rgba(37,99,255,0.40)" : "rgba(255,255,255,0.08)"}`,
                borderRadius: 10,
                color: s.open ? "#fff" : "rgba(255,255,255,0.4)",
                cursor: s.open ? "pointer" : "not-allowed",
                opacity: s.open ? 1 : 0.5,
                textAlign: "left",
                transition: "all .15s ease",
              }}
            >
              <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: active ? "var(--accent)" : "var(--muted)", letterSpacing: "0.08em" }}>
                {s.day.toUpperCase()}
              </span>
              <span style={{ fontFamily: "var(--mono)", fontSize: 12, color: s.open ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.4)" }}>
                {s.date}
              </span>
              <span style={{ fontSize: 13.5, fontWeight: 500, letterSpacing: "-0.005em" }}>
                {s.time}
                <span style={{ fontFamily: "var(--mono)", fontSize: 10.5, color: "rgba(255,255,255,0.5)", marginLeft: 8, letterSpacing: "0.08em" }}>
                  {s.tz}
                </span>
              </span>
              <span style={{
                width: 16, height: 16, borderRadius: "50%",
                border: `1px solid ${active ? "var(--accent)" : "rgba(255,255,255,0.15)"}`,
                display: "grid", placeItems: "center", flexShrink: 0,
              }}>
                {active && <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", boxShadow: "0 0 6px var(--accent)" }}/>}
              </span>
            </button>
          );
        })}
      </div>

      <a href="#" className="btn btn-primary" style={{
        width: "100%", justifyContent: "center", padding: "13px 18px", fontSize: 14,
      }}>
        Request system map <ArrowRight/>
      </a>

      <div style={{
        marginTop: 14,
        fontFamily: "var(--mono)", fontSize: 10.5, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em",
        display: "flex", justifyContent: "space-between",
      }}>
        <span>NO PITCH</span><span>NO DECK</span><span>NDA OK</span>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="foot" id="contact" data-screen-label="Footer">
      <div className="wrap">
        <div className="row" style={{ alignItems: "flex-start", marginBottom: 40 }}>
          <div style={{ maxWidth: 360 }}>
            <Link to="/" className="brand" style={{ display: "inline-flex", alignItems: "center", marginBottom: 18 }}>
              <Logo height={40} mode="light" />
            </Link>
            <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "var(--muted)", margin: "14px 0 0" }}>
              Custom operational software and AI systems for manufacturing, logistics, supply chain, and leadership teams.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(140px, 1fr))", gap: 40 }}>
            <FootCol title="Systems" links={["Manufacturing Control Tower","Inventory Intelligence","Logistics Control Tower","Predictive Planning","Decision Intelligence","Connected Care Operations"]}/>
            {}
            <FootCol title="Contact" links={["hello@keymouseit.com"]}/>
          </div>
        </div>

        <div className="row" style={{
          paddingTop: 24, borderTop: "1px solid var(--line)",
          fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.1em", color: "var(--muted-2)",
        }}>
          <span>© 2026 KEYMOUSEIT · OPERATIONAL SYSTEMS</span>
          <span><span style={{ color: "var(--accent)" }}>●</span> ACCEPTING ENGAGEMENTS · Q3 ’26</span>
        </div>
      </div>
    </footer>
  );
}

const LINK_MAP = {
  "Manufacturing Control Tower": "/case-studies/manufacturing-control-tower",
  "Inventory Intelligence": "/case-studies/inventory-intelligence",
  "Logistics Control Tower": "/case-studies/logistics-control-tower",
  "Predictive Planning": "/case-studies/predictive-inventory-planning",
  "Decision Intelligence": "/case-studies/decision-intelligence",
  "Connected Care Operations": "/case-studies/connected-care-operations",
  "hello@keymouseit.com": "mailto:hello@keymouseit.com"
};

function FootCol({ title, links }) {
  return (
    <div>
      <div style={{
        fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.14em",
        textTransform: "uppercase", color: "var(--text-2)",
        marginBottom: 16,
      }}>{title}</div>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
        {links.map((l, i) => {
          const url = LINK_MAP[l];
          const isInternal = url && url.startsWith('/');
          return (
            <li key={i}>
              {isInternal ? (
                <Link to={url} style={{ fontSize: 13.5, color: "var(--muted)", transition: "color .15s" }}
                   onMouseEnter={e => e.currentTarget.style.color = "var(--text)"}
                   onMouseLeave={e => e.currentTarget.style.color = "var(--muted)"}>
                  {l}
                </Link>
              ) : (
                <a href={url || "#"} style={{ fontSize: 13.5, color: "var(--muted)", transition: "color .15s" }}
                   onMouseEnter={e => e.currentTarget.style.color = "var(--text)"}
                   onMouseLeave={e => e.currentTarget.style.color = "var(--muted)"}>
                  {l}
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}




/* --- Section from components/conversion.jsx --- */



function SelfIdentification() {
  const items = [
    "A workflow stalls when the right person isn't available",
    "Dispatch depends on calls, spreadsheets, or WhatsApp follow-ups",
    "Stockouts happen even when inventory exists somewhere",
    "Compliance is checked at the end — not enforced upstream",
    "Leadership decisions happen on outdated or conflicting data",
  ];
  return (
      <section data-screen-label="Self-ID" style={{ borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", background: "linear-gradient(180deg, var(--bg-2), transparent)" }}>
        <div className="wrap" style={{ paddingTop: 24, paddingBottom: 24 }}>
          <div className="self-id-grid" style={{ display: "grid", gridTemplateColumns: "260px repeat(5, 1fr)", gap: 0, border: "1px solid var(--line)", borderRadius: 18, overflow: "hidden", background: "var(--panel)", boxShadow: "0 2px 8px rgba(11,17,32,0.04)" }}>
            <div style={{ padding: 24, background: "var(--bg-2)", borderRight: "1px solid var(--line)" }}>
              <h3 style={{ margin: 0, fontSize: 22, lineHeight: 1.05, letterSpacing: "-0.02em", color: "var(--blue)" }}>This is what broken operations look like:</h3>
            </div>
            {items.map((item, i) => (
                <div key={i} style={{ padding: 22, borderRight: i < items.length - 1 ? "1px solid var(--line)" : "none" }}>
                  <div style={{ width: 34, height: 34, borderRadius: 12, display: "grid", placeItems: "center", marginBottom: 14, background: "rgba(37,99,255,0.08)", border: "1px solid rgba(37,99,255,0.20)", color: "var(--accent)", fontFamily: "var(--mono)", fontSize: 12 }}>0{i+1}</div>
                  <p style={{ margin: 0, color: "var(--text-2)", fontSize: 13.5, lineHeight: 1.5 }}>{item}</p>
                </div>
            ))}
          </div>
        </div>
        <style>{`@media (max-width: 980px){.self-id-grid{grid-template-columns:1fr!important}.self-id-grid>div{border-right:0!important;border-bottom:1px solid var(--line)!important}}`}</style>
      </section>
  );
}

function RealitySnapshots() {
  const stories = [
    ["Logistics", "A driver is allocated before the shipment is ready. The first delay pushes three downstream deliveries outside their SLA window."],
    ["Manufacturing", "A batch reaches the dock before compliance is aligned. Trucks are staged, product is loaded, and the release gets held for hours."],
    ["Inventory", "A top-selling SKU runs out during peak demand while working capital sits locked in slow-moving stock."],
  ];
  return (
      <section className="section" data-screen-label="Reality" style={{ paddingTop: 60, paddingBottom: 60 }}>
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "0.8fr 1.2fr", gap: 28, alignItems: "start" }} className="reality-grid">
            <div>
              <span className="eyebrow"><span className="num">03</span><span className="bar"/>Reality snapshots</span>
              <h2 className="h2" style={{ marginTop: 18 }}>This is what it looks like <em>on the ground</em>.</h2>
            </div>
            <div style={{ display: "grid", gap: 12 }}>
              {stories.map(([label, text], i) => (
                  <div key={label} style={{ padding: 22, border: "1px solid var(--line)", borderRadius: 16, background: "var(--panel)", boxShadow: "0 2px 8px rgba(11,17,32,0.04)" }}>
                    <span style={{ fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.12em", color: "var(--accent)", textTransform: "uppercase" }}>{label}</span>
                    <p style={{ margin: "10px 0 0", color: "var(--text-2)", lineHeight: 1.6, fontSize: 15.5 }}>{text}</p>
                  </div>
              ))}
            </div>
          </div>
        </div>
        <style>{`@media (max-width: 900px){.reality-grid{grid-template-columns:1fr!important}}`}</style>
      </section>
  );
}

function TrustLayer() {
  const items = [
    "Built across logistics, manufacturing, hospitality, and supply chain",
    "Designed for messy real-world workflows — not ideal process diagrams",
    "Custom-built per environment, team structure, and operating rhythm",
    "Not dashboards that sit unused — operational infrastructure teams run on",
  ];
  return (
      <section data-screen-label="Trust-Layer" style={{ padding: "40px 0 20px" }}>
        <div className="wrap">
          <div style={{ border: "1px solid var(--line)", borderRadius: 22, padding: 32, background: "linear-gradient(135deg, rgba(37,99,255,0.08), rgba(255,255,255,0.015))" }}>
            <div style={{ display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: 30, alignItems: "center" }} className="trust-layer-grid">
              <div>
                <span className="eyebrow"><span className="dot"/>Built for real-world operations</span>
                <h2 style={{ margin: "14px 0 0", fontSize: 32, lineHeight: 1.05, letterSpacing: "-0.02em", color: "var(--blue)" }}>Trusted by operations that can’t afford chaos.</h2>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }} className="trust-points">
                {items.map((it, i) => <div key={i} style={{ padding: 16, border: "1px solid var(--line)", borderRadius: 14, background: "var(--panel)", color: "var(--text-2)", fontSize: 13.5, lineHeight: 1.5 }}>{it}</div>)}
              </div>
            </div>
          </div>
        </div>
        <style>{`@media(max-width:900px){.trust-layer-grid{grid-template-columns:1fr!important}.trust-points{grid-template-columns:1fr!important}}`}</style>
      </section>
  );
}


// Trust strip — sits right after hero. Tells LinkedIn skimmers
// "this is for someone like me" in one scan. Sector chips, not fake logos.
function TrustStrip() {
  const sectors = [
    "Discrete Manufacturing",
    "Process Manufacturing",
    "3PL & Logistics",
    "Pharma Supply Chain",
    "FMCG & D2C",
    "Industrial Distribution",
  ];
  return (
      <section className="trust-strip" data-screen-label="Trust">
        <div className="wrap" style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: 32, flexWrap: "wrap",
          padding: "26px 32px",
        }}>
        <span style={{
          fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.14em",
          color: "var(--muted)", textTransform: "uppercase",
          whiteSpace: "nowrap",
        }}>
          <span style={{ color: "var(--accent)" }}>●</span> BUILT WITH OPS TEAMS IN
        </span>
          <div style={{
            display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center",
            flex: 1, justifyContent: "center", minWidth: 320,
          }}>
            {sectors.map((s, i) => (
                <span key={i} style={{
                  fontSize: 12.5,
                  fontFamily: "var(--mono)", letterSpacing: "0.04em",
                  color: "var(--text-2)",
                  padding: "6px 12px",
                  border: "1px solid var(--line)", borderRadius: 999,
                  background: "var(--panel)",
                  textTransform: "uppercase",
                }}>{s}</span>
            ))}
          </div>
          <span style={{
            fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.14em",
            color: "var(--muted)", textTransform: "uppercase",
          }}>
          INDIA · MENA · SEA
        </span>
        </div>
        <style>{`
        .trust-strip {
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
          background: linear-gradient(180deg, var(--bg-2), transparent);
        }
        @media (max-width: 720px) {
          .trust-strip .wrap > span { display: none; }
        }
      `}</style>
      </section>
  );
}

// Mid-page CTA — placed after Cases for skimmers who decide there.
function MidCTA() {
  return (
      <section data-screen-label="Mid-CTA" style={{ padding: "20px 0 60px" }}>
        <div className="wrap">
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            gap: 28, padding: "22px 28px", flexWrap: "wrap",
            background: "linear-gradient(90deg, rgba(37,99,255,0.06), rgba(37,99,255,0.0))",
            border: "1px solid var(--line)",
            borderLeft: "2px solid var(--accent)",
            borderRadius: 14,
          }}>
            <div>
              <div style={{ fontSize: 17, fontWeight: 500, letterSpacing: "-0.01em", color: "var(--blue)", marginBottom: 4 }}>Recognise your operation in one of these?
              </div>
              <div style={{ fontSize: 13.5, color: "var(--muted)" }}>
                Skip the deep dive. Get your operational system map — we’ll identify the missing layer behind the repeated issue.
              </div>
            </div>
            <a href="#audit" className="btn btn-primary">
              Get System Map <ArrowRight />
            </a>
          </div>
        </div>
      </section>
  );
}

// Mobile sticky CTA bar
function MobileCTA() {
  return (
      <div className="mobile-cta" aria-hidden="false">
        <div className="slot">
          <span className="live-dot"/>
          30-min system map · no obligation
        </div>
        <div className="row">
          <a href="#audit" className="btn btn-primary">
            Get System Map <ArrowRight/>
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









/* --- Section from components/tweaks-panel.jsx --- */

// tweaks-panel.jsx
// Reusable Tweaks shell + form-control helpers.
//
// Owns the host protocol (listens for __activate_edit_mode / __deactivate_edit_mode,
// posts __edit_mode_available / __edit_mode_set_keys / __edit_mode_dismissed) so
// individual prototypes don't re-roll it. Ships a consistent set of controls so you
// don't hand-draw <input type="range">, segmented radios, steppers, etc.
//
// Usage (in an HTML file that loads React + Babel):
//
//   const TWEAK_DEFAULTS = {
//     "primaryColor": "#D97757",
//     "palette": ["#D97757", "#29261b", "#f6f4ef"],
//     "fontSize": 16,
//     "density": "regular",
//     "dark": false
//   };
//
//   export default function CaseStudiesIndex() {
//     const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
//     return (
//       <div style={{ fontSize: t.fontSize, color: t.primaryColor }}>
//         Hello
//         <TweaksPanel>
//           <TweakSection label="Typography" />
//           <TweakSlider label="Font size" value={t.fontSize} min={10} max={32} unit="px"
//                        onChange={(v) => setTweak('fontSize', v)} />
//           <TweakRadio  label="Density" value={t.density}
//                        options={['compact', 'regular', 'comfy']}
//                        onChange={(v) => setTweak('density', v)} />
//           <TweakSection label="Theme" />
//           <TweakColor  label="Primary" value={t.primaryColor}
//                        options={['#D97757', '#2A6FDB', '#1F8A5B', '#7A5AE0']}
//                        onChange={(v) => setTweak('primaryColor', v)} />
//           <TweakColor  label="Palette" value={t.palette}
//                        options={[['#D97757', '#29261b', '#f6f4ef'],
//                                  ['#475569', '#0f172a', '#f1f5f9']]}
//                        onChange={(v) => setTweak('palette', v)} />
//           <TweakToggle label="Dark mode" value={t.dark}
//                        onChange={(v) => setTweak('dark', v)} />
//         </TweaksPanel>
//       </div>
//     );
//   }
//
// ─────────────────────────────────────────────────────────────────────────────

const __TWEAKS_STYLE = `
  .twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;
    max-height:calc(100vh - 32px);display:flex;flex-direction:column;
    transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom right;
    background:rgba(250,249,247,.78);color:#29261b;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:.5px solid rgba(255,255,255,.6);border-radius:14px;
    box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);
    font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;
    padding:10px 8px 10px 14px;cursor:move;user-select:none}
  .twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
  .twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);
    width:22px;height:22px;border-radius:6px;cursor:default;font-size:13px;line-height:1}
  .twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
  .twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;
    overflow-y:auto;overflow-x:hidden;min-height:0;
    scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.15) transparent}
  .twk-body::-webkit-scrollbar{width:8px}
  .twk-body::-webkit-scrollbar-track{background:transparent;margin:2px}
  .twk-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:4px;
    border:2px solid transparent;background-clip:content-box}
  .twk-body::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.25);
    border:2px solid transparent;background-clip:content-box}
  .twk-row{display:flex;flex-direction:column;gap:5px}
  .twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
  .twk-lbl{display:flex;justify-content:space-between;align-items:baseline;
    color:rgba(41,38,27,.72)}
  .twk-lbl>span:first-child{font-weight:500}
  .twk-val{color:rgba(41,38,27,.5);font-variant-numeric:tabular-nums}

  .twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(41,38,27,.45);padding:10px 0 0}
  .twk-sect:first-child{padding-top:0}

  .twk-field{appearance:none;box-sizing:border-box;width:100%;min-width:0;height:26px;padding:0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;
    background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}
  .twk-field:focus{border-color:rgba(0,0,0,.25);background:rgba(255,255,255,.85)}
  select.twk-field{padding-right:22px;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(0,0,0,.5)' d='M0 0h10L5 6z'/></svg>");
    background-repeat:no-repeat;background-position:right 8px center}

  .twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:4px;margin:6px 0;
    border-radius:999px;background:rgba(0,0,0,.12);outline:none}
  .twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;
    width:14px;height:14px;border-radius:50%;background:#fff;
    border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}
  .twk-slider::-moz-range-thumb{width:14px;height:14px;border-radius:50%;
    background:#fff;border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}

  .twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;
    background:rgba(0,0,0,.06);user-select:none}
  .twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;
    background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);
    transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
  .twk-seg.dragging .twk-seg-thumb{transition:none}
  .twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;
    background:transparent;color:inherit;font:inherit;font-weight:500;min-height:22px;
    border-radius:6px;cursor:default;padding:4px 6px;line-height:1.2;
    overflow-wrap:anywhere}

  .twk-toggle{position:relative;width:32px;height:18px;border:0;border-radius:999px;
    background:rgba(0,0,0,.15);transition:background .15s;cursor:default;padding:0}
  .twk-toggle[data-on="1"]{background:#34c759}
  .twk-toggle i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;
    background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s}
  .twk-toggle[data-on="1"] i{transform:translateX(14px)}

  .twk-num{display:flex;align-items:center;box-sizing:border-box;min-width:0;height:26px;padding:0 0 0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;background:rgba(255,255,255,.6)}
  .twk-num-lbl{font-weight:500;color:rgba(41,38,27,.6);cursor:ew-resize;
    user-select:none;padding-right:8px}
  .twk-num input{flex:1;min-width:0;height:100%;border:0;background:transparent;
    font:inherit;font-variant-numeric:tabular-nums;text-align:right;padding:0 8px 0 0;
    outline:none;color:inherit;-moz-appearance:textfield}
  .twk-num input::-webkit-inner-spin-button,.twk-num input::-webkit-outer-spin-button{
    -webkit-appearance:none;margin:0}
  .twk-num-unit{padding-right:8px;color:rgba(41,38,27,.45)}

  .twk-btn{appearance:none;height:26px;padding:0 12px;border:0;border-radius:7px;
    background:rgba(0,0,0,.78);color:#fff;font:inherit;font-weight:500;cursor:default}
  .twk-btn:hover{background:rgba(0,0,0,.88)}
  .twk-btn.secondary{background:rgba(0,0,0,.06);color:inherit}
  .twk-btn.secondary:hover{background:rgba(0,0,0,.1)}

  .twk-swatch{appearance:none;-webkit-appearance:none;width:56px;height:22px;
    border:.5px solid rgba(0,0,0,.1);border-radius:6px;padding:0;cursor:default;
    background:transparent;flex-shrink:0}
  .twk-swatch::-webkit-color-swatch-wrapper{padding:0}
  .twk-swatch::-webkit-color-swatch{border:0;border-radius:5.5px}
  .twk-swatch::-moz-color-swatch{border:0;border-radius:5.5px}

  .twk-chips{display:flex;gap:6px}
  .twk-chip{position:relative;appearance:none;flex:1;min-width:0;height:46px;
    padding:0;border:0;border-radius:6px;overflow:hidden;cursor:default;
    box-shadow:0 0 0 .5px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.06);
    transition:transform .12s cubic-bezier(.3,.7,.4,1),box-shadow .12s}
  .twk-chip:hover{transform:translateY(-1px);
    box-shadow:0 0 0 .5px rgba(0,0,0,.18),0 4px 10px rgba(0,0,0,.12)}
  .twk-chip[data-on="1"]{box-shadow:0 0 0 1.5px rgba(0,0,0,.85),
    0 2px 6px rgba(0,0,0,.15)}
  .twk-chip>span{position:absolute;top:0;bottom:0;right:0;width:34%;
    display:flex;flex-direction:column;box-shadow:-1px 0 0 rgba(0,0,0,.1)}
  .twk-chip>span>i{flex:1;box-shadow:0 -1px 0 rgba(0,0,0,.1)}
  .twk-chip>span>i:first-child{box-shadow:none}
  .twk-chip svg{position:absolute;top:6px;left:6px;width:13px;height:13px;
    filter:drop-shadow(0 1px 1px rgba(0,0,0,.3))}
`;

// ── useTweaks ───────────────────────────────────────────────────────────────
// Single source of truth for tweak values. setTweak persists via the host
// (__edit_mode_set_keys → host rewrites the EDITMODE block on disk).
function useTweaks(defaults) {
  const [values, setValues] = React.useState(defaults);
  // Accepts either setTweak('key', value) or setTweak({ key: value, ... }) so a
  // useState-style call doesn't write a "[object Object]" key into the persisted
  // JSON block.
  const setTweak = React.useCallback((keyOrEdits, val) => {
    const edits = typeof keyOrEdits === 'object' && keyOrEdits !== null
      ? keyOrEdits : { [keyOrEdits]: val };
    setValues((prev) => ({ ...prev, ...edits }));
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits }, '*');
    // Same-window signal so in-page listeners (deck-stage rail thumbnails)
    // can react — the parent message only reaches the host, not peers.
    window.dispatchEvent(new CustomEvent('tweakchange', { detail: edits }));
  }, []);
  return [values, setTweak];
}

// ── TweaksPanel ─────────────────────────────────────────────────────────────
// Floating shell. Registers the protocol listener BEFORE announcing
// availability — if the announce ran first, the host's activate could land
// before our handler exists and the toolbar toggle would silently no-op.
// The close button posts __edit_mode_dismissed so the host's toolbar toggle
// flips off in lockstep; the host echoes __deactivate_edit_mode back which
// is what actually hides the panel.
function TweaksPanel({ title = 'Tweaks', children }) {
  const [open, setOpen] = React.useState(false);
  const dragRef = React.useRef(null);
  const offsetRef = React.useRef({ x: 16, y: 16 });
  const PAD = 16;

  const clampToViewport = React.useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth, h = panel.offsetHeight;
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y)),
    };
    panel.style.right = offsetRef.current.x + 'px';
    panel.style.bottom = offsetRef.current.y + 'px';
  }, []);

  React.useEffect(() => {
    if (!open) return;
    clampToViewport();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', clampToViewport);
      return () => window.removeEventListener('resize', clampToViewport);
    }
    const ro = new ResizeObserver(clampToViewport);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [open, clampToViewport]);

  React.useEffect(() => {
    const onMsg = (e) => {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode') setOpen(true);
      else if (t === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);

  const dismiss = () => {
    setOpen(false);
    window.parent.postMessage({ type: '__edit_mode_dismissed' }, '*');
  };

  const onDragStart = (e) => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX, sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = (ev) => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy),
      };
      clampToViewport();
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };

  if (!open) return null;
  return (
    <>
      <style>{__TWEAKS_STYLE}</style>
      <div ref={dragRef} className="twk-panel" data-omelette-chrome=""
           style={{ right: offsetRef.current.x, bottom: offsetRef.current.y }}>
        <div className="twk-hd" onMouseDown={onDragStart}>
          <b>{title}</b>
          <button className="twk-x" aria-label="Close tweaks"
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={dismiss}>✕</button>
        </div>
        <div className="twk-body">
          {children}
        </div>
      </div>
    </>
  );
}

// ── Layout helpers ──────────────────────────────────────────────────────────

function TweakSection({ label, children }) {
  return (
    <>
      <div className="twk-sect">{label}</div>
      {children}
    </>
  );
}

function TweakRow({ label, value, children, inline = false }) {
  return (
    <div className={inline ? 'twk-row twk-row-h' : 'twk-row'}>
      <div className="twk-lbl">
        <span>{label}</span>
        {value != null && <span className="twk-val">{value}</span>}
      </div>
      {children}
    </div>
  );
}

// ── Controls ────────────────────────────────────────────────────────────────

function TweakSlider({ label, value, min = 0, max = 100, step = 1, unit = '', onChange }) {
  return (
    <TweakRow label={label} value={`${value}${unit}`}>
      <input type="range" className="twk-slider" min={min} max={max} step={step}
             value={value} onChange={(e) => onChange(Number(e.target.value))} />
    </TweakRow>
  );
}

function TweakToggle({ label, value, onChange }) {
  return (
    <div className="twk-row twk-row-h">
      <div className="twk-lbl"><span>{label}</span></div>
      <button type="button" className="twk-toggle" data-on={value ? '1' : '0'}
              role="switch" aria-checked={!!value}
              onClick={() => onChange(!value)}><i /></button>
    </div>
  );
}

function TweakRadio({ label, value, options, onChange }) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  // The active value is read by pointer-move handlers attached for the lifetime
  // of a drag — ref it so a stale closure doesn't fire onChange for every move.
  const valueRef = React.useRef(value);
  valueRef.current = value;

  // Segments wrap mid-word once per-segment width runs out. The track is
  // ~248px (280 panel − 28 body pad − 4 seg pad), each button loses 12px
  // to its own padding, and 11.5px system-ui averages ~6.3px/char — so 2
  // options fit ~16 chars each, 3 fit ~10. Past that (or >3 options), fall
  // back to a dropdown rather than wrap.
  const labelLen = (o) => String(typeof o === 'object' ? o.label : o).length;
  const maxLen = options.reduce((m, o) => Math.max(m, labelLen(o)), 0);
  const fitsAsSegments = maxLen <= ({ 2: 16, 3: 10 }[options.length] ?? 0);
  if (!fitsAsSegments) {
    // <select> emits strings — map back to the original option value so the
    // fallback stays type-preserving (numbers, booleans) like the segment path.
    const resolve = (s) => {
      const m = options.find((o) => String(typeof o === 'object' ? o.value : o) === s);
      return m === undefined ? s : typeof m === 'object' ? m.value : m;
    };
    return <TweakSelect label={label} value={value} options={options}
                        onChange={(s) => onChange(resolve(s))} />;
  }
  const opts = options.map((o) => (typeof o === 'object' ? o : { value: o, label: o }));
  const idx = Math.max(0, opts.findIndex((o) => o.value === value));
  const n = opts.length;

  const segAt = (clientX) => {
    const r = trackRef.current.getBoundingClientRect();
    const inner = r.width - 4;
    const i = Math.floor(((clientX - r.left - 2) / inner) * n);
    return opts[Math.max(0, Math.min(n - 1, i))].value;
  };

  const onPointerDown = (e) => {
    setDragging(true);
    const v0 = segAt(e.clientX);
    if (v0 !== valueRef.current) onChange(v0);
    const move = (ev) => {
      if (!trackRef.current) return;
      const v = segAt(ev.clientX);
      if (v !== valueRef.current) onChange(v);
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };

  return (
    <TweakRow label={label}>
      <div ref={trackRef} role="radiogroup" onPointerDown={onPointerDown}
           className={dragging ? 'twk-seg dragging' : 'twk-seg'}>
        <div className="twk-seg-thumb"
             style={{ left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
                      width: `calc((100% - 4px) / ${n})` }} />
        {opts.map((o) => (
          <button key={o.value} type="button" role="radio" aria-checked={o.value === value}>
            {o.label}
          </button>
        ))}
      </div>
    </TweakRow>
  );
}

function TweakSelect({ label, value, options, onChange }) {
  return (
    <TweakRow label={label}>
      <select className="twk-field" value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => {
          const v = typeof o === 'object' ? o.value : o;
          const l = typeof o === 'object' ? o.label : o;
          return <option key={v} value={v}>{l}</option>;
        })}
      </select>
    </TweakRow>
  );
}

function TweakText({ label, value, placeholder, onChange }) {
  return (
    <TweakRow label={label}>
      <input className="twk-field" type="text" value={value} placeholder={placeholder}
             onChange={(e) => onChange(e.target.value)} />
    </TweakRow>
  );
}

function TweakNumber({ label, value, min, max, step = 1, unit = '', onChange }) {
  const clamp = (n) => {
    if (min != null && n < min) return min;
    if (max != null && n > max) return max;
    return n;
  };
  const startRef = React.useRef({ x: 0, val: 0 });
  const onScrubStart = (e) => {
    e.preventDefault();
    startRef.current = { x: e.clientX, val: value };
    const decimals = (String(step).split('.')[1] || '').length;
    const move = (ev) => {
      const dx = ev.clientX - startRef.current.x;
      const raw = startRef.current.val + dx * step;
      const snapped = Math.round(raw / step) * step;
      onChange(clamp(Number(snapped.toFixed(decimals))));
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return (
    <div className="twk-num">
      <span className="twk-num-lbl" onPointerDown={onScrubStart}>{label}</span>
      <input type="number" value={value} min={min} max={max} step={step}
             onChange={(e) => onChange(clamp(Number(e.target.value)))} />
      {unit && <span className="twk-num-unit">{unit}</span>}
    </div>
  );
}

// Relative-luminance contrast pick — checkmarks drawn over a swatch need to
// read on both #111 and #fafafa without per-option configuration. Hex input
// only (#rgb / #rrggbb); named or rgb()/hsl() colors fall through to "light".
function __twkIsLight(hex) {
  const h = String(hex).replace('#', '');
  const x = h.length === 3 ? h.replace(/./g, (c) => c + c) : h.padEnd(6, '0');
  const n = parseInt(x.slice(0, 6), 16);
  if (Number.isNaN(n)) return true;
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  return r * 299 + g * 587 + b * 114 > 148000;
}

const __TwkCheck = ({ light }) => (
  <svg viewBox="0 0 14 14" aria-hidden="true">
    <path d="M3 7.2 5.8 10 11 4.2" fill="none" strokeWidth="2.2"
          strokeLinecap="round" strokeLinejoin="round"
          stroke={light ? 'rgba(0,0,0,.78)' : '#fff'} />
  </svg>
);

// TweakColor — curated color/palette picker. Each option is either a single
// hex string or an array of 1-5 hex strings; the card adapts — a lone color
// renders solid, a palette renders colors[0] as the hero (left ~2/3) with the
// rest stacked in a sharp column on the right. onChange emits the
// option in the shape it was passed (string stays string, array stays array).
// Without options it falls back to the native color input for back-compat.
function TweakColor({ label, value, options, onChange }) {
  if (!options || !options.length) {
    return (
      <div className="twk-row twk-row-h">
        <div className="twk-lbl"><span>{label}</span></div>
        <input type="color" className="twk-swatch" value={value}
               onChange={(e) => onChange(e.target.value)} />
      </div>
    );
  }
  // Native <input type=color> emits lowercase hex per the HTML spec, so
  // compare case-insensitively. String() guards JSON.stringify(undefined),
  // which returns the primitive undefined (no .toLowerCase).
  const key = (o) => String(JSON.stringify(o)).toLowerCase();
  const cur = key(value);
  return (
    <TweakRow label={label}>
      <div className="twk-chips" role="radiogroup">
        {options.map((o, i) => {
          const colors = Array.isArray(o) ? o : [o];
          const [hero, ...rest] = colors;
          const sup = rest.slice(0, 4);
          const on = key(o) === cur;
          return (
            <button key={i} type="button" className="twk-chip" role="radio"
                    aria-checked={on} data-on={on ? '1' : '0'}
                    aria-label={colors.join(', ')} title={colors.join(' · ')}
                    style={{ background: hero }}
                    onClick={() => onChange(o)}>
              {sup.length > 0 && (
                <span>
                  {sup.map((c, j) => <i key={j} style={{ background: c }} />)}
                </span>
              )}
              {on && <__TwkCheck light={__twkIsLight(hero)} />}
            </button>
          );
        })}
      </div>
    </TweakRow>
  );
}

function TweakButton({ label, onClick, secondary = false }) {
  return (
    <button type="button" className={secondary ? 'twk-btn secondary' : 'twk-btn'}
            onClick={onClick}>{label}</button>
  );
}

Object.assign(window, {
  useTweaks, TweaksPanel, TweakSection, TweakRow,
  TweakSlider, TweakToggle, TweakRadio, TweakSelect,
  TweakText, TweakNumber, TweakColor, TweakButton,
});

/* --- Section from components/tweaks.jsx --- */


// Tweaks defaults — host parses this JSON and writes back via __edit_mode_set_keys.
const TWEAK_DEFAULTS = {
  "accent":   "blue",
  "tone":     "light",
  "display":  "schibsted",
  "showGrid": true
};

// Theming maps
const ACCENTS = {
  blue:  { hex: "#2563FF", dim: "rgba(37,99,255,0.12)", dim2: "rgba(37,99,255,0.30)", glow: "rgba(37,99,255,0.18)" },
  amber: { hex: "#FF8E5C", dim: "rgba(255,142,92,0.12)",  dim2: "rgba(255,142,92,0.30)",  glow: "rgba(255,142,92,0.20)" },
  cyan:  { hex: "#00AEFF", dim: "rgba(0,174,255,0.12)", dim2: "rgba(0,174,255,0.30)", glow: "rgba(0,174,255,0.20)" },
};
const TONES = {
  light:    { bg: "#FAFAFA", bg2: "#F4F6FA", panel: "#FFFFFF" },
  warm:     { bg: "#FCFAF7", bg2: "#F7F3EC", panel: "#FFFFFF" },
  gray:     { bg: "#F8F9FA", bg2: "#E9ECEF", panel: "#FFFFFF" },
};
const DISPLAYS = {
  schibsted:    '"Schibsted Grotesk", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  inter:        '"Inter Tight", "Inter", ui-sans-serif, sans-serif',
  serif:        '"Instrument Serif", "Times New Roman", serif',
};

function applyTweaks(t) {
  const a = ACCENTS[t.accent] || ACCENTS.blue;
  const tone = TONES[t.tone] || TONES.light;
  const disp = DISPLAYS[t.display] || DISPLAYS.schibsted;
  const r = document.documentElement.style;
  r.setProperty("--accent",     a.hex);
  r.setProperty("--accent-dim", a.dim);
  r.setProperty("--bg",         tone.bg);
  r.setProperty("--bg-2",       tone.bg2);
  r.setProperty("--panel",      tone.panel);
  r.setProperty("--sans",       disp);
  
  // Set appropriate light text / line colors since tones are all light now
  r.setProperty("--text",       "#111827");
  r.setProperty("--text-2",     "#475467");
  r.setProperty("--muted",      "#6B7280");
  r.setProperty("--muted-2",    "#98A2B3");
  r.setProperty("--line",       "#EAECF0");
  r.setProperty("--line-2",     "#F0F2F5");
  r.setProperty("--line-3",     "#D7DCE3");

  document.body.style.background = tone.bg;
  // grid visibility
  document.documentElement.classList.toggle("no-grid", !t.showGrid);
}

function TweaksRoot() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  React.useEffect(() => applyTweaks(t), [t]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Accent" />
      <TweakColor
        label="Color"
        value={ACCENTS[t.accent].hex}
        options={[ACCENTS.blue.hex, ACCENTS.amber.hex, ACCENTS.cyan.hex]}
        onChange={(hex) => {
          const key = Object.keys(ACCENTS).find(k => ACCENTS[k].hex === hex) || "blue";
          setTweak('accent', key);
        }}
      />

      <TweakSection label="Background tone" />
      <TweakRadio
        label="Tone"
        value={t.tone}
        options={["light", "warm", "gray"]}
        onChange={(v) => setTweak('tone', v)}
      />

      <TweakSection label="Display type" />
      <TweakRadio
        label="Font"
        value={t.display}
        options={["schibsted", "inter", "serif"]}
        onChange={(v) => setTweak('display', v)}
      />

      <TweakSection label="Surface" />
      <TweakToggle
        label="Show grid"
        value={t.showGrid}
        onChange={(v) => setTweak('showGrid', v)}
      />
    </TweaksPanel>
  );
}





/* --- Section from components/app.jsx --- */


export default function CaseStudiesIndex() {
  return (
    <div className="case-study-theme">
      <Nav/>
      <Hero/>
      <SelfIdentification/>
      <Failures/>
      <Cases/>
      <MidCTA/>
      <RealitySnapshots/>
      <Architecture/>
      <Metrics/>
      <TrustLayer/>
      <CTA/>
      <Footer/>
      <MobileCTA/>
      <TweaksRoot/>
    </div>
  );
}


