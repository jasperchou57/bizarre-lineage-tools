import { Metadata } from "next";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ChevronRight, MapPin, ShoppingBag, HelpCircle, Info } from "lucide-react";
import { withCanonical, SITE_URL } from "@/lib/metadata";
import raidsData from "@/data/raids.json";

export const metadata: Metadata = withCanonical({
    title: "Bizarre Lineage Raids — All Raid Shops & Locations (Official Trello)",
    description: "All 4 Bizarre Lineage raid bosses (Avdol, Kira, Jotaro, DIO) with the verified Trello locations and complete raid-shop listings — token costs and stock for every item.",
}, "/raids");

export default function RaidsPage() {
    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
            { '@type': 'ListItem', position: 2, name: 'Raids', item: `${SITE_URL}/raids` },
        ],
    };

    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
            { '@type': 'Question', name: 'How many raids are in Bizarre Lineage?', acceptedAnswer: { '@type': 'Answer', text: 'There are 4 raid bosses listed on the official Trello: Muhammad Avdol, Yoshikage Kira (Bites the Dust Raid), Jotaro Kujo (Chumbo), and DIO. Each has a unique token shop.' } },
            { '@type': 'Question', name: 'What do raid tokens buy?', acceptedAnswer: { '@type': 'Answer', text: 'Each raid drops its own tokens. Tokens are spent in that raid\'s shop on accessories, traits, Stand Arrows, Lucky Arrows, Legendary Chests, and (for the DIO Raid) weapons like Shadow Axe and Stop Sign.' } },
            { '@type': 'Question', name: 'Where do I find the raid NPCs?', acceptedAnswer: { '@type': 'Answer', text: 'Avdol: Bus Stop 14 near the rocks. Kira: Bus Stop 1 around the Rengatei shop. Jotaro (Chumbo): Bus Stop 2 near the Gym. DIO: Bus Stop 18 near the Elder Vampire in the castle.' } },
        ],
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-5xl">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

            <nav className="flex items-center text-sm text-muted mb-8" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <ChevronRight className="h-4 w-4 mx-2" />
                <span className="text-white" aria-current="page">Raids</span>
            </nav>

            <div className="mb-12">
                <div className="relative w-full rounded-xl overflow-hidden mb-6">
                    <Image src="/images/pages/raids.png" alt="Bizarre Lineage Raids" width={800} height={450} className="w-full h-48 object-cover opacity-40" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
                    <div className="absolute bottom-4 left-6">
                        <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-white">Bizarre Lineage Raids</h1>
                    </div>
                </div>
                <p className="text-lg text-muted max-w-3xl">
                    Raids are an 8-player cooperative game mode. Completing a raid earns rewards and Raid Shop Tokens, which are spent in that raid&apos;s exclusive shop. There are 4 raids on the official Trello.
                </p>
            </div>

            <div className="bg-accent-blue/5 border border-accent-blue/20 rounded-xl p-4 mb-10 flex gap-3 text-sm text-muted">
                <Info className="h-5 w-5 text-accent-blue shrink-0 mt-0.5" />
                <div>
                    <p className="text-white font-medium mb-1">Verified against the official Trello</p>
                    <p>Boss HP, level, mechanics, and grading are <strong>not documented on the public Trello</strong>. This page lists only what the Trello confirms: locations, NPC names, and the full shop catalogue (with stock and approximate token cost).</p>
                </div>
            </div>

            <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">All 4 Raids</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {raidsData.map(raid => (
                        <Link key={raid.id} href={`/raids/${raid.id}`} className="bg-surface border border-border rounded-xl overflow-hidden hover:border-accent-blue/50 transition-colors group flex flex-col sm:flex-row">
                            {raid.imageUrl && (
                                <div className="relative w-full sm:w-40 shrink-0 aspect-[4/3] sm:aspect-auto sm:h-auto bg-background">
                                    <Image src={raid.imageUrl} alt={raid.boss} fill sizes="(max-width: 640px) 100vw, 160px" className="object-cover group-hover:scale-105 transition-transform duration-300" />
                                </div>
                            )}
                            <div className="p-5 flex-1">
                                <h3 className="text-xl font-bold text-white group-hover:text-accent-blue transition-colors mb-2">{raid.boss}</h3>
                                <div className="text-sm text-muted mb-2 flex items-start gap-1.5">
                                    <MapPin className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                                    <span>{raid.location}</span>
                                </div>
                                <div className="text-sm text-muted mb-3 flex items-center gap-1.5">
                                    <ShoppingBag className="h-3.5 w-3.5" />
                                    <span>{raid.shopItems.length} shop items</span>
                                </div>
                                <div className="flex items-center text-sm text-accent-blue group-hover:translate-x-1 transition-transform">
                                    View shop & details <ChevronRight className="h-4 w-4 ml-1" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-accent-blue" /> Raids FAQ
                </h2>
                <div className="space-y-3">
                    {[
                        { q: "How many raids are there?", a: "Four: Avdol, Kira (Bites the Dust), Jotaro (Chumbo), and DIO. Each has its own shop and token type." },
                        { q: "How many players per raid?", a: "Up to 8 players per raid (per the official Trello)." },
                        { q: "What can I buy with raid tokens?", a: "Each raid shop has a different mix of accessories, traits, Stand Arrows, Lucky Arrows, and Legendary Chests. The DIO Raid shop also sells the Shadow Axe and Stop Sign weapons." },
                        { q: "Are boss HP, level, and mechanics on the Trello?", a: "No — those details are not documented on the public official Trello. We do not list speculative numbers here." },
                    ].map(faq => (
                        <details key={faq.q} className="group bg-surface border border-border rounded-lg">
                            <summary className="cursor-pointer p-4 text-white font-medium flex items-center justify-between hover:bg-white/5 transition-colors rounded-lg">
                                {faq.q}
                                <ChevronRight className="h-4 w-4 text-muted group-open:rotate-90 transition-transform shrink-0 ml-2" />
                            </summary>
                            <div className="px-4 pb-4 text-muted text-sm leading-relaxed">{faq.a}</div>
                        </details>
                    ))}
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-white mb-4">Related</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <Link href="/perks" className="bg-surface border border-border rounded-lg p-3 text-sm text-white hover:border-accent-blue/50 transition-colors">Perks &amp; Traits</Link>
                    <Link href="/items" className="bg-surface border border-border rounded-lg p-3 text-sm text-white hover:border-accent-blue/50 transition-colors">Items</Link>
                    <Link href="/build-planner" className="bg-surface border border-border rounded-lg p-3 text-sm text-white hover:border-accent-blue/50 transition-colors">Build Planner</Link>
                    <Link href="/codes" className="bg-surface border border-border rounded-lg p-3 text-sm text-white hover:border-accent-blue/50 transition-colors">Active Codes</Link>
                </div>
            </section>
        </div>
    );
}
