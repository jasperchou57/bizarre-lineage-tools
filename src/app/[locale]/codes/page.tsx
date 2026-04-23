import { Metadata } from "next";
import { ChevronRight, Gift, Check, Clock, HelpCircle } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { withCanonical, SITE_URL } from "@/lib/metadata";

const ACTIVE_CODES = [
    { code: "Delay1", reward: "Free Rewards (check in-game)", source: "Official Trello" },
    { code: "Delay2", reward: "Free Rewards (check in-game)", source: "Official Trello" },
    { code: "Delay3", reward: "Free Rewards (check in-game)", source: "Official Trello" },
    { code: "Update1", reward: "3 Stand Arrows + 5,000 Cash", source: "Update 1 Release" },
    { code: "BizarreLineage1", reward: "Free Rewards (check in-game)", source: "Official Trello" },
    { code: "LikeTheGameForMore1", reward: "Free Rewards (check in-game)", source: "Official Trello" },
    { code: "FavoriteTheGame1", reward: "Free Rewards (check in-game)", source: "Official Trello" },
    { code: "Update2=2027", reward: "Free Rewards (check in-game)", source: "Official Trello" },
    { code: "250kLikes", reward: "Free Rewards (check in-game)", source: "Official Trello" },
    { code: "500kLikes", reward: "Free Rewards (check in-game)", source: "Official Trello" },
    { code: "750LikesforNextCode", reward: "Free Rewards (check in-game)", source: "Official Trello" },
];

const EXPIRED_CODES: { code: string; reward: string }[] = [
    { code: "30kLikes", reward: "1 Stat Point Essence" },
    { code: "100kLikes", reward: "1 Stat Point Essence + Rare Chest" },
    { code: "shutdownwoops", reward: "Stand Stat Essence" },
    { code: "1week", reward: "Stand Personality Essence" },
];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Codes" });
    return withCanonical({
        title: t("metaTitle", { count: ACTIVE_CODES.length }),
        description: t("metaDescription", { count: ACTIVE_CODES.length }),
    }, "/codes");
}

export default async function CodesPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: "Codes" });
    const tCommon = await getTranslations({ locale, namespace: "Common" });
    const lastVerified = "April 20, 2026";

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: tCommon("breadcrumbHome"), item: SITE_URL },
            { "@type": "ListItem", position: 2, name: t("breadcrumbCurrent"), item: `${SITE_URL}/codes` },
        ],
    };

    const faqIds = [1, 2, 3] as const;
    const faqData = faqIds.map((id) => ({
        q: t(`faq.q${id}` as `faq.q${1 | 2 | 3}`),
        a: t(`faq.a${id}` as `faq.a${1 | 2 | 3}`),
    }));

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqData.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a.replace(/<[^>]+>/g, "") },
        })),
    };

    const rich = {
        strong: (chunks: React.ReactNode) => <strong className="text-white">{chunks}</strong>,
        code: (chunks: React.ReactNode) => <code className="bg-white/5 px-2 py-0.5 rounded text-white font-mono text-sm">{chunks}</code>,
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

            <nav className="flex items-center gap-2 text-sm text-muted mb-8" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-white transition-colors">{tCommon("breadcrumbHome")}</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-white" aria-current="page">{t("breadcrumbCurrent")}</span>
            </nav>

            <div className="flex items-center gap-4 mb-4">
                <Gift className="h-12 w-12 text-accent-blue" />
                <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-white m-0">{t("heroTitle")}</h1>
            </div>

            <p className="text-sm text-muted mb-8 flex items-center gap-2">
                <Clock className="h-4 w-4" /> {t("lastVerified", { date: lastVerified })}
            </p>

            <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-400" /> {t("activeTitle", { count: ACTIVE_CODES.length })}
                </h2>
                <div className="space-y-3">
                    {ACTIVE_CODES.map((item) => (
                        <div key={item.code} className="bg-surface border border-border rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                                <code className="bg-accent-blue/10 text-accent-blue border border-accent-blue/20 px-3 py-1.5 rounded font-mono font-bold text-sm">!code {item.code}</code>
                                <span className="text-xs text-green-400 font-bold uppercase">{t("activeBadge")}</span>
                            </div>
                            <div className="text-sm text-muted">{item.reward}</div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">{t("howToRedeemTitle")}</h2>
                <div className="bg-surface border border-border rounded-xl p-6">
                    <ol className="space-y-3 text-muted">
                        {([1, 2, 3, 4] as const).map((n) => (
                            <li key={n} className="flex items-start gap-3">
                                <span className="bg-accent-blue/10 text-accent-blue rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold shrink-0">{n}</span>
                                <span>{t.rich(`step${n}` as `step${1 | 2 | 3 | 4}`, rich)}</span>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">{t("whyFailTitle")}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {([1, 2, 3, 4] as const).map((n) => (
                        <div key={n} className="bg-surface border border-border rounded-lg p-4">
                            <h3 className="text-sm font-bold text-red-400 uppercase mb-2">{t(`why${n}Title` as `why${1 | 2 | 3 | 4}Title`)}</h3>
                            <p className="text-sm text-muted">{t.rich(`why${n}Body` as `why${1 | 2 | 3 | 4}Body`, rich)}</p>
                        </div>
                    ))}
                </div>
            </section>

            {EXPIRED_CODES.length > 0 && (
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-white mb-4">{t("expiredTitle")}</h2>
                    <div className="space-y-2">
                        {EXPIRED_CODES.map((item) => (
                            <div key={item.code} className="bg-surface/50 border border-white/5 rounded-lg p-3 flex items-center justify-between opacity-60">
                                <code className="font-mono text-sm text-muted line-through">{item.code}</code>
                                <span className="text-xs text-red-400">{t("expiredBadge")}</span>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">{t("sourcesTitle")}</h2>
                <div className="bg-surface border border-border rounded-xl p-6">
                    <p className="text-muted text-sm mb-4">{t("sourcesIntro")}</p>
                    <div className="flex flex-wrap gap-3">
                        <a href="https://trello.com/b/wtzgwqIf" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white hover:border-accent-blue/50 transition-colors">{t("sourceTrello")}</a>
                        <a href="https://discord.gg/bizarrelineage" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white hover:border-accent-blue/50 transition-colors">{t("sourceDiscord")}</a>
                        <a href="https://www.roblox.com/games/14890802310/Bizarre-Lineage" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white hover:border-accent-blue/50 transition-colors">{t("sourceRoblox")}</a>
                    </div>
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-accent-blue" /> {t("faqTitle")}
                </h2>
                <div className="space-y-4">
                    {faqIds.map((id) => (
                        <details key={id} className="group bg-surface border border-border rounded-lg">
                            <summary className="cursor-pointer p-4 text-white font-medium flex items-center justify-between hover:bg-white/5 transition-colors rounded-lg">
                                {t(`faq.q${id}` as `faq.q${1 | 2 | 3}`)}
                                <ChevronRight className="h-4 w-4 text-muted group-open:rotate-90 transition-transform shrink-0 ml-2" />
                            </summary>
                            <div className="px-4 pb-4 text-muted text-sm leading-relaxed">
                                {t.rich(`faq.a${id}` as `faq.a${1 | 2 | 3}`, rich)}
                            </div>
                        </details>
                    ))}
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-white mb-4">{t("exploreTitle")}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Link href="/tier-list" className="bg-surface border border-border rounded-lg p-4 hover:border-accent-blue/50 transition-colors group">
                        <div className="font-bold text-white group-hover:text-accent-blue transition-colors">{t("exploreTierList")}</div>
                        <div className="text-xs text-muted mt-1">{t("exploreTierListSub")}</div>
                    </Link>
                    <Link href="/build-planner" className="bg-surface border border-border rounded-lg p-4 hover:border-accent-blue/50 transition-colors group">
                        <div className="font-bold text-white group-hover:text-accent-blue transition-colors">{t("exploreBuildPlanner")}</div>
                        <div className="text-xs text-muted mt-1">{t("exploreBuildPlannerSub")}</div>
                    </Link>
                    <Link href="/stands" className="bg-surface border border-border rounded-lg p-4 hover:border-accent-blue/50 transition-colors group">
                        <div className="font-bold text-white group-hover:text-accent-blue transition-colors">{t("exploreStands")}</div>
                        <div className="text-xs text-muted mt-1">{t("exploreStandsSub")}</div>
                    </Link>
                    <Link href="/guides/stand-chances" className="bg-surface border border-border rounded-lg p-4 hover:border-accent-blue/50 transition-colors group">
                        <div className="font-bold text-white group-hover:text-accent-blue transition-colors">{t("exploreStandChances")}</div>
                        <div className="text-xs text-muted mt-1">{t("exploreStandChancesSub")}</div>
                    </Link>
                </div>
            </section>
        </div>
    );
}
