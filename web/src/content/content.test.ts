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
  test("keeps public identity and unverified fields within the approved scope", () => {
    expect(businessFacts).toMatchObject({
      publicName: "JVF Services",
      phoneDisplay: "(716) 748-9117",
      phoneHref: "tel:+17167489117",
      smsHref: "sms:+17167489117",
      email: null,
      address: null,
      owner: null,
      legalEntitySuffix: null,
      reviews: [],
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

  test("does not publish superseded brands or prohibited service claims", () => {
    const publicCopy = JSON.stringify({
      businessFacts,
      en: getContent("en"),
      es: getContent("es"),
    }).toLowerCase();

    expect(publicCopy).not.toContain("jvf homeworks pro");
    expect(publicCopy).not.toContain("landscaping");
    expect(publicCopy).not.toContain("remodeling");
    expect(publicCopy).not.toContain("certified interpreter");
  });
});
