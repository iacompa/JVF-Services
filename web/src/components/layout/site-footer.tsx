import Link from "next/link";
import { businessFacts } from "@/content/business";
import { getContent } from "@/content/content";
import type { Locale } from "@/content/types";
import { localizedHref } from "@/lib/i18n";
import { BrandLockup } from "@/components/ui/brand-lockup";

export function SiteFooter({ locale }: { locale: Locale }) {
  const content = getContent(locale);
  return (
    <footer className="site-footer">
      <div className="site-container footer-grid">
        <div className="footer-brand">
          <BrandLockup
            href={localizedHref("home", locale)}
            homeLabel={content.nav.home}
            inverse
          />
          <p>{content.common.footerSummary}</p>
        </div>
        <nav aria-label={locale === "en" ? "Services" : "Servicios"}>
          <p className="footer-heading">{content.nav.services}</p>
          <Link href={localizedHref("housekeeping", locale)}>
            {content.serviceDetails.housekeeping.title}
          </Link>
          <Link href={localizedHref("decoration", locale)}>
            {content.serviceDetails.decoration.title}
          </Link>
          <Link href={localizedHref("notary", locale)}>
            {content.serviceDetails.notary.title}
          </Link>
          <Link href={localizedHref("interpreting", locale)}>
            {content.serviceDetails.interpreting.title}
          </Link>
        </nav>
        <nav
          aria-label={
            locale === "en" ? "Business information" : "Información del negocio"
          }
        >
          <p className="footer-heading">{content.nav.contact}</p>
          <a href={businessFacts.phoneHref}>{content.common.call}</a>
          <a href={businessFacts.smsHref}>{content.common.text}</a>
          <a href={businessFacts.emailHref}>{businessFacts.email}</a>
          <address>{businessFacts.mailingAddress.formatted}</address>
          <Link href={localizedHref("gallery", locale)}>
            {content.nav.gallery}
          </Link>
          <Link href={localizedHref("about", locale)}>{content.nav.about}</Link>
          <Link href={localizedHref("contact", locale)}>
            {content.nav.requestQuote}
          </Link>
        </nav>
      </div>
      <div className="site-container footer-legal">
        <p>
          © {new Date().getFullYear()} {businessFacts.publicName}.{" "}
          {content.common.rights}
        </p>
        <nav aria-label="Legal">
          <Link href={localizedHref("terms", locale)}>
            {content.common.terms}
          </Link>
          <Link href={localizedHref("privacy", locale)}>
            {content.common.privacy}
          </Link>
          <Link href={localizedHref("accessibility", locale)}>
            {content.common.accessibility}
          </Link>
        </nav>
      </div>
    </footer>
  );
}
