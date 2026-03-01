"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowRightLeft, Target, Activity, Shield, Navigation, Database } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import standsData from "@/data/stands.json";
import { Suspense } from "react";

function ComparePageClient() {
    const searchParams = useSearchParams();
    const idA = searchParams.get("a");
    const idB = searchParams.get("b");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [vault] = useLocalStorage<any[]>("bl-vault", []);

    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    const buildA = vault.find(b => b.id === idA);
    const buildB = vault.find(b => b.id === idB);

    // If missing one or both, show a selection UI (Simplified for MVP: redirect or message)
    if (!buildA || !buildB) {
        return (
            <div className="container mx-auto px-4 py-24 text-center max-w-lg">
                <ArrowRightLeft className="h-16 w-16 text-muted mx-auto mb-6 opacity-30" />
                <h1 className="text-2xl font-bold text-white mb-4">Select Builds to Compare</h1>
                <p className="text-muted mb-8">Go to your Vault and select exactly two builds to compare them side-by-side.</p>
                <Link href="/vault" className="px-6 py-3 bg-accent-blue rounded-lg text-white font-bold inline-block">
                    Go to Vault
                </Link>
            </div>
        );
    }

    // Calculate Verdicts
    const diffPvP = (buildA.scores.pvp - buildB.scores.pvp).toFixed(1);
    const diffPvE = (buildA.scores.pve - buildB.scores.pve).toFixed(1);

    const verdictPvP = Number(diffPvP) > 0 ? `Left scores +${diffPvP} PvP.` : Number(diffPvP) < 0 ? `Right scores +${Math.abs(Number(diffPvP))} PvP.` : "PvP is tied.";
    const verdictPvE = Number(diffPvE) > 0 ? `Left scores +${diffPvE} PvE.` : Number(diffPvE) < 0 ? `Right scores +${Math.abs(Number(diffPvE))} PvE.` : "PvE is tied.";

    const standNameA = standsData.find(s => s.id === buildA.stand)?.name || buildA.stand;
    const standNameB = standsData.find(s => s.id === buildB.stand)?.name || buildB.stand;

    return (
        <div className="container mx-auto px-4 py-12 max-w-6xl">
            <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-white mb-2 text-center">
                Compare Builds
            </h1>

            {/* The Verdict Bar */}
            <div className="bg-accent-indigo/10 border border-accent-indigo/30 rounded-xl p-6 mb-12 max-w-2xl mx-auto text-center">
                <h2 className="text-sm font-bold text-accent-indigo uppercase mb-2 tracking-widest">Verdict</h2>
                <p className="text-white text-lg">
                    <span className="font-bold">{verdictPvP}</span> <span className="opacity-80">{verdictPvE}</span>
                </p>
            </div>

            {/* Side-by-Side Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ComparisonColumn build={buildA} standName={standNameA} label="Build A" otherScores={buildB.scores} />
                <ComparisonColumn build={buildB} standName={standNameB} label="Build B" otherScores={buildA.scores} />
            </div>
        </div>
    );
}

export default function ComparePage() {
    return (
        <Suspense fallback={<div className="container mx-auto p-12 text-center text-white">Loading comparison...</div>}>
            <ComparePageClient />
        </Suspense>
    );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ComparisonColumn({ build, standName, label, otherScores }: { build: any, standName: string, label: string, otherScores: any }) {
    return (
        <div className="bg-surface border border-border rounded-xl p-8">
            <div className="text-xs font-bold text-muted uppercase tracking-widest mb-6 border-b border-white/5 pb-2">
                {label} (Patch {build.patchVersion})
            </div>

            <h2 className="text-2xl font-bold text-white mb-4">{build.name}</h2>

            <div className="flex flex-col gap-2 mb-8 p-4 bg-background rounded-lg border border-white/5">
                <div className="flex justify-between items-center text-sm">
                    <span className="text-muted">Stand</span>
                    <span className="text-white font-medium">{standName}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                    <span className="text-muted">Style</span>
                    <span className="text-white font-medium capitalize">{build.style || 'None'}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                    <span className="text-muted">Sub-Ability</span>
                    <span className="text-white font-medium capitalize">{build.sub || 'None'}</span>
                </div>
            </div>

            <div className="space-y-6">
                <StatRow label="PvP" value={build.scores.pvp} otherValue={otherScores.pvp} icon={<Target className="h-4 w-4" />} color="text-accent-blue" />
                <StatRow label="PvE" value={build.scores.pve} otherValue={otherScores.pve} icon={<Activity className="h-4 w-4" />} color="text-accent-indigo" />
                <StatRow label="Survival" value={build.scores.survival} otherValue={otherScores.survival} icon={<Shield className="h-4 w-4" />} color="text-green-400" />
                <StatRow label="Mobility" value={build.scores.mobility} otherValue={otherScores.mobility} icon={<Navigation className="h-4 w-4" />} color="text-purple-400" />
                <StatRow label="Cost" value={build.scores.cost} otherValue={otherScores.cost} icon={<Database className="h-4 w-4" />} color="text-orange-400" />
            </div>

            <div className="mt-10">
                <Link
                    href={`/build-planner?stand=${build.stand}&style=${build.style}&sub=${build.sub}`}
                    className="block w-full py-4 bg-gradient-to-r from-accent-blue to-accent-indigo rounded-lg text-white font-bold text-center hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all"
                >
                    Apply & Recalculate This Build
                </Link>
            </div>
        </div>
    );
}

function StatRow({ label, value, otherValue, icon, color }: { label: string, value: number, otherValue: number, icon: React.ReactNode, color: string }) {
    const isDifferent = Math.abs(value - otherValue) >= 0.1;
    const isWinning = value > otherValue;
    return (
        <div className={`p-3 rounded-lg transition-colors ${isDifferent ? (isWinning ? 'bg-green-500/5 border border-green-500/20' : 'bg-yellow-500/5 border border-yellow-500/20') : ''}`}>
            <div className="flex justify-between text-sm mb-2">
                <span className="text-muted flex items-center gap-1.5">{icon} {label}</span>
                <span className={`font-mono font-bold text-lg ${color}`}>{value.toFixed(1)}</span>
            </div>
            <div className="w-full bg-background rounded-full h-1.5 relative overflow-hidden">
                <div
                    className={`bg-current h-full opacity-80 ${color}`}
                    style={{ width: `${value * 10}%` }}
                ></div>
            </div>
            {isDifferent && (
                <p className={`text-[10px] font-bold text-right mt-1 ${isWinning ? 'text-green-400' : 'text-yellow-400'}`}>
                    {isWinning ? `+${(value - otherValue).toFixed(1)}` : `${(value - otherValue).toFixed(1)}`} vs other build
                </p>
            )}
        </div>
    );
}
