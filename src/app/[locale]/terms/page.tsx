import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { withCanonical } from "@/lib/metadata";
import { routing } from "@/i18n/routing";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Terms" });
    return withCanonical({
        title: t("metaTitle"),
        description: t("metaDescription"),
    }, "/terms");
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: "Terms" });

    return (
        <div className="container mx-auto px-4 py-16 max-w-3xl prose prose-invert">
            <h1 className="text-4xl font-heading font-extrabold text-white mb-8">{t("heroTitle")}</h1>
            {locale !== routing.defaultLocale && (
                <div className="not-prose bg-amber-500/10 border border-amber-500/20 text-amber-200 text-sm rounded-lg p-4 mb-8">
                    {t("noteTranslated")}
                </div>
            )}

            <p className="text-muted leading-relaxed mb-6">
                {t("lastUpdatedLabel")} {new Date().toISOString().split("T")[0]}
            </p>

            <p className="text-muted leading-relaxed mb-6">{t("intro")}</p>

            <h2 className="text-2xl font-bold text-white mt-10 mb-4">{t("section1Title")}</h2>
            <p className="text-muted leading-relaxed mb-6">{t("section1Body")}</p>

            <h2 className="text-2xl font-bold text-white mt-10 mb-4">{t("section2Title")}</h2>
            <p className="text-muted leading-relaxed mb-6">{t("section2Body")}</p>

            <h2 className="text-2xl font-bold text-white mt-10 mb-4">{t("section3Title")}</h2>
            <p className="text-muted leading-relaxed mb-6">{t("section3Body")}</p>
        </div>
    );
}
