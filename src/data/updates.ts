export type UpdateConfidence = "official" | "community";

export type GameUpdate = {
    id: string;
    title: string;
    displayDate: string;
    dateTime: string;
    confidence: UpdateConfidence;
    sourceLabel: string;
    sourceUrl: string;
    summary: string;
    tags: string[];
};

export const UPDATES_LAST_CHECKED = "May 13, 2026";

export const GAME_UPDATES: GameUpdate[] = [
    {
        id: "official-trello-activity-may-10",
        title: "Official Trello Board Activity",
        displayDate: "May 10, 2026",
        dateTime: "2026-05-10T23:31:48.581Z",
        confidence: "official",
        sourceLabel: "Official Trello board",
        sourceUrl: "https://trello.com/b/wtzgwqIf/official-bizarre-lineage-%E2%9E%B5",
        summary: "The public official Trello board was last active on May 10, 2026. Treat this as a source activity signal, not a full patch note, because the board does not publish a structured changelog card.",
        tags: [
            "Board: ( Official ) Bizarre Lineage",
            "Last activity: 2026-05-10 23:31 UTC",
            "Official source for Trello-backed reference pages",
        ],
    },
    {
        id: "update-1-roblox-live",
        title: "Update 1 Live on Roblox",
        displayDate: "May 9, 2026",
        dateTime: "2026-05-09T19:47:40.739Z",
        confidence: "official",
        sourceLabel: "Roblox game API",
        sourceUrl: "https://www.roblox.com/games/14890802310/Bizarre-Lineage",
        summary: "Roblox currently names the experience [⚡UPDATE 1⚡] Bizarre Lineage and reports the universe update timestamp as May 9, 2026 at 19:47 UTC. The public description also advertises a code target at 750k likes.",
        tags: [
            "[⚡UPDATE 1⚡] title confirmed",
            "Updated: 2026-05-09 19:47 UTC",
            "750k likes code target shown",
            "Creator: Bizarre Collective",
        ],
    },
    {
        id: "codes-card-verified",
        title: "Official Codes Card Verified",
        displayDate: "Mar 22, 2026",
        dateTime: "2026-03-22T19:29:43.427Z",
        confidence: "official",
        sourceLabel: "Official Trello codes card",
        sourceUrl: "https://trello.com/c/5p9hzQJD/97-codes",
        summary: "The official Trello Codes card still lists four codes only. This is why the Codes page separates official Trello-listed codes from newer community-reported code tracker entries.",
        tags: [
            "30kLikes",
            "100kLikes",
            "shutdownwoops",
            "1week",
        ],
    },
    {
        id: "community-update-1-watch",
        title: "Community Update 1 Reports",
        displayDate: "May 13, 2026",
        dateTime: "2026-05-13T00:00:00.000Z",
        confidence: "community",
        sourceLabel: "Public code trackers",
        sourceUrl: "https://progameguides.com/roblox/bizarre-lineage-codes/",
        summary: "Public code trackers report additional Update 1 and milestone codes, plus meta-watch names. These entries stay marked as community-reported until confirmed through official Discord, official Trello, Roblox description text, or in-game testing.",
        tags: [
            "11 community-reported codes",
            "Update 1 code watchlist",
            "TWOH / True MIH / SCR watchlist",
            "Not official patch notes",
        ],
    },
];

export const latestGameUpdates = GAME_UPDATES.slice(0, 3);
