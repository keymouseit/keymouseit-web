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

export function getSlotsForDate(dateKey) {
  if (!dateKey) return [];

  const date = parseDateKey(dateKey);
  const weekday = date.getDay();

  if (!BOOKING_CONFIG.availableWeekdays.includes(weekday)) {
    return [];
  }

  const slots = [];
  const { startHour, endHour, slotMinutes } = BOOKING_CONFIG;
  const endTotalMinutes = endHour * 60;

  for (let total = startHour * 60; total < endTotalMinutes; total += slotMinutes) {
    const hours = Math.floor(total / 60);
    const minutes = total % 60;
    slots.push(`${pad(hours)}:${pad(minutes)}`);
  }

  const todayKey = toDateKey(new Date());
  if (dateKey !== todayKey) return slots;

  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  return slots.filter((slot) => {
    const [hours, minutes] = slot.split(':').map(Number);
    return hours * 60 + minutes > nowMinutes + 30;
  });
}

export function isWeekdayAvailable(dateKey) {
  if (!dateKey) return false;
  const weekday = parseDateKey(dateKey).getDay();
  return BOOKING_CONFIG.availableWeekdays.includes(weekday);
}
