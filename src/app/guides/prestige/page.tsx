import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, ArrowUpCircle } from "lucide-react";
import { withCanonical } from "@/lib/metadata";

export const metadata: Metadata = withCanonical({
    title: "Prestige Guide & Requirements | Bizarre Lineage",
    description: "Learn how to prestige in Bizarre Lineage. Requirements, benefits, and the fastest progression routes.",
}, "/guides/prestige");

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
                The public official Trello confirms that prestiging is an end-game mechanic handled by the Arch Mage. This page sticks to the details that are explicitly documented there.
            </p>

            <h2>Basic Requirements</h2>
            <p>The public official Trello currently confirms the following:</p>
            <ul>
                <li><strong>Cost:</strong> You need 10,000 Cash.</li>
                <li><strong>NPC:</strong> Talk to the <strong>Arch Mage</strong> in the <strong>Hospital</strong>.</li>
                <li><strong>Location:</strong> The official Trello places the Arch Mage near <strong>Bus Stop 10</strong>.</li>
            </ul>

            <h2>Benefits of Prestiging</h2>
            <ul>
                <li><strong>5 Prestige Shards:</strong> The official card says the Arch Mage grants five Prestige Shards.</li>
                <li><strong>1 Stand Storage:</strong> The same card says you also receive one Stand storage.</li>
                <li><strong>Prestige Shop access:</strong> The Arch Mage also provides access to the Prestige Shop.</li>
            </ul>

            <h2>What do I lose?</h2>
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6 my-6 not-prose">
                <ul className="space-y-2 text-yellow-100 m-0">
                    <li className="flex items-center gap-2">• The public Trello does not publish a complete lose-on-prestige checklist.</li>
                    <li className="flex items-center gap-2">• Verify reset behavior in-game before prestiging instead of relying on third-party tables.</li>
                </ul>
            </div>

            <h2>What do I keep?</h2>
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6 my-6 not-prose">
                <ul className="space-y-2 text-yellow-100 m-0">
                    <li className="flex items-center gap-2">• The public Trello does not publish a full keep-on-prestige checklist either.</li>
                    <li className="flex items-center gap-2">• What is clearly documented publicly is the 10,000 Cash cost, Arch Mage location, Prestige Shards, Stand storage, and Prestige Shop access.</li>
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
