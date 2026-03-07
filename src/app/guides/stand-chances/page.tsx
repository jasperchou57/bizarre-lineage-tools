import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Dice6, Gem, Crown, Star, Sparkles, CircleDot } from "lucide-react";
import standsData from "@/data/stands.json";

export const metadata: Metadata = {
    title: "Stand Chances & Rarity Guide — All Drop Rates | Bizarre Lineage",
    description: "Every Stand rarity and drop rate in Bizarre Lineage. Learn the exact chances for Common, Uncommon, Rare, Legendary, and Mythical Stands from the Stand Arrow.",
};

const rarityTiers = [
    {
        name: "Common",
        chance: "45%",
        color: "text-gray-400",
        borderColor: "border-gray-500/30",
        bgColor: "bg-gray-500/5",
        badgeColor: "bg-gray-500/20 text-gray-300",
        icon: <CircleDot className="h-6 w-6 text-gray-400" />,
        description: "Nearly half of all rolls land here. Common Stands are weak but serve as stepping stones for learning game mechanics. Replace them as soon as you roll something better.",
    },
    {
        name: "Uncommon",
        chance: "30%",
        color: "text-green-400",
        borderColor: "border-green-500/30",
        bgColor: "bg-green-500/5",
        badgeColor: "bg-green-500/20 text-green-400",
        icon: <Star className="h-6 w-6 text-green-400" />,
        description: "Solid starter Stands that can carry you through most PvE content. Uncommon Stands like Crazy Diamond and Golden Experience are strong enough for mid-game progression.",
    },
    {
        name: "Rare",
        chance: "15%",
        color: "text-blue-400",
        borderColor: "border-blue-500/30",
        bgColor: "bg-blue-500/5",
        badgeColor: "bg-blue-500/20 text-blue-400",
        icon: <Gem className="h-6 w-6 text-blue-400" />,
        description: "The sweet spot. Rare Stands are powerful enough for competitive play and obtainable within a few Arrow uses. Weather Report and Stone Free are both Rare and sit comfortably in S and A Tier.",
    },
    {
        name: "Legendary",
        chance: "8%",
        color: "text-purple-400",
        borderColor: "border-purple-500/30",
        bgColor: "bg-purple-500/5",
        badgeColor: "bg-purple-500/20 text-purple-400",
        icon: <Crown className="h-6 w-6 text-purple-400" />,
        description: "Top-tier Stands that define the meta. Expect to use 10-15 Stand Arrows on average before pulling a Legendary. Stands like Star Platinum, The World, and King Crimson are all Legendary.",
    },
    {
        name: "Mythical",
        chance: "2%",
        color: "text-yellow-400",
        borderColor: "border-yellow-500/30",
        bgColor: "bg-yellow-500/5",
        badgeColor: "bg-yellow-500/20 text-yellow-400",
        icon: <Sparkles className="h-6 w-6 text-yellow-400" />,
        description: "The rarest tier in the game. On average, you need 50 Stand Arrows to pull a Mythical. Whitesnake is currently the only Mythical Stand and dominates both PvP and PvE at S+ Tier.",
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
        description: "Stand Arrows cost money. Farm enough to buy 10-15 Arrows in one session so you can chain rolls without stopping. Use our Leveling Guide to earn money fast.",
    },
    {
        title: "Don't reroll good Rare Stands",
        description: "Weather Report (S Tier PvE), Stone Free (A Tier), and Killer Queen (A Tier PvE) are all Rare. Many players waste Arrows chasing Legendaries when their Rare Stand is already competitive.",
    },
    {
        title: "Evolution Stands bypass the Arrow",
        description: "Made in Heaven, C-Moon, and The World: High Voltage are obtained through evolution, not rolling. Check the specific Stand page for evolution requirements.",
    },
    {
        title: "2x Event weekends",
        description: "The developers occasionally run double drop rate events (usually weekends). Your Legendary chance doubles from 8% to 16% during these events. Save your Arrows for these.",
    },
];

const faqItems = [
    {
        question: "What is the rarest Stand in Bizarre Lineage?",
        answer: "Whitesnake is the only Mythical rarity Stand, with a 2% drop rate from the Stand Arrow. It is the rarest directly obtainable Stand in the game.",
    },
    {
        question: "How rare is Whitesnake in Bizarre Lineage?",
        answer: "Whitesnake has a 2% (Mythical) drop rate. On average, you need approximately 50 Stand Arrow uses to pull it. During 2x events, this drops to roughly 25 attempts.",
    },
    {
        question: "What are the Stand Arrow drop rates?",
        answer: "Common: 45%, Uncommon: 30%, Rare: 15%, Legendary: 8%, Mythical: 2%. These rates apply to every Stand Arrow use unless a special event is active.",
    },
    {
        question: "Can I get Made in Heaven from the Stand Arrow?",
        answer: "No. Made in Heaven is an evolution Stand obtained by evolving C-Moon, which itself evolves from Whitesnake. It cannot be rolled directly from the Stand Arrow.",
    },
    {
        question: "Are evolution Stands part of normal rolls?",
        answer: "No. Evolution Stands (Made in Heaven, C-Moon, The World: High Voltage) can only be obtained through their specific evolution paths, not from the Stand Arrow pool.",
    },
];

export default function StandChancesPage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-sm text-muted mb-8">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-white">Guides</span>
                <ChevronRight className="h-4 w-4" />
                <span className="text-white">Stand Chances</span>
            </div>

            {/* Hero */}
            <div className="flex items-center gap-4 mb-8">
                <Dice6 className="h-12 w-12 text-accent-indigo" />
                <h1 className="text-4xl font-heading font-extrabold text-white m-0">Stand Chances & Rarity Guide</h1>
            </div>

            <p className="text-xl text-muted leading-relaxed mb-10">
                Every Stand in Bizarre Lineage has a rarity tier that determines how likely you are to roll it from a Stand Arrow. This guide covers the exact drop rates for every tier, which Stands fall into each category, and how to maximize your odds of pulling the Stand you want.
            </p>

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
                Not every Legendary or Mythical Stand is worth the Arrow investment. Here are the top targets by role:
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

            {/* JSON-LD FAQ Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": faqItems.map((item) => ({
                            "@type": "Question",
                            "name": item.question,
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": item.answer,
                            },
                        })),
                    }),
                }}
            />

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
