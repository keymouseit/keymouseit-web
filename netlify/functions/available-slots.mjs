import {
  getAvailableSlotsForDate,
  isGoogleCalendarConfigured,
} from "./lib/google-calendar.mjs";

function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Cache-Control": "private, max-age=30",
    },
    body: JSON.stringify(body),
  };
}

export async function handler(event) {
  if (event.httpMethod === "OPTIONS") {
    return json(200, { success: true });
  }

  if (event.httpMethod !== "GET") {
    return json(405, { success: false, message: "Method not allowed" });
  }

  const callDate = String(event.queryStringParameters?.date || "").trim();

  if (!/^\d{4}-\d{2}-\d{2}$/.test(callDate)) {
    return json(400, { success: false, message: "A valid date is required." });
  }

  if (!isGoogleCalendarConfigured()) {
    return json(503, {
      success: false,
      message: "Calendar availability is not configured.",
      source: "unconfigured",
    });
  }

  try {
    const slots = await getAvailableSlotsForDate(callDate);

    return json(200, {
      success: true,
      date: callDate,
      slots: slots || [],
      source: "google",
    });
  } catch (err) {
    console.error("available-slots error:", err);

    return json(500, {
      success: false,
      message: "Could not load available times. Please try again.",
    });
  }
}
