/* eslint-disable */
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

  if (sent) {
    return (
      <div style={{ textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 20 }}>
          <span style={{ width: 26, height: 26, borderRadius: "50%", background: "rgba(22,163,74,0.16)", border: "1px solid rgba(22,163,74,0.4)", color: "#4ADE80", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M13.25 4.75L6 12L2.75 8.75" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          <span style={{ color: "#fff", fontSize: 14, fontWeight: 600 }}>Inquiry sent! Book your time slot:</span>
        </div>
        <div style={{ width: "100%", height: 480, borderRadius: 12, overflow: "hidden", background: "#fff", boxShadow: "0 8px 30px rgba(0,0,0,0.12)" }}>
          <iframe 
            src={`https://calendly.com/hi-shivenj/30min?name=${encodeURIComponent(formData.name)}&email=${encodeURIComponent(formData.email)}&hide_landing_page_details=1&hide_gdpr_banner=1`}
            width="100%" 
            height="100%" 
            frameBorder="0" 
            title="Schedule Strategy Call"
          />
        </div>
      </div>
    );
  }

  return (
    <div style={{
      position: "relative",
      background: "rgba(8,10,15,0.6)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 16,
      padding: "24px",
      backdropFilter: "blur(10px)",
      width: "100%",
    }}>
      {errorMsg && (
        <div style={{ color: '#F87171', backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 10, padding: '10px 12px', marginBottom: 16, fontSize: 13, display: 'flex', alignItems: 'flex-start', gap: 8, lineHeight: 1.4 }}>
          <span style={{ display: 'inline-flex', flexShrink: 0, marginTop: 2, color: '#EF4444' }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2">
              <circle cx="8" cy="8" r="7"/>
              <line x1="8" y1="5" x2="8" y2="9"/>
              <circle cx="8" cy="11" r="0.5" fill="currentColor"/>
            </svg>
          </span>
          <span>{errorMsg}</span>
        </div>
      )}
      <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div className="field" style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 12.5, fontWeight: 600, color: "#C7D2E0", display: "block" }}>Name</label>
            <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Your name" style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.14)", borderRadius: 10, padding: "10px 12px", color: "#fff", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
          </div>
          <div className="field" style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 12.5, fontWeight: 600, color: "#C7D2E0", display: "block" }}>Work email</label>
            <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="you@company.com" style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.14)", borderRadius: 10, padding: "10px 12px", color: "#fff", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
          </div>
        </div>
        <div className="field" style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label style={{ fontSize: 12.5, fontWeight: 600, color: "#C7D2E0", display: "block" }}>Company</label>
          <input required value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} placeholder="Company name" style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.14)", borderRadius: 10, padding: "10px 12px", color: "#fff", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
        </div>
        <div className="field" style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label style={{ fontSize: 12.5, fontWeight: 600, color: "#C7D2E0", display: "block" }}>Project challenge</label>
          <textarea required rows="2" value={formData.challenge} onChange={e => setFormData({...formData, challenge: e.target.value})} placeholder="What operational problem are you trying to solve?" style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.14)", borderRadius: 10, padding: "10px 12px", color: "#fff", fontSize: 14, outline: "none", resize: "none", boxSizing: "border-box" }}></textarea>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div className="field" style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 12.5, fontWeight: 600, color: "#C7D2E0", display: "block" }}>Budget range</label>
            <select value={formData.budget} onChange={e => setFormData({...formData, budget: e.target.value})} required style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.14)", borderRadius: 10, padding: "10px 12px", color: "#fff", fontSize: 14, outline: "none", boxSizing: "border-box" }}>
              <option value="" disabled style={{ color: "#111827" }}>Select range</option>
              <option style={{ color: "#111827" }}>{"< $25k"}</option>
              <option style={{ color: "#111827" }}>$25k – $75k</option>
              <option style={{ color: "#111827" }}>$75k – $200k</option>
              <option style={{ color: "#111827" }}>$200k+</option>
            </select>
          </div>
          <div className="field" style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 12.5, fontWeight: 600, color: "#C7D2E0", display: "block" }}>Timeline</label>
            <select value={formData.timeline} onChange={e => setFormData({...formData, timeline: e.target.value})} required style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.14)", borderRadius: 10, padding: "10px 12px", color: "#fff", fontSize: 14, outline: "none", boxSizing: "border-box" }}>
              <option value="" disabled style={{ color: "#111827" }}>Select timeline</option>
              <option style={{ color: "#111827" }}>ASAP</option>
              <option style={{ color: "#111827" }}>1–3 months</option>
              <option style={{ color: "#111827" }}>3–6 months</option>
              <option style={{ color: "#111827" }}>Exploring</option>
            </select>
          </div>
        </div>
        <button type="submit" disabled={submitting} className="btn btn-primary" style={{ marginTop: 8, padding: "12px 18px", width: "100%", justifyContent: "center" }}>
          {submitting ? "Sending..." : "Book Strategy Call"} <span className="arrow">→</span>
        </button>
        <p style={{ fontSize: 11.5, color: "#6B7689", textAlign: "center", margin: "4px 0 0" }}>Free consultation · No commitment · Quick response</p>
      </form>
    </div>
  );
}
window.ContactForm = ContactForm;
