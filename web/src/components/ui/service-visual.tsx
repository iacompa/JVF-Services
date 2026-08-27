import Image from "next/image";
import type { Locale, ServiceKey } from "@/content/types";
import { AssetSlot } from "./asset-slot";

const serviceImages: Partial<
  Record<
    ServiceKey,
    { src: string; width: number; height: number; fit?: "contain" | "cover" }
  >
> = {
  housekeeping: {
    src: "/assets/jvf/cleaning-hero.jpg",
    width: 1600,
    height: 1000,
  },
  decoration: {
    src: "/assets/jvf/decoration-chair.png",
    width: 626,
    height: 416,
    fit: "contain",
  },
};

export function ServiceVisual({
  locale,
  service,
  label,
  description,
}: {
  locale: Locale;
  service: ServiceKey;
  label: string;
  description: string;
}) {
  const image = serviceImages[service];

  if (!image) {
    return (
      <AssetSlot
        variant="landscape"
        placeholderText={
          locale === "en" ? "JVF service mark" : "Marca de servicio JVF"
        }
        notRealWorkText={
          locale === "en"
            ? "This is original abstract artwork."
            : "Esta es una ilustración abstracta original."
        }
        label={label}
        description={description}
      />
    );
  }

  const alt =
    service === "housekeeping"
      ? locale === "en"
        ? "Two cleaners wiping surfaces in a bright room"
        : "Dos personas limpiando superficies en una habitación iluminada"
      : locale === "en"
        ? "Styled reading chair with a blanket, books, plant, and side table"
        : "Sillón decorado con manta, libros, planta y mesa auxiliar";

  return (
    <figure
      className={`service-photo${image.fit === "contain" ? " service-photo-contain" : ""}`}
    >
      <Image
        src={image.src}
        alt={alt}
        width={image.width}
        height={image.height}
        sizes="(max-width: 900px) 100vw, 50vw"
      />
    </figure>
  );
}
