import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Link } from "@/i18n/navigation";
import { ChevronRight } from 'lucide-react';
import stylesData from '@/data/fighting-styles.json';
import { withCanonical } from '@/lib/metadata';

export function generateStaticParams() {
    return stylesData.map((style) => ({
        slug: style.id,
    }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
    const style = stylesData.find((s) => s.id === params.slug);
    if (!style) return { title: 'Style Not Found' };

    return withCanonical({
        title: `${style.name} Fighting Style Build & Guide | Bizarre Lineage`,
        description: `Complete guide for the ${style.name} Fighting Style in Bizarre Lineage. Learn its moves, best Stand synergies, and combo potential.`,
    }, `/fighting-styles/${style.id}`);
}

export default function StyleDetailPage({ params }: { params: { slug: string } }) {
    const style = stylesData.find((s) => s.id === params.slug);

    if (!style) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-sm text-muted mb-8 overflow-x-auto pb-2">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <ChevronRight className="h-4 w-4 flex-shrink-0" />
                <Link href="/fighting-styles" className="hover:text-white transition-colors">Fighting Styles</Link>
                <ChevronRight className="h-4 w-4 flex-shrink-0" />
                <span className="text-white capitalize">{style.name}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content Column */}
                <div className="lg:col-span-2 space-y-8">
                    <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-white">
                        {style.name}
                    </h1>
                    <p className="text-xl text-muted leading-relaxed">
                        {style.summary}
                    </p>
                    <p className="text-sm text-muted leading-relaxed">
                        Move names are cross-checked against the public official Trello. Scores and pairings on this page are site-maintained planner notes.
                    </p>

                    <div className="bg-surface border border-border rounded-xl overflow-hidden">
                        <div className="bg-white/5 border-b border-white/5 px-6 py-4">
                            <h2 className="text-xl font-bold text-white">Moveset</h2>
                        </div>
                        <div className="divide-y divide-white/5">
                            {style.moves.map((move, i) => (
                                <div key={i} className="p-6 flex flex-col sm:flex-row gap-4 justify-between sm:items-center hover:bg-white/5 transition-colors">
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-1">{move.name}</h3>
                                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                        {(move as any).effect && <p className="text-sm text-green-400">{(move as any).effect}</p>}
                                    </div>
                                    <div className="flex gap-3">
                                        <span className="px-3 py-1 bg-background border border-border rounded-lg text-xs font-mono font-bold text-muted flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-accent-blue" />
                                            {move.type.toUpperCase()}
                                        </span>
                                        <span className="px-3 py-1 bg-white/10 border border-white/20 rounded-lg text-sm font-bold text-white min-w-[3rem] text-center shadow-[inset_0_-2px_4px_rgba(0,0,0,0.4)]">
                                            {move.key}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-8 flex gap-4">
                        <Link
                            href={`/build-planner?style=${style.id}`}
                            className="px-8 py-4 bg-gradient-to-r from-accent-blue to-accent-indigo rounded-xl text-white font-bold text-center hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all flex-1"
                        >
                            Create {style.name} Build
                        </Link>
                    </div>
                </div>

                {/* Sidebar Column */}
                <div className="space-y-6">
                    <div className="bg-surface border border-border rounded-xl p-6">
                        <h3 className="text-sm font-bold text-muted uppercase tracking-widest mb-6 border-b border-white/5 pb-2">Style Stats</h3>
                        <div className="space-y-5">
                            <StatRow label="Damage" value={style.scores.damage} color="text-red-400" />
                            <StatRow label="Combo" value={style.scores.combo} color="text-accent-blue" />
                            <StatRow label="Range" value={style.scores.range} color="text-green-400" />
                            <StatRow label="Utility" value={style.scores.utility} color="text-purple-400" />
                        </div>
                    </div>

                    <div className="bg-surface border border-border rounded-xl p-6">
                        <h3 className="text-sm font-bold text-muted uppercase tracking-widest mb-4 border-b border-white/5 pb-2">Best Paired With</h3>
                        <div className="flex flex-col gap-2">
                            {style.bestWith.map((standId) => (
                                <Link
                                    key={standId}
                                    href={`/stands/${standId}`}
                                    className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-sm text-white capitalize hover:bg-white/10 hover:border-accent-blue transition-colors flex justify-between items-center group"
                                >
                                    {standId.replace(/-/g, ' ')}
                                    <ChevronRight className="h-4 w-4 text-muted group-hover:text-accent-blue group-hover:translate-x-1 transition-all" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatRow({ label, value, color }: { label: string, value: number, color: string }) {
    return (
        <div>
            <div className="flex justify-between text-sm mb-1.5">
                <span className="text-muted">{label}</span>
                <span className={`font-mono font-bold ${color}`}>{value}/10</span>
            </div>
            <div className="w-full bg-background rounded-full h-1.5 relative overflow-hidden">
                <div
                    className={`bg-current h-full opacity-80 ${color}`}
                    style={{ width: `${value * 10}%` }}
                ></div>
            </div>
        </div>
    );
}
