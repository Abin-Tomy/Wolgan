/**
 * Server-side Cloudflare Turnstile token verification.
 *
 * Calls the siteverify endpoint with the secret key and the
 * token received from the client widget.
 */

const VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

interface TurnstileResult {
  success: boolean;
  /** ISO timestamp of the challenge */
  challenge_ts?: string;
  /** Hostname the challenge was served on */
  hostname?: string;
  /** Error codes if success is false */
  "error-codes"?: string[];
}

/**
 * Verify a Turnstile token.
 *
 * @param token  – The `cf-turnstile-response` value from the client
 * @param ip     – The connecting client's IP (forwarded by Next.js)
 * @returns `true` if the token is valid
 */
export async function verifyTurnstile(
  token: string,
  ip?: string | null
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    console.error("[turnstile] TURNSTILE_SECRET_KEY is not set");
    return false;
  }

  try {
    const body = new URLSearchParams({
      secret,
      response: token,
      ...(ip ? { remoteip: ip } : {}),
    });

    const res = await fetch(VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });

    if (!res.ok) {
      console.error("[turnstile] Siteverify HTTP error:", res.status);
      return false;
    }

    const data: TurnstileResult = await res.json();

    if (!data.success) {
      console.warn(
        "[turnstile] Verification failed:",
        data["error-codes"]?.join(", ")
      );
    }

    return data.success;
  } catch (err) {
    console.error("[turnstile] Network error during verification:", err);
    return false;
  }
}
