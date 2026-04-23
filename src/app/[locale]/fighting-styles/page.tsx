import type { Metadata } from "next";
import Image from "next/image";
import { ChevronRight, Activity, Zap } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getStylesData } from "@/data/locale-data";
import { withCanonical } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "FightingStyles" });
    return withCanonical({
        title: t("metaTitle"),
        description: t("metaDescription"),
    }, "/fighting-styles");
}

export default async function FightingStylesDirectory({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: "FightingStyles" });
    const stylesData = getStylesData(locale);

    return (
        <div className="container mx-auto px-4 py-12 max-w-6xl">
            <div className="relative w-full rounded-xl overflow-hidden mb-6">
                <Image src="/images/pages/fighting-styles.png" alt={t("heroTitle")} width={800} height={450} className="w-full h-48 object-cover opacity-40" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
                <div className="absolute bottom-4 left-6">
                    <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-white">{t("heroTitle")}</h1>
                </div>
            </div>
            <p className="text-lg text-muted mb-12 max-w-2xl">{t("heroIntro")}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stylesData.map((style) => (
                    <Link
                        key={style.id}
                        href={`/fighting-styles/${style.id}`}
                        className="group bg-surface border border-border rounded-xl overflow-hidden hover:border-accent-blue/50 transition-all hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] block"
                    >
                        <div className="p-6 border-b border-white/5 bg-white/5 group-hover:bg-accent-blue/5 transition-colors">
                            <div className="flex justify-between items-start mb-2">
                                <h2 className="text-2xl font-bold text-white group-hover:text-accent-blue transition-colors">{style.name}</h2>
                                <ChevronRight className="h-5 w-5 text-muted group-hover:text-white group-hover:translate-x-1 transition-all" />
                            </div>
                            <p className="text-sm text-muted line-clamp-2 min-h-[40px]">{style.summary}</p>
                        </div>

                        <div className="p-6">
                            <h3 className="text-xs font-bold text-muted uppercase tracking-widest mb-3">{t("cardBestWith")}</h3>
                            <div className="flex flex-wrap gap-2 mb-6">
                                {style.bestWith.map((standId) => (
                                    <span key={standId} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-white capitalize">
                                        {standId.replace(/-/g, " ")}
                                    </span>
                                ))}
                            </div>

                            <div className="space-y-3">
                                <div>
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-muted flex items-center gap-1.5"><Zap className="h-3 w-3" /> {t("cardComboPotential")}</span>
                                        <span className="text-white font-mono font-bold">{style.scores.combo}</span>
                                    </div>
                                    <div className="w-full bg-background rounded-full h-1.5 overflow-hidden">
                                        <div className="bg-accent-blue h-full opacity-80" style={{ width: `${style.scores.combo * 10}%` }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-muted flex items-center gap-1.5"><Activity className="h-3 w-3" /> {t("cardDamageScaling")}</span>
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
