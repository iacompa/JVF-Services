import type { Metadata } from "next";
import { businessFacts } from "@/content/business";
import { getContent } from "@/content/content";
import type { Locale } from "@/content/types";
import { localizedHref } from "@/lib/i18n";
import type { RouteKey } from "@/lib/routes";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "http://localhost:3000";

const pageLabels: Record<RouteKey, { en: string; es: string }> = {
  home: { en: "Home", es: "Inicio" },
  services: { en: "Services", es: "Servicios" },
  housekeeping: { en: "Housekeeping", es: "Limpieza" },
  decoration: { en: "Home Decoration", es: "Decoración del hogar" },
  notary: { en: "Ohio Notary Public", es: "Notaría en Ohio" },
  interpreting: {
    en: "Spanish-English Interpreting",
    es: "Interpretación español-inglés",
  },
  gallery: { en: "Gallery", es: "Galería" },
  about: { en: "About", es: "Nosotros" },
  contact: { en: "Contact & Quote", es: "Contacto y cotización" },
  terms: { en: "Terms and Conditions", es: "Términos y condiciones" },
  privacy: { en: "Privacy", es: "Privacidad" },
  accessibility: { en: "Accessibility", es: "Accesibilidad" },
};

function descriptionFor(locale: Locale, route: RouteKey): string {
  const content = getContent(locale);
  if (route === "home") return content.home.summary;
  if (route === "services") return content.services.intro;
  if (
    route === "housekeeping" ||
    route === "decoration" ||
    route === "notary" ||
    route === "interpreting"
  )
    return content.serviceDetails[route].summary;
  if (route === "gallery") return content.gallery.intro;
  if (route === "about") return content.about.intro;
  if (route === "contact") return content.contact.intro;
  return locale === "en"
    ? `${pageLabels[route].en} for the ${businessFacts.publicName} website.`
    : `${pageLabels[route].es} del sitio web de ${businessFacts.publicName}.`;
}

export function absoluteLocalizedUrl(route: RouteKey, locale: Locale): string {
  return `${siteUrl}${localizedHref(route, locale)}`;
}

export function buildPageMetadata(locale: Locale, route: RouteKey): Metadata {
  const label = pageLabels[route][locale];
  const description = descriptionFor(locale, route);
  const canonical = absoluteLocalizedUrl(route, locale);

  return {
    title:
      route === "home"
        ? `${businessFacts.publicName} | Home & Professional Services`
        : `${label} | ${businessFacts.publicName}`,
    description,
    alternates: {
      canonical,
      languages: {
        en: absoluteLocalizedUrl(route, "en"),
        es: absoluteLocalizedUrl(route, "es"),
        "x-default": absoluteLocalizedUrl(route, "en"),
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "en" ? "en_US" : "es_US",
      siteName: businessFacts.publicName,
      title: `${label} | ${businessFacts.publicName}`,
      description,
      url: canonical,
      images: [
        {
          url: `${siteUrl}/assets/jvf/cleaning-hero.jpg`,
          width: 1600,
          height: 1000,
          alt: `${businessFacts.publicName} home services`,
        },
      ],
    },
  };
}

export const professionalServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: businessFacts.publicName,
  founder: {
    "@type": "Person",
    name: businessFacts.owner,
  },
  telephone: "+17167489117",
  email: businessFacts.email,
  areaServed: "Ohio",
  serviceType: [
    "Housekeeping",
    "Home decoration",
    "In-person notary service",
    "Spanish-English interpreting",
  ],
  url: siteUrl,
};
