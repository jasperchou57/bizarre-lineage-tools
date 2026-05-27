export type CodeConfidence = "official-trello" | "community-reported";

export type BizarreCode = {
    code: string;
    reward: string;
    confidence: CodeConfidence;
    sourceLabel: string;
    note: string;
    requires?: string;
};

export const CODE_LAST_CHECKED = "May 27, 2026";

export const CODE_SOURCES = {
    trello: "https://trello.com/c/5p9hzQJD/97-codes",
    roblox: "https://www.roblox.com/games/14890802310/Bizarre-Lineage",
    proGameGuides: "https://progameguides.com/roblox/bizarre-lineage-codes/",
    gamesRadar: "https://www.gamesradar.com/games/action/bizarre-lineage-codes/",
} as const;

export const COMMUNITY_CODE_WATCHLIST: BizarreCode[] = [
    {
        code: "Delay1",
        reward: "Free rewards",
        confidence: "community-reported",
        sourceLabel: "Community-reported Update 1",
        note: "Reported by multiple May 2026 code trackers; verify in-game if rewards changed.",
        requires: "Level 10 reported",
    },
    {
        code: "Delay2",
        reward: "Free rewards",
        confidence: "community-reported",
        sourceLabel: "Community-reported Update 1",
        note: "Reported by multiple May 2026 code trackers; verify in-game if rewards changed.",
        requires: "Level 10 reported",
    },
    {
        code: "Delay3",
        reward: "Free rewards",
        confidence: "community-reported",
        sourceLabel: "Community-reported Update 1",
        note: "Reported by multiple May 2026 code trackers; verify in-game if rewards changed.",
        requires: "Level 10 reported",
    },
    {
        code: "Update1",
        reward: "Free rewards",
        confidence: "community-reported",
        sourceLabel: "Community-reported Update 1",
        note: "Reported after Update 1 went live; reward bundle may vary by server/version.",
        requires: "Level 10 reported",
    },
    {
        code: "BizarreLineage1",
        reward: "Free rewards",
        confidence: "community-reported",
        sourceLabel: "Community-reported Update 1",
        note: "Reported by multiple May 2026 code trackers; verify in-game if rewards changed.",
        requires: "Level 10 reported",
    },
    {
        code: "LikeTheGameForMore1",
        reward: "Free rewards",
        confidence: "community-reported",
        sourceLabel: "Community-reported Update 1",
        note: "Reported by multiple May 2026 code trackers; verify in-game if rewards changed.",
        requires: "Level 10 reported",
    },
    {
        code: "FavoriteTheGame1",
        reward: "Free rewards",
        confidence: "community-reported",
        sourceLabel: "Community-reported Update 1",
        note: "Reported by multiple May 2026 code trackers; verify in-game if rewards changed.",
        requires: "Level 10 reported",
    },
    {
        code: "Update2=2027",
        reward: "Free rewards",
        confidence: "community-reported",
        sourceLabel: "Community-reported Update 1",
        note: "Reported by multiple May 2026 code trackers; verify in-game if rewards changed.",
        requires: "Level 10 reported",
    },
    {
        code: "750LikesforNextCode",
        reward: "Free rewards",
        confidence: "community-reported",
        sourceLabel: "Community-reported milestone code",
        note: "Roblox currently advertises a 750k-like code target; public trackers report this code as redeemable.",
        requires: "Level 10 reported",
    },
    {
        code: "500kLikes",
        reward: "Free rewards",
        confidence: "community-reported",
        sourceLabel: "Community-reported milestone code",
        note: "Reported by multiple May 2026 code trackers; verify in-game if rewards changed.",
        requires: "Level 10 reported",
    },
    {
        code: "250kLikes",
        reward: "Free rewards",
        confidence: "community-reported",
        sourceLabel: "Community-reported milestone code",
        note: "Reported by multiple May 2026 code trackers; verify in-game if rewards changed.",
        requires: "Level 10 reported",
    },
];

export const OFFICIAL_CODES: BizarreCode[] = [
    {
        code: "30kLikes",
        reward: "1 Stat Point Essence",
        confidence: "official-trello",
        sourceLabel: "Official Trello listed",
        note: "Listed on the public official Trello codes card.",
        requires: "Level 10 reported",
    },
    {
        code: "100kLikes",
        reward: "1 Stat Point Essence + 1 Rare Chest",
        confidence: "official-trello",
        sourceLabel: "Official Trello listed",
        note: "Listed on the public official Trello codes card.",
        requires: "Level 10 reported",
    },
    {
        code: "shutdownwoops",
        reward: "1 Stand Stat Essence",
        confidence: "official-trello",
        sourceLabel: "Official Trello listed",
        note: "Listed on the public official Trello codes card.",
        requires: "Level 10 reported",
    },
    {
        code: "1week",
        reward: "1 Stand Personality Essence",
        confidence: "official-trello",
        sourceLabel: "Official Trello listed",
        note: "Listed on the public official Trello codes card.",
        requires: "Level 10 reported",
    },
];

export const ACTIVE_CODES = OFFICIAL_CODES;

export const officialCodeCount = OFFICIAL_CODES.length;
export const communityReportedCodeCount = COMMUNITY_CODE_WATCHLIST.length;
export const trackedCodeCount = officialCodeCount + communityReportedCodeCount;
