import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { PublicPage, publicPageEntries } from "./public-page";
import { buildPageMetadata, professionalServiceJsonLd } from "@/lib/metadata";

describe("public page registry", () => {
  test("renders all 22 localized routes with one page heading", () => {
    expect(publicPageEntries).toHaveLength(22);

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

  test("does not expose a street address or legal suffix", () => {
    const { container } = render(<PublicPage locale="en" route="home" />);
    const copy = container.textContent?.toLowerCase() ?? "";

    expect(copy).not.toContain(" llc");
    expect(copy).not.toMatch(
      /\d{2,}\s+[a-z]+\s+(street|st\.|road|rd\.|avenue|ave\.)/i,
    );
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

  test("describes Ohio service without inventing a postal address", () => {
    expect(professionalServiceJsonLd).toMatchObject({
      "@type": "ProfessionalService",
      name: "JVF Services",
      telephone: "+17167489117",
      areaServed: "Ohio",
    });
    expect(professionalServiceJsonLd).not.toHaveProperty("address");
    expect(professionalServiceJsonLd).not.toHaveProperty("email");
  });
});
