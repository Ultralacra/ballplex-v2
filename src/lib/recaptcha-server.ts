const RECAPTCHA_VERIFY_URL =
  "https://www.google.com/recaptcha/api/siteverify";

type RecaptchaResponse = {
  success: boolean;
  score?: number;
  action?: string;
};

export async function verifyRecaptcha(
  token: unknown,
  expectedAction: string,
) {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret || typeof token !== "string" || !token) return false;

  const body = new URLSearchParams({
    secret,
    response: token,
  });

  try {
    const response = await fetch(RECAPTCHA_VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      cache: "no-store",
    });
    const result = (await response.json()) as RecaptchaResponse;
    return (
      result.success === true &&
      result.action === expectedAction &&
      (result.score ?? 0) >= 0.5
    );
  } catch {
    return false;
  }
}
