import React, { useEffect, useState } from 'react';

import { BOOKING_CONFIG } from '../data/site-data';
import {
  formatSlotLabel,
  getMaxBookingDate,
  getMinBookingDate,
  getSlotsForDate,
  isWeekdayAvailable
} from '../utils/booking-slots';

export default function TimeSlotPicker({
  callDate,
  callTime,
  onChange,
  className = ''
}) {
  const minDate = getMinBookingDate();
  const maxDate = getMaxBookingDate();
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [usingGoogle, setUsingGoogle] = useState(false);

  const handleDateChange = (nextDate) => {
    onChange({
      callDate: nextDate,
      callTime: ''
    });
  };

  useEffect(() => {
    if (!callDate || !isWeekdayAvailable(callDate)) {
      setSlots([]);
      setUsingGoogle(false);
      return undefined;
    }

    let cancelled = false;
    const controller = new AbortController();

    async function loadSlots() {
      setLoading(true);

      try {
        const response = await fetch(
          `/.netlify/functions/available-slots?date=${encodeURIComponent(callDate)}`,
          { signal: controller.signal }
        );
        const data = await response.json();

        if (cancelled) return;

        if (response.ok && data.success && data.source === 'google') {
          setSlots(Array.isArray(data.slots) ? data.slots : []);
          setUsingGoogle(true);
          return;
        }

        setSlots(getSlotsForDate(callDate));
        setUsingGoogle(false);
      } catch (error) {
        if (cancelled || error.name === 'AbortError') return;

        setSlots(getSlotsForDate(callDate));
        setUsingGoogle(false);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadSlots();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [callDate]);

  useEffect(() => {
    if (callTime && slots.length > 0 && !slots.includes(callTime)) {
      onChange({ callDate, callTime: '' });
    }
  }, [callDate, callTime, onChange, slots]);

  return (
    <div className={`time-slot-picker ${className}`.trim()}>
      <label
        style={{
          display: 'block',
          marginBottom: 8,
          color: '#C7D2E0',
          fontSize: 13,
          fontWeight: 600,
          marginTop: 15,
        }}
      >
        Pick a time <span style={{ color: '#F87171' }}>*</span>
      </label>

      <input
        type="date"
        required
        min={minDate}
        max={maxDate}
        value={callDate}
        onChange={(e) => handleDateChange(e.target.value)}
        style={{
          width: '100%',
          marginBottom: 12,
          fontFamily: 'var(--sans, inherit)',
          fontSize: 15,
          color: '#fff',
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.14)',
          borderRadius: 10,
          padding: '13px 15px',
          boxSizing: 'border-box'
        }}
      />

      {callDate && !isWeekdayAvailable(callDate) && (
        <p style={{ margin: '0 0 12px', fontSize: 13, color: '#F87171' }}>
          No slots on weekends. Please pick a weekday.
        </p>
      )}

      {callDate && isWeekdayAvailable(callDate) && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(92px, 1fr))',
            gap: 8,
            maxHeight: 168,
            overflowY: 'auto',
            paddingRight: 2
          }}
        >
          {loading ? (
            <p style={{ margin: 0, gridColumn: '1 / -1', fontSize: 13, color: '#9CA3AF' }}>
              Loading available times...
            </p>
          ) : slots.length === 0 ? (
            <p style={{ margin: 0, gridColumn: '1 / -1', fontSize: 13, color: '#9CA3AF' }}>
              No open slots on this day. Try another date.
            </p>
          ) : (
            slots.map((slot) => {
              const selected = callTime === slot;

              return (
                <button
                  key={slot}
                  type="button"
                  onClick={() => onChange({ callDate, callTime: slot })}
                  style={{
                    padding: '10px 8px',
                    borderRadius: 10,
                    border: selected
                      ? '1px solid rgba(111,160,255,0.8)'
                      : '1px solid rgba(255,255,255,0.14)',
                    background: selected
                      ? 'rgba(37,99,255,0.28)'
                      : 'rgba(255,255,255,0.05)',
                    color: selected ? '#fff' : '#C7D2E0',
                    fontSize: 13,
                    fontWeight: selected ? 700 : 500,
                    cursor: 'pointer',
                    transition: 'border-color 0.16s, background 0.16s'
                  }}
                >
                  {formatSlotLabel(slot)}
                </button>
              );
            })
          )}
        </div>
      )}

      <p style={{ margin: '10px 0 0', fontSize: 12.5, color: '#6B7689', lineHeight: 1.45 }}>
        {usingGoogle
          ? `Live availability from Google Calendar (${BOOKING_CONFIG.timezoneLabel}). Booking stays on this page.`
          : `Times shown in ${BOOKING_CONFIG.timezoneLabel}. Booking stays on this page.`}
      </p>
    </div>
  );
}
