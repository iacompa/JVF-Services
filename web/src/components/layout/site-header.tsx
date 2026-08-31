import Link from "next/link";
import { businessFacts } from "@/content/business";
import { getContent } from "@/content/content";
import type { Locale } from "@/content/types";
import { localizedHref } from "@/lib/i18n";
import type { RouteKey } from "@/lib/routes";
import { BrandLockup } from "@/components/ui/brand-lockup";
import { LanguageSwitcher } from "./language-switcher";
import { MobileNav } from "./mobile-nav";
import { ServicesMenu } from "./services-menu";

export function SiteHeader({
  locale,
  route,
}: {
  locale: Locale;
  route: RouteKey;
}) {
  const content = getContent(locale);
  return (
    <header className="site-header">
      <div className="announcement-bar">
        <div className="site-container announcement-inner">
          <p>{content.common.availableInOhio}</p>
          <a href={businessFacts.phoneHref}>{content.common.call}</a>
        </div>
      </div>
      <div className="site-container header-inner">
        <BrandLockup
          href={localizedHref("home", locale)}
          homeLabel={content.nav.home}
        />
        <nav
          className="desktop-navigation"
          aria-label={
            locale === "en" ? "Primary navigation" : "Navegación principal"
          }
        >
          <Link
            href={localizedHref("home", locale)}
            aria-current={route === "home" ? "page" : undefined}
          >
            {content.nav.home}
          </Link>
          <ServicesMenu locale={locale} />
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
        </nav>
        <div className="header-actions">
          <LanguageSwitcher locale={locale} route={route} compact />
          <Link
            className="button button-primary header-quote-link"
            href={localizedHref("contact", locale)}
          >
            {content.nav.requestQuote}
          </Link>
        </div>
        <MobileNav locale={locale} route={route} />
      </div>
    </header>
  );
}
