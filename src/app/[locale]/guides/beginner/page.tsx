import type { Metadata } from "next";
import { ChevronRight, ExternalLink, BookOpen, CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { BEGINNER_CONFIRMED_FACTS, OFFICIAL_DATA_LAST_CHECKED, OFFICIAL_LINKS } from "@/data/official-sources";
import { withCanonical, SITE_URL } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
    return withCanonical({
        title: "Bizarre Lineage Beginner Guide | Official Facts First",
        description: "A Bizarre Lineage beginner guide built only from official Roblox and Trello facts: controls, Stand Arrow, Lucky Arrow, Prestige, and World Events.",
    }, "/guides/beginner");
}

const notClaimed = [
    "Exact fastest leveling route by minute or hour.",
    "Exact Stand Arrow drop percentages.",
    "Boss HP, boss damage, or hidden drop tables.",
    "Best build as an official developer recommendation.",
];

const nextSteps = [
    {
        title: "Check active codes",
        body: "Codes are separated into official Trello-listed and community-reported entries.",
        href: "/codes",
    },
    {
        title: "Read Stand chances safely",
        body: "See what is official and what is only a site-maintained rarity label.",
        href: "/guides/stand-chances",
    },
    {
        title: "Plan a build",
        body: "Use the planner as a site-maintained estimate, not official balance data.",
        href: "/build-planner",
    },
] as const;

export default async function BeginnerGuidePage({ params }: { params: Promise<{ locale: string }> }) {
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
            { "@type": "ListItem", position: 3, name: "Beginner Guide", item: `${SITE_URL}/guides/beginner` },
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
                <span className="text-white" aria-current="page">Beginner Guide</span>
            </nav>

            <div className="flex items-center gap-4 mb-4">
                <BookOpen className="h-12 w-12 text-accent-blue" />
                <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-white m-0">Bizarre Lineage Beginner Guide</h1>
            </div>
            <p className="text-lg text-muted leading-relaxed max-w-3xl mb-3">
                This starter guide only uses public official Roblox and Trello facts. It is a safe orientation page, not an invented speedrun route.
            </p>
            <p className="text-sm text-muted mb-10">Official data checked: {OFFICIAL_DATA_LAST_CHECKED}</p>

            <section className="mb-12 bg-surface border border-border rounded-xl p-6">
                <h2 className="text-2xl font-bold text-white mb-4">Official beginner facts</h2>
                <div className="space-y-4">
                    {BEGINNER_CONFIRMED_FACTS.map((fact, index) => (
                        <article key={fact.title} className="border border-white/5 bg-background/40 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-blue/10 text-sm font-bold text-accent-blue border border-accent-blue/20">
                                    {index + 1}
                                </span>
                                <div className="flex-1">
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
                <h2 className="text-2xl font-bold text-white mb-4">Beginner checklist</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-surface border border-green-500/20 rounded-xl p-5">
                        <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                            <CheckCircle2 className="h-5 w-5 text-green-400" /> Confirmed actions
                        </h3>
                        <ul className="space-y-2 text-sm text-muted">
                            <li>Use the Roblox controls list as the official input reference.</li>
                            <li>Use Stand Arrows as the documented path into Stand acquisition.</li>
                            <li>Treat Lucky Arrow as a skin item unless a primary source says otherwise.</li>
                            <li>Use Arch Mage / Prestige notes only where the public Trello is explicit.</li>
                        </ul>
                    </div>
                    <div className="bg-surface border border-yellow-500/20 rounded-xl p-5">
                        <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                            <XCircle className="h-5 w-5 text-yellow-400" /> Not claimed here
                        </h3>
                        <ul className="space-y-2 text-sm text-muted">
                            {notClaimed.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">Official source shortcuts</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <a href={OFFICIAL_LINKS.robloxGame} target="_blank" rel="noopener noreferrer" className="bg-surface border border-border rounded-lg p-4 hover:border-green-500/50 transition-colors group">
                        <div className="font-bold text-white group-hover:text-green-400 transition-colors flex items-center gap-1">Roblox Page <ExternalLink className="h-3 w-3" /></div>
                        <div className="text-xs text-muted mt-1">Controls and current public game description.</div>
                    </a>
                    <a href={OFFICIAL_LINKS.standArrow} target="_blank" rel="noopener noreferrer" className="bg-surface border border-border rounded-lg p-4 hover:border-accent-blue/50 transition-colors group">
                        <div className="font-bold text-white group-hover:text-accent-blue transition-colors flex items-center gap-1">Stand Arrow <ExternalLink className="h-3 w-3" /></div>
                        <div className="text-xs text-muted mt-1">Official obtainment paths for Stand Arrow.</div>
                    </a>
                    <a href={OFFICIAL_LINKS.prestige} target="_blank" rel="noopener noreferrer" className="bg-surface border border-border rounded-lg p-4 hover:border-accent-indigo/50 transition-colors group">
                        <div className="font-bold text-white group-hover:text-accent-indigo transition-colors flex items-center gap-1">Prestige <ExternalLink className="h-3 w-3" /></div>
                        <div className="text-xs text-muted mt-1">Official public prestige requirements and rewards.</div>
                    </a>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-white mb-4">Where to go next</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {nextSteps.map((step) => (
                        <Link key={step.href} href={step.href} className="bg-surface border border-border rounded-lg p-4 hover:border-accent-blue/50 transition-colors group">
                            <div className="font-bold text-white group-hover:text-accent-blue transition-colors flex items-center justify-between gap-2">
                                {step.title} <ArrowRight className="h-4 w-4" />
                            </div>
                            <div className="text-xs text-muted mt-1">{step.body}</div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}
