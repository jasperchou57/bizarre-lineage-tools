import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Gift, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
    title: "Bizarre Lineage Codes (March 2026) | No Verified Active Codes",
    description: "Check the current Bizarre Lineage code status and verify announcements through the official Discord, Roblox group, and game page before trusting third-party code lists.",
};

export default function CodesPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <div className="flex items-center gap-2 text-sm text-muted mb-8">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-white">Codes</span>
            </div>

            <div className="flex items-center gap-4 mb-8">
                <Gift className="h-12 w-12 text-accent-blue" />
                <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-white m-0">
                    Bizarre Lineage Codes
                </h1>
            </div>

            <div className="bg-surface border border-border rounded-xl p-8 text-center mb-12">
                <AlertCircle className="h-16 w-16 text-yellow-500 mx-auto mb-4 opacity-80" />
                <h2 className="text-2xl font-bold text-white mb-2">No Active Codes Yet</h2>
                <p className="text-lg text-muted max-w-2xl mx-auto">
                    We have not verified any active official codes from the public Trello or its linked channels.
                    Check the official Discord, Roblox group, and game page before trusting third-party code lists.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-surface border border-white/5 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-white mb-3">What will codes give?</h3>
                    <p className="text-muted text-sm leading-relaxed">
                        Public official sources do not currently confirm a live reward table for codes on this site.
                        If codes appear, verify them through the <a href="https://discord.gg/bizarrelineage" className="hover:text-white transition-colors underline underline-offset-4">official Discord</a>, the <a href="https://www.roblox.com/communities/33161040/Bizarre-Collective" className="hover:text-white transition-colors underline underline-offset-4">official Roblox group</a>, or the <a href="https://www.roblox.com/games/14890802310/Bizarre-Lineage" className="hover:text-white transition-colors underline underline-offset-4">official game page</a>.
                    </p>
                </div>

                <div className="bg-surface border border-white/5 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-white mb-3">While you wait...</h3>
                    <p className="text-muted mb-4">
                        Check out our tools to make sure you do not waste your resources when you finally get a good Stand!
                    </p>
                    <div className="flex flex-col gap-3">
                        <Link href="/tier-list" className="px-4 py-2 bg-white/5 rounded-lg text-white hover:bg-white/10 transition-colors border border-white/10 text-center">
                            View Stand Tier List
                        </Link>
                        <Link href="/build-planner" className="px-4 py-2 bg-accent-indigo/20 rounded-lg text-accent-indigo hover:bg-accent-indigo/30 transition-colors border border-accent-indigo/30 text-center font-bold">
                            Open Build Planner
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
