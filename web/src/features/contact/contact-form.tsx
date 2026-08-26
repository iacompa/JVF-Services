"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { businessFacts } from "@/content/business";
import type { Locale } from "@/content/types";
import { submitQuote, type QuoteFormState } from "./actions";
import {
  serviceFieldConfig,
  type ServiceFieldDefinition,
} from "./field-config";
import type { ServiceId } from "./types";

type FormAction = (
  previousState: QuoteFormState,
  formData: FormData,
) => Promise<QuoteFormState>;

const services: Array<{
  value: ServiceId;
  label: { en: string; es: string };
}> = [
  {
    value: "housekeeping",
    label: { en: "Housekeeping & cleaning", es: "Limpieza del hogar" },
  },
  {
    value: "remodeling",
    label: { en: "Home remodeling", es: "Remodelación del hogar" },
  },
  {
    value: "decoration",
    label: { en: "Home decoration", es: "Decoración del hogar" },
  },
  {
    value: "notary",
    label: { en: "Notary service", es: "Servicio de notaría" },
  },
  {
    value: "interpreting",
    label: {
      en: "Spanish–English interpreting",
      es: "Interpretación español–inglés",
    },
  },
  {
    value: "general",
    label: { en: "General question", es: "Pregunta general" },
  },
];

function startingValues(
  locale: Locale,
  service: ServiceId,
): Record<string, string> {
  return {
    locale,
    service,
    name: "",
    phone: "",
    email: "",
    city: "",
    zip: "",
    note: "",
    privacyAcknowledged: "",
    startedAt: String(Date.now()),
    website: "",
    ...(service === "housekeeping" ? { spaceType: "home" } : {}),
    ...(service === "notary" ? { mode: "in-person" } : {}),
  };
}

const initialState: QuoteFormState = { status: "idle", message: "" };

const commonLabels = {
  en: {
    form: "Request service",
    service: "Service needed",
    name: "Full name",
    phone: "Phone number",
    email: "Email address",
    city: "City in Ohio",
    zip: "ZIP code",
    note: "Additional non-sensitive note (optional)",
    privacy:
      "I understand that I should not include documents, identification numbers, medical records, or confidential legal details.",
    submit: "Send demo request",
    pending: "Sending…",
    choose: "Choose an option",
    errors: "Please correct the following:",
    call: "Call (716) 748-9117",
    text: "Text (716) 748-9117",
    virtual:
      "Phone and virtual interpreting are available 24/7. In-person interpretation is available 8:00 a.m.–6:00 p.m. Eastern Time.",
    notary:
      "Notary appointments are in person only. Bring acceptable identification; $5 per notarial act plus any agreed travel fee.",
  },
  es: {
    form: "Solicitar servicio",
    service: "Servicio solicitado",
    name: "Nombre completo",
    phone: "Número de teléfono",
    email: "Correo electrónico",
    city: "Ciudad en Ohio",
    zip: "Código postal",
    note: "Nota adicional no confidencial (opcional)",
    privacy:
      "Entiendo que no debo incluir documentos, números de identificación, expedientes médicos ni detalles legales confidenciales.",
    submit: "Enviar solicitud de demostración",
    pending: "Enviando…",
    choose: "Elija una opción",
    errors: "Corrija lo siguiente:",
    call: "Llamar al (716) 748-9117",
    text: "Enviar mensaje al (716) 748-9117",
    virtual:
      "La interpretación por teléfono y virtual está disponible 24/7. La interpretación en persona está disponible de 8:00 a. m. a 6:00 p. m., hora del Este.",
    notary:
      "Las citas de notaría son solo en persona. Traiga identificación aceptable; $5 por acto notarial más cualquier tarifa de viaje acordada.",
  },
} as const;

function labelForField(field: string, locale: Locale, service: ServiceId) {
  const common = commonLabels[locale] as Record<string, string>;
  if (common[field]) return common[field];
  const config = serviceFieldConfig[service] as Record<
    string,
    ServiceFieldDefinition
  >;
  return config[field]?.label[locale] ?? field;
}

export function ContactForm({
  locale,
  initialService = "general",
  action = submitQuote,
}: {
  locale: Locale;
  initialService?: ServiceId;
  action?: FormAction;
}) {
  const copy = commonLabels[locale];
  const [values, setValues] = useState(() =>
    startingValues(locale, initialService),
  );
  const [dirty, setDirty] = useState(false);
  const [state, formAction, pending] = useActionState(action, initialState);
  const errorSummaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.status === "error") {
      if (state.values) {
        // React resets native form controls after an action; restore the validated response values afterward.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setValues((current) => ({ ...current, ...state.values }));
      }
      errorSummaryRef.current?.focus();
    }
    if (state.status === "success") {
      setDirty(false);
      setValues((current) =>
        startingValues(locale, current.service as ServiceId),
      );
    }
  }, [locale, state]);

  useEffect(() => {
    if (!dirty) return;
    const warnBeforeLeaving = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };
    window.addEventListener("beforeunload", warnBeforeLeaving);
    return () => window.removeEventListener("beforeunload", warnBeforeLeaving);
  }, [dirty]);

  function displayedValue(name: string) {
    return values[name] ?? "";
  }

  function updateValue(name: string, value: string) {
    setDirty(true);
    setValues((current) => ({ ...current, [name]: value }));
  }

  function changeService(service: ServiceId) {
    setDirty(true);
    setValues((current) => ({
      ...current,
      service,
      ...(service === "housekeeping" && !current.spaceType
        ? { spaceType: "home" }
        : {}),
      ...(service === "notary" ? { mode: "in-person" } : {}),
    }));
  }

  const selectedService = values.service as ServiceId;
  const configuredFields = Object.entries(
    serviceFieldConfig[selectedService],
  ) as Array<[string, ServiceFieldDefinition]>;
  const fieldErrors = state.fieldErrors ?? {};

  return (
    <form
      action={formAction}
      aria-labelledby="quote-form-title"
      className="quote-form"
      noValidate
    >
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="startedAt" value={values.startedAt} />
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          value={displayedValue("website")}
          onChange={(event) => updateValue("website", event.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <h2 id="quote-form-title">{copy.form}</h2>
      <p className="required-note">
        {locale === "en"
          ? "All fields are required unless marked optional."
          : "Todos los campos son obligatorios salvo que se indiquen como opcionales."}
      </p>

      {state.status === "error" ? (
        <div
          className="error-summary"
          role="alert"
          ref={errorSummaryRef}
          tabIndex={-1}
        >
          <h3>{state.message}</h3>
          {Object.keys(fieldErrors).length ? (
            <>
              <p>{copy.errors}</p>
              <ul>
                {Object.keys(fieldErrors).map((field) => (
                  <li key={field}>
                    <a href={`#${field}`}>
                      {labelForField(field, locale, selectedService)}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
          <div className="form-fallback-actions">
            <a href={businessFacts.phoneHref}>{copy.call}</a>
            <a href={businessFacts.smsHref}>{copy.text}</a>
          </div>
        </div>
      ) : null}

      <div className="form-grid">
        <div className="field-group field-span-two">
          <label htmlFor="service">{copy.service}</label>
          <select
            id="service"
            name="service"
            required
            autoComplete="off"
            value={selectedService}
            onChange={(event) => changeService(event.target.value as ServiceId)}
          >
            {services.map((service) => (
              <option key={service.value} value={service.value}>
                {service.label[locale]}
              </option>
            ))}
          </select>
        </div>

        {[
          ["name", copy.name, "text", "name"],
          ["phone", copy.phone, "tel", "tel"],
          ["email", copy.email, "email", "email"],
          ["city", copy.city, "text", "address-level2"],
          ["zip", copy.zip, "text", "postal-code"],
        ].map(([name, label, type, autoComplete]) => (
          <div className="field-group" key={name}>
            <label htmlFor={name}>{label}</label>
            <input
              id={name}
              name={name}
              type={type}
              autoComplete={autoComplete}
              inputMode={
                name === "phone"
                  ? "tel"
                  : name === "email"
                    ? "email"
                    : name === "zip"
                      ? "numeric"
                      : undefined
              }
              spellCheck={name === "email" ? false : undefined}
              required
              value={displayedValue(name)}
              onChange={(event) => updateValue(name, event.target.value)}
              aria-invalid={Boolean(fieldErrors[name])}
              aria-describedby={fieldErrors[name] ? `${name}-error` : undefined}
            />
            {fieldErrors[name] ? (
              <span className="field-error" id={`${name}-error`}>
                {fieldErrors[name]}
              </span>
            ) : null}
          </div>
        ))}

        {configuredFields.map(([name, definition]) => {
          if (
            selectedService === "housekeeping" &&
            ["bedrooms", "bathrooms"].includes(name) &&
            values.spaceType !== "home"
          ) {
            return null;
          }
          if (
            selectedService === "housekeeping" &&
            name === "officeSquareFeet" &&
            values.spaceType !== "small-office"
          ) {
            return null;
          }

          const conditionallyRequired =
            definition.required ||
            (selectedService === "housekeeping" &&
              ["bedrooms", "bathrooms", "officeSquareFeet"].includes(name));
          const shared = {
            id: name,
            name,
            required: conditionallyRequired,
            autoComplete: "off",
            value: displayedValue(name),
            onChange: (
              event: React.ChangeEvent<
                HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
              >,
            ) => updateValue(name, event.target.value),
            "aria-invalid": Boolean(fieldErrors[name]),
            "aria-describedby": fieldErrors[name] ? `${name}-error` : undefined,
          };

          return (
            <div
              className={`field-group ${definition.kind === "textarea" ? "field-span-two" : ""}`}
              key={name}
            >
              <label htmlFor={name}>{definition.label[locale]}</label>
              {definition.kind === "select" ? (
                <select {...shared}>
                  {name !== "mode" || selectedService !== "notary" ? (
                    <option value="">{copy.choose}</option>
                  ) : null}
                  {definition.options?.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label[locale]}
                    </option>
                  ))}
                </select>
              ) : definition.kind === "textarea" ? (
                <textarea {...shared} rows={4} />
              ) : (
                <input
                  {...shared}
                  type={definition.kind}
                  min={definition.kind === "number" ? 1 : undefined}
                />
              )}
              {fieldErrors[name] ? (
                <span className="field-error" id={`${name}-error`}>
                  {fieldErrors[name]}
                </span>
              ) : null}
            </div>
          );
        })}

        {selectedService === "interpreting" ? (
          <p className="service-form-note field-span-two">{copy.virtual}</p>
        ) : null}
        {selectedService === "notary" ? (
          <p className="service-form-note field-span-two">{copy.notary}</p>
        ) : null}

        <div className="field-group field-span-two">
          <label htmlFor="note">{copy.note}</label>
          <textarea
            id="note"
            name="note"
            rows={4}
            maxLength={1_000}
            autoComplete="off"
            value={displayedValue("note")}
            onChange={(event) => updateValue("note", event.target.value)}
            aria-invalid={Boolean(fieldErrors.note)}
            aria-describedby={fieldErrors.note ? "note-error" : undefined}
          />
          {fieldErrors.note ? (
            <span className="field-error" id="note-error">
              {fieldErrors.note}
            </span>
          ) : null}
        </div>

        <div className="checkbox-group field-span-two">
          <input
            id="privacyAcknowledged"
            name="privacyAcknowledged"
            type="checkbox"
            value="on"
            required
            checked={Boolean(values.privacyAcknowledged)}
            onChange={(event) =>
              updateValue(
                "privacyAcknowledged",
                event.target.checked ? "on" : "",
              )
            }
            aria-invalid={Boolean(fieldErrors.privacyAcknowledged)}
            aria-describedby={
              fieldErrors.privacyAcknowledged
                ? "privacyAcknowledged-error"
                : undefined
            }
          />
          <label htmlFor="privacyAcknowledged">{copy.privacy}</label>
          {fieldErrors.privacyAcknowledged ? (
            <span className="field-error" id="privacyAcknowledged-error">
              {fieldErrors.privacyAcknowledged}
            </span>
          ) : null}
        </div>
      </div>

      <button
        className="button button-primary submit-button"
        disabled={pending}
      >
        {pending ? copy.pending : copy.submit}
      </button>

      <div className="form-status" role="status" aria-live="polite">
        {state.status === "success" ? state.message : ""}
      </div>
    </form>
  );
}
