import { Metadata } from "next";
import Image from "next/image";
import { ChevronRight, Sparkles, Info } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { OFFICIAL_DATA_LAST_CHECKED } from "@/data/official-sources";
import { OFFICIAL_PERK_SECTIONS, TRAITS_SOURCE_URL } from "@/data/perks";
import { getPerkTranslations } from "@/data/locale-data";
import { withCanonical, SITE_URL } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Perks" });
    return withCanonical({
        title: t("metaTitle"),
        description: t("metaDescription"),
    }, "/perks");
}

export default async function PerksPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: "Perks" });
    const tCommon = await getTranslations({ locale, namespace: "Common" });
    const perkTrans = getPerkTranslations(locale);
    const totalPerks = OFFICIAL_PERK_SECTIONS.reduce((sum, s) => sum + s.perks.length, 0);

    const localizeSource = (label: string) => perkTrans?.sources?.[label as keyof typeof perkTrans.sources] ?? label;
    const localizeNote = (label: string, fallback?: string) => {
        if (!perkTrans?.sourceNotes) return fallback;
        if (label.includes("Raid Shop")) return perkTrans.sourceNotes.raidShop ?? fallback;
        const map = perkTrans.sourceNotes as Record<string, string | undefined>;
        return map[label] ?? fallback;
    };
    const localizeEffect = (perkName: string, fallback?: string) => {
        const map = perkTrans?.effects as Record<string, string> | undefined;
        return map?.[perkName] ?? fallback;
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: tCommon("breadcrumbHome"), item: SITE_URL },
            { "@type": "ListItem", position: 2, name: t("breadcrumbCurrent"), item: `${SITE_URL}/perks` },
        ],
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            <nav className="flex items-center gap-2 text-sm text-muted mb-8" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-white transition-colors">{tCommon("breadcrumbHome")}</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-white" aria-current="page">{t("breadcrumbCurrent")}</span>
            </nav>

            <div className="relative w-full rounded-xl overflow-hidden mb-8">
                <Image src="/images/pages/perks.png" alt={t("heroTitle")} width={800} height={450} className="w-full h-48 object-cover opacity-40" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
                <div className="absolute bottom-4 left-6">
                    <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-white">{t("heroTitle")}</h1>
                </div>
            </div>
            <p className="text-lg text-muted mb-6 leading-relaxed">{t("heroIntro", { count: totalPerks })}</p>
            <p className="text-sm text-muted mb-8">Official data checked: {OFFICIAL_DATA_LAST_CHECKED}</p>

            <div className="bg-accent-blue/5 border border-accent-blue/20 rounded-xl p-4 mb-10 flex gap-3 text-sm text-muted">
                <Info className="h-5 w-5 text-accent-blue shrink-0 mt-0.5" />
                <div>
                    <p className="text-white font-medium mb-1">{t("aboutTitle")}</p>
                    <p>{t("aboutBody")}</p>
                </div>
            </div>

            {OFFICIAL_PERK_SECTIONS.map((section) => {
                const sectionLabel = localizeSource(section.sourceLabel);
                const sectionNote = localizeNote(section.sourceLabel, section.sourceNote);
                return (
                    <section key={section.sourceLabel} className="mb-10">
                        <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                            <Sparkles className="h-5 w-5 text-accent-blue" /> {sectionLabel}
                        </h2>
                        {sectionNote && (
                            <p className="text-sm text-muted mb-4">{sectionNote}</p>
                        )}
                        <div className="space-y-3">
                            {section.perks.map((perk) => {
                                const effect = localizeEffect(perk.name, perk.effect);
                                return (
                                    <div key={perk.name} className="bg-surface border border-border rounded-xl p-5">
                                        <div className="flex items-center justify-between mb-2 gap-3 flex-wrap">
                                            <h3 className="font-bold text-white">
                                                {perk.name}
                                                {perk.npc && <span className="text-muted font-normal text-sm ml-2">({perk.npc})</span>}
                                            </h3>
                                            {perk.cost && (
                                                <span className="text-xs text-accent-blue font-mono font-bold">{perk.cost}</span>
                                            )}
                                        </div>
                                        {effect ? (
                                            <p className="text-sm text-muted">{effect}</p>
                                        ) : (
                                            <p className="text-sm text-muted italic">{t("effectNotDocumented")}</p>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                );
            })}

            <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">{t("sourceTitle")}</h2>
                <div className="bg-surface border border-border rounded-xl p-6 text-sm text-muted">
                    <p>{t("sourceBody")} <a href={TRAITS_SOURCE_URL} target="_blank" rel="noopener noreferrer" className="text-accent-blue hover:text-white transition-colors underline underline-offset-2">Official Traits card</a>.</p>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-white mb-4">{t("relatedTitle")}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Link href="/raids" className="bg-surface border border-border rounded-lg p-4 hover:border-accent-blue/50 transition-colors group">
                        <div className="font-bold text-white group-hover:text-accent-blue transition-colors">{t("relatedRaidsTitle")}</div>
                        <div className="text-xs text-muted mt-1">{t("relatedRaidsSub")}</div>
                    </Link>
                    <Link href="/build-planner" className="bg-surface border border-border rounded-lg p-4 hover:border-accent-blue/50 transition-colors group">
                        <div className="font-bold text-white group-hover:text-accent-blue transition-colors">{t("relatedBuildPlannerTitle")}</div>
                        <div className="text-xs text-muted mt-1">{t("relatedBuildPlannerSub")}</div>
                    </Link>
                    <Link href="/personalities" className="bg-surface border border-border rounded-lg p-4 hover:border-accent-indigo/50 transition-colors group">
                        <div className="font-bold text-white group-hover:text-accent-indigo transition-colors">Personalities</div>
                        <div className="text-xs text-muted mt-1">Official Trello personality effects</div>
                    </Link>
                </div>
            </section>
        </div>
    );
}
