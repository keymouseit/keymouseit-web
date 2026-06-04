/* eslint-disable */

function CaseCTA() {
  return (
    <section className="section" id="cta" data-screen-label="CTA" style={{ borderTop: 0, padding: "100px 0 80px" }}>
      <div className="wrap">
        <div className="cta-card" style={{
          position: "relative",
          background: "linear-gradient(180deg, rgba(15,18,26,0.95), rgba(9,11,16,0.95))",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 24,
          padding: "72px 64px",
          overflow: "hidden",
        }}>
          {/* grid bg */}
          <span aria-hidden="true" style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse 60% 80% at 80% 30%, #000 0%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse 60% 80% at 80% 30%, #000 0%, transparent 80%)",
          }}/>
          <span aria-hidden="true" style={{
            position: "absolute", right: -120, top: -120, width: 460, height: 460, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(37, 99, 255,0.18), rgba(37, 99, 255,0.04) 40%, transparent 70%)",
            filter: "blur(20px)", pointerEvents: "none",
          }}/>

          {/* corner crosshairs */}
          {[
            { top: 14, left: 14, rot: 0 },
            { top: 14, right: 14, rot: 90 },
            { bottom: 14, right: 14, rot: 180 },
            { bottom: 14, left: 14, rot: 270 },
          ].map((p, i) => (
            <span key={i} style={{
              position: "absolute", width: 10, height: 10, ...p,
              transform: `rotate(${p.rot}deg)`,
              borderTop: "1px solid var(--muted)",
              borderLeft: "1px solid var(--muted)", opacity: 0.5,
            }}/>
          ))}

          <div className="cta-inner" style={{
            position: "relative",
            display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 60, alignItems: "center",
          }}>
            <div>
              <span className="eyebrow" style={{ color: "var(--accent)" }}>
                <span className="dot"/>WANT THIS SYSTEM IN YOUR OPERATION?
              </span>
              <h2 className="h2" style={{ marginTop: 22, marginBottom: 22, color: "#fff" }}>
                Want this system<br/>in your <em>plant</em>?
              </h2>
              <p style={{ fontSize: 17, lineHeight: 1.55, color: "rgba(255,255,255,0.7)", margin: 0, maxWidth: "50ch" }}>
                30 minutes. We’ll map your workflow gaps — inventory, production, compliance, dispatch — and identify the missing system layer that would create the highest operational leverage.
              </p>

              <div style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 32, flexWrap: "wrap" }}>
                <a href="#" className="btn btn-primary" style={{ padding: "14px 22px", fontSize: 14.5 }}>
                  Get Your Operational System Map <ArrowRight/>
                </a>
                <a href="mailto:hello@keymouseit.com" className="btn btn-ghost" style={{ padding: "14px 22px", fontSize: 14.5, color: "#fff", borderColor: "rgba(255,255,255,0.2)" }}>
                  hello@keymouseit.com <ArrowUpRight/>
                </a>
              </div>

              <div style={{ marginTop: 28, display: "flex", gap: 22, flexWrap: "wrap", fontSize: 12.5, color: "rgba(255,255,255,0.5)" }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                  <span style={{ color: "var(--accent)" }}>✓</span> No sales call
                </span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                  <span style={{ color: "var(--accent)" }}>✓</span> NDA on request
                </span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                  <span style={{ color: "var(--accent)" }}>✓</span> 1-page gap map after
                </span>
              </div>
            </div>

            <ContactForm/>
          </div>

          <style>{`
            @media (max-width: 900px) {
              .cta-inner { grid-template-columns: 1fr !important; }
              .cta-card { padding: 48px 28px !important; }
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}

const FORM_STYLE = `
  .case-field { display: flex; flex-direction: column; gap: 8px; text-align: left; }
  .case-field label { font-size: 13px; font-weight: 600; color: #C7D2E0; letter-spacing: 0.2px; }
  .case-field input, .case-field select, .case-field textarea {
    font-family: var(--sans); font-size: 15px; color: #fff;
    background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.14);
    border-radius: 10px; padding: 13px 15px; outline: none; transition: border-color 0.16s, background 0.16s;
    width: 100%;
  }
  .case-field input::placeholder, .case-field textarea::placeholder { color: #6B7689; }
  .case-field input:focus, .case-field select:focus, .case-field textarea:focus { border-color: var(--blue); background: rgba(255,255,255,0.08); }
  .case-field select option { color: #111827; }
  .case-error-container {
    color: #F87171; background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.25);
    border-radius: 12px; padding: 12px 16px; margin-bottom: 16px; font-size: 14px;
    display: flex; align-items: flex-start; gap: 10px; line-height: 1.4;
  }
`;

function ContactForm() {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    company: '',
    challenge: '',
    budget: '',
    timeline: ''
  });
  const [errorMsg, setErrorMsg] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);
  const [sent, setSent] = React.useState(false);

  const DISALLOWED_DOMAINS = ['mailinator.com', 'yopmail.com', 'tempmail.com', 'dispostable.com', 'trashmail.com', 'guerrillamail.com', 'mailinator2.com'];

  const submit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    const emailLower = formData.email.trim().toLowerCase();
    const domain = emailLower.split('@')[1];
    
    if (!domain) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    const isDisposable = DISALLOWED_DOMAINS.some(disallowed => domain.includes(disallowed));
    if (isDisposable) {
      setErrorMsg("Disposable or temporary emails are not allowed. Please use a work email.");
      return;
    }

    setSubmitting(true);

    // Pre-emptively set cPanel anti-bot verification cookie to bypass firewalls
    document.cookie = "humans_21909=1; path=/; max-age=31536000";

    const params = new URLSearchParams();
    params.append('name', formData.name);
    params.append('email', formData.email);
    params.append('company', formData.company);
    params.append('challenge', formData.challenge);
    params.append('budget', formData.budget);
    params.append('timeline', formData.timeline);

    try {
      const res = await fetch("/submit-lead.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json"
        },
        body: params
      });

      const result = await res.json();
      if (result && result.success) {
        setSent(true);
      } else {
        setErrorMsg(result.message || "Failed to submit. Please try again.");
      }
    } catch (err) {
      console.error("Error submitting contact form:", err);
      setErrorMsg("Connection error. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{
      position: "relative",
      background: "rgba(8,10,15,0.6)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 16,
      padding: "24px 22px",
      backdropFilter: "blur(10px)",
      color: "#fff",
      width: "100%"
    }}>
      <style dangerouslySetInnerHTML={{__html: FORM_STYLE}} />
      {sent ? (
        <div style={{ textAlign: "center" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 20 }}>
            <span style={{ width: 26, height: 26, borderRadius: "50%", background: "rgba(22,163,74,0.16)", border: "1px solid rgba(22,163,74,0.4)", color: "#4ADE80", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M13.5 4.5l-7.5 7.5-3.5-3.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <span style={{ color: "#fff", fontSize: 15, fontWeight: 600 }}>Inquiry sent! Book your time slot:</span>
          </div>
          <div style={{ width: "100%", height: 480, borderRadius: 12, overflow: "hidden", background: "#fff", boxShadow: "0 8px 30px rgba(0,0,0,0.2)" }}>
            <iframe 
              src={`https://calendly.com/hi-shivenj/30min?name=${encodeURIComponent(formData.name)}&email=${encodeURIComponent(formData.email)}&hide_landing_page_details=1&hide_gdpr_banner=1`}
              width="100%" 
              height="100%" 
              frameBorder="0" 
              title="Schedule Strategy Call"
            />
          </div>
        </div>
      ) : (
        <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {errorMsg && (
            <div className="case-error-container">
              <span style={{ display: 'inline-flex', flexShrink: 0, marginTop: 2, color: '#EF4444' }}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="8" cy="8" r="7"/>
                  <path d="M8 5v4M8 11h.01"/>
                </svg>
              </span>
              <span>{errorMsg}</span>
            </div>
          )}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div className="case-field">
              <label>Name</label>
              <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Your name" />
            </div>
            <div className="case-field">
              <label>Work email</label>
              <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="you@company.com" />
            </div>
          </div>
          <div className="case-field">
            <label>Company</label>
            <input required value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} placeholder="Company name" />
          </div>
          <div className="case-field">
            <label>Project challenge</label>
            <textarea required rows="2" value={formData.challenge} onChange={e => setFormData({...formData, challenge: e.target.value})} placeholder="What problem are you trying to solve?" style={{ resize: "vertical" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div className="case-field">
              <label>Budget range</label>
              <select value={formData.budget} onChange={e => setFormData({...formData, budget: e.target.value})} required>
                <option value="" disabled>Select range</option>
                <option>{"< $25k"}</option>
                <option>$25k – $75k</option>
                <option>$75k – $200k</option>
                <option>$200k+</option>
              </select>
            </div>
            <div className="case-field">
              <label>Timeline</label>
              <select value={formData.timeline} onChange={e => setFormData({...formData, timeline: e.target.value})} required>
                <option value="" disabled>Select timeline</option>
                <option>ASAP</option>
                <option>1–3 months</option>
                <option>3–6 months</option>
                <option>Exploring</option>
              </select>
            </div>
          </div>
          <button type="submit" className="btn btn-primary" disabled={submitting} style={{ width: "100%", justifyContent: "center", padding: "13px 18px", fontSize: 14, marginTop: 8 }}>
            {submitting ? "Sending Inquiry..." : "Book Strategy Call"}
          </button>
        </form>
      )}
    </div>
  );
}

// Footer
function CaseFooter() {
  return (
    <footer style={{
      padding: "56px 0 40px", borderTop: "1px solid var(--line)",
      fontSize: 13, color: "var(--muted)",
    }}>
      <div className="wrap" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Logo height={28} mode="light" />
          <span style={{ color: "var(--muted-2)", marginLeft: 12 }}>·</span>
          <span style={{ marginLeft: 8 }}>Operational software & AI systems for complex, real-world workflows.</span>
        </div>
        <div style={{ display: "flex", gap: 22, fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase" }}>
          <a href="index.html" style={{ color: "var(--text-2)" }}>← Back to systems</a>
          <span><span style={{ color: "var(--accent)" }}>●</span> Q3 ’26 — accepting engagements</span>
        </div>
      </div>
    </footer>
  );
}

// Mobile sticky CTA
function MobileCaseCTA() {
  return (
    <div className="mobile-cta">
      <div className="slot">
        <span className="live-dot"/>
        3 audit slots left · Q3 ’26
      </div>
      <div className="row">
        <a href="#cta" className="btn btn-primary" style={{ color: "#fff" }}>
          Get Your Operational System Map <ArrowRight/>
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

window.CaseCTA = CaseCTA;
window.CaseFooter = CaseFooter;
window.MobileCaseCTA = MobileCaseCTA;

// ── Cross-sell: read next case study ────────────────────────────────────
function CrossSell() {
  return (
    <section data-screen-label="Read-Next" style={{ padding: "20px 0 60px" }}>
      <div className="wrap">
        <div style={{
          fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.14em",
          color: "var(--muted)", textTransform: "uppercase", marginBottom: 14,
          display: "inline-flex", alignItems: "center", gap: 10,
        }}>
          <span style={{ color: "var(--accent)" }}>●</span> READ NEXT
        </div>

        <a href="Logistics Control Tower.html" style={{ display: "block" }}>
          <div className="rn-card" style={{
            position: "relative",
            display: "grid", gridTemplateColumns: "84px 1fr auto", gap: 28,
            alignItems: "center",
            padding: "26px 32px",
            background: "var(--panel)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 16,
            transition: "all .2s",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = "rgba(37, 99, 255,0.40)";
            e.currentTarget.style.background = "linear-gradient(180deg, rgba(20,24,32,0.8), rgba(10,12,18,0.6))";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = "var(--line-2)";
            e.currentTarget.style.background = "var(--panel)";
          }}
          >
            <div style={{
              width: 60, height: 60, borderRadius: 12,
              border: "1px solid rgba(37, 99, 255,0.30)",
              background: "rgba(37, 99, 255,0.06)",
              display: "grid", placeItems: "center",
              color: "var(--accent)",
              fontFamily: "var(--mono)", fontSize: 16, fontWeight: 500, letterSpacing: "0.04em",
            }}>S.03</div>

            <div>
              <div style={{
                fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.14em",
                color: "var(--muted)", textTransform: "uppercase", marginBottom: 6,
              }}>
                Orchestration · 4 min read
              </div>
              <div style={{
                fontSize: 22, fontWeight: 500, color: "var(--text)", letterSpacing: "-0.015em", marginBottom: 6,
              }}>
                Logistics Control Tower
              </div>
              <div style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.5, maxWidth: "60ch" }}>
                Multi-node logistics op cut dispatch delays{" "}
                <span style={{ color: "var(--accent)" }}>~75%</span>{" "}
                by enforcing readiness before allocation.
              </div>
            </div>

            <span style={{
              fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.1em",
              color: "var(--accent)", textTransform: "uppercase",
              display: "inline-flex", alignItems: "center", gap: 8,
              whiteSpace: "nowrap",
            }}>
              Read case <ArrowUpRight/>
            </span>
          </div>
        </a>

        <style>{`
          @media (max-width: 720px) {
            .rn-card { grid-template-columns: 56px 1fr !important; padding: 18px 20px !important; }
            .rn-card > span:last-child { grid-column: 1 / 3 !important; margin-top: 8px; }
          }
        `}</style>
      </div>
    </section>
  );
}
window.CrossSell = CrossSell;

// ── Mid-page inline CTA ───────────────────────────────────────────
function MidCTA({ headline, sub, btn }) {
  return (
    <section data-screen-label="Mid-CTA" style={{ padding: "20px 0 50px" }}>
      <div className="wrap">
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: 28, padding: "22px 28px", flexWrap: "wrap",
          background: "linear-gradient(90deg, rgba(37, 99, 255,0.04), rgba(37, 99, 255,0.0))",
          border: "1px solid rgba(255,255,255,0.1)",
          borderLeft: "2px solid var(--accent)",
          borderRadius: 14,
        }}>
          <div>
            <div style={{ fontSize: 17, fontWeight: 500, letterSpacing: "-0.01em", color: "var(--text)", marginBottom: 4 }}>
              {headline}
            </div>
            <div style={{ fontSize: 13.5, color: "var(--muted)" }}>
              {sub}
            </div>
          </div>
          <a href="#cta" className="btn btn-primary" style={{ color: "#fff" }}>
            {btn} <ArrowRight />
          </a>
        </div>
      </div>
    </section>
  );
}
window.MidCTA = MidCTA;
