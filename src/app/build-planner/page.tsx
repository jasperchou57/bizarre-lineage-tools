"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Sword, Activity, Target, Shield, Navigation, Save, Database, Download } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import standsData from "@/data/stands.json";
import stylesData from "@/data/fighting-styles.json";
import subsData from "@/data/sub-abilities.json";

function BuildPlannerClient() {
    const searchParams = useSearchParams();
    const initialStand = searchParams.get("stand") || "";
    const initialStyle = searchParams.get("style") || "";
    const initialSub = searchParams.get("sub") || "";

    const [selectedStand, setSelectedStand] = useState(initialStand);
    const [selectedStyle, setSelectedStyle] = useState(initialStyle);
    const [selectedSub, setSelectedSub] = useState(initialSub);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [vault, setVault] = useLocalStorage<any[]>("bl-vault", []);
    const [saveCount, setSaveCount] = useLocalStorage<number>("bl-save-count", 0);
    const [showExportPrompt, setShowExportPrompt] = useState(false);

    // Sync state with URL params on mount
    useEffect(() => {
        if (initialStand) setSelectedStand(initialStand);
        if (initialStyle) setSelectedStyle(initialStyle);
        if (initialSub) setSelectedSub(initialSub);
    }, [initialStand, initialStyle, initialSub]);

    // Derived selections
    const standObj = useMemo(() => standsData.find(s => s.id === selectedStand), [selectedStand]);
    const styleObj = useMemo(() => stylesData.find(s => s.id === selectedStyle), [selectedStyle]);
    const subObj = useMemo(() => subsData.find(s => s.id === selectedSub), [selectedSub]);

    // Scoring Logic
    const scores = useMemo(() => {
        if (!standObj) return { pvp: 0, pve: 0, survival: 0, mobility: 0, cost: 0 };

        // Base is out of 10. For MVP we average properties.
        let pvp = standObj.scores.damage * 0.5 + standObj.scores.cc * 0.3 + standObj.scores.combo * 0.2;
        let pve = standObj.scores.aoe * 0.6 + standObj.scores.damage * 0.4;
        let survival = standObj.scores.sustain;
        const mobility = standObj.scores.mobility;
        const cost = standObj.rarity === 'Legendary' ? 2 : standObj.rarity === 'Epic' ? 5 : 8; // Higher is easier

        // Apply modifiers from Style
        if (styleObj) {
            pvp += (styleObj.scores.damage * 0.1);
            pve += (styleObj.scores.combo * 0.1);
        }
        // Apply modifiers from Sub
        if (subObj) {
            pvp += (subObj.scores?.pvp || 5) * 0.1;
            pve += (subObj.scores?.pve || 5) * 0.1;
            survival += (subObj.scores?.survival || 5) * 0.1;
        }

        // Cap at 10
        return {
            pvp: Math.min(10, Number(pvp.toFixed(1))),
            pve: Math.min(10, Number(pve.toFixed(1))),
            survival: Math.min(10, Number(survival.toFixed(1))),
            mobility: Math.min(10, Number(mobility.toFixed(1))),
            cost: Math.min(10, Number(cost.toFixed(1)))
        };
    }, [standObj, styleObj, subObj]);

    // 1-Step Upgrade Logic
    const oneStepUpgrade = useMemo(() => {
        if (!standObj) return null;
        if (!selectedStyle && standObj.recommendedStyles.length > 0) {
            return `Select ${standObj.recommendedStyles[0]} Fighting Style to improve PvP combos.`;
        }
        if (!selectedSub && standObj.recommendedSubs.length > 0) {
            return `Add ${standObj.recommendedSubs[0]} Sub-Ability to boost your base stats.`;
        }
        // If full build but not using recommended
        if (selectedStyle && !standObj.recommendedStyles.includes(selectedStyle)) {
            return `Consider swapping to ${standObj.recommendedStyles[0]} — it synergizes better with ${standObj.name}.`;
        }
        return "Your build is fully optimized for the current patch!";
    }, [standObj, selectedStyle, selectedSub]);

    const handleSave = () => {
        if (!standObj) return;
        const newBuild = {
            id: crypto.randomUUID(),
            name: `${standObj.name} Build`,
            stand: selectedStand,
            style: selectedStyle,
            sub: selectedSub,
            scores,
            createdAt: new Date().toISOString(),
            patchVersion: "v1.0"
        };

        setVault([...vault, newBuild]);
        setSaveCount(saveCount + 1);

        if (saveCount === 2) { // 3rd save (0-indexed logic means we trigger after previous count was 2)
            setShowExportPrompt(true);
        } else {
            alert("Saved to Vault ✓");
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            {/* Export Prompt Modal */}
            {showExportPrompt && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
                    <div className="bg-surface border border-accent-blue/30 rounded-xl p-8 max-w-md w-full text-center">
                        <Database className="h-12 w-12 text-accent-blue mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">You&apos;ve saved 3 builds!</h3>
                        <p className="text-muted mb-6">
                            Builds are saved in this browser. To prevent losing your theoretical perfect setups, export a backup.
                        </p>
                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={() => setShowExportPrompt(false)}
                                className="px-4 py-2 border border-white/10 rounded-lg text-white hover:bg-white/5"
                            >
                                Later
                            </button>
                            <button
                                onClick={() => {
                                    const blob = new Blob([JSON.stringify(vault, null, 2)], { type: "application/json" });
                                    const url = URL.createObjectURL(blob);
                                    const a = document.createElement('a');
                                    a.href = url;
                                    a.download = 'bizarre_lineage_vault_backup.json';
                                    document.body.appendChild(a);
                                    a.click();
                                    document.body.removeChild(a);
                                    URL.revokeObjectURL(url);
                                    setShowExportPrompt(false);
                                }}
                                className="px-4 py-2 bg-accent-blue rounded-lg text-white font-bold flex items-center gap-2"
                            >
                                <Download className="h-4 w-4" /> Export JSON
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-white">Build Planner</h1>
                <p className="text-muted mt-2">Theorycraft the perfect combination. Scores update in real-time.</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Left Column: Selection */}
                <div className="w-full lg:w-1/2 space-y-6">

                    {/* Stand Selection */}
                    <div className="bg-surface border border-border rounded-xl p-6">
                        <h2 className="text-lg font-bold text-white mb-4">1. Select Stand</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {standsData.map(s => (
                                <button
                                    key={s.id}
                                    onClick={() => setSelectedStand(s.id)}
                                    className={`p-3 rounded-lg border text-sm font-medium transition-all ${selectedStand === s.id
                                        ? 'bg-accent-blue/20 border-accent-blue text-white shadow-[0_0_10px_rgba(59,130,246,0.3)]'
                                        : 'bg-background border-white/5 text-muted hover:border-white/20'
                                        }`}
                                >
                                    {s.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Style Selection */}
                    <div className={`bg-surface border border-border rounded-xl p-6 transition-opacity ${!selectedStand ? 'opacity-50 pointer-events-none' : ''}`}>
                        <h2 className="text-lg font-bold text-white mb-4">2. Select Fighting Style</h2>
                        <div className="grid grid-cols-2 gap-3">
                            {stylesData.map(s => (
                                <button
                                    key={s.id}
                                    onClick={() => setSelectedStyle(s.id)}
                                    className={`p-3 rounded-lg border text-sm font-medium transition-all ${selectedStyle === s.id
                                        ? 'bg-accent-indigo/20 border-accent-indigo text-white shadow-[0_0_10px_rgba(99,102,241,0.3)]'
                                        : 'bg-background border-white/5 text-muted hover:border-white/20'
                                        }`}
                                >
                                    {s.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Sub-Ability Selection */}
                    <div className={`bg-surface border border-border rounded-xl p-6 transition-opacity ${!selectedStand ? 'opacity-50 pointer-events-none' : ''}`}>
                        <h2 className="text-lg font-bold text-white mb-4">3. Select Sub-Ability</h2>
                        <div className="grid grid-cols-2 gap-3">
                            {subsData.map(s => (
                                <button
                                    key={s.id}
                                    onClick={() => setSelectedSub(s.id)}
                                    className={`p-3 rounded-lg border text-sm font-medium transition-all ${selectedSub === s.id
                                        ? 'bg-purple-500/20 border-purple-500 text-white shadow-[0_0_10px_rgba(168,85,247,0.3)]'
                                        : 'bg-background border-white/5 text-muted hover:border-white/20'
                                        }`}
                                >
                                    {s.name}
                                </button>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Right Column: Results & Scores */}
                <div className="w-full lg:w-1/2">
                    <div className="bg-surface border border-border rounded-xl p-6 sticky top-24">

                        {/* Score Header */}
                        <div className="flex justify-between items-center mb-6 pb-6 border-b border-white/5">
                            <h2 className="text-2xl font-bold text-white">Build Summary</h2>
                            {standObj && (
                                <button
                                    onClick={handleSave}
                                    className="px-4 py-2 bg-gradient-to-r from-accent-blue to-accent-indigo text-white text-sm font-bold rounded-lg hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] transition-all flex items-center gap-2"
                                >
                                    <Save className="h-4 w-4" /> Save to Vault
                                </button>
                            )}
                        </div>

                        {!standObj ? (
                            <div className="py-12 text-center text-muted">
                                <Target className="h-12 w-12 mx-auto mb-4 opacity-20" />
                                <p>Select a Stand to see its potential.</p>
                            </div>
                        ) : (
                            <div className="space-y-8">
                                {/* Selected Parts */}
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm font-medium text-white">{standObj.name}</span>
                                    {styleObj && <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm font-medium text-white">+ {styleObj.name}</span>}
                                    {subObj && <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm font-medium text-white">+ {subObj.name}</span>}
                                </div>

                                {/* 5-Dimension Radar/Bars */}
                                <div>
                                    <h3 className="text-sm font-bold text-muted uppercase tracking-wider mb-4 font-mono">Performance Scores</h3>
                                    <div className="space-y-4">
                                        <ScoreBar label="PvP Effectiveness" value={scores.pvp} icon={<Sword className="h-4 w-4" />} color="bg-accent-blue" />
                                        <ScoreBar label="PvE / Grinding" value={scores.pve} icon={<Activity className="h-4 w-4" />} color="bg-accent-indigo" />
                                        <ScoreBar label="Survival" value={scores.survival} icon={<Shield className="h-4 w-4" />} color="bg-green-500" />
                                        <ScoreBar label="Mobility" value={scores.mobility} icon={<Navigation className="h-4 w-4" />} color="bg-purple-500" />
                                        <ScoreBar label="Accessibility (Cost)" value={scores.cost} icon={<Database className="h-4 w-4" />} color="bg-orange-500" />
                                    </div>
                                    <p className="text-xs text-center text-muted mt-4 opacity-70">Scores are tagged for Patch v1.0. Meta shifts may alter values.</p>
                                </div>

                                {/* 1-Step Upgrade */}
                                {oneStepUpgrade && (
                                    <div className="bg-accent-blue/10 border border-accent-blue/30 rounded-lg p-4">
                                        <h4 className="text-sm font-bold text-accent-blue mb-1">1-Step Optimization Guide</h4>
                                        <p className="text-sm text-white/90">{oneStepUpgrade}</p>
                                    </div>
                                )}

                                <p className="text-xs text-center text-muted pt-4 border-t border-white/5">Saved directly to your local device</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function ScoreBar({ label, value, icon, color }: { label: string, value: number, icon: React.ReactNode, color: string }) {
    return (
        <div>
            <div className="flex justify-between text-sm mb-1">
                <span className="text-muted flex items-center gap-1.5">{icon} {label}</span>
                <span className="text-white font-mono font-bold text-[15px]">{value}/10</span>
            </div>
            <div className="w-full bg-background rounded-full h-2 relative overflow-hidden">
                <div
                    className={`${color} h-full transition-all duration-500 ease-out`}
                    style={{ width: `${value * 10}%` }}
                ></div>
                {value >= 10 && (
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                )}
            </div>
            {value >= 10 && (
                <p className="text-[10px] text-accent-blue font-bold text-right mt-1">OPTIMAL FOR CURRENT PATCH</p>
            )}
        </div>
    );
}

// Wrap in Suspense because we useSearchParams
export default function BuildPlanner() {
    return (
        <Suspense fallback={<div className="container mx-auto p-12 text-center text-white">Loading Planner...</div>}>
            <BuildPlannerClient />
        </Suspense>
    )
}
