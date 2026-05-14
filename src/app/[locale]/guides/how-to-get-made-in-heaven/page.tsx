import type { Metadata } from "next";
import { ChevronRight, ExternalLink, Sparkles, CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { MADE_IN_HEAVEN_CONFIRMED_FACTS, MADE_IN_HEAVEN_MOVES, MADE_IN_HEAVEN_UNCONFIRMED, OFFICIAL_DATA_LAST_CHECKED, OFFICIAL_LINKS } from "@/data/official-sources";
import { withCanonical, SITE_URL } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
    return withCanonical({
        title: "How to Get Made in Heaven | Official Bizarre Lineage Facts",
        description: "Officially confirmed Made in Heaven facts for Bizarre Lineage: Trello evolution listing, Special label, Pucci location, Journey to Heaven requirement, and unverified gaps.",
    }, "/guides/how-to-get-made-in-heaven");
}

export default async function MadeInHeavenGuidePage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: "Guides" });
    const tCommon = await getTranslations({ locale, namespace: "Common" });

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: tCommon("breadcrumbHome"), item: SITE_URL },
            { "@type": "ListItem", position: 2, name: t("breadcrumbCurrent"), item: `${SITE_URL}/guides` },
            { "@type": "ListItem", position: 3, name: "How to Get Made in Heaven", item: `${SITE_URL}/guides/how-to-get-made-in-heaven` },
        ],
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            <nav className="flex items-center gap-2 text-sm text-muted mb-8" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-white transition-colors">{tCommon("breadcrumbHome")}</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/guides" className="hover:text-white transition-colors">{t("breadcrumbCurrent")}</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-white" aria-current="page">How to Get Made in Heaven</span>
            </nav>

            <div className="flex items-center gap-4 mb-4">
                <Sparkles className="h-12 w-12 text-purple-400" />
                <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-white m-0">How to Get Made in Heaven</h1>
            </div>
            <p className="text-lg text-muted leading-relaxed max-w-3xl mb-3">
                This page only lists public official facts about Made in Heaven. It does not invent quest steps, drop rates, or time estimates that are not visible on the checked Roblox/Trello sources.
            </p>
            <p className="text-sm text-muted mb-10">Official data checked: {OFFICIAL_DATA_LAST_CHECKED}</p>

            <section className="mb-12 bg-accent-blue/5 border border-accent-blue/20 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-white mb-4">Short answer</h2>
                <p className="text-sm md:text-base text-muted leading-relaxed">
                    The official Trello places <strong className="text-white">Made in Heaven</strong> in the <strong className="text-white">[EVOLUTIONS]</strong> list with a <strong className="text-white">Special</strong> label. The official Journey to Heaven card says the route starts after <strong className="text-white">1 Prestige</strong> by talking to <strong className="text-white">Pucci</strong> near <strong className="text-white">Bus Stop 18</strong> inside <strong className="text-white">Cultist Castle</strong>.
                </p>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-6">Officially confirmed facts</h2>
                <div className="space-y-4">
                    {MADE_IN_HEAVEN_CONFIRMED_FACTS.map((fact) => (
                        <article key={fact.title} className="bg-surface border border-border rounded-xl p-5">
                            <div className="flex items-start gap-3">
                                <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 shrink-0" />
                                <div>
                                    <h3 className="font-bold text-white mb-1">{fact.title}</h3>
                                    <p className="text-sm text-muted leading-relaxed mb-3">{fact.body}</p>
                                    <a href={fact.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-medium text-accent-blue hover:text-white transition-colors">
                                        Source: {fact.sourceLabel} <ExternalLink className="h-3 w-3" />
                                    </a>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">Official Made in Heaven moves</h2>
                <p className="text-sm text-muted mb-4">The public Made in Heaven Trello card lists these move names and keybinds:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {MADE_IN_HEAVEN_MOVES.map((move) => (
                        <div key={move} className="bg-surface border border-border rounded-lg p-3 text-sm font-medium text-white">
                            {move}
                        </div>
                    ))}
                </div>
                <a href={OFFICIAL_LINKS.madeInHeaven} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-medium text-accent-blue hover:text-white transition-colors mt-4">
                    Source: Official Trello Made in Heaven card <ExternalLink className="h-3 w-3" />
                </a>
            </section>

            <section className="mb-12 bg-yellow-500/5 border border-yellow-500/20 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-400" /> Still not publicly confirmed
                </h2>
                <ul className="space-y-2 text-sm text-muted">
                    {MADE_IN_HEAVEN_UNCONFIRMED.map((item) => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">Related official cards</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <a href={OFFICIAL_LINKS.whitesnake} target="_blank" rel="noopener noreferrer" className="bg-surface border border-border rounded-lg p-4 hover:border-purple-400/50 transition-colors group">
                        <div className="font-bold text-white group-hover:text-purple-400 transition-colors flex items-center gap-1">Whitesnake <ExternalLink className="h-3 w-3" /></div>
                        <div className="text-xs text-muted mt-1">Official [STANDS] card with Mythical label.</div>
                    </a>
                    <a href={OFFICIAL_LINKS.cmoon} target="_blank" rel="noopener noreferrer" className="bg-surface border border-border rounded-lg p-4 hover:border-accent-blue/50 transition-colors group">
                        <div className="font-bold text-white group-hover:text-accent-blue transition-colors flex items-center gap-1">C-Moon <ExternalLink className="h-3 w-3" /></div>
                        <div className="text-xs text-muted mt-1">Official [EVOLUTIONS] card with Special label.</div>
                    </a>
                    <a href={OFFICIAL_LINKS.madeInHeaven} target="_blank" rel="noopener noreferrer" className="bg-surface border border-border rounded-lg p-4 hover:border-accent-indigo/50 transition-colors group">
                        <div className="font-bold text-white group-hover:text-accent-indigo transition-colors flex items-center gap-1">Made in Heaven <ExternalLink className="h-3 w-3" /></div>
                        <div className="text-xs text-muted mt-1">Official [EVOLUTIONS] card with Special label.</div>
                    </a>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-white mb-4">Use it in site tools</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Link href="/stands/made-in-heaven" className="bg-surface border border-border rounded-lg p-4 hover:border-accent-blue/50 transition-colors group">
                        <div className="font-bold text-white group-hover:text-accent-blue transition-colors flex items-center justify-between gap-2">Stand page <ArrowRight className="h-4 w-4" /></div>
                        <div className="text-xs text-muted mt-1">Moves, planner notes, related Stands.</div>
                    </Link>
                    <Link href="/build-planner?stand=made-in-heaven" className="bg-surface border border-border rounded-lg p-4 hover:border-accent-blue/50 transition-colors group">
                        <div className="font-bold text-white group-hover:text-accent-blue transition-colors flex items-center justify-between gap-2">Planner <ArrowRight className="h-4 w-4" /></div>
                        <div className="text-xs text-muted mt-1">Site-maintained estimates, not official balance.</div>
                    </Link>
                    <Link href="/sources" className="bg-surface border border-border rounded-lg p-4 hover:border-accent-blue/50 transition-colors group">
                        <div className="font-bold text-white group-hover:text-accent-blue transition-colors flex items-center justify-between gap-2">Source rules <ArrowRight className="h-4 w-4" /></div>
                        <div className="text-xs text-muted mt-1">How this site separates official facts from notes.</div>
                    </Link>
                </div>
            </section>
        </div>
    );
}
