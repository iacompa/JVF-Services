import { z } from "zod";
import type { QuoteRequest } from "./types";

const requiredText = (maximum = 100) =>
  z.string().trim().min(1, "This field is required.").max(maximum);

const optionalPositiveInteger = z.preprocess(
  (value) => (value === "" || value === undefined ? undefined : value),
  z.coerce.number().int().positive().optional(),
);

const baseShape = {
  locale: z.enum(["en", "es"]),
  name: requiredText(100),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number.")
    .max(30)
    .regex(/\d/, "Enter a valid phone number."),
  email: z.string().trim().toLowerCase().pipe(z.email()),
  city: requiredText(100),
  zip: z
    .string()
    .trim()
    .regex(/^\d{5}(?:-\d{4})?$/, "Enter a valid US ZIP code."),
  note: z.string().trim().max(1_000).default(""),
  privacyAcknowledged: z.preprocess(
    (value) => value === true || value === "true" || value === "on",
    z.literal(true, "Acknowledgement is required."),
  ),
  startedAt: z.coerce.number().int().positive(),
  website: z.string().trim().max(0, "Invalid submission."),
};

const date = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Choose a date.");
const time = z.string().regex(/^\d{2}:\d{2}$/, "Choose a time.");

const housekeepingSchema = z.object({
  ...baseShape,
  service: z.literal("housekeeping"),
  spaceType: z.enum(["home", "small-office"]),
  cleaningType: z.enum([
    "standard-cleaning",
    "deep-cleaning",
    "move-in-out",
    "other",
  ]),
  frequency: z.enum(["one-time", "weekly", "biweekly", "monthly"]),
  desiredDate: date,
  bedrooms: optionalPositiveInteger,
  bathrooms: optionalPositiveInteger,
  officeSquareFeet: optionalPositiveInteger,
});

const decorationSchema = z.object({
  ...baseShape,
  service: z.literal("decoration"),
  areas: requiredText(300),
  stylingGoal: requiredText(500),
  desiredDate: date,
});

const notarySchema = z.object({
  ...baseShape,
  service: z.literal("notary"),
  mode: z.literal("in-person"),
  desiredDate: date,
  desiredTime: time,
});

const interpretingSchema = z.object({
  ...baseShape,
  service: z.literal("interpreting"),
  mode: z.enum(["phone", "zoom", "virtual", "in-person"]),
  direction: z.enum(["spanish-to-english", "english-to-spanish", "both"]),
  setting: z.enum(["business", "community", "medical", "legal", "other"]),
  urgency: z.enum(["urgent", "scheduled"]),
  desiredDate: date,
  desiredTime: time,
  durationMinutes: z.coerce.number().int().positive().max(1_440),
});

const generalSchema = z.object({
  ...baseShape,
  service: z.literal("general"),
  reason: requiredText(500),
});

function minutesFromTime(value: string) {
  const [hours, minutes] = value.split(":").map(Number);
  return hours * 60 + minutes;
}

export const quoteRequestSchema = z
  .discriminatedUnion("service", [
    housekeepingSchema,
    decorationSchema,
    notarySchema,
    interpretingSchema,
    generalSchema,
  ])
  .superRefine((request, context) => {
    if (Date.now() - request.startedAt < 2_000) {
      context.addIssue({
        code: "custom",
        path: ["startedAt"],
        message: "Please wait a moment and try again.",
      });
    }

    if (request.service === "housekeeping") {
      if (request.spaceType === "home") {
        if (!request.bedrooms) {
          context.addIssue({
            code: "custom",
            path: ["bedrooms"],
            message: "Enter the number of bedrooms.",
          });
        }
        if (!request.bathrooms) {
          context.addIssue({
            code: "custom",
            path: ["bathrooms"],
            message: "Enter the number of bathrooms.",
          });
        }
      }

      if (request.spaceType === "small-office" && !request.officeSquareFeet) {
        context.addIssue({
          code: "custom",
          path: ["officeSquareFeet"],
          message: "Enter the approximate square footage.",
        });
      }
    }

    if (request.service === "interpreting" && request.mode === "in-person") {
      const minutes = minutesFromTime(request.desiredTime);
      if (minutes < 480 || minutes > 1_080) {
        context.addIssue({
          code: "custom",
          path: ["desiredTime"],
          message:
            "In-person interpreting is available from 08:00 to 18:00 ET.",
        });
      }
    }
  });

export function parseQuoteRequest(formData: FormData) {
  return quoteRequestSchema.safeParse(
    Object.fromEntries(formData.entries()),
  ) as
    | { success: true; data: QuoteRequest }
    | { success: false; error: z.ZodError<QuoteRequest> };
}
