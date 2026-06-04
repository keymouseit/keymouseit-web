/* eslint-disable */

const TIMELINE = [
  { t: "09:12", kind: "signal",  side: "L", title: "Issue begins developing", body: "A cross-functional operational issue starts. The signal exists in the data, but no one sees it across inventory, logistics, procurement, and execution." },
  { t: "11:46", kind: "escal",   side: "R", title: "Three teams. Three versions.", body: "By the time it reaches leadership, every function reports a different root cause.", warn: true },
  { t: "12:30", kind: "reconcile",side:"L", title: "Leadership starts reconciling", body: "Calls, report checks, team lead validation. Hours spent finding the truth before the decision can even begin.", warn: true },
  { t: "15:48", kind: "clarity", side: "R", title: "Clarity arrives too late", body: "By the time the picture is clear, the window to act is gone and the issue has propagated downstream.", warn: true },
  { t: "—", kind: "root", side: "L", title: "Real loss", body: "The loss wasn’t operational. It was delayed decision-making caused by fragmented, stale data." },
];

function Incident() {
  return (
    <section className="section" id="incident" data-screen-label="Incident" style={{
      background: "linear-gradient(180deg, rgba(255,107,107,0.025), transparent 70%)",
    }}>
      <div className="wrap">
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: 40, gap: 40, flexWrap: "wrap" }}>
          <div style={{ maxWidth: 720 }}>
            <span className="eyebrow" style={{ color: "var(--warn)" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--warn)", display: "inline-block" }}/>
              <span className="num">02</span><span className="bar"/>
              Real incident · decision window missed
            </span>
            <h2 className="h2" style={{ marginTop: 16 }}>
              By the time the picture<br/>was clear, the <em>window</em> had closed.
            </h2>
          </div>
          <p style={{ maxWidth: 360, color: "var(--muted)", fontSize: 14.5, lineHeight: 1.55, margin: 0 }}>
            Three teams reported different root causes. Leadership spent hours reconciling. By the time clarity emerged, the intervention window was gone.
          </p>
        </header>

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
      {/* Header */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "14px 22px",
        borderBottom: "1px solid var(--line)",
        background: "var(--bg-2)",
        fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.12em",
        color: "var(--muted)", textTransform: "uppercase",
      }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--warn)", boxShadow: "0 0 8px var(--warn)" }}/>
          OPS.LOG · INCIDENT-DEC03
        </span>
        <span>MISSED WINDOW · RECURRING PATTERN</span>
      </div>

      {/* Timeline body */}
      <div style={{ position: "relative", padding: "28px 22px 32px" }}>
        {/* Center spine */}
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

      {/* Footer */}
      <div style={{
        padding: "18px 22px", borderTop: "1px solid var(--line)",
        background: "var(--bg-2)",
        display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap",
        fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.08em",
        color: "var(--muted)", textTransform: "uppercase",
      }}>
        <span>ROOT CAUSE — Decision latency from fragmented data</span>
        <span>TIME-TO-DECIDE (with system): <span style={{ color: "var(--accent)" }}>MINUTES</span></span>
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
      {/* Time column (center) */}
      <span style={{
        gridColumn: "2 / 3",
        fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.06em",
        color: "var(--text-2)", textAlign: "center",
        background: "var(--bg-2)", padding: "4px 8px", borderRadius: 999,
        border: "1px solid var(--line)",
        position: "relative", zIndex: 2,
        justifySelf: "center", minWidth: 60,
      }}>{e.t}</span>

      {/* spine dot connector */}
      <span aria-hidden="true" className="te-spine-dot" style={{
        position: "absolute", left: "50%", top: "50%",
        width: 8, height: 8, borderRadius: "50%",
        background: e.warn ? "var(--warn)" : "var(--accent)",
        boxShadow: e.warn ? "0 0 8px var(--warn)" : "0 0 8px var(--accent)",
        transform: "translate(-50%, -50%)",
        zIndex: 1, opacity: 0,
      }}/>

      {/* Card (left or right) */}
      <div className={right ? "te-side-r" : "te-side-l"} style={{
        gridColumn: right ? "3 / 4" : "1 / 2",
        background: e.warn
          ? "linear-gradient(180deg, rgba(255,107,107,0.06), rgba(255,107,107,0.02))"
          : "rgba(255,255,255,0.02)",
        border: `1px solid ${e.warn ? "rgba(255,107,107,0.30)" : "var(--line)"}`,
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
            color: e.warn ? "var(--warn)" : "var(--muted)",
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

      {/* Spacer on opposite side */}
      <div style={{ gridColumn: right ? "1 / 2" : "3 / 4" }}/>
    </div>
  );
}

window.Incident = Incident;
