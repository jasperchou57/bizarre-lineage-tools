import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Wrench, Sword, Activity, Shield, Zap, Users } from "lucide-react";

export const metadata: Metadata = {
    title: "Best Builds for PvP, PvE & Beginners | Bizarre Lineage",
    description: "The top Bizarre Lineage builds for every playstyle. Complete Stand + Fighting Style + Sub-Ability setups with stat advice. Open any build directly in the Planner.",
};

interface Build {
    name: string;
    stand: { id: string; name: string };
    style: { id: string; name: string };
    sub: { id: string; name: string };
    description: string;
    strengths: string[];
    statFocus: string;
}

interface BuildCategory {
    title: string;
    subtitle: string;
    icon: React.ReactNode;
    accentColor: string;
    builds: Build[];
}

const categories: BuildCategory[] = [
    {
        title: "Best PvP Builds",
        subtitle: "For ranked fights, 1v1s, and open world PvP",
        icon: <Sword className="h-6 w-6 text-red-400" />,
        accentColor: "border-red-500/30",
        builds: [
            {
                name: "The Untouchable Assassin",
                stand: { id: "king-crimson", name: "King Crimson" },
                style: { id: "boxing", name: "Boxing" },
                sub: { id: "vampire", name: "Vampire" },
                description: "The highest skill-ceiling PvP build in the game. Time Erase lets you phase through attacks and reposition for free, Boxing extends your combos after Epitaph counters, and Vampire sustain means you can outlast anyone in extended fights.",
                strengths: ["Invisible engages with Time Erase", "Epitaph counters punish aggressive players", "Vampire lifesteal sustains through trades"],
                statFocus: "30% Vitality, 25% Stand Power, 10% Durability, 25% Speed, 10% Special",
            },
            {
                name: "The Speed Demon",
                stand: { id: "made-in-heaven", name: "Made in Heaven" },
                style: { id: "kendo", name: "Kendo" },
                sub: { id: "vampire", name: "Vampire" },
                description: "Unmatched mobility makes this build impossible to pin down. Double Accel + Time Acceleration turns you into a blur that hits before enemies can react. Kendo's Counter Stance punishes anyone who tries to trade, and Vampire keeps your HP topped off between engages.",
                strengths: ["Fastest Stand in the game", "Hit-and-run playstyle dominates open world", "Counter Stance catches aggressive players"],
                statFocus: "20% Vitality, 20% Stand Power, 5% Durability, 40% Speed, 15% Special",
            },
            {
                name: "The CC Machine",
                stand: { id: "whitesnake", name: "Whitesnake" },
                style: { id: "boxing", name: "Boxing" },
                sub: { id: "hamon", name: "Hamon" },
                description: "The best control build in the game. Whitesnake's Disc Extraction disables enemy Stands entirely, Acid Rupture controls space, and Boxing extends your combo windows. Hamon boosts your already strong damage and gives HP regen for sustain. Dominant in both 1v1 and team fights.",
                strengths: ["Disc Extraction wins fights by itself", "Best CC chain in the game", "Strong at every range"],
                statFocus: "30% Vitality, 30% Stand Power, 15% Durability, 10% Speed, 15% Special",
            },
        ],
    },
    {
        title: "Best PvE / Farming Builds",
        subtitle: "For quest grinding, boss farming, and leveling",
        icon: <Activity className="h-6 w-6 text-green-400" />,
        accentColor: "border-green-500/30",
        builds: [
            {
                name: "The AoE Farmer",
                stand: { id: "weather-report", name: "Weather Report" },
                style: { id: "karate", name: "Karate" },
                sub: { id: "spin", name: "Spin" },
                description: "The undisputed king of PvE farming. Weather Report's screen-wide AoE clears entire mob packs in seconds. Karate adds Tatsumaki for even more AoE coverage, and Spin's ranged pressure handles stragglers. Cloud Suit mobility lets you fly between spawn points.",
                strengths: ["Largest AoE coverage in the game", "Cloud Suit mobility between packs", "Clears quest mobs in one rotation"],
                statFocus: "20% Vitality, 40% Stand Power, 15% Durability, 15% Speed, 10% Special",
            },
            {
                name: "The Budget Farmer",
                stand: { id: "magicians-red", name: "Magician's Red" },
                style: { id: "boxing", name: "Boxing" },
                sub: { id: "hamon", name: "Hamon" },
                description: "The best PvE build you can get within your first few hours. Magician's Red is Uncommon (easy to roll), has massive AoE with Eruption and Cross Fire Hurricane, and Hamon's damage bonus makes quest clears even faster. Perfect for new accounts grinding their first prestige.",
                strengths: ["Uncommon rarity — easy to obtain", "Huge AoE with Eruption", "Hamon bonus damage speeds up clears"],
                statFocus: "25% Vitality, 35% Stand Power, 20% Durability, 10% Speed, 10% Special",
            },
            {
                name: "The Solo Boss Killer",
                stand: { id: "the-world", name: "The World" },
                style: { id: "boxing", name: "Boxing" },
                sub: { id: "vampire", name: "Vampire" },
                description: "Time Stop + Road Roller deals the highest single-target burst in the game. This build melts bosses during the 5-second freeze window. Boxing fills in damage between cooldowns, and Vampire sustain lets you solo bosses that normally require a party.",
                strengths: ["Highest burst damage combo", "5-second Time Stop is massive", "Vampire sustain enables solo boss runs"],
                statFocus: "25% Vitality, 30% Stand Power, 10% Durability, 10% Speed, 25% Special",
            },
        ],
    },
    {
        title: "Best Beginner Builds",
        subtitle: "Easy to obtain and forgiving to play",
        icon: <Users className="h-6 w-6 text-accent-blue" />,
        accentColor: "border-accent-blue/30",
        builds: [
            {
                name: "The Safe All-Rounder",
                stand: { id: "star-platinum", name: "Star Platinum" },
                style: { id: "boxing", name: "Boxing" },
                sub: { id: "hamon", name: "Hamon" },
                description: "Star Platinum is the textbook beginner Stand — straightforward combos, Time Stop for clutch moments, and A Tier in both PvP and PvE. Boxing is the easiest fighting style to learn, and Hamon adds raw damage without requiring complex mechanics. You can comfortably reach Prestige 3 with this setup.",
                strengths: ["Simple, effective combos", "Time Stop bails you out of bad situations", "Works well in every game mode"],
                statFocus: "30% Vitality, 30% Stand Power, 20% Durability, 10% Speed, 10% Special",
            },
            {
                name: "The Unkillable Healer",
                stand: { id: "crazy-diamond", name: "Crazy Diamond" },
                style: { id: "boxing", name: "Boxing" },
                sub: { id: "hamon", name: "Hamon" },
                description: "Can't lose if you can't die. Crazy Diamond's Restore heals you constantly, Rock Trap provides strong CC for setting up combos, and the combo potential with Boxing is incredible if you hit your skills. The most forgiving build in the game — you can make mistakes and heal through them.",
                strengths: ["Infinite self-healing", "Very forgiving of mistakes", "Strong combo potential with Rock Trap"],
                statFocus: "35% Vitality, 20% Stand Power, 25% Durability, 10% Speed, 10% Special",
            },
        ],
    },
    {
        title: "Best Glass Cannon Builds",
        subtitle: "Maximum damage, minimum survivability",
        icon: <Zap className="h-6 w-6 text-yellow-400" />,
        accentColor: "border-yellow-500/30",
        builds: [
            {
                name: "The Time Stop One-Shot",
                stand: { id: "the-world", name: "The World" },
                style: { id: "karate", name: "Karate" },
                sub: { id: "vampire", name: "Vampire" },
                description: "The highest damage combo in the game: Time Stop → Knife Throw → Road Roller → Karate follow-up. If you land Time Stop, the fight is over. The risk? Miss your TS and you're a sitting duck with high cooldowns. Vampire partially offsets the squishiness.",
                strengths: ["Kills any Stand in one Time Stop combo", "Road Roller has the highest single-hit damage", "Vampire provides emergency sustain"],
                statFocus: "10% Vitality, 40% Stand Power, 5% Durability, 20% Speed, 25% Special",
            },
            {
                name: "The Bleed Assassin",
                stand: { id: "anubis", name: "Anubis" },
                style: { id: "kendo", name: "Kendo" },
                sub: { id: "hamon", name: "Hamon" },
                description: "Pure melee devastation. Anubis has the highest raw DPS in the game, Possession Strike bypasses block, and Kendo's sword synergy creates seamless combo chains. Hamon amplifies the already insane damage. Zero ranged options means you have to commit, but if you get in, nobody survives.",
                strengths: ["Highest melee DPS", "Block bypass on Possession Strike", "Kendo sword synergy is seamless"],
                statFocus: "15% Vitality, 45% Stand Power, 5% Durability, 25% Speed, 10% Special",
            },
        ],
    },
    {
        title: "Best Tank / Sustain Builds",
        subtitle: "Outlast everyone in long fights",
        icon: <Shield className="h-6 w-6 text-green-400" />,
        accentColor: "border-green-500/30",
        builds: [
            {
                name: "The Immortal Wall",
                stand: { id: "crazy-diamond", name: "Crazy Diamond" },
                style: { id: "boxing", name: "Boxing" },
                sub: { id: "vampire", name: "Vampire" },
                description: "Double healing — Crazy Diamond's Restore plus Vampire lifesteal — makes you nearly unkillable. Boxing's damage keeps you relevant in fights, and Rock Trap CC means enemies can't just ignore you. The ultimate war-of-attrition build for patient players who win by never dying.",
                strengths: ["Double healing sources", "Rock Trap forces engagement", "Extremely hard to kill"],
                statFocus: "35% Vitality, 10% Stand Power, 35% Durability, 10% Speed, 10% Special",
            },
            {
                name: "The Iron Fortress",
                stand: { id: "stone-free", name: "Stone Free" },
                style: { id: "boxing", name: "Boxing" },
                sub: { id: "vampire", name: "Vampire" },
                description: "Stone Free's versatility combined with Vampire sustain creates a build that has an answer for everything. String Bind immobilizes aggressive rushers, Mobius Strip deflects projectiles, and Vampire keeps your HP up through extended fights. Not the flashiest build, but incredibly consistent.",
                strengths: ["Answer for every matchup", "String Bind is excellent peel", "Mobius Strip counters ranged Stands"],
                statFocus: "30% Vitality, 15% Stand Power, 30% Durability, 15% Speed, 10% Special",
            },
        ],
    },
];

const faqItems = [
    {
        question: "What is the best build in Bizarre Lineage?",
        answer: "It depends on your playstyle. For PvP, King Crimson + Boxing + Vampire is the highest skill-ceiling build. For PvE farming, Weather Report + Karate + Spin clears the fastest. For beginners, Star Platinum + Boxing + Hamon is the safest all-rounder.",
    },
    {
        question: "What is the best Stand for PvP in Bizarre Lineage?",
        answer: "King Crimson, Made in Heaven, and Whitesnake are the top three PvP Stands. King Crimson dominates 1v1s, Made in Heaven excels in open world, and Whitesnake's Disc Extraction is the strongest single ability in PvP.",
    },
    {
        question: "What is the best beginner build?",
        answer: "Star Platinum + Boxing + Hamon. Star Platinum is A Tier in both PvP and PvE, Boxing is easy to learn with high damage, and Hamon adds straightforward damage bonuses without complex mechanics.",
    },
    {
        question: "How is this different from the Tier List?",
        answer: "The Tier List ranks individual Stands by power level. This page recommends complete builds — Stand + Fighting Style + Sub-Ability — optimized for specific scenarios like PvP, PvE, or beginner play. Use the Tier List to compare Stands, use this page to find ready-to-use setups.",
    },
    {
        question: "Can I use these builds at any prestige level?",
        answer: "Most builds work at any prestige. The main exception is builds using Legendary or Mythical Stands — you may need to use a budget alternative while farming for your target Stand. Check our Stand Chances guide for obtainability details.",
    },
];

export default function BestBuildsPage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-sm text-muted mb-8">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-white">Guides</span>
                <ChevronRight className="h-4 w-4" />
                <span className="text-white">Best Builds</span>
            </div>

            {/* Hero */}
            <div className="flex items-center gap-4 mb-8">
                <Wrench className="h-12 w-12 text-accent-indigo" />
                <h1 className="text-4xl font-heading font-extrabold text-white m-0">Best Builds in Bizarre Lineage</h1>
            </div>

            <p className="text-xl text-muted leading-relaxed mb-4">
                Stop guessing. These are the strongest complete builds for every playstyle in the current meta — each one includes a Stand, Fighting Style, Sub-Ability, and recommended stat allocation. Every build links directly to the <Link href="/build-planner" className="text-accent-blue hover:underline">Build Planner</Link> so you can customize it further.
            </p>

            <p className="text-sm text-muted mb-10">
                Looking for individual Stand rankings instead? Check the <Link href="/tier-list" className="text-accent-blue hover:underline">full Tier List</Link> for all Stands ranked by PvP, PvE, and overall power.
            </p>

            {/* Build Categories */}
            <div className="space-y-16">
                {categories.map((category) => (
                    <section key={category.title}>
                        <div className="flex items-center gap-3 mb-2">
                            {category.icon}
                            <h2 className="text-2xl font-bold text-white">{category.title}</h2>
                        </div>
                        <p className="text-muted mb-6">{category.subtitle}</p>

                        <div className="space-y-6">
                            {category.builds.map((build) => (
                                <div key={build.name} className={`bg-surface border rounded-xl overflow-hidden ${category.accentColor}`}>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-white mb-4">{build.name}</h3>

                                        {/* Build Components */}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            <Link href={`/stands/${build.stand.id}`} className="px-3 py-1.5 bg-accent-blue/10 border border-accent-blue/20 rounded-lg text-sm font-medium text-accent-blue hover:bg-accent-blue/20 transition-colors">
                                                {build.stand.name}
                                            </Link>
                                            <Link href={`/fighting-styles/${build.style.id}`} className="px-3 py-1.5 bg-accent-indigo/10 border border-accent-indigo/20 rounded-lg text-sm font-medium text-accent-indigo hover:bg-accent-indigo/20 transition-colors">
                                                {build.style.name}
                                            </Link>
                                            <Link href={`/sub-abilities/${build.sub.id}`} className="px-3 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-lg text-sm font-medium text-purple-400 hover:bg-purple-500/20 transition-colors">
                                                {build.sub.name}
                                            </Link>
                                        </div>

                                        <p className="text-muted text-sm leading-relaxed mb-4">{build.description}</p>

                                        {/* Strengths */}
                                        <div className="mb-4">
                                            <h4 className="text-xs font-bold text-green-400 uppercase tracking-wide mb-2">Why This Works</h4>
                                            <ul className="space-y-1">
                                                {build.strengths.map((s) => (
                                                    <li key={s} className="text-sm text-muted flex items-center gap-2">
                                                        <span className="text-green-400">✓</span> {s}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Stat Focus */}
                                        <div className="bg-background/50 rounded-lg p-3 border border-white/5 mb-4">
                                            <span className="text-xs font-bold text-muted uppercase tracking-wide">Recommended Stats: </span>
                                            <span className="text-sm text-white font-mono">{build.statFocus}</span>
                                        </div>

                                        {/* CTA */}
                                        <Link
                                            href={`/build-planner?stand=${build.stand.id}&style=${build.style.id}&sub=${build.sub.id}`}
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent-blue to-accent-indigo text-white text-sm font-bold rounded-lg hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] transition-all"
                                        >
                                            Open in Build Planner <ChevronRight className="h-4 w-4" />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                ))}
            </div>

            {/* Internal Links */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-16 mb-12">
                <Link href="/tier-list" className="block bg-surface border border-border rounded-xl p-6 hover:border-accent-blue/50 transition-all group">
                    <span className="text-sm text-muted uppercase tracking-widest block mb-1">Compare Stands</span>
                    <span className="text-lg font-bold text-white group-hover:text-accent-blue transition-colors">View Tier List →</span>
                </Link>
                <Link href="/guides/stats" className="block bg-surface border border-border rounded-xl p-6 hover:border-accent-blue/50 transition-all group">
                    <span className="text-sm text-muted uppercase tracking-widest block mb-1">Optimize Stats</span>
                    <span className="text-lg font-bold text-white group-hover:text-accent-blue transition-colors">Stats Guide →</span>
                </Link>
                <Link href="/guides/stand-chances" className="block bg-surface border border-border rounded-xl p-6 hover:border-accent-blue/50 transition-all group">
                    <span className="text-sm text-muted uppercase tracking-widest block mb-1">Get Your Stand</span>
                    <span className="text-lg font-bold text-white group-hover:text-accent-blue transition-colors">Stand Chances →</span>
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
        </div>
    );
}
