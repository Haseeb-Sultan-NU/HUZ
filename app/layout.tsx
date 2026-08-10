import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: "HUZ Agency — Web Development & AI Automation",
  description:
    "HUZ is a premium agency specializing in modern Web Development and AI Automation. We build intelligent digital products that scale.",
  keywords: [
    "web development",
    "AI automation",
    "digital agency",
    "Next.js",
    "machine learning",
    "HUZ",
  ],
  authors: [{ name: "HUZ Agency" }],
  openGraph: {
    title: "HUZ Agency — Web Development & AI Automation",
    description:
      "Premium digital agency specializing in modern Web Development and AI Automation.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "HUZ Agency — Web Development & AI Automation",
    description:
      "Premium digital agency specializing in modern Web Development and AI Automation.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-bg-primary text-text-primary`}
      >
        {children}
      </body>
    </html>
  );
}
