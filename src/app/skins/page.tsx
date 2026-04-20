import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ExternalLink } from "lucide-react";
import skinsData from "@/data/skins.json";
import standsData from "@/data/stands.json";
import { withCanonical } from "@/lib/metadata";

export const metadata = withCanonical({
    title: `Official Bizarre Lineage Skins (April 2026) | ${skinsData.length} Trello Listings`,
    description: `Browse the ${skinsData.length} skin entries currently listed on the official Bizarre Lineage Trello, with direct card links and official preview art where available.`,
}, "/skins");

const RARITY_COLORS: Record<string, string> = {
    Common: "text-gray-300 bg-gray-300/10 border-gray-300/20",
    Rare: "text-blue-400 bg-blue-400/10 border-blue-400/20",
    Legendary: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
    Mythical: "text-purple-400 bg-purple-400/10 border-purple-400/20",
};

export default function SkinsPage() {
    type Skin = (typeof skinsData)[number];

    const standOrder = new Map(standsData.map((stand, index) => [stand.name, index]));
    const groupedSkins = skinsData.reduce<Record<string, Skin[]>>((acc, skin) => {
        if (!acc[skin.stand]) {
            acc[skin.stand] = [];
        }

        acc[skin.stand].push(skin);
        return acc;
    }, {});

    const standGroups = Object.entries(groupedSkins)
        .map(([stand, skins]) => ({
            stand,
            standId: standsData.find((entry) => entry.name === stand)?.id,
            skins: skins.slice().sort((left, right) => left.skinName.localeCompare(right.skinName)),
        }))
        .sort((left, right) => {
            const leftOrder = standOrder.get(left.stand) ?? Number.MAX_SAFE_INTEGER;
            const rightOrder = standOrder.get(right.stand) ?? Number.MAX_SAFE_INTEGER;

            return leftOrder - rightOrder || left.stand.localeCompare(right.stand);
        });

    const commonTaggedCount = skinsData.filter((skin) => skin.rarity === "Common").length;

    return (
        <div className="container mx-auto px-4 py-12 max-w-6xl">
            <nav className="flex items-center text-sm text-muted mb-8" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <ChevronRight className="h-4 w-4 mx-2" />
                <span className="text-white" aria-current="page">Skins</span>
            </nav>

            <div className="mb-10 text-center md:text-left">
                <h1 className="text-4xl font-heading font-extrabold text-white mb-4">
                    Official Bizarre Lineage Skins
                </h1>
                <p className="text-lg text-muted max-w-3xl">
                    The public official Trello currently lists {skinsData.length} skin entries across {standGroups.length} Stand families. This page mirrors those listings directly, including official preview art and per-card source links.
                </p>
            </div>

            <div className="bg-surface border border-border rounded-xl p-6 mb-12">
                <h2 className="text-xl font-bold text-white mb-3">How to Get Skins</h2>
                <p className="text-sm text-muted leading-relaxed">
                    The official Lucky Arrow item card says that a <strong className="text-white">Lucky Arrow</strong> guarantees a random skin for your currently equipped Stand. The same official item card currently lists three acquisition paths: <strong className="text-white">Prestige Shop</strong>, <strong className="text-white">Raid Shops</strong>, and <strong className="text-white">Legendary Chests</strong>.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
                <div className="bg-surface border border-border rounded-xl p-5">
                    <div className="text-xs uppercase tracking-wide text-muted mb-2">Official Entries</div>
                    <div className="text-2xl font-bold text-white">{skinsData.length}</div>
                </div>
                <div className="bg-surface border border-border rounded-xl p-5">
                    <div className="text-xs uppercase tracking-wide text-muted mb-2">Stand Families</div>
                    <div className="text-2xl font-bold text-white">{standGroups.length}</div>
                </div>
                <div className="bg-surface border border-border rounded-xl p-5">
                    <div className="text-xs uppercase tracking-wide text-muted mb-2">Explicitly Tagged Common</div>
                    <div className="text-2xl font-bold text-white">{commonTaggedCount}</div>
                </div>
            </div>

            {standGroups.map(({ stand, standId, skins }) => (
                <section key={stand} className="mb-12">
                    <div className="flex items-center justify-between gap-4 mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-white">
                                {standId ? (
                                    <Link href={`/stands/${standId}`} className="hover:text-accent-blue transition-colors">
                                        {stand}
                                    </Link>
                                ) : (
                                    stand
                                )}
                            </h2>
                            <p className="text-sm text-muted mt-1">{skins.length} official listing{skins.length > 1 ? "s" : ""}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {skins.map((skin) => (
                            <article
                                key={skin.id}
                                className="bg-surface border border-border rounded-xl overflow-hidden hover:border-white/20 transition-all group"
                            >
                                <div className="relative aspect-[4/3] bg-background">
                                    {skin.imageUrl ? (
                                        <Image
                                            src={skin.imageUrl}
                                            alt={skin.name}
                                            width={320}
                                            height={240}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center px-4 text-center text-xs text-muted">
                                            Preview image not yet released — Trello currently shows a TBA placeholder for this skin.
                                        </div>
                                    )}
                                </div>
                                <div className="p-3">
                                    <div className="flex items-start justify-between gap-3 mb-2">
                                        <h3 className="font-bold text-white text-sm">{skin.skinName}</h3>
                                        {skin.rarity && (
                                            <span className={`px-2 py-1 text-[10px] font-mono font-bold uppercase rounded-full border ${RARITY_COLORS[skin.rarity]}`}>
                                                {skin.rarity}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs text-muted mb-3">
                                        {skin.rarity ? "Official Trello tag shown above." : "No public rarity label shown on the official card."}
                                    </p>
                                    <a
                                        href={skin.sourceUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 text-xs text-accent-blue hover:text-white transition-colors"
                                    >
                                        Official card <ExternalLink className="h-3 w-3" />
                                    </a>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            ))}

            <div className="mt-12">
                <h2 className="text-2xl font-bold text-white mb-6">Skins FAQ</h2>
                <div className="space-y-4">
                    <details className="group bg-surface border border-border rounded-xl overflow-hidden">
                        <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                            <span className="font-medium text-white pr-4">Do skins affect my Stand&apos;s stats?</span>
                            <ChevronRight className="h-5 w-5 text-muted flex-shrink-0 group-open:rotate-90 transition-transform" />
                        </summary>
                        <div className="px-5 pb-5 text-sm text-muted leading-relaxed">
                            No. Skins in Bizarre Lineage are purely cosmetic. They change the visual appearance of your Stand but do not modify any stats, moves, or abilities.
                        </div>
                    </details>
                    <details className="group bg-surface border border-border rounded-xl overflow-hidden">
                        <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                            <span className="font-medium text-white pr-4">Why do some entries have no rarity badge?</span>
                            <ChevronRight className="h-5 w-5 text-muted flex-shrink-0 group-open:rotate-90 transition-transform" />
                        </summary>
                        <div className="px-5 pb-5 text-sm text-muted leading-relaxed">
                            The public official Trello currently shows an explicit <strong className="text-white">Common</strong> label on some skin cards, but many cards are unlabeled. This page avoids guessing the missing rarity values and links every entry back to its official source card.
                        </div>
                    </details>
                    <details className="group bg-surface border border-border rounded-xl overflow-hidden">
                        <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                            <span className="font-medium text-white pr-4">Where do these previews come from?</span>
                            <ChevronRight className="h-5 w-5 text-muted flex-shrink-0 group-open:rotate-90 transition-transform" />
                        </summary>
                        <div className="px-5 pb-5 text-sm text-muted leading-relaxed">
                            The preview art on this page is pulled from the public official Trello card attachments whenever the card exposes one. If a card has no attached preview image, the entry stays listed here but shows an image placeholder instead.
                        </div>
                    </details>
                </div>
            </div>
        </div>
    );
}
