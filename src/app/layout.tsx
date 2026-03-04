import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Bizarre Lineage Wiki - Tier List, Codes & Best Builds (2026)",
  description: "The ultimate Bizarre Lineage wiki & tools hub. Tier list, active codes, Stand builds, PvP guides. Updated for the latest meta. (Also: bizare lineage, bizzare lineage).",
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
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8065762505747684"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className="font-sans antialiased text-white min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 w-full mx-auto flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
