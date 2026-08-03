import { google } from "googleapis";

const CALENDAR_TIMEZONE = process.env.GOOGLE_CALENDAR_TIMEZONE || "Asia/Kolkata";
const SLOT_MINUTES = parseInt(process.env.GOOGLE_CALENDAR_SLOT_MINUTES || "30", 10);
const START_HOUR = parseInt(process.env.GOOGLE_CALENDAR_START_HOUR || "10", 10);
const END_HOUR = parseInt(process.env.GOOGLE_CALENDAR_END_HOUR || "17", 10);
const END_MINUTE = parseInt(process.env.GOOGLE_CALENDAR_END_MINUTE || "30", 10);
const MIN_LEAD_HOURS = parseInt(process.env.GOOGLE_CALENDAR_MIN_LEAD_HOURS || "0", 10);
const MIN_DAYS_AHEAD = parseInt(process.env.GOOGLE_CALENDAR_MIN_DAYS_AHEAD || "1", 10);
const AVAILABLE_WEEKDAYS = [1, 2, 3, 4, 5];
const DEFAULT_CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID || "globalsales.kmit@gmail.com";

function getCalendarIds() {
  const configured = process.env.GOOGLE_CALENDAR_IDS || DEFAULT_CALENDAR_ID;

  return configured
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);
}

function getPrivateKey() {
  return String(process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY || "").replace(/\\n/g, "\n");
}

export function isGoogleCalendarConfigured() {
  return Boolean(
    DEFAULT_CALENDAR_ID &&
      process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL &&
      getPrivateKey()
  );
}

function getCalendarClient() {
  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: getPrivateKey(),
    scopes: ["https://www.googleapis.com/auth/calendar"],
  });

  return google.calendar({ version: "v3", auth });
}

function addMinutes(callDate, callTime, minutes) {
  const [year, month, day] = callDate.split("-").map(Number);
  const [hours, mins] = callTime.split(":").map(Number);
  const total = hours * 60 + mins + minutes;
  const endHours = Math.floor(total / 60);
  const endMins = total % 60;

  return {
    date: callDate,
    time: `${String(endHours).padStart(2, "0")}:${String(endMins).padStart(2, "0")}`,
  };
}

function getFallbackMeetLink() {
  return process.env.GOOGLE_MEET_LINK || process.env.GOOGLE_MEET_URL || "";
}

function buildEventRequestBody(lead, startDateTime, endDateTime, withConference) {
  const requestId = `keymouseit-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  const fallbackMeet = getFallbackMeetLink();
  let description = buildEventDescription(lead);

  if (fallbackMeet && !withConference) {
    description += `\n\nGoogle Meet: ${fallbackMeet}`;
  }

  const requestBody = {
    summary: `Strategy Call: ${lead.name} (${lead.company})`,
    description,
    start: {
      dateTime: startDateTime,
      timeZone: CALENDAR_TIMEZONE,
    },
    end: {
      dateTime: endDateTime,
      timeZone: CALENDAR_TIMEZONE,
    },
    reminders: {
      useDefault: false,
      overrides: [
        { method: "email", minutes: 24 * 60 },
        { method: "popup", minutes: 30 },
      ],
    },
  };

  if (fallbackMeet && !withConference) {
    requestBody.location = fallbackMeet;
  }

  if (withConference) {
    requestBody.conferenceData = {
      createRequest: {
        requestId,
        conferenceSolutionKey: { type: "hangoutsMeet" },
      },
    };
  }

  return requestBody;
}

function shouldRetryWithoutConference(err) {
  const message = String(err?.message || err?.cause?.message || "");
  return (
    message.includes("Domain-Wide Delegation") ||
    message.includes("Invalid conference type") ||
    message.includes("cannot invite attendees")
  );
}

function buildEventDescription(lead) {
  const lines = [
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    `Company: ${lead.company}`,
  ];

  if (lead.budget) lines.push(`Budget: ${lead.budget}`);
  if (lead.timeline) lines.push(`Timeline: ${lead.timeline}`);
  if (lead.challenge) lines.push("", "Challenge:", lead.challenge);

  lines.push("", "Booked via keymouseit.com contact form.");
  return lines.join("\n");
}

function getMeetLink(event) {
  if (event.hangoutLink) return event.hangoutLink;

  const videoEntry = event.conferenceData?.entryPoints?.find(
    (entry) => entry.entryPointType === "video"
  );

  return videoEntry?.uri || "";
}

function pad(n) {
  return String(n).padStart(2, "0");
}

function slotToRfc3339(callDate, callTime) {
  if (CALENDAR_TIMEZONE === "Asia/Kolkata") {
    return `${callDate}T${callTime}:00+05:30`;
  }

  return `${callDate}T${callTime}:00Z`;
}

function getDateKeyInTimezone(date, timeZone) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;

  return `${year}-${month}-${day}`;
}

function getMinutesInTimezone(date, timeZone) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date);

  const hour = Number(parts.find((part) => part.type === "hour")?.value || 0);
  const minute = Number(parts.find((part) => part.type === "minute")?.value || 0);

  return hour * 60 + minute;
}

function getDaysAhead(callDate) {
  const todayKey = getDateKeyInTimezone(new Date(), CALENDAR_TIMEZONE);
  const [year, month, day] = callDate.split("-").map(Number);
  const [todayYear, todayMonth, todayDay] = todayKey.split("-").map(Number);
  const requested = new Date(year, month - 1, day);
  const today = new Date(todayYear, todayMonth - 1, todayDay);

  return Math.round((requested - today) / (24 * 60 * 60 * 1000));
}

function isDateBookable(callDate) {
  return getDaysAhead(callDate) >= MIN_DAYS_AHEAD;
}

function generateCandidateSlots(callDate) {
  if (!isDateBookable(callDate)) {
    return [];
  }

  const [year, month, day] = callDate.split("-").map(Number);
  const weekday = new Date(year, month - 1, day).getDay();

  if (!AVAILABLE_WEEKDAYS.includes(weekday)) {
    return [];
  }

  const slots = [];
  const lastSlotStartMinutes = END_HOUR * 60 + END_MINUTE;

  for (
    let total = START_HOUR * 60;
    total <= lastSlotStartMinutes;
    total += SLOT_MINUTES
  ) {
    const hours = Math.floor(total / 60);
    const minutes = total % 60;
    slots.push(`${pad(hours)}:${pad(minutes)}`);
  }

  const todayKey = getDateKeyInTimezone(new Date(), CALENDAR_TIMEZONE);
  if (callDate !== todayKey) {
    return filterSlotsByMinLeadTime(callDate, slots);
  }

  const nowMinutes = getMinutesInTimezone(new Date(), CALENDAR_TIMEZONE);
  const minLeadMinutes = MIN_LEAD_HOURS * 60;

  return filterSlotsByMinLeadTime(
    callDate,
    slots.filter((slot) => {
      const [hours, minutes] = slot.split(":").map(Number);
      return hours * 60 + minutes > nowMinutes + minLeadMinutes;
    })
  );
}

function filterSlotsByMinLeadTime(callDate, slots) {
  if (!MIN_LEAD_HOURS) return slots;

  const now = Date.now();
  const minLeadMs = MIN_LEAD_HOURS * 60 * 60 * 1000;

  return slots.filter((slot) => {
    const slotStart = new Date(slotToRfc3339(callDate, slot)).getTime();
    return slotStart - now >= minLeadMs;
  });
}

function getMergedBusyPeriods(freeBusyCalendars) {
  const busy = [];

  for (const periods of Object.values(freeBusyCalendars || {})) {
    if (Array.isArray(periods?.busy)) {
      busy.push(...periods.busy);
    }
  }

  return busy;
}

function slotOverlapsBusy(callDate, callTime, busyPeriods) {
  const end = addMinutes(callDate, callTime, SLOT_MINUTES);
  const slotStart = new Date(slotToRfc3339(callDate, callTime)).getTime();
  const slotEnd = new Date(slotToRfc3339(end.date, end.time)).getTime();

  return busyPeriods.some((period) => {
    const busyStart = new Date(period.start).getTime();
    const busyEnd = new Date(period.end).getTime();
    return slotStart < busyEnd && slotEnd > busyStart;
  });
}

export async function getAvailableSlotsForDate(callDate) {
  if (!isGoogleCalendarConfigured()) {
    return null;
  }

  const candidates = generateCandidateSlots(callDate);
  if (candidates.length === 0) {
    return [];
  }

  const calendar = getCalendarClient();
  const calendarIds = getCalendarIds();
  const lastCandidate = candidates[candidates.length - 1];
  const dayEnd = addMinutes(callDate, lastCandidate, SLOT_MINUTES);

  const response = await calendar.freebusy.query({
    requestBody: {
      timeMin: slotToRfc3339(callDate, `${pad(START_HOUR)}:00`),
      timeMax: slotToRfc3339(dayEnd.date, dayEnd.time),
      timeZone: CALENDAR_TIMEZONE,
      items: calendarIds.map((id) => ({ id })),
    },
  });

  const busy = getMergedBusyPeriods(response.data.calendars);

  return candidates.filter((slot) => !slotOverlapsBusy(callDate, slot, busy));
}

async function isSlotAvailable(calendar, callDate, callTime, endDate, endTime) {
  const calendarIds = getCalendarIds();

  const response = await calendar.freebusy.query({
    requestBody: {
      timeMin: slotToRfc3339(callDate, callTime),
      timeMax: slotToRfc3339(endDate, endTime),
      timeZone: CALENDAR_TIMEZONE,
      items: calendarIds.map((id) => ({ id })),
    },
  });

  const busy = getMergedBusyPeriods(response.data.calendars);
  return busy.length === 0;
}

export async function createStrategyCallEvent(lead) {
  if (!isGoogleCalendarConfigured()) {
    return null;
  }

  const calendar = getCalendarClient();
  const calendarId = DEFAULT_CALENDAR_ID;
  const { callDate, callTime } = lead;

  const startDateTime = `${callDate}T${callTime}:00`;
  const end = addMinutes(callDate, callTime, SLOT_MINUTES);
  const endDateTime = `${end.date}T${end.time}:00`;

  const available = await isSlotAvailable(
    calendar,
    callDate,
    callTime,
    end.date,
    end.time
  );
  if (!available) {
    const error = new Error("That time slot is no longer available. Please pick another.");
    error.code = "SLOT_UNAVAILABLE";
    throw error;
  }

  const requestBodyWithMeet = buildEventRequestBody(
    lead,
    startDateTime,
    endDateTime,
    true
  );

  let response;

  try {
    response = await calendar.events.insert({
      calendarId,
      conferenceDataVersion: 1,
      sendUpdates: "none",
      requestBody: requestBodyWithMeet,
    });
  } catch (err) {
    if (!shouldRetryWithoutConference(err)) {
      throw err;
    }

    response = await calendar.events.insert({
      calendarId,
      sendUpdates: "none",
      requestBody: buildEventRequestBody(lead, startDateTime, endDateTime, false),
    });
  }

  const event = response.data;

  return {
    eventId: event.id,
    htmlLink: event.htmlLink || "",
    meetLink: getMeetLink(event) || getFallbackMeetLink(),
  };
}
