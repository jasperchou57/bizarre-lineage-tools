"use client";

import { useState, useMemo } from "react";
import { Target, Activity } from "lucide-react";
import { StandCard } from "@/components/StandCard";
import standsData from "@/data/stands.json";

export default function TierListPage() {
    const [activeFilter, setActiveFilter] = useState<"overall" | "pvp" | "pve">("overall");

    const tiers = useMemo(() => {
        const grouped = standsData.reduce((acc, stand) => {
            const tier = stand.tier[activeFilter] || 'Unknown';
            if (!acc[tier]) acc[tier] = [];
            acc[tier].push(stand);
            return acc;
        }, {} as Record<string, typeof standsData>);

        // Sort tiers: S+, S, A, B, C...
        const order = ["S+", "S", "A", "B", "C", "D"];
        return Object.entries(grouped).sort(([a], [b]) => {
            return order.indexOf(a) - order.indexOf(b);
        });
    }, [activeFilter]);

    return (
        <div className="container mx-auto px-4 py-12 max-w-6xl">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-white mb-4">
                    Bizarre Lineage Tier List
                </h1>
                <p className="text-lg text-muted max-w-2xl mx-auto mb-8">
                    Community-maintained ranking data for all Stands in this site&apos;s local dataset. Filter by overall, PvP, or PvE view.
                </p>

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
        </div>
    );
}
