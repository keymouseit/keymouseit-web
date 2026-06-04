/* eslint-disable */

const BIG_METRICS = [
  { v: "~75%",   l: "dispatch delay reduction",     ctx: "Coordination overhead removed" },
  { v: "~70%",   l: "fleet idle time reduction",    ctx: "From 15–20% → <5% of available hours" },
  { v: "↓↓↓",    l: "SLA breach frequency",         ctx: "From recurring weekly → rare exception", small: true },
  { v: "40–50%", l: "manual coordination reduction",ctx: "Calls and WhatsApp systemised" },
];

const BA_ROWS = [
  { area: "Dispatch cycle delay",        before: "1–3 hrs per cycle",       after: "<30 min average",         change: "~75% reduction" },
  { area: "Fleet idle time",             before: "15–20% of avail. hours",  after: "<5%",                      change: "~70% reduction" },
  { area: "SLA breach incidents",        before: "Recurring · weekly",      after: "Rare exception",           change: "Significantly reduced" },
  { area: "Delay detection timing",      before: "Post-breach / escalation", after: "Before window closes",    change: "Proactive vs reactive" },
  { area: "Manual coordination",         before: "High · calls + WhatsApp", after: "Systemised",               change: "40–50% reduction" },
  { area: "Cascade incidents",           before: "Frequent",                after: "Contained at detection",   change: "Impact contained" },
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
              From firefighting to<br/><em>system-driven execution</em>.
            </h2>
          </div>
          <p style={{ maxWidth: 360, color: "var(--muted)", fontSize: 14.5, lineHeight: 1.55, margin: 0 }}>
            Directional metrics measured against the same operating periods before and after implementation.
          </p>
        </header>

        {/* Big metrics */}
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

        {/* Org summary */}
        <div className="org-grid" style={{
          marginTop: 64,
          display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 56, alignItems: "start",
        }}>
          <div>
            <span className="eyebrow"><span className="bar"/>What changed</span>
            <h3 style={{
              fontSize: 24, fontWeight: 500, letterSpacing: "-0.015em", color: "var(--text)",
              marginTop: 12, marginBottom: 22, lineHeight: 1.2,
            }}>
              The team manages exceptions — not phone calls.
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                "Single source of truth — no calls just to confirm status.",
                "Warehouse readiness and driver allocation synchronized.",
                "Leadership sees breach risk before escalation.",
                "Key-person dependency removed.",
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

          {/* Mode-shift visualization */}
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
        color: "var(--text)", marginTop: 16, marginBottom: 14,
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
      background: "rgba(13,17,25,0.4)",
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
          { b: "Coordinated by people", a: "Coordinated by system" },
          { b: "Status by phone call",  a: "Status by dashboard" },
          { b: "Delays found in retro", a: "Delays caught in flight" },
          { b: "Plan in someone's head",a: "Plan in shared layer" },
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

window.Impact = Impact;
