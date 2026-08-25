import { PublicPage } from "@/features/pages/public-page";
import { buildPageMetadata } from "@/lib/metadata";
export const metadata = buildPageMetadata("en", "about");
export default function Page() {
  return <PublicPage locale="en" route="about" />;
}
