import type { Metadata } from "next";
import { ArrowRight, AlertTriangle, CheckCircle2, ChevronRight, ExternalLink, ShieldCheck, Zap } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { AWAKENING_CONFIRMED_FACTS, AWAKENING_UNCONFIRMED, OFFICIAL_DATA_LAST_CHECKED, OFFICIAL_LINKS } from "@/data/official-sources";
import { withCanonical, SITE_URL } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
    return withCanonical({
        title: "Bizarre Lineage Awakening Guide | Official Trello Facts",
        description: "Officially confirmed Bizarre Lineage awakening facts from the public Trello: Inner World, gym mat entry, Level 50, Stand Conjuration 100, and unconfirmed gaps.",
    }, "/guides/awakening");
}

const awakeningSteps = [
    {
        title: "Reach the public requirement",
        body: "The official Inner World card lists Level 50 and Stand Conjuration 100 as the requirement for the awakening option.",
        sourceUrl: OFFICIAL_LINKS.innerWorld,
    },
    {
        title: "Use the gym mat to enter Inner World",
        body: "The official Inner World card says the gym mat lets you enter Inner World.",
        sourceUrl: OFFICIAL_LINKS.innerWorld,
    },
    {
        title: "Talk to the Inner World clone",
        body: "The card says the clone offers multiple choices, including the awakening-related option.",
        sourceUrl: OFFICIAL_LINKS.innerWorld,
    },
    {
        title: "Choose 'I want to surpass my limits'",
        body: "The official card says this option makes you fight yourself with the awakening of your Stand and unlocks awakening.",
        sourceUrl: OFFICIAL_LINKS.innerWorld,
    },
] as const;

const relatedPages = [
    {
        title: "Beginner Guide",
        body: "Official controls, Stand Arrow, Lucky Arrow, Prestige, and World Events.",
        href: "/guides/beginner",
    },
    {
        title: "Stats Guide",
        body: "Official stat roles plus clearly labeled site-maintained presets.",
        href: "/guides/stats",
    },
    {
        title: "Build Planner",
        body: "Planner scores are local estimates, not official balance values.",
        href: "/build-planner",
    },
] as const;

export default async function AwakeningGuidePage({ params }: { params: Promise<{ locale: string }> }) {
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
            { "@type": "ListItem", position: 3, name: "Awakening", item: `${SITE_URL}/guides/awakening` },
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
                <span className="text-white" aria-current="page">Awakening</span>
            </nav>

            <div className="flex items-center gap-4 mb-4">
                <Zap className="h-12 w-12 text-yellow-400" />
                <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-white m-0">Bizarre Lineage Awakening Guide</h1>
            </div>
            <p className="text-lg text-muted leading-relaxed max-w-3xl mb-3">
                This page now only presents awakening facts that are visible on the public official Trello. Boss HP, fastest routes, and best-Stand strategy are kept out unless a source supports them.
            </p>
            <p className="text-sm text-muted mb-10">Official data checked: {OFFICIAL_DATA_LAST_CHECKED}</p>

            <section className="mb-12 bg-accent-blue/5 border border-accent-blue/20 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-white mb-4">Short answer</h2>
                <p className="text-sm md:text-base text-muted leading-relaxed">
                    The official Trello says awakening is handled through <strong className="text-white">Inner World</strong>. Enter from the <strong className="text-white">gym mat</strong>, meet the public requirement of <strong className="text-white">Level 50</strong> and <strong className="text-white">Stand Conjuration 100</strong>, then choose <strong className="text-white">&quot;I want to surpass my limits&quot;</strong> from the Inner World clone.
                </p>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-6">Officially confirmed facts</h2>
                <div className="space-y-4">
                    {AWAKENING_CONFIRMED_FACTS.map((fact) => (
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
                <h2 className="text-2xl font-bold text-white mb-6">Official route, without unsupported extras</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {awakeningSteps.map((step, index) => (
                        <article key={step.title} className="bg-surface border border-border rounded-xl p-5">
                            <div className="flex items-start gap-3">
                                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-yellow-400/10 text-sm font-bold text-yellow-400 border border-yellow-400/20">
                                    {index + 1}
                                </span>
                                <div>
                                    <h3 className="font-bold text-white mb-1">{step.title}</h3>
                                    <p className="text-sm text-muted leading-relaxed mb-3">{step.body}</p>
                                    <a href={step.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-medium text-accent-blue hover:text-white transition-colors">
                                        Source: Official Trello Inner World card <ExternalLink className="h-3 w-3" />
                                    </a>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section className="mb-12 bg-yellow-500/5 border border-yellow-500/20 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-400" /> Not publicly confirmed
                </h2>
                <ul className="space-y-2 text-sm text-muted">
                    {AWAKENING_UNCONFIRMED.map((item) => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">Official source shortcuts</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <a href={OFFICIAL_LINKS.innerWorld} target="_blank" rel="noopener noreferrer" className="bg-surface border border-border rounded-lg p-4 hover:border-yellow-400/50 transition-colors group">
                        <div className="font-bold text-white group-hover:text-yellow-400 transition-colors flex items-center gap-1">Inner World <ExternalLink className="h-3 w-3" /></div>
                        <div className="text-xs text-muted mt-1">Official awakening requirement and route entry.</div>
                    </a>
                    <a href={OFFICIAL_LINKS.conjuringStand} target="_blank" rel="noopener noreferrer" className="bg-surface border border-border rounded-lg p-4 hover:border-accent-blue/50 transition-colors group">
                        <div className="font-bold text-white group-hover:text-accent-blue transition-colors flex items-center gap-1">Conjuring Your Stand <ExternalLink className="h-3 w-3" /></div>
                        <div className="text-xs text-muted mt-1">Official ways to build Stand Conjuration.</div>
                    </a>
                    <Link href="/sources" className="bg-surface border border-border rounded-lg p-4 hover:border-green-500/50 transition-colors group">
                        <div className="font-bold text-white group-hover:text-green-400 transition-colors flex items-center gap-1">Source Standards <ShieldCheck className="h-3 w-3" /></div>
                        <div className="text-xs text-muted mt-1">How this site separates official facts from planner notes.</div>
                    </Link>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-white mb-4">Where to go next</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {relatedPages.map((page) => (
                        <Link key={page.href} href={page.href} className="bg-surface border border-border rounded-lg p-4 hover:border-accent-blue/50 transition-colors group">
                            <div className="font-bold text-white group-hover:text-accent-blue transition-colors flex items-center justify-between gap-2">
                                {page.title} <ArrowRight className="h-4 w-4" />
                            </div>
                            <div className="text-xs text-muted mt-1">{page.body}</div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}
