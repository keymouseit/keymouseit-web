import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Icon, Btn, Arrow, Logo } from './site-ui';

export default function NavV2() {
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

  const links = [
    ['About Us', '#founder'],
    ['Capabilities', '#services'],
    ['Industries', '#industries'],
    ['Case Studies', '#cases'],
    ['AI Solutions', '#solutions'],
    ['Contact Us', '#contact'],
  ];

  const closeMenu = () => setOpen(false);

  const mobileMenu = (
    <div
      className={`nav-drawer${open ? ' open' : ''}`}
      aria-hidden={!open}
      onClick={closeMenu}
    >
      <div className="nav-drawer-panel" onClick={(e) => e.stopPropagation()}>
        <div className="nav-drawer-header">
          <a className="nav-drawer-brand" href="/" onClick={closeMenu}>
            <Logo height={40} />
          </a>
          <button
            type="button"
            className="nav-drawer-close"
            aria-label="Close menu"
            onClick={closeMenu}
          >
            <Icon name="X" size={22} stroke={2.2} color="var(--text)" />
          </button>
        </div>

        <nav className="nav-drawer-links" aria-label="Mobile">
          {links.map(([label, href]) => (
            <a key={label} href={href} onClick={closeMenu}>
              <span>{label}</span>
              <Icon name="ArrowUpRight" size={18} stroke={2} color="var(--faint)" />
            </a>
          ))}
        </nav>

        <div className="nav-drawer-footer">
          <a className="btn btn-primary btn-lg btn-block" href="#contact" onClick={closeMenu}>
            Book Strategy Call <Arrow />
          </a>
          <div className="nav-drawer-social">
            <a href="#contact" aria-label="LinkedIn" onClick={closeMenu}>
              <Icon name="Linkedin" size={19} stroke={2} />
            </a>
            <a href="#contact" aria-label="Email" onClick={closeMenu}>
              <Icon name="Mail" size={19} stroke={2} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}${open ? ' menu-open' : ''}`}>
      <div className="container nav-inner">
        <a
          className="brand"
          href="/"
          onClick={closeMenu}
          style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', padding: '4px 0' }}
        >
          <Logo height={44} />
        </a>
        <div className="nav-links">
          {links.slice(0, 5).map(([label, href]) => (
            <a key={label} href={href}>{label}</a>
          ))}
        </div>
        <div className="nav-cta">
          <Btn variant="primary" href="#contact" icon>Book Strategy Call</Btn>
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
