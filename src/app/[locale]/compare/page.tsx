"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRightLeft, Target, Activity, Shield, Navigation, Database } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { trackEvent } from "@/lib/analytics";
import standsData from "@/data/stands.json";

function ComparePageClient() {
    const t = useTranslations("Compare");
    const searchParams = useSearchParams();
    const idA = searchParams.get("a");
    const idB = searchParams.get("b");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [vault] = useLocalStorage<any[]>("bl-vault", []);

    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
        trackEvent("compare_open");
    }, []);

    if (!isMounted) return null;

    const buildA = vault.find((b) => b.id === idA);
    const buildB = vault.find((b) => b.id === idB);

    if (!buildA || !buildB) {
        return (
            <div className="container mx-auto px-4 py-24 text-center max-w-lg">
                <ArrowRightLeft className="h-16 w-16 text-muted mx-auto mb-6 opacity-30" />
                <h1 className="text-2xl font-bold text-white mb-4">{t("selectBuildsTitle")}</h1>
                <p className="text-muted mb-8">{t("selectBuildsBody")}</p>
                <Link href="/vault" className="px-6 py-3 bg-accent-blue rounded-lg text-white font-bold inline-block">
                    {t("goToVault")}
                </Link>
            </div>
        );
    }

    const diffPvP = Number((buildA.scores.pvp - buildB.scores.pvp).toFixed(1));
    const diffPvE = Number((buildA.scores.pve - buildB.scores.pve).toFixed(1));

    const verdictPvP = diffPvP > 0
        ? t("verdictLeftPvp", { diff: diffPvP })
        : diffPvP < 0
            ? t("verdictRightPvp", { diff: Math.abs(diffPvP) })
            : t("verdictTiedPvp");
    const verdictPvE = diffPvE > 0
        ? t("verdictLeftPve", { diff: diffPvE })
        : diffPvE < 0
            ? t("verdictRightPve", { diff: Math.abs(diffPvE) })
            : t("verdictTiedPve");

    const standNameA = standsData.find((s) => s.id === buildA.stand)?.name || buildA.stand;
    const standNameB = standsData.find((s) => s.id === buildB.stand)?.name || buildB.stand;

    return (
        <div className="container mx-auto px-4 py-12 max-w-6xl">
            <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-white mb-2 text-center">
                {t("compareBuildsTitle")}
            </h1>

            <div className="bg-accent-indigo/10 border border-accent-indigo/30 rounded-xl p-6 mb-12 max-w-2xl mx-auto text-center">
                <h2 className="text-sm font-bold text-accent-indigo uppercase mb-2 tracking-widest">{t("verdictLabel")}</h2>
                <p className="text-white text-lg">
                    <span className="font-bold">{verdictPvP}</span> <span className="opacity-80">{verdictPvE}</span>
                </p>
                <p className="text-xs text-muted mt-3">{t("verdictDisclaimer")}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ComparisonColumn build={buildA} standName={standNameA} label={t("buildA")} otherScores={buildB.scores} />
                <ComparisonColumn build={buildB} standName={standNameB} label={t("buildB")} otherScores={buildA.scores} />
            </div>
        </div>
    );
}

export default function ComparePage() {
    return (
        <Suspense fallback={<CompareLoading />}>
            <ComparePageClient />
        </Suspense>
    );
}

function CompareLoading() {
    const t = useTranslations("Compare");
    return <div className="container mx-auto p-12 text-center text-white">{t("loadingCompare")}</div>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ComparisonColumn({ build, standName, label, otherScores }: { build: any, standName: string, label: string, otherScores: any }) {
    const t = useTranslations("Compare");
    return (
        <div className="bg-surface border border-border rounded-xl p-8">
            <div className="text-xs font-bold text-muted uppercase tracking-widest mb-6 border-b border-white/5 pb-2">
                {label} ({build.patchVersion})
            </div>

            <h2 className="text-2xl font-bold text-white mb-4">{build.name}</h2>

            <div className="flex flex-col gap-2 mb-8 p-4 bg-background rounded-lg border border-white/5">
                <div className="flex justify-between items-center text-sm">
                    <span className="text-muted">{t("rowStand")}</span>
                    <span className="text-white font-medium">{standName}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                    <span className="text-muted">{t("rowStyle")}</span>
                    <span className="text-white font-medium capitalize">{build.style || t("noneLabel")}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                    <span className="text-muted">{t("rowSub")}</span>
                    <span className="text-white font-medium capitalize">{build.sub || t("noneLabel")}</span>
                </div>
            </div>

            <div className="space-y-6">
                <StatRow label={t("rowPvp")} value={build.scores.pvp} otherValue={otherScores.pvp} icon={<Target className="h-4 w-4" />} color="text-accent-blue" />
                <StatRow label={t("rowPve")} value={build.scores.pve} otherValue={otherScores.pve} icon={<Activity className="h-4 w-4" />} color="text-accent-indigo" />
                <StatRow label={t("rowSurvival")} value={build.scores.survival} otherValue={otherScores.survival} icon={<Shield className="h-4 w-4" />} color="text-green-400" />
                <StatRow label={t("rowMobility")} value={build.scores.mobility} otherValue={otherScores.mobility} icon={<Navigation className="h-4 w-4" />} color="text-purple-400" />
                <StatRow label={t("rowCost")} value={build.scores.cost} otherValue={otherScores.cost} icon={<Database className="h-4 w-4" />} color="text-orange-400" />
            </div>

            <div className="mt-10">
                <Link
                    href={`/build-planner?stand=${build.stand}&style=${build.style}&sub=${build.sub}`}
                    className="block w-full py-4 bg-gradient-to-r from-accent-blue to-accent-indigo rounded-lg text-white font-bold text-center hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all"
                >
                    {t("openInPlanner")}
                </Link>
            </div>
        </div>
    );
}

function StatRow({ label, value, otherValue, icon, color }: { label: string, value: number, otherValue: number, icon: React.ReactNode, color: string }) {
    const t = useTranslations("Compare");
    const isDifferent = Math.abs(value - otherValue) >= 0.1;
    const isWinning = value > otherValue;
    const diff = Number((value - otherValue).toFixed(1));
    return (
        <div className={`p-3 rounded-lg transition-colors ${isDifferent ? (isWinning ? "bg-green-500/5 border border-green-500/20" : "bg-yellow-500/5 border border-yellow-500/20") : ""}`}>
            <div className="flex justify-between text-sm mb-2">
                <span className="text-muted flex items-center gap-1.5">{icon} {label}</span>
                <span className={`font-mono font-bold text-lg ${color}`}>{value.toFixed(1)}</span>
            </div>
            <div className="w-full bg-background rounded-full h-1.5 relative overflow-hidden">
                <div className={`bg-current h-full opacity-80 ${color}`} style={{ width: `${value * 10}%` }}></div>
            </div>
            {isDifferent && (
                <p className={`text-[10px] font-bold text-right mt-1 ${isWinning ? "text-green-400" : "text-yellow-400"}`}>
                    {isWinning ? t("diffWinning", { diff }) : t("diffLosing", { diff })}
                </p>
            )}
        </div>
    );
}
