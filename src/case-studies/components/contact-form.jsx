import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { CONTACT_CONFIG } from '../../data/site-data';
import {
  buildCalendlyEmbedUrl,
  useCalendlyBookingListener
} from '../../utils/calendly';

/* eslint-disable */
/* ══════════════════════════════════════════════════════════════
   ContactForm — Single source of truth for all case-study pages.
   Loaded once via <script type="text/babel" src="components/contact-form.jsx">
   and registered on window.ContactForm so every CTA can use <ContactForm/>.
   ══════════════════════════════════════════════════════════════ */

const FORM_STYLE = `
  .case-field { display: flex; flex-direction: column; gap: 8px; text-align: left; }
  .case-field label { font-size: 13px; font-weight: 600; color: #C7D2E0; letter-spacing: 0.2px; }
  .case-field input, .case-field select, .case-field textarea {
    font-family: var(--sans); font-size: 15px; color: #fff;
    background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.14);
    border-radius: 10px; padding: 13px 15px; outline: none; transition: border-color 0.16s, background 0.16s;
    width: 100%; box-sizing: border-box;
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

export function ContactForm() {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    company: '',
    challenge: '',
    budget: '',
    timeline: ''
  });
  const [captchaToken, setCaptchaToken] = React.useState('');
  const [errorMsg, setErrorMsg] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);
  const [sent, setSent] = React.useState(false);

  useCalendlyBookingListener(formData, sent);

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

    if (!captchaToken) {
      setErrorMsg("Please complete the captcha verification.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/.netlify/functions/submit-lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({ ...formData, captchaToken })
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
              src={buildCalendlyEmbedUrl({
                name: formData.name,
                email: formData.email
              })}
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
            <input value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} placeholder="Company name" />
          </div>
          <div className="case-field">
            <label>Project challenge</label>
            <textarea rows="2" value={formData.challenge} onChange={e => setFormData({...formData, challenge: e.target.value})} placeholder="What problem are you trying to solve?" style={{ resize: "vertical" }}></textarea>
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
          <div style={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
            <ReCAPTCHA
              sitekey={CONTACT_CONFIG.recaptchaSiteKey}
              onChange={(token) => setCaptchaToken(token || '')}
              theme="dark"
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={submitting} style={{ width: "100%", justifyContent: "center", padding: "13px 18px", fontSize: 14, marginTop: 8 }}>
            {submitting ? "Sending Inquiry..." : "Book Strategy Call"}
          </button>
        </form>
      )}
    </div>
  );
}
