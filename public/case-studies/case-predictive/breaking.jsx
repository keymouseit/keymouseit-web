/* eslint-disable */

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
  const c = "var(--text-2)";
  const common = { width: 44, height: 44, viewBox: "0 0 44 44", fill: "none", stroke: c, strokeWidth: "1.3", strokeLinecap: "round", strokeLinejoin: "round" };
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
        <BreakingGlyph kind={b.glyph}/>
      </div>

      <div>
        <h3 className="h3" style={{ marginBottom: 8 }}>{b.title}</h3>
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

window.Breaking = Breaking;
