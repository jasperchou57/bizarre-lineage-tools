import type { Metadata } from "next";
import { ChevronRight, Moon, Skull, Heart, Shield } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { withCanonical, SITE_URL } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Guides" });
    return withCanonical({
        title: t("nightVampire.metaTitle"),
        description: t("nightVampire.metaDescription"),
    }, "/guides/night-vampire");
}

export default async function NightVampireGuidePage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: "Guides" });
    const tCommon = await getTranslations({ locale, namespace: "Common" });

    const abilities = [
        { key: "G", cooldown: "8s", name: t("nightVampire.ability1Name"), type: t("nightVampire.ability1Type"), description: t("nightVampire.ability1Desc") },
        { key: "H", cooldown: "12s", name: t("nightVampire.ability2Name"), type: t("nightVampire.ability2Type"), description: t("nightVampire.ability2Desc") },
        { key: "J", cooldown: "15s", name: t("nightVampire.ability3Name"), type: t("nightVampire.ability3Type"), description: t("nightVampire.ability3Desc") },
        { key: "V", cooldown: "30s", name: t("nightVampire.ability4Name"), type: t("nightVampire.ability4Type"), description: t("nightVampire.ability4Desc") },
    ];
    const pairings = [
        { stand: "The World", standId: "the-world", reason: t("nightVampire.pairing1Reason"), tier: "S+" },
        { stand: "King Crimson", standId: "king-crimson", reason: t("nightVampire.pairing2Reason"), tier: "S" },
        { stand: "Star Platinum", standId: "star-platinum", reason: t("nightVampire.pairing3Reason"), tier: "S" },
        { stand: "Whitesnake", standId: "whitesnake", reason: t("nightVampire.pairing4Reason"), tier: "A" },
    ];

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: tCommon("breadcrumbHome"), item: SITE_URL },
            { "@type": "ListItem", position: 2, name: t("breadcrumbCurrent"), item: `${SITE_URL}/guides` },
            { "@type": "ListItem", position: 3, name: t("nightVampire.breadcrumbCurrent"), item: `${SITE_URL}/guides/night-vampire` },
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
                <span className="text-white" aria-current="page">{t("nightVampire.breadcrumbCurrent")}</span>
            </nav>

            <div className="flex items-center gap-4 mb-4">
                <Moon className="h-12 w-12 text-purple-400" />
                <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-white m-0">{t("nightVampire.heroTitle")}</h1>
            </div>
            <p className="text-lg text-muted mb-10 leading-relaxed">{t("nightVampire.intro")}</p>

            <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">{t("nightVampire.howToTitle")}</h2>
                <div className="bg-surface border border-border rounded-xl p-6 space-y-4">
                    {([1, 2, 3] as const).map((n) => (
                        <div key={n} className="flex items-start gap-4">
                            <div className="bg-purple-500/10 text-purple-400 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shrink-0">{n}</div>
                            <div>
                                <h3 className="font-bold text-white">{t(`nightVampire.howStep${n}Title` as `nightVampire.howStep${1 | 2 | 3}Title`)}</h3>
                                <p className="text-sm text-muted">{t(`nightVampire.howStep${n}Body` as `nightVampire.howStep${1 | 2 | 3}Body`)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">{t("nightVampire.prosConsTitle")}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-surface border border-border rounded-xl p-5">
                        <h3 className="text-sm font-bold text-green-400 uppercase tracking-wide mb-3 flex items-center gap-2">
                            <Heart className="h-4 w-4" /> {t("nightVampire.strengthsLabel")}
                        </h3>
                        <ul className="text-sm text-muted space-y-2">
                            {([1, 2, 3, 4, 5] as const).map((n) => (
                                <li key={n}>{t(`nightVampire.strength${n}` as `nightVampire.strength${1 | 2 | 3 | 4 | 5}`)}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-surface border border-border rounded-xl p-5">
                        <h3 className="text-sm font-bold text-red-400 uppercase tracking-wide mb-3 flex items-center gap-2">
                            <Skull className="h-4 w-4" /> {t("nightVampire.weaknessesLabel")}
                        </h3>
                        <ul className="text-sm text-muted space-y-2">
                            {([1, 2, 3, 4, 5] as const).map((n) => (
                                <li key={n}>{t(`nightVampire.weakness${n}` as `nightVampire.weakness${1 | 2 | 3 | 4 | 5}`)}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">{t("nightVampire.abilitiesTitle")}</h2>
                <div className="space-y-3">
                    {abilities.map((ability) => (
                        <div key={ability.name} className="bg-surface border border-border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-3">
                                    <span className="font-bold text-white">{ability.name}</span>
                                    <span className="bg-white/5 border border-white/10 rounded px-2 text-xs font-mono text-muted">{t("nightVampire.abilityKeyLabel")} {ability.key}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-muted capitalize">{ability.type}</span>
                                    <span className="text-xs text-accent-blue">{ability.cooldown}</span>
                                </div>
                            </div>
                            <p className="text-sm text-muted">{ability.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">{t("nightVampire.videoTitle")}</h2>
                <div className="bg-surface border border-border rounded-xl overflow-hidden aspect-video">
                    <iframe
                        width="100%"
                        height="100%"
                        src="https://www.youtube.com/embed/EJu0Ltw3WGU"
                        title="How to Farm Night Vampire - Bizarre Lineage"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        loading="lazy"
                        className="w-full h-full"
                    />
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-accent-blue" /> {t("nightVampire.pairingsTitle")}
                </h2>
                <div className="space-y-3">
                    {pairings.map((pairing) => (
                        <Link key={pairing.stand} href={`/stands/${pairing.standId}`} className="block bg-surface border border-border rounded-xl p-5 hover:border-accent-blue/50 transition-colors group">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="font-bold text-white group-hover:text-accent-blue transition-colors">{pairing.stand}</h3>
                                <span className="px-2 py-1 text-xs font-mono font-bold rounded-full bg-accent-blue/10 text-accent-blue border border-accent-blue/20">{pairing.tier}</span>
                            </div>
                            <p className="text-sm text-muted">{pairing.reason}</p>
                        </Link>
                    ))}
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">{t("nightVampire.faqTitle")}</h2>
                <div className="space-y-4">
                    {([1, 2, 3] as const).map((n) => (
                        <details key={n} className="group bg-surface border border-border rounded-xl overflow-hidden">
                            <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                                <span className="font-medium text-white pr-4">{t(`nightVampire.faqQ${n}` as `nightVampire.faqQ${1 | 2 | 3}`)}</span>
                                <ChevronRight className="h-5 w-5 text-muted flex-shrink-0 group-open:rotate-90 transition-transform" />
                            </summary>
                            <div className="px-5 pb-5 text-sm text-muted leading-relaxed">
                                {t(`nightVampire.faqA${n}` as `nightVampire.faqA${1 | 2 | 3}`)}
                            </div>
                        </details>
                    ))}
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-white mb-4">{t("nightVampire.relatedTitle")}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Link href="/sub-abilities/vampire" className="bg-surface border border-border rounded-lg p-4 hover:border-accent-blue/50 transition-colors group">
                        <div className="font-bold text-white group-hover:text-accent-blue transition-colors">{t("nightVampire.relatedVampireSub")}</div>
                        <div className="text-xs text-muted mt-1">{t("nightVampire.relatedVampireSubBody")}</div>
                    </Link>
                    <Link href="/sub-abilities/hamon" className="bg-surface border border-border rounded-lg p-4 hover:border-accent-blue/50 transition-colors group">
                        <div className="font-bold text-white group-hover:text-accent-blue transition-colors">{t("nightVampire.relatedHamonSub")}</div>
                        <div className="text-xs text-muted mt-1">{t("nightVampire.relatedHamonSubBody")}</div>
                    </Link>
                </div>
            </section>
        </div>
    );
}
