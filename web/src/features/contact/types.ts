import type { Locale } from "@/content/types";

export type ServiceId =
  "housekeeping" | "decoration" | "notary" | "interpreting" | "general";

export interface BaseQuoteRequest {
  service: ServiceId;
  locale: Locale;
  name: string;
  phone: string;
  email: string;
  city: string;
  zip: string;
  note: string;
  privacyAcknowledged: true;
  startedAt: number;
  website: "";
}

export interface HousekeepingRequest extends BaseQuoteRequest {
  service: "housekeeping";
  spaceType: "home" | "small-office";
  cleaningType: "standard-cleaning" | "deep-cleaning" | "move-in-out" | "other";
  frequency: "one-time" | "weekly" | "biweekly" | "monthly";
  desiredDate: string;
  bedrooms?: number;
  bathrooms?: number;
  officeSquareFeet?: number;
}

export interface DecorationRequest extends BaseQuoteRequest {
  service: "decoration";
  areas: string;
  stylingGoal: string;
  desiredDate: string;
}

export interface NotaryRequest extends BaseQuoteRequest {
  service: "notary";
  mode: "in-person";
  desiredDate: string;
  desiredTime: string;
}

export interface InterpretingRequest extends BaseQuoteRequest {
  service: "interpreting";
  mode: "phone" | "zoom" | "virtual" | "in-person";
  direction: "spanish-to-english" | "english-to-spanish" | "both";
  setting: "business" | "community" | "medical" | "legal" | "other";
  urgency: "urgent" | "scheduled";
  desiredDate: string;
  desiredTime: string;
  durationMinutes: number;
}

export interface GeneralRequest extends BaseQuoteRequest {
  service: "general";
  reason: string;
}

export type QuoteRequest =
  | HousekeepingRequest
  | DecorationRequest
  | NotaryRequest
  | InterpretingRequest
  | GeneralRequest;

export type QuoteFormValues = Record<string, string> & {
  locale: Locale;
  service: ServiceId;
};
