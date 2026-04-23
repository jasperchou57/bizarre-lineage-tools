import { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { ChevronRight, ExternalLink, ClipboardList } from "lucide-react";
import { withCanonical, SITE_URL } from "@/lib/metadata";

export const metadata: Metadata = withCanonical({
    title: "Bizarre Lineage Trello — Official Board Link & What It Covers",
    description: "Direct link to the official Bizarre Lineage Trello board. See what the Trello confirms: Stand moves, raid mechanics, progression, and developer roadmap.",
}, "/trello");

const TRELLO_SECTIONS = [
    {
        title: "Stand Data",
        description: "Official move names, obtainment methods, and evolution paths for all Stands. The Trello is the only source that confirms exact move names.",
        confirmed: ["Move names and keys", "Obtainment methods (Arrow, Evolution, Quest)", "Evolution chains (e.g. Whitesnake → C-Moon → Made in Heaven)"],
        notConfirmed: ["Exact drop rates / percentages", "Tier rankings", "DPS numbers"],
    },
    {
        title: "Raids & Bosses",
        description: "Raid boss names, locations, NPC interactions, and shop items are all documented on the Trello.",
        confirmed: ["Boss names and locations", "Raid NPC names and Bus Stop numbers", "Shop items and token costs", "Grading system (SSS to D)"],
        notConfirmed: ["Exact boss HP values", "Optimal strategies", "Drop rate percentages"],
    },
    {
        title: "Game Systems",
        description: "Core mechanics like leveling, prestige, stats, conjuration, and fighting styles.",
        confirmed: ["Prestige requirements (Level 50, Arch Mage, 10,000 Cash)", "Prestige location (Bus Stop 10)", "Stat types and general effects", "Fighting style and sub-ability names"],
        notConfirmed: ["Exact stat scaling formulas", "Hidden mechanics", "Balance change history"],
    },
    {
        title: "Developer Roadmap",
        description: "Upcoming features, planned content, and known bugs that the dev team is tracking.",
        confirmed: ["Planned new Stands", "Upcoming features", "Known bugs and fixes"],
        notConfirmed: ["Release dates (subject to change)", "Exact implementation details"],
    },
];

export default function TrelloPage() {
    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
            { '@type': 'ListItem', position: 2, name: 'Trello', item: `${SITE_URL}/trello` },
        ],
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            <nav className="flex items-center gap-2 text-sm text-muted mb-8" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-white" aria-current="page">Trello</span>
            </nav>

            <div className="flex items-center gap-4 mb-4">
                <ClipboardList className="h-12 w-12 text-accent-blue" />
                <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-white m-0">
                    Bizarre Lineage Official Trello
                </h1>
            </div>
            <p className="text-lg text-muted mb-8 leading-relaxed">
                The official Trello board is the primary source of truth for Bizarre Lineage game data. It is maintained by the developer MIDAS and contains verified information about Stands, raids, progression, and upcoming content.
            </p>

            {/* Main CTA */}
            <div className="bg-gradient-to-r from-accent-blue/10 to-accent-indigo/10 border border-accent-blue/20 rounded-xl p-8 text-center mb-12">
                <h2 className="text-2xl font-bold text-white mb-3">Access the Official Trello Board</h2>
                <p className="text-sm text-muted mb-6">Bookmark this link for quick access to verified game data.</p>
                <a
                    href="https://trello.com/b/wtzgwqIf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-accent-blue to-accent-indigo rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all"
                >
                    Open Bizarre Lineage Trello <ExternalLink className="h-4 w-4" />
                </a>
            </div>

            {/* Other Official Links */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">Other Official Links</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <a href="https://discord.gg/bizarrelineage" target="_blank" rel="noopener noreferrer" className="bg-surface border border-border rounded-xl p-5 hover:border-accent-indigo/50 transition-colors group flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-accent-indigo/10 flex items-center justify-center shrink-0">
                            <span className="text-accent-indigo font-bold text-lg">D</span>
                        </div>
                        <div>
                            <div className="font-bold text-white group-hover:text-accent-indigo transition-colors flex items-center gap-1">Discord Server <ExternalLink className="h-3 w-3" /></div>
                            <div className="text-xs text-muted">Community chat, code drops, and announcements</div>
                        </div>
                    </a>
                    <a href="https://www.roblox.com/games/14890802310/Bizarre-Lineage" target="_blank" rel="noopener noreferrer" className="bg-surface border border-border rounded-xl p-5 hover:border-green-500/50 transition-colors group flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                            <span className="text-green-400 font-bold text-lg">R</span>
                        </div>
                        <div>
                            <div className="font-bold text-white group-hover:text-green-400 transition-colors flex items-center gap-1">Roblox Game Page <ExternalLink className="h-3 w-3" /></div>
                            <div className="text-xs text-muted">Play Bizarre Lineage on Roblox</div>
                        </div>
                    </a>
                </div>
            </section>

            {/* What the Trello Covers */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-6">What the Trello Covers</h2>
                <div className="space-y-6">
                    {TRELLO_SECTIONS.map((section) => (
                        <div key={section.title} className="bg-surface border border-border rounded-xl p-6">
                            <h3 className="text-lg font-bold text-white mb-2">{section.title}</h3>
                            <p className="text-sm text-muted mb-4">{section.description}</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <h4 className="text-xs font-bold text-green-400 uppercase tracking-wide mb-2">Confirmed on Trello</h4>
                                    <ul className="text-sm text-muted space-y-1">
                                        {section.confirmed.map((item) => (
                                            <li key={item} className="flex items-start gap-2">
                                                <span className="text-green-400 mt-0.5">✓</span> {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold text-red-400 uppercase tracking-wide mb-2">Not on Trello</h4>
                                    <ul className="text-sm text-muted space-y-1">
                                        {section.notConfirmed.map((item) => (
                                            <li key={item} className="flex items-start gap-2">
                                                <span className="text-red-400 mt-0.5">✗</span> {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* FAQ */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">Trello FAQ</h2>
                <div className="space-y-4">
                    <details className="group bg-surface border border-border rounded-xl overflow-hidden">
                        <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                            <span className="font-medium text-white pr-4">Is the Trello always up to date?</span>
                            <ChevronRight className="h-5 w-5 text-muted flex-shrink-0 group-open:rotate-90 transition-transform" />
                        </summary>
                        <div className="px-5 pb-5 text-sm text-muted leading-relaxed">
                            The Trello is maintained by the developer and is generally updated around major patches. However, minor changes or hotfixes may not be reflected immediately.
                        </div>
                    </details>
                    <details className="group bg-surface border border-border rounded-xl overflow-hidden">
                        <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                            <span className="font-medium text-white pr-4">How is this wiki different from the Trello?</span>
                            <ChevronRight className="h-5 w-5 text-muted flex-shrink-0 group-open:rotate-90 transition-transform" />
                        </summary>
                        <div className="px-5 pb-5 text-sm text-muted leading-relaxed">
                            The Trello provides raw official data. This wiki adds community-maintained tier rankings, build recommendations, strategy guides, and interactive tools like the Build Planner that the Trello does not offer.
                        </div>
                    </details>
                </div>
            </section>

            {/* Explore */}
            <section>
                <h2 className="text-2xl font-bold text-white mb-4">Explore Our Wiki</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Link href="/tier-list" className="bg-surface border border-border rounded-lg p-4 hover:border-accent-blue/50 transition-colors group">
                        <div className="font-bold text-white group-hover:text-accent-blue transition-colors">Tier List</div>
                        <div className="text-xs text-muted mt-1">Community-ranked Stand tier list</div>
                    </Link>
                    <Link href="/codes" className="bg-surface border border-border rounded-lg p-4 hover:border-accent-blue/50 transition-colors group">
                        <div className="font-bold text-white group-hover:text-accent-blue transition-colors">Active Codes</div>
                        <div className="text-xs text-muted mt-1">All working codes with rewards</div>
                    </Link>
                </div>
            </section>
        </div>
    );
}
