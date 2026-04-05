import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import skinsData from "@/data/skins.json";
import { withCanonical } from "@/lib/metadata";

export const metadata = withCanonical({
    title: "All Bizarre Lineage Skins — Complete Gallery & How to Get Them",
    description: "Browse every skin in Bizarre Lineage. View all 24 Stand skins with rarity, preview images, and how to obtain them via Lucky Arrows.",
}, "/skins");

const RARITY_COLORS: Record<string, string> = {
    Rare: "text-blue-400 bg-blue-400/10 border-blue-400/20",
    Legendary: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
    Mythical: "text-purple-400 bg-purple-400/10 border-purple-400/20",
};

export default function SkinsPage() {
    const skinsByRarity = {
        Mythical: skinsData.filter(s => s.rarity === "Mythical"),
        Legendary: skinsData.filter(s => s.rarity === "Legendary"),
        Rare: skinsData.filter(s => s.rarity === "Rare"),
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-6xl">
            {/* Breadcrumbs */}
            <nav className="flex items-center text-sm text-muted mb-8" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <ChevronRight className="h-4 w-4 mx-2" />
                <span className="text-white" aria-current="page">Skins</span>
            </nav>

            <div className="mb-10 text-center md:text-left">
                <h1 className="text-4xl font-heading font-extrabold text-white mb-4">
                    Bizarre Lineage Skins Gallery
                </h1>
                <p className="text-lg text-muted max-w-2xl">
                    All {skinsData.length} Stand skins in Bizarre Lineage. Skins are cosmetic variants obtained through Lucky Arrows and do not affect gameplay stats.
                </p>
            </div>

            {/* How to Get Skins */}
            <div className="bg-surface border border-border rounded-xl p-6 mb-12">
                <h2 className="text-xl font-bold text-white mb-3">How to Get Skins</h2>
                <p className="text-sm text-muted leading-relaxed">
                    Skins are obtained by using a <strong className="text-white">Lucky Arrow</strong> on your current Stand. The Lucky Arrow guarantees a random skin for the Stand you have equipped. You can get Lucky Arrows from raid shops, codes, events, and in-game drops. Skins are purely cosmetic and do not change your Stand&apos;s stats or abilities.
                </p>
            </div>

            {/* Skins by Rarity */}
            {Object.entries(skinsByRarity).map(([rarity, skins]) => (
                skins.length > 0 && (
                    <div key={rarity} className="mb-12">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className={`px-3 py-1 text-xs font-mono font-bold uppercase rounded-full border ${RARITY_COLORS[rarity]}`}>
                                {rarity}
                            </span>
                            <span>{skins.length} Skins</span>
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                            {skins.map((skin) => (
                                <div
                                    key={skin.id}
                                    className="bg-surface border border-border rounded-xl overflow-hidden hover:border-white/20 transition-all group"
                                >
                                    <div className="relative aspect-[4/3] bg-background">
                                        <Image
                                            src={`/images/skins/${skin.id}-skin-bizarre-lineage.webp`}
                                            alt={skin.name}
                                            width={280}
                                            height={210}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="p-3">
                                        <h3 className="font-bold text-white text-sm mb-1">{skin.name}</h3>
                                        <p className="text-xs text-muted">Stand: {skin.stand}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            ))}

            {/* FAQ */}
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
                            <span className="font-medium text-white pr-4">Can I trade skins with other players?</span>
                            <ChevronRight className="h-5 w-5 text-muted flex-shrink-0 group-open:rotate-90 transition-transform" />
                        </summary>
                        <div className="px-5 pb-5 text-sm text-muted leading-relaxed">
                            Skins are tied to your Stand. You cannot directly trade a skin, but you can trade the Lucky Arrow item before using it.
                        </div>
                    </details>
                    <details className="group bg-surface border border-border rounded-xl overflow-hidden">
                        <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                            <span className="font-medium text-white pr-4">What is the rarest skin in Bizarre Lineage?</span>
                            <ChevronRight className="h-5 w-5 text-muted flex-shrink-0 group-open:rotate-90 transition-transform" />
                        </summary>
                        <div className="px-5 pb-5 text-sm text-muted leading-relaxed">
                            Mythical skins like Galaxy Garou Star Platinum, Lima The World High Voltage, and Ultimate Makima Stone Free are the rarest. They have the lowest drop rates from Lucky Arrows.
                        </div>
                    </details>
                </div>
            </div>
        </div>
    );
}
