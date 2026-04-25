import { MetadataRoute } from "next";
import standsData from "@/data/stands.json";
import stylesData from "@/data/fighting-styles.json";
import subsData from "@/data/sub-abilities.json";
import raidsData from "@/data/raids.json";
import { routing } from "@/i18n/routing";

const BASE_URL = "https://www.bizarrelineage.com";

function buildAlternates(path: string): Record<string, string> {
    const alternates: Record<string, string> = {};
    for (const loc of routing.locales) {
        // Default locale (en) lives at root with localePrefix: "as-needed"
        const prefix = loc === routing.defaultLocale ? "" : `/${loc}`;
        alternates[loc] = `${BASE_URL}${prefix}${path === "/" ? "" : path}` || `${BASE_URL}/`;
    }
    alternates["x-default"] = `${BASE_URL}${path === "/" ? "" : path}` || `${BASE_URL}/`;
    return alternates;
}

function entry(path: string, options: { changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>; priority: number; lastModified?: Date }): MetadataRoute.Sitemap[number] {
    const url = `${BASE_URL}${path === "/" ? "" : path}` || `${BASE_URL}/`;
    return {
        url,
        lastModified: options.lastModified ?? new Date(),
        changeFrequency: options.changeFrequency,
        priority: options.priority,
        alternates: { languages: buildAlternates(path) },
    };
}

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();

    const staticRoutes: MetadataRoute.Sitemap = [
        entry("/", { lastModified: now, changeFrequency: "daily", priority: 1.0 }),
        entry("/tier-list", { lastModified: now, changeFrequency: "weekly", priority: 0.9 }),
        entry("/build-planner", { lastModified: now, changeFrequency: "monthly", priority: 0.9 }),
        entry("/stands", { lastModified: now, changeFrequency: "weekly", priority: 0.8 }),
        entry("/codes", { lastModified: now, changeFrequency: "daily", priority: 0.8 }),
        entry("/fighting-styles", { lastModified: now, changeFrequency: "monthly", priority: 0.7 }),
        entry("/sub-abilities", { lastModified: now, changeFrequency: "monthly", priority: 0.7 }),
        entry("/guides/leveling", { lastModified: now, changeFrequency: "monthly", priority: 0.7 }),
        entry("/guides/prestige", { lastModified: now, changeFrequency: "monthly", priority: 0.7 }),
        entry("/guides", { lastModified: now, changeFrequency: "monthly", priority: 0.7 }),
        entry("/guides/stats", { lastModified: now, changeFrequency: "monthly", priority: 0.8 }),
        entry("/guides/stand-chances", { lastModified: now, changeFrequency: "monthly", priority: 0.8 }),
        entry("/guides/best-builds", { lastModified: now, changeFrequency: "monthly", priority: 0.8 }),
        entry("/skins", { lastModified: now, changeFrequency: "weekly", priority: 0.8 }),
        entry("/items", { lastModified: now, changeFrequency: "monthly", priority: 0.7 }),
        entry("/world-events", { lastModified: now, changeFrequency: "monthly", priority: 0.7 }),
        entry("/trello", { lastModified: now, changeFrequency: "monthly", priority: 0.7 }),
        entry("/perks", { lastModified: now, changeFrequency: "monthly", priority: 0.7 }),
        entry("/guides/awakening", { lastModified: now, changeFrequency: "monthly", priority: 0.8 }),
        entry("/guides/night-vampire", { lastModified: now, changeFrequency: "monthly", priority: 0.7 }),
        entry("/about", { lastModified: now, changeFrequency: "yearly", priority: 0.3 }),
        entry("/privacy", { lastModified: now, changeFrequency: "yearly", priority: 0.2 }),
        entry("/terms", { lastModified: now, changeFrequency: "yearly", priority: 0.2 }),
    ];

    const standRoutes: MetadataRoute.Sitemap = standsData.map((stand) =>
        entry(`/stands/${stand.id}`, { lastModified: now, changeFrequency: "weekly", priority: 0.8 }),
    );

    const styleRoutes: MetadataRoute.Sitemap = stylesData.map((style) =>
        entry(`/fighting-styles/${style.id}`, { lastModified: now, changeFrequency: "monthly", priority: 0.6 }),
    );

    const subRoutes: MetadataRoute.Sitemap = subsData.map((sub) =>
        entry(`/sub-abilities/${sub.id}`, { lastModified: now, changeFrequency: "monthly", priority: 0.6 }),
    );

    const raidRoutes: MetadataRoute.Sitemap = [
        entry("/raids", { lastModified: now, changeFrequency: "weekly", priority: 0.8 }),
        ...raidsData.map((raid) =>
            entry(`/raids/${raid.id}`, { lastModified: now, changeFrequency: "weekly", priority: 0.7 }),
        ),
    ];

    return [...staticRoutes, ...standRoutes, ...styleRoutes, ...subRoutes, ...raidRoutes];
}
