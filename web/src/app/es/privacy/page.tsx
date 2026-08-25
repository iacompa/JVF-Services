import { PublicPage } from "@/features/pages/public-page";
import { buildPageMetadata } from "@/lib/metadata";
export const metadata = buildPageMetadata("es", "privacy");
export default function Page() {
  return <PublicPage locale="es" route="privacy" />;
}
