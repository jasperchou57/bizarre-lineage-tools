import { Metadata } from "next";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ChevronRight, CheckCircle2, CircleHelp, Clock3, ExternalLink, ShieldAlert, Swords } from "lucide-react";
import { withCanonical, SITE_URL } from "@/lib/metadata";

export const metadata: Metadata = withCanonical({
    title: "Bizarre Lineage World Events (April 2026) — Official Trello Listing",
    description: "The latest official Bizarre Lineage World Events listing. The public Trello currently names Graveyard Uprising and Deathmatch, with world events spawning every 20 minutes.",
}, "/world-events");

const OFFICIAL_WORLD_EVENT_CARD = "https://trello.com/c/YwXD6ymL";

const WORLD_EVENTS = [
    {
        name: "Graveyard Uprising",
        mode: "PvE Survival",
        icon: <ShieldAlert className="h-6 w-6 text-green-400" />,
        imageUrl: "https://trello.com/1/cards/69a48a326523bfba0a21ed90/attachments/69b6bb2e0232a2fb049dad90/previews/69b6bb2e0232a2fb049db020/download/image.webp",
        description: "A survival mode where players fight waves of NPCs without dying, all within a strict time limit.",
    },
    {
        name: "Deathmatch",
        mode: "Team PvP",
        icon: <Swords className="h-6 w-6 text-accent-blue" />,
        imageUrl: "https://trello.com/1/cards/69a48a326523bfba0a21ed90/attachments/69b6bb54b9721be5b3edd4f2/previews/69b6bb55b9721be5b3edd53d/download/image.webp",
        description: "A team-based PvP mode where two squads face off, each player starting with only 2 lives. The goal is to eliminate the opposing team.",
    },
];

export default function WorldEventsPage() {
    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
            { '@type': 'ListItem', position: 2, name: 'World Events', item: `${SITE_URL}/world-events` },
        ],
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            <nav className="flex items-center gap-2 text-sm text-muted mb-8" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-white" aria-current="page">World Events</span>
            </nav>

            <div className="relative w-full rounded-xl overflow-hidden mb-8">
                <Image src="/images/pages/world-events.png" alt="Bizarre Lineage World Events" width={800} height={450} className="w-full h-48 object-cover opacity-40" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
                <div className="absolute bottom-4 left-6">
                    <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-white">Bizarre Lineage World Events</h1>
                </div>
            </div>
            <p className="text-lg text-muted mb-10 leading-relaxed">
                The public official Trello currently describes World Events as limited-time, server-wide activities that offer unique gameplay and rewards. That same card states that the World Event system spawns every 20 minutes.
            </p>

            <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">Current Official Snapshot</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-surface border border-border rounded-xl p-5">
                        <div className="text-xs uppercase tracking-wide text-muted mb-2">Spawn Cadence</div>
                        <div className="text-2xl font-bold text-white flex items-center gap-2">
                            <Clock3 className="h-5 w-5 text-accent-blue" /> Every 20 minutes
                        </div>
                    </div>
                    <div className="bg-surface border border-border rounded-xl p-5">
                        <div className="text-xs uppercase tracking-wide text-muted mb-2">Listed Modes</div>
                        <div className="text-2xl font-bold text-white">{WORLD_EVENTS.length}</div>
                    </div>
                    <div className="bg-surface border border-border rounded-xl p-5">
                        <div className="text-xs uppercase tracking-wide text-muted mb-2">Last Verified</div>
                        <div className="text-2xl font-bold text-white">April 18, 2026</div>
                    </div>
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-6">Events Currently Listed on the Official Trello</h2>
                <div className="space-y-6">
                    {WORLD_EVENTS.map((event) => (
                        <article key={event.name} className="bg-surface border border-border rounded-xl overflow-hidden">
                            <div className="relative aspect-[16/7] bg-background">
                                <Image
                                    src={event.imageUrl}
                                    alt={event.name}
                                    width={1280}
                                    height={560}
                                    className="w-full h-full object-cover opacity-80"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                                <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between gap-4">
                                    <div>
                                        <div className="flex items-center gap-2 text-white mb-2">
                                            {event.icon}
                                            <h3 className="text-2xl font-bold">{event.name}</h3>
                                        </div>
                                        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs font-medium text-white/80">
                                            {event.mode}
                                        </div>
                                    </div>
                                    <a
                                        href={OFFICIAL_WORLD_EVENT_CARD}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="shrink-0 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-black/30 px-4 py-2 text-sm font-medium text-white hover:border-accent-blue/50 hover:text-accent-blue transition-colors"
                                    >
                                        Official Card <ExternalLink className="h-4 w-4" />
                                    </a>
                                </div>
                            </div>
                            <div className="p-6">
                                <p className="text-sm text-muted leading-relaxed">{event.description}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">What the Official Card Confirms</h2>
                <div className="bg-surface border border-border rounded-xl p-6">
                    <ul className="space-y-3 text-sm text-muted">
                        <li className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
                            <span>World Events are limited-time, server-wide activities that offer unique gameplay and rewards.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
                            <span>The public Trello currently states that the World Event system spawns every 20 minutes.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
                            <span>Graveyard Uprising is described as a survival event where players fight waves of NPCs without dying inside a strict time limit.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
                            <span>Deathmatch is described as a team-based PvP mode where two squads fight with only 2 lives per player.</span>
                        </li>
                    </ul>
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">What the Official Card Does Not Specify</h2>
                <div className="bg-surface border border-border rounded-xl p-6">
                    <ul className="space-y-3 text-sm text-muted">
                        <li className="flex items-start gap-3">
                            <CircleHelp className="h-5 w-5 text-yellow-400 shrink-0 mt-0.5" />
                            <span>The card does not publish a reward table for either event.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <CircleHelp className="h-5 w-5 text-yellow-400 shrink-0 mt-0.5" />
                            <span>The card does not list map rotation, queue rules, or matchmaking thresholds beyond the short event descriptions above.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <CircleHelp className="h-5 w-5 text-yellow-400 shrink-0 mt-0.5" />
                            <span>The current public card only names these two event types, so older third-party guides may no longer reflect the latest official listing.</span>
                        </li>
                    </ul>
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">Official Sources</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <a
                        href="https://trello.com/b/wtzgwqIf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-surface border border-border rounded-xl p-5 hover:border-accent-blue/50 transition-colors group"
                    >
                        <div className="font-bold text-white group-hover:text-accent-blue transition-colors flex items-center gap-2">
                            Official Trello <ExternalLink className="h-4 w-4" />
                        </div>
                        <div className="text-xs text-muted mt-2">Primary source for the current World Events listing and cadence.</div>
                    </a>
                    <a
                        href="https://www.roblox.com/games/14890802310/Bizarre-Lineage"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-surface border border-border rounded-xl p-5 hover:border-accent-blue/50 transition-colors group"
                    >
                        <div className="font-bold text-white group-hover:text-accent-blue transition-colors flex items-center gap-2">
                            Roblox Game Page <ExternalLink className="h-4 w-4" />
                        </div>
                        <div className="text-xs text-muted mt-2">Use this alongside the Trello when checking whether a live server matches the latest public listing.</div>
                    </a>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-white mb-4">Related</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Link href="/items" className="bg-surface border border-border rounded-lg p-4 hover:border-accent-blue/50 transition-colors group">
                        <div className="font-bold text-white group-hover:text-accent-blue transition-colors">All Items</div>
                        <div className="text-xs text-muted mt-1">Cross-check Lucky Arrow and other item acquisition routes</div>
                    </Link>
                    <Link href="/trello" className="bg-surface border border-border rounded-lg p-4 hover:border-accent-blue/50 transition-colors group">
                        <div className="font-bold text-white group-hover:text-accent-blue transition-colors">Official Trello Guide</div>
                        <div className="text-xs text-muted mt-1">Open the board directly and compare raw official cards</div>
                    </Link>
                </div>
            </section>
        </div>
    );
}
