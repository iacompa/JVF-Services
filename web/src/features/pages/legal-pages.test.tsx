import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { LegalPage } from "./legal-page";

describe("review-status legal pages", () => {
  test.each(["terms", "privacy", "accessibility"] as const)(
    "marks the English %s page as an unpublished draft",
    (route) => {
      render(<LegalPage locale="en" route={route} />);
      expect(
        screen.getByText("Draft for review — not yet published"),
      ).toBeVisible();
    },
  );

  test.each(["terms", "privacy", "accessibility"] as const)(
    "marks the Spanish %s page as an unpublished draft",
    (route) => {
      render(<LegalPage locale="es" route={route} />);
      expect(
        screen.getByText("Borrador para revisión — aún no publicado"),
      ).toBeVisible();
    },
  );
});

describe("privacy notice", () => {
  test("discloses the full concept-stage data behavior", () => {
    const { container } = render(<LegalPage locale="en" route="privacy" />);
    const copy = container.textContent ?? "";

    expect(copy).toMatch(/name, phone number, email address, city, ZIP code/i);
    expect(copy).toMatch(/demo mode/i);
    expect(copy).toMatch(/future email delivery provider/i);
    expect(copy).toMatch(/Vercel hosting and Web Analytics/i);
    expect(copy).toMatch(/no customer database/i);
    expect(copy).toMatch(/no file uploads/i);
    expect(copy).toMatch(/no automated customer email/i);
    expect(copy).toMatch(/do not sell/i);
  });
});

describe("accessibility statement", () => {
  test("documents standards-first support and feedback routes", () => {
    const { container } = render(
      <LegalPage locale="en" route="accessibility" />,
    );
    const copy = container.textContent ?? "";

    expect(copy).toMatch(/WCAG 2\.2 Level AA/i);
    expect(copy).toMatch(/keyboard/i);
    expect(copy).toMatch(/screen reader/i);
    expect(copy).toMatch(/does not use an accessibility overlay/i);
    expect(copy).toMatch(/\(716\) 748-9117/);
    expect(copy).toMatch(/services\.jvf@gmail\.com/i);
    expect(copy).toMatch(/not a guarantee of legal compliance/i);
  });
});

describe("terms and conditions", () => {
  test("covers quote confirmation, professional boundaries, payment, and law", () => {
    const { container } = render(<LegalPage locale="en" route="terms" />);
    const copy = container.textContent ?? "";

    expect(copy).toMatch(/quote[\s\S]*service confirmation/i);
    expect(copy).toMatch(/availability/i);
    expect(copy).toMatch(/notary/i);
    expect(copy).toMatch(/interpreting/i);
    expect(copy).toMatch(/does not accept payments/i);
    expect(copy).toMatch(/laws of Ohio/i);
  });
});
