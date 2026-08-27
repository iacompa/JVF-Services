import { describe, expect, test } from "vitest";
import { businessFacts } from "./business";
import { getContent } from "./content";
import { routeKeys } from "@/lib/routes";
import { localizedHref } from "@/lib/i18n";

function getObjectPaths(value: unknown, prefix = ""): string[] {
  if (Array.isArray(value)) {
    return [prefix];
  }

  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([key, child]) =>
      getObjectPaths(child, prefix ? `${prefix}.${key}` : key),
    );
  }

  return [prefix];
}

describe("business facts", () => {
  test("keeps the migrated public identity and contact details in one source of truth", () => {
    expect(businessFacts).toMatchObject({
      publicName: "JVF HomeWorks Pro",
      phoneDisplay: "(716) 748-9117",
      phoneHref: "tel:+17167489117",
      smsHref: "sms:+17167489117",
      email: "services.jvf@gmail.com",
      mailingAddress: {
        street: "2590 Walnut St",
        city: "Denver",
        region: "CO",
        postalCode: "80205",
      },
      owner: null,
      legalEntitySuffix: null,
      reviews: [
        {
          author: "Hellen Smith",
          rating: 5,
        },
        {
          author: "Rebecca Hawland",
          rating: 5,
        },
        {
          author: "Michelle",
          rating: 4,
        },
      ],
    });
  });
});

describe("localized content", () => {
  test("keeps English and Spanish content shapes in parity", () => {
    const englishPaths = getObjectPaths(getContent("en")).sort();
    const spanishPaths = getObjectPaths(getContent("es")).sort();

    expect(spanishPaths).toEqual(englishPaths);
    expect(getContent("es").reviewStatus).toBe("owner-review-required");
  });

  test("resolves every route in both languages", () => {
    for (const route of routeKeys) {
      const englishHref = localizedHref(route, "en");
      const spanishHref = localizedHref(route, "es");

      expect(englishHref).toMatch(/^\//);
      expect(spanishHref).toMatch(/^\/es(?:\/|$)/);
    }

    expect(localizedHref("home", "en")).toBe("/");
    expect(localizedHref("home", "es")).toBe("/es");
  });

  test("publishes the migrated home services without prohibited professional claims", () => {
    const publicCopy = JSON.stringify({
      businessFacts,
      en: getContent("en"),
      es: getContent("es"),
    }).toLowerCase();

    expect(publicCopy).toContain("jvf homeworks pro");
    expect(publicCopy).not.toContain("landscaping");
    expect(publicCopy).toContain("remodeling");
    expect(publicCopy).not.toContain("certified interpreter");
  });
});
