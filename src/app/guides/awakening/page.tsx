import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Zap, AlertTriangle } from "lucide-react";
import { withCanonical, SITE_URL } from "@/lib/metadata";

export const metadata: Metadata = withCanonical({
    title: "Bizarre Lineage Awakening Guide — How to Awaken Your Stand",
    description: "Complete awakening guide for Bizarre Lineage. Learn the requirements, boss fights, and step-by-step process to awaken your Stand and unlock the H-ability.",
}, "/guides/awakening");

const AWAKENING_STEPS = [
    {
        step: 1,
        title: "Reach Max Level (50)",
        description: "You must be Level 50 before you can begin the awakening quest. Use our leveling guide for the fastest routes.",
        tip: "Grind quests at Bus Stop areas that match your level range for maximum XP efficiency.",
    },
    {
        step: 2,
        title: "Max Conjuration (100)",
        description: "Train Conjuration at the Gym Mat in Morioh until it reaches 100. This is required to interact with the Self NPC.",
        tip: "Conjuration training is AFK-friendly. Hold the interaction and let it run while you step away.",
    },
    {
        step: 3,
        title: "Talk to the Self NPC",
        description: "Find the Self NPC in the Meditation Realm. This NPC appears only when you meet both level and conjuration requirements.",
        tip: "The Meditation Realm entrance is near the Gym Mat area in Morioh.",
    },
    {
        step: 4,
        title: "Defeat the Awakening Bosses",
        description: "You must defeat boss fights as part of the awakening quest. These include fighting your own Stand's shadow and potentially raid-level bosses like Jotaro and DIO.",
        tip: "Bring a Vampire sub-ability for sustain. The bosses hit hard and the fights are solo-only.",
    },
    {
        step: 5,
        title: "Claim Your Awakening",
        description: "After defeating all required bosses, return to the Self NPC to complete the awakening. Your Stand now has access to the H-ability and a visual transformation.",
        tip: "The H-ability is your Stand's ultimate move. It usually has a long cooldown but deals massive damage.",
    },
];

const BOSS_FIGHTS = [
    { name: "Shadow Self", difficulty: "Medium", hp: "Scales with your stats", tip: "Mirrors your Stand. Bait out its moves and punish during cooldowns." },
    { name: "Jotaro Kujo", difficulty: "Hard", hp: "~4,000 HP", tip: "Star Platinum hits fast. Keep distance and use ranged attacks when possible." },
    { name: "DIO", difficulty: "Very Hard", hp: "~6,000 HP", tip: "DIO uses Time Stop. Save your burst combo for after his TS ends. Vampire sustain is essential." },
];

export default function AwakeningGuidePage() {
    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
            { '@type': 'ListItem', position: 2, name: 'Guides', item: `${SITE_URL}/guides` },
            { '@type': 'ListItem', position: 3, name: 'Awakening', item: `${SITE_URL}/guides/awakening` },
        ],
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            <nav className="flex items-center gap-2 text-sm text-muted mb-8" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/guides" className="hover:text-white transition-colors">Guides</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-white" aria-current="page">Awakening</span>
            </nav>

            <div className="flex items-center gap-4 mb-4">
                <Zap className="h-12 w-12 text-yellow-400" />
                <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-white m-0">
                    Bizarre Lineage Awakening Guide
                </h1>
            </div>
            <p className="text-lg text-muted mb-10 leading-relaxed">
                Awakening your Stand unlocks the powerful H-ability and gives your Stand a visual transformation. This guide covers every step from requirements to boss strategies.
            </p>

            {/* Requirements Summary */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">Awakening Requirements</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-surface border border-border rounded-xl p-5 text-center">
                        <div className="text-3xl font-bold text-accent-blue mb-1">50</div>
                        <div className="text-sm text-muted">Character Level</div>
                    </div>
                    <div className="bg-surface border border-border rounded-xl p-5 text-center">
                        <div className="text-3xl font-bold text-accent-indigo mb-1">100</div>
                        <div className="text-sm text-muted">Conjuration Level</div>
                    </div>
                    <div className="bg-surface border border-border rounded-xl p-5 text-center">
                        <div className="text-3xl font-bold text-yellow-400 mb-1">3</div>
                        <div className="text-sm text-muted">Boss Fights</div>
                    </div>
                </div>
            </section>

            {/* Step by Step */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-6">Step-by-Step Walkthrough</h2>
                <div className="space-y-4">
                    {AWAKENING_STEPS.map((step) => (
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

            {/* Boss Fights */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">Awakening Boss Fights</h2>
                <div className="space-y-4">
                    {BOSS_FIGHTS.map((boss) => (
                        <div key={boss.name} className="bg-surface border border-border rounded-xl p-5">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="font-bold text-white">{boss.name}</h3>
                                <span className={`text-xs font-bold px-2 py-1 rounded-full ${boss.difficulty === 'Very Hard' ? 'bg-red-500/20 text-red-400' : boss.difficulty === 'Hard' ? 'bg-orange-500/20 text-orange-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                    {boss.difficulty}
                                </span>
                            </div>
                            <p className="text-sm text-muted mb-2">HP: {boss.hp}</p>
                            <p className="text-sm text-muted">{boss.tip}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Awakening Video Guide */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">Awakening Video Guide</h2>
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

            {/* Best Stands for Awakening */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">Best Stands for Awakening</h2>
                <div className="bg-surface border border-border rounded-xl p-6 text-sm text-muted leading-relaxed space-y-3">
                    <p>
                        <strong className="text-white">Whitesnake</strong> — The safest pick for awakening boss fights. High CC and damage let you control the pace of every fight. Pair with Vampire for sustain.
                    </p>
                    <p>
                        <strong className="text-white">Star Platinum</strong> — Excellent for burst damage. If you can land your full combo during boss openings, fights end quickly. Pair with Boxing for extra combo potential.
                    </p>
                    <p>
                        <strong className="text-white">The World</strong> — Time Stop trivializes some boss mechanics. Use the TS window to land your full damage rotation risk-free.
                    </p>
                </div>
            </section>

            {/* FAQ */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">Awakening FAQ</h2>
                <div className="space-y-4">
                    <details className="group bg-surface border border-border rounded-xl overflow-hidden">
                        <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                            <span className="font-medium text-white pr-4">Can I awaken any Stand?</span>
                            <ChevronRight className="h-5 w-5 text-muted flex-shrink-0 group-open:rotate-90 transition-transform" />
                        </summary>
                        <div className="px-5 pb-5 text-sm text-muted leading-relaxed">
                            Yes, all Stands in Bizarre Lineage can be awakened once you meet the level and conjuration requirements. Each Stand gets a unique H-ability upon awakening.
                        </div>
                    </details>
                    <details className="group bg-surface border border-border rounded-xl overflow-hidden">
                        <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                            <span className="font-medium text-white pr-4">Do I lose my awakening when I prestige?</span>
                            <ChevronRight className="h-5 w-5 text-muted flex-shrink-0 group-open:rotate-90 transition-transform" />
                        </summary>
                        <div className="px-5 pb-5 text-sm text-muted leading-relaxed">
                            Yes, prestiging resets your level and conjuration. You will need to re-awaken your Stand after each prestige. However, the awakening process gets faster since you retain game knowledge and can optimize your route.
                        </div>
                    </details>
                    <details className="group bg-surface border border-border rounded-xl overflow-hidden">
                        <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                            <span className="font-medium text-white pr-4">What is the H-ability?</span>
                            <ChevronRight className="h-5 w-5 text-muted flex-shrink-0 group-open:rotate-90 transition-transform" />
                        </summary>
                        <div className="px-5 pb-5 text-sm text-muted leading-relaxed">
                            The H-ability is your Stand&apos;s ultimate move, unlocked through awakening. It typically has a long cooldown (60-90 seconds) but deals devastating damage and often includes a visual transformation for your Stand.
                        </div>
                    </details>
                </div>
            </section>

            {/* Related */}
            <section>
                <h2 className="text-2xl font-bold text-white mb-4">Related Guides</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Link href="/guides/leveling" className="bg-surface border border-border rounded-lg p-4 hover:border-accent-blue/50 transition-colors group">
                        <div className="font-bold text-white group-hover:text-accent-blue transition-colors">Leveling Guide (1-50)</div>
                        <div className="text-xs text-muted mt-1">Fastest routes to reach max level</div>
                    </Link>
                    <Link href="/guides/prestige" className="bg-surface border border-border rounded-lg p-4 hover:border-accent-blue/50 transition-colors group">
                        <div className="font-bold text-white group-hover:text-accent-blue transition-colors">Prestige Guide</div>
                        <div className="text-xs text-muted mt-1">Requirements, rewards, and reset info</div>
                    </Link>
                    <Link href="/raids" className="bg-surface border border-border rounded-lg p-4 hover:border-accent-blue/50 transition-colors group">
                        <div className="font-bold text-white group-hover:text-accent-blue transition-colors">Raid Guides</div>
                        <div className="text-xs text-muted mt-1">Boss strategies and raid token rewards</div>
                    </Link>
                    <Link href="/tier-list" className="bg-surface border border-border rounded-lg p-4 hover:border-accent-blue/50 transition-colors group">
                        <div className="font-bold text-white group-hover:text-accent-blue transition-colors">Stand Tier List</div>
                        <div className="text-xs text-muted mt-1">Pick the best Stand before investing in awakening</div>
                    </Link>
                </div>
            </section>
        </div>
    );
}
