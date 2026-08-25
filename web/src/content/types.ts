export type Locale = "en" | "es";

export type ServiceKey =
  "housekeeping" | "decoration" | "notary" | "interpreting";

export type ReviewStatus = "approved" | "owner-review-required";

export interface ServiceCopy {
  eyebrow: string;
  title: string;
  summary: string;
  intro: string;
  features: string[];
  scheduleTitle: string;
  scheduleBody: string;
  price: string;
  note: string;
  cta: string;
}

export interface LegalPageCopy {
  title: string;
  status: string;
  introduction: string;
  sections: Array<{
    title: string;
    paragraphs: string[];
  }>;
}

export interface SiteContent {
  locale: Locale;
  reviewStatus: ReviewStatus;
  nav: {
    home: string;
    services: string;
    about: string;
    contact: string;
    homeServices: string;
    professionalServices: string;
    requestQuote: string;
    openMenu: string;
    closeMenu: string;
    language: string;
    skipToContent: string;
  };
  common: {
    call: string;
    text: string;
    learnMore: string;
    requestQuote: string;
    availableInOhio: string;
    terms: string;
    privacy: string;
    accessibility: string;
    footerSummary: string;
    rights: string;
  };
  home: {
    eyebrow: string;
    title: string;
    summary: string;
    primaryCta: string;
    secondaryCta: string;
    availabilityTitle: string;
    availabilityBody: string;
    servicesHeading: string;
    servicesIntro: string;
    whyHeading: string;
    whyItems: string[];
    closingTitle: string;
    closingBody: string;
  };
  services: {
    eyebrow: string;
    title: string;
    intro: string;
    homeGroup: string;
    professionalGroup: string;
  };
  serviceDetails: Record<ServiceKey, ServiceCopy>;
  about: {
    eyebrow: string;
    title: string;
    intro: string;
    missionTitle: string;
    missionBody: string;
    valuesHeading: string;
    values: Array<{ title: string; body: string }>;
    placeholderTitle: string;
    placeholderBody: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    intro: string;
    directTitle: string;
    directBody: string;
    formTitle: string;
    privacyNote: string;
  };
  legal: {
    lastUpdated: string;
    terms: LegalPageCopy;
    privacy: LegalPageCopy;
    accessibility: LegalPageCopy;
    officialNotaryResource: string;
  };
}
