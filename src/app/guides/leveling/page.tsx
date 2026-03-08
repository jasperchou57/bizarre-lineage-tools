import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
    title: "Fastest Leveling Guide (1-50) | Bizarre Lineage",
    description: "The optimal route to hit max level in Bizarre Lineage. Best quests, enemy spots, and EXP grinding strategies.",
};

export default function LevelingGuidePage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl prose prose-invert">
            <div className="flex items-center gap-2 text-sm text-muted mb-8 not-prose">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-white">Guides</span>
                <ChevronRight className="h-4 w-4" />
                <span className="text-white">Leveling</span>
            </div>

            <div className="flex items-center gap-4 mb-8 not-prose">
                <TrendingUp className="h-12 w-12 text-green-400" />
                <h1 className="text-4xl font-heading font-extrabold text-white m-0">Fastest Leveling Route</h1>
            </div>

            <p className="text-xl text-muted leading-relaxed mb-10">
                This guide focuses on the progression steps that are explicitly described on the public official Trello. It avoids undocumented NPC routes and level brackets that can drift out of date.
            </p>

            <div className="space-y-8 not-prose">
                <div className="bg-surface border border-border rounded-xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-2 h-full bg-slate-500"></div>
                    <h3 className="text-2xl font-bold text-white mb-2">Level 1 - 10: Thugs</h3>
                    <p className="text-muted mb-4">The public Trello does not document a verified level-1-10 NPC route here. What it does confirm is that your first step should be the Tutorial at the Morioh Grand Hotel by talking to the Receptionist.</p>
                    <div className="bg-background rounded-lg p-4 border border-white/5">
                        <p className="text-sm font-bold text-white mb-1">Official Source:</p>
                        <p className="text-sm text-muted">The Tutorial entry on the public Trello explains where to start and which area to visit first.</p>
                    </div>
                </div>

                <div className="bg-surface border border-border rounded-xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-2 h-full bg-green-500"></div>
                    <h3 className="text-2xl font-bold text-white mb-2">Level 10 - 25: Corrupt Police</h3>
                    <p className="text-muted mb-4">The public Trello does not confirm this exact bracket as an official route. What it does confirm is that early progression depends on unlocking your first Stand with a Stand Arrow and building around the move set you pull.</p>
                    <div className="bg-background rounded-lg p-4 border border-white/5">
                        <p className="text-sm font-bold text-white mb-1">Official Source:</p>
                        <p className="text-sm text-muted">Check the public Trello cards for <span className="text-accent-blue">Stand Arrow</span> and the early progression section.</p>
                    </div>
                </div>

                <div className="bg-surface border border-border rounded-xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-2 h-full bg-purple-500"></div>
                    <h3 className="text-2xl font-bold text-white mb-2">Level 25 - 35: Alpha Thugs</h3>
                    <p className="text-muted mb-4">The public Trello does not publish this exact mid-game route, but it does confirm that missions, kills, ranked wins, and PvP missions all build Stand conjuration. It also points to the gym mat as a strong conjuration farm.</p>
                    <div className="bg-background rounded-lg p-4 border border-white/5">
                        <p className="text-sm font-bold text-white mb-1">Official Source:</p>
                        <p className="text-sm text-muted">The progression cards describe mission boards and conjuration farming in the gym.</p>
                    </div>
                </div>

                <div className="bg-surface border border-border rounded-xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-2 h-full bg-red-500"></div>
                    <h3 className="text-2xl font-bold text-white mb-2">Level 35 - 50: Boss Farming (Dio)</h3>
                    <p className="text-muted mb-4">The public Trello does not confirm a single official late-game farming route on this page. What it does document clearly is where Boxing, Kendo, Karate, Hamon, Vampire, and Cyborg come from once you are ready to expand your build.</p>
                    <div className="bg-background rounded-lg p-4 border border-white/5">
                        <p className="text-sm font-bold text-white mb-1">Official Source:</p>
                        <p className="text-sm text-muted">Use the official Trello obtainment cards for each trainer or item path instead of outdated community route lists.</p>
                    </div>
                </div>
            </div>

            <h2 className="mt-12">General Pro-Tips</h2>
            <ul>
                <li><strong>Mission Boards:</strong> The official Trello calls them one of the most important early-game progression tools.</li>
                <li><strong>Lucky Arrow:</strong> The official Lucky Arrow card is cosmetic; it guarantees a random skin on your current Stand.</li>
                <li><strong>Prestige:</strong> The public Trello confirms you prestige through the Arch Mage for 10,000 Cash near Bus Stop 10.</li>
            </ul>

            <div className="mt-12 not-prose">
                <Link href="/guides/prestige" className="block w-full py-4 bg-surface border border-white/10 rounded-xl text-center hover:bg-white/5 hover:border-accent-blue transition-all group">
                    <span className="text-sm text-muted uppercase tracking-widest block mb-1">Next Guide</span>
                    <span className="text-xl font-bold text-white group-hover:text-accent-blue transition-colors flex items-center justify-center gap-2">
                        Prestige Requirements <ChevronRight className="h-5 w-5" />
                    </span>
                </Link>
            </div>

        </div>
    );
}
