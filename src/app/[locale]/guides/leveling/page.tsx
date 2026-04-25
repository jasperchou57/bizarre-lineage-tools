import type { Metadata } from "next";
import { ChevronRight, TrendingUp } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { withCanonical } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Guides" });
    return withCanonical({
        title: t("leveling.metaTitle"),
        description: t("leveling.metaDescription"),
    }, "/guides/leveling");
}

export default async function LevelingGuidePage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: "Guides" });
    const tCommon = await getTranslations({ locale, namespace: "Common" });
    const rich = { strong: (chunks: React.ReactNode) => <strong>{chunks}</strong> };

    const brackets = [
        { color: "bg-slate-500", title: t("leveling.bracket1Title"), body: t("leveling.bracket1Body"), source: t("leveling.bracket1Source") },
        { color: "bg-green-500", title: t("leveling.bracket2Title"), body: t("leveling.bracket2Body"), source: t("leveling.bracket2Source") },
        { color: "bg-purple-500", title: t("leveling.bracket3Title"), body: t("leveling.bracket3Body"), source: t("leveling.bracket3Source") },
        { color: "bg-red-500", title: t("leveling.bracket4Title"), body: t("leveling.bracket4Body"), source: t("leveling.bracket4Source") },
    ];

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl prose prose-invert">
            <div className="flex items-center gap-2 text-sm text-muted mb-8 not-prose">
                <Link href="/" className="hover:text-white transition-colors">{tCommon("breadcrumbHome")}</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/guides" className="hover:text-white transition-colors">{t("breadcrumbCurrent")}</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-white">{t("leveling.breadcrumbCurrent")}</span>
            </div>

            <div className="flex items-center gap-4 mb-8 not-prose">
                <TrendingUp className="h-12 w-12 text-green-400" />
                <h1 className="text-4xl font-heading font-extrabold text-white m-0">{t("leveling.heroTitle")}</h1>
            </div>

            <p className="text-xl text-muted leading-relaxed mb-10">{t("leveling.intro")}</p>

            <div className="space-y-8 not-prose">
                {brackets.map((bracket, i) => (
                    <div key={i} className="bg-surface border border-border rounded-xl p-6 relative overflow-hidden">
                        <div className={`absolute top-0 right-0 w-2 h-full ${bracket.color}`}></div>
                        <h3 className="text-2xl font-bold text-white mb-2">{bracket.title}</h3>
                        <p className="text-muted mb-4">{bracket.body}</p>
                        <div className="bg-background rounded-lg p-4 border border-white/5">
                            <p className="text-sm font-bold text-white mb-1">{t("leveling.officialSource")}</p>
                            <p className="text-sm text-muted">{bracket.source}</p>
                        </div>
                    </div>
                ))}
            </div>

            <h2 className="mt-12">{t("leveling.proTipsTitle")}</h2>
            <ul>
                <li>{t.rich("leveling.proTip1", rich)}</li>
                <li>{t.rich("leveling.proTip2", rich)}</li>
                <li>{t.rich("leveling.proTip3", rich)}</li>
            </ul>

            <div className="mt-12 not-prose mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">{t("leveling.videoTitle")}</h2>
                <div className="bg-surface border border-border rounded-xl overflow-hidden aspect-video">
                    <iframe
                        width="100%"
                        height="100%"
                        src="https://www.youtube.com/embed/LnyDuoPfC18"
                        title="Ultimate Beginner Leveling Guide - Bizarre Lineage"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        loading="lazy"
                        className="w-full h-full"
                    />
                </div>
            </div>

            <div className="mt-8 not-prose">
                <Link href="/guides/prestige" className="block w-full py-4 bg-surface border border-white/10 rounded-xl text-center hover:bg-white/5 hover:border-accent-blue transition-all group">
                    <span className="text-sm text-muted uppercase tracking-widest block mb-1">{t("leveling.nextGuideLabel")}</span>
                    <span className="text-xl font-bold text-white group-hover:text-accent-blue transition-colors flex items-center justify-center gap-2">
                        {t("leveling.nextGuidePrestige")} <ChevronRight className="h-5 w-5" />
                    </span>
                </Link>
            </div>
        </div>
    );
}
