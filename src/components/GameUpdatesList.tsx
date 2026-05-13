import { ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { GameUpdate } from "@/data/updates";

type GameUpdatesLabels = {
    officialBadge: string;
    communityBadge: string;
    latestBadge: string;
    moreLabel: (count: number) => string;
    sourcePrefix: string;
    latestNewsLabel?: string;
};

export function GameUpdatesList({
    updates,
    labels,
    showNewsLink = false,
}: {
    updates: readonly GameUpdate[];
    labels: GameUpdatesLabels;
    showNewsLink?: boolean;
}) {
    return (
        <section className="w-full">
            <div className="space-y-4">
                {updates.map((update, index) => {
                    const visibleTags = update.tags.slice(0, 3);
                    const hiddenTagCount = Math.max(update.tags.length - visibleTags.length, 0);
                    const isLatest = index === 0;

                    return (
                        <article
                            key={update.id}
                            className={`bg-surface border rounded-xl p-5 md:p-6 transition-colors ${isLatest ? "border-yellow-400/60 shadow-[0_0_18px_rgba(250,204,21,0.08)]" : "border-border"}`}
                        >
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 mb-3">
                                <div className="flex flex-wrap items-center gap-2">
                                    <h3 className="text-xl font-bold text-white">{update.title}</h3>
                                    {isLatest && (
                                        <span className="text-xs font-bold uppercase px-2.5 py-1 rounded-full bg-yellow-400/15 text-yellow-300 border border-yellow-400/25">
                                            {labels.latestBadge}
                                        </span>
                                    )}
                                    <span className={`text-xs font-bold uppercase px-2.5 py-1 rounded-full border ${update.confidence === "official" ? "bg-green-400/10 text-green-400 border-green-400/20" : "bg-yellow-400/10 text-yellow-300 border-yellow-400/20"}`}>
                                        {update.confidence === "official" ? labels.officialBadge : labels.communityBadge}
                                    </span>
                                </div>
                                <time dateTime={update.dateTime} className="text-sm text-muted shrink-0">{update.displayDate}</time>
                            </div>

                            <p className="text-sm md:text-base text-muted leading-relaxed mb-4">{update.summary}</p>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {visibleTags.map((tag) => (
                                    <span key={tag} className="max-w-full truncate rounded-md bg-white/5 border border-white/5 px-3 py-1 text-xs text-muted">
                                        {tag}
                                    </span>
                                ))}
                                {hiddenTagCount > 0 && (
                                    <span className="rounded-md px-3 py-1 text-xs text-muted/80">
                                        {labels.moreLabel(hiddenTagCount)}
                                    </span>
                                )}
                            </div>

                            <a
                                href={update.sourceUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs font-medium text-accent-blue hover:text-white transition-colors"
                            >
                                {labels.sourcePrefix}: {update.sourceLabel}
                                <ExternalLink className="h-3 w-3" />
                            </a>
                        </article>
                    );
                })}
            </div>

            {showNewsLink && labels.latestNewsLabel && (
                <div className="mt-5 flex justify-end">
                    <Link href="/updates" className="inline-flex items-center gap-2 text-sm font-bold text-accent-blue hover:text-white transition-colors">
                        {labels.latestNewsLabel}
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            )}
        </section>
    );
}
