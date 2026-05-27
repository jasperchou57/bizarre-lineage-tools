import type { Metadata } from "next";
import { ChevronRight, ExternalLink, MapPin } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { OFFICIAL_REGIONS } from "@/data/official-directory";
import { OFFICIAL_DATA_LAST_CHECKED } from "@/data/official-sources";
import { withCanonical, SITE_URL } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
    return withCanonical({
        title: "Bizarre Lineage Map & Locations | Official Trello Regions",
        description: "Official Bizarre Lineage regions and map-related Trello cards, including Hotel, Morioh Station, Gym, Store, Graveyard, Hospital, and Docks.",
    }, "/locations");
}

export default async function LocationsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const tCommon = await getTranslations({ locale, namespace: "Common" });

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: tCommon("breadcrumbHome"), item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Locations", item: `${SITE_URL}/locations` },
        ],
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            <nav className="flex items-center gap-2 text-sm text-muted mb-8" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-white transition-colors">{tCommon("breadcrumbHome")}</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-white" aria-current="page">Locations</span>
            </nav>

            <div className="flex items-center gap-4 mb-4">
                <MapPin className="h-12 w-12 text-green-400" />
                <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-white m-0">Bizarre Lineage Locations</h1>
            </div>
            <p className="text-lg text-muted leading-relaxed max-w-3xl mb-3">
                Region and map entries currently listed on the official Trello. This page is a source-linked directory, not a fan-made coordinate map.
            </p>
            <p className="text-sm text-muted mb-10">Official data checked: {OFFICIAL_DATA_LAST_CHECKED}</p>

            <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {OFFICIAL_REGIONS.map((region) => (
                    <a key={region.name} href={region.sourceUrl} target="_blank" rel="noopener noreferrer" className="bg-surface border border-border rounded-xl p-5 hover:border-green-500/50 transition-colors group">
                        <div className="font-bold text-white group-hover:text-green-400 transition-colors flex items-center justify-between gap-3">
                            <span>{region.name}</span>
                            <ExternalLink className="h-4 w-4 shrink-0" />
                        </div>
                        <div className="text-xs text-muted mt-2">Official Trello region card</div>
                    </a>
                ))}
            </section>
        </div>
    );
}
