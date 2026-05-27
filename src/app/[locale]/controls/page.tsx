import type { Metadata } from "next";
import { ChevronRight, ExternalLink, Keyboard } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { OFFICIAL_KEYBINDS } from "@/data/official-game-data";
import { OFFICIAL_DATA_LAST_CHECKED, OFFICIAL_LINKS } from "@/data/official-sources";
import { withCanonical, SITE_URL } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
    return withCanonical({
        title: "Bizarre Lineage Controls & Keybinds | Official Roblox + Trello",
        description: "Official Bizarre Lineage controls and keybinds from the Roblox game description and public official Trello Keybinds card.",
    }, "/controls");
}

export default async function ControlsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const tCommon = await getTranslations({ locale, namespace: "Common" });

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: tCommon("breadcrumbHome"), item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Controls", item: `${SITE_URL}/controls` },
        ],
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            <nav className="flex items-center gap-2 text-sm text-muted mb-8" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-white transition-colors">{tCommon("breadcrumbHome")}</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-white" aria-current="page">Controls</span>
            </nav>

            <div className="flex items-center gap-4 mb-4">
                <Keyboard className="h-12 w-12 text-accent-blue" />
                <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-white m-0">Bizarre Lineage Controls</h1>
            </div>
            <p className="text-lg text-muted leading-relaxed max-w-3xl mb-3">
                Official Roblox description controls plus the more complete public Trello Keybinds card. Keybinds may be changeable through the in-game cogwheel.
            </p>
            <p className="text-sm text-muted mb-10">Official data checked: {OFFICIAL_DATA_LAST_CHECKED}</p>

            <section className="bg-surface border border-border rounded-xl overflow-hidden mb-10">
                <div className="grid grid-cols-[minmax(110px,180px)_1fr] border-b border-white/5 bg-white/[0.03] text-xs font-bold uppercase tracking-wide text-muted">
                    <div className="p-4">Input</div>
                    <div className="p-4">Official action</div>
                </div>
                {OFFICIAL_KEYBINDS.map((keybind) => (
                    <div key={`${keybind.input}-${keybind.action}`} className="grid grid-cols-[minmax(110px,180px)_1fr] border-b border-white/5 last:border-b-0">
                        <div className="p-4">
                            <code className="rounded-md border border-accent-blue/20 bg-accent-blue/10 px-2 py-1 text-sm font-bold text-accent-blue">{keybind.input}</code>
                        </div>
                        <div className="p-4">
                            <div className="text-sm font-medium text-white">{keybind.action}</div>
                            <div className="text-xs text-muted mt-1">{keybind.source}</div>
                        </div>
                    </div>
                ))}
            </section>

            <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a href={OFFICIAL_LINKS.robloxGame} target="_blank" rel="noopener noreferrer" className="bg-surface border border-border rounded-lg p-4 hover:border-green-500/50 transition-colors group">
                    <div className="font-bold text-white group-hover:text-green-400 transition-colors flex items-center gap-1">Roblox game page <ExternalLink className="h-3 w-3" /></div>
                    <div className="text-xs text-muted mt-1">Public description and base controls.</div>
                </a>
                <a href={OFFICIAL_LINKS.keybinds} target="_blank" rel="noopener noreferrer" className="bg-surface border border-border rounded-lg p-4 hover:border-accent-blue/50 transition-colors group">
                    <div className="font-bold text-white group-hover:text-accent-blue transition-colors flex items-center gap-1">Official Keybinds card <ExternalLink className="h-3 w-3" /></div>
                    <div className="text-xs text-muted mt-1">Inventory, slide, mount, weapon, and Eagle Vision keybinds.</div>
                </a>
            </section>
        </div>
    );
}
