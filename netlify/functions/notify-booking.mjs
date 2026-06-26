const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL || "";

function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
    },
    body: JSON.stringify(body),
  };
}

function isValidCalendlyPayload(payload) {
  return Boolean(payload?.event?.uri && payload?.invitee?.uri);
}

function slackText({ name, email, company, budget, timeline, challenge }) {
  const lines = [
    "📅 *New strategy call booked on Calendly*",
    "",
    `*Name:* ${name}`,
    `*Email:* ${email}`,
  ];

  if (company) lines.push(`*Company:* ${company}`);
  if (budget) lines.push(`*Budget:* ${budget}`);
  if (timeline) lines.push(`*Timeline:* ${timeline}`);
  if (challenge) {
    lines.push("", `*Challenge:*\n${challenge}`);
  }

  return lines.join("\n");
}

export async function handler(event) {
  if (event.httpMethod === "OPTIONS") {
    return json(200, { success: true });
  }

  if (event.httpMethod !== "POST") {
    return json(405, { success: false, message: "Method not allowed" });
  }

  let data = {};
  try {
    data = JSON.parse(event.body || "{}");
  } catch {
    return json(400, { success: false, message: "Invalid JSON body" });
  }

  const { name, email, company, budget, timeline, challenge, calendlyPayload } = data;

  const trimmedName = String(name || "").trim();
  const trimmedEmail = String(email || "").trim();
  const trimmedCompany = String(company || "").trim();

  if (!trimmedName || !trimmedEmail || !trimmedCompany) {
    return json(400, { success: false, message: "Name, email, and company are required." });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    return json(400, { success: false, message: "Invalid email address" });
  }

  if (!isValidCalendlyPayload(calendlyPayload)) {
    return json(400, { success: false, message: "Invalid Calendly booking payload" });
  }

  if (!SLACK_WEBHOOK_URL) {
    console.error("SLACK_WEBHOOK_URL env variable is not set");
    return json(500, { success: false, message: "Slack is not configured" });
  }

  try {
    const res = await fetch(SLACK_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: slackText({
          name: trimmedName,
          email: trimmedEmail,
          company: trimmedCompany,
          budget,
          timeline,
          challenge,
        }),
      }),
    });

    if (!res.ok) {
      console.error("Slack webhook error:", res.status, await res.text());
      return json(502, { success: false, message: "Failed to send Slack notification" });
    }

    return json(200, { success: true, message: "Slack notification sent" });
  } catch (err) {
    console.error("Slack request error:", err);
    return json(500, { success: false, message: "Failed to send Slack notification" });
  }
}
