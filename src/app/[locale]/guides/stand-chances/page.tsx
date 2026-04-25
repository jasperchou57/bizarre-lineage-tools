import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ChevronRight, Dice6, Gem, Crown, Star, Sparkles, CircleDot } from "lucide-react";
import standsData from "@/data/stands.json";
import { withCanonical } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Guides" });
    return withCanonical({
        title: t("standChances.metaTitle"),
        description: t("standChances.metaDescription"),
    }, "/guides/stand-chances");
}

const rarityTiers = [
    {
        name: "Common",
        chance: "Site Label",
        color: "text-gray-400",
        borderColor: "border-gray-500/30",
        bgColor: "bg-gray-500/5",
        badgeColor: "bg-gray-500/20 text-gray-300",
        icon: <CircleDot className="h-6 w-6 text-gray-400" />,
        description: "This site uses Common as a local grouping label. The public official Trello does not publish exact Stand Arrow drop percentages for this tier.",
    },
    {
        name: "Uncommon",
        chance: "Site Label",
        color: "text-green-400",
        borderColor: "border-green-500/30",
        bgColor: "bg-green-500/5",
        badgeColor: "bg-green-500/20 text-green-400",
        icon: <Star className="h-6 w-6 text-green-400" />,
        description: "This is a site-maintained rarity bucket used for browsing. The official Trello documents move kits and obtainment methods, not precise odds for the bucket itself.",
    },
    {
        name: "Rare",
        chance: "Site Label",
        color: "text-blue-400",
        borderColor: "border-blue-500/30",
        bgColor: "bg-blue-500/5",
        badgeColor: "bg-blue-500/20 text-blue-400",
        icon: <Gem className="h-6 w-6 text-blue-400" />,
        description: "Rare is another local grouping label. Treat it as a directory aid rather than an official percentage-backed drop tier.",
    },
    {
        name: "Legendary",
        chance: "Site Label",
        color: "text-purple-400",
        borderColor: "border-purple-500/30",
        bgColor: "bg-purple-500/5",
        badgeColor: "bg-purple-500/20 text-purple-400",
        icon: <Crown className="h-6 w-6 text-purple-400" />,
        description: "The public Trello does not publish average Arrow counts or exact Legendary odds. This label is maintained by the site for browsing and planner purposes.",
    },
    {
        name: "Mythical",
        chance: "Site Label",
        color: "text-yellow-400",
        borderColor: "border-yellow-500/30",
        bgColor: "bg-yellow-500/5",
        badgeColor: "bg-yellow-500/20 text-yellow-400",
        icon: <Sparkles className="h-6 w-6 text-yellow-400" />,
        description: "This site currently places Whitesnake in a Mythical bucket, but the public official Trello does not publish a percentage drop rate for that classification.",
    },
];

const rarityOrder = ["Mythical", "Legendary", "Special", "Rare", "Uncommon", "Common"];

// Group stands by rarity
const standsByRarity = rarityOrder.map((rarity) => ({
    rarity,
    stands: standsData.filter((s) => s.rarity === rarity),
}));

const tips = [
    {
        title: "Stock up before rolling",
        description: "The public official Trello confirms that Stand Arrows can be found on the ground or obtained from chests. Use those official sources before assuming any third-party rate table is current.",
    },
    {
        title: "Lucky Arrow is cosmetic",
        description: "The official Lucky Arrow card says it guarantees a random skin on your current Stand. It is not documented as a higher-rarity Stand roll.",
    },
    {
        title: "Evolution Stands bypass the Arrow",
        description: "Made in Heaven, C-Moon, and The World High Voltage are listed on the site as evolution-based entries rather than normal Arrow rolls. Follow their official Trello quest or evolution lines instead of relying on drop tables.",
    },
];

const faqItems = [
    {
        question: "What is the rarest Stand in Bizarre Lineage?",
        answer: "This site currently places Whitesnake in its Mythical bucket, but the public official Trello does not publish an official rarest-Stand percentage table.",
    },
    {
        question: "How rare is Whitesnake in Bizarre Lineage?",
        answer: "The public official Trello documents Whitesnake's move kit, but it does not publish an official Stand Arrow percentage for Whitesnake.",
    },
    {
        question: "What are the Stand Arrow drop rates?",
        answer: "The public official Trello does not publish exact Stand Arrow drop-rate percentages. Any percentages on this site should be treated as local, non-official notes.",
    },
    {
        question: "Can I get Made in Heaven from the Stand Arrow?",
        answer: "No. Made in Heaven is an evolution Stand obtained by evolving C-Moon, which itself evolves from Whitesnake. It cannot be rolled directly from the Stand Arrow.",
    },
    {
        question: "Are evolution Stands part of normal rolls?",
        answer: "No. Evolution Stands (Made in Heaven, C-Moon, The World High Voltage) are treated on this site as non-standard Arrow entries and should be checked against their official quest or evolution paths.",
    },
];

export default async function StandChancesPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: "Guides" });
    const tCommon = await getTranslations({ locale, namespace: "Common" });

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="flex items-center gap-2 text-sm text-muted mb-8">
                <Link href="/" className="hover:text-white transition-colors">{tCommon("breadcrumbHome")}</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/guides" className="hover:text-white transition-colors">{t("breadcrumbCurrent")}</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-white">{t("standChancesBreadcrumb")}</span>
            </div>

            <div className="flex items-center gap-4 mb-8">
                <Dice6 className="h-12 w-12 text-accent-indigo" />
                <h1 className="text-4xl font-heading font-extrabold text-white m-0">{t("standChances.heroTitle")}</h1>
            </div>

            <p className="text-xl text-muted leading-relaxed mb-10">{t("standChancesIntro")}</p>

            <div className="bg-surface border border-border rounded-xl p-6 mb-10">
                <p className="text-sm text-muted leading-relaxed">
                    Officially verified: Stand Arrow obtainment, Lucky Arrow function, and evolution questlines.
                    Site-maintained only: rarity buckets, grouped rankings, and any planner-oriented browsing labels shown below.
                </p>
            </div>

            {/* Rarity Tiers Overview */}
            <h2 className="text-2xl font-bold text-white mb-6">Rarity Tiers & Drop Rates</h2>

            <div className="space-y-4 mb-12">
                {rarityTiers.map((tier) => (
                    <div key={tier.name} className={`border rounded-xl p-6 ${tier.borderColor} ${tier.bgColor}`}>
                        <div className="flex items-center gap-3 mb-3">
                            {tier.icon}
                            <h3 className={`text-xl font-bold ${tier.color}`}>{tier.name}</h3>
                            <span className={`ml-auto text-sm font-mono font-bold px-3 py-1 rounded-full ${tier.badgeColor}`}>{tier.chance}</span>
                        </div>
                        <p className="text-muted leading-relaxed">{tier.description}</p>
                    </div>
                ))}
            </div>

            {/* All Stands by Rarity */}
            <h2 className="text-2xl font-bold text-white mb-6">All Stands by Rarity</h2>

            <div className="space-y-8 mb-12">
                {standsByRarity.map(({ rarity, stands }) => {
                    const tierInfo = rarityTiers.find((t) => t.name === rarity);
                    if (!tierInfo || stands.length === 0) return null;

                    return (
                        <div key={rarity} className="bg-surface border border-border rounded-xl overflow-hidden">
                            <div className="bg-white/5 border-b border-white/5 px-6 py-4 flex items-center gap-3">
                                {tierInfo.icon}
                                <h3 className={`text-lg font-bold ${tierInfo.color}`}>{rarity}</h3>
                                <span className={`text-xs font-mono font-bold px-2 py-1 rounded-full ${tierInfo.badgeColor}`}>{tierInfo.chance}</span>
                                <span className="ml-auto text-sm text-muted">{stands.length} Stand{stands.length > 1 ? "s" : ""}</span>
                            </div>
                            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {stands.map((stand) => (
                                    <Link
                                        key={stand.id}
                                        href={`/stands/${stand.id}`}
                                        className="flex items-center justify-between bg-background border border-white/5 rounded-lg p-4 hover:border-accent-blue/50 transition-all group"
                                    >
                                        <div>
                                            <span className="font-bold text-white group-hover:text-accent-blue transition-colors">{stand.name}</span>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-xs text-muted">Part {stand.part}</span>
                                                <span className="text-xs text-muted">•</span>
                                                <span className="text-xs text-muted">{stand.obtainMethod}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-mono font-bold bg-accent-blue/10 text-accent-blue px-2 py-1 rounded">
                                                {stand.tier.overall}
                                            </span>
                                            <ChevronRight className="h-4 w-4 text-muted group-hover:text-accent-blue transition-colors" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Tips for Rolling */}
            <h2 className="text-2xl font-bold text-white mb-6">How to Improve Your Odds</h2>

            <div className="space-y-4 mb-12">
                {tips.map((tip) => (
                    <div key={tip.title} className="bg-surface border border-border rounded-xl p-6">
                        <h3 className="text-lg font-bold text-white mb-2">{tip.title}</h3>
                        <p className="text-muted text-sm leading-relaxed">{tip.description}</p>
                    </div>
                ))}
            </div>

            {/* Best Stands Worth Chasing */}
            <h2 className="text-2xl font-bold text-white mb-4">Best Stands Worth Chasing</h2>
            <p className="text-muted mb-6">
                This section is based on the site&apos;s local planner data, not on official patch notes. Use it as a browsing shortcut rather than a confirmed drop-value ranking.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
                <div className="bg-surface border border-border rounded-xl p-6">
                    <h3 className="text-sm font-bold text-accent-indigo uppercase tracking-wide mb-3">Best for PvP</h3>
                    <ul className="space-y-2">
                        {standsData.filter(s => s.tier.pvp === "S+" || s.tier.pvp === "S").slice(0, 4).map(s => (
                            <li key={s.id}>
                                <Link href={`/stands/${s.id}`} className="text-white hover:text-accent-blue transition-colors text-sm font-medium">
                                    {s.name} <span className="text-muted">({s.rarity})</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="bg-surface border border-border rounded-xl p-6">
                    <h3 className="text-sm font-bold text-green-400 uppercase tracking-wide mb-3">Best for PvE</h3>
                    <ul className="space-y-2">
                        {standsData.filter(s => s.tier.pve === "S+" || s.tier.pve === "S").slice(0, 4).map(s => (
                            <li key={s.id}>
                                <Link href={`/stands/${s.id}`} className="text-white hover:text-accent-blue transition-colors text-sm font-medium">
                                    {s.name} <span className="text-muted">({s.rarity})</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="bg-surface border border-border rounded-xl p-6">
                    <h3 className="text-sm font-bold text-yellow-400 uppercase tracking-wide mb-3">Beginner Friendly</h3>
                    <ul className="space-y-2">
                        {standsData.filter(s => s.rarity === "Uncommon" || s.rarity === "Common").filter(s => s.tier.overall !== "D").slice(0, 4).map(s => (
                            <li key={s.id}>
                                <Link href={`/stands/${s.id}`} className="text-white hover:text-accent-blue transition-colors text-sm font-medium">
                                    {s.name} <span className="text-muted">({s.rarity})</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Internal Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                <Link href="/build-planner" className="block bg-surface border border-border rounded-xl p-6 hover:border-accent-blue/50 transition-all group">
                    <span className="text-sm text-muted uppercase tracking-widest block mb-1">Plan Your Build</span>
                    <span className="text-lg font-bold text-white group-hover:text-accent-blue transition-colors">Open Build Planner →</span>
                </Link>
                <Link href="/tier-list" className="block bg-surface border border-border rounded-xl p-6 hover:border-accent-blue/50 transition-all group">
                    <span className="text-sm text-muted uppercase tracking-widest block mb-1">Full Rankings</span>
                    <span className="text-lg font-bold text-white group-hover:text-accent-blue transition-colors">View Tier List →</span>
                </Link>
            </div>

            {/* FAQ */}
            <h2 className="text-2xl font-bold text-white mb-4">FAQ</h2>
            <div className="space-y-4 mb-8">
                {faqItems.map((item) => (
                    <details key={item.question} className="group bg-surface border border-border rounded-lg [&_summary::-webkit-details-marker]:hidden">
                        <summary className="flex cursor-pointer items-center justify-between p-4 font-medium text-white">
                            {item.question}
                            <span className="transition group-open:rotate-180">
                                <ChevronRight className="h-5 w-5 text-muted rotate-90" />
                            </span>
                        </summary>
                        <div className="border-t border-border p-4 text-muted text-sm">
                            {item.answer}
                        </div>
                    </details>
                ))}
            </div>

            {/* Next Guide Nav */}
            <div className="mt-12">
                <Link href="/guides/best-builds" className="block w-full py-4 bg-surface border border-white/10 rounded-xl text-center hover:bg-white/5 hover:border-accent-blue transition-all group">
                    <span className="text-sm text-muted uppercase tracking-widest block mb-1">Next Guide</span>
                    <span className="text-xl font-bold text-white group-hover:text-accent-blue transition-colors flex items-center justify-center gap-2">
                        Best Builds for Every Playstyle <ChevronRight className="h-5 w-5" />
                    </span>
                </Link>
            </div>
        </div>
    );
}
