import type { Metadata } from "next";
import { ChevronRight, ExternalLink, UsersRound } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { OFFICIAL_NPC_GROUPS } from "@/data/official-directory";
import { OFFICIAL_DATA_LAST_CHECKED } from "@/data/official-sources";
import { withCanonical, SITE_URL } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
    return withCanonical({
        title: "Bizarre Lineage NPC Directory | Official Trello NPCs",
        description: "Official Bizarre Lineage NPC directory from the public Trello, grouped into Main NPCs, Important NPCs, and Side Quest Givers.",
    }, "/npcs");
}

export default async function NpcsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const tCommon = await getTranslations({ locale, namespace: "Common" });
    const totalNpcs = OFFICIAL_NPC_GROUPS.reduce((sum, group) => sum + group.entries.length, 0);

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: tCommon("breadcrumbHome"), item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "NPCs", item: `${SITE_URL}/npcs` },
        ],
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-5xl">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            <nav className="flex items-center gap-2 text-sm text-muted mb-8" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-white transition-colors">{tCommon("breadcrumbHome")}</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-white" aria-current="page">NPCs</span>
            </nav>

            <div className="flex items-center gap-4 mb-4">
                <UsersRound className="h-12 w-12 text-accent-blue" />
                <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-white m-0">Bizarre Lineage NPC Directory</h1>
            </div>
            <p className="text-lg text-muted leading-relaxed max-w-3xl mb-3">
                {totalNpcs} public official Trello NPC entries grouped by Main NPCs, Important NPCs, and Side Quest Givers.
            </p>
            <p className="text-sm text-muted mb-10">Official data checked: {OFFICIAL_DATA_LAST_CHECKED}</p>

            {OFFICIAL_NPC_GROUPS.map((group) => (
                <section key={group.group} className="mb-10">
                    <h2 className="text-2xl font-bold text-white mb-4">{group.group} <span className="text-sm text-muted font-normal">({group.entries.length})</span></h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {group.entries.map((npc) => (
                            <a key={`${group.group}-${npc.name}`} href={npc.sourceUrl} target="_blank" rel="noopener noreferrer" className="bg-surface border border-border rounded-lg p-4 hover:border-accent-blue/50 transition-colors group">
                                <div className="font-bold text-white group-hover:text-accent-blue transition-colors flex items-center justify-between gap-3">
                                    <span>{npc.name}</span>
                                    <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                                </div>
                                <div className="text-xs text-muted mt-1">Official Trello NPC card</div>
                            </a>
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
}
