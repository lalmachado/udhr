import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const title = "Universal Declaration of Human Rights";
const description =
  "All thirty articles of the Universal Declaration of Human Rights, adopted by the United Nations General Assembly in Paris on 10 December 1948, presented as a scroll-driven reading experience.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "article", locale: "en_GB" },
  twitter: { card: "summary", title, description },
};

export const viewport: Viewport = {
  themeColor: "#141210",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        {/* Reveal animations start hidden; without JavaScript, show everything. */}
        <noscript>
          <style>{"[data-reveal]{opacity:1!important;transform:none!important}"}</style>
        </noscript>
        <a href="#main" className="skip-link">
          Skip to the Declaration
        </a>
        {children}
      </body>
    </html>
  );
}
