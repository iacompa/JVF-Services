import type { Metadata } from "next";
import { StructuredData } from "@/components/seo/structured-data";
import { bodyFont, displayFont } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "JVF Services",
  description: "Home and professional services for customers across Ohio.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${displayFont.variable}`}>
      <body>
        {children}
        <StructuredData />
      </body>
    </html>
  );
}
