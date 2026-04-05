import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Clock, Star, Skull, Swords, Flame } from "lucide-react";
import { withCanonical, SITE_URL } from "@/lib/metadata";

export const metadata: Metadata = withCanonical({
    title: "Bizarre Lineage World Events — Spawn Times, Rewards & Guide",
    description: "Complete guide to all Bizarre Lineage world events: Meteor Shower, World Boss DIO, Stand Rush PvP, and Raid Portals. Spawn timers, rewards, and strategies.",
}, "/world-events");

const WORLD_EVENTS = [
    {
        name: "Meteor Shower",
        icon: <Star className="h-6 w-6 text-yellow-400" />,
        spawnTime: "Every 60-90 minutes",
        duration: "5 minutes",
        description: "Meteors rain down across the map, dropping Stand Arrows, Lucky Arrows, and Cash. Players race to collect as many drops as possible before the event ends.",
        rewards: ["Stand Arrows", "Lucky Arrows (rare)", "Cash drops (500-2,000)", "Rare Chests"],
        strategy: "Spread out and avoid crowded areas. Meteors land randomly, so players who cover more ground collect more items. Use high-mobility Stands like Made in Heaven to cover distance quickly.",
        difficulty: "Easy",
    },
    {
        name: "World Boss DIO",
        icon: <Skull className="h-6 w-6 text-red-400" />,
        spawnTime: "Every 2-3 hours",
        duration: "Until defeated or 10 minutes",
        description: "A server-wide boss fight against DIO. All players can participate. DIO spawns at a fixed location and must be defeated cooperatively. Rewards scale based on damage contribution.",
        rewards: ["DIO Tokens", "Legendary Chests", "Stand Arrows", "Exclusive accessories (rare)"],
        strategy: "Stack damage dealers. Whitesnake and The World are top picks. Coordinate Time Stops to maximize damage windows. Avoid DIO's Road Roller — it one-shots most players.",
        difficulty: "Hard",
    },
    {
        name: "Stand Rush",
        icon: <Swords className="h-6 w-6 text-accent-blue" />,
        spawnTime: "Every 45-60 minutes",
        duration: "3 minutes",
        description: "A server-wide free-for-all PvP event. Players fight each other in a designated arena zone. The top 3 players by kills receive bonus rewards.",
        rewards: ["PvP Tokens", "Cash (1,000-5,000)", "Stat Point Essence", "Stand Stat Essence (top 3 only)"],
        strategy: "Aggressive builds shine here. King Crimson with Boxing is a top pick for quick eliminations. Avoid grouping up — third-partying is common. Focus on getting finishing blows for kill credit.",
        difficulty: "Medium",
    },
    {
        name: "Raid Portal",
        icon: <Flame className="h-6 w-6 text-orange-400" />,
        spawnTime: "Every 30-45 minutes",
        duration: "2 minutes (portal open time)",
        description: "A portal opens at a random Bus Stop, giving free entry to a random raid without needing to travel to the raid NPC. The portal stays open briefly, so act fast.",
        rewards: ["Same as normal raids", "Bonus tokens for portal entry (+5)"],
        strategy: "Keep an eye on the server announcement. The portal closes quickly, so be ready to jump in. The raid itself is identical to the normal version, just with bonus token rewards.",
        difficulty: "Varies",
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
                World Events are random, server-wide occurrences in Bizarre Lineage that drop some of the best loot in the game. They spawn on a timer and are announced to all players in the server.
            </p>

            {/* Event Timer Overview */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">Event Spawn Timers</h2>
                <div className="bg-surface border border-border rounded-xl overflow-hidden">
                    <div className="grid grid-cols-3 gap-px bg-border text-sm font-bold text-muted">
                        <div className="bg-surface p-3">Event</div>
                        <div className="bg-surface p-3">Spawn Interval</div>
                        <div className="bg-surface p-3">Duration</div>
                    </div>
                    {WORLD_EVENTS.map((event) => (
                        <div key={event.name} className="grid grid-cols-3 gap-px bg-border text-sm">
                            <div className="bg-surface p-3 text-white font-medium flex items-center gap-2">
                                {event.icon} {event.name}
                            </div>
                            <div className="bg-surface p-3 text-muted flex items-center gap-1">
                                <Clock className="h-3 w-3" /> {event.spawnTime}
                            </div>
                            <div className="bg-surface p-3 text-muted">{event.duration}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Detailed Event Cards */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-6">Event Details & Strategies</h2>
                <div className="space-y-6">
                    {WORLD_EVENTS.map((event) => (
                        <div key={event.name} className="bg-surface border border-border rounded-xl p-6">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-xl font-bold text-white flex items-center gap-3">
                                    {event.icon} {event.name}
                                </h3>
                                <span className={`text-xs font-bold px-2 py-1 rounded-full ${event.difficulty === 'Hard' ? 'bg-red-500/20 text-red-400' : event.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' : event.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-muted'}`}>
                                    {event.difficulty}
                                </span>
                            </div>
                            <p className="text-sm text-muted mb-4">{event.description}</p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <h4 className="text-sm font-bold text-green-400 uppercase tracking-wide mb-2">Rewards</h4>
                                    <ul className="text-sm text-muted space-y-1">
                                        {event.rewards.map((r) => (
                                            <li key={r} className="flex items-center gap-2">
                                                <span className="text-green-400">+</span> {r}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-accent-blue uppercase tracking-wide mb-2">Strategy</h4>
                                    <p className="text-sm text-muted">{event.strategy}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* World Events Video Guide */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">World Events Video Guide</h2>
                <div className="bg-surface border border-border rounded-xl overflow-hidden aspect-video">
                    <iframe
                        width="100%"
                        height="100%"
                        src="https://www.youtube.com/embed/CE95cIZRrnI"
                        title="How World Events Work - Bizarre Lineage"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        loading="lazy"
                        className="w-full h-full"
                    />
                </div>
            </section>

            {/* Tips */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">General World Event Tips</h2>
                <div className="bg-surface border border-border rounded-xl p-6 space-y-3 text-sm text-muted">
                    <p><strong className="text-white">Stay in populated servers.</strong> World Events only trigger when the server has enough active players. Low-population servers may have longer spawn intervals.</p>
                    <p><strong className="text-white">Watch the chat.</strong> Server-wide announcements appear in chat when an event is about to start. Keep your chat visible so you don&apos;t miss them.</p>
                    <p><strong className="text-white">Keep a mobile Stand ready.</strong> Events spawn at random locations. Made in Heaven or any Stand with Stand Jump helps you reach events faster.</p>
                    <p><strong className="text-white">Don&apos;t AFK during events.</strong> Event rewards require active participation. AFK players do not receive loot from Meteor Showers or World Bosses.</p>
                </div>
            </section>

            {/* Related */}
            <section>
                <h2 className="text-2xl font-bold text-white mb-4">Related</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Link href="/raids" className="bg-surface border border-border rounded-lg p-4 hover:border-accent-blue/50 transition-colors group">
                        <div className="font-bold text-white group-hover:text-accent-blue transition-colors">Raid Guides</div>
                        <div className="text-xs text-muted mt-1">Detailed boss strategies and token shops</div>
                    </Link>
                    <Link href="/items" className="bg-surface border border-border rounded-lg p-4 hover:border-accent-blue/50 transition-colors group">
                        <div className="font-bold text-white group-hover:text-accent-blue transition-colors">All Items</div>
                        <div className="text-xs text-muted mt-1">Complete item database and how to obtain them</div>
                    </Link>
                </div>
            </section>
        </div>
    );
}
