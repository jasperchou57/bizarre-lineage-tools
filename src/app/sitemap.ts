import { MetadataRoute } from "next";
import standsData from "@/data/stands.json";
import stylesData from "@/data/fighting-styles.json";
import subsData from "@/data/sub-abilities.json";
import raidsData from "@/data/raids.json";

const BASE_URL = "https://www.bizarrelineage.com";

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();

    // Static pages
    const staticRoutes: MetadataRoute.Sitemap = [
        { url: BASE_URL, lastModified: now, changeFrequency: "daily", priority: 1.0 },
        { url: `${BASE_URL}/tier-list`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
        { url: `${BASE_URL}/build-planner`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: `${BASE_URL}/stands`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
        { url: `${BASE_URL}/codes`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
        { url: `${BASE_URL}/fighting-styles`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${BASE_URL}/sub-abilities`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${BASE_URL}/guides/leveling`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${BASE_URL}/guides/prestige`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${BASE_URL}/guides`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${BASE_URL}/guides/stats`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
        { url: `${BASE_URL}/guides/stand-chances`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
        { url: `${BASE_URL}/guides/best-builds`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
        { url: `${BASE_URL}/skins`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
        { url: `${BASE_URL}/items`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${BASE_URL}/world-events`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${BASE_URL}/trello`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${BASE_URL}/perks`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${BASE_URL}/guides/awakening`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
        { url: `${BASE_URL}/guides/night-vampire`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
        { url: `${BASE_URL}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
        { url: `${BASE_URL}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    ];

    // Dynamic Stand pages (highest SEO value)
    const standRoutes: MetadataRoute.Sitemap = standsData.map((stand) => ({
        url: `${BASE_URL}/stands/${stand.id}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.8,
    }));

    // Dynamic Fighting Style pages
    const styleRoutes: MetadataRoute.Sitemap = stylesData.map((style) => ({
        url: `${BASE_URL}/fighting-styles/${style.id}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.6,
    }));

    // Dynamic Sub-Ability pages
    const subRoutes: MetadataRoute.Sitemap = subsData.map((sub) => ({
        url: `${BASE_URL}/sub-abilities/${sub.id}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.6,
    }));

    // Dynamic Raid pages
    const raidRoutes: MetadataRoute.Sitemap = [
        { url: `${BASE_URL}/raids`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 },
        ...raidsData.map((raid) => ({
            url: `${BASE_URL}/raids/${raid.id}`,
            lastModified: now,
            changeFrequency: "weekly" as const,
            priority: 0.7,
        })),
    ];

    return [...staticRoutes, ...standRoutes, ...styleRoutes, ...subRoutes, ...raidRoutes];
}
