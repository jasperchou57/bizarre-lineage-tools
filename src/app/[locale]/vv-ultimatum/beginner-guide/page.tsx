import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { BookOpen, CheckCircle2, Compass, ExternalLink, Map, ShieldCheck } from "lucide-react";
import { SITE_URL, withCanonical } from "@/lib/metadata";
import {
    VV_ULTIMATUM_LAST_CHECKED,
    VV_ULTIMATUM_PLACE_IMAGES,
    VV_ULTIMATUM_ROBLOX,
    vvKnownPlaces,
    vvOfficialDescriptionSummary,
    vvSourcePolicy,
} from "@/data/vv-ultimatum";
import {
    VvBreadcrumb,
    VvInfoCard,
    VvPageHeader,
    VvRelatedLinks,
} from "../shared";

const metaTitle = "VV Ultimatum Beginner Guide - What to Check First";
const metaDescription =
    "A beginner-first VV Ultimatum guide covering official Roblox status, source checks, codes, factions, abilities, and location watchlist topics.";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    await params;

    return withCanonical({
        title: metaTitle,
        description: metaDescription,
        openGraph: {
            title: metaTitle,
            description: metaDescription,
            url: `${SITE_URL}/vv-ultimatum/beginner-guide`,
            type: "article",
            images: [
                {
                    url: VV_ULTIMATUM_PLACE_IMAGES.valleyOfScreams,
                    width: 768,
                    height: 432,
                    alt: "VV Ultimatum Valley of Screams Roblox place icon",
                },
            ],
        },
    }, "/vv-ultimatum/beginner-guide");
}

const startSteps = [
    {
        title: "Confirm the official Roblox page",
        body: "Start from the verified game page instead of a copied link, especially during launch windows.",
    },
    {
        title: "Check release and access status",
        body: "Use the release tracker for the latest checked date, active player count, and Roblox update timestamp.",
    },
    {
        title: "Separate codes from rumors",
        body: "Do not treat a community-reported code as active until the reward or source is verified.",
    },
    {
        title: "Treat builds and tier lists as later-stage guides",
        body: "The site should publish them only after mechanics, abilities, and progression data are stable enough.",
    },
] as const;

const faq = [
    {
        question: "What should new VV Ultimatum players check first?",
        answer: "Start with the official Roblox page, release status, confirmed links, codes tracker, and then watchlist topics like factions, abilities, and locations.",
    },
    {
        question: "Does this page rank races, factions, or abilities?",
        answer: "Not yet. Rankings should wait until the data can be tested, maintained, and labeled as community or site-maintained rather than official.",
    },
    {
        question: "Why are some topics called watchlist items?",
        answer: "Watchlist topics have search demand but do not yet have enough verified data for a full guide page.",
    },
] as const;

export default async function VvUltimatumBeginnerGuidePage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "VV Ultimatum Wiki", item: `${SITE_URL}/vv-ultimatum` },
            { "@type": "ListItem", position: 3, name: "Beginner Guide", item: `${SITE_URL}/vv-ultimatum/beginner-guide` },
        ],
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
    };

    return (
        <div className="container mx-auto max-w-5xl px-4 py-10">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

            <VvBreadcrumb current="Beginner Guide" />
            <VvPageHeader
                eyebrow="Start here"
                title="VV Ultimatum Beginner Guide"
                intro="A practical first-stop page for new players: what is official, what should be checked first, and which high-search topics should wait for better data."
            />

            <section className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_340px]">
                <article className="rounded-xl border border-border bg-surface p-5">
                    <div className="relative mb-5 aspect-video overflow-hidden rounded-lg border border-white/10 bg-background">
                        <Image
                            src={VV_ULTIMATUM_PLACE_IMAGES.valleyOfScreams}
                            alt="VV Ultimatum Valley of Screams Roblox place icon"
                            fill
                            priority
                            sizes="(min-width: 1024px) 620px, 100vw"
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/35 to-transparent" />
                        <div className="absolute bottom-4 left-4 rounded-full border border-accent-blue/30 bg-accent-blue/10 px-3 py-1 text-xs font-bold text-accent-blue">
                            Beginner route
                        </div>
                    </div>

                    <h2 className="flex items-center gap-2 text-2xl font-bold text-white">
                        <BookOpen className="h-6 w-6 text-accent-blue" />
                        What the official description confirms
                    </h2>
                    <ul className="mt-4 space-y-3 text-sm leading-6 text-muted">
                        {vvOfficialDescriptionSummary.map((item) => (
                            <li key={item} className="flex gap-3">
                                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-300" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </article>

                <aside className="space-y-4">
                    <a
                        href={VV_ULTIMATUM_ROBLOX.robloxUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-start justify-between gap-4 rounded-xl border border-accent-blue/30 bg-accent-blue/10 p-5 transition-colors hover:border-accent-blue/60"
                    >
                        <span>
                            <span className="block text-xs font-bold uppercase tracking-wide text-accent-blue">Official first</span>
                            <span className="mt-1 block text-lg font-bold text-white">Open Roblox page</span>
                            <span className="mt-2 block text-sm leading-6 text-muted">Last checked: {VV_ULTIMATUM_LAST_CHECKED}</span>
                        </span>
                        <ExternalLink className="h-5 w-5 shrink-0 text-accent-blue" />
                    </a>

                    <VvInfoCard title="New player warning">
                        Early pages should avoid pretending that tier lists, races, weapons, or item values are official. Those are guide decisions, not Roblox facts.
                    </VvInfoCard>
                </aside>
            </section>

            <section className="mt-6 rounded-xl border border-border bg-surface p-5">
                <h2 className="flex items-center gap-2 text-xl font-bold text-white">
                    <Compass className="h-5 w-5 text-accent-blue" />
                    First checks for new players
                </h2>
                <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                    {startSteps.map((step, index) => (
                        <div key={step.title} className="rounded-lg border border-white/10 bg-background/45 p-4">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-accent-blue/30 bg-accent-blue/10 text-sm font-bold text-accent-blue">
                                {index + 1}
                            </div>
                            <h3 className="mt-4 font-bold text-white">{step.title}</h3>
                            <p className="mt-2 text-sm leading-6 text-muted">{step.body}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
                <VvInfoCard title="Known place names from Roblox data">
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {vvKnownPlaces.slice(0, 12).map((place) => (
                            <div key={place} className="rounded border border-white/10 bg-background/45 px-3 py-2 text-sm text-white">
                                {place}
                            </div>
                        ))}
                    </div>
                    <p className="mt-3 text-xs text-muted">These are names from Roblox place data. Gameplay notes still need in-game verification.</p>
                </VvInfoCard>

                <VvInfoCard title="Source policy">
                    <ul className="space-y-3">
                        {vvSourcePolicy.map((item) => (
                            <li key={item.label} className="flex gap-3">
                                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent-blue" />
                                <span><strong className="text-white">{item.label}:</strong> {item.body}</span>
                            </li>
                        ))}
                    </ul>
                </VvInfoCard>
            </section>

            <section className="mt-6 rounded-xl border border-border bg-surface p-5">
                <h2 className="flex items-center gap-2 text-xl font-bold text-white">
                    <Map className="h-5 w-5 text-accent-blue" />
                    What should become full guides later
                </h2>
                <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
                    {["Factions and races", "Skills and abilities", "Items and locations", "Resurrection", "Quincy weapon", "Boss or drop tables"].map((item) => (
                        <div key={item} className="rounded-lg border border-white/10 bg-background/45 p-4 text-sm text-muted">
                            {item}
                        </div>
                    ))}
                </div>
            </section>

            <section className="mt-10">
                <h2 className="text-2xl font-bold text-white">Beginner FAQ</h2>
                <div className="mt-4 space-y-3">
                    {faq.map((item) => (
                        <div key={item.question} className="rounded-xl border border-border bg-surface p-5">
                            <h3 className="font-bold text-white">{item.question}</h3>
                            <p className="mt-2 text-sm leading-6 text-muted">{item.answer}</p>
                        </div>
                    ))}
                </div>
            </section>

            <VvRelatedLinks currentHref="/vv-ultimatum/beginner-guide" />
        </div>
    );
}
