export type PersonalityTier = "Mythical" | "Legendary" | "Rare" | "Uncommon" | "Common";

export type OfficialPersonality = {
    name: string;
    tier: PersonalityTier;
    effect: string;
};

export const PERSONALITY_SOURCE_URL = "https://trello.com/c/Sy86yPet/251-untitled";

export const OFFICIAL_PERSONALITIES: OfficialPersonality[] = [
    { tier: "Mythical", name: "Elegant", effect: "Reduce Stand cooldowns by 10%. Attacking a victim grants a short burst of speed. Damage slightly scales with movement speed." },
    { tier: "Mythical", name: "Feral", effect: "+10% Damage, -10% Defense." },
    { tier: "Mythical", name: "Demonic", effect: "Lifesteal is 50% more effective." },
    { tier: "Mythical", name: "Transcendent", effect: "+7% Damage, +7% Power Regeneration, +7% Global Defense." },
    { tier: "Legendary", name: "Methodical", effect: "Perfect Blocking restores 20% Power and grants a small speed boost." },
    { tier: "Legendary", name: "Dominant", effect: "Deal 25% more damage to opponents that haven't hit you." },
    { tier: "Legendary", name: "Cursed", effect: "+4% Damage, +4% Power Regeneration, +4% Global Defense." },
    { tier: "Legendary", name: "Rhythmic", effect: "+35% Power Regeneration." },
    { tier: "Legendary", name: "Artistic", effect: "Block Breaking an opponent makes them Vulnerable for 5 seconds. Vulnerable targets take 20% more damage." },
    { tier: "Legendary", name: "Suffocating", effect: "Damage-over-time effects are 25% more potent." },
    { tier: "Rare", name: "Determined", effect: "While above 70% Health, deal 4% more damage." },
    { tier: "Rare", name: "Compassionate", effect: "Healing output is 25% more effective." },
    { tier: "Rare", name: "Furious", effect: "Below 30% Health, deal 10% more damage." },
    { tier: "Rare", name: "Slugger", effect: "Block Breaking skills deal 10% more damage." },
    { tier: "Rare", name: "Fearful", effect: "Being Block Broken grants 20% Defense for 2 seconds." },
    { tier: "Rare", name: "Durable", effect: "Status effect damage is 100% less potent." },
    { tier: "Uncommon", name: "Curious", effect: "Gain 20% more Evasive gain." },
    { tier: "Uncommon", name: "Astute", effect: "Blocked attacks deal 10% more chip damage." },
    { tier: "Uncommon", name: "Predictive", effect: "Counter skills deal 10% more damage." },
    { tier: "Uncommon", name: "Kind", effect: "Healing output is 10% more effective." },
    { tier: "Common", name: "Erratic", effect: "Dodging an attack restores 5% Power." },
    { tier: "Common", name: "Energetic", effect: "Gain 10% more Power Regeneration." },
    { tier: "Common", name: "Cowardly", effect: "Reduces the effectiveness of slow effects while low on Health." },
    { tier: "Common", name: "Happy", effect: "Increase Health Regeneration by 5%." },
    { tier: "Common", name: "Firm", effect: "Blocking attacks grants Power." },
    { tier: "Common", name: "Arrogant", effect: "At maximum Health, gain 5% more damage." },
];

export const PERSONALITY_TIERS: PersonalityTier[] = ["Mythical", "Legendary", "Rare", "Uncommon", "Common"];
