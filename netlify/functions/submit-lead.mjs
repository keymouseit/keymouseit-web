import nodemailer from "nodemailer";

// ─── SMTP Configuration ─────────────────────────────────────────────
const SMTP_HOST     = process.env.SMTP_HOST     || "mail.keymouseit.com";
const SMTP_PORT     = parseInt(process.env.SMTP_PORT || "465", 10);
const SMTP_USER     = process.env.SMTP_USER     || "hello@keymouseit.com";
const SMTP_PASS     = process.env.SMTP_PASS     || "";          // set in Netlify UI
const SMTP_FROM     = process.env.SMTP_FROM     || "hello@keymouseit.com";
const ADMIN_EMAIL   = process.env.ADMIN_EMAIL   || "globalsales.kmit@gmail.com";
const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET_KEY || "";

// ─── Disposable email blocklist ──────────────────────────────────────
const DISALLOWED_DOMAINS = [
  "mailinator.com", "yopmail.com", "tempmail.com",
  "dispostable.com", "trashmail.com", "guerrillamail.com", "mailinator2.com",
];

// ─── Helpers ─────────────────────────────────────────────────────────
function esc(s) {
  return String(s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function nl2br(s) {
  return esc(s).replace(/\n/g, "<br>");
}

async function verifyCaptcha(token, remoteIp) {
  if (!RECAPTCHA_SECRET) {
    console.error("RECAPTCHA_SECRET_KEY env variable is not set");
    return { success: false };
  }

  const params = new URLSearchParams({
    secret: RECAPTCHA_SECRET,
    response: token,
  });
  if (remoteIp) params.append("remoteip", remoteIp);

  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  return res.json();
}

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

// ─── Email templates ─────────────────────────────────────────────────
function adminHtml({ name, email, company, budget, timeline, challenge }) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #0f172a; padding: 40px 20px; margin: 0; }
    .card { background: #ffffff; border-radius: 16px; padding: 32px; box-shadow: 0 4px 20px rgba(0,0,0,0.02); max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; }
    .header { text-align: center; margin-bottom: 28px; border-bottom: 1px solid #f1f5f9; padding-bottom: 20px; }
    .badge-admin { display: inline-block; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; background-color: #ef4444; color: #ffffff; padding: 4px 10px; border-radius: 99px; margin-top: 8px; }
    h2 { margin-top: 0; color: #0f172a; font-size: 20px; font-weight: 700; letter-spacing: -0.01em; }
    .info-grid { background-color: #f8fafc; border-radius: 12px; padding: 24px; border: 1px solid #e2e8f0; margin-bottom: 24px; }
    .info-row { margin-bottom: 14px; font-size: 15px; }
    .info-row:last-child { margin-bottom: 0; }
    .label { font-size: 11px; font-weight: 700; text-transform: uppercase; color: #64748b; letter-spacing: 0.05em; display: inline-block; width: 90px; }
    .value { color: #0f172a; font-weight: 500; }
    .value-link { color: #2563eb; text-decoration: none; font-weight: 600; }
    .badge-blue { background-color: #dbeafe; color: #1e40af; font-size: 12px; font-weight: 700; padding: 4px 10px; border-radius: 99px; }
    .badge-amber { background-color: #fef3c7; color: #92400e; font-size: 12px; font-weight: 700; padding: 4px 10px; border-radius: 99px; }
    .challenge-card { border-left: 4px solid #2563eb; background-color: #f1f5f9; padding: 20px; border-radius: 0 12px 12px 0; font-style: italic; line-height: 1.6; color: #334155; font-size: 14.5px; }
    .footer { text-align: center; margin-top: 32px; font-size: 12px; color: #94a3b8; line-height: 1.5; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <a href="https://keymouseit.com" style="text-decoration: none;">
        <img src="https://design.keymouseit.com/assets/logo.svg" alt="KeyMouse IT" width="220" style="display: block; margin: 0 auto; border: 0; outline: none; max-width: 100%; width: 220px;" />
      </a>
      <span class="badge-admin" style="margin-top: 12px;">New Lead Alert</span>
    </div>
    <h2>New Project Inquiry</h2>
    <div class="info-grid">
      <div class="info-row"><span class="label">Name:</span> <span class="value">${esc(name)}</span></div>
      <div class="info-row"><span class="label">Email:</span> <a href="mailto:${esc(email)}" class="value-link">${esc(email)}</a></div>
      <div class="info-row"><span class="label">Company:</span> <span class="value">${esc(company)}</span></div>
      ${budget ? `<div class="info-row"><span class="label">Budget:</span> <span class="badge-blue">${esc(budget)}</span></div>` : ""}
      ${timeline ? `<div class="info-row"><span class="label">Timeline:</span> <span class="badge-amber">${esc(timeline)}</span></div>` : ""}
    </div>
    ${challenge ? `<div class="challenge-card"><strong>Challenge Description:</strong><br><br>${nl2br(challenge)}</div>` : ""}
    <div class="footer">
      This inquiry was sent from your website's contact form.<br>
      &copy; 2026 KeyMouse IT. AI-Powered Systems. Real Business Impact.
    </div>
  </div>
</body>
</html>`;
}

function clientHtml(name) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #0f172a; padding: 40px 20px; margin: 0; }
    .card { background: #ffffff; border-radius: 16px; padding: 32px; box-shadow: 0 4px 20px rgba(0,0,0,0.02); max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; }
    .header { text-align: center; margin-bottom: 28px; border-bottom: 1px solid #f1f5f9; padding-bottom: 20px; }
    h2 { margin-top: 0; color: #0f172a; font-size: 20px; font-weight: 700; letter-spacing: -0.01em; }
    p { font-size: 15px; line-height: 1.6; color: #334155; }
    .divider { height: 1px; background-color: #e2e8f0; margin: 24px 0; }
    .footer { text-align: center; font-size: 12px; color: #94a3b8; line-height: 1.5; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <a href="https://keymouseit.com" style="text-decoration: none;">
        <img src="https://design.keymouseit.com/assets/logo.svg" alt="KeyMouse IT" width="220" style="display: block; margin: 0 auto; border: 0; outline: none; max-width: 100%; width: 220px;" />
      </a>
    </div>
    <h3>Hi ${esc(name)},</h3>
    <p>Thank you for choosing KeyMouse IT.</p>
    <p>Your consultation has been successfully confirmed. We look forward to meeting with you and discussing how KeyMouse IT can help transform your ideas into scalable digital solutions.</p>
    <p>We are looking forward to discussing your goals, understanding your challenges, and identifying opportunities where technology can create measurable value for your business. Our team will connect with you at the scheduled time and guide you through the next steps based on your specific requirements.</p>
    <p>If you need to reschedule or update any information before the meeting, please let us know.</p>
    <p>We appreciate your trust in KeyMouse IT and look forward to the conversation.</p>
    <div class="divider"></div>
    <p style="font-size: 14px; color: #64748b; margin-bottom: 0;">Warm regards,<br><br><strong style="color: #0f172a;">The KeyMouse IT Team</strong><br>Building Scalable Digital Solutions</p>
    <div class="footer" style="margin-top: 32px;">
      &copy; 2026 KeyMouse IT. All rights reserved.<br>
    </div>
  </div>
</body>
</html>`;
}

// ─── Handler ─────────────────────────────────────────────────────────
export async function handler(event) {
  // Handle CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return json(200, { success: true });
  }

  if (event.httpMethod !== "POST") {
    return json(405, { success: false, message: "Method not allowed" });
  }

  // Parse body (URL-encoded or JSON)
  let data = {};
  const ct = (event.headers["content-type"] || "").toLowerCase();
  if (ct.includes("application/json")) {
    try { data = JSON.parse(event.body); } catch { /* fall through */ }
  } else {
    const params = new URLSearchParams(event.body);
    for (const [k, v] of params) data[k] = v;
  }

  const { name, email, company, challenge, budget, timeline, captchaToken } = data;

  const trimmedName = String(name || "").trim();
  const trimmedEmail = String(email || "").trim();
  const trimmedCompany = String(company || "").trim();
  const trimmedChallenge = String(challenge || "").trim();
  const trimmedBudget = String(budget || "").trim();
  const trimmedTimeline = String(timeline || "").trim();

  // Validate required fields
  if (!trimmedName || !trimmedEmail || !trimmedCompany) {
    return json(400, { success: false, message: "Name, email, and company are required." });
  }

  // Verify Google reCAPTCHA
  if (!captchaToken) {
    return json(400, { success: false, message: "Please complete the captcha verification." });
  }

  const remoteIp =
    event.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
    event.headers["client-ip"] ||
    "";

  try {
    const captchaResult = await verifyCaptcha(captchaToken, remoteIp);
    if (!captchaResult.success) {
      console.error("reCAPTCHA verification failed:", captchaResult["error-codes"]);
      return json(400, { success: false, message: "Captcha verification failed. Please try again." });
    }
  } catch (err) {
    console.error("reCAPTCHA request error:", err);
    return json(500, { success: false, message: "Captcha verification error. Please try again." });
  }

  // Validate email
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    return json(400, { success: false, message: "Please enter a valid email address." });
  }

  // Block disposable domains
  const domain = trimmedEmail.split("@").pop().toLowerCase();
  if (DISALLOWED_DOMAINS.some((d) => domain.includes(d))) {
    return json(400, {
      success: false,
      message: "Disposable or temporary emails are not allowed. Please use a work email.",
    });
  }

  // Verify SMTP password is configured
  if (!SMTP_PASS) {
    console.error("SMTP_PASS env variable is not set");
    return json(500, { success: false, message: "Server email configuration error." });
  }

  // Create transporter
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    tls: { rejectUnauthorized: false },
  });

  try {
    // Send admin notification
    await transporter.sendMail({
      from: `KeyMouse IT <${SMTP_FROM}>`,
      to: ADMIN_EMAIL,
      replyTo: `${trimmedName} <${trimmedEmail}>`,
      subject: `New KeyMouse IT Lead: ${trimmedName} (${trimmedCompany})`,
      html: adminHtml({
        name: trimmedName,
        email: trimmedEmail,
        company: trimmedCompany,
        budget: trimmedBudget,
        timeline: trimmedTimeline,
        challenge: trimmedChallenge,
      }),
    });

    // Send client confirmation
    await transporter.sendMail({
      from: `KeyMouse IT <${SMTP_FROM}>`,
      to: trimmedEmail,
      replyTo: `KeyMouse IT <${SMTP_FROM}>`,
      subject: "Your Consultation Has Been Confirmed",
      html: clientHtml(trimmedName),
    });

    return json(200, { success: true, message: "Emails sent successfully" });
  } catch (err) {
    console.error("SMTP error:", err);
    return json(500, { success: false, message: "Failed to send emails. Please try again later." });
  }
}
