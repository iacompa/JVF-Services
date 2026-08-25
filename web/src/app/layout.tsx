import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { StructuredData } from "@/components/seo/structured-data";
import { bodyFont, displayFont } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "JVF Services",
  description: "Home and professional services for customers across Ohio.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bodyFont.variable} ${displayFont.variable}`}
    >
      <head>
        <script
          id="document-language"
          dangerouslySetInnerHTML={{
            __html:
              'document.documentElement.lang=location.pathname==="/es"||location.pathname.startsWith("/es/")?"es":"en";',
          }}
        />
      </head>
      <body>
        {children}
        <StructuredData />
        {process.env.NODE_ENV !== "test" ? <Analytics /> : null}
      </body>
    </html>
  );
}
