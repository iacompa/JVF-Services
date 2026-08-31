import { render, screen, within } from "@testing-library/react";
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

  test("offers a dedicated consultation booking route in both languages", () => {
    const { unmount } = render(<PublicPage locale="en" route="book" />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /book a consultation/i,
      }),
    ).toBeVisible();
    expect(
      within(screen.getByRole("main")).getByRole("link", {
        name: /request service instead/i,
      }),
    ).toHaveAttribute("href", "/contact");

    unmount();
    render(<PublicPage locale="es" route="book" />);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /reserve una consulta/i,
      }),
    ).toBeVisible();
  });

  test("keeps the homepage service overview compact", () => {
    render(<PublicPage locale="en" route="home" />);

    expect(screen.getAllByTestId("service-overview-card")).toHaveLength(4);
    expect(screen.queryByText("What’s included?")).not.toBeInTheDocument();
  });

  test("keeps detailed service cards on the services page", () => {
    render(<PublicPage locale="en" route="services" />);

    expect(screen.getAllByText("What’s included?")).toHaveLength(4);
  });

  test("uses an honest gallery holding state instead of remodeling photos", () => {
    render(<PublicPage locale="en" route="gallery" />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /service portfolio is being refreshed/i,
      }),
    ).toBeVisible();
    expect(screen.queryByText(/basement/i)).not.toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  test("links standardized service calls to action to the correct preselected request", () => {
    render(<PublicPage locale="en" route="notary" />);

    for (const link of within(screen.getByRole("main")).getAllByRole("link", {
      name: /request service/i,
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
    expect(screen.getAllByText(/^\$59 per hour$/i)).toHaveLength(1);
  });

  test("presents Jacqueline Valentin as the founder on the About page", () => {
    render(<PublicPage locale="en" route="about" />);

    expect(screen.getAllByText("Jacqueline Valentin")).toHaveLength(2);
    expect(screen.getAllByText("Founder")).toHaveLength(2);
    expect(
      screen.getByText(/bringing clarity and care to every conversation/i),
    ).toBeVisible();
    expect(
      screen.getByAltText(/Jacqueline Valentin, founder of JVF Services/i),
    ).toHaveAttribute(
      "src",
      expect.stringContaining("jacqueline-valentin-founder.jpg"),
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

  test("describes the migrated business identity and service area", () => {
    expect(professionalServiceJsonLd).toMatchObject({
      "@type": "ProfessionalService",
      name: "JVF Services",
      founder: {
        "@type": "Person",
        name: "Jacqueline Valentin",
      },
      telephone: "+17167489117",
      areaServed: "Ohio",
      email: "services.jvf@gmail.com",
    });
    expect(professionalServiceJsonLd.serviceType).toEqual(
      expect.arrayContaining(["Housekeeping", "Home decoration"]),
    );
    expect(professionalServiceJsonLd.serviceType).toHaveLength(4);
    expect(professionalServiceJsonLd.serviceType).not.toContain("Landscaping");
  });
});
