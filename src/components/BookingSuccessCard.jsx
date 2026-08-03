import React from 'react';

import { Icon } from './site-ui';
import { formatBookingSummary } from '../utils/booking-slots';

const steps = [
  {
    icon: 'Mail',
    title: 'Check your inbox',
    text: 'We sent a confirmation with your call details.'
  },
  {
    icon: 'Calendar',
    title: 'Added to calendar',
    text: 'The event is on our team calendar — you’ll get reminders too.'
  },
  {
    icon: 'Video',
    title: 'Join via Google Meet',
    text: 'Your email includes the video link before the call.'
  }
];

export default function BookingSuccessCard({
  name,
  email,
  callDate,
  callTime,
  onReset,
  compact = false
}) {
  const { dateLabel, timeLabel, combined } = formatBookingSummary(
    callDate,
    callTime
  );

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        textAlign: 'center',
        padding: compact ? '8px 4px' : '12px 6px 4px'
      }}
    >
      <div
        style={{
          position: 'relative',
          width: compact ? 64 : 76,
          height: compact ? 64 : 76,
          margin: '0 auto 22px'
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: -10,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(74,222,128,0.22) 0%, transparent 70%)'
          }}
        />
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background:
              'linear-gradient(145deg, rgba(22,163,74,0.28), rgba(37,99,255,0.18))',
            border: '1px solid rgba(74,222,128,0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#4ADE80',
            boxShadow: '0 0 40px rgba(74,222,128,0.15)'
          }}
        >
          <Icon name="Check" size={compact ? 30 : 36} stroke={2.4} />
        </div>
      </div>

      <p
        style={{
          margin: '0 0 8px',
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: '#6FA0FF'
        }}
      >
        Strategy call confirmed
      </p>

      <h3
        style={{
          margin: '0 0 10px',
          fontSize: compact ? 24 : 28,
          fontWeight: 800,
          letterSpacing: '-0.03em',
          color: '#fff',
          lineHeight: 1.15
        }}
      >
        You&apos;re all set{name ? `, ${name.split(' ')[0]}` : ''}!
      </h3>

      <p
        style={{
          margin: '0 0 24px',
          fontSize: 15,
          lineHeight: 1.55,
          color: '#9CA3AF',
          maxWidth: 340,
          marginLeft: 'auto',
          marginRight: 'auto'
        }}
      >
        Your consultation is booked. We&apos;ll see you at the time below.
      </p>

      <div
        style={{
          textAlign: 'left',
          background:
            'linear-gradient(135deg, rgba(37,99,255,0.12), rgba(185,140,255,0.08))',
          border: '1px solid rgba(111,160,255,0.22)',
          borderRadius: 16,
          padding: compact ? '16px 18px' : '20px 22px',
          marginBottom: 22
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 14,
            marginBottom: timeLabel ? 14 : 0
          }}
        >
          <span
            style={{
              flexShrink: 0,
              width: 40,
              height: 40,
              borderRadius: 12,
              background: 'rgba(37,99,255,0.2)',
              border: '1px solid rgba(111,160,255,0.25)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#93C5FD'
            }}
          >
            <Icon name="CalendarClock" size={20} stroke={2} />
          </span>
          <div>
            <p
              style={{
                margin: 0,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#6B7689'
              }}
            >
              When
            </p>
            <p
              style={{
                margin: '4px 0 0',
                fontSize: 16,
                fontWeight: 700,
                color: '#fff',
                lineHeight: 1.35
              }}
            >
              {combined || dateLabel}
            </p>
          </div>
        </div>

        {email && (
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 14,
              paddingTop: 14,
              borderTop: '1px solid rgba(255,255,255,0.08)'
            }}
          >
            <span
              style={{
                flexShrink: 0,
                width: 40,
                height: 40,
                borderRadius: 12,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#C7D2E0'
              }}
            >
              <Icon name="Mail" size={20} stroke={2} />
            </span>
            <div style={{ minWidth: 0 }}>
              <p
                style={{
                  margin: 0,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#6B7689'
                }}
              >
                Confirmation sent to
              </p>
              <p
                style={{
                  margin: '4px 0 0',
                  fontSize: 15,
                  fontWeight: 600,
                  color: '#E5E7EB',
                  wordBreak: 'break-word'
                }}
              >
                {email}
              </p>
            </div>
          </div>
        )}
      </div>

      <div
        style={{
          display: 'grid',
          gap: 10,
          marginBottom: onReset ? 22 : 0,
          textAlign: 'left'
        }}
      >
        {steps.map((step) => (
          <div
            key={step.title}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 12,
              padding: '12px 14px',
              borderRadius: 12,
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)'
            }}
          >
            <span style={{ color: '#6FA0FF', flexShrink: 0, marginTop: 1 }}>
              <Icon name={step.icon} size={17} stroke={2} />
            </span>
            <div>
              <p
                style={{
                  margin: 0,
                  fontSize: 14,
                  fontWeight: 700,
                  color: '#E5E7EB'
                }}
              >
                {step.title}
              </p>
              <p
                style={{
                  margin: '3px 0 0',
                  fontSize: 13,
                  lineHeight: 1.45,
                  color: '#6B7689'
                }}
              >
                {step.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      {onReset && (
        <button
          type="button"
          onClick={onReset}
          style={{
            width: '100%',
            marginTop: 4,
            padding: '13px 18px',
            borderRadius: 12,
            border: '1px solid rgba(255,255,255,0.14)',
            background: 'rgba(255,255,255,0.04)',
            color: '#C7D2E0',
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'border-color 0.16s, background 0.16s'
          }}
        >
          Book another time
        </button>
      )}
    </div>
  );
}
