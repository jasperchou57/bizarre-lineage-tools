import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChevronRight, Target, Shield, Zap, Navigation, Activity } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import subsDataEn from "@/data/sub-abilities.json";
import { getSubsData } from "@/data/locale-data";
import { withCanonical } from "@/lib/metadata";

export function generateStaticParams() {
    return subsDataEn.map((sub) => ({ slug: sub.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
    const { locale, slug } = await params;
    const subsData = getSubsData(locale);
    const sub = subsData.find((s) => s.id === slug);
    const t = await getTranslations({ locale, namespace: "SubAbilities" });
    if (!sub) return { title: t("detailNotFound") };
    return withCanonical({
        title: t("detailMetaTitle", { name: sub.name }),
        description: t("detailMetaDescription", { name: sub.name }),
    }, `/sub-abilities/${sub.id}`);
}

export default async function SubAbilityDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
    const { locale, slug } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: "SubAbilities" });
    const tCommon = await getTranslations({ locale, namespace: "Common" });

    const subsData = getSubsData(locale);
    const sub = subsData.find((s) => s.id === slug);
    if (!sub) notFound();

    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            <div className="flex items-center gap-2 text-sm text-muted mb-8 overflow-x-auto pb-2">
                <Link href="/" className="hover:text-white transition-colors">{tCommon("breadcrumbHome")}</Link>
                <ChevronRight className="h-4 w-4 flex-shrink-0" />
                <Link href="/sub-abilities" className="hover:text-white transition-colors">{t("breadcrumbCurrent")}</Link>
                <ChevronRight className="h-4 w-4 flex-shrink-0" />
                <span className="text-white capitalize">{sub.name}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <div>
                        <span className="inline-block px-3 py-1 bg-accent-indigo/10 border border-accent-indigo/20 text-accent-indigo text-xs font-bold rounded-full mb-4">
                            {sub.origin}
                        </span>
                        <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-white mb-4">{sub.name}</h1>
                        <p className="text-xl text-muted leading-relaxed">{sub.summary}</p>
                        <p className="text-sm text-muted leading-relaxed mt-3">{t("detailDisclaimer")}</p>
                    </div>

                    <div className="bg-surface border border-accent-blue/30 rounded-xl overflow-hidden relative shadow-[0_0_30px_rgba(59,130,246,0.05)]">
                        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                            <Zap className="h-32 w-32" />
                        </div>
                        <div className="p-8 relative z-10">
                            <h2 className="text-sm font-bold text-accent-blue uppercase tracking-widest mb-2">{t("passiveTitle")}</h2>
                            <p className="text-2xl font-bold text-white">{sub.passive}</p>
                        </div>
                    </div>

                    <div className="bg-surface border border-border rounded-xl stretch overflow-hidden">
                        <div className="bg-white/5 border-b border-white/5 px-6 py-4">
                            <h2 className="text-xl font-bold text-white">{t("activeSkillsTitle")}</h2>
                        </div>
                        <div className="divide-y divide-white/5">
                            {sub.moves.map((move, i) => (
                                <div key={i} className="p-6 flex flex-col sm:flex-row gap-4 justify-between sm:items-center hover:bg-white/5 transition-colors">
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-1">{move.name}</h3>
                                    </div>
                                    <div className="flex gap-3">
                                        <span className="px-3 py-1 bg-background border border-border rounded-lg text-xs font-mono font-bold text-muted flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-accent-indigo" />
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
                            href={`/build-planner?sub=${sub.id}`}
                            className="px-8 py-4 bg-gradient-to-r from-accent-indigo to-purple-600 rounded-xl text-white font-bold text-center hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all flex-1"
                        >
                            {t("createBuildCta", { name: sub.name })}
                        </Link>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-surface border border-border rounded-xl p-6">
                        <h3 className="text-sm font-bold text-muted uppercase tracking-widest mb-6 border-b border-white/5 pb-2">{t("radarTitle")}</h3>
                        <div className="space-y-5">
                            <StatRow label={t("statPvp")} value={sub.scores.pvp} icon={<Target className="w-3 h-3" />} color="text-red-400" />
                            <StatRow label={t("statPve")} value={sub.scores.pve} icon={<Activity className="w-3 h-3" />} color="text-accent-indigo" />
                            <StatRow label={t("cardSurvival")} value={sub.scores.survival} icon={<Shield className="w-3 h-3" />} color="text-green-400" />
                            <StatRow label={t("statMobility")} value={sub.scores.mobility} icon={<Navigation className="w-3 h-3" />} color="text-blue-400" />
                        </div>
                    </div>

                    <div className="bg-surface border border-border rounded-xl p-6">
                        <h3 className="text-sm font-bold text-muted uppercase tracking-widest mb-4 border-b border-white/5 pb-2">{t("synergiesTitle")}</h3>
                        <div className="flex flex-col gap-2">
                            {sub.bestWith.map((standId) => (
                                <Link
                                    key={standId}
                                    href={`/stands/${standId}`}
                                    className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-sm text-white capitalize hover:bg-white/10 hover:border-accent-indigo transition-colors flex justify-between items-center group"
                                >
                                    {standId.replace(/-/g, " ")}
                                    <ChevronRight className="h-4 w-4 text-muted group-hover:text-accent-indigo group-hover:translate-x-1 transition-all" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatRow({ label, value, color, icon }: { label: string; value: number; color: string; icon?: React.ReactNode }) {
    return (
        <div>
            <div className="flex justify-between text-sm mb-1.5">
                <span className="text-muted flex items-center gap-1.5">{icon} {label}</span>
                <span className={`font-mono font-bold ${color}`}>{value}/10</span>
            </div>
            <div className="w-full bg-background rounded-full h-1.5 relative overflow-hidden">
                <div className={`bg-current h-full opacity-80 ${color}`} style={{ width: `${value * 10}%` }}></div>
            </div>
        </div>
    );
}
