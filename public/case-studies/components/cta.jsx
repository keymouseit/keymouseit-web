/* eslint-disable */

function CTA() {
  return (
    <section id="audit" className="section" data-screen-label="CTA" style={{ borderTop: 0, padding: "120px 0 80px" }}>
      <div className="wrap">
        <div style={{
          position: "relative",
          background: "linear-gradient(180deg, rgba(15,18,26,0.95), rgba(9,11,16,0.95))",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 24,
          padding: "72px 64px",
          overflow: "hidden",
        }} className="cta-card">
          {/* Grid background */}
          <span aria-hidden="true" style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse 60% 80% at 80% 30%, #000 0%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse 60% 80% at 80% 30%, #000 0%, transparent 80%)",
          }}/>
          {/* Lime glow corner */}
          <span aria-hidden="true" style={{
            position: "absolute", right: -120, top: -120, width: 460, height: 460, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(37,99,255,0.18), rgba(37,99,255,0.04) 40%, transparent 70%)",
            filter: "blur(20px)", pointerEvents: "none",
          }}/>

          {/* Corner crosshairs */}
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
              borderLeft: "1px solid var(--muted)",
              opacity: 0.5,
            }}/>
          ))}

          <div style={{ position: "relative", display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 60, alignItems: "center" }} className="cta-inner">
            <div>
              <span className="eyebrow" style={{ color: "var(--accent)" }}>
                <span className="dot"/>BOOK A 30-MIN AUDIT
              </span>
              <h2 className="h2" style={{ marginTop: 22, marginBottom: 22, color: "#fff" }}>
                Not sure which system your operation needs?<br/>Get your <em>operational system map</em>.
              </h2>
              <p style={{ fontSize: 17, lineHeight: 1.55, color: "rgba(255,255,255,0.7)", margin: 0, maxWidth: "50ch" }}>
                You talk. We map your gaps against the five failure modes, locate what's actually costing you money, and tell you what to build before you build it. If we can't help, we'll say so on the call.
              </p>

              <div style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 32, flexWrap: "wrap" }}>
                <a href="#" className="btn btn-primary" style={{ padding: "14px 22px", fontSize: 14.5 }}>
                  Pick a slot <ArrowRight />
                </a>
                <a href="mailto:hello@keymouseit.com" className="btn btn-ghost" style={{ padding: "14px 22px", fontSize: 14.5, color: "#fff", borderColor: "rgba(255,255,255,0.2)" }}>
                  hello@keymouseit.com <ArrowUpRight />
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
        </div>

        <style>{`
          @media (max-width: 900px) {
            .cta-inner { grid-template-columns: 1fr !important; }
            .cta-card { padding: 48px 28px !important; }
          }
        `}</style>
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

function AuditCardDummy() {
  // Real-feeling availability slots — high-conversion, lower friction than a form.
  const slots = [
    { day: "Tue", date: "27 May", time: "10:30",    tz: "IST",  open: true  },
    { day: "Wed", date: "28 May", time: "16:00",    tz: "IST",  open: true  },
    { day: "Thu", date: "29 May", time: "09:00",    tz: "GST",  open: true  },
    { day: "Fri", date: "30 May", time: "—",        tz: "FULL", open: false },
  ];
  const [picked, setPicked] = React.useState(0);

  return (
    <div style={{
      position: "relative",
      background: "rgba(8,10,15,0.6)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 16,
      padding: "20px 20px 22px",
      backdropFilter: "blur(10px)",
    }}>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        paddingBottom: 14, marginBottom: 14,
        borderBottom: "1px dashed rgba(255,255,255,0.1)",
        fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.14em",
        color: "rgba(255,255,255,0.5)", textTransform: "uppercase",
      }}>
        <span><span style={{ color: "var(--accent)" }}>●</span> NEXT AVAILABLE</span>
        <span>30 MIN · ZOOM</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 }}>
        {slots.map((s, i) => {
          const active = i === picked && s.open;
          return (
            <button
              key={i}
              onClick={() => s.open && setPicked(i)}
              disabled={!s.open}
              style={{
                display: "grid",
                gridTemplateColumns: "40px 90px 1fr auto",
                gap: 12, alignItems: "center",
                padding: "10px 12px",
                background: active ? "rgba(37,99,255,0.06)" : "rgba(255,255,255,0.015)",
                border: `1px solid ${active ? "rgba(37,99,255,0.40)" : "rgba(255,255,255,0.08)"}`,
                borderRadius: 10,
                color: s.open ? "#fff" : "rgba(255,255,255,0.4)",
                cursor: s.open ? "pointer" : "not-allowed",
                opacity: s.open ? 1 : 0.5,
                textAlign: "left",
                transition: "all .15s ease",
              }}
            >
              <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: active ? "var(--accent)" : "var(--muted)", letterSpacing: "0.08em" }}>
                {s.day.toUpperCase()}
              </span>
              <span style={{ fontFamily: "var(--mono)", fontSize: 12, color: s.open ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.4)" }}>
                {s.date}
              </span>
              <span style={{ fontSize: 13.5, fontWeight: 500, letterSpacing: "-0.005em" }}>
                {s.time}
                <span style={{ fontFamily: "var(--mono)", fontSize: 10.5, color: "rgba(255,255,255,0.5)", marginLeft: 8, letterSpacing: "0.08em" }}>
                  {s.tz}
                </span>
              </span>
              <span style={{
                width: 16, height: 16, borderRadius: "50%",
                border: `1px solid ${active ? "var(--accent)" : "rgba(255,255,255,0.15)"}`,
                display: "grid", placeItems: "center", flexShrink: 0,
              }}>
                {active && <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", boxShadow: "0 0 6px var(--accent)" }}/>}
              </span>
            </button>
          );
        })}
      </div>

      <a href="#" className="btn btn-primary" style={{
        width: "100%", justifyContent: "center", padding: "13px 18px", fontSize: 14,
      }}>
        Request system map <ArrowRight/>
      </a>

      <div style={{
        marginTop: 14,
        fontFamily: "var(--mono)", fontSize: 10.5, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em",
        display: "flex", justifyContent: "space-between",
      }}>
        <span>NO PITCH</span><span>NO DECK</span><span>NDA OK</span>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="foot" id="contact" data-screen-label="Footer">
      <div className="wrap">
        <div className="row" style={{ alignItems: "flex-start", marginBottom: 40 }}>
          <div style={{ maxWidth: 360 }}>
            <a href="#" className="brand" style={{ display: "inline-flex", alignItems: "center", marginBottom: 18 }}>
              <Logo height={40} mode="light" />
            </a>
            <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "var(--muted)", margin: "14px 0 0" }}>
              Custom operational software and AI systems for manufacturing, logistics, supply chain, and leadership teams.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(140px, 1fr))", gap: 40 }}>
            <FootCol title="Systems" links={["Manufacturing Control Tower","Inventory Intelligence","Logistics Control Tower","Predictive Planning","Decision Intelligence"]}/>
            {/*<FootCol title="Company" links={["About","Engagements","Writing","Careers"]}/>*/}
            <FootCol title="Contact" links={["hello@keymouseit.com"]}/>
          </div>
        </div>

        <div className="row" style={{
          paddingTop: 24, borderTop: "1px solid var(--line)",
          fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.1em", color: "var(--muted-2)",
        }}>
          <span>© 2026 KEYMOUSEIT · OPERATIONAL SYSTEMS</span>
          <span><span style={{ color: "var(--accent)" }}>●</span> ACCEPTING ENGAGEMENTS · Q3 ’26</span>
        </div>
      </div>
    </footer>
  );
}

const LINK_MAP = {
  "Manufacturing Control Tower": "Manufacturing Control Tower.html",
  "Inventory Intelligence": "Inventory Intelligence.html",
  "Logistics Control Tower": "Logistics Control Tower.html",
  "Predictive Planning": "Predictive Inventory Planning.html",
  "Decision Intelligence": "Decision Intelligence.html",
  "hello@keymouseit.com": "mailto:hello@keymouseit.com"
};

function FootCol({ title, links }) {
  return (
    <div>
      <div style={{
        fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.14em",
        textTransform: "uppercase", color: "var(--text-2)",
        marginBottom: 16,
      }}>{title}</div>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
        {links.map((l, i) => (
          <li key={i}>
            <a href={LINK_MAP[l] || "#"} style={{ fontSize: 13.5, color: "var(--muted)", transition: "color .15s" }}
               onMouseEnter={e => e.currentTarget.style.color = "var(--text)"}
               onMouseLeave={e => e.currentTarget.style.color = "var(--muted)"}>
              {l}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

window.CTA = CTA;
window.Footer = Footer;
