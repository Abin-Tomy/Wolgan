/**
 * Contact form input validation & sanitization.
 *
 * Every value the client sends is treated as untrusted.
 * We strip HTML, enforce length limits, and allowlist
 * dropdown values so the API route can trust the output.
 */

// ─── Allowed Values (must match the frontend dropdowns) ─────────

export const ALLOWED_REGIONS = ["UAE", "Qatar"] as const;
export type Region = (typeof ALLOWED_REGIONS)[number];

export const ALLOWED_EMIRATES = [
  "Abu Dhabi",
  "Dubai",
  "Sharjah",
  "Ajman",
  "Umm Al Quwain",
  "Ras Al Khaimah",
  "Fujairah",
] as const;

export const ALLOWED_INTERESTS = [
  "Water Treatment Solutions",
  "MEP Installations",
  "Specialized Chemical Supplies",
  "Partnership Opportunities",
  "Other Inquiry",
] as const;

// ─── Sanitisation Helpers ───────────────────────────────────────

/** Strip every HTML tag from a string */
export function stripHtml(input: string): string {
  return input.replace(/<[^>]*>/g, "");
}

/** Trim + collapse internal whitespace */
export function cleanString(input: unknown): string {
  if (typeof input !== "string") return "";
  return stripHtml(input).trim().replace(/\s+/g, " ");
}

/** Simple RFC-5322-ish email check (no need for a full parser) */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: string): boolean {
  return EMAIL_RE.test(email) && email.length <= 254;
}

/** Qatar phone: digits only, 7–8 digits after the country code */
const QATAR_PHONE_RE = /^\d{7,8}$/;

export function isValidQatarPhone(phone: string): boolean {
  const digits = phone.replace(/[\s\-()]/g, "");
  return QATAR_PHONE_RE.test(digits);
}

// ─── Full Payload Validation ────────────────────────────────────

export interface ContactPayload {
  firstName: string;
  lastName: string;
  email: string;
  region: Region;
  emirate: string;    // UAE only
  phone: string;      // Qatar only
  interest: string;
  message: string;
  /** Honeypot — must be empty */
  website: string;
  /** Turnstile token */
  turnstileToken: string;
}

export interface ValidationResult {
  ok: true;
  data: ContactPayload;
}

export interface ValidationError {
  ok: false;
  error: string;
}

export function validateContactPayload(
  body: unknown
): ValidationResult | ValidationError {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid request body." };
  }

  const raw = body as Record<string, unknown>;

  // --- Clean strings ---
  const firstName = cleanString(raw.firstName);
  const lastName = cleanString(raw.lastName);
  const email = cleanString(raw.email);
  const region = cleanString(raw.region);
  const emirate = cleanString(raw.emirate);
  const phone = cleanString(raw.phone);
  const interest = cleanString(raw.interest);
  const message = cleanString(raw.message);
  const website = cleanString(raw.website);
  const turnstileToken = cleanString(raw.turnstileToken);

  // --- Required fields ---
  if (!firstName || firstName.length < 2 || firstName.length > 100) {
    return { ok: false, error: "First name must be 2–100 characters." };
  }
  if (!lastName || lastName.length < 1 || lastName.length > 100) {
    return { ok: false, error: "Last name must be 1–100 characters." };
  }
  if (!email || !isValidEmail(email)) {
    return { ok: false, error: "Please provide a valid email address." };
  }

  // --- Region (allowlisted) ---
  if (!ALLOWED_REGIONS.includes(region as Region)) {
    return { ok: false, error: "Invalid region selection." };
  }
  const validRegion = region as Region;

  // --- Region-specific fields ---
  if (validRegion === "UAE") {
    if (!ALLOWED_EMIRATES.includes(emirate as (typeof ALLOWED_EMIRATES)[number])) {
      return { ok: false, error: "Please select a valid emirate." };
    }
  }
  if (validRegion === "Qatar") {
    if (!phone || !isValidQatarPhone(phone)) {
      return { ok: false, error: "Please provide a valid Qatar phone number (7–8 digits)." };
    }
  }

  // --- Interest (allowlisted) ---
  if (!ALLOWED_INTERESTS.includes(interest as (typeof ALLOWED_INTERESTS)[number])) {
    return { ok: false, error: "Please select a valid area of interest." };
  }

  // --- Message ---
  if (!message || message.length < 10) {
    return { ok: false, error: "Message must be at least 10 characters." };
  }
  if (message.length > 5000) {
    return { ok: false, error: "Message must be under 5 000 characters." };
  }

  // --- Turnstile ---
  if (!turnstileToken) {
    return { ok: false, error: "CAPTCHA verification is required." };
  }

  return {
    ok: true,
    data: {
      firstName,
      lastName,
      email,
      region: validRegion,
      emirate,
      phone,
      interest,
      message,
      website,
      turnstileToken,
    },
  };
}
