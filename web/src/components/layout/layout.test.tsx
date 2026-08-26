import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test } from "vitest";
import { LanguageSwitcher } from "./language-switcher";
import { MobileNav } from "./mobile-nav";
import { ServicesMenu } from "./services-menu";
import { SiteShell } from "./site-shell";

describe("site shell accessibility", () => {
  test("connects the skip link to the main content", () => {
    render(
      <SiteShell locale="en" route="home">
        <h1>Page content</h1>
      </SiteShell>,
    );

    expect(
      screen.getByRole("link", { name: /skip to main content/i }),
    ).toHaveAttribute("href", "#main-content");
    expect(screen.getByRole("main")).toHaveAttribute("id", "main-content");
  });
});

describe("services menu keyboard behavior", () => {
  test("opens with Enter, exposes all services, and restores focus on Escape", async () => {
    const user = userEvent.setup();
    render(<ServicesMenu locale="en" />);

    const trigger = screen.getByRole("button", { name: "Services" });
    trigger.focus();
    await user.keyboard("{Enter}");

    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("link", { name: /housekeeping/i })).toBeVisible();
    expect(
      screen.getByRole("link", { name: /home decoration/i }),
    ).toBeVisible();
    expect(
      screen.queryByRole("link", { name: /landscaping/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /home remodeling/i }),
    ).toBeVisible();
    expect(screen.getByRole("link", { name: /notary/i })).toBeVisible();
    expect(
      screen.getByRole("link", { name: /spanish-english interpreting/i }),
    ).toBeVisible();

    await user.keyboard("{Escape}");

    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).toHaveFocus();
  });
});

describe("mobile and language navigation", () => {
  test("uses a labeled mobile disclosure", async () => {
    const user = userEvent.setup();
    render(<MobileNav locale="en" route="home" />);

    const trigger = screen.getByRole("button", {
      name: "Open navigation menu",
    });
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    await user.click(trigger);

    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("navigation", { name: /mobile/i })).toBeVisible();
  });

  test("preserves the equivalent route when switching languages", () => {
    const { rerender } = render(
      <LanguageSwitcher locale="en" route="notary" />,
    );

    expect(screen.getByRole("link", { name: "Español" })).toHaveAttribute(
      "href",
      "/es/services/notary",
    );
    expect(screen.getByRole("link", { name: "English" })).toHaveAttribute(
      "aria-current",
      "page",
    );

    rerender(<LanguageSwitcher locale="es" route="notary" />);

    expect(screen.getByRole("link", { name: "English" })).toHaveAttribute(
      "href",
      "/services/notary",
    );
    expect(screen.getByRole("link", { name: "Español" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });
});
