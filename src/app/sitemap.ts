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

function entry(path: string): MetadataRoute.Sitemap[number] {
    const url = `${BASE_URL}${path === "/" ? "" : path}` || `${BASE_URL}/`;
    return {
        url,
        alternates: { languages: buildAlternates(path) },
    };
}

export default function sitemap(): MetadataRoute.Sitemap {
    const staticRoutes: MetadataRoute.Sitemap = [
        entry("/"),
        entry("/tier-list"),
        entry("/build-planner"),
        entry("/tools"),
        entry("/updates"),
        entry("/sources"),
        entry("/controls"),
        entry("/personalities"),
        entry("/accessories"),
        entry("/locations"),
        entry("/npcs"),
        entry("/stands"),
        entry("/codes"),
        entry("/fighting-styles"),
        entry("/sub-abilities"),
        entry("/guides/leveling"),
        entry("/guides/prestige"),
        entry("/guides"),
        entry("/guides/beginner"),
        entry("/guides/how-to-get-made-in-heaven"),
        entry("/guides/stats"),
        entry("/guides/stand-chances"),
        entry("/guides/best-builds"),
        entry("/skins"),
        entry("/items"),
        entry("/world-events"),
        entry("/trello"),
        entry("/perks"),
        entry("/guides/awakening"),
        entry("/guides/night-vampire"),
        entry("/about"),
        entry("/contact"),
        entry("/privacy"),
        entry("/terms"),
    ];

    const standRoutes: MetadataRoute.Sitemap = standsData.map((stand) =>
        entry(`/stands/${stand.id}`),
    );

    const styleRoutes: MetadataRoute.Sitemap = stylesData.map((style) =>
        entry(`/fighting-styles/${style.id}`),
    );

    const subRoutes: MetadataRoute.Sitemap = subsData.map((sub) =>
        entry(`/sub-abilities/${sub.id}`),
    );

    const raidRoutes: MetadataRoute.Sitemap = [
        entry("/raids"),
        ...raidsData.map((raid) =>
            entry(`/raids/${raid.id}`),
        ),
    ];

    return [...staticRoutes, ...standRoutes, ...styleRoutes, ...subRoutes, ...raidRoutes];
}
