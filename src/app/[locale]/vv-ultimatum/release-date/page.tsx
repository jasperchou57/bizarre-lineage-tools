import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { CalendarClock, CheckCircle2, ExternalLink, Info, XCircle } from "lucide-react";
import { SITE_URL, withCanonical } from "@/lib/metadata";
import {
    VV_ULTIMATUM_LAST_CHECKED,
    VV_ULTIMATUM_ROBLOX,
} from "@/data/vv-ultimatum";
import {
    VvBreadcrumb,
    VvInfoCard,
    VvPageHeader,
    VvRelatedLinks,
} from "../shared";

const metaTitle = "VV Ultimatum Release Date - Is VV Ultimatum Out?";
const metaDescription =
    "Track the VV Ultimatum release date, access status, Roblox page, and latest checked sources without mixing official facts with community rumors.";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    await params;

    return withCanonical({
        title: metaTitle,
        description: metaDescription,
        openGraph: {
            title: metaTitle,
            description: metaDescription,
            url: `${SITE_URL}/vv-ultimatum/release-date`,
            type: "article",
            images: [
                {
                    url: VV_ULTIMATUM_ROBLOX.thumbnailUrl,
                    width: 768,
                    height: 432,
                    alt: "VV Ultimatum Roblox thumbnail",
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: metaTitle,
            description: metaDescription,
            images: [VV_ULTIMATUM_ROBLOX.thumbnailUrl],
        },
    }, "/vv-ultimatum/release-date");
}

const confirmedFacts = [
    "The public Roblox experience page is live.",
    "The Roblox API reports active players for the universe.",
    `The creator is listed as ${VV_ULTIMATUM_ROBLOX.creatorName}.`,
    "The game page and API provide the universe id, root place id, updated time, visits, favorites, and max player count.",
] as const;

const unconfirmedItems = [
    "A separate official final-release announcement has not been added here yet.",
    "Trello, Discord invite, codes, tier lists, and item claims should be checked on their own source-labeled pages.",
    "Launch-window wording can change quickly, so this page keeps exact checked dates visible.",
] as const;

const faq = [
    {
        question: "Is VV Ultimatum out?",
        answer: "The Roblox page is live and Roblox API data currently reports active players. This page still labels the status by source because launch access can change during early release windows.",
    },
    {
        question: "What is the official VV Ultimatum Roblox link?",
        answer: `The tracked Roblox page is ${VV_ULTIMATUM_ROBLOX.robloxUrl}.`,
    },
    {
        question: "When was the Roblox page last updated?",
        answer: `The Roblox API updated timestamp checked here is ${formatIsoDate(VV_ULTIMATUM_ROBLOX.updatedAt)}.`,
    },
] as const;

export default async function VvUltimatumReleaseDatePage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "VV Ultimatum Wiki", item: `${SITE_URL}/vv-ultimatum` },
            { "@type": "ListItem", position: 3, name: "Release Date", item: `${SITE_URL}/vv-ultimatum/release-date` },
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

            <VvBreadcrumb current="Release Date" />
            <VvPageHeader
                eyebrow="Release tracker"
                title="VV Ultimatum Release Date"
                intro="A source-labeled release and access snapshot for players searching whether VV Ultimatum is out, where the Roblox page is, and what has been confirmed."
            />

            <section className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_340px]">
                <article className="rounded-xl border border-border bg-surface p-5">
                    <div className="relative mb-5 aspect-video overflow-hidden rounded-lg border border-white/10 bg-background">
                        <Image
                            src={VV_ULTIMATUM_ROBLOX.thumbnailUrl}
                            alt="VV Ultimatum Roblox thumbnail"
                            fill
                            priority
                            sizes="(min-width: 1024px) 620px, 100vw"
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/25 to-transparent" />
                        <div className="absolute bottom-4 left-4 rounded-full border border-green-400/25 bg-green-400/10 px-3 py-1 text-xs font-bold text-green-300">
                            Roblox page live
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-white">Current status</h2>
                    <p className="mt-3 text-sm leading-7 text-muted">
                        As of {VV_ULTIMATUM_LAST_CHECKED}, the public Roblox page for {VV_ULTIMATUM_ROBLOX.name} is live and the Roblox API reports active public stats. This page does not treat community release claims as official unless they are tied back to a verified source.
                    </p>

                    <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
                        <Metric label="Playing" value={formatNumber(VV_ULTIMATUM_ROBLOX.playing)} />
                        <Metric label="Visits" value={formatNumber(VV_ULTIMATUM_ROBLOX.visits)} />
                        <Metric label="Favorites" value={formatNumber(VV_ULTIMATUM_ROBLOX.favorites)} />
                        <Metric label="Max players" value={String(VV_ULTIMATUM_ROBLOX.maxPlayers)} />
                    </div>
                </article>

                <aside className="space-y-4">
                    <VvInfoCard title="Official Roblox snapshot">
                        <dl className="space-y-3">
                            <Snapshot label="Universe ID" value={String(VV_ULTIMATUM_ROBLOX.universeId)} />
                            <Snapshot label="Root place ID" value={String(VV_ULTIMATUM_ROBLOX.rootPlaceId)} />
                            <Snapshot label="Created" value={formatIsoDate(VV_ULTIMATUM_ROBLOX.createdAt)} />
                            <Snapshot label="Updated" value={formatIsoDate(VV_ULTIMATUM_ROBLOX.updatedAt)} />
                        </dl>
                    </VvInfoCard>

                    <a
                        href={VV_ULTIMATUM_ROBLOX.robloxUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between gap-4 rounded-xl border border-accent-blue/30 bg-accent-blue/10 p-5 text-sm font-bold text-white transition-colors hover:border-accent-blue/60"
                    >
                        Open official Roblox page
                        <ExternalLink className="h-4 w-4 text-accent-blue" />
                    </a>
                </aside>
            </section>

            <section className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
                <VvInfoCard title="What is confirmed">
                    <ul className="space-y-3">
                        {confirmedFacts.map((item) => (
                            <li key={item} className="flex gap-3">
                                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-300" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </VvInfoCard>

                <VvInfoCard title="What still needs verification">
                    <ul className="space-y-3">
                        {unconfirmedItems.map((item) => (
                            <li key={item} className="flex gap-3">
                                <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-yellow-300" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </VvInfoCard>
            </section>

            <section className="mt-6 rounded-xl border border-border bg-surface p-5">
                <h2 className="flex items-center gap-2 text-xl font-bold text-white">
                    <CalendarClock className="h-5 w-5 text-accent-blue" />
                    Update checklist
                </h2>
                <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
                    {["Re-check Roblox API data", "Review official channels", "Update linked codes and guide pages"].map((item) => (
                        <div key={item} className="rounded-lg border border-white/10 bg-background/45 p-4 text-sm text-muted">
                            <Info className="mb-3 h-5 w-5 text-accent-blue" />
                            {item}
                        </div>
                    ))}
                </div>
            </section>

            <section className="mt-10">
                <h2 className="text-2xl font-bold text-white">Release FAQ</h2>
                <div className="mt-4 space-y-3">
                    {faq.map((item) => (
                        <div key={item.question} className="rounded-xl border border-border bg-surface p-5">
                            <h3 className="font-bold text-white">{item.question}</h3>
                            <p className="mt-2 text-sm leading-6 text-muted">{item.answer}</p>
                        </div>
                    ))}
                </div>
            </section>

            <VvRelatedLinks currentHref="/vv-ultimatum/release-date" />
        </div>
    );
}

function Metric({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-lg border border-white/10 bg-background/55 p-4">
            <div className="text-xl font-bold text-white">{value}</div>
            <div className="mt-1 text-xs uppercase tracking-wide text-muted">{label}</div>
        </div>
    );
}

function Snapshot({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <dt className="text-xs uppercase tracking-wide text-muted">{label}</dt>
            <dd className="mt-1 font-medium text-white">{value}</dd>
        </div>
    );
}

function formatNumber(value: number) {
    return new Intl.NumberFormat("en-US").format(value);
}

function formatIsoDate(value: string) {
    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        timeZone: "UTC",
        timeZoneName: "short",
    }).format(new Date(value));
}
