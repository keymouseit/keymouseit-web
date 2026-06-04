/* eslint-disable */

function LeadershipShift() {
  const before = [
    "Decisions delayed by reconciliation",
    "Data unclear or disputed",
    "Multiple meetings before action",
    "Risks visible only after escalation",
  ];
  const after = [
    "Decisions made from one trusted picture",
    "Data freshness and confidence visible",
    "Action queue prioritized by urgency",
    "Risks surfaced while there is still time",
  ];

  return (
    <section className="section" id="leadership" data-screen-label="Leadership Shift" style={{ paddingTop: 80 }}>
      <div className="wrap">
        <header style={{ maxWidth: 760, marginBottom: 40 }}>
          <span className="eyebrow"><span className="bar"/>What changes for leadership</span>
          <h2 className="h2" style={{ marginTop: 16 }}>
            From meetings about the numbers<br/>to decisions about the <em>business</em>.
          </h2>
          <p className="lead" style={{ marginTop: 18 }}>
            The system removes the validation burden from leadership, so attention moves from finding the truth to acting on it.
          </p>
        </header>

        <div className="leadership-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
          <ShiftCard title="Before" tone="before" items={before}/>
          <ShiftCard title="After" tone="after" items={after}/>
        </div>

        <style>{`
          @media (max-width: 800px) {
            .leadership-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </section>
  );
}

function ShiftCard({ title, tone, items }) {
  const after = tone === "after";
  return (
    <div style={{
      border: `1px solid ${after ? "rgba(37, 99, 255,0.32)" : "rgba(255,107,107,0.24)"}`,
      background: after
        ? "linear-gradient(180deg, rgba(37, 99, 255,0.06), rgba(13,17,25,0.42))"
        : "linear-gradient(180deg, rgba(255,107,107,0.045), rgba(13,17,25,0.42))",
      borderRadius: 18,
      padding: "28px 30px",
    }}>
      <div style={{
        fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.14em",
        color: after ? "var(--accent)" : "var(--warn)", textTransform: "uppercase",
        marginBottom: 18,
      }}>{title}</div>
      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 14 }}>
        {items.map((item, i) => (
          <li key={i} style={{ display: "grid", gridTemplateColumns: "18px 1fr", gap: 12, color: after ? "#fff" : "var(--text-2)", lineHeight: 1.45 }}>
            <span style={{ color: after ? "var(--accent)" : "var(--warn)" }}>{after ? "✓" : "—"}</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

window.LeadershipShift = LeadershipShift;
