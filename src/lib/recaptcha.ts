export const RECAPTCHA_SITE_KEY =
  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

export function getRecaptchaToken(action: string) {
  return new Promise<string>((resolve, reject) => {
    if (!RECAPTCHA_SITE_KEY || !window.grecaptcha) {
      reject(new Error("Security verification is not ready. Please try again."));
      return;
    }

    window.grecaptcha.ready(() => {
      window.grecaptcha!
        .execute(RECAPTCHA_SITE_KEY, { action })
        .then(resolve)
        .catch(() =>
          reject(new Error("Security verification failed. Please try again.")),
        );
    });
  });
}
