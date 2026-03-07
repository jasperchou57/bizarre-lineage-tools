import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, BarChart3, Heart, Zap, Shield, Wind, Sparkles } from "lucide-react";

export const metadata: Metadata = {
    title: "Stats Guide — What Each Stat Does & Best Builds | Bizarre Lineage",
    description: "Understand every stat in Bizarre Lineage: Vitality, Stand Power, Durability, Speed, and Special. Includes the best stat allocations for PvP, PvE, and beginners.",
};

const stats = [
    {
        name: "Vitality",
        icon: <Heart className="h-6 w-6 text-red-400" />,
        color: "border-red-500/30 bg-red-500/5",
        description: "Increases your maximum HP and base HP regeneration rate. This is the most universally useful stat because surviving one extra hit often decides an entire fight.",
        tip: "Vitality scales linearly — every point gives the same flat HP increase. There is no soft cap.",
        priority: "High for all playstyles",
    },
    {
        name: "Stand Power",
        icon: <Zap className="h-6 w-6 text-accent-blue" />,
        color: "border-accent-blue/30 bg-accent-blue/5",
        description: "Directly increases the damage dealt by all Stand abilities (E, R, Z, X, C, V). This is your primary offensive stat and the single biggest factor in kill speed for PvE grinding.",
        tip: "Stand Power has diminishing returns past roughly 70% allocation. Avoid dumping 100% here.",
        priority: "High for PvE, Medium-High for PvP",
    },
    {
        name: "Durability",
        icon: <Shield className="h-6 w-6 text-green-400" />,
        color: "border-green-500/30 bg-green-500/5",
        description: "Reduces incoming damage from all sources — both NPC enemies and other players. Works as a flat damage reduction percentage. Stacks multiplicatively with Vampire sustain and Boxing defense passives.",
        tip: "Extremely valuable at higher prestige levels where enemy damage spikes. Underrated by new players.",
        priority: "High for PvP Tanks, Medium for PvE",
    },
    {
        name: "Speed",
        icon: <Wind className="h-6 w-6 text-purple-400" />,
        color: "border-purple-500/30 bg-purple-500/5",
        description: "Increases movement speed and dash distance. Also slightly reduces the startup frames on some Stand abilities. Essential for hit-and-run playstyles and chasing down opponents in open world PvP.",
        tip: "Speed is the most Stand-dependent stat. Made in Heaven and King Crimson benefit massively; slow Stands like Killer Queen barely notice the difference.",
        priority: "High for Mobility Stands, Low otherwise",
    },
    {
        name: "Special",
        icon: <Sparkles className="h-6 w-6 text-yellow-400" />,
        color: "border-yellow-500/30 bg-yellow-500/5",
        description: "Increases the duration and effectiveness of special abilities (V moves). This includes Time Stop duration, Disc Extraction hold time, and buff durations like Cloud Suit. Also increases Sub-Ability damage.",
        tip: "Special is a \"win-more\" stat — it makes your best abilities better but does nothing for your weak points. Only invest heavily if your Stand has a powerful V move.",
        priority: "High for The World / Whitesnake, Low for most others",
    },
];

const presets = [
    {
        name: "Balanced PvP",
        tag: "Most Popular",
        tagColor: "bg-accent-blue/20 text-accent-blue",
        allocation: { vitality: "30%", standPower: "25%", durability: "20%", speed: "15%", special: "10%" },
        description: "The safest allocation for ranked PvP. Enough HP to survive burst combos, enough damage to threaten kills, and enough speed to not get kited.",
        bestFor: ["Star Platinum", "Stone Free", "C-Moon"],
    },
    {
        name: "Glass Cannon",
        tag: "High Risk",
        tagColor: "bg-red-500/20 text-red-400",
        allocation: { vitality: "10%", standPower: "45%", durability: "5%", speed: "25%", special: "15%" },
        description: "Maximum kill speed. You will delete enemies in PvE and two-shot most players in PvP — but you die to a stiff breeze. Only for confident players who never get hit.",
        bestFor: ["The World", "King Crimson", "Anubis"],
    },
    {
        name: "PvE Farmer",
        tag: "Best for Grinding",
        tagColor: "bg-green-500/20 text-green-400",
        allocation: { vitality: "20%", standPower: "40%", durability: "15%", speed: "15%", special: "10%" },
        description: "Optimized for quest grinding and boss farming. High Stand Power clears mobs fast, moderate Vitality keeps you alive between heals, and Speed reduces travel time between spawns.",
        bestFor: ["Weather Report", "Killer Queen", "Magician's Red"],
    },
    {
        name: "Unkillable Tank",
        tag: "Sustain",
        tagColor: "bg-green-500/20 text-green-400",
        allocation: { vitality: "35%", standPower: "10%", durability: "35%", speed: "10%", special: "10%" },
        description: "You will never die. Pair this with Vampire sub-ability and Crazy Diamond or Golden Experience for infinite sustain. Your damage is low, but you win by outlasting everyone.",
        bestFor: ["Crazy Diamond", "Golden Experience", "Stone Free"],
    },
    {
        name: "Beginner Safe",
        tag: "Recommended",
        tagColor: "bg-accent-indigo/20 text-accent-indigo",
        allocation: { vitality: "30%", standPower: "30%", durability: "20%", speed: "10%", special: "10%" },
        description: "The most forgiving allocation for new players. Balanced enough to handle any content without feeling squishy or dealing no damage. Respec later once you understand your Stand.",
        bestFor: ["Star Platinum", "Magician's Red", "Golden Experience"],
    },
];

const faqItems = [
    {
        question: "What is the best stat build in Bizarre Lineage?",
        answer: "There is no single best build — it depends on your Stand, playstyle, and whether you focus on PvP or PvE. For most players, the Balanced PvP preset (30% Vitality, 25% Stand Power, 20% Durability, 15% Speed, 10% Special) is the safest starting point.",
    },
    {
        question: "What does the Special stat do in Bizarre Lineage?",
        answer: "Special increases the duration and power of your Stand's V ability (like Time Stop, Disc Extraction) and also boosts Sub-Ability damage. It's most valuable on Stands with strong special moves like The World or Whitesnake.",
    },
    {
        question: "Can I reset my stats in Bizarre Lineage?",
        answer: "Yes, you can respec your stats by visiting the NPC near the spawn area. It costs in-game money, with the cost increasing based on your prestige level. There's no limit to how many times you can respec.",
    },
    {
        question: "Should beginners focus on Vitality or Stand Power?",
        answer: "Beginners should split roughly 30/30 between Vitality and Stand Power. Vitality keeps you alive while learning, and Stand Power ensures you can clear quests at a reasonable speed. Avoid dumping everything into one stat.",
    },
    {
        question: "Does Speed affect attack speed?",
        answer: "Speed primarily affects movement speed and dash distance. It slightly reduces startup frames on some moves, but it does not increase barrage speed or attack animation speed. For raw DPS, invest in Stand Power instead.",
    },
];

export default function StatsGuidePage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-sm text-muted mb-8">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-white">Guides</span>
                <ChevronRight className="h-4 w-4" />
                <span className="text-white">Stats</span>
            </div>

            {/* Hero */}
            <div className="flex items-center gap-4 mb-8">
                <BarChart3 className="h-12 w-12 text-accent-blue" />
                <h1 className="text-4xl font-heading font-extrabold text-white m-0">Bizarre Lineage Stats Guide</h1>
            </div>

            <p className="text-xl text-muted leading-relaxed mb-10">
                Stats are the foundation of every build in Bizarre Lineage. A bad stat allocation will cripple even an S+ Tier Stand, while smart stats can make a B Tier Stand punch way above its weight. This guide explains what each stat does, the best presets for every playstyle, and the mistakes that hold most players back.
            </p>

            {/* What Each Stat Does */}
            <div className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-bold text-white mb-6">What Each Stat Does</h2>
            </div>

            <div className="space-y-4 mb-12">
                {stats.map((stat) => (
                    <div key={stat.name} className={`border rounded-xl p-6 ${stat.color}`}>
                        <div className="flex items-center gap-3 mb-3">
                            {stat.icon}
                            <h3 className="text-xl font-bold text-white">{stat.name}</h3>
                            <span className="ml-auto text-xs font-mono text-muted bg-white/5 px-3 py-1 rounded-full">{stat.priority}</span>
                        </div>
                        <p className="text-muted leading-relaxed mb-3">{stat.description}</p>
                        <div className="bg-background/50 rounded-lg p-3 border border-white/5">
                            <p className="text-sm text-accent-blue font-medium">💡 {stat.tip}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Best Stat Presets */}
            <div className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-bold text-white mb-2">Best Stat Presets</h2>
                <p className="text-muted mb-6">
                    These are proven allocations tested in the current meta. Pick one as a starting point, then adjust based on your Stand. You can always <Link href="/build-planner" className="text-accent-blue hover:underline">open the Build Planner</Link> to simulate the full setup.
                </p>
            </div>

            <div className="space-y-6 mb-12">
                {presets.map((preset) => (
                    <div key={preset.name} className="bg-surface border border-border rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <h3 className="text-xl font-bold text-white">{preset.name}</h3>
                            <span className={`text-xs font-bold px-3 py-1 rounded-full ${preset.tagColor}`}>{preset.tag}</span>
                        </div>

                        {/* Stat bars */}
                        <div className="grid grid-cols-5 gap-2 mb-4">
                            {Object.entries(preset.allocation).map(([key, value]) => (
                                <div key={key} className="text-center">
                                    <div className="text-xs text-muted capitalize mb-1">{key === "standPower" ? "Stand Pwr" : key}</div>
                                    <div className="text-lg font-mono font-bold text-white">{value}</div>
                                </div>
                            ))}
                        </div>

                        <p className="text-muted text-sm leading-relaxed mb-3">{preset.description}</p>
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs text-muted">Best with:</span>
                            {preset.bestFor.map((stand) => (
                                <span key={stand} className="text-xs bg-white/5 border border-white/10 px-2 py-1 rounded text-white">{stand}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Common Mistakes */}
            <div className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-bold text-white mb-4">Common Stat Mistakes</h2>
            </div>

            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 mb-12">
                <ul className="space-y-3 text-red-200 m-0 list-none">
                    <li className="flex items-start gap-2">
                        <span className="text-red-400 font-bold shrink-0">✕</span>
                        <span><strong>Dumping 100% into Stand Power.</strong> You will one-shot mobs but die to everything. Even glass cannon builds need at least 10% Vitality.</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-red-400 font-bold shrink-0">✕</span>
                        <span><strong>Ignoring Speed on mobility Stands.</strong> Made in Heaven and King Crimson lose half their identity without Speed investment.</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-red-400 font-bold shrink-0">✕</span>
                        <span><strong>Maxing Special on Stands without a strong V move.</strong> If your Stand&apos;s V ability is mediocre (like Anubis or Red Hot Chili Pepper), Special points are wasted.</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-red-400 font-bold shrink-0">✕</span>
                        <span><strong>Never respeccing.</strong> Your stat needs change drastically between leveling, PvE farming, and endgame PvP. Respec is cheap — use it.</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-red-400 font-bold shrink-0">✕</span>
                        <span><strong>Spreading stats perfectly evenly (20/20/20/20/20).</strong> This sounds balanced but actually means you are mediocre at everything. Commit to a playstyle.</span>
                    </li>
                </ul>
            </div>

            {/* Internal Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                <Link href="/build-planner" className="block bg-surface border border-border rounded-xl p-6 hover:border-accent-blue/50 transition-all group">
                    <span className="text-sm text-muted uppercase tracking-widest block mb-1">Try Your Stats</span>
                    <span className="text-lg font-bold text-white group-hover:text-accent-blue transition-colors">Open Build Planner →</span>
                </Link>
                <Link href="/tier-list" className="block bg-surface border border-border rounded-xl p-6 hover:border-accent-blue/50 transition-all group">
                    <span className="text-sm text-muted uppercase tracking-widest block mb-1">Find Your Stand</span>
                    <span className="text-lg font-bold text-white group-hover:text-accent-blue transition-colors">View Tier List →</span>
                </Link>
                <Link href="/guides/best-builds" className="block bg-surface border border-border rounded-xl p-6 hover:border-accent-blue/50 transition-all group">
                    <span className="text-sm text-muted uppercase tracking-widest block mb-1">Complete Setups</span>
                    <span className="text-lg font-bold text-white group-hover:text-accent-blue transition-colors">Best Builds Guide →</span>
                </Link>
                <Link href="/guides/leveling" className="block bg-surface border border-border rounded-xl p-6 hover:border-accent-blue/50 transition-all group">
                    <span className="text-sm text-muted uppercase tracking-widest block mb-1">Level Faster</span>
                    <span className="text-lg font-bold text-white group-hover:text-accent-blue transition-colors">Leveling Guide →</span>
                </Link>
            </div>

            {/* FAQ */}
            <div className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-bold text-white mb-4">FAQ</h2>
            </div>
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
                <Link href="/guides/stand-chances" className="block w-full py-4 bg-surface border border-white/10 rounded-xl text-center hover:bg-white/5 hover:border-accent-blue transition-all group">
                    <span className="text-sm text-muted uppercase tracking-widest block mb-1">Next Guide</span>
                    <span className="text-xl font-bold text-white group-hover:text-accent-blue transition-colors flex items-center justify-center gap-2">
                        Stand Chances & Rarity <ChevronRight className="h-5 w-5" />
                    </span>
                </Link>
            </div>
        </div>
    );
}
