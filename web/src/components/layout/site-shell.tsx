import type { ReactNode } from "react";
import { getContent } from "@/content/content";
import type { Locale } from "@/content/types";
import type { RouteKey } from "@/lib/routes";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

export function SiteShell({
  locale,
  route,
  children,
}: {
  locale: Locale;
  route: RouteKey;
  children: ReactNode;
}) {
  const content = getContent(locale);
  return (
    <div className="site-shell" lang={locale}>
      <a className="skip-link" href="#main-content">
        {content.nav.skipToContent}
      </a>
      <SiteHeader locale={locale} route={route} />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
