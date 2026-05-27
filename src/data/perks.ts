export type OfficialPerk = {
    name: string;
    effect: string;
    npc?: string;
    cost?: string;
};

export type OfficialPerkSection = {
    sourceLabel: string;
    sourceNote?: string;
    sourceUrl?: string;
    perks: OfficialPerk[];
};

export const TRAITS_SOURCE_URL = "https://trello.com/c/qR0xwimj/143-untitled";

export const OFFICIAL_PERK_SECTIONS: OfficialPerkSection[] = [
    {
        sourceLabel: "Money Store (Rahaj)",
        sourceUrl: "https://trello.com/c/U5Bx5pOP/265-rahaj-shop-npc",
        sourceNote: "Official Trello trait card lists these as Money Store traits.",
        perks: [
            { name: "The Fever", effect: "Defeating a player steals 10% of their stats for 20 seconds. 10s cooldown." },
            { name: "Hustle Bones", effect: "All money gained is increased by +5%." },
            { name: "Curve and Light", effect: "Reduce Stand Awakening cooldown by 10%." },
            { name: "I'm in Your Area", effect: "Enemies at close range deal 8% less damage and take 8% more damage from you." },
        ],
    },
    {
        sourceLabel: "Tutorial",
        sourceUrl: "https://trello.com/c/z0bfNfpT/228-untitled",
        perks: [
            { name: "Journeyman", effect: "+5% experience boost." },
        ],
    },
    {
        sourceLabel: "Prestige Shop",
        sourceUrl: "https://trello.com/c/DyPXYXUF/26-untitled",
        perks: [
            { name: "Bloodlust", effect: "After being hit, your HP rapidly drains to 5%. While active, gain +100% penetration, +50% damage, and lifesteal." },
        ],
    },
    {
        sourceLabel: "Side Quest Traits",
        sourceNote: "Granted by completing specific side-quest NPC quests where the official trait card links a quest giver.",
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
        sourceUrl: "https://trello.com/c/5pNnfDxD/140-untitled",
        perks: [
            { name: "Commanding Presence", effect: "Other gang members gain 5% damage and defense, stacking up to 30% globally." },
        ],
    },
    {
        sourceLabel: "Gang Territories",
        sourceUrl: "https://trello.com/c/5pNnfDxD/140-untitled",
        perks: [
            { name: "The Boss", effect: "Each additional gang member in the server increases money gain by 4%, up to 28%." },
            { name: "Protection Racket", effect: "While in a gang-controlled area, incoming damage is reduced by 20%." },
            { name: "Loyal Enforcer", effect: "Gang contracts grant 25% more experience and money." },
        ],
    },
    {
        sourceLabel: "Jotaro Kujo Raid",
        sourceUrl: "https://trello.com/c/pfm82fze/141-untitled",
        perks: [
            { name: "True Warrior", effect: "All healing is 50% less effective. Gain 10% Defense. Being ragdolled grants 15% defense for 10 seconds." },
            { name: "Grappler", cost: "~360 Jotaro Tokens", effect: "Grab moves deal 15% more damage." },
            { name: "Intimidation", cost: "~368 Jotaro Tokens", effect: "After grabbing an opponent, they take 10% increased damage for 7 seconds." },
            { name: "Powerful", effect: "Attacks cannot deal more than 10% of your Max Health. When an attack reaches that threshold, it takes away Power and reduces your evasive bar." },
        ],
    },
    {
        sourceLabel: "Avdol Raid",
        sourceUrl: "https://trello.com/c/pfm82fze/141-untitled",
        perks: [
            { name: "King of Flames", cost: "~980 Avdol Tokens", effect: "Stand abilities apply Burn." },
            { name: "Conjurer", cost: "~242 Avdol Tokens", effect: "Doubles Stand Conjuration gained." },
            { name: "Disaster Flames", effect: "Knocking an enemy back that's on Fire ignites their flames, causing an explosion. This ignites both of you on fire." },
            { name: "Flame Keeper", effect: "The Flame status effect now heals you instead. Health regeneration is reduced by 50%." },
            { name: "The Magician", effect: "Evading and then landing an attack makes the attack deal knockback and 100% more damage." },
        ],
    },
    {
        sourceLabel: "DIO Raid",
        sourceUrl: "https://trello.com/c/pfm82fze/141-untitled",
        perks: [
            { name: "Emperor of Time", cost: "~420 DIO Tokens", effect: "Time-altering abilities last 2 seconds longer." },
            { name: "Leech", effect: "Lifesteal is 50% more potent, but costs a small amount of power when performed." },
            { name: "The Godfather", cost: "~412 DIO Tokens", effect: "Stand abilities apply lifesteal. 5s cooldown." },
            { name: "Retribution", effect: "Backstab attacks apply the Bleed status effect and lifesteal." },
        ],
    },
    {
        sourceLabel: "Yoshikage Kira Raid",
        sourceUrl: "https://trello.com/c/pfm82fze/141-untitled",
        perks: [
            { name: "A Quiet Life", cost: "~392 Kira Tokens", effect: "After taking damage, regenerate 5% health over 5 seconds. 30s cooldown." },
            { name: "Serial Killer", cost: "~436 Kira Tokens", effect: "Deal 20% more damage to enemies below 40% health." },
            { name: "Siphon", effect: "You are unable to regenerate any Power at all. Steal your opponent's Power when landing an attack." },
        ],
    },
    {
        sourceLabel: "Made in Heaven",
        sourceUrl: "https://trello.com/c/FejzEBC1/47-made-in-heaven",
        perks: [
            { name: "Rapid Flow", effect: "Starting to sprint grants a short speed boost. 5s cooldown." },
            { name: "Accelerated Instinct", effect: "Doubles dodge frames." },
            { name: "Inevitability", effect: "Gain 5% penetration. Penetration increases with speed boosts." },
        ],
    },
    {
        sourceLabel: "C-Moon",
        sourceUrl: "https://trello.com/c/nxyRnBHL/3-c-moon",
        perks: [
            { name: "Gravitational Force", effect: "Blocking an attacker slows them for 3 seconds. 5s cooldown." },
            { name: "Martial Artist", effect: "Martial Art attacks deal 10% more damage." },
            { name: "No Escape", effect: "Blockbreaking an opponent prevents evasion for 3 seconds. 10s cooldown." },
        ],
    },
    {
        sourceLabel: "Whitesnake",
        sourceUrl: "https://trello.com/c/1P4FiqHS/7-whitesnake",
        perks: [
            { name: "Null Memory", effect: "The first attack from an opponent deals 25% less damage." },
            { name: "Synthetic Focus", effect: "At full power, gain 20% defense." },
            { name: "Autocrat", effect: "After recovering from ragdoll, gain 50% defense for 1.25 seconds." },
        ],
    },
    {
        sourceLabel: "Star Platinum",
        sourceUrl: "https://trello.com/c/z0A7ab29/1-star-platinum",
        perks: [
            { name: "Unyielding Force", effect: "Landing 3 hits quickly grants 5% damage for 6 seconds. 20s cooldown." },
            { name: "Fists of Fury", effect: "Blockbreaking an opponent ragdolls them. 10s cooldown." },
            { name: "Absolute Destruction", effect: "Knocking an opponent into a wall blockbreaks them. 15s cooldown." },
        ],
    },
    {
        sourceLabel: "The World",
        sourceUrl: "https://trello.com/c/va8oGrfk/9-the-world",
        perks: [
            { name: "King of Time", effect: "Damage dealt during timestop is 10% more effective." },
            { name: "Theatrical", effect: "Projectiles deal 10% more damage." },
            { name: "Play with Your Food", effect: "For each percent of health above 80%, gain 1% damage. Below 80%, lose 1% damage per percent, capped at a 10% debuff." },
        ],
    },
    {
        sourceLabel: "The World High Voltage",
        sourceUrl: "https://trello.com/c/I64F1Mhj/156-the-world-high-voltage",
        perks: [
            { name: "Shockflow", effect: "Gain 1% damage per 10% missing power." },
            { name: "Static Override", effect: "Below 25% power, gain a movement speed boost for 7 seconds. 15s cooldown." },
            { name: "Shock Conduit", effect: "After a perfect block, breaking guard within 6 seconds grants 300% power regen for 7 seconds. 20s cooldown." },
        ],
    },
    {
        sourceLabel: "King Crimson",
        sourceUrl: "https://trello.com/c/GV5BfFuA/33-king-crimson",
        perks: [
            { name: "Hidden Impact", effect: "Dodging and then blocking an attack within 3 seconds grants +15% defense for 10 seconds." },
            { name: "Forecasted Pain", effect: "Enemies under 50% health have their Blockbroken hitstun increased by 25%." },
            { name: "Two Steps Ahead", effect: "Dodging then blocking within 3 seconds grants 15% defense for 10 seconds. 20s cooldown." },
        ],
    },
    {
        sourceLabel: "Gold Experience",
        sourceUrl: "https://trello.com/c/yTW1aDTO/24-golden-experience",
        perks: [
            { name: "Nature's Armor", effect: "Gaining a status effect grants +25% defense for 10 seconds. 22s cooldown." },
            { name: "Vital Instinct", effect: "Below 30% health, landing attacks grants +5% power." },
            { name: "Life Pulse", effect: "Outgoing and self healing remove status effects." },
        ],
    },
    {
        sourceLabel: "Stone Free",
        sourceUrl: "https://trello.com/c/6t63VGzW/153-stone-free",
        perks: [
            { name: "Line Tension", effect: "Every third attack that isn't a basic attack deals bonus true damage based on 4% of the target's current health. 15s cooldown." },
            { name: "Resourceful", effect: "Deal +5% more global damage." },
            { name: "Resilient", effect: "Deal +5% more damage to opponents with +5% more max health than you." },
        ],
    },
    {
        sourceLabel: "Weather Report",
        sourceUrl: "https://trello.com/c/x0SLv9vK/161-weather-report",
        perks: [
            { name: "Elementalist", effect: "Attacks involving the weather deal +10% more damage." },
            { name: "Thunderous", effect: "Attacks involving lightning deal +10% more damage." },
            { name: "Oppression", effect: "Attacks involving knockback deal +10% more damage." },
        ],
    },
    {
        sourceLabel: "Killer Queen",
        sourceUrl: "https://trello.com/c/nH0ru9UE/30-killer-queen",
        perks: [
            { name: "Detonate", effect: "Blockbreaking an opponent applies the flame status effect to them. 20s cooldown." },
            { name: "Heart Attack", effect: "Your damage is now done over 3 seconds. Deal -15% less damage, but gain 45% penetration and uncap penetration." },
            { name: "No Witnesses", effect: "Defeating an enemy grants +15% damage for 10 seconds." },
        ],
    },
    {
        sourceLabel: "Magician's Red",
        sourceUrl: "https://trello.com/c/ItjTq6MF/50-magicians-red",
        perks: [
            { name: "Ignition Boost", effect: "Burning opponents take +10% more damage from you and deal -20% less damage to you." },
            { name: "Scorchstep", effect: "Dodging an opponent's attack puts the flame status effect on both of you. 7s cooldown." },
            { name: "Kindled Resolve", effect: "If you are on fire while an opponent attacks you, ignite your opponent on fire as well." },
        ],
    },
    {
        sourceLabel: "Crazy Diamond",
        sourceUrl: "https://trello.com/c/57dneSGF/17-crazy-diamond",
        perks: [
            { name: "Healing Blow", effect: "The next outgoing healing ability heals +40% more. 15s cooldown." },
            { name: "Good Friend", effect: "Outgoing healing is +10% more effective." },
            { name: "Brute Force", effect: "Barrages deal +20% more damage." },
        ],
    },
    {
        sourceLabel: "Purple Haze",
        sourceUrl: "https://trello.com/c/DjXeAcRs/6-purple-haze",
        perks: [
            { name: "Corrupted Instinct", effect: "Enemies with less health than you take 5% more damage." },
            { name: "Frenzied State", effect: "Gain +20% damage and receive 40% damage." },
            { name: "Unpredictable", effect: "Sometimes your attacks reflect onto yourself. When they do, gain +25% damage, +25% penetration, and lifesteal for 10 seconds. 11s cooldown." },
        ],
    },
    {
        sourceLabel: "Red Hot Chili Pepper",
        sourceUrl: "https://trello.com/c/zMfqBNcg/223-red-hot-chili-pepper",
        perks: [
            { name: "Charge Conduction", effect: "Holding block grants 50% power regeneration." },
            { name: "Amped Up", effect: "At max power, attacks deal 5% more damage." },
            { name: "Blackout", effect: "Blockbreaking drains 10% of the enemy's power bar." },
        ],
    },
    {
        sourceLabel: "The Hand",
        sourceUrl: "https://trello.com/c/1XjEDOV7/274-the-hand",
        perks: [
            { name: "Erasure", effect: "Enemies under 5% health are automatically executed. Excludes special NPCs." },
            { name: "Impatient", effect: "Power regeneration increases by 50% under 50% HP." },
            { name: "Reckless", effect: "Being blockbroken gives your next attack +25% more damage." },
        ],
    },
    {
        sourceLabel: "Anubis",
        sourceUrl: "https://trello.com/c/VlmIhCCD/4-anubis",
        perks: [
            { name: "Sheathe", effect: "Counter attacks deal 10% more damage." },
            { name: "The Blade", effect: "Slash damage is increased by +10%." },
            { name: "Flow State", effect: "When going below 50% health, heal 10% HP and power instantly. 180s cooldown." },
        ],
    },
];
