import type { Metadata } from "next";
import { ChevronRight, Zap, AlertTriangle } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { withCanonical, SITE_URL } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Guides" });
    return withCanonical({
        title: t("awakening.metaTitle"),
        description: t("awakening.metaDescription"),
    }, "/guides/awakening");
}

export default async function AwakeningGuidePage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: "Guides" });
    const tCommon = await getTranslations({ locale, namespace: "Common" });
    const rich = { strong: (chunks: React.ReactNode) => <strong className="text-white">{chunks}</strong> };

    const steps = [1, 2, 3, 4, 5].map((n) => ({
        step: n,
        title: t(`awakening.step${n}Title` as `awakening.step${1 | 2 | 3 | 4 | 5}Title`),
        description: t(`awakening.step${n}Body` as `awakening.step${1 | 2 | 3 | 4 | 5}Body`),
        tip: t(`awakening.step${n}Tip` as `awakening.step${1 | 2 | 3 | 4 | 5}Tip`),
    }));

    const bosses = [1, 2, 3].map((n) => ({
        name: t(`awakening.boss${n}Name` as `awakening.boss${1 | 2 | 3}Name`),
        difficulty: t(`awakening.boss${n}Difficulty` as `awakening.boss${1 | 2 | 3}Difficulty`),
        hp: t(`awakening.boss${n}Hp` as `awakening.boss${1 | 2 | 3}Hp`),
        tip: t(`awakening.boss${n}Tip` as `awakening.boss${1 | 2 | 3}Tip`),
        difficultyKey: n === 1 ? "medium" : n === 2 ? "hard" : "veryHard",
    }));

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: tCommon("breadcrumbHome"), item: SITE_URL },
            { "@type": "ListItem", position: 2, name: t("breadcrumbCurrent"), item: `${SITE_URL}/guides` },
            { "@type": "ListItem", position: 3, name: t("awakening.breadcrumbCurrent"), item: `${SITE_URL}/guides/awakening` },
        ],
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            <nav className="flex items-center gap-2 text-sm text-muted mb-8" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-white transition-colors">{tCommon("breadcrumbHome")}</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/guides" className="hover:text-white transition-colors">{t("breadcrumbCurrent")}</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-white" aria-current="page">{t("awakening.breadcrumbCurrent")}</span>
            </nav>

            <div className="flex items-center gap-4 mb-4">
                <Zap className="h-12 w-12 text-yellow-400" />
                <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-white m-0">{t("awakening.heroTitle")}</h1>
            </div>
            <p className="text-lg text-muted mb-10 leading-relaxed">{t("awakening.intro")}</p>

            <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">{t("awakening.reqTitle")}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-surface border border-border rounded-xl p-5 text-center">
                        <div className="text-3xl font-bold text-accent-blue mb-1">50</div>
                        <div className="text-sm text-muted">{t("awakening.reqLevelLabel")}</div>
                    </div>
                    <div className="bg-surface border border-border rounded-xl p-5 text-center">
                        <div className="text-3xl font-bold text-accent-indigo mb-1">100</div>
                        <div className="text-sm text-muted">{t("awakening.reqConjurationLabel")}</div>
                    </div>
                    <div className="bg-surface border border-border rounded-xl p-5 text-center">
                        <div className="text-3xl font-bold text-yellow-400 mb-1">3</div>
                        <div className="text-sm text-muted">{t("awakening.reqBossesLabel")}</div>
                    </div>
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-6">{t("awakening.stepsTitle")}</h2>
                <div className="space-y-4">
                    {steps.map((step) => (
                        <div key={step.step} className="bg-surface border border-border rounded-xl p-6">
                            <div className="flex items-start gap-4">
                                <div className="bg-accent-blue/10 text-accent-blue rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">
                                    {step.step}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                                    <p className="text-sm text-muted mb-3">{step.description}</p>
                                    <div className="bg-yellow-400/5 border border-yellow-400/20 rounded-lg p-3 flex items-start gap-2">
                                        <AlertTriangle className="h-4 w-4 text-yellow-400 shrink-0 mt-0.5" />
                                        <span className="text-xs text-yellow-400/80">{step.tip}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">{t("awakening.bossesTitle")}</h2>
                <div className="space-y-4">
                    {bosses.map((boss) => (
                        <div key={boss.name} className="bg-surface border border-border rounded-xl p-5">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="font-bold text-white">{boss.name}</h3>
                                <span className={`text-xs font-bold px-2 py-1 rounded-full ${boss.difficultyKey === "veryHard" ? "bg-red-500/20 text-red-400" : boss.difficultyKey === "hard" ? "bg-orange-500/20 text-orange-400" : "bg-yellow-500/20 text-yellow-400"}`}>
                                    {boss.difficulty}
                                </span>
                            </div>
                            <p className="text-sm text-muted mb-2">{t("awakening.bossHpLabel")} {boss.hp}</p>
                            <p className="text-sm text-muted">{boss.tip}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">{t("awakening.videoTitle")}</h2>
                <div className="bg-surface border border-border rounded-xl overflow-hidden aspect-video">
                    <iframe
                        width="100%"
                        height="100%"
                        src="https://www.youtube.com/embed/n21tqQKtKA4"
                        title="How to Get Stand Awakening - Bizarre Lineage"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        loading="lazy"
                        className="w-full h-full"
                    />
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">{t("awakening.bestStandsTitle")}</h2>
                <div className="bg-surface border border-border rounded-xl p-6 text-sm text-muted leading-relaxed space-y-3">
                    <p>{t.rich("awakening.bestStands1", rich)}</p>
                    <p>{t.rich("awakening.bestStands2", rich)}</p>
                    <p>{t.rich("awakening.bestStands3", rich)}</p>
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">{t("awakening.faqTitle")}</h2>
                <div className="space-y-4">
                    {([1, 2, 3] as const).map((n) => (
                        <details key={n} className="group bg-surface border border-border rounded-xl overflow-hidden">
                            <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                                <span className="font-medium text-white pr-4">{t(`awakening.faqQ${n}` as `awakening.faqQ${1 | 2 | 3}`)}</span>
                                <ChevronRight className="h-5 w-5 text-muted flex-shrink-0 group-open:rotate-90 transition-transform" />
                            </summary>
                            <div className="px-5 pb-5 text-sm text-muted leading-relaxed">
                                {t(`awakening.faqA${n}` as `awakening.faqA${1 | 2 | 3}`)}
                            </div>
                        </details>
                    ))}
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-white mb-4">{t("awakening.relatedTitle")}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Link href="/guides/leveling" className="bg-surface border border-border rounded-lg p-4 hover:border-accent-blue/50 transition-colors group">
                        <div className="font-bold text-white group-hover:text-accent-blue transition-colors">{t("awakening.relatedLevelingTitle")}</div>
                        <div className="text-xs text-muted mt-1">{t("awakening.relatedLevelingSub")}</div>
                    </Link>
                    <Link href="/guides/prestige" className="bg-surface border border-border rounded-lg p-4 hover:border-accent-blue/50 transition-colors group">
                        <div className="font-bold text-white group-hover:text-accent-blue transition-colors">{t("awakening.relatedPrestigeTitle")}</div>
                        <div className="text-xs text-muted mt-1">{t("awakening.relatedPrestigeSub")}</div>
                    </Link>
                    <Link href="/raids" className="bg-surface border border-border rounded-lg p-4 hover:border-accent-blue/50 transition-colors group">
                        <div className="font-bold text-white group-hover:text-accent-blue transition-colors">{t("awakening.relatedRaidsTitle")}</div>
                        <div className="text-xs text-muted mt-1">{t("awakening.relatedRaidsSub")}</div>
                    </Link>
                    <Link href="/tier-list" className="bg-surface border border-border rounded-lg p-4 hover:border-accent-blue/50 transition-colors group">
                        <div className="font-bold text-white group-hover:text-accent-blue transition-colors">{t("awakening.relatedTierListTitle")}</div>
                        <div className="text-xs text-muted mt-1">{t("awakening.relatedTierListSub")}</div>
                    </Link>
                </div>
            </section>
        </div>
    );
}
