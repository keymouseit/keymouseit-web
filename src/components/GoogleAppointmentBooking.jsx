import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { CONTACT_CONFIG } from '../data/site-data';
import { JOURNEY_STEPS, trackJourneyStep } from '../utils/clarity';

function buildEmbedUrl(bookingUrl) {
  try {
    const url = new URL(bookingUrl);
    url.searchParams.set('gv', 'true');
    return url.toString();
  } catch {
    return bookingUrl;
  }
}

function openBookingPopup(url) {
  const width = 520;
  const height = 760;
  const left = Math.max(0, window.screenX + (window.outerWidth - width) / 2);
  const top = Math.max(0, window.screenY + (window.outerHeight - height) / 2);

  return window.open(
    url,
    'keymouseit-google-booking',
    `popup=yes,width=${width},height=${height},left=${left},top=${top},noopener,noreferrer`
  );
}

function isIframeEmbedBlocked(iframe) {
  if (!iframe) return true;

  try {
    const doc = iframe.contentDocument;
    if (!doc) return true;

    const text = (doc.body?.innerText || doc.body?.textContent || '').toLowerCase();
    return (
      text.includes('refused to connect') ||
      text.includes('blocked') ||
      text.includes("can't open this page")
    );
  } catch {
    // Cross-origin means a real page loaded inside the iframe.
    return false;
  }
}

export default function GoogleAppointmentBooking({ className = '' }) {
  const viewedRef = useRef(false);
  const iframeRef = useRef(null);
  const popupTriedRef = useRef(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [embedMode, setEmbedMode] = useState('loading');
  const [popupBlocked, setPopupBlocked] = useState(false);

  const bookingUrl = CONTACT_CONFIG.googleAppointmentUrl;
  const embedUrl = buildEmbedUrl(bookingUrl);

  useEffect(() => {
    if (!bookingUrl || viewedRef.current) return;

    viewedRef.current = true;
    trackJourneyStep(JOURNEY_STEPS.BOOKING_SCHEDULER_VIEWED);
  }, [bookingUrl]);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setEmbedMode('loading');
    setPopupBlocked(false);
    popupTriedRef.current = false;
  }, []);

  useEffect(() => {
    if (!modalOpen) return;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') closeModal();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [modalOpen, closeModal]);

  const tryPopupFallback = useCallback(() => {
    if (!bookingUrl) return;

    const popup = openBookingPopup(bookingUrl);
    setPopupBlocked(!popup);
    popupTriedRef.current = true;
  }, [bookingUrl]);

  useEffect(() => {
    if (!modalOpen || embedMode !== 'fallback' || popupTriedRef.current) return;
    tryPopupFallback();
  }, [modalOpen, embedMode, tryPopupFallback]);

  const handleIframeLoad = useCallback(() => {
    const blocked = isIframeEmbedBlocked(iframeRef.current);
    setEmbedMode(blocked ? 'fallback' : 'embedded');
  }, []);

  const launchBooking = useCallback(() => {
    if (!bookingUrl) return;

    trackJourneyStep(JOURNEY_STEPS.BOOKING_LINK_CLICKED);
    setEmbedMode('loading');
    setPopupBlocked(false);
    popupTriedRef.current = false;
    setModalOpen(true);
  }, [bookingUrl]);

  if (!bookingUrl) return null;

  const showIframe = embedMode === 'loading' || embedMode === 'embedded';

  const modal = modalOpen
    ? createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-modal-title"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 16,
            background: 'rgba(4,7,14,0.82)',
            backdropFilter: 'blur(6px)'
          }}
          onClick={closeModal}
        >
          <div
            style={{
              width: 'min(560px, 100%)',
              height: 'min(720px, 92vh)',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 16,
              border: '1px solid rgba(255,255,255,0.12)',
              background: '#0f141d',
              boxShadow: '0 24px 80px rgba(0,0,0,0.45)',
              overflow: 'hidden'
            }}
            onClick={(event) => event.stopPropagation()}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 12,
                padding: '16px 18px',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
                flexShrink: 0
              }}
            >
              <h3
                id="booking-modal-title"
                style={{
                  margin: 0,
                  color: '#fff',
                  fontSize: 16,
                  fontWeight: 700
                }}
              >
                Book on Google Calendar
              </h3>
              <button
                type="button"
                onClick={closeModal}
                aria-label="Close booking window"
                style={{
                  border: 'none',
                  background: 'rgba(255,255,255,0.08)',
                  color: '#C7D2E0',
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  cursor: 'pointer',
                  fontSize: 18,
                  lineHeight: 1
                }}
              >
                ×
              </button>
            </div>

            {showIframe ? (
              <div style={{ flex: 1, minHeight: 0, background: '#fff', position: 'relative' }}>
                <iframe
                  ref={iframeRef}
                  src={embedUrl}
                  title="Google Calendar booking"
                  onLoad={handleIframeLoad}
                  style={{
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    display: 'block'
                  }}
                />
                {embedMode === 'loading' ? (
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'rgba(255,255,255,0.92)',
                      color: '#334155',
                      fontSize: 14,
                      fontWeight: 500
                    }}
                  >
                    Loading calendar…
                  </div>
                ) : null}
              </div>
            ) : (
              <div
                style={{
                  flex: 1,
                  minHeight: 0,
                  padding: '28px 22px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  background:
                    'linear-gradient(160deg, rgba(37,99,255,0.12), rgba(8,10,15,0.9))'
                }}
              >
                <p style={{ margin: '0 0 8px', color: '#fff', fontSize: 16, fontWeight: 700 }}>
                  {popupBlocked
                    ? 'Google Calendar cannot load inside this page'
                    : 'Opening Google Calendar…'}
                </p>
                <p style={{ margin: 0, maxWidth: 380, color: '#9CA3AF', fontSize: 14, lineHeight: 1.55 }}>
                  {popupBlocked
                    ? 'Use the button below to open booking in a popup or new tab.'
                    : 'A popup should appear. Pick your time there, then click Done.'}
                </p>
              </div>
            )}

            <div
              style={{
                padding: '14px 18px',
                borderTop: '1px solid rgba(255,255,255,0.08)',
                background: 'rgba(8,10,15,0.95)',
                flexShrink: 0
              }}
            >
              {embedMode === 'embedded' ? (
                <p style={{ margin: '0 0 12px', fontSize: 13, color: '#9CA3AF', lineHeight: 1.5 }}>
                  Pick your time above, then click Done and submit the form.
                </p>
              ) : embedMode === 'fallback' && popupBlocked ? (
                <p style={{ margin: '0 0 12px', fontSize: 13, color: '#F87171', lineHeight: 1.5 }}>
                  Your browser blocked the popup. Open the calendar using the buttons below.
                </p>
              ) : null}

              {(embedMode === 'fallback' || embedMode === 'embedded') && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {embedMode === 'fallback' ? (
                    <>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={tryPopupFallback}
                        style={{ flex: 1, minWidth: 140, justifyContent: 'center', fontSize: 13 }}
                      >
                        Open calendar popup
                      </button>
                      <a
                        href={bookingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn"
                        style={{
                          flex: 1,
                          minWidth: 140,
                          justifyContent: 'center',
                          fontSize: 13,
                          textDecoration: 'none',
                          border: '1px solid rgba(255,255,255,0.14)',
                          color: '#C7D2E0'
                        }}
                      >
                        Open in new tab
                      </a>
                    </>
                  ) : null}
                  <button
                    type="button"
                    onClick={closeModal}
                    className={embedMode === 'embedded' ? 'btn btn-primary' : ''}
                    style={{
                      flex: 1,
                      minWidth: 100,
                      padding: '11px 14px',
                      borderRadius: 10,
                      border:
                        embedMode === 'embedded'
                          ? 'none'
                          : '1px solid rgba(255,255,255,0.14)',
                      background: embedMode === 'embedded' ? undefined : 'transparent',
                      color: embedMode === 'embedded' ? undefined : '#9CA3AF',
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: 'pointer',
                      justifyContent: 'center'
                    }}
                  >
                    Done
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>,
        document.body
      )
    : null;

  return (
    <>
      <button
        type="button"
        onClick={launchBooking}
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
          cursor: 'pointer'
        }}
      >
        Pick a time on Google Calendar
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
      </button>
      {modal}
    </>
  );
}
