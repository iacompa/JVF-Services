import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { StructuredData } from "@/components/seo/structured-data";
import { HydrationMarker } from "@/components/layout/hydration-marker";
import { bodyFont, displayFont } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "JVF Services",
  description: "Home and professional services for customers across Ohio.",
};

export const viewport: Viewport = {
  themeColor: "#fbf8f0",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bodyFont.variable} ${displayFont.variable}`}
    >
      <body>
        <Script id="document-language" strategy="beforeInteractive">
          {
            'document.documentElement.lang=location.pathname==="/es"||location.pathname.startsWith("/es/")?"es":"en";'
          }
        </Script>
        <HydrationMarker />
        {children}
        <StructuredData />
        {process.env.NODE_ENV !== "test" ? <Analytics /> : null}
      </body>
    </html>
  );
}
