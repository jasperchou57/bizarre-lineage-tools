import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Bizarre Lineage Tools - Best Builds, Tier List & Guides",
  description: "The ultimate optimization hub for Bizarre Lineage. Find the best Stand builds, PvP tier lists, and progression guides. (Support for bizare lineage / bizzare lineage queries).",
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
