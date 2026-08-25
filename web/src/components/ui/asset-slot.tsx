interface AssetSlotProps {
  label: string;
  description: string;
  variant?: "portrait" | "landscape" | "hero";
}

export function AssetSlot({
  label,
  description,
  variant = "landscape",
}: AssetSlotProps) {
  return (
    <div
      className={`asset-slot asset-slot-${variant}`}
      role="img"
      aria-label={`${label}. ${description}`}
    >
      <div className="asset-architecture" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="asset-slot-copy">
        <span>{label}</span>
        <p>{description}</p>
      </div>
    </div>
  );
}
