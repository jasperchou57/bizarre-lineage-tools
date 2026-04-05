import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Star, ArrowRight } from "lucide-react";
import { withCanonical, SITE_URL } from "@/lib/metadata";

export const metadata: Metadata = withCanonical({
    title: "All Bizarre Lineage Items — Complete Item List & How to Get Them",
    description: "Complete item database for Bizarre Lineage. Every item, how to obtain it, rarity, and what it does. Stand Arrows, Lucky Arrows, Masks, and more.",
}, "/items");

const ITEM_CATEGORIES = [
    {
        category: "Stand Items",
        items: [
            { name: "Stand Arrow", rarity: "Common", effect: "Grants a random Stand. The most fundamental item in the game.", sources: ["NPC Quests", "Codes", "Meteor Shower", "Legendary Chests", "Raid Shops"] },
            { name: "Lucky Arrow", rarity: "Rare", effect: "Grants a random skin for your currently equipped Stand. Does NOT change your Stand or improve rarity.", sources: ["Raid Shops (450-510 tokens)", "Meteor Shower (rare)", "Events"] },
            { name: "Requiem Arrow", rarity: "Legendary", effect: "Used to evolve certain Stands into their Requiem form (e.g. Gold Experience → Gold Experience Requiem).", sources: ["Boss Drops", "DIO Raid Shop", "Special Quests"] },
            { name: "Holy Corpse Part", rarity: "Mythical", effect: "Required to evolve The World into The World: High Voltage. The rarest evolution item.", sources: ["DIO Raid (rare drop)", "Special Events"] },
            { name: "Rokakaka Fruit", rarity: "Common", effect: "Removes your current Stand, allowing you to roll a new one with a Stand Arrow.", sources: ["NPC Quests", "Legendary Chests", "Ground Spawns"] },
        ],
    },
    {
        category: "Sub-Ability Items",
        items: [
            { name: "Stone Mask", rarity: "Rare", effect: "Transforms you into a Vampire. Grants lifesteal and vampire abilities.", sources: ["Legendary Chests", "Raid Shops", "Meteor Shower"] },
            { name: "Hamon Training Manual", rarity: "Uncommon", effect: "Unlocks Hamon sub-ability. Grants bonus damage vs Vampires and HP regeneration.", sources: ["NPC Quest (Morioh Beach)", "Codes"] },
            { name: "Cyborg Parts", rarity: "Uncommon", effect: "Unlocks Cyborg sub-ability. Grants UV radiation attacks and defense bonus.", sources: ["NPC Quest", "Raid Shops"] },
            { name: "Spin Ball", rarity: "Rare", effect: "Unlocks Spin sub-ability. Grants ranged attacks with spin mechanics.", sources: ["Special NPC Quest", "Events"] },
        ],
    },
    {
        category: "Consumables",
        items: [
            { name: "Stat Point Essence", rarity: "Uncommon", effect: "Grants 1 additional stat point to distribute. Stacks with level-up stat points.", sources: ["Codes", "Raid Rewards", "Events"] },
            { name: "Stand Stat Essence", rarity: "Uncommon", effect: "Grants 1 additional Stand stat point. Used to boost Stand-specific stats.", sources: ["Codes", "Raid Rewards"] },
            { name: "Stand Personality Essence", rarity: "Rare", effect: "Rerolls your Stand's personality trait. Useful for optimizing builds.", sources: ["Codes", "Prestige Shop"] },
            { name: "EXP Boost (30 min)", rarity: "Common", effect: "Doubles all EXP gained for 30 minutes. Does not stack with other EXP boosts.", sources: ["Codes", "Login Rewards", "Events"] },
            { name: "Cash Boost (30 min)", rarity: "Common", effect: "Doubles all Cash earned for 30 minutes.", sources: ["Codes", "Login Rewards"] },
        ],
    },
    {
        category: "Chests",
        items: [
            { name: "Common Chest", rarity: "Common", effect: "Contains Cash (100-500) and occasionally a Stand Arrow.", sources: ["Ground Spawns", "Quest Rewards"] },
            { name: "Rare Chest", rarity: "Uncommon", effect: "Contains Cash (500-2,000), Stand Arrows, and occasionally rare items.", sources: ["Codes", "World Events", "Quest Rewards"] },
            { name: "Legendary Chest", rarity: "Rare", effect: "Contains high-value items: Lucky Arrows, Stone Masks, Requiem Arrows, large Cash amounts.", sources: ["Codes", "Raid Rewards", "World Boss DIO"] },
        ],
    },
    {
        category: "Accessories",
        items: [
            { name: "Jotaro's Coat", rarity: "Legendary", effect: "Cosmetic accessory. Obtained from Jotaro Raid Shop.", sources: ["Jotaro Raid Shop"] },
            { name: "Jotaro's Hat", rarity: "Legendary", effect: "Cosmetic accessory. Iconic cap from Part 3.", sources: ["Jotaro Raid Shop"] },
            { name: "Skull Tie", rarity: "Legendary", effect: "Cosmetic accessory. Kira's signature neckwear.", sources: ["Kira Raid Shop"] },
            { name: "Flaming Medallion Necklace", rarity: "Legendary", effect: "Cosmetic accessory. Avdol's iconic necklace.", sources: ["Avdol Raid Shop"] },
        ],
    },
];

const RARITY_COLORS: Record<string, string> = {
    Common: "text-gray-400 bg-gray-400/10 border-gray-400/20",
    Uncommon: "text-green-400 bg-green-400/10 border-green-400/20",
    Rare: "text-blue-400 bg-blue-400/10 border-blue-400/20",
    Legendary: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
    Mythical: "text-purple-400 bg-purple-400/10 border-purple-400/20",
};

export default function ItemsPage() {
    const totalItems = ITEM_CATEGORIES.reduce((sum, cat) => sum + cat.items.length, 0);

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
            { '@type': 'ListItem', position: 2, name: 'Items', item: `${SITE_URL}/items` },
        ],
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            <nav className="flex items-center gap-2 text-sm text-muted mb-8" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-white" aria-current="page">Items</span>
            </nav>

            <div className="relative w-full rounded-xl overflow-hidden mb-8">
                <Image src="/images/pages/items.png" alt="Bizarre Lineage Items" width={800} height={450} className="w-full h-48 object-cover opacity-40" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
                <div className="absolute bottom-4 left-6">
                    <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-white">All Bizarre Lineage Items</h1>
                </div>
            </div>
            <p className="text-lg text-muted mb-10 leading-relaxed">
                Complete database of all {totalItems} items in Bizarre Lineage. Find out what each item does, where to get it, and how rare it is.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
                <div className="bg-surface border border-border rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-white">{totalItems}</div>
                    <div className="text-xs text-muted">Total Items</div>
                </div>
                <div className="bg-surface border border-border rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-white">{ITEM_CATEGORIES.length}</div>
                    <div className="text-xs text-muted">Categories</div>
                </div>
                <div className="bg-surface border border-border rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-yellow-400">4</div>
                    <div className="text-xs text-muted">Legendary+</div>
                </div>
                <div className="bg-surface border border-border rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-purple-400">1</div>
                    <div className="text-xs text-muted">Mythical</div>
                </div>
            </div>

            {/* Item Categories */}
            {ITEM_CATEGORIES.map((category) => (
                <section key={category.category} className="mb-12">
                    <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                        <Star className="h-5 w-5 text-accent-blue" /> {category.category}
                    </h2>
                    <div className="space-y-3">
                        {category.items.map((item) => (
                            <div key={item.name} className="bg-surface border border-border rounded-xl p-5">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-bold text-white">{item.name}</h3>
                                    <span className={`px-2 py-1 text-xs font-mono font-bold rounded-full border ${RARITY_COLORS[item.rarity]}`}>
                                        {item.rarity}
                                    </span>
                                </div>
                                <p className="text-sm text-muted mb-3">{item.effect}</p>
                                <div>
                                    <span className="text-xs text-muted">Obtained from: </span>
                                    <span className="text-xs text-white">{item.sources.join(" · ")}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            ))}

            {/* Related */}
            <section>
                <h2 className="text-2xl font-bold text-white mb-4">Related</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Link href="/codes" className="bg-surface border border-border rounded-lg p-4 hover:border-accent-blue/50 transition-colors group">
                        <div className="font-bold text-white group-hover:text-accent-blue transition-colors flex items-center gap-1">Active Codes <ArrowRight className="h-3 w-3" /></div>
                        <div className="text-xs text-muted mt-1">Redeem codes for free items</div>
                    </Link>
                    <Link href="/raids" className="bg-surface border border-border rounded-lg p-4 hover:border-accent-blue/50 transition-colors group">
                        <div className="font-bold text-white group-hover:text-accent-blue transition-colors flex items-center gap-1">Raid Guides <ArrowRight className="h-3 w-3" /></div>
                        <div className="text-xs text-muted mt-1">Farm tokens for raid shop items</div>
                    </Link>
                    <Link href="/skins" className="bg-surface border border-border rounded-lg p-4 hover:border-accent-blue/50 transition-colors group">
                        <div className="font-bold text-white group-hover:text-accent-blue transition-colors flex items-center gap-1">Skins Gallery <ArrowRight className="h-3 w-3" /></div>
                        <div className="text-xs text-muted mt-1">All Stand skins from Lucky Arrows</div>
                    </Link>
                    <Link href="/world-events" className="bg-surface border border-border rounded-lg p-4 hover:border-accent-blue/50 transition-colors group">
                        <div className="font-bold text-white group-hover:text-accent-blue transition-colors flex items-center gap-1">World Events <ArrowRight className="h-3 w-3" /></div>
                        <div className="text-xs text-muted mt-1">Events that drop rare items</div>
                    </Link>
                </div>
            </section>
        </div>
    );
}
