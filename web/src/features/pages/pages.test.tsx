import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { PublicPage, publicPageEntries } from "./public-page";
import { buildPageMetadata, professionalServiceJsonLd } from "@/lib/metadata";

describe("public page registry", () => {
  test("renders all 26 localized routes with one page heading", () => {
    expect(publicPageEntries).toHaveLength(26);

    for (const entry of publicPageEntries) {
      const { unmount } = render(
        <PublicPage locale={entry.locale} route={entry.route} />,
      );

      expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
      unmount();
    }
  });

  test("links service calls to action to the correct preselected request", () => {
    render(<PublicPage locale="en" route="notary" />);

    for (const link of screen.getAllByRole("link", {
      name: /request a notary appointment/i,
    })) {
      expect(link).toHaveAttribute("href", "/contact?service=notary");
    }
  });

  test("publishes the approved notary fee and in-person limitation", () => {
    render(<PublicPage locale="en" route="notary" />);

    expect(screen.getByText(/\$5 per in-person notarial act/i)).toBeVisible();
    expect(
      screen.getByText(/remote online notarization is not offered/i),
    ).toBeVisible();
  });

  test("explains interpreter hours and after-hours virtual availability", () => {
    render(<PublicPage locale="en" route="interpreting" />);

    expect(screen.getByText(/available 24\/7/i)).toBeVisible();
    expect(screen.getByText(/8:00 a\.m\. to 6:00 p\.m\./i)).toBeVisible();
    for (const link of screen.getAllByRole("link", { name: /^call/i })) {
      expect(link).toHaveAttribute("href", "tel:+17167489117");
    }
  });

  test("publishes migrated home-service prices", () => {
    render(<PublicPage locale="en" route="services" />);

    expect(screen.getByText(/^\$39 per hour$/i)).toBeVisible();
    expect(screen.getAllByText(/^\$59 per hour$/i)).toHaveLength(2);
  });
});

describe("localized search metadata", () => {
  test("returns canonical and equivalent English and Spanish URLs", () => {
    const metadata = buildPageMetadata("en", "notary");

    expect(metadata.alternates?.canonical).toBe(
      "http://localhost:3000/services/notary",
    );
    expect(metadata.alternates?.languages).toMatchObject({
      en: "http://localhost:3000/services/notary",
      es: "http://localhost:3000/es/services/notary",
    });
  });

  test("describes the migrated business identity and service area", () => {
    expect(professionalServiceJsonLd).toMatchObject({
      "@type": "ProfessionalService",
      name: "JVF HomeWorks Pro",
      telephone: "+17167489117",
      areaServed: "Ohio",
      email: "info@jvfhomeworkspro.com",
    });
    expect(professionalServiceJsonLd.serviceType).toEqual(
      expect.arrayContaining(["Housekeeping", "Home remodeling"]),
    );
    expect(professionalServiceJsonLd.serviceType).not.toContain("Landscaping");
  });
});
