/* eslint-disable */

const BREAKING = [
  {
    code: "B.01",
    title: "Dispatch via calls → 1–3 hr delays",
    body: "Every cycle started by chasing status across calls, WhatsApp, and stale spreadsheets.",
    metric: { v: "1–3 hr", l: "per dispatch cycle" },
    glyph: "comm",
  },
  {
    code: "B.02",
    title: "No readiness gate → idle fleet",
    body: "Drivers were assigned before shipments were ready. Trucks waited while delivery windows compressed.",
    metric: { v: "15–20%", l: "fleet idle time" },
    glyph: "gate",
  },
  {
    code: "B.03",
    title: "No real-time visibility → outdated decisions",
    body: "The only way to know delivery status was to call the driver — usually after the information had already aged.",
    metric: { v: "T+1h", l: "decision latency" },
    glyph: "vis",
  },
  {
    code: "B.04",
    title: "Delays found post-breach → damage done",
    body: "Problems surfaced through customer complaints, missed SLAs, or driver escalation — never early enough.",
    metric: { v: "Reactive", l: "post-escalation only" },
    glyph: "late",
  },
  {
    code: "B.05",
    title: "Teams on different timelines → no shared layer",
    body: "Warehouse, dispatch, and field teams were each doing their job — but no system synchronized them.",
    metric: { v: "3 teams", l: "no shared layer" },
    glyph: "split",
  },
];

function BreakingGlyph({ kind }) {
  const c = "currentColor";
  const common = { width: 24, height: 24, viewBox: "0 0 44 44", fill: "none", stroke: c, strokeWidth: "2.4", strokeLinecap: "round", strokeLinejoin: "round" };
  if (kind === "comm") return (
    <svg {...common}>
      {/* chat bubbles, disconnected */}
      <path d="M5 9 H20 V18 H12 L8 22 V18 H5 Z"/>
      <path d="M24 22 H39 V30 H32 L28 34 V30 H24 Z"/>
      <path d="M21 16 L24 22" strokeDasharray="2 3"/>
    </svg>
  );
  if (kind === "gate") return (
    <svg {...common}>
      <rect x="6" y="18" width="32" height="18" rx="2"/>
      <path d="M13 18 V12 a9 9 0 0 1 18 0 V18"/>
      {/* red X */}
      <path d="M19 27 L25 27" stroke="var(--warn)"/>
    </svg>
  );
  if (kind === "vis") return (
    <svg {...common}>
      <rect x="6" y="10" width="32" height="22" rx="2"/>
      <path d="M6 16 H38"/>
      {/* faded bars */}
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

      {/* Metric strip */}
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
              Five failures. <em>Every</em> day.
            </h2>
          </div>
          <p style={{ maxWidth: 360, color: "var(--muted)", fontSize: 14.5, lineHeight: 1.55, margin: 0 }}>
            Not isolated mistakes — repeatable patterns every time demand peaked.
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

window.Breaking = Breaking;
