import { getContent } from "@/content/content";
import type { Locale } from "@/content/types";

export function ServiceLedger({ locale }: { locale: Locale }) {
  const content = getContent(locale);
  const serviceNames = [
    content.serviceDetails.housekeeping.title,
    content.serviceDetails.decoration.title,
    content.serviceDetails.notary.title,
    content.serviceDetails.interpreting.title,
  ];

  return (
    <div className="service-ledger" aria-hidden="true">
      <div className="ledger-meta">
        <span>
          {locale === "en" ? "Service portfolio" : "Portafolio de servicios"}
        </span>
        <span>Ohio · 01</span>
      </div>
      <div className="ledger-feature">
        <p>JVF</p>
        <div className="ledger-availability">
          <strong>24/7</strong>
          <span>
            {locale === "en"
              ? "Virtual interpretation"
              : "Interpretación virtual"}
          </span>
        </div>
        <span className="ledger-spark" aria-hidden="true">
          ✦
        </span>
      </div>
      <ol className="ledger-services">
        {serviceNames.map((service, index) => (
          <li key={service}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            {service}
          </li>
        ))}
      </ol>
      <div className="ledger-footer">
        <span>
          {locale === "en" ? "Personally reviewed" : "Revisión personal"}
        </span>
        <span>{locale === "en" ? "Clear next steps" : "Pasos claros"}</span>
      </div>
    </div>
  );
}
