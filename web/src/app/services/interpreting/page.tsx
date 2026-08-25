import { PublicPage } from "@/features/pages/public-page";
import { buildPageMetadata } from "@/lib/metadata";
export const metadata = buildPageMetadata("en", "interpreting");
export default function Page() {
  return <PublicPage locale="en" route="interpreting" />;
}
