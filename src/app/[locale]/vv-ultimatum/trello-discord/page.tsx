import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { ExternalLink, Link2, ShieldCheck, TriangleAlert } from "lucide-react";
import { SITE_URL, withCanonical } from "@/lib/metadata";
import {
    VV_ULTIMATUM_LAST_CHECKED,
    VV_ULTIMATUM_LINKS,
    VV_ULTIMATUM_PLACE_IMAGES,
    VV_ULTIMATUM_ROBLOX,
    vvSourcePolicy,
} from "@/data/vv-ultimatum";
import {
    VvBreadcrumb,
    VvInfoCard,
    VvPageHeader,
    VvRelatedLinks,
} from "../shared";

const metaTitle = "VV Ultimatum Trello & Discord - Official Links and Source Check";
const metaDescription =
    "Source-labeled VV Ultimatum Roblox, Trello, and Discord link tracker with official, community, and unverified statuses kept separate.";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    await params;

    return withCanonical({
        title: metaTitle,
        description: metaDescription,
        openGraph: {
            title: metaTitle,
            description: metaDescription,
            url: `${SITE_URL}/vv-ultimatum/trello-discord`,
            type: "article",
            images: [
                {
                    url: VV_ULTIMATUM_PLACE_IMAGES.innerWorld,
                    width: 768,
                    height: 432,
                    alt: "VV Ultimatum Inner World Roblox place icon",
                },
            ],
        },
    }, "/vv-ultimatum/trello-discord");
}

const faq = [
    {
        question: "Is there an official VV Ultimatum Trello?",
        answer: "A public VV Ultimatum Trello board exists, but this page labels it as community maintained. Multiple guide sources call it community-led, and the board itself is contribution-oriented, so it should not be presented as an official developer Trello.",
    },
    {
        question: "Is there an official VV Ultimatum Discord?",
        answer: `The invite ${VV_ULTIMATUM_LINKS.discord.url} resolves through Discord's public invite API to a server named ${VV_ULTIMATUM_LINKS.discord.serverName}. This page labels it as reported official because Roblox social-link API verification was not available without authentication.`,
    },
    {
        question: "What link is confirmed right now?",
        answer: `The official Roblox game page is tracked here: ${VV_ULTIMATUM_ROBLOX.robloxUrl}. The Discord invite and public Trello board are also listed with separate confidence labels.`,
    },
] as const;

export default async function VvUltimatumTrelloDiscordPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "VV Ultimatum Wiki", item: `${SITE_URL}/vv-ultimatum` },
            { "@type": "ListItem", position: 3, name: "Trello & Discord", item: `${SITE_URL}/vv-ultimatum/trello-discord` },
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

            <VvBreadcrumb current="Trello & Discord" />
            <VvPageHeader
                eyebrow="Official link check"
                title="VV Ultimatum Trello & Discord"
                intro="A clean link tracker for players who need the real Roblox page, the reported official Discord, and the public Trello board without mixing official and community-maintained sources."
            />

            <section className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_360px]">
                <article className="rounded-xl border border-border bg-surface p-5">
                    <div className="relative mb-5 aspect-video overflow-hidden rounded-lg border border-white/10 bg-background">
                        <Image
                            src={VV_ULTIMATUM_PLACE_IMAGES.innerWorld}
                            alt="VV Ultimatum Inner World Roblox place icon"
                            fill
                            priority
                            sizes="(min-width: 1024px) 620px, 100vw"
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/35 to-transparent" />
                        <div className="absolute bottom-4 left-4 rounded-full border border-yellow-400/25 bg-yellow-400/10 px-3 py-1 text-xs font-bold text-yellow-200">
                            Links are source-labeled
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <LinkStatus
                            title="Roblox"
                            status="Confirmed"
                            tone="green"
                            body="Official public Roblox game page and API-backed identity."
                        />
                        <LinkStatus
                            title="Trello"
                            status="Community board"
                            tone="yellow"
                            body="Public board found and API-verified, but not labeled as official developer-owned."
                        />
                        <LinkStatus
                            title="Discord"
                            status="Reported official"
                            tone="green"
                            body="Invite API resolves vvgame to a VV: ULTIMATUM server with public member counts."
                        />
                    </div>
                </article>

                <aside className="space-y-4">
                    <a
                        href={VV_ULTIMATUM_ROBLOX.robloxUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-start justify-between gap-4 rounded-xl border border-green-400/25 bg-green-400/10 p-5 transition-colors hover:border-green-400/50"
                    >
                        <span>
                            <span className="block text-xs font-bold uppercase tracking-wide text-green-300">Official</span>
                            <span className="mt-1 block text-lg font-bold text-white">Roblox game page</span>
                            <span className="mt-2 block text-sm leading-6 text-muted">Universe ID {VV_ULTIMATUM_ROBLOX.universeId}, root place {VV_ULTIMATUM_ROBLOX.rootPlaceId}.</span>
                        </span>
                        <ExternalLink className="h-5 w-5 shrink-0 text-green-300" />
                    </a>

                    <a
                        href={VV_ULTIMATUM_LINKS.discord.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-start justify-between gap-4 rounded-xl border border-accent-blue/30 bg-accent-blue/10 p-5 transition-colors hover:border-accent-blue/60"
                    >
                        <span>
                            <span className="block text-xs font-bold uppercase tracking-wide text-accent-blue">{VV_ULTIMATUM_LINKS.discord.status}</span>
                            <span className="mt-1 block text-lg font-bold text-white">Discord: {VV_ULTIMATUM_LINKS.discord.serverName}</span>
                            <span className="mt-2 block text-sm leading-6 text-muted">
                                {formatNumber(VV_ULTIMATUM_LINKS.discord.memberCount)} members, {formatNumber(VV_ULTIMATUM_LINKS.discord.onlineCount)} online by Discord invite API.
                            </span>
                        </span>
                        <ExternalLink className="h-5 w-5 shrink-0 text-accent-blue" />
                    </a>

                    <a
                        href={VV_ULTIMATUM_LINKS.trello.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-start justify-between gap-4 rounded-xl border border-yellow-400/25 bg-yellow-400/10 p-5 transition-colors hover:border-yellow-400/50"
                    >
                        <span>
                            <span className="block text-xs font-bold uppercase tracking-wide text-yellow-200">{VV_ULTIMATUM_LINKS.trello.status}</span>
                            <span className="mt-1 block text-lg font-bold text-white">Trello: V1 info board</span>
                            <span className="mt-2 block text-sm leading-6 text-muted">
                                Public Trello API board, last activity {formatIsoDate(VV_ULTIMATUM_LINKS.trello.lastActivity)}.
                            </span>
                        </span>
                        <ExternalLink className="h-5 w-5 shrink-0 text-yellow-200" />
                    </a>

                    <VvInfoCard title="Last checked">
                        {VV_ULTIMATUM_LAST_CHECKED}. Discord and Trello are listed with separate confidence labels because Roblox social-link endpoints require authentication.
                    </VvInfoCard>
                </aside>
            </section>

            <section className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
                <VvInfoCard title="Verification rules">
                    <ul className="space-y-3">
                        {vvSourcePolicy.map((item) => (
                            <li key={item.label} className="flex gap-3">
                                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent-blue" />
                                <span><strong className="text-white">{item.label}:</strong> {item.body}</span>
                            </li>
                        ))}
                    </ul>
                </VvInfoCard>

                <VvInfoCard title="Watchlist policy">
                    <p>
                        A Trello board, Discord invite, YouTube video, TikTok post, or Roblox comment can be useful, but it should not be presented as official unless the ownership path is clear.
                    </p>
                    <p className="mt-3">
                        Current Trello note: {VV_ULTIMATUM_LINKS.trello.note}
                    </p>
                    <p className="mt-3">
                        Current Discord note: {VV_ULTIMATUM_LINKS.discord.note}
                    </p>
                </VvInfoCard>
            </section>

            <section className="mt-6 rounded-xl border border-yellow-400/20 bg-yellow-400/5 p-5">
                <h2 className="flex items-center gap-2 text-xl font-bold text-white">
                    <TriangleAlert className="h-5 w-5 text-yellow-300" />
                    What still needs Roblox-side verification
                </h2>
                <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
                    {["Roblox social-link access", "Developer-owned Trello confirmation", "Official source page beyond Discord/Trello"].map((item) => (
                        <div key={item} className="rounded-lg border border-yellow-400/15 bg-background/45 p-4 text-sm text-muted">
                            <Link2 className="mb-3 h-5 w-5 text-yellow-300" />
                            {item}
                        </div>
                    ))}
                </div>
            </section>

            <section className="mt-10">
                <h2 className="text-2xl font-bold text-white">Trello & Discord FAQ</h2>
                <div className="mt-4 space-y-3">
                    {faq.map((item) => (
                        <div key={item.question} className="rounded-xl border border-border bg-surface p-5">
                            <h3 className="font-bold text-white">{item.question}</h3>
                            <p className="mt-2 text-sm leading-6 text-muted">{item.answer}</p>
                        </div>
                    ))}
                </div>
            </section>

            <VvRelatedLinks currentHref="/vv-ultimatum/trello-discord" />
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

function LinkStatus({
    title,
    status,
    body,
    tone,
}: {
    title: string;
    status: string;
    body: string;
    tone: "green" | "yellow";
}) {
    const toneClass = tone === "green"
        ? "border-green-400/20 bg-green-400/10 text-green-300"
        : "border-yellow-400/20 bg-yellow-400/10 text-yellow-200";

    return (
        <div className="rounded-lg border border-white/10 bg-background/45 p-4">
            <div className={`mb-3 inline-flex rounded-full border px-2 py-1 text-xs font-bold ${toneClass}`}>{status}</div>
            <h2 className="text-lg font-bold text-white">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-muted">{body}</p>
        </div>
    );
}
