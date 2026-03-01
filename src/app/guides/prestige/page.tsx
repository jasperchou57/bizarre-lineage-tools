import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, ArrowUpCircle } from "lucide-react";

export const metadata: Metadata = {
    title: "Prestige Guide & Requirements | Bizarre Lineage",
    description: "Learn how to prestige in Bizarre Lineage. Requirements, benefits, and the fastest progression routes.",
};

export default function PrestigeGuidePage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl prose prose-invert">
            <div className="flex items-center gap-2 text-sm text-muted mb-8 not-prose">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-white">Guides</span>
                <ChevronRight className="h-4 w-4" />
                <span className="text-white">Prestige</span>
            </div>

            <div className="flex items-center gap-4 mb-8 not-prose">
                <ArrowUpCircle className="h-12 w-12 text-accent-indigo" />
                <h1 className="text-4xl font-heading font-extrabold text-white m-0">Prestige Guide</h1>
            </div>

            <p className="text-xl text-muted leading-relaxed mb-10">
                Prestiging in Bizarre Lineage is the core progression mechanic that resets your level in exchange for powerful account-wide buffs, increased level caps, and access to new content tiers.
            </p>

            <h2>Basic Requirements</h2>
            <p>To perform a prestige, you must meet the following criteria based on your current prestige level:</p>

            <div className="overflow-x-auto not-prose my-8">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-white/10">
                            <th className="py-4 px-6 text-muted font-bold">Current Prestige</th>
                            <th className="py-4 px-6 text-muted font-bold">Required Level</th>
                            <th className="py-4 px-6 text-muted font-bold">Money Cost</th>
                            <th className="py-4 px-6 text-muted font-bold">Next Cap</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        <tr className="hover:bg-white/5 transition-colors">
                            <td className="py-4 px-6 font-bold text-white">Prestige 0</td>
                            <td className="py-4 px-6 text-white font-mono">35</td>
                            <td className="py-4 px-6 text-green-400 font-mono">$5,000</td>
                            <td className="py-4 px-6 text-accent-blue font-bold">Level 40</td>
                        </tr>
                        <tr className="hover:bg-white/5 transition-colors">
                            <td className="py-4 px-6 font-bold text-white">Prestige 1</td>
                            <td className="py-4 px-6 text-white font-mono">40</td>
                            <td className="py-4 px-6 text-green-400 font-mono">$10,000</td>
                            <td className="py-4 px-6 text-accent-blue font-bold">Level 45</td>
                        </tr>
                        <tr className="hover:bg-white/5 transition-colors">
                            <td className="py-4 px-6 font-bold text-white">Prestige 2</td>
                            <td className="py-4 px-6 text-white font-mono">45</td>
                            <td className="py-4 px-6 text-green-400 font-mono">$15,000</td>
                            <td className="py-4 px-6 text-accent-blue font-bold">Level 50 (Max)</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h2>Benefits of Prestiging</h2>
            <ul>
                <li><strong>Skill Points:</strong> Each prestige grants additional skill points at max level, allowing you to max out more branches of your Stand and Character skill trees simultaneously.</li>
                <li><strong>Requiem Arrows:</strong> You cannot use a Requiem Arrow unless you are Prestige 1 or higher.</li>
                <li><strong>Story Mode:</strong> Certain story quests are gated behind Prestige requirements.</li>
            </ul>

            <h2>What do I lose?</h2>
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 my-6 not-prose">
                <ul className="space-y-2 text-red-200 m-0">
                    <li className="flex items-center gap-2">❌ Your character level resets to Level 1.</li>
                    <li className="flex items-center gap-2">❌ Your base stats (Health, Stamina) reset to base values.</li>
                    <li className="flex items-center gap-2">❌ All allocated skill points are refunded and locked behind leveling.</li>
                </ul>
            </div>

            <h2>What do I keep?</h2>
            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6 my-6 not-prose">
                <ul className="space-y-2 text-green-200 m-0">
                    <li className="flex items-center gap-2">✅ Your Stand remains unchanged.</li>
                    <li className="flex items-center gap-2">✅ Your Fighting Style and Sub-Ability remain unlocked.</li>
                    <li className="flex items-center gap-2">✅ Your Money and Items (Arrows, Rokakakas) are safe.</li>
                    <li className="flex items-center gap-2">✅ Story progression is saved.</li>
                </ul>
            </div>

            <div className="mt-12 not-prose">
                <Link href="/guides/leveling" className="block w-full py-4 bg-surface border border-white/10 rounded-xl text-center hover:bg-white/5 hover:border-accent-blue transition-all group">
                    <span className="text-sm text-muted uppercase tracking-widest block mb-1">Next Guide</span>
                    <span className="text-xl font-bold text-white group-hover:text-accent-blue transition-colors flex items-center justify-center gap-2">
                        Fastest Leveling Routes <ChevronRight className="h-5 w-5" />
                    </span>
                </Link>
            </div>
        </div>
    );
}
