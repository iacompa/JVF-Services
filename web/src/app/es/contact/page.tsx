import { PublicPage } from "@/features/pages/public-page";
import { getRequestedService } from "@/features/contact/service-param";
import { buildPageMetadata } from "@/lib/metadata";
export const metadata = buildPageMetadata("es", "contact");
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ service?: string | string[] }>;
}) {
  const { service } = await searchParams;
  return (
    <PublicPage
      locale="es"
      route="contact"
      initialService={getRequestedService(service)}
    />
  );
}
