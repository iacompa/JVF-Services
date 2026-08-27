import { PublicPage } from "@/features/pages/public-page";
import { buildPageMetadata } from "@/lib/metadata";
import {
  getGoogleBusinessReviews,
  getGoogleReviewLinks,
} from "@/lib/google-business-reviews.server";

export const metadata = buildPageMetadata("en", "home");
export const revalidate = 21600;

export default async function Home() {
  const googleReviews = await getGoogleBusinessReviews();

  return (
    <PublicPage
      locale="en"
      route="home"
      googleReviews={googleReviews}
      googleReviewLinks={getGoogleReviewLinks()}
    />
  );
}
