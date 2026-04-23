import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { withCanonical } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Contact" });
    return withCanonical({
        title: t("metaTitle"),
        description: t("metaDescription"),
    }, "/contact");
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: "Contact" });

    return (
        <div className="container mx-auto px-4 py-16 max-w-3xl">
            <h1 className="text-4xl font-heading font-extrabold text-white mb-8">{t("heroTitle")}</h1>
            <p className="text-muted leading-relaxed whitespace-pre-line mb-8">{t("body")}</p>
            <div className="bg-surface border border-white/10 rounded-xl p-8">
                <a href="mailto:redmanhao@gmail.com" className="text-xl font-semibold text-accent-blue hover:text-white underline transition-colors">
                    redmanhao@gmail.com
                </a>
            </div>
        </div>
    );
}
