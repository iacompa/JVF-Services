import { PublicPage } from "@/features/pages/public-page";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata("en", "home");

export default function Home() {
  return <PublicPage locale="en" route="home" />;
}
