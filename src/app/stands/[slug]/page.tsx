import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Target, Shield, Sword, Navigation, Activity, ChevronRight, ArrowRight, Zap, HelpCircle } from 'lucide-react';
import standsData from '@/data/stands.json';
import { withCanonical, SITE_URL } from '@/lib/metadata';

// Evolution chains: source of truth for stand progression
const EVOLUTION_CHAINS: Record<string, string[]> = {
    'whitesnake': ['whitesnake', 'c-moon', 'made-in-heaven'],
    'c-moon': ['whitesnake', 'c-moon', 'made-in-heaven'],
    'made-in-heaven': ['whitesnake', 'c-moon', 'made-in-heaven'],
    'the-world': ['the-world', 'the-world-high-voltage'],
    'the-world-high-voltage': ['the-world', 'the-world-high-voltage'],
};

function getEvolutionChain(standId: string) {
    const chain = EVOLUTION_CHAINS[standId];
    if (!chain) return null;
    return chain.map(id => standsData.find(s => s.id === id)).filter(Boolean);
}

function getRelatedStands(stand: typeof standsData[0]) {
    const relatedIds = new Set([
        ...stand.counters,
        ...stand.counteredBy,
        ...stand.recommendedStyles.flatMap(style =>
            standsData.filter(s => s.id !== stand.id && s.recommendedStyles.includes(style)).map(s => s.id)
        ),
    ]);
    // Remove self and evolution chain members
    const chainIds = new Set(EVOLUTION_CHAINS[stand.id] || []);
    return Array.from(relatedIds)
        .filter(id => id !== stand.id && !chainIds.has(id))
        .slice(0, 6)
        .map(id => standsData.find(s => s.id === id))
        .filter(Boolean);
}

function generateFAQ(stand: typeof standsData[0]) {
    const faqs = [
        {
            question: `Is ${stand.name} good in Bizarre Lineage?`,
            answer: `${stand.name} is currently rated ${stand.tier.overall} Tier overall in our planner dataset, with ${stand.tier.pvp} in PvP and ${stand.tier.pve} in PvE. ${stand.meta}`,
        },
        {
            question: `How do I get ${stand.name}?`,
            answer: `${stand.name} is obtained via ${stand.obtainMethod}. ${stand.rarity === 'Special' ? 'This is an evolution-only Stand — follow the evolution quest path instead of using a Stand Arrow.' : 'Use Stand Arrows obtained from codes, quests, meteor spawns, chests, or raids.'}`,
        },
        {
            question: `What is the best build for ${stand.name}?`,
            answer: `Our planner recommends pairing ${stand.name} with ${stand.recommendedStyles[0]} fighting style and ${stand.recommendedSubs[0]} sub-ability for PvP. Use the Build Planner to test different combinations and find what works for your playstyle.`,
        },
        {
            question: `What does ${stand.name} counter?`,
            answer: stand.counters.length > 0
                ? `${stand.name} is strong against ${stand.counters.map(id => standsData.find(s => s.id === id)?.name).filter(Boolean).join(' and ')}. ${stand.counteredBy.length > 0 ? `However, it struggles against ${stand.counteredBy.map(id => standsData.find(s => s.id === id)?.name).filter(Boolean).join(' and ')}.` : ''}`
                : `${stand.name} does not have strong counters in the current meta. Focus on building around its strengths: ${stand.strengths[0]?.toLowerCase()}.`,
        },
    ];

    const chain = getEvolutionChain(stand.id);
    if (chain && chain.length > 1) {
        const chainNames = chain.map(s => s!.name).join(' → ');
        faqs.push({
            question: `Does ${stand.name} have an evolution?`,
            answer: `Yes. ${stand.name} is part of the evolution chain: ${chainNames}. ${stand.obtainMethod.startsWith('Evolve') ? `You evolve into ${stand.name} from the previous stage.` : `${stand.name} can evolve into the next stage through the in-game quest.`}`,
        });
    }

    return faqs;
}

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

    return withCanonical({
        title: `${stand.name} Build Guide — Moves, Rarity & Best Combos | Bizarre Lineage`,
        description: `Don't waste your Stand Arrow. Full ${stand.name} guide: rarity, moves, best PvP & PvE builds. Bizarre Lineage tools & data.`,
    }, `/stands/${stand.id}`);
}

export default function StandPage({ params }: { params: { slug: string } }) {
    const stand = standsData.find((s) => s.id === params.slug);

    if (!stand) {
        notFound();
    }

    const evolutionChain = getEvolutionChain(stand.id);
    const relatedStands = getRelatedStands(stand);
    const faqs = generateFAQ(stand);

    // JSON-LD: BreadcrumbList
    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
            { '@type': 'ListItem', position: 2, name: 'Stands', item: `${SITE_URL}/stands` },
            { '@type': 'ListItem', position: 3, name: stand.name, item: `${SITE_URL}/stands/${stand.id}` },
        ],
    };

    // JSON-LD: FAQPage
    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(faq => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            {/* JSON-LD Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            {/* Breadcrumbs */}
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

                    {/* Evolution Chain */}
                    {evolutionChain && evolutionChain.length > 1 && (
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                                <Zap className="h-5 w-5 text-yellow-400" /> Evolution Chain
                            </h2>
                            <div className="flex flex-wrap items-center gap-2">
                                {evolutionChain.map((evoStand, index) => (
                                    <div key={evoStand!.id} className="flex items-center gap-2">
                                        {evoStand!.id === stand.id ? (
                                            <span className="px-4 py-3 bg-accent-blue/15 border-2 border-accent-blue/40 rounded-lg text-white font-bold text-sm">
                                                {evoStand!.name}
                                                <span className="block text-xs font-normal text-accent-blue mt-0.5">{evoStand!.tier.overall} Tier &middot; {evoStand!.rarity}</span>
                                            </span>
                                        ) : (
                                            <Link
                                                href={`/stands/${evoStand!.id}`}
                                                className="px-4 py-3 bg-surface border border-border rounded-lg text-white hover:border-accent-blue/50 transition-colors text-sm"
                                            >
                                                {evoStand!.name}
                                                <span className="block text-xs font-normal text-muted mt-0.5">{evoStand!.tier.overall} Tier &middot; {evoStand!.rarity}</span>
                                            </Link>
                                        )}
                                        {index < evolutionChain.length - 1 && (
                                            <ArrowRight className="h-4 w-4 text-muted shrink-0" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

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

                    {/* Counters & Matchups */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">{stand.name} Counters & Matchups</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-surface border border-border rounded-xl p-5">
                                <h3 className="text-sm font-bold text-green-400 uppercase tracking-wide mb-3">Strong Against</h3>
                                {stand.counters.length > 0 ? (
                                    <div className="space-y-2">
                                        {stand.counters.map(id => {
                                            const target = standsData.find(s => s.id === id);
                                            if (!target) return null;
                                            return (
                                                <Link key={id} href={`/stands/${id}`} className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors group">
                                                    <span className="text-white text-sm">{target.name}</span>
                                                    <span className="text-xs text-muted group-hover:text-accent-blue">{target.tier.overall} Tier</span>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <p className="text-sm text-muted">No strong counters in current dataset.</p>
                                )}
                            </div>
                            <div className="bg-surface border border-border rounded-xl p-5">
                                <h3 className="text-sm font-bold text-red-400 uppercase tracking-wide mb-3">Weak Against</h3>
                                {stand.counteredBy.length > 0 ? (
                                    <div className="space-y-2">
                                        {stand.counteredBy.map(id => {
                                            const target = standsData.find(s => s.id === id);
                                            if (!target) return null;
                                            return (
                                                <Link key={id} href={`/stands/${id}`} className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors group">
                                                    <span className="text-white text-sm">{target.name}</span>
                                                    <span className="text-xs text-muted group-hover:text-red-400">{target.tier.overall} Tier</span>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <p className="text-sm text-muted">No hard counters in current dataset.</p>
                                )}
                            </div>
                        </div>
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
                            <div className="flex flex-wrap gap-3">
                                <Link href={`/build-planner?stand=${stand.id}&style=${stand.recommendedStyles[0]}&sub=${stand.recommendedSubs[0]}&mode=pvp`} className="text-sm font-bold text-accent-blue hover:text-white transition-colors border border-accent-blue/30 px-4 py-2 rounded-lg hover:bg-accent-blue/10">
                                    Load PvP Build
                                </Link>
                                {stand.recommendedStyles.length > 1 && (
                                    <Link href={`/build-planner?stand=${stand.id}&style=${stand.recommendedStyles[1]}&sub=${stand.recommendedSubs[0]}`} className="text-sm font-bold text-muted hover:text-white transition-colors border border-white/10 px-4 py-2 rounded-lg hover:bg-white/5">
                                        Try {stand.recommendedStyles[1]}
                                    </Link>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* Stat Breakdown — unique per stand, boosts word count */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">{stand.name} Stat Breakdown</h2>
                        <div className="bg-surface border border-border rounded-xl p-6 text-sm text-muted leading-relaxed space-y-3">
                            <p>
                                {stand.name} scores <strong className="text-white">{stand.scores.damage}/10</strong> in Damage and <strong className="text-white">{stand.scores.combo}/10</strong> in Combo potential.
                                {stand.scores.damage >= 8 ? ` This puts it among the hardest-hitting Stands in Bizarre Lineage, capable of deleting opponents in short combo windows.` : stand.scores.damage >= 6 ? ` This is solid mid-range damage — enough to trade effectively but not enough to one-combo most opponents.` : ` The lower damage means ${stand.name} relies more on utility, CC, or sustain to win fights rather than raw burst.`}
                            </p>
                            <p>
                                For crowd control, {stand.name} sits at <strong className="text-white">{stand.scores.cc}/10</strong> CC with <strong className="text-white">{stand.scores.aoe}/10</strong> AoE coverage.
                                {stand.scores.cc >= 8 ? ` The high CC rating means this Stand can lock opponents down reliably — critical for setting up combos or peeling for teammates in group fights.` : stand.scores.cc >= 5 ? ` The moderate CC gives you some control tools but you may need to rely on your fighting style for additional stun or grab options.` : ` Limited CC means you need to rely on prediction and positioning rather than lockdown. Pairing with a CC-heavy fighting style like Kendo helps compensate.`}
                            </p>
                            <p>
                                Mobility is rated <strong className="text-white">{stand.scores.mobility}/10</strong> and Sustain <strong className="text-white">{stand.scores.sustain}/10</strong>.
                                {stand.scores.mobility >= 8 ? ` High mobility makes ${stand.name} excellent at chasing down opponents or disengaging from unfavorable fights.` : stand.scores.mobility <= 4 ? ` The low mobility is ${stand.name}'s biggest weakness — you need to commit to fights carefully since escaping is difficult.` : ` Average mobility means you can reposition but won't outrun dedicated speed Stands like Made in Heaven.`}
                                {stand.scores.sustain >= 7 ? ` Strong sustain lets you win extended trades and stay in fights longer than most opponents expect.` : ` Consider pairing with Vampire sub-ability if you need more survivability in longer fights.`}
                            </p>
                            <p>
                                {stand.name} is classified as <strong className="text-white">{stand.rarity}</strong> rarity and requires <strong className="text-white">{stand.awakening.required} Conjuration</strong> for Stand Awakening. {stand.awakening.required >= 120 ? `The higher awakening threshold means you need more combat experience before unlocking the full potential of this Stand.` : `The relatively low awakening requirement lets you access the awakened moveset earlier than many other Stands.`}
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">Common Mistakes with {stand.name}</h2>
                        <ul className="space-y-3 text-muted">
                            <li className="flex items-start gap-2">
                                <span className="text-red-400 font-bold">&times;</span>
                                <span>
                                    {stand.scores.mobility <= 4
                                        ? `Trying to chase opponents without a gap closer. ${stand.name} has ${stand.scores.mobility}/10 mobility — you lose chases against faster Stands. Use your CC to force fights on your terms instead.`
                                        : stand.scores.damage >= 9
                                            ? `Over-relying on raw damage and forgetting to block or dodge. ${stand.name} hits hard but can get punished if you play too aggressively without confirming hits first.`
                                            : `Picking ${stand.name} without testing the recommended ${stand.recommendedStyles[0]} pairing first. The planner suggests it for a reason — it covers ${stand.name}'s gaps in ${stand.scores.cc < 5 ? 'crowd control' : stand.scores.mobility < 5 ? 'mobility' : 'sustain'}.`}
                                </span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-red-400 font-bold">&times;</span>
                                <span>
                                    {stand.counteredBy.length > 0
                                        ? `Queueing into ${standsData.find(s => s.id === stand.counteredBy[0])?.name || 'your counters'} without a plan. ${stand.name} struggles in this matchup — ${stand.scores.mobility >= 7 ? 'use your mobility to disengage and wait for cooldowns' : 'bait their key abilities before committing to a combo'}.`
                                        : `Ignoring your Stand Awakening. ${stand.name} needs ${stand.awakening.required} Conjuration to awaken — grind this early because the awakened moveset significantly changes how you play.`}
                                </span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-red-400 font-bold">&times;</span>
                                <span>
                                    {stand.tier.pvp !== stand.tier.pve
                                        ? `Using your PvP build for PvE (or vice versa). ${stand.name} is rated ${stand.tier.pvp} in PvP but ${stand.tier.pve} in PvE — these are different contexts that may call for different style and sub-ability pairings.`
                                        : `Skipping the Build Planner entirely. Even if you know ${stand.name} well, testing different style and sub combos in the planner can reveal setups you haven't considered.`}
                                </span>
                            </li>
                        </ul>
                    </section>

                    {/* FAQ */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                            <HelpCircle className="h-5 w-5 text-accent-blue" /> Frequently Asked Questions
                        </h2>
                        <div className="space-y-4">
                            {faqs.map((faq) => (
                                <details key={faq.question} className="group bg-surface border border-border rounded-lg">
                                    <summary className="cursor-pointer p-4 text-white font-medium flex items-center justify-between hover:bg-white/5 transition-colors rounded-lg">
                                        {faq.question}
                                        <ChevronRight className="h-4 w-4 text-muted group-open:rotate-90 transition-transform shrink-0 ml-2" />
                                    </summary>
                                    <div className="px-4 pb-4 text-muted text-sm leading-relaxed">
                                        {faq.answer}
                                    </div>
                                </details>
                            ))}
                        </div>
                    </section>

                    {/* Related Stands */}
                    {relatedStands.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">Related Stands</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {relatedStands.map(rs => (
                                    <Link
                                        key={rs!.id}
                                        href={`/stands/${rs!.id}`}
                                        className="bg-surface border border-border rounded-lg p-4 hover:border-accent-blue/50 transition-colors group"
                                    >
                                        <div className="font-bold text-white text-sm group-hover:text-accent-blue transition-colors">{rs!.name}</div>
                                        <div className="text-xs text-muted mt-1">{rs!.tier.overall} Tier &middot; {rs!.rarity}</div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Bottom Planner CTA — loss aversion framing */}
                    <section className="bg-gradient-to-r from-accent-blue/10 to-accent-indigo/10 border border-accent-blue/20 rounded-xl p-6 text-center">
                        <p className="text-white font-bold text-lg mb-2">Don&apos;t waste resources on a bad {stand.name} build</p>
                        <p className="text-muted text-sm mb-4">Test your Stand + Style + Sub combo before committing. Most players skip this and regret it.</p>
                        <Link
                            href={`/build-planner?stand=${stand.id}`}
                            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-gradient-to-r from-accent-blue to-accent-indigo rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all"
                        >
                            Check {stand.name} Build Scores <ArrowRight className="h-4 w-4" />
                        </Link>
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

                    {/* Quick Links sidebar */}
                    <div className="bg-surface border border-border rounded-xl p-6">
                        <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
                        <div className="space-y-2">
                            <Link href="/tier-list" className="flex items-center gap-2 text-sm text-muted hover:text-accent-blue transition-colors">
                                <ChevronRight className="h-3 w-3" /> Tier List
                            </Link>
                            <Link href="/build-planner" className="flex items-center gap-2 text-sm text-muted hover:text-accent-blue transition-colors">
                                <ChevronRight className="h-3 w-3" /> Build Planner
                            </Link>
                            <Link href={`/fighting-styles/${stand.recommendedStyles[0]}`} className="flex items-center gap-2 text-sm text-muted hover:text-accent-blue transition-colors capitalize">
                                <ChevronRight className="h-3 w-3" /> {stand.recommendedStyles[0]} Guide
                            </Link>
                            <Link href={`/sub-abilities/${stand.recommendedSubs[0]}`} className="flex items-center gap-2 text-sm text-muted hover:text-accent-blue transition-colors capitalize">
                                <ChevronRight className="h-3 w-3" /> {stand.recommendedSubs[0]} Guide
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
