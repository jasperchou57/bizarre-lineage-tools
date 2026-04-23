import { Metadata } from "next";
import Image from "next/image";
import { ChevronRight, Star, ArrowRight, ExternalLink } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { withCanonical, SITE_URL } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Items" });
    return withCanonical({
        title: t("metaTitle"),
        description: t("metaDescription"),
    }, "/items");
}

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
] as const;

const ITEM_IMAGES: Record<string, { imageUrl: string; sourceUrl: string }> = {
    "Stand Arrow": { imageUrl: "https://trello.com/1/cards/69a48a326523bfba0a21ecca/attachments/69a48a356523bfba0a221356/download/image.png", sourceUrl: "https://trello.com/c/cgs8T2ym" },
    "Lucky Arrow": { imageUrl: "https://trello.com/1/cards/69a48a326523bfba0a21eccc/attachments/69a48a356523bfba0a221372/download/image.png", sourceUrl: "https://trello.com/c/GkaiurWp" },
    "Stone Mask": { imageUrl: "https://trello.com/1/cards/69a48a326523bfba0a21ee74/attachments/69a48a356523bfba0a2219b2/download/image.png", sourceUrl: "https://trello.com/c/LU6kjpH5" },
    "Stat Point Essence": { imageUrl: "https://trello.com/1/cards/69a48a326523bfba0a21ecd6/attachments/69a48a356523bfba0a22138f/download/image.png", sourceUrl: "https://trello.com/c/iPSpjeff" },
    "Stand Skin Essence": { imageUrl: "https://trello.com/1/cards/69a48a326523bfba0a21ee76/attachments/69a48a356523bfba0a2219b8/download/image.png", sourceUrl: "https://trello.com/c/2C8UIUzq" },
    "Stand Stat Essence": { imageUrl: "https://trello.com/1/cards/69a48a326523bfba0a21ee78/attachments/69a48a356523bfba0a2219be/download/image.png", sourceUrl: "https://trello.com/c/Xq6EdXTt" },
    "Stand Personality Essence": { imageUrl: "https://trello.com/1/cards/69a48a326523bfba0a21ee7a/attachments/69a48a356523bfba0a2219c4/download/image.png", sourceUrl: "https://trello.com/c/eFbT3L0d" },
    "Stand Conjuration Essence": { imageUrl: "https://trello.com/1/cards/69a48a326523bfba0a21ee7c/attachments/69a48a356523bfba0a2219ca/download/image.png", sourceUrl: "https://trello.com/c/kU1AtJbz" },
    "Custom Clothing Essence": { imageUrl: "https://trello.com/1/cards/69a48a326523bfba0a21eedc/attachments/69a48a356523bfba0a221ca7/download/image.png", sourceUrl: "https://trello.com/c/LInDdcHv" },
    "Dio's Diary": { imageUrl: "https://trello.com/1/cards/69a48a326523bfba0a21ed06/attachments/69a48a356523bfba0a22145d/download/image.png", sourceUrl: "https://trello.com/c/iqYhCj37" },
    "Red Stone of Aja": { imageUrl: "https://trello.com/1/cards/69a48a326523bfba0a21eeec/attachments/69a48a356523bfba0a221cdc/download/image.png", sourceUrl: "https://trello.com/c/05rFkTP3" },
    "Common Chest": { imageUrl: "https://trello.com/1/cards/69a48a326523bfba0a21ecce/attachments/69a48a356523bfba0a221378/download/image.png", sourceUrl: "https://trello.com/c/RRh0WyMs" },
    "Rare Chest": { imageUrl: "https://trello.com/1/cards/69a48a326523bfba0a21ecd0/attachments/69a48a356523bfba0a22137e/download/image.png", sourceUrl: "https://trello.com/c/Kb2Lw0s6" },
    "Legendary Chest": { imageUrl: "https://trello.com/1/cards/69a48a326523bfba0a21ecd2/attachments/69a48a356523bfba0a221384/download/image.png", sourceUrl: "https://trello.com/c/FbJI818T" },
    "Plank Skateboard": { imageUrl: "https://trello.com/1/cards/69a48a326523bfba0a21eee6/attachments/69a48a356523bfba0a221cc8/download/image.png", sourceUrl: "https://trello.com/c/6eqc4BSW" },
    "Skateboard": { imageUrl: "https://trello.com/1/cards/69a48a326523bfba0a21eee8/attachments/69a48a356523bfba0a221ccf/download/image.png", sourceUrl: "https://trello.com/c/i5eU4Wrb" },
    "Motorcycle": { imageUrl: "https://trello.com/1/cards/69a48a326523bfba0a21eeea/attachments/69a48a356523bfba0a221cd6/download/image.png", sourceUrl: "https://trello.com/c/MOe3EOT7" },
    "Stop Sign": { imageUrl: "https://trello.com/1/cards/69a48a326523bfba0a21ee84/attachments/69a48a356523bfba0a2219f1/download/image.png", sourceUrl: "https://trello.com/c/3qiSVPem" },
    "Shadow Axe": { imageUrl: "https://trello.com/1/cards/69a48a326523bfba0a21ee86/attachments/69a48a356523bfba0a221a08/download/image.png", sourceUrl: "https://trello.com/c/lYSSiOeA" },
    "Odachi": { imageUrl: "https://trello.com/1/cards/69a48a326523bfba0a21ee88/attachments/69a48a356523bfba0a221a1f/download/image.png", sourceUrl: "https://trello.com/c/w2WyRmBk" },
    "Katana": { imageUrl: "https://trello.com/1/cards/69a48a326523bfba0a21ee8a/attachments/69a48a356523bfba0a221a2c/download/image.png", sourceUrl: "https://trello.com/c/5eGyRxHU" },
    "Hammer": { imageUrl: "https://trello.com/1/cards/69a48a326523bfba0a21eeae/attachments/69a48a356523bfba0a221b6e/download/image.png", sourceUrl: "https://trello.com/c/Yz2hPkiK" },
    "Shovel": { imageUrl: "https://trello.com/1/cards/69a48a326523bfba0a21eeb0/attachments/69a48a356523bfba0a221b8d/download/image.png", sourceUrl: "https://trello.com/c/pqFk2zu2" },
    "Luck & Pluck": { imageUrl: "https://trello.com/1/cards/69a48a326523bfba0a21eeb2/attachments/69a48a356523bfba0a221ba7/download/image.png", sourceUrl: "https://trello.com/c/fASCRqcD" },
    "Fabric": { imageUrl: "https://trello.com/1/cards/69a48a326523bfba0a21ece8/attachments/69a48a356523bfba0a2213e9/download/image.png", sourceUrl: "https://trello.com/c/tKdwA8KD" },
    "Bronze Fragments": { imageUrl: "https://trello.com/1/cards/69a48a326523bfba0a21ecea/attachments/69a48a356523bfba0a2213ef/download/image.png", sourceUrl: "https://trello.com/c/D5IRUAdE" },
    "Acid": { imageUrl: "https://trello.com/1/cards/69a48a326523bfba0a21ecec/attachments/69a48a356523bfba0a2213fb/download/image.png", sourceUrl: "https://trello.com/c/cB4QEDmn" },
    "Leather": { imageUrl: "https://trello.com/1/cards/69a48a326523bfba0a21ecee/attachments/69a48a356523bfba0a221401/download/image.png", sourceUrl: "https://trello.com/c/edQaqLdh" },
    "Sapphire": { imageUrl: "https://trello.com/1/cards/69a48a326523bfba0a21ecf0/attachments/69a48a356523bfba0a221407/download/image.png", sourceUrl: "https://trello.com/c/uOZGrbjY" },
    "Ruby": { imageUrl: "https://trello.com/1/cards/69a48a326523bfba0a21ecf2/attachments/69a48a356523bfba0a22140d/download/image.png", sourceUrl: "https://trello.com/c/xcqvYV9k" },
    "Opal": { imageUrl: "https://trello.com/1/cards/69a48a326523bfba0a21ecf6/attachments/69a48a356523bfba0a221419/download/image.png", sourceUrl: "https://trello.com/c/sYn9CMxZ" },
    "Bones": { imageUrl: "https://trello.com/1/cards/69a48a326523bfba0a21ecf4/attachments/69a48a356523bfba0a221413/download/image.png", sourceUrl: "https://trello.com/c/O8GeVDIa" },
    "Silver Fragments": { imageUrl: "https://trello.com/1/cards/69a48a326523bfba0a21ecf8/attachments/69a48a356523bfba0a22141f/download/image.png", sourceUrl: "https://trello.com/c/fH6JwnDV" },
    "Gold Fragments": { imageUrl: "https://trello.com/1/cards/69a48a326523bfba0a21ecfa/attachments/69a48a356523bfba0a221425/download/image.png", sourceUrl: "https://trello.com/c/vqh7rfm2" },
    "Gold Coins": { imageUrl: "https://trello.com/1/cards/69a48a326523bfba0a21ed9e/attachments/69a48a356523bfba0a2216d9/download/image.png", sourceUrl: "https://trello.com/c/FISzlXU4" },
    "Lost Spirit": { imageUrl: "https://trello.com/1/cards/69a48a326523bfba0a21ed00/attachments/69a48a356523bfba0a22143f/download/image.png", sourceUrl: "https://trello.com/c/ZwgwqPpf" },
    "Vampire Fang": { imageUrl: "https://trello.com/1/cards/69a48a326523bfba0a21ed02/attachments/69a48a356523bfba0a221445/download/image.png", sourceUrl: "https://trello.com/c/20Sc0DBQ" },
    "Dio's Bone": { imageUrl: "https://trello.com/1/cards/69a48a326523bfba0a21ed04/attachments/69a48a356523bfba0a221451/download/image.png", sourceUrl: "https://trello.com/c/G2aRa5fy" },
    "Cosmic Radiation": { imageUrl: "https://trello.com/1/cards/69a48a326523bfba0a21ee3c/attachments/69a48a356523bfba0a221839/download/image.png", sourceUrl: "https://trello.com/c/bdA5kUhr" },
    "Meteor Fragments": { imageUrl: "https://trello.com/1/cards/69a48a326523bfba0a21ee3e/attachments/69a48a356523bfba0a22183f/download/image.png", sourceUrl: "https://trello.com/c/hWzg7JqH" },
    "Imperfect Aja": { imageUrl: "https://trello.com/1/cards/69a48a326523bfba0a21ee40/attachments/69a48a356523bfba0a221845/download/image.png", sourceUrl: "https://trello.com/c/O4wGpZS0" },
    "Maigot Recipe": { imageUrl: "https://trello.com/1/cards/69a48a326523bfba0a21ecfe/attachments/69a48a356523bfba0a221431/download/image.png", sourceUrl: "https://trello.com/c/Pa5BcNXQ" },
    "Burner Phone": { imageUrl: "https://trello.com/1/cards/69a48a326523bfba0a21eda0/attachments/69a48a356523bfba0a2216e5/download/image.png", sourceUrl: "https://trello.com/c/ZDJ4EbqC" },
    "Manga Manuscripts": { imageUrl: "https://trello.com/1/cards/69a48a326523bfba0a21ecfc/attachments/69a48a356523bfba0a22142b/download/image.png", sourceUrl: "https://trello.com/c/wSC3EwVI" },
};

const RARITY_COLORS: Record<string, string> = {
    Common: "text-gray-400 bg-gray-400/10 border-gray-400/20",
    Uncommon: "text-green-400 bg-green-400/10 border-green-400/20",
    Rare: "text-blue-400 bg-blue-400/10 border-blue-400/20",
    Legendary: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
    Mythical: "text-purple-400 bg-purple-400/10 border-purple-400/20",
};

export default async function ItemsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: "Items" });
    const tCommon = await getTranslations({ locale, namespace: "Common" });

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
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: tCommon("breadcrumbHome"), item: SITE_URL },
            { "@type": "ListItem", position: 2, name: t("breadcrumbCurrent"), item: `${SITE_URL}/items` },
        ],
    };

    type CategoryKey = "Stand Items" | "Essences" | "Special Items" | "Chests" | "Mounts" | "Weapons" | "Materials";

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            <nav className="flex items-center gap-2 text-sm text-muted mb-8" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-white transition-colors">{tCommon("breadcrumbHome")}</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-white" aria-current="page">{t("breadcrumbCurrent")}</span>
            </nav>

            <div className="relative w-full rounded-xl overflow-hidden mb-8">
                <Image src="/images/pages/items.png" alt={t("heroTitle")} width={800} height={450} className="w-full h-48 object-cover opacity-40" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
                <div className="absolute bottom-4 left-6">
                    <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-white">{t("heroTitle")}</h1>
                </div>
            </div>
            <p className="text-lg text-muted mb-10 leading-relaxed">{t("heroIntro", { count: totalItems })}</p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
                <div className="bg-surface border border-border rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-white">{totalItems}</div>
                    <div className="text-xs text-muted">{t("statTotal")}</div>
                </div>
                <div className="bg-surface border border-border rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-white">{ITEM_CATEGORIES.length}</div>
                    <div className="text-xs text-muted">{t("statCategories")}</div>
                </div>
                <div className="bg-surface border border-border rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-yellow-400">{legendaryPlusCount}</div>
                    <div className="text-xs text-muted">{t("statLegendaryPlus")}</div>
                </div>
                <div className="bg-surface border border-border rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-purple-400">{mythicalCount}</div>
                    <div className="text-xs text-muted">{t("statMythical")}</div>
                </div>
            </div>

            {ITEM_CATEGORIES.map((category) => (
                <section key={category.category} className="mb-12">
                    <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                        <Star className="h-5 w-5 text-accent-blue" /> {t(`categories.${category.category as CategoryKey}`)}
                    </h2>
                    <div className="space-y-3">
                        {category.items.map((item) => {
                            const media = ITEM_IMAGES[item.name];
                            return (
                                <div key={item.name} className="bg-surface border border-border rounded-xl p-5 flex gap-4">
                                    {media && (
                                        <div className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-background border border-border">
                                            <Image src={media.imageUrl} alt={item.name} fill sizes="80px" className="object-cover" loading="lazy" />
                                        </div>
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between gap-3 mb-2">
                                            <h3 className="font-bold text-white">{item.name}</h3>
                                            <span className={`px-2 py-1 text-xs font-mono font-bold rounded-full border whitespace-nowrap ${RARITY_COLORS[item.rarity]}`}>
                                                {item.rarity}
                                            </span>
                                        </div>
                                        <p className="text-sm text-muted mb-3">{item.effect}</p>
                                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                                            <div>
                                                <span className="text-xs text-muted">{t("obtainedFrom")} </span>
                                                <span className="text-xs text-white">{item.sources.join(" · ")}</span>
                                            </div>
                                            {media && (
                                                <a href={media.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-accent-blue hover:text-white transition-colors">
                                                    {tCommon("officialCard")} <ExternalLink className="h-3 w-3" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>
            ))}

            <section>
                <h2 className="text-2xl font-bold text-white mb-4">{t("relatedTitle")}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Link href="/codes" className="bg-surface border border-border rounded-lg p-4 hover:border-accent-blue/50 transition-colors group">
                        <div className="font-bold text-white group-hover:text-accent-blue transition-colors flex items-center gap-1">{t("related.codesTitle")} <ArrowRight className="h-3 w-3" /></div>
                        <div className="text-xs text-muted mt-1">{t("related.codesSub")}</div>
                    </Link>
                    <Link href="/raids" className="bg-surface border border-border rounded-lg p-4 hover:border-accent-blue/50 transition-colors group">
                        <div className="font-bold text-white group-hover:text-accent-blue transition-colors flex items-center gap-1">{t("related.raidsTitle")} <ArrowRight className="h-3 w-3" /></div>
                        <div className="text-xs text-muted mt-1">{t("related.raidsSub")}</div>
                    </Link>
                    <Link href="/skins" className="bg-surface border border-border rounded-lg p-4 hover:border-accent-blue/50 transition-colors group">
                        <div className="font-bold text-white group-hover:text-accent-blue transition-colors flex items-center gap-1">{t("related.skinsTitle")} <ArrowRight className="h-3 w-3" /></div>
                        <div className="text-xs text-muted mt-1">{t("related.skinsSub")}</div>
                    </Link>
                    <Link href="/world-events" className="bg-surface border border-border rounded-lg p-4 hover:border-accent-blue/50 transition-colors group">
                        <div className="font-bold text-white group-hover:text-accent-blue transition-colors flex items-center gap-1">{t("related.worldEventsTitle")} <ArrowRight className="h-3 w-3" /></div>
                        <div className="text-xs text-muted mt-1">{t("related.worldEventsSub")}</div>
                    </Link>
                </div>
            </section>
        </div>
    );
}
