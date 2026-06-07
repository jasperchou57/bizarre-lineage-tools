import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import Script from "next/script";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import "../globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SITE_URL } from "@/lib/metadata";
import { routing } from "@/i18n/routing";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

const siteTitle = "Bizarre Lineage Wiki - Official Sources, Codes & Planner Tools";
const siteDescription =
    "Source-labeled Bizarre Lineage wiki and tools hub. Track official Trello codes, official Roblox/Trello data, site-maintained planner builds, and update watchlist notes.";
const siteImage = `${SITE_URL}/images/hero-bg.jpg`;

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: siteTitle,
    description: siteDescription,
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
        },
    },
    openGraph: {
        title: siteTitle,
        description: siteDescription,
        url: SITE_URL,
        siteName: "Bizarre Lineage Wiki",
        type: "website",
        images: [
            {
                url: siteImage,
                width: 1280,
                height: 720,
                alt: "Bizarre Lineage Wiki",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: siteTitle,
        description: siteDescription,
        images: [siteImage],
    },
};

const siteSchema = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "WebSite",
            "@id": `${SITE_URL}/#website`,
            name: "Bizarre Lineage Wiki",
            alternateName: ["Bizarre Lineage", "BizarreLineage", "bizarrelineage.com"],
            url: SITE_URL,
        },
        {
            "@type": "Organization",
            "@id": `${SITE_URL}/#organization`,
            name: "Bizarre Lineage Wiki",
            url: SITE_URL,
        },
    ],
};

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }
    setRequestLocale(locale);

    return (
        <html lang={locale} className={`${inter.variable} ${outfit.variable} dark`}>
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }}
                />
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
                <NextIntlClientProvider>
                    <Navbar />
                    <main className="flex-1 w-full mx-auto flex flex-col">
                        {children}
                    </main>
                    <Footer />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
