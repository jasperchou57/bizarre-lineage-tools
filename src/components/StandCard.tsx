import Image from "next/image";
import { Zap, Shield, Sword } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getStandImagePath } from "@/data/stand-media";

interface Stand {
    id: string;
    name: string;
    tier: { overall: string };
    scores: { damage: number; sustain: number; mobility: number; cc: number };
    recommendedStyles: string[];
}

export function StandCard({ stand }: { stand: Stand }) {
    const t = useTranslations("Stands");

    return (
        <Link href={`/stands/${stand.id}`} className="block group h-full">
            <div className="bg-surface border border-border rounded-xl overflow-hidden h-full hover:border-accent-blue/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all flex flex-col">
                <div className="relative aspect-square bg-background overflow-hidden">
                    <Image
                        src={getStandImagePath(stand.id)}
                        alt={stand.name}
                        width={280}
                        height={280}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                    />
                </div>
                <div className="p-4 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-bold text-white group-hover:text-accent-blue transition-colors">{stand.name}</h3>
                        <span className="px-2 py-1 text-xs font-mono font-bold uppercase rounded-full bg-accent-blue/10 text-accent-blue border border-accent-blue/20">
                            {stand.tier.overall}
                        </span>
                    </div>

                    <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-sm text-muted mt-auto">
                        <div className="flex items-center gap-1.5 flex-1">
                            <Sword className="h-4 w-4 text-accent-indigo" />
                            <span className="truncate">{t("cardDamage")}: <strong className="text-white">{stand.scores.damage}</strong></span>
                        </div>
                        <div className="flex items-center gap-1.5 flex-1">
                            <Shield className="h-4 w-4 text-accent-indigo" />
                            <span className="truncate">{t("cardSustain")}: <strong className="text-white">{stand.scores.sustain}</strong></span>
                        </div>
                        <div className="flex items-center gap-1.5 flex-1 col-span-2 mt-2 pt-2 border-t border-white/5">
                            <Zap className="h-4 w-4 text-accent-blue" />
                            <span className="truncate">{t("cardSuggested")}: <strong className="text-white capitalize">{stand.recommendedStyles[0]}</strong></span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
