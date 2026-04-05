import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Shield, Zap, Swords, MapPin, HelpCircle, ArrowRight } from 'lucide-react';
import raidsData from '@/data/raids.json';
import standsData from '@/data/stands.json';
import { withCanonical, SITE_URL } from '@/lib/metadata';

export async function generateStaticParams() {
    return raidsData.map((raid) => ({ slug: raid.id }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const raid = raidsData.find((r) => r.id === params.slug);
    if (!raid) return {};

    return withCanonical({
        title: `${raid.boss} Raid Guide — Strategy, Best Stands & SSS Rank | Bizarre Lineage`,
        description: `Don't waste attempts on the ${raid.boss} raid. Full strategy: ${raid.difficulty} difficulty, ${raid.bossHp} HP, best Stands, mechanics breakdown, and SSS grade tips.`,
    }, `/raids/${raid.id}`);
}

export default function RaidPage({ params }: { params: { slug: string } }) {
    const raid = raidsData.find((r) => r.id === params.slug);
    if (!raid) notFound();

    const recommendedStandObjs = raid.recommendedStands
        .map(id => standsData.find(s => s.id === id))
        .filter(Boolean);

    const otherRaids = raidsData.filter(r => r.id !== raid.id);

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
            { '@type': 'ListItem', position: 2, name: 'Raids', item: `${SITE_URL}/raids` },
            { '@type': 'ListItem', position: 3, name: raid.boss, item: `${SITE_URL}/raids/${raid.id}` },
        ],
    };

    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
            { '@type': 'Question', name: `What is the best Stand for the ${raid.boss} raid?`, acceptedAnswer: { '@type': 'Answer', text: `The recommended Stands are ${recommendedStandObjs.map(s => s!.name).join(', ')}. ${raid.strategy.split('.').slice(0, 2).join('.')}` } },
            { '@type': 'Question', name: `How much HP does ${raid.boss} have?`, acceptedAnswer: { '@type': 'Answer', text: `${raid.boss} has ${raid.bossHp.toLocaleString()} HP at level ${raid.bossLevel}. Difficulty: ${raid.difficulty}.` } },
            { '@type': 'Question', name: `How do I get SSS rank on the ${raid.boss} raid?`, acceptedAnswer: { '@type': 'Answer', text: 'SSS rank requires 0 deaths during the entire raid. Focus on learning boss patterns and dodging before maximizing damage.' } },
        ],
    };

    const difficultyColor = raid.difficulty === 'Easy' ? 'text-green-400 border-green-400/20 bg-green-400/10' : 'text-red-400 border-red-400/20 bg-red-400/10';

    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

            <nav className="flex items-center text-sm text-muted mb-8" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <ChevronRight className="h-4 w-4 mx-2" />
                <Link href="/raids" className="hover:text-white transition-colors">Raids</Link>
                <ChevronRight className="h-4 w-4 mx-2" />
                <span className="text-white" aria-current="page">{raid.boss}</span>
            </nav>

            {/* Hero */}
            <div className="mb-12 border-b border-white/5 pb-8">
                <div className="flex items-center gap-3 mb-3">
                    <span className={`px-3 py-1 text-xs font-mono font-bold uppercase rounded-full border ${difficultyColor}`}>
                        {raid.difficulty}
                    </span>
                    <span className="px-3 py-1 text-xs font-mono font-bold uppercase rounded-full bg-surface border border-white/10 text-muted">
                        Level {raid.bossLevel}
                    </span>
                    <span className="px-3 py-1 text-xs font-mono font-bold uppercase rounded-full bg-surface border border-white/10 text-muted">
                        {raid.bossHp.toLocaleString()} HP
                    </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-white tracking-tight">
                    {raid.boss} Raid Guide — Bizarre Lineage
                </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-10">

                    {/* Overview */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">Overview</h2>
                        <div className="bg-surface border border-border rounded-xl p-6 text-sm text-muted leading-relaxed">
                            <p>The {raid.boss} raid is a <strong className="text-white">{raid.difficulty}</strong> difficulty encounter with <strong className="text-white">{raid.bossHp.toLocaleString()} HP</strong> at level {raid.bossLevel}. You can earn up to <strong className="text-white">{raid.maxTokens} tokens</strong> per run. Find the raid NPC (<strong className="text-white">{raid.npc}</strong>) at <strong className="text-white">{raid.location}</strong>.</p>
                        </div>
                    </section>

                    {/* Boss Mechanics */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">Boss Mechanics</h2>
                        <div className="space-y-3">
                            {raid.mechanics.map((m, i) => (
                                <div key={i} className="bg-surface border border-border rounded-lg p-4 flex items-start gap-3">
                                    <span className="bg-red-500/10 text-red-400 border border-red-500/20 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</span>
                                    <p className="text-sm text-muted">{m}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Strategy */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">Strategy & Tips</h2>
                        <div className="bg-surface border border-border rounded-xl p-6 text-sm text-muted leading-relaxed">
                            <p>{raid.strategy}</p>
                        </div>
                    </section>

                    {/* Recommended Stands */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">Best Stands for {raid.boss}</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {recommendedStandObjs.map(stand => (
                                <Link key={stand!.id} href={`/stands/${stand!.id}`} className="bg-surface border border-border rounded-lg p-4 hover:border-accent-blue/50 transition-colors group">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-bold text-white group-hover:text-accent-blue transition-colors">{stand!.name}</span>
                                        <span className="text-xs text-muted">{stand!.tier.overall} Tier</span>
                                    </div>
                                    <div className="flex gap-4 text-xs text-muted">
                                        <span>DMG: {stand!.scores.damage}/10</span>
                                        <span>PvE: {stand!.tier.pve}</span>
                                        <span>{stand!.rarity}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <p className="text-xs text-muted mt-3">
                            Want to test a build before raiding? <Link href={`/build-planner?stand=${raid.recommendedStands[0]}`} className="text-accent-blue hover:text-white transition-colors underline underline-offset-2">Open the recommended Stand in Build Planner</Link>
                        </p>
                    </section>

                    {/* Rewards */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">Rewards & Token Shop</h2>
                        <div className="bg-surface border border-border rounded-xl p-6">
                            <h3 className="text-sm font-bold text-muted uppercase tracking-wide mb-3">Shop Items</h3>
                            <div className="space-y-2">
                                {raid.shopItems.map(item => (
                                    <div key={item.name} className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                                        <span className="text-sm text-white">{item.name}</span>
                                        <div className="flex items-center gap-3 text-xs">
                                            <span className="text-muted">{item.rarity}</span>
                                            <span className="text-accent-blue font-mono font-bold">{item.cost} tokens</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* FAQ */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                            <HelpCircle className="h-5 w-5 text-accent-blue" /> FAQ
                        </h2>
                        <div className="space-y-3">
                            <details className="group bg-surface border border-border rounded-lg">
                                <summary className="cursor-pointer p-4 text-white font-medium flex items-center justify-between hover:bg-white/5 transition-colors rounded-lg">
                                    What is the best Stand for the {raid.boss} raid?
                                    <ChevronRight className="h-4 w-4 text-muted group-open:rotate-90 transition-transform shrink-0 ml-2" />
                                </summary>
                                <div className="px-4 pb-4 text-muted text-sm leading-relaxed">
                                    {recommendedStandObjs.map(s => s!.name).join(', ')} are recommended. {raid.strategy.split('.')[0]}.
                                </div>
                            </details>
                            <details className="group bg-surface border border-border rounded-lg">
                                <summary className="cursor-pointer p-4 text-white font-medium flex items-center justify-between hover:bg-white/5 transition-colors rounded-lg">
                                    Can I solo the {raid.boss} raid?
                                    <ChevronRight className="h-4 w-4 text-muted group-open:rotate-90 transition-transform shrink-0 ml-2" />
                                </summary>
                                <div className="px-4 pb-4 text-muted text-sm leading-relaxed">
                                    {raid.difficulty === 'Easy'
                                        ? `Yes, the ${raid.boss} raid is soloable with most Stands at level 50+. Focus on dodging and you can SSS it.`
                                        : `Soloing is possible but very difficult. You need a strong Stand with good sustain or mobility. Team play is recommended for SSS grade.`}
                                </div>
                            </details>
                        </div>
                    </section>

                    {/* Raid Guide Video */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">{raid.boss} Raid Video Guide</h2>
                        <div className="bg-surface border border-border rounded-xl overflow-hidden aspect-video">
                            <iframe
                                width="100%"
                                height="100%"
                                src={`https://www.youtube.com/embed/${raid.id === 'dio' ? 'PD6-_hViNmo' : 'dvKRUTiNZ5E'}`}
                                title={`${raid.boss} Raid Guide - Bizarre Lineage`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                                loading="lazy"
                                className="w-full h-full"
                            />
                        </div>
                    </section>

                    {/* Other Raids */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">Other Raids</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {otherRaids.map(r => (
                                <Link key={r.id} href={`/raids/${r.id}`} className="bg-surface border border-border rounded-lg p-4 hover:border-accent-blue/50 transition-colors group">
                                    <div className="font-bold text-white text-sm group-hover:text-accent-blue transition-colors">{r.boss}</div>
                                    <div className="text-xs text-muted mt-1">{r.difficulty} &middot; {r.bossHp.toLocaleString()} HP</div>
                                </Link>
                            ))}
                        </div>
                    </section>

                    {/* Bottom CTA */}
                    <section className="bg-gradient-to-r from-accent-blue/10 to-accent-indigo/10 border border-accent-blue/20 rounded-xl p-6 text-center">
                        <p className="text-white font-bold text-lg mb-2">Don&apos;t go in unprepared</p>
                        <p className="text-muted text-sm mb-4">Test your raid build in the Planner before spending tokens on failed attempts.</p>
                        <Link href={`/build-planner?stand=${raid.recommendedStands[0]}`} className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-gradient-to-r from-accent-blue to-accent-indigo rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all">
                            Open Raid Build in Planner <ArrowRight className="h-4 w-4" />
                        </Link>
                    </section>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <div className="bg-surface border border-border rounded-xl p-6 sticky top-24">
                        <h3 className="text-lg font-bold text-white mb-4">Raid Info</h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted flex items-center gap-1.5"><Swords className="h-4 w-4" /> Boss</span>
                                <span className="text-white font-medium">{raid.boss}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted flex items-center gap-1.5"><Shield className="h-4 w-4" /> HP</span>
                                <span className="text-white font-mono">{raid.bossHp.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted flex items-center gap-1.5"><Zap className="h-4 w-4" /> Level</span>
                                <span className="text-white font-mono">{raid.bossLevel}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted">Difficulty</span>
                                <span className={raid.difficulty === 'Easy' ? 'text-green-400' : 'text-red-400'}>{raid.difficulty}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted">Max Tokens</span>
                                <span className="text-white font-mono">{raid.maxTokens}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted flex items-center gap-1.5"><MapPin className="h-4 w-4" /> Location</span>
                                <span className="text-white text-right text-xs">{raid.location}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-surface border border-border rounded-xl p-6">
                        <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
                        <div className="space-y-2">
                            <Link href="/raids" className="flex items-center gap-2 text-sm text-muted hover:text-accent-blue transition-colors">
                                <ChevronRight className="h-3 w-3" /> All Raids
                            </Link>
                            <Link href="/tier-list" className="flex items-center gap-2 text-sm text-muted hover:text-accent-blue transition-colors">
                                <ChevronRight className="h-3 w-3" /> Tier List
                            </Link>
                            <Link href="/build-planner" className="flex items-center gap-2 text-sm text-muted hover:text-accent-blue transition-colors">
                                <ChevronRight className="h-3 w-3" /> Build Planner
                            </Link>
                            <Link href="/codes" className="flex items-center gap-2 text-sm text-muted hover:text-accent-blue transition-colors">
                                <ChevronRight className="h-3 w-3" /> Active Codes
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
