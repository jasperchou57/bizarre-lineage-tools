import type { Metadata } from "next";
import { ChevronRight, ExternalLink, ShieldCheck, AlertTriangle, ClipboardCheck } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { OFFICIAL_DATA_LAST_CHECKED, OFFICIAL_LINKS, SOURCE_TIERS } from "@/data/official-sources";
import { withCanonical, SITE_URL } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
    return withCanonical({
        title: "Source Standards | Bizarre Lineage Wiki",
        description: "How Bizarre Lineage Wiki separates official Roblox data, official Trello facts, in-game testing, community reports, watchlists, and site-maintained planner notes.",
    }, "/sources");
}

export default async function SourcesPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const tCommon = await getTranslations({ locale, namespace: "Common" });

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: tCommon("breadcrumbHome"), item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Source Standards", item: `${SITE_URL}/sources` },
        ],
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-5xl">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            <nav className="flex items-center gap-2 text-sm text-muted mb-8" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-white transition-colors">{tCommon("breadcrumbHome")}</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-white" aria-current="page">Source Standards</span>
            </nav>

            <div className="flex items-center gap-4 mb-4">
                <ShieldCheck className="h-12 w-12 text-green-400" />
                <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-white m-0">Source Standards</h1>
            </div>
            <p className="text-lg text-muted leading-relaxed max-w-3xl mb-3">
                This site separates official facts from community reports and site-maintained planner judgment. If a public source does not support a number, route, reward, or drop rate, we do not present it as confirmed.
            </p>
            <p className="text-sm text-muted mb-10">Last source policy check: {OFFICIAL_DATA_LAST_CHECKED}</p>

            <section className="mb-12 bg-accent-blue/5 border border-accent-blue/20 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <ClipboardCheck className="h-5 w-5 text-accent-blue" /> What counts as confirmed
                </h2>
                <p className="text-sm text-muted leading-relaxed">
                    A claim is confirmed only when it comes from the public Roblox game page/API, the official Trello board, or a repeatable in-game test with clear notes. Community reports are useful for watchlists, but they do not become official data until a primary source or in-game test supports them.
                </p>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-6">Source labels used on this site</h2>
                <div className="space-y-4">
                    {SOURCE_TIERS.map((tier) => (
                        <article key={tier.name} className="bg-surface border border-border rounded-xl p-5">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                                <h3 className="text-lg font-bold text-white">{tier.name}</h3>
                                <span className="w-fit text-xs font-bold uppercase px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-muted">{tier.status}</span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div>
                                    <div className="text-green-400 font-bold mb-1">Use for</div>
                                    <p className="text-muted leading-relaxed">{tier.useFor}</p>
                                </div>
                                <div>
                                    <div className="text-yellow-400 font-bold mb-1">Do not use for</div>
                                    <p className="text-muted leading-relaxed">{tier.notFor}</p>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-6">Primary source links</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <a href={OFFICIAL_LINKS.robloxGame} target="_blank" rel="noopener noreferrer" className="bg-surface border border-border rounded-xl p-5 hover:border-green-500/50 transition-colors group">
                        <div className="font-bold text-white group-hover:text-green-400 transition-colors flex items-center gap-2">
                            Roblox Game Page <ExternalLink className="h-4 w-4" />
                        </div>
                        <p className="text-xs text-muted mt-2">Used for live title, game description, creator, controls, and update timestamp.</p>
                    </a>
                    <a href={OFFICIAL_LINKS.trelloBoard} target="_blank" rel="noopener noreferrer" className="bg-surface border border-border rounded-xl p-5 hover:border-accent-blue/50 transition-colors group">
                        <div className="font-bold text-white group-hover:text-accent-blue transition-colors flex items-center gap-2">
                            Official Trello Board <ExternalLink className="h-4 w-4" />
                        </div>
                        <p className="text-xs text-muted mt-2">Used for cards, labels, obtainment notes, progression notes, item cards, and NPC locations.</p>
                    </a>
                </div>
            </section>

            <section className="mb-12 bg-yellow-500/5 border border-yellow-500/20 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-400" /> Claims we intentionally avoid
                </h2>
                <ul className="space-y-2 text-sm text-muted">
                    <li>Exact Stand Arrow percentages when the public Trello does not publish them.</li>
                    <li>Boss HP, boss damage, or drop-rate tables without official data or dated in-game testing.</li>
                    <li>Calling a Tier List, best build, or planner score official.</li>
                    <li>Mixing community-reported codes with official Trello-listed codes without labels.</li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-white mb-4">Related pages</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Link href="/updates" className="bg-surface border border-border rounded-lg p-4 hover:border-accent-blue/50 transition-colors group">
                        <div className="font-bold text-white group-hover:text-accent-blue transition-colors">Updates</div>
                        <div className="text-xs text-muted mt-1">Official and community signals kept separate.</div>
                    </Link>
                    <Link href="/codes" className="bg-surface border border-border rounded-lg p-4 hover:border-accent-blue/50 transition-colors group">
                        <div className="font-bold text-white group-hover:text-accent-blue transition-colors">Codes</div>
                        <div className="text-xs text-muted mt-1">Official Trello-listed and community-reported entries.</div>
                    </Link>
                    <Link href="/trello" className="bg-surface border border-border rounded-lg p-4 hover:border-accent-blue/50 transition-colors group">
                        <div className="font-bold text-white group-hover:text-accent-blue transition-colors">Official Trello</div>
                        <div className="text-xs text-muted mt-1">Direct links to the public board and official cards.</div>
                    </Link>
                </div>
            </section>
        </div>
    );
}
