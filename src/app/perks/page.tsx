import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Sparkles, User } from "lucide-react";
import { withCanonical, SITE_URL } from "@/lib/metadata";

export const metadata: Metadata = withCanonical({
    title: "Bizarre Lineage Perks & Personalities — Complete Guide",
    description: "All perks and personalities in Bizarre Lineage explained. Learn what each perk does, how to obtain them, and which personalities are best for your build.",
}, "/perks");

const PERKS = [
    { name: "Grappler", source: "Jotaro Raid Shop", cost: "120 Jotaro Tokens", effect: "Increases grab range and grab damage by 15%. Grabs cannot be broken during the first 0.5 seconds.", tier: "S" },
    { name: "Intimidation", source: "Jotaro Raid Shop", cost: "150 Jotaro Tokens", effect: "Nearby enemies deal 10% less damage. Stacks with defensive stats. Radius: ~15 studs.", tier: "A" },
    { name: "Conjurer", source: "Avdol Raid Shop", cost: "100 Avdol Tokens", effect: "Conjuration training speed increased by 25%. Reduces conjuration decay rate.", tier: "B" },
    { name: "King of Flames", source: "Avdol Raid Shop", cost: "130 Avdol Tokens", effect: "Fire-based attacks deal 20% more damage. Applies a burn DoT that deals damage over 3 seconds.", tier: "A" },
    { name: "A Quiet Life", source: "Kira Raid Shop", cost: "140 Kira Tokens", effect: "Reduces aggro range from NPCs by 50%. You take 10% less damage when no other players are nearby.", tier: "B" },
    { name: "Serial Killer", source: "Kira Raid Shop", cost: "160 Kira Tokens", effect: "Each consecutive hit on the same target increases damage by 3%, stacking up to 5 times (15% max). Resets on target switch.", tier: "S" },
    { name: "Timestop Resistance", source: "DIO Raid Shop", cost: "200 DIO Tokens", effect: "Reduces duration of Time Stop effects on you by 30%. Does not make you immune, but significantly shortens the freeze window.", tier: "S" },
    { name: "Regenerator", source: "DIO Raid Shop", cost: "180 DIO Tokens", effect: "Passively regenerate 1% of max HP every 5 seconds when not in combat. Combat timer: 10 seconds after last hit.", tier: "A" },
];

const PERSONALITIES = [
    { name: "Aggressive", effect: "+10% damage dealt, -5% defense", description: "Best for glass cannon builds. Pairs well with high-burst Stands like The World and King Crimson.", recommended: "PvP Burst" },
    { name: "Defensive", effect: "+10% defense, -5% damage dealt", description: "Great for tank builds and raid grinding. Helps you survive longer in extended fights.", recommended: "PvE / Raids" },
    { name: "Balanced", effect: "+5% damage, +5% defense", description: "The safe pick. Slightly less optimal than specialized personalities but works with any build.", recommended: "All-round" },
    { name: "Swift", effect: "+15% movement speed, -3% defense", description: "Excellent for mobility-focused Stands. Makes chasing and escaping significantly easier.", recommended: "PvP Mobility" },
    { name: "Resilient", effect: "+20% max HP, -5% damage dealt", description: "Maximum survivability. Works best with lifesteal builds (Vampire sub-ability) where the extra HP pool amplifies healing.", recommended: "Vampire Builds" },
    { name: "Lucky", effect: "+10% item drop rate, +5% code reward bonus", description: "Farming personality. Use this when grinding chests, raids, or world events for rare drops.", recommended: "Farming" },
    { name: "Focused", effect: "+10% skill cooldown reduction", description: "Reduces all ability cooldowns by 10%. Very strong on Stands with impactful long-cooldown abilities like Time Stop.", recommended: "Cooldown-Heavy Stands" },
    { name: "Berserker", effect: "+15% damage when below 30% HP", description: "High-risk, high-reward personality. Synergizes with Vampire lifesteal to hover at low HP while dealing massive damage.", recommended: "Advanced PvP" },
];

export default function PerksPage() {
    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
            { '@type': 'ListItem', position: 2, name: 'Perks & Personalities', item: `${SITE_URL}/perks` },
        ],
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            <nav className="flex items-center gap-2 text-sm text-muted mb-8" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-white" aria-current="page">Perks & Personalities</span>
            </nav>

            <div className="relative w-full rounded-xl overflow-hidden mb-8">
                <Image src="/images/pages/perks.png" alt="Bizarre Lineage Perks" width={800} height={450} className="w-full h-48 object-cover opacity-40" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
                <div className="absolute bottom-4 left-6">
                    <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-white">Bizarre Lineage Perks & Personalities</h1>
                </div>
            </div>
            <p className="text-lg text-muted mb-10 leading-relaxed">
                Perks are passive bonuses purchased from raid shops. Personalities modify your base stats and playstyle. Both are essential for optimizing your build in Bizarre Lineage.
            </p>

            {/* Perks Section */}
            <section className="mb-16">
                <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-accent-blue" /> All Perks
                </h2>
                <p className="text-sm text-muted mb-6">Perks are purchased from raid shops using tokens earned from boss fights.</p>
                <div className="space-y-3">
                    {PERKS.map((perk) => (
                        <div key={perk.name} className="bg-surface border border-border rounded-xl p-5">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="font-bold text-white">{perk.name}</h3>
                                <span className={`px-2 py-1 text-xs font-mono font-bold rounded-full ${perk.tier === 'S' ? 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/20' : perk.tier === 'A' ? 'bg-accent-blue/10 text-accent-blue border border-accent-blue/20' : 'bg-white/10 text-muted border border-white/10'}`}>
                                    {perk.tier} Tier
                                </span>
                            </div>
                            <p className="text-sm text-muted mb-3">{perk.effect}</p>
                            <div className="flex items-center gap-4 text-xs text-muted">
                                <span>Source: <strong className="text-white">{perk.source}</strong></span>
                                <span>Cost: <strong className="text-accent-blue">{perk.cost}</strong></span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Personalities Section */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                    <User className="h-5 w-5 text-purple-400" /> All Personalities
                </h2>
                <p className="text-sm text-muted mb-6">Personalities are assigned when you create a character and can be rerolled using a Stand Personality Essence (obtainable from codes and raid rewards).</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {PERSONALITIES.map((p) => (
                        <div key={p.name} className="bg-surface border border-border rounded-xl p-5">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="font-bold text-white">{p.name}</h3>
                                <span className="text-xs text-accent-indigo bg-accent-indigo/10 px-2 py-1 rounded-full">{p.recommended}</span>
                            </div>
                            <p className="text-sm text-accent-blue font-mono mb-2">{p.effect}</p>
                            <p className="text-sm text-muted">{p.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Tips */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">Optimization Tips</h2>
                <div className="bg-surface border border-border rounded-xl p-6 space-y-3 text-sm text-muted">
                    <p><strong className="text-white">Stack synergies.</strong> Serial Killer perk + Aggressive personality + The World combo build = maximum burst damage during Time Stop.</p>
                    <p><strong className="text-white">Don&apos;t sleep on Timestop Resistance.</strong> It&apos;s the most expensive perk but also the most impactful in PvP. A shorter Time Stop window means you can survive combos that would otherwise kill you.</p>
                    <p><strong className="text-white">Personality rerolls are rare.</strong> Stand Personality Essences come from codes and raid rewards. Don&apos;t waste them — check the Build Planner first to decide which personality fits your setup.</p>
                    <p><strong className="text-white">PvE vs PvP personalities.</strong> Consider keeping a PvE character (Defensive/Resilient) and a PvP character (Aggressive/Focused) if you play both modes seriously.</p>
                </div>
            </section>

            {/* Related */}
            <section>
                <h2 className="text-2xl font-bold text-white mb-4">Related</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Link href="/raids" className="bg-surface border border-border rounded-lg p-4 hover:border-accent-blue/50 transition-colors group">
                        <div className="font-bold text-white group-hover:text-accent-blue transition-colors">Raid Guides</div>
                        <div className="text-xs text-muted mt-1">Earn tokens to buy perks from raid shops</div>
                    </Link>
                    <Link href="/build-planner" className="bg-surface border border-border rounded-lg p-4 hover:border-accent-blue/50 transition-colors group">
                        <div className="font-bold text-white group-hover:text-accent-blue transition-colors">Build Planner</div>
                        <div className="text-xs text-muted mt-1">Test perk + personality combinations</div>
                    </Link>
                </div>
            </section>
        </div>
    );
}
