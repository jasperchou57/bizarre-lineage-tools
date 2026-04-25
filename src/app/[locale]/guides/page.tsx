import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ChevronRight, BookOpen, BarChart3, Dice6, Wrench, TrendingUp, ArrowUpCircle, Zap, Moon } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { withCanonical } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Guides" });
    return withCanonical({
        title: t("metaTitle"),
        description: t("metaDescription"),
    }, "/guides");
}

export default async function GuidesIndexPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: "Guides" });
    const tCommon = await getTranslations({ locale, namespace: "Common" });

    const guides = [
        { titleKey: "cardStatsTitle", descKey: "cardStatsDesc", href: "/guides/stats", icon: <BarChart3 className="h-8 w-8 text-accent-blue" />, tag: "newTag", tagColor: "bg-green-500/20 text-green-400" },
        { titleKey: "cardStandChancesTitle", descKey: "cardStandChancesDesc", href: "/guides/stand-chances", icon: <Dice6 className="h-8 w-8 text-accent-indigo" />, tag: "newTag", tagColor: "bg-green-500/20 text-green-400" },
        { titleKey: "cardBestBuildsTitle", descKey: "cardBestBuildsDesc", href: "/guides/best-builds", icon: <Wrench className="h-8 w-8 text-purple-400" />, tag: "newTag", tagColor: "bg-green-500/20 text-green-400" },
        { titleKey: "cardAwakeningTitle", descKey: "cardAwakeningDesc", href: "/guides/awakening", icon: <Zap className="h-8 w-8 text-yellow-400" />, tag: "newTag", tagColor: "bg-green-500/20 text-green-400" },
        { titleKey: "cardNightVampireTitle", descKey: "cardNightVampireDesc", href: "/guides/night-vampire", icon: <Moon className="h-8 w-8 text-purple-400" />, tag: "newTag", tagColor: "bg-green-500/20 text-green-400" },
        { titleKey: "cardLevelingTitle", descKey: "cardLevelingDesc", href: "/guides/leveling", icon: <TrendingUp className="h-8 w-8 text-green-400" />, tag: null, tagColor: "" },
        { titleKey: "cardPrestigeTitle", descKey: "cardPrestigeDesc", href: "/guides/prestige", icon: <ArrowUpCircle className="h-8 w-8 text-yellow-400" />, tag: null, tagColor: "" },
    ] as const;

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="flex items-center gap-2 text-sm text-muted mb-8">
                <Link href="/" className="hover:text-white transition-colors">{tCommon("breadcrumbHome")}</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-white">{t("breadcrumbCurrent")}</span>
            </div>

            <div className="flex items-center gap-4 mb-8">
                <BookOpen className="h-12 w-12 text-accent-blue" />
                <h1 className="text-4xl font-heading font-extrabold text-white m-0">{t("heroTitle")}</h1>
            </div>

            <p className="text-xl text-muted leading-relaxed mb-10">{t("heroIntro")}</p>

            <div className="space-y-4">
                {guides.map((guide) => (
                    <Link
                        key={guide.href}
                        href={guide.href}
                        className="flex items-center gap-6 bg-surface border border-border rounded-xl p-6 hover:border-accent-blue/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] transition-all group"
                    >
                        <div className="shrink-0">{guide.icon}</div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <h2 className="text-lg font-bold text-white group-hover:text-accent-blue transition-colors">
                                    {t(guide.titleKey as "cardStatsTitle" | "cardStandChancesTitle" | "cardBestBuildsTitle" | "cardAwakeningTitle" | "cardNightVampireTitle" | "cardLevelingTitle" | "cardPrestigeTitle")}
                                </h2>
                                {guide.tag && (
                                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${guide.tagColor}`}>
                                        {t(guide.tag as "newTag")}
                                    </span>
                                )}
                            </div>
                            <p className="text-sm text-muted">
                                {t(guide.descKey as "cardStatsDesc" | "cardStandChancesDesc" | "cardBestBuildsDesc" | "cardAwakeningDesc" | "cardNightVampireDesc" | "cardLevelingDesc" | "cardPrestigeDesc")}
                            </p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted group-hover:text-accent-blue shrink-0 transition-colors" />
                    </Link>
                ))}
            </div>
        </div>
    );
}
