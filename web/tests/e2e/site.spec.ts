import { expect, test, type Page } from "@playwright/test";

async function waitForHydration(page: Page) {
  await expect(page.locator("html")).toHaveAttribute("data-hydrated", "true");
}

test("English and Spanish navigation preserve the current page", async ({
  page,
}) => {
  await page.goto("/services/notary");
  await waitForHydration(page);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "In-person Ohio notary service",
  );

  const language = page.getByRole("navigation", { name: "Language" }).first();
  await language.getByRole("link", { name: "Español" }).click();

  await expect(page).toHaveURL(/\/es\/services\/notary$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "es");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "notaría presencial en Ohio",
  );
});

test("Services disclosure supports Enter and Escape", async ({ page }) => {
  await page.goto("/");
  await waitForHydration(page);
  const trigger = page
    .getByRole("navigation", { name: "Primary navigation" })
    .getByRole("button", { name: "Services" });

  await trigger.focus();
  await page.keyboard.press("Enter");
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await expect(
    page.getByRole("link", { name: "In-person Ohio notary service" }).first(),
  ).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await expect(trigger).toBeFocused();
});

test("migrated pricing, unchanged contact address, and honest portfolio state are public", async ({
  page,
}) => {
  await page.goto("/services");
  await waitForHydration(page);
  await expect(page.getByText("$39 per hour")).toBeVisible();
  await expect(page.getByText("$59 per hour")).toHaveCount(1);

  await page.goto("/contact");
  await expect(
    page.getByRole("link", { name: "services.jvf@gmail.com" }).first(),
  ).toHaveAttribute("href", "mailto:services.jvf@gmail.com");
  await expect(
    page.getByText("2590 Walnut St, Denver, CO 80205").first(),
  ).toBeVisible();

  await page.goto("/gallery");
  await expect(
    page.getByRole("heading", {
      name: "Our service portfolio is being refreshed",
    }),
  ).toBeVisible();
  await expect(page.locator("main").getByRole("img")).toHaveCount(0);
});

test("discontinued service URLs return not found", async ({ page }) => {
  const removedPath = ["home", "remodeling"].join("-");
  for (const route of [
    `/services/${removedPath}`,
    `/es/services/${removedPath}`,
  ]) {
    const response = await page.goto(route);
    expect(response?.status()).toBe(404);
  }
});

test("service CTA preselects interpreting and direct actions remain available", async ({
  page,
}) => {
  await page.goto("/services/interpreting");
  await waitForHydration(page);
  await page
    .locator("main")
    .getByRole("link", { name: "Request Service" })
    .first()
    .click();

  await expect(page).toHaveURL(/\/contact\?service=interpreting$/);
  await expect(page.getByText("Selected service:")).toBeVisible();
  await expect(
    page
      .locator(".selected-service-note")
      .getByText("Spanish-English interpreting"),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /^Call/ }).first(),
  ).toHaveAttribute("href", "tel:+17167489117");
  await expect(
    page.getByRole("link", { name: /^Text/ }).first(),
  ).toHaveAttribute("href", "sms:+17167489117");
});

test("contact and consultation routes expose safe fallbacks until Google links are configured", async ({
  page,
}) => {
  await page.goto("/contact");
  await waitForHydration(page);
  await expect(page.getByRole("status")).toContainText(
    "Online form setup in progress",
  );
  await expect(
    page.getByRole("button", { name: /send demo request/i }),
  ).toHaveCount(0);

  await page.goto("/book");
  await waitForHydration(page);
  await expect(
    page.getByRole("heading", { level: 1, name: "Book a Consultation" }),
  ).toBeVisible();
  await expect(
    page.getByText("The online calendar is being connected."),
  ).toBeVisible();
});

test("decorative accent rules use the dark-green brand color across public pages", async ({
  page,
}) => {
  const darkGreen = "rgb(31, 101, 65)";
  const checks = [
    {
      route: "/",
      selector: ".closing-cta",
      pseudo: undefined,
      property: "border-left-color",
    },
    {
      route: "/contact",
      selector: ".contact-direct",
      pseudo: undefined,
      property: "border-top-color",
    },
    {
      route: "/about",
      selector: ".founder-statement-section",
      pseudo: undefined,
      property: "border-top-color",
    },
    {
      route: "/services",
      selector: ".service-group > h2",
      pseudo: "::after",
      property: "background-color",
    },
    {
      route: "/gallery",
      selector: ".gallery-hero",
      pseudo: undefined,
      property: "border-bottom-color",
    },
    {
      route: "/book",
      selector: ".booking-panel",
      pseudo: undefined,
      property: "border-top-color",
    },
  ] as const;

  for (const check of checks) {
    await page.goto(check.route);
    await waitForHydration(page);
    const accent = page.locator(check.selector).first();
    await expect(accent).toBeVisible();
    const color = await accent.evaluate(
      (element, currentCheck) =>
        getComputedStyle(element, currentCheck.pseudo).getPropertyValue(
          currentCheck.property,
        ),
      check,
    );
    expect(color, `${check.route} ${check.selector}`).toBe(darkGreen);
  }
});

test("review actions open the verified JVF Services Google listing", async ({
  page,
}) => {
  await page.goto("/");
  await waitForHydration(page);

  await expect(
    page.getByRole("link", { name: "Leave a review on Google" }),
  ).toHaveAttribute(
    "href",
    "https://search.google.com/local/writereview?placeid=ChIJ1XQC2gWKcWIRkcHDuVMpH60",
  );
  await expect(
    page.getByRole("link", { name: "Read all reviews on Google" }),
  ).toHaveAttribute(
    "href",
    "https://www.google.com/maps/search/?api=1&query=JVF%20Services&query_place_id=ChIJ1XQC2gWKcWIRkcHDuVMpH60",
  );
});

test("mobile navigation works and all required widths avoid horizontal overflow", async ({
  page,
}) => {
  for (const width of [1440, 1280, 1024, 768, 390, 320]) {
    await page.setViewportSize({ width, height: width <= 390 ? 720 : 900 });
    await page.goto(width === 320 ? "/es" : "/");
    await waitForHydration(page);
    const overflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    );
    expect(overflow, `horizontal overflow at ${width}px`).toBe(0);
  }

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await waitForHydration(page);
  const trigger = page.locator(".mobile-menu-trigger");
  await trigger.click();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await expect(
    page.getByRole("navigation", { name: "Mobile navigation" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
});
