export const OFFICIAL_RECHECKED_AT = "May 27, 2026";

export type OfficialKeybind = {
    input: string;
    action: string;
    source: "Roblox description" | "Official Trello Keybinds card";
};

export const OFFICIAL_KEYBINDS: OfficialKeybind[] = [
    { input: "M", action: "Menu", source: "Roblox description" },
    { input: "Tab", action: "Summon Stand", source: "Roblox description" },
    { input: "W + W", action: "Sprint", source: "Roblox description" },
    { input: "Q", action: "Dash / Dodge", source: "Roblox description" },
    { input: "F", action: "Block / Perfect Block", source: "Official Trello Keybinds card" },
    { input: "G", action: "Evasive", source: "Roblox description" },
    { input: "H", action: "Awaken / Ultimate", source: "Roblox description" },
    { input: "M1", action: "Melee combo", source: "Roblox description" },
    { input: "Right Click / M2", action: "Critical Attack", source: "Official Trello Keybinds card" },
    { input: "E, R, Z, X, C", action: "Stand ability buttons", source: "Official Trello Keybinds card" },
    { input: "1, 2, 3, etc.", action: "Other ability buttons", source: "Official Trello Keybinds card" },
    { input: "` / Tilde", action: "Inventory", source: "Official Trello Keybinds card" },
    { input: "Ctrl", action: "Slide", source: "Official Trello Keybinds card" },
    { input: "Slide + Space", action: "Slide Jump", source: "Official Trello Keybinds card" },
    { input: "W + W + M1", action: "Sprinting Attack", source: "Official Trello Keybinds card" },
    { input: "B", action: "Mount", source: "Official Trello Keybinds card" },
    { input: "T", action: "Equip Weapon", source: "Official Trello Keybinds card" },
    { input: "N", action: "Eagle Vision / Highlights", source: "Official Trello Keybinds card" },
];

export const OFFICIAL_GAME_LINKS = [
    {
        label: "Roblox Game",
        href: "https://www.roblox.com/games/14890802310/Bizarre-Lineage",
        note: "Live Roblox title, public description, controls, and universe update timestamp.",
    },
    {
        label: "Roblox Group",
        href: "https://www.roblox.com/communities/33161040/Bizarre-Collective",
        note: "Official Bizarre Collective Roblox community linked from the public Trello.",
    },
    {
        label: "Official Discord",
        href: "https://discord.gg/bizarrelineage",
        note: "Official Discord invite linked from the public Trello.",
    },
    {
        label: "Official Trello",
        href: "https://trello.com/b/wtzgwqIf/official-bizarre-lineage-%E2%9E%B5",
        note: "Public Trello board used for cards, labels, obtainment notes, NPCs, and source boundaries.",
    },
];
