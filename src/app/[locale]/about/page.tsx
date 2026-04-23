import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { withCanonical } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "About" });
    return withCanonical({
        title: t("metaTitle"),
        description: t("metaDescription"),
    }, "/about");
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: "About" });

    return (
        <div className="container mx-auto px-4 py-16 max-w-3xl">
            <h1 className="text-4xl font-heading font-extrabold text-white mb-8">{t("heroTitle")}</h1>
            <p className="text-muted leading-relaxed whitespace-pre-line">{t("body")}</p>
        </div>
    );
}
