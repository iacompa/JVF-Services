import { professionalServiceJsonLd } from "@/lib/metadata";

export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(professionalServiceJsonLd).replace(
          /</g,
          "\\u003c",
        ),
      }}
    />
  );
}
