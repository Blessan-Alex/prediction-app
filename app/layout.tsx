import type { Metadata } from "next";
import Script from "next/script";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/cn";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const geistSans = localFont({
  src: [
    {
      path: "../public/fonts/geist-sans-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/geist-sans-latin-500-normal.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/geist-sans-latin-600-normal.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/geist-sans-latin-700-normal.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-geist-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://settleupnow.vercel.app"),
  title: {
    default: "SettleUp - The Easiest Way to Settle Friendly Bets",
    template: "%s | SettleUp",
  },
  description: "Lock coins with friends for quick, trustless settlements. No complex escrow, just instant payouts for your friendly challenges.",
  openGraph: {
    title: "SettleUp - Friendly Bets, Settled Instantly",
    description: "Lock coins with friends for quick, trustless settlements. No complex escrow, just instant payouts for your friendly challenges.",
    url: "https://settleupnow.vercel.app",
    siteName: "SettleUp",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SettleUp - The Easiest Way to Settle Friendly Bets",
    description: "Lock coins with friends for quick, trustless settlements. No complex escrow, just instant payouts.",
    creator: "@settleup",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://settleupnow.vercel.app",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "SettleUp",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Lock coins with friends for quick, trustless settlements. No complex escrow, just instant payouts for your friendly challenges."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={cn(
          geistSans.variable,
          "font-sans min-h-screen relative overflow-x-hidden bg-background text-foreground"
        )}
      >
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-LKBEPGNV6V"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-LKBEPGNV6V');
          `}
        </Script>
        <Script
          id="json-ld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <ToastContainer
          position="bottom-right"
          theme="dark"
        />
        <ToastContainer
          containerId="top-right"
          position="top-right"
          theme="dark"
          className="mt-4 mr-4"
        />
      </body>
    </html>
  );
}
