import { describe, expect, test } from "vitest";
import { parseQuoteRequest } from "./schema";
import { serviceFieldConfig } from "./field-config";

function requestForm(service: string, fields: Record<string, string> = {}) {
  const formData = new FormData();
  const values = {
    locale: "en",
    service,
    name: "  Jacqueline Visitor  ",
    phone: "(716) 555-0112",
    email: "  PERSON@EXAMPLE.COM ",
    city: "Buffalo",
    zip: "14201",
    note: "Please call before the appointment.",
    privacyAcknowledged: "on",
    startedAt: String(Date.now() - 3_000),
    website: "",
    ...fields,
  };

  for (const [key, value] of Object.entries(values)) {
    formData.set(key, value);
  }

  return formData;
}

describe("quote request validation", () => {
  test("accepts home and small-office housekeeping details", () => {
    const home = parseQuoteRequest(
      requestForm("housekeeping", {
        spaceType: "home",
        cleaningType: "deep-cleaning",
        frequency: "one-time",
        desiredDate: "2026-09-01",
        bedrooms: "3",
        bathrooms: "2",
      }),
    );
    const office = parseQuoteRequest(
      requestForm("housekeeping", {
        spaceType: "small-office",
        cleaningType: "standard-cleaning",
        frequency: "weekly",
        desiredDate: "2026-09-01",
        officeSquareFeet: "1250",
      }),
    );

    expect(home.success).toBe(true);
    expect(office.success).toBe(true);
    if (home.success) {
      expect(home.data).toMatchObject({
        name: "Jacqueline Visitor",
        email: "person@example.com",
        bedrooms: 3,
      });
    }
    if (office.success) {
      expect(office.data).toMatchObject({ officeSquareFeet: 1250 });
    }
  });

  test("requires phone, email, and a valid US ZIP code", () => {
    const result = parseQuoteRequest(
      requestForm("general", {
        phone: "",
        email: "not-an-email",
        zip: "1234",
        reason: "Question about services",
      }),
    );

    expect(result.success).toBe(false);
    if (!result.success) {
      const fields = result.error.flatten().fieldErrors;
      expect(fields.phone).toBeDefined();
      expect(fields.email).toBeDefined();
      expect(fields.zip).toBeDefined();
    }
  });

  test("accepts decoration details without a budget field", () => {
    const result = parseQuoteRequest(
      requestForm("decoration", {
        areas: "Living room and entry",
        stylingGoal: "A calmer, more functional layout",
        desiredDate: "2026-09-05",
        budget: "$5000",
      }),
    );

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).not.toHaveProperty("budget");
    }
  });

  test("rejects discontinued service values", () => {
    const removedService = ["remodel", "ing"].join("");
    expect(parseQuoteRequest(requestForm(removedService)).success).toBe(false);
  });

  test("accepts only in-person notary requests", () => {
    const valid = parseQuoteRequest(
      requestForm("notary", {
        mode: "in-person",
        desiredDate: "2026-09-02",
        desiredTime: "14:30",
      }),
    );
    const invalid = parseQuoteRequest(
      requestForm("notary", {
        mode: "remote",
        desiredDate: "2026-09-02",
        desiredTime: "14:30",
      }),
    );

    expect(valid.success).toBe(true);
    expect(invalid.success).toBe(false);
  });

  test.each(["phone", "zoom", "virtual"])(
    "allows %s interpreting at any hour",
    (mode) => {
      const result = parseQuoteRequest(
        requestForm("interpreting", {
          mode,
          direction: "spanish-to-english",
          setting: "business",
          urgency: "scheduled",
          desiredDate: "2026-09-03",
          desiredTime: "23:45",
          durationMinutes: "60",
        }),
      );

      expect(result.success).toBe(true);
    },
  );

  test.each(["08:00", "18:00"])(
    "accepts in-person interpreting at the %s ET boundary",
    (desiredTime) => {
      const result = parseQuoteRequest(
        requestForm("interpreting", {
          mode: "in-person",
          direction: "english-to-spanish",
          setting: "community",
          urgency: "scheduled",
          desiredDate: "2026-09-03",
          desiredTime,
          durationMinutes: "90",
        }),
      );

      expect(result.success).toBe(true);
    },
  );

  test.each(["07:59", "18:01"])(
    "rejects in-person interpreting at %s ET",
    (desiredTime) => {
      const result = parseQuoteRequest(
        requestForm("interpreting", {
          mode: "in-person",
          direction: "both",
          setting: "community",
          urgency: "scheduled",
          desiredDate: "2026-09-03",
          desiredTime,
          durationMinutes: "90",
        }),
      );

      expect(result.success).toBe(false);
    },
  );

  test("caps notes and rejects spam defenses", () => {
    const tooLong = parseQuoteRequest(
      requestForm("general", { reason: "Question", note: "x".repeat(1_001) }),
    );
    const honeypot = parseQuoteRequest(
      requestForm("general", { reason: "Question", website: "spam.test" }),
    );
    const tooFast = parseQuoteRequest(
      requestForm("general", {
        reason: "Question",
        startedAt: String(Date.now() - 500),
      }),
    );

    expect(tooLong.success).toBe(false);
    expect(honeypot.success).toBe(false);
    expect(tooFast.success).toBe(false);
  });

  test("strips unknown sensitive and upload fields", () => {
    const result = parseQuoteRequest(
      requestForm("general", {
        reason: "Question",
        streetAddress: "100 Example Street",
        file: "document.pdf",
      }),
    );

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).not.toHaveProperty("streetAddress");
      expect(result.data).not.toHaveProperty("file");
    }
    expect(Object.keys(serviceFieldConfig.general)).not.toContain(
      "streetAddress",
    );
  });
});
