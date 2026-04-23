"use client";

import { useState, useMemo } from "react";
import { Target, Activity, ChevronRight, HelpCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { StandCard } from "@/components/StandCard";
import standsData from "@/data/stands.json";
import { Link } from "@/i18n/navigation";

function TierListInteractive() {
    const t = useTranslations("TierList");
    const [activeFilter, setActiveFilter] = useState<"overall" | "pvp" | "pve">("overall");

    const tiers = useMemo(() => {
        const grouped = standsData.reduce((acc, stand) => {
            const tier = stand.tier[activeFilter] || "Unknown";
            if (!acc[tier]) acc[tier] = [];
            acc[tier].push(stand);
            return acc;
        }, {} as Record<string, typeof standsData>);

        const order = ["S+", "S", "A", "B", "C", "D"];
        return Object.entries(grouped).sort(([a], [b]) => order.indexOf(a) - order.indexOf(b));
    }, [activeFilter]);

    return (
        <>
            <div className="text-center mb-12">
                <div className="inline-flex bg-surface border border-border rounded-xl p-1 shadow-lg">
                    <button onClick={() => setActiveFilter("overall")} className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeFilter === "overall" ? "bg-accent-blue text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]" : "text-muted hover:text-white"}`}>
                        {t("filterOverall")}
                    </button>
                    <button onClick={() => setActiveFilter("pvp")} className={`px-6 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${activeFilter === "pvp" ? "bg-accent-indigo text-white shadow-[0_0_15px_rgba(99,102,241,0.3)]" : "text-muted hover:text-white"}`}>
                        <Target className="h-4 w-4" /> {t("filterPvp")}
                    </button>
                    <button onClick={() => setActiveFilter("pve")} className={`px-6 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${activeFilter === "pve" ? "bg-green-600 text-white shadow-[0_0_15px_rgba(22,163,74,0.3)]" : "text-muted hover:text-white"}`}>
                        <Activity className="h-4 w-4" /> {t("filterPve")}
                    </button>
                </div>
            </div>

            <div className="space-y-12">
                {tiers.map(([tierName, stands]) => (
                    <div key={tierName} className="bg-surface/50 border border-border rounded-2xl overflow-hidden backdrop-blur-sm">
                        <div className="bg-white/5 border-b border-white/5 px-6 py-4 flex items-center gap-4">
                            <span className={`text-2xl font-heading font-black w-12 text-center rounded-xl py-2 ${tierName === "S+" ? "text-white bg-gradient-to-br from-purple-500 to-pink-500 shadow-[0_0_20px_rgba(168,85,247,0.4)]" :
                                tierName === "S" ? "text-white bg-gradient-to-br from-accent-blue to-accent-indigo shadow-[0_0_15px_rgba(59,130,246,0.3)]" :
                                    tierName === "A" ? "text-white bg-green-500/20 text-green-400" :
                                        "text-muted bg-white/5"}`}>
                                {tierName}
                            </span>
                            <h2 className="text-xl font-bold text-white tracking-widest uppercase">{t("tierLabel")}</h2>
                            <div className="ml-auto text-sm text-muted hidden sm:block">{t("standsCount", { count: stands.length })}</div>
                        </div>

                        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {stands.map((stand) => (
                                <StandCard key={stand.id} stand={stand} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

function TierListSEOContent() {
    const t = useTranslations("TierList");
    const tCommon = useTranslations("Common");
    const sPlus = standsData.filter((s) => s.tier.overall === "S+");
    const sStands = standsData.filter((s) => s.tier.overall === "S");

    const rich = { strong: (chunks: React.ReactNode) => <strong className="text-white">{chunks}</strong> };
    const faqIds = [1, 2, 3, 4] as const;

    return (
        <div className="mt-16 space-y-12">
            <section>
                <h2 className="text-2xl font-bold text-white mb-4">{t("howItWorksTitle")}</h2>
                <div className="bg-surface border border-border rounded-xl p-6 text-sm text-muted leading-relaxed space-y-3">
                    <p>{t("howItWorks1", { count: standsData.length })}</p>
                    <p>{t("howItWorks2")}</p>
                    <p>{t.rich("howItWorks3", rich)}</p>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-white mb-4">{t("currentMetaTitle")}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-surface border border-border rounded-lg p-5">
                        <h3 className="text-sm font-bold text-purple-400 uppercase mb-3">{t("sPlusLabel")}</h3>
                        <div className="space-y-2">
                            {sPlus.map((s) => (
                                <Link key={s.id} href={`/stands/${s.id}`} className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors group">
                                    <span className="text-white text-sm group-hover:text-accent-blue">{s.name}</span>
                                    <span className="text-xs text-muted">{t("standSecondary", { rarity: s.rarity, part: s.part })}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="bg-surface border border-border rounded-lg p-5">
                        <h3 className="text-sm font-bold text-accent-blue uppercase mb-3">{t("sLabel")}</h3>
                        <div className="space-y-2">
                            {sStands.map((s) => (
                                <Link key={s.id} href={`/stands/${s.id}`} className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors group">
                                    <span className="text-white text-sm group-hover:text-accent-blue">{s.name}</span>
                                    <span className="text-xs text-muted">{t("standSecondary", { rarity: s.rarity, part: s.part })}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-accent-blue" /> {t("faqTitle")}
                </h2>
                <div className="space-y-3">
                    {faqIds.map((id) => (
                        <details key={id} className="group bg-surface border border-border rounded-lg">
                            <summary className="cursor-pointer p-4 text-white font-medium flex items-center justify-between hover:bg-white/5 transition-colors rounded-lg">
                                {t(`faq.q${id}` as `faq.q${1 | 2 | 3 | 4}`)}
                                <ChevronRight className="h-4 w-4 text-muted group-open:rotate-90 transition-transform shrink-0 ml-2" />
                            </summary>
                            <div className="px-4 pb-4 text-muted text-sm leading-relaxed">{t(`faq.a${id}` as `faq.a${1 | 2 | 3 | 4}`)}</div>
                        </details>
                    ))}
                </div>
            </section>

            <section className="pb-8">
                <h2 className="text-2xl font-bold text-white mb-4">{t("exploreTitle")}</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <Link href="/build-planner" className="bg-surface border border-border rounded-lg p-3 text-sm text-white hover:border-accent-blue/50 transition-colors">{t("exploreBuildPlanner")}</Link>
                    <Link href="/stands" className="bg-surface border border-border rounded-lg p-3 text-sm text-white hover:border-accent-blue/50 transition-colors">{t("exploreStands")}</Link>
                    <Link href="/guides/best-builds" className="bg-surface border border-border rounded-lg p-3 text-sm text-white hover:border-accent-blue/50 transition-colors">{t("exploreBestBuilds")}</Link>
                    <Link href="/codes" className="bg-surface border border-border rounded-lg p-3 text-sm text-white hover:border-accent-blue/50 transition-colors">{t("exploreCodes")}</Link>
                </div>
            </section>
            {/* Breadcrumb helper keeps Common namespace referenced for typed safety */}
            <span className="hidden">{tCommon("breadcrumbHome")}</span>
        </div>
    );
}

export default function TierListPage() {
    const t = useTranslations("TierList");
    const tCommon = useTranslations("Common");

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [1, 2, 3, 4].map((i) => ({
            "@type": "Question",
            name: t(`faq.q${i}` as `faq.q${1 | 2 | 3 | 4}`),
            acceptedAnswer: { "@type": "Answer", text: t(`faq.a${i}` as `faq.a${1 | 2 | 3 | 4}`) },
        })),
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: tCommon("breadcrumbHome"), item: "https://www.bizarrelineage.com" },
            { "@type": "ListItem", position: 2, name: t("breadcrumbCurrent"), item: "https://www.bizarrelineage.com/tier-list" },
        ],
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-6xl">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            <nav className="flex items-center text-sm text-muted mb-8" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-white transition-colors">{tCommon("breadcrumbHome")}</Link>
                <ChevronRight className="h-4 w-4 mx-2" />
                <span className="text-white" aria-current="page">{t("breadcrumbCurrent")}</span>
            </nav>

            <div className="relative w-full rounded-xl overflow-hidden mb-8">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/tier-list-preview.webp" alt={t("heroTitle")} className="w-full h-48 object-cover opacity-40" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
                <div className="absolute bottom-4 left-6">
                    <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-white">{t("heroTitle")}</h1>
                </div>
            </div>
            <div className="text-center mb-8">
                <p className="text-lg text-muted max-w-2xl mx-auto">{t("heroIntro", { count: standsData.length })}</p>
            </div>

            <TierListInteractive />
            <TierListSEOContent />
        </div>
    );
}
