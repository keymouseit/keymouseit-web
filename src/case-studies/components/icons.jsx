import React from 'react';
export { Logo } from '../../components/site-ui';

// Small, sharp line-icons for failure modes + UI
export const ArrowRight = ({ size = 14, stroke = "currentColor" }) => (
  <svg className="arrow" width={size} height={size} viewBox="0 0 16 16" fill="none">
    <path d="M3 8h10M9 4l4 4-4 4" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const ArrowUpRight = ({ size = 14, stroke = "currentColor" }) => (
  <svg className="arrow" width={size} height={size} viewBox="0 0 16 16" fill="none">
    <path d="M5 11l6-6M5 5h6v6" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Failure-mode icons — each is a 56x56 diagrammatic glyph
export function IconCoordination() {
  return (
    <svg width="24" height="24" viewBox="0 0 56 56" fill="none">
      <g stroke="currentColor" strokeWidth="3.2" strokeLinecap="round">
        <circle cx="12" cy="14" r="3.5" />
        <circle cx="44" cy="14" r="3.5" />
        <circle cx="12" cy="42" r="3.5" />
        <circle cx="44" cy="42" r="3.5" />
        <circle cx="28" cy="28" r="2.5" fill="currentColor" opacity="0.4"/>
        <path d="M15 14 H41" strokeDasharray="2 3"/>
        <path d="M12 17 V39" strokeDasharray="2 3"/>
        <path d="M44 17 V39" strokeDasharray="2 3" opacity="0.4"/>
        <path d="M15 42 H41" strokeDasharray="2 3" opacity="0.4"/>
      </g>
    </svg>
  );
}

export function IconVisibility() {
  return (
    <svg width="24" height="24" viewBox="0 0 56 56" fill="none">
      <g stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="14" width="40" height="28" rx="2" />
        <path d="M8 22 H48" />
        <path d="M14 36 V28" opacity="0.9"/>
        <path d="M20 36 V32" opacity="0.6"/>
        <path d="M26 36 V26" opacity="0.3"/>
        <path d="M32 36 V30" opacity="0.2"/>
        <path d="M38 36 V32" opacity="0.15"/>
        <path d="M44 36 V28" opacity="0.1"/>
        <circle cx="42" cy="18" r="1.2" fill="currentColor"/>
      </g>
    </svg>
  );
}

export function IconSequencing() {
  return (
    <svg width="24" height="24" viewBox="0 0 56 56" fill="none">
      <g stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="20" width="12" height="16" rx="1.5"/>
        <rect x="22" y="20" width="12" height="16" rx="1.5"/>
        <rect x="38" y="20" width="12" height="16" rx="1.5"/>
        <text x="12" y="31" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="8" fill="currentColor" stroke="none">02</text>
        <text x="28" y="31" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="8" fill="currentColor" stroke="none">03</text>
        <text x="44" y="31" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="8" fill="currentColor" stroke="none">01</text>
        <path d="M12 16 Q28 6 44 16" strokeDasharray="2 2"/>
      </g>
    </svg>
  );
}

export function IconPlanning() {
  return (
    <svg width="24" height="24" viewBox="0 0 56 56" fill="none">
      <g stroke="currentColor" strokeWidth="3.2" strokeLinejoin="round" strokeLinecap="round">
        <path d="M6 30 L14 30 L14 18 L22 18 L22 40 L30 40 L30 24 L38 24 L38 12 L46 12 L46 36 L50 36" />
        <path d="M6 26 H50" strokeDasharray="3 3" opacity="0.5"/>
      </g>
    </svg>
  );
}

export function IconLatency() {
  return (
    <svg width="24" height="24" viewBox="0 0 56 56" fill="none">
      <g stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="28" cy="28" r="16"/>
        <path d="M28 16 V28 L36 33" />
        <path d="M28 10 V12"/>
        <path d="M28 44 V46"/>
        <path d="M10 28 H12"/>
        <path d="M44 28 H46"/>
        <circle cx="44" cy="14" r="3" fill="currentColor" opacity="0.9" stroke="none"/>
      </g>
    </svg>
  );
}

// Case-study layer icons
export function LayerGlyph({ kind }) {
  const common = { width: 40, height: 40, viewBox: "0 0 40 40", fill: "none" };
  if (kind === "exec") return (
    <svg {...common}><g stroke="currentColor" strokeWidth="1.25" strokeLinecap="round">
      <rect x="6" y="8" width="8" height="8"/><rect x="16" y="8" width="8" height="8"/><rect x="26" y="8" width="8" height="8"/>
      <rect x="6" y="18" width="8" height="8"/><rect x="16" y="18" width="8" height="8" fill="currentColor" opacity="0.25"/><rect x="26" y="18" width="8" height="8"/>
      <rect x="6" y="28" width="8" height="4"/><rect x="16" y="28" width="8" height="4"/><rect x="26" y="28" width="8" height="4"/>
    </g></svg>
  );
  if (kind === "vis") return (
    <svg {...common}><g stroke="currentColor" strokeWidth="1.25" strokeLinecap="round">
      <rect x="6" y="6" width="28" height="28" rx="1.5"/>
      <path d="M6 14 H34"/>
      <path d="M10 26 V20"/><path d="M14 26 V18"/><path d="M18 26 V22"/><path d="M22 26 V16"/><path d="M26 26 V20"/><path d="M30 26 V24"/>
    </g></svg>
  );
  if (kind === "orch") return (
    <svg {...common}><g stroke="currentColor" strokeWidth="1.25" strokeLinecap="round">
      <circle cx="20" cy="20" r="3" fill="currentColor"/>
      <circle cx="8"  cy="10" r="2.5"/><circle cx="32" cy="10" r="2.5"/>
      <circle cx="8"  cy="30" r="2.5"/><circle cx="32" cy="30" r="2.5"/>
      <path d="M10 12 L18 18"/><path d="M30 12 L22 18"/>
      <path d="M10 28 L18 22"/><path d="M30 28 L22 22"/>
    </g></svg>
  );
  if (kind === "plan") return (
    <svg {...common}><g stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 28 L14 22 L20 26 L28 14 L34 18"/>
      <circle cx="6"  cy="28" r="1.5" fill="currentColor"/>
      <circle cx="14" cy="22" r="1.5" fill="currentColor"/>
      <circle cx="20" cy="26" r="1.5" fill="currentColor"/>
      <circle cx="28" cy="14" r="1.5" fill="currentColor"/>
      <circle cx="34" cy="18" r="1.5" fill="currentColor"/>
      <path d="M6 34 H34" strokeDasharray="2 2" opacity="0.5"/>
    </g></svg>
  );
  if (kind === "dec") return (
    <svg {...common}><g stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 L20 34"/>
      <path d="M20 14 L10 22"/>
      <path d="M20 14 L30 22"/>
      <circle cx="20" cy="6" r="2" fill="currentColor"/>
      <circle cx="10" cy="22" r="2"/>
      <circle cx="30" cy="22" r="2"/>
      <circle cx="20" cy="34" r="2" fill="currentColor"/>
    </g></svg>
  );
  return null;
}
