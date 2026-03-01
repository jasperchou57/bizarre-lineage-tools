import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Activity, Zap } from "lucide-react";
import stylesData from "@/data/fighting-styles.json";

export const metadata: Metadata = {
    title: "Fighting Styles Tier List & Guide | Bizarre Lineage",
    description: "Browse all fighting styles in Bizarre Lineage. Find the best stats, combos, and stand synergies for Boxing, Kendo, Vampire, and more.",
};

export default function FightingStylesDirectory() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-6xl">
            <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-white mb-4">
                Fighting Styles
            </h1>
            <p className="text-lg text-muted mb-12 max-w-2xl">
                Fighting Styles modify your base combat capabilities. Pair them with specific Stands to unlock devastating combo potential.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stylesData.map((style) => (
                    <Link
                        key={style.id}
                        href={`/fighting-styles/${style.id}`}
                        className="group bg-surface border border-border rounded-xl overflow-hidden hover:border-accent-blue/50 transition-all hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] block"
                    >
                        <div className="p-6 border-b border-white/5 bg-white/5 group-hover:bg-accent-blue/5 transition-colors">
                            <div className="flex justify-between items-start mb-2">
                                <h2 className="text-2xl font-bold text-white group-hover:text-accent-blue transition-colors">
                                    {style.name}
                                </h2>
                                <ChevronRight className="h-5 w-5 text-muted group-hover:text-white group-hover:translate-x-1 transition-all" />
                            </div>
                            <p className="text-sm text-muted line-clamp-2 min-h-[40px]">
                                {style.summary}
                            </p>
                        </div>

                        <div className="p-6">
                            <h3 className="text-xs font-bold text-muted uppercase tracking-widest mb-3">Best With</h3>
                            <div className="flex flex-wrap gap-2 mb-6">
                                {style.bestWith.map(standId => (
                                    <span key={standId} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-white capitalize">
                                        {standId.replace(/-/g, ' ')}
                                    </span>
                                ))}
                            </div>

                            <div className="space-y-3">
                                <div>
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-muted flex items-center gap-1.5"><Zap className="h-3 w-3" /> Combo Potential</span>
                                        <span className="text-white font-mono font-bold">{style.scores.combo}</span>
                                    </div>
                                    <div className="w-full bg-background rounded-full h-1.5 overflow-hidden">
                                        <div className="bg-accent-blue h-full opacity-80" style={{ width: `${style.scores.combo * 10}%` }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-muted flex items-center gap-1.5"><Activity className="h-3 w-3" /> Damage Scaling</span>
                                        <span className="text-white font-mono font-bold">{style.scores.damage}</span>
                                    </div>
                                    <div className="w-full bg-background rounded-full h-1.5 overflow-hidden">
                                        <div className="bg-accent-indigo h-full opacity-80" style={{ width: `${style.scores.damage * 10}%` }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
