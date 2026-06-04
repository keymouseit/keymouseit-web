/* eslint-disable */

const TIMELINE = [
  { t: "19:30", kind: "open",      side: "L", title: "Service opens · SAT peak",          body: "SKU-407 (top-seller) shows 14 bottles on the morning count. Reorder set for Monday." },
  { t: "21:54", kind: "stockout",  side: "R", title: "SKU-407 stocks out mid-service",     body: "Actual stock was 2 bottles, not 14. The system had no live view — nobody saw it drift.", warn: true },
  { t: "22:10", kind: "premium",   side: "L", title: "Emergency supplier called · at premium", body: "Regular vendor closed. Backup delivers at +38% · partial quantity.", warn: true },
  { t: "23:30", kind: "gap",       side: "R", title: "1h 36m without the top-seller",      body: "Tables not served. Margin compressed on every bottle the rest of the night.",           warn: true },
  { t: "04:00", kind: "reconcile", side: "L", title: "End-of-shift reveals the gap",       body: "Root cause: a stock count nobody could trust, in a window nobody could see." },
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
              One Saturday · one stockout
            </span>
            <h2 className="h2" style={{ marginTop: 16 }}>
              The top-seller ran out.<br/><em>Margin</em> never recovered.
            </h2>
          </div>
          <p style={{ maxWidth: 360, color: "var(--muted)", fontSize: 14.5, lineHeight: 1.55, margin: 0 }}>
            The pattern that repeated every time demand spiked — which in a lounge is every weekend.
          </p>
        </header>

        <div style={{
          marginBottom: 22,
          padding: "26px 30px",
          borderRadius: 18,
          border: "1px solid rgba(255,107,107,0.32)",
          background: "linear-gradient(180deg, rgba(255,107,107,0.075), rgba(255,107,107,0.025))",
          boxShadow: "0 24px 90px rgba(255,107,107,0.08)",
        }}>
          <p style={{
            margin: 0,
            color: "var(--text)",
            fontSize: "clamp(22px, 2.4vw, 34px)",
            lineHeight: 1.25,
            letterSpacing: "-0.025em",
          }}>
            A top-selling SKU ran out mid-service. The reorder was delayed by bad stock data. Emergency procurement protected the night — but compressed margin exactly when demand was highest.
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
          OPS.LOG · SAT-2148
        </span>
        <span>1 STOCKOUT · LOST REVENUE</span>
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
        <span>ROOT CAUSE — No live stock visibility in service</span>
        <span>TIME-TO-FIX (with system): <span style={{ color: "var(--accent)" }}>MINUTES</span></span>
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
