import { Metadata } from "next";
import Image from "next/image";
import { ChevronRight, Sparkles, Info } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
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

type Perk = {
    name: string;
    effect?: string;
    cost?: string;
    npc?: string;
};

type PerkSection = {
    sourceLabel: string;
    sourceNote?: string;
    perks: Perk[];
};

const PERK_SECTIONS: PerkSection[] = [
    {
        sourceLabel: "Money Store (Rahaj)",
        sourceNote: "Purchasable from Rahaj's Shop in Morioh.",
        perks: [
            { name: "The Fever", effect: "Defeating a player steals 10% of their stats for 20 seconds (10s cooldown)." },
            { name: "Hustle Bones", effect: "All money gained is increased by +5%." },
            { name: "Curve and Light", effect: "Reduce Stand Awakening cooldown by 10%." },
            { name: "I'm in Your Area", effect: "Enemies at close range deal 8% less damage and take 8% more damage from you." },
        ],
    },
    {
        sourceLabel: "Tutorial Reward",
        perks: [
            { name: "Journeyman", effect: "+5% experience boost." },
        ],
    },
    {
        sourceLabel: "Prestige Shop",
        perks: [
            { name: "Bloodlust", effect: "After being hit, your HP rapidly drains to 5%. While active gain +100% penetration, +50% damage, and lifesteal." },
        ],
    },
    {
        sourceLabel: "Side Quest Traits",
        sourceNote: "Granted by completing specific side-quest NPC quests.",
        perks: [
            { name: "The Heirophant", npc: "Kakyoin", effect: "Take -15% Physical damage but take +15% Slash damage." },
            { name: "Retribution", effect: "Backstab attacks apply the Bleed status effect and lifesteal." },
            { name: "The Magician", npc: "Geordie Greep", effect: "Evading and then landing an attack makes the attack deal knockback and 100% more damage." },
            { name: "The Fool", npc: "Shozuki", effect: "Being ragdolled grants you more evasive bar." },
            { name: "The High Priestess", npc: "Rose", effect: "Posing grants more healing and power regeneration." },
            { name: "Gardener", effect: "All healing sources are now done over 10 seconds. Heal 10% more overall." },
            { name: "Internal Conjuration", npc: "Kaiser", effect: "While your Stand is not summoned, gain 10% Damage and Defense." },
        ],
    },
    {
        sourceLabel: "Gang Wars",
        perks: [
            { name: "Commanding Presence", effect: "Other gang members gain 5% damage and defense, stacking up to 30% globally." },
        ],
    },
    {
        sourceLabel: "Jotaro Raid Shop",
        sourceNote: "Trello does not document the trait effects — only their cost. Verify in-game.",
        perks: [
            { name: "Grappler Trait", cost: "~360 Jotaro Tokens" },
            { name: "Intimidation Trait", cost: "~368 Jotaro Tokens" },
        ],
    },
    {
        sourceLabel: "Avdol Raid Shop",
        sourceNote: "Trello does not document the trait effects — only their cost. Verify in-game.",
        perks: [
            { name: "Conjurer Trait", cost: "~242 Avdol Tokens" },
            { name: "King of Flames Trait", cost: "~980 Avdol Tokens" },
        ],
    },
    {
        sourceLabel: "Kira Raid Shop",
        sourceNote: "Trello does not document the trait effects — only their cost. Verify in-game.",
        perks: [
            { name: "A Quiet Life", cost: "~392 Kira Tokens" },
            { name: "Serial Killer", cost: "~436 Kira Tokens" },
        ],
    },
    {
        sourceLabel: "DIO Raid Shop",
        sourceNote: "Trello does not document the trait effects — only their cost. Verify in-game.",
        perks: [
            { name: "The Godfather Trait", cost: "~412 DIO Tokens" },
            { name: "Emperor of Time Trait", cost: "~420 DIO Tokens" },
        ],
    },
];

export default async function PerksPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: "Perks" });
    const tCommon = await getTranslations({ locale, namespace: "Common" });
    const perkTrans = getPerkTranslations(locale);
    const totalPerks = PERK_SECTIONS.reduce((sum, s) => sum + s.perks.length, 0);

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

            <div className="bg-accent-blue/5 border border-accent-blue/20 rounded-xl p-4 mb-10 flex gap-3 text-sm text-muted">
                <Info className="h-5 w-5 text-accent-blue shrink-0 mt-0.5" />
                <div>
                    <p className="text-white font-medium mb-1">{t("aboutTitle")}</p>
                    <p>{t("aboutBody")}</p>
                </div>
            </div>

            {PERK_SECTIONS.map((section) => {
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
                    <p>{t("sourceBody")} <a href="https://trello.com/b/wtzgwqIf" target="_blank" rel="noopener noreferrer" className="text-accent-blue hover:text-white transition-colors underline underline-offset-2">trello.com/b/wtzgwqIf</a>.</p>
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
                </div>
            </section>
        </div>
    );
}
