import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../components/site-ui';
import { ArrowRight, ArrowUpRight } from './components/icons';
import { ContactForm } from './components/contact-form';
import { CaseStudySections } from './ConnectedCareOperations.generated';
import './case-studies.css';
import './clinic-case-study.css';
import './clinic-mfg-layout.css';

function CaseNav({ showPdfDownload }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handlePrint = () => {
    document.body.classList.add('is-printing');
    window.print();
    window.addEventListener('afterprint', () => document.body.classList.remove('is-printing'), { once: true });
  };

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`} data-screen-label="Nav">
      <div className="wrap nav-inner">
        <Link to="/" className="brand" style={{ display: 'inline-flex', alignItems: 'center', lineHeight: 0 }}>
          <Logo height={40} mode="light" />
        </Link>

        <div className="crumbs" style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/case-studies">Case Studies</Link>
          <span className="sep">/</span>
          <span className="cur">Connected Care Operations</span>
        </div>

        <div className="nav-cta" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {showPdfDownload && (
            <button
              type="button"
              className="btn btn-ghost pdf-download-btn is-visible no-print"
              title="Save this case study as a PDF"
              onClick={handlePrint}
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download PDF
            </button>
          )}
          <a href="#cta" className="btn btn-primary" style={{ padding: '9px 14px', fontSize: 13, color: '#fff' }}>
            Get System Map<ArrowRight />
          </a>
        </div>
      </div>
    </nav>
  );
}

function CaseCTA() {
  return (
    <section className="section cta-section" id="cta" data-screen-label="CTA" style={{ borderTop: 0, padding: '100px 0 80px' }}>
      <div className="wrap">
        <div className="cta-card">
          <span className="cta-card-grid" aria-hidden="true" />
          <span className="cta-glow" aria-hidden="true" />
          <div className="cta-inner">
            <div>
              <span className="eyebrow" style={{ color: 'var(--accent)' }}>
                <span className="dot" />Want this system in your care network?
              </span>
              <h2 className="h2" style={{ marginTop: 22, marginBottom: 22, color: '#fff' }}>
                Map your connected-care operating system.
              </h2>
              <p className="lead-dark">
                Identify where scheduling, clinical records, diagnostics, billing and patient communication break across your current workflow. Then define the system layer that connects them.
              </p>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 32, flexWrap: 'wrap' }}>
                <a href="mailto:hello@keymouseit.com" className="btn btn-ghost" style={{ padding: '14px 22px', fontSize: 14.5, color: '#fff', borderColor: 'rgba(255,255,255,0.2)' }}>
                  hello@keymouseit.com <ArrowUpRight />
                </a>
              </div>
              <div className="cta-trust">
                <span><span className="ok">✓</span> No sales call</span>
                <span><span className="ok">✓</span> NDA on request</span>
                <span><span className="ok">✓</span> 1-page gap map after</span>
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}

function CaseFooter() {
  return (
    <footer className="case-foot">
      <div className="wrap case-foot-row">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Logo height={28} mode="light" />
          <span style={{ color: 'var(--muted-2)' }}>·</span>
          <span>Operational software & AI systems for complex, real-world workflows.</span>
        </div>
        <div className="case-foot-meta">
          <Link to="/case-studies" style={{ color: 'var(--text-2)' }}>← Back to systems</Link>
          <span><span style={{ color: 'var(--accent)' }}>●</span> Q3 ’26 — accepting engagements</span>
        </div>
      </div>
    </footer>
  );
}

function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/919501055574"
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float-btn no-print"
      aria-label="Contact on WhatsApp"
    >
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M12.004 2C6.516 2 2.059 6.458 2.059 11.947c0 1.755.459 3.473 1.33 4.993l-1.413 5.163 5.289-1.387c1.468.802 3.125 1.225 4.739 1.225h.005c5.485 0 9.941-4.457 9.941-9.947C22 6.458 17.502 2 12.004 2z" fill="#FFFFFF" />
        <path d="M16.55 13.7c-.25-.12-1.47-.72-1.7-.8-.22-.08-.38-.12-.55.12-.17.25-.66.8-.8 1-.15.17-.3.2-.55.08-1.25-.62-2.18-1.2-3.02-2.65-.22-.38.22-.35.63-1.18.08-.17.04-.3-.02-.42-.06-.12-.54-1.3-.75-1.8-.2-.5-.4-.4-.55-.4-.14 0-.3 0-.47 0-.17 0-.44.06-.67.3-.23.25-.87.85-.87 2.07 0 1.22.9 2.4 1.02 2.57.12.17 1.76 2.68 4.26 3.75.6.25 1.06.4 1.42.5.6.18 1.15.16 1.58.1.48-.07 1.47-.6 1.7-1.18.23-.58.23-1.08.16-1.18-.07-.1-.25-.16-.5-.28z" fill="#25D366" />
      </svg>
    </a>
  );
}

export default function ConnectedCareOperations() {
  const [showPdfDownload, setShowPdfDownload] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setShowPdfDownload(params.has('download'));
  }, []);

  return (
    <div className="case-study-theme">
      <CaseNav showPdfDownload={showPdfDownload} />
      <div id="pdf-export">
        <CaseStudySections />
        <CaseCTA />
        <CaseFooter />
      </div>
      <WhatsAppFloat />
    </div>
  );
}
