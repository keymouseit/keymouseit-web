const SITE = 'https://keymouseit.com';

export const PAGE_SEO = {
  '/': {
    title: 'KeyMouse IT — AI-Powered Systems. Real Business Impact.',
    description:
      'KeyMouse IT builds AI-powered operational systems, enterprise platforms, and workflow automation. Inputs become intelligence. Intelligence drives outcomes.',
  },
  '/privacy': {
    title: 'Privacy Policy — KeyMouse IT',
    description: 'Privacy policy for KeyMouse IT services and website.',
  },
  '/terms': {
    title: 'Terms of Service — KeyMouse IT',
    description: 'Terms of service for KeyMouse IT software development and consulting.',
  },
  '/testimonials': {
    title: 'Client Testimonials — KeyMouse IT',
    description:
      'Read client reviews for KeyMouse IT — React Native, web development, QA, and long-term product engagements since 2018.',
  },
  '/case-studies': {
    title: 'Case Studies — KeyMouse IT',
    description: 'Operational system case studies for manufacturing, logistics, inventory, healthcare and leadership teams.',
  },
  '/case-studies/manufacturing-control-tower': {
    title: 'Manufacturing Control Tower — KeyMouse IT Case Study',
    description: 'How a manufacturing control tower cut batch delays, inventory mismatch and compliance failures.',
  },
  '/case-studies/decision-intelligence': {
    title: 'Decision Intelligence — KeyMouse IT Case Study',
    description: 'A decision intelligence system that ended conflicting reports and slow leadership decisions.',
  },
  '/case-studies/inventory-intelligence': {
    title: 'Inventory Intelligence — KeyMouse IT Case Study',
    description: 'Inventory intelligence that reduced leakage, stockouts and emergency procurement.',
  },
  '/case-studies/logistics-control-tower': {
    title: 'Logistics Control Tower — KeyMouse IT Case Study',
    description: 'A logistics control tower that cut dispatch delays and fleet idle time.',
  },
  '/case-studies/predictive-inventory-planning': {
    title: 'Predictive Inventory Planning — KeyMouse IT Case Study',
    description: 'Predictive planning that reduced stockouts, overstock and emergency procurement.',
  },
  '/case-studies/connected-care-operations': {
    title: 'Connected Care Operations — KeyMouse IT Case Study',
    description: 'A connected care operating system for multi-specialty clinics and patient self-service.',
  },
};

export function applyPageSeo(pathname) {
  const path = pathname.replace(/\/$/, '') || '/';
  const seo = PAGE_SEO[path] || PAGE_SEO['/'];

  document.title = seo.title;

  let description = document.querySelector('meta[name="description"]');
  if (!description) {
    description = document.createElement('meta');
    description.name = 'description';
    document.head.appendChild(description);
  }
  description.setAttribute('content', seo.description);

  const canonicalUrl = path === '/' ? `${SITE}/` : `${SITE}${path}`;
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = canonicalUrl;
}
