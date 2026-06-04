/* eslint-disable */


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
              <h3 style={{ margin: 0, fontSize: 22, lineHeight: 1.05, letterSpacing: "-0.02em", color: "var(--text)" }}>This is what broken operations look like:</h3>
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
                <h2 style={{ margin: "14px 0 0", fontSize: 32, lineHeight: 1.05, letterSpacing: "-0.02em", color: "var(--text)" }}>Trusted by operations that can’t afford chaos.</h2>
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
              <div style={{ fontSize: 17, fontWeight: 500, letterSpacing: "-0.01em", color: "var(--text)", marginBottom: 4 }}>
                Recognise your operation in one of these?
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

window.TrustStrip = TrustStrip;
window.MidCTA = MidCTA;
window.MobileCTA = MobileCTA;

window.SelfIdentification = SelfIdentification;
window.RealitySnapshots = RealitySnapshots;
window.TrustLayer = TrustLayer;
