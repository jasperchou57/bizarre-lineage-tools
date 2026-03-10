import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Target, Shield, Sword, Navigation, Activity, ChevronRight } from 'lucide-react';
import standsData from '@/data/stands.json';

// Generate static routes for all stands
export async function generateStaticParams() {
    return standsData.map((stand) => ({
        slug: stand.id,
    }));
}

// Generate dynamic SEO metadata
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const stand = standsData.find((s) => s.id === params.slug);
    if (!stand) return {};

    return {
        title: `${stand.name} Build Guide — Moves, Rarity & Best Combos | Bizarre Lineage`,
        description: `Don't waste your Stand Arrow. Full ${stand.name} guide: rarity, moves, best PvP & PvE builds. Bizarre Lineage tools & data.`,
    };
}

export default function StandPage({ params }: { params: { slug: string } }) {
    const stand = standsData.find((s) => s.id === params.slug);

    if (!stand) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            {/* Breadcrumbs (SEO MUST-HAVE) */}
            <nav className="flex items-center text-sm text-muted mb-8" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <ChevronRight className="h-4 w-4 mx-2" />
                <Link href="/stands" className="hover:text-white transition-colors">Stands</Link>
                <ChevronRight className="h-4 w-4 mx-2" />
                <span className="text-white" aria-current="page">{stand.name}</span>
            </nav>

            {/* Hero Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-white/5 pb-8">
                <div>
                    <div className="flex items-center gap-3 mb-3">
                        <span className="px-3 py-1 text-xs font-mono font-bold uppercase rounded-full bg-accent-blue/10 text-accent-blue border border-accent-blue/20">
                            Rarity: {stand.rarity}
                        </span>
                        <span className="px-3 py-1 text-xs font-mono font-bold uppercase rounded-full bg-surface border border-white/10 text-muted">
                            Part {stand.part}
                        </span>
                        {stand.requiem && (
                            <span className="px-3 py-1 text-xs font-mono font-bold uppercase rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                                Requiem
                            </span>
                        )}
                    </div>
                    <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-white tracking-tight">
                        {stand.name} — Bizarre Lineage Build Guide
                    </h1>
                </div>
                <Link
                    href={`/build-planner?stand=${stand.id}`}
                    className="shrink-0 px-6 py-3 text-sm font-bold text-white bg-gradient-to-r from-accent-blue to-accent-indigo rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all flex items-center justify-center gap-2"
                >
                    Open in Planner <ChevronRight className="h-4 w-4" />
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content (Left 2/3) */}
                <div className="lg:col-span-2 space-y-10">

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                            Overview & Rarity
                        </h2>
                        <p className="text-muted leading-relaxed">
                            The public official Trello is used here for move names and obtainment notes. On this site, {stand.name} is grouped under the local <strong className="text-white">{stand.rarity}</strong> label, obtained primarily via <strong className="text-white">{stand.obtainMethod}</strong>, and currently placed at <strong className="text-accent-blue">{stand.tier.overall} Tier</strong> in the planner dataset.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">Moves & Abilities</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {stand.moves.map((move) => (
                                <div key={move.name} className="bg-surface border border-border rounded-lg p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="font-bold text-white">{move.name}</span>
                                        <span className="bg-white/5 border border-white/10 rounded px-2 text-xs font-mono text-muted">Key: {move.key}</span>
                                    </div>
                                    <div className="text-sm text-muted capitalize">Type: {move.type}</div>
                                    {move.effect && <div className="text-sm text-accent-indigo mt-1">{move.effect}</div>}
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">How to Get {stand.name} in Bizarre Lineage</h2>
                        <p className="text-muted leading-relaxed">
                            {stand.name} is obtained via <strong className="text-white">{stand.obtainMethod}</strong>.
                            {stand.rarity === 'Special' ? (
                                <> This is listed on the site as an evolution-only Stand. Follow the relevant official quest or evolution path instead of relying on a normal Arrow roll.</>
                            ) : (
                                <> The public Trello confirms the obtainment method, but it does not publish exact drop percentages on this page.</>
                            )}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">Best Builds for {stand.name}</h2>
                        <div className="bg-gradient-to-br from-surface to-background border border-border rounded-xl p-6">
                            <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                                <Sword className="h-5 w-5 text-accent-blue" /> Recommended PvP Setup
                            </h3>
                            <p className="text-muted mb-4">
                                Our local planner currently pairs {stand.name} with <strong className="text-white capitalize">{stand.recommendedStyles[0]}</strong> and <strong className="text-white capitalize">{stand.recommendedSubs[0]}</strong>. This is a site recommendation, not an official balance callout.
                            </p>
                            <div className="flex gap-4">
                                <Link href={`/build-planner?stand=${stand.id}&style=${stand.recommendedStyles[0]}&sub=${stand.recommendedSubs[0]}&mode=pvp`} className="text-sm font-bold text-accent-blue hover:text-white transition-colors border border-accent-blue/30 px-4 py-2 rounded-lg hover:bg-accent-blue/10">
                                    Load PvP Build
                                </Link>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">{stand.name} vs Similar Stands</h2>
                        <div className="bg-surface border border-border rounded-xl p-6">
                            <p className="text-muted mb-4">
                                These matchup notes come from the site&apos;s local dataset. {stand.name} is currently tagged here as strong into <strong className="text-green-400">{stand.counters.join(', ')}</strong> and weaker into <strong className="text-red-400">{stand.counteredBy.join(', ')}</strong>.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                {[...stand.counters, ...stand.counteredBy].map(id => {
                                    const related = standsData.find(s => s.id === id);
                                    if (!related) return null;
                                    return (
                                        <Link key={id} href={`/stands/${id}`} className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white hover:border-accent-blue/50 transition-colors">
                                            {related.name}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">Common Mistakes to Avoid</h2>
                        <ul className="space-y-3 text-muted">
                            <li className="flex items-start gap-2">
                                <span className="text-red-400 font-bold">&times;</span>
                                <span>Copying this page&apos;s recommended pairing without testing it. The local planner starts with <strong className="text-white capitalize">{stand.recommendedStyles[0]}</strong>, but your own matchups may call for something else.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-red-400 font-bold">&times;</span>
                                <span>Treating planner rankings as official patch notes. Use the public Trello for verified move and progression data.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-red-400 font-bold">&times;</span>
                                <span>Ignoring the matchup notes entirely. Even local planner suggestions work better when you test them against the matchups you see most often.</span>
                            </li>
                        </ul>
                    </section>

                </div>

                {/* Sidebar (Right 1/3) */}
                <div className="space-y-6">
                    <div className="bg-surface border border-border rounded-xl p-6 sticky top-24">
                        <h3 className="text-lg font-bold text-white mb-4">Base Scores</h3>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-muted flex items-center gap-1.5"><Sword className="h-4 w-4" /> Damage</span>
                                    <span className="text-white font-mono">{stand.scores.damage}/10</span>
                                </div>
                                <div className="w-full bg-background rounded-full h-1.5"><div className="bg-accent-blue h-1.5 rounded-full" style={{ width: `${stand.scores.damage * 10}%` }}></div></div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-muted flex items-center gap-1.5"><Activity className="h-4 w-4" /> Combo</span>
                                    <span className="text-white font-mono">{stand.scores.combo}/10</span>
                                </div>
                                <div className="w-full bg-background rounded-full h-1.5"><div className="bg-accent-blue h-1.5 rounded-full" style={{ width: `${stand.scores.combo * 10}%` }}></div></div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-muted flex items-center gap-1.5"><Target className="h-4 w-4" /> CC</span>
                                    <span className="text-white font-mono">{stand.scores.cc}/10</span>
                                </div>
                                <div className="w-full bg-background rounded-full h-1.5"><div className="bg-accent-indigo h-1.5 rounded-full" style={{ width: `${stand.scores.cc * 10}%` }}></div></div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-muted flex items-center gap-1.5"><Shield className="h-4 w-4" /> Sustain</span>
                                    <span className="text-white font-mono">{stand.scores.sustain}/10</span>
                                </div>
                                <div className="w-full bg-background rounded-full h-1.5"><div className="bg-accent-indigo h-1.5 rounded-full" style={{ width: `${stand.scores.sustain * 10}%` }}></div></div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-muted flex items-center gap-1.5"><Navigation className="h-4 w-4" /> Mobility</span>
                                    <span className="text-white font-mono">{stand.scores.mobility}/10</span>
                                </div>
                                <div className="w-full bg-background rounded-full h-1.5"><div className="bg-purple-500 h-1.5 rounded-full" style={{ width: `${stand.scores.mobility * 10}%` }}></div></div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-surface border border-border rounded-xl p-6">
                        <h3 className="text-lg font-bold text-white mb-4">Pros & Cons</h3>
                        <p className="text-sm text-muted mb-4">
                            These strengths and weaknesses are site-maintained planner notes, not official Trello labels.
                        </p>
                        <div className="mb-4">
                            <h4 className="text-sm font-bold text-green-400 mb-2 uppercase tracking-wide">Strengths</h4>
                            <ul className="text-sm text-muted space-y-1 list-disc list-inside">
                                {stand.strengths.map(s => <li key={s}>{s}</li>)}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-red-400 mb-2 uppercase tracking-wide">Weaknesses</h4>
                            <ul className="text-sm text-muted space-y-1 list-disc list-inside">
                                {stand.weaknesses.map(w => <li key={w}>{w}</li>)}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
