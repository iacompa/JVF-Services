import type { Locale, ServiceKey } from "@/content/types";
import type { ServiceId } from "@/features/contact/types";
import { routeKeys, type RouteKey } from "@/lib/routes";
import { SiteShell } from "@/components/layout/site-shell";
import { AboutPage } from "./about-page";
import { ContactPage } from "./contact-page";
import { HomePage } from "./home-page";
import { LegalPage } from "./legal-page";
import { ServiceDetailPage } from "./service-detail-page";
import { ServicesPage } from "./services-page";

export const publicPageEntries = (["en", "es"] as const).flatMap((locale) =>
  routeKeys.map((route) => ({ locale, route })),
);

const serviceByRoute: Partial<Record<RouteKey, ServiceKey>> = {
  housekeeping: "housekeeping",
  decoration: "decoration",
  notary: "notary",
  interpreting: "interpreting",
};

export function PublicPage({
  locale,
  route,
  initialService,
}: {
  locale: Locale;
  route: RouteKey;
  initialService?: ServiceId;
}) {
  let page;
  if (route === "home") page = <HomePage locale={locale} />;
  else if (route === "services") page = <ServicesPage locale={locale} />;
  else if (serviceByRoute[route])
    page = (
      <ServiceDetailPage locale={locale} service={serviceByRoute[route]} />
    );
  else if (route === "about") page = <AboutPage locale={locale} />;
  else if (route === "contact")
    page = <ContactPage locale={locale} initialService={initialService} />;
  else
    page = (
      <LegalPage
        locale={locale}
        route={route as "terms" | "privacy" | "accessibility"}
      />
    );

  return (
    <SiteShell locale={locale} route={route}>
      {page}
    </SiteShell>
  );
}
