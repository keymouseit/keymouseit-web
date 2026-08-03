import { BOOKING_CONFIG } from '../data/site-data';

function pad(n) {
  return String(n).padStart(2, '0');
}

function toDateKey(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function parseDateKey(dateKey) {
  const [year, month, day] = dateKey.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export function getMinBookingDate() {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + BOOKING_CONFIG.minDaysAhead);
  return toDateKey(date);
}

export function getMaxBookingDate() {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + BOOKING_CONFIG.maxDaysAhead);
  return toDateKey(date);
}

export function formatSlotLabel(timeValue) {
  const [hours, minutes] = timeValue.split(':').map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);

  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit'
  });
}

export function formatBookingSummary(callDate, callTime) {
  if (!callDate) {
    return { dateLabel: '', timeLabel: '', combined: '' };
  }

  const [year, month, day] = callDate.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  const dateLabel = date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
  const timeLabel = callTime ? formatSlotLabel(callTime) : '';
  const combined = timeLabel
    ? `${dateLabel} · ${timeLabel} ${BOOKING_CONFIG.timezoneLabel}`
    : dateLabel;

  return { dateLabel, timeLabel, combined };
}

export function getSlotsForDate(dateKey) {
  if (!dateKey) return [];

  const date = parseDateKey(dateKey);
  const weekday = date.getDay();

  if (!BOOKING_CONFIG.availableWeekdays.includes(weekday)) {
    return [];
  }

  const slots = [];
  const { startHour, endHour, endMinute = 0, slotMinutes } = BOOKING_CONFIG;
  const lastSlotStartMinutes = endHour * 60 + endMinute;

  for (
    let total = startHour * 60;
    total <= lastSlotStartMinutes;
    total += slotMinutes
  ) {
    const hours = Math.floor(total / 60);
    const minutes = total % 60;
    slots.push(`${pad(hours)}:${pad(minutes)}`);
  }

  const todayKey = toDateKey(new Date());
  if (dateKey !== todayKey) return slots;

  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const minLeadMinutes = (BOOKING_CONFIG.minLeadHours || 0) * 60;

  return slots.filter((slot) => {
    const [hours, minutes] = slot.split(':').map(Number);
    return hours * 60 + minutes > nowMinutes + minLeadMinutes;
  });
}

export function isWeekdayAvailable(dateKey) {
  if (!dateKey) return false;
  const weekday = parseDateKey(dateKey).getDay();
  return BOOKING_CONFIG.availableWeekdays.includes(weekday);
}
