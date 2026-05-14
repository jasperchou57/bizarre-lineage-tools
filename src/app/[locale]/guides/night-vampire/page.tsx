import type { Metadata } from "next";
import { AlertTriangle, ArrowRight, CheckCircle2, ChevronRight, ExternalLink, Moon, ShieldCheck } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { NIGHT_VAMPIRE_UNCONFIRMED, OFFICIAL_DATA_LAST_CHECKED, OFFICIAL_LINKS, VAMPIRE_CONFIRMED_FACTS, VAMPIRE_MOVES } from "@/data/official-sources";
import { withCanonical, SITE_URL } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
    return withCanonical({
        title: "Night Vampire / Vampire Facts | Bizarre Lineage Official Source Check",
        description: "A source-checked Bizarre Lineage Vampire page: Stone Mask, Elder Vampire, Vampire passive, official Vampire moves, and what is not publicly confirmed about Night Vampire.",
    }, "/guides/night-vampire");
}

const relatedPages = [
    {
        title: "Vampire Sub-Ability",
        body: "Read the site's Vampire reference page with planner boundaries.",
        href: "/sub-abilities/vampire",
    },
    {
        title: "Sub-Abilities",
        body: "Compare Hamon, Vampire, and Cyborg with source notes.",
        href: "/sub-abilities",
    },
    {
        title: "Source Standards",
        body: "How this site separates official facts from planner notes.",
        href: "/sources",
    },
] as const;

export default async function NightVampireGuidePage({ params }: { params: Promise<{ locale: string }> }) {
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
            { "@type": "ListItem", position: 3, name: "Night Vampire", item: `${SITE_URL}/guides/night-vampire` },
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
                <span className="text-white" aria-current="page">Night Vampire</span>
            </nav>

            <div className="flex items-center gap-4 mb-4">
                <Moon className="h-12 w-12 text-purple-400" />
                <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-white m-0">Night Vampire / Vampire Source Check</h1>
            </div>
            <p className="text-lg text-muted leading-relaxed max-w-3xl mb-3">
                This page no longer presents Night Vampire upgrade steps as fact. The public official Trello confirms base Vampire, Stone Mask, Elder Vampire, and Vampire moves; it does not currently confirm a separate Night Vampire upgrade route in the checked public cards.
            </p>
            <p className="text-sm text-muted mb-10">Official data checked: {OFFICIAL_DATA_LAST_CHECKED}</p>

            <section className="mb-12 bg-purple-500/5 border border-purple-500/20 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-white mb-4">Short answer</h2>
                <p className="text-sm md:text-base text-muted leading-relaxed">
                    Officially, the public Trello confirms <strong className="text-white">Vampire</strong>, not a complete public <strong className="text-white">Night Vampire</strong> upgrade guide. To become Vampire, the public Stone Mask card says to use <strong className="text-white">Stone Mask</strong>; to unlock Vampire abilities, the public Vampire card points to <strong className="text-white">Elder Vampire</strong> in <strong className="text-white">Dio&apos;s Chapel</strong>.
                </p>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-6">Officially confirmed Vampire facts</h2>
                <div className="space-y-4">
                    {VAMPIRE_CONFIRMED_FACTS.map((fact) => (
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
                <h2 className="text-2xl font-bold text-white mb-4">Official Vampire moves listed publicly</h2>
                <p className="text-sm text-muted mb-4">The public Vampire Trello card lists these named moves and descriptions. It does not publish separate Night Vampire-only keybinds or cooldowns in the checked public card.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {VAMPIRE_MOVES.map((move) => (
                        <article key={move.name} className="bg-surface border border-border rounded-xl p-5">
                            <h3 className="font-bold text-white mb-2">{move.name}</h3>
                            <p className="text-sm text-muted leading-relaxed">{move.body}</p>
                        </article>
                    ))}
                </div>
                <a href={OFFICIAL_LINKS.vampire} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-medium text-accent-blue hover:text-white transition-colors mt-4">
                    Source: Official Trello Vampire card <ExternalLink className="h-3 w-3" />
                </a>
            </section>

            <section className="mb-12 bg-yellow-500/5 border border-yellow-500/20 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-400" /> Not publicly confirmed
                </h2>
                <ul className="space-y-2 text-sm text-muted">
                    {NIGHT_VAMPIRE_UNCONFIRMED.map((item) => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">Official source shortcuts</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <a href={OFFICIAL_LINKS.stoneMask} target="_blank" rel="noopener noreferrer" className="bg-surface border border-border rounded-lg p-4 hover:border-purple-400/50 transition-colors group">
                        <div className="font-bold text-white group-hover:text-purple-400 transition-colors flex items-center gap-1">Stone Mask <ExternalLink className="h-3 w-3" /></div>
                        <div className="text-xs text-muted mt-1">Official item card for Vampire entry.</div>
                    </a>
                    <a href={OFFICIAL_LINKS.vampire} target="_blank" rel="noopener noreferrer" className="bg-surface border border-border rounded-lg p-4 hover:border-accent-blue/50 transition-colors group">
                        <div className="font-bold text-white group-hover:text-accent-blue transition-colors flex items-center gap-1">Vampire <ExternalLink className="h-3 w-3" /></div>
                        <div className="text-xs text-muted mt-1">Official Sub Ability card and move names.</div>
                    </a>
                    <a href={OFFICIAL_LINKS.elderVampire} target="_blank" rel="noopener noreferrer" className="bg-surface border border-border rounded-lg p-4 hover:border-green-500/50 transition-colors group">
                        <div className="font-bold text-white group-hover:text-green-400 transition-colors flex items-center gap-1">Elder Vampire <ExternalLink className="h-3 w-3" /></div>
                        <div className="text-xs text-muted mt-1">Official NPC location card.</div>
                    </a>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-white mb-4">Where to go next</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {relatedPages.map((page) => (
                        <Link key={page.href} href={page.href} className="bg-surface border border-border rounded-lg p-4 hover:border-accent-blue/50 transition-colors group">
                            <div className="font-bold text-white group-hover:text-accent-blue transition-colors flex items-center justify-between gap-2">
                                {page.title} {page.href === "/sources" ? <ShieldCheck className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
                            </div>
                            <div className="text-xs text-muted mt-1">{page.body}</div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}
