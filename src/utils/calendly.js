import { useEffect, useRef } from 'react';

import { CONTACT_CONFIG } from '../data/site-data';

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

export async function notifyBookingScheduled(formData, calendlyPayload) {
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

export function useCalendlyBookingListener(formData, enabled) {
  const notifiedRef = useRef(false);

  useEffect(() => {
    if (!enabled) return;

    const onMessage = (event) => {
      if (
        event.origin !== 'https://calendly.com' ||
        event.data?.event !== 'calendly.event_scheduled' ||
        notifiedRef.current
      ) {
        return;
      }

      notifiedRef.current = true;
      notifyBookingScheduled(formData, event.data.payload);
    };

    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [enabled, formData]);
}
