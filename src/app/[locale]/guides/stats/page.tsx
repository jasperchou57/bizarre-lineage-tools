import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ChevronRight, BarChart3, Heart, Zap, Shield, Sword, Flame, Sparkles } from "lucide-react";
import { withCanonical } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Guides" });
    return withCanonical({
        title: t("stats.metaTitle"),
        description: t("stats.metaDescription"),
    }, "/guides/stats");
}

const stats = [
    {
        name: "Strength",
        icon: <Zap className="h-6 w-6 text-red-400" />,
        color: "border-red-500/30 bg-red-500/5",
        description: "Increases your physical-based attacks — specifically any red damage that is NOT from your Stand. This covers M1 punches, kicks, and other non-Stand melee damage.",
        tip: "Strength is important for Boxing and Karate users who rely on fighting style M1 chains to extend combos.",
        priority: "High for Melee / M1 builds",
    },
    {
        name: "Health",
        icon: <Heart className="h-6 w-6 text-green-400" />,
        color: "border-green-500/30 bg-green-500/5",
        description: "Increases your character's maximum health (Base HP + bonus HP). It is one of the most widely useful stats because surviving one extra hit often changes a fight.",
        tip: "Health is valuable for every playstyle. Even glass cannon builds need some Health investment to avoid getting one-shot.",
        priority: "High for all playstyles",
    },
    {
        name: "Power",
        icon: <Sparkles className="h-6 w-6 text-accent-blue" />,
        color: "border-accent-blue/30 bg-accent-blue/5",
        description: "Increases your Sub-Ability damage and maximum Power meter. This stat directly scales Hamon, Vampire, and Cyborg ability damage.",
        tip: "If you invested in a Sub-Ability, you need Power to make it hit hard. Without Power, your Sub moves will feel like tickles.",
        priority: "High for Sub-Ability users",
    },
    {
        name: "Weapon",
        icon: <Sword className="h-6 w-6 text-purple-400" />,
        color: "border-purple-500/30 bg-purple-500/5",
        description: "Increases your slash damage and weapon damage. This applies to equippable weapons like the Stop Sign, Shadow Axe, Odachi, Katana, and also to Anubis (a sword-based Stand).",
        tip: "Only invest in Weapon if you actively use a weapon or Anubis. For most Stand-only builds, these points are better spent elsewhere.",
        priority: "High for Weapon / Anubis users, Skip otherwise",
    },
    {
        name: "Destructive Power",
        icon: <Flame className="h-6 w-6 text-orange-400" />,
        color: "border-orange-500/30 bg-orange-500/5",
        description: "Increases your Stand's physical-based attacks — specifically the red damage hit markers from Stand moves. For many Stands, this is one of the main damage stats that affects clear speed and combo threat.",
        tip: "Destructive Power is a common priority for many Stands unless your move set leans more heavily on energy-based attacks.",
        priority: "High for most Stands",
    },
    {
        name: "Destructive Energy",
        icon: <Shield className="h-6 w-6 text-yellow-400" />,
        color: "border-yellow-500/30 bg-yellow-500/5",
        description: "Increases your Stand's special ability damage — specifically the blue damage hit markers from Stand moves. Stands that deal blue damage (energy-based attacks) scale with this stat instead of Destructive Power.",
        tip: "Check your Stand's hit marker colors: red damage scales with Destructive Power, blue damage scales with Destructive Energy. Some Stands use both.",
        priority: "High for Energy-based Stands",
    },
];

const presets = [
    {
        name: "Balanced PvP",
        tag: "Most Popular",
        tagColor: "bg-accent-blue/20 text-accent-blue",
        allocation: { strength: "10%", health: "25%", power: "10%", weapon: "0%", destrPower: "35%", destrEnergy: "20%" },
        description: "A balanced site-maintained PvP starting point. It keeps a moderate HP buffer, leans into Destructive Power, and still leaves some coverage for Destructive Energy builds.",
        bestFor: ["Star Platinum", "Stone Free", "C-Moon"],
    },
    {
        name: "Glass Cannon",
        tag: "High Risk",
        tagColor: "bg-red-500/20 text-red-400",
        allocation: { strength: "5%", health: "10%", power: "5%", weapon: "0%", destrPower: "50%", destrEnergy: "30%" },
        description: "A high-risk site preset that leans heavily into Stand damage. It trades durability for faster kill pressure and usually needs cleaner execution.",
        bestFor: ["The World", "King Crimson", "Anubis"],
    },
    {
        name: "PvE Farmer",
        tag: "Best for Grinding",
        tagColor: "bg-green-500/20 text-green-400",
        allocation: { strength: "5%", health: "20%", power: "10%", weapon: "0%", destrPower: "40%", destrEnergy: "25%" },
        description: "A farming-oriented site preset for quests and bosses. It puts more weight on damage stats while keeping enough Health to avoid folding immediately in longer runs.",
        bestFor: ["Weather Report", "Killer Queen", "Magician's Red"],
    },
    {
        name: "Sub-Ability Focus",
        tag: "Sustain",
        tagColor: "bg-green-500/20 text-green-400",
        allocation: { strength: "10%", health: "25%", power: "30%", weapon: "0%", destrPower: "20%", destrEnergy: "15%" },
        description: "A sub-focused site preset with heavier Power investment. It is meant for builds where Hamon, Vampire, or Cyborg make up a meaningful part of your damage or sustain loop.",
        bestFor: ["Crazy Diamond", "Golden Experience", "Stone Free"],
    },
    {
        name: "Beginner Safe",
        tag: "Recommended",
        tagColor: "bg-accent-indigo/20 text-accent-indigo",
        allocation: { strength: "10%", health: "25%", power: "10%", weapon: "0%", destrPower: "35%", destrEnergy: "20%" },
        description: "A forgiving site-maintained starting point for newer players. It stays fairly even across damage and survivability so you can respec later once you understand your Stand better.",
        bestFor: ["Star Platinum", "Magician's Red", "Golden Experience"],
    },
];

const faqItems = [
    {
        question: "What is the best stat build in Bizarre Lineage?",
        answer: "There is no single best build — it depends on your Stand, playstyle, and whether you focus on PvP or PvE. On this site, a balanced allocation with high Health and Destructive Power is used as a common starting point.",
    },
    {
        question: "What is the difference between Destructive Power and Destructive Energy?",
        answer: "Destructive Power increases your Stand's physical attacks (red damage hit markers). Destructive Energy increases your Stand's special ability damage (blue damage hit markers). Check your Stand's hit colors to know which stat to invest in.",
    },
    {
        question: "What does the Power stat do in Bizarre Lineage?",
        answer: "Power increases your Sub-Ability damage (Hamon, Vampire, Cyborg) and your maximum Power meter. It does NOT affect Stand damage — that is covered by Destructive Power and Destructive Energy.",
    },
    {
        question: "Can I reset my stats in Bizarre Lineage?",
        answer: "Yes, you can respec your stats using a Stat Point Essence, which can be purchased from the Prestige Shop or Rahaj's Shop. There is no limit to how many times you can respec.",
    },
    {
        question: "Should I invest in the Weapon stat?",
        answer: "Only if you actively use a weapon (Stop Sign, Shadow Axe, Odachi, Katana, etc.) or Anubis. For most Stand-only builds, Weapon points are usually better spent on Destructive Power or Health instead.",
    },
    {
        question: "Should beginners focus on Health or Destructive Power?",
        answer: "Beginners should invest heavily in both Health and Destructive Power. Health keeps you alive while learning, and Destructive Power ensures you can clear quests at a reasonable speed. Avoid dumping everything into one stat.",
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
                Stats are the foundation of every build in Bizarre Lineage. This guide explains what each stat does, how the public stat definitions map to gameplay, and which site-maintained presets can serve as a practical starting point.
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
                    These are site-maintained starting points built around the local planner dataset. Pick one as a baseline, then adjust based on your Stand. You can always <Link href="/build-planner" className="text-accent-blue hover:underline">open the Build Planner</Link> to compare the same setup in the planner.
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
                        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-4">
                            {Object.entries(preset.allocation).map(([key, value]) => {
                                const labels: Record<string, string> = {
                                    strength: "STR",
                                    health: "HP",
                                    power: "PWR",
                                    weapon: "WPN",
                                    destrPower: "D.Power",
                                    destrEnergy: "D.Energy",
                                };
                                return (
                                <div key={key} className="text-center">
                                    <div className="text-xs text-muted mb-1">{labels[key] || key}</div>
                                    <div className="text-lg font-mono font-bold text-white">{value}</div>
                                </div>
                                );
                            })}
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
                        <span><strong>Dumping 100% into Destructive Power.</strong> You will one-shot mobs but die to everything. Even glass cannon builds need at least 10% Health.</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-red-400 font-bold shrink-0">✕</span>
                        <span><strong>Ignoring Weapon on Anubis.</strong> Anubis is a sword Stand — its damage scales with the Weapon stat, not just Destructive Power. Skipping Weapon on Anubis severely limits your damage.</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-red-400 font-bold shrink-0">✕</span>
                        <span><strong>Investing in Power without a Sub-Ability.</strong> Power only boosts Sub-Ability damage. If you have not unlocked Hamon, Vampire, or Cyborg yet, those points are completely wasted.</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-red-400 font-bold shrink-0">✕</span>
                        <span><strong>Confusing Destructive Power and Destructive Energy.</strong> Check your Stand&apos;s hit marker colors: red = Destructive Power, blue = Destructive Energy. Investing in the wrong one wastes points.</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-red-400 font-bold shrink-0">✕</span>
                        <span><strong>Never respeccing.</strong> Your stat needs change drastically between leveling, PvE farming, and endgame PvP. Use a Stat Point Essence to respec whenever your build shifts.</span>
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
