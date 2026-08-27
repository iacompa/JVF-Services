import { PublicPage } from "@/features/pages/public-page";
import { buildPageMetadata } from "@/lib/metadata";
import {
  getGoogleBusinessReviews,
  getGoogleReviewLinks,
} from "@/lib/google-business-reviews.server";
export const metadata = buildPageMetadata("es", "home");
export const revalidate = 21600;
export default async function Page() {
  const googleReviews = await getGoogleBusinessReviews();

  return (
    <PublicPage
      locale="es"
      route="home"
      googleReviews={googleReviews}
      googleReviewLinks={getGoogleReviewLinks()}
    />
  );
}
