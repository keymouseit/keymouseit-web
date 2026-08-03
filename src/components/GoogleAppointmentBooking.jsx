import React, { useEffect, useRef } from 'react';

import { CONTACT_CONFIG } from '../data/site-data';
import { JOURNEY_STEPS, trackJourneyStep } from '../utils/clarity';

export default function GoogleAppointmentBooking({ className = '' }) {
  const viewedRef = useRef(false);
  const bookingUrl = CONTACT_CONFIG.googleAppointmentUrl;

  useEffect(() => {
    if (!bookingUrl || viewedRef.current) return;

    viewedRef.current = true;
    trackJourneyStep(JOURNEY_STEPS.BOOKING_SCHEDULER_VIEWED);
  }, [bookingUrl]);

  if (!bookingUrl) return null;

  const handleBookClick = () => {
    trackJourneyStep(JOURNEY_STEPS.BOOKING_LINK_CLICKED);
  };

  return (
    <a
      href={bookingUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleBookClick}
      className={`google-appointment-link ${className}`.trim()}
      style={{
        display: 'inline-flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        padding: '12px 16px',
        borderRadius: 10,
        border: '1px solid rgba(111,160,255,0.35)',
        background: 'rgba(37,99,255,0.1)',
        color: '#93C5FD',
        fontSize: 14,
        fontWeight: 600,
        textDecoration: 'none',
        boxSizing: 'border-box'
      }}
    >
      Pick a time on Google Calendar
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    </a>
  );
}
