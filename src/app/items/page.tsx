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
            { name: "Stand Arrow", rarity: "Common", effect: "Grants a random Stand when used. The fundamental item to obtain a Stand.", sources: ["Ground spawns", "Common / Rare / Legendary Chests", "Codes"] },
            { name: "Lucky Arrow", rarity: "Legendary", effect: "Guarantees a random skin on your current Stand.", sources: ["Prestige Shop", "Raid Shops", "Legendary Chests"] },
            { name: "Stone Mask", rarity: "Rare", effect: "Rejecting your humanity transforms you into a Vampire (sub-ability).", sources: ["Shop", "Common / Rare / Legendary Chests"] },
        ],
    },
    {
        category: "Essences",
        items: [
            { name: "Stat Point Essence", rarity: "Uncommon", effect: "Resets your stat points upon use.", sources: ["Prestige Shop", "Rahaj's Shop", "Robux Shop"] },
            { name: "Stand Skin Essence", rarity: "Rare", effect: "Gives your current Stand a random skin upon use.", sources: ["Prestige Shop", "Robux Shop", "Achievements"] },
            { name: "Stand Stat Essence", rarity: "Uncommon", effect: "Rerolls your Stand's stats upon use.", sources: ["Prestige Shop", "Robux Shop"] },
            { name: "Stand Personality Essence", rarity: "Rare", effect: "Rerolls your Stand's personality upon use.", sources: ["Prestige Shop", "Robux Shop"] },
            { name: "Stand Conjuration Essence", rarity: "Rare", effect: "Maxes out your equipped Stand's Conjuration upon use.", sources: ["Prestige Shop", "Rahaj's Shop", "Robux Shop"] },
            { name: "Custom Clothing Essence", rarity: "Legendary", effect: "Lets you use your Roblox avatar's clothes in-game upon use.", sources: ["Robux Shop"] },
        ],
    },
    {
        category: "Special Items",
        items: [
            { name: "Dio's Diary", rarity: "Legendary", effect: "Quest item used in Pucci's questline.", sources: ["Legendary Chest", "DIO Raid drop"] },
            { name: "Red Stone of Aja", rarity: "Mythical", effect: "Grants double Legendary skin chance (stacking), 2x Conjuration (stacking), +1% Lucky Arrow spawn chance per wielder in your server (stacking), and infinite Stand storage.", sources: ["Robux Shop"] },
        ],
    },
    {
        category: "Chests",
        items: [
            { name: "Common Chest", rarity: "Common", effect: "Drops basic items, materials and small Cash.", sources: ["Mission rewards", "Raid drops"] },
            { name: "Rare Chest", rarity: "Uncommon", effect: "Drops mid-tier materials, Stand Arrows and occasional rare items.", sources: ["Mission rewards", "Raid drops"] },
            { name: "Legendary Chest", rarity: "Rare", effect: "Drops high-value items including Lucky Arrows, Stone Masks, Dio's Diary, and Imperfect Aja.", sources: ["Mission rewards", "Raid drops"] },
        ],
    },
    {
        category: "Mounts",
        items: [
            { name: "Plank Skateboard", rarity: "Common", effect: "Basic skateboard mount. Required to obtain the upgraded Skateboard.", sources: ["Craft from Gupta", "Zuleima's quest (thieves area)"] },
            { name: "Skateboard", rarity: "Uncommon", effect: "Upgraded skateboard mount with better speed.", sources: ["Yuto Horigome's questline at the Gym (requires Plank Skateboard equipped)"] },
            { name: "Motorcycle", rarity: "Legendary", effect: "Premium fast mount.", sources: ["Starter Pack (Robux Shop)"] },
        ],
    },
    {
        category: "Weapons",
        items: [
            { name: "Stop Sign", rarity: "Rare", effect: "Blunt weapon with M1 combo.", sources: ["DIO's Raid Shop"] },
            { name: "Shadow Axe", rarity: "Rare", effect: "Cleaving weapon with M1 combo.", sources: ["DIO's Raid Shop"] },
            { name: "Odachi", rarity: "Legendary", effect: "Long-blade sword. Strong critical attack.", sources: ["Miyamoto drop (0.5–1% chance)"] },
            { name: "Katana", rarity: "Uncommon", effect: "Standard sword with M1 combo and critical attack.", sources: ["Defeat Samurai enemies"] },
            { name: "Hammer", rarity: "Rare", effect: "Heavy two-handed weapon.", sources: ["Mafia Boss questline (Dedequann near the Gym)"] },
            { name: "Shovel", rarity: "Uncommon", effect: "Improvised weapon with M1 combo and critical attack.", sources: ["Cultist Leaders", "Elite Mafia Members"] },
            { name: "Luck & Pluck", rarity: "Legendary", effect: "Special weapon obtained from Bruford's questline.", sources: ["Bruford's quest (beach northeast of Bus Stop 17)"] },
        ],
    },
    {
        category: "Materials",
        items: [
            { name: "Fabric", rarity: "Common", effect: "Crafting material used at Gupta.", sources: ["Common / Rare / Legendary Chests"] },
            { name: "Bronze Fragments", rarity: "Common", effect: "Crafting material used at Gupta.", sources: ["Common / Rare / Legendary Chests"] },
            { name: "Acid", rarity: "Common", effect: "Crafting material used at Gupta.", sources: ["Common / Rare / Legendary Chests"] },
            { name: "Leather", rarity: "Common", effect: "Crafting material used at Gupta.", sources: ["Common / Rare / Legendary Chests"] },
            { name: "Sapphire", rarity: "Uncommon", effect: "Crafting material used at Gupta.", sources: ["Common / Rare / Legendary Chests"] },
            { name: "Ruby", rarity: "Uncommon", effect: "Crafting material used at Gupta.", sources: ["Common / Rare / Legendary Chests"] },
            { name: "Opal", rarity: "Uncommon", effect: "Crafting material used at Gupta.", sources: ["Common / Rare / Legendary Chests"] },
            { name: "Bones", rarity: "Common", effect: "Crafting material used at Gupta.", sources: ["Common / Rare / Legendary Chests"] },
            { name: "Silver Fragments", rarity: "Uncommon", effect: "Crafting material used at Gupta.", sources: ["Common / Rare / Legendary Chests"] },
            { name: "Gold Fragments", rarity: "Rare", effect: "Crafting material used at Gupta.", sources: ["Common / Rare / Legendary Chests"] },
            { name: "Gold Coins", rarity: "Common", effect: "Crafting material used at Gupta.", sources: ["Common / Rare / Legendary Chests"] },
            { name: "Lost Spirit", rarity: "Uncommon", effect: "Crafting material used at Gupta.", sources: ["Common / Rare / Legendary Chests"] },
            { name: "Vampire Fang", rarity: "Rare", effect: "Crafting material used at Gupta.", sources: ["Common / Rare / Legendary Chests"] },
            { name: "Dio's Bone", rarity: "Rare", effect: "Crafting material used at Gupta.", sources: ["Common / Rare / Legendary Chests"] },
            { name: "Cosmic Radiation", rarity: "Rare", effect: "Crafting material used at Gupta.", sources: ["Common / Rare / Legendary Chests", "Slay Miyamoto"] },
            { name: "Meteor Fragments", rarity: "Legendary", effect: "High-tier crafting material used at Gupta.", sources: ["Legendary Chest"] },
            { name: "Imperfect Aja", rarity: "Legendary", effect: "High-tier crafting material used at Gupta.", sources: ["Legendary Chest"] },
            { name: "Maigot Recipe", rarity: "Rare", effect: "Quest item — get from Mr. Rengatei (do not skip dialogue) and give to Tonio Trussardi.", sources: ["Mr. Rengatei NPC (questline)"] },
            { name: "Burner Phone", rarity: "Uncommon", effect: "Quest item used in a mafia questline.", sources: ["Mafia drops"] },
            { name: "Manga Manuscripts", rarity: "Uncommon", effect: "Quest / collectible item (source uncertain on Trello).", sources: ["See in-game"] },
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
    const legendaryPlusCount = ITEM_CATEGORIES.reduce(
        (sum, cat) => sum + cat.items.filter((i) => i.rarity === "Legendary" || i.rarity === "Mythical").length,
        0,
    );
    const mythicalCount = ITEM_CATEGORIES.reduce(
        (sum, cat) => sum + cat.items.filter((i) => i.rarity === "Mythical").length,
        0,
    );

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
                    <div className="text-2xl font-bold text-yellow-400">{legendaryPlusCount}</div>
                    <div className="text-xs text-muted">Legendary+</div>
                </div>
                <div className="bg-surface border border-border rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-purple-400">{mythicalCount}</div>
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
