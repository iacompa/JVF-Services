interface AssetSlotProps {
  label: string;
  description: string;
  variant?: "logo" | "portrait" | "landscape" | "hero";
  placeholderText?: string;
  notRealWorkText?: string;
}

const aspectRatio = {
  logo: "10 / 3",
  hero: "4 / 3",
  landscape: "4 / 3",
  portrait: "4 / 5",
} as const;

export function AssetSlot({
  label,
  description,
  variant = "landscape",
  placeholderText = "Placeholder",
  notRealWorkText = "This is not a photograph of completed JVF work.",
}: AssetSlotProps) {
  return (
    <div
      className={`asset-slot asset-slot-${variant}`}
      role="img"
      aria-label={`${placeholderText}: ${label}. ${description} ${notRealWorkText}`}
      data-aspect-ratio={aspectRatio[variant]}
    >
      <div className="asset-architecture" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="asset-slot-copy">
        <span>
          {placeholderText} — {label}
        </span>
        <p>{description}</p>
      </div>
    </div>
  );
}
