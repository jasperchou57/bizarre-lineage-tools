import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { withCanonical } from "@/lib/metadata";
import { routing } from "@/i18n/routing";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Privacy" });
    return withCanonical({
        title: t("metaTitle"),
        description: t("metaDescription"),
    }, "/privacy");
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: "Privacy" });
    const rich = {
        strong: (chunks: React.ReactNode) => <strong>{chunks}</strong>,
    };

    return (
        <div className="container mx-auto px-4 py-16 max-w-3xl prose prose-invert">
            <h1 className="text-4xl font-heading font-extrabold text-white mb-8">{t("heroTitle")}</h1>
            {locale !== routing.defaultLocale && (
                <div className="not-prose bg-amber-500/10 border border-amber-500/20 text-amber-200 text-sm rounded-lg p-4 mb-8">
                    {t("noteTranslated")}
                </div>
            )}

            <p className="text-muted leading-relaxed mb-6">{t("lastUpdated")}</p>
            <p className="text-muted leading-relaxed mb-6">{t("intro")}</p>

            <h2 className="text-2xl font-bold text-white mt-10 mb-4">{t("section1Title")}</h2>
            <p className="text-muted leading-relaxed mb-6">{t("section1Body")}</p>
            <ul className="text-muted leading-relaxed mb-6 list-disc pl-6 space-y-2">
                <li>{t.rich("cookieEssential", rich)}</li>
                <li>{t.rich("cookieAnalytics", rich)}</li>
                <li>{t.rich("cookieAds", rich)}</li>
            </ul>
            <p className="text-muted leading-relaxed mb-6">{t("cookieControl")}</p>

            <h2 className="text-2xl font-bold text-white mt-10 mb-4">{t("section2Title")}</h2>
            <p className="text-muted leading-relaxed mb-6">{t.rich("section2Body", rich)}</p>

            <h2 className="text-2xl font-bold text-white mt-10 mb-4">{t("section3Title")}</h2>
            <p className="text-muted leading-relaxed mb-6">{t("section3Body1")}</p>
            <p className="text-muted leading-relaxed mb-6">
                {t("section3Body2")} {" "}
                <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 underline">
                    Google Ads Settings
                </a>
            </p>

            <h2 className="text-2xl font-bold text-white mt-10 mb-4">{t("section4Title")}</h2>
            <p className="text-muted leading-relaxed mb-6">{t("section4Body")}</p>
            <ul className="text-muted leading-relaxed mb-6 list-disc pl-6 space-y-2">
                <li>{t("collect1")}</li>
                <li>{t("collect2")}</li>
                <li>{t("collect3")}</li>
                <li>{t("collect4")}</li>
                <li>{t("collect5")}</li>
            </ul>
            <p className="text-muted leading-relaxed mb-6">{t("section4Closing")}</p>

            <h2 className="text-2xl font-bold text-white mt-10 mb-4">{t("section5Title")}</h2>
            <p className="text-muted leading-relaxed mb-6">{t("section5Body")}</p>
            <ul className="text-muted leading-relaxed mb-6 list-disc pl-6 space-y-2">
                <li>{t("right1")}</li>
                <li>{t("right2")}</li>
                <li>{t("right3")}</li>
                <li>{t("right4")}</li>
            </ul>
            <p className="text-muted leading-relaxed mb-6">{t("section5Closing")}</p>

            <h2 className="text-2xl font-bold text-white mt-10 mb-4">{t("section6Title")}</h2>
            <p className="text-muted leading-relaxed mb-6">{t("section6Body")}</p>

            <h2 className="text-2xl font-bold text-white mt-10 mb-4">{t("section7Title")}</h2>
            <p className="text-muted leading-relaxed mb-6">{t("section7Body")}</p>

            <h2 className="text-2xl font-bold text-white mt-10 mb-4">{t("section8Title")}</h2>
            <p className="text-muted leading-relaxed mb-6">{t("section8Body")}</p>

            <h2 className="text-2xl font-bold text-white mt-10 mb-4">{t("section9Title")}</h2>
            <p className="text-muted leading-relaxed mb-6">
                {t("section9Body")} {" "}
                <a href="mailto:redmanhao@gmail.com" className="text-purple-400 hover:text-purple-300 underline">
                    redmanhao@gmail.com
                </a>
            </p>
        </div>
    );
}
