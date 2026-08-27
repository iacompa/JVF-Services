import { expect, test, type Page } from "@playwright/test";

async function waitForHydration(page: Page) {
  await expect(page.locator("html")).toHaveAttribute("data-hydrated", "true");
}

async function fillCommon(page: Page) {
  await page.getByLabel("Full name", { exact: true }).fill("Website QA");
  await page.getByLabel("Phone number", { exact: true }).fill("7165550100");
  await page
    .getByLabel("Email address", { exact: true })
    .fill("qa@example.com");
  await page.getByLabel("City in Ohio", { exact: true }).fill("Columbus");
  await page.getByLabel("ZIP code", { exact: true }).fill("43215");
  await page.getByRole("checkbox").check();
  await page.waitForTimeout(2_100);
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

test("migrated pricing, contact details, and gallery are public", async ({
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
  await expect(page.locator("main").getByRole("img")).toHaveCount(2);
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
    .getByRole("link", { name: "Request an interpreter" })
    .first()
    .click();

  await expect(page).toHaveURL(/\/contact\?service=interpreting$/);
  await expect(page.getByLabel("Service needed")).toHaveValue("interpreting");
  await expect(page.getByLabel("Service format")).toBeVisible();
  await expect(
    page.getByRole("link", { name: /^Call/ }).first(),
  ).toHaveAttribute("href", "tel:+17167489117");
  await expect(
    page.getByRole("link", { name: /^Text/ }).first(),
  ).toHaveAttribute("href", "sms:+17167489117");
});

test("submits a valid housekeeping demo request", async ({ page }) => {
  await page.goto("/contact?service=housekeeping");
  await waitForHydration(page);
  await fillCommon(page);
  await page.getByLabel("Cleaning type").selectOption("deep-cleaning");
  await page.getByLabel("Frequency").selectOption("one-time");
  await page.getByLabel("Desired date").fill("2026-09-01");
  await page.getByLabel("Bedrooms").fill("3");
  await page.getByLabel("Bathrooms").fill("2");
  await page.getByRole("button", { name: "Send demo request" }).click();

  await expect(page.getByRole("status")).toHaveText(
    "Your demo request was received.",
  );
  await expect(page.getByLabel("Full name")).toHaveValue("");
});

test("submits a valid in-person notary demo request", async ({ page }) => {
  await page.goto("/contact?service=notary");
  await waitForHydration(page);
  await fillCommon(page);
  await page.getByLabel("Desired date").fill("2026-09-02");
  await page.getByLabel("Desired time").fill("14:30");
  await page.getByRole("button", { name: "Send demo request" }).click();

  await expect(page.getByRole("status")).toHaveText(
    "Your demo request was received.",
  );
});

test("submits virtual interpreting after 6 PM", async ({ page }) => {
  await page.goto("/contact?service=interpreting");
  await waitForHydration(page);
  await fillCommon(page);
  await page.getByLabel("Service format").selectOption("phone");
  await page
    .getByLabel("Language direction")
    .selectOption("spanish-to-english");
  await page.getByLabel("Setting").selectOption("business");
  await page.getByLabel("Timing").selectOption("scheduled");
  await page.getByLabel("Desired date").fill("2026-09-03");
  await page.getByLabel("Desired time (Eastern Time)").fill("23:45");
  await page.getByLabel("Expected minutes").fill("60");
  await page.getByRole("button", { name: "Send demo request" }).click();

  await expect(page.getByRole("status")).toHaveText(
    "Your demo request was received.",
  );
});

test("rejects after-hours in-person interpreting and preserves fields", async ({
  page,
}) => {
  await page.goto("/contact?service=interpreting");
  await waitForHydration(page);
  await fillCommon(page);
  await page.getByLabel("Service format").selectOption("in-person");
  await page.getByLabel("Language direction").selectOption("both");
  await page.getByLabel("Setting").selectOption("community");
  await page.getByLabel("Timing").selectOption("scheduled");
  await page.getByLabel("Desired date").fill("2026-09-03");
  await page.getByLabel("Desired time (Eastern Time)").fill("18:01");
  await page.getByLabel("Expected minutes").fill("90");
  await page.getByRole("button", { name: "Send demo request" }).click();

  const summary = page.getByRole("alert").first();
  await expect(summary).toBeFocused();
  await expect(
    summary.getByRole("link", { name: "Desired time (Eastern Time)" }),
  ).toHaveAttribute("href", "#desiredTime");
  await expect(page.getByLabel("Full name")).toHaveValue("Website QA");
  await expect(page.getByLabel("Phone number")).toHaveValue("7165550100");
  await expect(page.getByLabel("Email address")).toHaveValue("qa@example.com");
  await expect(page.getByLabel("Service format")).toHaveValue("in-person");
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
