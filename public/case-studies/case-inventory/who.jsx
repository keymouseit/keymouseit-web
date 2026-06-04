/* eslint-disable */

const WHO_FOR = [
  "Inventory is tracked manually or only at end-of-day",
  "Stockouts still surprise you during peak demand",
  "Reorders depend on memory, estimates, or shelf checks",
  "You don’t know which SKUs are actually moving by hour/day",
  "Procurement is driven by vendor relationships, not performance data",
];

const TLDR = [
  { k: "Problem",  v: "Manual end-of-shift counts. 10–15% variance. Stockouts during peak. Procurement on gut feel." },
  { k: "Solution", v: "Real-time SKU tracking + consumption intelligence + auto-fired reorders + vendor scorecards." },
  { k: "Outcome",  v: "~70% leakage cut · peak stockouts eliminated · 15–25% procurement cost improvement." },
];

function WhoFor() {
  return (
    <section className="section" id="who" data-screen-label="Summary" style={{ padding: "70px 0" }}>
      <div className="wrap">
        <div className="who-grid" style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          gap: 32,
          alignItems: "stretch",
        }}>
          {/* TL;DR card */}
          <div style={{
            background: "var(--panel)",
            border: "1px solid var(--line)",
            borderRadius: 18,
            padding: "26px 30px 28px",
          }}>
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              paddingBottom: 14, marginBottom: 18,
              borderBottom: "1px dashed var(--line-2)",
              fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.14em",
              color: "var(--muted)", textTransform: "uppercase",
            }}>
              <span><span style={{ color: "var(--accent)" }}>●</span> 60-SECOND READ</span>
              <span>TL;DR</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {TLDR.map((r, i) => (
                <div key={i} style={{
                  display: "grid", gridTemplateColumns: "100px 1fr", gap: 16, alignItems: "start",
                }}>
                  <span style={{
                    fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.14em",
                    color: r.k === "Outcome" ? "var(--accent)" : "var(--muted)",
                    textTransform: "uppercase", paddingTop: 4,
                  }}>{r.k}</span>
                  <span style={{
                    fontSize: 16, lineHeight: 1.5,
                    color: r.k === "Outcome" ? "#fff" : "var(--text-2)",
                    letterSpacing: "-0.005em", fontWeight: r.k === "Outcome" ? 500 : 400,
                  }}>{r.v}</span>
                </div>
              ))}
            </div>

            <div style={{
              marginTop: 24, paddingTop: 18,
              borderTop: "1px dashed var(--line-2)",
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

          {/* Who this is for */}
          <div style={{
            background: "var(--panel)",
            border: "1px solid var(--line)",
            borderRadius: 18,
            padding: "26px 28px",
            display: "flex", flexDirection: "column",
          }}>
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              paddingBottom: 14, marginBottom: 16,
              borderBottom: "1px dashed var(--line-2)",
              fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.14em",
              color: "var(--muted)", textTransform: "uppercase",
            }}>
              <span><span style={{ color: "var(--accent)" }}>●</span> THIS IS FOR YOU IF</span>
              <span>{WHO_FOR.length}/5</span>
            </div>

            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 0, flex: 1 }}>
              {WHO_FOR.map((w, i) => (
                <li key={i} style={{
                  display: "grid", gridTemplateColumns: "22px 1fr",
                  gap: 12, alignItems: "center",
                  padding: "10px 0",
                  borderTop: i === 0 ? "none" : "1px solid var(--line)",
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
              Find where margin is leaking <ArrowRight/>
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

window.WhoFor = WhoFor;
