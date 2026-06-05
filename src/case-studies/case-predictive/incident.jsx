/* eslint-disable */

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
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent)", boxShadow: "0 0 8px var(--accent)" }}/>
          OPS.LOG · SKU-A47
        </span>
        <span>PEAK STOCKOUT · RECURRING PATTERN</span>
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
      {/* Time column (center) */}
      <span style={{
        gridColumn: "2 / 3",
        fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.06em",
        color: "var(--accent)", textAlign: "center",
        background: "var(--bg-2)", padding: "4px 8px", borderRadius: 999,
        border: "1px solid var(--line)",
        position: "relative", zIndex: 2,
        justifySelf: "center", minWidth: 60,
      }}>{e.t}</span>

      {/* spine dot connector */}
      <span aria-hidden="true" className="te-spine-dot" style={{
        position: "absolute", left: "50%", top: "50%",
        width: 8, height: 8, borderRadius: "50%",
        background: "var(--accent)",
        boxShadow: "0 0 8px var(--accent)",
        transform: "translate(-50%, -50%)",
        zIndex: 1, opacity: 0,
      }}/>

      {/* Card (left or right) */}
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

      {/* Spacer on opposite side */}
      <div style={{ gridColumn: right ? "1 / 2" : "3 / 4" }}/>
    </div>
  );
}

window.Incident = Incident;
