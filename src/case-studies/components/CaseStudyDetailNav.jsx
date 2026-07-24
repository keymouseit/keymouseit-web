import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { Logo, Icon } from '../../components/site-ui';
import { ArrowRight } from './icons';

export default function CaseStudyDetailNav({
  title,
  ctaHref = '#cta',
  showPdfDownload = false,
  onPrint,
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const closeMenu = () => setOpen(false);

  const mobileMenu = (
    <div
      className={`nav-drawer${open ? ' open' : ''}`}
      aria-hidden={!open}
      onClick={closeMenu}
    >
      <div className="nav-drawer-panel" onClick={(e) => e.stopPropagation()}>
        <div className="nav-drawer-header">
          <Link to="/" className="brand" onClick={closeMenu}>
            <Logo height={40} mode="light" />
          </Link>
          <button type="button" className="nav-drawer-close" aria-label="Close menu" onClick={closeMenu}>
            <Icon name="X" size={22} stroke={2.2} color="var(--text)" />
          </button>
        </div>
        <nav className="nav-drawer-links" aria-label="Mobile">
          <Link to="/case-studies" onClick={closeMenu}>
            <span>All case studies</span>
            <Icon name="ArrowUpRight" size={18} stroke={2} color="var(--faint)" />
          </Link>
          <a href={ctaHref} onClick={closeMenu}>
            <span>Get System Map</span>
            <Icon name="ArrowUpRight" size={18} stroke={2} color="var(--faint)" />
          </a>
        </nav>
        <div className="nav-drawer-footer">
          <a href={ctaHref} className="btn btn-primary" onClick={closeMenu}>
            Get System Map <ArrowRight />
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}${open ? ' menu-open' : ''}`} data-screen-label="Nav">
      <div className="wrap nav-inner">
        <Link to="/" className="brand" onClick={closeMenu}>
          <Logo height={40} mode="light" />
        </Link>

        <div className="crumbs">
          <Link to="/case-studies">Case Studies</Link>
          <span className="sep">/</span>
          <span className="cur">{title}</span>
        </div>

        <div className="nav-cta nav-detail-cta">
          {showPdfDownload && onPrint && (
            <button
              type="button"
              className="btn btn-ghost pdf-download-btn is-visible no-print"
              title="Save this case study as a PDF"
              onClick={onPrint}
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              PDF
            </button>
          )}
          <a href={ctaHref} className="btn btn-primary" style={{ padding: '9px 14px', fontSize: 13 }}>
            Get System Map <ArrowRight />
          </a>
        </div>

        <button
          type="button"
          className="nav-burger"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((isOpen) => !isOpen)}
        >
          <Icon name={open ? 'X' : 'Menu'} size={24} stroke={2.2} color="var(--text)" />
        </button>
      </div>

      {typeof document !== 'undefined' ? createPortal(mobileMenu, document.body) : null}
    </nav>
  );
}
