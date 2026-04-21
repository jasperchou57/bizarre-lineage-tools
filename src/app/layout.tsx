import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AdsterraBanner468x60 } from "@/components/ads/AdsterraBanner468x60";
import { AdsterraNativeBanner } from "@/components/ads/AdsterraNativeBanner";
import { SITE_URL } from "@/lib/metadata";

const ADS_ENABLED = process.env.NODE_ENV === "production";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Bizarre Lineage Wiki - Codes, Skins & Best Builds (April 2026)",
  description: "The ultimate Bizarre Lineage wiki and tools hub. Track 4 active codes, official Trello skin listings, Stand builds, and PvP/PvE guides synced for April 2026.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} dark`}>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-M7LZME8PZ6"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-M7LZME8PZ6');
          `}
        </Script>
      </head>
      <body className="font-sans antialiased text-white min-h-screen flex flex-col bg-background">
        <Navbar />
        {ADS_ENABLED && <AdsterraBanner468x60 />}
        <main className="flex-1 w-full mx-auto flex flex-col">
          {children}
        </main>
        {ADS_ENABLED && <AdsterraNativeBanner />}
        <Footer />
      </body>
    </html>
  );
}
