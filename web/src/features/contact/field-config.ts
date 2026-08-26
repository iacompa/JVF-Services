import type { ServiceId } from "./types";

export interface FieldOption {
  value: string;
  label: { en: string; es: string };
}

export interface ServiceFieldDefinition {
  kind: "text" | "select" | "date" | "time" | "number" | "textarea";
  label: { en: string; es: string };
  required: boolean;
  options?: readonly FieldOption[];
}

const option = (value: string, en: string, es: string): FieldOption => ({
  value,
  label: { en, es },
});

export const serviceFieldConfig = {
  housekeeping: {
    spaceType: {
      kind: "select",
      label: { en: "Space type", es: "Tipo de espacio" },
      required: true,
      options: [
        option("home", "Home", "Hogar"),
        option("small-office", "Small office", "Oficina pequeña"),
      ],
    },
    cleaningType: {
      kind: "select",
      label: { en: "Cleaning type", es: "Tipo de limpieza" },
      required: true,
      options: [
        option("standard-cleaning", "Standard cleaning", "Limpieza estándar"),
        option("deep-cleaning", "Deep cleaning", "Limpieza profunda"),
        option("move-in-out", "Move-in or move-out", "Entrada o salida"),
        option("other", "Other", "Otro"),
      ],
    },
    frequency: {
      kind: "select",
      label: { en: "Frequency", es: "Frecuencia" },
      required: true,
      options: [
        option("one-time", "One time", "Una vez"),
        option("weekly", "Weekly", "Semanal"),
        option("biweekly", "Every two weeks", "Cada dos semanas"),
        option("monthly", "Monthly", "Mensual"),
      ],
    },
    desiredDate: {
      kind: "date",
      label: { en: "Desired date", es: "Fecha deseada" },
      required: true,
    },
    bedrooms: {
      kind: "number",
      label: { en: "Bedrooms", es: "Habitaciones" },
      required: false,
    },
    bathrooms: {
      kind: "number",
      label: { en: "Bathrooms", es: "Baños" },
      required: false,
    },
    officeSquareFeet: {
      kind: "number",
      label: {
        en: "Approximate square feet",
        es: "Pies cuadrados aproximados",
      },
      required: false,
    },
  },
  remodeling: {
    areas: {
      kind: "text",
      label: { en: "Rooms or project areas", es: "Habitaciones o áreas" },
      required: true,
    },
    projectGoal: {
      kind: "textarea",
      label: { en: "Project goal", es: "Objetivo del proyecto" },
      required: true,
    },
    desiredDate: {
      kind: "date",
      label: { en: "Desired start date", es: "Fecha deseada de inicio" },
      required: true,
    },
  },
  decoration: {
    areas: {
      kind: "text",
      label: { en: "Rooms or areas", es: "Habitaciones o áreas" },
      required: true,
    },
    stylingGoal: {
      kind: "textarea",
      label: { en: "Styling goal", es: "Objetivo de decoración" },
      required: true,
    },
    desiredDate: {
      kind: "date",
      label: { en: "Desired date", es: "Fecha deseada" },
      required: true,
    },
  },
  notary: {
    mode: {
      kind: "select",
      label: { en: "Appointment type", es: "Tipo de cita" },
      required: true,
      options: [option("in-person", "In person", "En persona")],
    },
    desiredDate: {
      kind: "date",
      label: { en: "Desired date", es: "Fecha deseada" },
      required: true,
    },
    desiredTime: {
      kind: "time",
      label: { en: "Desired time", es: "Hora deseada" },
      required: true,
    },
  },
  interpreting: {
    mode: {
      kind: "select",
      label: { en: "Service format", es: "Formato del servicio" },
      required: true,
      options: [
        option("phone", "Phone", "Teléfono"),
        option("zoom", "Zoom", "Zoom"),
        option("virtual", "Other virtual meeting", "Otra reunión virtual"),
        option("in-person", "In person", "En persona"),
      ],
    },
    direction: {
      kind: "select",
      label: { en: "Language direction", es: "Dirección de idioma" },
      required: true,
      options: [
        option("spanish-to-english", "Spanish to English", "Español a inglés"),
        option("english-to-spanish", "English to Spanish", "Inglés a español"),
        option("both", "Both directions", "Ambas direcciones"),
      ],
    },
    setting: {
      kind: "select",
      label: { en: "Setting", es: "Entorno" },
      required: true,
      options: [
        option("business", "Business", "Negocios"),
        option("community", "Community", "Comunitario"),
        option("medical", "Medical", "Médico"),
        option("legal", "Legal", "Legal"),
        option("other", "Other", "Otro"),
      ],
    },
    urgency: {
      kind: "select",
      label: { en: "Timing", es: "Urgencia" },
      required: true,
      options: [
        option("scheduled", "Scheduled", "Programado"),
        option("urgent", "Urgent", "Urgente"),
      ],
    },
    desiredDate: {
      kind: "date",
      label: { en: "Desired date", es: "Fecha deseada" },
      required: true,
    },
    desiredTime: {
      kind: "time",
      label: {
        en: "Desired time (Eastern Time)",
        es: "Hora deseada (hora del Este)",
      },
      required: true,
    },
    durationMinutes: {
      kind: "number",
      label: { en: "Expected minutes", es: "Minutos estimados" },
      required: true,
    },
  },
  general: {
    reason: {
      kind: "textarea",
      label: { en: "How can we help?", es: "¿Cómo podemos ayudarle?" },
      required: true,
    },
  },
} as const satisfies Record<ServiceId, Record<string, ServiceFieldDefinition>>;
