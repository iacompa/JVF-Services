import type { QuoteRequest } from "./types";

export type DeliveryResult =
  | { ok: true; submissionId: string }
  | { ok: false; code: "UNCONFIGURED" | "DELIVERY_FAILED" };

export interface QuoteDelivery {
  deliver(request: QuoteRequest): Promise<DeliveryResult>;
}
