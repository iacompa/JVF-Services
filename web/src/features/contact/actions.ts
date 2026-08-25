"use server";

import { DemoQuoteDelivery } from "./demo-delivery";
import type { QuoteDelivery } from "./delivery";
import { parseQuoteRequest } from "./schema";

export interface QuoteFormState {
  status: "idle" | "success" | "error";
  message: string;
  submissionId?: string;
  fieldErrors?: Record<string, string>;
  values?: Record<string, string>;
}

function localizedCopy(locale: string) {
  return locale === "es"
    ? {
        invalid: "Revise los campos indicados e inténtelo de nuevo.",
        field: "Revise este campo.",
        blocked:
          "No se pudo enviar la solicitud. Espere un momento e inténtelo de nuevo.",
        success: "Recibimos su solicitud de demostración.",
        failure:
          "No pudimos entregar su solicitud. Llame o envíe un mensaje de texto para recibir ayuda.",
      }
    : {
        invalid: "Please review the highlighted fields and try again.",
        field: "This field needs attention.",
        blocked:
          "We could not submit the request. Please wait a moment and try again.",
        success: "Your demo request was received.",
        failure:
          "We could not deliver your request. Please call or text for help.",
      };
}

function recoverableValues(formData: FormData) {
  const values: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    if (typeof value === "string" && key !== "website") {
      values[key] = value;
    }
  }
  return values;
}

function configuredDelivery(): QuoteDelivery {
  if (process.env.CONTACT_DELIVERY_MODE === "demo") {
    return new DemoQuoteDelivery();
  }

  return {
    async deliver() {
      return { ok: false, code: "UNCONFIGURED" };
    },
  };
}

export async function submitQuote(
  _previousState: QuoteFormState,
  formData: FormData,
): Promise<QuoteFormState> {
  const locale = formData.get("locale") === "es" ? "es" : "en";
  const copy = localizedCopy(locale);
  const parsed = parseQuoteRequest(formData);

  if (!parsed.success) {
    const protectedFailure = parsed.error.issues.some((issue) =>
      ["startedAt", "website"].includes(String(issue.path[0])),
    );
    const fieldErrors: Record<string, string> = {};
    if (!protectedFailure) {
      for (const issue of parsed.error.issues) {
        const field = String(issue.path[0] ?? "");
        if (field && !fieldErrors[field]) fieldErrors[field] = copy.field;
      }
    }

    return {
      status: "error",
      message: protectedFailure ? copy.blocked : copy.invalid,
      fieldErrors,
      values: recoverableValues(formData),
    };
  }

  const result = await configuredDelivery().deliver(parsed.data);
  if (!result.ok) {
    return {
      status: "error",
      message: copy.failure,
      values: recoverableValues(formData),
    };
  }

  return {
    status: "success",
    message: copy.success,
    submissionId: result.submissionId,
  };
}
