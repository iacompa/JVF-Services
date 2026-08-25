"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { getContent } from "@/content/content";
import type { Locale } from "@/content/types";
import { localizedHref } from "@/lib/i18n";
import type { RouteKey } from "@/lib/routes";
import { LanguageSwitcher } from "./language-switcher";

export function MobileNav({
  locale,
  route,
}: {
  locale: Locale;
  route: RouteKey;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const content = getContent(locale);
  const panelId = `mobile-navigation-${locale}`;

  useEffect(() => {
    if (!isOpen) return;
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    }
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  return (
    <div className="mobile-nav-shell">
      <button
        ref={triggerRef}
        className="mobile-menu-trigger"
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        aria-label={isOpen ? content.nav.closeMenu : content.nav.openMenu}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>
      <nav
        id={panelId}
        aria-label={locale === "en" ? "Mobile navigation" : "Navegación móvil"}
        className="mobile-nav-panel"
        hidden={!isOpen}
      >
        <Link
          href={localizedHref("home", locale)}
          aria-current={route === "home" ? "page" : undefined}
        >
          {content.nav.home}
        </Link>
        <div className="mobile-link-group">
          <p>{content.nav.homeServices}</p>
          <Link href={localizedHref("housekeeping", locale)}>
            {content.serviceDetails.housekeeping.title}
          </Link>
          <Link href={localizedHref("decoration", locale)}>
            {content.serviceDetails.decoration.title}
          </Link>
        </div>
        <div className="mobile-link-group">
          <p>{content.nav.professionalServices}</p>
          <Link href={localizedHref("notary", locale)}>
            {content.serviceDetails.notary.title}
          </Link>
          <Link href={localizedHref("interpreting", locale)}>
            {content.serviceDetails.interpreting.title}
          </Link>
        </div>
        <Link
          href={localizedHref("about", locale)}
          aria-current={route === "about" ? "page" : undefined}
        >
          {content.nav.about}
        </Link>
        <Link
          href={localizedHref("contact", locale)}
          aria-current={route === "contact" ? "page" : undefined}
        >
          {content.nav.contact}
        </Link>
        <LanguageSwitcher locale={locale} route={route} compact />
        <Link
          className="button button-primary mobile-quote-link"
          href={localizedHref("contact", locale)}
        >
          {content.nav.requestQuote}
        </Link>
      </nav>
    </div>
  );
}
