import { Metadata } from "next";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ChevronRight, Sparkles, Info } from "lucide-react";
import { withCanonical, SITE_URL } from "@/lib/metadata";

export const metadata: Metadata = withCanonical({
    title: "Bizarre Lineage Perks & Traits — All Sources (Official Trello)",
    description: "All perks and traits in Bizarre Lineage as documented on the official Trello — sourced from Money Store, Tutorial, Prestige Shop, Side Quests, Gang Wars, and the four Raid Shops.",
}, "/perks");

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

export default function PerksPage() {
    const totalPerks = PERK_SECTIONS.reduce((sum, s) => sum + s.perks.length, 0);

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
            { '@type': 'ListItem', position: 2, name: 'Perks & Traits', item: `${SITE_URL}/perks` },
        ],
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            <nav className="flex items-center gap-2 text-sm text-muted mb-8" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-white" aria-current="page">Perks & Traits</span>
            </nav>

            <div className="relative w-full rounded-xl overflow-hidden mb-8">
                <Image src="/images/pages/perks.png" alt="Bizarre Lineage Perks" width={800} height={450} className="w-full h-48 object-cover opacity-40" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
                <div className="absolute bottom-4 left-6">
                    <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-white">Bizarre Lineage Perks & Traits</h1>
                </div>
            </div>
            <p className="text-lg text-muted mb-6 leading-relaxed">
                All {totalPerks} perks and traits documented on the official Trello, grouped by where you obtain them. Money Store, Tutorial, Prestige Shop, Side Quests, Gang Wars, and the four Raid Shops are the official sources.
            </p>

            <div className="bg-accent-blue/5 border border-accent-blue/20 rounded-xl p-4 mb-10 flex gap-3 text-sm text-muted">
                <Info className="h-5 w-5 text-accent-blue shrink-0 mt-0.5" />
                <div>
                    <p className="text-white font-medium mb-1">About this page</p>
                    <p>Effect text and costs come from the public official Trello board. Raid Shop traits show only the name and approximate token cost because the Trello does not document their effect — confirm in-game before spending tokens. The game also has a Personality system, but the Trello does not document personality stats; check the official Discord for the live list.</p>
                </div>
            </div>

            {PERK_SECTIONS.map((section) => (
                <section key={section.sourceLabel} className="mb-10">
                    <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-accent-blue" /> {section.sourceLabel}
                    </h2>
                    {section.sourceNote && (
                        <p className="text-sm text-muted mb-4">{section.sourceNote}</p>
                    )}
                    <div className="space-y-3">
                        {section.perks.map((perk) => (
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
                                {perk.effect ? (
                                    <p className="text-sm text-muted">{perk.effect}</p>
                                ) : (
                                    <p className="text-sm text-muted italic">Effect not documented on Trello — verify in-game.</p>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            ))}

            <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">Source</h2>
                <div className="bg-surface border border-border rounded-xl p-6 text-sm text-muted">
                    <p>Verified against the public official Trello board: <a href="https://trello.com/b/wtzgwqIf" target="_blank" rel="noopener noreferrer" className="text-accent-blue hover:text-white transition-colors underline underline-offset-2">trello.com/b/wtzgwqIf</a>. If a perk or trait you have seen in-game is missing here, it likely has not been added to the public Trello yet.</p>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-white mb-4">Related</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Link href="/raids" className="bg-surface border border-border rounded-lg p-4 hover:border-accent-blue/50 transition-colors group">
                        <div className="font-bold text-white group-hover:text-accent-blue transition-colors">Raid Guides</div>
                        <div className="text-xs text-muted mt-1">Earn tokens to buy raid-shop traits</div>
                    </Link>
                    <Link href="/build-planner" className="bg-surface border border-border rounded-lg p-4 hover:border-accent-blue/50 transition-colors group">
                        <div className="font-bold text-white group-hover:text-accent-blue transition-colors">Build Planner</div>
                        <div className="text-xs text-muted mt-1">Plan your Stand + Style + Sub combo</div>
                    </Link>
                </div>
            </section>
        </div>
    );
}
