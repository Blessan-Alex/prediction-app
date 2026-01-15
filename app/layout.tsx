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
  title: "SettleUp",
  description: "SettleUp landing page",
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
        {children}
        <ToastContainer
          position="bottom-right"
          theme="dark"
          toastClassName="!bg-[#0a0f1c]/90 !backdrop-blur-xl !border !border-white/10 !shadow-2xl !rounded-xl !text-white"
          bodyClassName="!font-sans !text-sm !font-medium"
          progressClassName="!bg-gradient-to-r !from-cyan-400 !to-blue-500"
        />
        <ToastContainer
          containerId="top-right"
          position="top-right"
          theme="dark"
          toastClassName="!bg-[#0a0f1c]/90 !backdrop-blur-xl !border !border-white/10 !shadow-2xl !rounded-xl !text-white !mt-4 !mr-4"
          bodyClassName="!font-sans !text-sm !font-medium"
          progressClassName="!bg-gradient-to-r !from-cyan-400 !to-blue-500"
        />
      </body>
    </html>
  );
}
