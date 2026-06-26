import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import {
  trackCtaClick,
  trackPageView,
  trackSectionViewed,
  trackSiteLanding,
} from '../utils/clarity';

function classifyLinkClick(href, pathname) {
  if (!href) return null;

  if (href.includes('wa.me')) {
    return { cta: 'whatsapp', destination: href };
  }

  if (href === '#contact' || href.endsWith('#contact')) {
    return { cta: 'book_strategy_call', destination: href };
  }

  if (href.startsWith('#')) {
    return { cta: 'nav_section', destination: href };
  }

  if (href.includes('/case-studies')) {
    return { cta: 'case_study_link', destination: href };
  }

  if (href.startsWith('mailto:')) {
    return { cta: 'email', destination: href };
  }

  if (
    href.startsWith('http') &&
    !href.includes(window.location.hostname)
  ) {
    return { cta: 'outbound_link', destination: href };
  }

  if (href === '/' || href === pathname) {
    return { cta: 'home_link', destination: href };
  }

  if (href.startsWith('/') && href !== pathname) {
    return { cta: 'internal_link', destination: href };
  }

  return null;
}

function setupSectionObserver(pathname, seenSections) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || entry.intersectionRatio < 0.35) return;

        const el = entry.target;
        const sectionId = el.id;
        if (!sectionId) return;

        const sectionKey = `${pathname}#${sectionId}`;
        if (seenSections.has(sectionKey)) return;

        seenSections.add(sectionKey);
        const sectionLabel =
          el.getAttribute('data-screen-label') || sectionId;

        trackSectionViewed(sectionId, sectionLabel, pathname);
      });
    },
    { threshold: [0.35] }
  );

  document
    .querySelectorAll('section[id], header[id], footer[id]')
    .forEach((el) => observer.observe(el));

  return observer;
}

export default function ClarityJourney() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    trackSiteLanding(pathname, search);
    trackPageView(pathname, search);
  }, [pathname, search]);

  useEffect(() => {
    const seenSections = new Set();

    const scanSections = () => {
      return setupSectionObserver(pathname, seenSections);
    };

    let observer = scanSections();

    const rescanTimer = window.setTimeout(() => {
      observer.disconnect();
      observer = scanSections();
    }, 800);

    return () => {
      window.clearTimeout(rescanTimer);
      observer.disconnect();
    };
  }, [pathname]);

  useEffect(() => {
    const onClick = (event) => {
      const link = event.target.closest('a[href], button[data-href]');
      if (!link) return;

      const href =
        link.getAttribute('href') || link.getAttribute('data-href') || '';
      const classified = classifyLinkClick(href, pathname);

      if (classified) {
        trackCtaClick(classified.cta, classified.destination, pathname);
      }
    };

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [pathname]);

  return null;
}
