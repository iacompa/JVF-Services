import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/services",
  "/services/housekeeping",
  "/services/home-decoration",
  "/services/notary",
  "/services/interpreting",
  "/gallery",
  "/about",
  "/book",
  "/contact",
  "/terms",
  "/privacy",
  "/accessibility",
  "/es",
  "/es/services",
  "/es/services/housekeeping",
  "/es/services/home-decoration",
  "/es/services/notary",
  "/es/services/interpreting",
  "/es/gallery",
  "/es/about",
  "/es/book",
  "/es/contact",
  "/es/terms",
  "/es/privacy",
  "/es/accessibility",
] as const;

for (const route of routes) {
  test(`${route} has no serious or critical Axe violations`, async ({
    page,
  }) => {
    await page.goto(route);
    await expect(page.locator("html")).toHaveAttribute("data-hydrated", "true");
    const results = await new AxeBuilder({ page }).analyze();
    const blocking = results.violations.filter((violation) =>
      ["serious", "critical"].includes(violation.impact ?? ""),
    );
    expect(blocking).toEqual([]);
  });

  test(`${route} exposes a single H1 and named page landmarks`, async ({
    page,
  }) => {
    await page.goto(route);
    await expect(page.locator("html")).toHaveAttribute("data-hydrated", "true");
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    await expect(page.locator("header")).toHaveCount(1);
    await expect(page.locator("main#main-content")).toHaveCount(1);
    await expect(page.locator("footer")).toHaveCount(1);
  });
}

test("skip link is the first visible keyboard stop", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-hydrated", "true");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Skip to main content" });
  await expect(skip).toBeFocused();
  await expect(skip).toBeVisible();
});

test("contact fallback exposes a clear accessible status", async ({ page }) => {
  await page.goto("/contact?service=interpreting");
  await expect(page.locator("html")).toHaveAttribute("data-hydrated", "true");
  await expect(page.getByRole("status")).toContainText(
    "Online form setup in progress",
  );
  await expect(page.getByText("Selected service:")).toBeVisible();
});
