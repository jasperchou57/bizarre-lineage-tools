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
                Hitting Max Level (or your Prestige Cap) fast is vital for PvP viability. This guide covers the optimal quest loop for solo players. If you have an AoE Stand like Killer Queen or Weather Report, these times can be cut in half.
            </p>

            <div className="space-y-8 not-prose">
                {/* Level 1-10 */}
                <div className="bg-surface border border-border rounded-xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-2 h-full bg-slate-500"></div>
                    <h3 className="text-2xl font-bold text-white mb-2">Level 1 - 10: Thugs</h3>
                    <p className="text-muted mb-4">Focus on learning your basic M1 combos. Do not pull out your Stand in crowded areas to avoid drawing aggro from max level players.</p>
                    <div className="bg-background rounded-lg p-4 border border-white/5">
                        <p className="text-sm font-bold text-white mb-1">Optimal Quest:</p>
                        <p className="text-sm text-muted">Talk to <span className="text-accent-blue">Officer Giorno</span> near the train station. Accept &quot;Defeat 5 Thugs&quot;.</p>
                    </div>
                </div>

                {/* Level 10-25 */}
                <div className="bg-surface border border-border rounded-xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-2 h-full bg-green-500"></div>
                    <h3 className="text-2xl font-bold text-white mb-2">Level 10 - 25: Corrupt Police</h3>
                    <p className="text-muted mb-4">These enemies block often. You will need to start using your Stand&apos;s heavy attacks (usually X or C) or guardbreak moves (like Sweep Kick) to open them up.</p>
                    <div className="bg-background rounded-lg p-4 border border-white/5">
                        <p className="text-sm font-bold text-white mb-1">Optimal Quest:</p>
                        <p className="text-sm text-muted">Talk to <span className="text-accent-blue">Bruno</span> in the back alley. Accept &quot;Clear the Station&quot;.</p>
                    </div>
                </div>

                {/* Level 25-35 */}
                <div className="bg-surface border border-border rounded-xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-2 h-full bg-purple-500"></div>
                    <h3 className="text-2xl font-bold text-white mb-2">Level 25 - 35: Alpha Thugs</h3>
                    <p className="text-muted mb-4">Alpha Thugs have hyper armor on their heavy attacks. Dash backwards (Dash + S) when they glow red. Ranged stands excel here.</p>
                    <div className="bg-background rounded-lg p-4 border border-white/5">
                        <p className="text-sm font-bold text-white mb-1">Optimal Quest:</p>
                        <p className="text-sm text-muted">Talk to <span className="text-accent-blue">Mista</span> on the roof. Accept &quot;Snipe the Alphas&quot;.</p>
                    </div>
                </div>

                {/* Level 35-50 */}
                <div className="bg-surface border border-border rounded-xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-2 h-full bg-red-500"></div>
                    <h3 className="text-2xl font-bold text-white mb-2">Level 35 - 50: Boss Farming (Dio)</h3>
                    <p className="text-muted mb-4">Normal quests fall off here. It is significantly faster to find a server jumping group to farm the Dio boss. You need at least 3 players to do this efficiently without dying.</p>
                    <div className="bg-background rounded-lg p-4 border border-white/5">
                        <p className="text-sm font-bold text-white mb-1">Server Hopping Strategy:</p>
                        <p className="text-sm text-muted">Kill Dio -&gt; Leave Game -&gt; Join new server -&gt; Repeat.</p>
                    </div>
                </div>
            </div>

            <h2 className="mt-12">General Pro-Tips</h2>
            <ul>
                <li><strong>Spawn Point:</strong> Always set your spawn point at the bench near your current quest giver.</li>
                <li><strong>Party EXP:</strong> Being in a party shares EXP, but only if you hit the enemy at least once.</li>
                <li><strong>2x EXP Events:</strong> The developers usually run 2x EXP on weekends. Save your heavy grinding for Saturday/Sunday.</li>
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
