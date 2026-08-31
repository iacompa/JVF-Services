import { describe, expect, test } from "vitest";
import { getGoogleWorkflow } from "./google-workflow";

describe("Google booking and request configuration", () => {
  test("returns a safe fallback when Google links are not configured", () => {
    expect(getGoogleWorkflow({})).toEqual({
      bookingUrl: null,
      requestFormUrl: null,
    });
  });

  test("accepts only secure Google Calendar and Google Forms links", () => {
    expect(
      getGoogleWorkflow({
        NEXT_PUBLIC_GOOGLE_BOOKING_URL:
          "https://calendar.google.com/calendar/appointments/schedules/example",
        NEXT_PUBLIC_GOOGLE_FORM_URL:
          "https://docs.google.com/forms/d/e/example/viewform",
      }),
    ).toEqual({
      bookingUrl:
        "https://calendar.google.com/calendar/appointments/schedules/example",
      requestFormUrl: "https://docs.google.com/forms/d/e/example/viewform",
    });

    expect(
      getGoogleWorkflow({
        NEXT_PUBLIC_GOOGLE_BOOKING_URL: "http://calendar.google.com/not-secure",
        NEXT_PUBLIC_GOOGLE_FORM_URL: "https://example.com/not-a-google-form",
      }),
    ).toEqual({ bookingUrl: null, requestFormUrl: null });
  });
});
