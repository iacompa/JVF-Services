import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { StructuredData } from "@/components/seo/structured-data";
import { HydrationMarker } from "@/components/layout/hydration-marker";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { businessFacts } from "@/content/business";
import { displayFont } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: businessFacts.publicName,
  description: "Home and professional services for customers across Ohio.",
};

export const viewport: Viewport = {
  themeColor: "#082b45",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className={displayFont.variable}>
      <body>
        <Script id="document-language" strategy="beforeInteractive">
          {
            'document.documentElement.lang=location.pathname==="/es"||location.pathname.startsWith("/es/")?"es":"en";'
          }
        </Script>
        <HydrationMarker />
        <ScrollReveal />
        {children}
        <StructuredData />
        {process.env.NODE_ENV !== "test" ? <Analytics /> : null}
      </body>
    </html>
  );
}
