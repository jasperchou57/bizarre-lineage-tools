import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
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
