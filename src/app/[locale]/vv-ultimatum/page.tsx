import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import {
    ArrowRight,
    BadgeCheck,
    BookOpen,
    CalendarClock,
    ChevronDown,
    CircleHelp,
    Compass,
    ExternalLink,
    Gamepad2,
    Gift,
    Link2,
    ListChecks,
    Radio,
    Search,
    ShieldCheck,
    Sparkles,
    Swords,
    Users,
    Zap,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SITE_URL, withCanonical } from "@/lib/metadata";
import {
    VV_ULTIMATUM_LAST_CHECKED,
    VV_ULTIMATUM_LINKS,
    VV_ULTIMATUM_PLACE_IMAGES,
    VV_ULTIMATUM_ROBLOX,
    vvFaq,
    vvOfficialDescriptionSummary,
    vvSourcePolicy,
} from "@/data/vv-ultimatum";

const metaTitle = "VV Ultimatum Wiki - Release Date, Roblox Link, Codes & Guides";
const metaDescription =
    "Unofficial VV Ultimatum wiki hub with source-checked release status, Roblox link, Trello and Discord notes, codes, beginner guides, and update tracking.";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    await params;

    return withCanonical({
        title: metaTitle,
        description: metaDescription,
        openGraph: {
            title: metaTitle,
            description: metaDescription,
            url: `${SITE_URL}/vv-ultimatum`,
            type: "website",
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
    }, "/vv-ultimatum");
}

const heroStats = [
    { label: "Roblox players", value: formatNumber(VV_ULTIMATUM_ROBLOX.playing), source: "Roblox API" },
    { label: "Visits", value: formatNumber(VV_ULTIMATUM_ROBLOX.visits), source: "Roblox API" },
    { label: "Max players", value: String(VV_ULTIMATUM_ROBLOX.maxPlayers), source: "Roblox API" },
] as const;

const intentCards = [
    {
        title: "Release and access status",
        body: "Track whether VV Ultimatum is playable, when the Roblox page last changed, and what is confirmed by official sources.",
        href: "#release-status",
        icon: CalendarClock,
        label: "Official first",
    },
    {
        title: "Roblox, Trello, and Discord links",
        body: "Keep official links, community links, and unverified reports separated so players do not follow fake mirrors.",
        href: "#official-links",
        icon: Link2,
        label: "Source labels",
    },
    {
        title: "Codes and rewards watch",
        body: "Codes get their own tracker with active, expired, official, and community-reported entries split apart.",
        href: "#codes",
        icon: Gift,
        label: "Last checked",
    },
    {
        title: "New player starting route",
        body: "Start with faction, ability, race, and access notes before chasing tier lists or build claims.",
        href: "#beginner-guide",
        icon: Compass,
        label: "Beginner path",
    },
] as const;

const guideCards = [
    {
        title: "VV Ultimatum Release Date",
        label: "Official / Watchlist",
        body: "Release, access, and Roblox update status with exact checked dates.",
        href: "/vv-ultimatum/release-date",
        icon: CalendarClock,
        image: VV_ULTIMATUM_ROBLOX.thumbnailUrl,
        imageAlt: "VV Ultimatum official Roblox thumbnail",
        objectPosition: "center 42%",
        overlay: "from-blue-950/20 via-background/30 to-background/85",
    },
    {
        title: "Official Roblox Link",
        label: "Roblox API",
        body: "The verified game page, universe id, root place id, creator group, and public stats.",
        href: "/vv-ultimatum/trello-discord",
        icon: Gamepad2,
        image: VV_ULTIMATUM_ROBLOX.iconUrl,
        imageAlt: "VV Ultimatum official Roblox icon",
        objectPosition: "center",
        overlay: "from-sky-950/10 via-background/20 to-background/80",
    },
    {
        title: "Trello & Discord",
        label: "Verification needed",
        body: "A source-labeled area for confirmed official links and community reports.",
        href: "/vv-ultimatum/trello-discord",
        icon: Radio,
        image: VV_ULTIMATUM_PLACE_IMAGES.innerWorld,
        imageAlt: "VV Ultimatum Inner World Roblox place icon",
        objectPosition: "center",
        overlay: "from-violet-950/20 via-background/40 to-background/85",
    },
    {
        title: "VV Ultimatum Codes",
        label: "Code watch",
        body: "Active and expired codes should stay separate from unverified code reports.",
        href: "/vv-ultimatum/codes",
        icon: Gift,
        image: VV_ULTIMATUM_PLACE_IMAGES.wandenreich,
        imageAlt: "VV Ultimatum Wandenreich Roblox place icon",
        objectPosition: "center",
        overlay: "from-yellow-950/20 via-background/35 to-background/85",
    },
    {
        title: "Beginner Guide",
        label: "Start here",
        body: "What new players should check first before choosing routes, races, or abilities.",
        href: "/vv-ultimatum/beginner-guide",
        icon: BookOpen,
        image: VV_ULTIMATUM_PLACE_IMAGES.valleyOfScreams,
        imageAlt: "VV Ultimatum Valley of Screams Roblox place icon",
        objectPosition: "center",
        overlay: "from-emerald-950/15 via-background/35 to-background/85",
    },
    {
        title: "Skills & Abilities",
        label: "Watchlist",
        body: "The official description mentions 130+ skills and abilities; detailed entries need in-game checks.",
        href: "#entity-watchlist",
        icon: Zap,
        image: VV_ULTIMATUM_PLACE_IMAGES.huecoMundo,
        imageAlt: "VV Ultimatum Hueco Mundo Roblox place icon",
        objectPosition: "center",
        overlay: "from-indigo-950/25 via-background/30 to-background/85",
    },
    {
        title: "Factions & Races",
        label: "Watchlist",
        body: "A future category for faction choices, race routing, and progression notes.",
        href: "#entity-watchlist",
        icon: Users,
        image: VV_ULTIMATUM_PLACE_IMAGES.soulSociety,
        imageAlt: "VV Ultimatum Soul Society Roblox place icon",
        objectPosition: "center",
        overlay: "from-cyan-950/20 via-background/35 to-background/85",
    },
    {
        title: "Resurrection",
        label: "Search demand",
        body: "A high-interest topic that should become a guide only after mechanics are verified.",
        href: "#entity-watchlist",
        icon: Sparkles,
        image: VV_ULTIMATUM_PLACE_IMAGES.tournament,
        imageAlt: "VV Ultimatum Tournament Roblox place icon",
        objectPosition: "center",
        overlay: "from-purple-950/25 via-background/35 to-background/85",
    },
    {
        title: "Broken Medallion",
        label: "Item watch",
        body: "Track item obtainment, use cases, and drop claims with source labels.",
        href: "#entity-watchlist",
        icon: BadgeCheck,
        image: VV_ULTIMATUM_PLACE_IMAGES.fortAdams,
        imageAlt: "VV Ultimatum Fort Adams Roblox place icon",
        objectPosition: "center",
        overlay: "from-slate-950/15 via-background/35 to-background/85",
    },
] as const;

const entityWatchlist = [
    { name: "Races / factions", type: "Category", source: "Watchlist" },
    { name: "Skills / abilities", type: "Database", source: "Roblox description + in-game needed" },
    { name: "Items", type: "Category", source: "Community reports need labels" },
    { name: "Locations", type: "Map", source: "In-game verification needed" },
    { name: "Resurrection", type: "Guide candidate", source: "Search demand" },
    { name: "Quincy weapon", type: "Best X candidate", source: "Testing needed" },
    { name: "Human World", type: "Location candidate", source: "Watchlist" },
    { name: "Arrancar", type: "Faction candidate", source: "Watchlist" },
] as const;

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

function guideUrl(href: string) {
    if (href.startsWith("#")) {
        return `${SITE_URL}/vv-ultimatum${href}`;
    }

    return `${SITE_URL}${href}`;
}

export default async function VvUltimatumPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "VV Ultimatum Wiki", item: `${SITE_URL}/vv-ultimatum` },
        ],
    };

    const itemListSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "VV Ultimatum guide hub",
        itemListElement: guideCards.map((card, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: card.title,
            url: guideUrl(card.href),
        })),
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: vvFaq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
    };

    return (
        <div className="w-full">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

            <div className="container mx-auto max-w-6xl px-4 py-8">
                <nav className="mb-6 flex items-center gap-2 text-sm text-muted" aria-label="Breadcrumb">
                    <Link href="/" className="hover:text-white transition-colors">Home</Link>
                    <ArrowRight className="h-4 w-4" />
                    <span className="text-white" aria-current="page">VV Ultimatum</span>
                </nav>

                <section className="relative -mx-4 overflow-hidden border-y border-white/10 bg-surface md:mx-0 md:rounded-2xl md:border">
                    <Image
                        src={VV_ULTIMATUM_ROBLOX.thumbnailUrl}
                        alt="VV Ultimatum Roblox thumbnail"
                        fill
                        priority
                        sizes="(min-width: 768px) 1152px, 100vw"
                        className="absolute inset-0 h-full w-full object-cover opacity-35"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-background/55 via-background/80 to-background" />
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:56px_56px] opacity-35" />

                    <div className="relative px-4 py-16 md:px-10 md:py-20 lg:py-24">
                        <div className="max-w-3xl">
                            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-300 backdrop-blur">
                                <ShieldCheck className="h-3.5 w-3.5" />
                                Source checked {VV_ULTIMATUM_LAST_CHECKED}
                            </div>

                            <h1 className="text-4xl font-heading font-extrabold tracking-tight text-white text-balance md:text-6xl">
                                VV Ultimatum Wiki
                            </h1>
                            <p className="mt-5 max-w-2xl text-xl font-semibold text-white/90 text-balance">
                                Release status, official Roblox data, codes, Trello and Discord source checks, and beginner guide routing.
                            </p>
                            <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
                                This hub follows the same source-first approach as Bizarre Lineage: official Roblox facts, community reports, and site-maintained watchlist notes are separated before deeper guides are published.
                            </p>

                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                <a
                                    href={VV_ULTIMATUM_ROBLOX.robloxUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-accent-blue to-accent-indigo px-5 py-3 text-sm font-bold text-white shadow-[0_0_24px_rgba(59,130,246,0.28)] transition-all hover:shadow-[0_0_30px_rgba(99,102,241,0.38)]"
                                >
                                    Open Roblox Page
                                    <ExternalLink className="h-4 w-4" />
                                </a>
                                <a
                                    href="#release-status"
                                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-white backdrop-blur transition-all hover:border-emerald-400/50 hover:bg-emerald-400/10"
                                >
                                    Check Release Status
                                    <ArrowRight className="h-4 w-4" />
                                </a>
                                <a
                                    href="#official-links"
                                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-white backdrop-blur transition-all hover:border-yellow-400/50 hover:bg-yellow-400/10"
                                >
                                    Trello & Discord
                                    <ArrowRight className="h-4 w-4" />
                                </a>
                            </div>

                            <div className="mt-8 flex flex-wrap gap-3">
                                {heroStats.map((stat) => (
                                    <div key={stat.label} className="rounded-lg border border-white/10 bg-background/55 px-3 py-2 backdrop-blur">
                                        <div className="text-sm font-bold text-white">{stat.value}</div>
                                        <div className="mt-0.5 text-[11px] uppercase tracking-wide text-muted">{stat.label} - {stat.source}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="grid grid-cols-1 gap-4 py-10 md:grid-cols-2">
                    {intentCards.map((card) => {
                        const Icon = card.icon;
                        return (
                            <a
                                key={card.title}
                                href={card.href}
                                className="group flex gap-4 rounded-xl border border-border bg-surface/80 p-5 transition-all hover:-translate-y-0.5 hover:border-accent-blue/50 hover:bg-white/[0.04] hover:shadow-[0_12px_26px_rgba(0,0,0,0.28)]"
                            >
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-accent-blue/20 bg-accent-blue/10 text-accent-blue">
                                    <Icon className="h-5 w-5" />
                                </div>
                                <div>
                                    <div className="mb-2 inline-flex rounded-full border border-white/10 bg-background/60 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-muted">
                                        {card.label}
                                    </div>
                                    <h2 className="text-lg font-bold text-white group-hover:text-accent-blue transition-colors">{card.title}</h2>
                                    <p className="mt-2 text-sm leading-6 text-muted">{card.body}</p>
                                </div>
                            </a>
                        );
                    })}
                </section>

                <section id="release-status" className="scroll-mt-24 py-8">
                    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="text-sm font-bold uppercase tracking-wide text-emerald-300">Latest Update Tracker</p>
                            <h2 className="mt-2 text-3xl font-heading font-extrabold text-white">VV Ultimatum status snapshot</h2>
                        </div>
                        <span className="text-sm text-muted">Last checked: {VV_ULTIMATUM_LAST_CHECKED}</span>
                    </div>

                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.4fr_0.8fr]">
                        <div className="rounded-xl border border-border bg-surface p-6">
                            <div className="flex flex-col gap-5 md:flex-row">
                                <Image
                                    src={VV_ULTIMATUM_ROBLOX.iconUrl}
                                    alt="VV Ultimatum Roblox icon"
                                    width={112}
                                    height={112}
                                    className="h-28 w-28 shrink-0 rounded-xl border border-white/10 object-cover"
                                />
                                <div className="flex-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="rounded-full border border-green-400/25 bg-green-400/10 px-2.5 py-1 text-xs font-bold text-green-300">Official Roblox page live</span>
                                        <span className="rounded-full border border-blue-400/25 bg-blue-400/10 px-2.5 py-1 text-xs font-bold text-blue-300">Roblox API checked</span>
                                    </div>
                                    <h3 className="mt-4 text-2xl font-bold text-white">{VV_ULTIMATUM_ROBLOX.name}</h3>
                                    <p className="mt-3 text-sm leading-6 text-muted">
                                        The public Roblox experience is owned by {VV_ULTIMATUM_ROBLOX.creatorName}. We use Roblox data for the game name, creator group, universe id, root place id, update time, active player count, visits, favorites, and max player count.
                                    </p>
                                    <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
                                        <StatusMetric label="Universe ID" value={String(VV_ULTIMATUM_ROBLOX.universeId)} />
                                        <StatusMetric label="Root Place" value={String(VV_ULTIMATUM_ROBLOX.rootPlaceId)} />
                                        <StatusMetric label="Favorites" value={formatNumber(VV_ULTIMATUM_ROBLOX.favorites)} />
                                        <StatusMetric label="Max players" value={String(VV_ULTIMATUM_ROBLOX.maxPlayers)} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <aside className="rounded-xl border border-border bg-surface p-6">
                            <h3 className="flex items-center gap-2 text-lg font-bold text-white">
                                <ListChecks className="h-5 w-5 text-emerald-300" />
                                Current data
                            </h3>
                            <dl className="mt-5 space-y-4 text-sm">
                                <div>
                                    <dt className="text-muted">Roblox updated</dt>
                                    <dd className="mt-1 font-medium text-white">{formatIsoDate(VV_ULTIMATUM_ROBLOX.updatedAt)}</dd>
                                </div>
                                <div>
                                    <dt className="text-muted">Creator group</dt>
                                    <dd className="mt-1 font-medium text-white">{VV_ULTIMATUM_ROBLOX.creatorName} ({VV_ULTIMATUM_ROBLOX.creatorGroupId})</dd>
                                </div>
                                <div>
                                    <dt className="text-muted">Page role</dt>
                                    <dd className="mt-1 font-medium text-white">Source-checked VV Ultimatum hub</dd>
                                </div>
                            </dl>
                        </aside>
                    </div>
                </section>

                <section id="official-links" className="scroll-mt-24 py-8">
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.9fr_1.1fr]">
                        <div>
                            <p className="text-sm font-bold uppercase tracking-wide text-accent-blue">Community & Sources</p>
                            <h2 className="mt-2 text-3xl font-heading font-extrabold text-white">Official links before community mirrors</h2>
                            <p className="mt-3 text-muted leading-7">
                                The useful NTE pattern is source visibility. VV Ultimatum needs the same treatment because players search Trello, Discord, Roblox link, release date, and codes in the same session.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 gap-3">
                            <a
                                href={VV_ULTIMATUM_ROBLOX.robloxUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="group rounded-xl border border-border bg-surface p-5 transition-all hover:border-accent-blue/50 hover:bg-white/[0.04]"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <div className="text-xs font-bold uppercase tracking-wide text-green-300">Official</div>
                                        <h3 className="mt-1 text-lg font-bold text-white group-hover:text-accent-blue transition-colors">Roblox game page</h3>
                                        <p className="mt-2 text-sm leading-6 text-muted">Verified source for title, creator, description, universe data, and public game stats.</p>
                                    </div>
                                    <ExternalLink className="h-5 w-5 shrink-0 text-muted group-hover:text-accent-blue" />
                                </div>
                            </a>
                            <SourceLink
                                href={VV_ULTIMATUM_LINKS.discord.url}
                                title="Discord server"
                                label={VV_ULTIMATUM_LINKS.discord.status}
                                body="Invite API resolves vvgame to a VV: ULTIMATUM server. Listed as reported official until Roblox social-link verification is available."
                            />
                            <SourceLink
                                href={VV_ULTIMATUM_LINKS.trello.url}
                                title="Trello info board"
                                label={VV_ULTIMATUM_LINKS.trello.status}
                                body="Public Trello board found, but treated as community maintained rather than official developer-owned."
                            />
                        </div>
                    </div>
                </section>

                <section id="codes" className="scroll-mt-24 py-8">
                    <div className="rounded-xl border border-yellow-400/20 bg-yellow-400/5 p-6">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div>
                                <p className="text-sm font-bold uppercase tracking-wide text-yellow-300">Codes Summary</p>
                                <h2 className="mt-2 text-2xl font-heading font-extrabold text-white">VV Ultimatum codes need a separate tracker</h2>
                                <p className="mt-3 max-w-3xl text-sm leading-6 text-muted">
                                    The hub should mention codes, but the full codes page should separate active codes, expired codes, rewards, redeem steps, source labels, official sources, community reports, and last checked dates.
                                </p>
                            </div>
                            <div className="rounded-lg border border-yellow-400/20 bg-background/60 px-4 py-3 text-sm font-bold text-yellow-200">
                                No mixed code list
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-10">
                    <div className="mb-6">
                        <p className="text-sm font-bold uppercase tracking-wide text-accent-indigo">Top Wiki Pages</p>
                        <h2 className="mt-2 text-3xl font-heading font-extrabold text-white">Most useful VV Ultimatum guide entries</h2>
                        <p className="mt-3 max-w-3xl text-muted leading-7">
                            These cards mirror the NTE hub pattern, but point to source-backed sections until each topic has enough data for its own page.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {guideCards.map((card) => {
                            const Icon = card.icon;
                            return (
                                <a
                                    key={card.title}
                                    href={card.href}
                                    className="group overflow-hidden rounded-xl border border-border bg-surface transition-all hover:-translate-y-0.5 hover:border-accent-indigo/60 hover:bg-white/[0.04] hover:shadow-[0_12px_26px_rgba(0,0,0,0.28)]"
                                >
                                    <div className="relative aspect-video overflow-hidden border-b border-white/5 bg-background">
                                        <Image
                                            src={card.image}
                                            alt={card.imageAlt}
                                            fill
                                            sizes="(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw"
                                            className="object-cover opacity-80 transition-transform duration-500 group-hover:scale-105"
                                            style={{ objectPosition: card.objectPosition }}
                                        />
                                        <div className={`absolute inset-0 bg-gradient-to-b ${card.overlay}`} />
                                        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:36px_36px] opacity-45" />
                                        <div className="absolute left-4 top-4 rounded bg-black/40 px-2 py-1 text-xs text-white backdrop-blur">{card.label}</div>
                                        <div className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-black/35 text-white shadow-lg backdrop-blur">
                                            <Icon className="h-5 w-5 transition-transform duration-500 group-hover:scale-110" />
                                        </div>
                                    </div>
                                    <div className="p-5">
                                        <h3 className="text-lg font-bold text-white group-hover:text-accent-blue transition-colors">{card.title}</h3>
                                        <p className="mt-3 min-h-16 text-sm leading-6 text-muted">{card.body}</p>
                                        <div className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-accent-blue">
                                            Open section
                                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </div>
                                    </div>
                                </a>
                            );
                        })}
                    </div>
                </section>

                <section id="entity-watchlist" className="scroll-mt-24 py-10">
                    <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                        <div>
                            <p className="text-sm font-bold uppercase tracking-wide text-green-300">Browse by Category</p>
                            <h2 className="mt-2 text-3xl font-heading font-extrabold text-white">VV Ultimatum entity watchlist</h2>
                        </div>
                        <p className="max-w-xl text-sm leading-6 text-muted">
                            These are guide candidates, not final facts. Each should get its own page only after source coverage improves.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {entityWatchlist.map((item) => (
                            <div key={item.name} className="rounded-xl border border-border bg-surface p-4 transition-all hover:-translate-y-0.5 hover:border-green-400/40 hover:bg-white/[0.04]">
                                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-green-400/20 bg-green-400/10 text-green-300">
                                    <Search className="h-5 w-5" />
                                </div>
                                <h3 className="font-bold text-white">{item.name}</h3>
                                <p className="mt-1 text-sm text-muted">{item.type}</p>
                                <p className="mt-4 text-xs font-medium text-green-200/80">{item.source}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section id="beginner-guide" className="scroll-mt-24 grid grid-cols-1 gap-8 py-10 lg:grid-cols-[1fr_360px]">
                    <article className="space-y-8 text-muted">
                        <div>
                            <h2 className="text-3xl font-heading font-extrabold text-white">What is the VV Ultimatum wiki for?</h2>
                            <p className="mt-4 leading-7">
                                VV Ultimatum has strong search demand before the data ecosystem is fully stable. This page gives players a trustworthy starting point: check the official Roblox page, understand the current access status, and avoid treating community rumors as official facts.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-heading font-bold text-white">Best pages for new players</h2>
                            <ul className="mt-4 space-y-3">
                                {vvOfficialDescriptionSummary.map((item) => (
                                    <li key={item} className="flex gap-3 leading-7">
                                        <Swords className="mt-1 h-5 w-5 shrink-0 text-accent-blue" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-2xl font-heading font-bold text-white">How this page tracks accuracy</h2>
                            <p className="mt-4 leading-7">
                                Official facts, Roblox API numbers, community feedback, and site-maintained guide judgments are labeled separately. That keeps release status, codes, tier claims, and item rumors from blending into one unreliable list.
                            </p>
                        </div>
                    </article>

                    <aside className="space-y-4">
                        <SidebarCard title="Source Policy" icon={ShieldCheck}>
                            <div className="space-y-3">
                                {vvSourcePolicy.map((item) => (
                                    <div key={item.label}>
                                        <div className="text-sm font-bold text-white">{item.label}</div>
                                        <p className="mt-1 text-xs leading-5 text-muted">{item.body}</p>
                                    </div>
                                ))}
                            </div>
                        </SidebarCard>

                        <SidebarCard title="Update SOP" icon={ListChecks}>
                            <ul className="space-y-2 text-sm leading-6 text-muted">
                                <li>Re-check Roblox page and API data.</li>
                                <li>Review code reports before publishing them.</li>
                                <li>Move watchlist topics into pages only after sources are stable.</li>
                                <li>Update internal links when new guide pages go live.</li>
                            </ul>
                        </SidebarCard>
                    </aside>
                </section>

                <section className="py-10">
                    <div className="mx-auto max-w-3xl">
                        <div className="mb-6 flex items-center gap-3">
                            <CircleHelp className="h-8 w-8 text-accent-blue" />
                            <h2 className="text-3xl font-heading font-extrabold text-white">VV Ultimatum FAQ</h2>
                        </div>
                        <div className="space-y-4">
                            {vvFaq.map((item) => (
                                <details key={item.question} className="group rounded-xl border border-border bg-surface">
                                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5">
                                        <span className="font-bold text-white">{item.question}</span>
                                        <ChevronDown className="h-5 w-5 shrink-0 text-muted transition-transform group-open:rotate-180" />
                                    </summary>
                                    <div className="px-5 pb-5 text-sm leading-6 text-muted">{item.answer}</div>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

function StatusMetric({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-lg border border-white/10 bg-background/60 p-3">
            <div className="text-sm font-bold text-white">{value}</div>
            <div className="mt-1 text-[11px] uppercase tracking-wide text-muted">{label}</div>
        </div>
    );
}

function SourceLink({ href, title, label, body }: { href: string; title: string; label: string; body: string }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="group rounded-xl border border-border bg-surface p-5 transition-all hover:border-accent-blue/50 hover:bg-white/[0.04]"
        >
            <div className="flex items-start justify-between gap-4">
                <div>
                    <div className="text-xs font-bold uppercase tracking-wide text-yellow-300">{label}</div>
                    <h3 className="mt-1 text-lg font-bold text-white group-hover:text-accent-blue transition-colors">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted">{body}</p>
                </div>
                <ExternalLink className="h-5 w-5 shrink-0 text-muted group-hover:text-accent-blue" />
            </div>
        </a>
    );
}

function SidebarCard({
    title,
    icon: Icon,
    children,
}: {
    title: string;
    icon: typeof ShieldCheck;
    children: React.ReactNode;
}) {
    return (
        <div className="rounded-xl border border-border bg-surface p-5">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-white">
                <Icon className="h-5 w-5 text-accent-blue" />
                {title}
            </h3>
            {children}
        </div>
    );
}
