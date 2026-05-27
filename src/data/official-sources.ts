export const OFFICIAL_DATA_LAST_CHECKED = "May 27, 2026";

export const OFFICIAL_LINKS = {
    robloxGame: "https://www.roblox.com/games/14890802310/Bizarre-Lineage",
    robloxGameApi: "https://games.roblox.com/v1/games?universeIds=5130394318",
    trelloBoard: "https://trello.com/b/wtzgwqIf/official-bizarre-lineage-%E2%9E%B5",
    trelloCodes: "https://trello.com/c/5p9hzQJD/97-codes",
    trelloGameLinks: "https://trello.com/c/mZbDMock/103-game-discord-links",
    keybinds: "https://trello.com/c/amGuLqFm/101-keybinds",
    traits: "https://trello.com/c/qR0xwimj/143-untitled",
    personalities: "https://trello.com/c/Sy86yPet/251-untitled",
    robloxGroup: "https://www.roblox.com/communities/33161040/Bizarre-Collective",
    officialDiscord: "https://discord.gg/bizarrelineage",
    standArrow: "https://trello.com/c/cgs8T2ym/40-stand-arrow",
    luckyArrow: "https://trello.com/c/GkaiurWp/41-lucky-arrow",
    stoneMask: "https://trello.com/c/LU6kjpH5/253-stone-mask",
    prestige: "https://trello.com/c/DyPXYXUF/26-untitled",
    archMage: "https://trello.com/c/4felHx0e/267-arch-mage",
    worldEvents: "https://trello.com/c/YwXD6ymL/139-untitled",
    conjuringStand: "https://trello.com/c/ZC9Qh1WW/133-untitled",
    innerWorld: "https://trello.com/c/UEKM4qna/279-untitled",
    subAbilityOverview: "https://trello.com/c/84wtaVY5/129-untitled",
    vampire: "https://trello.com/c/L26pFPlh/5-untitled",
    elderVampire: "https://trello.com/c/1G09TbPN/268-elder-vampire",
    hamon: "https://trello.com/c/eKrdspTD/39-untitled",
    cyborg: "https://trello.com/c/r6iDMK1B/142-untitled",
    boxing: "https://trello.com/c/ZVI1Q4NI/36-untitled",
    kendo: "https://trello.com/c/q1GCTrpD/35-untitled",
    karate: "https://trello.com/c/9ug3bwDN/37-untitled",
    journeyToHeaven: "https://trello.com/c/4yhPInv9/25-untitled",
    pucci: "https://trello.com/c/NIs0rxcl/270-pucci",
    whitesnake: "https://trello.com/c/1P4FiqHS/7-whitesnake",
    cmoon: "https://trello.com/c/nxyRnBHL/3-c-moon",
    madeInHeaven: "https://trello.com/c/FejzEBC1/47-made-in-heaven",
    commonChest: "https://trello.com/c/RRh0WyMs/42-common-chest",
    rareChest: "https://trello.com/c/Kb2Lw0s6/43-rare-chest",
    legendaryChest: "https://trello.com/c/FbJI818T/44-legendary-chest",
} as const;

export type SourceTier = {
    name: string;
    status: "Primary" | "Verified" | "Secondary" | "Internal";
    useFor: string;
    notFor: string;
};

export const SOURCE_TIERS: SourceTier[] = [
    {
        name: "Official Roblox",
        status: "Primary",
        useFor: "Live game title, creator, public description, controls, visits, favorites, server/player status, and Roblox update timestamp.",
        notFor: "Detailed quest steps, drop rates, or balance numbers that are not printed on the Roblox page/API.",
    },
    {
        name: "Official Trello",
        status: "Primary",
        useFor: "Publicly documented cards: Stands, evolutions, items, NPC locations, codes card, prestige notes, raids, world events, and card labels.",
        notFor: "Anything the public card does not say explicitly, such as exact Stand Arrow percentages or full boss HP tables.",
    },
    {
        name: "In-game tested",
        status: "Verified",
        useFor: "Behavior that can be reproduced in the live game and recorded with the date, server state, and exact steps.",
        notFor: "Permanent balance claims unless they are rechecked after major updates.",
    },
    {
        name: "Community-reported",
        status: "Secondary",
        useFor: "Early code reports, meta rumors, and update-watch items that are useful to track but not yet official.",
        notFor: "Official patch notes, final rankings, or planner scoring changes.",
    },
    {
        name: "Site-maintained planner data",
        status: "Internal",
        useFor: "Build Planner scores, Tier List placement, matchup notes, and best-build suggestions.",
        notFor: "Official game balance data. These notes must be labeled as site-maintained.",
    },
];

export const BEGINNER_CONFIRMED_FACTS = [
    {
        title: "The current Roblox experience is Update 1",
        body: "Roblox currently names the experience [UPDATE 1] Bizarre Lineage, lists Bizarre Collective as creator, and shows a public update timestamp of 2026-05-09 19:47 UTC.",
        sourceLabel: "Roblox game API",
        sourceUrl: OFFICIAL_LINKS.robloxGame,
    },
    {
        title: "Basic controls are documented on Roblox",
        body: "The Roblox description lists TAB for Stand summon, M1/M2 for melee and critical attacks, E/R/Z/X/C/V for Stand skills, 1/2/3/4 for other skills, Q dash, F block, G evasive, H awaken or ultimate, W+W sprint, and M menu. The official Trello Keybinds card adds Inventory, Slide, Mount, Equip Weapon, and Eagle Vision inputs.",
        sourceLabel: "Roblox game page + official Trello Keybinds card",
        sourceUrl: OFFICIAL_LINKS.robloxGame,
    },
    {
        title: "Stand Arrow is the documented Stand entry item",
        body: "The official Trello Stand Arrow card says Stand Arrows can be found on the ground or obtained from Common, Rare, and Legendary chests.",
        sourceLabel: "Official Trello Stand Arrow card",
        sourceUrl: OFFICIAL_LINKS.standArrow,
    },
    {
        title: "Lucky Arrow is for skins, not confirmed higher Stand rarity",
        body: "The official Trello Lucky Arrow card says the item guarantees a random skin on any Stand and lists Prestige shop, Raid Shops, and Legendary Chest as acquisition paths.",
        sourceLabel: "Official Trello Lucky Arrow card",
        sourceUrl: OFFICIAL_LINKS.luckyArrow,
    },
    {
        title: "Prestige is documented through Arch Mage",
        body: "The official Prestige card says prestige costs 10,000 Cash and requires talking to Arch Mage in the Hospital. The Arch Mage card places that NPC at Bus Stop 10.",
        sourceLabel: "Official Trello Prestige and Arch Mage cards",
        sourceUrl: OFFICIAL_LINKS.prestige,
    },
    {
        title: "World Events are timed server-wide activities",
        body: "The official World Events card says World Events are limited-time, server-wide activities and spawn every 20 minutes. The public card names Graveyard Uprising and Deathmatch.",
        sourceLabel: "Official Trello World Events card",
        sourceUrl: OFFICIAL_LINKS.worldEvents,
    },
    {
        title: "Official community links are listed on Trello",
        body: "The public Trello Game Discord & Links card lists the Roblox game page, Bizarre Collective Roblox group, and official Discord invite.",
        sourceLabel: "Official Trello Game Discord & Links card",
        sourceUrl: OFFICIAL_LINKS.trelloGameLinks,
    },
];

export const MADE_IN_HEAVEN_CONFIRMED_FACTS = [
    {
        title: "Official list placement",
        body: "Made in Heaven is on the official Trello [EVOLUTIONS] list, not the normal [STANDS] list.",
        sourceLabel: "Official Trello Made in Heaven card",
        sourceUrl: OFFICIAL_LINKS.madeInHeaven,
    },
    {
        title: "Official label",
        body: "The public Made in Heaven card carries the Special label.",
        sourceLabel: "Official Trello Made in Heaven card",
        sourceUrl: OFFICIAL_LINKS.madeInHeaven,
    },
    {
        title: "Journey to Heaven entry point",
        body: "The Journey to Heaven card says the questline requires 1 Prestige and starts by talking to Pucci near Bus Stop 18 inside Cultist Castle.",
        sourceLabel: "Official Trello Journey to Heaven card",
        sourceUrl: OFFICIAL_LINKS.journeyToHeaven,
    },
    {
        title: "Pucci location",
        body: "The Pucci card says Pucci is found in Dio's Chapel, at Bus Stop 18, and offers information about Journey to Heaven.",
        sourceLabel: "Official Trello Pucci card",
        sourceUrl: OFFICIAL_LINKS.pucci,
    },
    {
        title: "Related official cards",
        body: "Whitesnake is listed as Mythical on the [STANDS] list; C-Moon and Made in Heaven are both listed as Special on the [EVOLUTIONS] list.",
        sourceLabel: "Official Trello Stand and Evolution cards",
        sourceUrl: OFFICIAL_LINKS.whitesnake,
    },
];

export const MADE_IN_HEAVEN_MOVES = [
    "Barrage [E]",
    "Infinite Pursuit [R+R]",
    "Heaven's Wrath [Z]",
    "Knife Massacre [X+X]",
    "Light Speed [C]",
    "Acceleration [V]",
    "Awakening [H]",
    "Awakening Move [H+H]",
] as const;

export const MADE_IN_HEAVEN_UNCONFIRMED = [
    "The public cards we checked do not publish a complete objective-by-objective Journey to Heaven checklist after talking to Pucci.",
    "The public cards we checked do not publish exact time estimates, required damage numbers, or drop-rate percentages for the route.",
    "The Build Planner and Tier List can recommend Made in Heaven, but those rankings are site-maintained notes, not official Trello balance data.",
] as const;

export const AWAKENING_CONFIRMED_FACTS = [
    {
        title: "Awakening is documented through Inner World",
        body: "The official Inner World card says Inner World is used to fight yourself to push stat limits, raise conjuration, or awaken your Stand.",
        sourceLabel: "Official Trello Inner World card",
        sourceUrl: OFFICIAL_LINKS.innerWorld,
    },
    {
        title: "Gym mat is the documented entry point",
        body: "The official Inner World card says you enter your Inner World by interacting with the mat in the gym.",
        sourceLabel: "Official Trello Inner World card",
        sourceUrl: OFFICIAL_LINKS.innerWorld,
    },
    {
        title: "The awakening option is named on Trello",
        body: "The Inner World clone offers the option 'I want to surpass my limits'; the same public card says that option unlocks awakening.",
        sourceLabel: "Official Trello Inner World card",
        sourceUrl: OFFICIAL_LINKS.innerWorld,
    },
    {
        title: "The public requirement is Level 50 and Stand Conjuration 100",
        body: "The Inner World card lists the requirement as Level 50 and Stand Conjuration 100 for the awakening option.",
        sourceLabel: "Official Trello Inner World card",
        sourceUrl: OFFICIAL_LINKS.innerWorld,
    },
    {
        title: "Conjuration can be progressed through normal play",
        body: "The Conjuring Your Stand card says conjuration can be gained by doing missions, killing NPCs or players, winning ranked gamemodes, and winning PvP missions. It also calls the gym mat one of the quickest ways to obtain conjuration.",
        sourceLabel: "Official Trello Conjuring Your Stand card",
        sourceUrl: OFFICIAL_LINKS.conjuringStand,
    },
] as const;

export const AWAKENING_UNCONFIRMED = [
    "The public official cards checked here do not publish boss HP values for awakening.",
    "The public official cards checked here do not say Jotaro or DIO are required awakening bosses.",
    "The public official cards checked here do not publish a fastest route, exact clear time, or best Stand ranking for awakening.",
    "Stand-specific H / H+H move effects should be read from each official Stand or Evolution card where available.",
] as const;

export const VAMPIRE_CONFIRMED_FACTS = [
    {
        title: "Stone Mask is the official Vampire entry item",
        body: "The official Stone Mask card says the item turns you into a Vampire upon use. It lists shop purchase and Common, Rare, and Legendary chests as obtainment paths.",
        sourceLabel: "Official Trello Stone Mask card",
        sourceUrl: OFFICIAL_LINKS.stoneMask,
    },
    {
        title: "Vampire abilities come from Elder Vampire quests",
        body: "The official Vampire card says you unlock Vampire abilities by talking to Elder Vampire in Dio's Chapel and completing his quests.",
        sourceLabel: "Official Trello Vampire card",
        sourceUrl: OFFICIAL_LINKS.vampire,
    },
    {
        title: "Elder Vampire is placed at Bus Stop 18",
        body: "The official Elder Vampire card places the NPC at Bus Stop 18, inside the castle area where the DIO raid is located.",
        sourceLabel: "Official Trello Elder Vampire card",
        sourceUrl: OFFICIAL_LINKS.elderVampire,
    },
    {
        title: "Vampire passive regeneration is documented",
        body: "The public Vampire card says Vampires have a red meter for bonus regeneration, passive regeneration at all times, +0.02 HP regeneration, and +0.04 HP with High-Speed Regeneration.",
        sourceLabel: "Official Trello Vampire card",
        sourceUrl: OFFICIAL_LINKS.vampire,
    },
] as const;

export const VAMPIRE_MOVES = [
    {
        name: "Space Ripper Stingy Eyes",
        body: "The official Vampire card describes pressurized fluid jets from the eyes that stun and burn the target.",
    },
    {
        name: "Leeching Terror",
        body: "The official Vampire card describes a grab that takes health from the opponent and heals the user.",
    },
    {
        name: "Flash Freeze",
        body: "The official Vampire card describes an uppercut into a freeze and slam that stuns the opponent on the ground.",
    },
] as const;

export const NIGHT_VAMPIRE_UNCONFIRMED = [
    "The public official Trello cards checked here do not publish a separate Night Vampire upgrade card.",
    "The public official Trello cards checked here do not confirm a Level 50 Night Vampire upgrade quest.",
    "The public official Trello cards checked here do not publish Night Vampire-only cooldowns, keybinds, sun-damage rules, or best Stand pairings.",
    "This page therefore treats 'Night Vampire' as an unconfirmed search topic and only presents official base Vampire facts.",
] as const;

export const FIGHTING_STYLE_SOURCE_LINKS = {
    boxing: OFFICIAL_LINKS.boxing,
    kendo: OFFICIAL_LINKS.kendo,
    karate: OFFICIAL_LINKS.karate,
} as const;

export const SUB_ABILITY_SOURCE_LINKS = {
    hamon: OFFICIAL_LINKS.hamon,
    vampire: OFFICIAL_LINKS.vampire,
    cyborg: OFFICIAL_LINKS.cyborg,
} as const;
