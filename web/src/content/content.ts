import { en } from "./en";
import { es } from "./es";
import type { Locale, SiteContent } from "./types";

const contentByLocale: Record<Locale, SiteContent> = { en, es };

export function getContent(locale: Locale): SiteContent {
  return contentByLocale[locale];
}

export type { Locale, ServiceKey, SiteContent } from "./types";
