import { useEffect, useRef } from 'react';

import { CONTACT_CONFIG } from '../data/site-data';
import { JOURNEY_STEPS, trackJourneyStep } from './clarity';

export function buildCalendlyEmbedUrl({ name, email, baseUrl = CONTACT_CONFIG.calendlyUrl }) {
  const url = new URL(baseUrl);

  if (name) url.searchParams.set('name', name);
  if (email) url.searchParams.set('email', email);
  url.searchParams.set('hide_landing_page_details', '1');
  url.searchParams.set('hide_gdpr_banner', '1');
  url.searchParams.set('embed_domain', window.location.host);
  url.searchParams.set('embed_type', 'Inline');

  return url.toString();
}

async function notifyBookingScheduled(formData, calendlyPayload) {
  try {
    await fetch('/.netlify/functions/notify-booking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        ...formData,
        calendlyPayload
      })
    });
  } catch (err) {
    console.error('Failed to send booking Slack notification:', err);
  }
}

function isCalendlyMessage(event) {
  return (
    event.origin === 'https://calendly.com' &&
    typeof event.data?.event === 'string' &&
    event.data.event.startsWith('calendly.')
  );
}

export function useCalendlyBookingListener(formData, enabled) {
  const embedViewedRef = useRef(false);
  const bookingNotifiedRef = useRef(false);

  useEffect(() => {
    if (!enabled) return;

    if (!embedViewedRef.current) {
      embedViewedRef.current = true;
      trackJourneyStep(JOURNEY_STEPS.CALENDLY_EMBED_VIEWED);
    }

    const onMessage = (event) => {
      if (!isCalendlyMessage(event)) return;

      const { event: calendlyEvent, payload } = event.data;

      if (calendlyEvent === 'calendly.date_and_time_selected') {
        trackJourneyStep(JOURNEY_STEPS.CALENDLY_DATE_SELECTED);
        return;
      }

      if (
        calendlyEvent === 'calendly.event_scheduled' &&
        !bookingNotifiedRef.current
      ) {
        bookingNotifiedRef.current = true;

        trackJourneyStep(JOURNEY_STEPS.CALENDLY_BOOKING_CONFIRMED, {
          company: formData.company,
          budget: formData.budget,
          timeline: formData.timeline
        });

        notifyBookingScheduled(formData, payload);
      }
    };

    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [enabled, formData]);
}
