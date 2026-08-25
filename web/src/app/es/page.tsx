import { PublicPage } from "@/features/pages/public-page";
import { buildPageMetadata } from "@/lib/metadata";
export const metadata = buildPageMetadata("es", "home");
export default function Page() {
  return <PublicPage locale="es" route="home" />;
}
