import { PublicPage } from "@/features/pages/public-page";
import { buildPageMetadata } from "@/lib/metadata";
export const metadata = buildPageMetadata("es", "notary");
export default function Page() {
  return <PublicPage locale="es" route="notary" />;
}
