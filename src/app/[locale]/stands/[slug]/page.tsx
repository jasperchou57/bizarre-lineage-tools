import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Target, Shield, Sword, Navigation, Activity, ChevronRight, ArrowRight, Zap, HelpCircle } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import standsData from "@/data/stands.json";
import skinsData from "@/data/skins.json";
import { getStandImagePath, STAND_VIDEOS } from "@/data/stand-media";
import { getStandTranslation } from "@/data/locale-data";
import { withCanonical, SITE_URL } from "@/lib/metadata";

// Evolution chains: source of truth for stand progression
const EVOLUTION_CHAINS: Record<string, string[]> = {
    'whitesnake': ['whitesnake', 'c-moon', 'made-in-heaven'],
    'c-moon': ['whitesnake', 'c-moon', 'made-in-heaven'],
    'made-in-heaven': ['whitesnake', 'c-moon', 'made-in-heaven'],
    'the-world': ['the-world', 'the-world-high-voltage'],
    'the-world-high-voltage': ['the-world', 'the-world-high-voltage'],
};

function getEvolutionChain(standId: string) {
    const chain = EVOLUTION_CHAINS[standId];
    if (!chain) return null;
    return chain.map(id => standsData.find(s => s.id === id)).filter(Boolean);
}

function getRelatedStands(stand: typeof standsData[0]) {
    const relatedIds = new Set([
        ...stand.counters,
        ...stand.counteredBy,
        ...stand.recommendedStyles.flatMap(style =>
            standsData.filter(s => s.id !== stand.id && s.recommendedStyles.includes(style)).map(s => s.id)
        ),
    ]);
    // Remove self and evolution chain members
    const chainIds = new Set(EVOLUTION_CHAINS[stand.id] || []);
    return Array.from(relatedIds)
        .filter(id => id !== stand.id && !chainIds.has(id))
        .slice(0, 6)
        .map(id => standsData.find(s => s.id === id))
        .filter(Boolean);
}

// Generate static routes for all stands
export async function generateStaticParams() {
    return standsData.map((stand) => ({
        slug: stand.id,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
    const { locale, slug } = await params;
    const stand = standsData.find((s) => s.id === slug);
    if (!stand) return {};
    const t = await getTranslations({ locale, namespace: "Stands" });
    return withCanonical({
        title: t("detailMetaTitle", { name: stand.name }),
        description: t("detailMetaDescription", { name: stand.name }),
    }, `/stands/${stand.id}`);
}

export default async function StandPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
    const { locale, slug } = await params;
    setRequestLocale(locale);
    const stand = standsData.find((s) => s.id === slug);

    if (!stand) {
        notFound();
    }

    const t = await getTranslations({ locale, namespace: "Stands" });
    const tCommon = await getTranslations({ locale, namespace: "Common" });

    const stTrans = getStandTranslation(locale, stand.id);
    const meta = stTrans?.meta ?? stand.meta;
    const obtainMethod = stTrans?.obtainMethod ?? stand.obtainMethod;
    const strengths = stTrans?.strengths ?? stand.strengths;
    const weaknesses = stTrans?.weaknesses ?? stand.weaknesses;
    const localizedMoves = stand.moves.map((m) => ({
        ...m,
        effect: stTrans?.moveEffects?.[m.name] ?? (m as { effect?: string }).effect,
    }));

    const evolutionChain = getEvolutionChain(stand.id);
    const relatedStands = getRelatedStands(stand);

    // Build translated FAQ with templated answers
    const faqs: { question: string; answer: string }[] = [
        {
            question: t("faqQ1", { name: stand.name }),
            answer: t("faqA1", { name: stand.name, tierOverall: stand.tier.overall, tierPvp: stand.tier.pvp, tierPve: stand.tier.pve, meta }),
        },
        {
            question: t("faqQ2", { name: stand.name }),
            answer: stand.rarity === "Special"
                ? t("faqA2Special", { name: stand.name, obtainMethod })
                : t("faqA2Normal", { name: stand.name, obtainMethod }),
        },
        {
            question: t("faqQ3", { name: stand.name }),
            answer: t("faqA3", { name: stand.name, style: stand.recommendedStyles[0], sub: stand.recommendedSubs[0] }),
        },
        {
            question: t("faqQ4", { name: stand.name }),
            answer: stand.counters.length > 0
                ? (stand.counteredBy.length > 0
                    ? t("faqA4WithCountersAndStruggle", {
                        name: stand.name,
                        counters: stand.counters.map(id => standsData.find(s => s.id === id)?.name).filter(Boolean).join(" / "),
                        counteredBy: stand.counteredBy.map(id => standsData.find(s => s.id === id)?.name).filter(Boolean).join(" / "),
                    })
                    : t("faqA4WithCountersOnly", {
                        name: stand.name,
                        counters: stand.counters.map(id => standsData.find(s => s.id === id)?.name).filter(Boolean).join(" / "),
                    }))
                : t("faqA4None", { name: stand.name, strength: (strengths[0] || "").toLowerCase() }),
        },
    ];

    const evChain = getEvolutionChain(stand.id);
    if (evChain && evChain.length > 1) {
        const chainNames = evChain.map(s => s!.name).join(" → ");
        const isFirst = stand.obtainMethod.startsWith("Evolve");
        faqs.push({
            question: t("faqQ5", { name: stand.name }),
            answer: isFirst
                ? t("faqA5First", { name: stand.name, chain: chainNames })
                : t("faqA5Last", { name: stand.name, chain: chainNames }),
        });
    }

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: tCommon("breadcrumbHome"), item: SITE_URL },
            { "@type": "ListItem", position: 2, name: t("breadcrumbCurrent"), item: `${SITE_URL}/stands` },
            { "@type": "ListItem", position: 3, name: stand.name, item: `${SITE_URL}/stands/${stand.id}` },
        ],
    };

    // JSON-LD: FAQPage
    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(faq => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            {/* JSON-LD Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            <nav className="flex items-center text-sm text-muted mb-8" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-white transition-colors">{tCommon("breadcrumbHome")}</Link>
                <ChevronRight className="h-4 w-4 mx-2" />
                <Link href="/stands" className="hover:text-white transition-colors">{t("breadcrumbCurrent")}</Link>
                <ChevronRight className="h-4 w-4 mx-2" />
                <span className="text-white" aria-current="page">{stand.name}</span>
            </nav>

            {/* Hero Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-white/5 pb-8">
                <div className="hidden md:block shrink-0">
                    <Image
                        src={getStandImagePath(stand.id)}
                        alt={stand.name}
                        width={140}
                        height={140}
                        className="rounded-xl border border-border bg-surface object-contain"
                        priority
                    />
                </div>
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                        <span className="px-3 py-1 text-xs font-mono font-bold uppercase rounded-full bg-accent-blue/10 text-accent-blue border border-accent-blue/20">
                            {t("detailRarity", { rarity: stand.rarity })}
                        </span>
                        <span className="px-3 py-1 text-xs font-mono font-bold uppercase rounded-full bg-surface border border-white/10 text-muted">
                            {t("detailPart", { part: stand.part })}
                        </span>
                        {stand.requiem && (
                            <span className="px-3 py-1 text-xs font-mono font-bold uppercase rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                                {t("detailRequiem")}
                            </span>
                        )}
                    </div>
                    <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-white tracking-tight">
                        {stand.name} {t("detailHeroSuffix")}
                    </h1>
                </div>
                <Link
                    href={`/build-planner?stand=${stand.id}`}
                    className="shrink-0 px-6 py-3 text-sm font-bold text-white bg-gradient-to-r from-accent-blue to-accent-indigo rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all flex items-center justify-center gap-2"
                >
                    {t("detailOpenPlanner")} <ChevronRight className="h-4 w-4" />
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content (Left 2/3) */}
                <div className="lg:col-span-2 space-y-10">

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                            {t("detailOverviewTitle")}
                        </h2>
                        <p className="text-muted leading-relaxed">
                            {t.rich("overviewParagraph", {
                                name: stand.name,
                                rarity: stand.rarity,
                                obtainMethod,
                                tier: stand.tier.overall,
                                strong: (chunks) => <strong className="text-white">{chunks}</strong>,
                            })}
                        </p>
                    </section>

                    {/* YouTube Showcase Video */}
                    {STAND_VIDEOS[stand.id] && (
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">{t("detailShowcaseTitle", { name: stand.name })}</h2>
                            <div className="bg-surface border border-border rounded-xl overflow-hidden aspect-video">
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={`https://www.youtube.com/embed/${STAND_VIDEOS[stand.id]}`}
                                    title={`${stand.name} Showcase - Bizarre Lineage`}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                    loading="lazy"
                                    className="w-full h-full"
                                />
                            </div>
                        </section>
                    )}

                    {/* Evolution Chain */}
                    {evolutionChain && evolutionChain.length > 1 && (
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                                <Zap className="h-5 w-5 text-yellow-400" /> {t("detailEvolutionTitle")}
                            </h2>
                            <div className="flex flex-wrap items-center gap-2">
                                {evolutionChain.map((evoStand, index) => (
                                    <div key={evoStand!.id} className="flex items-center gap-2">
                                        {evoStand!.id === stand.id ? (
                                            <span className="px-4 py-3 bg-accent-blue/15 border-2 border-accent-blue/40 rounded-lg text-white font-bold text-sm">
                                                {evoStand!.name}
                                                <span className="block text-xs font-normal text-accent-blue mt-0.5">{t("detailTierLabel", { tier: evoStand!.tier.overall })} &middot; {evoStand!.rarity}</span>
                                            </span>
                                        ) : (
                                            <Link
                                                href={`/stands/${evoStand!.id}`}
                                                className="px-4 py-3 bg-surface border border-border rounded-lg text-white hover:border-accent-blue/50 transition-colors text-sm"
                                            >
                                                {evoStand!.name}
                                                <span className="block text-xs font-normal text-muted mt-0.5">{t("detailTierLabel", { tier: evoStand!.tier.overall })} &middot; {evoStand!.rarity}</span>
                                            </Link>
                                        )}
                                        {index < evolutionChain.length - 1 && (
                                            <ArrowRight className="h-4 w-4 text-muted shrink-0" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">{t("detailMovesTitle")}</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {localizedMoves.map((move) => (
                                <div key={move.name} className="bg-surface border border-border rounded-lg p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="font-bold text-white">{move.name}</span>
                                        <span className="bg-white/5 border border-white/10 rounded px-2 text-xs font-mono text-muted">{t("detailMoveKeyLabel", { key: move.key })}</span>
                                    </div>
                                    <div className="text-sm text-muted capitalize">{t("detailMoveTypeLabel", { type: move.type })}</div>
                                    {move.effect && <div className="text-sm text-accent-indigo mt-1">{move.effect}</div>}
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">{t("detailHowToGetTitle", { name: stand.name })}</h2>
                        <p className="text-muted leading-relaxed">
                            {t.rich(stand.rarity === "Special" ? "howToGetSpecial" : "howToGetNormal", {
                                name: stand.name,
                                obtainMethod,
                                strong: (chunks) => <strong className="text-white">{chunks}</strong>,
                            })}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">{t("detailMatchupsTitle", { name: stand.name })}</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-surface border border-border rounded-xl p-5">
                                <h3 className="text-sm font-bold text-green-400 uppercase tracking-wide mb-3">{t("detailStrongAgainst")}</h3>
                                {stand.counters.length > 0 ? (
                                    <div className="space-y-2">
                                        {stand.counters.map(id => {
                                            const target = standsData.find(s => s.id === id);
                                            if (!target) return null;
                                            return (
                                                <Link key={id} href={`/stands/${id}`} className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors group">
                                                    <span className="text-white text-sm">{target.name}</span>
                                                    <span className="text-xs text-muted group-hover:text-accent-blue">{t("detailTierLabel", { tier: target.tier.overall })}</span>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <p className="text-sm text-muted">{t("detailNoCounters")}</p>
                                )}
                            </div>
                            <div className="bg-surface border border-border rounded-xl p-5">
                                <h3 className="text-sm font-bold text-red-400 uppercase tracking-wide mb-3">{t("detailWeakAgainst")}</h3>
                                {stand.counteredBy.length > 0 ? (
                                    <div className="space-y-2">
                                        {stand.counteredBy.map(id => {
                                            const target = standsData.find(s => s.id === id);
                                            if (!target) return null;
                                            return (
                                                <Link key={id} href={`/stands/${id}`} className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors group">
                                                    <span className="text-white text-sm">{target.name}</span>
                                                    <span className="text-xs text-muted group-hover:text-red-400">{t("detailTierLabel", { tier: target.tier.overall })}</span>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <p className="text-sm text-muted">{t("detailNoCounteredBy")}</p>
                                )}
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">{t("detailBestBuildsTitle", { name: stand.name })}</h2>
                        <div className="bg-gradient-to-br from-surface to-background border border-border rounded-xl p-6">
                            <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                                <Sword className="h-5 w-5 text-accent-blue" /> {t("detailRecommendedPvpTitle")}
                            </h3>
                            <p className="text-muted mb-4">
                                {t.rich("bestPvpDescription", {
                                    name: stand.name,
                                    style: stand.recommendedStyles[0],
                                    sub: stand.recommendedSubs[0],
                                    strong: (chunks) => <strong className="text-white capitalize">{chunks}</strong>,
                                })}
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <Link href={`/build-planner?stand=${stand.id}&style=${stand.recommendedStyles[0]}&sub=${stand.recommendedSubs[0]}&mode=pvp`} className="text-sm font-bold text-accent-blue hover:text-white transition-colors border border-accent-blue/30 px-4 py-2 rounded-lg hover:bg-accent-blue/10">
                                    {t("detailLoadPvpBuild")}
                                </Link>
                                {stand.recommendedStyles.length > 1 && (
                                    <Link href={`/build-planner?stand=${stand.id}&style=${stand.recommendedStyles[1]}&sub=${stand.recommendedSubs[0]}`} className="text-sm font-bold text-muted hover:text-white transition-colors border border-white/10 px-4 py-2 rounded-lg hover:bg-white/5">
                                        {t("detailTryAlt", { name: stand.recommendedStyles[1] })}
                                    </Link>
                                )}
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">{t("detailStatBreakdownTitle", { name: stand.name })}</h2>
                        <div className="bg-surface border border-border rounded-xl p-6 text-sm text-muted leading-relaxed space-y-3">
                            <p>
                                {t.rich("statBreakdownP1Intro", {
                                    name: stand.name,
                                    damage: stand.scores.damage,
                                    combo: stand.scores.combo,
                                    strong: (chunks) => <strong className="text-white">{chunks}</strong>,
                                })}
                                {" "}
                                {stand.scores.damage >= 8
                                    ? t("statDamageHigh")
                                    : stand.scores.damage >= 6
                                        ? t("statDamageMid")
                                        : t("statDamageLow", { name: stand.name })}
                            </p>
                            <p>
                                {t.rich("statBreakdownP2Intro", {
                                    name: stand.name,
                                    cc: stand.scores.cc,
                                    aoe: stand.scores.aoe,
                                    strong: (chunks) => <strong className="text-white">{chunks}</strong>,
                                })}
                                {" "}
                                {stand.scores.cc >= 8
                                    ? t("statCcHigh")
                                    : stand.scores.cc >= 5
                                        ? t("statCcMid")
                                        : t("statCcLow")}
                            </p>
                            <p>
                                {t.rich("statBreakdownP3Intro", {
                                    mobility: stand.scores.mobility,
                                    sustain: stand.scores.sustain,
                                    strong: (chunks) => <strong className="text-white">{chunks}</strong>,
                                })}
                                {" "}
                                {stand.scores.mobility >= 8
                                    ? t("statMobilityHigh", { name: stand.name })
                                    : stand.scores.mobility <= 4
                                        ? t("statMobilityLow", { name: stand.name })
                                        : t("statMobilityMid")}
                                {stand.scores.sustain >= 7 ? t("statSustainHigh") : t("statSustainOther")}
                            </p>
                            <p>
                                {t.rich("statBreakdownP4Intro", {
                                    name: stand.name,
                                    rarity: stand.rarity,
                                    awakening: stand.awakening.required,
                                    strong: (chunks) => <strong className="text-white">{chunks}</strong>,
                                })}
                                {" "}
                                {stand.awakening.required >= 120 ? t("statAwakeningHigh") : t("statAwakeningLow")}
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">{t("detailCommonMistakesTitle", { name: stand.name })}</h2>
                        <ul className="space-y-3 text-muted">
                            <li className="flex items-start gap-2">
                                <span className="text-red-400 font-bold">&times;</span>
                                <span>
                                    {stand.scores.mobility <= 4
                                        ? t("mistake1MobLow", { name: stand.name, mobility: stand.scores.mobility })
                                        : stand.scores.damage >= 9
                                            ? t("mistake1DmgHigh", { name: stand.name })
                                            : t("mistake1Default", {
                                                name: stand.name,
                                                style: stand.recommendedStyles[0],
                                                gap: stand.scores.cc < 5
                                                    ? t("mistakeGapCC")
                                                    : stand.scores.mobility < 5
                                                        ? t("mistakeGapMobility")
                                                        : t("mistakeGapSustain"),
                                            })}
                                </span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-red-400 font-bold">&times;</span>
                                <span>
                                    {stand.counteredBy.length > 0
                                        ? (stand.scores.mobility >= 7
                                            ? t("mistake2HasCountersHighMob", {
                                                name: stand.name,
                                                firstCounter: standsData.find(s => s.id === stand.counteredBy[0])?.name || stand.counteredBy[0],
                                            })
                                            : t("mistake2HasCountersLowMob", {
                                                name: stand.name,
                                                firstCounter: standsData.find(s => s.id === stand.counteredBy[0])?.name || stand.counteredBy[0],
                                            }))
                                        : t("mistake2NoCounters", { name: stand.name, awakening: stand.awakening.required })}
                                </span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-red-400 font-bold">&times;</span>
                                <span>
                                    {stand.tier.pvp !== stand.tier.pve
                                        ? t("mistake3DiffTiers", {
                                            name: stand.name,
                                            pvpTier: stand.tier.pvp,
                                            pveTier: stand.tier.pve,
                                        })
                                        : t("mistake3SameTiers", { name: stand.name })}
                                </span>
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                            <HelpCircle className="h-5 w-5 text-accent-blue" /> {t("detailFaqTitle")}
                        </h2>
                        <div className="space-y-4">
                            {faqs.map((faq) => (
                                <details key={faq.question} className="group bg-surface border border-border rounded-lg">
                                    <summary className="cursor-pointer p-4 text-white font-medium flex items-center justify-between hover:bg-white/5 transition-colors rounded-lg">
                                        {faq.question}
                                        <ChevronRight className="h-4 w-4 text-muted group-open:rotate-90 transition-transform shrink-0 ml-2" />
                                    </summary>
                                    <div className="px-4 pb-4 text-muted text-sm leading-relaxed">
                                        {faq.answer}
                                    </div>
                                </details>
                            ))}
                        </div>
                    </section>

                    {/* Related Skins */}
                    {(() => {
                        const standSkins = skinsData.filter(s => s.stand === stand.name);
                        if (standSkins.length === 0) return null;
                        return (
                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">{t("detailSkinsTitle", { name: stand.name })}</h2>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    {standSkins.map(skin => (
                                        <div key={skin.id} className="bg-surface border border-border rounded-xl overflow-hidden">
                                            <div className="relative aspect-[4/3] bg-background">
                                                {(() => {
                                                    if (skin.imageUrl) {
                                                        return (
                                                            <Image
                                                                src={skin.imageUrl}
                                                                alt={skin.name}
                                                                width={280}
                                                                height={210}
                                                                className="w-full h-full object-cover"
                                                                loading="lazy"
                                                            />
                                                        );
                                                    }
                                                    if (/^grey?scale$/i.test(skin.skinName)) {
                                                        return (
                                                            <Image
                                                                src={getStandImagePath(stand.id)}
                                                                alt={`${skin.name} — grayscale render of ${stand.name}`}
                                                                width={280}
                                                                height={210}
                                                                className="w-full h-full object-cover grayscale brightness-90"
                                                                loading="lazy"
                                                            />
                                                        );
                                                    }
                                                    return (
                                                        <div className="flex h-full items-center justify-center px-4 text-center text-xs text-muted">
                                                            Preview not yet released — Trello shows a TBA placeholder.
                                                        </div>
                                                    );
                                                })()}
                                            </div>
                                            <div className="p-3">
                                                <h3 className="font-bold text-white text-sm">{skin.skinName}</h3>
                                                <p className="text-xs text-muted">{skin.rarity ?? "Official Trello listing"}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <Link href="/skins" className="inline-flex items-center gap-1 text-sm text-accent-blue hover:text-white mt-3 transition-colors">
                                    {t("detailViewAllSkins")} <ArrowRight className="h-3 w-3" />
                                </Link>
                            </section>
                        );
                    })()}

                    {/* Related Stands */}
                    {relatedStands.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">{t("detailRelatedStandsTitle")}</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {relatedStands.map(rs => (
                                    <Link
                                        key={rs!.id}
                                        href={`/stands/${rs!.id}`}
                                        className="bg-surface border border-border rounded-lg p-4 hover:border-accent-blue/50 transition-colors group"
                                    >
                                        <div className="font-bold text-white text-sm group-hover:text-accent-blue transition-colors">{rs!.name}</div>
                                        <div className="text-xs text-muted mt-1">{t("detailTierLabel", { tier: rs!.tier.overall })} &middot; {rs!.rarity}</div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}

                    <section className="bg-gradient-to-r from-accent-blue/10 to-accent-indigo/10 border border-accent-blue/20 rounded-xl p-6 text-center">
                        <p className="text-white font-bold text-lg mb-2">{t("detailCtaTitle", { name: stand.name })}</p>
                        <p className="text-muted text-sm mb-4">{t("detailCtaBody")}</p>
                        <Link
                            href={`/build-planner?stand=${stand.id}`}
                            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-gradient-to-r from-accent-blue to-accent-indigo rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all"
                        >
                            {t("detailCtaButton", { name: stand.name })} <ArrowRight className="h-4 w-4" />
                        </Link>
                    </section>

                </div>

                {/* Sidebar (Right 1/3) */}
                <div className="space-y-6">
                    <div className="bg-surface border border-border rounded-xl p-6 sticky top-24">
                        <h3 className="text-lg font-bold text-white mb-4">{t("detailBaseScoresTitle")}</h3>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-muted flex items-center gap-1.5"><Sword className="h-4 w-4" /> {t("detailScoreDamage")}</span>
                                    <span className="text-white font-mono">{stand.scores.damage}/10</span>
                                </div>
                                <div className="w-full bg-background rounded-full h-1.5"><div className="bg-accent-blue h-1.5 rounded-full" style={{ width: `${stand.scores.damage * 10}%` }}></div></div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-muted flex items-center gap-1.5"><Activity className="h-4 w-4" /> {t("detailScoreCombo")}</span>
                                    <span className="text-white font-mono">{stand.scores.combo}/10</span>
                                </div>
                                <div className="w-full bg-background rounded-full h-1.5"><div className="bg-accent-blue h-1.5 rounded-full" style={{ width: `${stand.scores.combo * 10}%` }}></div></div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-muted flex items-center gap-1.5"><Target className="h-4 w-4" /> {t("detailScoreCC")}</span>
                                    <span className="text-white font-mono">{stand.scores.cc}/10</span>
                                </div>
                                <div className="w-full bg-background rounded-full h-1.5"><div className="bg-accent-indigo h-1.5 rounded-full" style={{ width: `${stand.scores.cc * 10}%` }}></div></div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-muted flex items-center gap-1.5"><Shield className="h-4 w-4" /> {t("detailScoreSustain")}</span>
                                    <span className="text-white font-mono">{stand.scores.sustain}/10</span>
                                </div>
                                <div className="w-full bg-background rounded-full h-1.5"><div className="bg-accent-indigo h-1.5 rounded-full" style={{ width: `${stand.scores.sustain * 10}%` }}></div></div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-muted flex items-center gap-1.5"><Navigation className="h-4 w-4" /> {t("detailScoreMobility")}</span>
                                    <span className="text-white font-mono">{stand.scores.mobility}/10</span>
                                </div>
                                <div className="w-full bg-background rounded-full h-1.5"><div className="bg-purple-500 h-1.5 rounded-full" style={{ width: `${stand.scores.mobility * 10}%` }}></div></div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-surface border border-border rounded-xl p-6">
                        <h3 className="text-lg font-bold text-white mb-4">{t("detailProsConsTitle")}</h3>
                        <p className="text-sm text-muted mb-4">{t("detailProsConsIntro")}</p>
                        <div className="mb-4">
                            <h4 className="text-sm font-bold text-green-400 mb-2 uppercase tracking-wide">{t("detailStrengths")}</h4>
                            <ul className="text-sm text-muted space-y-1 list-disc list-inside">
                                {strengths.map(s => <li key={s}>{s}</li>)}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-red-400 mb-2 uppercase tracking-wide">{t("detailWeaknesses")}</h4>
                            <ul className="text-sm text-muted space-y-1 list-disc list-inside">
                                {weaknesses.map(w => <li key={w}>{w}</li>)}
                            </ul>
                        </div>
                    </div>

                    <div className="bg-surface border border-border rounded-xl p-6">
                        <h3 className="text-lg font-bold text-white mb-4">{t("detailQuickLinksTitle")}</h3>
                        <div className="space-y-2">
                            <Link href="/tier-list" className="flex items-center gap-2 text-sm text-muted hover:text-accent-blue transition-colors">
                                <ChevronRight className="h-3 w-3" /> {t("detailLinkTierList")}
                            </Link>
                            <Link href="/build-planner" className="flex items-center gap-2 text-sm text-muted hover:text-accent-blue transition-colors">
                                <ChevronRight className="h-3 w-3" /> {t("detailLinkBuildPlanner")}
                            </Link>
                            <Link href={`/fighting-styles/${stand.recommendedStyles[0]}`} className="flex items-center gap-2 text-sm text-muted hover:text-accent-blue transition-colors capitalize">
                                <ChevronRight className="h-3 w-3" /> {t("detailLinkStyleGuide", { name: stand.recommendedStyles[0] })}
                            </Link>
                            <Link href={`/sub-abilities/${stand.recommendedSubs[0]}`} className="flex items-center gap-2 text-sm text-muted hover:text-accent-blue transition-colors capitalize">
                                <ChevronRight className="h-3 w-3" /> {t("detailLinkSubGuide", { name: stand.recommendedSubs[0] })}
                            </Link>
                            <Link href="/codes" className="flex items-center gap-2 text-sm text-muted hover:text-accent-blue transition-colors">
                                <ChevronRight className="h-3 w-3" /> {t("detailLinkActiveCodes")}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
