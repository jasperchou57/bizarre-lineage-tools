import type { Metadata } from "next";
import { ChevronRight, ExternalLink, Sparkles } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { OFFICIAL_PERSONALITIES, PERSONALITY_SOURCE_URL, PERSONALITY_TIERS } from "@/data/personalities";
import { OFFICIAL_DATA_LAST_CHECKED } from "@/data/official-sources";
import { withCanonical, SITE_URL } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
    return withCanonical({
        title: "Bizarre Lineage Personalities | Official Trello Effects",
        description: "All Bizarre Lineage Stand Personalities currently documented on the official Trello, grouped by rarity tier with official effect text.",
    }, "/personalities");
}

const TIER_COLORS: Record<string, string> = {
    Mythical: "text-purple-300 bg-purple-400/10 border-purple-400/20",
    Legendary: "text-yellow-300 bg-yellow-400/10 border-yellow-400/20",
    Rare: "text-blue-300 bg-blue-400/10 border-blue-400/20",
    Uncommon: "text-green-300 bg-green-400/10 border-green-400/20",
    Common: "text-gray-300 bg-gray-400/10 border-gray-400/20",
};

export default async function PersonalitiesPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const tCommon = await getTranslations({ locale, namespace: "Common" });

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: tCommon("breadcrumbHome"), item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Personalities", item: `${SITE_URL}/personalities` },
        ],
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-5xl">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            <nav className="flex items-center gap-2 text-sm text-muted mb-8" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-white transition-colors">{tCommon("breadcrumbHome")}</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-white" aria-current="page">Personalities</span>
            </nav>

            <div className="flex items-center gap-4 mb-4">
                <Sparkles className="h-12 w-12 text-purple-300" />
                <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-white m-0">Bizarre Lineage Personalities</h1>
            </div>
            <p className="text-lg text-muted leading-relaxed max-w-3xl mb-3">
                Official Trello personality effects, grouped by rarity. This page does not add planner rankings or hidden roll odds.
            </p>
            <p className="text-sm text-muted mb-10">Official data checked: {OFFICIAL_DATA_LAST_CHECKED}</p>

            <section className="mb-10 bg-accent-blue/5 border border-accent-blue/20 rounded-xl p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-lg font-bold text-white mb-1">Official source boundary</h2>
                        <p className="text-sm text-muted">Effects come from the public official Trello Personalities card. Roll rates and best-in-slot rankings are not published there.</p>
                    </div>
                    <a href={PERSONALITY_SOURCE_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-accent-blue hover:text-white transition-colors">
                        Official card <ExternalLink className="h-4 w-4" />
                    </a>
                </div>
            </section>

            {PERSONALITY_TIERS.map((tier) => {
                const personalities = OFFICIAL_PERSONALITIES.filter((item) => item.tier === tier);
                return (
                    <section key={tier} className="mb-10">
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <span className={`text-xs font-bold uppercase px-2.5 py-1 rounded-full border ${TIER_COLORS[tier]}`}>{tier}</span>
                            <span>{personalities.length} personalities</span>
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {personalities.map((personality) => (
                                <article key={personality.name} className="bg-surface border border-border rounded-xl p-5">
                                    <h3 className="text-lg font-bold text-white mb-2">{personality.name}</h3>
                                    <p className="text-sm text-muted leading-relaxed">{personality.effect}</p>
                                </article>
                            ))}
                        </div>
                    </section>
                );
            })}
        </div>
    );
}
