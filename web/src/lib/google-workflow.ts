type PublicEnvironment = Readonly<Record<string, string | undefined>>;

export interface GoogleWorkflow {
  bookingUrl: string | null;
  requestFormUrl: string | null;
}

function trustedGoogleUrl(
  value: string | undefined,
  hosts: readonly string[],
): string | null {
  if (!value) return null;

  try {
    const url = new URL(value);
    return url.protocol === "https:" && hosts.includes(url.hostname)
      ? url.toString().replace(/\/$/, "")
      : null;
  } catch {
    return null;
  }
}

export function getGoogleWorkflow(
  environment: PublicEnvironment = process.env,
): GoogleWorkflow {
  return {
    bookingUrl: trustedGoogleUrl(environment.NEXT_PUBLIC_GOOGLE_BOOKING_URL, [
      "calendar.google.com",
    ]),
    requestFormUrl: trustedGoogleUrl(environment.NEXT_PUBLIC_GOOGLE_FORM_URL, [
      "docs.google.com",
      "forms.gle",
    ]),
  };
}
