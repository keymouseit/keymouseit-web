/* eslint-disable */

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
      {/* code */}
      <span style={{
        fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.12em",
        color: "var(--muted)", display: "block", marginBottom: 18,
      }}>
        {f.code}
      </span>

      {/* icon */}
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

      {/* corner tick (decorative) */}
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

window.Failures = Failures;
