import type { Metadata } from "next";
import { ChevronRight, ExternalLink, Gem } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ACCESSORY_RARITIES, ACCESSORIES_SOURCE_URL, OFFICIAL_ACCESSORIES } from "@/data/accessories";
import { OFFICIAL_DATA_LAST_CHECKED } from "@/data/official-sources";
import { withCanonical, SITE_URL } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
    return withCanonical({
        title: "Bizarre Lineage Accessories | Official Trello List",
        description: "Official Bizarre Lineage accessories listed on the public Trello, grouped by rarity with direct source card links.",
    }, "/accessories");
}

const RARITY_COLORS: Record<string, string> = {
    Common: "text-gray-300 bg-gray-400/10 border-gray-400/20",
    Uncommon: "text-green-300 bg-green-400/10 border-green-400/20",
    Rare: "text-blue-300 bg-blue-400/10 border-blue-400/20",
    Legendary: "text-yellow-300 bg-yellow-400/10 border-yellow-400/20",
    Mythical: "text-purple-300 bg-purple-400/10 border-purple-400/20",
};

export default async function AccessoriesPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const tCommon = await getTranslations({ locale, namespace: "Common" });

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: tCommon("breadcrumbHome"), item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Accessories", item: `${SITE_URL}/accessories` },
        ],
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-5xl">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            <nav className="flex items-center gap-2 text-sm text-muted mb-8" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-white transition-colors">{tCommon("breadcrumbHome")}</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-white" aria-current="page">Accessories</span>
            </nav>

            <div className="flex items-center gap-4 mb-4">
                <Gem className="h-12 w-12 text-yellow-300" />
                <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-white m-0">Bizarre Lineage Accessories</h1>
            </div>
            <p className="text-lg text-muted leading-relaxed max-w-3xl mb-3">
                The official Trello currently lists {OFFICIAL_ACCESSORIES.length} accessory cards. This page mirrors names and rarity labels only; stat rolls are not inferred here.
            </p>
            <p className="text-sm text-muted mb-10">Official data checked: {OFFICIAL_DATA_LAST_CHECKED}</p>

            <section className="mb-10 bg-accent-blue/5 border border-accent-blue/20 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p className="text-sm text-muted">Accessory effects and stat rolls should be verified in-game unless the public Trello card explicitly publishes them.</p>
                <a href={ACCESSORIES_SOURCE_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-accent-blue hover:text-white transition-colors">
                    Official Trello <ExternalLink className="h-4 w-4" />
                </a>
            </section>

            {ACCESSORY_RARITIES.map((rarity) => {
                const accessories = OFFICIAL_ACCESSORIES.filter((item) => item.rarity === rarity);
                return (
                    <section key={rarity} className="mb-10">
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <span className={`text-xs font-bold uppercase px-2.5 py-1 rounded-full border ${RARITY_COLORS[rarity]}`}>{rarity}</span>
                            <span>{accessories.length} accessories</span>
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {accessories.map((item) => (
                                <a key={item.name} href={item.sourceUrl} target="_blank" rel="noopener noreferrer" className="bg-surface border border-border rounded-lg p-4 hover:border-accent-blue/50 transition-colors group">
                                    <div className="font-bold text-white group-hover:text-accent-blue transition-colors flex items-center justify-between gap-3">
                                        <span>{item.name}</span>
                                        <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                                    </div>
                                    <div className="text-xs text-muted mt-1">Official Trello card</div>
                                </a>
                            ))}
                        </div>
                    </section>
                );
            })}
        </div>
    );
}
