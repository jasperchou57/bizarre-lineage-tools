export type OfficialDirectoryEntry = {
    name: string;
    sourceUrl: string;
};

export type NpcGroup = {
    group: string;
    entries: OfficialDirectoryEntry[];
};

export const OFFICIAL_REGIONS: OfficialDirectoryEntry[] = [
    { name: "Map", sourceUrl: "https://trello.com/c/425DWcSK/171-map" },
    { name: "Hotel (Tutorial Area)", sourceUrl: "https://trello.com/c/sgxKtnZT/232-hotel-tutorial-area" },
    { name: "Morioh Station", sourceUrl: "https://trello.com/c/EpesDBmt/234-morioh-station" },
    { name: "Gym", sourceUrl: "https://trello.com/c/XZrrVjYN/231-gym" },
    { name: "Store", sourceUrl: "https://trello.com/c/v2hd7pGj/233-store" },
    { name: "Kame Yu Market", sourceUrl: "https://trello.com/c/MpGMN9zh/285-kame-yu-market" },
    { name: "T-Point Gas Station", sourceUrl: "https://trello.com/c/WAqw9PBV/291-t-point-gas-station" },
    { name: "Graveyard", sourceUrl: "https://trello.com/c/fkeqE1CQ/229-graveyard" },
    { name: "Hospital", sourceUrl: "https://trello.com/c/GSle81TF/230-hospital" },
    { name: "Docks", sourceUrl: "https://trello.com/c/BUnEosWi/307-docks" },
];

export const OFFICIAL_NPC_GROUPS: NpcGroup[] = [
    {
        group: "Main NPCs",
        entries: [
            { name: "Storyline", sourceUrl: "https://trello.com/c/tXsJJeCe/269-storyline" },
            { name: "Receptionist", sourceUrl: "https://trello.com/c/vSoRTr9P/79-receptionist" },
            { name: "Jotaro Kujo", sourceUrl: "https://trello.com/c/9lkFOjiq/237-jotaro-kujo" },
            { name: "Koichi Hirose", sourceUrl: "https://trello.com/c/P5N8bqfP/240-koichi-hirose" },
            { name: "Okuyasu Nijimura", sourceUrl: "https://trello.com/c/u3kjwzU3/244-okuyasu-nijimura" },
            { name: "Corrupt Police Officer", sourceUrl: "https://trello.com/c/NkywXBNH/80-corrupt-police-officer" },
            { name: "Clinician", sourceUrl: "https://trello.com/c/g8y0bAqU/81-clinician" },
            { name: "Power Box", sourceUrl: "https://trello.com/c/H8L6D8f7/82-power-box" },
            { name: "Toyohiro", sourceUrl: "https://trello.com/c/P1uxK6Kl/83-toyohiro" },
            { name: "Kobayashi", sourceUrl: "https://trello.com/c/rXnhR25C/84-kobayashi" },
            { name: "Joseph", sourceUrl: "https://trello.com/c/VNHubDWc/241-joseph" },
            { name: "Tonio Trussardi", sourceUrl: "https://trello.com/c/AQdIB11p/242-tonio-trussardi" },
            { name: "Lowly Thief", sourceUrl: "https://trello.com/c/09w8AKRi/243-lowly-thief" },
            { name: "Mr. Rengatei", sourceUrl: "https://trello.com/c/0T7Qvqy0/246-mr-rengatei" },
            { name: "Reimi Sugimoto", sourceUrl: "https://trello.com/c/ECNWbtYQ/78-reimi-sugimoto" },
            { name: "Josuke Higashikata", sourceUrl: "https://trello.com/c/UbDKEbWV/248-josuke-higashikata" },
            { name: "Akihiko", sourceUrl: "https://trello.com/c/TSBjrcFq/247-akihiko" },
            { name: "Reina", sourceUrl: "https://trello.com/c/XWxfAgXz/77-reina" },
            { name: "Masuyo", sourceUrl: "https://trello.com/c/tnpRnGKW/245-masuyo" },
            { name: "Shigechi", sourceUrl: "https://trello.com/c/Bzcgp87I/238-shigechi" },
            { name: "Aya Tsuji", sourceUrl: "https://trello.com/c/xmym2OZt/249-aya-tsuji" },
            { name: "Detective", sourceUrl: "https://trello.com/c/4aeaD26P/85-detective" },
            { name: "Rohan", sourceUrl: "https://trello.com/c/yQJG7Zyk/239-rohan" },
            { name: "Hayato", sourceUrl: "https://trello.com/c/Lx0lCWxK/86-hayato" },
        ],
    },
    {
        group: "Important NPCs",
        entries: [
            { name: "Merchant NPC", sourceUrl: "https://trello.com/c/jWdeIgXW/328-merchant-npc" },
            { name: "Rahaj (Shop NPC)", sourceUrl: "https://trello.com/c/U5Bx5pOP/265-rahaj-shop-npc" },
            { name: "Gupta (Crafting NPC)", sourceUrl: "https://trello.com/c/vmLT2RxN/266-gupta-crafting-npc" },
            { name: "Sub Ability NPC", sourceUrl: "https://trello.com/c/SHxk972y/295-sub-ability-npc" },
            { name: "Ancient Ghost", sourceUrl: "https://trello.com/c/yA0OTkhR/271-ancient-ghost" },
            { name: "Elder Vampire", sourceUrl: "https://trello.com/c/1G09TbPN/268-elder-vampire" },
            { name: "Rudol von Stroheim", sourceUrl: "https://trello.com/c/MneAiadr/273-rudol-von-stroheim" },
            { name: "Fighting Style's NPC", sourceUrl: "https://trello.com/c/zyy7Ln8K/294-fighting-styles-npc" },
            { name: "Samurai Master", sourceUrl: "https://trello.com/c/oMcC1aSl/286-samurai-master" },
            { name: "Boxing Coach", sourceUrl: "https://trello.com/c/i3yA91cy/289-boxing-coach" },
            { name: "Karate Sensei", sourceUrl: "https://trello.com/c/3mObo5jP/290-karate-sensei" },
            { name: "Journey to Heaven NPC", sourceUrl: "https://trello.com/c/hYgKsZPv/296-journey-to-heaven-npc" },
            { name: "Pucci", sourceUrl: "https://trello.com/c/NIs0rxcl/270-pucci" },
            { name: "EDICT NPC", sourceUrl: "https://trello.com/c/WJ2PXgtD/293-edict-npc" },
            { name: "DETERMINATION", sourceUrl: "https://trello.com/c/2RAhZe6f/281-determination" },
            { name: "Prestige NPC", sourceUrl: "https://trello.com/c/E2iXtAMV/297-prestige-npc" },
            { name: "Arch Mage", sourceUrl: "https://trello.com/c/4felHx0e/267-arch-mage" },
            { name: "Weapon NPCs", sourceUrl: "https://trello.com/c/Zdru1jyP/300-weapon-npcs" },
            { name: "Mafia Boss", sourceUrl: "https://trello.com/c/wpJj9AL2/301-mafia-boss" },
            { name: "Bruford", sourceUrl: "https://trello.com/c/l8V3ob48/302-bruford" },
            { name: "Miyamoto", sourceUrl: "https://trello.com/c/UBrdZQMP/303-miyamoto" },
            { name: "RAID NPCs", sourceUrl: "https://trello.com/c/vR4B0nHR/40-raid-npcs" },
            { name: "Muhammad Avdol", sourceUrl: "https://trello.com/c/Z1oZbEde/41-muhammad-avdol" },
            { name: "Yoshikage Kira", sourceUrl: "https://trello.com/c/zDAIXsf4/42-yoshikage-kira" },
            { name: "Chumbo (Jotaro)", sourceUrl: "https://trello.com/c/OO5ipWL3/43-chumbo-jotaro" },
            { name: "??? (DIO)", sourceUrl: "https://trello.com/c/41XcMyJD/45-dio" },
        ],
    },
    {
        group: "Side Quest Givers",
        entries: [
            { name: "Gardner Gwen", sourceUrl: "https://trello.com/c/qyHKxsX5/252-gardner-gwen" },
            { name: "Jean Pierre Polnareff", sourceUrl: "https://trello.com/c/uL67ny6N/314-jean-pierre-polnareff" },
            { name: "Speedwagon Researcher", sourceUrl: "https://trello.com/c/Lhd6URA1/315-speedwagon-researcher" },
            { name: "Speedwagon Scientist", sourceUrl: "https://trello.com/c/DfrWKGQ5/34-speedwagon-scientist" },
            { name: "Shozuki", sourceUrl: "https://trello.com/c/92v0vFM6/316-shozuki" },
            { name: "Kaiser", sourceUrl: "https://trello.com/c/Npo4Gmoq/317-kaiser" },
            { name: "Geordie Greep", sourceUrl: "https://trello.com/c/2MbW2R18/318-geordie-greep" },
            { name: "Shadowy Figure", sourceUrl: "https://trello.com/c/noFUS5FU/319-shadowy-figure" },
            { name: "Kakyoin", sourceUrl: "https://trello.com/c/dlFuM5KY/320-kakyoin" },
            { name: "Rose", sourceUrl: "https://trello.com/c/Jp0ZbBnA/321-rose" },
            { name: "Zuleima", sourceUrl: "https://trello.com/c/eNikM4N0/1-zuleima" },
            { name: "Yuto Horigome", sourceUrl: "https://trello.com/c/5zyw97Ji/2-yuto-horigome" },
        ],
    },
];
