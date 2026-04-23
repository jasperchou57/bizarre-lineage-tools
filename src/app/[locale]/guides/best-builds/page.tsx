import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ChevronRight, Wrench, Sword, Activity, Shield, Zap, Users } from "lucide-react";
import { withCanonical } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Guides" });
    return withCanonical({
        title: t("bestBuilds.metaTitle"),
        description: t("bestBuilds.metaDescription"),
    }, "/guides/best-builds");
}

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
                description: "A popular PvP-focused setup in this site's planner. Time Erase supports resets and repositioning, Boxing extends punish windows after successful reads, and Vampire adds sustain in longer trades.",
                strengths: ["Time Erase supports safe re-engages", "Counter windows convert well into Boxing follow-ups", "Vampire sustain helps in longer trades"],
                statFocus: "25% Health, 35% Destructive Power, 20% Destructive Energy, 10% Power, 10% Strength",
            },
            {
                name: "The Speed Demon",
                stand: { id: "made-in-heaven", name: "Made in Heaven" },
                style: { id: "kendo", name: "Kendo" },
                sub: { id: "vampire", name: "Vampire" },
                description: "A mobility-heavy setup built around Made in Heaven's movement tools. Acceleration helps you pressure or disengage quickly, Kendo adds a clean follow-up option, and Vampire helps smooth out extended skirmishes.",
                strengths: ["Very high movement ceiling", "Comfortable hit-and-run pressure", "Kendo follow-ups punish overcommits"],
                statFocus: "20% Health, 30% Destructive Power, 25% Destructive Energy, 15% Power, 10% Strength",
            },
            {
                name: "The CC Machine",
                stand: { id: "whitesnake", name: "Whitesnake" },
                style: { id: "boxing", name: "Boxing" },
                sub: { id: "hamon", name: "Hamon" },
                description: "A control-oriented setup that this site tags as a strong PvP option. Disc Extraction and Acid Rupture create disruption windows, while Boxing and Hamon give you a straightforward follow-up plan.",
                strengths: ["Multiple disruption tools", "Works across mid and close range", "Hamon helps sustain pressure"],
                statFocus: "25% Health, 30% Destructive Power, 20% Destructive Energy, 15% Power, 10% Strength",
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
                sub: { id: "hamon", name: "Hamon" },
                description: "A PvE-oriented farming suggestion built around wide-area pressure. Weather Report covers groups well, Karate adds another AoE layer, and Hamon is used here as a simple damage-focused support pick.",
                strengths: ["Good area coverage", "Crowd-control friendly move set", "Comfortable for mission clearing"],
                statFocus: "20% Health, 40% Destructive Power, 20% Destructive Energy, 10% Power, 10% Strength",
            },
            {
                name: "The Budget Farmer",
                stand: { id: "magicians-red", name: "Magician's Red" },
                style: { id: "boxing", name: "Boxing" },
                sub: { id: "hamon", name: "Hamon" },
                description: "A lower-commitment farming suggestion for earlier accounts in the site's planner. Magician's Red provides AoE options, Boxing gives a simple close-range backup, and Hamon keeps the setup straightforward.",
                strengths: ["Accessible move kit", "Crossfire Hurricane adds AoE reach", "Straightforward damage-focused support"],
                statFocus: "25% Health, 35% Destructive Power, 20% Destructive Energy, 10% Power, 10% Strength",
            },
            {
                name: "The Solo Boss Killer",
                stand: { id: "the-world", name: "The World" },
                style: { id: "boxing", name: "Boxing" },
                sub: { id: "vampire", name: "Vampire" },
                description: "A single-target focused suggestion for players who like burst windows. Time Stop creates setup space for Knives and Kick Volley, Boxing covers downtime, and Vampire adds sustain between openings.",
                strengths: ["Strong burst windows", "Time Stop creates reliable setup space", "Vampire helps in longer solo attempts"],
                statFocus: "20% Health, 30% Destructive Power, 25% Destructive Energy, 15% Power, 10% Strength",
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
                description: "A common beginner recommendation on this site. Star Platinum has a readable move kit, Boxing is straightforward to pilot, and Hamon keeps the setup simple while you learn core timing.",
                strengths: ["Easy-to-read combo routes", "Time Stop offers a reset tool", "Comfortable across different activities"],
                statFocus: "25% Health, 35% Destructive Power, 20% Destructive Energy, 10% Power, 10% Strength",
            },
            {
                name: "The Unkillable Healer",
                stand: { id: "crazy-diamond", name: "Crazy Diamond" },
                style: { id: "boxing", name: "Boxing" },
                sub: { id: "hamon", name: "Hamon" },
                description: "A forgiving setup built around Crazy Diamond's healing tools. Boxing adds easy follow-ups, and Hamon keeps the build simple for players still learning spacing and timing.",
                strengths: ["Healing helps cover mistakes", "Rock Trap can start follow-ups", "Useful for steady, patient play"],
                statFocus: "30% Health, 25% Destructive Power, 20% Destructive Energy, 15% Power, 10% Strength",
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
                description: "A high-risk burst suggestion for players who want explosive punish windows. Time Stop opens a large combo route, Karate adds a heavy follow-up, and Vampire partially offsets the fragile profile.",
                strengths: ["Explosive burst if the opener lands", "Kick Volley converts Time Stop windows well", "Vampire softens the sustain tradeoff"],
                statFocus: "10% Health, 40% Destructive Power, 25% Destructive Energy, 15% Power, 10% Strength",
            },
            {
                name: "The Bleed Assassin",
                stand: { id: "anubis", name: "Anubis" },
                style: { id: "kendo", name: "Kendo" },
                sub: { id: "hamon", name: "Hamon" },
                description: "A melee-focused glass-cannon suggestion. Anubis rewards close-range commitment, Kendo keeps the setup aggressive, and Hamon is used here as a direct damage support pick.",
                strengths: ["Strong melee pressure", "Flash Strike can chain into close follow-ups", "Rewards committed sword-range play"],
                statFocus: "15% Health, 35% Destructive Power, 15% Destructive Energy, 10% Power, 25% Weapon",
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
                description: "A sustain-heavy setup for slower fights. Crazy Diamond and Vampire both add survivability tools, while Boxing gives the build a simple combo structure.",
                strengths: ["Multiple sustain sources", "Rock Trap can force respect", "Fits patient, attrition-focused play"],
                statFocus: "30% Health, 20% Destructive Power, 15% Destructive Energy, 25% Power, 10% Strength",
            },
            {
                name: "The Iron Fortress",
                stand: { id: "stone-free", name: "Stone Free" },
                style: { id: "boxing", name: "Boxing" },
                sub: { id: "vampire", name: "Vampire" },
                description: "A balanced sustain suggestion built around Stone Free's utility. String Trap and ranged thread pressure help control pace, while Vampire supports longer fights.",
                strengths: ["Good mix of utility and sustain", "Trap tools help peel rushers", "Can pressure from more than one range"],
                statFocus: "30% Health, 25% Destructive Power, 20% Destructive Energy, 15% Power, 10% Strength",
            },
        ],
    },
];

const faqItems = [
    {
        question: "What is the best build in Bizarre Lineage?",
        answer: "It depends on your playstyle. This page collects site-maintained community suggestions rather than official best-in-slot builds, so use the ideas here as starting points and adjust them in the planner.",
    },
    {
        question: "What is the best Stand for PvP in Bizarre Lineage?",
        answer: "In this site's current community notes, King Crimson, Made in Heaven, and Whitesnake are popular PvP picks. That is a local ranking, not an official balance statement.",
    },
    {
        question: "What is the best beginner build?",
        answer: "Star Platinum + Boxing + Hamon is one of this site's safer starter suggestions because it is easy to understand in the planner and uses straightforward move kits.",
    },
    {
        question: "How is this different from the Tier List?",
        answer: "The Tier List is the site's ranking view for individual Stands. This page collects complete Stand + Fighting Style + Sub-Ability suggestions for different scenarios. Use the Tier List to compare entries and this page to open a starter setup in the planner.",
    },
    {
        question: "Can I use these builds at any prestige level?",
        answer: "Most of these setups can be adapted at different prestige levels. Builds that rely on harder-to-target entries in the site's local rarity labels may take longer to assemble, so a cheaper placeholder build is often practical first.",
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
                These are site-maintained community build ideas for different playstyles. They are not official rankings or patch notes. Each build links directly to the <Link href="/build-planner" className="text-accent-blue hover:underline">Build Planner</Link> so you can customize the local estimates further.
            </p>

            <p className="text-sm text-muted mb-10">
                Looking for individual Stand rankings instead? Check the <Link href="/tier-list" className="text-accent-blue hover:underline">full Tier List</Link> for the site&apos;s PvP, PvE, and overall ranking view.
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

            {/* Best Builds Video */}
            <div className="mt-8 mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Best Stands Tier List Video</h2>
                <div className="bg-surface border border-border rounded-xl overflow-hidden aspect-video">
                    <iframe
                        width="100%"
                        height="100%"
                        src="https://www.youtube.com/embed/dqwua8EXkZQ"
                        title="Bizarre Lineage Tier List 2026 - Best Stands"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        loading="lazy"
                        className="w-full h-full"
                    />
                </div>
            </div>

            {/* Related Guides */}
            <div className="mt-8">
                <h2 className="text-2xl font-bold text-white mb-4">Related Guides</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Link href="/guides/stats" className="bg-surface border border-border rounded-lg p-4 hover:border-accent-blue/50 transition-colors group">
                        <div className="font-bold text-white group-hover:text-accent-blue transition-colors">Stats Guide</div>
                        <div className="text-xs text-muted mt-1">Optimize your stat allocation</div>
                    </Link>
                    <Link href="/guides/stand-chances" className="bg-surface border border-border rounded-lg p-4 hover:border-accent-blue/50 transition-colors group">
                        <div className="font-bold text-white group-hover:text-accent-blue transition-colors">Stand Chances</div>
                        <div className="text-xs text-muted mt-1">Drop rates and rarity breakdown</div>
                    </Link>
                    <Link href="/tier-list" className="bg-surface border border-border rounded-lg p-4 hover:border-accent-blue/50 transition-colors group">
                        <div className="font-bold text-white group-hover:text-accent-blue transition-colors">Tier List</div>
                        <div className="text-xs text-muted mt-1">See which Stands rank highest</div>
                    </Link>
                    <Link href="/build-planner" className="bg-surface border border-border rounded-lg p-4 hover:border-accent-blue/50 transition-colors group">
                        <div className="font-bold text-white group-hover:text-accent-blue transition-colors">Build Planner</div>
                        <div className="text-xs text-muted mt-1">Test your combo before committing</div>
                    </Link>
                </div>
            </div>

        </div>
    );
}
