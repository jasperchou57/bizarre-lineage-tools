import type { Metadata } from "next";
import { ChevronRight, ArrowUpCircle } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { withCanonical } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Guides" });
    return withCanonical({
        title: t("prestige.metaTitle"),
        description: t("prestige.metaDescription"),
    }, "/guides/prestige");
}

export default async function PrestigeGuidePage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: "Guides" });
    const tCommon = await getTranslations({ locale, namespace: "Common" });
    const rich = { strong: (chunks: React.ReactNode) => <strong>{chunks}</strong> };

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl prose prose-invert">
            <div className="flex items-center gap-2 text-sm text-muted mb-8 not-prose">
                <Link href="/" className="hover:text-white transition-colors">{tCommon("breadcrumbHome")}</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/guides" className="hover:text-white transition-colors">{t("breadcrumbCurrent")}</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-white">{t("prestige.breadcrumbCurrent")}</span>
            </div>

            <div className="flex items-center gap-4 mb-8 not-prose">
                <ArrowUpCircle className="h-12 w-12 text-accent-indigo" />
                <h1 className="text-4xl font-heading font-extrabold text-white m-0">{t("prestige.heroTitle")}</h1>
            </div>

            <p className="text-xl text-muted leading-relaxed mb-10">{t("prestige.intro")}</p>

            <h2>{t("prestige.requirementsTitle")}</h2>
            <p>{t("prestige.requirementsIntro")}</p>
            <ul>
                <li>{t.rich("prestige.reqCost", rich)}</li>
                <li>{t.rich("prestige.reqNpc", rich)}</li>
                <li>{t.rich("prestige.reqLocation", rich)}</li>
            </ul>

            <h2>{t("prestige.benefitsTitle")}</h2>
            <ul>
                <li>{t.rich("prestige.benefit1", rich)}</li>
                <li>{t.rich("prestige.benefit2", rich)}</li>
                <li>{t.rich("prestige.benefit3", rich)}</li>
            </ul>

            <h2>{t("prestige.loseTitle")}</h2>
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6 my-6 not-prose">
                <ul className="space-y-2 text-yellow-100 m-0">
                    <li className="flex items-center gap-2">• {t("prestige.lose1")}</li>
                    <li className="flex items-center gap-2">• {t("prestige.lose2")}</li>
                </ul>
            </div>

            <h2>{t("prestige.keepTitle")}</h2>
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6 my-6 not-prose">
                <ul className="space-y-2 text-yellow-100 m-0">
                    <li className="flex items-center gap-2">• {t("prestige.keep1")}</li>
                    <li className="flex items-center gap-2">• {t("prestige.keep2")}</li>
                </ul>
            </div>

            <div className="mt-12 not-prose">
                <Link href="/guides/leveling" className="block w-full py-4 bg-surface border border-white/10 rounded-xl text-center hover:bg-white/5 hover:border-accent-blue transition-all group">
                    <span className="text-sm text-muted uppercase tracking-widest block mb-1">{t("prestige.nextGuideLabel")}</span>
                    <span className="text-xl font-bold text-white group-hover:text-accent-blue transition-colors flex items-center justify-center gap-2">
                        {t("prestige.nextGuideLeveling")} <ChevronRight className="h-5 w-5" />
                    </span>
                </Link>
            </div>
        </div>
    );
}
