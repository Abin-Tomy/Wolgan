import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { checkRateLimit } from "@/lib/rate-limit";
import { verifyTurnstile } from "@/lib/turnstile";
import {
  validateContactPayload,
  type ContactPayload,
  type Region,
} from "@/lib/sanitize";

// ─── Resend Client ──────────────────────────────────────────────

const resend = new Resend(process.env.RESEND_API_KEY);

// ─── Email targets per region ───────────────────────────────────

const EMAIL_BY_REGION: Record<Region, string | undefined> = {
  UAE: process.env.EMAIL_UAE,
  Qatar: process.env.EMAIL_QATAR,
};

// ─── Security Headers ───────────────────────────────────────────

const SECURITY_HEADERS: Record<string, string> = {
  "X-Content-Type-Options": "nosniff",
  "Cache-Control": "no-store",
};

function jsonResponse(body: Record<string, unknown>, status: number) {
  return NextResponse.json(body, { status, headers: SECURITY_HEADERS });
}

// ─── POST /api/contact ─────────────────────────────────────────

export async function POST(request: NextRequest) {

  // 1. Content-Type enforcement
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return jsonResponse({ error: "Content-Type must be application/json." }, 415);
  }

  // 2. Rate limiting
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  const rateCheck = checkRateLimit(ip);
  if (!rateCheck.allowed) {
    return jsonResponse({ error: "Too many requests. Please try again later." }, 429);
  }

  // 3. Parse JSON body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "Invalid JSON body." }, 400);
  }

  // 4. Validate & sanitise all fields
  const result = validateContactPayload(body);
  if (!result.ok) {
    return jsonResponse({ error: result.error }, 400);
  }
  const data: ContactPayload = result.data;

  // 5. Honeypot
  if (data.website) {
    return jsonResponse({ message: "Thank you for your inquiry." }, 200);
  }

  // 6. Turnstile verification
  const turnstileValid = await verifyTurnstile(data.turnstileToken, ip);
  if (!turnstileValid) {
    return jsonResponse({ error: "CAPTCHA verification failed. Please try again." }, 403);
  }

  // 7. Resolve destination email
  const toEmail = EMAIL_BY_REGION[data.region];
  if (!toEmail) {
    console.error(`[contact] No email configured for region "${data.region}"`);
    return jsonResponse({ error: "Unable to process your request at this time." }, 500);
  }

  const fromEmail = process.env.EMAIL_FROM ?? "Wolgan Contact <noreply@wolgan.co>";

  // 8. Send email
  try {
    const sendResult = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: `New ${data.region} Inquiry — ${data.interest}`,
      replyTo: data.email,
      html: buildEmailHtml(data),
    });

    // Resend returns errors as data, not thrown exceptions — must check explicitly
    if (sendResult.error) {
      console.error("[contact] Resend rejected the email:", sendResult.error.message);
      return jsonResponse({ error: "Unable to send your message. Please try again later." }, 500);
    }
  } catch (err) {
    console.error("[contact] Failed to send email:", err);
    return jsonResponse({ error: "Unable to send your message. Please try again later." }, 500);
  }

  return jsonResponse({ message: "Thank you for your inquiry." }, 200);
}

// ─── Email Template ─────────────────────────────────────────────

function buildEmailHtml(data: ContactPayload): string {
  const regionSpecificRow =
    data.region === "UAE"
      ? `<tr><td style="padding:12px 16px;color:#888;font-size:13px;white-space:nowrap;vertical-align:top;">Emirate</td><td style="padding:12px 16px;color:#fff;font-size:14px;">${data.emirate}</td></tr>`
      : `<tr><td style="padding:12px 16px;color:#888;font-size:13px;white-space:nowrap;vertical-align:top;">Phone</td><td style="padding:12px 16px;color:#fff;font-size:14px;">+974 ${data.phone}</td></tr>`;

  const accentColor = data.region === "UAE" ? "#66B2E8" : "#8A1538";

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#020610;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#020610;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#0A1120;border:1px solid rgba(255,255,255,0.1);border-radius:16px;overflow:hidden;">
        
        <!-- Header -->
        <tr>
          <td style="padding:32px 32px 24px;border-bottom:1px solid rgba(255,255,255,0.08);">
            <div style="font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:${accentColor};margin-bottom:8px;">
              New ${data.region} Inquiry
            </div>
            <div style="font-size:24px;font-weight:300;color:#ffffff;letter-spacing:-0.5px;">
              ${data.interest}
            </div>
          </td>
        </tr>

        <!-- Data Rows -->
        <tr><td style="padding:24px 16px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding:12px 16px;color:#888;font-size:13px;white-space:nowrap;vertical-align:top;">Name</td>
              <td style="padding:12px 16px;color:#fff;font-size:14px;">${data.firstName} ${data.lastName}</td>
            </tr>
            <tr>
              <td style="padding:12px 16px;color:#888;font-size:13px;white-space:nowrap;vertical-align:top;">Email</td>
              <td style="padding:12px 16px;color:#fff;font-size:14px;">
                <a href="mailto:${data.email}" style="color:${accentColor};text-decoration:none;">${data.email}</a>
              </td>
            </tr>
            ${regionSpecificRow}
            <tr>
              <td style="padding:12px 16px;color:#888;font-size:13px;white-space:nowrap;vertical-align:top;">Region</td>
              <td style="padding:12px 16px;color:#fff;font-size:14px;">${data.region}</td>
            </tr>
          </table>
        </td></tr>

        <!-- Message -->
        <tr>
          <td style="padding:0 32px 32px;">
            <div style="font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#888;margin-bottom:12px;">Message</div>
            <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:20px;color:#ccc;font-size:14px;line-height:1.7;">
              ${data.message.replace(/\n/g, "<br>")}
            </div>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:20px 32px;border-top:1px solid rgba(255,255,255,0.05);text-align:center;">
            <div style="font-size:11px;color:#555;">
              Sent via wolgan.co contact form
            </div>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
