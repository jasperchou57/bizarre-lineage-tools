export const VV_ULTIMATUM_LAST_CHECKED = "June 7, 2026";

export const VV_ULTIMATUM_ROBLOX = {
    name: "VV: ULTIMATUM",
    universeId: 2309918273,
    rootPlaceId: 6270290407,
    creatorName: "Midnight Continent",
    creatorGroupId: 9233039,
    playing: 40788,
    visits: 5585355,
    favorites: 136904,
    maxPlayers: 30,
    createdAt: "2021-01-19T18:45:56.497Z",
    updatedAt: "2026-06-07T01:44:20.5231948Z",
    robloxUrl: "https://www.roblox.com/games/6270290407/VV-ULTIMATUM",
    iconUrl: "https://tr.rbxcdn.com/180DAY-bb72424bfa8c9d0c878f2bbdbfbdee5f/512/512/Image/Png/noFilter",
    thumbnailUrl: "https://tr.rbxcdn.com/180DAY-a1d19383f4330a2b5e1902fdcc5f5171/768/432/Image/Png/noFilter",
} as const;

export const VV_ULTIMATUM_LINKS = {
    discord: {
        url: "https://discord.com/invite/vvgame",
        inviteCode: "vvgame",
        serverName: "VV: ULTIMATUM",
        guildId: "1264636238267154504",
        memberCount: 263487,
        onlineCount: 83378,
        status: "Reported official",
        sourceLabel: "Discord invite API + guide-source cross-check",
        note: "The invite resolves to the VV: ULTIMATUM Discord server with the vanity code vvgame. Roblox social-link API requires authentication, so this page labels it as reported official instead of Roblox-verified.",
    },
    trello: {
        url: "https://trello.com/b/t1sTgMQW/vv-ultimatum-trello-info-v1",
        shortUrl: "https://trello.com/b/t1sTgMQW",
        boardName: "VV: ULTIMATUM Trello & Info | V1",
        shortLink: "t1sTgMQW",
        lastActivity: "2026-06-07T10:21:49.847Z",
        status: "Public community board",
        sourceLabel: "Trello API + guide-source cross-check",
        note: "The public board exists and links to discord.gg/vvgame, the Roblox game page, and the Midnight Continent Roblox group. Multiple guide sources label it community maintained, so it should not be presented as an official developer Trello.",
    },
} as const;

export const VV_ULTIMATUM_PLACE_IMAGES = {
    innerWorld: "https://t5.rbxcdn.com/180DAY-99438a69716f3c7a4334b1d1bd26267d",
    wandenreich: "https://t4.rbxcdn.com/180DAY-3acb0f0da8433cb97bb84fe70301c78f",
    valleyOfScreams: "https://t6.rbxcdn.com/180DAY-cc85115bb7b1a4f5a82e977de51e9c53",
    huecoMundo: "https://t0.rbxcdn.com/180DAY-043d0624ed9f1c7e2c4f4c332f820ee8",
    tournament: "https://t4.rbxcdn.com/180DAY-4fb716609029d3b8f6ffed5c338c713c",
    soulSociety: "https://t0.rbxcdn.com/180DAY-994fed900712b1e05ed1a221490df5e5",
    fortAdams: "https://t3.rbxcdn.com/180DAY-2556ccf774bda999220460aeda22dba8",
    arcticCave: "https://t3.rbxcdn.com/180DAY-2c1129a448e74940038294483f07d5a6",
} as const;

export const vvOfficialDescriptionSummary = [
    "A stylized fighting game about dangerous worlds, chosen factions, monsters, and ancient threats.",
    "The Roblox description says the game has over 130 skills and abilities.",
    "Controls and full credits are listed inside the game menu.",
] as const;

export const vvKnownPlaces = [
    "VV: ULTIMATUM",
    "Inner World",
    "Valley of Screams",
    "Las Noches",
    "Hueco Mundo",
    "Wandenreich",
    "Soul Society",
    "Tournament",
    "Soul Society Outskirts",
    "Human World",
    "Fort Adams",
    "Arctic Plains",
    "Arctic Cave",
    "Menos Forest",
    "The Dangai",
    "Snow Encampment",
    "The Marsh",
    "Trade Realm",
    "Matchmaking",
    "UPDATE PLACE",
] as const;

export const vvRelatedPages = [
    {
        href: "/vv-ultimatum",
        title: "VV Ultimatum Wiki",
        body: "Main hub for official Roblox data, source labels, and guide routing.",
    },
    {
        href: "/vv-ultimatum/release-date",
        title: "Release Date",
        body: "Access status, Roblox update time, and live public-page snapshot.",
    },
    {
        href: "/vv-ultimatum/trello-discord",
        title: "Trello & Discord",
        body: "Official link checks, community server notes, and unverified-link policy.",
    },
    {
        href: "/vv-ultimatum/codes",
        title: "Codes",
        body: "Active codes, expired codes, redeem notes, and source confidence.",
    },
    {
        href: "/vv-ultimatum/beginner-guide",
        title: "Beginner Guide",
        body: "What new players should check first before choosing routes or abilities.",
    },
] as const;

export const vvSourcePolicy = [
    {
        label: "Official",
        body: "Direct facts from the public Roblox game page, verified channels, or developer-owned pages.",
    },
    {
        label: "Roblox API",
        body: "Public Roblox universe, place, creator, update, player, visit, favorite, and thumbnail data.",
    },
    {
        label: "Community",
        body: "Useful reports from Discord, YouTube, TikTok, or Roblox communities. These need labels.",
    },
    {
        label: "Watchlist",
        body: "High-search topics that are not stable enough for a full guide yet.",
    },
] as const;

export const vvFaq = [
    {
        question: "Is VV Ultimatum out?",
        answer: "The Roblox experience page is live and the Roblox API currently reports active players. This page still keeps release and access wording source-labeled because public availability can change during launch windows.",
    },
    {
        question: "Is there an official VV Ultimatum Trello?",
        answer: "This page does not mark any Trello as official until it is confirmed from a Roblox page, developer-owned profile, or another verified official channel.",
    },
    {
        question: "Are VV Ultimatum codes available?",
        answer: "Codes are tracked separately from community reports. Active, expired, official, and unverified code reports should never be mixed together.",
    },
    {
        question: "Will this become a full VV Ultimatum wiki?",
        answer: "Yes, if the game has enough maintainable data. The first version focuses on release status, official links, codes, beginner guidance, and high-search watchlist topics.",
    },
] as const;
