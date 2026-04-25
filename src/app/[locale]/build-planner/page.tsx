"use client";

import { useState, useMemo, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Sword, Activity, Target, Shield, Navigation, Save, Database, Download, AlertTriangle } from "lucide-react";
import { useTranslations } from "next-intl";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { trackEvent } from "@/lib/analytics";
import standsData from "@/data/stands.json";
import stylesData from "@/data/fighting-styles.json";
import subsData from "@/data/sub-abilities.json";

type Scores = { pvp: number; pve: number; survival: number; mobility: number; cost: number };

function BuildPlannerClient() {
    const t = useTranslations("BuildPlanner");
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
        trackEvent('planner_open', { source: initialStand ? 'stand_page' : 'direct' });
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
        const cost = standObj.rarity === 'Mythical' ? 1 : standObj.rarity === 'Special' ? 2 : standObj.rarity === 'Legendary' ? 3 : standObj.rarity === 'Rare' ? 5 : standObj.rarity === 'Uncommon' ? 7 : 9; // Higher = easier to obtain

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

    // Track previous scores for delta display
    const prevScoresRef = useRef<Scores>({ pvp: 0, pve: 0, survival: 0, mobility: 0, cost: 0 });
    const [deltas, setDeltas] = useState<Scores>({ pvp: 0, pve: 0, survival: 0, mobility: 0, cost: 0 });

    useEffect(() => {
        const prev = prevScoresRef.current;
        if (prev.pvp !== 0 || prev.pve !== 0) {
            setDeltas({
                pvp: Number((scores.pvp - prev.pvp).toFixed(1)),
                pve: Number((scores.pve - prev.pve).toFixed(1)),
                survival: Number((scores.survival - prev.survival).toFixed(1)),
                mobility: Number((scores.mobility - prev.mobility).toFixed(1)),
                cost: Number((scores.cost - prev.cost).toFixed(1)),
            });
            const timer = setTimeout(() => setDeltas({ pvp: 0, pve: 0, survival: 0, mobility: 0, cost: 0 }), 3000);
            return () => clearTimeout(timer);
        }
        prevScoresRef.current = scores;
    }, [scores]);

    useEffect(() => { prevScoresRef.current = scores; }, [scores]);

    // Automatic weakness detection
    const weaknesses = useMemo(() => {
        if (!standObj) return [];
        const issues: { severity: 'red' | 'yellow'; message: string }[] = [];
        if (scores.survival < 4) issues.push({ severity: 'red', message: t("warningSurvival", { score: scores.survival }) });
        if (scores.mobility <= 3) issues.push({ severity: 'red', message: t("warningMobility", { score: scores.mobility, name: standObj.name }) });
        if (scores.pvp < 5 && scores.pve < 5) issues.push({ severity: 'red', message: t("warningBothLow", { pvp: scores.pvp, pve: scores.pve }) });
        if (!selectedStyle) issues.push({ severity: 'yellow', message: t("warningNoStyle") });
        if (!selectedSub) issues.push({ severity: 'yellow', message: t("warningNoSub") });
        if (selectedStyle && standObj.recommendedStyles.length > 0 && !standObj.recommendedStyles.includes(selectedStyle)) {
            issues.push({ severity: 'yellow', message: t("warningStyleMismatch", {
                currentStyle: stylesData.find(s => s.id === selectedStyle)?.name ?? selectedStyle,
                name: standObj.name,
                recommendedStyle: standObj.recommendedStyles[0],
            }) });
        }
        return issues;
    }, [standObj, scores, selectedStyle, selectedSub, t]);

    // 1-Step Upgrade Logic
    const oneStepUpgrade = useMemo(() => {
        if (!standObj) return null;
        if (!selectedStyle && standObj.recommendedStyles.length > 0) {
            return t("oneStepStyleHint", { style: standObj.recommendedStyles[0] });
        }
        if (!selectedSub && standObj.recommendedSubs.length > 0) {
            return t("oneStepSubHint", { sub: standObj.recommendedSubs[0] });
        }
        // If full build but not using recommended
        if (selectedStyle && !standObj.recommendedStyles.includes(selectedStyle)) {
            return `If you want to compare against the site's default pairing, try ${standObj.recommendedStyles[0]} with ${standObj.name}.`;
        }
        return "This setup matches one of the site's saved planner pairings.";
    }, [standObj, selectedStyle, selectedSub, t]);

    const handleSave = () => {
        if (!standObj) return;
        trackEvent('planner_save', { stand: selectedStand, style: selectedStyle, sub: selectedSub });
        const newBuild = {
            id: crypto.randomUUID(),
            name: `${standObj.name} Build`,
            stand: selectedStand,
            style: selectedStyle,
            sub: selectedSub,
            scores,
            createdAt: new Date().toISOString(),
            patchVersion: "planner-v1"
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
                            Builds are saved in this browser. Export a backup if you want to keep a copy of your saved planner profiles.
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
                <p className="text-muted mt-2">Compare site-maintained build estimates in real-time using the local planner dataset.</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Left Column: Selection */}
                <div className="w-full lg:w-1/2 space-y-6">

                    {/* Stand Selection */}
                    <div className="bg-surface border border-border rounded-xl p-6">
                        <h2 className="text-lg font-bold text-white mb-4">{t("step1Title")}</h2>
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
                        <h2 className="text-lg font-bold text-white mb-4">{t("step2Title")}</h2>
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
                        <h2 className="text-lg font-bold text-white mb-4">{t("step3Title")}</h2>
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
                            <h2 className="text-2xl font-bold text-white">{t("buildSummary")}</h2>
                            {standObj && (
                                <button
                                    onClick={handleSave}
                                    className="px-4 py-2 bg-gradient-to-r from-accent-blue to-accent-indigo text-white text-sm font-bold rounded-lg hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] transition-all flex items-center gap-2"
                                >
                                    <Save className="h-4 w-4" /> {t("saveToVault")}
                                </button>
                            )}
                        </div>

                        {!standObj ? (
                            <div className="py-12 text-center text-muted">
                                <Target className="h-12 w-12 mx-auto mb-4 opacity-20" />
                                <p>{t("emptyStateText")}</p>
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
                                    <h3 className="text-sm font-bold text-muted uppercase tracking-wider mb-4 font-mono">{t("performanceScoresLabel")}</h3>
                                    <div className="space-y-4">
                                        <ScoreBar label={t("scorePvp")} value={scores.pvp} delta={deltas.pvp} icon={<Sword className="h-4 w-4" />} color="bg-accent-blue" topLabel={t("topLocalPlannerScore")} />
                                        <ScoreBar label={t("scorePve")} value={scores.pve} delta={deltas.pve} icon={<Activity className="h-4 w-4" />} color="bg-accent-indigo" topLabel={t("topLocalPlannerScore")} />
                                        <ScoreBar label={t("scoreSurvival")} value={scores.survival} delta={deltas.survival} icon={<Shield className="h-4 w-4" />} color="bg-green-500" topLabel={t("topLocalPlannerScore")} />
                                        <ScoreBar label={t("scoreMobility")} value={scores.mobility} delta={deltas.mobility} icon={<Navigation className="h-4 w-4" />} color="bg-purple-500" topLabel={t("topLocalPlannerScore")} />
                                        <ScoreBar label={t("scoreAccessibility")} value={scores.cost} delta={deltas.cost} icon={<Database className="h-4 w-4" />} color="bg-orange-500" topLabel={t("topLocalPlannerScore")} />
                                    </div>
                                    <p className="text-xs text-center text-muted mt-4 opacity-70">{t("plannerDisclaimer")}</p>
                                </div>

                                {/* Weakness Detection Panel */}
                                {weaknesses.length > 0 && (
                                    <div className="space-y-2">
                                        {weaknesses.map((w, i) => (
                                            <div key={i} className={`flex items-start gap-2 p-3 rounded-lg text-sm ${w.severity === 'red' ? 'bg-red-500/10 border border-red-500/20 text-red-300' : 'bg-yellow-500/10 border border-yellow-500/20 text-yellow-300'}`}>
                                                <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                                                <span>{w.message}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Build Grade — progress loop */}
                                {(() => {
                                    const maxScore = Math.max(scores.pvp, scores.pve, scores.survival, scores.mobility);
                                    const grade = maxScore >= 9 ? 'S+' : maxScore >= 8 ? 'S' : maxScore >= 7 ? 'A' : maxScore >= 5 ? 'B' : 'C';
                                    const gradeColor = grade === 'S+' ? 'text-purple-400 border-purple-400/30 bg-purple-400/10' : grade === 'S' ? 'text-accent-blue border-accent-blue/30 bg-accent-blue/10' : grade === 'A' ? 'text-green-400 border-green-400/30 bg-green-400/10' : 'text-muted border-white/10 bg-white/5';
                                    const incomplete = !selectedStyle || !selectedSub;
                                    return (
                                        <div className={`text-center p-4 rounded-lg border ${gradeColor}`}>
                                            <div className="text-3xl font-heading font-black">{grade}</div>
                                            <div className="text-xs mt-1 opacity-80">{t("buildGradeLabel")}</div>
                                            {incomplete && (
                                                <p className="text-xs mt-2 text-yellow-400">{!selectedStyle ? t("incompleteAddStyle") : t("incompleteAddSub")}</p>
                                            )}
                                            {!incomplete && maxScore < 8 && (
                                                <p className="text-xs mt-2">{scores.pvp < scores.pve ? t("tryDifferentStyle") : t("tryDifferentSub")}</p>
                                            )}
                                        </div>
                                    );
                                })()}

                                {/* 1-Step Upgrade */}
                                {oneStepUpgrade && (
                                    <div className="bg-accent-blue/10 border border-accent-blue/30 rounded-lg p-4">
                                        <h4 className="text-sm font-bold text-accent-blue mb-1">{t("oneStepGuideTitle")}</h4>
                                        <p className="text-sm text-white/90">{oneStepUpgrade}</p>
                                    </div>
                                )}

                                <div className="space-y-2 pt-4 border-t border-white/5">
                                    <p className="text-xs text-muted text-center mb-2">{t("saveBuildHint")}</p>
                                    <div className="flex gap-2">
                                        <a href="/vault" className="flex-1 text-center px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-muted hover:text-white hover:border-accent-blue/30 transition-colors">
                                            {t("viewVaultBtn", { count: vault.length })}
                                        </a>
                                        {vault.length >= 2 && (
                                            <a href={`/compare?a=${vault[vault.length - 1]?.id}&b=${vault[vault.length - 2]?.id}`} className="flex-1 text-center px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-muted hover:text-white hover:border-accent-indigo/30 transition-colors">
                                                {t("compareLastTwoBtn")}
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function ScoreBar({ label, value, delta, icon, color, topLabel }: { label: string, value: number, delta?: number, icon: React.ReactNode, color: string, topLabel?: string }) {
    return (
        <div>
            <div className="flex justify-between text-sm mb-1">
                <span className="text-muted flex items-center gap-1.5">{icon} {label}</span>
                <span className="text-white font-mono font-bold text-[15px] flex items-center gap-1.5">
                    {value}/10
                    {delta !== undefined && delta !== 0 && (
                        <span className={`text-xs font-bold ${delta > 0 ? 'text-green-400' : 'text-red-400'} transition-opacity duration-300`}>
                            {delta > 0 ? '+' : ''}{delta}
                        </span>
                    )}
                </span>
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
                <p className="text-[10px] text-accent-blue font-bold text-right mt-1">{topLabel ?? "TOP LOCAL PLANNER SCORE"}</p>
            )}
        </div>
    );
}

function BuildPlannerFallback() {
    const t = useTranslations("BuildPlanner");
    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            <div className="max-w-3xl mb-8">
                <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-white">{t("heroTitle")}</h1>
                <p className="text-muted mt-3 text-lg leading-relaxed">{t("fallbackIntro")}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-surface border border-border rounded-xl p-5">
                    <h2 className="text-sm font-bold text-accent-blue uppercase tracking-widest mb-2">{t("fallbackBox1Title")}</h2>
                    <p className="text-2xl font-bold text-white mb-1">{t("fallbackBox1Count", { count: standsData.length })}</p>
                    <p className="text-sm text-muted">{t("fallbackBox1Body")}</p>
                </div>
                <div className="bg-surface border border-border rounded-xl p-5">
                    <h2 className="text-sm font-bold text-accent-indigo uppercase tracking-widest mb-2">{t("fallbackBox2Title")}</h2>
                    <p className="text-2xl font-bold text-white mb-1">{t("fallbackBox2Count", { count: stylesData.length })}</p>
                    <p className="text-sm text-muted">{t("fallbackBox2Body")}</p>
                </div>
                <div className="bg-surface border border-border rounded-xl p-5">
                    <h2 className="text-sm font-bold text-purple-400 uppercase tracking-widest mb-2">{t("fallbackBox3Title")}</h2>
                    <p className="text-2xl font-bold text-white mb-1">{t("fallbackBox3Count", { count: subsData.length })}</p>
                    <p className="text-sm text-muted">{t("fallbackBox3Body")}</p>
                </div>
            </div>

            <div className="bg-surface border border-border rounded-xl p-6">
                <h2 className="text-lg font-bold text-white mb-3">{t("fallbackWhatTitle")}</h2>
                <ul className="space-y-2 text-sm text-muted">
                    <li>{t("fallbackWhat1")}</li>
                    <li>{t("fallbackWhat2")}</li>
                    <li>{t("fallbackWhat3")}</li>
                </ul>
            </div>
        </div>
    );
}

// Zone 2: SSR Landing Page Content (visible to Google crawlers)
function PlannerSEOContent() {
    const t = useTranslations("BuildPlanner");
    const stands = standsData.filter((s) => ["S+", "S"].includes(s.tier.overall)).slice(0, 4);
    const faqIds = [1, 2, 3, 4] as const;
    const relatedLinks = [
        { labelKey: "relatedTierList", href: "/tier-list" },
        { labelKey: "relatedAllStands", href: "/stands" },
        { labelKey: "relatedActiveCodes", href: "/codes" },
        { labelKey: "relatedBestBuilds", href: "/guides/best-builds" },
        { labelKey: "relatedStatsGuide", href: "/guides/stats" },
        { labelKey: "relatedStandChances", href: "/guides/stand-chances" },
        { labelKey: "relatedBoxing", href: "/fighting-styles/boxing" },
        { labelKey: "relatedHamon", href: "/sub-abilities/hamon" },
    ] as const;

    return (
        <div className="container mx-auto px-4 max-w-7xl mt-12 space-y-12">
            <section>
                <h2 className="text-2xl font-bold text-white mb-4">{t("howToUseTitle")}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-surface border border-border rounded-lg p-5">
                        <div className="w-8 h-8 rounded-full bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center text-accent-blue font-bold text-sm mb-3">1</div>
                        <h3 className="font-bold text-white mb-2">{t("howToUse1Title")}</h3>
                        <p className="text-sm text-muted">{t("howToUse1Body", { count: standsData.length })}</p>
                    </div>
                    <div className="bg-surface border border-border rounded-lg p-5">
                        <div className="w-8 h-8 rounded-full bg-accent-indigo/10 border border-accent-indigo/20 flex items-center justify-center text-accent-indigo font-bold text-sm mb-3">2</div>
                        <h3 className="font-bold text-white mb-2">{t("howToUse2Title")}</h3>
                        <p className="text-sm text-muted">{t("howToUse2Body")}</p>
                    </div>
                    <div className="bg-surface border border-border rounded-lg p-5">
                        <div className="w-8 h-8 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 font-bold text-sm mb-3">3</div>
                        <h3 className="font-bold text-white mb-2">{t("howToUse3Title")}</h3>
                        <p className="text-sm text-muted">{t("howToUse3Body")}</p>
                    </div>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-white mb-4">{t("whatScoresTitle")}</h2>
                <div className="bg-surface border border-border rounded-xl p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                        <div>
                            <h3 className="font-bold text-accent-blue mb-1">{t("scoreCardPvpTitle")}</h3>
                            <p className="text-muted">{t("scoreCardPvpBody")}</p>
                        </div>
                        <div>
                            <h3 className="font-bold text-accent-blue mb-1">{t("scoreCardPveTitle")}</h3>
                            <p className="text-muted">{t("scoreCardPveBody")}</p>
                        </div>
                        <div>
                            <h3 className="font-bold text-accent-blue mb-1">{t("scoreCardSurvivalTitle")}</h3>
                            <p className="text-muted">{t("scoreCardSurvivalBody")}</p>
                        </div>
                        <div>
                            <h3 className="font-bold text-accent-indigo mb-1">{t("scoreCardMobilityTitle")}</h3>
                            <p className="text-muted">{t("scoreCardMobilityBody")}</p>
                        </div>
                        <div>
                            <h3 className="font-bold text-accent-indigo mb-1">{t("scoreCardCostTitle")}</h3>
                            <p className="text-muted">{t("scoreCardCostBody")}</p>
                        </div>
                        <div>
                            <h3 className="font-bold text-purple-400 mb-1">{t("scoreCardGradeTitle")}</h3>
                            <p className="text-muted">{t("scoreCardGradeBody")}</p>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-white mb-4">{t("popularCombosTitle")}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {stands.map((stand) => (
                        <a key={stand.id} href={`/build-planner?stand=${stand.id}&style=${stand.recommendedStyles[0]}&sub=${stand.recommendedSubs[0]}`} className="bg-surface border border-border rounded-lg p-4 hover:border-accent-blue/50 transition-colors group block">
                            <div className="font-bold text-white group-hover:text-accent-blue transition-colors">{stand.name} + {stand.recommendedStyles[0]} + {stand.recommendedSubs[0]}</div>
                            <div className="text-xs text-muted mt-1">{t("comboMeta", { tier: stand.tier.overall, rarity: stand.rarity, meta: stand.meta })}</div>
                        </a>
                    ))}
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-white mb-4">{t("faqTitle")}</h2>
                <div className="space-y-3">
                    {faqIds.map((n) => (
                        <details key={n} className="group bg-surface border border-border rounded-lg">
                            <summary className="cursor-pointer p-4 text-white font-medium flex items-center justify-between hover:bg-white/5 transition-colors rounded-lg">
                                {t(`faqQ${n}` as `faqQ${1 | 2 | 3 | 4}`)}
                                <span className="text-muted group-open:rotate-90 transition-transform ml-2">›</span>
                            </summary>
                            <div className="px-4 pb-4 text-muted text-sm leading-relaxed">{t(`faqA${n}` as `faqA${1 | 2 | 3 | 4}`)}</div>
                        </details>
                    ))}
                </div>
            </section>

            <section className="pb-8">
                <h2 className="text-2xl font-bold text-white mb-4">{t("relatedTitle")}</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {relatedLinks.map((link) => (
                        <a key={link.href} href={link.href} className="bg-surface border border-border rounded-lg p-3 text-sm text-white hover:border-accent-blue/50 transition-colors">
                            {t(link.labelKey as "relatedTierList" | "relatedAllStands" | "relatedActiveCodes" | "relatedBestBuilds" | "relatedStatsGuide" | "relatedStandChances" | "relatedBoxing" | "relatedHamon")}
                        </a>
                    ))}
                </div>
            </section>
        </div>
    );
}

// Zone 0: JSON-LD Schema
function PlannerSchema() {
    const softwareAppSchema = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Bizarre Lineage Build Planner',
        applicationCategory: 'GameApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        description: 'Free online build planner for Bizarre Lineage. Score Stand + Fighting Style + Sub-Ability combinations across PvP, PvE, Survival, Mobility, and Cost dimensions.',
    };

    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
            { '@type': 'Question', name: 'Is the Build Planner based on official game data?', acceptedAnswer: { '@type': 'Answer', text: 'Move names and obtainment methods come from the official Trello board. The scoring weights and tier rankings are site-maintained community estimates.' } },
            { '@type': 'Question', name: 'Are my saved builds stored on a server?', acceptedAnswer: { '@type': 'Answer', text: 'No. All builds are saved in your browser local storage. Use the Export feature to back up your vault as a JSON file.' } },
            { '@type': 'Question', name: 'How often are scores updated?', acceptedAnswer: { '@type': 'Answer', text: 'We cross-check the official Trello after each game update. Scoring is reviewed when the meta shifts significantly.' } },
            { '@type': 'Question', name: 'Can I share a build with someone?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Copy the URL — selections are encoded in the URL query parameters.' } },
        ],
    };

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.bizarrelineage.com' },
            { '@type': 'ListItem', position: 2, name: 'Build Planner', item: 'https://www.bizarrelineage.com/build-planner' },
        ],
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        </>
    );
}

// Wrap in Suspense because we useSearchParams
// Zone 1 (client interactive) + Zone 2/3 (SSR content always rendered)
export default function BuildPlanner() {
    return (
        <>
            <PlannerSchema />
            <Suspense fallback={<BuildPlannerFallback />}>
                <BuildPlannerClient />
            </Suspense>
            <PlannerSEOContent />
        </>
    )
}
