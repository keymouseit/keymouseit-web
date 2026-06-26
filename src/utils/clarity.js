/**
 * Site-wide journey tracking for Microsoft Clarity + Google Analytics 4.
 * Events are mirrored to both platforms from a single API.
 */
export const JOURNEY_STEPS = {
  SITE_LANDING: 'site_landing',
  PAGE_VIEW: 'page_view',
  SECTION_VIEWED: 'section_viewed',
  CTA_CLICK: 'cta_click',
  LEAD_FORM_SUBMITTED: 'lead_form_submitted',
  CALENDLY_EMBED_VIEWED: 'calendly_embed_viewed',
  CALENDLY_DATE_SELECTED: 'calendly_date_selected',
  CALENDLY_BOOKING_CONFIRMED: 'calendly_booking_confirmed',
};

const GA_MEASUREMENT_ID =
  import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-7RFZ980XQJ';

const JOURNEY_STORAGE_KEY = 'clarity_journey_path';
const LANDING_TRACKED_KEY = 'clarity_landing_tracked';

const PAGE_NAMES = {
  '/': 'home',
  '/privacy': 'privacy',
  '/terms': 'terms',
  '/case-studies': 'case_studies_index',
  '/case-studies/manufacturing-control-tower': 'case_manufacturing',
  '/case-studies/decision-intelligence': 'case_decision',
  '/case-studies/inventory-intelligence': 'case_inventory',
  '/case-studies/logistics-control-tower': 'case_logistics',
  '/case-studies/predictive-inventory-planning': 'case_predictive',
};

function clarityFn() {
  return typeof window !== 'undefined' ? window.clarity : undefined;
}

function gtagFn() {
  return typeof window !== 'undefined' ? window.gtag : undefined;
}

function getPageName(pathname) {
  return PAGE_NAMES[pathname] || pathname.replace(/^\//, '').replace(/\//g, '_') || 'home';
}

function readUtmParams(search = '') {
  const params = new URLSearchParams(search);
  const utm = {};

  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach((key) => {
    const value = params.get(key);
    if (value) utm[key.replace('utm_', '')] = value;
  });

  return utm;
}

function appendJourneyPath(step) {
  if (typeof window === 'undefined') return '';

  const previous = sessionStorage.getItem(JOURNEY_STORAGE_KEY) || '';
  const next = previous ? `${previous} > ${step}` : step;

  sessionStorage.setItem(JOURNEY_STORAGE_KEY, next);
  return next;
}

function trackClarity(step, metadata, journeyPath) {
  const clarity = clarityFn();
  if (!clarity) return;

  clarity('event', step);
  clarity('set', 'last_step', step);
  clarity('set', 'journey_path', journeyPath);
  clarity('set', 'journey_steps', String(journeyPath.split(' > ').length));

  Object.entries(metadata).forEach(([key, value]) => {
    if (value != null && value !== '') {
      clarity('set', key, String(value));
    }
  });
}

function trackGAEvent(eventName, metadata = {}) {
  const gtag = gtagFn();
  if (!gtag) return;

  gtag('event', eventName, {
    send_to: GA_MEASUREMENT_ID,
    ...metadata,
  });
}

export function initClarity() {
  const projectId = import.meta.env.VITE_CLARITY_PROJECT_ID;
  if (!projectId || clarityFn()) return;

  (function (c, l, a, r, i, t, y) {
    c[a] =
      c[a] ||
      function () {
        (c[a].q = c[a].q || []).push(arguments);
      };
    t = l.createElement(r);
    t.async = 1;
    t.src = 'https://www.clarity.ms/tag/' + i;
    y = l.getElementsByTagName(r)[0];
    y.parentNode.insertBefore(t, y);
  })(window, document, 'clarity', 'script', projectId);
}

export function trackJourneyStep(step, metadata = {}) {
  const journeyPath = appendJourneyPath(step);
  const payload = {
    ...metadata,
    journey_path: journeyPath,
    journey_steps: journeyPath.split(' > ').length,
    last_step: step,
  };

  trackClarity(step, metadata, journeyPath);
  trackGAEvent(step, payload);

  if (import.meta.env.DEV) {
    console.info('[Analytics]', step, payload);
  }
}

export function trackSiteLanding(pathname, search = '') {
  if (typeof window === 'undefined') return;
  if (sessionStorage.getItem(LANDING_TRACKED_KEY)) return;

  sessionStorage.setItem(LANDING_TRACKED_KEY, '1');

  trackJourneyStep(JOURNEY_STEPS.SITE_LANDING, {
    page: getPageName(pathname),
    path: pathname,
    referrer: document.referrer || 'direct',
    ...readUtmParams(search),
  });
}

export function trackPageView(pathname, search = '') {
  const pageName = getPageName(pathname);
  const pagePath = `${pathname}${search}`;
  const utm = readUtmParams(search);
  const metadata = {
    page: pageName,
    path: pathname,
    ...utm,
  };
  const journeyPath = appendJourneyPath(JOURNEY_STEPS.PAGE_VIEW);

  trackClarity(JOURNEY_STEPS.PAGE_VIEW, metadata, journeyPath);

  const gtag = gtagFn();
  if (gtag) {
    gtag('event', 'page_view', {
      send_to: GA_MEASUREMENT_ID,
      page_path: pagePath,
      page_title: pageName,
      page_location: window.location.href,
      journey_path: journeyPath,
      ...metadata,
    });
  }

  if (import.meta.env.DEV) {
    console.info('[Analytics]', JOURNEY_STEPS.PAGE_VIEW, {
      journey_path: journeyPath,
      ...metadata,
    });
  }
}

export function trackSectionViewed(sectionId, sectionLabel, pathname) {
  trackJourneyStep(JOURNEY_STEPS.SECTION_VIEWED, {
    section: sectionLabel || sectionId,
    section_id: sectionId,
    page: getPageName(pathname),
    path: pathname,
  });
}

export function trackCtaClick(cta, destination = '', pathname = '/') {
  trackJourneyStep(JOURNEY_STEPS.CTA_CLICK, {
    cta,
    destination,
    page: getPageName(pathname),
    path: pathname,
  });
}
