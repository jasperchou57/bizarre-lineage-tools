import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Target, Shield } from "lucide-react";
import subsData from "@/data/sub-abilities.json";

export const metadata: Metadata = {
    title: "Sub-Abilities & Skill Trees | Bizarre Lineage",
    description: "Browse all sub-abilities like Hamon, Spin, and Cyborg. Find the best PvP and PvE bonuses for your build in Bizarre Lineage.",
};

export default function SubAbilitiesDirectory() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-6xl">
            <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-white mb-4">
                Sub-Abilities
            </h1>
            <p className="text-lg text-muted mb-12 max-w-2xl">
                Sub-Abilities provide passive bonuses, powerful utility skills, and alter your core gameplay loop.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {subsData.map((sub) => (
                    <Link
                        key={sub.id}
                        href={`/sub-abilities/${sub.id}`}
                        className="group bg-surface border border-border rounded-xl overflow-hidden hover:border-accent-indigo/50 transition-all hover:shadow-[0_0_20px_rgba(99,102,241,0.1)] block"
                    >
                        <div className="p-6 border-b border-white/5 bg-white/5 group-hover:bg-accent-indigo/5 transition-colors">
                            <div className="flex justify-between items-start mb-2">
                                <h2 className="text-2xl font-bold text-white group-hover:text-accent-indigo transition-colors">
                                    {sub.name}
                                </h2>
                                <ChevronRight className="h-5 w-5 text-muted group-hover:text-white group-hover:translate-x-1 transition-all" />
                            </div>
                            <p className="text-sm text-accent-blue font-mono mb-3">{sub.origin}</p>
                            <p className="text-sm text-muted line-clamp-2 min-h-[40px]">
                                {sub.summary}
                            </p>
                        </div>

                        <div className="p-6">
                            <div className="mb-6 p-3 bg-background rounded-lg border border-white/5">
                                <h3 className="text-xs font-bold text-muted uppercase tracking-widest mb-1.5">Passive</h3>
                                <p className="text-sm text-white">{sub.passive}</p>
                            </div>

                            <div className="space-y-3">
                                <div>
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-muted flex items-center gap-1.5"><Target className="h-3 w-3" /> PvP Value</span>
                                        <span className="text-white font-mono font-bold">{sub.scores.pvp}</span>
                                    </div>
                                    <div className="w-full bg-background rounded-full h-1.5 overflow-hidden">
                                        <div className="bg-red-400 h-full opacity-80" style={{ width: `${sub.scores.pvp * 10}%` }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-muted flex items-center gap-1.5"><Shield className="h-3 w-3" /> Survival</span>
                                        <span className="text-white font-mono font-bold">{sub.scores.survival}</span>
                                    </div>
                                    <div className="w-full bg-background rounded-full h-1.5 overflow-hidden">
                                        <div className="bg-green-400 h-full opacity-80" style={{ width: `${sub.scores.survival * 10}%` }}></div>
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
