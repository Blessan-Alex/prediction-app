import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/cn";

const geistSans = localFont({
  src: [
    { path: "../public/fonts/geist-sans-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/geist-sans-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/geist-sans-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../public/fonts/geist-sans-latin-700-normal.woff2", weight: "700", style: "normal" },
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
        {children}
      </body>
    </html>
  );
}
