"use client";

import { useState, useMemo } from "react";
import { Target, Activity, ChevronRight, HelpCircle } from "lucide-react";
import { StandCard } from "@/components/StandCard";
import standsData from "@/data/stands.json";
import { Link } from "@/i18n/navigation";

function TierListInteractive() {
    const [activeFilter, setActiveFilter] = useState<"overall" | "pvp" | "pve">("overall");

    const tiers = useMemo(() => {
        const grouped = standsData.reduce((acc, stand) => {
            const tier = stand.tier[activeFilter] || 'Unknown';
            if (!acc[tier]) acc[tier] = [];
            acc[tier].push(stand);
            return acc;
        }, {} as Record<string, typeof standsData>);

        const order = ["S+", "S", "A", "B", "C", "D"];
        return Object.entries(grouped).sort(([a], [b]) => {
            return order.indexOf(a) - order.indexOf(b);
        });
    }, [activeFilter]);

    return (
        <>
            <div className="text-center mb-12">
                <div className="inline-flex bg-surface border border-border rounded-xl p-1 shadow-lg">
                    <button
                        onClick={() => setActiveFilter("overall")}
                        className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeFilter === "overall" ? 'bg-accent-blue text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'text-muted hover:text-white'}`}
                    >
                        Overall
                    </button>
                    <button
                        onClick={() => setActiveFilter("pvp")}
                        className={`px-6 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${activeFilter === "pvp" ? 'bg-accent-indigo text-white shadow-[0_0_15px_rgba(99,102,241,0.3)]' : 'text-muted hover:text-white'}`}
                    >
                        <Target className="h-4 w-4" /> PvP
                    </button>
                    <button
                        onClick={() => setActiveFilter("pve")}
                        className={`px-6 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${activeFilter === "pve" ? 'bg-green-600 text-white shadow-[0_0_15px_rgba(22,163,74,0.3)]' : 'text-muted hover:text-white'}`}
                    >
                        <Activity className="h-4 w-4" /> PvE
                    </button>
                </div>
            </div>

            <div className="space-y-12">
                {tiers.map(([tierName, stands]) => (
                    <div key={tierName} className="bg-surface/50 border border-border rounded-2xl overflow-hidden backdrop-blur-sm">
                        <div className="bg-white/5 border-b border-white/5 px-6 py-4 flex items-center gap-4">
                            <span className={`text-2xl font-heading font-black w-12 text-center rounded-xl py-2 ${tierName === 'S+' ? 'text-white bg-gradient-to-br from-purple-500 to-pink-500 shadow-[0_0_20px_rgba(168,85,247,0.4)]' :
                                tierName === 'S' ? 'text-white bg-gradient-to-br from-accent-blue to-accent-indigo shadow-[0_0_15px_rgba(59,130,246,0.3)]' :
                                    tierName === 'A' ? 'text-white bg-green-500/20 text-green-400' :
                                        'text-muted bg-white/5'
                                }`}>
                                {tierName}
                            </span>
                            <h2 className="text-xl font-bold text-white tracking-widest uppercase">Tier</h2>
                            <div className="ml-auto text-sm text-muted hidden sm:block">
                                {stands.length} Stands
                            </div>
                        </div>

                        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {stands.map(stand => (
                                <StandCard key={stand.id} stand={stand} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

// Zone 2 + Zone 3: SSR content for SEO
function TierListSEOContent() {
    const sPlus = standsData.filter(s => s.tier.overall === 'S+');
    const sStands = standsData.filter(s => s.tier.overall === 'S');

    return (
        <div className="mt-16 space-y-12">
            {/* How Tiers Work */}
            <section>
                <h2 className="text-2xl font-bold text-white mb-4">How the Bizarre Lineage Tier List Works</h2>
                <div className="bg-surface border border-border rounded-xl p-6 text-sm text-muted leading-relaxed space-y-3">
                    <p>This tier list ranks all {standsData.length} Stands in Bizarre Lineage across three categories: Overall, PvP, and PvE. Rankings are based on community testing and planner data — they are not official game balance values.</p>
                    <p>Each Stand is evaluated on 6 base stats: Damage, Combo, CC (crowd control), AoE (area of effect), Mobility, and Sustain. PvP rankings weight single-target burst and CC higher, while PvE rankings favor AoE and farming efficiency.</p>
                    <p><strong className="text-white">S+ Tier</strong> Stands dominate in their category and have few hard counters. <strong className="text-white">S Tier</strong> Stands are strong meta picks with specific matchup advantages. <strong className="text-white">A Tier</strong> and below are viable but require more skill or specific team compositions to compete.</p>
                </div>
            </section>

            {/* Current Meta Summary */}
            <section>
                <h2 className="text-2xl font-bold text-white mb-4">Current Meta (March 2026)</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-surface border border-border rounded-lg p-5">
                        <h3 className="text-sm font-bold text-purple-400 uppercase mb-3">S+ Tier Stands</h3>
                        <div className="space-y-2">
                            {sPlus.map(s => (
                                <Link key={s.id} href={`/stands/${s.id}`} className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors group">
                                    <span className="text-white text-sm group-hover:text-accent-blue">{s.name}</span>
                                    <span className="text-xs text-muted">{s.rarity} &middot; Part {s.part}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="bg-surface border border-border rounded-lg p-5">
                        <h3 className="text-sm font-bold text-accent-blue uppercase mb-3">S Tier Stands</h3>
                        <div className="space-y-2">
                            {sStands.map(s => (
                                <Link key={s.id} href={`/stands/${s.id}`} className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors group">
                                    <span className="text-white text-sm group-hover:text-accent-blue">{s.name}</span>
                                    <span className="text-xs text-muted">{s.rarity} &middot; Part {s.part}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-accent-blue" /> Tier List FAQ
                </h2>
                <div className="space-y-3">
                    {[
                        { q: "Is this tier list official?", a: "No. This tier list is maintained by the site community using planner data and gameplay testing. Official balance data is not published by the developer. Move names and Stand information are verified against the official Trello board." },
                        { q: "How often is the tier list updated?", a: "We review rankings after each significant game update or balance patch. The last verification was done against the official Trello board in March 2026." },
                        { q: "Why is my Stand ranked lower than I expected?", a: "Tier rankings reflect general performance across all skill levels and matchups. A skilled player can make any Stand work in PvP. The ranking considers average performance, not peak ceiling." },
                        { q: "What's the difference between PvP and PvE tiers?", a: "PvP tiers weight single-target damage, crowd control, and mobility. PvE tiers weight AoE damage and farming efficiency. A Stand can be S-tier in PvP but B-tier in PvE (like King Crimson)." },
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

            {/* Internal Links */}
            <section className="pb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Explore More</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <Link href="/build-planner" className="bg-surface border border-border rounded-lg p-3 text-sm text-white hover:border-accent-blue/50 transition-colors">Build Planner</Link>
                    <Link href="/stands" className="bg-surface border border-border rounded-lg p-3 text-sm text-white hover:border-accent-blue/50 transition-colors">All Stands</Link>
                    <Link href="/guides/best-builds" className="bg-surface border border-border rounded-lg p-3 text-sm text-white hover:border-accent-blue/50 transition-colors">Best Builds</Link>
                    <Link href="/codes" className="bg-surface border border-border rounded-lg p-3 text-sm text-white hover:border-accent-blue/50 transition-colors">Active Codes</Link>
                </div>
            </section>
        </div>
    );
}

// JSON-LD Schema
function TierListSchema() {
    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
            { '@type': 'Question', name: 'Is this tier list official?', acceptedAnswer: { '@type': 'Answer', text: 'No. This tier list is maintained by the site community using planner data and gameplay testing.' } },
            { '@type': 'Question', name: 'How often is the tier list updated?', acceptedAnswer: { '@type': 'Answer', text: 'We review rankings after each significant game update or balance patch.' } },
            { '@type': 'Question', name: 'What is the difference between PvP and PvE tiers?', acceptedAnswer: { '@type': 'Answer', text: 'PvP tiers weight single-target damage, crowd control, and mobility. PvE tiers weight AoE damage and farming efficiency.' } },
        ],
    };

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.bizarrelineage.com' },
            { '@type': 'ListItem', position: 2, name: 'Tier List', item: 'https://www.bizarrelineage.com/tier-list' },
        ],
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        </>
    );
}

export default function TierListPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-6xl">
            <TierListSchema />

            {/* Breadcrumb */}
            <nav className="flex items-center text-sm text-muted mb-8" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <ChevronRight className="h-4 w-4 mx-2" />
                <span className="text-white" aria-current="page">Tier List</span>
            </nav>

            <div className="relative w-full rounded-xl overflow-hidden mb-8">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/tier-list-preview.webp" alt="Bizarre Lineage Tier List" className="w-full h-48 object-cover opacity-40" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
                <div className="absolute bottom-4 left-6">
                    <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-white">Bizarre Lineage Tier List</h1>
                </div>
            </div>
            <div className="text-center mb-8">
                <p className="text-lg text-muted max-w-2xl mx-auto">
                    Community-maintained ranking data for all {standsData.length} Stands in Bizarre Lineage. Filter by Overall, PvP, or PvE performance. Updated for April 2026 meta.
                </p>
            </div>

            {/* Zone 1: Interactive Tier List */}
            <TierListInteractive />

            {/* Zone 2 + 3: SSR SEO Content */}
            <TierListSEOContent />
        </div>
    );
}
